import { c as createServerFn } from "./createServerFn-CIHAFgYl.mjs";
import { n as createSsrRpc } from "./createSsrRpc-vr7yBYzy.mjs";
import { t as requireSupabaseAuth } from "./auth-middleware-tiFBA43n.mjs";
import { r as siteContentKeys } from "./site-content-DBTeyB_P.mjs";
import { It as objectType, Lt as stringType, Rt as unknownType } from "../_libs/@ai-sdk/gateway+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/content.functions-BOOXBVL8.js
var getSiteContent = createServerFn({ method: "GET" }).handler(createSsrRpc("5628aaee3be8917371cf667f0fa9e02784073998033f9f5baa65a4e0d019656a"));
/** All CMS sections merged — admin only (includes drafts from DB). */
var getAdminSiteContent = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).handler(createSsrRpc("1afe230200497e3ba7c31c4d34369a7b9b2e61288a38d04678e98fdfcc7f447b"));
/** Single CMS section by key — admin GET. */
var getSiteContentSection = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).validator((input) => objectType({ key: stringType().refine((k) => siteContentKeys.includes(k), { message: "Unknown content section" }) }).parse(input)).handler(createSsrRpc("baa8d6ac53fb66653a188d97c0a763c2d2d8d6d465daa58368805610c2017e94"));
var saveSiteContentSection = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).validator((input) => objectType({
	key: stringType().refine((k) => siteContentKeys.includes(k), { message: "Unknown content section" }),
	data: unknownType()
}).parse(input)).handler(createSsrRpc("0b12e1539b8ca4b4de5b4b3e55b487c14be5e558f7aae22a33e24eb8ef12f880"));
var resetSiteContentSection = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).validator((input) => objectType({ key: stringType() }).parse(input)).handler(createSsrRpc("71a551375c28eb5859326cc4ebc729b56da533ef7f9e271f66786d7dc471da5a"));
//#endregion
export { saveSiteContentSection as a, resetSiteContentSection as i, getSiteContent as n, getSiteContentSection as r, getAdminSiteContent as t };
