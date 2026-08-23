import { c as createServerFn } from "./createServerFn-CIHAFgYl.mjs";
import { It as objectType, Lt as stringType, Mt as arrayType } from "../_libs/@ai-sdk/gateway+[...].mjs";
import { t as createServerRpc } from "./createServerRpc-B90ckaqP.mjs";
import { n as resolvePairSource, t as normalizePairKey } from "./market-symbols-CRwjrnsQ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/market-charts.functions-B8eF-eP8.js
var chartsCache = null;
var TTL_MS = 45e3;
function formatPrice(n) {
	if (n >= 1e3) return n.toLocaleString("en-US", { maximumFractionDigits: 0 });
	if (n >= 1) return n.toLocaleString("en-US", {
		minimumFractionDigits: 2,
		maximumFractionDigits: 2
	});
	return n.toLocaleString("en-US", {
		minimumFractionDigits: 4,
		maximumFractionDigits: 4
	});
}
function formatChange(pct) {
	return `${pct >= 0 ? "+" : ""}${pct.toFixed(2)}%`;
}
function sampleSeries(values, target = 36) {
	if (values.length <= target) return values;
	const step = (values.length - 1) / (target - 1);
	return Array.from({ length: target }, (_, i) => values[Math.round(i * step)]);
}
async function fetchCoinGeckoBatch(entries) {
	if (!entries.length) return {};
	const ids = [...new Set(entries.map((e) => e.coinId))].join(",");
	const res = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${ids}&sparkline=true&price_change_percentage=24h`, { headers: { Accept: "application/json" } });
	if (!res.ok) throw new Error(`CoinGecko markets ${res.status}`);
	const rows = await res.json();
	const byId = new Map(rows.map((r) => [r.id, r]));
	const out = {};
	for (const { pairKey, coinId } of entries) {
		const row = byId.get(coinId);
		const prices = sampleSeries((row?.sparkline_in_7d?.price ?? []).filter((v) => Number.isFinite(v)));
		if (prices.length < 2 || row?.current_price == null) continue;
		const changePct = row.price_change_percentage_24h ?? 0;
		out[pairKey] = {
			pair: pairKey,
			prices,
			price: formatPrice(row.current_price),
			change: formatChange(changePct),
			up: changePct >= 0
		};
	}
	return out;
}
async function fetchYahooChart(symbol) {
	try {
		const res = await fetch(`https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(symbol)}?range=7d&interval=1h`, { headers: {
			Accept: "application/json",
			"User-Agent": "Mozilla/5.0 (compatible; MarketEdgeAtlas/1.0)"
		} });
		if (!res.ok) return null;
		const result = (await res.json()).chart?.result?.[0];
		if (!result) return null;
		const closes = (result.indicators?.quote?.[0]?.close ?? []).filter((v) => typeof v === "number" && Number.isFinite(v));
		if (closes.length < 2) return null;
		const meta = result.meta ?? {};
		const price = meta.regularMarketPrice ?? closes[closes.length - 1];
		const prev = meta.chartPreviousClose ?? closes[0];
		const changePct = prev ? (price - prev) / prev * 100 : 0;
		return {
			prices: sampleSeries(closes),
			price,
			changePct
		};
	} catch {
		return null;
	}
}
async function fetchChartsForPairs(pairs) {
	const unique = [...new Set(pairs.map(normalizePairKey).filter(Boolean))];
	const coingecko = [];
	const yahoo = [];
	for (const pairKey of unique) {
		const source = resolvePairSource(pairKey);
		if (!source) continue;
		if (source.provider === "coingecko") coingecko.push({
			pairKey,
			coinId: source.coinId
		});
		else yahoo.push({
			pairKey,
			symbol: source.symbol
		});
	}
	const [cryptoCharts, yahooResults] = await Promise.all([fetchCoinGeckoBatch(coingecko).catch(() => ({})), Promise.all(yahoo.map(async ({ pairKey, symbol }) => {
		const chart = await fetchYahooChart(symbol);
		if (!chart) return null;
		return [pairKey, {
			pair: pairKey,
			prices: chart.prices,
			price: formatPrice(chart.price),
			change: formatChange(chart.changePct),
			up: chart.changePct >= 0
		}];
	}))]);
	const out = { ...cryptoCharts };
	for (const row of yahooResults) if (row) out[row[0]] = row[1];
	return out;
}
var getMarketCharts_createServerFn_handler = createServerRpc({
	id: "51d6cb024544966651441616d2966700e6ed07e2adf3970cd9a99c4b7afbf399",
	name: "getMarketCharts",
	filename: "src/lib/market-charts.functions.ts"
}, (opts) => getMarketCharts.__executeServer(opts));
var getMarketCharts = createServerFn({ method: "POST" }).validator((input) => objectType({ pairs: arrayType(stringType().trim().min(1).max(80)).max(24) }).parse(input)).handler(getMarketCharts_createServerFn_handler, async ({ data }) => {
	const cacheKey = [...new Set(data.pairs.map(normalizePairKey))].sort().join("|");
	if (chartsCache && Date.now() - chartsCache.at < TTL_MS && chartsCache.key === cacheKey) return chartsCache.data;
	try {
		const charts = await fetchChartsForPairs(data.pairs);
		chartsCache = {
			at: Date.now(),
			key: cacheKey,
			data: charts
		};
		return charts;
	} catch (err) {
		console.error("[market-charts]", err);
		if (chartsCache?.key === cacheKey) return chartsCache.data;
		return {};
	}
});
//#endregion
export { getMarketCharts_createServerFn_handler };
