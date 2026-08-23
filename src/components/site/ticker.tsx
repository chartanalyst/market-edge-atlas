import { useLivePrices } from "@/hooks/use-live-prices";
import { TrendingDown, TrendingUp } from "lucide-react";
import { useSiteContent } from "@/components/site/content-context";

export function MarketTicker() {
  const { tickerItems } = useSiteContent();
  const symbols = tickerItems.map((item) => item.symbol);
  const live = useLivePrices(symbols);
  const liveCount = Object.keys(live.quotes).length;
  const status =
    liveCount > 0 ? (live.isCached ? "Cached" : live.isFetching ? "Updating" : "Live") : "Fallback";

  const merged = tickerItems.map((t) => {
    const q = live.quotes[t.symbol];
    return q
      ? { ...t, price: q.price, change: q.change, up: q.up, live: true }
      : { ...t, live: false };
  });
  const items = [...merged, ...merged];

  return (
    <div className="relative overflow-hidden border-b border-border bg-surface py-2">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-surface to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-surface to-transparent" />
      <div className="absolute left-3 top-1/2 z-20 hidden -translate-y-1/2 items-center gap-1.5 border border-emerald/30 bg-background/90 px-2 py-1 font-mono text-[0.58rem] uppercase tracking-[0.14em] text-emerald backdrop-blur sm:flex">
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full animate-ping bg-emerald opacity-60" />
          <span className="relative inline-flex h-1.5 w-1.5 bg-emerald" />
        </span>
        {status}
      </div>
      <div className="flex w-max animate-ticker items-center gap-8 pr-8 pl-0 sm:pl-28">
        {items.map((t, i) => (
          <div key={`${t.symbol}-${i}`} className="flex items-center gap-2.5 whitespace-nowrap">
            <span className="num text-xs font-semibold tracking-wide">{t.symbol}</span>
            <span className="num text-xs text-muted-foreground">{t.price}</span>
            <span
              className={
                t.up
                  ? "num flex items-center gap-1 text-xs font-medium text-emerald"
                  : "num flex items-center gap-1 text-xs font-medium text-destructive"
              }
            >
              {t.up ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
              {t.change}
            </span>
            <span className="h-3 w-px bg-hairline" />
          </div>
        ))}
      </div>
    </div>
  );
}
