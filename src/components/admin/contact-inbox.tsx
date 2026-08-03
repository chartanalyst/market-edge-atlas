import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { format } from "date-fns";
import { Mail, Trash2 } from "lucide-react";
import { toast } from "sonner";
import {
  deleteContactSubmission,
  listContactSubmissions,
  markInquiryHandled,
  type ContactSubmission,
} from "@/lib/contact-submissions.functions";

const btn =
  "inline-flex items-center gap-2 border border-border bg-background px-3 py-2 font-mono text-[0.65rem] uppercase tracking-[0.14em] transition-colors hover:border-emerald hover:text-emerald disabled:opacity-60";

export function ContactInbox() {
  const queryClient = useQueryClient();
  const fetchAll = useServerFn(listContactSubmissions);
  const remove = useServerFn(deleteContactSubmission);
  const toggleHandled = useServerFn(markInquiryHandled);

  const list = useQuery({ queryKey: ["admin-contact-inbox"], queryFn: () => fetchAll() });

  const deleteMutation = useMutation({
    mutationFn: (item: ContactSubmission) =>
      remove({ data: { id: item.id, source: item.source } }),
    onSuccess: async () => {
      toast.success("Enquiry removed");
      await queryClient.invalidateQueries({ queryKey: ["admin-contact-inbox"] });
    },
    onError: (error) => toast.error(error instanceof Error ? error.message : "Could not delete"),
  });

  const handledMutation = useMutation({
    mutationFn: ({ id, handled }: { id: string; handled: boolean }) =>
      toggleHandled({ data: { id, handled } }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["admin-contact-inbox"] });
    },
    onError: (error) => toast.error(error instanceof Error ? error.message : "Could not update"),
  });

  if (list.isLoading) {
    return <p className="text-sm text-muted-foreground">Loading enquiries…</p>;
  }

  if (list.isError) {
    return (
      <div className="border border-border bg-card p-6">
        <h2 className="text-xl font-semibold">Contact inbox</h2>
        <p className="mt-3 text-sm text-muted-foreground">
          {list.error instanceof Error ? list.error.message : "Could not load enquiries."}
        </p>
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

  const items = list.data ?? [];

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold">Contact inbox</h2>
          <p className="mt-1.5 text-sm text-muted-foreground">
            Form submissions saved to the database. Email delivery also requires{" "}
            <code className="text-xs">WEB3FORMS_ACCESS_KEY</code> in server env.
          </p>
        </div>
        <span className="num text-sm text-muted-foreground">{items.length} total</span>
      </div>

      {items.length === 0 ? (
        <p className="mt-8 border border-dashed border-border bg-surface px-6 py-10 text-center text-sm text-muted-foreground">
          No enquiries yet. Submissions appear here once the contact migration is applied and someone
          uses the form.
        </p>
      ) : (
        <ul className="mt-8 grid gap-3">
          {items.map((item) => (
            <li key={`${item.source}-${item.id}`} className="border border-border bg-card p-5">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="min-w-0">
                  <p className="font-semibold">{item.name}</p>
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
                    {item.source === "inquiries" && item.handled ? " · Handled" : ""}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {item.source === "inquiries" ? (
                    <button
                      type="button"
                      className={btn}
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
                    className={btn}
                    disabled={deleteMutation.isPending}
                    onClick={() => deleteMutation.mutate(item)}
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
