import { motion } from "motion/react";
import { ArrowRight, ArrowUpRight, ShieldCheck, Sparkles } from "lucide-react";
import { AreaChart, CandleChart } from "@/components/site/charts";
import { Counter } from "@/components/site/primitives";

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border pt-28 sm:pt-36">
      <div className="grid-lines pointer-events-none absolute inset-0 -z-10 opacity-70 [mask-image:radial-gradient(80%_70%_at_50%_0%,black,transparent)]" />

      <div className="mx-auto w-[min(1320px,94vw)]">
        <div className="flex items-center justify-between border-y border-border py-2.5">
          <span className="eyebrow">001 — Overview</span>
          <span className="eyebrow hidden sm:inline">Independent Research Practice</span>
          <span className="eyebrow">Est. 2019</span>
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
              <span className="eyebrow text-foreground/70">Coverage live · 5 asset classes</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, ease, delay: 0.08 }}
              className="mt-8 text-balance text-[2.7rem] font-semibold leading-[0.98] tracking-[-0.04em] sm:text-6xl lg:text-[4.6rem]"
            >
              Professional
              <br />
              <span className="text-emerald">Technical Market</span>
              <br />
              Analyst
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease, delay: 0.18 }}
              className="mt-8 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg"
            >
              Providing institutional-grade technical analysis across Crypto, Forex, Stocks,
              Commodities, and Indices.
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
                View Portfolio
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href="#contact"
                className="group inline-flex items-center gap-2 border border-border bg-transparent px-7 py-3.5 font-mono text-[0.72rem] uppercase tracking-[0.16em] transition-all hover:shadow-[4px_4px_0_0_var(--emerald)]"
              >
                Contact Me
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </motion.div>

            <motion.dl
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.9, delay: 0.4 }}
              className="mt-14 grid max-w-xl grid-cols-3 border-y border-border"
            >
              {[
                { v: 2400, s: "+", l: "Charts published" },
                { v: 71, s: "%", l: "Thesis hit rate" },
                { v: 7, s: "yrs", l: "Full-time research" },
              ].map((k, i) => (
                <div
                  key={k.l}
                  className={i < 2 ? "border-r border-hairline py-6 pr-4" : "py-6 pl-4"}
                >
                  <dt className="text-2xl font-semibold tracking-tight sm:text-3xl">
                    <Counter value={k.v} suffix={k.s} />
                  </dt>
                  <dd className="eyebrow mt-2 text-[0.6rem]">{k.l}</dd>
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
            <div className="relative w-full border border-border bg-card">
              <div className="flex items-start justify-between border-b border-border p-5">
                <div>
                  <p className="eyebrow">BTC / USD · Weekly</p>
                  <p className="num mt-2 text-2xl font-semibold">
                    <Counter value={112480} /> <span className="text-sm text-emerald">+1.84%</span>
                  </p>
                </div>
                <span className="border border-emerald px-2.5 py-1 font-mono text-[0.6rem] uppercase tracking-[0.16em] text-emerald">
                  Bullish structure
                </span>
              </div>

              <div className="border-b border-border p-4">
                <AreaChart
                  series={[22, 26, 21, 30, 27, 36, 32, 44, 40, 52, 58, 54, 68, 74, 88]}
                  height={150}
                />
              </div>

              <div className="border-b border-border p-4">
                <CandleChart />
              </div>

              <div className="grid grid-cols-3 text-center">
                {[
                  { l: "Bias", v: "Long" },
                  { l: "R:R", v: "1 : 3.8" },
                  { l: "Risk", v: "0.75%" },
                ].map((c, i) => (
                  <div key={c.l} className={i < 2 ? "border-r border-hairline px-2 py-4" : "px-2 py-4"}>
                    <p className="eyebrow text-[0.58rem]">{c.l}</p>
                    <p className="num mt-1.5 text-sm font-semibold">{c.v}</p>
                  </div>
                ))}
              </div>
            </div>

            <motion.div
              className="absolute -left-4 top-[22%] hidden border border-border bg-card px-4 py-3 shadow-[4px_4px_0_0_var(--emerald)] sm:block"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="h-4 w-4 text-emerald" />
                <div>
                  <p className="text-xs font-semibold">Invalidation defined</p>
                  <p className="num text-[0.65rem] text-muted-foreground">before every entry</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="absolute -right-3 bottom-[18%] hidden border border-border bg-card px-4 py-3 shadow-[4px_4px_0_0_oklch(0.185_0_0_/_0.9)] sm:block"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 9.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="flex items-center gap-2.5">
                <Sparkles className="h-4 w-4 text-emerald" />
                <div>
                  <p className="text-xs font-semibold">Liquidity mapped</p>
                  <p className="num text-[0.65rem] text-muted-foreground">HTF → LTF confluence</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
