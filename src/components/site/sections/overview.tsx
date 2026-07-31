import * as Icons from "lucide-react";
import { Reveal, SectionHeading, Stagger, StaggerItem, TiltCard } from "@/components/site/primitives";
import { useSiteContent } from "@/components/site/content-context";
import { AreaChart } from "@/components/site/charts";

export function About() {
  const { copy } = useSiteContent();
  const about = copy.about;
  return (
    <section id="about" className="relative scroll-mt-28 py-24 lg:py-32">
      <div className="mx-auto grid w-[min(1320px,94vw)] gap-14 lg:grid-cols-[0.95fr_1.05fr]">
        <div>
          <SectionHeading
            eyebrow={about.eyebrow}
            title={about.title}
            description={about.description}
          />

          <Reveal delay={0.1} className="mt-8 grid gap-5 text-sm leading-relaxed text-muted-foreground">
            {about.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </Reveal>

          <Reveal delay={0.16} className="mt-10 grid gap-4 sm:grid-cols-2">
            {about.pillars.map((i) => (
              <div key={i.title} className="border border-border bg-surface p-5">
                <p className="font-display text-sm font-semibold">{i.title}</p>
                <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{i.desc}</p>
              </div>
            ))}
          </Reveal>
        </div>

        <Reveal delay={0.12} className="relative">
          <div className="sticky top-28 border border-border bg-card p-7">
            <p className="eyebrow">{about.asideTitle}</p>
            <ul className="mt-7 grid gap-6">
              {about.points.map((s2) => (
                <li key={s2.n} className="grid grid-cols-[auto_1fr] gap-4">
                  <span className="num mt-0.5 text-xs font-semibold text-emerald">{s2.n}</span>
                  <div className="min-w-0">
                    <p className="font-display text-sm font-semibold">{s2.title}</p>
                    <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{s2.desc}</p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-8 border border-border bg-surface p-4">
              <div className="flex items-center justify-between">
                <p className="eyebrow text-[0.6rem]">{about.chartLabel}</p>
                <p className="num text-sm font-semibold text-emerald">{about.chartValue}</p>
              </div>
              <AreaChart
                series={about.chartSeries}
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
  const { markets } = useSiteContent();
  return (
    <section id="markets" className="scroll-mt-28 border-y border-border bg-surface py-24 lg:py-32">
      <div className="mx-auto w-[min(1320px,94vw)]">
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
                  <article className="surface-card group flex h-full flex-col p-7">
                    <div className="flex items-start justify-between gap-4">
                      <span className="grid h-12 w-12 shrink-0 place-items-center border border-emerald bg-transparent text-emerald transition-transform duration-500 group-hover:scale-110">
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
