import { cn } from "@/lib/utils";

/** Theme-aligned skeleton block — sharp corners, hairline fill, site palette. */
export function Bone({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      aria-hidden
      className={cn("animate-pulse bg-hairline", className)}
      {...props}
    />
  );
}

export function SectionHeadingSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn("grid gap-3", className)}>
      <Bone className="h-3 w-24" />
      <Bone className="h-9 max-w-md" />
      <Bone className="h-4 max-w-xl" />
      <Bone className="h-4 max-w-lg" />
    </div>
  );
}

export function ChartAreaSkeleton({ height = 160, className }: { height?: number; className?: string }) {
  return (
    <div className={cn("relative border border-border bg-surface p-4", className)} style={{ height: height + 32 }}>
      <div className="flex items-center justify-between">
        <Bone className="h-3 w-20" />
        <Bone className="h-6 w-16" />
      </div>
      <div className="relative mt-4" style={{ height }}>
        {[0.25, 0.5, 0.75].map((f) => (
          <div
            key={f}
            className="absolute inset-x-0 border-t border-dashed border-hairline"
            style={{ top: `${f * 100}%` }}
          />
        ))}
        <Bone className="absolute bottom-0 left-0 h-[72%] w-full origin-bottom scale-y-100 opacity-80 [clip-path:polygon(0_100%,0_45%,12%_52%,24%_38%,36%_48%,48%_28%,60%_42%,72%_22%,84%_35%,100%_18%,100%_100%)]" />
      </div>
    </div>
  );
}

export function HeroPanelSkeleton() {
  return (
    <div className="w-full border border-border bg-card">
      <div className="flex items-start justify-between border-b border-border p-5">
        <div className="grid gap-2">
          <Bone className="h-3 w-28" />
          <Bone className="h-8 w-36" />
        </div>
        <Bone className="h-6 w-24" />
      </div>
      <ChartAreaSkeleton height={150} className="border-0 border-b border-border" />
      <div className="border-b border-border p-4">
        <div className="flex h-[130px] items-end justify-between gap-1 px-1">
          {Array.from({ length: 12 }).map((_, i) => (
            <Bone
              key={i}
              className="w-full max-w-[14px]"
              style={{ height: `${28 + ((i * 17) % 55)}%` }}
            />
          ))}
        </div>
      </div>
      <div className="grid grid-cols-3 text-center">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className={cn("px-2 py-4", i < 2 && "border-r border-hairline")}>
            <Bone className="mx-auto h-2.5 w-12" />
            <Bone className="mx-auto mt-2 h-4 w-16" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function HeroSectionSkeleton() {
  return (
    <section className="relative overflow-hidden border-b border-border pt-36 sm:pt-44">
      <div className="grid-lines pointer-events-none absolute inset-0 -z-10 opacity-70 [mask-image:radial-gradient(80%_70%_at_50%_0%,black,transparent)]" />
      <div className="mx-auto w-[min(1320px,94vw)]">
        <div className="flex items-center justify-between border-y border-border py-2.5">
          <Bone className="h-3 w-20" />
          <Bone className="hidden h-3 w-32 sm:block" />
          <Bone className="h-3 w-16" />
        </div>
        <div className="grid items-stretch gap-0 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="border-border py-14 lg:border-r lg:py-20 lg:pr-14">
            <Bone className="h-8 w-44" />
            <Bone className="mt-8 h-14 w-full max-w-lg" />
            <Bone className="mt-3 h-14 w-full max-w-md" />
            <Bone className="mt-3 h-14 w-48" />
            <Bone className="mt-8 h-4 w-full max-w-xl" />
            <Bone className="mt-2 h-4 w-full max-w-lg" />
            <div className="mt-10 flex gap-3">
              <Bone className="h-12 w-40" />
              <Bone className="h-12 w-44" />
            </div>
            <div className="mt-14 grid max-w-xl grid-cols-3 border-y border-border">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className={cn("py-6", i < 2 && "border-r border-hairline pr-4")}>
                  <Bone className="h-8 w-16" />
                  <Bone className="mt-2 h-2.5 w-20" />
                </div>
              ))}
            </div>
          </div>
          <div className="flex items-center py-14 lg:py-20 lg:pl-14">
            <HeroPanelSkeleton />
          </div>
        </div>
      </div>
    </section>
  );
}

function AnalysisCardSkeleton({ large }: { large?: boolean }) {
  return (
    <div className="surface-card flex flex-col overflow-hidden">
      <div className="bg-surface p-4">
        <div className="flex items-center justify-between">
          <Bone className="h-3 w-16" />
          <Bone className="h-5 w-14" />
        </div>
        <ChartAreaSkeleton height={72} className="mt-3 border-0 bg-transparent p-0" />
      </div>
      <div className="flex flex-col p-5">
        <Bone className="h-3 w-24" />
        <Bone className="mt-3 h-5 w-full" />
        <Bone className="mt-2 h-5 w-full max-w-[85%]" />
        <Bone className="mt-3 h-3.5 w-full" />
        <Bone className="mt-2 h-3.5 w-full max-w-[75%]" />
        <div className="mt-4 flex justify-between border-t border-border pt-3.5">
          <div>
            <Bone className="h-2.5 w-12" />
            <Bone className="mt-2 h-3.5 w-20" />
          </div>
          <Bone className="h-3.5 w-20" />
        </div>
      </div>
    </div>
  );
}

export function FeaturedAnalysisSkeleton() {
  return (
    <section className="scroll-mt-28 py-24 lg:py-32">
      <div className="mx-auto w-[min(1320px,94vw)]">
        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <SectionHeadingSkeleton />
          <Bone className="h-11 w-52 lg:mb-2" />
        </div>
        <div className="mt-10 flex flex-wrap gap-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <Bone key={i} className="h-9 w-20" />
          ))}
        </div>
        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <AnalysisCardSkeleton large />
          {Array.from({ length: 3 }).map((_, i) => (
            <AnalysisCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

export function JournalEquitySkeleton() {
  return <ChartAreaSkeleton height={96} />;
}

export function PerformanceBandSkeleton() {
  return (
    <section className="border-y border-border bg-navy py-24 lg:py-32">
      <div className="mx-auto w-[min(1320px,94vw)]">
        <SectionHeadingSkeleton className="max-w-3xl [&_*]:bg-navy-foreground/15" />
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="border border-navy-foreground/12 bg-navy-foreground/[0.045] p-7">
              <Bone className="h-10 w-24 bg-navy-foreground/15" />
              <Bone className="mt-4 h-4 w-32 bg-navy-foreground/15" />
              <Bone className="mt-2 h-3 w-full max-w-xs bg-navy-foreground/15" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FeaturedAnalysisGridSkeleton() {
  return (
    <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <AnalysisCardSkeleton key={i} />
      ))}
    </div>
  );
}

/** Full homepage placeholder while route/content loads. */
export function HomePageSkeleton() {
  return (
    <main>
      <HeroSectionSkeleton />
      <FeaturedAnalysisSkeleton />
      <PerformanceBandSkeleton />
    </main>
  );
}
