import { analyses as staticAnalyses } from "@/lib/site-data";
import dummyAnalyses from "@/lib/dummy-analyses.json";

export type Level = { label: string; value: string };

export type AnalysisRecord = {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  market: string;
  category: string;
  pair: string;
  timeframe: string;
  date: string;
  summary: string;
  description: string;
  bias: string;
  marketStructure: string;
  invalidation: string;
  outcome: string;
  rr: string;
  tags: string[];
  series: number[];
  thesis: string[];
  targets: Level[];
  coverImage: string;
  gallery: string[];
  tradingviewUrl: string;
  pdfUrl: string;
  featured: boolean;
  published: boolean;
  sortOrder: number;
};

export const marketOptions = ["Crypto", "Forex", "Stocks", "Commodities", "Indices"] as const;

const asStringList = (value: unknown): string[] =>
  Array.isArray(value) ? value.filter((v): v is string => typeof v === "string") : [];

const asNumberList = (value: unknown): number[] =>
  Array.isArray(value) ? value.map(Number).filter((n) => !Number.isNaN(n)) : [];

const asLevels = (value: unknown): Level[] =>
  Array.isArray(value)
    ? value
        .filter((v): v is Record<string, unknown> => typeof v === "object" && v !== null)
        .map((v) => ({ label: String(v.label ?? ""), value: String(v.value ?? "") }))
    : [];

/** Maps a database row onto the shape the site components consume. */
export function analysisFromRow(row: Record<string, unknown>): AnalysisRecord {
  return {
    id: String(row.id ?? ""),
    slug: String(row.slug ?? ""),
    title: String(row.title ?? ""),
    subtitle: String(row.subtitle ?? ""),
    market: String(row.market ?? "Crypto"),
    category: String(row.category ?? ""),
    pair: String(row.pair ?? ""),
    timeframe: String(row.timeframe ?? ""),
    date: String(row.date ?? "").slice(0, 10),
    summary: String(row.summary ?? ""),
    description: String(row.description ?? ""),
    bias: String(row.bias ?? ""),
    marketStructure: String(row.market_structure ?? ""),
    invalidation: String(row.invalidation ?? ""),
    outcome: String(row.outcome ?? ""),
    rr: String(row.rr ?? ""),
    tags: asStringList(row.tags),
    series: asNumberList(row.series),
    thesis: asStringList(row.thesis),
    targets: asLevels(row.targets),
    coverImage: String(row.cover_image ?? ""),
    gallery: asStringList(row.gallery),
    tradingviewUrl: String(row.tradingview_url ?? ""),
    pdfUrl: String(row.pdf_url ?? ""),
    featured: Boolean(row.featured),
    published: Boolean(row.published),
    sortOrder: Number(row.sort_order ?? 0),
  };
}

/** Maps the editable record back onto a database payload. */
export function analysisToRow(record: AnalysisRecord) {
  return {
    slug: record.slug,
    title: record.title,
    subtitle: record.subtitle,
    market: record.market,
    category: record.category,
    pair: record.pair,
    timeframe: record.timeframe,
    date: record.date || new Date().toISOString().slice(0, 10),
    summary: record.summary,
    description: record.description,
    bias: record.bias,
    market_structure: record.marketStructure,
    invalidation: record.invalidation,
    outcome: record.outcome,
    rr: record.rr,
    tags: record.tags,
    series: record.series,
    thesis: record.thesis,
    targets: record.targets,
    cover_image: record.coverImage || null,
    gallery: record.gallery,
    tradingview_url: record.tradingviewUrl || null,
    pdf_url: record.pdfUrl || null,
    featured: record.featured,
    published: record.published,
    sort_order: record.sortOrder,
  };
}

export function emptyAnalysis(): AnalysisRecord {
  return {
    id: "",
    slug: "",
    title: "",
    subtitle: "",
    market: "Crypto",
    category: "Market structure",
    pair: "",
    timeframe: "",
    date: new Date().toISOString().slice(0, 10),
    summary: "",
    description: "",
    bias: "",
    marketStructure: "",
    invalidation: "",
    outcome: "",
    rr: "",
    tags: [],
    series: [20, 26, 24, 32, 38, 35, 46, 52, 49, 60, 68],
    thesis: [],
    targets: [],
    coverImage: "",
    gallery: [],
    tradingviewUrl: "",
    pdfUrl: "",
    featured: false,
    published: false,
    sortOrder: 0,
  };
}

/** Shipped case studies, used until the database has rows of its own. */
export const defaultAnalysisRecords: AnalysisRecord[] = staticAnalyses.map((a, i) => ({
  ...emptyAnalysis(),
  id: a.slug,
  slug: a.slug,
  title: a.title,
  market: a.market,
  category: "Case study",
  pair: a.pair,
  timeframe: a.timeframe,
  date: a.date,
  summary: a.summary,
  description: a.summary,
  invalidation: a.invalidation,
  outcome: a.outcome,
  rr: a.rr,
  series: a.series,
  thesis: a.thesis,
  targets: a.levels,
  tags: [a.market, a.pair],
  featured: i < 2,
  published: true,
  sortOrder: i,
}));

export const dummyAnalysisRecords: AnalysisRecord[] = (dummyAnalyses as AnalysisRecord[]).map(
  (item) => ({
    ...emptyAnalysis(),
    ...item,
    published: true,
  }),
);

export function withDummyAnalyses(list: AnalysisRecord[], minimum = 120): AnalysisRecord[] {
  const bySlug = new Map(list.map((item) => [item.slug, item]));
  for (const item of dummyAnalysisRecords) {
    if (bySlug.size >= minimum) break;
    if (!bySlug.has(item.slug)) bySlug.set(item.slug, item);
  }
  return [...bySlug.values()];
}

export function sortAnalyses(list: AnalysisRecord[]): AnalysisRecord[] {
  return [...list].sort((a, b) => {
    if (a.featured !== b.featured) return a.featured ? -1 : 1;
    if (a.sortOrder !== b.sortOrder) return a.sortOrder - b.sortOrder;
    return b.date.localeCompare(a.date);
  });
}
