import { useEffect, useMemo, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import { ExternalLink, LogOut, RotateCcw, Save } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import {
  getAdminSiteContent,
  getSiteContentSection,
  resetSiteContentSection,
  saveSiteContentSection,
} from "@/lib/content.functions";
import { getAdminOverview, getAdminStatus } from "@/lib/admin.functions";
import { adminSections, type AdminSection } from "@/lib/admin-schema";
import { defaultSiteContent, type SiteContentKey } from "@/lib/site-content";
import { FieldControl } from "@/components/admin/field-control";
import { AnalysesManager } from "@/components/admin/analyses-manager";
import { ReportsManager } from "@/components/admin/reports-manager";
import { TradesManager } from "@/components/admin/trades-manager";
import { ContactInbox } from "@/components/admin/contact-inbox";
import { AdminDashboardSkeleton } from "@/components/admin/dashboard-skeleton";
import { AdminOverview } from "@/components/admin/admin-overview";
import { AdminSidebar, buildAdminNav, type AdminTabKey } from "@/components/admin/admin-nav";
import { AdminErrorState, adminBtn, adminBtnPrimary } from "@/components/admin/admin-ui";
import { liveQueryOptions } from "@/lib/live-poll";

const title = "Content admin — Market Edge Atlas";

export const Route = createFileRoute("/_authenticated/admin")({
  pendingComponent: AdminDashboardSkeleton,
  pendingMs: 120,
  head: () => ({
    meta: [
      { title },
      { name: "description", content: "Private dashboard for editing website content." },
      { property: "og:title", content: title },
      { property: "og:description", content: "Private dashboard for editing website content." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminPage,
});

function AdminPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const fetchContent = useServerFn(getAdminSiteContent);
  const fetchSection = useServerFn(getSiteContentSection);
  const fetchStatus = useServerFn(getAdminStatus);
  const fetchOverview = useServerFn(getAdminOverview);
  const save = useServerFn(saveSiteContentSection);
  const reset = useServerFn(resetSiteContentSection);

  const status = useQuery({
    queryKey: ["admin-status"],
    queryFn: () => fetchStatus(),
    ...liveQueryOptions,
  });
  const content = useQuery({
    queryKey: ["site-content"],
    queryFn: () => fetchContent(),
    ...liveQueryOptions,
  });
  const overview = useQuery({
    queryKey: ["admin-overview"],
    queryFn: () => fetchOverview(),
    enabled: status.data?.isAdmin === true,
    ...liveQueryOptions,
  });

  const [activeKey, setActiveKey] = useState<AdminTabKey>("overview");
  const [draft, setDraft] = useState<unknown>(null);

  const isCmsSection =
    activeKey !== "overview" &&
    activeKey !== "analyses-db" &&
    activeKey !== "reports-db" &&
    activeKey !== "trades-db" &&
    activeKey !== "contact-inbox";

  const sectionQuery = useQuery({
    queryKey: ["admin-cms-section", activeKey],
    queryFn: () => fetchSection({ data: { key: activeKey as string } }),
    enabled: isCmsSection && status.data?.isAdmin === true,
    ...liveQueryOptions,
  });

  const section = useMemo(
    () => adminSections.find((s) => s.key === activeKey) as AdminSection | undefined,
    [activeKey],
  );

  const savedJson = useMemo(() => {
    if (!section) return "";
    const fromBulk = content.data?.[activeKey as SiteContentKey];
    const fromSection = sectionQuery.data;
    const source = fromSection ?? fromBulk;
    if (source === undefined) return "";
    return JSON.stringify(source);
  }, [content.data, sectionQuery.data, activeKey, section]);

  const isDirty = useMemo(() => {
    if (!section || draft === null) return false;
    return JSON.stringify(draft) !== savedJson;
  }, [draft, savedJson, section]);

  useEffect(() => {
    if (!isCmsSection) return;
    if (sectionQuery.data === undefined) return;
    setDraft(structuredClone(sectionQuery.data));
  }, [sectionQuery.data, activeKey, isCmsSection]);

  useEffect(() => {
    if (!isDirty) return;
    const onBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = "";
    };
    window.addEventListener("beforeunload", onBeforeUnload);
    return () => window.removeEventListener("beforeunload", onBeforeUnload);
  }, [isDirty]);

  const saveMutation = useMutation({
    mutationFn: () => save({ data: { key: activeKey as string, data: draft } }),
    onSuccess: async () => {
      toast.success(`${section?.label ?? "Section"} saved`, {
        description: "The live site is updated.",
      });
      await queryClient.invalidateQueries({ queryKey: ["site-content"] });
      await queryClient.invalidateQueries({ queryKey: ["admin-cms-section", activeKey] });
      await queryClient.invalidateQueries({ queryKey: ["admin-overview"] });
    },
    onError: (error) =>
      toast.error(error instanceof Error ? error.message : "Could not save changes"),
  });

  const resetMutation = useMutation({
    mutationFn: () => reset({ data: { key: activeKey as string } }),
    onSuccess: async () => {
      setDraft(structuredClone(defaultSiteContent[activeKey as SiteContentKey]));
      toast.success(`${section?.label ?? "Section"} restored to defaults`);
      await queryClient.invalidateQueries({ queryKey: ["site-content"] });
      await queryClient.invalidateQueries({ queryKey: ["admin-cms-section", activeKey] });
    },
    onError: (error) =>
      toast.error(error instanceof Error ? error.message : "Could not restore defaults"),
  });

  async function signOut() {
    await queryClient.cancelQueries();
    queryClient.clear();
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
  }

  const navGroups = buildAdminNav(adminSections, {
    contacts: overview.data?.contacts.unhandled,
  });

  if (status.isLoading || content.isLoading) {
    return <AdminDashboardSkeleton />;
  }

  if (status.isError) {
    return (
      <main className="mx-auto w-[min(1320px,94vw)] py-28">
        <h1 className="text-2xl font-semibold tracking-[-0.02em]">Admin unavailable</h1>
        <AdminErrorState
          message={
            status.error instanceof Error
              ? status.error.message
              : "Could not verify admin access."
          }
          onRetry={() => status.refetch()}
        />
      </main>
    );
  }

  if (!status.data?.isAdmin) {
    return (
      <main className="mx-auto w-[min(1320px,94vw)] py-28">
        <h1 className="text-2xl font-semibold tracking-[-0.02em]">No editor access</h1>
        <p className="mt-3 max-w-lg text-sm text-muted-foreground">
          {status.data?.message ??
            "This account is signed in but is not an admin. Sign out and use the site owner account, or ask them to add your user to user_roles in Supabase."}
        </p>
        <button type="button" onClick={signOut} className={`${adminBtnPrimary} mt-8`}>
          <LogOut className="h-3.5 w-3.5" /> Sign out
        </button>
      </main>
    );
  }

  const email = status.data?.email ?? overview.data?.email ?? "";

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-surface/80 backdrop-blur-sm">
        <div className="mx-auto flex w-[min(1320px,94vw)] flex-wrap items-center justify-between gap-4 py-4">
          <div>
            <p className="eyebrow">Market Edge Atlas</p>
            <p className="mt-1 text-sm font-semibold">Content admin</p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            {email ? (
              <span className="num hidden text-xs text-muted-foreground sm:inline">{email}</span>
            ) : null}
            <a href="/" target="_blank" rel="noreferrer" className={adminBtn}>
              <ExternalLink className="h-3.5 w-3.5" /> View site
            </a>
            <button type="button" onClick={signOut} className={adminBtn}>
              <LogOut className="h-3.5 w-3.5" /> Sign out
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto w-[min(1320px,94vw)] py-10 lg:py-14">
        <div className="border-b border-border pb-8">
          <h1 className="text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">
            Manage your website
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            Everything saves to your live database. Published research, journal trades and contact
            enquiries sync to the public site automatically.
          </p>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[240px_1fr]">
          <AdminSidebar groups={navGroups} activeKey={activeKey} onSelect={setActiveKey} />

          <section className="min-w-0">
            {activeKey === "overview" ? (
              <AdminOverview enabled onNavigate={setActiveKey} />
            ) : activeKey === "reports-db" ? (
              <ReportsManager />
            ) : activeKey === "trades-db" ? (
              <TradesManager />
            ) : activeKey === "contact-inbox" ? (
              <ContactInbox />
            ) : activeKey === "analyses-db" ? (
              <AnalysesManager />
            ) : section ? (
              <CmsSectionEditor
                section={section}
                draft={draft}
                onDraftChange={setDraft}
                isDirty={isDirty}
                onSave={() => saveMutation.mutate()}
                onReset={() => resetMutation.mutate()}
                saving={saveMutation.isPending}
                resetting={resetMutation.isPending}
              />
            ) : null}
          </section>
        </div>
      </main>
    </div>
  );
}

function CmsSectionEditor({
  section,
  draft,
  onDraftChange,
  isDirty,
  onSave,
  onReset,
  saving,
  resetting,
}: {
  section: AdminSection;
  draft: unknown;
  onDraftChange: (next: unknown) => void;
  isDirty: boolean;
  onSave: () => void;
  onReset: () => void;
  saving: boolean;
  resetting: boolean;
}) {
  return (
    <>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-[-0.02em]">{section.label}</h2>
          <p className="mt-1.5 text-sm text-muted-foreground">{section.blurb}</p>
          {isDirty ? (
            <p className="mt-2 text-xs font-medium text-amber-800">Unsaved changes</p>
          ) : null}
        </div>
        <div className="flex gap-2">
          <button type="button" onClick={onReset} disabled={resetting} className={adminBtn}>
            <RotateCcw className="h-3.5 w-3.5" /> Restore defaults
          </button>
          <button
            type="button"
            onClick={onSave}
            disabled={saving || draft === null || !isDirty}
            className={adminBtnPrimary}
          >
            <Save className="h-3.5 w-3.5" />
            {saving ? "Saving…" : "Save changes"}
          </button>
        </div>
      </div>

      <div className="mt-8 grid gap-8">
        {draft === null ? null : section.kind === "list" ? (
          <FieldControl
            field={{
              name: section.key,
              label: section.itemLabel,
              type: "objectList",
              fields: section.fields,
            }}
            value={draft}
            onChange={onDraftChange}
          />
        ) : (
          section.groups.map((group) => {
            const groupValue = ((draft as Record<string, unknown>)[group.name] ??
              {}) as Record<string, unknown>;
            return (
              <div key={group.name} className="border border-border bg-card p-6">
                <h3 className="font-display text-base font-semibold">{group.label}</h3>
                <div className="mt-6 grid gap-5">
                  {group.fields.map((field) => (
                    <FieldControl
                      key={field.name}
                      field={field}
                      value={groupValue[field.name]}
                      onChange={(next) =>
                        onDraftChange({
                          ...(draft as Record<string, unknown>),
                          [group.name]: { ...groupValue, [field.name]: next },
                        })
                      }
                    />
                  ))}
                </div>
              </div>
            );
          })
        )}
      </div>
    </>
  );
}
