import { o as require_jsx_runtime } from "../_libs/@ai-sdk/react+[...].mjs";
import { t as cn } from "./createSsrRpc-vr7yBYzy.mjs";
import { t as Bone } from "./analyses.functions-BviDkd_w.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/dashboard-skeleton-CjRAtChM.js
var import_jsx_runtime = require_jsx_runtime();
function AdminDashboardSkeleton() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto w-[min(1320px,94vw)] py-16 lg:py-24",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-wrap items-end justify-between gap-6 border-b border-border pb-8",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bone, { className: "h-3 w-24" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bone, { className: "h-10 w-full max-w-sm" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bone, { className: "h-4 w-full max-w-md" })
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bone, { className: "h-11 w-28" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bone, { className: "h-11 w-32" })]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-10 grid gap-8 lg:grid-cols-[260px_1fr]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
				className: "lg:sticky lg:top-28 lg:self-start",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bone, { className: "h-3 w-16" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-4 grid gap-px border border-border bg-border",
					children: Array.from({ length: 10 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
						className: "bg-card px-4 py-3",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bone, { className: cn("h-4", i === 0 ? "w-36" : "w-28") })
					}, i))
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "min-w-0",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminPanelSkeleton, {})
			})]
		})]
	});
}
/** Content panel skeleton (analyses, trades, CMS fields). */
function AdminPanelSkeleton() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-wrap items-end justify-between gap-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bone, { className: "h-6 w-48" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bone, { className: "h-4 w-full max-w-md" })]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bone, { className: "h-10 w-36" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bone, { className: "h-10 w-32" })]
		})]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mt-8 grid gap-4",
		children: Array.from({ length: 4 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "border border-border bg-card p-5",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-start justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0 flex-1 grid gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bone, { className: "h-4 w-full max-w-sm" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bone, { className: "h-3 w-24" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bone, { className: "h-3 w-full max-w-lg" })
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bone, { className: "h-9 w-9" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bone, { className: "h-9 w-9" })]
				})]
			})
		}, i))
	})] });
}
/** Auth sign-in page skeleton — matches restricted owner layout. */
function AuthPageSkeleton() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto flex min-h-[80vh] w-[min(460px,92vw)] flex-col justify-center py-28",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bone, { className: "h-3 w-28" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bone, { className: "mt-4 h-9 w-full max-w-xs" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bone, { className: "mt-3 h-4 w-full" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bone, { className: "mt-1 h-4 w-full max-w-[80%]" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-10 border border-border bg-card p-7",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bone, { className: "h-3 w-12" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bone, { className: "mt-2.5 h-11 w-full" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bone, { className: "mt-6 h-3 w-16" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bone, { className: "mt-2.5 h-11 w-full" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bone, { className: "mt-8 h-12 w-full" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bone, { className: "mx-auto mt-5 h-3 w-56" })
				]
			})
		]
	});
}
function AdminInboxSkeleton() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mt-8 grid gap-3",
		children: Array.from({ length: 5 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "border border-border bg-card p-5",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-start justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid flex-1 gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bone, { className: "h-4 w-48" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bone, { className: "h-3 w-32" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bone, { className: "h-4 w-full max-w-2xl" })
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bone, { className: "h-9 w-20" })]
			})
		}, i))
	});
}
//#endregion
export { AuthPageSkeleton as i, AdminInboxSkeleton as n, AdminPanelSkeleton as r, AdminDashboardSkeleton as t };
