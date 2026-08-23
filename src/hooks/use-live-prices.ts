import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { getLivePrices } from "@/lib/prices.functions";
import { LIVE_POLL_MS, liveQueryOptions } from "@/lib/live-poll";

/** Shared live quotes for ticker, hero, and any other price surfaces. */
export function useLivePrices(symbols: string[] = [], pollMs = LIVE_POLL_MS) {
  const fetchPrices = useServerFn(getLivePrices);
  const { data, isFetching } = useQuery({
    queryKey: ["live-prices", symbols.join("|")],
    queryFn: () => fetchPrices({ data: { symbols } }),
    ...liveQueryOptions,
    refetchInterval: pollMs,
    staleTime: pollMs / 2,
  });

  return { quotes: data?.quotes ?? {}, isCached: data?.cached ?? false, isFetching };
}

export function parsePriceNumber(price: string): number | null {
  const n = Number(price.replace(/,/g, ""));
  return Number.isFinite(n) ? n : null;
}
