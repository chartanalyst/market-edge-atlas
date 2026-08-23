import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@ai-sdk/react+[...].mjs";
import { r as useServerFn } from "./createSsrRpc-vr7yBYzy.mjs";
import { n as liveQueryOptions } from "./live-poll-BjhnCmuD.mjs";
import { i as listPublishedReports } from "./reports.functions-DI0eKq1u.mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { G as ArrowUpRight } from "../_libs/lucide-react.mjs";
import { n as useSiteContent } from "./content-context-D3mm6NHe.mjs";
import { a as StaggerItem, i as Stagger, n as Reveal, r as SectionHeading } from "./primitives-Byu1gJwu.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/reports-CiU5ItE7.js
var import_jsx_runtime = require_jsx_runtime();
var HOME_REPORT_LIMIT = 6;
function formatReportDate(value) {
	if (!value) return "";
	const date = new Date(value);
	if (Number.isNaN(date.getTime())) return value;
	return date.toLocaleDateString("en-GB", {
		day: "2-digit",
		month: "short",
		year: "numeric"
	});
}
function WeeklyReports() {
	const { reports: fallback } = useSiteContent();
	const fetchReports = useServerFn(listPublishedReports);
	const { data: reports = fallback } = useQuery({
		queryKey: ["published-reports"],
		queryFn: () => fetchReports(),
		...liveQueryOptions
	});
	const items = reports.length > 0 ? reports : fallback;
	const homepageItems = items.slice(0, HOME_REPORT_LIMIT);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "reports",
		className: "scroll-mt-28 border-y border-border bg-surface py-24 lg:py-32",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto w-[min(1320px,94vw)]",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
					eyebrow: "Weekly reports",
					title: "Structured weekly market coverage.",
					description: "Every week: levels, structure and scenarios across the instruments under coverage — published as a standalone research note."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stagger, {
					className: "mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3",
					gap: .08,
					children: homepageItems.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StaggerItem, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/reports/$slug",
						params: { slug: r.slug },
						className: "surface-card group flex h-full flex-col p-5 sm:p-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap items-center justify-between gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "border border-emerald px-2.5 py-1 text-[0.58rem] font-semibold uppercase tracking-widest text-emerald",
									children: r.market
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "num text-[0.65rem] text-muted-foreground",
									children: formatReportDate(r.date)
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-4 flex flex-wrap items-center gap-x-3 gap-y-1",
								children: [r.asset ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "num text-xs font-semibold",
									children: r.asset
								}) : null, r.weekLabel ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "num text-[0.65rem] text-muted-foreground",
									children: r.weekLabel
								}) : null]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "mt-3 text-pretty font-display text-base font-semibold leading-snug sm:text-lg",
								children: r.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2.5 flex-1 text-sm leading-relaxed text-muted-foreground",
								children: r.summary
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "mt-5 inline-flex items-center gap-2 border-t border-border pt-4 font-mono text-[0.66rem] uppercase tracking-[0.16em] transition-colors group-hover:text-emerald",
								children: ["Read more", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { className: "h-3.5 w-3.5" })]
							})
						]
					}) }, r.slug))
				}),
				items.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
					delay: .12,
					className: "mt-10 flex justify-center",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/reports",
						className: "group inline-flex items-center gap-2 border border-border bg-navy px-6 py-3 font-mono text-[0.7rem] uppercase tracking-[0.16em] text-navy-foreground transition-all hover:bg-emerald",
						children: ["View more reports", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { className: "h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" })]
					})
				}) : null,
				items.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
					className: "mt-10",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-center text-sm text-muted-foreground",
						children: "Reports will appear here once published from the admin panel."
					})
				}) : null
			]
		})
	});
}
//#endregion
export { formatReportDate as n, WeeklyReports as t };
