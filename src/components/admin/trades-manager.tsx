import { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import { ArrowLeft, FileUp, Plus, Save, Trash2 } from "lucide-react";
import {
  deleteTrade,
  emptyTrade,
  getJournalMetrics,
  getTrade,
  importTradesFromCsv,
  listAllTrades,
  saveTrade,
  type TradeRecord,
} from "@/lib/trades.functions";
import { AdminPanelSkeleton } from "@/components/admin/dashboard-skeleton";
import {
  AdminBadge,
  AdminEmptyState,
  AdminErrorState,
  AdminSectionHeader,
  adminBtn,
  adminBtnPrimary,
  adminInput,
} from "@/components/admin/admin-ui";
import { liveQueryOptions } from "@/lib/live-poll";

export function TradesManager() {
  const queryClient = useQueryClient();
  const fetchAll = useServerFn(listAllTrades);
  const save = useServerFn(saveTrade);
  const remove = useServerFn(deleteTrade);
  const importCsv = useServerFn(importTradesFromCsv);

  const fetchOne = useServerFn(getTrade);
  const fetchMetrics = useServerFn(getJournalMetrics);

  const list = useQuery({
    queryKey: ["admin-trades"],
    queryFn: () => fetchAll(),
    ...liveQueryOptions,
  });
  const metrics = useQuery({
    queryKey: ["admin-journal-metrics"],
    queryFn: () => fetchMetrics(),
    ...liveQueryOptions,
  });
  const [draft, setDraft] = useState<TradeRecord | null>(null);
  const [replaceSynced, setReplaceSynced] = useState(false);

  async function openEditor(record: TradeRecord) {
    if (!record.id) {
      setDraft(structuredClone(record));
      return;
    }
    try {
      setDraft(await fetchOne({ data: { id: record.id } }));
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not load trade");
      setDraft(record);
    }
  }

  const saveMutation = useMutation({
    mutationFn: (record: TradeRecord) =>
      save({
        data: {
          id: record.id,
          externalId: record.externalId,
          date: record.date,
          market: record.market,
          instrument: record.instrument,
          direction: record.direction,
          entry: record.entry,
          exit: record.exit,
          rMultiple: record.rMultiple,
          percentage: record.percentage,
          result: record.result,
          notes: record.notes,
          screenshot: record.screenshot,
          published: record.published,
        },
      }),
    onSuccess: async () => {
      toast.success("Trade saved", {
        description: "Journal and equity curve update automatically.",
      });
      await queryClient.invalidateQueries({ queryKey: ["admin-trades"] });
      await queryClient.invalidateQueries({ queryKey: ["admin-journal-metrics"] });
      await queryClient.invalidateQueries({ queryKey: ["published-trades"] });
      await queryClient.invalidateQueries({ queryKey: ["admin-overview"] });
      setDraft(null);
    },
    onError: (error) => toast.error(error instanceof Error ? error.message : "Could not save"),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => remove({ data: { id } }),
    onSuccess: async () => {
      toast.success("Trade deleted");
      await queryClient.invalidateQueries({ queryKey: ["admin-trades"] });
      await queryClient.invalidateQueries({ queryKey: ["admin-journal-metrics"] });
      await queryClient.invalidateQueries({ queryKey: ["published-trades"] });
      await queryClient.invalidateQueries({ queryKey: ["admin-overview"] });
      setDraft(null);
    },
    onError: (error) => toast.error(error instanceof Error ? error.message : "Could not delete"),
  });

  const importMutation = useMutation({
    mutationFn: (text: string) =>
      importCsv({
        data: {
          text,
          replaceExistingSynced: replaceSynced,
        },
      }),
    onSuccess: async (result) => {
      toast.success("Transactions imported", {
        description: `${result.imported} rows synced to the public equity curve.`,
      });
      await queryClient.invalidateQueries({ queryKey: ["admin-trades"] });
      await queryClient.invalidateQueries({ queryKey: ["admin-journal-metrics"] });
      await queryClient.invalidateQueries({ queryKey: ["published-trades"] });
      await queryClient.invalidateQueries({ queryKey: ["admin-overview"] });
    },
    onError: (error) =>
      toast.error(error instanceof Error ? error.message : "Could not import transactions"),
  });

  async function handleImport(file: File | undefined) {
    if (!file) return;
    const name = file.name.toLowerCase();
    if (name.endsWith(".xlsx") || name.endsWith(".xls")) {
      toast.error("Please export the Excel sheet as CSV or TSV first.", {
        description: "CSV keeps imports auditable and avoids browser workbook parsing issues.",
      });
      return;
    }
    importMutation.mutate(await file.text());
  }

  const items = useMemo(() => list.data ?? [], [list.data]);

  if (draft) {
    return (
      <TradeEditor
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
        title="Trading journal"
        description="Add trades here — the public equity curve and metrics stay in sync."
        actions={
          <div className="flex flex-wrap items-center gap-2">
            <label className={adminBtn}>
              <FileUp className="h-3.5 w-3.5" />
              Import CSV
              <input
                type="file"
                accept=".csv,.tsv,text/csv,text/tab-separated-values"
                className="sr-only"
                disabled={importMutation.isPending}
                onChange={(event) => {
                  void handleImport(event.target.files?.[0]);
                  event.currentTarget.value = "";
                }}
              />
            </label>
            <button
              type="button"
              className={adminBtnPrimary}
              onClick={() => setDraft(emptyTrade())}
            >
              <Plus className="h-3.5 w-3.5" />
              New trade
            </button>
          </div>
        }
      />

      <div className="mt-5 border border-border bg-card p-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="font-display text-sm font-semibold">Excel transaction sync</p>
            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
              Export Excel as CSV/TSV with date, instrument, direction, entry, exit, r_multiple,
              percentage and optional external_id. Matching external_id rows update automatically.
            </p>
          </div>
          <label className="flex items-center gap-2 text-xs text-muted-foreground">
            <input
              type="checkbox"
              checked={replaceSynced}
              onChange={(event) => setReplaceSynced(event.target.checked)}
            />
            Replace existing synced rows
          </label>
        </div>
      </div>

      {metrics.data ? (
        <div className="mt-6 grid gap-3 border border-border bg-surface p-4 sm:grid-cols-2 lg:grid-cols-4">
          <Metric label="Total trades" value={String(metrics.data.totalTrades)} />
          <Metric
            label="Total R"
            value={`${metrics.data.totalR >= 0 ? "+" : ""}${metrics.data.totalR}R`}
          />
          <Metric label="Win rate" value={`${metrics.data.winRate}%`} />
          <Metric
            label="Avg R"
            value={`${metrics.data.avgR >= 0 ? "+" : ""}${metrics.data.avgR}R`}
          />
        </div>
      ) : null}

      {list.isLoading ? (
        <AdminPanelSkeleton />
      ) : list.isError ? (
        <AdminErrorState
          message={list.error instanceof Error ? list.error.message : "Could not load trades."}
          onRetry={() => list.refetch()}
        />
      ) : items.length === 0 ? (
        <AdminEmptyState
          title="No trades yet"
          description="Add your first journal entry — published trades appear on the site equity curve."
          action={
            <button
              type="button"
              className={adminBtnPrimary}
              onClick={() => setDraft(emptyTrade())}
            >
              <Plus className="h-3.5 w-3.5" /> New trade
            </button>
          }
        />
      ) : (
        <div className="mt-8 overflow-x-auto border border-border">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="border-b border-border bg-surface font-mono text-[0.65rem] uppercase tracking-[0.14em] text-muted-foreground">
              <tr>
                <th className="px-4 py-3 font-medium">Date</th>
                <th className="px-4 py-3 font-medium">Asset</th>
                <th className="px-4 py-3 font-medium">Dir</th>
                <th className="px-4 py-3 font-medium">R</th>
                <th className="px-4 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {items.map((t) => (
                <tr
                  key={t.id}
                  className="cursor-pointer border-b border-border last:border-0 hover:bg-surface"
                  onClick={() => openEditor(t)}
                >
                  <td className="num px-4 py-3">{t.date}</td>
                  <td className="px-4 py-3 font-medium">{t.instrument}</td>
                  <td className="px-4 py-3">{t.direction}</td>
                  <td
                    className={`num px-4 py-3 font-semibold ${t.rMultiple >= 0 ? "text-emerald" : "text-destructive"}`}
                  >
                    {t.rMultiple >= 0 ? "+" : ""}
                    {t.rMultiple}R
                  </td>
                  <td className="px-4 py-3">
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
    </div>
  );
}

function TradeEditor({
  record,
  onChange,
  onBack,
  onSave,
  onDelete,
  busy,
}: {
  record: TradeRecord;
  onChange: (r: TradeRecord) => void;
  onBack: () => void;
  onSave: () => void;
  onDelete?: () => void;
  busy: boolean;
}) {
  const set = <K extends keyof TradeRecord>(key: K, value: TradeRecord[K]) =>
    onChange({ ...record, [key]: value });

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <button type="button" className={adminBtn} onClick={onBack}>
          <ArrowLeft className="h-3.5 w-3.5" />
          Back
        </button>
        <div className="flex flex-wrap gap-2">
          {onDelete ? (
            <button
              type="button"
              className={adminBtn}
              disabled={busy}
              onClick={() => {
                if (confirm("Delete this trade?")) onDelete();
              }}
            >
              <Trash2 className="h-3.5 w-3.5" />
              Delete
            </button>
          ) : null}
          <button type="button" className={adminBtnPrimary} disabled={busy} onClick={onSave}>
            <Save className="h-3.5 w-3.5" />
            Save trade
          </button>
        </div>
      </div>

      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        <Field label="Date">
          <input
            type="date"
            className={adminInput}
            value={record.date}
            onChange={(e) => set("date", e.target.value)}
          />
        </Field>
        <Field label="Asset / instrument">
          <input
            className={adminInput}
            value={record.instrument}
            onChange={(e) => set("instrument", e.target.value)}
            placeholder="BTC/USD"
          />
        </Field>
        <Field label="External sync ID">
          <input
            className={adminInput}
            value={record.externalId}
            onChange={(e) => set("externalId", e.target.value)}
            placeholder="Optional stable Excel row ID"
          />
        </Field>
        <Field label="Market">
          <select
            className={adminInput}
            value={record.market}
            onChange={(e) => set("market", e.target.value)}
          >
            {["Crypto", "Forex", "Stocks", "Commodities", "Indices"].map((m) => (
              <option key={m}>{m}</option>
            ))}
          </select>
        </Field>
        <Field label="Direction">
          <select
            className={adminInput}
            value={record.direction}
            onChange={(e) => set("direction", e.target.value)}
          >
            {["Long", "Short"].map((d) => (
              <option key={d}>{d}</option>
            ))}
          </select>
        </Field>
        <Field label="Entry">
          <input
            className={adminInput}
            value={record.entry}
            onChange={(e) => set("entry", e.target.value)}
          />
        </Field>
        <Field label="Exit">
          <input
            className={adminInput}
            value={record.exit}
            onChange={(e) => set("exit", e.target.value)}
          />
        </Field>
        <Field label="R multiple">
          <input
            type="number"
            step="0.1"
            className={adminInput}
            value={record.rMultiple}
            onChange={(e) => set("rMultiple", Number(e.target.value))}
          />
        </Field>
        <Field label="Profit / Loss %">
          <input
            type="number"
            step="0.01"
            className={adminInput}
            value={record.percentage}
            onChange={(e) => set("percentage", Number(e.target.value))}
          />
        </Field>
        <Field label="Result">
          <select
            className={adminInput}
            value={record.result}
            onChange={(e) => set("result", e.target.value)}
          >
            {["Win", "Loss", "Breakeven"].map((r) => (
              <option key={r}>{r}</option>
            ))}
          </select>
        </Field>
        <Field label="Published">
          <select
            className={adminInput}
            value={record.published ? "yes" : "no"}
            onChange={(e) => set("published", e.target.value === "yes")}
          >
            <option value="yes">Yes — show on site</option>
            <option value="no">No — draft only</option>
          </select>
        </Field>
      </div>

      <Field label="Notes">
        <textarea
          className={`${adminInput} min-h-28 resize-y`}
          value={record.notes}
          onChange={(e) => set("notes", e.target.value)}
        />
      </Field>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="eyebrow text-[0.6rem]">{label}</p>
      <p className="num mt-1 text-lg font-semibold">{value}</p>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="eyebrow">{label}</span>
      {children}
    </label>
  );
}
