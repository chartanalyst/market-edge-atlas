import { c as createServerFn } from "./createServerFn-CIHAFgYl.mjs";
import { n as createSsrRpc } from "./createSsrRpc-vr7yBYzy.mjs";
import { t as requireSupabaseAuth } from "./auth-middleware-tiFBA43n.mjs";
import { Ft as numberType, It as objectType, Lt as stringType, Mt as arrayType, Nt as booleanType } from "../_libs/@ai-sdk/gateway+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/reports.functions-DI0eKq1u.js
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
var getReport = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).validator((input) => objectType({ id: stringType().min(1) }).parse(input)).handler(createSsrRpc("f94af9ff2848f33902408ad62444f7a6c440f3877b3fc18040f0f190e1b42303"));
/** Published weekly reports for the public site. */
var listPublishedReports = createServerFn({ method: "GET" }).handler(createSsrRpc("ceda4c4a3fe3a694d4652253c0cc73856e7fc5338e2c6b1a3f4dd53936bfb744"));
/** All weekly reports, drafts included — admin only. */
var listAllReports = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).handler(createSsrRpc("208a4969802407d37444b5fb338ef8c86f7ad6b22cd4f5f828cfaa97132cc034"));
var saveReport = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).validator((input) => reportSchema.parse(input)).handler(createSsrRpc("21239401c5e6beb119e6b4a0fc52e2c35b3a138f91e28c075ebf9322643e3c0b"));
var deleteReport = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).validator((input) => objectType({ id: stringType().min(1) }).parse(input)).handler(createSsrRpc("2938fc5f3b0f580e3cd6387f3d9503c67d7c8abf328ce27f2d963ccc80c350fc"));
//#endregion
export { saveReport as a, listPublishedReports as i, getReport as n, listAllReports as r, deleteReport as t };
