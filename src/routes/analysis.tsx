import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { ArrowUpRight, Search } from "lucide-react";
import { SectionHeading } from "@/components/site/primitives";
import { useSiteContent } from "@/components/site/content-context";
import { listPublishedAnalyses } from "@/lib/analyses.functions";
import { liveQueryOptions } from "@/lib/live-poll";
import { SITE_NAME } from "@/lib/site-meta";

export const Route = createFileRoute("/analysis")({
  head: () => ({
    meta: [
      { title: `Analysis Library | ${SITE_NAME}` },
      {
        name: "description",
        content: "Browse the full library of published market analysis and chart case studies.",
      },
    ],
  }),
  component: AnalysisLibrary,
});

const filters = ["All", "Crypto", "Forex", "Stocks", "Commodities", "Indices"] as const;

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

  return (
    <main className="pt-36 sm:pt-44">
      <section className="border-b border-border py-16 lg:py-20">
        <div className="mx-auto w-[min(1320px,94vw)]">
          <SectionHeading
            eyebrow="Analysis library"
            title="Browse every published market study."
            description="The homepage stays curated. This page scales for the full research archive as new charts are uploaded from the admin panel."
          />

          <div className="mt-10 grid gap-4 lg:grid-cols-[1fr_auto] lg:items-center">
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

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((item) => (
              <Link
                key={item.slug}
                to="/analysis/$slug"
                params={{ slug: item.slug }}
                className="surface-card group flex h-full flex-col overflow-hidden"
              >
                {item.coverImage ? (
                  <img
                    src={item.coverImage}
                    alt={item.title}
                    className="h-44 w-full object-cover"
                    loading="lazy"
                  />
                ) : (
                  <div className="grid h-44 place-items-center bg-surface">
                    <span className="num text-sm font-semibold text-muted-foreground">
                      {item.pair}
                    </span>
                  </div>
                )}
                <div className="flex flex-1 flex-col p-5">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="border border-emerald px-2.5 py-1 text-[0.58rem] font-semibold uppercase tracking-widest text-emerald">
                      {item.market}
                    </span>
                    <span className="num text-[0.65rem] text-muted-foreground">
                      {item.timeframe}
                    </span>
                  </div>
                  <h2 className="mt-4 text-pretty font-display text-lg font-semibold leading-snug">
                    {item.title}
                  </h2>
                  <p className="mt-2.5 line-clamp-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {item.summary}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-2 border-t border-border pt-4 font-mono text-[0.66rem] uppercase tracking-[0.16em] transition-colors group-hover:text-emerald">
                    Read study
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>

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
