import { motion } from "motion/react";
import { ArrowRight, ArrowUpRight, ShieldCheck, Sparkles } from "lucide-react";
import { AreaChart, CandleChart } from "@/components/site/charts";
import { Counter } from "@/components/site/primitives";
import { useSiteContent } from "@/components/site/content-context";
import { useBtcMarketChart } from "@/hooks/use-btc-chart";
import { parsePriceNumber, useLivePrices } from "@/hooks/use-live-prices";
import { ChartAreaSkeleton } from "@/components/site/skeletons";

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const { copy } = useSiteContent();
  const hero = copy.hero;
  const live = useLivePrices();
  const { data: btcChart, loading: chartLoading } = useBtcMarketChart();
  const btc = live["BTC/USD"];
  const livePrice = btc ? parsePriceNumber(btc.price) : btcChart ? parsePriceNumber(btcChart.price) : null;
  const panelPrice = livePrice ?? hero.panelPrice;
  const panelChange = btc?.change ?? btcChart?.change ?? hero.panelChange;
  const panelChangeUp = btc ? btc.up : btcChart ? btcChart.up : !hero.panelChange.trim().startsWith("-");
  const panelSeries =
    btcChart && btcChart.prices.length > 1 ? btcChart.prices : hero.panelSeries;
  const panelCandles = btcChart?.candles?.length ? btcChart.candles : undefined;
  const chartsLoading = chartLoading && !btcChart && !btc;

  const chartKey = "hero-btc";

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
            <div className="relative w-full border border-border bg-card">
              {hero.panelImage ? (
                <img
                  src={hero.panelImage}
                  alt={hero.panelLabel || "Market chart"}
                  className="aspect-[4/5] w-full object-cover sm:aspect-square lg:aspect-[4/5]"
                />
              ) : (
                <>
                  <div className="flex items-start justify-between border-b border-border p-5">
                    <div>
                      <p className="eyebrow">{hero.panelLabel}</p>
                      <p className="num mt-2 text-2xl font-semibold">
                        <Counter value={panelPrice} />{" "}
                        <span
                          className={
                            panelChangeUp ? "text-sm text-emerald" : "text-sm text-destructive"
                          }
                        >
                          {panelChange}
                        </span>
                      </p>
                    </div>
                    <span className="border border-emerald px-2.5 py-1 font-mono text-[0.6rem] uppercase tracking-[0.16em] text-emerald">
                      {hero.panelBadge}
                    </span>
                  </div>

                  {chartsLoading ? (
                    <>
                      <ChartAreaSkeleton height={150} className="border-0 border-b border-border" />
                      <div className="border-b border-border p-4">
                        <div className="flex h-[130px] items-end justify-between gap-1 px-1">
                          {Array.from({ length: 12 }).map((_, i) => (
                            <div
                              key={i}
                              className="w-full max-w-[14px] animate-pulse bg-hairline"
                              style={{ height: `${28 + ((i * 17) % 55)}%` }}
                            />
                          ))}
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="border-b border-border p-4">
                        <AreaChart
                          series={panelSeries}
                          height={150}
                          accent="blue"
                          chartKey={chartKey}
                        />
                      </div>

                      <div className="border-b border-border p-4">
                        <CandleChart candles={panelCandles} chartKey={chartKey} />
                      </div>
                    </>
                  )}

                  <div className="grid grid-cols-3 text-center">
                    {hero.panelMetrics.map((c, i) => (
                      <div
                        key={c.label}
                        className={i < 2 ? "border-r border-hairline px-2 py-4" : "px-2 py-4"}
                      >
                        <p className="eyebrow text-[0.58rem]">{c.label}</p>
                        <p className="num mt-1.5 text-sm font-semibold">{c.value}</p>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>

            <motion.div
              className="absolute -left-4 top-[22%] hidden border border-border bg-card px-4 py-3 shadow-[4px_4px_0_0_var(--emerald)] sm:block"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="h-4 w-4 text-emerald" />
                <div>
                  <p className="text-xs font-semibold">{hero.floatOne.title}</p>
                  <p className="num text-[0.65rem] text-muted-foreground">{hero.floatOne.sub}</p>
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
                  <p className="text-xs font-semibold">{hero.floatTwo.title}</p>
                  <p className="num text-[0.65rem] text-muted-foreground">{hero.floatTwo.sub}</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
