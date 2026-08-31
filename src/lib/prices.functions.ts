import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { normalizePairKey, resolvePairSource } from "@/lib/market-symbols";
import { tickerItems } from "@/lib/site-data";

export type LiveQuote = {
  symbol: string;
  price: string;
  change: string;
  up: boolean;
  /** Epoch ms the quote was last read from a provider. */
  asOf: number;
  /** True when served from cache because the latest refresh could not reach a provider. */
  stale: boolean;
};

export type BtcChartData = {
  prices: number[];
  /** [open, high, low, close] per candle */
  candles: [number, number, number, number][];
  price: string;
  change: string;
  up: boolean;
};

/** A quote is refetched once it passes this age. */
const FRESH_MS = 45_000;
/**
 * How long a last-known-good quote may still be shown while providers are failing.
 * Past this the symbol is dropped entirely, so the site renders a placeholder
 * rather than a price that no longer reflects the market.
 */
const STALE_MAX_MS = 30 * 60_000;
const REQUEST_TIMEOUT_MS = 8_000;

type RawQuote = Omit<LiveQuote, "asOf" | "stale">;
type CachedQuote = { quote: RawQuote; at: number };

const quoteCache = new Map<string, CachedQuote>();

type ChartCacheEntry = { at: number; data: BtcChartData };
let chartCache: ChartCacheEntry | null = null;
const CHART_TTL_MS = 45_000;

const FX_PAIR = /^[A-Z]{3}\/[A-Z]{3}$/;
/** Quoted like commodities, not like currency pairs, despite the XXX/USD shape. */
const METAL_CODES = new Set(["XAU", "XAG", "XPT", "XPD"]);

/**
 * FX majors are quoted to 4 decimals (3 for JPY crosses); anything else would read
 * as a rounding error to an analyst. Everything else keeps standard price formatting.
 */
function isFxPair(symbol: string): boolean {
  if (!FX_PAIR.test(symbol)) return false;
  if (METAL_CODES.has(symbol.slice(0, 3))) return false;
  return resolvePairSource(symbol)?.provider === "yahoo";
}

function formatPrice(n: number, symbol: string): string {
  if (isFxPair(symbol)) {
    // JPY crosses trade near 150, where 4 decimals is spurious precision.
    const digits = n >= 50 ? 3 : 4;
    return n.toLocaleString("en-US", {
      minimumFractionDigits: digits,
      maximumFractionDigits: digits,
    });
  }

  if (n >= 1000) return n.toLocaleString("en-US", { maximumFractionDigits: 0 });
  if (n >= 1)
    return n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  return n.toLocaleString("en-US", { minimumFractionDigits: 4, maximumFractionDigits: 4 });
}

function formatChange(pct: number): string {
  const sign = pct >= 0 ? "+" : "";
  return `${sign}${pct.toFixed(2)}%`;
}

