import { Reveal, SectionHeading, Stagger, StaggerItem } from "@/components/site/primitives";
import { useSiteContent } from "@/components/site/content-context";
import { DonutChart } from "@/components/site/charts";
import { assetDistribution } from "@/lib/site-data";

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

          <Reveal
            delay={0.1}
            className="mt-8 grid gap-5 text-sm leading-relaxed text-muted-foreground"
          >
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

            <div className="mt-8 overflow-hidden border border-border bg-surface p-4 shadow-[0_14px_32px_rgba(0,0,0,0.12)]">
              <div className="flex items-center justify-between">
                <p className="eyebrow text-[0.6rem]">Research universe</p>
                <p className="num text-sm font-semibold text-foreground">
                  {assetDistribution.length} classes
                </p>
              </div>
              <DonutChart
                segments={assetDistribution}
                chartKey="about-research-universe"
                className="mt-4 max-w-[300px]"
                showLegend={false}
                showCallouts
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
    <section id="markets" className="scroll-mt-28 border-y border-border bg-surface py-24 lg:py-32">
      <div className="mx-auto w-[min(1320px,94vw)]">
        <SectionHeading
          eyebrow="Research universe"
          title="Research Universe"
          description="Published analysis by asset class — distribution of market research across the coverage universe."
        />

        <Reveal
          delay={0.1}
          className="mt-14 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] lg:items-center"
        >
          <div className="border border-border bg-card p-8 sm:p-10">
            <DonutChart segments={assetDistribution} chartKey="research-universe" />
          </div>

          <Stagger className="grid gap-3">
            {assetDistribution.map((item) => (
              <StaggerItem key={item.label}>
                <div className="flex items-center justify-between gap-4 border border-border bg-card px-5 py-4">
                  <div className="flex min-w-0 items-center gap-3">
                    <span
                      className="h-3 w-3 shrink-0 rounded-sm"
                      style={{ backgroundColor: item.color }}
                      aria-hidden
                    />
                    <p className="font-display text-sm font-semibold">{item.label}</p>
                  </div>
                  <p className="num text-sm font-semibold text-emerald">{item.pct}%</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </Reveal>
      </div>
    </section>
  );
}
