import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { createPublicSupabase } from "@/lib/content.server";
import { adminContextFromHandler, ensureAdminAccess, loadAdminDb } from "@/lib/admin-guard";
export type TradeRecord = {
  id: string;
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

export function computeMetrics(trades: TradeRecord[]): JournalMetrics {
  const sorted = [...trades].sort((a, b) => a.date.localeCompare(b.date) || a.id.localeCompare(b.id));
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

/**
 * Flag-style equity path: pole up → pullback/consolidation → breakout higher.
 * Used when published trades are too few to draw a meaningful curve.
 */
export const SEED_EQUITY_SERIES = [
  0, 1.2, 2.8, 4.1, 6.4, 8.9, 11.2, 13.8, 16.5, 18.2, 20.4, 22.1, 24.8, 26.3, 28.6,
  // consolidation / flag (slight downward drift)
  27.4, 26.1, 25.2, 24.6, 23.8, 23.1, 22.4, 21.9, 21.2, 20.6, 20.1, 19.5, 19.0, 18.6,
  // breakout continuation higher
  20.2, 22.8, 25.6, 28.4, 31.2, 34.8, 38.1, 41.6, 45.2, 48.9, 52.4, 56.1, 60.2, 64.8, 69.4,
];

export function equitySeriesForChart(trades: TradeRecord[]): {
  series: number[];
  endR: number;
  fromSeed: boolean;
} {
  const metrics = computeMetrics(trades);
  const live = metrics.equityCurve.map((p) => p.equity);
  // Need enough points for rise → dip → rise to read on the chart
  if (live.length >= 8) {
    return {
      series: live[0] === 0 ? live : [0, ...live],
      endR: metrics.netPerformanceR,
      fromSeed: false,
    };
  }
  return {
    series: SEED_EQUITY_SERIES,
    endR: SEED_EQUITY_SERIES[SEED_EQUITY_SERIES.length - 1],
    fromSeed: true,
  };
}

const tradeSchema = z.object({
  id: z.string().max(60).optional().default(""),
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
    return computeMetrics((rows ?? []).map((r: unknown) => tradeFromRow(r as Record<string, unknown>)));
  });

/** Published journal metrics for the public site. */
export const getPublishedJournalMetrics = createServerFn({ method: "GET" }).handler(
  async (): Promise<JournalMetrics> => {
    try {
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
      data.result ||
      (data.rMultiple > 0 ? "Win" : data.rMultiple < 0 ? "Loss" : "Breakeven");
    const payload = {
      date: data.date || new Date().toISOString().slice(0, 10),
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
      const { error } = await db
        .from("trading_results")
        .update(payload)
        .eq("id", data.id);
      if (error) throw new Error(error.message);
    } else {
      const { error } = await db.from("trading_results").insert(payload);
      if (error) throw new Error(error.message);
    }
    return { ok: true as const };
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
