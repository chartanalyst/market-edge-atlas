import { format } from "date-fns";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { ArrowUpRight, Mail, TrendingUp } from "lucide-react";
import { getAdminOverview } from "@/lib/admin.functions";
import { AdminPanelSkeleton } from "@/components/admin/dashboard-skeleton";
import {
  AdminBadge,
  AdminCard,
  AdminErrorState,
  AdminSectionHeader,
  AdminStatCard,
} from "@/components/admin/admin-ui";
import { liveQueryOptions } from "@/lib/live-poll";
import type { AdminTabKey } from "@/components/admin/admin-nav";

export function AdminOverview({
  onNavigate,
  enabled = true,
}: {
  onNavigate: (tab: AdminTabKey) => void;
  enabled?: boolean;
}) {
  const fetchOverview = useServerFn(getAdminOverview);
  const { data, isLoading, isError, error, refetch, isFetching } = useQuery({
    queryKey: ["admin-overview"],
    queryFn: () => fetchOverview(),
    enabled,
    ...liveQueryOptions,
  });

  if (isLoading) {
    return <AdminPanelSkeleton />;
  }

  if (isError || !data) {
    return (
      <AdminErrorState
        message={error instanceof Error ? error.message : "Could not load dashboard stats."}
        onRetry={() => refetch()}
      />
    );
  }

  return (
    <div>
      <AdminSectionHeader
        title="Overview"
        description="Live snapshot from your database — analyses, reports, journal trades and contact enquiries."
        actions={
          isFetching ? (
            <span className="eyebrow text-[0.6rem] text-muted-foreground">Syncing…</span>
          ) : null
        }
      />

      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <AdminStatCard
          label="Analyses"
          value={data.analyses.total}
          detail={`${data.analyses.published} live · ${data.analyses.drafts} drafts`}
          onClick={() => onNavigate("analyses-db")}
        />
        <AdminStatCard
          label="Weekly reports"
          value={data.reports.total}
          detail={`${data.reports.published} published`}
          onClick={() => onNavigate("reports-db")}
        />
        <AdminStatCard
          label="Journal trades"
          value={data.trades.total}
          detail={`${data.trades.published} on site`}
          onClick={() => onNavigate("trades-db")}
        />
        <AdminStatCard
          label="Contact inbox"
          value={data.contacts.total}
          detail={
            data.contacts.unhandled > 0
              ? `${data.contacts.unhandled} need attention`
              : "All caught up"
          }
          onClick={() => onNavigate("contact-inbox")}
        />
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        <AdminCard>
          <div className="flex items-center justify-between gap-3">
            <p className="font-display text-sm font-semibold">Recent analyses</p>
            <button
              type="button"
              onClick={() => onNavigate("analyses-db")}
              className="inline-flex items-center gap-1 text-xs font-semibold text-emerald hover:underline"
            >
              View all <ArrowUpRight className="h-3.5 w-3.5" />
            </button>
          </div>
          {data.recentAnalyses.length === 0 ? (
            <p className="mt-4 text-sm text-muted-foreground">No analyses in the database yet.</p>
          ) : (
            <ul className="mt-4 grid gap-px border border-border bg-border">
              {data.recentAnalyses.map((a) => (
                <li key={a.id} className="bg-surface px-4 py-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="num text-xs text-muted-foreground">{a.date}</span>
                    <AdminBadge variant={a.published ? "emerald" : "muted"}>
                      {a.published ? "Live" : "Draft"}
                    </AdminBadge>
                    {a.pair ? <AdminBadge>{a.pair}</AdminBadge> : null}
                  </div>
                  <p className="mt-1.5 truncate text-sm font-medium">{a.title}</p>
                </li>
              ))}
            </ul>
          )}
        </AdminCard>

        <AdminCard>
          <div className="flex items-center justify-between gap-3">
            <p className="font-display text-sm font-semibold">Recent enquiries</p>
            <button
              type="button"
              onClick={() => onNavigate("contact-inbox")}
              className="inline-flex items-center gap-1 text-xs font-semibold text-emerald hover:underline"
            >
              Inbox <Mail className="h-3.5 w-3.5" />
            </button>
          </div>
          {data.recentContacts.length === 0 ? (
            <p className="mt-4 text-sm text-muted-foreground">No contact submissions yet.</p>
          ) : (
            <ul className="mt-4 grid gap-px border border-border bg-border">
              {data.recentContacts.map((c) => (
                <li key={c.id} className="bg-surface px-4 py-3">
                  <p className="text-sm font-medium">{c.name}</p>
                  <p className="mt-0.5 text-xs text-emerald">{c.email}</p>
                  <p className="mt-1 num text-xs text-muted-foreground">
                    {c.createdAt
                      ? format(new Date(c.createdAt), "d MMM yyyy · HH:mm")
                      : "—"}
                    {c.topic ? ` · ${c.topic}` : ""}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </AdminCard>

        <AdminCard className="lg:col-span-2">
          <div className="flex items-center justify-between gap-3">
            <p className="font-display text-sm font-semibold">Latest journal entries</p>
            <button
              type="button"
              onClick={() => onNavigate("trades-db")}
              className="inline-flex items-center gap-1 text-xs font-semibold text-emerald hover:underline"
            >
              Journal <TrendingUp className="h-3.5 w-3.5" />
            </button>
          </div>
          {data.recentTrades.length === 0 ? (
            <p className="mt-4 text-sm text-muted-foreground">No trades logged yet.</p>
          ) : (
            <div className="mt-4 overflow-x-auto border border-border">
              <table className="w-full min-w-[480px] text-left text-sm">
                <thead className="border-b border-border bg-surface font-mono text-[0.65rem] uppercase tracking-[0.14em] text-muted-foreground">
                  <tr>
                    <th className="px-4 py-2.5 font-medium">Date</th>
                    <th className="px-4 py-2.5 font-medium">Asset</th>
                    <th className="px-4 py-2.5 font-medium">R</th>
                    <th className="px-4 py-2.5 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {data.recentTrades.map((t) => (
                    <tr key={t.id} className="border-b border-border last:border-0">
                      <td className="num px-4 py-2.5 text-muted-foreground">{t.date}</td>
                      <td className="px-4 py-2.5 font-medium">{t.instrument}</td>
                      <td className={`num px-4 py-2.5 font-semibold ${t.rMultiple >= 0 ? "text-emerald" : "text-destructive"}`}>
                        {t.rMultiple >= 0 ? "+" : ""}
                        {t.rMultiple}R
                      </td>
                      <td className="px-4 py-2.5">
                        <AdminBadge variant={t.published ? "emerald" : "muted"}>
                          {t.published ? "Live" : "Draft"}
                        </AdminBadge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </AdminCard>
      </div>
    </div>
  );
}
