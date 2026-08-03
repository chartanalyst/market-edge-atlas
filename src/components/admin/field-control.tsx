import { Plus, Trash2, ArrowUp, ArrowDown } from "lucide-react";
import type { Field } from "@/lib/admin-schema";
import { emptyItem } from "@/lib/admin-schema";
import { ImageUpload } from "@/components/admin/upload-zone";

const inputClass =
  "mt-2 w-full border border-border bg-background px-3 py-2.5 text-sm outline-none transition-colors focus:border-emerald";

export function FieldControl({
  field,
  value,
  onChange,
}: {
  field: Field;
  value: unknown;
  onChange: (next: unknown) => void;
}) {
  if (field.type === "textarea") {
    return (
      <label className="block">
        <span className="eyebrow">{field.label}</span>
        <textarea
          rows={3}
          value={String(value ?? "")}
          placeholder={field.placeholder}
          onChange={(e) => onChange(e.target.value)}
          className={`${inputClass} resize-y`}
        />
      </label>
    );
  }

  if (field.type === "number") {
    return (
      <label className="block">
        <span className="eyebrow">{field.label}</span>
        <input
          type="number"
          value={Number(value ?? 0)}
          onChange={(e) => onChange(e.target.value === "" ? 0 : Number(e.target.value))}
          className={`${inputClass} num`}
        />
      </label>
    );
  }

  if (field.type === "image") {
    return (
      <ImageUpload
        label={field.label}
        value={String(value ?? "")}
        onChange={(url) => onChange(url)}
      />
    );
  }

  if (field.type === "boolean") {
    return (
      <label className="flex items-center gap-3 border border-border bg-background px-3 py-2.5">
        <input
          type="checkbox"
          checked={Boolean(value)}
          onChange={(e) => onChange(e.target.checked)}
          className="h-4 w-4 accent-emerald"
        />
        <span className="eyebrow">{field.label}</span>
      </label>
    );
  }

  if (field.type === "numberList") {
    const list = Array.isArray(value) ? (value as number[]) : [];
    return (
      <label className="block">
        <span className="eyebrow">{field.label} · comma separated</span>
        <input
          value={list.join(", ")}
          onChange={(e) =>
            onChange(
              e.target.value
                .split(",")
                .map((v) => v.trim())
                .filter((v) => v !== "")
                .map(Number)
                .filter((n) => !Number.isNaN(n)),
            )
          }
          className={`${inputClass} num`}
        />
      </label>
    );
  }

  if (field.type === "stringList") {
    const list = Array.isArray(value) ? (value as string[]) : [];
    return (
      <div>
        <span className="eyebrow">{field.label}</span>
        <div className="mt-2 grid gap-2">
          {list.map((item, i) => (
            <div key={i} className="flex gap-2">
              <textarea
                rows={2}
                value={item}
                onChange={(e) => {
                  const next = [...list];
                  next[i] = e.target.value;
                  onChange(next);
                }}
                className="w-full resize-y border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-emerald"
              />
              <IconButton
                label="Remove"
                onClick={() => onChange(list.filter((_, idx) => idx !== i))}
              >
                <Trash2 className="h-3.5 w-3.5" />
              </IconButton>
            </div>
          ))}
        </div>
        <AddButton label="Add item" onClick={() => onChange([...list, ""])} />
      </div>
    );
  }

  if (field.type === "object") {
    const obj = (value ?? {}) as Record<string, unknown>;
    return (
      <fieldset className="border border-border bg-surface p-4">
        <legend className="eyebrow px-1">{field.label}</legend>
        <div className="grid gap-4 sm:grid-cols-2">
          {(field.fields ?? []).map((sub) => (
            <FieldControl
              key={sub.name}
              field={sub}
              value={obj[sub.name]}
              onChange={(next) => onChange({ ...obj, [sub.name]: next })}
            />
          ))}
        </div>
      </fieldset>
    );
  }

  // objectList
  if (field.type === "objectList") {
    const list = Array.isArray(value) ? (value as Record<string, unknown>[]) : [];
    const subFields = field.fields ?? [];
    const update = (i: number, next: Record<string, unknown>) =>
      onChange(list.map((item, idx) => (idx === i ? next : item)));
    return (
      <div>
        <span className="eyebrow">{field.label}</span>
        <div className="mt-2 grid gap-3">
          {list.map((item, i) => (
            <div key={i} className="border border-border bg-surface p-4">
              <div className="mb-3 flex items-center justify-between">
                <span className="num text-xs text-muted-foreground">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="flex gap-1.5">
                  <IconButton
                    label="Move up"
                    onClick={() => i > 0 && onChange(swap(list, i, i - 1))}
                  >
                    <ArrowUp className="h-3.5 w-3.5" />
                  </IconButton>
                  <IconButton
                    label="Move down"
                    onClick={() => i < list.length - 1 && onChange(swap(list, i, i + 1))}
                  >
                    <ArrowDown className="h-3.5 w-3.5" />
                  </IconButton>
                  <IconButton
                    label="Remove"
                    onClick={() => onChange(list.filter((_, idx) => idx !== i))}
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </IconButton>
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {subFields.map((sub) => (
                  <FieldControl
                    key={sub.name}
                    field={sub}
                    value={item[sub.name]}
                    onChange={(next) => update(i, { ...item, [sub.name]: next })}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
        <AddButton
          label="Add entry"
          onClick={() => onChange([...list, emptyItem(subFields)])}
        />
      </div>
    );
  }

  return (
    <label className="block">
      <span className="eyebrow">{field.label}</span>
      <input
        value={String(value ?? "")}
        placeholder={field.placeholder}
        onChange={(e) => onChange(e.target.value)}
        className={inputClass}
      />
    </label>
  );
}

function swap<T>(list: T[], a: number, b: number): T[] {
  const next = [...list];
  [next[a], next[b]] = [next[b], next[a]];
  return next;
}

export function IconButton({
  label,
  onClick,
  children,
}: {
  label: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={onClick}
      className="grid h-8 w-8 shrink-0 place-items-center border border-border bg-background text-muted-foreground transition-colors hover:border-emerald hover:text-emerald"
    >
      {children}
    </button>
  );
}

export function AddButton({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="mt-3 inline-flex items-center gap-2 border border-border bg-background px-4 py-2.5 font-mono text-[0.68rem] uppercase tracking-[0.16em] transition-colors hover:border-emerald hover:text-emerald"
    >
      <Plus className="h-3.5 w-3.5" />
      {label}
    </button>
  );
}
