import { a as differentiators, c as markets, d as stats, f as testimonials, i as coverageMap, l as processSteps, m as timeline, o as faqs, p as tickerItems, r as certifications, s as insights, u as services } from "./site-data-C6vM7IrX.mjs";
import { a as sortAnalyses, n as defaultAnalysisRecords, o as withDummyAnalyses, t as analysisFromRow } from "./analysis-model-CBMM6olb.mjs";
import { a as withDummyReports, i as sortReports, r as reportFromRow, t as defaultReportRecords } from "./report-model-BUby-DFX.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/site-content-DBTeyB_P.js
var defaultCopy = {
	brand: {
		initials: "CA",
		name: "Chart Analyst",
		tagline: "Institutional-grade technical research across crypto, forex, equities, commodities and indices. Structure first, risk always.",
		disclaimer: "Research and education only. Nothing published here constitutes financial advice."
	},
	hero: {
		indexLabel: "001 — Overview",
		practice: "Independent Research Practice",
		established: "Est. 2019",
		badge: "Coverage live · 5 asset classes",
		titleLine1: "Professional",
		titleAccent: "Technical Market",
		titleLine3: "Analyst",
		subtitle: "Providing institutional-grade technical analysis across Crypto, Forex, Stocks, Commodities, and Indices.",
		primaryCta: "View Portfolio",
		secondaryCta: "Contact Me",
		kpis: [
			{
				value: 2400,
				suffix: "+",
				label: "Charts published"
			},
			{
				value: 71,
				suffix: "%",
				label: "Thesis hit rate"
			},
			{
				value: 7,
				suffix: "yrs",
				label: "Full-time research"
			}
		],
		panelLabel: "BTC / USD · Weekly",
		panelPrice: 112480,
		panelChange: "+1.84%",
		panelBadge: "Bullish structure",
		panelSeries: [
			22,
			26,
			21,
			30,
			27,
			36,
			32,
			44,
			40,
			52,
			58,
			54,
			68,
			74,
			88
		],
		panelImage: "",
		panelMetrics: [
			{
				label: "Bias",
				value: "Long"
			},
			{
				label: "R:R",
				value: "1 : 3.8"
			},
			{
				label: "Risk",
				value: "0.75%"
			}
		],
		floatOne: {
			title: "Invalidation defined",
			sub: "before every entry"
		},
		floatTwo: {
			title: "Liquidity mapped",
			sub: "HTF → LTF confluence"
		}
	},
	about: {
		eyebrow: "About",
		title: "Research discipline borrowed from the institutional side of the desk.",
		description: "I've spent seven years reading price for a living — first inside a digital-asset research desk, now independently for funds, communities and private clients across five asset classes.",
		paragraphs: ["My mission is simple: make technical analysis defensible. Every chart I publish states a thesis, the evidence supporting it, the level that proves it wrong, and the risk taken to express it. If a call fails, it is logged exactly like the ones that work.", "The approach is structure-first. I build context from the highest timeframe downward, mapping ranges, liquidity and unmitigated zones before considering an entry. Confirmation is required, never assumed. Narrative and sentiment inform the environment — they never override the chart."],
		pillars: [
			{
				title: "Auditable",
				desc: "Public log of thesis vs. outcome since 2021."
			},
			{
				title: "Repeatable",
				desc: "One written seven-stage process for every market."
			},
			{
				title: "Risk-first",
				desc: "Invalidation defined before position sizing."
			},
			{
				title: "Multi-market",
				desc: "Cross-asset confirmation on every directional call."
			}
		],
		asideTitle: "What makes the analysis different",
		points: [
			{
				n: "01",
				title: "Evidence before opinion",
				desc: "Each thesis is built on observable structure, not on a narrative searching for a chart."
			},
			{
				n: "02",
				title: "Invalidation is published",
				desc: "You always know the exact level at which the idea is wrong — stated up front."
			},
			{
				n: "03",
				title: "Cross-asset confirmation",
				desc: "Dollar strength, yields and breadth are checked before any directional conviction."
			},
			{
				n: "04",
				title: "Outcomes tracked in R",
				desc: "Performance is expressed in risk multiples, not screenshots of winners."
			}
		],
		chartLabel: "Cumulative R · published ideas",
		chartValue: "+148R",
		chartSeries: [
			4,
			9,
			7,
			16,
			21,
			19,
			30,
			38,
			35,
			48,
			61,
			70,
			88,
			104,
			126,
			148
		]
	},
	contact: {
		eyebrow: "Contact",
		title: "Let's discuss your markets.",
		description: "Research retainers, community coverage, education or a one-off custom review — tell me what you need and I'll respond with a scope and timeline.",
		email: "ubaid.ullah2005op@gmail.com",
		responseTime: "Within one business day",
		coverage: "Asia · London · New York sessions",
		engagements: [
			"Technical analysis retainer",
			"Institutional report",
			"Community coverage",
			"Education / mentoring",
			"Custom market review",
			"Consulting"
		],
		footnote: "Prefer a call? Book a 45-minute consultation and I'll send a written summary afterwards."
	}
};
/** Homepage sections, in render order. Editable from the dashboard. */
var defaultSections = [
	{
		id: "hero",
		label: "Hero",
		enabled: true
	},
	{
		id: "ticker",
		label: "Market ticker",
		enabled: true
	},
	{
		id: "about",
		label: "About",
		enabled: true
	},
	{
		id: "featured",
		label: "Featured analysis",
		enabled: true
	},
	{
		id: "certifications",
		label: "Certifications",
		enabled: true
	},
	{
		id: "reports",
		label: "Reports",
		enabled: true
	},
	{
		id: "journal",
		label: "Trading journal",
		enabled: true
	},
	{
		id: "process",
		label: "Analysis process",
		enabled: true
	},
	{
		id: "services",
		label: "Services",
		enabled: true
	},
	{
		id: "why",
		label: "Why work with me",
		enabled: true
	},
	{
		id: "testimonials",
		label: "Testimonials",
		enabled: true
	},
	{
		id: "faq",
		label: "FAQ",
		enabled: true
	},
	{
		id: "contact",
		label: "Contact",
		enabled: true
	}
];
var defaultSiteContent = {
	copy: defaultCopy,
	analyses: sortAnalyses(withDummyAnalyses(defaultAnalysisRecords)),
	insights,
	certifications,
	reports: sortReports(withDummyReports(defaultReportRecords)),
	markets,
	services,
	processSteps,
	timeline,
	faqs,
	testimonials,
	differentiators,
	stats,
	tickerItems,
	coverageMap,
	sections: defaultSections,
	links: [
		{
			platform: "Email",
			label: "Email",
			href: "mailto:ubaid.ullah2005op@gmail.com"
		},
		{
			platform: "X",
			label: "X",
			href: "https://x.com/AChartAnalyst"
		},
		{
			platform: "Telegram",
			label: "Telegram",
			href: "https://t.me/chartanalyst01"
		},
		{
			platform: "Discord",
			label: "Discord",
			href: "https://discord.gg/2RntKagEdU"
		},
		{
			platform: "Instagram",
			label: "Instagram",
			href: "https://instagram.com/twxubaid"
		},
		{
			platform: "LinkedIn",
			label: "LinkedIn",
			href: "https://www.linkedin.com/in/ubaid-ullah-656748301/"
		}
	]
};
var siteContentKeys = Object.keys(defaultSiteContent);
/**
* Database rows override the built-in defaults, key by key. A missing row simply
* falls back to the shipped content, so the site can never render empty.
* Published analyses come from their own table once any exist.
*/
function mergeSiteContent(rows, analysisRows, reportRows) {
	const merged = { ...defaultSiteContent };
	for (const row of rows ?? []) {
		if (!siteContentKeys.includes(row.key)) continue;
		if (row.data === null || row.data === void 0) continue;
		if (row.key === "copy") {
			const stored = row.data;
			merged.copy = {
				brand: {
					...defaultCopy.brand,
					...stored.brand ?? {}
				},
				hero: {
					...defaultCopy.hero,
					...stored.hero ?? {}
				},
				about: {
					...defaultCopy.about,
					...stored.about ?? {}
				},
				contact: {
					...defaultCopy.contact,
					...stored.contact ?? {}
				}
			};
			continue;
		}
		if (row.key === "sections") {
			const stored = Array.isArray(row.data) ? row.data : [];
			const known = new Map(defaultSections.map((s) => [s.id, s]));
			const ordered = stored.filter((s) => known.has(s.id)).map((s) => ({
				...known.get(s.id),
				enabled: s.enabled !== false
			}));
			const missing = defaultSections.filter((s) => !ordered.some((o) => o.id === s.id));
			merged.sections = [...ordered, ...missing];
			continue;
		}
		if (row.key === "analyses" || row.key === "reports") continue;
		if (Array.isArray(row.data)) merged[row.key] = row.data;
	}
	if (analysisRows && analysisRows.length > 0) merged.analyses = sortAnalyses(withDummyAnalyses(analysisRows.map((r) => analysisFromRow(r))));
	else merged.analyses = sortAnalyses(withDummyAnalyses(defaultAnalysisRecords));
	merged.reports = reportRows && reportRows.length > 0 ? sortReports(withDummyReports(reportRows.map((r) => reportFromRow(r)))) : sortReports(withDummyReports(defaultReportRecords));
	return merged;
}
//#endregion
export { mergeSiteContent as n, siteContentKeys as r, defaultSiteContent as t };
