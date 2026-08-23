import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@ai-sdk/react+[...].mjs";
import { r as useServerFn } from "./createSsrRpc-vr7yBYzy.mjs";
import { n as liveQueryOptions } from "./live-poll-BjhnCmuD.mjs";
import { l as listPublishedAnalyses } from "./analyses.functions-BviDkd_w.mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { G as ArrowUpRight, c as Target, i as TriangleAlert, q as ArrowLeft } from "../_libs/lucide-react.mjs";
import { a as getChartForPair, n as CandleChart, o as useMarketCharts, t as AreaChart } from "./use-market-charts-CRMd_iw4.mjs";
import { n as Reveal } from "./primitives-Byu1gJwu.mjs";
import { t as Route } from "./analysis._slug-8RfpqMdj.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/analysis._slug-Cbu7fUXB.js
var import_jsx_runtime = require_jsx_runtime();
function AnalysisDetail() {
	const { analysis: initial, all: initialAll } = Route.useLoaderData();
	const fetchAnalyses = useServerFn(listPublishedAnalyses);
	const { data: all = initialAll } = useQuery({
		queryKey: ["published-analyses"],
		queryFn: () => fetchAnalyses(),
		initialData: initialAll,
		...liveQueryOptions
	});
	const a = all.find((x) => x.slug === initial.slug) ?? initial;
	const related = all.filter((x) => x.slug !== a.slug).slice(0, 3);
	const relatedPairs = related.map((r) => r.pair);
	const { charts } = useMarketCharts([a.pair, ...relatedPairs]);
	const live = getChartForPair(charts, a.pair);
	const series = live && live.prices.length > 1 ? live.prices : a.series;
	const chartKey = a.slug;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "pt-32",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
			className: "mx-auto w-[min(1100px,92vw)]",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/",
					hash: "featured",
					className: "inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-emerald",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-4 w-4" }), "All analysis"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, {
					className: "mt-8",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap items-center gap-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "border border-emerald bg-transparent px-3 py-1 text-[0.6rem] font-semibold uppercase tracking-widest text-emerald",
									children: a.market
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "num text-xs font-semibold",
									children: a.pair
								}),
								live ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "num text-xs font-semibold",
									children: [
										live.price,
										" ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: live.up ? "text-emerald" : "text-destructive",
											children: live.change
										})
									]
								}) : null,
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "num text-xs text-muted-foreground",
									children: a.timeframe
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "num text-xs text-muted-foreground",
									children: new Date(a.date).toLocaleDateString("en-GB", {
										day: "2-digit",
										month: "long",
										year: "numeric"
									})
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "mt-6 text-balance text-3xl font-semibold leading-[1.08] sm:text-5xl",
							children: a.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-6 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg",
							children: a.summary
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, {
					delay: .1,
					className: "mt-12 border border-border bg-card p-6",
					children: [a.coverImage ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: a.coverImage,
						alt: a.title,
						className: "w-full object-cover",
						loading: "lazy"
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AreaChart, {
						series,
						height: 220,
						accent: "blue",
						chartKey
					}), a.gallery?.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-4 grid gap-4 sm:grid-cols-2",
						children: a.gallery.map((src) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src,
							alt: "",
							className: "w-full border border-border object-cover",
							loading: "lazy"
						}, src))
					}) : !a.coverImage ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-4 border border-border bg-surface p-4",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CandleChart, { chartKey })
					}) : null]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-12 grid gap-12 lg:grid-cols-[1.15fr_0.85fr]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-2xl font-semibold",
							children: "The thesis"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-6 grid gap-5",
							children: a.thesis.map((t, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "grid grid-cols-[auto_1fr] gap-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "num mt-0.5 text-xs font-semibold text-emerald",
									children: String(i + 1).padStart(2, "0")
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm leading-relaxed text-muted-foreground",
									children: t
								})]
							}, t))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-10 flex gap-4 border border-border bg-surface p-6",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "h-5 w-5 shrink-0 text-emerald" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-display text-sm font-semibold",
								children: "Invalidation"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1.5 text-sm leading-relaxed text-muted-foreground",
								children: a.invalidation
							})] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-6 flex gap-4 border border-border bg-surface p-6",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Target, { className: "h-5 w-5 shrink-0 text-emerald" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-display text-sm font-semibold",
								children: "Outcome"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "num mt-1.5 text-sm text-emerald",
								children: a.outcome
							})] })]
						})
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
						delay: .08,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "sticky top-28 border border-border bg-card p-7",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "eyebrow",
									children: "Trade parameters"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
									className: "mt-6 grid gap-4",
									children: [a.targets.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between gap-4 border-b border-border pb-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
											className: "text-xs text-muted-foreground",
											children: l.label
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
											className: "num text-xs font-semibold",
											children: l.value
										})]
									}, l.label)), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between gap-4",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
											className: "text-xs text-muted-foreground",
											children: "Realised"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
											className: "num text-xs font-semibold text-emerald",
											children: a.rr
										})]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
									href: "/#contact",
									className: "mt-8 inline-flex w-full items-center justify-center gap-2 border border-border bg-navy px-5 py-3.5 font-mono text-[0.72rem] uppercase tracking-[0.16em] text-navy-foreground transition-colors hover:bg-emerald",
									children: ["Request similar coverage", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { className: "h-4 w-4" })]
								})
							]
						})
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "mt-24",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-2xl font-semibold",
						children: "Related case studies"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-8 grid gap-5 md:grid-cols-3",
						children: related.map((r) => {
							const relLive = getChartForPair(charts, r.pair);
							const relSeries = relLive && relLive.prices.length > 1 ? relLive.prices : r.series;
							const relKey = r.slug;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/analysis/$slug",
								params: { slug: r.slug },
								className: "surface-card group p-6",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "num text-xs font-semibold",
											children: r.pair
										}), relLive ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: `num text-[0.65rem] ${relLive.up ? "text-emerald" : "text-destructive"}`,
											children: relLive.change
										}) : null]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AreaChart, {
										series: relSeries,
										height: 80,
										showGrid: false,
										chartKey: relKey,
										accent: "blue"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "mt-4 text-sm font-semibold leading-snug",
										children: r.title
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "num mt-3 text-xs text-emerald",
										children: r.rr
									})
								]
							}, r.slug);
						})
					})]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-24" })]
	});
}
//#endregion
export { AnalysisDetail as component };
