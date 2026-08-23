import { c as createServerFn } from "./createServerFn-CIHAFgYl.mjs";
import { o as require_jsx_runtime } from "../_libs/@ai-sdk/react+[...].mjs";
import { n as createSsrRpc, t as cn } from "./createSsrRpc-vr7yBYzy.mjs";
import { t as requireSupabaseAuth } from "./auth-middleware-tiFBA43n.mjs";
import { Ft as numberType, It as objectType, Lt as stringType, Mt as arrayType, Nt as booleanType } from "../_libs/@ai-sdk/gateway+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/analyses.functions-BviDkd_w.js
var import_jsx_runtime = require_jsx_runtime();
/** Theme-aligned skeleton block — sharp corners, hairline fill, site palette. */
function Bone({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"aria-hidden": true,
		className: cn("animate-pulse bg-hairline", className),
		...props
	});
}
function SectionHeadingSkeleton({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("grid gap-3", className),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bone, { className: "h-3 w-24" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bone, { className: "h-9 max-w-md" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bone, { className: "h-4 max-w-xl" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bone, { className: "h-4 max-w-lg" })
		]
	});
}
function ChartAreaSkeleton({ height = 160, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("relative border border-border bg-surface p-4", className),
		style: { height: height + 32 },
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bone, { className: "h-3 w-20" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bone, { className: "h-6 w-16" })]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative mt-4",
			style: { height },
			children: [[
				.25,
				.5,
				.75
			].map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute inset-x-0 border-t border-dashed border-hairline",
				style: { top: `${f * 100}%` }
			}, f)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bone, { className: "absolute bottom-0 left-0 h-[72%] w-full origin-bottom scale-y-100 opacity-80 [clip-path:polygon(0_100%,0_45%,12%_52%,24%_38%,36%_48%,48%_28%,60%_42%,72%_22%,84%_35%,100%_18%,100%_100%)]" })]
		})]
	});
}
function HeroPanelSkeleton() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "w-full border border-border bg-card",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start justify-between border-b border-border p-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bone, { className: "h-3 w-28" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bone, { className: "h-8 w-36" })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bone, { className: "h-6 w-24" })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartAreaSkeleton, {
				height: 150,
				className: "border-0 border-b border-border"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "border-b border-border p-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex h-[130px] items-end justify-between gap-1 px-1",
					children: Array.from({ length: 12 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bone, {
						className: "w-full max-w-[14px]",
						style: { height: `${28 + i * 17 % 55}%` }
					}, i))
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-3 text-center",
				children: Array.from({ length: 3 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: cn("px-2 py-4", i < 2 && "border-r border-hairline"),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bone, { className: "mx-auto h-2.5 w-12" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bone, { className: "mx-auto mt-2 h-4 w-16" })]
				}, i))
			})
		]
	});
}
function HeroSectionSkeleton() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "relative overflow-hidden border-b border-border pt-36 sm:pt-44",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "grid-lines pointer-events-none absolute inset-0 -z-10 opacity-70 [mask-image:radial-gradient(80%_70%_at_50%_0%,black,transparent)]" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto w-[min(1320px,94vw)]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between border-y border-border py-2.5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bone, { className: "h-3 w-20" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bone, { className: "hidden h-3 w-32 sm:block" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bone, { className: "h-3 w-16" })
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid items-stretch gap-0 lg:grid-cols-[1.05fr_0.95fr]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "border-border py-14 lg:border-r lg:py-20 lg:pr-14",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bone, { className: "h-8 w-44" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bone, { className: "mt-8 h-14 w-full max-w-lg" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bone, { className: "mt-3 h-14 w-full max-w-md" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bone, { className: "mt-3 h-14 w-48" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bone, { className: "mt-8 h-4 w-full max-w-xl" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bone, { className: "mt-2 h-4 w-full max-w-lg" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-10 flex gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bone, { className: "h-12 w-40" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bone, { className: "h-12 w-44" })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-14 grid max-w-xl grid-cols-3 border-y border-border",
							children: Array.from({ length: 3 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: cn("py-6", i < 2 && "border-r border-hairline pr-4"),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bone, { className: "h-8 w-16" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bone, { className: "mt-2 h-2.5 w-20" })]
							}, i))
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex items-center py-14 lg:py-20 lg:pl-14",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeroPanelSkeleton, {})
				})]
			})]
		})]
	});
}
function AnalysisCardSkeleton({ large }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "surface-card flex flex-col overflow-hidden",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "bg-surface p-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bone, { className: "h-3 w-16" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bone, { className: "h-5 w-14" })]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartAreaSkeleton, {
				height: 72,
				className: "mt-3 border-0 bg-transparent p-0"
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col p-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bone, { className: "h-3 w-24" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bone, { className: "mt-3 h-5 w-full" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bone, { className: "mt-2 h-5 w-full max-w-[85%]" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bone, { className: "mt-3 h-3.5 w-full" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bone, { className: "mt-2 h-3.5 w-full max-w-[75%]" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 flex justify-between border-t border-border pt-3.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bone, { className: "h-2.5 w-12" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bone, { className: "mt-2 h-3.5 w-20" })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bone, { className: "h-3.5 w-20" })]
				})
			]
		})]
	});
}
function FeaturedAnalysisSkeleton() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "scroll-mt-28 py-24 lg:py-32",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto w-[min(1320px,94vw)]",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeadingSkeleton, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bone, { className: "h-11 w-52 lg:mb-2" })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-10 flex flex-wrap gap-2",
					children: Array.from({ length: 6 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bone, { className: "h-9 w-20" }, i))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-10 grid gap-6 lg:grid-cols-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnalysisCardSkeleton, { large: true }), Array.from({ length: 3 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnalysisCardSkeleton, {}, i))]
				})
			]
		})
	});
}
function JournalEquitySkeleton() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartAreaSkeleton, { height: 96 });
}
function FeaturedAnalysisGridSkeleton() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
		children: Array.from({ length: 6 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnalysisCardSkeleton, {}, i))
	});
}
/** Full homepage placeholder while route/content loads. */
function HomePageSkeleton() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeroSectionSkeleton, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FeaturedAnalysisSkeleton, {})] });
}
var levelSchema = objectType({
	label: stringType().max(120),
	value: stringType().max(240)
});
var analysisSchema = objectType({
	id: stringType().max(60).optional().default(""),
	slug: stringType().trim().min(2).max(120).regex(/^[a-z0-9-]+$/, { message: "Slug can use lowercase letters, numbers and dashes only" }),
	title: stringType().trim().min(2).max(200),
	subtitle: stringType().max(300).default(""),
	market: stringType().max(60).default("Crypto"),
	category: stringType().max(80).default(""),
	pair: stringType().max(80).default(""),
	timeframe: stringType().max(120).default(""),
	date: stringType().max(30).default(""),
	summary: stringType().max(1200).default(""),
	description: stringType().max(8e3).default(""),
	bias: stringType().max(400).default(""),
	marketStructure: stringType().max(2e3).default(""),
	invalidation: stringType().max(1200).default(""),
	outcome: stringType().max(200).default(""),
	rr: stringType().max(60).default(""),
	tags: arrayType(stringType().max(60)).max(30).default([]),
	series: arrayType(numberType()).max(200).default([]),
	thesis: arrayType(stringType().max(1200)).max(30).default([]),
	targets: arrayType(levelSchema).max(30).default([]),
	coverImage: stringType().max(500).default(""),
	gallery: arrayType(stringType().max(500)).max(40).default([]),
	tradingviewUrl: stringType().max(500).default(""),
	pdfUrl: stringType().max(500).default(""),
	featured: booleanType().default(false),
	published: booleanType().default(false),
	sortOrder: numberType().default(0)
});
/** Single analysis by id — admin only. */
var getAnalysis = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).validator((input) => objectType({ id: stringType().min(1) }).parse(input)).handler(createSsrRpc("bf4b64bf6eda181966105e4d6eebbb4e69eac1d9b79f63287044c0627da9829c"));
/** Published case studies for the public site (DB with static fallback). */
var listPublishedAnalyses = createServerFn({ method: "GET" }).handler(createSsrRpc("c8c114c2cd1b55d7033188f1936b15a83ece2b9afc53715a51cdccdf366f22f4"));
/** All analyses, drafts included — admin only. */
var listAllAnalyses = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).handler(createSsrRpc("c89c3293a606c91ea8cfa9e31159c94ebe8beb4258837166dec1371bf1ae1df3"));
var saveAnalysis = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).validator((input) => analysisSchema.parse(input)).handler(createSsrRpc("e4e54ba52f728f8d55f9f2495cade334ebedd5ead9197a7716bcad8df4afe5f3"));
var deleteAnalysis = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).validator((input) => objectType({ id: stringType().min(1) }).parse(input)).handler(createSsrRpc("145e65c011e198faaef394deb65860bef9a95e716e04989a277602dc3319e784"));
//#endregion
export { JournalEquitySkeleton as a, listAllAnalyses as c, HomePageSkeleton as i, listPublishedAnalyses as l, ChartAreaSkeleton as n, deleteAnalysis as o, FeaturedAnalysisGridSkeleton as r, getAnalysis as s, Bone as t, saveAnalysis as u };
