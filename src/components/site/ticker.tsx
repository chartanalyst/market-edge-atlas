import { useLivePrices } from "@/hooks/use-live-prices";
import { TrendingDown, TrendingUp } from "lucide-react";
import { useSiteContent } from "@/components/site/content-context";
import { normalizePairKey } from "@/lib/market-symbols";
import type { LiveQuote } from "@/lib/prices.functions";

type TickerRow = {
  symbol: string;
  quote: LiveQuote | undefined;
};

/**
 * Status reflects the data actually on screen. Instruments without a live quote
 * render a placeholder rather than a stored price, so nothing on the bar is invented.
 */
function resolveStatus(rows: TickerRow[], isPending: boolean) {
  const withQuote = rows.filter((row) => row.quote);

  if (!withQuote.length) return isPending ? "Connecting" : "Unavailable";
  if (withQuote.some((row) => row.quote?.stale)) return "Delayed";
  if (withQuote.length < rows.length) return "Partial";
  return "Live";
}

export function MarketTicker() {
  const { tickerItems } = useSiteContent();
  const symbols = tickerItems.map((item) => item.symbol);
  const { quotes, isFetching, isPending } = useLivePrices(symbols);

  const rows: TickerRow[] = tickerItems.map((item) => ({
    symbol: item.symbol,
    quote: quotes[normalizePairKey(item.symbol)],
  }));

  const status = resolveStatus(rows, isPending || isFetching);
  const isHealthy = status === "Live";
  const items = [...rows, ...rows];

  return (
    <div className="relative overflow-hidden border-b border-border bg-surface py-2">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-surface to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-surface to-transparent" />
      <div
        className={
          isHealthy
            ? "absolute left-3 top-1/2 z-20 flex -translate-y-1/2 items-center gap-1.5 border border-emerald/30 bg-background/90 px-2 py-1 font-mono text-[0.58rem] uppercase tracking-[0.14em] text-emerald backdrop-blur"
            : "absolute left-3 top-1/2 z-20 flex -translate-y-1/2 items-center gap-1.5 border border-border bg-background/90 px-2 py-1 font-mono text-[0.58rem] uppercase tracking-[0.14em] text-muted-foreground backdrop-blur"
        }
        aria-live="polite"
      >
        <span className="relative flex h-1.5 w-1.5">
          {isHealthy ? (
            <span className="absolute inline-flex h-full w-full animate-ping bg-emerald opacity-60" />
          ) : null}
          <span
            className={
              isHealthy
                ? "relative inline-flex h-1.5 w-1.5 bg-emerald"
                : "relative inline-flex h-1.5 w-1.5 bg-muted-foreground"
            }
          />
        </span>
        {status}
      </div>

      <div className="flex w-max animate-ticker items-center gap-8 pr-8 pl-28">
        {items.map((row, i) => (
          <div key={`${row.symbol}-${i}`} className="flex items-center gap-2.5 whitespace-nowrap">
            <span className="num text-xs font-semibold tracking-wide">{row.symbol}</span>

            {row.quote ? (
              <>
                <span
                  className={
                    row.quote.stale
                      ? "num text-xs text-muted-foreground/70"
                      : "num text-xs text-muted-foreground"
                  }
                  title={
                    row.quote.stale
                      ? `Last update ${new Date(row.quote.asOf).toLocaleTimeString()}`
                      : undefined
                  }
                >
                  {row.quote.price}
                </span>
                <span
                  className={
                    row.quote.up
                      ? "num flex items-center gap-1 text-xs font-medium text-emerald"
                      : "num flex items-center gap-1 text-xs font-medium text-destructive"
                  }
                >
                  {row.quote.up ? (
                    <TrendingUp className="h-3 w-3" />
                  ) : (
                    <TrendingDown className="h-3 w-3" />
                  )}
                  {row.quote.change}
                </span>
              </>
            ) : (
              <span className="num text-xs text-muted-foreground/50" title="Awaiting live quote">
                —
              </span>
            )}

            <span className="h-3 w-px bg-hairline" />
          </div>
        ))}
      </div>
    </div>
  );
}
