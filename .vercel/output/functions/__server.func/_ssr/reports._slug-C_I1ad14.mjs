import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@ai-sdk/react+[...].mjs";
import { F as Download, G as ArrowUpRight, V as ChartLine, q as ArrowLeft } from "../_libs/lucide-react.mjs";
import { n as Reveal } from "./primitives-Byu1gJwu.mjs";
import { n as formatReportDate } from "./reports-CiU5ItE7.mjs";
import { t as Route } from "./reports._slug-DafaxQUu.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/reports._slug-C_I1ad14.js
var import_jsx_runtime = require_jsx_runtime();
function ReportDetail() {
	const { report: r, all } = Route.useLoaderData();
	const related = all.filter((x) => x.slug !== r.slug).slice(0, 3);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "pt-32",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
			className: "mx-auto w-[min(1100px,92vw)]",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/",
					hash: "reports",
					className: "inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-emerald",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-4 w-4" }), "All weekly reports"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, {
					className: "mt-8",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap items-center gap-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "border border-emerald px-3 py-1 text-[0.6rem] font-semibold uppercase tracking-widest text-emerald",
									children: r.market
								}),
								r.asset ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "num text-xs font-semibold",
									children: r.asset
								}) : null,
								r.weekLabel ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "num text-xs text-muted-foreground",
									children: r.weekLabel
								}) : null,
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "num text-xs text-muted-foreground",
									children: formatReportDate(r.date)
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "mt-6 text-balance text-3xl font-semibold leading-[1.08] sm:text-5xl",
							children: r.title
						}),
						r.summary ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-6 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg",
							children: r.summary
						}) : null
					]
				}),
				r.coverImage ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
					delay: .08,
					className: "mt-12",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: r.coverImage,
						alt: r.title,
						className: "w-full border border-border object-cover"
					})
				}) : null,
				r.tradingviewUrl || r.pdfUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, {
					delay: .1,
					className: "mt-8 flex flex-wrap gap-3",
					children: [r.tradingviewUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
						href: r.tradingviewUrl,
						target: "_blank",
						rel: "noopener noreferrer",
						className: "inline-flex items-center gap-2 border border-border bg-card px-5 py-3 font-mono text-[0.7rem] uppercase tracking-[0.16em] transition-colors hover:border-emerald hover:text-emerald",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartLine, { className: "h-4 w-4" }), " View TradingView chart"]
					}) : null, r.pdfUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
						href: r.pdfUrl,
						target: "_blank",
						rel: "noopener noreferrer",
						className: "inline-flex items-center gap-2 border border-border bg-navy px-5 py-3 font-mono text-[0.7rem] uppercase tracking-[0.16em] text-navy-foreground transition-colors hover:bg-emerald",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "h-4 w-4" }), " Download PDF"]
					}) : null]
				}) : null,
				r.body ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
					delay: .12,
					className: "mt-14 grid max-w-3xl gap-5",
					children: r.body.split(/\n{2,}/).filter(Boolean).map((para, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm leading-relaxed text-muted-foreground sm:text-base",
						children: para
					}, i))
				}) : null,
				r.gallery.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "mt-16",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-2xl font-semibold",
						children: "Charts"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-8 grid gap-5 sm:grid-cols-2",
						children: r.gallery.map((src) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src,
							alt: `${r.title} chart`,
							loading: "lazy",
							className: "w-full border border-border object-cover"
						}, src))
					})]
				}) : null,
				r.tags.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-14 flex flex-wrap gap-2",
					children: r.tags.map((tag) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "border border-border px-2.5 py-1 font-mono text-[0.6rem] uppercase tracking-widest text-muted-foreground",
						children: tag
					}, tag))
				}) : null,
				related.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "mt-24",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-2xl font-semibold",
						children: "More weekly reports"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-8 grid gap-5 md:grid-cols-3",
						children: related.map((x) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/reports/$slug",
							params: { slug: x.slug },
							className: "surface-card group p-6",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "num text-xs font-semibold",
									children: x.asset || x.market
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "mt-3 text-sm font-semibold leading-snug",
									children: x.title
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "mt-4 inline-flex items-center gap-2 font-mono text-[0.62rem] uppercase tracking-[0.16em] text-muted-foreground transition-colors group-hover:text-emerald",
									children: ["Read ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { className: "h-3.5 w-3.5" })]
								})
							]
						}, x.slug))
					})]
				}) : null
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-24" })]
	});
}
//#endregion
export { ReportDetail as component };
