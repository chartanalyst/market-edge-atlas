import { motion } from "motion/react";
import { ArrowRight, ArrowUpRight, ShieldCheck, Sparkles } from "lucide-react";
import { AreaChart, CandleChart } from "@/components/site/charts";
import { Counter } from "@/components/site/primitives";

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-32 sm:pt-40">
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{ background: "var(--gradient-hero)" }}
      />
      <div className="grid-lines pointer-events-none absolute inset-0 -z-10 opacity-[0.35] [mask-image:radial-gradient(70%_60%_at_50%_0%,black,transparent)]" />

      <div className="mx-auto grid w-[min(1200px,92vw)] items-center gap-14 pb-20 lg:grid-cols-[1.05fr_0.95fr] lg:pb-28">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease }}
            className="inline-flex items-center gap-2 rounded-full border border-hairline bg-card/70 px-3.5 py-1.5 backdrop-blur"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald opacity-70" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald" />
            </span>
            <span className="eyebrow text-foreground/70">Coverage live · 5 asset classes</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease, delay: 0.08 }}
            className="mt-7 text-balance text-[2.6rem] font-semibold leading-[1.02] sm:text-6xl lg:text-[4.4rem]"
          >
            Professional
            <br />
            <span className="text-gradient-navy">Technical Market</span>
            <br />
            Analyst
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.18 }}
            className="mt-7 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg"
          >
            Providing institutional-grade technical analysis across Crypto, Forex, Stocks,
            Commodities, and Indices.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.26 }}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <a
              href="#featured"
              className="group inline-flex items-center gap-2 rounded-full bg-navy px-6 py-3.5 text-sm font-semibold text-navy-foreground shadow-[var(--shadow-lift)] transition-transform hover:-translate-y-0.5"
            >
              View Portfolio
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#contact"
              className="group inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3.5 text-sm font-semibold transition-colors hover:border-emerald hover:text-emerald"
            >
              Contact Me
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </motion.div>

          <motion.dl
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.4 }}
            className="mt-12 grid max-w-lg grid-cols-3 gap-6 border-t border-hairline pt-7"
          >
            {[
              { v: 2400, s: "+", l: "Charts published" },
              { v: 71, s: "%", l: "Thesis hit rate" },
              { v: 7, s: "yrs", l: "Full-time research" },
            ].map((k) => (
              <div key={k.l}>
                <dt className="text-2xl font-semibold sm:text-3xl">
                  <Counter value={k.v} suffix={k.s} />
                </dt>
                <dd className="mt-1.5 text-xs text-muted-foreground">{k.l}</dd>
              </div>
            ))}
          </motion.dl>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease, delay: 0.2 }}
          className="relative"
        >
          <div className="relative rounded-3xl border border-hairline bg-card/85 p-5 shadow-[var(--shadow-lift)] backdrop-blur-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="num text-xs text-muted-foreground">BTC / USD · Weekly</p>
                <p className="mt-1 text-2xl font-semibold">
                  <Counter value={112480} /> <span className="text-sm text-emerald">+1.84%</span>
                </p>
              </div>
              <span className="rounded-full bg-emerald-soft px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-widest text-accent-foreground">
                Bullish structure
              </span>
            </div>

            <div className="mt-5 rounded-2xl border border-hairline bg-background/60 p-3">
              <AreaChart series={[22, 26, 21, 30, 27, 36, 32, 44, 40, 52, 58, 54, 68, 74, 88]} height={150} />
            </div>

            <div className="mt-3 rounded-2xl border border-hairline bg-background/60 p-3">
              <CandleChart />
            </div>

            <div className="mt-4 grid grid-cols-3 gap-2 text-center">
              {[
                { l: "Bias", v: "Long" },
                { l: "R:R", v: "1 : 3.8" },
                { l: "Risk", v: "0.75%" },
              ].map((c) => (
                <div key={c.l} className="rounded-xl border border-hairline bg-background/60 px-2 py-3">
                  <p className="eyebrow text-[0.6rem]">{c.l}</p>
                  <p className="num mt-1 text-sm font-semibold">{c.v}</p>
                </div>
              ))}
            </div>
          </div>

          <motion.div
            className="glass-panel absolute -left-5 top-1/3 hidden rounded-2xl px-4 py-3 shadow-[var(--shadow-soft)] sm:block"
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-emerald" />
              <div>
                <p className="text-xs font-semibold">Invalidation defined</p>
                <p className="num text-[0.65rem] text-muted-foreground">before every entry</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="glass-panel absolute -right-3 bottom-16 hidden rounded-2xl px-4 py-3 shadow-[var(--shadow-soft)] sm:block"
            animate={{ y: [0, 14, 0] }}
            transition={{ duration: 9.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-emerald" />
              <div>
                <p className="text-xs font-semibold">Liquidity mapped</p>
                <p className="num text-[0.65rem] text-muted-foreground">HTF → LTF confluence</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
