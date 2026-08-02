import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { createPublicSupabase } from "@/lib/content.server";

const contactSchema = z.object({
  name: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(200),
  organisation: z.string().trim().max(200).optional().default(""),
  topic: z.string().trim().max(200).optional().default(""),
  message: z.string().trim().min(1).max(5000),
});

type ContactPayload = z.infer<typeof contactSchema>;

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

/** Easiest path: one free access key from https://web3forms.com */
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

async function sendViaGmail(payload: ContactPayload) {
  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;
  if (!user || !pass) return false;

  const nodemailer = await import("nodemailer");
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user, pass },
  });

  await transporter.sendMail({
    from: `"Market Edge Atlas" <${user}>`,
    to: CONTACT_TO(),
    replyTo: payload.email,
    subject: `New enquiry from ${payload.name}${payload.topic ? ` — ${payload.topic}` : ""}`,
    text: bodyText(payload),
  });
  console.info("[contact] emailed via gmail");
  return true;
}

async function sendContactEmail(payload: ContactPayload) {
  if (await sendViaWeb3Forms(payload)) return { emailed: true as const, via: "web3forms" as const };
  if (await sendViaResend(payload)) return { emailed: true as const, via: "resend" as const };
  if (await sendViaGmail(payload)) return { emailed: true as const, via: "gmail" as const };
  return { emailed: false as const, via: "none" as const };
}

async function persistSubmission(payload: ContactPayload) {
  try {
    const supabase = createPublicSupabase() as any;

    const primary = await supabase.from("contact_submissions").insert({
      name: payload.name,
      email: payload.email,
      organisation: payload.organisation || null,
      topic: payload.topic || null,
      message: payload.message,
    });
    if (!primary.error) {
      console.info("[contact] saved to contact_submissions");
      return { saved: true as const };
    }

    const fallback = await supabase.from("inquiries").insert({
      name: payload.name,
      email: payload.email,
      organization: payload.organisation || "",
      message: payload.topic
        ? `[${payload.topic}]\n\n${payload.message}`
        : payload.message,
    });
    if (!fallback.error) {
      console.info("[contact] saved to inquiries");
      return { saved: true as const };
    }

    console.warn(
      "[contact] db insert skipped:",
      primary.error?.message,
      fallback.error?.message,
    );
  } catch (err) {
    console.warn("[contact] db unavailable:", err);
  }
  return { saved: false as const };
}

export const submitContact = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => contactSchema.parse(input))
  .handler(async ({ data }) => {
    console.info("[contact] submit", {
      email: data.email,
      name: data.name,
      to: CONTACT_TO(),
    });

    const db = await persistSubmission(data);

    try {
      const mail = await sendContactEmail(data);
      if (mail.emailed) {
        return {
          ok: true as const,
          emailed: true as const,
          saved: db.saved,
          via: mail.via,
        };
      }
      if (db.saved) {
        return { ok: true as const, emailed: false as const, saved: true as const, via: "db" as const };
      }
      throw new Error(
        "Contact email is not configured. Add WEB3FORMS_ACCESS_KEY (or RESEND_API_KEY / GMAIL_APP_PASSWORD) to .env and restart the server.",
      );
    } catch (err) {
      console.error("[contact] delivery error:", err);
      if (db.saved) {
        return { ok: true as const, emailed: false as const, saved: true as const, via: "db" as const };
      }
      throw err instanceof Error ? err : new Error("Could not send enquiry");
    }
  });
