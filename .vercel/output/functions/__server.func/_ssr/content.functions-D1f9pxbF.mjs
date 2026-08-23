import { c as createServerFn } from "./createServerFn-CIHAFgYl.mjs";
import { t as requireSupabaseAuth } from "./auth-middleware-tiFBA43n.mjs";
import { n as mergeSiteContent, r as siteContentKeys, t as defaultSiteContent } from "./site-content-DBTeyB_P.mjs";
import { It as objectType, Lt as stringType, Rt as unknownType } from "../_libs/@ai-sdk/gateway+[...].mjs";
import { t as createServerRpc } from "./createServerRpc-B90ckaqP.mjs";
import { n as ensureAdminAccess, r as loadAdminDb, t as adminContextFromHandler } from "./admin-guard-XTZOa6XH.mjs";
import { t as createPublicSupabase } from "./content.server-BlV6eceY.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/content.functions-D1f9pxbF.js
var getSiteContent_createServerFn_handler = createServerRpc({
	id: "5628aaee3be8917371cf667f0fa9e02784073998033f9f5baa65a4e0d019656a",
	name: "getSiteContent",
	filename: "src/lib/content.functions.ts"
}, (opts) => getSiteContent.__executeServer(opts));
var getSiteContent = createServerFn({ method: "GET" }).handler(getSiteContent_createServerFn_handler, async () => {
	try {
		const supabase = createPublicSupabase();
		const [contentRes, analysisRes, reportRes] = await Promise.all([
			supabase.from("site_content").select("key, data"),
			supabase.from("analyses").select("*").eq("published", true).order("sort_order", { ascending: true }).order("date", { ascending: false }),
			supabase.from("weekly_reports").select("*").eq("published", true).order("sort_order", { ascending: true }).order("date", { ascending: false })
		]);
		return mergeSiteContent(contentRes.data, analysisRes.data, reportRes.data);
	} catch {
		return mergeSiteContent(null);
	}
});
var getAdminSiteContent_createServerFn_handler = createServerRpc({
	id: "1afe230200497e3ba7c31c4d34369a7b9b2e61288a38d04678e98fdfcc7f447b",
	name: "getAdminSiteContent",
	filename: "src/lib/content.functions.ts"
}, (opts) => getAdminSiteContent.__executeServer(opts));
var getAdminSiteContent = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).handler(getAdminSiteContent_createServerFn_handler, async ({ context }) => {
	await ensureAdminAccess(adminContextFromHandler(context));
	const db = await loadAdminDb(adminContextFromHandler(context));
	const [contentRes, analysisRes, reportRes] = await Promise.all([
		db.from("site_content").select("key, data"),
		db.from("analyses").select("*").order("sort_order", { ascending: true }).order("date", { ascending: false }),
		db.from("weekly_reports").select("*").order("sort_order", { ascending: true }).order("date", { ascending: false })
	]);
	return mergeSiteContent(contentRes.data, analysisRes.data, reportRes.data);
});
var getSiteContentSection_createServerFn_handler = createServerRpc({
	id: "baa8d6ac53fb66653a188d97c0a763c2d2d8d6d465daa58368805610c2017e94",
	name: "getSiteContentSection",
	filename: "src/lib/content.functions.ts"
}, (opts) => getSiteContentSection.__executeServer(opts));
var getSiteContentSection = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).validator((input) => objectType({ key: stringType().refine((k) => siteContentKeys.includes(k), { message: "Unknown content section" }) }).parse(input)).handler(getSiteContentSection_createServerFn_handler, async ({ data, context }) => {
	const ctx = adminContextFromHandler(context);
	await ensureAdminAccess(ctx);
	const { data: row, error } = await (await loadAdminDb(ctx)).from("site_content").select("key, data").eq("key", data.key).maybeSingle();
	if (error) throw new Error(error.message);
	if (row?.data) return row.data;
	return defaultSiteContent[data.key];
});
var saveSiteContentSection_createServerFn_handler = createServerRpc({
	id: "0b12e1539b8ca4b4de5b4b3e55b487c14be5e558f7aae22a33e24eb8ef12f880",
	name: "saveSiteContentSection",
	filename: "src/lib/content.functions.ts"
}, (opts) => saveSiteContentSection.__executeServer(opts));
var saveSiteContentSection = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).validator((input) => objectType({
	key: stringType().refine((k) => siteContentKeys.includes(k), { message: "Unknown content section" }),
	data: unknownType()
}).parse(input)).handler(saveSiteContentSection_createServerFn_handler, async ({ data, context }) => {
	const ctx = adminContextFromHandler(context);
	await ensureAdminAccess(ctx);
	const { error } = await (await loadAdminDb(ctx)).from("site_content").upsert({
		key: data.key,
		data: data.data,
		updated_at: (/* @__PURE__ */ new Date()).toISOString(),
		updated_by: context.userId
	}, { onConflict: "key" });
	if (error) throw new Error(error.message);
	return { ok: true };
});
var resetSiteContentSection_createServerFn_handler = createServerRpc({
	id: "71a551375c28eb5859326cc4ebc729b56da533ef7f9e271f66786d7dc471da5a",
	name: "resetSiteContentSection",
	filename: "src/lib/content.functions.ts"
}, (opts) => resetSiteContentSection.__executeServer(opts));
var resetSiteContentSection = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).validator((input) => objectType({ key: stringType() }).parse(input)).handler(resetSiteContentSection_createServerFn_handler, async ({ data, context }) => {
	const ctx = adminContextFromHandler(context);
	await ensureAdminAccess(ctx);
	const { error } = await (await loadAdminDb(ctx)).from("site_content").delete().eq("key", data.key);
	if (error) throw new Error(error.message);
	return { ok: true };
});
//#endregion
export { getAdminSiteContent_createServerFn_handler, getSiteContentSection_createServerFn_handler, getSiteContent_createServerFn_handler, resetSiteContentSection_createServerFn_handler, saveSiteContentSection_createServerFn_handler };
