import dummyReports from "@/lib/dummy-reports.json";

export type ReportRecord = {
  id: string;
  slug: string;
  title: string;
  weekLabel: string;
  asset: string;
  market: string;
  date: string;
  summary: string;
  body: string;
  coverImage: string;
  gallery: string[];
  pdfUrl: string;
  tradingviewUrl: string;
  tags: string[];
  published: boolean;
  sortOrder: number;
};

const asStringList = (value: unknown): string[] =>
  Array.isArray(value) ? value.filter((v): v is string => typeof v === "string") : [];

/** Maps a weekly_reports row onto the shape the site components consume. */
export function reportFromRow(row: Record<string, unknown>): ReportRecord {
  return {
    id: String(row.id ?? ""),
    slug: String(row.slug ?? ""),
    title: String(row.title ?? ""),
    weekLabel: String(row.week_label ?? ""),
    asset: String(row.asset ?? ""),
    market: String(row.market ?? "Crypto"),
    date: String(row.date ?? "").slice(0, 10),
    summary: String(row.summary ?? ""),
    body: String(row.body ?? ""),
    coverImage: String(row.cover_image ?? ""),
    gallery: asStringList(row.gallery),
    pdfUrl: String(row.pdf_url ?? ""),
    tradingviewUrl: String(row.tradingview_url ?? ""),
    tags: asStringList(row.tags),
    published: Boolean(row.published),
    sortOrder: Number(row.sort_order ?? 0),
  };
}

export function emptyReport(): ReportRecord {
  return {
    id: "",
    slug: "",
    title: "",
    weekLabel: "",
    asset: "",
    market: "Crypto",
    date: new Date().toISOString().slice(0, 10),
    summary: "",
    body: "",
    coverImage: "",
    gallery: [],
    pdfUrl: "",
    tradingviewUrl: "",
    tags: [],
    published: false,
    sortOrder: 0,
  };
}

export function sortReports(items: ReportRecord[]): ReportRecord[] {
  return [...items].sort(
    (a, b) => a.sortOrder - b.sortOrder || (a.date < b.date ? 1 : a.date > b.date ? -1 : 0),
  );
}

export const dummyReportRecords: ReportRecord[] = (dummyReports as ReportRecord[]).map((item) => ({
  ...emptyReport(),
  ...item,
  published: true,
}));

export function withDummyReports(items: ReportRecord[], minimum = 72): ReportRecord[] {
  const seen = new Set(items.map((item) => item.slug));
  const needed = Math.max(0, minimum - items.length);
  const fillers = dummyReportRecords.filter((item) => !seen.has(item.slug)).slice(0, needed);

  return [...items, ...fillers];
}

/** Fallback weekly reports when the database has none yet. */
export const defaultReportRecords: ReportRecord[] = [
  {
    id: "btc-weekly-structure",
    slug: "btc-weekly-structure",
    title: "Bitcoin weekly structure: range high pressure",
    weekLabel: "Week 30 · 2026",
    asset: "BTC / USD",
    market: "Crypto",
    date: "2026-07-21",
    summary:
      "Weekly close tested prior range highs with declining participation. Key levels and invalidation for the week ahead.",
    body: "Weekly structure remains constructive while price presses into prior range highs. Watch acceptance above the weekly high for continuation, or a rejection candle for a rotation back into equilibrium.",
    coverImage: "",
    gallery: [],
    pdfUrl: "",
    tradingviewUrl: "",
    tags: ["Crypto", "BTC/USD", "Weekly"],
    published: true,
    sortOrder: 0,
  },
  {
    id: "fx-majors-weekly",
    slug: "fx-majors-weekly",
    title: "FX majors: dollar strength and session levels",
    weekLabel: "Week 29 · 2026",
    asset: "EUR / USD · GBP / USD",
    market: "Forex",
    date: "2026-07-14",
    summary:
      "Dollar bid into the London open reshaped majors. Mapped liquidity pools and the weekly decision levels.",
    body: "EUR and GBP both swept overnight highs before reversing into discount. The weekly plan centres on reclaim levels into New York and the invalidation for dollar continuation.",
    coverImage: "",
    gallery: [],
    pdfUrl: "",
    tradingviewUrl: "",
    tags: ["Forex", "EUR/USD", "GBP/USD"],
    published: true,
    sortOrder: 1,
  },
  {
    id: "indices-commodities-weekly",
    slug: "indices-commodities-weekly",
    title: "Indices & commodities: breadth and gold structure",
    weekLabel: "Week 28 · 2026",
    asset: "NAS100 · XAU / USD",
    market: "Indices",
    date: "2026-07-07",
    summary:
      "Index breadth deteriorated into the macro print while gold held daily demand. Scenarios for both books.",
    body: "NAS100 rejected range highs with weaker internals. Gold defended the daily demand block. This note covers scenarios, levels and risk for the week.",
    coverImage: "",
    gallery: [],
    pdfUrl: "",
    tradingviewUrl: "",
    tags: ["Indices", "Commodities", "NAS100", "XAU"],
    published: true,
    sortOrder: 2,
  },
];
