import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { analysisFromRow, type AnalysisRecord } from "@/lib/analysis-model";

const levelSchema = z.object({ label: z.string().max(120), value: z.string().max(240) });

const analysisSchema = z.object({
  id: z.string().max(60).optional().default(""),
  slug: z
    .string()
    .trim()
    .min(2)
    .max(120)
    .regex(/^[a-z0-9-]+$/, { message: "Slug can use lowercase letters, numbers and dashes only" }),
  title: z.string().trim().min(2).max(200),
  subtitle: z.string().max(300).default(""),
  market: z.string().max(60).default("Crypto"),
  category: z.string().max(80).default(""),
  pair: z.string().max(80).default(""),
  timeframe: z.string().max(120).default(""),
  date: z.string().max(30).default(""),
  summary: z.string().max(1200).default(""),
  description: z.string().max(8000).default(""),
  bias: z.string().max(400).default(""),
  marketStructure: z.string().max(2000).default(""),
  invalidation: z.string().max(1200).default(""),
  outcome: z.string().max(200).default(""),
  rr: z.string().max(60).default(""),
  tags: z.array(z.string().max(60)).max(30).default([]),
  series: z.array(z.number()).max(200).default([]),
  thesis: z.array(z.string().max(1200)).max(30).default([]),
  targets: z.array(levelSchema).max(30).default([]),
  coverImage: z.string().max(500).default(""),
  gallery: z.array(z.string().max(500)).max(40).default([]),
  tradingviewUrl: z.string().max(500).default(""),
  pdfUrl: z.string().max(500).default(""),
  featured: z.boolean().default(false),
  published: z.boolean().default(false),
  sortOrder: z.number().default(0),
});

async function assertAdmin(context: { supabase: any; userId: string }) {
  const { data: isAdmin } = await context.supabase.rpc("has_role", {
    _user_id: context.userId,
    _role: "admin",
  });
  if (!isAdmin) throw new Error("Forbidden");
}

/** All analyses, drafts included — admin only. */
export const listAllAnalyses = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }): Promise<AnalysisRecord[]> => {
    await assertAdmin(context);
    const { data, error } = await context.supabase
      .from("analyses")
      .select("*")
      .order("sort_order", { ascending: true })
      .order("date", { ascending: false });
    if (error) throw new Error(error.message);
    return (data ?? []).map((row: Record<string, unknown>) => analysisFromRow(row));
  });

export const saveAnalysis = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .validator((input: unknown) => analysisSchema.parse(input))
  .handler(async ({ data, context }) => {
    await assertAdmin(context);
    const payload = {
      slug: data.slug,
      title: data.title,
      subtitle: data.subtitle,
      market: data.market,
      category: data.category,
      pair: data.pair,
      timeframe: data.timeframe,
      date: data.date || new Date().toISOString().slice(0, 10),
      summary: data.summary,
      description: data.description,
      bias: data.bias,
      market_structure: data.marketStructure,
      invalidation: data.invalidation,
      outcome: data.outcome,
      rr: data.rr,
      tags: data.tags,
      series: data.series,
      thesis: data.thesis,
      targets: data.targets,
      cover_image: data.coverImage || null,
      gallery: data.gallery,
      tradingview_url: data.tradingviewUrl || null,
      pdf_url: data.pdfUrl || null,
      featured: data.featured,
      published: data.published,
      sort_order: data.sortOrder,
      updated_at: new Date().toISOString(),
    };

    if (data.id) {
      const { error } = await context.supabase
        .from("analyses")
        .update(payload as never)
        .eq("id", data.id);
      if (error) throw new Error(error.message);
      return { ok: true as const, id: data.id };
    }

    const { data: inserted, error } = await context.supabase
      .from("analyses")
      .insert(payload as never)
      .select("id")
      .single();
    if (error) throw new Error(error.message);
    return { ok: true as const, id: (inserted as { id: string }).id };
  });

export const deleteAnalysis = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .validator((input: unknown) => z.object({ id: z.string().min(1) }).parse(input))
  .handler(async ({ data, context }) => {
    await assertAdmin(context);
    const { error } = await context.supabase.from("analyses").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true as const };
  });
