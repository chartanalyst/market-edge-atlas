import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { normalizePairKey, resolvePairSource } from "@/lib/market-symbols";

export type MarketChartSnapshot = {
  pair: string;
  prices: number[];
  price: string;
  change: string;
  up: boolean;
  /** Epoch ms the snapshot was last read from a provider. */
  asOf: number;
  /** True when served from cache because the latest refresh could not reach a provider. */
  stale: boolean;
};

type RawSnapshot = Omit<MarketChartSnapshot, "asOf" | "stale">;
type CachedSnapshot = { snapshot: RawSnapshot; at: number };

/**
 * Cached per pair rather than per request, so a page asking for a different set of
 * pairs cannot evict another page's data and force a refetch.
 */
const snapshotCache = new Map<string, CachedSnapshot>();

const FRESH_MS = 45_000;
const STALE_MAX_MS = 30 * 60_000;
const REQUEST_TIMEOUT_MS = 8_000;

const FX_PAIR = /^[A-Z]{3}\/[A-Z]{3}$/;
/** Quoted like commodities, not like currency pairs, despite the XXX/USD shape. */
const METAL_CODES = new Set(["XAU", "XAG", "XPT", "XPD"]);

function isFxPair(symbol: string): boolean {
  if (!FX_PAIR.test(symbol)) return false;
  if (METAL_CODES.has(symbol.slice(0, 3))) return false;
  return resolvePairSource(symbol)?.provider === "yahoo";
}

/** FX majors need 4 decimals (3 for JPY crosses); 2 would read as a rounding error. */
function formatPrice(n: number, symbol: string): string {
  if (isFxPair(symbol)) {
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

function sampleSeries(values: number[], target = 36): number[] {
  if (values.length <= target) return values;
  const step = (values.length - 1) / (target - 1);
  return Array.from({ length: target }, (_, i) => values[Math.round(i * step)]);
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

type CoinGeckoMarketRow = {
  id: string;
  current_price?: number;
  price_change_percentage_24h?: number;
  sparkline_in_7d?: { price?: number[] };
};

async function fetchCoinGeckoBatch(
  entries: { pairKey: string; coinId: string }[],
): Promise<Record<string, RawSnapshot>> {
  if (!entries.length) return {};

  const ids = [...new Set(entries.map((e) => e.coinId))].join(",");
  const rows = (await fetchJson(
    `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${ids}&sparkline=true&price_change_percentage=24h`,
  )) as CoinGeckoMarketRow[];

  const byId = new Map((Array.isArray(rows) ? rows : []).map((r) => [r.id, r]));
  const out: Record<string, RawSnapshot> = {};

  for (const { pairKey, coinId } of entries) {
    const row = byId.get(coinId);
    const raw = row?.sparkline_in_7d?.price ?? [];
    const prices = sampleSeries(raw.filter((v) => Number.isFinite(v)));
    if (prices.length < 2 || row?.current_price == null) continue;
    const changePct = row.price_change_percentage_24h ?? 0;
    out[pairKey] = {
      pair: pairKey,
      prices,
      price: formatPrice(row.current_price, pairKey),
      change: formatChange(changePct),
      up: changePct >= 0,
    };
  }

  return out;
}

async function fetchYahooChart(
  symbol: string,
): Promise<{ prices: number[]; price: number; changePct: number } | null> {
  try {
    const json = (await fetchJson(
      `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(symbol)}?range=7d&interval=1h`,
      YAHOO_HEADERS,
    )) as {
      chart?: {
        result?: Array<{
          meta?: { regularMarketPrice?: number; chartPreviousClose?: number };
          indicators?: { quote?: Array<{ close?: Array<number | null> }> };
        }>;
      };
    };

    const result = json.chart?.result?.[0];
    if (!result) return null;

    const closes = (result.indicators?.quote?.[0]?.close ?? []).filter(
      (v): v is number => typeof v === "number" && Number.isFinite(v),
    );
    if (closes.length < 2) return null;

    const meta = result.meta ?? {};
    const price = meta.regularMarketPrice ?? closes[closes.length - 1]!;
    const prev = meta.chartPreviousClose ?? closes[0]!;
    const changePct = prev ? ((price - prev) / prev) * 100 : 0;

    return { prices: sampleSeries(closes), price, changePct };
  } catch {
    return null;
  }
}

async function fetchChartsForPairs(pairs: string[]): Promise<Record<string, RawSnapshot>> {
  const coingecko: { pairKey: string; coinId: string }[] = [];
  const yahoo: { pairKey: string; symbol: string }[] = [];

  for (const pairKey of pairs) {
    const source = resolvePairSource(pairKey);
    if (!source) continue;
    if (source.provider === "coingecko") {
      coingecko.push({ pairKey, coinId: source.coinId });
    } else {
      yahoo.push({ pairKey, symbol: source.symbol });
    }
  }

  const [cryptoCharts, yahooResults] = await Promise.all([
    fetchCoinGeckoBatch(coingecko).catch(() => ({}) as Record<string, RawSnapshot>),
    Promise.all(
      yahoo.map(async ({ pairKey, symbol }) => {
        const chart = await fetchYahooChart(symbol);
        if (!chart) return null;
        return [
          pairKey,
          {
            pair: pairKey,
            prices: chart.prices,
            price: formatPrice(chart.price, pairKey),
            change: formatChange(chart.changePct),
            up: chart.changePct >= 0,
          } satisfies RawSnapshot,
        ] as const;
      }),
    ),
  ]);

  const out = { ...cryptoCharts };
  for (const row of yahooResults) {
    if (row) out[row[0]] = row[1];
  }
  return out;
}

export const getMarketCharts = createServerFn({ method: "POST" })
  .validator((input: unknown) =>
    z.object({ pairs: z.array(z.string().trim().min(1).max(80)).max(24) }).parse(input),
  )
  .handler(async ({ data }): Promise<Record<string, MarketChartSnapshot>> => {
    const pairs = [...new Set(data.pairs.map(normalizePairKey).filter(Boolean))];

    const needsRefresh = pairs.filter((pair) => {
      const entry = snapshotCache.get(pair);
      return !entry || Date.now() - entry.at >= FRESH_MS;
    });

    if (needsRefresh.length) {
      try {
        const fetched = await fetchChartsForPairs(needsRefresh);
        const at = Date.now();
        for (const [pair, snapshot] of Object.entries(fetched)) {
          snapshotCache.set(pair, { snapshot, at });
        }
      } catch (err) {
        console.error("[market-charts]", err);
      }
    }

    const now = Date.now();
    const out: Record<string, MarketChartSnapshot> = {};

    for (const pair of pairs) {
      const entry = snapshotCache.get(pair);
      if (!entry) continue;

      const age = now - entry.at;
      // Too old to stand behind: drop it so the card shows a placeholder, not a wrong price.
      if (age > STALE_MAX_MS) {
        snapshotCache.delete(pair);
        continue;
      }

      out[pair] = { ...entry.snapshot, asOf: entry.at, stale: age >= FRESH_MS };
    }

    return out;
  });
