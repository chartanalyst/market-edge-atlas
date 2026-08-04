import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { getBtcMarketChart, type BtcChartData } from "@/lib/prices.functions";
import { LIVE_POLL_MS, liveQueryOptions } from "@/lib/live-poll";

/** Live BTC area + candle series for the hero panel (CoinGecko, auto-refresh). */
export function useBtcMarketChart(pollMs = LIVE_POLL_MS) {
  const fetchChart = useServerFn(getBtcMarketChart);
  const { data = null, isLoading, dataUpdatedAt } = useQuery({
    queryKey: ["btc-market-chart"],
    queryFn: () => fetchChart(),
    ...liveQueryOptions,
    refetchInterval: pollMs,
    staleTime: pollMs / 2,
  });

  return { data, loading: isLoading, updatedAt: dataUpdatedAt };
}

export type { BtcChartData };
