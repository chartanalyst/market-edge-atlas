import { useEffect, useMemo, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import { LogOut, RotateCcw, Save } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import {
  getSiteContent,
  resetSiteContentSection,
  saveSiteContentSection,
} from "@/lib/content.functions";
import { getAdminStatus } from "@/lib/admin.functions";
import { adminSections, type AdminSection } from "@/lib/admin-schema";
import { defaultSiteContent, type SiteContentKey } from "@/lib/site-content";
import { FieldControl } from "@/components/admin/field-control";
import { AnalysesManager } from "@/components/admin/analyses-manager";
import { ReportsManager } from "@/components/admin/reports-manager";

const title = "Content admin — Technical Market Analyst";

export const Route = createFileRoute("/_authenticated/admin")({
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
  const fetchContent = useServerFn(getSiteContent);
  const fetchStatus = useServerFn(getAdminStatus);
  const save = useServerFn(saveSiteContentSection);
  const reset = useServerFn(resetSiteContentSection);

  const status = useQuery({ queryKey: ["admin-status"], queryFn: () => fetchStatus() });
  const content = useQuery({ queryKey: ["site-content"], queryFn: () => fetchContent() });

  const [activeKey, setActiveKey] = useState<SiteContentKey | "analyses-db" | "reports-db">("analyses-db");
  const [draft, setDraft] = useState<unknown>(null);

  const section = useMemo(
    () => adminSections.find((s) => s.key === activeKey) as AdminSection | undefined,
    [activeKey],
  );

  useEffect(() => {
    if (!content.data || activeKey === "analyses-db" || activeKey === "reports-db") return;
    setDraft(structuredClone(content.data[activeKey]));
  }, [content.data, activeKey]);

  const saveMutation = useMutation({
    mutationFn: () => save({ data: { key: activeKey as string, data: draft } }),
    onSuccess: async () => {
      toast.success(`${section?.label ?? "Section"} saved`, { description: "The live site is updated." });
      await queryClient.invalidateQueries({ queryKey: ["site-content"] });
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

  if (status.isLoading || content.isLoading) {
    return <Shell><p className="text-sm text-muted-foreground">Loading dashboard…</p></Shell>;
  }

  if (status.data && !status.data.isAdmin) {
    return (
      <Shell>
        <h1 className="text-2xl font-semibold tracking-[-0.02em]">No editor access</h1>
        <p className="mt-3 max-w-lg text-sm text-muted-foreground">
          This account is signed in but is not the site owner, so it cannot edit content. Sign out
          and use the owner account.
        </p>
        <button
          onClick={signOut}
          className="mt-8 inline-flex items-center gap-2 border border-border bg-navy px-5 py-3 font-mono text-[0.7rem] uppercase tracking-[0.16em] text-navy-foreground transition-colors hover:bg-emerald"
        >
          <LogOut className="h-3.5 w-3.5" /> Sign out
        </button>
      </Shell>
    );
  }

  return (
    <main className="mx-auto w-[min(1320px,94vw)] py-16 lg:py-24">
      <div className="flex flex-wrap items-end justify-between gap-6 border-b border-border pb-8">
        <div>
          <p className="eyebrow">Content admin</p>
          <h1 className="mt-3 text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">
            Edit your website content
          </h1>
          <p className="mt-3 max-w-xl text-sm text-muted-foreground">
            Changes publish immediately. Anything you don't edit keeps the original content.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <a
            href="/"
            className="inline-flex items-center border border-border bg-background px-5 py-3 font-mono text-[0.7rem] uppercase tracking-[0.16em] transition-colors hover:border-emerald hover:text-emerald"
          >
            View site
          </a>
          <button
            onClick={signOut}
            className="inline-flex items-center gap-2 border border-border bg-background px-5 py-3 font-mono text-[0.7rem] uppercase tracking-[0.16em] transition-colors hover:border-emerald hover:text-emerald"
          >
            <LogOut className="h-3.5 w-3.5" /> Sign out
          </button>
        </div>
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-[260px_1fr]">
        <nav className="lg:sticky lg:top-28 lg:self-start">
          <p className="eyebrow">Sections</p>
          <ul className="mt-4 grid gap-px border border-border bg-border">
            <li>
              <button
                onClick={() => setActiveKey("analyses-db")}
                className={`w-full bg-card px-4 py-3 text-left text-sm transition-colors hover:text-emerald ${
                  activeKey === "analyses-db" ? "bg-surface font-semibold text-emerald" : ""
                }`}
              >
                Analyses (research)
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveKey("reports-db")}
                className={`w-full bg-card px-4 py-3 text-left text-sm transition-colors hover:text-emerald ${
                  activeKey === "reports-db" ? "bg-surface font-semibold text-emerald" : ""
                }`}
              >
                Weekly reports
              </button>
            </li>
            {adminSections.map((s) => (
              <li key={s.key}>
                <button
                  onClick={() => setActiveKey(s.key)}
                  className={`w-full bg-card px-4 py-3 text-left text-sm transition-colors hover:text-emerald ${
                    s.key === activeKey ? "bg-surface font-semibold text-emerald" : ""
                  }`}
                >
                  {s.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <section className="min-w-0">
          {activeKey === "reports-db" ? (
            <ReportsManager />
          ) : activeKey === "analyses-db" || !section ? (
            <AnalysesManager />
          ) : (
          <>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold">{section.label}</h2>
              <p className="mt-1.5 text-sm text-muted-foreground">{section.blurb}</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => resetMutation.mutate()}
                disabled={resetMutation.isPending}
                className="inline-flex items-center gap-2 border border-border bg-background px-4 py-2.5 font-mono text-[0.68rem] uppercase tracking-[0.16em] transition-colors hover:border-emerald hover:text-emerald disabled:opacity-60"
              >
                <RotateCcw className="h-3.5 w-3.5" /> Restore defaults
              </button>
              <button
                onClick={() => saveMutation.mutate()}
                disabled={saveMutation.isPending || draft === null}
                className="inline-flex items-center gap-2 border border-border bg-navy px-5 py-2.5 font-mono text-[0.68rem] uppercase tracking-[0.16em] text-navy-foreground transition-colors hover:bg-emerald disabled:opacity-60"
              >
                <Save className="h-3.5 w-3.5" />
                {saveMutation.isPending ? "Saving…" : "Save changes"}
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
                onChange={setDraft}
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
                            setDraft({
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
          )}
        </section>
      </div>
    </main>
  );
}

function Shell({ children }: { children: React.ReactNode }) {
  return <main className="mx-auto w-[min(1320px,94vw)] py-28">{children}</main>;
}
