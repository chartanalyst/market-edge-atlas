import { Bone, ChartAreaSkeleton, SectionHeadingSkeleton } from "@/components/site/skeletons";
import { cn } from "@/lib/utils";

export function AdminDashboardSkeleton() {
  return (
    <main className="mx-auto w-[min(1320px,94vw)] py-16 lg:py-24">
      <div className="flex flex-wrap items-end justify-between gap-6 border-b border-border pb-8">
        <div className="grid gap-3">
          <Bone className="h-3 w-24" />
          <Bone className="h-10 w-full max-w-sm" />
          <Bone className="h-4 w-full max-w-md" />
        </div>
        <div className="flex gap-2">
          <Bone className="h-11 w-28" />
          <Bone className="h-11 w-32" />
        </div>
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-[260px_1fr]">
        <nav className="lg:sticky lg:top-28 lg:self-start">
          <Bone className="h-3 w-16" />
          <ul className="mt-4 grid gap-px border border-border bg-border">
            {Array.from({ length: 10 }).map((_, i) => (
              <li key={i} className="bg-card px-4 py-3">
                <Bone className={cn("h-4", i === 0 ? "w-36" : "w-28")} />
              </li>
            ))}
          </ul>
        </nav>

        <section className="min-w-0">
          <AdminPanelSkeleton />
        </section>
      </div>
    </main>
  );
}

/** Content panel skeleton (analyses, trades, CMS fields). */
export function AdminPanelSkeleton() {
  return (
    <>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="grid gap-2">
          <Bone className="h-6 w-48" />
          <Bone className="h-4 w-full max-w-md" />
        </div>
        <div className="flex gap-2">
          <Bone className="h-10 w-36" />
          <Bone className="h-10 w-32" />
        </div>
      </div>

      <div className="mt-8 grid gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="border border-border bg-card p-5">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="min-w-0 flex-1 grid gap-2">
                <Bone className="h-4 w-full max-w-sm" />
                <Bone className="h-3 w-24" />
                <Bone className="h-3 w-full max-w-lg" />
              </div>
              <div className="flex gap-2">
                <Bone className="h-9 w-9" />
                <Bone className="h-9 w-9" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

/** Auth sign-in page skeleton — matches restricted owner layout. */
export function AuthPageSkeleton() {
  return (
    <main className="mx-auto flex min-h-[80vh] w-[min(460px,92vw)] flex-col justify-center py-28">
      <Bone className="h-3 w-28" />
      <Bone className="mt-4 h-9 w-full max-w-xs" />
      <Bone className="mt-3 h-4 w-full" />
      <Bone className="mt-1 h-4 w-full max-w-[80%]" />

      <div className="mt-10 border border-border bg-card p-7">
        <Bone className="h-3 w-12" />
        <Bone className="mt-2.5 h-11 w-full" />
        <Bone className="mt-6 h-3 w-16" />
        <Bone className="mt-2.5 h-11 w-full" />
        <Bone className="mt-8 h-12 w-full" />
        <Bone className="mx-auto mt-5 h-3 w-56" />
      </div>
    </main>
  );
}

export function AdminFormSkeleton() {
  return (
    <div className="mt-8 grid gap-8">
      {Array.from({ length: 2 }).map((_, g) => (
        <div key={g} className="border border-border bg-card p-6">
          <Bone className="h-5 w-40" />
          <div className="mt-6 grid gap-5">
            {Array.from({ length: 4 }).map((_, f) => (
              <div key={f}>
                <Bone className="h-3 w-24" />
                <Bone className="mt-2 h-10 w-full" />
              </div>
            ))}
          </div>
        </div>
      ))}
      <ChartAreaSkeleton height={120} />
    </div>
  );
}

export function AdminInboxSkeleton() {
  return (
    <div className="mt-8 grid gap-3">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="border border-border bg-card p-5">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="grid flex-1 gap-2">
              <Bone className="h-4 w-48" />
              <Bone className="h-3 w-32" />
              <Bone className="h-4 w-full max-w-2xl" />
            </div>
            <Bone className="h-9 w-20" />
          </div>
        </div>
      ))}
    </div>
  );
}
