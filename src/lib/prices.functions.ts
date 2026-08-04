import { createServerFn } from "@tanstack/react-start";

export type LiveQuote = {
  symbol: string;
  price: string;
  change: string;
  up: boolean;
};

export type BtcChartData = {
  prices: number[];
  /** [open, high, low, close] per candle */
  candles: [number, number, number, number][];
  price: string;
  change: string;
  up: boolean;
};

type CacheEntry = { at: number; quotes: Record<string, LiveQuote> };
type ChartCacheEntry = { at: number; data: BtcChartData };

let cache: CacheEntry | null = null;
let chartCache: ChartCacheEntry | null = null;
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

function sampleSeries(values: number[], target = 36): number[] {
  if (values.length <= target) return values;
  const step = (values.length - 1) / (target - 1);
  return Array.from({ length: target }, (_, i) => values[Math.round(i * step)]);
}

async function fetchBtcChart(): Promise<BtcChartData> {
  const [chartRes, ohlcRes, spotRes] = await Promise.all([
    fetch(
      "https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=7",
      { headers: { Accept: "application/json" } },
    ),
    fetch(
      "https://api.coingecko.com/api/v3/coins/bitcoin/ohlc?vs_currency=usd&days=7",
      { headers: { Accept: "application/json" } },
    ),
    fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd&include_24hr_change=true",
      { headers: { Accept: "application/json" } },
    ),
  ]);

  if (!chartRes.ok || !ohlcRes.ok) throw new Error(`CoinGecko chart ${chartRes.status}`);

  const chartJson = (await chartRes.json()) as { prices?: [number, number][] };
  const ohlcJson = (await ohlcRes.json()) as [number, number, number, number, number][];
  const spotJson = (await spotRes.json().catch(() => ({}))) as {
    bitcoin?: { usd?: number; usd_24h_change?: number };
  };

  const rawPrices = (chartJson.prices ?? []).map(([, p]) => p);
  const prices = sampleSeries(rawPrices);
  const candles = ohlcJson.map((row) => [row[1], row[2], row[3], row[4]] as [number, number, number, number]);

  const usd = spotJson.bitcoin?.usd ?? rawPrices[rawPrices.length - 1] ?? 0;
  const changePct = spotJson.bitcoin?.usd_24h_change ?? 0;

  return {
    prices: prices.length > 1 ? prices : rawPrices,
    candles: candles.length > 0 ? candles.slice(-14) : [],
    price: formatPrice(usd),
    change: formatChange(changePct),
    up: changePct >= 0,
  };
}

export const getBtcMarketChart = createServerFn({ method: "GET" }).handler(async (): Promise<BtcChartData> => {
  if (chartCache && Date.now() - chartCache.at < TTL_MS) {
    return chartCache.data;
  }

  try {
    const data = await fetchBtcChart();
    chartCache = { at: Date.now(), data };
    return data;
  } catch (err) {
    console.error("[prices] btc chart", err);
    if (chartCache) return chartCache.data;
    throw err;
  }
});
