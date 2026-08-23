import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { createPublicSupabase } from "@/lib/content.server";
import { adminContextFromHandler, ensureAdminAccess, loadAdminDb } from "@/lib/admin-guard";
import { LIVE_POLL_MS } from "@/lib/live-poll";
export type TradeRecord = {
  id: string;
  externalId: string;
  date: string;
  market: string;
  instrument: string;
  direction: string;
  entry: string;
  exit: string;
  rMultiple: number;
  percentage: number;
  result: string;
  notes: string;
  screenshot: string;
  published: boolean;
};

export function tradeFromRow(row: Record<string, unknown>): TradeRecord {
  return {
    id: String(row.id ?? ""),
    externalId: String(row.external_id ?? ""),
    date: String(row.date ?? "").slice(0, 10),
    market: String(row.market ?? ""),
    instrument: String(row.instrument ?? ""),
    direction: String(row.direction ?? "Long"),
    entry: String(row.entry ?? ""),
    exit: String(row.exit ?? ""),
    rMultiple: Number(row.r_multiple ?? 0),
    percentage: Number(row.percentage ?? 0),
    result: String(row.result ?? "Win"),
    notes: String(row.notes ?? ""),
    screenshot: String(row.screenshot ?? ""),
    published: row.published !== false,
  };
}

export function emptyTrade(): TradeRecord {
  return {
    id: "",
    externalId: "",
    date: new Date().toISOString().slice(0, 10),
    market: "Crypto",
    instrument: "",
    direction: "Long",
    entry: "",
    exit: "",
    rMultiple: 0,
    percentage: 0,
    result: "Win",
    notes: "",
    screenshot: "",
    published: true,
  };
}

export type JournalMetrics = {
  totalTrades: number;
  totalR: number;
  avgR: number;
  winRate: number;
  totalPnlPct: number;
  netPerformanceR: number;
  equityCurve: { date: string; equity: number }[];
};

let transactionCsvCache: { at: number; url: string; trades: TradeRecord[] } | null = null;

export function computeMetrics(trades: TradeRecord[]): JournalMetrics {
  const sorted = [...trades].sort(
    (a, b) => a.date.localeCompare(b.date) || a.id.localeCompare(b.id),
  );
  let running = 0;
  const equityCurve = sorted.map((t) => {
    running += t.rMultiple;
    return { date: t.date, equity: Number(running.toFixed(2)) };
  });

  const totalTrades = sorted.length;
  const totalR = sorted.reduce((s, t) => s + t.rMultiple, 0);
  const wins = sorted.filter((t) => t.rMultiple > 0).length;
  const totalPnlPct = sorted.reduce((s, t) => s + t.percentage, 0);

  return {
    totalTrades,
    totalR: Number(totalR.toFixed(2)),
    avgR: totalTrades ? Number((totalR / totalTrades).toFixed(2)) : 0,
    winRate: totalTrades ? Number(((wins / totalTrades) * 100).toFixed(1)) : 0,
    totalPnlPct: Number(totalPnlPct.toFixed(2)),
    netPerformanceR: Number(totalR.toFixed(2)),
    equityCurve:
      equityCurve.length > 0
        ? equityCurve
        : [{ date: new Date().toISOString().slice(0, 10), equity: 0 }],
  };
}

export function equitySeriesForChart(trades: TradeRecord[]): {
  series: number[];
  endR: number;
  fromSeed: boolean;
} {
  const metrics = computeMetrics(trades);
  const live = metrics.equityCurve.map((p) => p.equity);
  return {
    series: live[0] === 0 ? live : [0, ...live],
    endR: metrics.netPerformanceR,
    fromSeed: false,
  };
}

const tradeSchema = z.object({
  id: z.string().max(60).optional().default(""),
  externalId: z.string().max(160).optional().default(""),
  date: z.string().max(30),
  market: z.string().max(60).default("Crypto"),
  instrument: z.string().trim().min(1).max(80),
  direction: z.string().max(20).default("Long"),
  entry: z.string().max(80).default(""),
  exit: z.string().max(80).default(""),
  rMultiple: z.number(),
  percentage: z.number().default(0),
  result: z.string().max(40).default("Win"),
  notes: z.string().max(4000).default(""),
  screenshot: z.string().max(500).default(""),
  published: z.boolean().default(true),
});

const importTradesSchema = z.object({
  text: z.string().min(1).max(1_500_000),
  replaceExistingSynced: z.boolean().default(false),
});

type TradePayload = {
  external_id?: string | null;
  date: string;
  market: string;
  instrument: string;
  direction: string;
  entry: string;
  exit: string;
  r_multiple: number;
  percentage: number;
  result: string;
  notes: string;
  screenshot: string | null;
  published: boolean;
};

