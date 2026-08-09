import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { GlowLineChart } from "@/components/site/charts";
import { Reveal, SectionHeading, Stagger, StaggerItem } from "@/components/site/primitives";
import {
  computeMetrics,
  equitySeriesForChart,
  listPublishedTrades,
  type TradeRecord,
} from "@/lib/trades.functions";
import { JournalEquitySkeleton } from "@/components/site/skeletons";
import { liveQueryOptions } from "@/lib/live-poll";

export function TradingJournal() {
  const fetchTrades = useServerFn(listPublishedTrades);
  const { data: trades = [], isLoading } = useQuery({
    queryKey: ["published-trades"],
    queryFn: () => fetchTrades(),
    ...liveQueryOptions,
  });

  const metrics = useMemo(() => computeMetrics(trades), [trades]);
  const chart = useMemo(() => equitySeriesForChart(trades), [trades]);
  const recent = useMemo(
    () => [...trades].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 8),
    [trades],
  );

  const axisTicks = useMemo(() => {
    const values = chart.series.filter((v) => Number.isFinite(v));
    if (values.length === 0) return ["0"];
    const min = Math.min(...values);
    const max = Math.max(...values);
    const span = max - min || 1;
    return [3, 2, 1, 0].map((i) => (min + (span * i) / 3).toLocaleString("en-US", { maximumFractionDigits: 1 }));
  }, [chart.series]);

  const cards = [
    { label: "Total Trades", value: String(metrics.totalTrades) },
    { label: "Total R", value: `${metrics.totalR >= 0 ? "+" : ""}${metrics.totalR}R` },
    { label: "Average R", value: `${metrics.avgR >= 0 ? "+" : ""}${metrics.avgR}R` },
    { label: "Win Rate", value: `${metrics.winRate}%` },
    { label: "Total P/L", value: `${metrics.totalPnlPct >= 0 ? "+" : ""}${metrics.totalPnlPct}%` },
    {
      label: "Net Performance",
      value: `${metrics.netPerformanceR >= 0 ? "+" : ""}${metrics.netPerformanceR}R`,
    },
  ];

  return (
    <section id="journal" className="scroll-mt-28 border-y border-border py-24 lg:py-32">
      <div className="mx-auto w-[min(1320px,94vw)]">
        <SectionHeading
          eyebrow="Trading journal"
          title="Performance tracked in risk multiples."
          description="Every published trade feeds the equity curve automatically. Add or edit trades in the admin panel and this section stays in sync."
        />

        <Stagger className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((c) => (
            <StaggerItem key={c.label}>
              <div className="border border-border bg-card p-6">
                <p className="eyebrow text-[0.6rem]">{c.label}</p>
                <p className="num mt-3 text-3xl font-semibold tracking-tight">{c.value}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal delay={0.1} className="mt-10 border border-border bg-card p-5 sm:p-6">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="eyebrow">Equity curve</p>
              <p className="mt-1.5 text-xs text-muted-foreground">
                {chart.fromSeed
                  ? "Sample path · rise → consolidation → breakout (live trades replace this)"
                  : "Cumulative R from published trades · starting at 0R"}
              </p>
            </div>
            <p className="num text-xl font-semibold text-emerald">
              {chart.endR >= 0 ? "+" : ""}
              {chart.endR}R
            </p>
          </div>
          <div className="mt-4 overflow-hidden border border-border bg-white px-2 py-3 sm:px-3">
            {isLoading ? (
              <JournalEquitySkeleton />
            ) : (
              <div className="flex items-stretch gap-3">
                <div className="flex h-[96px] w-12 shrink-0 flex-col justify-between text-right font-mono text-[0.6rem] text-muted-foreground">
                  {axisTicks.map((t) => (
                    <span key={t}>${t}</span>
                  ))}
                </div>
                <div className="min-w-0 flex-1">
                  <GlowLineChart
                    series={chart.series}
                    height={96}
                    chartKey={`journal-equity-${chart.fromSeed ? "seed" : "live"}-${chart.series.length}-${chart.endR}`}
                  />
                </div>
              </div>
            )}
          </div>
        </Reveal>

        <Reveal delay={0.14} className="mt-10">
          <p className="eyebrow">Recent trades</p>
          {recent.length === 0 ? (
            <p className="mt-4 text-sm text-muted-foreground">
              No published trades yet. Add them from the admin journal.
            </p>
          ) : (
            <div className="mt-4 overflow-x-auto border border-border">
              <table className="w-full min-w-[720px] text-left text-sm">
                <thead className="border-b border-border bg-surface font-mono text-[0.65rem] uppercase tracking-[0.14em] text-muted-foreground">
                  <tr>
                    <th className="px-4 py-3 font-medium">Date</th>
                    <th className="px-4 py-3 font-medium">Asset</th>
                    <th className="px-4 py-3 font-medium">Dir</th>
                    <th className="px-4 py-3 font-medium">Entry</th>
                    <th className="px-4 py-3 font-medium">Exit</th>
                    <th className="px-4 py-3 font-medium">R</th>
                    <th className="px-4 py-3 font-medium">P/L %</th>
                  </tr>
                </thead>
                <tbody>
                  {recent.map((t) => (
                    <TradeRow key={t.id} trade={t} />
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Reveal>
      </div>
    </section>
  );
}

function TradeRow({ trade }: { trade: TradeRecord }) {
  const positive = trade.rMultiple >= 0;
  return (
    <tr className="border-b border-border last:border-0">
      <td className="num px-4 py-3 text-muted-foreground">{trade.date}</td>
      <td className="px-4 py-3 font-medium">{trade.instrument}</td>
      <td className="px-4 py-3">{trade.direction}</td>
      <td className="num px-4 py-3">{trade.entry || "—"}</td>
      <td className="num px-4 py-3">{trade.exit || "—"}</td>
      <td className={`num px-4 py-3 font-semibold ${positive ? "text-emerald" : "text-destructive"}`}>
        {positive ? "+" : ""}
        {trade.rMultiple}R
      </td>
      <td className="num px-4 py-3">
        {trade.percentage >= 0 ? "+" : ""}
        {trade.percentage}%
      </td>
    </tr>
  );
}
