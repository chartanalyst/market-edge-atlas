import { o as __toESM } from "../_runtime.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { c as createServerFn } from "./createServerFn-CIHAFgYl.mjs";
import { o as require_jsx_runtime, s as require_react } from "../_libs/@ai-sdk/react+[...].mjs";
import { a as Trigger2, i as Root2, n as Header, r as Item, t as Content2 } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { n as createSsrRpc, r as useServerFn, t as cn } from "./createSsrRpc-vr7yBYzy.mjs";
import { n as assetDistribution } from "./site-data-C6vM7IrX.mjs";
import { n as liveQueryOptions } from "./live-poll-BjhnCmuD.mjs";
import { a as JournalEquitySkeleton, l as listPublishedAnalyses, r as FeaturedAnalysisGridSkeleton } from "./analyses.functions-BviDkd_w.mjs";
import { i as equitySeriesForChart, l as listPublishedTrades, t as computeMetrics } from "./trades.functions-CnN-bMfa.mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { B as Check, D as LoaderCircle, G as ArrowUpRight, H as CalendarCheck, K as ArrowRight, U as BadgeCheck, Y as Activity, d as Sparkles, f as ShieldCheck, l as Star, q as ArrowLeft, t as lucide_react_exports, v as Quote, z as ChevronDown } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { n as useSiteContent } from "./content-context-D3mm6NHe.mjs";
import { s as AnimatePresence } from "../_libs/framer-motion.mjs";
import { t as motion } from "../_libs/motion.mjs";
import { a as getChartForPair, i as GlowLineChart, o as useMarketCharts, r as DonutChart, t as AreaChart } from "./use-market-charts-CRMd_iw4.mjs";
import { a as StaggerItem, i as Stagger, n as Reveal, o as TiltCard, r as SectionHeading, s as revealVariants, t as Counter } from "./primitives-Byu1gJwu.mjs";
import { t as contactSchema } from "./contact.schema-DkXzBqMO.mjs";
import { t as WeeklyReports } from "./reports-CiU5ItE7.mjs";
import { r as iconForPlatform } from "./footer-xnZUaitc.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-v1IXy13g.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var ease = [
	.22,
	1,
	.36,
	1
];
function Hero() {
	const { copy, stats } = useSiteContent();
	const hero = copy.hero;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "relative overflow-hidden border-b border-border pt-36 sm:pt-44",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "grid-lines pointer-events-none absolute inset-0 -z-10 opacity-70 [mask-image:radial-gradient(80%_70%_at_50%_0%,black,transparent)]" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto w-[min(1320px,94vw)]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between border-y border-border py-2.5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "eyebrow",
						children: hero.indexLabel
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "eyebrow hidden sm:inline",
						children: hero.practice
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "eyebrow",
						children: hero.established
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid items-stretch gap-0 lg:grid-cols-[1.05fr_0.95fr]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "border-border py-14 lg:border-r lg:py-20 lg:pr-14",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
							initial: {
								opacity: 0,
								y: 14
							},
							animate: {
								opacity: 1,
								y: 0
							},
							transition: {
								duration: .7,
								ease
							},
							className: "inline-flex items-center gap-2 border border-border bg-card px-3 py-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "relative flex h-1.5 w-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute inline-flex h-full w-full animate-ping bg-emerald opacity-70" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "relative inline-flex h-1.5 w-1.5 bg-emerald" })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "eyebrow text-foreground/70",
								children: hero.badge
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.h1, {
							initial: {
								opacity: 0,
								y: 22
							},
							animate: {
								opacity: 1,
								y: 0
							},
							transition: {
								duration: .85,
								ease,
								delay: .08
							},
							className: "mt-8 text-balance text-[2.7rem] font-semibold leading-[0.98] tracking-[-0.04em] sm:text-6xl lg:text-[4.6rem]",
							children: [
								hero.titleLine1,
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-emerald",
									children: hero.titleAccent
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
								hero.titleLine3
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.p, {
							initial: {
								opacity: 0,
								y: 18
							},
							animate: {
								opacity: 1,
								y: 0
							},
							transition: {
								duration: .8,
								ease,
								delay: .18
							},
							className: "mt-8 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg",
							children: hero.subtitle
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
							initial: {
								opacity: 0,
								y: 18
							},
							animate: {
								opacity: 1,
								y: 0
							},
							transition: {
								duration: .8,
								ease,
								delay: .26
							},
							className: "mt-10 flex flex-wrap items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
								href: "#featured",
								className: "group inline-flex items-center gap-2 border border-border bg-navy px-7 py-3.5 font-mono text-[0.72rem] uppercase tracking-[0.16em] text-navy-foreground transition-all hover:bg-emerald",
								children: [hero.primaryCta, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4 transition-transform group-hover:translate-x-1" })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
								href: "#contact",
								className: "group inline-flex items-center gap-2 border border-border bg-transparent px-7 py-3.5 font-mono text-[0.72rem] uppercase tracking-[0.16em] transition-all hover:shadow-[4px_4px_0_0_var(--emerald)]",
								children: [hero.secondaryCta, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { className: "h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" })]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.dl, {
							initial: { opacity: 0 },
							animate: { opacity: 1 },
							transition: {
								duration: .9,
								delay: .4
							},
							className: "mt-14 grid max-w-xl grid-cols-3 border-y border-border",
							children: hero.kpis.map((k, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: i < 2 ? "border-r border-hairline py-6 pr-4" : "py-6 pl-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
									className: "text-2xl font-semibold tracking-tight sm:text-3xl",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Counter, {
										value: k.value,
										suffix: k.suffix
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
									className: "eyebrow mt-2 text-[0.6rem]",
									children: k.label
								})]
							}, k.label))
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
					initial: {
						opacity: 0,
						y: 40
					},
					animate: {
						opacity: 1,
						y: 0
					},
					transition: {
						duration: 1,
						ease,
						delay: .2
					},
					className: "relative flex items-center py-14 lg:py-20 lg:pl-14",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid w-full grid-cols-1 border border-border bg-card shadow-[8px_8px_0_0_var(--surface)] sm:grid-cols-2",
							children: stats.slice(0, 5).map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
								initial: {
									opacity: 0,
									y: 16
								},
								animate: {
									opacity: 1,
									y: 0
								},
								transition: {
									duration: .6,
									ease,
									delay: .3 + i * .08
								},
								className: i === 4 ? "border-t border-border bg-surface/70 p-6 sm:col-span-2" : i < 2 ? "border-b border-border p-6 sm:odd:border-r sm:odd:border-border" : "border-border p-6 sm:odd:border-r sm:odd:border-border",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "num text-3xl font-semibold tracking-tight text-foreground sm:text-4xl",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Counter, {
											value: s.value,
											suffix: s.suffix
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-3 font-display text-sm font-semibold text-foreground",
										children: s.label
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1.5 text-xs leading-relaxed text-muted-foreground",
										children: s.detail
									})
								]
							}, s.label))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
							className: "absolute -left-4 top-[22%] hidden border border-border bg-card px-4 py-3 shadow-[4px_4px_0_0_var(--emerald)] sm:block",
							animate: { y: [
								0,
								-10,
								0
							] },
							transition: {
								duration: 8,
								repeat: Infinity,
								ease: "easeInOut"
							},
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "h-4 w-4 text-emerald" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs font-semibold",
									children: hero.floatOne.title
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "num text-[0.65rem] text-muted-foreground",
									children: hero.floatOne.sub
								})] })]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
							className: "absolute -right-3 bottom-[18%] hidden border border-border bg-card px-4 py-3 shadow-[4px_4px_0_0_oklch(0.185_0_0_/_0.9)] sm:block",
							animate: { y: [
								0,
								12,
								0
							] },
							transition: {
								duration: 9.5,
								repeat: Infinity,
								ease: "easeInOut"
							},
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-4 w-4 text-emerald" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs font-semibold",
									children: hero.floatTwo.title
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "num text-[0.65rem] text-muted-foreground",
									children: hero.floatTwo.sub
								})] })]
							})
						})
					]
				})]
			})]
		})]
	});
}
function About() {
	const { copy } = useSiteContent();
	const about = copy.about;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "about",
		className: "relative scroll-mt-28 py-24 lg:py-32",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto grid w-[min(1320px,94vw)] gap-14 lg:grid-cols-[0.95fr_1.05fr]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
					eyebrow: about.eyebrow,
					title: about.title,
					description: about.description
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
					delay: .1,
					className: "mt-8 grid gap-5 text-sm leading-relaxed text-muted-foreground",
					children: about.paragraphs.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: p }, p))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
					delay: .16,
					className: "mt-10 grid gap-4 sm:grid-cols-2",
					children: about.pillars.map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "border border-border bg-surface p-5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display text-sm font-semibold",
							children: i.title
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1.5 text-xs leading-relaxed text-muted-foreground",
							children: i.desc
						})]
					}, i.title))
				})
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
				delay: .12,
				className: "relative",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "sticky top-28 border border-border bg-card p-7",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "eyebrow",
							children: about.asideTitle
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-7 grid gap-6",
							children: about.points.map((s2) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "grid grid-cols-[auto_1fr] gap-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "num mt-0.5 text-xs font-semibold text-emerald",
									children: s2.n
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "min-w-0",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-display text-sm font-semibold",
										children: s2.title
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1 text-xs leading-relaxed text-muted-foreground",
										children: s2.desc
									})]
								})]
							}, s2.n))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-8 overflow-hidden border border-border bg-surface p-4 shadow-[0_14px_32px_rgba(0,0,0,0.12)]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "eyebrow text-[0.6rem]",
									children: "Research universe"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "num text-sm font-semibold text-foreground",
									children: [assetDistribution.length, " classes"]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DonutChart, {
								segments: assetDistribution,
								chartKey: "about-research-universe",
								className: "mt-4 max-w-[300px]",
								showLegend: false,
								showCallouts: true
							})]
						})
					]
				})
			})]
		})
	});
}
var HOME_ANALYSIS_LIMIT = 6;
function isImageSource(src) {
	const value = src.trim();
	return value.startsWith("http://") || value.startsWith("https://") || value.startsWith("/") || value.startsWith("data:image/") || value.startsWith("blob:");
}
function AnalysisChartVisual({ analysis, series, chartKey, height }) {
	const [imageFailed, setImageFailed] = (0, import_react.useState)(false);
	const coverImage = analysis.coverImage.trim();
	if (coverImage && isImageSource(coverImage) && !imageFailed) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
		src: coverImage,
		alt: analysis.title,
		className: "h-[72px] w-full object-cover",
		loading: "lazy",
		onError: () => setImageFailed(true)
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AreaChart, {
		series,
		height,
		accent: "blue",
		chartKey
	});
}
function AnalysisCardChart({ analysis, liveSeries, chartKey, livePrice, liveChange, liveUp }) {
	const series = liveSeries && liveSeries.length > 1 ? liveSeries : analysis.series;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative overflow-hidden bg-surface p-3.5 sm:p-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-start justify-between gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "num text-xs font-semibold",
					children: analysis.pair
				}), livePrice ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "num mt-1 text-sm font-semibold",
					children: [
						livePrice,
						" ",
						liveChange ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: liveUp ? "text-emerald" : "text-destructive",
							children: liveChange
						}) : null
					]
				}) : null]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "shrink-0 border border-emerald bg-transparent px-2.5 py-1 text-[0.6rem] font-semibold uppercase tracking-widest text-emerald",
				children: analysis.market
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-2.5 transition-transform duration-700 group-hover:scale-[1.02]",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnalysisChartVisual, {
				analysis,
				series,
				chartKey,
				height: 72
			})
		})]
	});
}
function FeaturedAnalysis() {
	const { analyses: fallbackAnalyses } = useSiteContent();
	const fetchAnalyses = useServerFn(listPublishedAnalyses);
	const { data: analyses = fallbackAnalyses, isLoading, isFetched } = useQuery({
		queryKey: ["published-analyses"],
		queryFn: () => fetchAnalyses(),
		...liveQueryOptions
	});
	const homepageItems = (0, import_react.useMemo)(() => analyses.slice(0, HOME_ANALYSIS_LIMIT), [analyses]);
	const pairs = (0, import_react.useMemo)(() => homepageItems.map((a) => a.pair), [homepageItems]);
	const { charts } = useMarketCharts(pairs);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "featured",
		className: "scroll-mt-28 py-24 lg:py-32",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto w-[min(1320px,94vw)]",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
					eyebrow: "Featured analysis",
					title: "Published case studies, thesis to outcome.",
					description: "A curated selection of the latest documented ideas. The full analysis library is available on a dedicated page as the archive grows."
				}),
				isLoading && !isFetched ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FeaturedAnalysisGridSkeleton, {}) : analyses.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-12 text-center text-sm text-muted-foreground",
					children: "No analysis has been published yet."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
					className: "mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
					initial: "hidden",
					animate: "show",
					variants: {
						hidden: {},
						show: { transition: { staggerChildren: .06 } }
					},
					children: homepageItems.map((a) => {
						const live = getChartForPair(charts, a.pair);
						const chartKey = a.slug;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
							variants: revealVariants,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/analysis",
								className: "surface-card group flex h-full flex-col overflow-hidden",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnalysisCardChart, {
									analysis: a,
									liveSeries: live?.prices,
									chartKey,
									livePrice: live?.price,
									liveChange: live?.change,
									liveUp: live?.up
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-1 flex-col p-4 sm:p-5",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "eyebrow text-[0.58rem]",
											children: a.timeframe
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
											className: "mt-2 text-pretty font-display text-base font-semibold leading-snug",
											children: a.title
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-2 line-clamp-3 flex-1 text-xs leading-relaxed text-muted-foreground sm:text-sm",
											children: a.summary
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-border pt-3.5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "eyebrow text-[0.55rem]",
												children: "Outcome"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "num mt-0.5 text-xs font-semibold text-emerald",
												children: a.outcome
											})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "inline-flex items-center gap-1 text-xs font-semibold transition-colors group-hover:text-emerald",
												children: ["View in library", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { className: "h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" })]
											})]
										})
									]
								})]
							})
						}, a.slug);
					})
				}),
				analyses.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
					delay: .12,
					className: "mt-10 flex justify-center",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/analysis",
						className: "group inline-flex items-center gap-2 border border-border bg-navy px-6 py-3 font-mono text-[0.7rem] uppercase tracking-[0.16em] text-navy-foreground transition-all hover:bg-emerald",
						children: ["View more analysis", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { className: "h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" })]
					})
				}) : null
			]
		})
	});
}
function TradingJournal() {
	const fetchTrades = useServerFn(listPublishedTrades);
	const { data: trades = [], isLoading } = useQuery({
		queryKey: ["published-trades"],
		queryFn: () => fetchTrades(),
		...liveQueryOptions
	});
	const metrics = (0, import_react.useMemo)(() => computeMetrics(trades), [trades]);
	const chart = (0, import_react.useMemo)(() => equitySeriesForChart(trades), [trades]);
	const recent = (0, import_react.useMemo)(() => [...trades].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 8), [trades]);
	const axisTicks = (0, import_react.useMemo)(() => {
		const values = chart.series.filter((v) => Number.isFinite(v));
		if (values.length === 0) return ["0"];
		const min = Math.min(...values);
		const span = Math.max(...values) - min || 1;
		return [
			3,
			2,
			1,
			0
		].map((i) => (min + span * i / 3).toLocaleString("en-US", { maximumFractionDigits: 1 }));
	}, [chart.series]);
	const cards = [
		{
			label: "Total Trades",
			value: String(metrics.totalTrades)
		},
		{
			label: "Total R",
			value: `${metrics.totalR >= 0 ? "+" : ""}${metrics.totalR}R`
		},
		{
			label: "Average R",
			value: `${metrics.avgR >= 0 ? "+" : ""}${metrics.avgR}R`
		},
		{
			label: "Win Rate",
			value: `${metrics.winRate}%`
		},
		{
			label: "Total P/L",
			value: `${metrics.totalPnlPct >= 0 ? "+" : ""}${metrics.totalPnlPct}%`
		},
		{
			label: "Net Performance",
			value: `${metrics.netPerformanceR >= 0 ? "+" : ""}${metrics.netPerformanceR}R`
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "journal",
		className: "scroll-mt-28 border-y border-border py-24 lg:py-32",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto w-[min(1320px,94vw)]",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
					eyebrow: "Trading journal",
					title: "Performance tracked in risk multiples.",
					description: "Every published transaction feeds the equity curve automatically from the admin journal or the configured Excel CSV sync."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stagger, {
					className: "mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
					children: cards.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StaggerItem, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "border border-border bg-card p-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "eyebrow text-[0.6rem]",
							children: c.label
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "num mt-3 text-3xl font-semibold tracking-tight",
							children: c.value
						})]
					}) }, c.label))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, {
					delay: .1,
					className: "mt-10 border border-border bg-card p-5 sm:p-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-end justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "eyebrow",
							children: "Equity curve"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1.5 text-xs text-muted-foreground",
							children: chart.fromSeed ? "Waiting for synced transaction data" : "Cumulative R from synced transactions · auto-refreshes every 45 seconds · starting at 0R"
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap items-center justify-end gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: `border px-2.5 py-1 font-mono text-[0.6rem] uppercase tracking-[0.14em] ${chart.fromSeed ? "border-border bg-surface text-muted-foreground" : "border-emerald/30 bg-emerald/5 text-emerald"}`,
								children: chart.fromSeed ? "Waiting" : "Synced"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "num text-xl font-semibold text-emerald",
								children: [
									chart.endR >= 0 ? "+" : "",
									chart.endR,
									"R"
								]
							})]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-4 overflow-hidden border border-border bg-white px-2 py-3 sm:px-3",
						children: isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(JournalEquitySkeleton, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-stretch gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex h-[96px] w-12 shrink-0 flex-col justify-between text-right font-mono text-[0.6rem] text-muted-foreground",
								children: axisTicks.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [t, "R"] }, t))
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "min-w-0 flex-1",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GlowLineChart, {
									series: chart.series,
									height: 96,
									chartKey: `journal-equity-${chart.fromSeed ? "seed" : "live"}-${chart.series.length}-${chart.endR}`
								})
							})]
						})
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, {
					delay: .14,
					className: "mt-10",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "eyebrow",
						children: "Recent trades"
					}), recent.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 text-sm text-muted-foreground",
						children: "No published trades yet. Add them from the admin journal."
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-4 overflow-x-auto border border-border",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
							className: "w-full min-w-[720px] text-left text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
								className: "border-b border-border bg-surface font-mono text-[0.65rem] uppercase tracking-[0.14em] text-muted-foreground",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "px-4 py-3 font-medium",
										children: "Date"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "px-4 py-3 font-medium",
										children: "Asset"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "px-4 py-3 font-medium",
										children: "Dir"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "px-4 py-3 font-medium",
										children: "Entry"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "px-4 py-3 font-medium",
										children: "Exit"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "px-4 py-3 font-medium",
										children: "R"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "px-4 py-3 font-medium",
										children: "P/L %"
									})
								] })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: recent.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TradeRow, { trade: t }, t.id)) })]
						})
					})]
				})
			]
		})
	});
}
function TradeRow({ trade }) {
	const positive = trade.rMultiple >= 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
		className: "border-b border-border last:border-0",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
				className: "num px-4 py-3 text-muted-foreground",
				children: trade.date
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
				className: "px-4 py-3 font-medium",
				children: trade.instrument
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
				className: "px-4 py-3",
				children: trade.direction
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
				className: "num px-4 py-3",
				children: trade.entry || "—"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
				className: "num px-4 py-3",
				children: trade.exit || "—"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
				className: `num px-4 py-3 font-semibold ${positive ? "text-emerald" : "text-destructive"}`,
				children: [
					positive ? "+" : "",
					trade.rMultiple,
					"R"
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
				className: "num px-4 py-3",
				children: [
					trade.percentage >= 0 ? "+" : "",
					trade.percentage,
					"%"
				]
			})
		]
	});
}
function Process() {
	const { processSteps } = useSiteContent();
	const rows = [];
	for (let i = 0; i < processSteps.length; i += 3) rows.push(processSteps.slice(i, i + 3));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "process",
		className: "scroll-mt-28 border-y border-border bg-surface py-24 lg:py-32",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto w-[min(1320px,94vw)]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
				eyebrow: "Analysis process",
				title: "A seven-stage sequence, run identically every time.",
				description: "No stage is skipped and no entry is taken before stage five is complete. This is what keeps analysis objective when markets are not."
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-14 grid gap-5",
				children: rows.map((row, rowIndex) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: row.length === 3 ? "grid gap-5 sm:grid-cols-2 lg:grid-cols-3" : "grid gap-5 sm:grid-cols-2 lg:mx-auto lg:w-1/3 lg:grid-cols-1",
					children: row.map((s, i) => {
						const index = rowIndex * 3 + i;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.article, {
							initial: {
								opacity: 0,
								y: 26
							},
							whileInView: {
								opacity: 1,
								y: 0
							},
							viewport: {
								once: true,
								margin: "-60px"
							},
							transition: {
								duration: .6,
								delay: i * .06,
								ease: [
									.22,
									1,
									.36,
									1
								]
							},
							className: "surface-card group relative p-6 sm:p-7",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "num text-3xl font-semibold text-emerald/25 transition-colors group-hover:text-emerald",
										children: s.n
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StepGlyph, { index })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "mt-6 text-base font-semibold",
									children: s.title
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2.5 text-sm leading-relaxed text-muted-foreground",
									children: s.desc
								})
							]
						}, s.n);
					})
				}, rowIndex))
			})]
		})
	});
}
function StepGlyph({ index }) {
	const glyphs = [
		"M2 22 L10 10 L16 16 L24 4 L30 12",
		"M2 20 h8 v-8 h8 v-6 h12",
		"M2 6 h28 M2 14 h20 M2 22 h26",
		"M4 16 l6 6 L28 6",
		"M16 3 l12 6 v8 c0 7-5 11-12 13 -7-2-12-6-12-13V9z",
		"M3 24 L13 12 l6 6 L29 4",
		"M4 20 a12 12 0 1 1 4 8 M4 28 v-8 h8"
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
		viewBox: "0 0 32 32",
		className: "h-9 w-9 text-emerald",
		fill: "none",
		"aria-hidden": true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			d: glyphs[index % glyphs.length],
			stroke: "currentColor",
			strokeWidth: "1.6",
			strokeLinecap: "round",
			strokeLinejoin: "round",
			opacity: "0.85"
		})
	});
}
function Services() {
	const { services } = useSiteContent();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "services",
		className: "scroll-mt-28 py-24 lg:py-32",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto w-[min(1320px,94vw)]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
				eyebrow: "Services",
				title: "Engagements built around your mandate.",
				description: "From a single custom market review to an ongoing institutional research retainer — every engagement uses the same documented methodology."
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stagger, {
				className: "mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3",
				children: [services.map((s) => {
					const Icon = lucide_react_exports[s.icon] ?? Activity;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StaggerItem, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TiltCard, {
						className: "h-full",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
							className: "surface-card group relative h-full overflow-hidden p-7",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "relative grid h-11 w-11 place-items-center border border-border bg-surface text-emerald",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-5 w-5" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "relative mt-6 text-lg font-semibold",
									children: s.title
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "relative mt-2.5 text-sm leading-relaxed text-muted-foreground",
									children: s.desc
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
									href: "#contact",
									className: "relative mt-6 inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground transition-colors group-hover:text-emerald",
									children: ["Enquire", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-3.5 w-3.5" })]
								})
							]
						})
					}) }, s.title);
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StaggerItem, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "surface-card group flex h-full flex-col justify-between overflow-hidden p-7",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "grid h-11 w-11 place-items-center border border-border bg-surface text-emerald",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarCheck, { className: "h-5 w-5" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "eyebrow mt-6 text-muted-foreground",
							children: "Not sure which fits?"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "mt-4 text-xl font-semibold leading-snug",
							children: "Start with a 45-minute consultation."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-sm leading-relaxed text-muted-foreground",
							children: "We review your markets, current process and objectives, then I send a written summary with recommendations."
						})
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
						href: "#contact",
						className: "mt-8 inline-flex items-center justify-center gap-2 border border-border bg-navy px-5 py-3.5 font-mono text-[0.72rem] uppercase tracking-[0.16em] text-navy-foreground transition-all hover:bg-emerald hover:shadow-[4px_4px_0_0_var(--border)]",
						children: ["Book a consultation", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { className: "h-4 w-4" })]
					})]
				}) })]
			})]
		})
	});
}
function WhyWorkWithMe() {
	const { differentiators } = useSiteContent();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "why",
		className: "scroll-mt-28 border-y border-border bg-surface py-24 lg:py-32",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto w-[min(1320px,94vw)]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
				eyebrow: "Why work with me",
				title: "Six standards I refuse to compromise on.",
				align: "center"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stagger, {
				className: "mt-14 grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2 lg:grid-cols-3",
				children: differentiators.map((d) => {
					const Icon = lucide_react_exports[d.icon] ?? Activity;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StaggerItem, {
						className: "bg-card",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "group h-full p-8 transition-colors duration-500 hover:bg-surface",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-5 w-5 text-emerald transition-transform duration-500 group-hover:scale-110" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "font-display text-base font-semibold",
									children: d.title
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-4 text-sm leading-relaxed text-muted-foreground",
								children: d.desc
							})]
						})
					}, d.title);
				})
			})]
		})
	});
}
var Accordion = Root2;
var AccordionItem = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Item, {
	ref,
	className: cn("border-b", className),
	...props
}));
AccordionItem.displayName = "AccordionItem";
var AccordionTrigger = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Header, {
	className: "flex",
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Trigger2, {
		ref,
		className: cn("flex flex-1 items-center justify-between py-4 text-sm font-medium cursor-pointer transition-all hover:underline text-left [&[data-state=open]>svg]:rotate-180", className),
		...props,
		children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200" })]
	})
}));
AccordionTrigger.displayName = Trigger2.displayName;
var AccordionContent = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content2, {
	ref,
	className: "overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
	...props,
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("pb-4 pt-0", className),
		children
	})
}));
AccordionContent.displayName = Content2.displayName;
function Testimonials() {
	const { testimonials } = useSiteContent();
	const [index, setIndex] = (0, import_react.useState)(0);
	const next = (0, import_react.useCallback)(() => setIndex((i) => (i + 1) % testimonials.length), [testimonials.length]);
	const prev = () => setIndex((i) => (i - 1 + testimonials.length) % testimonials.length);
	(0, import_react.useEffect)(() => {
		const t = setInterval(next, 7e3);
		return () => clearInterval(t);
	}, [next]);
	const t = testimonials[index];
	if (!t) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		id: "testimonials",
		className: "relative scroll-mt-28 overflow-hidden py-24 lg:py-32",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "pointer-events-none absolute inset-0 -z-10 opacity-70",
			style: { background: "var(--gradient-hero)" }
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto w-[min(1100px,92vw)]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
				eyebrow: "Testimonials",
				title: "What desks and communities say.",
				align: "center"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, {
				delay: .1,
				className: "relative mt-14",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "glass-panel p-8 shadow-[var(--shadow-lift)] sm:p-12",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Quote, { className: "h-8 w-8 text-emerald/40" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, {
						mode: "wait",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.blockquote, {
							initial: {
								opacity: 0,
								y: 16
							},
							animate: {
								opacity: 1,
								y: 0
							},
							exit: {
								opacity: 0,
								y: -12
							},
							transition: {
								duration: .45,
								ease: [
									.22,
									1,
									.36,
									1
								]
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-6 text-pretty font-display text-xl font-medium leading-snug sm:text-2xl",
								children: [
									"“",
									t.quote,
									"”"
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
								className: "mt-8 flex flex-wrap items-center justify-between gap-5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex min-w-0 items-center gap-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "grid h-12 w-12 shrink-0 place-items-center bg-navy font-display text-sm font-semibold text-navy-foreground",
										children: t.name.split(" ").map((n) => n[0]).join("")
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "min-w-0",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "truncate text-sm font-semibold",
											children: t.name
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "truncate text-xs text-muted-foreground",
											children: t.role
										})]
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex gap-1",
									"aria-label": `${t.rating} out of 5`,
									children: Array.from({ length: t.rating }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "h-4 w-4 fill-emerald text-emerald" }, i))
								})]
							})]
						}, index)
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-8 flex items-center justify-center gap-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: prev,
							"aria-label": "Previous testimonial",
							className: "grid h-10 w-10 place-items-center border border-border bg-card transition-colors hover:border-emerald hover:text-emerald",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-4 w-4" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex gap-2",
							children: testimonials.map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setIndex(i),
								"aria-label": `Go to testimonial ${i + 1}`,
								className: i === index ? "h-1.5 w-7 bg-emerald transition-all" : "h-1.5 w-1.5 bg-hairline transition-all"
							}, i))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: next,
							"aria-label": "Next testimonial",
							className: "grid h-10 w-10 place-items-center border border-border bg-card transition-colors hover:border-emerald hover:text-emerald",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4" })
						})
					]
				})]
			})]
		})]
	});
}
function Faq() {
	const { faqs } = useSiteContent();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "faq",
		className: "scroll-mt-28 py-24 lg:py-32",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto grid w-[min(1100px,92vw)] gap-12 lg:grid-cols-[0.85fr_1.15fr]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
				eyebrow: "FAQ",
				title: "Common questions, answered plainly.",
				description: "If your question isn't here, the contact form below reaches me directly."
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
				delay: .1,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Accordion, {
					type: "single",
					collapsible: true,
					className: "w-full",
					children: faqs.map((f, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AccordionItem, {
						value: `item-${i}`,
						className: "border-hairline",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccordionTrigger, {
							className: "py-5 text-left font-display text-base font-semibold hover:no-underline",
							children: f.q
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccordionContent, {
							className: "pb-6 text-sm leading-relaxed text-muted-foreground",
							children: f.a
						})]
					}, f.q))
				})
			})]
		})
	});
}
function formatMonth(value) {
	if (!value) return "";
	const date = new Date(value.length === 7 ? `${value}-01` : value);
	if (Number.isNaN(date.getTime())) return value;
	return date.toLocaleDateString("en-GB", {
		month: "short",
		year: "numeric"
	});
}
function Certifications() {
	const { certifications } = useSiteContent();
	if (!certifications || certifications.length === 0) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "certifications",
		className: "scroll-mt-28 py-24 lg:py-32",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto w-[min(1320px,94vw)]",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
					eyebrow: "Certifications",
					title: "Credentials behind the research.",
					description: "Formal qualifications and continuing education that underpin the methodology applied to every analysis."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stagger, {
					className: "mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3",
					gap: .08,
					children: certifications.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StaggerItem, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "surface-card flex h-full flex-col p-6 sm:p-7",
						children: [
							c.image ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: c.image,
								alt: `${c.name} certificate`,
								loading: "lazy",
								className: "mb-6 aspect-[4/3] w-full border border-border object-cover"
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mb-6 grid h-11 w-11 place-items-center border border-border text-emerald",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BadgeCheck, { className: "h-5 w-5" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap items-center gap-x-3 gap-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "num text-[0.65rem] font-semibold text-emerald",
									children: formatMonth(c.date)
								}), c.credentialId ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "border border-border px-2 py-0.5 font-mono text-[0.58rem] uppercase tracking-widest text-muted-foreground",
									children: ["ID ", c.credentialId]
								}) : null]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "mt-4 text-pretty text-base font-semibold leading-snug",
								children: c.name
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1.5 text-sm text-muted-foreground",
								children: c.org
							}),
							c.desc ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-4 flex-1 text-sm leading-relaxed text-muted-foreground",
								children: c.desc
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "flex-1" }),
							c.link ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
								href: c.link,
								target: "_blank",
								rel: "noopener noreferrer",
								className: "mt-6 inline-flex items-center gap-2 border-t border-border pt-4 font-mono text-[0.66rem] uppercase tracking-[0.16em] transition-colors hover:text-emerald",
								children: ["Verify credential", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { className: "h-3.5 w-3.5" })]
							}) : null
						]
					}) }, `${c.name}-${c.org}`))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
					className: "mt-10",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted-foreground",
						children: "Credential verification links open on the issuing organisation's website."
					})
				})
			]
		})
	});
}
var submitContact = createServerFn({ method: "POST" }).validator((input) => contactSchema.parse(input)).handler(createSsrRpc("1ac20e83585a55e943670fa4670b07889b610801a7a21f28dc367c19f92e50fd"));
function Contact() {
	const { copy, links } = useSiteContent();
	const socials = links.filter((l) => l.href.trim().length > 0);
	const contact = copy.contact;
	const [sent, setSent] = (0, import_react.useState)(false);
	const [busy, setBusy] = (0, import_react.useState)(false);
	const submit = useServerFn(submitContact);
	const onSubmit = async (e) => {
		e.preventDefault();
		if (busy) return;
		const form = e.currentTarget;
		const fd = new FormData(form);
		setBusy(true);
		try {
			const result = await submit({ data: {
				name: String(fd.get("name") ?? ""),
				email: String(fd.get("email") ?? ""),
				organisation: String(fd.get("org") ?? ""),
				topic: String(fd.get("topic") ?? ""),
				message: String(fd.get("message") ?? "")
			} });
			setSent(true);
			form.reset();
			toast.success("Message received", { description: result?.emailed ? "I reply to every enquiry within one business day." : "Saved — email delivery may need a one-time inbox confirmation." });
		} catch (err) {
			console.error("[contact] form error:", err);
			toast.error(err instanceof Error ? err.message : "Could not send enquiry", { duration: 8e3 });
		} finally {
			setBusy(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		id: "contact",
		className: "relative scroll-mt-28 overflow-hidden py-24 lg:py-32",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "pointer-events-none absolute inset-0 -z-10",
			style: { background: "var(--gradient-hero)" }
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto grid w-[min(1320px,94vw)] gap-12 lg:grid-cols-[0.95fr_1.05fr]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
					eyebrow: contact.eyebrow,
					title: contact.title,
					description: contact.description
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
					delay: .1,
					className: "mt-10 border border-border bg-card",
					children: [
						{
							l: "Email",
							v: contact.email
						},
						{
							l: "Response time",
							v: contact.responseTime
						},
						{
							l: "Coverage",
							v: contact.coverage
						}
					].map((c, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: cn("grid gap-1 px-6 py-5 sm:grid-cols-[9rem_1fr] sm:items-baseline sm:gap-6", i > 0 && "border-t border-border"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "eyebrow text-[0.62rem]",
							children: c.l
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display text-sm font-semibold leading-relaxed sm:text-base",
							children: c.v
						})]
					}, c.l))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, {
					delay: .16,
					className: "mt-8",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "eyebrow",
						children: "Direct channels"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-4 flex flex-wrap gap-2",
						children: socials.map((s) => {
							const Icon = iconForPlatform(s.platform);
							const isMail = s.href.startsWith("mailto:");
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
								href: s.href,
								...isMail ? {} : {
									target: "_blank",
									rel: "noopener noreferrer"
								},
								className: "inline-flex items-center gap-2 border border-border bg-card px-4 py-2.5 text-xs font-semibold transition-colors hover:border-emerald hover:text-emerald",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-3.5 w-3.5" }), s.label || s.platform]
							}, `${s.platform}-${s.href}`);
						})
					})]
				})
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
				delay: .12,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit,
					className: "border border-border bg-card p-7 shadow-[var(--shadow-lift)] sm:p-9",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-5 sm:grid-cols-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Full name",
								name: "name",
								placeholder: "Alex Morgan"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Email",
								name: "email",
								type: "email",
								placeholder: "alex@fund.com"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-5 grid gap-5 sm:grid-cols-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Organisation",
								name: "org",
								required: false,
								placeholder: "Fund, desk or community"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								htmlFor: "topic",
								className: "eyebrow",
								children: "Engagement"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
								id: "topic",
								name: "topic",
								className: "mt-2.5 w-full border border-border bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-emerald",
								children: contact.engagements.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: o }, o))
							})] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								htmlFor: "message",
								className: "eyebrow",
								children: "Message"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
								id: "message",
								name: "message",
								required: true,
								rows: 5,
								placeholder: "Markets you trade, timeframe, and what you'd like covered…",
								className: "mt-2.5 w-full resize-none border border-border bg-background px-4 py-3 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-emerald"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "submit",
							disabled: busy || sent,
							className: "group mt-8 inline-flex w-full items-center justify-center gap-2 border border-border bg-navy px-6 py-4 font-mono text-[0.72rem] uppercase tracking-[0.16em] text-navy-foreground transition-colors hover:bg-emerald disabled:opacity-70",
							children: busy ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 animate-spin" }), "Sending…"] }) : sent ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-4 w-4 text-emerald" }), "Message sent"] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: ["Send enquiry", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4 transition-transform group-hover:translate-x-1" })] })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 text-center text-xs text-muted-foreground",
							children: contact.footnote
						})
					]
				})
			})]
		})]
	});
}
function Field({ label, name, type = "text", placeholder, required = true }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
		htmlFor: name,
		className: "eyebrow",
		children: label
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		id: name,
		name,
		type,
		required,
		placeholder,
		className: "mt-2.5 w-full border border-border bg-background px-4 py-3 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-emerald"
	})] });
}
function Index() {
	const { sections } = useSiteContent();
	const registry = {
		hero: Hero,
		about: About,
		featured: FeaturedAnalysis,
		reports: WeeklyReports,
		journal: TradingJournal,
		process: Process,
		certifications: Certifications,
		services: Services,
		why: WhyWorkWithMe,
		testimonials: Testimonials,
		faq: Faq,
		contact: Contact
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", { children: sections.filter((s) => s.enabled && registry[s.id]).map((s) => {
		const Section = registry[s.id];
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {}, s.id);
	}) });
}
//#endregion
export { Index as component };
