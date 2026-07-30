import { tickerItems } from "@/lib/site-data";
import { TrendingDown, TrendingUp } from "lucide-react";

export function MarketTicker() {
  const items = [...tickerItems, ...tickerItems];
  return (
    <div className="relative overflow-hidden border-y border-border bg-surface py-3">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-background to-transparent" />
      <div className="flex w-max animate-ticker items-center gap-8 pr-8">
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
