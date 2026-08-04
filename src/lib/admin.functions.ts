import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

/** Site owner email — auto-granted admin on sign-in (no Supabase dashboard needed). */
const BOOTSTRAP_ADMIN_EMAIL = (
  process.env.BOOTSTRAP_ADMIN_EMAIL || "chartanalyst1000@gmail.com"
)
  .trim()
  .toLowerCase();

export type AdminOverview = {
  email: string;
  analyses: { total: number; published: number; drafts: number; featured: number };
  reports: { total: number; published: number; drafts: number };
  trades: { total: number; published: number; drafts: number };
  contacts: { total: number; unhandled: number };
  recentAnalyses: Array<{
    id: string;
    title: string;
    date: string;
    published: boolean;
    pair: string;
  }>;
  recentContacts: Array<{
    id: string;
    name: string;
    email: string;
    createdAt: string;
    topic: string;
  }>;
  recentTrades: Array<{
    id: string;
    instrument: string;
    date: string;
    rMultiple: number;
    published: boolean;
  }>;
};

type AdminFnContext = {
  supabase: {
    rpc: (
      fn: string,
      args: Record<string, unknown>,
    ) => Promise<{ data: unknown; error: { message: string } | null }>;
  };
  userId: string;
  claims?: { email?: string };
};

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
        "Owner admin needs the Supabase service role on the server. In Lovable: open your project → Cloud → connect Supabase (or add SUPABASE_SERVICE_ROLE_KEY in Secrets), publish, then sign in again at /auth.",
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

async function loadAdminSupabase() {
  const mod = await import("@/integrations/supabase/client.server");
  return mod.createSupabaseAdminClient();
}

/** Verify admin access, bootstrapping the first admin when allowed. */
async function ensureAdminAccess(context: AdminFnContext): Promise<{ bootstrapped: boolean }> {
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
      "Owner sign-in worked but admin role could not be activated. In Lovable Cloud, connect Supabase or add SUPABASE_SERVICE_ROLE_KEY in Secrets, publish, then sign in again at /auth.",
    );
  }

  throw new Error("Forbidden");
}

async function loadAdminDb(context: AdminFnContext) {
  try {
    return await loadAdminSupabase();
  } catch {
    return context.supabase;
  }
}

/** Is the caller an admin? Also claims admin for the allowed bootstrap account. */
export const getAdminStatus = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const email = String(
      (context.claims as { email?: string } | undefined)?.email ?? "",
    )
      .trim()
      .toLowerCase();

    try {
      const { bootstrapped } = await ensureAdminAccess({
        supabase: context.supabase,
        userId: context.userId,
        claims: context.claims as { email?: string } | undefined,
      });
      return { isAdmin: true as const, bootstrapped, email };
    } catch (error) {
      const message = error instanceof Error ? error.message : "Could not verify admin access";
      if (message === "Forbidden") {
        return { isAdmin: false as const, bootstrapped: false, email, message: null };
      }
      return { isAdmin: false as const, bootstrapped: false, email, message };
    }
  });

/** Live counts and recent activity for the admin overview dashboard. */
export const getAdminOverview = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }): Promise<AdminOverview> => {
    await ensureAdminAccess({
      supabase: context.supabase,
      userId: context.userId,
      claims: context.claims as { email?: string } | undefined,
    });

    const email = String((context.claims as { email?: string } | undefined)?.email ?? "");
    const db = await loadAdminDb({
      supabase: context.supabase,
      userId: context.userId,
      claims: context.claims as { email?: string } | undefined,
    });

    const [analysesRes, reportsRes, tradesRes, contactRes, inquiryRes] = await Promise.all([
      db
        .from("analyses")
        .select("id, title, date, published, featured, pair")
        .order("date", { ascending: false })
        .limit(50),
      db.from("weekly_reports").select("id, published").order("date", { ascending: false }),
      db
        .from("trading_results")
        .select("id, instrument, date, r_multiple, published")
        .order("date", { ascending: false })
        .limit(50),
      db
        .from("contact_submissions")
        .select("id, name, email, topic, created_at")
        .order("created_at", { ascending: false })
        .limit(20),
      db
        .from("inquiries")
        .select("id, name, email, message, handled, created_at")
        .order("created_at", { ascending: false })
        .limit(20),
    ]);

    const analyses = (analysesRes.data ?? []) as Array<{
      id: string;
      title: string;
      date: string;
      published: boolean;
      featured: boolean;
      pair: string;
    }>;
    const reports = (reportsRes.data ?? []) as Array<{ id: string; published: boolean }>;
    const trades = (tradesRes.data ?? []) as Array<{
      id: string;
      instrument: string;
      date: string;
      r_multiple: number;
      published: boolean;
    }>;

    const contactRows = (contactRes.data ?? []) as Array<{
      id: string;
      name: string;
      email: string;
      topic: string;
      created_at: string;
    }>;
    const inquiryRows = (inquiryRes.data ?? []) as Array<{
      id: string;
      name: string;
      email: string;
      message: string;
      handled: boolean;
      created_at: string;
    }>;

    const unhandledInquiries = inquiryRows.filter((r) => !r.handled).length;
    const contactTotal = contactRows.length + inquiryRows.length;

    const recentContacts = [
      ...contactRows.map((r) => ({
        id: r.id,
        name: r.name,
        email: r.email,
        createdAt: r.created_at,
        topic: r.topic || "Contact form",
      })),
      ...inquiryRows.map((r) => {
        const topicMatch = String(r.message ?? "").match(/^\[([^\]]+)\]/);
        return {
          id: r.id,
          name: r.name,
          email: r.email,
          createdAt: r.created_at,
          topic: topicMatch?.[1] ?? "Enquiry",
        };
      }),
    ]
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
      .slice(0, 5);

    return {
      email,
      analyses: {
        total: analyses.length,
        published: analyses.filter((a) => a.published).length,
        drafts: analyses.filter((a) => !a.published).length,
        featured: analyses.filter((a) => a.featured).length,
      },
      reports: {
        total: reports.length,
        published: reports.filter((r) => r.published).length,
        drafts: reports.filter((r) => !r.published).length,
      },
      trades: {
        total: trades.length,
        published: trades.filter((t) => t.published).length,
        drafts: trades.filter((t) => !t.published).length,
      },
      contacts: {
        total: contactTotal,
        unhandled: contactRows.length + unhandledInquiries,
      },
      recentAnalyses: analyses.slice(0, 5).map((a) => ({
        id: a.id,
        title: a.title,
        date: String(a.date ?? "").slice(0, 10),
        published: Boolean(a.published),
        pair: a.pair ?? "",
      })),
      recentContacts,
      recentTrades: trades.slice(0, 5).map((t) => ({
        id: t.id,
        instrument: t.instrument,
        date: String(t.date ?? "").slice(0, 10),
        rMultiple: Number(t.r_multiple ?? 0),
        published: Boolean(t.published),
      })),
    };
  });
