import { cn } from "@/lib/utils";
import type { SiteContentKey } from "@/lib/site-content";
import type { AdminSection } from "@/lib/admin-schema";

export type AdminTabKey =
  | "overview"
  | "analyses-db"
  | "reports-db"
  | "trades-db"
  | "contact-inbox"
  | SiteContentKey;

type NavItem = {
  key: AdminTabKey;
  label: string;
  badge?: number;
};

type NavGroup = {
  title: string;
  items: NavItem[];
};

export function buildAdminNav(
  cmsSections: AdminSection[],
  badges?: { contacts?: number },
): NavGroup[] {
  return [
    {
      title: "Dashboard",
      items: [{ key: "overview", label: "Overview" }],
    },
    {
      title: "Research & journal",
      items: [
        { key: "analyses-db", label: "Analyses" },
        { key: "reports-db", label: "Weekly reports" },
        { key: "trades-db", label: "Trading journal" },
      ],
    },
    {
      title: "Inbox",
      items: [
        {
          key: "contact-inbox",
          label: "Contact inbox",
          badge: badges?.contacts,
        },
      ],
    },
    {
      title: "Site content",
      items: cmsSections.map((s) => ({ key: s.key, label: s.label })),
    },
  ];
}

export function AdminSidebar({
  groups,
  activeKey,
  onSelect,
}: {
  groups: NavGroup[];
  activeKey: AdminTabKey;
  onSelect: (key: AdminTabKey) => void;
}) {
  return (
    <nav className="lg:sticky lg:top-28 lg:self-start">
      <div className="grid gap-6">
        {groups.map((group) => (
          <div key={group.title}>
            <p className="eyebrow text-[0.6rem]">{group.title}</p>
            <ul className="mt-3 grid gap-px border border-border bg-border">
              {group.items.map((item) => {
                const active = item.key === activeKey;
                return (
                  <li key={item.key}>
                    <button
                      type="button"
                      onClick={() => onSelect(item.key)}
                      className={cn(
                        "flex w-full items-center justify-between gap-2 bg-card px-4 py-3 text-left text-sm transition-colors hover:text-emerald",
                        active && "bg-surface font-semibold text-emerald",
                      )}
                    >
                      <span>{item.label}</span>
                      {item.badge && item.badge > 0 ? (
                        <span className="num flex h-5 min-w-5 items-center justify-center bg-navy px-1.5 text-[0.65rem] font-semibold text-navy-foreground">
                          {item.badge > 99 ? "99+" : item.badge}
                        </span>
                      ) : null}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </nav>
  );
}
