import { motion } from "motion/react";
import { SectionHeading } from "@/components/site/primitives";
import { useSiteContent } from "@/components/site/content-context";

export function Process() {
  const { processSteps } = useSiteContent();
  const rows: (typeof processSteps)[] = [];
  for (let i = 0; i < processSteps.length; i += 3) rows.push(processSteps.slice(i, i + 3));

  return (
    <section
      id="process"
      className="scroll-mt-28 border-y border-border bg-surface py-24 lg:py-32"
    >
      <div className="mx-auto w-[min(1320px,94vw)]">
        <SectionHeading
          eyebrow="Analysis process"
          title="A seven-stage sequence, run identically every time."
          description="No stage is skipped and no entry is taken before stage five is complete. This is what keeps analysis objective when markets are not."
        />

        <div className="mt-14 grid gap-5">
          {rows.map((row, rowIndex) => (
            <div
              key={rowIndex}
              className={
                row.length === 3
                  ? "grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
                  : "grid gap-5 sm:grid-cols-2 lg:mx-auto lg:w-1/3 lg:grid-cols-1"
              }
            >
              {row.map((s, i) => {
                const index = rowIndex * 3 + i;
                return (
                  <motion.article
                    key={s.n}
                    initial={{ opacity: 0, y: 26 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.6, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                    className="surface-card group relative p-6 sm:p-7"
                  >
                    <div className="flex items-center justify-between">
                      <span className="num text-3xl font-semibold text-emerald/25 transition-colors group-hover:text-emerald">
                        {s.n}
                      </span>
                      <StepGlyph index={index} />
                    </div>
                    <h3 className="mt-6 text-base font-semibold">{s.title}</h3>
                    <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
                  </motion.article>
                );
              })}
            </div>
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
