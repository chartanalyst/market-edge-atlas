//#region node_modules/.nitro/vite/services/ssr/assets/site-meta-CXKBvaoA.js
/** Canonical site identity — used for <title>, meta, and OG tags. */
var SITE_NAME = "Chart Analyst";
var SITE_TAGLINE = "Technical Market Analyst";
var SITE_TITLE = `${SITE_NAME} — ${SITE_TAGLINE}`;
var SITE_DESCRIPTION = "Institutional-grade technical analysis across crypto, forex, stocks, commodities and indices. Documented theses, defined invalidation, and outcomes tracked in risk multiples.";
var SITE_URL = "https://chart-analyst.vercel.app";
var SITE_IMAGE = `${SITE_URL}/market-logo.svg`;
function absoluteUrl(path = "/") {
	return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}
function jsonLd() {
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
			"Trading consultation"
		],
		knowsAbout: [
			"Crypto",
			"Forex",
			"Stocks",
			"Commodities",
			"Indices",
			"Risk management"
		]
	};
}
//#endregion
export { SITE_TITLE as a, jsonLd as c, SITE_TAGLINE as i, SITE_IMAGE as n, SITE_URL as o, SITE_NAME as r, absoluteUrl as s, SITE_DESCRIPTION as t };