/** Fetch with a hard timeout and one retry, so a hung upstream cannot stall the request. */
async function fetchJson(url: string, headers: Record<string, string> = {}): Promise<unknown> {
  let lastError: unknown;

  for (let attempt = 0; attempt < 2; attempt += 1) {
    try {
      const res = await fetch(url, {
        headers: { Accept: "application/json", ...headers },
        signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();
    } catch (err) {
      lastError = err;
    }
  }

  throw lastError instanceof Error ? lastError : new Error(String(lastError));
}

const YAHOO_HEADERS = { "User-Agent": "Mozilla/5.0 (compatible; MarketEdgeAtlas/1.0)" };

const TWELVE_DATA_SYMBOLS: Record<string, string> = {
  "BTC/USD": "BTC/USD",
  "ETH/USD": "ETH/USD",
  "SOL/USD": "SOL/USD",
  "EUR/USD": "EUR/USD",
  "GBP/USD": "GBP/USD",
  "USD/JPY": "USD/JPY",
  NVDA: "NVDA",
  NVIDIA: "NVDA",
  AMD: "AMD",
  AAPL: "AAPL",
  MSFT: "MSFT",
  TSLA: "TSLA",
  SPX500: "SPX",
  SPX: "SPX",
  "XAU/USD": "XAU/USD",
  GOLD: "XAU/USD",
  "XAG/USD": "XAG/USD",
  SILVER: "XAG/USD",
};

/** Preferred source when a key is configured: one batched request, licensed data. */
async function fetchTwelveDataQuotes(symbols: string[]): Promise<Record<string, RawQuote>> {
  const apiKey = process.env.TWELVE_DATA_API_KEY || process.env.VITE_TWELVE_DATA_API_KEY || "";
  if (!apiKey) return {};

  const mapped = symbols
    .map((symbol) => ({ symbol, apiSymbol: TWELVE_DATA_SYMBOLS[symbol] }))
    .filter((entry): entry is { symbol: string; apiSymbol: string } => Boolean(entry.apiSymbol));
  if (!mapped.length) return {};

  const apiSymbols = [...new Set(mapped.map((entry) => entry.apiSymbol))].join(",");
  const json = (await fetchJson(
    `https://api.twelvedata.com/quote?symbol=${encodeURIComponent(apiSymbols)}&apikey=${encodeURIComponent(apiKey)}`,
  )) as Record<string, unknown>;

  // A single-symbol request returns the quote object directly rather than keyed by symbol.
  const bySymbol =
    mapped.length === 1 && !json[mapped[0].apiSymbol] ? { [mapped[0].apiSymbol]: json } : json;
  const out: Record<string, RawQuote> = {};

  for (const { symbol, apiSymbol } of mapped) {
    const row = bySymbol[apiSymbol] as { close?: string; percent_change?: string } | undefined;
    const price = Number(row?.close);
    if (!Number.isFinite(price)) continue;
    const change = Number(row?.percent_change);
    const pct = Number.isFinite(change) ? change : 0;
    out[symbol] = {
      symbol,
      price: formatPrice(price, symbol),
      change: formatChange(pct),
      up: pct >= 0,
    };
  }

  return out;
}

async function fetchCrypto(symbols: string[]): Promise<Record<string, RawQuote>> {
  const entries = symbols
    .map((symbol) => {
      const source = resolvePairSource(symbol);
      return source?.provider === "coingecko" ? { symbol, coinId: source.coinId } : null;
    })
    .filter((entry): entry is { symbol: string; coinId: string } => Boolean(entry));
  if (!entries.length) return {};

  const ids = [...new Set(entries.map((entry) => entry.coinId))].join(",");
  const data = (await fetchJson(
    `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd&include_24hr_change=true`,
  )) as Record<string, { usd?: number; usd_24h_change?: number }>;

  const out: Record<string, RawQuote> = {};
  for (const { symbol, coinId } of entries) {
    const row = data[coinId];
    if (typeof row?.usd !== "number") continue;
    const change = row.usd_24h_change ?? 0;
    out[symbol] = {
      symbol,
      price: formatPrice(row.usd, symbol),
      change: formatChange(change),
      up: change >= 0,
    };
  }
  return out;
}

/**
 * Yahoo's v7 `/finance/quote` batch endpoint now answers 401 for unauthenticated
 * callers, so every quote goes through the v8 chart endpoint, which is still open.
 */
async function fetchYahooQuotes(symbols: string[]): Promise<Record<string, RawQuote>> {
  const entries = symbols
    .map((symbol) => {
      const source = resolvePairSource(symbol);
      return source?.provider === "yahoo" ? { symbol, yahooSymbol: source.symbol } : null;
    })
    .filter((entry): entry is { symbol: string; yahooSymbol: string } => Boolean(entry));
  if (!entries.length) return {};

  const out: Record<string, RawQuote> = {};

  await Promise.all(
    entries.map(async ({ symbol, yahooSymbol }) => {
      try {
        const json = (await fetchJson(
          `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(yahooSymbol)}?range=1d&interval=1d`,
          YAHOO_HEADERS,
        )) as {
          chart?: {
            result?: Array<{
              meta?: {
                regularMarketPrice?: number;
                chartPreviousClose?: number;
                previousClose?: number;
                regularMarketPreviousClose?: number;
              };
            }>;
          };
        };

        const meta = json.chart?.result?.[0]?.meta;
        const price = meta?.regularMarketPrice;
        if (typeof price !== "number") return;

        const previous =
          meta?.chartPreviousClose ?? meta?.regularMarketPreviousClose ?? meta?.previousClose;
        const change =
          typeof previous === "number" && previous > 0 ? ((price - previous) / previous) * 100 : 0;

        out[symbol] = {
          symbol,
          price: formatPrice(price, symbol),
          change: formatChange(change),
          up: change >= 0,
        };
      } catch {
        // Leave the symbol out; the caller falls back to the last known good quote.
      }
    }),
  );

  return out;
}

/** Twelve Data covers what it can; the free sources fill in the rest. */
async function fetchQuotes(symbols: string[]): Promise<Record<string, RawQuote>> {
  const out: Record<string, RawQuote> = {};

  const licensed = await fetchTwelveDataQuotes(symbols).catch(
    () => ({}) as Record<string, RawQuote>,
  );
  Object.assign(out, licensed);

  const remaining = symbols.filter((symbol) => !out[symbol]);
  if (remaining.length) {
    const [crypto, yahoo] = await Promise.all([
      fetchCrypto(remaining).catch(() => ({}) as Record<string, RawQuote>),
      fetchYahooQuotes(remaining).catch(() => ({}) as Record<string, RawQuote>),
    ]);
    Object.assign(out, crypto, yahoo);
  }

  return out;
}

const livePricesInput = z
  .object({ symbols: z.array(z.string().trim().min(1).max(80)).max(40).optional() })
  .optional();

export const getLivePrices = createServerFn({ method: "GET" })
  .validator((input: unknown) => livePricesInput.parse(input))
  .handler(async ({ data }) => {
    const requested = data?.symbols?.length ? data.symbols : tickerItems.map((item) => item.symbol);
    const symbols = [...new Set(requested.map(normalizePairKey).filter(Boolean))];

    const needsRefresh = symbols.filter((symbol) => {
      const entry = quoteCache.get(symbol);
      return !entry || Date.now() - entry.at >= FRESH_MS;
    });

    if (needsRefresh.length) {
      try {
        const fetched = await fetchQuotes(needsRefresh);
        const at = Date.now();
        for (const [symbol, quote] of Object.entries(fetched)) {
          quoteCache.set(symbol, { quote, at });
        }
      } catch (err) {
        console.error("[prices]", err);
      }
    }

    const now = Date.now();
    const quotes: Record<string, LiveQuote> = {};
    let stale = false;

    for (const symbol of symbols) {
      const entry = quoteCache.get(symbol);
      if (!entry) continue;

      const age = now - entry.at;
      // Too old to stand behind: drop it so the UI shows a placeholder, not a wrong price.
      if (age > STALE_MAX_MS) {
        quoteCache.delete(symbol);
        continue;
      }

      const isStale = age >= FRESH_MS;
      if (isStale) stale = true;
      quotes[symbol] = { ...entry.quote, asOf: entry.at, stale: isStale };
    }

    return { quotes, stale, asOf: now };
  });

function sampleSeries(values: number[], target = 36): number[] {
  if (values.length <= target) return values;
  const step = (values.length - 1) / (target - 1);
  return Array.from({ length: target }, (_, i) => values[Math.round(i * step)]);
}

async function fetchBtcChart(): Promise<BtcChartData> {
  const [chartJson, ohlcJson, spotJson] = await Promise.all([
    fetchJson(
      "https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=7",
    ) as Promise<{ prices?: [number, number][] }>,
    fetchJson(
      "https://api.coingecko.com/api/v3/coins/bitcoin/ohlc?vs_currency=usd&days=7",
    ) as Promise<[number, number, number, number, number][]>,
    fetchJson(
      "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd&include_24hr_change=true",
    ).catch(() => ({})) as Promise<{ bitcoin?: { usd?: number; usd_24h_change?: number } }>,
  ]);

  const rawPrices = (chartJson.prices ?? []).map(([, p]) => p);
  const prices = sampleSeries(rawPrices);
  const candles = (Array.isArray(ohlcJson) ? ohlcJson : []).map(
    (row) => [row[1], row[2], row[3], row[4]] as [number, number, number, number],
  );

  const usd = spotJson.bitcoin?.usd ?? rawPrices[rawPrices.length - 1] ?? 0;
  const changePct = spotJson.bitcoin?.usd_24h_change ?? 0;

  return {
    prices: prices.length > 1 ? prices : rawPrices,
    candles: candles.length > 0 ? candles.slice(-14) : [],
    price: formatPrice(usd, "BTC/USD"),
    change: formatChange(changePct),
    up: changePct >= 0,
  };
}

export const getBtcMarketChart = createServerFn({ method: "GET" }).handler(
  async (): Promise<BtcChartData> => {
    if (chartCache && Date.now() - chartCache.at < CHART_TTL_MS) {
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
  },
);
