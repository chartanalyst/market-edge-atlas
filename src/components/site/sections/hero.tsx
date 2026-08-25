import { motion } from "motion/react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Counter } from "@/components/site/primitives";
import { useSiteContent } from "@/components/site/content-context";

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const { copy, stats } = useSiteContent();
  const hero = copy.hero;

  return (
    <section className="relative overflow-hidden border-b border-border pt-36 sm:pt-44">
      <div className="grid-lines pointer-events-none absolute inset-0 -z-10 opacity-70 [mask-image:radial-gradient(80%_70%_at_50%_0%,black,transparent)]" />

      <div className="mx-auto w-[min(1320px,94vw)]">
        <div className="flex items-center justify-between border-y border-border py-2.5">
          <span className="eyebrow">{hero.indexLabel}</span>
          <span className="eyebrow hidden sm:inline">{hero.practice}</span>
          <span className="eyebrow">{hero.established}</span>
        </div>

        <div className="grid items-stretch gap-0 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="border-border py-14 lg:border-r lg:py-20 lg:pr-14">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease }}
              className="inline-flex items-center gap-2 border border-border bg-card px-3 py-1.5"
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping bg-emerald opacity-70" />
                <span className="relative inline-flex h-1.5 w-1.5 bg-emerald" />
              </span>
              <span className="eyebrow text-foreground/70">{hero.badge}</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, ease, delay: 0.08 }}
              className="mt-8 text-balance text-[2.7rem] font-semibold leading-[0.98] tracking-[-0.04em] sm:text-6xl lg:text-[4.6rem]"
            >
              {hero.titleLine1}
              <br />
              <span className="text-emerald">{hero.titleAccent}</span>
              <br />
              {hero.titleLine3}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease, delay: 0.18 }}
              className="mt-8 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg"
            >
              {hero.subtitle}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease, delay: 0.26 }}
              className="mt-10 flex flex-wrap items-center gap-3"
            >
              <a
                href="#featured"
                className="group inline-flex items-center gap-2 border border-border bg-navy px-7 py-3.5 font-mono text-[0.72rem] uppercase tracking-[0.16em] text-navy-foreground transition-all hover:bg-emerald"
              >
                {hero.primaryCta}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href="#contact"
                className="group inline-flex items-center gap-2 border border-border bg-transparent px-7 py-3.5 font-mono text-[0.72rem] uppercase tracking-[0.16em] transition-all hover:shadow-[4px_4px_0_0_var(--emerald)]"
              >
                {hero.secondaryCta}
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </motion.div>

            <motion.dl
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.9, delay: 0.4 }}
              className="mt-14 grid max-w-xl grid-cols-3 border-y border-border"
            >
              {hero.kpis.map((k, i) => (
                <div
                  key={k.label}
                  className={i < 2 ? "border-r border-hairline py-6 pr-4" : "py-6 pl-4"}
                >
                  <dt className="text-2xl font-semibold tracking-tight sm:text-3xl">
                    <Counter value={k.value} suffix={k.suffix} />
                  </dt>
                  <dd className="eyebrow mt-2 text-[0.6rem]">{k.label}</dd>
                </div>
              ))}
            </motion.dl>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease, delay: 0.2 }}
            className="relative flex items-center py-14 lg:py-20 lg:pl-14"
          >
            <div className="grid w-full grid-cols-1 border border-border bg-card shadow-[8px_8px_0_0_var(--surface)] sm:grid-cols-2">
              {stats.slice(0, 5).map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease, delay: 0.3 + i * 0.08 }}
                  className={
                    i === 4
                      ? "border-t border-border bg-surface/70 p-6 sm:col-span-2"
                      : i < 2
                        ? "border-b border-border p-6 sm:odd:border-r sm:odd:border-border"
                        : "border-border p-6 sm:odd:border-r sm:odd:border-border"
                  }
                >
                  <p className="num text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                    <Counter value={s.value} suffix={s.suffix} />
                  </p>
                  <p className="mt-3 font-display text-sm font-semibold text-foreground">
                    {s.label}
                  </p>
                  <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{s.detail}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
