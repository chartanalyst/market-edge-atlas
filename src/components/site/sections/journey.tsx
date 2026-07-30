import { motion } from "motion/react";
import { Reveal, SectionHeading, Stagger, StaggerItem } from "@/components/site/primitives";
import { processSteps, timeline } from "@/lib/site-data";

export function Experience() {
  return (
    <section id="experience" className="scroll-mt-28 py-24 lg:py-32">
      <div className="mx-auto w-[min(1320px,94vw)]">
        <SectionHeading
          eyebrow="Experience"
          title="Seven years of continuous market coverage."
          description="Desk research, community education and independent practice — the through-line is a documented process applied without exception."
        />

        <div className="relative mt-16">
          <div className="absolute left-[7px] top-2 hidden h-[calc(100%-1rem)] w-px bg-hairline sm:block" />
          <Stagger className="grid gap-10" gap={0.1}>
            {timeline.map((t) => (
              <StaggerItem key={t.period + t.role}>
                <div className="grid gap-6 sm:grid-cols-[auto_1fr] sm:gap-8">
                  <div className="hidden pt-2 sm:block">
                    <span className="relative grid h-4 w-4 place-items-center rounded-none border-2 border-emerald bg-background">
                      <span className="h-1.5 w-1.5 rounded-none bg-emerald" />
                    </span>
                  </div>
                  <div className="surface-card rounded-none p-7">
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                      <span className="num text-xs font-semibold text-emerald">{t.period}</span>
                      <span className="rounded-none bg-secondary px-2.5 py-1 text-[0.6rem] font-semibold uppercase tracking-widest text-muted-foreground">
                        {t.tag}
                      </span>
                    </div>
                    <h3 className="mt-4 text-xl font-semibold">{t.role}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{t.org}</p>
                    <ul className="mt-5 grid gap-2.5">
                      {t.points.map((p) => (
                        <li key={p} className="grid grid-cols-[auto_1fr] gap-3 text-sm text-muted-foreground">
                          <span className="mt-2 h-1 w-1 rounded-none bg-emerald" />
                          <span className="leading-relaxed">{p}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  );
}

export function Process() {
  return (
    <section
      id="process"
      className="scroll-mt-28 overflow-hidden border-y border-hairline bg-surface/50 py-24 lg:py-32"
    >
      <div className="mx-auto w-[min(1320px,94vw)]">
        <SectionHeading
          eyebrow="Analysis process"
          title="A seven-stage sequence, run identically every time."
          description="No stage is skipped and no entry is taken before stage five is complete. This is what keeps analysis objective when markets are not."
        />
      </div>

      <div className="mt-14 overflow-x-auto pb-6 [scrollbar-width:thin]">
        <div className="mx-auto flex w-max gap-5 px-[max(4vw,1rem)]">
          {processSteps.map((s, i) => (
            <motion.article
              key={s.n}
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
              className="surface-card group relative w-[264px] shrink-0 rounded-none p-6"
            >
              <div className="flex items-center justify-between">
                <span className="num text-3xl font-semibold text-emerald/25 transition-colors group-hover:text-emerald">
                  {s.n}
                </span>
                <StepGlyph index={i} />
              </div>
              <h3 className="mt-6 text-base font-semibold">{s.title}</h3>
              <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
              {i < processSteps.length - 1 ? (
                <span className="absolute -right-5 top-1/2 hidden h-px w-5 bg-hairline lg:block" />
              ) : null}
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function StepGlyph({ index }: { index: number }) {
  const glyphs = [
    "M2 22 L10 10 L16 16 L24 4 L30 12",
    "M2 20 h8 v-8 h8 v-6 h12",
    "M2 6 h28 M2 14 h20 M2 22 h26",
    "M4 16 l6 6 L28 6",
    "M16 3 l12 6 v8 c0 7-5 11-12 13 -7-2-12-6-12-13V9z",
    "M3 24 L13 12 l6 6 L29 4",
    "M4 20 a12 12 0 1 1 4 8 M4 28 v-8 h8",
  ];
  return (
    <svg viewBox="0 0 32 32" className="h-9 w-9 text-emerald" fill="none" aria-hidden>
      <path
        d={glyphs[index % glyphs.length]}
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.85"
      />
    </svg>
  );
}
