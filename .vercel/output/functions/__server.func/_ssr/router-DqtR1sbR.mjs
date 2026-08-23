import { o as __toESM } from "../_runtime.mjs";
import { c as HeadContent, d as createRouter, f as Outlet, g as Link, h as createRootRouteWithContext, j as redirect, l as useRouterState, m as createFileRoute, p as lazyRouteComponent, s as Scripts, v as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { c as createServerFn } from "./createServerFn-CIHAFgYl.mjs";
import { a as streamText, i as isStepCount, n as DefaultChatTransport, o as require_jsx_runtime, r as convertToModelMessages, s as require_react, t as useChat } from "../_libs/@ai-sdk/react+[...].mjs";
import { o as Slot } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as Qs } from "../_libs/streamdown+[...].mjs";
import { n as createSsrRpc, r as useServerFn, t as cn } from "./createSsrRpc-vr7yBYzy.mjs";
import { n as mergeSiteContent, t as defaultSiteContent } from "./site-content-DBTeyB_P.mjs";
import { n as liveQueryOptions, t as LIVE_POLL_MS } from "./live-poll-BjhnCmuD.mjs";
import { It as objectType, Lt as stringType, Mt as arrayType, et as tool } from "../_libs/@ai-sdk/gateway+[...].mjs";
import { n as getSiteContent } from "./content.functions-BOOXBVL8.mjs";
import { i as HomePageSkeleton } from "./analyses.functions-BviDkd_w.mjs";
import { t as supabase } from "./client-B5Bu-311.mjs";
import { i as AuthPageSkeleton, t as AdminDashboardSkeleton } from "./dashboard-skeleton-CjRAtChM.mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { n as useQuery, r as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { D as LoaderCircle, I as Database, J as ArrowDown, L as CornerDownLeft, S as MessageSquareText, W as ArrowUp, a as TrendingUp, n as X, o as TrendingDown, u as Square, w as Menu, y as Plus } from "../_libs/lucide-react.mjs";
import { t as Toaster } from "../_libs/sonner.mjs";
import { t as createPublicSupabase } from "./content.server-BlV6eceY.mjs";
import { n as useSiteContent, t as SiteContentProvider } from "./content-context-D3mm6NHe.mjs";
import { t as normalizePairKey } from "./market-symbols-CRwjrnsQ.mjs";
import { a as useScroll, r as useSpring, s as AnimatePresence } from "../_libs/framer-motion.mjs";
import { t as motion } from "../_libs/motion.mjs";
import { a as SITE_TITLE, c as jsonLd, n as SITE_IMAGE, o as SITE_URL, r as SITE_NAME, s as absoluteUrl, t as SITE_DESCRIPTION } from "./site-meta-CXKBvaoA.mjs";
import { t as Route$9 } from "./analysis._slug-8RfpqMdj.mjs";
import { t as Route$10 } from "./reports._slug-DafaxQUu.mjs";
import { n as SiteFooter, t as BrandLogo } from "./footer-xnZUaitc.mjs";
import { n as useStickToBottomContext, t as StickToBottom } from "../_libs/use-stick-to-bottom.mjs";
import { t as A } from "../_libs/@streamdown/cjk+[...].mjs";
import { t as G } from "../_libs/shiki+streamdown__code.mjs";
import { t as h } from "../_libs/@streamdown/math+[...].mjs";
import { t as f } from "../_libs/@streamdown/mermaid+[...].mjs";
import { t as nanoid } from "../_libs/nanoid.mjs";
import { t as createOpenAICompatible } from "../_libs/ai-sdk__openai-compatible.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-DqtR1sbR.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var styles_default = "/assets/styles-BWG72Og5.css";
function reportLovableError(error, context = {}) {
	if (typeof window === "undefined") return;
	window.__lovableEvents?.captureException?.(error, {
		source: "react_error_boundary",
		route: window.location.pathname,
		...context
	}, {
		mechanism: "react_error_boundary",
		handled: false,
		severity: "error"
	});
	const message = error instanceof Response ? `Response ${error.status}${error.url ? ` at ${error.url}` : ""}` : error instanceof Error ? error.message : String(error);
	window.__lovableReportRuntimeError?.({
		message,
		stack: error instanceof Error ? error.stack : void 0,
		filename: window.location.pathname
	});
}
var livePricesInput = objectType({ symbols: arrayType(stringType().trim().min(1).max(80)).max(40).optional() }).optional();
var getLivePrices = createServerFn({ method: "GET" }).validator((input) => livePricesInput.parse(input)).handler(createSsrRpc("9dd1eb1e944d189bb9261befb0207f2caa11259d8cae85a28c66f0313373080a"));
createServerFn({ method: "GET" }).handler(createSsrRpc("d5fb861f3dde8f622309aff684be437412f1ea464647c11a018605ccab9e1128"));
/** Shared live quotes for ticker, hero, and any other price surfaces. */
function useLivePrices(symbols = [], pollMs = LIVE_POLL_MS) {
	const fetchPrices = useServerFn(getLivePrices);
	const { data, isFetching } = useQuery({
		queryKey: ["live-prices", symbols.join("|")],
		queryFn: () => fetchPrices({ data: { symbols } }),
		...liveQueryOptions,
		refetchInterval: pollMs,
		staleTime: pollMs / 2
	});
	return {
		quotes: data?.quotes ?? {},
		isCached: data?.cached ?? false,
		isFetching
	};
}
function MarketTicker() {
	const { tickerItems } = useSiteContent();
	const symbols = tickerItems.map((item) => item.symbol);
	const live = useLivePrices(symbols);
	const liveCount = Object.keys(live.quotes).length;
	const expectedCount = new Set(symbols.map(normalizePairKey)).size;
	const status = liveCount >= expectedCount && expectedCount > 0 ? live.isCached ? "Cached" : "Live" : liveCount > 0 ? "Partial" : live.isFetching ? "Connecting" : "Fallback";
	const merged = tickerItems.map((t) => {
		const q = live.quotes[normalizePairKey(t.symbol)];
		return q ? {
			...t,
			price: q.price,
			change: q.change,
			up: q.up,
			live: true
		} : {
			...t,
			live: false
		};
	});
	const items = [...merged, ...merged];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative overflow-hidden border-b border-border bg-surface py-2",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-surface to-transparent" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-surface to-transparent" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "absolute left-3 top-1/2 z-20 flex -translate-y-1/2 items-center gap-1.5 border border-emerald/30 bg-background/90 px-2 py-1 font-mono text-[0.58rem] uppercase tracking-[0.14em] text-emerald backdrop-blur",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "relative flex h-1.5 w-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute inline-flex h-full w-full animate-ping bg-emerald opacity-60" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "relative inline-flex h-1.5 w-1.5 bg-emerald" })]
				}), status]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex w-max animate-ticker items-center gap-8 pr-8 pl-28",
				children: items.map((t, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2.5 whitespace-nowrap",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "num text-xs font-semibold tracking-wide",
							children: t.symbol
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "num text-xs text-muted-foreground",
							children: t.price
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: t.up ? "num flex items-center gap-1 text-xs font-medium text-emerald" : "num flex items-center gap-1 text-xs font-medium text-destructive",
							children: [t.up ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingUp, { className: "h-3 w-3" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingDown, { className: "h-3 w-3" }), t.change]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-3 w-px bg-hairline" })
					]
				}, `${t.symbol}-${i}`))
			})
		]
	});
}
var links = [
	{
		label: "About",
		href: "/#about"
	},
	{
		label: "Analysis",
		href: "/#featured"
	},
	{
		label: "Journal",
		href: "/#journal"
	},
	{
		label: "Reports",
		href: "/#reports"
	},
	{
		label: "Process",
		href: "/#process"
	},
	{
		label: "Services",
		href: "/#services"
	},
	{
		label: "Certifications",
		href: "/#certifications"
	},
	{
		label: "FAQ",
		href: "/#faq"
	}
];
function ScrollProgress() {
	const { scrollYProgress } = useScroll();
	const scaleX = useSpring(scrollYProgress, {
		stiffness: 120,
		damping: 26,
		restDelta: .001
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
		style: { scaleX },
		className: "fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-emerald",
		"aria-hidden": true
	});
}
function SiteNav() {
	const { sections } = useSiteContent();
	const showTicker = sections.find((s) => s.id === "ticker")?.enabled ?? true;
	const [scrolled, setScrolled] = (0, import_react.useState)(false);
	const [open, setOpen] = (0, import_react.useState)(false);
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	(0, import_react.useEffect)(() => {
		const onScroll = () => setScrolled(window.scrollY > 24);
		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);
	(0, import_react.useEffect)(() => setOpen(false), [pathname]);
	(0, import_react.useEffect)(() => {
		document.documentElement.classList.remove("dark");
		try {
			window.localStorage.removeItem("tma-theme");
		} catch {}
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: "fixed inset-x-0 top-0 z-50",
		children: [showTicker ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MarketTicker, {}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: cn("border-b transition-colors duration-500", scrolled ? "border-border bg-[var(--glass)] backdrop-blur-md backdrop-saturate-150" : "border-border bg-background"),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto w-[min(1320px,94vw)]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
					className: cn("flex items-center justify-between transition-all duration-500", scrolled ? "py-3" : "py-5"),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/",
							className: "flex min-w-0 items-center",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrandLogo, {})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "hidden items-center lg:flex",
							children: links.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: l.href,
								className: "link-underline px-3.5 py-1 font-mono text-[0.7rem] uppercase tracking-[0.16em] text-muted-foreground transition-colors hover:text-foreground",
								children: l.label
							}, l.label))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex shrink-0 items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: "/#contact",
								className: "hidden border border-border bg-navy px-4 py-2 font-mono text-[0.7rem] uppercase tracking-[0.14em] text-navy-foreground transition-all hover:bg-emerald hover:text-navy-foreground sm:inline-flex",
								children: "Book a consultation"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setOpen((o) => !o),
								"aria-label": "Toggle navigation",
								className: "grid h-9 w-9 place-items-center border border-border lg:hidden",
								children: open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "h-4 w-4" })
							})]
						})
					]
				}), open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mb-3 border border-border bg-card lg:hidden",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid",
						children: [links.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: l.href,
							onClick: () => setOpen(false),
							className: "border-b border-border px-4 py-3 font-mono text-[0.72rem] uppercase tracking-[0.16em] text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground",
							children: l.label
						}, l.label)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "/#contact",
							onClick: () => setOpen(false),
							className: "bg-navy px-4 py-3 text-center font-mono text-[0.72rem] uppercase tracking-[0.16em] text-navy-foreground",
							children: "Book a consultation"
						})]
					})
				}) : null]
			})
		})]
	});
}
function BackToTop() {
	const [show, setShow] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const onScroll = () => setShow(window.scrollY > 900);
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed bottom-6 right-5 z-50 flex flex-col items-end gap-3",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.button, {
			initial: false,
			animate: {
				opacity: show ? 1 : 0,
				scale: show ? 1 : .7,
				y: show ? 0 : 12
			},
			onClick: () => window.scrollTo({
				top: 0,
				behavior: "smooth"
			}),
			"aria-label": "Back to top",
			className: "grid h-11 w-11 place-items-center border border-border bg-navy text-navy-foreground",
			style: { pointerEvents: show ? "auto" : "none" },
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUp, { className: "h-4 w-4" })
		})
	});
}
var Toaster$1 = ({ ...props }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
		className: "toaster group",
		toastOptions: { classNames: {
			toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
			description: "group-[.toast]:text-muted-foreground",
			actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
			cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
		} },
		...props
	});
};
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0", {
	variants: {
		variant: {
			default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
			destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
			outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
			secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
			ghost: "hover:bg-accent hover:text-accent-foreground",
			link: "text-primary underline-offset-4 hover:underline"
		},
		size: {
			default: "h-9 px-4 py-2",
			sm: "h-8 rounded-md px-3 text-xs",
			lg: "h-10 rounded-md px-8",
			icon: "h-9 w-9",
			"icon-sm": "size-8 p-0 [&_svg]:size-4"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
var Button = import_react.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size,
			className
		})),
		ref,
		...props
	});
});
Button.displayName = "Button";
var Conversation = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StickToBottom, {
	className: cn("relative flex-1 overflow-y-hidden", className),
	initial: "smooth",
	resize: "smooth",
	role: "log",
	...props
});
var ConversationContent = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StickToBottom.Content, {
	className: cn("flex flex-col gap-8 p-4", className),
	...props
});
var ConversationScrollButton = ({ className, ...props }) => {
	const { isAtBottom, scrollToBottom } = useStickToBottomContext();
	const handleScrollToBottom = (0, import_react.useCallback)(() => {
		scrollToBottom();
	}, [scrollToBottom]);
	return !isAtBottom && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
		className: cn("absolute bottom-4 left-[50%] translate-x-[-50%] rounded-full dark:bg-background dark:hover:bg-muted", className),
		onClick: handleScrollToBottom,
		size: "icon",
		type: "button",
		variant: "outline",
		...props,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowDown, { className: "size-4" })
	});
};
var Message = ({ className, from, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: cn("group flex w-full max-w-[95%] flex-col gap-2", from === "user" ? "is-user ml-auto justify-end" : "is-assistant", className),
	...props
});
var MessageContent = ({ children, className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: cn("is-user:dark flex w-fit min-w-0 max-w-full flex-col gap-2 overflow-hidden text-sm", "group-[.is-user]:ml-auto group-[.is-user]:rounded-lg group-[.is-user]:bg-secondary group-[.is-user]:px-4 group-[.is-user]:py-3 group-[.is-user]:text-foreground", "group-[.is-assistant]:text-foreground", className),
	...props,
	children
});
(0, import_react.createContext)(null);
var streamdownPlugins = {
	cjk: A,
	code: G,
	math: h,
	mermaid: f
};
var MessageResponse = (0, import_react.memo)(({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Qs, {
	className: cn("size-full [&>*:first-child]:mt-0 [&>*:last-child]:mb-0", className),
	plugins: streamdownPlugins,
	...props
}), (prevProps, nextProps) => prevProps.children === nextProps.children && nextProps.isAnimating === prevProps.isAnimating);
MessageResponse.displayName = "MessageResponse";
var Textarea = import_react.forwardRef(({ className, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
		className: cn("flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm", className),
		ref,
		...props
	});
});
Textarea.displayName = "Textarea";
function InputGroup({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-slot": "input-group",
		role: "group",
		className: cn("group/input-group border-input dark:bg-input/30 shadow-xs relative flex w-full items-center rounded-md border outline-none transition-[color,box-shadow]", "h-9 has-[>textarea]:h-auto", "has-[>[data-align=inline-start]]:[&>input]:pl-2", "has-[>[data-align=inline-end]]:[&>input]:pr-2", "has-[>[data-align=block-start]]:h-auto has-[>[data-align=block-start]]:flex-col has-[>[data-align=block-start]]:[&>input]:pb-3", "has-[>[data-align=block-end]]:h-auto has-[>[data-align=block-end]]:flex-col has-[>[data-align=block-end]]:[&>input]:pt-3", "has-[[data-slot=input-group-control]:focus-visible]:ring-ring has-[[data-slot=input-group-control]:focus-visible]:ring-1", "has-[[data-slot][aria-invalid=true]]:ring-destructive/20 has-[[data-slot][aria-invalid=true]]:border-destructive dark:has-[[data-slot][aria-invalid=true]]:ring-destructive/40", className),
		...props
	});
}
var inputGroupAddonVariants = cva("text-muted-foreground flex h-auto cursor-text select-none items-center justify-center gap-2 py-1.5 text-sm font-medium group-data-[disabled=true]/input-group:opacity-50 [&>kbd]:rounded-[calc(var(--radius)-5px)] [&>svg:not([class*='size-'])]:size-4", {
	variants: { align: {
		"inline-start": "order-first pl-3 has-[>button]:ml-[-0.45rem] has-[>kbd]:ml-[-0.35rem]",
		"inline-end": "order-last pr-3 has-[>button]:mr-[-0.4rem] has-[>kbd]:mr-[-0.35rem]",
		"block-start": "[.border-b]:pb-3 order-first w-full justify-start px-3 pt-3 group-has-[>input]/input-group:pt-2.5",
		"block-end": "[.border-t]:pt-3 order-last w-full justify-start px-3 pb-3 group-has-[>input]/input-group:pb-2.5"
	} },
	defaultVariants: { align: "inline-start" }
});
function InputGroupAddon({ className, align = "inline-start", ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		role: "group",
		"data-slot": "input-group-addon",
		"data-align": align,
		className: cn(inputGroupAddonVariants({ align }), className),
		onClick: (e) => {
			if (e.target.closest("button")) return;
			e.currentTarget.parentElement?.querySelector("input")?.focus();
		},
		...props
	});
}
var inputGroupButtonVariants = cva("flex items-center gap-2 text-sm shadow-none", {
	variants: { size: {
		xs: "h-6 gap-1 rounded-[calc(var(--radius)-5px)] px-2 has-[>svg]:px-2 [&>svg:not([class*='size-'])]:size-3.5",
		sm: "h-8 gap-1.5 rounded-md px-2.5 has-[>svg]:px-2.5",
		"icon-xs": "size-6 rounded-[calc(var(--radius)-5px)] p-0 has-[>svg]:p-0",
		"icon-sm": "size-8 p-0 has-[>svg]:p-0"
	} },
	defaultVariants: { size: "xs" }
});
function InputGroupButton({ className, type = "button", variant = "ghost", size = "xs", ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
		type,
		"data-size": size,
		variant,
		className: cn(inputGroupButtonVariants({ size }), className),
		...props
	});
}
function InputGroupTextarea({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
		"data-slot": "input-group-control",
		className: cn("flex-1 resize-none rounded-none border-0 bg-transparent py-3 shadow-none focus-visible:ring-0 dark:bg-transparent", className),
		...props
	});
}
function Spinner({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
		role: "status",
		"aria-label": "Loading",
		className: cn("size-4 animate-spin", className),
		...props
	});
}
var convertBlobUrlToDataUrl = async (url) => {
	try {
		const blob = await (await fetch(url)).blob();
		return new Promise((resolve) => {
			const reader = new FileReader();
			reader.onloadend = () => resolve(reader.result);
			reader.onerror = () => resolve(null);
			reader.readAsDataURL(blob);
		});
	} catch {
		return null;
	}
};
var PromptInputController = (0, import_react.createContext)(null);
var ProviderAttachmentsContext = (0, import_react.createContext)(null);
var useOptionalPromptInputController = () => (0, import_react.useContext)(PromptInputController);
var useOptionalProviderAttachments = () => (0, import_react.useContext)(ProviderAttachmentsContext);
var LocalAttachmentsContext = (0, import_react.createContext)(null);
var usePromptInputAttachments = () => {
	const provider = useOptionalProviderAttachments();
	const context = (0, import_react.useContext)(LocalAttachmentsContext) ?? provider;
	if (!context) throw new Error("usePromptInputAttachments must be used within a PromptInput or PromptInputProvider");
	return context;
};
var LocalReferencedSourcesContext = (0, import_react.createContext)(null);
var PromptInput = ({ className, accept, multiple, globalDrop, syncHiddenInput, maxFiles, maxFileSize, onError, onSubmit, children, ...props }) => {
	const controller = useOptionalPromptInputController();
	const usingProvider = !!controller;
	const inputRef = (0, import_react.useRef)(null);
	const formRef = (0, import_react.useRef)(null);
	const [items, setItems] = (0, import_react.useState)([]);
	const files = usingProvider ? controller.attachments.files : items;
	const [referencedSources, setReferencedSources] = (0, import_react.useState)([]);
	const filesRef = (0, import_react.useRef)(files);
	(0, import_react.useEffect)(() => {
		filesRef.current = files;
	}, [files]);
	const openFileDialogLocal = (0, import_react.useCallback)(() => {
		inputRef.current?.click();
	}, []);
	const matchesAccept = (0, import_react.useCallback)((f) => {
		if (!accept || accept.trim() === "") return true;
		return accept.split(",").map((s) => s.trim()).filter(Boolean).some((pattern) => {
			if (pattern.endsWith("/*")) {
				const prefix = pattern.slice(0, -1);
				return f.type.startsWith(prefix);
			}
			return f.type === pattern;
		});
	}, [accept]);
	const addLocal = (0, import_react.useCallback)((fileList) => {
		const incoming = [...fileList];
		const accepted = incoming.filter((f) => matchesAccept(f));
		if (incoming.length && accepted.length === 0) {
			onError?.({
				code: "accept",
				message: "No files match the accepted types."
			});
			return;
		}
		const withinSize = (f) => maxFileSize ? f.size <= maxFileSize : true;
		const sized = accepted.filter(withinSize);
		if (accepted.length > 0 && sized.length === 0) {
			onError?.({
				code: "max_file_size",
				message: "All files exceed the maximum size."
			});
			return;
		}
		setItems((prev) => {
			const capacity = typeof maxFiles === "number" ? Math.max(0, maxFiles - prev.length) : void 0;
			const capped = typeof capacity === "number" ? sized.slice(0, capacity) : sized;
			if (typeof capacity === "number" && sized.length > capacity) onError?.({
				code: "max_files",
				message: "Too many files. Some were not added."
			});
			const next = [];
			for (const file of capped) next.push({
				filename: file.name,
				id: nanoid(),
				mediaType: file.type,
				type: "file",
				url: URL.createObjectURL(file)
			});
			return [...prev, ...next];
		});
	}, [
		matchesAccept,
		maxFiles,
		maxFileSize,
		onError
	]);
	const removeLocal = (0, import_react.useCallback)((id) => setItems((prev) => {
		const found = prev.find((file) => file.id === id);
		if (found?.url) URL.revokeObjectURL(found.url);
		return prev.filter((file) => file.id !== id);
	}), []);
	const addWithProviderValidation = (0, import_react.useCallback)((fileList) => {
		const incoming = [...fileList];
		const accepted = incoming.filter((f) => matchesAccept(f));
		if (incoming.length && accepted.length === 0) {
			onError?.({
				code: "accept",
				message: "No files match the accepted types."
			});
			return;
		}
		const withinSize = (f) => maxFileSize ? f.size <= maxFileSize : true;
		const sized = accepted.filter(withinSize);
		if (accepted.length > 0 && sized.length === 0) {
			onError?.({
				code: "max_file_size",
				message: "All files exceed the maximum size."
			});
			return;
		}
		const currentCount = files.length;
		const capacity = typeof maxFiles === "number" ? Math.max(0, maxFiles - currentCount) : void 0;
		const capped = typeof capacity === "number" ? sized.slice(0, capacity) : sized;
		if (typeof capacity === "number" && sized.length > capacity) onError?.({
			code: "max_files",
			message: "Too many files. Some were not added."
		});
		if (capped.length > 0) controller?.attachments.add(capped);
	}, [
		matchesAccept,
		maxFileSize,
		maxFiles,
		onError,
		files.length,
		controller
	]);
	const clearAttachments = (0, import_react.useCallback)(() => usingProvider ? controller?.attachments.clear() : setItems((prev) => {
		for (const file of prev) if (file.url) URL.revokeObjectURL(file.url);
		return [];
	}), [usingProvider, controller]);
	const clearReferencedSources = (0, import_react.useCallback)(() => setReferencedSources([]), []);
	const add = usingProvider ? addWithProviderValidation : addLocal;
	const remove = usingProvider ? controller.attachments.remove : removeLocal;
	const openFileDialog = usingProvider ? controller.attachments.openFileDialog : openFileDialogLocal;
	const clear = (0, import_react.useCallback)(() => {
		clearAttachments();
		clearReferencedSources();
	}, [clearAttachments, clearReferencedSources]);
	(0, import_react.useEffect)(() => {
		if (!usingProvider) return;
		controller.__registerFileInput(inputRef, () => inputRef.current?.click());
	}, [usingProvider, controller]);
	(0, import_react.useEffect)(() => {
		if (syncHiddenInput && inputRef.current && files.length === 0) inputRef.current.value = "";
	}, [files, syncHiddenInput]);
	(0, import_react.useEffect)(() => {
		const form = formRef.current;
		if (!form) return;
		if (globalDrop) return;
		const onDragOver = (e) => {
			if (e.dataTransfer?.types?.includes("Files")) e.preventDefault();
		};
		const onDrop = (e) => {
			if (e.dataTransfer?.types?.includes("Files")) e.preventDefault();
			if (e.dataTransfer?.files && e.dataTransfer.files.length > 0) add(e.dataTransfer.files);
		};
		form.addEventListener("dragover", onDragOver);
		form.addEventListener("drop", onDrop);
		return () => {
			form.removeEventListener("dragover", onDragOver);
			form.removeEventListener("drop", onDrop);
		};
	}, [add, globalDrop]);
	(0, import_react.useEffect)(() => {
		if (!globalDrop) return;
		const onDragOver = (e) => {
			if (e.dataTransfer?.types?.includes("Files")) e.preventDefault();
		};
		const onDrop = (e) => {
			if (e.dataTransfer?.types?.includes("Files")) e.preventDefault();
			if (e.dataTransfer?.files && e.dataTransfer.files.length > 0) add(e.dataTransfer.files);
		};
		document.addEventListener("dragover", onDragOver);
		document.addEventListener("drop", onDrop);
		return () => {
			document.removeEventListener("dragover", onDragOver);
			document.removeEventListener("drop", onDrop);
		};
	}, [add, globalDrop]);
	(0, import_react.useEffect)(() => () => {
		if (!usingProvider) {
			for (const f of filesRef.current) if (f.url) URL.revokeObjectURL(f.url);
		}
	}, [usingProvider]);
	const handleChange = (0, import_react.useCallback)((event) => {
		if (event.currentTarget.files) add(event.currentTarget.files);
		event.currentTarget.value = "";
	}, [add]);
	const attachmentsCtx = (0, import_react.useMemo)(() => ({
		add,
		clear: clearAttachments,
		fileInputRef: inputRef,
		files: files.map((item) => ({
			...item,
			id: item.id
		})),
		openFileDialog,
		remove
	}), [
		files,
		add,
		remove,
		clearAttachments,
		openFileDialog
	]);
	const refsCtx = (0, import_react.useMemo)(() => ({
		add: (incoming) => {
			const array = Array.isArray(incoming) ? incoming : [incoming];
			setReferencedSources((prev) => [...prev, ...array.map((s) => ({
				...s,
				id: nanoid()
			}))]);
		},
		clear: clearReferencedSources,
		remove: (id) => {
			setReferencedSources((prev) => prev.filter((s) => s.id !== id));
		},
		sources: referencedSources
	}), [referencedSources, clearReferencedSources]);
	const handleSubmit = (0, import_react.useCallback)(async (event) => {
		event.preventDefault();
		const form = event.currentTarget;
		const text = usingProvider ? controller.textInput.value : (() => {
			return new FormData(form).get("message") || "";
		})();
		if (!usingProvider) form.reset();
		try {
			const result = onSubmit({
				files: await Promise.all(files.map(async ({ id: _id, ...item }) => {
					if (item.url?.startsWith("blob:")) {
						const dataUrl = await convertBlobUrlToDataUrl(item.url);
						return {
							...item,
							url: dataUrl ?? item.url
						};
					}
					return item;
				})),
				text
			}, event);
			if (result instanceof Promise) try {
				await result;
				clear();
				if (usingProvider) controller.textInput.clear();
			} catch {}
			else {
				clear();
				if (usingProvider) controller.textInput.clear();
			}
		} catch {}
	}, [
		usingProvider,
		controller,
		files,
		onSubmit,
		clear
	]);
	const inner = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		accept,
		"aria-label": "Upload files",
		className: "hidden",
		multiple,
		onChange: handleChange,
		ref: inputRef,
		title: "Upload files",
		type: "file"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("form", {
		className: cn("w-full", className),
		onSubmit: handleSubmit,
		ref: formRef,
		...props,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InputGroup, {
			className: "overflow-hidden",
			children
		})
	})] });
	const withReferencedSources = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LocalReferencedSourcesContext.Provider, {
		value: refsCtx,
		children: inner
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LocalAttachmentsContext.Provider, {
		value: attachmentsCtx,
		children: withReferencedSources
	});
};
var PromptInputTextarea = ({ onChange, onKeyDown, className, placeholder = "What would you like to know?", ...props }) => {
	const controller = useOptionalPromptInputController();
	const attachments = usePromptInputAttachments();
	const [isComposing, setIsComposing] = (0, import_react.useState)(false);
	const handleKeyDown = (0, import_react.useCallback)((e) => {
		onKeyDown?.(e);
		if (e.defaultPrevented) return;
		if (e.key === "Enter") {
			if (isComposing || e.nativeEvent.isComposing) return;
			if (e.shiftKey) return;
			e.preventDefault();
			const { form } = e.currentTarget;
			if ((form?.querySelector("button[type=\"submit\"]"))?.disabled) return;
			form?.requestSubmit();
		}
		if (e.key === "Backspace" && e.currentTarget.value === "" && attachments.files.length > 0) {
			e.preventDefault();
			const lastAttachment = attachments.files.at(-1);
			if (lastAttachment) attachments.remove(lastAttachment.id);
		}
	}, [
		onKeyDown,
		isComposing,
		attachments
	]);
	const handlePaste = (0, import_react.useCallback)((event) => {
		const items = event.clipboardData?.items;
		if (!items) return;
		const files = [];
		for (const item of items) if (item.kind === "file") {
			const file = item.getAsFile();
			if (file) files.push(file);
		}
		if (files.length > 0) {
			event.preventDefault();
			attachments.add(files);
		}
	}, [attachments]);
	const handleCompositionEnd = (0, import_react.useCallback)(() => setIsComposing(false), []);
	const handleCompositionStart = (0, import_react.useCallback)(() => setIsComposing(true), []);
	const controlledProps = controller ? {
		onChange: (e) => {
			controller.textInput.setInput(e.currentTarget.value);
			onChange?.(e);
		},
		value: controller.textInput.value
	} : { onChange };
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InputGroupTextarea, {
		className: cn("field-sizing-content max-h-48 min-h-16", className),
		name: "message",
		onCompositionEnd: handleCompositionEnd,
		onCompositionStart: handleCompositionStart,
		onKeyDown: handleKeyDown,
		onPaste: handlePaste,
		placeholder,
		...props,
		...controlledProps
	});
};
var PromptInputFooter = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InputGroupAddon, {
	align: "block-end",
	className: cn("justify-between gap-1", className),
	...props
});
var PromptInputSubmit = ({ className, variant = "default", size = "icon-sm", status, onStop, onClick, children, ...props }) => {
	const isGenerating = status === "submitted" || status === "streaming";
	let Icon = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CornerDownLeft, { className: "size-4" });
	if (status === "submitted") Icon = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner, {});
	else if (status === "streaming") Icon = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Square, { className: "size-4" });
	else if (status === "error") Icon = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" });
	const handleClick = (0, import_react.useCallback)((e) => {
		if (isGenerating && onStop) {
			e.preventDefault();
			onStop();
			return;
		}
		onClick?.(e);
	}, [
		isGenerating,
		onStop,
		onClick
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InputGroupButton, {
		"aria-label": isGenerating ? "Stop" : "Submit",
		className: cn(className),
		onClick: handleClick,
		size,
		type: isGenerating && onStop ? "button" : "submit",
		variant,
		...props,
		children: children ?? Icon
	});
};
var motionComponentCache = /* @__PURE__ */ new Map();
var getMotionComponent = (element) => {
	let component = motionComponentCache.get(element);
	if (!component) {
		component = motion.create(element);
		motionComponentCache.set(element, component);
	}
	return component;
};
var ShimmerComponent = ({ children, as: Component = "p", className, duration = 2, spread = 2 }) => {
	const MotionComponent = getMotionComponent(Component);
	const dynamicSpread = (0, import_react.useMemo)(() => (children?.length ?? 0) * spread, [children, spread]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MotionComponent, {
		animate: { backgroundPosition: "0% center" },
		className: cn("relative inline-block bg-[length:250%_100%,auto] bg-clip-text text-transparent", "[--bg:linear-gradient(90deg,#0000_calc(50%-var(--spread)),var(--color-background),#0000_calc(50%+var(--spread)))] [background-repeat:no-repeat,padding-box]", className),
		initial: { backgroundPosition: "100% center" },
		style: {
			"--spread": `${dynamicSpread}px`,
			backgroundImage: "var(--bg), linear-gradient(var(--color-muted-foreground), var(--color-muted-foreground))"
		},
		transition: {
			duration,
			ease: "linear",
			repeat: Number.POSITIVE_INFINITY
		},
		children
	});
};
var Shimmer = (0, import_react.memo)(ShimmerComponent);
var STORAGE_KEY = "research-desk-chat-v1";
var SUGGESTIONS = [
	"What is the current BTC bias?",
	"Book a consultation",
	"What are the trading stats?",
	"Show the latest weekly report"
];
function newId() {
	return `chat-${Date.now().toString(36)}`;
}
/** Reads the persisted conversation once, on the client, before first render. */
function loadChat() {
	if (typeof window === "undefined") return {
		id: "chat-ssr",
		messages: []
	};
	try {
		const raw = window.localStorage.getItem(STORAGE_KEY);
		if (raw) {
			const parsed = JSON.parse(raw);
			if (parsed?.id && Array.isArray(parsed.messages)) return parsed;
		}
	} catch {}
	const fresh = {
		id: newId(),
		messages: []
	};
	try {
		window.localStorage.setItem(STORAGE_KEY, JSON.stringify(fresh));
	} catch {}
	return fresh;
}
function textOf(message) {
	return message.parts.map((part) => part.type === "text" ? part.text : "").join("").trim();
}
function ChatWidget() {
	const [open, setOpen] = (0, import_react.useState)(false);
	const [mounted, setMounted] = (0, import_react.useState)(false);
	const [initial, setInitial] = (0, import_react.useState)({
		id: "chat-ssr",
		messages: []
	});
	(0, import_react.useEffect)(() => {
		setInitial(loadChat());
		setMounted(true);
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		onClick: () => setOpen((v) => !v),
		"aria-label": open ? "Close research assistant" : "Open research assistant",
		className: "fixed bottom-6 right-6 z-50 flex h-12 items-center gap-2 border border-foreground bg-foreground px-4 font-mono text-[11px] uppercase tracking-[0.18em] text-background transition-transform hover:-translate-y-0.5",
		children: [open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageSquareText, { className: "size-4" }), open ? "Close" : "Ask the desk"]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: open && mounted ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
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
			y: 16
		},
		transition: {
			duration: .22,
			ease: [
				.16,
				1,
				.3,
				1
			]
		},
		className: "fixed bottom-24 right-4 z-50 flex h-[min(620px,calc(100dvh-8rem))] w-[min(420px,calc(100vw-2rem))] flex-col border border-foreground bg-background shadow-[8px_8px_0_0_hsl(var(--foreground)/0.12)]",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChatPanel, {
			initial,
			onReset: setInitial
		}, initial.id)
	}) : null })] });
}
function ChatPanel({ initial, onReset }) {
	const [input, setInput] = (0, import_react.useState)("");
	const textareaRef = (0, import_react.useRef)(null);
	const { messages, sendMessage, status, error } = useChat({
		id: initial.id,
		messages: initial.messages,
		transport: new DefaultChatTransport({ api: "/api/chat" })
	});
	const busy = status === "submitted" || status === "streaming";
	(0, import_react.useEffect)(() => {
		if (status === "streaming") return;
		try {
			window.localStorage.setItem(STORAGE_KEY, JSON.stringify({
				id: initial.id,
				messages
			}));
		} catch {}
	}, [
		messages,
		status,
		initial.id
	]);
	(0, import_react.useEffect)(() => {
		if (!busy) textareaRef.current?.focus();
	}, [busy]);
	const submit = (0, import_react.useCallback)((text) => {
		const value = text.trim();
		if (!value || busy) return;
		setInput("");
		sendMessage({ text: value });
	}, [busy, sendMessage]);
	const startNew = () => {
		const fresh = {
			id: newId(),
			messages: []
		};
		try {
			window.localStorage.setItem(STORAGE_KEY, JSON.stringify(fresh));
		} catch {}
		onReset(fresh);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "flex items-center justify-between gap-3 border-b border-foreground/15 px-4 py-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "flex size-7 items-center justify-center border border-foreground/20 bg-accent/40 text-accent-foreground",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Database, { className: "size-3.5" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "leading-tight",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground",
						children: "Research desk"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm font-semibold tracking-tight",
						children: "Grounded in this site's data"
					})]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: startNew,
				className: "flex items-center gap-1 border border-foreground/20 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground transition-colors hover:border-foreground hover:text-foreground",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-3" }), " New"]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Conversation, {
			className: "flex-1",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ConversationContent, {
				className: "gap-5 px-4 py-4",
				children: [
					messages.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted-foreground",
							children: "Ask about published analyses, weekly reports, logged trading results or how this desk works. Answers come only from the site database."
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid gap-2",
							children: SUGGESTIONS.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => submit(s),
								className: "border border-foreground/15 px-3 py-2 text-left text-xs transition-colors hover:border-foreground hover:bg-accent/30",
								children: s
							}, s))
						})]
					}) : null,
					messages.map((message) => {
						const text = textOf(message);
						const tools = message.parts.filter((p) => p.type.startsWith("tool-"));
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Message, {
							from: message.role,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(MessageContent, {
								className: cn("group-[.is-user]:rounded-none group-[.is-user]:border group-[.is-user]:border-foreground group-[.is-user]:bg-foreground group-[.is-user]:text-background"),
								children: [message.role === "assistant" && tools.length > 0 && !text ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shimmer, {
									className: "font-mono text-[11px] uppercase tracking-[0.16em]",
									children: "Querying database…"
								}) : null, text ? message.role === "assistant" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageResponse, {
									className: "prose-sm",
									children: text
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "whitespace-pre-wrap text-sm",
									children: text
								}) : null]
							})
						}, message.id);
					}),
					status === "submitted" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shimmer, {
						className: "font-mono text-[11px] uppercase tracking-[0.16em]",
						children: "Thinking…"
					}) : null,
					error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "border border-destructive/40 px-3 py-2 text-xs text-destructive",
						children: error.message || "The assistant is unavailable right now."
					}) : null
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConversationScrollButton, {})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "border-t border-foreground/15 p-3",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PromptInput, {
				onSubmit: (_, event) => {
					event.preventDefault();
					submit(input);
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PromptInputTextarea, {
					ref: textareaRef,
					value: input,
					onChange: (e) => setInput(e.target.value),
					placeholder: "Ask about a ticker, report or the desk…",
					autoFocus: true
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PromptInputFooter, {
					className: "justify-end",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PromptInputSubmit, {
						status,
						disabled: !input.trim() && !busy
					})
				})]
			})
		})
	] });
}
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-7xl font-bold text-foreground",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 text-xl font-semibold text-foreground",
					children: "Page not found"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "The page you're looking for doesn't exist or has been moved."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "inline-flex items-center justify-center bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Go home"
					})
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		reportLovableError(error, { boundary: "tanstack_root_error_component" });
	}, [error]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-semibold tracking-tight text-foreground",
					children: "This page didn't load"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Something went wrong on our end. You can try refreshing or head back home."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "inline-flex items-center justify-center bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Try again"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						className: "inline-flex items-center justify-center border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
						children: "Go home"
					})]
				})
			]
		})
	});
}
var Route$8 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: SITE_TITLE },
			{
				name: "description",
				content: SITE_DESCRIPTION
			},
			{
				name: "author",
				content: SITE_NAME
			},
			{
				name: "robots",
				content: "index, follow"
			},
			{
				name: "keywords",
				content: "technical analysis, market research, crypto analysis, forex analysis, stock analysis, weekly market reports, trading journal"
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				property: "og:site_name",
				content: SITE_NAME
			},
			{
				property: "og:url",
				content: SITE_URL
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			},
			{
				name: "theme-color",
				content: "#F8F5EF"
			},
			{
				property: "og:title",
				content: SITE_TITLE
			},
			{
				name: "twitter:title",
				content: SITE_TITLE
			},
			{
				property: "og:description",
				content: SITE_DESCRIPTION
			},
			{
				name: "twitter:description",
				content: SITE_DESCRIPTION
			},
			{
				property: "og:image",
				content: SITE_IMAGE
			},
			{
				property: "og:image:alt",
				content: `${SITE_NAME} logo`
			},
			{
				name: "twitter:image",
				content: SITE_IMAGE
			},
			{ "script:ld+json": jsonLd() }
		],
		links: [
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "canonical",
				href: absoluteUrl("/")
			},
			{
				rel: "manifest",
				href: "/site.webmanifest"
			},
			{
				rel: "icon",
				href: "/market-logo.svg",
				type: "image/svg+xml"
			},
			{
				rel: "apple-touch-icon",
				href: "/market-logo.svg"
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Archivo:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap"
			}
		]
	}),
	loader: () => getSiteContent(),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
