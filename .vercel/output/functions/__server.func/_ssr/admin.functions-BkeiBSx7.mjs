import { c as createServerFn } from "./createServerFn-CIHAFgYl.mjs";
import { t as requireSupabaseAuth } from "./auth-middleware-tiFBA43n.mjs";
import { t as createServerRpc } from "./createServerRpc-B90ckaqP.mjs";
import { n as ensureAdminAccess, r as loadAdminDb, t as adminContextFromHandler } from "./admin-guard-XTZOa6XH.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.functions-BkeiBSx7.js
var getAdminStatus_createServerFn_handler = createServerRpc({
	id: "77265b60422ccd3fca55e66689775b583f1f9a8f66bbea850c2c67d32fad8080",
	name: "getAdminStatus",
	filename: "src/lib/admin.functions.ts"
}, (opts) => getAdminStatus.__executeServer(opts));
var getAdminStatus = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).handler(getAdminStatus_createServerFn_handler, async ({ context }) => {
	const ctx = adminContextFromHandler(context);
	const email = String(ctx.claims?.email ?? "").trim().toLowerCase();
	try {
		const { bootstrapped } = await ensureAdminAccess(ctx);
		return {
			isAdmin: true,
			bootstrapped,
			email
		};
	} catch (error) {
		const message = error instanceof Error ? error.message : "Could not verify admin access";
		if (message === "Forbidden") return {
			isAdmin: false,
			bootstrapped: false,
			email,
			message: null
		};
		return {
			isAdmin: false,
			bootstrapped: false,
			email,
			message
		};
	}
});
var getAdminOverview_createServerFn_handler = createServerRpc({
	id: "98193c088815d6bbdd4155ffbad4b125116e51df7ef81d3d6aef43156e028e01",
	name: "getAdminOverview",
	filename: "src/lib/admin.functions.ts"
}, (opts) => getAdminOverview.__executeServer(opts));
var getAdminOverview = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).handler(getAdminOverview_createServerFn_handler, async ({ context }) => {
	const ctx = adminContextFromHandler(context);
	await ensureAdminAccess(ctx);
	const email = String(ctx.claims?.email ?? "");
	const db = await loadAdminDb(ctx);
	const [analysesRes, reportsRes, tradesRes, contactRes, inquiryRes] = await Promise.all([
		db.from("analyses").select("id, title, date, published, featured, pair").order("date", { ascending: false }).limit(50),
		db.from("weekly_reports").select("id, published").order("date", { ascending: false }),
		db.from("trading_results").select("id, instrument, date, r_multiple, published").order("date", { ascending: false }).limit(50),
		db.from("contact_submissions").select("id, name, email, topic, created_at").order("created_at", { ascending: false }).limit(20),
		db.from("inquiries").select("id, name, email, message, handled, created_at").order("created_at", { ascending: false }).limit(20)
	]);
	const analyses = analysesRes.data ?? [];
	const reports = reportsRes.data ?? [];
	const trades = tradesRes.data ?? [];
	const contactRows = contactRes.data ?? [];
	const inquiryRows = inquiryRes.data ?? [];
	const unhandledInquiries = inquiryRows.filter((r) => !r.handled).length;
	const contactTotal = contactRows.length + inquiryRows.length;
	const recentContacts = [...contactRows.map((r) => ({
		id: r.id,
		name: r.name,
		email: r.email,
		createdAt: r.created_at,
		topic: r.topic || "Contact form"
	})), ...inquiryRows.map((r) => {
		const topicMatch = String(r.message ?? "").match(/^\[([^\]]+)\]/);
		return {
			id: r.id,
			name: r.name,
			email: r.email,
			createdAt: r.created_at,
			topic: topicMatch?.[1] ?? "Enquiry"
		};
	})].sort((a, b) => b.createdAt.localeCompare(a.createdAt)).slice(0, 5);
	return {
		email,
		analyses: {
			total: analyses.length,
			published: analyses.filter((a) => a.published).length,
			drafts: analyses.filter((a) => !a.published).length,
			featured: analyses.filter((a) => a.featured).length
		},
		reports: {
			total: reports.length,
			published: reports.filter((r) => r.published).length,
			drafts: reports.filter((r) => !r.published).length
		},
		trades: {
			total: trades.length,
			published: trades.filter((t) => t.published).length,
			drafts: trades.filter((t) => !t.published).length
		},
		contacts: {
			total: contactTotal,
			unhandled: contactRows.length + unhandledInquiries
		},
		recentAnalyses: analyses.slice(0, 5).map((a) => ({
			id: a.id,
			title: a.title,
			date: String(a.date ?? "").slice(0, 10),
			published: Boolean(a.published),
			pair: a.pair ?? ""
		})),
		recentContacts,
		recentTrades: trades.slice(0, 5).map((t) => ({
			id: t.id,
			instrument: t.instrument,
			date: String(t.date ?? "").slice(0, 10),
			rMultiple: Number(t.r_multiple ?? 0),
			published: Boolean(t.published)
		}))
	};
});
//#endregion
export { getAdminOverview_createServerFn_handler, getAdminStatus_createServerFn_handler };
