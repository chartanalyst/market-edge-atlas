import { c as createServerFn } from "./createServerFn-CIHAFgYl.mjs";
import { t as requireSupabaseAuth } from "./auth-middleware-tiFBA43n.mjs";
import { a as sortAnalyses, n as defaultAnalysisRecords, o as withDummyAnalyses, t as analysisFromRow } from "./analysis-model-CBMM6olb.mjs";
import { Ft as numberType, It as objectType, Lt as stringType, Mt as arrayType, Nt as booleanType } from "../_libs/@ai-sdk/gateway+[...].mjs";
import { t as createServerRpc } from "./createServerRpc-B90ckaqP.mjs";
import { n as ensureAdminAccess, r as loadAdminDb, t as adminContextFromHandler } from "./admin-guard-XTZOa6XH.mjs";
import { t as createPublicSupabase } from "./content.server-BlV6eceY.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/analyses.functions-CE12zO8-.js
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
var getAnalysis_createServerFn_handler = createServerRpc({
	id: "bf4b64bf6eda181966105e4d6eebbb4e69eac1d9b79f63287044c0627da9829c",
	name: "getAnalysis",
	filename: "src/lib/analyses.functions.ts"
}, (opts) => getAnalysis.__executeServer(opts));
var getAnalysis = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).validator((input) => objectType({ id: stringType().min(1) }).parse(input)).handler(getAnalysis_createServerFn_handler, async ({ data, context }) => {
	const ctx = adminContextFromHandler(context);
	await ensureAdminAccess(ctx);
	const { data: row, error } = await (await loadAdminDb(ctx)).from("analyses").select("*").eq("id", data.id).maybeSingle();
	if (error) throw new Error(error.message);
	if (!row) throw new Error("Analysis not found");
	return analysisFromRow(row);
});
var listPublishedAnalyses_createServerFn_handler = createServerRpc({
	id: "c8c114c2cd1b55d7033188f1936b15a83ece2b9afc53715a51cdccdf366f22f4",
	name: "listPublishedAnalyses",
	filename: "src/lib/analyses.functions.ts"
}, (opts) => listPublishedAnalyses.__executeServer(opts));
var listPublishedAnalyses = createServerFn({ method: "GET" }).handler(listPublishedAnalyses_createServerFn_handler, async () => {
	try {
		const { data, error } = await createPublicSupabase().from("analyses").select("*").eq("published", true).order("sort_order", { ascending: true }).order("date", { ascending: false });
		if (error) throw new Error(error.message);
		if (data && data.length > 0) {
			const published = data.map((row) => analysisFromRow(row));
			return sortAnalyses(withDummyAnalyses(published));
		}
	} catch (err) {
		console.error("[analyses] published", err);
	}
	return sortAnalyses(withDummyAnalyses(defaultAnalysisRecords));
});
var listAllAnalyses_createServerFn_handler = createServerRpc({
	id: "c89c3293a606c91ea8cfa9e31159c94ebe8beb4258837166dec1371bf1ae1df3",
	name: "listAllAnalyses",
	filename: "src/lib/analyses.functions.ts"
}, (opts) => listAllAnalyses.__executeServer(opts));
var listAllAnalyses = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).handler(listAllAnalyses_createServerFn_handler, async ({ context }) => {
	const ctx = adminContextFromHandler(context);
	await ensureAdminAccess(ctx);
	const { data, error } = await (await loadAdminDb(ctx)).from("analyses").select("*").order("sort_order", { ascending: true }).order("date", { ascending: false });
	if (error) throw new Error(error.message);
	return (data ?? []).map((row) => analysisFromRow(row));
});
var saveAnalysis_createServerFn_handler = createServerRpc({
	id: "e4e54ba52f728f8d55f9f2495cade334ebedd5ead9197a7716bcad8df4afe5f3",
	name: "saveAnalysis",
	filename: "src/lib/analyses.functions.ts"
}, (opts) => saveAnalysis.__executeServer(opts));
var saveAnalysis = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).validator((input) => analysisSchema.parse(input)).handler(saveAnalysis_createServerFn_handler, async ({ data, context }) => {
	const ctx = adminContextFromHandler(context);
	await ensureAdminAccess(ctx);
	const db = await loadAdminDb(ctx);
	const payload = {
		slug: data.slug,
		title: data.title,
		subtitle: data.subtitle,
		market: data.market,
		category: data.category,
		pair: data.pair,
		timeframe: data.timeframe,
		date: data.date || (/* @__PURE__ */ new Date()).toISOString().slice(0, 10),
		summary: data.summary,
		description: data.description,
		bias: data.bias,
		market_structure: data.marketStructure,
		invalidation: data.invalidation,
		outcome: data.outcome,
		rr: data.rr,
		tags: data.tags,
		series: data.series,
		thesis: data.thesis,
		targets: data.targets,
		cover_image: data.coverImage || null,
		gallery: data.gallery,
		tradingview_url: data.tradingviewUrl || null,
		pdf_url: data.pdfUrl || null,
		featured: data.featured,
		published: data.published,
		sort_order: data.sortOrder,
		updated_at: (/* @__PURE__ */ new Date()).toISOString()
	};
	if (data.id) {
		const { error } = await db.from("analyses").update(payload).eq("id", data.id);
		if (error) throw new Error(error.message);
		return {
			ok: true,
			id: data.id
		};
	}
	const { data: inserted, error } = await db.from("analyses").insert(payload).select("id").single();
	if (error) throw new Error(error.message);
	return {
		ok: true,
		id: inserted.id
	};
});
var deleteAnalysis_createServerFn_handler = createServerRpc({
	id: "145e65c011e198faaef394deb65860bef9a95e716e04989a277602dc3319e784",
	name: "deleteAnalysis",
	filename: "src/lib/analyses.functions.ts"
}, (opts) => deleteAnalysis.__executeServer(opts));
var deleteAnalysis = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).validator((input) => objectType({ id: stringType().min(1) }).parse(input)).handler(deleteAnalysis_createServerFn_handler, async ({ data, context }) => {
	const ctx = adminContextFromHandler(context);
	await ensureAdminAccess(ctx);
	const { error } = await (await loadAdminDb(ctx)).from("analyses").delete().eq("id", data.id);
	if (error) throw new Error(error.message);
	return { ok: true };
});
//#endregion
export { deleteAnalysis_createServerFn_handler, getAnalysis_createServerFn_handler, listAllAnalyses_createServerFn_handler, listPublishedAnalyses_createServerFn_handler, saveAnalysis_createServerFn_handler };
