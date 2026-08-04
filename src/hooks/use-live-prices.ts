import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { getLivePrices } from "@/lib/prices.functions";
import { LIVE_POLL_MS, liveQueryOptions } from "@/lib/live-poll";

/** Shared live quotes for ticker, hero, and any other price surfaces. */
export function useLivePrices(pollMs = LIVE_POLL_MS) {
  const fetchPrices = useServerFn(getLivePrices);
  const { data } = useQuery({
    queryKey: ["live-prices"],
    queryFn: () => fetchPrices(),
    ...liveQueryOptions,
    refetchInterval: pollMs,
    staleTime: pollMs / 2,
  });

  return data?.quotes ?? {};
}

export function parsePriceNumber(price: string): number | null {
  const n = Number(price.replace(/,/g, ""));
  return Number.isFinite(n) ? n : null;
}
