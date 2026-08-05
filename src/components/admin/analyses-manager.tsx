import { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import { ArrowLeft, Pin, Plus, Save, Star, Trash2 } from "lucide-react";
import {
  deleteAnalysis,
  getAnalysis,
  listAllAnalyses,
  saveAnalysis,
} from "@/lib/analyses.functions";
import {
  emptyAnalysis,
  marketOptions,
  type AnalysisRecord,
} from "@/lib/analysis-model";
import {
  AdminBadge,
  AdminEmptyState,
  AdminErrorState,
  AdminListRow,
  AdminListShell,
  AdminSearch,
  AdminSectionHeader,
  adminBtn,
  adminBtnPrimary,
  adminInput,
} from "@/components/admin/admin-ui";
import { AdminPanelSkeleton } from "@/components/admin/dashboard-skeleton";
import { FieldControl } from "@/components/admin/field-control";
import { FileUpload, GalleryUpload, ImageUpload } from "@/components/admin/upload-zone";
import { liveQueryOptions } from "@/lib/live-poll";

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 100);
}

export function AnalysesManager() {
  const queryClient = useQueryClient();
  const fetchAll = useServerFn(listAllAnalyses);
  const save = useServerFn(saveAnalysis);
  const remove = useServerFn(deleteAnalysis);

  const list = useQuery({
    queryKey: ["admin-analyses"],
    queryFn: () => fetchAll(),
    ...liveQueryOptions,
  });
  const fetchOne = useServerFn(getAnalysis);
  const [draft, setDraft] = useState<AnalysisRecord | null>(null);
  const [query, setQuery] = useState("");

  async function openEditor(record: AnalysisRecord) {
    if (!record.id) {
      setDraft(structuredClone(record));
      return;
    }
    try {
      setDraft(await fetchOne({ data: { id: record.id } }));
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not load analysis");
      setDraft(structuredClone(record));
    }
  }

  const saveMutation = useMutation({
    mutationFn: (record: AnalysisRecord) => save({ data: record }),
    onSuccess: async () => {
      toast.success("Analysis saved", { description: "Published items are live immediately." });
      await queryClient.invalidateQueries({ queryKey: ["admin-analyses"] });
      await queryClient.invalidateQueries({ queryKey: ["site-content"] });
      await queryClient.invalidateQueries({ queryKey: ["published-analyses"] });
      await queryClient.invalidateQueries({ queryKey: ["admin-overview"] });
      setDraft(null);
    },
    onError: (error) => toast.error(error instanceof Error ? error.message : "Could not save"),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => remove({ data: { id } }),
    onSuccess: async () => {
      toast.success("Analysis deleted");
      await queryClient.invalidateQueries({ queryKey: ["admin-analyses"] });
      await queryClient.invalidateQueries({ queryKey: ["site-content"] });
      await queryClient.invalidateQueries({ queryKey: ["published-analyses"] });
      await queryClient.invalidateQueries({ queryKey: ["admin-overview"] });
      setDraft(null);
    },
    onError: (error) => toast.error(error instanceof Error ? error.message : "Could not delete"),
  });

  const items = useMemo(() => {
    const all = list.data ?? [];
    const q = query.trim().toLowerCase();
    if (!q) return all;
    return all.filter(
      (a) =>
        a.title.toLowerCase().includes(q) ||
        a.pair.toLowerCase().includes(q) ||
        a.market.toLowerCase().includes(q),
    );
  }, [list.data, query]);

  if (draft) {
    return (
      <AnalysisEditor
        record={draft}
        onChange={setDraft}
        onBack={() => setDraft(null)}
        onSave={() => saveMutation.mutate(draft)}
        onDelete={draft.id ? () => deleteMutation.mutate(draft.id) : undefined}
        busy={saveMutation.isPending || deleteMutation.isPending}
      />
    );
  }

  return (
    <div>
      <AdminSectionHeader
        title="Analyses"
        description="Create, draft, publish, pin and delete research. Published items appear on the site instantly."
        actions={
          <button type="button" className={adminBtnPrimary} onClick={() => setDraft(emptyAnalysis())}>
            <Plus className="h-3.5 w-3.5" /> New analysis
          </button>
        }
      />

      <div className="mt-6">
        <AdminSearch value={query} onChange={setQuery} placeholder="Search title, pair, market…" />
      </div>

      {list.isLoading ? (
        <AdminPanelSkeleton />
      ) : list.isError ? (
        <AdminErrorState
          message={list.error instanceof Error ? list.error.message : "Could not load analyses."}
          onRetry={() => list.refetch()}
        />
      ) : items.length === 0 ? (
        <AdminEmptyState
          title={query ? "No matches" : "No analyses yet"}
          description={
            query
              ? "Try a different search term."
              : "Create your first case study — shipped examples stay visible on the site until you publish database rows."
          }
          action={
            !query ? (
              <button type="button" className={adminBtnPrimary} onClick={() => setDraft(emptyAnalysis())}>
                <Plus className="h-3.5 w-3.5" /> New analysis
              </button>
            ) : undefined
          }
        />
      ) : (
        <AdminListShell>
          {items.map((a) => (
            <AdminListRow key={a.id} onClick={() => openEditor(a)}>
              <span className="min-w-0">
                <span className="flex flex-wrap items-center gap-2">
                  <span className="num text-xs text-muted-foreground">{a.date}</span>
                  <AdminBadge>{a.market}</AdminBadge>
                  {a.featured ? (
                    <AdminBadge variant="emerald">
                      <span className="inline-flex items-center gap-1">
                        <Pin className="h-3 w-3" /> Featured
                      </span>
                    </AdminBadge>
                  ) : null}
                  <AdminBadge variant={a.published ? "default" : "muted"}>
                    {a.published ? "Published" : "Draft"}
                  </AdminBadge>
                </span>
                <span className="mt-2 block truncate text-sm font-semibold">{a.title}</span>
              </span>
              <span className="num text-xs text-muted-foreground">{a.rr || "—"}</span>
            </AdminListRow>
          ))}
        </AdminListShell>
      )}
    </div>
  );
}

