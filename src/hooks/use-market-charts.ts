import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { getMarketCharts, type MarketChartSnapshot } from "@/lib/market-charts.functions";
import { normalizePairKey } from "@/lib/market-symbols";
import { LIVE_POLL_MS, liveQueryOptions } from "@/lib/live-poll";

/** Live 7-day price series + spot quote for analysis cards (CoinGecko / Yahoo, auto-refresh). */
export function useMarketCharts(pairs: string[], pollMs = LIVE_POLL_MS) {
  const fetchCharts = useServerFn(getMarketCharts);

  const pairKey = useMemo(
    () => [...new Set(pairs.map(normalizePairKey).filter(Boolean))].sort().join("|"),
    [pairs],
  );

  const uniquePairs = useMemo(() => (pairKey ? pairKey.split("|") : []), [pairKey]);

  const { data: charts = {}, isLoading, dataUpdatedAt } = useQuery({
    queryKey: ["market-charts", pairKey],
    queryFn: () => fetchCharts({ data: { pairs: uniquePairs } }),
    enabled: uniquePairs.length > 0,
    ...liveQueryOptions,
    refetchInterval: pollMs,
    staleTime: pollMs / 2,
  });

  return { charts, loading: isLoading, updatedAt: dataUpdatedAt };
}

export function getChartForPair(
  charts: Record<string, MarketChartSnapshot>,
  pair: string,
): MarketChartSnapshot | undefined {
  return charts[normalizePairKey(pair)];
}

export type { MarketChartSnapshot };
