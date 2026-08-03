import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { createPublicSupabase } from "@/lib/content.server";

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

async function assertAdmin(context: { supabase: any; userId: string }) {
  const { data: isAdmin } = await context.supabase.rpc("has_role", {
    _user_id: context.userId,
    _role: "admin",
  });
  if (!isAdmin) throw new Error("Forbidden");
}

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
    await assertAdmin(context);
    const { data, error } = await context.supabase
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
    await assertAdmin(context);
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
      const { error } = await context.supabase
        .from("trading_results")
        .update(payload)
        .eq("id", data.id);
      if (error) throw new Error(error.message);
    } else {
      const { error } = await context.supabase.from("trading_results").insert(payload);
      if (error) throw new Error(error.message);
    }
    return { ok: true as const };
  });

export const deleteTrade = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .validator((input: unknown) => z.object({ id: z.string().min(1) }).parse(input))
  .handler(async ({ data, context }) => {
    await assertAdmin(context);
    const { error } = await context.supabase.from("trading_results").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true as const };
  });
