import { createServerFn } from "@tanstack/react-start";

export type LiveQuote = {
  symbol: string;
  price: string;
  change: string;
  up: boolean;
};

type CacheEntry = { at: number; quotes: Record<string, LiveQuote> };

let cache: CacheEntry | null = null;
const TTL_MS = 45_000;

function formatPrice(n: number): string {
  if (n >= 1000) return n.toLocaleString("en-US", { maximumFractionDigits: 0 });
  if (n >= 1) return n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  return n.toLocaleString("en-US", { minimumFractionDigits: 4, maximumFractionDigits: 4 });
}

function formatChange(pct: number): string {
  const sign = pct >= 0 ? "+" : "";
  return `${sign}${pct.toFixed(2)}%`;
}

async function fetchCrypto(): Promise<Record<string, LiveQuote>> {
  const ids = "bitcoin,ethereum,solana";
  const res = await fetch(
    `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd&include_24hr_change=true`,
    { headers: { Accept: "application/json" } },
  );
  if (!res.ok) throw new Error(`CoinGecko ${res.status}`);
  const data = (await res.json()) as Record<string, { usd: number; usd_24h_change?: number }>;

  const map: Record<string, { id: string; symbol: string }> = {
    "BTC/USD": { id: "bitcoin", symbol: "BTC/USD" },
    "ETH/USD": { id: "ethereum", symbol: "ETH/USD" },
    "SOL/USD": { id: "solana", symbol: "SOL/USD" },
  };

  const out: Record<string, LiveQuote> = {};
  for (const [symbol, meta] of Object.entries(map)) {
    const row = data[meta.id];
    if (!row?.usd) continue;
    const change = row.usd_24h_change ?? 0;
    out[symbol] = {
      symbol,
      price: formatPrice(row.usd),
      change: formatChange(change),
      up: change >= 0,
    };
  }
  return out;
}

/** Best-effort gold spot via metals-api style free endpoint; fail soft. */
async function fetchGold(): Promise<Record<string, LiveQuote>> {
  try {
    const res = await fetch("https://api.gold-api.com/price/XAU", {
      headers: { Accept: "application/json" },
    });
    if (!res.ok) return {};
    const data = (await res.json()) as { price?: number; change_percentage?: number };
    if (typeof data.price !== "number") return {};
    const change = data.change_percentage ?? 0;
    return {
      "XAU/USD": {
        symbol: "XAU/USD",
        price: formatPrice(data.price),
        change: formatChange(change),
        up: change >= 0,
      },
    };
  } catch {
    return {};
  }
}

export const getLivePrices = createServerFn({ method: "GET" }).handler(async () => {
  if (cache && Date.now() - cache.at < TTL_MS) {
    return { quotes: cache.quotes, cached: true as const };
  }

  try {
    const [crypto, gold] = await Promise.all([fetchCrypto(), fetchGold()]);
    const quotes = { ...crypto, ...gold };
    cache = { at: Date.now(), quotes };
    return { quotes, cached: false as const };
  } catch (err) {
    console.error("[prices]", err);
    if (cache) return { quotes: cache.quotes, cached: true as const };
    return { quotes: {} as Record<string, LiveQuote>, cached: false as const };
  }
});
