import { useEffect, useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { ArrowLeft, ArrowRight, Search } from "lucide-react";
import { motion } from "motion/react";
import { AreaChart } from "@/components/site/charts";
import { SectionHeading } from "@/components/site/primitives";
import { useSiteContent } from "@/components/site/content-context";
import type { AnalysisRecord } from "@/lib/analysis-model";
import { listPublishedAnalyses } from "@/lib/analyses.functions";
import { getChartForPair, useMarketCharts } from "@/hooks/use-market-charts";
import { liveQueryOptions } from "@/lib/live-poll";
import { absoluteUrl, SITE_IMAGE, SITE_NAME } from "@/lib/site-meta";

export const Route = createFileRoute("/analysis")({
  head: () => ({
    meta: [
      { title: `Analysis Library | ${SITE_NAME}` },
      {
        name: "description",
        content: "Browse the full library of published market analysis and chart case studies.",
      },
      { property: "og:title", content: `Analysis Library | ${SITE_NAME}` },
      {
        property: "og:description",
        content: "Browse the full library of published market analysis and chart case studies.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: absoluteUrl("/analysis") },
      { property: "og:image", content: SITE_IMAGE },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: SITE_IMAGE },
    ],
    links: [{ rel: "canonical", href: absoluteUrl("/analysis") }],
  }),
  component: AnalysisLibrary,
});

const filters = ["All", "Crypto", "Forex", "Stocks", "Commodities", "Indices"] as const;
const PAGE_SIZE = 12;

function isImageSource(src: string) {
  const value = src.trim();

  return (
    value.startsWith("http://") ||
    value.startsWith("https://") ||
    value.startsWith("/") ||
    value.startsWith("data:image/") ||
    value.startsWith("blob:")
  );
}

function fallbackQuote(analysis: AnalysisRecord) {
  const series = analysis.series;
  const last = series.at(-1) ?? 0;
  const prev = series.at(-2) ?? last;
  const change = prev === 0 ? 0 : ((last - prev) / Math.abs(prev)) * 100;
  const price =
    analysis.market === "Forex"
      ? (last / 50 + 0.8).toFixed(2)
      : last >= 100
        ? last.toLocaleString(undefined, { maximumFractionDigits: 0 })
        : last.toFixed(2);

  return {
    price,
    change: `${change >= 0 ? "+" : ""}${change.toFixed(2)}%`,
    up: change >= 0,
  };
}

function AnalysisChartVisual({ analysis, series }: { analysis: AnalysisRecord; series: number[] }) {
  const [imageFailed, setImageFailed] = useState(false);
  const coverImage = analysis.coverImage.trim();
  const shouldUseImage = coverImage && isImageSource(coverImage) && !imageFailed;

  if (shouldUseImage) {
    return (
      <img
        src={coverImage}
        alt={analysis.title}
        className="h-[150px] w-full object-cover"
        loading="lazy"
        onError={() => setImageFailed(true)}
      />
    );
  }

  return (
    <AreaChart
      series={series}
      height={150}
      accent="blue"
      chartKey={`library-${analysis.slug}`}
      className="h-[150px]"
    />
  );
}

function AnalysisChartHeader({
  analysis,
  liveSeries,
  livePrice,
  liveChange,
  liveUp,
}: {
  analysis: AnalysisRecord;
  liveSeries?: number[];
  livePrice?: string;
  liveChange?: string;
  liveUp?: boolean;
}) {
  const fallback = fallbackQuote(analysis);
  const series = liveSeries && liveSeries.length > 1 ? liveSeries : analysis.series;
  const price = livePrice ?? fallback.price;
  const change = liveChange ?? fallback.change;
  const up = liveUp ?? fallback.up;

  return (
    <div className="relative overflow-hidden bg-surface p-5 sm:p-6">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="num text-sm font-semibold text-foreground">{analysis.pair}</p>
          <p className="num mt-3 text-2xl font-semibold">
            {price} <span className={up ? "text-emerald" : "text-destructive"}>{change}</span>
          </p>
        </div>
        <span className="shrink-0 border border-emerald px-4 py-2 text-[0.66rem] font-semibold uppercase tracking-[0.18em] text-emerald">
          {analysis.market}
        </span>
      </div>

      <div className="mt-7 transition-transform duration-700 group-hover:scale-[1.015]">
        <AnalysisChartVisual analysis={analysis} series={series} />
      </div>
    </div>
  );
}

function AnalysisLibrary() {
  const { analyses: fallback } = useSiteContent();
  const fetchAnalyses = useServerFn(listPublishedAnalyses);
  const { data: analyses = fallback } = useQuery({
    queryKey: ["published-analyses"],
    queryFn: () => fetchAnalyses(),
    ...liveQueryOptions,
  });
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return analyses.filter((item) => {
      const matchesFilter = filter === "All" || item.market === filter;
      const matchesQuery =
        !q ||
        item.title.toLowerCase().includes(q) ||
        item.pair.toLowerCase().includes(q) ||
        item.market.toLowerCase().includes(q) ||
        item.summary.toLowerCase().includes(q);
      return matchesFilter && matchesQuery;
    });
  }, [analyses, filter, query]);
  const totalPages = Math.max(1, Math.ceil(visible.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const pagedItems = useMemo(
    () => visible.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE),
    [visible, currentPage],
  );
  const pairs = useMemo(() => pagedItems.map((item) => item.pair), [pagedItems]);
  const { charts } = useMarketCharts(pairs);
  const pageNumbers = useMemo(() => {
    const start = Math.max(1, Math.min(currentPage - 2, totalPages - 4));
    return Array.from({ length: Math.min(5, totalPages) }, (_, i) => start + i);
  }, [currentPage, totalPages]);

  useEffect(() => {
    setPage(1);
  }, [filter, query]);

  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [page, totalPages]);

  return (
    <main className="pt-36 sm:pt-44">
      <section className="border-b border-border py-16 lg:py-20">
        <div className="mx-auto w-[min(1320px,94vw)]">
          <SectionHeading
            eyebrow="Analysis library"
            title="Browse every published market study."
            description="The homepage stays curated. This page renders the full 100+ analysis archive with pagination, filters, search and readable details in one place."
          />

          <div className="mt-10 grid gap-4 border border-border bg-card p-4 lg:grid-cols-[1fr_auto] lg:items-center">
            <div className="flex flex-wrap gap-2">
              {filters.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setFilter(item)}
                  className={
                    filter === item
                      ? "border border-navy bg-navy px-4 py-2 text-xs font-semibold text-navy-foreground"
                      : "border border-hairline px-4 py-2 text-xs font-semibold text-muted-foreground transition-colors hover:border-emerald hover:text-emerald"
                  }
                >
                  {item}
                </button>
              ))}
            </div>
            <label className="flex items-center gap-2 border border-border bg-card px-4 py-2.5">
              <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search analysis..."
                aria-label="Search all analysis"
                className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground lg:w-56"
              />
            </label>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            <div className="border border-border bg-surface p-4">
              <p className="eyebrow text-[0.58rem]">Rendered analyses</p>
              <p className="num mt-2 text-2xl font-semibold">{visible.length}</p>
            </div>
            <div className="border border-border bg-surface p-4">
              <p className="eyebrow text-[0.58rem]">Current page</p>
              <p className="num mt-2 text-2xl font-semibold">
                {currentPage}/{totalPages}
              </p>
            </div>
            <div className="border border-border bg-surface p-4">
              <p className="eyebrow text-[0.58rem]">Per page</p>
              <p className="num mt-2 text-2xl font-semibold">{PAGE_SIZE}</p>
            </div>
          </div>

          <motion.div
            key={`${filter}-${query.trim().toLowerCase()}-${currentPage}`}
            className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
            initial="hidden"
            animate="show"
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.045 } } }}
          >
            {pagedItems.map((item) => {
              const live = getChartForPair(charts, item.pair);

              return (
                <motion.div
                  key={item.slug}
                  variants={{
                    hidden: { opacity: 0, y: 14, scale: 0.985 },
                    show: { opacity: 1, y: 0, scale: 1 },
                  }}
                  transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
                >
                  <article className="surface-card group flex h-full flex-col overflow-hidden transition-transform duration-300 hover:-translate-y-1">
                    <AnalysisChartHeader
                      analysis={item}
                      liveSeries={live?.prices}
                      livePrice={live?.price}
                      liveChange={live?.change}
                      liveUp={live?.up}
                    />
                    <div className="flex flex-1 flex-col p-5">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span className="eyebrow text-[0.58rem]">{item.timeframe}</span>
                        <span className="num text-[0.65rem] text-muted-foreground">
                          {item.date}
                        </span>
                      </div>
                      <h2 className="mt-4 text-pretty font-display text-lg font-semibold leading-snug">
                        {item.title}
                      </h2>
                      <div className="mt-3 flex flex-wrap gap-2 text-[0.65rem]">
                        <span className="border border-border bg-surface px-2.5 py-1 font-mono text-muted-foreground">
                          {item.timeframe}
                        </span>
                        <span className="border border-border bg-surface px-2.5 py-1 font-mono text-muted-foreground">
                          {item.rr || "R pending"}
                        </span>
                      </div>
                      <p className="mt-2.5 line-clamp-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                        {item.summary}
                      </p>
                      <div className="mt-5 grid gap-3 border-t border-border pt-4">
                        <div>
                          <p className="eyebrow text-[0.55rem]">Outcome</p>
                          <p className="num mt-1 text-xs font-semibold text-emerald">
                            {item.outcome || "Tracking"}
                          </p>
                        </div>
                        {item.thesis.length > 0 ? (
                          <div>
                            <p className="eyebrow text-[0.55rem]">Key thesis</p>
                            <ul className="mt-2 grid gap-1.5 text-xs leading-relaxed text-muted-foreground">
                              {item.thesis.slice(0, 2).map((point) => (
                                <li key={point} className="grid grid-cols-[auto_1fr] gap-2">
                                  <span className="mt-1.5 h-1 w-1 bg-emerald" aria-hidden />
                                  <span>{point}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ) : null}
                        <div>
                          <p className="eyebrow text-[0.55rem]">Invalidation</p>
                          <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
                            {item.invalidation ||
                              "Invalidation level will be added from admin data."}
                          </p>
                        </div>
                      </div>
                    </div>
                  </article>
                </motion.div>
              );
            })}
          </motion.div>

          {visible.length > PAGE_SIZE ? (
            <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-border pt-6 sm:flex-row">
              <p className="num text-xs text-muted-foreground">
                Page {currentPage} of {totalPages} · Showing{" "}
                {Math.min((currentPage - 1) * PAGE_SIZE + 1, visible.length)}-
                {Math.min(currentPage * PAGE_SIZE, visible.length)} of {visible.length}
              </p>
              <div className="flex flex-wrap items-center justify-center gap-2">
                <button
                  type="button"
                  onClick={() => setPage((value) => Math.max(1, value - 1))}
                  disabled={currentPage === 1}
                  className="inline-flex items-center gap-2 border border-border px-3 py-2 text-xs font-semibold text-muted-foreground transition-colors hover:border-emerald hover:text-emerald disabled:pointer-events-none disabled:opacity-40"
                >
                  <ArrowLeft className="h-3.5 w-3.5" />
                  Previous
                </button>
                {pageNumbers.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setPage(item)}
                    aria-current={item === currentPage ? "page" : undefined}
                    className={
                      item === currentPage
                        ? "h-9 min-w-9 border border-navy bg-navy px-3 text-xs font-semibold text-navy-foreground"
                        : "h-9 min-w-9 border border-border px-3 text-xs font-semibold text-muted-foreground transition-colors hover:border-emerald hover:text-emerald"
                    }
                  >
                    {item}
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() => setPage((value) => Math.min(totalPages, value + 1))}
                  disabled={currentPage === totalPages}
                  className="inline-flex items-center gap-2 border border-border px-3 py-2 text-xs font-semibold text-muted-foreground transition-colors hover:border-emerald hover:text-emerald disabled:pointer-events-none disabled:opacity-40"
                >
                  Next
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          ) : null}

          {visible.length === 0 ? (
            <p className="mt-12 text-center text-sm text-muted-foreground">
              No analysis matches that search yet.
            </p>
          ) : null}
        </div>
      </section>
    </main>
  );
}
