export type PairSource =
  { provider: "coingecko"; coinId: string } | { provider: "yahoo"; symbol: string };

/** "BTC / USD" → "BTC/USD" */
export function normalizePairKey(pair: string): string {
  return pair.replace(/\s+/g, "").toUpperCase();
}

const PAIR_MAP: Record<string, PairSource> = {
  "BTC/USD": { provider: "coingecko", coinId: "bitcoin" },
  "ETH/USD": { provider: "coingecko", coinId: "ethereum" },
  "SOL/USD": { provider: "coingecko", coinId: "solana" },
  "EUR/USD": { provider: "yahoo", symbol: "EURUSD=X" },
  "GBP/USD": { provider: "yahoo", symbol: "GBPUSD=X" },
  "USD/JPY": { provider: "yahoo", symbol: "JPY=X" },
  "XAU/USD": { provider: "yahoo", symbol: "GC=F" },
  "XAG/USD": { provider: "yahoo", symbol: "SI=F" },
  NAS100: { provider: "yahoo", symbol: "^NDX" },
  US100: { provider: "yahoo", symbol: "^NDX" },
  NDX: { provider: "yahoo", symbol: "^NDX" },
  SPX: { provider: "yahoo", symbol: "^GSPC" },
  US500: { provider: "yahoo", symbol: "^GSPC" },
  WTI: { provider: "yahoo", symbol: "CL=F" },
  DAX: { provider: "yahoo", symbol: "^GDAXI" },
  AAPL: { provider: "yahoo", symbol: "AAPL" },
  MSFT: { provider: "yahoo", symbol: "MSFT" },
  TSLA: { provider: "yahoo", symbol: "TSLA" },
  NVDA: { provider: "yahoo", symbol: "NVDA" },
};

export function resolvePairSource(pair: string): PairSource | null {
  const key = normalizePairKey(pair);
  if (PAIR_MAP[key]) return PAIR_MAP[key];

  // Bare tickers (e.g. AAPL, NAS100) — try Yahoo directly.
  if (/^[A-Z0-9^=.-]{2,12}$/.test(key)) {
    return { provider: "yahoo", symbol: key.includes("/") ? key.replace("/", "") + "=X" : key };
  }

  return null;
}
