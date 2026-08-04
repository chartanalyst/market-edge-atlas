import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { reportFromRow, sortReports, type ReportRecord } from "@/lib/report-model";

import { adminContextFromHandler, ensureAdminAccess } from "@/lib/admin-guard";
import { createPublicSupabase } from "@/lib/content.server";

const reportSchema = z.object({
  id: z.string().max(60).optional().default(""),
  slug: z
    .string()
    .trim()
    .min(2)
    .max(120)
    .regex(/^[a-z0-9-]+$/, { message: "Slug can use lowercase letters, numbers and dashes only" }),
  title: z.string().trim().min(2).max(200),
  weekLabel: z.string().max(120).default(""),
  asset: z.string().max(120).default(""),
  market: z.string().max(60).default("Crypto"),
  date: z.string().max(30).default(""),
  summary: z.string().max(1200).default(""),
  body: z.string().max(20000).default(""),
  coverImage: z.string().max(500).default(""),
  gallery: z.array(z.string().max(500)).max(40).default([]),
  pdfUrl: z.string().max(500).default(""),
  tradingviewUrl: z.string().max(500).default(""),
  tags: z.array(z.string().max(60)).max(30).default([]),
  published: z.boolean().default(false),
  sortOrder: z.number().default(0),
});

/** Single report by id — admin only. */
export const getReport = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .validator((input: unknown) => z.object({ id: z.string().min(1) }).parse(input))
  .handler(async ({ data, context }): Promise<ReportRecord> => {
    await ensureAdminAccess(adminContextFromHandler(context));
    const { data: row, error } = await context.supabase
      .from("weekly_reports")
      .select("*")
      .eq("id", data.id)
      .maybeSingle();
    if (error) throw new Error(error.message);
    if (!row) throw new Error("Report not found");
    return reportFromRow(row as Record<string, unknown>);
  });

/** Published weekly reports for the public site. */
export const listPublishedReports = createServerFn({ method: "GET" }).handler(
  async (): Promise<ReportRecord[]> => {
    try {
      const supabase = createPublicSupabase();
      const { data, error } = await supabase
        .from("weekly_reports")
        .select("*")
        .eq("published", true)
        .order("sort_order", { ascending: true })
        .order("date", { ascending: false });
      if (error) throw new Error(error.message);
      return sortReports((data ?? []).map((row) => reportFromRow(row as Record<string, unknown>)));
    } catch {
      return [];
    }
  },
);

/** All weekly reports, drafts included — admin only. */
export const listAllReports = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }): Promise<ReportRecord[]> => {
    await ensureAdminAccess(adminContextFromHandler(context));
    const { data, error } = await context.supabase
      .from("weekly_reports")
      .select("*")
      .order("sort_order", { ascending: true })
      .order("date", { ascending: false });
    if (error) throw new Error(error.message);
    return (data ?? []).map((row: Record<string, unknown>) => reportFromRow(row));
  });

export const saveReport = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .validator((input: unknown) => reportSchema.parse(input))
  .handler(async ({ data, context }) => {
    await ensureAdminAccess(adminContextFromHandler(context));
    const payload = {
      slug: data.slug,
      title: data.title,
      week_label: data.weekLabel,
      asset: data.asset,
      market: data.market,
      date: data.date || new Date().toISOString().slice(0, 10),
      summary: data.summary,
      body: data.body,
      cover_image: data.coverImage || null,
      gallery: data.gallery,
      pdf_url: data.pdfUrl || null,
      tradingview_url: data.tradingviewUrl || null,
      tags: data.tags,
      published: data.published,
      sort_order: data.sortOrder,
      updated_at: new Date().toISOString(),
    };

    if (data.id) {
      const { error } = await context.supabase
        .from("weekly_reports")
        .update(payload as never)
        .eq("id", data.id);
      if (error) throw new Error(error.message);
      return { ok: true as const, id: data.id };
    }

    const { data: inserted, error } = await context.supabase
      .from("weekly_reports")
      .insert(payload as never)
      .select("id")
      .single();
    if (error) throw new Error(error.message);
    return { ok: true as const, id: (inserted as { id: string }).id };
  });

export const deleteReport = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .validator((input: unknown) => z.object({ id: z.string().min(1) }).parse(input))
  .handler(async ({ data, context }) => {
    await ensureAdminAccess(adminContextFromHandler(context));
    const { error } = await context.supabase.from("weekly_reports").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true as const };
  });
