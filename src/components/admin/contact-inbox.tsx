import { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { format } from "date-fns";
import { toast } from "sonner";
import { Mail, Trash2 } from "lucide-react";
import { AdminInboxSkeleton } from "@/components/admin/dashboard-skeleton";
import {
  AdminBadge,
  AdminEmptyState,
  AdminErrorState,
  AdminSearch,
  AdminSectionHeader,
  adminBtn,
} from "@/components/admin/admin-ui";
import {
  deleteContactSubmission,
  listContactSubmissions,
  markInquiryHandled,
  type ContactSubmission,
} from "@/lib/contact-submissions.functions";
import { liveQueryOptions } from "@/lib/live-poll";

export function ContactInbox() {
  const queryClient = useQueryClient();
  const fetchAll = useServerFn(listContactSubmissions);
  const remove = useServerFn(deleteContactSubmission);
  const toggleHandled = useServerFn(markInquiryHandled);

  const list = useQuery({
    queryKey: ["admin-contact-inbox"],
    queryFn: () => fetchAll(),
    ...liveQueryOptions,
  });
  const [query, setQuery] = useState("");

  const invalidate = async () => {
    await queryClient.invalidateQueries({ queryKey: ["admin-contact-inbox"] });
    await queryClient.invalidateQueries({ queryKey: ["admin-overview"] });
  };

  const deleteMutation = useMutation({
    mutationFn: (item: ContactSubmission) =>
      remove({ data: { id: item.id, source: item.source } }),
    onSuccess: async () => {
      toast.success("Enquiry removed");
      await invalidate();
    },
    onError: (error) => toast.error(error instanceof Error ? error.message : "Could not delete"),
  });

  const handledMutation = useMutation({
    mutationFn: ({ id, handled }: { id: string; handled: boolean }) =>
      toggleHandled({ data: { id, handled } }),
    onSuccess: invalidate,
    onError: (error) => toast.error(error instanceof Error ? error.message : "Could not update"),
  });

  const items = useMemo(() => {
    const all = list.data ?? [];
    const q = query.trim().toLowerCase();
    if (!q) return all;
    return all.filter(
      (item) =>
        item.name.toLowerCase().includes(q) ||
        item.email.toLowerCase().includes(q) ||
        item.message.toLowerCase().includes(q) ||
        (item.topic?.toLowerCase().includes(q) ?? false),
    );
  }, [list.data, query]);

  const unhandled = useMemo(
    () => (list.data ?? []).filter((i) => i.source === "inquiries" && !i.handled).length,
    [list.data],
  );

  if (list.isLoading) {
    return <AdminInboxSkeleton />;
  }

  if (list.isError) {
    return (
      <div>
        <AdminSectionHeader title="Contact inbox" />
        <AdminErrorState
          message={list.error instanceof Error ? list.error.message : "Could not load enquiries."}
          onRetry={() => list.refetch()}
        />
        <p className="mt-4 text-sm text-muted-foreground">
          Run{" "}
          <code className="rounded bg-surface px-1.5 py-0.5 text-xs">
            supabase/migrations/20260802103000_contact_submissions_and_links.sql
          </code>{" "}
          in the Supabase SQL Editor, then refresh.
        </p>
      </div>
    );
  }

  return (
    <div>
      <AdminSectionHeader
        title="Contact inbox"
        description="Form submissions saved to the database. Email delivery also requires WEB3FORMS_ACCESS_KEY in server env."
        actions={
          <span className="num text-sm text-muted-foreground">
            {list.data?.length ?? 0} total
            {unhandled > 0 ? ` · ${unhandled} unhandled` : ""}
          </span>
        }
      />

      <div className="mt-6">
        <AdminSearch value={query} onChange={setQuery} placeholder="Search name, email, message…" />
      </div>

      {items.length === 0 ? (
        <AdminEmptyState
          title={query ? "No matches" : "No enquiries yet"}
          description={
            query
              ? "Try a different search term."
              : "Submissions appear here once the contact migration is applied and someone uses the form."
          }
        />
      ) : (
        <ul className="mt-8 grid gap-3">
          {items.map((item) => (
            <li key={`${item.source}-${item.id}`} className="border border-border bg-card p-5">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="font-semibold">{item.name}</p>
                    {item.source === "inquiries" ? (
                      <AdminBadge variant={item.handled ? "muted" : "warn"}>
                        {item.handled ? "Handled" : "New"}
                      </AdminBadge>
                    ) : (
                      <AdminBadge>Contact form</AdminBadge>
                    )}
                  </div>
                  <a
                    href={`mailto:${item.email}`}
                    className="mt-1 inline-flex items-center gap-1.5 text-sm text-emerald hover:underline"
                  >
                    <Mail className="h-3.5 w-3.5" />
                    {item.email}
                  </a>
                  <p className="mt-2 num text-xs text-muted-foreground">
                    {item.createdAt
                      ? format(new Date(item.createdAt), "d MMM yyyy · HH:mm")
                      : "—"}
                    {item.topic ? ` · ${item.topic}` : ""}
                    {item.organisation ? ` · ${item.organisation}` : ""}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {item.source === "inquiries" ? (
                    <button
                      type="button"
                      className={adminBtn}
                      disabled={handledMutation.isPending}
                      onClick={() =>
                        handledMutation.mutate({ id: item.id, handled: !item.handled })
                      }
                    >
                      {item.handled ? "Mark new" : "Mark handled"}
                    </button>
                  ) : null}
                  <button
                    type="button"
                    className={adminBtn}
                    disabled={deleteMutation.isPending}
                    onClick={() => {
                      if (
                        !window.confirm(
                          `Delete this message from ${item.name}? This cannot be undone.`,
                        )
                      ) {
                        return;
                      }
                      deleteMutation.mutate(item);
                    }}
                  >
                    <Trash2 className="h-3.5 w-3.5" /> Delete
                  </button>
                </div>
              </div>
              <p className="mt-4 whitespace-pre-wrap text-sm leading-relaxed text-muted-foreground">
                {item.message}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
