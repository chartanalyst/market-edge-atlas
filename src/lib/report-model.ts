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
