import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import {
  adminContextFromHandler,
  ensureAdminAccess,
  loadAdminDb,
} from "@/lib/admin-guard";

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

/** Is the caller an admin? Also claims admin for the allowed bootstrap account. */
export const getAdminStatus = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const ctx = adminContextFromHandler(context);
    const email = String(ctx.claims?.email ?? "")
      .trim()
      .toLowerCase();

    try {
      const { bootstrapped } = await ensureAdminAccess(ctx);
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
    const ctx = adminContextFromHandler(context);
    await ensureAdminAccess(ctx);

    const email = String(ctx.claims?.email ?? "");
    const db = await loadAdminDb(ctx);

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
