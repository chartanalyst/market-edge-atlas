import { cn } from "@/lib/utils";
import { AlertCircle, RefreshCw } from "lucide-react";

export const adminBtn =
  "inline-flex items-center justify-center gap-2 border border-border bg-background px-4 py-2.5 font-mono text-[0.68rem] uppercase tracking-[0.16em] transition-colors hover:border-emerald hover:text-emerald disabled:pointer-events-none disabled:opacity-50";

export const adminBtnPrimary =
  "inline-flex items-center justify-center gap-2 border border-border bg-navy px-5 py-2.5 font-mono text-[0.68rem] uppercase tracking-[0.16em] text-navy-foreground transition-colors hover:bg-emerald disabled:pointer-events-none disabled:opacity-50";

export const adminInput =
  "mt-2 w-full border border-border bg-background px-3 py-2.5 text-sm outline-none transition-colors focus:border-emerald";

export function AdminSectionHeader({
  title,
  description,
  actions,
}: {
  title: string;
  description?: string;
  actions?: React.ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4">
      <div className="min-w-0">
        <h2 className="text-xl font-semibold tracking-[-0.02em]">{title}</h2>
        {description ? (
          <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            {description}
          </p>
        ) : null}
      </div>
      {actions ? <div className="flex flex-wrap gap-2">{actions}</div> : null}
    </div>
  );
}

export function AdminBadge({
  children,
  variant = "default",
}: {
  children: React.ReactNode;
  variant?: "default" | "emerald" | "muted" | "warn";
}) {
  return (
    <span
      className={cn(
        "border px-2 py-0.5 font-mono text-[0.6rem] uppercase tracking-widest",
        variant === "emerald" && "border-emerald text-emerald",
        variant === "muted" && "border-border text-muted-foreground",
        variant === "warn" && "border-amber-600/40 text-amber-800",
        variant === "default" && "border-border",
      )}
    >
      {children}
    </span>
  );
}

export function AdminEmptyState({
  title,
  description,
  action,
}: {
  title: string;
  description: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="mt-8 border border-dashed border-border bg-surface px-6 py-12 text-center">
      <p className="font-display text-sm font-semibold">{title}</p>
      <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
        {description}
      </p>
      {action ? <div className="mt-6 flex justify-center">{action}</div> : null}
    </div>
  );
}

export function AdminErrorState({
  title = "Could not load data",
  message,
  onRetry,
}: {
  title?: string;
  message: string;
  onRetry?: () => void;
}) {
  return (
    <div className="mt-8 border border-destructive/30 bg-destructive/5 p-6">
      <div className="flex items-start gap-3">
        <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-destructive" />
        <div className="min-w-0 flex-1">
          <p className="font-semibold">{title}</p>
          <p className="mt-1 text-sm text-muted-foreground">{message}</p>
          {onRetry ? (
            <button type="button" onClick={onRetry} className={cn(adminBtn, "mt-4")}>
              <RefreshCw className="h-3.5 w-3.5" /> Try again
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export function AdminSearch({
  value,
  onChange,
  placeholder = "Search…",
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <input
      type="search"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full max-w-xs border border-border bg-background px-4 py-2.5 text-sm outline-none transition-colors focus:border-emerald sm:w-56"
    />
  );
}

export function AdminListShell({ children }: { children: React.ReactNode }) {
  return (
    <ul className="mt-8 grid gap-px border border-border bg-border">{children}</ul>
  );
}

export function AdminListRow({
  onClick,
  children,
}: {
  onClick?: () => void;
  children: React.ReactNode;
}) {
  const Tag = onClick ? "button" : "div";
  return (
    <li className="bg-card">
      <Tag
        type={onClick ? "button" : undefined}
        onClick={onClick}
        className={cn(
          "flex w-full flex-wrap items-center justify-between gap-4 px-5 py-4 text-left",
          onClick && "transition-colors hover:bg-surface",
        )}
      >
        {children}
      </Tag>
    </li>
  );
}

export function AdminStatCard({
  label,
  value,
  detail,
  onClick,
}: {
  label: string;
  value: string | number;
  detail?: string;
  onClick?: () => void;
}) {
  const Tag = onClick ? "button" : "div";
  return (
    <Tag
      type={onClick ? "button" : undefined}
      onClick={onClick}
      className={cn(
        "border border-border bg-card p-6 text-left transition-colors",
        onClick && "hover:border-emerald hover:bg-surface",
      )}
    >
      <p className="eyebrow text-[0.6rem]">{label}</p>
      <p className="num mt-3 text-3xl font-semibold tracking-tight">{value}</p>
      {detail ? <p className="mt-2 text-xs text-muted-foreground">{detail}</p> : null}
    </Tag>
  );
}

export function AdminCard({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("border border-border bg-card p-6", className)}>{children}</div>
  );
}

export function AdminFieldLabel({ children }: { children: React.ReactNode }) {
  return <span className="eyebrow">{children}</span>;
}

export function AdminField({
  label,
  children,
  className,
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <label className={cn("block", className)}>
      <AdminFieldLabel>{label}</AdminFieldLabel>
      {children}
    </label>
  );
}
