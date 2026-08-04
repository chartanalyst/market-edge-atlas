import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { adminContextFromHandler, ensureAdminAccess, loadAdminDb } from "@/lib/admin-guard";
import { defaultSiteContent, mergeSiteContent, siteContentKeys } from "@/lib/site-content";
import { createPublicSupabase } from "@/lib/content.server";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

export const getSiteContent = createServerFn({ method: "GET" }).handler(async () => {
  try {
    const supabase = createPublicSupabase();
    const [contentRes, analysisRes, reportRes] = await Promise.all([
      supabase.from("site_content").select("key, data"),
      supabase
        .from("analyses")
        .select("*")
        .eq("published", true)
        .order("sort_order", { ascending: true })
        .order("date", { ascending: false }),
      supabase
        .from("weekly_reports")
        .select("*")
        .eq("published", true)
        .order("sort_order", { ascending: true })
        .order("date", { ascending: false }),
    ]);
    return mergeSiteContent(
      contentRes.data as { key: string; data: unknown }[] | null,
      analysisRes.data as Record<string, unknown>[] | null,
      reportRes.data as Record<string, unknown>[] | null,
    );
  } catch {
    return mergeSiteContent(null);
  }
});


/** All CMS sections merged — admin only (includes drafts from DB). */
export const getAdminSiteContent = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await ensureAdminAccess(adminContextFromHandler(context));
    const db = await loadAdminDb(adminContextFromHandler(context));
    const [contentRes, analysisRes, reportRes] = await Promise.all([
      db.from("site_content").select("key, data"),
      db
        .from("analyses")
        .select("*")
        .order("sort_order", { ascending: true })
        .order("date", { ascending: false }),
      db
        .from("weekly_reports")
        .select("*")
        .order("sort_order", { ascending: true })
        .order("date", { ascending: false }),
    ]);
    return mergeSiteContent(
      contentRes.data as { key: string; data: unknown }[] | null,
      analysisRes.data as Record<string, unknown>[] | null,
      reportRes.data as Record<string, unknown>[] | null,
    );
  });

/** Single CMS section by key — admin GET. */
export const getSiteContentSection = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .validator((input: unknown) =>
    z
      .object({
        key: z.string().refine((k) => (siteContentKeys as string[]).includes(k), {
          message: "Unknown content section",
        }),
      })
      .parse(input),
  )
  .handler(async ({ data, context }) => {
    const ctx = adminContextFromHandler(context);
    await ensureAdminAccess(ctx);
    const db = await loadAdminDb(ctx);
    const { data: row, error } = await db
      .from("site_content")
      .select("key, data")
      .eq("key", data.key)
      .maybeSingle();
    if (error) throw new Error(error.message);
    if (row?.data) return row.data;
    return defaultSiteContent[data.key as keyof typeof defaultSiteContent];
  });

export const saveSiteContentSection = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .validator((input: unknown) =>
    z
      .object({
        key: z.string().refine((k) => (siteContentKeys as string[]).includes(k), {
          message: "Unknown content section",
        }),
        data: z.unknown(),
      })
      .parse(input),
  )
  .handler(async ({ data, context }) => {
    const ctx = adminContextFromHandler(context);
    await ensureAdminAccess(ctx);
    const db = await loadAdminDb(ctx);

    const { error } = await db.from("site_content").upsert(
      {
        key: data.key,
        data: data.data as never,
        updated_at: new Date().toISOString(),
        updated_by: context.userId,
      },
      { onConflict: "key" },
    );
    if (error) throw new Error(error.message);
    return { ok: true as const };
  });

export const resetSiteContentSection = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .validator((input: unknown) => z.object({ key: z.string() }).parse(input))
  .handler(async ({ data, context }) => {
    const ctx = adminContextFromHandler(context);
    await ensureAdminAccess(ctx);
    const db = await loadAdminDb(ctx);
    const { error } = await db.from("site_content").delete().eq("key", data.key);
    if (error) throw new Error(error.message);
    return { ok: true as const };
  });
