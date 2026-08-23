import { c as createServerFn } from "./createServerFn-CIHAFgYl.mjs";
import { t as createServerRpc } from "./createServerRpc-B90ckaqP.mjs";
import { t as createPublicSupabase } from "./content.server-BlV6eceY.mjs";
import { t as contactSchema } from "./contact.schema-DkXzBqMO.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/contact.functions-Dk1Ho9gf.js
var CONTACT_TO = () => process.env.CONTACT_TO || "ubaid.ullah2005op@gmail.com";
async function persistSubmission(payload) {
	try {
		const supabase = createPublicSupabase();
		const primary = await supabase.from("contact_submissions").insert({
			name: payload.name,
			email: payload.email,
			organisation: payload.organisation || null,
			topic: payload.topic || null,
			message: payload.message
		});
		if (!primary.error) {
			console.info("[contact] saved to contact_submissions");
			return { saved: true };
		}
		const fallback = await supabase.from("inquiries").insert({
			name: payload.name,
			email: payload.email,
			organization: payload.organisation || "",
			message: payload.topic ? `[${payload.topic}]\n\n${payload.message}` : payload.message
		});
		if (!fallback.error) {
			console.info("[contact] saved to inquiries");
			return { saved: true };
		}
		console.warn("[contact] db insert skipped:", primary.error?.message, fallback.error?.message);
	} catch (err) {
		console.warn("[contact] db unavailable:", err);
	}
	return { saved: false };
}
var submitContact_createServerFn_handler = createServerRpc({
	id: "1ac20e83585a55e943670fa4670b07889b610801a7a21f28dc367c19f92e50fd",
	name: "submitContact",
	filename: "src/lib/contact.functions.ts"
}, (opts) => submitContact.__executeServer(opts));
var submitContact = createServerFn({ method: "POST" }).validator((input) => contactSchema.parse(input)).handler(submitContact_createServerFn_handler, async ({ data }) => {
	const { sendContactEmail } = await import("./contact-mail.server-BtAvkMoE.mjs");
	console.info("[contact] submit", {
		email: data.email,
		name: data.name,
		to: CONTACT_TO()
	});
	const db = await persistSubmission(data);
	try {
		const mail = await sendContactEmail(data);
		if (mail.emailed) return {
			ok: true,
			emailed: true,
			saved: db.saved,
			via: mail.via
		};
		if (db.saved) return {
			ok: true,
			emailed: false,
			saved: true,
			via: "db"
		};
		throw new Error("Contact email is not configured. Add SMTP_USER/SMTP_PASS (or WEB3FORMS_ACCESS_KEY / RESEND_API_KEY) to .env and restart the server.");
	} catch (err) {
		console.error("[contact] delivery error:", err);
		if (db.saved) return {
			ok: true,
			emailed: false,
			saved: true,
			via: "db"
		};
		throw err instanceof Error ? err : /* @__PURE__ */ new Error("Could not send enquiry");
	}
});
//#endregion
export { submitContact_createServerFn_handler };
