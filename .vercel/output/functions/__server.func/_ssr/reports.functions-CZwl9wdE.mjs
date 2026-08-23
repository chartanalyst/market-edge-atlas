import { c as createServerFn } from "./createServerFn-CIHAFgYl.mjs";
import { t as requireSupabaseAuth } from "./auth-middleware-tiFBA43n.mjs";
import { a as withDummyReports, i as sortReports, r as reportFromRow, t as defaultReportRecords } from "./report-model-BUby-DFX.mjs";
import { Ft as numberType, It as objectType, Lt as stringType, Mt as arrayType, Nt as booleanType } from "../_libs/@ai-sdk/gateway+[...].mjs";
import { t as createServerRpc } from "./createServerRpc-B90ckaqP.mjs";
import { n as ensureAdminAccess, r as loadAdminDb, t as adminContextFromHandler } from "./admin-guard-XTZOa6XH.mjs";
import { t as createPublicSupabase } from "./content.server-BlV6eceY.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/reports.functions-CZwl9wdE.js
var reportSchema = objectType({
	id: stringType().max(60).optional().default(""),
	slug: stringType().trim().min(2).max(120).regex(/^[a-z0-9-]+$/, { message: "Slug can use lowercase letters, numbers and dashes only" }),
	title: stringType().trim().min(2).max(200),
	weekLabel: stringType().max(120).default(""),
	asset: stringType().max(120).default(""),
	market: stringType().max(60).default("Crypto"),
	date: stringType().max(30).default(""),
	summary: stringType().max(1200).default(""),
	body: stringType().max(2e4).default(""),
	coverImage: stringType().max(500).default(""),
	gallery: arrayType(stringType().max(500)).max(40).default([]),
	pdfUrl: stringType().max(500).default(""),
	tradingviewUrl: stringType().max(500).default(""),
	tags: arrayType(stringType().max(60)).max(30).default([]),
	published: booleanType().default(false),
	sortOrder: numberType().default(0)
});
/** Single report by id — admin only. */
var getReport_createServerFn_handler = createServerRpc({
	id: "f94af9ff2848f33902408ad62444f7a6c440f3877b3fc18040f0f190e1b42303",
	name: "getReport",
	filename: "src/lib/reports.functions.ts"
}, (opts) => getReport.__executeServer(opts));
var getReport = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).validator((input) => objectType({ id: stringType().min(1) }).parse(input)).handler(getReport_createServerFn_handler, async ({ data, context }) => {
	const ctx = adminContextFromHandler(context);
	await ensureAdminAccess(ctx);
	const { data: row, error } = await (await loadAdminDb(ctx)).from("weekly_reports").select("*").eq("id", data.id).maybeSingle();
	if (error) throw new Error(error.message);
	if (!row) throw new Error("Report not found");
	return reportFromRow(row);
});
var listPublishedReports_createServerFn_handler = createServerRpc({
	id: "ceda4c4a3fe3a694d4652253c0cc73856e7fc5338e2c6b1a3f4dd53936bfb744",
	name: "listPublishedReports",
	filename: "src/lib/reports.functions.ts"
}, (opts) => listPublishedReports.__executeServer(opts));
var listPublishedReports = createServerFn({ method: "GET" }).handler(listPublishedReports_createServerFn_handler, async () => {
	try {
		const { data, error } = await createPublicSupabase().from("weekly_reports").select("*").eq("published", true).order("sort_order", { ascending: true }).order("date", { ascending: false });
		if (error) throw new Error(error.message);
		if (data && data.length > 0) return sortReports(withDummyReports(data.map((row) => reportFromRow(row))));
	} catch {}
	return sortReports(withDummyReports(defaultReportRecords));
});
var listAllReports_createServerFn_handler = createServerRpc({
	id: "208a4969802407d37444b5fb338ef8c86f7ad6b22cd4f5f828cfaa97132cc034",
	name: "listAllReports",
	filename: "src/lib/reports.functions.ts"
}, (opts) => listAllReports.__executeServer(opts));
var listAllReports = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).handler(listAllReports_createServerFn_handler, async ({ context }) => {
	const ctx = adminContextFromHandler(context);
	await ensureAdminAccess(ctx);
	const { data, error } = await (await loadAdminDb(ctx)).from("weekly_reports").select("*").order("sort_order", { ascending: true }).order("date", { ascending: false });
	if (error) throw new Error(error.message);
	return (data ?? []).map((row) => reportFromRow(row));
});
var saveReport_createServerFn_handler = createServerRpc({
	id: "21239401c5e6beb119e6b4a0fc52e2c35b3a138f91e28c075ebf9322643e3c0b",
	name: "saveReport",
	filename: "src/lib/reports.functions.ts"
}, (opts) => saveReport.__executeServer(opts));
var saveReport = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).validator((input) => reportSchema.parse(input)).handler(saveReport_createServerFn_handler, async ({ data, context }) => {
	const ctx = adminContextFromHandler(context);
	await ensureAdminAccess(ctx);
	const db = await loadAdminDb(ctx);
	const payload = {
		slug: data.slug,
		title: data.title,
		week_label: data.weekLabel,
		asset: data.asset,
		market: data.market,
		date: data.date || (/* @__PURE__ */ new Date()).toISOString().slice(0, 10),
		summary: data.summary,
		body: data.body,
		cover_image: data.coverImage || null,
		gallery: data.gallery,
		pdf_url: data.pdfUrl || null,
		tradingview_url: data.tradingviewUrl || null,
		tags: data.tags,
		published: data.published,
		sort_order: data.sortOrder,
		updated_at: (/* @__PURE__ */ new Date()).toISOString()
	};
	if (data.id) {
		const { error } = await db.from("weekly_reports").update(payload).eq("id", data.id);
		if (error) throw new Error(error.message);
		return {
			ok: true,
			id: data.id
		};
	}
	const { data: inserted, error } = await db.from("weekly_reports").insert(payload).select("id").single();
	if (error) throw new Error(error.message);
	return {
		ok: true,
		id: inserted.id
	};
});
var deleteReport_createServerFn_handler = createServerRpc({
	id: "2938fc5f3b0f580e3cd6387f3d9503c67d7c8abf328ce27f2d963ccc80c350fc",
	name: "deleteReport",
	filename: "src/lib/reports.functions.ts"
}, (opts) => deleteReport.__executeServer(opts));
var deleteReport = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).validator((input) => objectType({ id: stringType().min(1) }).parse(input)).handler(deleteReport_createServerFn_handler, async ({ data, context }) => {
	const ctx = adminContextFromHandler(context);
	await ensureAdminAccess(ctx);
	const { error } = await (await loadAdminDb(ctx)).from("weekly_reports").delete().eq("id", data.id);
	if (error) throw new Error(error.message);
	return { ok: true };
});
//#endregion
export { deleteReport_createServerFn_handler, getReport_createServerFn_handler, listAllReports_createServerFn_handler, listPublishedReports_createServerFn_handler, saveReport_createServerFn_handler };