function splitDelimitedRows(text: string): string[][] {
  const delimiter = text.includes("\t") && !text.includes(",") ? "\t" : ",";
  const rows: string[][] = [];
  let row: string[] = [];
  let cell = "";
  let quoted = false;

  for (let i = 0; i < text.length; i += 1) {
    const char = text[i];
    const next = text[i + 1];
    if (char === '"' && quoted && next === '"') {
      cell += '"';
      i += 1;
    } else if (char === '"') {
      quoted = !quoted;
    } else if (char === delimiter && !quoted) {
      row.push(cell.trim());
      cell = "";
    } else if ((char === "\n" || char === "\r") && !quoted) {
      if (char === "\r" && next === "\n") i += 1;
      row.push(cell.trim());
      if (row.some(Boolean)) rows.push(row);
      row = [];
      cell = "";
    } else {
      cell += char;
    }
  }

  row.push(cell.trim());
  if (row.some(Boolean)) rows.push(row);
  return rows;
}

function normalizeHeader(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");
}

function readNumber(value: string | undefined, fallback = 0) {
  if (!value) return fallback;
  const n = Number(value.replace(/[%,$\s]/g, ""));
  return Number.isFinite(n) ? n : fallback;
}

function readBool(value: string | undefined, fallback = true) {
  if (!value) return fallback;
  return !["false", "no", "0", "draft", "unpublished"].includes(value.trim().toLowerCase());
}

function readDate(value: string | undefined) {
  if (!value) return new Date().toISOString().slice(0, 10);
  const direct = new Date(value);
  if (!Number.isNaN(direct.getTime())) return direct.toISOString().slice(0, 10);
  return value.slice(0, 10);
}

function pick(row: Record<string, string>, keys: string[]) {
  for (const key of keys) {
    const value = row[key];
    if (value != null && value !== "") return value;
  }
  return "";
}

function toTradePayload(row: Record<string, string>, index: number): TradePayload | null {
  const date = readDate(pick(row, ["date", "trade_date", "closed_date", "exit_date"]));
  const instrument = pick(row, ["instrument", "asset", "symbol", "pair", "ticker"]);
  if (!instrument) return null;

  const rMultiple = readNumber(pick(row, ["r_multiple", "r", "r_value", "multiple", "result_r"]));
  const percentage = readNumber(
    pick(row, ["percentage", "p_l", "pnl", "pnl_pct", "profit_loss_pct"]),
  );
  const externalId =
    pick(row, ["external_id", "transaction_id", "trade_id", "id"]) ||
    `${date}-${instrument}-${index + 1}`.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  const result =
    pick(row, ["result", "outcome"]) ||
    (rMultiple > 0 ? "Win" : rMultiple < 0 ? "Loss" : "Breakeven");

  return {
    external_id: externalId,
    date,
    market: pick(row, ["market", "asset_class"]) || "Crypto",
    instrument,
    direction: pick(row, ["direction", "side"]) || "Long",
    entry: pick(row, ["entry", "entry_price"]),
    exit: pick(row, ["exit", "exit_price"]),
    r_multiple: rMultiple,
    percentage,
    result,
    notes: pick(row, ["notes", "comment", "thesis"]),
    screenshot: pick(row, ["screenshot", "image", "chart_url"]) || null,
    published: readBool(pick(row, ["published", "live", "show"]), true),
  };
}

function parseTradeCsv(text: string): TradePayload[] {
  const rows = splitDelimitedRows(text);
  if (rows.length < 2) return [];
  const headers = rows[0].map(normalizeHeader);
  const payloads: TradePayload[] = [];

  rows.slice(1).forEach((cells, index) => {
    const row = Object.fromEntries(headers.map((header, i) => [header, cells[i] ?? ""]));
    const payload = toTradePayload(row, index);
    if (payload) payloads.push(payload);
  });

  return payloads;
}

function payloadToTrade(payload: TradePayload, index: number): TradeRecord {
  return {
    id: payload.external_id || `sync-${index}`,
    externalId: payload.external_id || "",
    date: payload.date,
    market: payload.market,
    instrument: payload.instrument,
    direction: payload.direction,
    entry: payload.entry,
    exit: payload.exit,
    rMultiple: payload.r_multiple,
    percentage: payload.percentage,
    result: payload.result,
    notes: payload.notes,
    screenshot: payload.screenshot ?? "",
    published: payload.published,
  };
}

async function loadTradesFromTransactionCsv(): Promise<TradeRecord[] | null> {
  const url = process.env.TRANSACTION_CSV_URL || process.env.VITE_TRANSACTION_CSV_URL || "";
  if (!url) return null;
  if (
    transactionCsvCache &&
    transactionCsvCache.url === url &&
    Date.now() - transactionCsvCache.at < LIVE_POLL_MS
  ) {
    return transactionCsvCache.trades;
  }

  const res = await fetch(url, { headers: { Accept: "text/csv,text/plain,*/*" } });
  if (!res.ok) throw new Error(`Transaction CSV ${res.status}`);
  const text = await res.text();
  const trades = parseTradeCsv(text)
    .map(payloadToTrade)
    .filter((trade) => trade.published);
  transactionCsvCache = { at: Date.now(), url, trades };
  return trades;
}

