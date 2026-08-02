import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

/** Initial developer admin — only this email can claim first-admin bootstrap. */
const BOOTSTRAP_ADMIN_EMAIL = (
  process.env.BOOTSTRAP_ADMIN_EMAIL || "mdimam.cse9.bu@gmail.com"
)
  .trim()
  .toLowerCase();

/** Is the caller an admin? Also claims admin for the allowed bootstrap account. */
export const getAdminStatus = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data: isAdmin } = await context.supabase.rpc("has_role", {
      _user_id: context.userId,
      _role: "admin",
    });
    if (isAdmin) return { isAdmin: true as const, bootstrapped: false };

    const email = String(
      (context.claims as { email?: string } | undefined)?.email ?? "",
    )
      .trim()
      .toLowerCase();

    if (!email || email !== BOOTSTRAP_ADMIN_EMAIL) {
      return { isAdmin: false as const, bootstrapped: false };
    }

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { count } = await supabaseAdmin
      .from("user_roles")
      .select("id", { count: "exact", head: true })
      .eq("role", "admin");

    if ((count ?? 0) > 0) return { isAdmin: false as const, bootstrapped: false };

    const { error } = await supabaseAdmin
      .from("user_roles")
      .insert({ user_id: context.userId, role: "admin" });
    if (error) return { isAdmin: false as const, bootstrapped: false };
    return { isAdmin: true as const, bootstrapped: true };
  });
