//#region node_modules/.nitro/vite/services/ssr/assets/market-symbols-CRwjrnsQ.js
/** "BTC / USD" → "BTC/USD" */
function normalizePairKey(pair) {
	return pair.replace(/\s+/g, "").toUpperCase();
}
var PAIR_MAP = {
	"BTC/USD": {
		provider: "coingecko",
		coinId: "bitcoin"
	},
	"ETH/USD": {
		provider: "coingecko",
		coinId: "ethereum"
	},
	"SOL/USD": {
		provider: "coingecko",
		coinId: "solana"
	},
	"EUR/USD": {
		provider: "yahoo",
		symbol: "EURUSD=X"
	},
	"GBP/USD": {
		provider: "yahoo",
		symbol: "GBPUSD=X"
	},
	"USD/JPY": {
		provider: "yahoo",
		symbol: "JPY=X"
	},
	"XAU/USD": {
		provider: "yahoo",
		symbol: "GC=F"
	},
	"XAG/USD": {
		provider: "yahoo",
		symbol: "SI=F"
	},
	NAS100: {
		provider: "yahoo",
		symbol: "^NDX"
	},
	US100: {
		provider: "yahoo",
		symbol: "^NDX"
	},
	NDX: {
		provider: "yahoo",
		symbol: "^NDX"
	},
	SPX: {
		provider: "yahoo",
		symbol: "^GSPC"
	},
	SPX500: {
		provider: "yahoo",
		symbol: "^GSPC"
	},
	US500: {
		provider: "yahoo",
		symbol: "^GSPC"
	},
	WTI: {
		provider: "yahoo",
		symbol: "CL=F"
	},
	DAX: {
		provider: "yahoo",
		symbol: "^GDAXI"
	},
	AAPL: {
		provider: "yahoo",
		symbol: "AAPL"
	},
	MSFT: {
		provider: "yahoo",
		symbol: "MSFT"
	},
	TSLA: {
		provider: "yahoo",
		symbol: "TSLA"
	},
	NVDA: {
		provider: "yahoo",
		symbol: "NVDA"
	},
	NVIDIA: {
		provider: "yahoo",
		symbol: "NVDA"
	},
	AMD: {
		provider: "yahoo",
		symbol: "AMD"
	},
	GOLD: {
		provider: "yahoo",
		symbol: "GC=F"
	},
	SILVER: {
		provider: "yahoo",
		symbol: "SI=F"
	}
};
function resolvePairSource(pair) {
	const key = normalizePairKey(pair);
	if (PAIR_MAP[key]) return PAIR_MAP[key];
	if (/^[A-Z0-9^=.-]{2,12}$/.test(key)) return {
		provider: "yahoo",
		symbol: key.includes("/") ? key.replace("/", "") + "=X" : key
	};
	return null;
}
//#endregion
export { resolvePairSource as n, normalizePairKey as t };
