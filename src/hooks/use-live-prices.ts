import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { getLivePrices } from "@/lib/prices.functions";
import { LIVE_POLL_MS, liveQueryOptions } from "@/lib/live-poll";

/** Shared live quotes for the ticker, hero, and any other price surface. */
export function useLivePrices(symbols: string[] = [], pollMs = LIVE_POLL_MS) {
  const fetchPrices = useServerFn(getLivePrices);
  const { data, isFetching, isPending } = useQuery({
    queryKey: ["live-prices", symbols.join("|")],
    queryFn: () => fetchPrices({ data: { symbols } }),
    ...liveQueryOptions,
    refetchInterval: pollMs,
    staleTime: pollMs / 2,
  });

  return {
    quotes: data?.quotes ?? {},
    /** At least one quote is being served from cache because a provider is unreachable. */
    isStale: data?.stale ?? false,
    isFetching,
    isPending,
  };
}

export function parsePriceNumber(price: string): number | null {
  const n = Number(price.replace(/,/g, ""));
  return Number.isFinite(n) ? n : null;
}
