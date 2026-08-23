//#region node_modules/.nitro/vite/services/ssr/assets/admin-guard-XTZOa6XH.js
/** Site owner email — auto-granted admin on sign-in. */
var BOOTSTRAP_ADMIN_EMAIL = (process.env.BOOTSTRAP_ADMIN_EMAIL || "chartanalyst1000@gmail.com").trim().toLowerCase();
function adminContextFromHandler(context) {
	return {
		supabase: context.supabase,
		userId: context.userId,
		claims: context.claims
	};
}
async function checkHasRole(context) {
	const { data, error } = await context.supabase.rpc("has_role", {
		_user_id: context.userId,
		_role: "admin"
	});
	if (error) throw new Error(`Admin role check failed (${error.message}). Apply Supabase migrations in supabase/migrations/.`);
	return Boolean(data);
}
async function tryBootstrapAdmin(context) {
	const email = String(context.claims?.email ?? "").trim().toLowerCase();
	if (!email || email !== BOOTSTRAP_ADMIN_EMAIL) return false;
	let supabaseAdmin;
	try {
		supabaseAdmin = (await import("./client.server-BnIeihYj.mjs")).createSupabaseAdminClient({ silent: true });
	} catch (error) {
		const msg = error instanceof Error ? error.message : "Could not load admin client";
		if (msg.includes("SUPABASE_SERVICE_ROLE_KEY") || msg.includes("service role")) throw new Error("Owner admin needs Supabase service role on the server. In Lovable Cloud → connect Supabase → Publish, then sign in at /auth.");
		throw error;
	}
	const { error } = await supabaseAdmin.from("user_roles").upsert({
		user_id: context.userId,
		role: "admin"
	}, { onConflict: "user_id,role" });
	if (error) {
		if (error.code === "23505") return true;
		throw new Error(`Could not assign admin role: ${error.message}`);
	}
	return true;
}
/** Verify admin access; bootstraps site owner when allowed. Throws on failure. */
async function ensureAdminAccess(context) {
	if (await checkHasRole(context)) return { bootstrapped: false };
	if (await tryBootstrapAdmin(context) && await checkHasRole(context)) return { bootstrapped: true };
	if (String(context.claims?.email ?? "").trim().toLowerCase() === BOOTSTRAP_ADMIN_EMAIL) throw new Error("Owner sign-in worked but admin role is not active. Connect Supabase in Lovable Cloud and publish, then sign in again.");
	throw new Error("Forbidden");
}
/** Service-role client when configured; otherwise the authenticated user client (RLS). */
async function loadAdminDb(context) {
	try {
		return (await import("./client.server-BnIeihYj.mjs")).createSupabaseAdminClient({ silent: true });
	} catch {
		return context.supabase;
	}
}
//#endregion
export { ensureAdminAccess as n, loadAdminDb as r, adminContextFromHandler as t };
