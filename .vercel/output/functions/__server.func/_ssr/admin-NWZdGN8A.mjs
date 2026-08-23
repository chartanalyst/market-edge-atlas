import { o as __toESM } from "../_runtime.mjs";
import { _ as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { c as createServerFn } from "./createServerFn-CIHAFgYl.mjs";
import { o as require_jsx_runtime, s as require_react } from "../_libs/@ai-sdk/react+[...].mjs";
import { n as createSsrRpc, r as useServerFn, t as cn } from "./createSsrRpc-vr7yBYzy.mjs";
import { t as requireSupabaseAuth } from "./auth-middleware-tiFBA43n.mjs";
import { i as marketOptions, r as emptyAnalysis } from "./analysis-model-CBMM6olb.mjs";
import { n as emptyReport } from "./report-model-BUby-DFX.mjs";
import { t as defaultSiteContent } from "./site-content-DBTeyB_P.mjs";
import { n as liveQueryOptions } from "./live-poll-BjhnCmuD.mjs";
import { It as objectType, Lt as stringType, Nt as booleanType, Pt as enumType } from "../_libs/@ai-sdk/gateway+[...].mjs";
import { a as saveSiteContentSection, i as resetSiteContentSection, r as getSiteContentSection, t as getAdminSiteContent } from "./content.functions-BOOXBVL8.mjs";
import { c as listAllAnalyses, o as deleteAnalysis, s as getAnalysis, u as saveAnalysis } from "./analyses.functions-BviDkd_w.mjs";
import { t as supabase } from "./client-B5Bu-311.mjs";
import { n as AdminInboxSkeleton, r as AdminPanelSkeleton, t as AdminDashboardSkeleton } from "./dashboard-skeleton-CjRAtChM.mjs";
import { a as saveReport, n as getReport, r as listAllReports, t as deleteReport } from "./reports.functions-DI0eKq1u.mjs";
import { a as getJournalMetrics, c as listAllTrades, n as deleteTrade, o as getTrade, r as emptyTrade, s as importTradesFromCsv, u as saveTrade } from "./trades.functions-CnN-bMfa.mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { A as ImagePlus, D as LoaderCircle, E as LogOut, F as Download, G as ArrowUpRight, J as ArrowDown, N as FileUp, P as ExternalLink, R as CircleAlert, T as Mail, W as ArrowUp, _ as RefreshCw, a as TrendingUp, b as Pin, g as RotateCcw, h as Save, l as Star, q as ArrowLeft, s as Trash2, x as Paperclip, y as Plus } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as format } from "../_libs/date-fns.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin-NWZdGN8A.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
/** Is the caller an admin? Also claims admin for the allowed bootstrap account. */
var getAdminStatus = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).handler(createSsrRpc("77265b60422ccd3fca55e66689775b583f1f9a8f66bbea850c2c67d32fad8080"));
/** Live counts and recent activity for the admin overview dashboard. */
var getAdminOverview = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).handler(createSsrRpc("98193c088815d6bbdd4155ffbad4b125116e51df7ef81d3d6aef43156e028e01"));
var t = (name, label, placeholder) => ({
	name,
	label,
	type: "text",
	placeholder
});
var area = (name, label) => ({
	name,
	label,
	type: "textarea"
});
var num = (name, label) => ({
	name,
	label,
	type: "number"
});
var img = (name, label) => ({
	name,
	label,
	type: "image"
});
var labelValue = [t("label", "Label"), t("value", "Value")];
var adminSections = [
	{
		kind: "groups",
		key: "copy",
		label: "Page copy",
		blurb: "Hero, about, contact and brand text used across the site.",
		groups: [
			{
				name: "hero",
				label: "Hero section",
				fields: [
					t("indexLabel", "Index label"),
					t("practice", "Practice label"),
					t("established", "Established label"),
					t("badge", "Live badge"),
					t("titleLine1", "Headline line 1"),
					t("titleAccent", "Headline accent line"),
					t("titleLine3", "Headline line 3"),
					area("subtitle", "Subtitle"),
					t("primaryCta", "Primary button"),
					t("secondaryCta", "Secondary button"),
					{
						name: "kpis",
						label: "Headline KPIs",
						type: "objectList",
						fields: [
							num("value", "Value"),
							t("suffix", "Suffix"),
							t("label", "Label")
						]
					},
					t("panelLabel", "Chart panel label"),
					num("panelPrice", "Chart panel price"),
					t("panelChange", "Chart panel change"),
					t("panelBadge", "Chart panel badge"),
					{
						name: "panelSeries",
						label: "Chart panel series",
						type: "numberList"
					},
					img("panelImage", "Hero panel image (replaces chart when set)"),
					{
						name: "panelMetrics",
						label: "Chart panel metrics",
						type: "objectList",
						fields: labelValue
					},
					{
						name: "floatOne",
						label: "Floating card 1",
						type: "object",
						fields: [t("title", "Title"), t("sub", "Subtitle")]
					},
					{
						name: "floatTwo",
						label: "Floating card 2",
						type: "object",
						fields: [t("title", "Title"), t("sub", "Subtitle")]
					}
				]
			},
			{
				name: "about",
				label: "About section",
				fields: [
					t("eyebrow", "Eyebrow"),
					t("title", "Title"),
					area("description", "Description"),
					{
						name: "paragraphs",
						label: "Paragraphs",
						type: "stringList"
					},
					{
						name: "pillars",
						label: "Pillars",
						type: "objectList",
						fields: [t("title", "Title"), area("desc", "Description")]
					},
					t("asideTitle", "Aside title"),
					{
						name: "points",
						label: "Aside points",
						type: "objectList",
						fields: [
							t("n", "Number"),
							t("title", "Title"),
							area("desc", "Description")
						]
					},
					t("chartLabel", "Chart label"),
					t("chartValue", "Chart value"),
					{
						name: "chartSeries",
						label: "Chart series",
						type: "numberList"
					}
				]
			},
			{
				name: "contact",
				label: "Contact section",
				fields: [
					t("eyebrow", "Eyebrow"),
					t("title", "Title"),
					area("description", "Description"),
					t("email", "Email address"),
					t("responseTime", "Response time"),
					t("coverage", "Coverage"),
					{
						name: "engagements",
						label: "Engagement options",
						type: "stringList"
					},
					area("footnote", "Footnote")
				]
			},
			{
				name: "brand",
				label: "Brand & footer",
				fields: [
					t("initials", "Monogram initials"),
					t("name", "Brand name"),
					area("tagline", "Footer tagline"),
					area("disclaimer", "Footer disclaimer")
				]
			}
		]
	},
	{
		kind: "list",
		key: "sections",
		label: "Homepage sections",
		blurb: "Reorder sections with the arrows, or untick one to hide it from the homepage.",
		itemLabel: "Section",
		titleField: "label",
		fields: [
			{
				name: "id",
				label: "Section id (do not change)",
				type: "text"
			},
			t("label", "Label"),
			{
				name: "enabled",
				label: "Show on homepage",
				type: "boolean"
			}
		]
	},
	{
		kind: "list",
		key: "links",
		label: "Social & contact links",
		blurb: "Links used in the footer and contact section.",
		itemLabel: "Link",
		titleField: "label",
		fields: [
			t("platform", "Platform", "Email | X | LinkedIn | Discord | Telegram | Instagram | TradingView | GitHub"),
			t("label", "Label"),
			t("href", "URL", "https://…")
		]
	},
	{
		kind: "list",
		key: "certifications",
		label: "Certifications",
		blurb: "Credentials shown in the certifications section.",
		itemLabel: "Certification",
		titleField: "name",
		fields: [
			t("name", "Certificate name"),
			t("org", "Issuing organisation"),
			t("date", "Issue date (YYYY-MM)"),
			t("credentialId", "Credential ID (optional)"),
			t("link", "Credential link", "https://…"),
			img("image", "Certificate image"),
			area("desc", "Short description")
		]
	},
	{
		kind: "list",
		key: "markets",
		label: "Markets covered",
		blurb: "The asset classes grid.",
		itemLabel: "Market",
		titleField: "name",
		fields: [
			t("name", "Name"),
			t("icon", "Icon name (lucide)", "Bitcoin"),
			area("desc", "Description"),
			t("stat", "Stat")
		]
	},
	{
		kind: "list",
		key: "services",
		label: "Services",
		blurb: "Engagement types offered.",
		itemLabel: "Service",
		titleField: "title",
		fields: [
			t("title", "Title"),
			area("desc", "Description"),
			t("icon", "Icon name (lucide)")
		]
	},
	{
		kind: "list",
		key: "processSteps",
		label: "Analysis process",
		blurb: "The stages of your documented process.",
		itemLabel: "Step",
		titleField: "title",
		fields: [
			t("n", "Number"),
			t("title", "Title"),
			area("desc", "Description")
		]
	},
	{
		kind: "list",
		key: "differentiators",
		label: "Why work with me",
		blurb: "Standards shown in the differentiators grid.",
		itemLabel: "Standard",
		titleField: "title",
		fields: [
			t("title", "Title"),
			area("desc", "Description"),
			t("icon", "Icon name (lucide)")
		]
	},
	{
		kind: "list",
		key: "testimonials",
		label: "Testimonials",
		blurb: "Quotes shown in the testimonial carousel.",
		itemLabel: "Testimonial",
		titleField: "name",
		fields: [
			area("quote", "Quote"),
			t("name", "Name"),
			t("role", "Role"),
			num("rating", "Rating (1-5)")
		]
	},
	{
		kind: "list",
		key: "faqs",
		label: "FAQ",
		blurb: "Questions and answers in the FAQ accordion.",
		itemLabel: "Question",
		titleField: "q",
		fields: [t("q", "Question"), area("a", "Answer")]
	},
	{
		kind: "list",
		key: "stats",
		label: "Hero KPIs",
		blurb: "Stats displayed in the hero metrics panel.",
		itemLabel: "KPI",
		titleField: "label",
		fields: [
			num("value", "Value"),
			t("suffix", "Suffix"),
			t("label", "Label"),
			t("detail", "Detail")
		]
	},
	{
		kind: "list",
		key: "tickerItems",
		label: "Market ticker",
		blurb: "Instruments in the scrolling bar above the navigation. Live prices overlay BTC/ETH/SOL/XAU when available.",
		itemLabel: "Instrument",
		titleField: "symbol",
		fields: [
			t("symbol", "Symbol"),
			t("price", "Fallback price"),
			t("change", "Fallback change"),
			{
				name: "up",
				label: "Positive change",
				type: "boolean"
			}
		]
	}
];
function emptyItem(fields) {
	const item = {};
	for (const f of fields) if (f.type === "number") item[f.name] = 0;
	else if (f.type === "boolean") item[f.name] = true;
	else if (f.type === "stringList" || f.type === "numberList") item[f.name] = [];
	else if (f.type === "objectList") item[f.name] = [];
	else item[f.name] = "";
	return item;
}
var uploadSchema = objectType({
	path: stringType().min(1).max(500),
	contentType: stringType().min(1).max(120),
	base64: stringType().min(1)
});
/** Admin-only media upload (images, PDFs) — uses service role storage. */
var uploadAdminMedia = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).validator((input) => uploadSchema.parse(input)).handler(createSsrRpc("cfce13f330fdd90f2d28b0bc13e93e1cc7a466bf360c35e65cb11463189da23a"));
createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).validator((input) => objectType({ path: stringType().min(1) }).parse(input)).handler(createSsrRpc("82e7cd81f4d4322f3a873ebc6064b0753149bab593bdc89cfaddc38893767fe7"));
var MAX_EDGE = 1800;
var THUMB_EDGE = 560;
function slugifyName(name) {
	return name.toLowerCase().replace(/\.[^.]+$/, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 60);
}
async function resize(file, maxEdge) {
	const bitmap = await createImageBitmap(file);
	const scale = Math.min(1, maxEdge / Math.max(bitmap.width, bitmap.height));
	const width = Math.round(bitmap.width * scale);
	const height = Math.round(bitmap.height * scale);
	const canvas = document.createElement("canvas");
	canvas.width = width;
	canvas.height = height;
	const ctx = canvas.getContext("2d");
	if (!ctx) throw new Error("Could not process this image");
	ctx.drawImage(bitmap, 0, 0, width, height);
	bitmap.close?.();
	const blob = await new Promise((resolve) => canvas.toBlob(resolve, "image/webp", .86));
	if (!blob) throw new Error("Could not compress this image");
	return blob;
}
async function blobToBase64(blob) {
	const buffer = await blob.arrayBuffer();
	const bytes = new Uint8Array(buffer);
	let binary = "";
	for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i]);
	return btoa(binary);
}
async function putServer(path, body, contentType) {
	const { url } = await uploadAdminMedia({ data: {
		path,
		contentType,
		base64: await blobToBase64(body)
	} });
	return url;
}
/**
* Notion-style upload: pick a file, resize/compress on client, store via admin API.
*/
async function uploadMedia(file) {
	const stamp = `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
	const base = slugifyName(file.name) || "file";
	if (file.type.startsWith("image/")) {
		const [full, thumb] = await Promise.all([resize(file, MAX_EDGE), resize(file, THUMB_EDGE)]);
		return {
			url: await putServer(`images/${stamp}-${base}.webp`, full, "image/webp"),
			thumbUrl: await putServer(`images/${stamp}-${base}-thumb.webp`, thumb, "image/webp"),
			name: file.name
		};
	}
	const url = await putServer(`docs/${stamp}-${base}.${(file.name.split(".").pop() ?? "bin").toLowerCase().replace(/[^a-z0-9]/g, "")}`, file, file.type || "application/octet-stream");
	return {
		url,
		thumbUrl: url,
		name: file.name
	};
}
/** Single image slot — click, pick, done. */
function ImageUpload({ label, value, onChange }) {
	const [busy, setBusy] = (0, import_react.useState)(false);
	const input = (0, import_react.useRef)(null);
	async function pick(file) {
		if (!file) return;
		setBusy(true);
		try {
			onChange((await uploadMedia(file)).url);
			toast.success("Image uploaded");
		} catch (error) {
			toast.error(error instanceof Error ? error.message : "Upload failed");
		} finally {
			setBusy(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "eyebrow",
			children: label
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-2 flex items-start gap-3",
			children: [value ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: value,
				alt: "",
				loading: "lazy",
				className: "h-24 w-32 border border-border object-cover"
			}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => input.current?.click(),
					disabled: busy,
					className: "inline-flex items-center gap-2 border border-border bg-background px-4 py-2.5 font-mono text-[0.68rem] uppercase tracking-[0.16em] transition-colors hover:border-emerald hover:text-emerald disabled:opacity-60",
					children: [busy ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-3.5 w-3.5 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImagePlus, { className: "h-3.5 w-3.5" }), value ? "Replace image" : "Upload image"]
				}), value ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => onChange(""),
					className: "inline-flex items-center gap-2 text-xs text-muted-foreground transition-colors hover:text-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-3.5 w-3.5" }), " Remove"]
				}) : null]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
			ref: input,
			type: "file",
			accept: "image/*",
			className: "hidden",
			onChange: (e) => pick(e.target.files?.[0] ?? void 0)
		})
	] });
}
/** Multi-image gallery with automatic resize + compression. */
function GalleryUpload({ label, value, onChange }) {
	const [busy, setBusy] = (0, import_react.useState)(false);
	const input = (0, import_react.useRef)(null);
	async function pick(files) {
		if (!files || files.length === 0) return;
		setBusy(true);
		try {
			const uploaded = [];
			for (const file of Array.from(files)) {
				const media = await uploadMedia(file);
				uploaded.push(media.url);
			}
			onChange([...value, ...uploaded]);
			toast.success(`${uploaded.length} image${uploaded.length > 1 ? "s" : ""} uploaded`);
		} catch (error) {
			toast.error(error instanceof Error ? error.message : "Upload failed");
		} finally {
			setBusy(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "eyebrow",
			children: label
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-2 flex flex-wrap gap-3",
			children: value.map((url) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: url,
					alt: "",
					loading: "lazy",
					className: "h-20 w-28 border border-border object-cover"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					"aria-label": "Remove image",
					onClick: () => onChange(value.filter((u) => u !== url)),
					className: "absolute right-0 top-0 grid h-6 w-6 place-items-center border border-border bg-background text-muted-foreground transition-colors hover:text-emerald",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-3 w-3" })
				})]
			}, url))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			type: "button",
			onClick: () => input.current?.click(),
			disabled: busy,
			className: "mt-3 inline-flex items-center gap-2 border border-border bg-background px-4 py-2.5 font-mono text-[0.68rem] uppercase tracking-[0.16em] transition-colors hover:border-emerald hover:text-emerald disabled:opacity-60",
			children: [busy ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-3.5 w-3.5 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImagePlus, { className: "h-3.5 w-3.5" }), "Upload images"]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
			ref: input,
			type: "file",
			accept: "image/*",
			multiple: true,
			className: "hidden",
			onChange: (e) => pick(e.target.files)
		})
	] });
}
/** Document slot (PDF, CV, report attachment). */
function FileUpload({ label, accept = "application/pdf", value, onChange }) {
	const [busy, setBusy] = (0, import_react.useState)(false);
	const input = (0, import_react.useRef)(null);
	async function pick(file) {
		if (!file) return;
		setBusy(true);
		try {
			onChange((await uploadMedia(file)).url);
			toast.success("File uploaded");
		} catch (error) {
			toast.error(error instanceof Error ? error.message : "Upload failed");
		} finally {
			setBusy(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "eyebrow",
			children: label
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-2 flex flex-wrap items-center gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: () => input.current?.click(),
				disabled: busy,
				className: "inline-flex items-center gap-2 border border-border bg-background px-4 py-2.5 font-mono text-[0.68rem] uppercase tracking-[0.16em] transition-colors hover:border-emerald hover:text-emerald disabled:opacity-60",
				children: [busy ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-3.5 w-3.5 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Paperclip, { className: "h-3.5 w-3.5" }), value ? "Replace file" : "Upload file"]
			}), value ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				href: value,
				target: "_blank",
				rel: "noreferrer",
				className: "text-xs text-muted-foreground underline transition-colors hover:text-foreground",
				children: "View current file"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: () => onChange(""),
				className: "inline-flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-3.5 w-3.5" }), " Remove"]
			})] }) : null]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
			ref: input,
			type: "file",
			accept,
			className: "hidden",
			onChange: (e) => pick(e.target.files?.[0] ?? void 0)
		})
	] });
}
var inputClass = "mt-2 w-full border border-border bg-background px-3 py-2.5 text-sm outline-none transition-colors focus:border-emerald";
function FieldControl({ field, value, onChange }) {
	if (field.type === "textarea") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "block",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "eyebrow",
			children: field.label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
			rows: 3,
			value: String(value ?? ""),
			placeholder: field.placeholder,
			onChange: (e) => onChange(e.target.value),
			className: `${inputClass} resize-y`
		})]
	});
	if (field.type === "number") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "block",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "eyebrow",
			children: field.label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
			type: "number",
			value: Number(value ?? 0),
			onChange: (e) => onChange(e.target.value === "" ? 0 : Number(e.target.value)),
			className: `${inputClass} num`
		})]
	});
	if (field.type === "image") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImageUpload, {
		label: field.label,
		value: String(value ?? ""),
		onChange: (url) => onChange(url)
	});
	if (field.type === "boolean") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "flex items-center gap-3 border border-border bg-background px-3 py-2.5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
			type: "checkbox",
			checked: Boolean(value),
			onChange: (e) => onChange(e.target.checked),
			className: "h-4 w-4 accent-emerald"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "eyebrow",
			children: field.label
		})]
	});
	if (field.type === "numberList") {
		const list = Array.isArray(value) ? value : [];
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
			className: "block",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "eyebrow",
				children: [field.label, " · comma separated"]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				value: list.join(", "),
				onChange: (e) => onChange(e.target.value.split(",").map((v) => v.trim()).filter((v) => v !== "").map(Number).filter((n) => !Number.isNaN(n))),
				className: `${inputClass} num`
			})]
		});
	}
	if (field.type === "stringList") {
		const list = Array.isArray(value) ? value : [];
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "eyebrow",
				children: field.label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-2 grid gap-2",
				children: list.map((item, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
						rows: 2,
						value: item,
						onChange: (e) => {
							const next = [...list];
							next[i] = e.target.value;
							onChange(next);
						},
						className: "w-full resize-y border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-emerald"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconButton, {
						label: "Remove",
						onClick: () => onChange(list.filter((_, idx) => idx !== i)),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-3.5 w-3.5" })
					})]
				}, i))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AddButton, {
				label: "Add item",
				onClick: () => onChange([...list, ""])
			})
		] });
	}
	if (field.type === "object") {
		const obj = value ?? {};
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", {
			className: "border border-border bg-surface p-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", {
				className: "eyebrow px-1",
				children: field.label
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-4 sm:grid-cols-2",
				children: (field.fields ?? []).map((sub) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldControl, {
					field: sub,
					value: obj[sub.name],
					onChange: (next) => onChange({
						...obj,
						[sub.name]: next
					})
				}, sub.name))
			})]
		});
	}
	if (field.type === "objectList") {
		const list = Array.isArray(value) ? value : [];
		const subFields = field.fields ?? [];
		const update = (i, next) => onChange(list.map((item, idx) => idx === i ? next : item));
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "eyebrow",
				children: field.label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-2 grid gap-3",
				children: list.map((item, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "border border-border bg-surface p-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-3 flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "num text-xs text-muted-foreground",
							children: String(i + 1).padStart(2, "0")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex gap-1.5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconButton, {
									label: "Move up",
									onClick: () => i > 0 && onChange(swap(list, i, i - 1)),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUp, { className: "h-3.5 w-3.5" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconButton, {
									label: "Move down",
									onClick: () => i < list.length - 1 && onChange(swap(list, i, i + 1)),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowDown, { className: "h-3.5 w-3.5" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconButton, {
									label: "Remove",
									onClick: () => onChange(list.filter((_, idx) => idx !== i)),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-3.5 w-3.5" })
								})
							]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid gap-4 sm:grid-cols-2",
						children: subFields.map((sub) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldControl, {
							field: sub,
							value: item[sub.name],
							onChange: (next) => update(i, {
								...item,
								[sub.name]: next
							})
						}, sub.name))
					})]
				}, i))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AddButton, {
				label: "Add entry",
				onClick: () => onChange([...list, emptyItem(subFields)])
			})
		] });
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "block",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "eyebrow",
			children: field.label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
			value: String(value ?? ""),
			placeholder: field.placeholder,
			onChange: (e) => onChange(e.target.value),
			className: inputClass
		})]
	});
}
function swap(list, a, b) {
	const next = [...list];
	[next[a], next[b]] = [next[b], next[a]];
	return next;
}
function IconButton({ label, onClick, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		"aria-label": label,
		title: label,
		onClick,
		className: "grid h-8 w-8 shrink-0 place-items-center border border-border bg-background text-muted-foreground transition-colors hover:border-emerald hover:text-emerald",
		children
	});
}
function AddButton({ label, onClick }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		onClick,
		className: "mt-3 inline-flex items-center gap-2 border border-border bg-background px-4 py-2.5 font-mono text-[0.68rem] uppercase tracking-[0.16em] transition-colors hover:border-emerald hover:text-emerald",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-3.5 w-3.5" }), label]
	});
}
var adminBtn = "inline-flex items-center justify-center gap-2 border border-border bg-background px-4 py-2.5 font-mono text-[0.68rem] uppercase tracking-[0.16em] transition-colors hover:border-emerald hover:text-emerald disabled:pointer-events-none disabled:opacity-50";
var adminBtnPrimary = "inline-flex items-center justify-center gap-2 border border-border bg-navy px-5 py-2.5 font-mono text-[0.68rem] uppercase tracking-[0.16em] text-navy-foreground transition-colors hover:bg-emerald disabled:pointer-events-none disabled:opacity-50";
var adminInput = "mt-2 w-full border border-border bg-background px-3 py-2.5 text-sm outline-none transition-colors focus:border-emerald";
function AdminSectionHeader({ title, description, actions }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-wrap items-end justify-between gap-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "min-w-0",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-xl font-semibold tracking-[-0.02em]",
				children: title
			}), description ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1.5 max-w-2xl text-sm leading-relaxed text-muted-foreground",
				children: description
			}) : null]
		}), actions ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex flex-wrap gap-2",
			children: actions
		}) : null]
	});
}
function AdminBadge({ children, variant = "default" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("border px-2 py-0.5 font-mono text-[0.6rem] uppercase tracking-widest", variant === "emerald" && "border-emerald text-emerald", variant === "muted" && "border-border text-muted-foreground", variant === "warn" && "border-amber-600/40 text-amber-800", variant === "default" && "border-border"),
		children
	});
}
function AdminEmptyState({ title, description, action }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mt-8 border border-dashed border-border bg-surface px-6 py-12 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-display text-sm font-semibold",
				children: title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mx-auto mt-2 max-w-md text-sm leading-relaxed text-muted-foreground",
				children: description
			}),
			action ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-6 flex justify-center",
				children: action
			}) : null
		]
	});
}
function AdminErrorState({ title = "Could not load data", message, onRetry }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mt-8 border border-destructive/30 bg-destructive/5 p-6",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-start gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { className: "mt-0.5 h-5 w-5 shrink-0 text-destructive" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0 flex-1",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-semibold",
						children: title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted-foreground",
						children: message
					}),
					onRetry ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: onRetry,
						className: cn(adminBtn, "mt-4"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: "h-3.5 w-3.5" }), " Try again"]
					}) : null
				]
			})]
		})
	});
}
function AdminSearch({ value, onChange, placeholder = "Search…" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		type: "search",
		value,
		onChange: (e) => onChange(e.target.value),
		placeholder,
		className: "w-full max-w-xs border border-border bg-background px-4 py-2.5 text-sm outline-none transition-colors focus:border-emerald sm:w-56"
	});
}
function AdminListShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
		className: "mt-8 grid gap-px border border-border bg-border",
		children
	});
}
function AdminListRow({ onClick, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
		className: "bg-card",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(onClick ? "button" : "div", {
			type: onClick ? "button" : void 0,
			onClick,
			className: cn("flex w-full flex-wrap items-center justify-between gap-4 px-5 py-4 text-left", onClick && "transition-colors hover:bg-surface"),
			children
		})
	});
}
function AdminStatCard({ label, value, detail, onClick }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(onClick ? "button" : "div", {
		type: onClick ? "button" : void 0,
		onClick,
		className: cn("border border-border bg-card p-6 text-left transition-colors", onClick && "hover:border-emerald hover:bg-surface"),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "eyebrow text-[0.6rem]",
				children: label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "num mt-3 text-3xl font-semibold tracking-tight",
				children: value
			}),
			detail ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-xs text-muted-foreground",
				children: detail
			}) : null
		]
	});
}
function AdminCard({ children, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("border border-border bg-card p-6", className),
		children
	});
}
function slugify$1(value) {
	return value.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 100);
}
function AnalysesManager() {
	const queryClient = useQueryClient();
	const fetchAll = useServerFn(listAllAnalyses);
	const save = useServerFn(saveAnalysis);
	const remove = useServerFn(deleteAnalysis);
	const list = useQuery({
		queryKey: ["admin-analyses"],
		queryFn: () => fetchAll(),
		...liveQueryOptions
	});
	const fetchOne = useServerFn(getAnalysis);
	const [draft, setDraft] = (0, import_react.useState)(null);
	const [query, setQuery] = (0, import_react.useState)("");
	async function openEditor(record) {
		if (!record.id) {
			setDraft(structuredClone(record));
			return;
		}
		try {
			setDraft(await fetchOne({ data: { id: record.id } }));
		} catch (error) {
			toast.error(error instanceof Error ? error.message : "Could not load analysis");
			setDraft(structuredClone(record));
		}
	}
	const saveMutation = useMutation({
		mutationFn: (record) => save({ data: record }),
		onSuccess: async () => {
			toast.success("Analysis saved", { description: "Published items are live immediately." });
			await queryClient.invalidateQueries({ queryKey: ["admin-analyses"] });
			await queryClient.invalidateQueries({ queryKey: ["site-content"] });
			await queryClient.invalidateQueries({ queryKey: ["published-analyses"] });
			await queryClient.invalidateQueries({ queryKey: ["admin-overview"] });
			setDraft(null);
		},
		onError: (error) => toast.error(error instanceof Error ? error.message : "Could not save")
	});
	const deleteMutation = useMutation({
		mutationFn: (id) => remove({ data: { id } }),
		onSuccess: async () => {
			toast.success("Analysis deleted");
			await queryClient.invalidateQueries({ queryKey: ["admin-analyses"] });
			await queryClient.invalidateQueries({ queryKey: ["site-content"] });
			await queryClient.invalidateQueries({ queryKey: ["published-analyses"] });
			await queryClient.invalidateQueries({ queryKey: ["admin-overview"] });
			setDraft(null);
		},
		onError: (error) => toast.error(error instanceof Error ? error.message : "Could not delete")
	});
	const items = (0, import_react.useMemo)(() => {
		const all = list.data ?? [];
		const q = query.trim().toLowerCase();
		if (!q) return all;
		return all.filter((a) => a.title.toLowerCase().includes(q) || a.pair.toLowerCase().includes(q) || a.market.toLowerCase().includes(q));
	}, [list.data, query]);
	if (draft) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnalysisEditor, {
		record: draft,
		onChange: setDraft,
		onBack: () => setDraft(null),
		onSave: () => saveMutation.mutate(draft),
		onDelete: draft.id ? () => deleteMutation.mutate(draft.id) : void 0,
		busy: saveMutation.isPending || deleteMutation.isPending
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminSectionHeader, {
			title: "Analyses",
			description: "Create, draft, publish, pin and delete research. Published items appear on the site instantly.",
			actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				className: adminBtnPrimary,
				onClick: () => setDraft(emptyAnalysis()),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-3.5 w-3.5" }), " New analysis"]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-6",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminSearch, {
				value: query,
				onChange: setQuery,
				placeholder: "Search title, pair, market…"
			})
		}),
		list.isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminPanelSkeleton, {}) : list.isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminErrorState, {
			message: list.error instanceof Error ? list.error.message : "Could not load analyses.",
			onRetry: () => list.refetch()
		}) : items.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminEmptyState, {
			title: query ? "No matches" : "No analyses yet",
			description: query ? "Try a different search term." : "Create your first case study — shipped examples stay visible on the site until you publish database rows.",
			action: !query ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				className: adminBtnPrimary,
				onClick: () => setDraft(emptyAnalysis()),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-3.5 w-3.5" }), " New analysis"]
			}) : void 0
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminListShell, { children: items.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AdminListRow, {
			onClick: () => openEditor(a),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "min-w-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "flex flex-wrap items-center gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "num text-xs text-muted-foreground",
							children: a.date
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminBadge, { children: a.market }),
						a.featured ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminBadge, {
							variant: "emerald",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "inline-flex items-center gap-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pin, { className: "h-3 w-3" }), " Featured"]
							})
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminBadge, {
							variant: a.published ? "default" : "muted",
							children: a.published ? "Published" : "Draft"
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "mt-2 block truncate text-sm font-semibold",
					children: a.title
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "num text-xs text-muted-foreground",
				children: a.rr || "—"
			})]
		}, a.id)) })
	] });
}
function AnalysisEditor({ record, onChange, onBack, onSave, onDelete, busy }) {
	const set = (key, value) => onChange({
		...record,
		[key]: value
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-wrap items-center justify-between gap-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			onClick: onBack,
			className: "inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-4 w-4" }), " All analyses"]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-wrap gap-2",
			children: [
				onDelete ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					className: adminBtn,
					disabled: busy,
					onClick: onDelete,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-3.5 w-3.5" }), " Delete"]
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: adminBtn,
					disabled: busy,
					onClick: () => onChange({
						...record,
						published: false
					}),
					children: "Save as draft"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					className: adminBtnPrimary,
					disabled: busy,
					onClick: onSave,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Save, { className: "h-3.5 w-3.5" }),
						" ",
						busy ? "Saving…" : "Save"
					]
				})
			]
		})]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mt-8 grid gap-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-5 border border-border bg-card p-6 sm:grid-cols-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "block sm:col-span-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "eyebrow",
							children: "Title"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: record.title,
							onChange: (e) => {
								const title = e.target.value;
								onChange({
									...record,
									title,
									slug: record.slug ? record.slug : slugify$1(title)
								});
							},
							className: adminInput
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "block sm:col-span-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "eyebrow",
							children: "Subtitle"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: record.subtitle,
							onChange: (e) => set("subtitle", e.target.value),
							className: adminInput
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "block",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "eyebrow",
							children: "Slug (URL)"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: record.slug,
							onChange: (e) => set("slug", slugify$1(e.target.value)),
							className: adminInput
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "block",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "eyebrow",
							children: "Market"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
							value: record.market,
							onChange: (e) => set("market", e.target.value),
							className: adminInput,
							children: marketOptions.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: m,
								children: m
							}, m))
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "block",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "eyebrow",
							children: "Category"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: record.category,
							onChange: (e) => set("category", e.target.value),
							className: adminInput
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "block",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "eyebrow",
							children: "Instrument / pair"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: record.pair,
							onChange: (e) => set("pair", e.target.value),
							className: adminInput
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "block",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "eyebrow",
							children: "Timeframe"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: record.timeframe,
							onChange: (e) => set("timeframe", e.target.value),
							className: adminInput
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "block",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "eyebrow",
							children: "Date"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "date",
							value: record.date,
							onChange: (e) => set("date", e.target.value),
							className: `${adminInput} num`
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "block",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "eyebrow",
							children: "Outcome"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: record.outcome,
							onChange: (e) => set("outcome", e.target.value),
							className: adminInput
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "block",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "eyebrow",
							children: "R multiple"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: record.rr,
							onChange: (e) => set("rr", e.target.value),
							className: `${adminInput} num`
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "block",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "eyebrow",
							children: "TradingView link"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: record.tradingviewUrl,
							onChange: (e) => set("tradingviewUrl", e.target.value),
							className: adminInput
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "block",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "eyebrow",
							children: "Sort order"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "number",
							value: record.sortOrder,
							onChange: (e) => set("sortOrder", Number(e.target.value) || 0),
							className: `${adminInput} num`
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap gap-3 sm:col-span-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "flex items-center gap-3 border border-border bg-background px-4 py-2.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "checkbox",
								checked: record.published,
								onChange: (e) => set("published", e.target.checked),
								className: "h-4 w-4 accent-emerald"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "eyebrow",
								children: "Published"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "flex items-center gap-3 border border-border bg-background px-4 py-2.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "checkbox",
								checked: record.featured,
								onChange: (e) => set("featured", e.target.checked),
								className: "h-4 w-4 accent-emerald"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "eyebrow inline-flex items-center gap-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "h-3.5 w-3.5" }), " Pin as featured"]
							})]
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-5 border border-border bg-card p-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "block",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "eyebrow",
							children: "Summary (cards & meta description)"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
							rows: 3,
							value: record.summary,
							onChange: (e) => set("summary", e.target.value),
							className: `${adminInput} resize-y`
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "block",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "eyebrow",
							children: "Full description"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
							rows: 6,
							value: record.description,
							onChange: (e) => set("description", e.target.value),
							className: `${adminInput} resize-y`
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "block",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "eyebrow",
							children: "Bias"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: record.bias,
							onChange: (e) => set("bias", e.target.value),
							className: adminInput
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "block",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "eyebrow",
							children: "Market structure"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
							rows: 4,
							value: record.marketStructure,
							onChange: (e) => set("marketStructure", e.target.value),
							className: `${adminInput} resize-y`
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "block",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "eyebrow",
							children: "Invalidation"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
							rows: 2,
							value: record.invalidation,
							onChange: (e) => set("invalidation", e.target.value),
							className: `${adminInput} resize-y`
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldControl, {
						field: {
							name: "thesis",
							label: "Thesis points",
							type: "stringList"
						},
						value: record.thesis,
						onChange: (next) => set("thesis", next)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldControl, {
						field: {
							name: "targets",
							label: "Targets & key levels",
							type: "objectList",
							fields: [{
								name: "label",
								label: "Label",
								type: "text"
							}, {
								name: "value",
								label: "Value",
								type: "text"
							}]
						},
						value: record.targets,
						onChange: (next) => set("targets", next)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldControl, {
						field: {
							name: "tags",
							label: "Tags",
							type: "stringList"
						},
						value: record.tags,
						onChange: (next) => set("tags", next)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldControl, {
						field: {
							name: "series",
							label: "Chart series",
							type: "numberList"
						},
						value: record.series,
						onChange: (next) => set("series", next)
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-6 border border-border bg-card p-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImageUpload, {
						label: "Cover image",
						value: record.coverImage,
						onChange: (url) => set("coverImage", url)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GalleryUpload, {
						label: "Gallery / chart images",
						value: record.gallery,
						onChange: (urls) => set("gallery", urls)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileUpload, {
						label: "PDF attachment",
						value: record.pdfUrl,
						onChange: (url) => set("pdfUrl", url)
					})
				]
			})
		]
	})] });
}
function slugify(value) {
	return value.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 100);
}
function ReportsManager() {
	const queryClient = useQueryClient();
	const fetchAll = useServerFn(listAllReports);
	const save = useServerFn(saveReport);
	const remove = useServerFn(deleteReport);
	const list = useQuery({
		queryKey: ["admin-reports"],
		queryFn: () => fetchAll(),
		...liveQueryOptions
	});
	const fetchOne = useServerFn(getReport);
	const [draft, setDraft] = (0, import_react.useState)(null);
	const [query, setQuery] = (0, import_react.useState)("");
	async function openEditor(record) {
		if (!record.id) {
			setDraft(structuredClone(record));
			return;
		}
		try {
			setDraft(await fetchOne({ data: { id: record.id } }));
		} catch (error) {
			toast.error(error instanceof Error ? error.message : "Could not load report");
			setDraft(structuredClone(record));
		}
	}
	const invalidate = async () => {
		await queryClient.invalidateQueries({ queryKey: ["admin-reports"] });
		await queryClient.invalidateQueries({ queryKey: ["site-content"] });
		await queryClient.invalidateQueries({ queryKey: ["admin-overview"] });
	};
	const saveMutation = useMutation({
		mutationFn: (record) => save({ data: record }),
		onSuccess: async () => {
			toast.success("Report saved", { description: "Published reports are live immediately." });
			await invalidate();
			setDraft(null);
		},
		onError: (error) => toast.error(error instanceof Error ? error.message : "Could not save")
	});
	const deleteMutation = useMutation({
		mutationFn: (id) => remove({ data: { id } }),
		onSuccess: async () => {
			toast.success("Report deleted");
			await invalidate();
			setDraft(null);
		},
		onError: (error) => toast.error(error instanceof Error ? error.message : "Could not delete")
	});
	const items = (0, import_react.useMemo)(() => {
		const all = list.data ?? [];
		const q = query.trim().toLowerCase();
		if (!q) return all;
		return all.filter((r) => r.title.toLowerCase().includes(q) || r.asset.toLowerCase().includes(q) || r.market.toLowerCase().includes(q));
	}, [list.data, query]);
	if (draft) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReportEditor, {
		record: draft,
		onChange: setDraft,
		onBack: () => setDraft(null),
		onSave: () => saveMutation.mutate(draft),
		onDelete: draft.id ? () => deleteMutation.mutate(draft.id) : void 0,
		busy: saveMutation.isPending || deleteMutation.isPending
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminSectionHeader, {
			title: "Weekly reports",
			description: "Create, publish, edit and delete weekly market reports with cover images, charts and PDFs.",
			actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				className: adminBtnPrimary,
				onClick: () => setDraft(emptyReport()),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-3.5 w-3.5" }), " New report"]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-6",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminSearch, {
				value: query,
				onChange: setQuery,
				placeholder: "Search title, asset, market…"
			})
		}),
		list.isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminPanelSkeleton, {}) : list.isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminErrorState, {
			message: list.error instanceof Error ? list.error.message : "Could not load reports.",
			onRetry: () => list.refetch()
		}) : items.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminEmptyState, {
			title: query ? "No matches" : "No reports yet",
			description: query ? "Try a different search term." : "The Weekly Reports section appears on the site as soon as you publish one.",
			action: !query ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				className: adminBtnPrimary,
				onClick: () => setDraft(emptyReport()),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-3.5 w-3.5" }), " New report"]
			}) : void 0
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminListShell, { children: items.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AdminListRow, {
			onClick: () => openEditor(r),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "min-w-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "flex flex-wrap items-center gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "num text-xs text-muted-foreground",
							children: r.date
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminBadge, { children: r.market }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminBadge, {
							variant: r.published ? "default" : "muted",
							children: r.published ? "Published" : "Draft"
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "mt-2 block truncate text-sm font-semibold",
					children: r.title
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "num text-xs text-muted-foreground",
				children: r.asset || "—"
			})]
		}, r.id)) })
	] });
}
function ReportEditor({ record, onChange, onBack, onSave, onDelete, busy }) {
	const set = (key, value) => onChange({
		...record,
		[key]: value
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-wrap items-center justify-between gap-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			onClick: onBack,
			className: "inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-4 w-4" }), " All reports"]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-wrap gap-2",
			children: [
				onDelete ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					className: adminBtn,
					disabled: busy,
					onClick: onDelete,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-3.5 w-3.5" }), " Delete"]
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: adminBtn,
					disabled: busy,
					onClick: () => onChange({
						...record,
						published: false
					}),
					children: "Save as draft"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					className: adminBtnPrimary,
					disabled: busy,
					onClick: onSave,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Save, { className: "h-3.5 w-3.5" }),
						" ",
						busy ? "Saving…" : "Save"
					]
				})
			]
		})]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mt-8 grid gap-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-5 border border-border bg-card p-6 sm:grid-cols-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "block sm:col-span-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "eyebrow",
							children: "Report title"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: record.title,
							onChange: (e) => {
								const title = e.target.value;
								onChange({
									...record,
									title,
									slug: record.slug ? record.slug : slugify(title)
								});
							},
							className: adminInput
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "block",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "eyebrow",
							children: "Slug (URL)"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: record.slug,
							onChange: (e) => set("slug", slugify(e.target.value)),
							className: adminInput
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "block",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "eyebrow",
							children: "Week label"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: record.weekLabel,
							onChange: (e) => set("weekLabel", e.target.value),
							placeholder: "Week 24 · 2026",
							className: adminInput
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "block",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "eyebrow",
							children: "Asset name"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: record.asset,
							onChange: (e) => set("asset", e.target.value),
							placeholder: "BTCUSD",
							className: adminInput
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "block",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "eyebrow",
							children: "Market category"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
							value: record.market,
							onChange: (e) => set("market", e.target.value),
							className: adminInput,
							children: marketOptions.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: m,
								children: m
							}, m))
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "block",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "eyebrow",
							children: "Publish date"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "date",
							value: record.date,
							onChange: (e) => set("date", e.target.value),
							className: `${adminInput} num`
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "block",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "eyebrow",
							children: "TradingView link (optional)"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: record.tradingviewUrl,
							onChange: (e) => set("tradingviewUrl", e.target.value),
							placeholder: "https://www.tradingview.com/chart/…",
							className: adminInput
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex flex-wrap gap-3 sm:col-span-2",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "flex items-center gap-3 border border-border bg-background px-4 py-2.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "checkbox",
								checked: record.published,
								onChange: (e) => set("published", e.target.checked),
								className: "h-4 w-4 accent-emerald"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "eyebrow",
								children: "Published"
							})]
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-5 border border-border bg-card p-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "block",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "eyebrow",
							children: "Short description (cards & meta)"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
							rows: 3,
							value: record.summary,
							onChange: (e) => set("summary", e.target.value),
							className: `${adminInput} resize-y`
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "block",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "eyebrow",
							children: "Full description"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
							rows: 10,
							value: record.body,
							onChange: (e) => set("body", e.target.value),
							className: `${adminInput} resize-y`
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldControl, {
						field: {
							name: "tags",
							label: "Tags",
							type: "stringList"
						},
						value: record.tags,
						onChange: (next) => set("tags", next)
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-6 border border-border bg-card p-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImageUpload, {
						label: "Cover / hero image",
						value: record.coverImage,
						onChange: (url) => set("coverImage", url)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GalleryUpload, {
						label: "Chart & additional images",
						value: record.gallery,
						onChange: (urls) => set("gallery", urls)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileUpload, {
						label: "PDF attachment",
						value: record.pdfUrl,
						onChange: (url) => set("pdfUrl", url)
					})
				]
			})
		]
	})] });
}
function TradesManager() {
	const queryClient = useQueryClient();
	const fetchAll = useServerFn(listAllTrades);
	const save = useServerFn(saveTrade);
	const remove = useServerFn(deleteTrade);
	const importCsv = useServerFn(importTradesFromCsv);
	const fetchOne = useServerFn(getTrade);
	const fetchMetrics = useServerFn(getJournalMetrics);
	const list = useQuery({
		queryKey: ["admin-trades"],
		queryFn: () => fetchAll(),
		...liveQueryOptions
	});
	const metrics = useQuery({
		queryKey: ["admin-journal-metrics"],
		queryFn: () => fetchMetrics(),
		...liveQueryOptions
	});
	const [draft, setDraft] = (0, import_react.useState)(null);
	const [replaceSynced, setReplaceSynced] = (0, import_react.useState)(false);
	async function openEditor(record) {
		if (!record.id) {
			setDraft(structuredClone(record));
			return;
		}
		try {
			setDraft(await fetchOne({ data: { id: record.id } }));
		} catch (error) {
			toast.error(error instanceof Error ? error.message : "Could not load trade");
			setDraft(record);
		}
	}
	const saveMutation = useMutation({
		mutationFn: (record) => save({ data: {
			id: record.id,
			externalId: record.externalId,
			date: record.date,
			market: record.market,
			instrument: record.instrument,
			direction: record.direction,
			entry: record.entry,
			exit: record.exit,
			rMultiple: record.rMultiple,
			percentage: record.percentage,
			result: record.result,
			notes: record.notes,
			screenshot: record.screenshot,
			published: record.published
		} }),
		onSuccess: async () => {
			toast.success("Trade saved", { description: "Journal and equity curve update automatically." });
			await queryClient.invalidateQueries({ queryKey: ["admin-trades"] });
			await queryClient.invalidateQueries({ queryKey: ["admin-journal-metrics"] });
			await queryClient.invalidateQueries({ queryKey: ["published-trades"] });
			await queryClient.invalidateQueries({ queryKey: ["admin-overview"] });
			setDraft(null);
		},
		onError: (error) => toast.error(error instanceof Error ? error.message : "Could not save")
	});
	const deleteMutation = useMutation({
		mutationFn: (id) => remove({ data: { id } }),
		onSuccess: async () => {
			toast.success("Trade deleted");
			await queryClient.invalidateQueries({ queryKey: ["admin-trades"] });
			await queryClient.invalidateQueries({ queryKey: ["admin-journal-metrics"] });
			await queryClient.invalidateQueries({ queryKey: ["published-trades"] });
			await queryClient.invalidateQueries({ queryKey: ["admin-overview"] });
			setDraft(null);
		},
		onError: (error) => toast.error(error instanceof Error ? error.message : "Could not delete")
	});
	const importMutation = useMutation({
		mutationFn: (text) => importCsv({ data: {
			text,
			replaceExistingSynced: replaceSynced
		} }),
		onSuccess: async (result) => {
			toast.success("Transactions imported", { description: `${result.imported} rows synced to the public equity curve.` });
			await queryClient.invalidateQueries({ queryKey: ["admin-trades"] });
			await queryClient.invalidateQueries({ queryKey: ["admin-journal-metrics"] });
			await queryClient.invalidateQueries({ queryKey: ["published-trades"] });
			await queryClient.invalidateQueries({ queryKey: ["admin-overview"] });
		},
		onError: (error) => toast.error(error instanceof Error ? error.message : "Could not import transactions")
	});
	async function handleImport(file) {
		if (!file) return;
		const name = file.name.toLowerCase();
		if (name.endsWith(".xlsx") || name.endsWith(".xls")) {
			const XLSX = await import("../_libs/xlsx.mjs").then((n) => n.t);
			const workbook = XLSX.read(await file.arrayBuffer(), {
				type: "array",
				cellDates: true
			});
			const sheetName = workbook.SheetNames[0];
			const worksheet = sheetName ? workbook.Sheets[sheetName] : null;
			if (!worksheet) {
				toast.error("No worksheet found in that Excel file.");
				return;
			}
			importMutation.mutate(XLSX.utils.sheet_to_csv(worksheet));
			return;
		}
		importMutation.mutate(await file.text());
	}
	const items = (0, import_react.useMemo)(() => list.data ?? [], [list.data]);
	if (draft) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TradeEditor, {
		record: draft,
		onChange: setDraft,
		onBack: () => setDraft(null),
		onSave: () => saveMutation.mutate(draft),
		onDelete: draft.id ? () => deleteMutation.mutate(draft.id) : void 0,
		busy: saveMutation.isPending || deleteMutation.isPending
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminSectionHeader, {
			title: "Trading journal",
			description: "Add trades here — the public equity curve and metrics stay in sync.",
			actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
						href: "/transaction-template.xlsx",
						download: true,
						className: adminBtn,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "h-3.5 w-3.5" }), "Excel template"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: adminBtn,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileUp, { className: "h-3.5 w-3.5" }),
							"Import CSV",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "file",
								accept: ".xlsx,.xls,.csv,.tsv,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel,text/csv,text/tab-separated-values",
								className: "sr-only",
								disabled: importMutation.isPending,
								onChange: (event) => {
									handleImport(event.target.files?.[0]);
									event.currentTarget.value = "";
								}
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						className: adminBtnPrimary,
						onClick: () => setDraft(emptyTrade()),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-3.5 w-3.5" }), "New trade"]
					})
				]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-5 border border-border bg-card p-4",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-display text-sm font-semibold",
					children: "Excel transaction sync"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-xs leading-relaxed text-muted-foreground",
					children: "Export Excel as CSV/TSV with date, instrument, direction, entry, exit, r_multiple, percentage and optional external_id. Configure TRANSACTION_CSV_URL for automatic live-site sync; matching external_id rows update cleanly when imported."
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "flex items-center gap-2 text-xs text-muted-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "checkbox",
						checked: replaceSynced,
						onChange: (event) => setReplaceSynced(event.target.checked)
					}), "Replace existing synced rows"]
				})]
			})
		}),
		metrics.data ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-6 grid gap-3 border border-border bg-surface p-4 sm:grid-cols-2 lg:grid-cols-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
					label: "Total trades",
					value: String(metrics.data.totalTrades)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
					label: "Total R",
					value: `${metrics.data.totalR >= 0 ? "+" : ""}${metrics.data.totalR}R`
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
					label: "Win rate",
					value: `${metrics.data.winRate}%`
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
					label: "Avg R",
					value: `${metrics.data.avgR >= 0 ? "+" : ""}${metrics.data.avgR}R`
				})
			]
		}) : null,
		list.isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminPanelSkeleton, {}) : list.isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminErrorState, {
			message: list.error instanceof Error ? list.error.message : "Could not load trades.",
			onRetry: () => list.refetch()
		}) : items.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminEmptyState, {
			title: "No trades yet",
			description: "Add your first journal entry — published trades appear on the site equity curve.",
			action: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				className: adminBtnPrimary,
				onClick: () => setDraft(emptyTrade()),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-3.5 w-3.5" }), " New trade"]
			})
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-8 overflow-x-auto border border-border",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
				className: "w-full min-w-[640px] text-left text-sm",
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
							children: "R"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-4 py-3 font-medium",
							children: "Status"
						})
					] })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: items.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
					className: "cursor-pointer border-b border-border last:border-0 hover:bg-surface",
					onClick: () => openEditor(t),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "num px-4 py-3",
							children: t.date
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-4 py-3 font-medium",
							children: t.instrument
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-4 py-3",
							children: t.direction
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
							className: `num px-4 py-3 font-semibold ${t.rMultiple >= 0 ? "text-emerald" : "text-destructive"}`,
							children: [
								t.rMultiple >= 0 ? "+" : "",
								t.rMultiple,
								"R"
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-4 py-3",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminBadge, {
								variant: t.published ? "emerald" : "muted",
								children: t.published ? "Live" : "Draft"
							})
						})
					]
				}, t.id)) })]
			})
		})
	] });
}
function TradeEditor({ record, onChange, onBack, onSave, onDelete, busy }) {
	const set = (key, value) => onChange({
		...record,
		[key]: value
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-wrap items-center justify-between gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				className: adminBtn,
				onClick: onBack,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-3.5 w-3.5" }), "Back"]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap gap-2",
				children: [onDelete ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					className: adminBtn,
					disabled: busy,
					onClick: () => {
						if (confirm("Delete this trade?")) onDelete();
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-3.5 w-3.5" }), "Delete"]
				}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					className: adminBtnPrimary,
					disabled: busy,
					onClick: onSave,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Save, { className: "h-3.5 w-3.5" }), "Save trade"]
				})]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-8 grid gap-5 sm:grid-cols-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Date",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "date",
						className: adminInput,
						value: record.date,
						onChange: (e) => set("date", e.target.value)
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Asset / instrument",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						className: adminInput,
						value: record.instrument,
						onChange: (e) => set("instrument", e.target.value),
						placeholder: "BTC/USD"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "External sync ID",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						className: adminInput,
						value: record.externalId,
						onChange: (e) => set("externalId", e.target.value),
						placeholder: "Optional stable Excel row ID"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Market",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
						className: adminInput,
						value: record.market,
						onChange: (e) => set("market", e.target.value),
						children: [
							"Crypto",
							"Forex",
							"Stocks",
							"Commodities",
							"Indices"
						].map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: m }, m))
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Direction",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
						className: adminInput,
						value: record.direction,
						onChange: (e) => set("direction", e.target.value),
						children: ["Long", "Short"].map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: d }, d))
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Entry",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						className: adminInput,
						value: record.entry,
						onChange: (e) => set("entry", e.target.value)
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Exit",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						className: adminInput,
						value: record.exit,
						onChange: (e) => set("exit", e.target.value)
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "R multiple",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "number",
						step: "0.1",
						className: adminInput,
						value: record.rMultiple,
						onChange: (e) => set("rMultiple", Number(e.target.value))
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Profit / Loss %",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "number",
						step: "0.01",
						className: adminInput,
						value: record.percentage,
						onChange: (e) => set("percentage", Number(e.target.value))
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Result",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
						className: adminInput,
						value: record.result,
						onChange: (e) => set("result", e.target.value),
						children: [
							"Win",
							"Loss",
							"Breakeven"
						].map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: r }, r))
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Published",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
						className: adminInput,
						value: record.published ? "yes" : "no",
						onChange: (e) => set("published", e.target.value === "yes"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "yes",
							children: "Yes — show on site"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "no",
							children: "No — draft only"
						})]
					})
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
			label: "Notes",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
				className: `${adminInput} min-h-28 resize-y`,
				value: record.notes,
				onChange: (e) => set("notes", e.target.value)
			})
		})
	] });
}
function Metric({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "eyebrow text-[0.6rem]",
		children: label
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "num mt-1 text-lg font-semibold",
		children: value
	})] });
}
function Field({ label, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "block",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "eyebrow",
			children: label
		}), children]
	});
}
createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).validator((input) => objectType({
	id: stringType().min(1),
	source: enumType(["contact_submissions", "inquiries"])
}).parse(input)).handler(createSsrRpc("1bbf30938f831ca1e7acc6f117fcde17852061fced64f59db3fc28b066788cc2"));
var listContactSubmissions = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).handler(createSsrRpc("d15ac474637baf51ea6548395bd797309cafccebe1cb9e28f81eeaf44414e5d1"));
var deleteContactSubmission = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).validator((input) => objectType({
	id: stringType().min(1),
	source: enumType(["contact_submissions", "inquiries"])
}).parse(input)).handler(createSsrRpc("975b1daffc51ca31d2b300fcad05e8a26f0291543d18829b57ff4704882f6e8d"));
var markInquiryHandled = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).validator((input) => objectType({
	id: stringType().min(1),
	handled: booleanType()
}).parse(input)).handler(createSsrRpc("78f36eb65f17a04d3375b1b7bed4902656dec9f3873128ccc1c147a4e2d00102"));
function ContactInbox() {
	const queryClient = useQueryClient();
	const fetchAll = useServerFn(listContactSubmissions);
	const remove = useServerFn(deleteContactSubmission);
	const toggleHandled = useServerFn(markInquiryHandled);
	const list = useQuery({
		queryKey: ["admin-contact-inbox"],
		queryFn: () => fetchAll(),
		...liveQueryOptions
	});
	const [query, setQuery] = (0, import_react.useState)("");
	const invalidate = async () => {
		await queryClient.invalidateQueries({ queryKey: ["admin-contact-inbox"] });
		await queryClient.invalidateQueries({ queryKey: ["admin-overview"] });
	};
	const deleteMutation = useMutation({
		mutationFn: (item) => remove({ data: {
			id: item.id,
			source: item.source
		} }),
		onSuccess: async () => {
			toast.success("Enquiry removed");
			await invalidate();
		},
		onError: (error) => toast.error(error instanceof Error ? error.message : "Could not delete")
	});
	const handledMutation = useMutation({
		mutationFn: ({ id, handled }) => toggleHandled({ data: {
			id,
			handled
		} }),
		onSuccess: invalidate,
		onError: (error) => toast.error(error instanceof Error ? error.message : "Could not update")
	});
	const items = (0, import_react.useMemo)(() => {
		const all = list.data ?? [];
		const q = query.trim().toLowerCase();
		if (!q) return all;
		return all.filter((item) => item.name.toLowerCase().includes(q) || item.email.toLowerCase().includes(q) || item.message.toLowerCase().includes(q) || (item.topic?.toLowerCase().includes(q) ?? false));
	}, [list.data, query]);
	const unhandled = (0, import_react.useMemo)(() => (list.data ?? []).filter((i) => i.source === "inquiries" && !i.handled).length, [list.data]);
	if (list.isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminInboxSkeleton, {});
	if (list.isError) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminSectionHeader, { title: "Contact inbox" }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminErrorState, {
			message: list.error instanceof Error ? list.error.message : "Could not load enquiries.",
			onRetry: () => list.refetch()
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mt-4 text-sm text-muted-foreground",
			children: [
				"Run",
				" ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
					className: "rounded bg-surface px-1.5 py-0.5 text-xs",
					children: "supabase/migrations/20260802103000_contact_submissions_and_links.sql"
				}),
				" ",
				"in the Supabase SQL Editor, then refresh."
			]
		})
	] });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminSectionHeader, {
			title: "Contact inbox",
			description: "Form submissions saved to the database. Email delivery also requires WEB3FORMS_ACCESS_KEY in server env.",
			actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "num text-sm text-muted-foreground",
				children: [
					list.data?.length ?? 0,
					" total",
					unhandled > 0 ? ` · ${unhandled} unhandled` : ""
				]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-6",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminSearch, {
				value: query,
				onChange: setQuery,
				placeholder: "Search name, email, message…"
			})
		}),
		items.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminEmptyState, {
			title: query ? "No matches" : "No enquiries yet",
			description: query ? "Try a different search term." : "Submissions appear here once the contact migration is applied and someone uses the form."
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "mt-8 grid gap-3",
			children: items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "border border-border bg-card p-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-start justify-between gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-semibold",
									children: item.name
								}), item.source === "inquiries" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminBadge, {
									variant: item.handled ? "muted" : "warn",
									children: item.handled ? "Handled" : "New"
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminBadge, { children: "Contact form" })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
								href: `mailto:${item.email}`,
								className: "mt-1 inline-flex items-center gap-1.5 text-sm text-emerald hover:underline",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "h-3.5 w-3.5" }), item.email]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-2 num text-xs text-muted-foreground",
								children: [
									item.createdAt ? format(new Date(item.createdAt), "d MMM yyyy · HH:mm") : "—",
									item.topic ? ` · ${item.topic}` : "",
									item.organisation ? ` · ${item.organisation}` : ""
								]
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap gap-2",
						children: [item.source === "inquiries" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: adminBtn,
							disabled: handledMutation.isPending,
							onClick: () => handledMutation.mutate({
								id: item.id,
								handled: !item.handled
							}),
							children: item.handled ? "Mark new" : "Mark handled"
						}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							className: adminBtn,
							disabled: deleteMutation.isPending,
							onClick: () => {
								if (!window.confirm(`Delete this message from ${item.name}? This cannot be undone.`)) return;
								deleteMutation.mutate(item);
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-3.5 w-3.5" }), " Delete"]
						})]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 whitespace-pre-wrap text-sm leading-relaxed text-muted-foreground",
					children: item.message
				})]
			}, `${item.source}-${item.id}`))
		})
	] });
}
function AdminOverview({ onNavigate, enabled = true }) {
	const fetchOverview = useServerFn(getAdminOverview);
	const { data, isLoading, isError, error, refetch, isFetching } = useQuery({
		queryKey: ["admin-overview"],
		queryFn: () => fetchOverview(),
		enabled,
		...liveQueryOptions
	});
	if (isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminPanelSkeleton, {});
	if (isError || !data) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminErrorState, {
		message: error instanceof Error ? error.message : "Could not load dashboard stats.",
		onRetry: () => refetch()
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminSectionHeader, {
			title: "Overview",
			description: "Live snapshot from your database — analyses, reports, journal trades and contact enquiries.",
			actions: isFetching ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "eyebrow text-[0.6rem] text-muted-foreground",
				children: "Syncing…"
			}) : null
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminStatCard, {
					label: "Analyses",
					value: data.analyses.total,
					detail: `${data.analyses.published} live · ${data.analyses.drafts} drafts`,
					onClick: () => onNavigate("analyses-db")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminStatCard, {
					label: "Weekly reports",
					value: data.reports.total,
					detail: `${data.reports.published} published`,
					onClick: () => onNavigate("reports-db")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminStatCard, {
					label: "Journal trades",
					value: data.trades.total,
					detail: `${data.trades.published} on site`,
					onClick: () => onNavigate("trades-db")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminStatCard, {
					label: "Contact inbox",
					value: data.contacts.total,
					detail: data.contacts.unhandled > 0 ? `${data.contacts.unhandled} need attention` : "All caught up",
					onClick: () => onNavigate("contact-inbox")
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-10 grid gap-6 lg:grid-cols-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AdminCard, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-sm font-semibold",
						children: "Recent analyses"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => onNavigate("analyses-db"),
						className: "inline-flex items-center gap-1 text-xs font-semibold text-emerald hover:underline",
						children: ["View all ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { className: "h-3.5 w-3.5" })]
					})]
				}), data.recentAnalyses.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 text-sm text-muted-foreground",
					children: "No analyses in the database yet."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-4 grid gap-px border border-border bg-border",
					children: data.recentAnalyses.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "bg-surface px-4 py-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap items-center gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "num text-xs text-muted-foreground",
									children: a.date
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminBadge, {
									variant: a.published ? "emerald" : "muted",
									children: a.published ? "Live" : "Draft"
								}),
								a.pair ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminBadge, { children: a.pair }) : null
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1.5 truncate text-sm font-medium",
							children: a.title
						})]
					}, a.id))
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AdminCard, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-sm font-semibold",
						children: "Recent enquiries"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => onNavigate("contact-inbox"),
						className: "inline-flex items-center gap-1 text-xs font-semibold text-emerald hover:underline",
						children: ["Inbox ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "h-3.5 w-3.5" })]
					})]
				}), data.recentContacts.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 text-sm text-muted-foreground",
					children: "No contact submissions yet."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-4 grid gap-px border border-border bg-border",
					children: data.recentContacts.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "bg-surface px-4 py-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm font-medium",
								children: c.name
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-0.5 text-xs text-emerald",
								children: c.email
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-1 num text-xs text-muted-foreground",
								children: [c.createdAt ? format(new Date(c.createdAt), "d MMM yyyy · HH:mm") : "—", c.topic ? ` · ${c.topic}` : ""]
							})
						]
					}, c.id))
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AdminCard, {
					className: "lg:col-span-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display text-sm font-semibold",
							children: "Latest journal entries"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => onNavigate("trades-db"),
							className: "inline-flex items-center gap-1 text-xs font-semibold text-emerald hover:underline",
							children: ["Journal ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingUp, { className: "h-3.5 w-3.5" })]
						})]
					}), data.recentTrades.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 text-sm text-muted-foreground",
						children: "No trades logged yet."
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-4 overflow-x-auto border border-border",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
							className: "w-full min-w-[480px] text-left text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
								className: "border-b border-border bg-surface font-mono text-[0.65rem] uppercase tracking-[0.14em] text-muted-foreground",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "px-4 py-2.5 font-medium",
										children: "Date"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "px-4 py-2.5 font-medium",
										children: "Asset"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "px-4 py-2.5 font-medium",
										children: "R"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "px-4 py-2.5 font-medium",
										children: "Status"
									})
								] })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: data.recentTrades.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
								className: "border-b border-border last:border-0",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "num px-4 py-2.5 text-muted-foreground",
										children: t.date
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-4 py-2.5 font-medium",
										children: t.instrument
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
										className: `num px-4 py-2.5 font-semibold ${t.rMultiple >= 0 ? "text-emerald" : "text-destructive"}`,
										children: [
											t.rMultiple >= 0 ? "+" : "",
											t.rMultiple,
											"R"
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-4 py-2.5",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminBadge, {
											variant: t.published ? "emerald" : "muted",
											children: t.published ? "Live" : "Draft"
										})
									})
								]
							}, t.id)) })]
						})
					})]
				})
			]
		})
	] });
}
function buildAdminNav(cmsSections, badges) {
	return [
		{
			title: "Dashboard",
			items: [{
				key: "overview",
				label: "Overview"
			}]
		},
		{
			title: "Research & journal",
			items: [
				{
					key: "analyses-db",
					label: "Analyses"
				},
				{
					key: "reports-db",
					label: "Weekly reports"
				},
				{
					key: "trades-db",
					label: "Trading journal"
				}
			]
		},
		{
			title: "Inbox",
			items: [{
				key: "contact-inbox",
				label: "Contact inbox",
				badge: badges?.contacts
			}]
		},
		{
			title: "Site content",
			items: cmsSections.map((s) => ({
				key: s.key,
				label: s.label
			}))
		}
	];
}
function AdminSidebar({ groups, activeKey, onSelect }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
		className: "lg:sticky lg:top-28 lg:self-start",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid gap-6",
			children: groups.map((group) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "eyebrow text-[0.6rem]",
				children: group.title
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-3 grid gap-px border border-border bg-border",
				children: group.items.map((item) => {
					const active = item.key === activeKey;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => onSelect(item.key),
						className: cn("flex w-full items-center justify-between gap-2 bg-card px-4 py-3 text-left text-sm transition-colors hover:text-emerald", active && "bg-surface font-semibold text-emerald"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: item.label }), item.badge && item.badge > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "num flex h-5 min-w-5 items-center justify-center bg-navy px-1.5 text-[0.65rem] font-semibold text-navy-foreground",
							children: item.badge > 99 ? "99+" : item.badge
						}) : null]
					}) }, item.key);
				})
			})] }, group.title))
		})
	});
}
function AdminPage() {
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	const fetchContent = useServerFn(getAdminSiteContent);
	const fetchSection = useServerFn(getSiteContentSection);
	const fetchStatus = useServerFn(getAdminStatus);
	const fetchOverview = useServerFn(getAdminOverview);
	const save = useServerFn(saveSiteContentSection);
	const reset = useServerFn(resetSiteContentSection);
	const status = useQuery({
		queryKey: ["admin-status"],
		queryFn: () => fetchStatus(),
		...liveQueryOptions
	});
	const content = useQuery({
		queryKey: ["site-content"],
		queryFn: () => fetchContent(),
		...liveQueryOptions
	});
	const overview = useQuery({
		queryKey: ["admin-overview"],
		queryFn: () => fetchOverview(),
		enabled: status.data?.isAdmin === true,
		...liveQueryOptions
	});
	const [activeKey, setActiveKey] = (0, import_react.useState)("overview");
	const [draft, setDraft] = (0, import_react.useState)(null);
	const isCmsSection = activeKey !== "overview" && activeKey !== "analyses-db" && activeKey !== "reports-db" && activeKey !== "trades-db" && activeKey !== "contact-inbox";
	const sectionQuery = useQuery({
		queryKey: ["admin-cms-section", activeKey],
		queryFn: () => fetchSection({ data: { key: activeKey } }),
		enabled: isCmsSection && status.data?.isAdmin === true,
		...liveQueryOptions
	});
	const section = (0, import_react.useMemo)(() => adminSections.find((s) => s.key === activeKey), [activeKey]);
	const savedJson = (0, import_react.useMemo)(() => {
		if (!section) return "";
		const fromBulk = content.data?.[activeKey];
		const source = sectionQuery.data ?? fromBulk;
		if (source === void 0) return "";
		return JSON.stringify(source);
	}, [
		content.data,
		sectionQuery.data,
		activeKey,
		section
	]);
	const isDirty = (0, import_react.useMemo)(() => {
		if (!section || draft === null) return false;
		return JSON.stringify(draft) !== savedJson;
	}, [
		draft,
		savedJson,
		section
	]);
	(0, import_react.useEffect)(() => {
		if (!isCmsSection) return;
		if (sectionQuery.data === void 0) return;
		setDraft(structuredClone(sectionQuery.data));
	}, [
		sectionQuery.data,
		activeKey,
		isCmsSection
	]);
	(0, import_react.useEffect)(() => {
		if (!isDirty) return;
		const onBeforeUnload = (e) => {
			e.preventDefault();
			e.returnValue = "";
		};
		window.addEventListener("beforeunload", onBeforeUnload);
		return () => window.removeEventListener("beforeunload", onBeforeUnload);
	}, [isDirty]);
	const saveMutation = useMutation({
		mutationFn: () => save({ data: {
			key: activeKey,
			data: draft
		} }),
		onSuccess: async () => {
			toast.success(`${section?.label ?? "Section"} saved`, { description: "The live site is updated." });
			await queryClient.invalidateQueries({ queryKey: ["site-content"] });
			await queryClient.invalidateQueries({ queryKey: ["admin-cms-section", activeKey] });
			await queryClient.invalidateQueries({ queryKey: ["admin-overview"] });
		},
		onError: (error) => toast.error(error instanceof Error ? error.message : "Could not save changes")
	});
	const resetMutation = useMutation({
		mutationFn: () => reset({ data: { key: activeKey } }),
		onSuccess: async () => {
			setDraft(structuredClone(defaultSiteContent[activeKey]));
			toast.success(`${section?.label ?? "Section"} restored to defaults`);
			await queryClient.invalidateQueries({ queryKey: ["site-content"] });
			await queryClient.invalidateQueries({ queryKey: ["admin-cms-section", activeKey] });
		},
		onError: (error) => toast.error(error instanceof Error ? error.message : "Could not restore defaults")
	});
	async function signOut() {
		await queryClient.cancelQueries();
		queryClient.clear();
		await supabase.auth.signOut();
		navigate({
			to: "/auth",
			replace: true
		});
	}
	const navGroups = buildAdminNav(adminSections, { contacts: overview.data?.contacts.unhandled });
	if (status.isLoading || content.isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminDashboardSkeleton, {});
	if (status.isError) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto w-[min(1320px,94vw)] py-28",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "text-2xl font-semibold tracking-[-0.02em]",
			children: "Admin unavailable"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminErrorState, {
			message: status.error instanceof Error ? status.error.message : "Could not verify admin access.",
			onRetry: () => status.refetch()
		})]
	});
	if (!status.data?.isAdmin) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto w-[min(1320px,94vw)] py-28",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-2xl font-semibold tracking-[-0.02em]",
				children: "No editor access"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 max-w-lg text-sm text-muted-foreground",
				children: status.data?.message ?? "This account is signed in but is not an admin. Sign out and use the site owner account, or ask them to add your user to user_roles in Supabase."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: signOut,
				className: `${adminBtnPrimary} mt-8`,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "h-3.5 w-3.5" }), " Sign out"]
			})
		]
	});
	const email = status.data?.email ?? overview.data?.email ?? "";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
			className: "border-b border-border bg-surface/80 backdrop-blur-sm",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto flex w-[min(1320px,94vw)] flex-wrap items-center justify-between gap-4 py-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "eyebrow",
					children: "Chart Analyst"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm font-semibold",
					children: "Content admin"
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center gap-3",
					children: [
						email ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "num hidden text-xs text-muted-foreground sm:inline",
							children: email
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							href: "/",
							target: "_blank",
							rel: "noreferrer",
							className: adminBtn,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "h-3.5 w-3.5" }), " View site"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: signOut,
							className: adminBtn,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "h-3.5 w-3.5" }), " Sign out"]
						})
					]
				})]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
			className: "mx-auto w-[min(1320px,94vw)] py-10 lg:py-14",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "border-b border-border pb-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-3xl font-semibold tracking-[-0.03em] sm:text-4xl",
					children: "Manage your website"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground",
					children: "Everything saves to your live database. Published research, journal trades and contact enquiries sync to the public site automatically."
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-10 grid gap-8 lg:grid-cols-[240px_1fr]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminSidebar, {
					groups: navGroups,
					activeKey,
					onSelect: setActiveKey
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
					className: "min-w-0",
					children: activeKey === "overview" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminOverview, {
						enabled: true,
						onNavigate: setActiveKey
					}) : activeKey === "reports-db" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReportsManager, {}) : activeKey === "trades-db" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TradesManager, {}) : activeKey === "contact-inbox" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ContactInbox, {}) : activeKey === "analyses-db" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnalysesManager, {}) : section ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CmsSectionEditor, {
						section,
						draft,
						onDraftChange: setDraft,
						isDirty,
						onSave: () => saveMutation.mutate(),
						onReset: () => resetMutation.mutate(),
						saving: saveMutation.isPending,
						resetting: resetMutation.isPending
					}) : null
				})]
			})]
		})]
	});
}
function CmsSectionEditor({ section, draft, onDraftChange, isDirty, onSave, onReset, saving, resetting }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-wrap items-end justify-between gap-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-xl font-semibold tracking-[-0.02em]",
				children: section.label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1.5 text-sm text-muted-foreground",
				children: section.blurb
			}),
			isDirty ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-xs font-medium text-amber-800",
				children: "Unsaved changes"
			}) : null
		] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: onReset,
				disabled: resetting,
				className: adminBtn,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { className: "h-3.5 w-3.5" }), " Restore defaults"]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: onSave,
				disabled: saving || draft === null || !isDirty,
				className: adminBtnPrimary,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Save, { className: "h-3.5 w-3.5" }), saving ? "Saving…" : "Save changes"]
			})]
		})]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mt-8 grid gap-8",
		children: draft === null ? null : section.kind === "list" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldControl, {
			field: {
				name: section.key,
				label: section.itemLabel,
				type: "objectList",
				fields: section.fields
			},
			value: draft,
			onChange: onDraftChange
		}) : section.groups.map((group) => {
			const groupValue = draft[group.name] ?? {};
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "border border-border bg-card p-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "font-display text-base font-semibold",
					children: group.label
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6 grid gap-5",
					children: group.fields.map((field) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldControl, {
						field,
						value: groupValue[field.name],
						onChange: (next) => onDraftChange({
							...draft,
							[group.name]: {
								...groupValue,
								[field.name]: next
							}
						})
					}, field.name))
				})]
			}, group.name);
		})
	})] });
}
//#endregion
export { AdminPage as component };
