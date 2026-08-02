import { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import { ArrowLeft, Plus, Save, Trash2 } from "lucide-react";
import { deleteReport, listAllReports, saveReport } from "@/lib/reports.functions";
import { emptyReport, type ReportRecord } from "@/lib/report-model";
import { marketOptions } from "@/lib/analysis-model";
import { FieldControl } from "@/components/admin/field-control";
import { FileUpload, GalleryUpload, ImageUpload } from "@/components/admin/upload-zone";

const btn =
  "inline-flex items-center gap-2 border border-border bg-background px-4 py-2.5 font-mono text-[0.68rem] uppercase tracking-[0.16em] transition-colors hover:border-emerald hover:text-emerald disabled:opacity-60";
const btnPrimary =
  "inline-flex items-center gap-2 border border-border bg-navy px-5 py-2.5 font-mono text-[0.68rem] uppercase tracking-[0.16em] text-navy-foreground transition-colors hover:bg-emerald disabled:opacity-60";
const input =
  "mt-2 w-full border border-border bg-background px-3 py-2.5 text-sm outline-none transition-colors focus:border-emerald";

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 100);
}

export function ReportsManager() {
  const queryClient = useQueryClient();
  const fetchAll = useServerFn(listAllReports);
  const save = useServerFn(saveReport);
  const remove = useServerFn(deleteReport);

  const list = useQuery({ queryKey: ["admin-reports"], queryFn: () => fetchAll() });
  const [draft, setDraft] = useState<ReportRecord | null>(null);

  const invalidate = async () => {
    await queryClient.invalidateQueries({ queryKey: ["admin-reports"] });
    await queryClient.invalidateQueries({ queryKey: ["site-content"] });
  };

  const saveMutation = useMutation({
    mutationFn: (record: ReportRecord) => save({ data: record }),
    onSuccess: async () => {
      toast.success("Report saved", { description: "Published reports are live immediately." });
      await invalidate();
      setDraft(null);
    },
    onError: (error) => toast.error(error instanceof Error ? error.message : "Could not save"),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => remove({ data: { id } }),
    onSuccess: async () => {
      toast.success("Report deleted");
      await invalidate();
      setDraft(null);
    },
    onError: (error) => toast.error(error instanceof Error ? error.message : "Could not delete"),
  });

  const items = useMemo(() => list.data ?? [], [list.data]);

  if (draft) {
    return (
      <ReportEditor
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
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold">Weekly reports</h2>
          <p className="mt-1.5 text-sm text-muted-foreground">
            Create, publish, edit and delete weekly market reports with cover images, charts and
            PDFs.
          </p>
        </div>
        <button className={btnPrimary} onClick={() => setDraft(emptyReport())}>
          <Plus className="h-3.5 w-3.5" /> New report
        </button>
      </div>

      {list.isLoading ? (
        <p className="mt-8 text-sm text-muted-foreground">Loading reports…</p>
      ) : items.length === 0 ? (
        <p className="mt-8 text-sm text-muted-foreground">
          No reports yet. The Weekly Reports section appears on the site as soon as you publish one.
        </p>
      ) : (
        <ul className="mt-8 grid gap-px border border-border bg-border">
          {items.map((r) => (
            <li key={r.id} className="bg-card">
              <button
                onClick={() => setDraft(structuredClone(r))}
                className="flex w-full flex-wrap items-center justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-surface"
              >
                <span className="min-w-0">
                  <span className="flex flex-wrap items-center gap-2">
                    <span className="num text-xs text-muted-foreground">{r.date}</span>
                    <span className="border border-border px-2 py-0.5 font-mono text-[0.6rem] uppercase tracking-widest">
                      {r.market}
                    </span>
                    <span className="border border-border px-2 py-0.5 font-mono text-[0.6rem] uppercase tracking-widest text-muted-foreground">
                      {r.published ? "Published" : "Draft"}
                    </span>
                  </span>
                  <span className="mt-2 block truncate text-sm font-semibold">{r.title}</span>
                </span>
                <span className="num text-xs text-muted-foreground">{r.asset || "—"}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function ReportEditor({
  record,
  onChange,
  onBack,
  onSave,
  onDelete,
  busy,
}: {
  record: ReportRecord;
  onChange: (next: ReportRecord) => void;
  onBack: () => void;
  onSave: () => void;
  onDelete?: () => void;
  busy: boolean;
}) {
  const set = <K extends keyof ReportRecord>(key: K, value: ReportRecord[K]) =>
    onChange({ ...record, [key]: value });

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" /> All reports
        </button>
        <div className="flex flex-wrap gap-2">
          {onDelete ? (
            <button className={btn} disabled={busy} onClick={onDelete}>
              <Trash2 className="h-3.5 w-3.5" /> Delete
            </button>
          ) : null}
          <button
            className={btn}
            disabled={busy}
            onClick={() => onChange({ ...record, published: false })}
          >
            Save as draft
          </button>
          <button className={btnPrimary} disabled={busy} onClick={onSave}>
            <Save className="h-3.5 w-3.5" /> {busy ? "Saving…" : "Save"}
          </button>
        </div>
      </div>

      <div className="mt-8 grid gap-6">
        <div className="grid gap-5 border border-border bg-card p-6 sm:grid-cols-2">
          <label className="block sm:col-span-2">
            <span className="eyebrow">Report title</span>
            <input
              value={record.title}
              onChange={(e) => {
                const title = e.target.value;
                onChange({ ...record, title, slug: record.slug ? record.slug : slugify(title) });
              }}
              className={input}
            />
          </label>
          <label className="block">
            <span className="eyebrow">Slug (URL)</span>
            <input
              value={record.slug}
              onChange={(e) => set("slug", slugify(e.target.value))}
              className={input}
            />
          </label>
          <label className="block">
            <span className="eyebrow">Week label</span>
            <input
              value={record.weekLabel}
              onChange={(e) => set("weekLabel", e.target.value)}
              placeholder="Week 24 · 2026"
              className={input}
            />
          </label>
          <label className="block">
            <span className="eyebrow">Asset name</span>
            <input
              value={record.asset}
              onChange={(e) => set("asset", e.target.value)}
              placeholder="BTCUSD"
              className={input}
            />
          </label>
          <label className="block">
            <span className="eyebrow">Market category</span>
            <select
              value={record.market}
              onChange={(e) => set("market", e.target.value)}
              className={input}
            >
              {marketOptions.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </label>
          <label className="block">
            <span className="eyebrow">Publish date</span>
            <input
              type="date"
              value={record.date}
              onChange={(e) => set("date", e.target.value)}
              className={`${input} num`}
            />
          </label>
          <label className="block">
            <span className="eyebrow">TradingView link (optional)</span>
            <input
              value={record.tradingviewUrl}
              onChange={(e) => set("tradingviewUrl", e.target.value)}
              placeholder="https://www.tradingview.com/chart/…"
              className={input}
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
          </div>
        </div>

        <div className="grid gap-5 border border-border bg-card p-6">
          <label className="block">
            <span className="eyebrow">Short description (cards & meta)</span>
            <textarea
              rows={3}
              value={record.summary}
              onChange={(e) => set("summary", e.target.value)}
              className={`${input} resize-y`}
            />
          </label>
          <label className="block">
            <span className="eyebrow">Full description</span>
            <textarea
              rows={10}
              value={record.body}
              onChange={(e) => set("body", e.target.value)}
              className={`${input} resize-y`}
            />
          </label>
          <FieldControl
            field={{ name: "tags", label: "Tags", type: "stringList" }}
            value={record.tags}
            onChange={(next) => set("tags", next as string[])}
          />
        </div>

        <div className="grid gap-6 border border-border bg-card p-6">
          <ImageUpload
            label="Cover / hero image"
            value={record.coverImage}
            onChange={(url) => set("coverImage", url)}
          />
          <GalleryUpload
            label="Chart & additional images"
            value={record.gallery}
            onChange={(urls) => set("gallery", urls)}
          />
          <FileUpload label="PDF attachment" value={record.pdfUrl} onChange={(url) => set("pdfUrl", url)} />
        </div>
      </div>
    </div>
  );
}
