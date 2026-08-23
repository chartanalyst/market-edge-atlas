import { o as __toESM } from "../_runtime.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { o as require_jsx_runtime, s as require_react } from "../_libs/@ai-sdk/react+[...].mjs";
import { r as useServerFn } from "./createSsrRpc-vr7yBYzy.mjs";
import { n as liveQueryOptions } from "./live-poll-BjhnCmuD.mjs";
import { i as listPublishedReports } from "./reports.functions-DI0eKq1u.mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { G as ArrowUpRight, K as ArrowRight, m as Search, q as ArrowLeft } from "../_libs/lucide-react.mjs";
import { n as useSiteContent } from "./content-context-D3mm6NHe.mjs";
import { t as motion } from "../_libs/motion.mjs";
import { r as SectionHeading } from "./primitives-Byu1gJwu.mjs";
import { n as formatReportDate } from "./reports-CiU5ItE7.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/reports-Ep06OTTO.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var PAGE_SIZE = 9;
function ReportsLibrary() {
	const { reports: fallback } = useSiteContent();
	const fetchReports = useServerFn(listPublishedReports);
	const { data: reports = fallback } = useQuery({
		queryKey: ["published-reports"],
		queryFn: () => fetchReports(),
		...liveQueryOptions
	});
	const [query, setQuery] = (0, import_react.useState)("");
	const [page, setPage] = (0, import_react.useState)(1);
	const visible = (0, import_react.useMemo)(() => {
		const q = query.trim().toLowerCase();
		return reports.filter((item) => !q || item.title.toLowerCase().includes(q) || item.market.toLowerCase().includes(q) || item.asset.toLowerCase().includes(q) || item.summary.toLowerCase().includes(q));
	}, [reports, query]);
	const totalPages = Math.max(1, Math.ceil(visible.length / PAGE_SIZE));
	const currentPage = Math.min(page, totalPages);
	const pagedItems = (0, import_react.useMemo)(() => visible.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE), [visible, currentPage]);
	const pageNumbers = (0, import_react.useMemo)(() => {
		const start = Math.max(1, Math.min(currentPage - 2, totalPages - 4));
		return Array.from({ length: Math.min(5, totalPages) }, (_, index) => start + index);
	}, [currentPage, totalPages]);
	(0, import_react.useEffect)(() => {
		setPage(1);
	}, [query]);
	(0, import_react.useEffect)(() => {
		if (page > totalPages) setPage(totalPages);
	}, [page, totalPages]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "pt-36 sm:pt-44",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "border-b border-border py-16 lg:py-20",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto w-[min(1320px,94vw)]",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
							eyebrow: "Weekly reports",
							title: "Complete weekly report archive.",
							description: "All published notes live here, while the homepage only highlights the latest three reports."
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "flex items-center gap-2 border border-border bg-card px-4 py-2.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "h-4 w-4 shrink-0 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								value: query,
								onChange: (event) => setQuery(event.target.value),
								placeholder: "Search reports...",
								"aria-label": "Search all reports",
								className: "w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground lg:w-56"
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-8 grid gap-3 sm:grid-cols-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "border border-border bg-card p-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "eyebrow text-[0.58rem]",
									children: "Published reports"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "num mt-2 text-2xl font-semibold",
									children: visible.length
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "border border-border bg-card p-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "eyebrow text-[0.58rem]",
									children: "Current page"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "num mt-2 text-2xl font-semibold",
									children: [
										currentPage,
										"/",
										totalPages
									]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "border border-border bg-card p-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "eyebrow text-[0.58rem]",
									children: "Per page"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "num mt-2 text-2xl font-semibold",
									children: PAGE_SIZE
								})]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
						className: "mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3",
						initial: "hidden",
						animate: "show",
						variants: {
							hidden: {},
							show: { transition: { staggerChildren: .05 } }
						},
						children: pagedItems.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
							variants: {
								hidden: {
									opacity: 0,
									y: 14,
									scale: .985
								},
								show: {
									opacity: 1,
									y: 0,
									scale: 1
								}
							},
							transition: {
								duration: .42,
								ease: [
									.22,
									1,
									.36,
									1
								]
							},
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/reports/$slug",
								params: { slug: item.slug },
								className: "surface-card group flex h-full flex-col p-5 transition-transform duration-300 hover:-translate-y-1 sm:p-6",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex flex-wrap items-center justify-between gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "border border-emerald px-2.5 py-1 text-[0.58rem] font-semibold uppercase tracking-widest text-emerald",
											children: item.market
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "num text-[0.65rem] text-muted-foreground",
											children: formatReportDate(item.date)
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-4 flex flex-wrap items-center gap-x-3 gap-y-1",
										children: [item.asset ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "num text-xs font-semibold",
											children: item.asset
										}) : null, item.weekLabel ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "num text-[0.65rem] text-muted-foreground",
											children: item.weekLabel
										}) : null]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
										className: "mt-3 text-pretty font-display text-lg font-semibold leading-snug",
										children: item.title
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-2.5 line-clamp-4 flex-1 text-sm leading-relaxed text-muted-foreground",
										children: item.summary
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "mt-5 inline-flex items-center gap-2 border-t border-border pt-4 font-mono text-[0.66rem] uppercase tracking-[0.16em] transition-colors group-hover:text-emerald",
										children: ["Read report", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { className: "h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" })]
									})
								]
							})
						}, item.slug))
					}, `${query.trim().toLowerCase()}-${currentPage}`),
					visible.length > PAGE_SIZE ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-10 flex flex-col items-center justify-between gap-4 border-t border-border pt-6 sm:flex-row",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "num text-xs text-muted-foreground",
							children: [
								"Page ",
								currentPage,
								" of ",
								totalPages,
								" · Showing",
								" ",
								Math.min((currentPage - 1) * PAGE_SIZE + 1, visible.length),
								"-",
								Math.min(currentPage * PAGE_SIZE, visible.length),
								" of ",
								visible.length
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap items-center justify-center gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: () => setPage((value) => Math.max(1, value - 1)),
									disabled: currentPage === 1,
									className: "inline-flex items-center gap-2 border border-border px-3 py-2 text-xs font-semibold text-muted-foreground transition-colors hover:border-emerald hover:text-emerald disabled:pointer-events-none disabled:opacity-40",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-3.5 w-3.5" }), "Previous"]
								}),
								pageNumbers.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => setPage(item),
									"aria-current": item === currentPage ? "page" : void 0,
									className: item === currentPage ? "h-9 min-w-9 border border-navy bg-navy px-3 text-xs font-semibold text-navy-foreground" : "h-9 min-w-9 border border-border px-3 text-xs font-semibold text-muted-foreground transition-colors hover:border-emerald hover:text-emerald",
									children: item
								}, item)),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: () => setPage((value) => Math.min(totalPages, value + 1)),
									disabled: currentPage === totalPages,
									className: "inline-flex items-center gap-2 border border-border px-3 py-2 text-xs font-semibold text-muted-foreground transition-colors hover:border-emerald hover:text-emerald disabled:pointer-events-none disabled:opacity-40",
									children: ["Next", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-3.5 w-3.5" })]
								})
							]
						})]
					}) : null,
					visible.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-12 text-center text-sm text-muted-foreground",
						children: "No reports match that search yet."
					}) : null
				]
			})
		})
	});
}
//#endregion
export { ReportsLibrary as component };
