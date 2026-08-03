import { createPublicSupabase } from "@/lib/content.server";

/** Trimmed row shapes handed to the model — keeps tool output compact. */
type ResearchHit = {
  kind: "analysis" | "weekly-report";
  title: string;
  url: string;
  market: string;
  asset: string;
  date: string;
  timeframe?: string;
  bias?: string;
  summary: string;
  marketStructure?: string;
  invalidation?: string;
  targets?: { label: string; value: string }[];
  outcome?: string;
  rr?: string;
  tags: string[];
  hasPdf: boolean;
  tradingviewUrl: string;
};

const clip = (value: unknown, max = 700) => String(value ?? "").slice(0, max);
const list = (value: unknown): string[] =>
  Array.isArray(value) ? value.filter((v): v is string => typeof v === "string") : [];

/** Keyword search across published analyses and weekly reports. */
export async function searchResearch(query: string, market?: string, limit = 6) {
  const supabase = createPublicSupabase();
  const term = query.trim();
  const like = `%${term}%`;
  const filter = `title.ilike.${like},summary.ilike.${like},pair.ilike.${like},tags.cs.{${term}}`;

  let analyses = supabase.from("analyses").select("*").eq("published", true);
  let reports = supabase.from("weekly_reports").select("*").eq("published", true);
  if (term) {
    analyses = analyses.or(filter);
    reports = reports.or(
      `title.ilike.${like},summary.ilike.${like},asset.ilike.${like},body.ilike.${like}`,
    );
  }
  if (market) {
    analyses = analyses.ilike("market", market);
    reports = reports.ilike("market", market);
  }

  const [a, r] = await Promise.all([
    analyses.order("date", { ascending: false }).limit(limit),
    reports.order("date", { ascending: false }).limit(limit),
  ]);

  const hits: ResearchHit[] = [];
  for (const row of (a.data ?? []) as Record<string, unknown>[]) {
    hits.push({
      kind: "analysis",
      title: clip(row.title, 200),
      url: `/analysis/${String(row.slug ?? "")}`,
      market: clip(row.market, 40),
      asset: clip(row.pair, 60),
      date: String(row.date ?? "").slice(0, 10),
      timeframe: clip(row.timeframe, 80),
      bias: clip(row.bias, 200),
      summary: clip(row.summary || row.description),
      marketStructure: clip(row.market_structure, 600),
      invalidation: clip(row.invalidation, 300),
      targets: Array.isArray(row.targets)
        ? (row.targets as Record<string, unknown>[]).slice(0, 6).map((t) => ({
            label: clip(t?.label, 60),
            value: clip(t?.value, 60),
          }))
        : [],
      outcome: clip(row.outcome, 120),
      rr: clip(row.rr, 40),
      tags: list(row.tags).slice(0, 8),
      hasPdf: Boolean(row.pdf_url),
      tradingviewUrl: clip(row.tradingview_url, 300),
    });
  }
  for (const row of (r.data ?? []) as Record<string, unknown>[]) {
    hits.push({
      kind: "weekly-report",
      title: clip(row.title, 200),
      url: `/reports/${String(row.slug ?? "")}`,
      market: clip(row.market, 40),
      asset: clip(row.asset, 60),
      date: String(row.date ?? "").slice(0, 10),
      summary: clip(row.summary || row.body, 900),
      tags: list(row.tags).slice(0, 8),
      hasPdf: Boolean(row.pdf_url),
      tradingviewUrl: clip(row.tradingview_url, 300),
    });
  }

  return { count: hits.length, results: hits };
}

/** Published trading results plus derived KPIs, matching the site dashboard. */
export async function getPerformance(limit = 12) {
  const supabase = createPublicSupabase();
  const { data } = await supabase
    .from("trading_results")
    .select("*")
    .eq("published", true)
    .order("date", { ascending: false })
    .limit(200);

  const rows = ((data ?? []) as Record<string, unknown>[]).map((row) => ({
    date: String(row.date ?? "").slice(0, 10),
    market: clip(row.market, 40),
    instrument: clip(row.instrument, 60),
    direction: clip(row.direction, 20),
    entry: clip(row.entry, 40),
    exit: clip(row.exit, 40),
    r: Number(row.r_multiple ?? 0),
    percentage: Number(row.percentage ?? 0),
    result: clip(row.result, 20),
    notes: clip(row.notes, 200),
  }));

  const wins = rows.filter((t) => t.result.toLowerCase() === "win").length;
  const totalR = rows.reduce((sum, t) => sum + t.r, 0);

  return {
    totalTrades: rows.length,
    wins,
    losses: rows.length - wins,
    winRate: rows.length ? Number(((wins / rows.length) * 100).toFixed(1)) : 0,
    totalR: Number(totalR.toFixed(2)),
    averageR: rows.length ? Number((totalR / rows.length).toFixed(2)) : 0,
    recentTrades: rows.slice(0, limit),
  };
}

/**
 * Editable site content: copy, services, markets, process, FAQ, certifications,
 * testimonials, KPIs and social links — exactly what the dashboard manages.
 */
export async function getSiteInfo(topics?: string[]) {
  const supabase = createPublicSupabase();
  const { data } = await supabase.from("site_content").select("key, data");
  const merged = mergeSiteContent((data ?? []) as { key: string; data: unknown }[]) as unknown as Record<
    string,
    unknown
  >;
  const wanted = topics?.length ? topics : Object.keys(merged);

  const out: Record<string, unknown> = {};
  for (const key of wanted) {
    if (key === "analyses" || key === "reports") continue;
    if (merged[key] !== undefined) out[key] = merged[key];
  }
  return out;
}

