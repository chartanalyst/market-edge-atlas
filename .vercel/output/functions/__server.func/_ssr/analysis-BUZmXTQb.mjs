import { o as __toESM } from "../_runtime.mjs";
import { o as require_jsx_runtime, s as require_react } from "../_libs/@ai-sdk/react+[...].mjs";
import { r as useServerFn } from "./createSsrRpc-vr7yBYzy.mjs";
import { n as liveQueryOptions } from "./live-poll-BjhnCmuD.mjs";
import { l as listPublishedAnalyses } from "./analyses.functions-BviDkd_w.mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { K as ArrowRight, m as Search, q as ArrowLeft } from "../_libs/lucide-react.mjs";
import { n as useSiteContent } from "./content-context-D3mm6NHe.mjs";
import { t as motion } from "../_libs/motion.mjs";
import { a as getChartForPair, o as useMarketCharts, t as AreaChart } from "./use-market-charts-CRMd_iw4.mjs";
import { r as SectionHeading } from "./primitives-Byu1gJwu.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/analysis-BUZmXTQb.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var filters = [
	"All",
	"Crypto",
	"Forex",
	"Stocks",
	"Commodities",
	"Indices"
];
var PAGE_SIZE = 12;
function isImageSource(src) {
	const value = src.trim();
	return value.startsWith("http://") || value.startsWith("https://") || value.startsWith("/") || value.startsWith("data:image/") || value.startsWith("blob:");
}
function fallbackQuote(analysis) {
	const series = analysis.series;
	const last = series.at(-1) ?? 0;
	const prev = series.at(-2) ?? last;
	const change = prev === 0 ? 0 : (last - prev) / Math.abs(prev) * 100;
	return {
		price: analysis.market === "Forex" ? (last / 50 + .8).toFixed(2) : last >= 100 ? last.toLocaleString(void 0, { maximumFractionDigits: 0 }) : last.toFixed(2),
		change: `${change >= 0 ? "+" : ""}${change.toFixed(2)}%`,
		up: change >= 0
	};
}
function AnalysisChartVisual({ analysis, series }) {
	const [imageFailed, setImageFailed] = (0, import_react.useState)(false);
	const coverImage = analysis.coverImage.trim();
	if (coverImage && isImageSource(coverImage) && !imageFailed) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
		src: coverImage,
		alt: analysis.title,
		className: "h-[150px] w-full object-cover",
		loading: "lazy",
		onError: () => setImageFailed(true)
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AreaChart, {
		series,
		height: 150,
		accent: "blue",
		chartKey: `library-${analysis.slug}`,
		className: "h-[150px]"
	});
}
function AnalysisChartHeader({ analysis, liveSeries, livePrice, liveChange, liveUp }) {
	const fallback = fallbackQuote(analysis);
	const series = liveSeries && liveSeries.length > 1 ? liveSeries : analysis.series;
	const price = livePrice ?? fallback.price;
	const change = liveChange ?? fallback.change;
	const up = liveUp ?? fallback.up;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative overflow-hidden bg-surface p-5 sm:p-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-start justify-between gap-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "num text-sm font-semibold text-foreground",
					children: analysis.pair
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "num mt-3 text-2xl font-semibold",
					children: [
						price,
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: up ? "text-emerald" : "text-destructive",
							children: change
						})
					]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "shrink-0 border border-emerald px-4 py-2 text-[0.66rem] font-semibold uppercase tracking-[0.18em] text-emerald",
				children: analysis.market
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-7 transition-transform duration-700 group-hover:scale-[1.015]",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnalysisChartVisual, {
				analysis,
				series
			})
		})]
	});
}
function AnalysisLibrary() {
	const { analyses: fallback } = useSiteContent();
	const fetchAnalyses = useServerFn(listPublishedAnalyses);
	const { data: analyses = fallback } = useQuery({
		queryKey: ["published-analyses"],
		queryFn: () => fetchAnalyses(),
		...liveQueryOptions
	});
	const [filter, setFilter] = (0, import_react.useState)("All");
	const [query, setQuery] = (0, import_react.useState)("");
	const [page, setPage] = (0, import_react.useState)(1);
	const visible = (0, import_react.useMemo)(() => {
		const q = query.trim().toLowerCase();
		return analyses.filter((item) => {
			const matchesFilter = filter === "All" || item.market === filter;
			const matchesQuery = !q || item.title.toLowerCase().includes(q) || item.pair.toLowerCase().includes(q) || item.market.toLowerCase().includes(q) || item.summary.toLowerCase().includes(q);
			return matchesFilter && matchesQuery;
		});
	}, [
		analyses,
		filter,
		query
	]);
	const totalPages = Math.max(1, Math.ceil(visible.length / PAGE_SIZE));
	const currentPage = Math.min(page, totalPages);
	const pagedItems = (0, import_react.useMemo)(() => visible.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE), [visible, currentPage]);
	const pairs = (0, import_react.useMemo)(() => pagedItems.map((item) => item.pair), [pagedItems]);
	const { charts } = useMarketCharts(pairs);
	const pageNumbers = (0, import_react.useMemo)(() => {
		const start = Math.max(1, Math.min(currentPage - 2, totalPages - 4));
		return Array.from({ length: Math.min(5, totalPages) }, (_, i) => start + i);
	}, [currentPage, totalPages]);
	(0, import_react.useEffect)(() => {
		setPage(1);
	}, [filter, query]);
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
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
						eyebrow: "Analysis library",
						title: "Browse every published market study.",
						description: "The homepage stays curated. This page renders the full 100+ analysis archive with pagination, filters, search and readable details in one place."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-10 grid gap-4 border border-border bg-card p-4 lg:grid-cols-[1fr_auto] lg:items-center",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex flex-wrap gap-2",
							children: filters.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => setFilter(item),
								className: filter === item ? "border border-navy bg-navy px-4 py-2 text-xs font-semibold text-navy-foreground" : "border border-hairline px-4 py-2 text-xs font-semibold text-muted-foreground transition-colors hover:border-emerald hover:text-emerald",
								children: item
							}, item))
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "flex items-center gap-2 border border-border bg-card px-4 py-2.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "h-4 w-4 shrink-0 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								value: query,
								onChange: (event) => setQuery(event.target.value),
								placeholder: "Search analysis...",
								"aria-label": "Search all analysis",
								className: "w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground lg:w-56"
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-5 grid gap-3 sm:grid-cols-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "border border-border bg-surface p-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "eyebrow text-[0.58rem]",
									children: "Rendered analyses"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "num mt-2 text-2xl font-semibold",
									children: visible.length
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "border border-border bg-surface p-4",
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
								className: "border border-border bg-surface p-4",
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
						className: "mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
						initial: "hidden",
						animate: "show",
						variants: {
							hidden: {},
							show: { transition: { staggerChildren: .045 } }
						},
						children: pagedItems.map((item) => {
							const live = getChartForPair(charts, item.pair);
							return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
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
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
									className: "surface-card group flex h-full flex-col overflow-hidden transition-transform duration-300 hover:-translate-y-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnalysisChartHeader, {
										analysis: item,
										liveSeries: live?.prices,
										livePrice: live?.price,
										liveChange: live?.change,
										liveUp: live?.up
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex flex-1 flex-col p-5",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex flex-wrap items-center justify-between gap-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "eyebrow text-[0.58rem]",
													children: item.timeframe
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "num text-[0.65rem] text-muted-foreground",
													children: item.date
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
												className: "mt-4 text-pretty font-display text-lg font-semibold leading-snug",
												children: item.title
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "mt-3 flex flex-wrap gap-2 text-[0.65rem]",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "border border-border bg-surface px-2.5 py-1 font-mono text-muted-foreground",
													children: item.timeframe
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "border border-border bg-surface px-2.5 py-1 font-mono text-muted-foreground",
													children: item.rr || "R pending"
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "mt-2.5 line-clamp-3 flex-1 text-sm leading-relaxed text-muted-foreground",
												children: item.summary
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "mt-5 grid gap-3 border-t border-border pt-4",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
														className: "eyebrow text-[0.55rem]",
														children: "Outcome"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
														className: "num mt-1 text-xs font-semibold text-emerald",
														children: item.outcome || "Tracking"
													})] }),
													item.thesis.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
														className: "eyebrow text-[0.55rem]",
														children: "Key thesis"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
														className: "mt-2 grid gap-1.5 text-xs leading-relaxed text-muted-foreground",
														children: item.thesis.slice(0, 2).map((point) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
															className: "grid grid-cols-[auto_1fr] gap-2",
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																className: "mt-1.5 h-1 w-1 bg-emerald",
																"aria-hidden": true
															}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: point })]
														}, point))
													})] }) : null,
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
														className: "eyebrow text-[0.55rem]",
														children: "Invalidation"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
														className: "mt-1 line-clamp-2 text-xs leading-relaxed text-muted-foreground",
														children: item.invalidation || "Invalidation level will be added from admin data."
													})] })
												]
											})
										]
									})]
								})
							}, item.slug);
						})
					}, `${filter}-${query.trim().toLowerCase()}-${currentPage}`),
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
						children: "No analysis matches that search yet."
					}) : null
				]
			})
		})
	});
}
//#endregion
export { AnalysisLibrary as component };
