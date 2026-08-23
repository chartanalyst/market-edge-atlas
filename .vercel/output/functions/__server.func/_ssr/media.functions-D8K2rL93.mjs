import { c as createServerFn } from "./createServerFn-CIHAFgYl.mjs";
import { t as requireSupabaseAuth } from "./auth-middleware-tiFBA43n.mjs";
import { It as objectType, Lt as stringType } from "../_libs/@ai-sdk/gateway+[...].mjs";
import { t as createServerRpc } from "./createServerRpc-B90ckaqP.mjs";
import { n as ensureAdminAccess, r as loadAdminDb, t as adminContextFromHandler } from "./admin-guard-XTZOa6XH.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/media.functions-D8K2rL93.js
var uploadSchema = objectType({
	path: stringType().min(1).max(500),
	contentType: stringType().min(1).max(120),
	base64: stringType().min(1)
});
/** Admin-only media upload (images, PDFs) — uses service role storage. */
var uploadAdminMedia_createServerFn_handler = createServerRpc({
	id: "cfce13f330fdd90f2d28b0bc13e93e1cc7a466bf360c35e65cb11463189da23a",
	name: "uploadAdminMedia",
	filename: "src/lib/media.functions.ts"
}, (opts) => uploadAdminMedia.__executeServer(opts));
var uploadAdminMedia = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).validator((input) => uploadSchema.parse(input)).handler(uploadAdminMedia_createServerFn_handler, async ({ data, context }) => {
	const ctx = adminContextFromHandler(context);
	await ensureAdminAccess(ctx);
	const admin = await loadAdminDb(ctx);
	const body = Buffer.from(data.base64, "base64");
	const { error } = await admin.storage.from("media").upload(data.path, body, {
		contentType: data.contentType,
		upsert: true,
		cacheControl: "31536000"
	});
	if (error) throw new Error(error.message);
	return {
		url: `/api/public/media/${data.path}`,
		path: data.path
	};
});
var deleteAdminMedia_createServerFn_handler = createServerRpc({
	id: "82e7cd81f4d4322f3a873ebc6064b0753149bab593bdc89cfaddc38893767fe7",
	name: "deleteAdminMedia",
	filename: "src/lib/media.functions.ts"
}, (opts) => deleteAdminMedia.__executeServer(opts));
var deleteAdminMedia = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).validator((input) => objectType({ path: stringType().min(1) }).parse(input)).handler(deleteAdminMedia_createServerFn_handler, async ({ data, context }) => {
	const ctx = adminContextFromHandler(context);
	await ensureAdminAccess(ctx);
	const admin = await loadAdminDb(ctx);
	const storagePath = data.path.replace(/^\/api\/public\/media\//, "");
	const { error } = await admin.storage.from("media").remove([storagePath]);
	if (error) throw new Error(error.message);
	return { ok: true };
});
//#endregion
export { deleteAdminMedia_createServerFn_handler, uploadAdminMedia_createServerFn_handler };
