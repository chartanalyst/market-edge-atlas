import { Link } from "@tanstack/react-router";
import { ArrowUpRight, FileText } from "lucide-react";
import { SectionHeading, Stagger, StaggerItem } from "@/components/site/primitives";
import { useSiteContent } from "@/components/site/content-context";

export function formatReportDate(value: string) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
}

export function WeeklyReports() {
  const { reports } = useSiteContent();
  if (!reports || reports.length === 0) return null;

  return (
    <section
      id="reports"
      className="scroll-mt-28 border-y border-border bg-surface py-24 lg:py-32"
    >
      <div className="mx-auto w-[min(1320px,94vw)]">
        <SectionHeading
          eyebrow="Weekly reports"
          title="Structured weekly market coverage."
          description="Every week: levels, structure and scenarios across the instruments under coverage — published as a standalone research note."
        />

        <Stagger className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3" gap={0.08}>
          {reports.map((r) => (
            <StaggerItem key={r.slug}>
              <Link
                to="/reports/$slug"
                params={{ slug: r.slug }}
                className="surface-card group flex h-full flex-col overflow-hidden"
              >
                {r.coverImage ? (
                  <img
                    src={r.coverImage}
                    alt={r.title}
                    loading="lazy"
                    className="aspect-[16/9] w-full border-b border-border object-cover"
                  />
                ) : (
                  <span className="grid aspect-[16/9] w-full place-items-center border-b border-border bg-background text-muted-foreground">
                    <FileText className="h-6 w-6" />
                  </span>
                )}

                <div className="flex flex-1 flex-col p-6 sm:p-7">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="border border-emerald px-2.5 py-1 text-[0.58rem] font-semibold uppercase tracking-widest text-emerald">
                      {r.market}
                    </span>
                    <span className="num text-[0.65rem] text-muted-foreground">
                      {formatReportDate(r.date)}
                    </span>
                  </div>

                  <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1">
                    {r.asset ? <span className="num text-xs font-semibold">{r.asset}</span> : null}
                    {r.weekLabel ? (
                      <span className="num text-[0.65rem] text-muted-foreground">{r.weekLabel}</span>
                    ) : null}
                  </div>

                  <h3 className="mt-3 text-pretty text-lg font-semibold leading-snug">{r.title}</h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {r.summary}
                  </p>

                  <span className="mt-6 inline-flex items-center gap-2 border-t border-border pt-4 font-mono text-[0.66rem] uppercase tracking-[0.16em] transition-colors group-hover:text-emerald">
                    Read more
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
