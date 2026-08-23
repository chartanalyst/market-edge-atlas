import { t as createClient } from "../_libs/supabase__supabase-js.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/content.server-BlV6eceY.js
/** Publishable-key client for public, read-only site content during SSR. */
function createPublicSupabase() {
	const key = process.env.SUPABASE_PUBLISHABLE_KEY;
	const url = process.env.SUPABASE_URL;
	return createClient(url, key, {
		auth: {
			storage: void 0,
			persistSession: false,
			autoRefreshToken: false
		},
		global: { fetch: (input, init) => {
			const headers = new Headers(init?.headers);
			if (key.startsWith("sb_") && headers.get("Authorization") === `Bearer ${key}`) headers.delete("Authorization");
			headers.set("apikey", key);
			return fetch(input, {
				...init,
				headers
			});
		} }
	});
}
//#endregion
export { createPublicSupabase as t };
