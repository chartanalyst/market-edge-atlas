import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { adminContextFromHandler, ensureAdminAccess, loadAdminSupabase } from "@/lib/admin-guard";

const uploadSchema = z.object({
  path: z.string().min(1).max(500),
  contentType: z.string().min(1).max(120),
  base64: z.string().min(1),
});

/** Admin-only media upload (images, PDFs) — uses service role storage. */
export const uploadAdminMedia = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .validator((input: unknown) => uploadSchema.parse(input))
  .handler(async ({ data, context }) => {
    await ensureAdminAccess(adminContextFromHandler(context));

    const admin = await loadAdminSupabase();
    const body = Buffer.from(data.base64, "base64");

    const { error } = await admin.storage.from("media").upload(data.path, body, {
      contentType: data.contentType,
      upsert: true,
      cacheControl: "31536000",
    });
    if (error) throw new Error(error.message);

    return {
      url: `/api/public/media/${data.path}`,
      path: data.path,
    };
  });

/** Admin-only media delete. */
export const deleteAdminMedia = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .validator((input: unknown) => z.object({ path: z.string().min(1) }).parse(input))
  .handler(async ({ data, context }) => {
    await ensureAdminAccess(adminContextFromHandler(context));

    const admin = await loadAdminSupabase();
    const storagePath = data.path.replace(/^\/api\/public\/media\//, "");
    const { error } = await admin.storage.from("media").remove([storagePath]);
    if (error) throw new Error(error.message);
    return { ok: true as const };
  });
