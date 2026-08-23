/** Canonical site identity — used for <title>, meta, and OG tags. */
export const SITE_NAME = "Chart Analyst";
export const SITE_TAGLINE = "Technical Market Analyst";
export const SITE_TITLE = `${SITE_NAME} — ${SITE_TAGLINE}`;
export const SITE_DESCRIPTION =
  "Institutional-grade technical analysis across crypto, forex, stocks, commodities and indices. Documented theses, defined invalidation, and outcomes tracked in risk multiples.";
export const SITE_URL =
  (import.meta.env.VITE_SITE_URL as string | undefined)?.replace(/\/$/, "") ||
  "https://chart-analyst.vercel.app";
export const SITE_IMAGE = `${SITE_URL}/market-logo.svg`;

export function absoluteUrl(path = "/") {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

export function jsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: SITE_NAME,
    url: SITE_URL,
    logo: SITE_IMAGE,
    description: SITE_DESCRIPTION,
    areaServed: "Worldwide",
    serviceType: [
      "Technical market analysis",
      "Trading research",
      "Weekly market reports",
      "Trading consultation",
    ],
    knowsAbout: ["Crypto", "Forex", "Stocks", "Commodities", "Indices", "Risk management"],
  };
}
