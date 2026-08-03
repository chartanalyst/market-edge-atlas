import { createServerFn } from "@tanstack/react-start";
import { createPublicSupabase } from "@/lib/content.server";
import { contactSchema, type ContactPayload } from "@/lib/contact.schema";

const CONTACT_TO = () => process.env.CONTACT_TO || "ubaid.ullah2005op@gmail.com";

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
  .validator((input: unknown) => contactSchema.parse(input))
  .handler(async ({ data }) => {
    const { sendContactEmail } = await import("@/lib/contact-mail.server");

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
        "Contact email is not configured. Add SMTP_USER/SMTP_PASS (or WEB3FORMS_ACCESS_KEY / RESEND_API_KEY) to .env and restart the server.",
      );
    } catch (err) {
      console.error("[contact] delivery error:", err);
      if (db.saved) {
        return { ok: true as const, emailed: false as const, saved: true as const, via: "db" as const };
      }
      throw err instanceof Error ? err : new Error("Could not send enquiry");
    }
  });
