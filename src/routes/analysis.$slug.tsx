import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight, Target, TriangleAlert } from "lucide-react";
import { AreaChart, CandleChart } from "@/components/site/charts";
import { Reveal } from "@/components/site/primitives";
import { analyses, type Analysis } from "@/lib/site-data";

export const Route = createFileRoute("/analysis/$slug")({
  loader: ({ params }) => {
    const analysis = analyses.find((a) => a.slug === params.slug);
    if (!analysis) throw notFound();
    return { analysis };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Analysis unavailable" }, { name: "robots", content: "noindex" }],
      };
    }
    const a = loaderData.analysis;
    const title = `${a.pair} — ${a.title} | Technical Market Analyst`;
    return {
      meta: [
        { title },
        { name: "description", content: a.summary },
        { property: "og:title", content: title },
        { property: "og:description", content: a.summary },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: AnalysisDetail,
});

function AnalysisDetail() {
  const { analysis: a } = Route.useLoaderData() as { analysis: Analysis };
  const related = analyses.filter((x) => x.slug !== a.slug).slice(0, 3);

  return (
    <main className="pt-32">
      <article className="mx-auto w-[min(1100px,92vw)]">
        <Link
          to="/"
          hash="featured"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-emerald"
        >
          <ArrowLeft className="h-4 w-4" />
          All analysis
        </Link>

        <Reveal className="mt-8">
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-none bg-emerald-soft px-3 py-1 text-[0.6rem] font-semibold uppercase tracking-widest text-accent-foreground">
              {a.market}
            </span>
            <span className="num text-xs font-semibold">{a.pair}</span>
            <span className="num text-xs text-muted-foreground">{a.timeframe}</span>
            <span className="num text-xs text-muted-foreground">
              {new Date(a.date).toLocaleDateString("en-GB", { day: "2-digit", month: "long", year: "numeric" })}
            </span>
          </div>
          <h1 className="mt-6 text-balance text-3xl font-semibold leading-[1.08] sm:text-5xl">{a.title}</h1>
          <p className="mt-6 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
            {a.summary}
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mt-12 rounded-none border border-border bg-card p-6 shadow-[var(--shadow-soft)]">
          <AreaChart series={a.series} height={220} />
          <div className="mt-4 rounded-none border border-border bg-surface/60 p-4">
            <CandleChart />
          </div>
        </Reveal>

        <div className="mt-12 grid gap-12 lg:grid-cols-[1.15fr_0.85fr]">
          <Reveal>
            <h2 className="text-2xl font-semibold">The thesis</h2>
            <ul className="mt-6 grid gap-5">
              {a.thesis.map((t, i) => (
                <li key={t} className="grid grid-cols-[auto_1fr] gap-4">
                  <span className="num mt-0.5 text-xs font-semibold text-emerald">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="text-sm leading-relaxed text-muted-foreground">{t}</p>
                </li>
              ))}
            </ul>

            <div className="mt-10 flex gap-4 rounded-none border border-border bg-surface/60 p-6">
              <TriangleAlert className="h-5 w-5 shrink-0 text-emerald" />
              <div>
                <p className="font-display text-sm font-semibold">Invalidation</p>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{a.invalidation}</p>
              </div>
            </div>

            <div className="mt-6 flex gap-4 rounded-none border border-border bg-surface/60 p-6">
              <Target className="h-5 w-5 shrink-0 text-emerald" />
              <div>
                <p className="font-display text-sm font-semibold">Outcome</p>
                <p className="num mt-1.5 text-sm text-emerald">{a.outcome}</p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="sticky top-28 rounded-none border border-border bg-card p-7 shadow-[var(--shadow-soft)]">
              <p className="eyebrow">Trade parameters</p>
              <dl className="mt-6 grid gap-4">
                {a.levels.map((l) => (
                  <div key={l.label} className="flex items-center justify-between gap-4 border-b border-hairline pb-3">
                    <dt className="text-xs text-muted-foreground">{l.label}</dt>
                    <dd className="num text-xs font-semibold">{l.value}</dd>
                  </div>
                ))}
                <div className="flex items-center justify-between gap-4">
                  <dt className="text-xs text-muted-foreground">Realised</dt>
                  <dd className="num text-xs font-semibold text-emerald">{a.rr}</dd>
                </div>
              </dl>
              <a
                href="/#contact"
                className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-none bg-navy px-5 py-3 text-sm font-semibold text-navy-foreground transition-transform hover:-translate-y-0.5"
              >
                Request similar coverage
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </Reveal>
        </div>

        <section className="mt-24">
          <h2 className="text-2xl font-semibold">Related case studies</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {related.map((r) => (
              <Link
                key={r.slug}
                to="/analysis/$slug"
                params={{ slug: r.slug }}
                className="surface-card group rounded-none p-6"
              >
                <span className="num text-xs font-semibold">{r.pair}</span>
                <AreaChart series={r.series} height={80} animate={false} showGrid={false} />
                <h3 className="mt-4 text-sm font-semibold leading-snug">{r.title}</h3>
                <p className="num mt-3 text-xs text-emerald">{r.rr}</p>
              </Link>
            ))}
          </div>
        </section>
      </article>
      <div className="h-24" />
    </main>
  );
}
