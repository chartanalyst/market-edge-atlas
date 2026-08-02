import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { mergeSiteContent, siteContentKeys } from "@/lib/site-content";
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


export const saveSiteContentSection = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) =>
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
    const { data: isAdmin } = await context.supabase.rpc("has_role", {
      _user_id: context.userId,
      _role: "admin",
    });
    if (!isAdmin) throw new Error("Forbidden");

    const { error } = await context.supabase.from("site_content").upsert(
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
  .inputValidator((input: unknown) => z.object({ key: z.string() }).parse(input))
  .handler(async ({ data, context }) => {
    const { data: isAdmin } = await context.supabase.rpc("has_role", {
      _user_id: context.userId,
      _role: "admin",
    });
    if (!isAdmin) throw new Error("Forbidden");
    const { error } = await context.supabase.from("site_content").delete().eq("key", data.key);
    if (error) throw new Error(error.message);
    return { ok: true as const };
  });
