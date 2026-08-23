import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@ai-sdk/react+[...].mjs";
import { t as cn } from "./createSsrRpc-vr7yBYzy.mjs";
import { C as MessageCircle, M as Github, O as Linkedin, T as Mail, V as ChartLine, j as Globe, k as Instagram, p as Send, r as Twitter } from "../_libs/lucide-react.mjs";
import { n as useSiteContent } from "./content-context-D3mm6NHe.mjs";
import { i as SITE_TAGLINE, r as SITE_NAME } from "./site-meta-CXKBvaoA.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/footer-xnZUaitc.js
var import_jsx_runtime = require_jsx_runtime();
var LOGO_SRC = "/market-logo.svg";
function BrandLogo({ className, imageClassName, showText = true }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: cn("flex min-w-0 items-center gap-3.5", className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
			src: LOGO_SRC,
			alt: SITE_NAME,
			className: cn("h-12 w-12 shrink-0 object-contain sm:h-14 sm:w-14", imageClassName),
			width: 56,
			height: 56
		}), showText ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "hidden min-w-0 flex-col leading-tight sm:flex",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "truncate font-display text-base font-semibold tracking-tight",
				children: SITE_NAME
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "eyebrow text-[0.6rem]",
				children: SITE_TAGLINE
			})]
		}) : null]
	});
}
/** Icons per supported platform — keys are matched case-insensitively. */
var platformIcons = {
	email: Mail,
	x: Twitter,
	twitter: Twitter,
	linkedin: Linkedin,
	discord: MessageCircle,
	telegram: Send,
	instagram: Instagram,
	tradingview: ChartLine,
	github: Github
};
function iconForPlatform(platform) {
	return platformIcons[platform.trim().toLowerCase()] ?? Globe;
}
function SiteFooter() {
	const { copy, links } = useSiteContent();
	const brand = copy.brand;
	const socials = links.filter((l) => l.href.trim().length > 0);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
		className: "border-t border-border bg-surface",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto w-[min(1320px,94vw)] py-16",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "max-w-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrandLogo, {
									showText: false,
									imageClassName: "h-11 w-11"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-display text-sm font-semibold",
									children: brand.name
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-5 text-sm leading-relaxed text-muted-foreground",
								children: brand.tagline
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-6 flex flex-wrap gap-2",
								children: socials.map((s) => {
									const Icon = iconForPlatform(s.platform);
									const isMail = s.href.startsWith("mailto:");
									return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
										href: s.href,
										"aria-label": s.label || s.platform,
										title: s.label || s.platform,
										...isMail ? {} : {
											target: "_blank",
											rel: "noopener noreferrer"
										},
										className: "grid h-9 w-9 place-items-center border border-border text-muted-foreground transition-colors hover:border-emerald hover:text-emerald",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-4 w-4" })
									}, `${s.platform}-${s.href}`);
								})
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FooterCol, {
						title: "Navigate",
						items: [
							{
								label: "About",
								href: "/#about"
							},
							{
								label: "Featured analysis",
								href: "/#featured"
							},
							{
								label: "Trading journal",
								href: "/#journal"
							}
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FooterCol, {
						title: "Work",
						items: [
							{
								label: "Services",
								href: "/#services"
							},
							{
								label: "Process",
								href: "/#process"
							},
							{
								label: "Certifications",
								href: "/#certifications"
							},
							{
								label: "Testimonials",
								href: "/#testimonials"
							}
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "eyebrow",
						children: "Resources"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
						className: "mt-5 grid gap-3 text-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/",
								hash: "reports",
								className: "text-muted-foreground transition-colors hover:text-foreground",
								children: "Weekly reports"
							}) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: "/#faq",
								className: "text-muted-foreground transition-colors hover:text-foreground",
								children: "FAQ"
							}) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: "/#contact",
								className: "text-muted-foreground transition-colors hover:text-foreground",
								children: "Book a consultation"
							}) })
						]
					})] })
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-14 flex flex-col gap-3 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
					"© ",
					(/* @__PURE__ */ new Date()).getFullYear(),
					" ",
					brand.name,
					". All rights reserved."
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "max-w-xl sm:text-right",
					children: brand.disclaimer
				})]
			})]
		})
	});
}
function FooterCol({ title, items }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "eyebrow",
		children: title
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
		className: "mt-5 grid gap-3 text-sm",
		children: items.map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
			href: i.href,
			className: "text-muted-foreground transition-colors hover:text-foreground",
			children: i.label
		}) }, i.label))
	})] });
}
//#endregion
export { SiteFooter as n, iconForPlatform as r, BrandLogo as t };