function RootComponent() {
	const { queryClient } = Route$8.useRouteContext();
	const content = Route$8.useLoaderData() ?? defaultSiteContent;
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const isChrome = !pathname.startsWith("/admin") && !pathname.startsWith("/auth");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryClientProvider, {
		client: queryClient,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SiteContentProvider, {
			value: content,
			children: [
				isChrome ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollProgress, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteNav, {})] }) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}),
				isChrome ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteFooter, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BackToTop, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChatWidget, {})
				] }) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster$1, { position: "bottom-center" })
			]
		})
	});
}
var $$splitComponentImporter$5 = () => import("./routes-v1IXy13g.mjs");
var title$2 = SITE_TITLE;
var description$1 = SITE_DESCRIPTION;
var Route$7 = createFileRoute("/")({
	pendingComponent: HomePageSkeleton,
	pendingMs: 120,
	head: () => ({
		meta: [
			{ title: title$2 },
			{
				name: "description",
				content: description$1
			},
			{
				property: "og:title",
				content: title$2
			},
			{
				property: "og:description",
				content: description$1
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				property: "og:url",
				content: absoluteUrl("/")
			},
			{
				property: "og:image",
				content: SITE_IMAGE
			},
			{
				property: "og:image:alt",
				content: title$2
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			},
			{
				name: "twitter:image",
				content: SITE_IMAGE
			}
		],
		links: [{
			rel: "canonical",
			href: absoluteUrl("/")
		}]
	}),
	component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
var $$splitComponentImporter$4 = () => import("./route-Di7iQBCH.mjs");
var Route$6 = createFileRoute("/_authenticated")({
	ssr: false,
	beforeLoad: async () => {
		const { data, error } = await supabase.auth.getUser();
		if (error || !data.user) throw redirect({ to: "/auth" });
		return { user: data.user };
	},
	component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
var $$splitComponentImporter$3 = () => import("./analysis-BUZmXTQb.mjs");
var Route$5 = createFileRoute("/analysis")({
	head: () => ({
		meta: [
			{ title: `Analysis Library | ${SITE_NAME}` },
			{
				name: "description",
				content: "Browse the full library of published market analysis and chart case studies."
			},
			{
				property: "og:title",
				content: `Analysis Library | ${SITE_NAME}`
			},
			{
				property: "og:description",
				content: "Browse the full library of published market analysis and chart case studies."
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				property: "og:url",
				content: absoluteUrl("/analysis")
			},
			{
				property: "og:image",
				content: SITE_IMAGE
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			},
			{
				name: "twitter:image",
				content: SITE_IMAGE
			}
		],
		links: [{
			rel: "canonical",
			href: absoluteUrl("/analysis")
		}]
	}),
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
var $$splitComponentImporter$2 = () => import("./auth-ClknyLnq.mjs");
var title$1 = "Admin sign in — Chart Analyst";
var description = "Private sign-in for Chart Analyst content management.";
var Route$4 = createFileRoute("/auth")({
	pendingComponent: AuthPageSkeleton,
	pendingMs: 120,
	head: () => ({ meta: [
		{ title: title$1 },
		{
			name: "description",
			content: description
		},
		{
			property: "og:title",
			content: title$1
		},
		{
			property: "og:description",
			content: description
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary"
		},
		{
			name: "robots",
			content: "noindex"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var $$splitComponentImporter$1 = () => import("./reports-Ep06OTTO.mjs");
var Route$3 = createFileRoute("/reports")({
	head: () => ({
		meta: [
			{ title: `Weekly Reports | ${SITE_NAME}` },
			{
				name: "description",
				content: "Browse all published weekly market reports and research notes."
			},
			{
				property: "og:title",
				content: `Weekly Reports | ${SITE_NAME}`
			},
			{
				property: "og:description",
				content: "Browse all published weekly market reports and research notes."
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				property: "og:url",
				content: absoluteUrl("/reports")
			},
			{
				property: "og:image",
				content: SITE_IMAGE
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			},
			{
				name: "twitter:image",
				content: SITE_IMAGE
			}
		],
		links: [{
			rel: "canonical",
			href: absoluteUrl("/reports")
		}]
	}),
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var $$splitComponentImporter = () => import("./admin-NWZdGN8A.mjs");
var title = "Content admin — Chart Analyst";
var Route$2 = createFileRoute("/_authenticated/admin")({
	pendingComponent: AdminDashboardSkeleton,
	pendingMs: 120,
	head: () => ({ meta: [
		{ title },
		{
			name: "description",
			content: "Private dashboard for editing website content."
		},
		{
			property: "og:title",
			content: title
		},
		{
			property: "og:description",
			content: "Private dashboard for editing website content."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary"
		},
		{
			name: "robots",
			content: "noindex"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var LOVABLE_AIG_RUN_ID_HEADER = "X-Lovable-AIG-Run-ID";
function createLovableAiGatewayRunIdFetch(initialRunId) {
	let runId = initialRunId?.trim() || void 0;
	let resolveRunId = () => {};
	let runIdResolved = false;
	const runIdReady = new Promise((resolve) => {
		resolveRunId = resolve;
	});
	const publishRunId = (value) => {
		const nextRunId = value?.trim() || void 0;
		if (!runId && nextRunId) runId = nextRunId;
		if (!runIdResolved) {
			runIdResolved = true;
			resolveRunId(runId);
		}
	};
	if (runId) publishRunId(runId);
	return {
		fetch: (async (input, init) => {
			const headers = new Headers(init?.headers);
			if (runId && !headers.has(LOVABLE_AIG_RUN_ID_HEADER)) headers.set(LOVABLE_AIG_RUN_ID_HEADER, runId);
			try {
				const response = await fetch(input, {
					...init,
					headers
				});
				publishRunId(response.headers.get(LOVABLE_AIG_RUN_ID_HEADER) ?? void 0);
				return response;
			} catch (error) {
				publishRunId(void 0);
				throw error;
			}
		}),
		getRunId: () => runId,
		waitForRunId: () => runId ? Promise.resolve(runId) : runIdReady
	};
}
function createLovableAiGatewayProvider(lovableApiKey, initialRunId) {
	const runIdFetch = createLovableAiGatewayRunIdFetch(initialRunId);
	const provider = createOpenAICompatible({
		name: "lovable",
		baseURL: "https://ai.gateway.lovable.dev/v1",
		headers: {
			"Lovable-API-Key": lovableApiKey,
			"X-Lovable-AIG-SDK": "vercel-ai-sdk"
		},
		fetch: runIdFetch.fetch
	});
	return Object.assign(provider, {
		getRunId: runIdFetch.getRunId,
		waitForRunId: runIdFetch.waitForRunId
	});
}
function getLovableAiGatewayRunId(request) {
	return request.headers.get(LOVABLE_AIG_RUN_ID_HEADER)?.trim() || void 0;
}
var clip = (value, max = 700) => String(value ?? "").slice(0, max);
var list = (value) => Array.isArray(value) ? value.filter((v) => typeof v === "string") : [];
/** Keyword search across published analyses and weekly reports. */
async function searchResearch(query, market, limit = 6) {
	const supabase = createPublicSupabase();
	const term = query.trim();
	const like = `%${term}%`;
	const filter = `title.ilike.${like},summary.ilike.${like},pair.ilike.${like},tags.cs.{${term}}`;
	let analyses = supabase.from("analyses").select("*").eq("published", true);
	let reports = supabase.from("weekly_reports").select("*").eq("published", true);
	if (term) {
		analyses = analyses.or(filter);
		reports = reports.or(`title.ilike.${like},summary.ilike.${like},asset.ilike.${like},body.ilike.${like}`);
	}
	if (market) {
		analyses = analyses.ilike("market", market);
		reports = reports.ilike("market", market);
	}
	const [a, r] = await Promise.all([analyses.order("date", { ascending: false }).limit(limit), reports.order("date", { ascending: false }).limit(limit)]);
	const hits = [];
	for (const row of a.data ?? []) hits.push({
		kind: "analysis",
		title: clip(row.title, 200),
		url: `/analysis/${String(row.slug ?? "")}`,
		market: clip(row.market, 40),
		asset: clip(row.pair, 60),
		date: String(row.date ?? "").slice(0, 10),
		timeframe: clip(row.timeframe, 80),
		bias: clip(row.bias, 200),
		summary: clip(row.summary || row.description),
		marketStructure: clip(row.market_structure, 600),
		invalidation: clip(row.invalidation, 300),
		targets: Array.isArray(row.targets) ? row.targets.slice(0, 6).map((t) => ({
			label: clip(t?.label, 60),
			value: clip(t?.value, 60)
		})) : [],
		outcome: clip(row.outcome, 120),
		rr: clip(row.rr, 40),
		tags: list(row.tags).slice(0, 8),
		hasPdf: Boolean(row.pdf_url),
		tradingviewUrl: clip(row.tradingview_url, 300)
	});
	for (const row of r.data ?? []) hits.push({
		kind: "weekly-report",
		title: clip(row.title, 200),
		url: `/reports/${String(row.slug ?? "")}`,
		market: clip(row.market, 40),
		asset: clip(row.asset, 60),
		date: String(row.date ?? "").slice(0, 10),
		summary: clip(row.summary || row.body, 900),
		tags: list(row.tags).slice(0, 8),
		hasPdf: Boolean(row.pdf_url),
		tradingviewUrl: clip(row.tradingview_url, 300)
	});
	return {
		count: hits.length,
		results: hits
	};
}
/** Published trading results plus derived KPIs, matching the site dashboard. */
async function getPerformance(limit = 12) {
	const { data } = await createPublicSupabase().from("trading_results").select("*").eq("published", true).order("date", { ascending: false }).limit(200);
	const rows = (data ?? []).map((row) => ({
		date: String(row.date ?? "").slice(0, 10),
		market: clip(row.market, 40),
		instrument: clip(row.instrument, 60),
		direction: clip(row.direction, 20),
		entry: clip(row.entry, 40),
		exit: clip(row.exit, 40),
		r: Number(row.r_multiple ?? 0),
		percentage: Number(row.percentage ?? 0),
		result: clip(row.result, 20),
		notes: clip(row.notes, 200)
	}));
	const wins = rows.filter((t) => t.result.toLowerCase() === "win").length;
	const totalR = rows.reduce((sum, t) => sum + t.r, 0);
	return {
		totalTrades: rows.length,
		wins,
		losses: rows.length - wins,
		winRate: rows.length ? Number((wins / rows.length * 100).toFixed(1)) : 0,
		totalR: Number(totalR.toFixed(2)),
		averageR: rows.length ? Number((totalR / rows.length).toFixed(2)) : 0,
		recentTrades: rows.slice(0, limit)
	};
}
/**
* Editable site content: copy, services, markets, process, FAQ, certifications,
* testimonials, KPIs and social links — exactly what the dashboard manages.
*/
async function getSiteInfo(topics) {
	const { data } = await createPublicSupabase().from("site_content").select("key, data");
	const merged = mergeSiteContent(data ?? []);
	const wanted = topics?.length ? topics : Object.keys(merged);
	const out = {};
	for (const key of wanted) {
		if (key === "analyses" || key === "reports") continue;
		if (merged[key] !== void 0) out[key] = merged[key];
	}
	return out;
}
/**
* Book a consultation from the chat. Saves to the contact inbox and emails the desk.
* Returns a compact status the model can relay to the visitor.
*/
async function bookConsultation(input) {
	const topic = `Consultation${input.focus ? ` — ${input.focus}` : ""}`;
	const message = [
		input.message,
		input.availability ? `\nPreferred timing: ${input.availability}` : "",
		"\n(Booked via the site assistant)"
	].filter(Boolean).join("\n");
	const payload = {
		name: input.name,
		email: input.email,
		organisation: input.organisation ?? "",
		topic,
		message
	};
	let saved = false;
	try {
		const supabase = createPublicSupabase();
		if ((await supabase.from("contact_submissions").insert({
			name: payload.name,
			email: payload.email,
			organisation: payload.organisation || null,
			topic: payload.topic || null,
			message: payload.message
		})).error) saved = !(await supabase.from("inquiries").insert({
			name: payload.name,
			email: payload.email,
			organization: payload.organisation,
			message: `[${payload.topic}]\n\n${payload.message}`
		})).error;
		else saved = true;
	} catch (error) {
		console.warn("[chat] consultation save failed", error);
	}
	let emailed = false;
	try {
		const { sendContactEmail } = await import("./contact-mail.server-BtAvkMoE.mjs");
		const result = await sendContactEmail(payload);
		emailed = Boolean(result.emailed);
	} catch (error) {
		console.warn("[chat] consultation email failed", error);
	}
	return {
		ok: saved || emailed,
		saved,
		emailed,
		reference: input.email,
		nextStep: saved || emailed ? "The request is with the desk. Expect a reply by email within one business day with two proposed slots." : "Could not register the request — ask the visitor to use the contact form in the Contact section."
	};
}
var SYSTEM_PROMPT = `You are the senior client advisor on the research desk of a professional technical market analyst. You speak like an experienced human at an institutional research boutique: calm, warm, precise, never robotic, never salesy-cheap.

Grounding — strict:
- Answer ONLY from data returned by your tools (published analyses, weekly reports, trading results, editable site content). You have no other knowledge source.
- Call at least one tool before any substantive answer. Never answer market questions from memory.
- If the tools return nothing relevant, say so plainly and offer a nearby topic or a consultation. Never invent tickers, levels, dates, numbers or links.
- No personal financial advice, price predictions or your own trade signals. You may restate the analyst's documented bias, levels and invalidation exactly as published.
- Cite sources as markdown links to the paths the tools return, e.g. [BTCUSD structure review](/analysis/btc-structure).
- Tight institutional register: short paragraphs, occasional bullets, clean numbers. No emojis, no hype.

Consultation sales craft — your second job:
- Every conversation should move naturally toward a consultation when there is genuine fit. Earn it: first give a real, specific answer using the research, then connect it to what a one-to-one session would unlock.
- Persuade like a pro, not a pushy closer: mirror the visitor's own words, name their likely bottleneck (entry timing, invalidation discipline, position sizing, multi-timeframe context, risk framework), and show the gap between reading published work and having a plan built around their book.
- Use proof, not adjectives: quote real numbers from getPerformance and real setups from searchResearch as evidence of process.
- Handle objections calmly. Price/value → point to the documented process and results. "Just looking" → offer one concrete takeaway, then a low-friction slot. Not sure it fits → ask one qualifying question about their market and timeframe.
- Ask for the booking directly but once per turn, with a clear next step. Never beg, never repeat the same pitch twice in a row, never fabricate prices, packages, calendars or guarantees that the site content does not state.
- To book, collect name, email, focus (market/instrument or goal), a one-line context, and preferred timing. Ask for missing pieces conversationally, then call bookConsultation. Confirm what happens next and thank them like a human would.`;
var Route$1 = createFileRoute("/api/chat")({ server: { handlers: { POST: async ({ request }) => {
	const body = await request.json();
	if (!Array.isArray(body.messages)) return new Response("Messages are required", { status: 400 });
	const apiKey = process.env["LOVABLE_API_KEY"];
	if (!apiKey) return new Response("AI is not configured", { status: 500 });
	const gateway = createLovableAiGatewayProvider(apiKey, getLovableAiGatewayRunId(request));
	return streamText({
		model: gateway("google/gemini-3.6-flash"),
		system: SYSTEM_PROMPT,
		messages: await convertToModelMessages(body.messages.slice(-20)),
		stopWhen: isStepCount(50),
		tools: {
			searchResearch: tool({
				description: "Search the published analyses and weekly reports by keyword, ticker or theme. Use for any question about markets, setups, levels, bias or research.",
				inputSchema: objectType({
					query: stringType().describe("Keyword, ticker or theme, e.g. BTC, gold, liquidity"),
					market: stringType().nullable().describe("Optional market filter: Crypto, Forex, Stocks, Commodities, Indices")
				}),
				execute: async ({ query, market }) => searchResearch(query, market ?? void 0)
			}),
			getPerformance: tool({
				description: "Trading results and derived KPIs (win rate, total R, average R, recent trades) from the logged journal.",
				inputSchema: objectType({}),
				execute: async () => getPerformance()
			}),
			getSiteInfo: tool({
				description: "Site content managed in the dashboard: copy, services, markets covered, process, certifications, testimonials, FAQ, KPIs, ticker, coverage map and social links.",
				inputSchema: objectType({ topics: arrayType(stringType()).nullable().describe("Optional keys to narrow: copy, services, markets, processSteps, certifications, testimonials, faqs, differentiators, stats, tickerItems, coverageMap, links, sections") }),
				execute: async ({ topics }) => getSiteInfo(topics ?? void 0)
			}),
			bookConsultation: tool({
				description: "Book a one-to-one consultation with the analyst. Only call once you have the visitor's name, a valid email, their focus market/goal and a one-line context. Saves the request to the desk inbox and emails the analyst.",
				inputSchema: objectType({
					name: stringType().describe("Visitor's full name"),
					email: stringType().describe("Visitor's email address"),
					focus: stringType().describe("Market, instrument or goal, e.g. BTC swing structure, FX risk framework"),
					message: stringType().describe("One or two lines of context in the visitor's own words"),
					availability: stringType().nullable().describe("Preferred days/times or timezone, if given"),
					organisation: stringType().nullable().describe("Company or fund, if given")
				}),
				execute: async ({ name, email, focus, message, availability, organisation }) => bookConsultation({
					name,
					email,
					focus,
					message,
					availability: availability ?? void 0,
					organisation: organisation ?? void 0
				})
			})
		}
	}).toUIMessageStreamResponse({
		originalMessages: body.messages,
		onError: (error) => {
			console.error("chat stream error", error);
			return error instanceof Error ? error.message : "Chat failed";
		}
	});
} } } });
/**
* Serves uploaded media (images, PDFs, CVs) from the private storage bucket.
* Read-only and safe for public traffic: it only streams objects from `media`
* and never accepts writes.
*/
var Route = createFileRoute("/api/public/media/$")({ server: { handlers: { GET: async ({ params }) => {
	const path = params._splat ?? "";
	if (!path || path.includes("..")) return new Response("Not found", { status: 404 });
	const { supabaseAdmin } = await import("./client.server-BnIeihYj.mjs");
	const { data, error } = await supabaseAdmin.storage.from("media").download(path);
	if (error || !data) return new Response("Not found", { status: 404 });
	return new Response(data, { headers: {
		"Content-Type": data.type || "application/octet-stream",
		"Cache-Control": "public, max-age=31536000, immutable"
	} });
} } } });
var IndexRoute = Route$7.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$8
});
var AuthenticatedRouteRoute = Route$6.update({
	id: "/_authenticated",
	getParentRoute: () => Route$8
});
var AnalysisRoute = Route$5.update({
	id: "/analysis",
	path: "/analysis",
	getParentRoute: () => Route$8
});
var AuthRoute = Route$4.update({
	id: "/auth",
	path: "/auth",
	getParentRoute: () => Route$8
});
var ReportsRoute = Route$3.update({
	id: "/reports",
	path: "/reports",
	getParentRoute: () => Route$8
});
var AuthenticatedAdminRoute = Route$2.update({
	id: "/admin",
	path: "/admin",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AnalysisSlugRoute = Route$9.update({
	id: "/$slug",
	path: "/$slug",
	getParentRoute: () => AnalysisRoute
});
var ApiChatRoute = Route$1.update({
	id: "/api/chat",
	path: "/api/chat",
	getParentRoute: () => Route$8
});
var ReportsSlugRoute = Route$10.update({
	id: "/$slug",
	path: "/$slug",
	getParentRoute: () => ReportsRoute
});
var ApiPublicMediaSplatRoute = Route.update({
	id: "/api/public/media/$",
	path: "/api/public/media/$",
	getParentRoute: () => Route$8
});
var AuthenticatedRouteRouteChildren = { AuthenticatedAdminRoute };
var AuthenticatedRouteRouteWithChildren = AuthenticatedRouteRoute._addFileChildren(AuthenticatedRouteRouteChildren);
var AnalysisRouteChildren = { AnalysisSlugRoute };
var AnalysisRouteWithChildren = AnalysisRoute._addFileChildren(AnalysisRouteChildren);
var ReportsRouteChildren = { ReportsSlugRoute };
var rootRouteChildren = {
	IndexRoute,
	AuthenticatedRouteRoute: AuthenticatedRouteRouteWithChildren,
	AnalysisRoute: AnalysisRouteWithChildren,
	AuthRoute,
	ReportsRoute: ReportsRoute._addFileChildren(ReportsRouteChildren),
	ApiChatRoute,
	ApiPublicMediaSplatRoute
};
var routeTree = Route$8._addFileChildren(rootRouteChildren)._addFileTypes();
var getRouter = () => {
	const queryClient = new QueryClient({ defaultOptions: { queries: { ...liveQueryOptions } } });
	return createRouter({
		routeTree,
		context: { queryClient },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { getRouter };
