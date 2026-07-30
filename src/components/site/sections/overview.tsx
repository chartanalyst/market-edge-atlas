import * as Icons from "lucide-react";
import { Reveal, SectionHeading, Stagger, StaggerItem, TiltCard } from "@/components/site/primitives";
import { markets } from "@/lib/site-data";
import { AreaChart } from "@/components/site/charts";

export function About() {
  return (
    <section id="about" className="relative scroll-mt-28 py-24 lg:py-32">
      <div className="mx-auto grid w-[min(1200px,92vw)] gap-14 lg:grid-cols-[0.95fr_1.05fr]">
        <div>
          <SectionHeading
            eyebrow="About"
            title={<>Research discipline borrowed from the institutional side of the desk.</>}
            description="I've spent seven years reading price for a living — first inside a digital-asset research desk, now independently for funds, communities and private clients across five asset classes."
          />

          <Reveal delay={0.1} className="mt-8 grid gap-5 text-sm leading-relaxed text-muted-foreground">
            <p>
              My mission is simple: make technical analysis defensible. Every chart I publish states a
              thesis, the evidence supporting it, the level that proves it wrong, and the risk taken to
              express it. If a call fails, it is logged exactly like the ones that work.
            </p>
            <p>
              The approach is structure-first. I build context from the highest timeframe downward,
              mapping ranges, liquidity and unmitigated zones before considering an entry. Confirmation
              is required, never assumed. Narrative and sentiment inform the environment — they never
              override the chart.
            </p>
          </Reveal>

          <Reveal delay={0.16} className="mt-10 grid gap-4 sm:grid-cols-2">
            {[
              { t: "Auditable", d: "Public log of thesis vs. outcome since 2021." },
              { t: "Repeatable", d: "One written seven-stage process for every market." },
              { t: "Risk-first", d: "Invalidation defined before position sizing." },
              { t: "Multi-market", d: "Cross-asset confirmation on every directional call." },
            ].map((i) => (
              <div key={i.t} className="rounded-2xl border border-hairline bg-surface/60 p-5">
                <p className="font-display text-sm font-semibold">{i.t}</p>
                <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{i.d}</p>
              </div>
            ))}
          </Reveal>
        </div>

        <Reveal delay={0.12} className="relative">
          <div className="sticky top-28 rounded-3xl border border-hairline bg-card p-7 shadow-[var(--shadow-soft)]">
            <p className="eyebrow">What makes the analysis different</p>
            <ul className="mt-7 grid gap-6">
              {[
                {
                  n: "01",
                  t: "Evidence before opinion",
                  d: "Each thesis is built on observable structure, not on a narrative searching for a chart.",
                },
                {
                  n: "02",
                  t: "Invalidation is published",
                  d: "You always know the exact level at which the idea is wrong — stated up front.",
                },
                {
                  n: "03",
                  t: "Cross-asset confirmation",
                  d: "Dollar strength, yields and breadth are checked before any directional conviction.",
                },
                {
                  n: "04",
                  t: "Outcomes tracked in R",
                  d: "Performance is expressed in risk multiples, not screenshots of winners.",
                },
              ].map((s) => (
                <li key={s.n} className="grid grid-cols-[auto_1fr] gap-4">
                  <span className="num mt-0.5 text-xs font-semibold text-emerald">{s.n}</span>
                  <div className="min-w-0">
                    <p className="font-display text-sm font-semibold">{s.t}</p>
                    <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{s.d}</p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-8 rounded-2xl border border-hairline bg-surface/60 p-4">
              <div className="flex items-center justify-between">
                <p className="eyebrow text-[0.6rem]">Cumulative R · published ideas</p>
                <p className="num text-sm font-semibold text-emerald">+148R</p>
              </div>
              <AreaChart
                series={[4, 9, 7, 16, 21, 19, 30, 38, 35, 48, 61, 70, 88, 104, 126, 148]}
                height={110}
                showGrid={false}
              />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function Markets() {
  return (
    <section id="markets" className="scroll-mt-28 border-y border-hairline bg-surface/50 py-24 lg:py-32">
      <div className="mx-auto w-[min(1200px,92vw)]">
        <SectionHeading
          eyebrow="Markets covered"
          title="Five asset classes, one analytical framework."
          description="The same structure, liquidity and risk model is applied to every market — which is precisely what makes cross-market confirmation possible."
        />

        <Stagger className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {markets.map((m, i) => {
            const Icon = (Icons[m.icon as keyof typeof Icons] ?? Icons.Activity) as Icons.LucideIcon;
            return (
              <StaggerItem key={m.name} className={i === 0 ? "lg:col-span-2" : undefined}>
                <TiltCard className="h-full">
                  <article className="surface-card group flex h-full flex-col rounded-3xl p-7">
                    <div className="flex items-start justify-between gap-4">
                      <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-emerald-soft text-accent-foreground transition-transform duration-500 group-hover:scale-110">
                        <Icon className="h-5 w-5" />
                      </span>
                      <span className="num text-[0.65rem] uppercase tracking-widest text-muted-foreground">
                        {m.stat}
                      </span>
                    </div>
                    <h3 className="mt-6 text-xl font-semibold">{m.name}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{m.desc}</p>
                    <div className="mt-6 h-px w-full bg-hairline" />
                    <div className="mt-4 flex items-center gap-2 text-xs font-medium text-emerald opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      Coverage active
                      <Icons.ArrowRight className="h-3.5 w-3.5" />
                    </div>
                  </article>
                </TiltCard>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}
