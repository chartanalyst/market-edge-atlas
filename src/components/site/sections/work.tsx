import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Search } from "lucide-react";
import { AreaChart } from "@/components/site/charts";
import { Counter, Reveal, SectionHeading, Stagger, StaggerItem } from "@/components/site/primitives";
import { useSiteContent } from "@/components/site/content-context";
import { cn } from "@/lib/utils";

const filters = ["All", "Crypto", "Forex", "Stocks", "Commodities", "Indices"] as const;

export function FeaturedAnalysis() {
  const { analyses } = useSiteContent();
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
          a.summary.toLowerCase().includes(q);
        return matchFilter && matchQuery;
      }),
    [analyses, filter, query],
  );

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

        <Stagger className="mt-10 grid gap-6 lg:grid-cols-2">
          {visible.map((a, i) => (
            <StaggerItem key={a.slug} className={i === 0 ? "lg:col-span-2" : undefined}>
              <Link
                to="/analysis/$slug"
                params={{ slug: a.slug }}
                className={cn(
                  "surface-card group grid h-full overflow-hidden",
                  i === 0 ? "lg:grid-cols-[1.05fr_1fr]" : "",
                )}
              >
                <div className="relative overflow-hidden bg-surface p-6">
                  <div className="flex items-center justify-between">
                    <span className="num text-xs font-semibold">{a.pair}</span>
                    <span className="border border-emerald bg-transparent px-2.5 py-1 text-[0.6rem] font-semibold uppercase tracking-widest text-emerald">
                      {a.market}
                    </span>
                  </div>
                  <div className="mt-4 transition-transform duration-700 group-hover:scale-[1.03]">
                    {a.coverImage ? (
                      <img
                        src={a.coverImage}
                        alt={a.title}
                        className={`w-full object-cover ${i === 0 ? "h-[200px]" : "h-[130px]"}`}
                        loading="lazy"
                      />
                    ) : (
                      <AreaChart series={a.series} height={i === 0 ? 200 : 130} animate={false} />
                    )}
                  </div>
                </div>

                <div className="flex flex-col p-7">
                  <p className="eyebrow">{a.timeframe}</p>
                  <h3 className="mt-3 text-pretty text-lg font-semibold leading-snug sm:text-xl">
                    {a.title}
                  </h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{a.summary}</p>
                  <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-5">
                    <div>
                      <p className="eyebrow text-[0.6rem]">Outcome</p>
                      <p className="num mt-1 text-sm font-semibold text-emerald">{a.outcome}</p>
                    </div>
                    <span className="inline-flex items-center gap-1.5 text-sm font-semibold transition-colors group-hover:text-emerald">
                      Read more
                      <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </span>
                  </div>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>

        {visible.length === 0 ? (
          <p className="mt-12 text-center text-sm text-muted-foreground">
            No analysis matches that filter yet.
          </p>
        ) : null}
      </div>
    </section>
  );
}

export function Performance() {
  const { stats } = useSiteContent();
  return (
    <section
      id="performance"
      className="relative scroll-mt-28 overflow-hidden border-y border-border bg-navy py-24 text-navy-foreground lg:py-32"
    >
      <div className="grid-lines pointer-events-none absolute inset-0 opacity-[0.08]" />

      <div className="mx-auto w-[min(1320px,94vw)]">
        <Reveal className="max-w-3xl">
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-emerald" />
            <p className="eyebrow text-navy-foreground/60">Performance dashboard</p>
          </div>
          <h2 className="mt-5 text-balance text-3xl font-semibold leading-[1.08] sm:text-4xl lg:text-5xl">
            The numbers behind the coverage.
          </h2>
          <p className="mt-5 text-base leading-relaxed text-navy-foreground/70">
            Tracked continuously and reconciled monthly against the published research log.
          </p>
        </Reveal>

        <Stagger className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {stats.map((s) => (
            <StaggerItem key={s.label}>
              <div className="group h-full border border-navy-foreground/12 bg-navy-foreground/[0.045] p-7 backdrop-blur transition-colors duration-500 hover:border-emerald/50">
                <p className="text-4xl font-semibold sm:text-5xl">
                  <Counter value={s.value} suffix={s.suffix} />
                </p>
                <p className="mt-4 font-display text-sm font-semibold">{s.label}</p>
                <p className="mt-1.5 text-xs text-navy-foreground/60">{s.detail}</p>
                <div className="mt-6 h-px w-full bg-navy-foreground/12">
                  <div className="h-px w-0 bg-emerald transition-all duration-700 group-hover:w-full" />
                </div>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
