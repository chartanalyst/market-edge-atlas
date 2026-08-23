import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { ArrowUpRight, Search } from "lucide-react";
import { SectionHeading } from "@/components/site/primitives";
import { useSiteContent } from "@/components/site/content-context";
import { formatReportDate } from "@/components/site/sections/reports";
import { listPublishedReports } from "@/lib/reports.functions";
import { liveQueryOptions } from "@/lib/live-poll";
import { SITE_NAME } from "@/lib/site-meta";

export const Route = createFileRoute("/reports")({
  head: () => ({
    meta: [
      { title: `Weekly Reports | ${SITE_NAME}` },
      {
        name: "description",
        content: "Browse all published weekly market reports and research notes.",
      },
    ],
  }),
  component: ReportsLibrary,
});

function ReportsLibrary() {
  const { reports: fallback } = useSiteContent();
  const fetchReports = useServerFn(listPublishedReports);
  const { data: reports = fallback } = useQuery({
    queryKey: ["published-reports"],
    queryFn: () => fetchReports(),
    ...liveQueryOptions,
  });
  const [query, setQuery] = useState("");

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return reports.filter(
      (item) =>
        !q ||
        item.title.toLowerCase().includes(q) ||
        item.market.toLowerCase().includes(q) ||
        item.asset.toLowerCase().includes(q) ||
        item.summary.toLowerCase().includes(q),
    );
  }, [reports, query]);

  return (
    <main className="pt-36 sm:pt-44">
      <section className="border-b border-border py-16 lg:py-20">
        <div className="mx-auto w-[min(1320px,94vw)]">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
            <SectionHeading
              eyebrow="Weekly reports"
              title="Complete weekly report archive."
              description="All published notes live here, while the homepage only highlights the newest or selected reports."
            />
            <label className="flex items-center gap-2 border border-border bg-card px-4 py-2.5">
              <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search reports..."
                aria-label="Search all reports"
                className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground lg:w-56"
              />
            </label>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {visible.map((item) => (
              <Link
                key={item.slug}
                to="/reports/$slug"
                params={{ slug: item.slug }}
                className="surface-card group flex h-full flex-col p-5 sm:p-6"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="border border-emerald px-2.5 py-1 text-[0.58rem] font-semibold uppercase tracking-widest text-emerald">
                    {item.market}
                  </span>
                  <span className="num text-[0.65rem] text-muted-foreground">
                    {formatReportDate(item.date)}
                  </span>
                </div>
                <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1">
                  {item.asset ? (
                    <span className="num text-xs font-semibold">{item.asset}</span>
                  ) : null}
                  {item.weekLabel ? (
                    <span className="num text-[0.65rem] text-muted-foreground">
                      {item.weekLabel}
                    </span>
                  ) : null}
                </div>
                <h2 className="mt-3 text-pretty font-display text-lg font-semibold leading-snug">
                  {item.title}
                </h2>
                <p className="mt-2.5 line-clamp-4 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {item.summary}
                </p>
                <span className="mt-5 inline-flex items-center gap-2 border-t border-border pt-4 font-mono text-[0.66rem] uppercase tracking-[0.16em] transition-colors group-hover:text-emerald">
                  Read report
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </span>
              </Link>
            ))}
          </div>

          {visible.length === 0 ? (
            <p className="mt-12 text-center text-sm text-muted-foreground">
              No reports match that search yet.
            </p>
          ) : null}
        </div>
      </section>
    </main>
  );
}
