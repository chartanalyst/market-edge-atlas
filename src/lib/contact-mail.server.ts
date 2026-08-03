import type { ContactPayload } from "@/lib/contact.schema";

const CONTACT_TO = () => process.env.CONTACT_TO || "ubaid.ullah2005op@gmail.com";

function bodyText(payload: ContactPayload) {
  return [
    `Name: ${payload.name}`,
    `Email: ${payload.email}`,
    `Organisation: ${payload.organisation || "—"}`,
    `Engagement: ${payload.topic || "—"}`,
    "",
    payload.message,
  ].join("\n");
}

function normalizeSmtpPass(raw: string) {
  return raw.trim().replace(/^["']|["']$/g, "").replace(/\s/g, "");
}

function smtpFromAddress(user: string) {
  const fromLabel = (process.env.SMTP_FROM || "Market Edge Atlas").trim().replace(/^["']|["']$/g, "");
  return fromLabel.includes("@") ? fromLabel : `"${fromLabel}" <${user}>`;
}

function isGmailSmtp(host: string) {
  return !host || host.includes("gmail.com");
}

function smtpTransportOptions(user: string, pass: string) {
  const host = (process.env.SMTP_HOST || "").trim().toLowerCase();

  if (isGmailSmtp(host)) {
    return { service: "gmail" as const, auth: { user, pass } };
  }

  return {
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: process.env.SMTP_SECURE === "true",
    requireTLS: process.env.SMTP_SECURE !== "true",
    auth: { user, pass },
  };
}

function friendlySmtpError(err: unknown, user: string): Error {
  const msg = err instanceof Error ? err.message : String(err);
  if (msg.includes("535") || msg.includes("BadCredentials")) {
    return new Error(
      `Gmail rejected the login for ${user}. Use a Google App Password (not your normal password): https://myaccount.google.com/apppasswords — 2-Step Verification must be enabled. Put the 16-character password in SMTP_PASS, restart \`npm run dev\`, then try again.`,
    );
  }
  return err instanceof Error ? err : new Error(msg);
}

async function sendViaWeb3Forms(payload: ContactPayload) {
  const accessKey = process.env.WEB3FORMS_ACCESS_KEY;
  if (!accessKey) return false;

  const res = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      access_key: accessKey,
      subject: `New enquiry from ${payload.name}${payload.topic ? ` — ${payload.topic}` : ""}`,
      from_name: "Market Edge Atlas",
      name: payload.name,
      email: payload.email,
      organisation: payload.organisation || "—",
      engagement: payload.topic || "—",
      message: payload.message,
      to: CONTACT_TO(),
    }),
  });
  const json = (await res.json().catch(() => ({}))) as { success?: boolean };
  if (!res.ok || !json.success) throw new Error("Web3Forms delivery failed");
  console.info("[contact] emailed via web3forms");
  return true;
}

async function sendViaResend(payload: ContactPayload) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return false;
  const from = process.env.RESEND_FROM || "Market Edge Atlas <onboarding@resend.dev>";

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [CONTACT_TO()],
      reply_to: payload.email,
      subject: `New enquiry from ${payload.name}${payload.topic ? ` — ${payload.topic}` : ""}`,
      text: bodyText(payload),
    }),
  });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Resend failed: ${body}`);
  }
  console.info("[contact] emailed via resend");
  return true;
}

async function sendViaSmtp(payload: ContactPayload) {
  const user = (process.env.SMTP_USER || process.env.GMAIL_USER || "").trim();
  const pass = normalizeSmtpPass(process.env.SMTP_PASS || process.env.GMAIL_APP_PASSWORD || "");
  if (!user || !pass) return false;

  console.info("[contact] smtp attempt", {
    user,
    to: CONTACT_TO(),
    passLength: pass.length,
    host: process.env.SMTP_HOST || "gmail",
  });

  const nodemailer = await import("nodemailer");
  const transporter = nodemailer.createTransport(smtpTransportOptions(user, pass));

  try {
    await transporter.sendMail({
      from: smtpFromAddress(user),
      to: CONTACT_TO(),
      replyTo: payload.email,
      subject: `New enquiry from ${payload.name}${payload.topic ? ` — ${payload.topic}` : ""}`,
      text: bodyText(payload),
    });
  } catch (err) {
    throw friendlySmtpError(err, user);
  }

  console.info("[contact] emailed via smtp");
  return true;
}

export async function sendContactEmail(payload: ContactPayload) {
  if (await sendViaSmtp(payload)) return { emailed: true as const, via: "smtp" as const };
  if (await sendViaWeb3Forms(payload)) return { emailed: true as const, via: "web3forms" as const };
  if (await sendViaResend(payload)) return { emailed: true as const, via: "resend" as const };
  return { emailed: false as const, via: "none" as const };
}