function AnalysisEditor({
  record,
  onChange,
  onBack,
  onSave,
  onDelete,
  busy,
}: {
  record: AnalysisRecord;
  onChange: (next: AnalysisRecord) => void;
  onBack: () => void;
  onSave: () => void;
  onDelete?: () => void;
  busy: boolean;
}) {
  const set = <K extends keyof AnalysisRecord>(key: K, value: AnalysisRecord[K]) =>
    onChange({ ...record, [key]: value });

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <button onClick={onBack} className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground">
          <ArrowLeft className="h-4 w-4" /> All analyses
        </button>
        <div className="flex flex-wrap gap-2">
          {onDelete ? (
            <button className={adminBtn} disabled={busy} onClick={onDelete}>
              <Trash2 className="h-3.5 w-3.5" /> Delete
            </button>
          ) : null}
          <button
            className={adminBtn}
            disabled={busy}
            onClick={() => onChange({ ...record, published: false })}
          >
            Save as draft
          </button>
          <button className={adminBtnPrimary} disabled={busy} onClick={onSave}>
            <Save className="h-3.5 w-3.5" /> {busy ? "Saving…" : "Save"}
          </button>
        </div>
      </div>

      <div className="mt-8 grid gap-6">
        <div className="grid gap-5 border border-border bg-card p-6 sm:grid-cols-2">
          <label className="block sm:col-span-2">
            <span className="eyebrow">Title</span>
            <input
              value={record.title}
              onChange={(e) => {
                const title = e.target.value;
                onChange({
                  ...record,
                  title,
                  slug: record.slug ? record.slug : slugify(title),
                });
              }}
              className={adminInput}
            />
          </label>
          <label className="block sm:col-span-2">
            <span className="eyebrow">Subtitle</span>
            <input value={record.subtitle} onChange={(e) => set("subtitle", e.target.value)} className={adminInput} />
          </label>
          <label className="block">
            <span className="eyebrow">Slug (URL)</span>
            <input value={record.slug} onChange={(e) => set("slug", slugify(e.target.value))} className={adminInput} />
          </label>
          <label className="block">
            <span className="eyebrow">Market</span>
            <select
              value={record.market}
              onChange={(e) => set("market", e.target.value)}
              className={adminInput}
            >
              {marketOptions.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </label>
          <label className="block">
            <span className="eyebrow">Category</span>
            <input value={record.category} onChange={(e) => set("category", e.target.value)} className={adminInput} />
          </label>
          <label className="block">
            <span className="eyebrow">Instrument / pair</span>
            <input value={record.pair} onChange={(e) => set("pair", e.target.value)} className={adminInput} />
          </label>
          <label className="block">
            <span className="eyebrow">Timeframe</span>
            <input value={record.timeframe} onChange={(e) => set("timeframe", e.target.value)} className={adminInput} />
          </label>
          <label className="block">
            <span className="eyebrow">Date</span>
            <input type="date" value={record.date} onChange={(e) => set("date", e.target.value)} className={`${adminInput} num`} />
          </label>
          <label className="block">
            <span className="eyebrow">Outcome</span>
            <input value={record.outcome} onChange={(e) => set("outcome", e.target.value)} className={adminInput} />
          </label>
          <label className="block">
            <span className="eyebrow">R multiple</span>
            <input value={record.rr} onChange={(e) => set("rr", e.target.value)} className={`${adminInput} num`} />
          </label>
          <label className="block">
            <span className="eyebrow">TradingView link</span>
            <input value={record.tradingviewUrl} onChange={(e) => set("tradingviewUrl", e.target.value)} className={adminInput} />
          </label>
          <label className="block">
            <span className="eyebrow">Sort order</span>
            <input
              type="number"
              value={record.sortOrder}
              onChange={(e) => set("sortOrder", Number(e.target.value) || 0)}
              className={`${adminInput} num`}
            />
          </label>
          <div className="flex flex-wrap gap-3 sm:col-span-2">
            <label className="flex items-center gap-3 border border-border bg-background px-4 py-2.5">
              <input
                type="checkbox"
                checked={record.published}
                onChange={(e) => set("published", e.target.checked)}
                className="h-4 w-4 accent-emerald"
              />
              <span className="eyebrow">Published</span>
            </label>
            <label className="flex items-center gap-3 border border-border bg-background px-4 py-2.5">
              <input
                type="checkbox"
                checked={record.featured}
                onChange={(e) => set("featured", e.target.checked)}
                className="h-4 w-4 accent-emerald"
              />
              <span className="eyebrow inline-flex items-center gap-1.5">
                <Star className="h-3.5 w-3.5" /> Pin as featured
              </span>
            </label>
          </div>
        </div>

        <div className="grid gap-5 border border-border bg-card p-6">
          <label className="block">
            <span className="eyebrow">Summary (cards & meta description)</span>
            <textarea rows={3} value={record.summary} onChange={(e) => set("summary", e.target.value)} className={`${adminInput} resize-y`} />
          </label>
          <label className="block">
            <span className="eyebrow">Full description</span>
            <textarea rows={6} value={record.description} onChange={(e) => set("description", e.target.value)} className={`${adminInput} resize-y`} />
          </label>
          <label className="block">
            <span className="eyebrow">Bias</span>
            <input value={record.bias} onChange={(e) => set("bias", e.target.value)} className={adminInput} />
          </label>
          <label className="block">
            <span className="eyebrow">Market structure</span>
            <textarea rows={4} value={record.marketStructure} onChange={(e) => set("marketStructure", e.target.value)} className={`${adminInput} resize-y`} />
          </label>
          <label className="block">
            <span className="eyebrow">Invalidation</span>
            <textarea rows={2} value={record.invalidation} onChange={(e) => set("invalidation", e.target.value)} className={`${adminInput} resize-y`} />
          </label>
          <FieldControl
            field={{ name: "thesis", label: "Thesis points", type: "stringList" }}
            value={record.thesis}
            onChange={(next) => set("thesis", next as string[])}
          />
          <FieldControl
            field={{
              name: "targets",
              label: "Targets & key levels",
              type: "objectList",
              fields: [
                { name: "label", label: "Label", type: "text" },
                { name: "value", label: "Value", type: "text" },
              ],
            }}
            value={record.targets}
            onChange={(next) => set("targets", next as AnalysisRecord["targets"])}
          />
          <FieldControl
            field={{ name: "tags", label: "Tags", type: "stringList" }}
            value={record.tags}
            onChange={(next) => set("tags", next as string[])}
          />
          <FieldControl
            field={{ name: "series", label: "Chart series", type: "numberList" }}
            value={record.series}
            onChange={(next) => set("series", next as number[])}
          />
        </div>

        <div className="grid gap-6 border border-border bg-card p-6">
          <ImageUpload label="Cover image" value={record.coverImage} onChange={(url) => set("coverImage", url)} />
          <GalleryUpload label="Gallery / chart images" value={record.gallery} onChange={(urls) => set("gallery", urls)} />
          <FileUpload label="PDF attachment" value={record.pdfUrl} onChange={(url) => set("pdfUrl", url)} />
        </div>
      </div>
    </div>
  );
}