/** Single trade by id — admin only. */
export const getTrade = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .validator((input: unknown) => z.object({ id: z.string().min(1) }).parse(input))
  .handler(async ({ data, context }): Promise<TradeRecord> => {
    const ctx = adminContextFromHandler(context);
    await ensureAdminAccess(ctx);
    const db = await loadAdminDb(ctx);
    const { data: row, error } = await db
      .from("trading_results")
      .select("*")
      .eq("id", data.id)
      .maybeSingle();
    if (error) throw new Error(error.message);
    if (!row) throw new Error("Trade not found");
    return tradeFromRow(row as Record<string, unknown>);
  });

/** Journal metrics — admin (all trades). */
export const getJournalMetrics = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }): Promise<JournalMetrics> => {
    const ctx = adminContextFromHandler(context);
    await ensureAdminAccess(ctx);
    const db = await loadAdminDb(ctx);
    const { data: rows, error } = await db
      .from("trading_results")
      .select("*")
      .order("date", { ascending: true });
    if (error) throw new Error(error.message);
    return computeMetrics(
      (rows ?? []).map((r: unknown) => tradeFromRow(r as Record<string, unknown>)),
    );
  });

/** Published journal metrics for the public site. */
export const getPublishedJournalMetrics = createServerFn({ method: "GET" }).handler(
  async (): Promise<JournalMetrics> => {
    try {
      const syncedTrades = await loadTradesFromTransactionCsv();
      if (syncedTrades) return computeMetrics(syncedTrades);

      const supabase = createPublicSupabase();
      const { data, error } = await supabase
        .from("trading_results")
        .select("*")
        .eq("published", true)
        .order("date", { ascending: true });
      if (error) throw new Error(error.message);
      return computeMetrics((data ?? []).map((r) => tradeFromRow(r as Record<string, unknown>)));
    } catch {
      return computeMetrics([]);
    }
  },
);

/** Published trades for the public journal. */
export const listPublishedTrades = createServerFn({ method: "GET" }).handler(
  async (): Promise<TradeRecord[]> => {
    try {
      const syncedTrades = await loadTradesFromTransactionCsv();
      if (syncedTrades) return syncedTrades;

      const supabase = createPublicSupabase();
      const { data, error } = await supabase
        .from("trading_results")
        .select("*")
        .eq("published", true)
        .order("date", { ascending: true });
      if (error) throw new Error(error.message);
      return (data ?? []).map((row) => tradeFromRow(row as Record<string, unknown>));
    } catch {
      return [];
    }
  },
);

export const listAllTrades = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }): Promise<TradeRecord[]> => {
    const ctx = adminContextFromHandler(context);
    await ensureAdminAccess(ctx);
    const db = await loadAdminDb(ctx);
    const { data, error } = await db
      .from("trading_results")
      .select("*")
      .order("date", { ascending: false });
    if (error) throw new Error(error.message);
    return (data ?? []).map((row: Record<string, unknown>) => tradeFromRow(row));
  });

export const saveTrade = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .validator((input: unknown) => tradeSchema.parse(input))
  .handler(async ({ data, context }) => {
    const ctx = adminContextFromHandler(context);
    await ensureAdminAccess(ctx);
    const db = await loadAdminDb(ctx);
    const result =
      data.result || (data.rMultiple > 0 ? "Win" : data.rMultiple < 0 ? "Loss" : "Breakeven");
    const payload = {
      date: data.date || new Date().toISOString().slice(0, 10),
      external_id: data.externalId || null,
      market: data.market,
      instrument: data.instrument,
      direction: data.direction,
      entry: data.entry,
      exit: data.exit,
      r_multiple: data.rMultiple,
      percentage: data.percentage,
      result,
      notes: data.notes,
      screenshot: data.screenshot || null,
      published: data.published,
    };

    if (data.id) {
      const { error } = await db.from("trading_results").update(payload).eq("id", data.id);
      if (error) throw new Error(error.message);
    } else {
      const { error } = await db.from("trading_results").insert(payload);
      if (error) throw new Error(error.message);
    }
    return { ok: true as const };
  });

export const importTradesFromCsv = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .validator((input: unknown) => importTradesSchema.parse(input))
  .handler(async ({ data, context }) => {
    const ctx = adminContextFromHandler(context);
    await ensureAdminAccess(ctx);
    const db = await loadAdminDb(ctx);
    const payloads = parseTradeCsv(data.text);
    if (payloads.length === 0) throw new Error("No valid trade rows found in the uploaded sheet.");

    if (data.replaceExistingSynced) {
      const { error } = await db.from("trading_results").delete().not("external_id", "is", null);
      if (error) throw new Error(error.message);
    }

    const { error } = await db
      .from("trading_results")
      .upsert(payloads as never, { onConflict: "external_id" });
    if (error) throw new Error(error.message);
    return { ok: true as const, imported: payloads.length };
  });

export const deleteTrade = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .validator((input: unknown) => z.object({ id: z.string().min(1) }).parse(input))
  .handler(async ({ data, context }) => {
    const ctx = adminContextFromHandler(context);
    await ensureAdminAccess(ctx);
    const db = await loadAdminDb(ctx);
    const { error } = await db.from("trading_results").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true as const };
  });
