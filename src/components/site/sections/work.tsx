import { useMemo, useState } from "react";

import { Link } from "@tanstack/react-router";

import { useQuery } from "@tanstack/react-query";

import { useServerFn } from "@tanstack/react-start";

import { motion } from "motion/react";
import { ArrowUpRight, Search } from "lucide-react";

import { AreaChart } from "@/components/site/charts";

import { Reveal, SectionHeading, revealVariants } from "@/components/site/primitives";

import { useSiteContent } from "@/components/site/content-context";

import { listPublishedAnalyses } from "@/lib/analyses.functions";
import type { AnalysisRecord } from "@/lib/analysis-model";
import { getChartForPair, useMarketCharts } from "@/hooks/use-market-charts";
import { FeaturedAnalysisGridSkeleton } from "@/components/site/skeletons";
import { liveQueryOptions } from "@/lib/live-poll";

import { cn } from "@/lib/utils";

const filters = ["All", "Crypto", "Forex", "Stocks", "Commodities", "Indices"] as const;
const HOME_ANALYSIS_LIMIT = 6;

function AnalysisCardChart({
  analysis,
  liveSeries,
  chartKey,
  livePrice,
  liveChange,
  liveUp,
}: {
  analysis: AnalysisRecord;
  liveSeries?: number[];
  chartKey: string;
  livePrice?: string;
  liveChange?: string;
  liveUp?: boolean;
}) {
  const series = liveSeries && liveSeries.length > 1 ? liveSeries : analysis.series;
  const height = 72;

  return (
    <div className="relative overflow-hidden bg-surface p-3.5 sm:p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <span className="num text-xs font-semibold">{analysis.pair}</span>
          {livePrice ? (
            <p className="num mt-1 text-sm font-semibold">
              {livePrice}{" "}
              {liveChange ? (
                <span className={liveUp ? "text-emerald" : "text-destructive"}>{liveChange}</span>
              ) : null}
            </p>
          ) : null}
        </div>
        <span className="shrink-0 border border-emerald bg-transparent px-2.5 py-1 text-[0.6rem] font-semibold uppercase tracking-widest text-emerald">
          {analysis.market}
        </span>
      </div>
      <div className="mt-2.5 transition-transform duration-700 group-hover:scale-[1.02]">
        {analysis.coverImage ? (
          <img
            src={analysis.coverImage}
            alt={analysis.title}
            className="h-[72px] w-full object-cover"
            loading="lazy"
          />
        ) : (
          <AreaChart series={series} height={height} accent="blue" chartKey={chartKey} />
        )}
      </div>
    </div>
  );
}

export function FeaturedAnalysis() {
  const { analyses: fallbackAnalyses } = useSiteContent();

  const fetchAnalyses = useServerFn(listPublishedAnalyses);

  const {
    data: analyses = fallbackAnalyses,
    isLoading,
    isFetched,
  } = useQuery({
    queryKey: ["published-analyses"],
    queryFn: () => fetchAnalyses(),
    ...liveQueryOptions,
  });

  const [filter, setFilter] = useState<(typeof filters)[number]>("All");

  const [query, setQuery] = useState("");

  const visible = useMemo(
    () =>
      analyses.filter((a) => {
        const matchFilter = filter === "All" || a.market === filter;

        const q = query.trim().toLowerCase();

        const matchQuery =
          !q ||
          a.title.toLowerCase().includes(q) ||
          a.pair.toLowerCase().includes(q) ||
          a.summary.toLowerCase().includes(q) ||
          a.market.toLowerCase().includes(q);

        return matchFilter && matchQuery;
      }),

    [analyses, filter, query],
  );

  const homepageItems = useMemo(() => visible.slice(0, HOME_ANALYSIS_LIMIT), [visible]);
  const pairs = useMemo(() => homepageItems.map((a) => a.pair), [homepageItems]);

  const { charts } = useMarketCharts(pairs);

  return (
    <section id="featured" className="scroll-mt-28 py-24 lg:py-32">
      <div className="mx-auto w-[min(1320px,94vw)]">
        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <SectionHeading
            eyebrow="Featured analysis"

            title="Published case studies, thesis to outcome."

            description="A selection of documented ideas across markets. Each includes the original structure read, the invalidation level and the realised result in risk multiples."
          />

          <Reveal delay={0.1} className="lg:pb-2">
            <label className="flex items-center gap-2 border border-border bg-card px-4 py-2.5">
              <Search className="h-4 w-4 shrink-0 text-muted-foreground" />

              <input
                value={query}

                onChange={(e) => setQuery(e.target.value)}

                placeholder="Search analysis…"

                aria-label="Search analysis"

                className="w-44 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
              />
            </label>
          </Reveal>
        </div>

        <Reveal delay={0.12} className="mt-10 flex flex-wrap gap-2">
          {filters.map((f) => (
            <button
              key={f}

              onClick={() => setFilter(f)}

              className={cn(
                "border px-4 py-2 text-xs font-semibold transition-all",

                filter === f
                  ? "border-navy bg-navy text-navy-foreground"
                  : "border-hairline text-muted-foreground hover:border-emerald hover:text-emerald",
              )}
            >
              {f}
            </button>
          ))}
        </Reveal>

        {isLoading && !isFetched ? (
          <FeaturedAnalysisGridSkeleton />
        ) : visible.length === 0 ? (
          <p className="mt-12 text-center text-sm text-muted-foreground">
            No analysis matches that filter yet.
          </p>
        ) : (
          <motion.div
            key={`${filter}-${query.trim().toLowerCase()}`}
            className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
            initial="hidden"
            animate="show"
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06 } } }}
          >
            {homepageItems.map((a) => {
              const live = getChartForPair(charts, a.pair);
              const chartKey = a.slug;

              return (
                <motion.div key={a.slug} variants={revealVariants}>
                  <Link
                    to="/analysis/$slug"
                    params={{ slug: a.slug }}
                    className="surface-card group flex h-full flex-col overflow-hidden"
                  >
                    <AnalysisCardChart
                      analysis={a}
                      liveSeries={live?.prices}
                      chartKey={chartKey}
                      livePrice={live?.price}
                      liveChange={live?.change}
                      liveUp={live?.up}
                    />

                    <div className="flex flex-1 flex-col p-4 sm:p-5">
                      <p className="eyebrow text-[0.58rem]">{a.timeframe}</p>
                      <h3 className="mt-2 text-pretty font-display text-base font-semibold leading-snug">
                        {a.title}
                      </h3>
                      <p className="mt-2 line-clamp-3 flex-1 text-xs leading-relaxed text-muted-foreground sm:text-sm">
                        {a.summary}
                      </p>
                      <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-border pt-3.5">
                        <div>
                          <p className="eyebrow text-[0.55rem]">Outcome</p>
                          <p className="num mt-0.5 text-xs font-semibold text-emerald">
                            {a.outcome}
                          </p>
                        </div>
                        <span className="inline-flex items-center gap-1 text-xs font-semibold transition-colors group-hover:text-emerald">
                          Read more
                          <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        )}

        {visible.length > HOME_ANALYSIS_LIMIT ? (
          <Reveal delay={0.12} className="mt-10 flex justify-center">
            <Link
              to="/analysis"
              className="group inline-flex items-center gap-2 border border-border bg-navy px-6 py-3 font-mono text-[0.7rem] uppercase tracking-[0.16em] text-navy-foreground transition-all hover:bg-emerald"
            >
              View more analysis
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </Reveal>
        ) : null}
      </div>
    </section>
  );
}
