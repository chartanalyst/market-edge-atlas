import { o as __toESM } from "../_runtime.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/contact-mail.server-BtAvkMoE.js
var CONTACT_TO = () => process.env.CONTACT_TO || "ubaid.ullah2005op@gmail.com";
function bodyText(payload) {
	return [
		`Name: ${payload.name}`,
		`Email: ${payload.email}`,
		`Organisation: ${payload.organisation || "—"}`,
		`Engagement: ${payload.topic || "—"}`,
		"",
		payload.message
	].join("\n");
}
function normalizeSmtpPass(raw) {
	return raw.trim().replace(/^["']|["']$/g, "").replace(/\s/g, "");
}
function smtpFromAddress(user) {
	const fromLabel = (process.env.SMTP_FROM || "Chart Analyst").trim().replace(/^["']|["']$/g, "");
	return fromLabel.includes("@") ? fromLabel : `"${fromLabel}" <${user}>`;
}
function isGmailSmtp(host) {
	return !host || host.includes("gmail.com");
}
function smtpTransportOptions(user, pass) {
	if (isGmailSmtp((process.env.SMTP_HOST || "").trim().toLowerCase())) return {
		service: "gmail",
		auth: {
			user,
			pass
		}
	};
	return {
		host: process.env.SMTP_HOST,
		port: Number(process.env.SMTP_PORT || 587),
		secure: process.env.SMTP_SECURE === "true",
		requireTLS: process.env.SMTP_SECURE !== "true",
		auth: {
			user,
			pass
		}
	};
}
function friendlySmtpError(err, user) {
	const msg = err instanceof Error ? err.message : String(err);
	if (msg.includes("535") || msg.includes("BadCredentials")) return /* @__PURE__ */ new Error(`Gmail rejected the login for ${user}. Use a Google App Password (not your normal password): https://myaccount.google.com/apppasswords — 2-Step Verification must be enabled. Put the 16-character password in SMTP_PASS, restart \`npm run dev\`, then try again.`);
	return err instanceof Error ? err : new Error(msg);
}
async function sendViaWeb3Forms(payload) {
	const accessKey = process.env.WEB3FORMS_ACCESS_KEY;
	if (!accessKey) return false;
	const res = await fetch("https://api.web3forms.com/submit", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Accept: "application/json"
		},
		body: JSON.stringify({
			access_key: accessKey,
			subject: `New enquiry from ${payload.name}${payload.topic ? ` — ${payload.topic}` : ""}`,
			from_name: "Chart Analyst",
			name: payload.name,
			email: payload.email,
			organisation: payload.organisation || "—",
			engagement: payload.topic || "—",
			message: payload.message,
			to: CONTACT_TO()
		})
	});
	const json = await res.json().catch(() => ({}));
	if (!res.ok || !json.success) throw new Error("Web3Forms delivery failed");
	console.info("[contact] emailed via web3forms");
	return true;
}
async function sendViaResend(payload) {
	const apiKey = process.env.RESEND_API_KEY;
	if (!apiKey) return false;
	const from = process.env.RESEND_FROM || "Chart Analyst <onboarding@resend.dev>";
	const res = await fetch("https://api.resend.com/emails", {
		method: "POST",
		headers: {
			Authorization: `Bearer ${apiKey}`,
			"Content-Type": "application/json"
		},
		body: JSON.stringify({
			from,
			to: [CONTACT_TO()],
			reply_to: payload.email,
			subject: `New enquiry from ${payload.name}${payload.topic ? ` — ${payload.topic}` : ""}`,
			text: bodyText(payload)
		})
	});
	if (!res.ok) {
		const body = await res.text();
		throw new Error(`Resend failed: ${body}`);
	}
	console.info("[contact] emailed via resend");
	return true;
}
async function sendViaSmtp(payload) {
	const user = (process.env.SMTP_USER || process.env.GMAIL_USER || "").trim();
	const pass = normalizeSmtpPass(process.env.SMTP_PASS || process.env.GMAIL_APP_PASSWORD || "");
	if (!user || !pass) return false;
	console.info("[contact] smtp attempt", {
		user,
		to: CONTACT_TO(),
		passLength: pass.length,
		host: process.env.SMTP_HOST || "gmail"
	});
	const transporter = (await import("../_libs/nodemailer.mjs").then((n) => /* @__PURE__ */ __toESM(n.t()))).createTransport(smtpTransportOptions(user, pass));
	try {
		await transporter.sendMail({
			from: smtpFromAddress(user),
			to: CONTACT_TO(),
			replyTo: payload.email,
			subject: `New enquiry from ${payload.name}${payload.topic ? ` — ${payload.topic}` : ""}`,
			text: bodyText(payload)
		});
	} catch (err) {
		throw friendlySmtpError(err, user);
	}
	console.info("[contact] emailed via smtp");
	return true;
}
async function sendContactEmail(payload) {
	if (await sendViaSmtp(payload)) return {
		emailed: true,
		via: "smtp"
	};
	if (await sendViaWeb3Forms(payload)) return {
		emailed: true,
		via: "web3forms"
	};
	if (await sendViaResend(payload)) return {
		emailed: true,
		via: "resend"
	};
	return {
		emailed: false,
		via: "none"
	};
}
//#endregion
export { sendContactEmail };
