import { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import { ArrowLeft, Plus, Save, Trash2 } from "lucide-react";
import {
  deleteTrade,
  emptyTrade,
  listAllTrades,
  saveTrade,
  type TradeRecord,
} from "@/lib/trades.functions";

const btn =
  "inline-flex items-center gap-2 border border-border bg-background px-4 py-2.5 font-mono text-[0.68rem] uppercase tracking-[0.16em] transition-colors hover:border-emerald hover:text-emerald disabled:opacity-60";
const btnPrimary =
  "inline-flex items-center gap-2 border border-border bg-navy px-5 py-2.5 font-mono text-[0.68rem] uppercase tracking-[0.16em] text-navy-foreground transition-colors hover:bg-emerald disabled:opacity-60";
const input =
  "mt-2 w-full border border-border bg-background px-3 py-2.5 text-sm outline-none transition-colors focus:border-emerald";

export function TradesManager() {
  const queryClient = useQueryClient();
  const fetchAll = useServerFn(listAllTrades);
  const save = useServerFn(saveTrade);
  const remove = useServerFn(deleteTrade);

  const list = useQuery({ queryKey: ["admin-trades"], queryFn: () => fetchAll() });
  const [draft, setDraft] = useState<TradeRecord | null>(null);

  const saveMutation = useMutation({
    mutationFn: (record: TradeRecord) =>
      save({
        data: {
          id: record.id,
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
      toast.success("Trade saved", { description: "Journal and equity curve update automatically." });
      await queryClient.invalidateQueries({ queryKey: ["admin-trades"] });
      await queryClient.invalidateQueries({ queryKey: ["published-trades"] });
      setDraft(null);
    },
    onError: (error) => toast.error(error instanceof Error ? error.message : "Could not save"),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => remove({ data: { id } }),
    onSuccess: async () => {
      toast.success("Trade deleted");
      await queryClient.invalidateQueries({ queryKey: ["admin-trades"] });
      await queryClient.invalidateQueries({ queryKey: ["published-trades"] });
      setDraft(null);
    },
    onError: (error) => toast.error(error instanceof Error ? error.message : "Could not delete"),
  });

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
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-semibold tracking-[-0.02em]">Trading journal</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Add trades here — the public equity curve and metrics stay in sync.
          </p>
        </div>
        <button type="button" className={btnPrimary} onClick={() => setDraft(emptyTrade())}>
          <Plus className="h-3.5 w-3.5" />
          New trade
        </button>
      </div>

      {list.isLoading ? (
        <p className="mt-8 text-sm text-muted-foreground">Loading trades…</p>
      ) : items.length === 0 ? (
        <p className="mt-8 text-sm text-muted-foreground">No trades yet. Add your first result.</p>
      ) : (
        <div className="mt-8 overflow-x-auto border border-border">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="border-b border-border bg-surface font-mono text-[0.65rem] uppercase tracking-[0.14em] text-muted-foreground">
              <tr>
                <th className="px-4 py-3 font-medium">Date</th>
                <th className="px-4 py-3 font-medium">Asset</th>
                <th className="px-4 py-3 font-medium">Dir</th>
                <th className="px-4 py-3 font-medium">R</th>
                <th className="px-4 py-3 font-medium">Published</th>
              </tr>
            </thead>
            <tbody>
              {items.map((t) => (
                <tr
                  key={t.id}
                  className="cursor-pointer border-b border-border last:border-0 hover:bg-surface"
                  onClick={() => setDraft(t)}
                >
                  <td className="num px-4 py-3">{t.date}</td>
                  <td className="px-4 py-3 font-medium">{t.instrument}</td>
                  <td className="px-4 py-3">{t.direction}</td>
                  <td className="num px-4 py-3">
                    {t.rMultiple >= 0 ? "+" : ""}
                    {t.rMultiple}R
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{t.published ? "Yes" : "Draft"}</td>
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
        <button type="button" className={btn} onClick={onBack}>
          <ArrowLeft className="h-3.5 w-3.5" />
          Back
        </button>
        <div className="flex flex-wrap gap-2">
          {onDelete ? (
            <button
              type="button"
              className={btn}
              disabled={busy}
              onClick={() => {
                if (confirm("Delete this trade?")) onDelete();
              }}
            >
              <Trash2 className="h-3.5 w-3.5" />
              Delete
            </button>
          ) : null}
          <button type="button" className={btnPrimary} disabled={busy} onClick={onSave}>
            <Save className="h-3.5 w-3.5" />
            Save trade
          </button>
        </div>
      </div>

      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        <Field label="Date">
          <input
            type="date"
            className={input}
            value={record.date}
            onChange={(e) => set("date", e.target.value)}
          />
        </Field>
        <Field label="Asset / instrument">
          <input
            className={input}
            value={record.instrument}
            onChange={(e) => set("instrument", e.target.value)}
            placeholder="BTC/USD"
          />
        </Field>
        <Field label="Market">
          <select
            className={input}
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
            className={input}
            value={record.direction}
            onChange={(e) => set("direction", e.target.value)}
          >
            {["Long", "Short"].map((d) => (
              <option key={d}>{d}</option>
            ))}
          </select>
        </Field>
        <Field label="Entry">
          <input className={input} value={record.entry} onChange={(e) => set("entry", e.target.value)} />
        </Field>
        <Field label="Exit">
          <input className={input} value={record.exit} onChange={(e) => set("exit", e.target.value)} />
        </Field>
        <Field label="R multiple">
          <input
            type="number"
            step="0.1"
            className={input}
            value={record.rMultiple}
            onChange={(e) => set("rMultiple", Number(e.target.value))}
          />
        </Field>
        <Field label="Profit / Loss %">
          <input
            type="number"
            step="0.01"
            className={input}
            value={record.percentage}
            onChange={(e) => set("percentage", Number(e.target.value))}
          />
        </Field>
        <Field label="Result">
          <select
            className={input}
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
            className={input}
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
          className={`${input} min-h-28 resize-y`}
          value={record.notes}
          onChange={(e) => set("notes", e.target.value)}
        />
      </Field>
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
