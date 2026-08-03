import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

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

async function assertAdmin(context: { supabase: { rpc: Function }; userId: string }) {
  const { data: isAdmin } = await context.supabase.rpc("has_role", {
    _user_id: context.userId,
    _role: "admin",
  });
  if (!isAdmin) throw new Error("Forbidden");
}

export const listContactSubmissions = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }): Promise<ContactSubmission[]> => {
    await assertAdmin(context);

    const [primary, fallback] = await Promise.all([
      context.supabase
        .from("contact_submissions")
        .select("*")
        .order("created_at", { ascending: false }),
      context.supabase.from("inquiries").select("*").order("created_at", { ascending: false }),
    ]);

    const items: ContactSubmission[] = [];

    if (!primary.error && primary.data) {
      items.push(...primary.data.map((row) => fromContactRow(row as Record<string, unknown>)));
    }
    if (!fallback.error && fallback.data) {
      items.push(...fallback.data.map((row) => fromInquiryRow(row as Record<string, unknown>)));
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
    await assertAdmin(context);
    const { error } = await context.supabase.from(data.source).delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true as const };
  });

export const markInquiryHandled = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .validator((input: unknown) =>
    z.object({ id: z.string().min(1), handled: z.boolean() }).parse(input),
  )
  .handler(async ({ data, context }) => {
    await assertAdmin(context);
    const { error } = await context.supabase
      .from("inquiries")
      .update({ handled: data.handled })
      .eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true as const };
  });
