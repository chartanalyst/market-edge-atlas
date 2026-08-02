import { useEffect, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { getLivePrices, type LiveQuote } from "@/lib/prices.functions";

/** Shared live quotes for ticker, hero, and any other price surfaces. */
export function useLivePrices(pollMs = 60_000) {
  const fetchPrices = useServerFn(getLivePrices);
  const [quotes, setQuotes] = useState<Record<string, LiveQuote>>({});

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      try {
        const res = await fetchPrices();
        if (!cancelled) setQuotes(res.quotes ?? {});
      } catch {
        /* keep fallbacks */
      }
    };
    load();
    const id = window.setInterval(load, pollMs);
    return () => {
      cancelled = true;
      window.clearInterval(id);
    };
  }, [fetchPrices, pollMs]);

  return quotes;
}

export function parsePriceNumber(price: string): number | null {
  const n = Number(price.replace(/,/g, ""));
  return Number.isFinite(n) ? n : null;
}
