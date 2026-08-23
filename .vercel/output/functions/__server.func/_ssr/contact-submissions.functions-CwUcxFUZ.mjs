import { c as createServerFn } from "./createServerFn-CIHAFgYl.mjs";
import { t as requireSupabaseAuth } from "./auth-middleware-tiFBA43n.mjs";
import { It as objectType, Lt as stringType, Nt as booleanType, Pt as enumType } from "../_libs/@ai-sdk/gateway+[...].mjs";
import { t as createServerRpc } from "./createServerRpc-B90ckaqP.mjs";
import { n as ensureAdminAccess, r as loadAdminDb, t as adminContextFromHandler } from "./admin-guard-XTZOa6XH.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/contact-submissions.functions-CwUcxFUZ.js
function fromContactRow(row) {
	return {
		id: String(row.id ?? ""),
		name: String(row.name ?? ""),
		email: String(row.email ?? ""),
		organisation: String(row.organisation ?? ""),
		topic: String(row.topic ?? ""),
		message: String(row.message ?? ""),
		createdAt: String(row.created_at ?? ""),
		source: "contact_submissions"
	};
}
function fromInquiryRow(row) {
	const message = String(row.message ?? "");
	const topicMatch = message.match(/^\[([^\]]+)\]\n\n/);
	return {
		id: String(row.id ?? ""),
		name: String(row.name ?? ""),
		email: String(row.email ?? ""),
		organisation: String(row.organization ?? ""),
		topic: topicMatch?.[1] ?? "",
		message: topicMatch ? message.replace(topicMatch[0], "") : message,
		createdAt: String(row.created_at ?? ""),
		source: "inquiries",
		handled: Boolean(row.handled)
	};
}
async function assertAdmin(context) {
	await ensureAdminAccess(adminContextFromHandler(context));
}
/** Single contact submission — admin only. */
var getContactSubmission_createServerFn_handler = createServerRpc({
	id: "1bbf30938f831ca1e7acc6f117fcde17852061fced64f59db3fc28b066788cc2",
	name: "getContactSubmission",
	filename: "src/lib/contact-submissions.functions.ts"
}, (opts) => getContactSubmission.__executeServer(opts));
var getContactSubmission = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).validator((input) => objectType({
	id: stringType().min(1),
	source: enumType(["contact_submissions", "inquiries"])
}).parse(input)).handler(getContactSubmission_createServerFn_handler, async ({ data, context }) => {
	const ctx = adminContextFromHandler(context);
	await assertAdmin(context);
	const { data: row, error } = await (await loadAdminDb(ctx)).from(data.source).select("*").eq("id", data.id).maybeSingle();
	if (error) throw new Error(error.message);
	if (!row) throw new Error("Submission not found");
	return data.source === "contact_submissions" ? fromContactRow(row) : fromInquiryRow(row);
});
var listContactSubmissions_createServerFn_handler = createServerRpc({
	id: "d15ac474637baf51ea6548395bd797309cafccebe1cb9e28f81eeaf44414e5d1",
	name: "listContactSubmissions",
	filename: "src/lib/contact-submissions.functions.ts"
}, (opts) => listContactSubmissions.__executeServer(opts));
var listContactSubmissions = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).handler(listContactSubmissions_createServerFn_handler, async ({ context }) => {
	const ctx = adminContextFromHandler(context);
	await assertAdmin(context);
	const db = await loadAdminDb(ctx);
	const [primary, fallback] = await Promise.all([db.from("contact_submissions").select("*").order("created_at", { ascending: false }), db.from("inquiries").select("*").order("created_at", { ascending: false })]);
	const items = [];
	if (!primary.error && primary.data) items.push(...primary.data.map((row) => fromContactRow(row)));
	if (!fallback.error && fallback.data) items.push(...fallback.data.map((row) => fromInquiryRow(row)));
	if (primary.error && fallback.error) throw new Error(primary.error.message || "Contact inbox tables are not ready. Run the contact migration in Supabase SQL Editor.");
	return items.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
});
var deleteContactSubmission_createServerFn_handler = createServerRpc({
	id: "975b1daffc51ca31d2b300fcad05e8a26f0291543d18829b57ff4704882f6e8d",
	name: "deleteContactSubmission",
	filename: "src/lib/contact-submissions.functions.ts"
}, (opts) => deleteContactSubmission.__executeServer(opts));
var deleteContactSubmission = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).validator((input) => objectType({
	id: stringType().min(1),
	source: enumType(["contact_submissions", "inquiries"])
}).parse(input)).handler(deleteContactSubmission_createServerFn_handler, async ({ data, context }) => {
	const ctx = adminContextFromHandler(context);
	await ensureAdminAccess(ctx);
	const { data: removed, error } = await (await loadAdminDb(ctx)).from(data.source).delete().eq("id", data.id).select("id");
	if (error) throw new Error(error.message);
	if (!removed?.length) throw new Error("Nothing was deleted. Apply migration 20260804200000_admin_api_complete.sql in Lovable/Supabase.");
	return { ok: true };
});
var markInquiryHandled_createServerFn_handler = createServerRpc({
	id: "78f36eb65f17a04d3375b1b7bed4902656dec9f3873128ccc1c147a4e2d00102",
	name: "markInquiryHandled",
	filename: "src/lib/contact-submissions.functions.ts"
}, (opts) => markInquiryHandled.__executeServer(opts));
var markInquiryHandled = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).validator((input) => objectType({
	id: stringType().min(1),
	handled: booleanType()
}).parse(input)).handler(markInquiryHandled_createServerFn_handler, async ({ data, context }) => {
	const ctx = adminContextFromHandler(context);
	await ensureAdminAccess(ctx);
	const { data: updated, error } = await (await loadAdminDb(ctx)).from("inquiries").update({ handled: data.handled }).eq("id", data.id).select("id");
	if (error) throw new Error(error.message);
	if (!updated?.length) throw new Error("Inquiry not found or could not update.");
	return { ok: true };
});
//#endregion
export { deleteContactSubmission_createServerFn_handler, getContactSubmission_createServerFn_handler, listContactSubmissions_createServerFn_handler, markInquiryHandled_createServerFn_handler };
