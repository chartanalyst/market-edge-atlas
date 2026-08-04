/** Site owner email — auto-granted admin on sign-in. */
export const BOOTSTRAP_ADMIN_EMAIL = (
  process.env.BOOTSTRAP_ADMIN_EMAIL || "chartanalyst1000@gmail.com"
)
  .trim()
  .toLowerCase();

export type AdminFnContext = {
  supabase: {
    rpc: (
      fn: string,
      args: Record<string, unknown>,
    ) => Promise<{ data: unknown; error: { message: string } | null }>;
    from: (table: string) => unknown;
  };
  userId: string;
  claims?: { email?: string };
};

export function adminContextFromHandler(context: {
  supabase: AdminFnContext["supabase"];
  userId: string;
  claims?: unknown;
}): AdminFnContext {
  return {
    supabase: context.supabase,
    userId: context.userId,
    claims: context.claims as { email?: string } | undefined,
  };
}

async function checkHasRole(context: AdminFnContext): Promise<boolean> {
  const { data, error } = await context.supabase.rpc("has_role", {
    _user_id: context.userId,
    _role: "admin",
  });
  if (error) {
    throw new Error(
      `Admin role check failed (${error.message}). Apply Supabase migrations in supabase/migrations/.`,
    );
  }
  return Boolean(data);
}

async function tryBootstrapAdmin(context: AdminFnContext): Promise<boolean> {
  const email = String(context.claims?.email ?? "")
    .trim()
    .toLowerCase();
  if (!email || email !== BOOTSTRAP_ADMIN_EMAIL) return false;

  let supabaseAdmin: Awaited<
    ReturnType<(typeof import("@/integrations/supabase/client.server"))["createSupabaseAdminClient"]>
  >;
  try {
    const mod = await import("@/integrations/supabase/client.server");
    supabaseAdmin = mod.createSupabaseAdminClient();
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Could not load admin client";
    if (msg.includes("SUPABASE_SERVICE_ROLE_KEY") || msg.includes("service role")) {
      throw new Error(
        "Owner admin needs Supabase service role on the server. In Lovable Cloud → connect Supabase → Publish, then sign in at /auth.",
      );
    }
    throw error;
  }

  const { error } = await supabaseAdmin.from("user_roles").upsert(
    { user_id: context.userId, role: "admin" },
    { onConflict: "user_id,role" },
  );
  if (error) {
    if (error.code === "23505") return true;
    throw new Error(`Could not assign admin role: ${error.message}`);
  }

  return true;
}

/** Verify admin access; bootstraps site owner when allowed. Throws on failure. */
export async function ensureAdminAccess(
  context: AdminFnContext,
): Promise<{ bootstrapped: boolean }> {
  if (await checkHasRole(context)) {
    return { bootstrapped: false };
  }

  const bootstrapped = await tryBootstrapAdmin(context);
  if (bootstrapped && (await checkHasRole(context))) {
    return { bootstrapped: true };
  }

  const email = String(context.claims?.email ?? "")
    .trim()
    .toLowerCase();
  if (email === BOOTSTRAP_ADMIN_EMAIL) {
    throw new Error(
      "Owner sign-in worked but admin role is not active. Connect Supabase in Lovable Cloud and publish, then sign in again.",
    );
  }

  throw new Error("Forbidden");
}

export async function loadAdminSupabase() {
  const mod = await import("@/integrations/supabase/client.server");
  return mod.createSupabaseAdminClient();
}

export async function loadAdminDb(context: AdminFnContext) {
  try {
    return await loadAdminSupabase();
  } catch {
    return context.supabase;
  }
}
