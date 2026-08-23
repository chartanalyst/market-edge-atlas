import { Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { ArrowUpRight } from "lucide-react";
import { Reveal, SectionHeading, Stagger, StaggerItem } from "@/components/site/primitives";
import { useSiteContent } from "@/components/site/content-context";
import { listPublishedReports } from "@/lib/reports.functions";
import { liveQueryOptions } from "@/lib/live-poll";

const HOME_REPORT_LIMIT = 3;

export function formatReportDate(value: string) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
}

export function WeeklyReports() {
  const { reports: fallback } = useSiteContent();
  const fetchReports = useServerFn(listPublishedReports);
  const { data: reports = fallback } = useQuery({
    queryKey: ["published-reports"],
    queryFn: () => fetchReports(),
    ...liveQueryOptions,
  });

  const items = reports.length > 0 ? reports : fallback;
  const homepageItems = items.slice(0, HOME_REPORT_LIMIT);

  return (
    <section id="reports" className="scroll-mt-28 border-y border-border bg-surface py-24 lg:py-32">
      <div className="mx-auto w-[min(1320px,94vw)]">
        <SectionHeading
          eyebrow="Weekly reports"
          title="Structured weekly market coverage."
          description="Every week: levels, structure and scenarios across the instruments under coverage — published as a standalone research note."
        />

        <Stagger className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3" gap={0.08}>
          {homepageItems.map((r) => (
            <StaggerItem key={r.slug}>
              <Link
                to="/reports/$slug"
                params={{ slug: r.slug }}
                className="surface-card group flex h-full flex-col p-5 sm:p-6"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="border border-emerald px-2.5 py-1 text-[0.58rem] font-semibold uppercase tracking-widest text-emerald">
                    {r.market}
                  </span>
                  <span className="num text-[0.65rem] text-muted-foreground">
                    {formatReportDate(r.date)}
                  </span>
                </div>

                <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1">
                  {r.asset ? <span className="num text-xs font-semibold">{r.asset}</span> : null}
                  {r.weekLabel ? (
                    <span className="num text-[0.65rem] text-muted-foreground">{r.weekLabel}</span>
                  ) : null}
                </div>

                <h3 className="mt-3 text-pretty font-display text-base font-semibold leading-snug sm:text-lg">
                  {r.title}
                </h3>
                <p className="mt-2.5 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {r.summary}
                </p>

                <span className="mt-5 inline-flex items-center gap-2 border-t border-border pt-4 font-mono text-[0.66rem] uppercase tracking-[0.16em] transition-colors group-hover:text-emerald">
                  Read more
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </span>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>

        {items.length > HOME_REPORT_LIMIT ? (
          <Reveal delay={0.12} className="mt-10 flex justify-center">
            <Link
              to="/reports"
              className="group inline-flex items-center gap-2 border border-border bg-navy px-6 py-3 font-mono text-[0.7rem] uppercase tracking-[0.16em] text-navy-foreground transition-all hover:bg-emerald"
            >
              View more reports
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </Reveal>
        ) : null}

        {items.length === 0 ? (
          <Reveal className="mt-10">
            <p className="text-center text-sm text-muted-foreground">
              Reports will appear here once published from the admin panel.
            </p>
          </Reveal>
        ) : null}
      </div>
    </section>
  );
}
