import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Search } from "lucide-react";
import { AreaChart } from "@/components/site/charts";
import { Counter, Reveal, SectionHeading, Stagger, StaggerItem } from "@/components/site/primitives";
import { analyses, coverageMap, stats } from "@/lib/site-data";
import { cn } from "@/lib/utils";

const filters = ["All", "Crypto", "Forex", "Stocks", "Commodities", "Indices"] as const;

export function FeaturedAnalysis() {
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
    [filter, query],
  );

  return (
    <section id="featured" className="scroll-mt-28 py-24 lg:py-32">
      <div className="mx-auto w-[min(1200px,92vw)]">
        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <SectionHeading
            eyebrow="Featured analysis"
            title="Published case studies, thesis to outcome."
            description="A selection of documented ideas across markets. Each includes the original structure read, the invalidation level and the realised result in risk multiples."
          />
          <Reveal delay={0.1} className="lg:pb-2">
            <label className="flex items-center gap-2 rounded-none border border-hairline bg-card px-4 py-2.5">
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
                "rounded-none border px-4 py-2 text-xs font-semibold transition-all",
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
                  "surface-card group grid h-full overflow-hidden rounded-none",
                  i === 0 ? "lg:grid-cols-[1.05fr_1fr]" : "",
                )}
              >
                <div className="relative overflow-hidden bg-surface/60 p-6">
                  <div className="flex items-center justify-between">
                    <span className="num text-xs font-semibold">{a.pair}</span>
                    <span className="rounded-none bg-emerald-soft px-2.5 py-1 text-[0.6rem] font-semibold uppercase tracking-widest text-accent-foreground">
                      {a.market}
                    </span>
                  </div>
                  <div className="mt-4 transition-transform duration-700 group-hover:scale-[1.03]">
                    <AreaChart series={a.series} height={i === 0 ? 200 : 130} animate={false} />
                  </div>
                </div>

                <div className="flex flex-col p-7">
                  <p className="eyebrow">{a.timeframe}</p>
                  <h3 className="mt-3 text-pretty text-lg font-semibold leading-snug sm:text-xl">
                    {a.title}
                  </h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{a.summary}</p>
                  <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-hairline pt-5">
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
  return (
    <section
      id="performance"
      className="relative scroll-mt-28 overflow-hidden border-y border-hairline bg-navy py-24 text-navy-foreground lg:py-32"
    >
      <div className="grid-lines pointer-events-none absolute inset-0 opacity-[0.08]" />
      <div className="pointer-events-none absolute -right-24 top-1/4 h-96 w-96 rounded-none bg-emerald/20 blur-3xl" />

      <div className="mx-auto w-[min(1200px,92vw)]">
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
              <div className="group h-full rounded-none border border-navy-foreground/12 bg-navy-foreground/[0.045] p-7 backdrop-blur transition-colors duration-500 hover:border-emerald/50">
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

          <StaggerItem className="sm:col-span-2 lg:col-span-1">
            <CoverageMap />
          </StaggerItem>
        </Stagger>
      </div>
    </section>
  );
}

function CoverageMap() {
  return (
    <div className="h-full rounded-none border border-navy-foreground/12 bg-navy-foreground/[0.045] p-7 backdrop-blur">
      <p className="eyebrow text-navy-foreground/60">Session coverage</p>
      <div className="relative mt-5 aspect-[2/1] w-full">
        <svg viewBox="0 0 100 50" className="h-full w-full" role="img" aria-label="Global session coverage map">
          {Array.from({ length: 26 }).map((_, r) =>
            Array.from({ length: 52 }).map((__, c) => {
              const x = c * 1.94 + 1;
              const y = r * 1.94 + 1;
              const inLand =
                (x > 12 && x < 34 && y > 8 && y < 26) ||
                (x > 26 && x < 40 && y > 26 && y < 44) ||
                (x > 42 && x < 56 && y > 6 && y < 20) ||
                (x > 44 && x < 58 && y > 20 && y < 38) ||
                (x > 56 && x < 88 && y > 8 && y < 32) ||
                (x > 78 && x < 92 && y > 33 && y < 43);
              if (!inLand) return null;
              return <circle key={`${r}-${c}`} cx={x} cy={y} r="0.42" fill="currentColor" opacity="0.22" />;
            }),
          )}
          {coverageMap.map((p, i) => (
            <g key={p.city}>
              <circle cx={p.x} cy={p.y / 2 + 4} r="1.6" fill="var(--emerald)" opacity="0.2">
                <animate
                  attributeName="r"
                  values="1.2;3.4;1.2"
                  dur="3.4s"
                  begin={`${i * 0.32}s`}
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="opacity"
                  values="0.35;0;0.35"
                  dur="3.4s"
                  begin={`${i * 0.32}s`}
                  repeatCount="indefinite"
                />
              </circle>
              <circle cx={p.x} cy={p.y / 2 + 4} r="0.75" fill="var(--emerald)" />
            </g>
          ))}
        </svg>
      </div>
      <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1.5 text-[0.65rem] text-navy-foreground/60">
        {["Asia", "London", "New York"].map((s) => (
          <span key={s} className="num inline-flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-none bg-emerald" />
            {s} session
          </span>
        ))}
      </div>
    </div>
  );
}
