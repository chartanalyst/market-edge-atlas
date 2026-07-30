import * as Icons from "lucide-react";
import { SectionHeading, Stagger, StaggerItem, TiltCard } from "@/components/site/primitives";
import { differentiators, services } from "@/lib/site-data";

export function Services() {
  return (
    <section id="services" className="scroll-mt-28 py-24 lg:py-32">
      <div className="mx-auto w-[min(1320px,94vw)]">
        <SectionHeading
          eyebrow="Services"
          title="Engagements built around your mandate."
          description="From a single custom market review to an ongoing institutional research retainer — every engagement uses the same documented methodology."
        />

        <Stagger className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => {
            const Icon = (Icons[s.icon as keyof typeof Icons] ?? Icons.Activity) as Icons.LucideIcon;
            return (
              <StaggerItem key={s.title}>
                <TiltCard className="h-full">
                  <article className="surface-card group relative h-full overflow-hidden rounded-none p-7">
                    <span className="relative grid h-11 w-11 place-items-center rounded-none border border-border bg-surface/70 text-emerald">
                      <Icon className="h-5 w-5" />
                    </span>
                    <h3 className="relative mt-6 text-lg font-semibold">{s.title}</h3>
                    <p className="relative mt-2.5 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
                    <a
                      href="#contact"
                      className="relative mt-6 inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground transition-colors group-hover:text-emerald"
                    >
                      Enquire
                      <Icons.ArrowRight className="h-3.5 w-3.5" />
                    </a>
                  </article>
                </TiltCard>
              </StaggerItem>
            );
          })}

          <StaggerItem>
            <div className="flex h-full flex-col justify-between border border-border bg-navy p-8 text-navy-foreground">
              <div>
                <p className="eyebrow text-navy-foreground/60">Not sure which fits?</p>
                <h3 className="mt-4 text-xl font-semibold leading-snug">
                  Start with a 45-minute consultation.
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-navy-foreground/70">
                  We review your markets, current process and objectives, then I send a written summary
                  with recommendations.
                </p>
              </div>
              <a
                href="#contact"
                className="mt-8 inline-flex items-center justify-center gap-2 border border-emerald bg-emerald px-5 py-3.5 font-mono text-[0.72rem] uppercase tracking-[0.16em] text-navy-foreground transition-colors hover:bg-transparent hover:text-emerald"
              >
                Book a consultation
                <Icons.ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </StaggerItem>
        </Stagger>
      </div>
    </section>
  );
}

export function WhyWorkWithMe() {
  return (
    <section id="why" className="scroll-mt-28 border-y border-border bg-surface py-24 lg:py-32">
      <div className="mx-auto w-[min(1320px,94vw)]">
        <SectionHeading
          eyebrow="Why work with me"
          title="Six standards I refuse to compromise on."
          align="center"
        />

        <Stagger className="mt-14 grid gap-px overflow-hidden rounded-none border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {differentiators.map((d) => {
            const Icon = (Icons[d.icon as keyof typeof Icons] ?? Icons.Activity) as Icons.LucideIcon;
            return (
              <StaggerItem key={d.title} className="bg-card">
                <div className="group h-full p-8 transition-colors duration-500 hover:bg-surface/70">
                  <div className="flex items-center gap-3">
                    <Icon className="h-5 w-5 text-emerald transition-transform duration-500 group-hover:scale-110" />
                    <h3 className="font-display text-base font-semibold">{d.title}</h3>
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{d.desc}</p>
                </div>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}
