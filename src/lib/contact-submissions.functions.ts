import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { adminContextFromHandler, ensureAdminAccess, loadAdminDb } from "@/lib/admin-guard";

export type ContactSubmission = {
  id: string;
  name: string;
  email: string;
  organisation: string;
  topic: string;
  message: string;
  createdAt: string;
  source: "contact_submissions" | "inquiries";
  handled?: boolean;
};

function fromContactRow(row: Record<string, unknown>): ContactSubmission {
  return {
    id: String(row.id ?? ""),
    name: String(row.name ?? ""),
    email: String(row.email ?? ""),
    organisation: String(row.organisation ?? ""),
    topic: String(row.topic ?? ""),
    message: String(row.message ?? ""),
    createdAt: String(row.created_at ?? ""),
    source: "contact_submissions",
  };
}

function fromInquiryRow(row: Record<string, unknown>): ContactSubmission {
  const message = String(row.message ?? "");
  const topicMatch = message.match(/^\[([^\]]+)\]\n\n/);
  return {
    id: String(row.id ?? ""),
    name: String(row.name ?? ""),
    email: String(row.email ?? ""),
    organisation: String(row.organization ?? ""),
    topic: topicMatch?.[1] ?? "",
    message: topicMatch ? message.replace(topicMatch[0], "") : message,
    createdAt: String(row.created_at ?? ""),
    source: "inquiries",
    handled: Boolean(row.handled),
  };
}

async function assertAdmin(context: { supabase: unknown; userId: string; claims?: unknown }) {
  await ensureAdminAccess(adminContextFromHandler(context));
}

/** Single contact submission — admin only. */
export const getContactSubmission = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .validator((input: unknown) =>
    z
      .object({
        id: z.string().min(1),
        source: z.enum(["contact_submissions", "inquiries"]),
      })
      .parse(input),
  )
  .handler(async ({ data, context }): Promise<ContactSubmission> => {
    const ctx = adminContextFromHandler(context);
    await assertAdmin(context);
    const db = await loadAdminDb(ctx);
    const { data: row, error } = await db
      .from(data.source)
      .select("*")
      .eq("id", data.id)
      .maybeSingle();
    if (error) throw new Error(error.message);
    if (!row) throw new Error("Submission not found");
    return data.source === "contact_submissions"
      ? fromContactRow(row as Record<string, unknown>)
      : fromInquiryRow(row as Record<string, unknown>);
  });

export const listContactSubmissions = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }): Promise<ContactSubmission[]> => {
    const ctx = adminContextFromHandler(context);
    await assertAdmin(context);
    const db = await loadAdminDb(ctx);

    const [primary, fallback] = await Promise.all([
      db
        .from("contact_submissions")
        .select("*")
        .order("created_at", { ascending: false }),
      db.from("inquiries").select("*").order("created_at", { ascending: false }),
    ]);

    const items: ContactSubmission[] = [];

    if (!primary.error && primary.data) {
      items.push(...primary.data.map((row: unknown) => fromContactRow(row as Record<string, unknown>)));
    }
    if (!fallback.error && fallback.data) {
      items.push(...fallback.data.map((row: unknown) => fromInquiryRow(row as Record<string, unknown>)));
    }

    if (primary.error && fallback.error) {
      throw new Error(
        primary.error.message ||
          "Contact inbox tables are not ready. Run the contact migration in Supabase SQL Editor.",
      );
    }

    return items.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  });

export const deleteContactSubmission = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .validator((input: unknown) =>
    z
      .object({
        id: z.string().min(1),
        source: z.enum(["contact_submissions", "inquiries"]),
      })
      .parse(input),
  )
  .handler(async ({ data, context }) => {
    const ctx = adminContextFromHandler(context);
    await ensureAdminAccess(ctx);
    const db = await loadAdminDb(ctx);
    const { data: removed, error } = await db
      .from(data.source)
      .delete()
      .eq("id", data.id)
      .select("id");
    if (error) throw new Error(error.message);
    if (!removed?.length) {
      throw new Error(
        "Nothing was deleted. Apply migration 20260804200000_admin_api_complete.sql in Lovable/Supabase.",
      );
    }
    return { ok: true as const };
  });

export const markInquiryHandled = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .validator((input: unknown) =>
    z.object({ id: z.string().min(1), handled: z.boolean() }).parse(input),
  )
  .handler(async ({ data, context }) => {
    const ctx = adminContextFromHandler(context);
    await ensureAdminAccess(ctx);
    const db = await loadAdminDb(ctx);
    const { data: updated, error } = await db
      .from("inquiries")
      .update({ handled: data.handled })
      .eq("id", data.id)
      .select("id");
    if (error) throw new Error(error.message);
    if (!updated?.length) throw new Error("Inquiry not found or could not update.");
    return { ok: true as const };
  });
