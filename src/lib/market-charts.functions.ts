import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { normalizePairKey, resolvePairSource } from "@/lib/market-symbols";

export type MarketChartSnapshot = {
  pair: string;
  prices: number[];
  price: string;
  change: string;
  up: boolean;
};

type ChartsCacheEntry = { at: number; key: string; data: Record<string, MarketChartSnapshot> };
let chartsCache: ChartsCacheEntry | null = null;
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

function sampleSeries(values: number[], target = 36): number[] {
  if (values.length <= target) return values;
  const step = (values.length - 1) / (target - 1);
  return Array.from({ length: target }, (_, i) => values[Math.round(i * step)]);
}

type CoinGeckoMarketRow = {
  id: string;
  current_price?: number;
  price_change_percentage_24h?: number;
  sparkline_in_7d?: { price?: number[] };
};

async function fetchCoinGeckoBatch(
  entries: { pairKey: string; coinId: string }[],
): Promise<Record<string, MarketChartSnapshot>> {
  if (!entries.length) return {};
  const ids = [...new Set(entries.map((e) => e.coinId))].join(",");
  const res = await fetch(
    `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${ids}&sparkline=true&price_change_percentage=24h`,
    { headers: { Accept: "application/json" } },
  );
  if (!res.ok) throw new Error(`CoinGecko markets ${res.status}`);

  const rows = (await res.json()) as CoinGeckoMarketRow[];
  const byId = new Map(rows.map((r) => [r.id, r]));
  const out: Record<string, MarketChartSnapshot> = {};

  for (const { pairKey, coinId } of entries) {
    const row = byId.get(coinId);
    const raw = row?.sparkline_in_7d?.price ?? [];
    const prices = sampleSeries(raw.filter((v) => Number.isFinite(v)));
    if (prices.length < 2 || row?.current_price == null) continue;
    const changePct = row.price_change_percentage_24h ?? 0;
    out[pairKey] = {
      pair: pairKey,
      prices,
      price: formatPrice(row.current_price),
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
    const res = await fetch(
      `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(symbol)}?range=7d&interval=1h`,
      {
        headers: {
          Accept: "application/json",
          "User-Agent": "Mozilla/5.0 (compatible; MarketEdgeAtlas/1.0)",
        },
      },
    );
    if (!res.ok) return null;

    const json = (await res.json()) as {
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

async function fetchChartsForPairs(pairs: string[]): Promise<Record<string, MarketChartSnapshot>> {
  const unique = [...new Set(pairs.map(normalizePairKey).filter(Boolean))];
  const coingecko: { pairKey: string; coinId: string }[] = [];
  const yahoo: { pairKey: string; symbol: string }[] = [];

  for (const pairKey of unique) {
    const source = resolvePairSource(pairKey);
    if (!source) continue;
    if (source.provider === "coingecko") {
      coingecko.push({ pairKey, coinId: source.coinId });
    } else {
      yahoo.push({ pairKey, symbol: source.symbol });
    }
  }

  const [cryptoCharts, yahooResults] = await Promise.all([
    fetchCoinGeckoBatch(coingecko).catch(() => ({} as Record<string, MarketChartSnapshot>)),
    Promise.all(
      yahoo.map(async ({ pairKey, symbol }) => {
        const chart = await fetchYahooChart(symbol);
        if (!chart) return null;
        return [
          pairKey,
          {
            pair: pairKey,
            prices: chart.prices,
            price: formatPrice(chart.price),
            change: formatChange(chart.changePct),
            up: chart.changePct >= 0,
          } satisfies MarketChartSnapshot,
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
    const cacheKey = [...new Set(data.pairs.map(normalizePairKey))].sort().join("|");
    if (chartsCache && Date.now() - chartsCache.at < TTL_MS && chartsCache.key === cacheKey) {
      return chartsCache.data;
    }

    try {
      const charts = await fetchChartsForPairs(data.pairs);
      chartsCache = { at: Date.now(), key: cacheKey, data: charts };
      return charts;
    } catch (err) {
      console.error("[market-charts]", err);
      if (chartsCache?.key === cacheKey) return chartsCache.data;
      return {};
    }
  });
