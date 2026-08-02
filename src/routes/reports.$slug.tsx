import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight, Download, LineChart } from "lucide-react";
import { Reveal } from "@/components/site/primitives";
import { getSiteContent } from "@/lib/content.functions";
import type { ReportRecord } from "@/lib/report-model";
import { formatReportDate } from "@/components/site/sections/reports";

export const Route = createFileRoute("/reports/$slug")({
  loader: async ({ params }) => {
    const content = await getSiteContent();
    const report = content.reports.find((r) => r.slug === params.slug);
    if (!report) throw notFound();
    return { report, all: content.reports };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Report unavailable" }, { name: "robots", content: "noindex" }] };
    }
    const r = loaderData.report;
    const title = `${r.title} | Weekly Market Report`;
    const description = r.summary || `Weekly market report covering ${r.asset || r.market}.`;
    const meta: Record<string, string>[] = [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ];
    if (r.coverImage.startsWith("https://")) {
      meta.push({ property: "og:image", content: r.coverImage });
      meta.push({ name: "twitter:image", content: r.coverImage });
    }
    return { meta };
  },
  errorComponent: () => (
    <main className="mx-auto w-[min(900px,92vw)] py-40">
      <h1 className="text-2xl font-semibold">This report could not be loaded</h1>
      <Link to="/" className="mt-6 inline-block text-sm text-emerald">
        Back to home
      </Link>
    </main>
  ),
  notFoundComponent: () => (
    <main className="mx-auto w-[min(900px,92vw)] py-40">
      <h1 className="text-2xl font-semibold">Report not found</h1>
      <Link to="/" hash="reports" className="mt-6 inline-block text-sm text-emerald">
        All weekly reports
      </Link>
    </main>
  ),
  component: ReportDetail,
});

function ReportDetail() {
  const { report: r, all } = Route.useLoaderData() as {
    report: ReportRecord;
    all: ReportRecord[];
  };
  const related = all.filter((x) => x.slug !== r.slug).slice(0, 3);

  return (
    <main className="pt-32">
      <article className="mx-auto w-[min(1100px,92vw)]">
        <Link
          to="/"
          hash="reports"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-emerald"
        >
          <ArrowLeft className="h-4 w-4" />
          All weekly reports
        </Link>

        <Reveal className="mt-8">
          <div className="flex flex-wrap items-center gap-3">
            <span className="border border-emerald px-3 py-1 text-[0.6rem] font-semibold uppercase tracking-widest text-emerald">
              {r.market}
            </span>
            {r.asset ? <span className="num text-xs font-semibold">{r.asset}</span> : null}
            {r.weekLabel ? (
              <span className="num text-xs text-muted-foreground">{r.weekLabel}</span>
            ) : null}
            <span className="num text-xs text-muted-foreground">{formatReportDate(r.date)}</span>
          </div>
          <h1 className="mt-6 text-balance text-3xl font-semibold leading-[1.08] sm:text-5xl">
            {r.title}
          </h1>
          {r.summary ? (
            <p className="mt-6 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
              {r.summary}
            </p>
          ) : null}
        </Reveal>

        {r.coverImage ? (
          <Reveal delay={0.08} className="mt-12">
            <img
              src={r.coverImage}
              alt={r.title}
              className="w-full border border-border object-cover"
            />
          </Reveal>
        ) : null}

        {(r.tradingviewUrl || r.pdfUrl) ? (
          <Reveal delay={0.1} className="mt-8 flex flex-wrap gap-3">
            {r.tradingviewUrl ? (
              <a
                href={r.tradingviewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-border bg-card px-5 py-3 font-mono text-[0.7rem] uppercase tracking-[0.16em] transition-colors hover:border-emerald hover:text-emerald"
              >
                <LineChart className="h-4 w-4" /> View TradingView chart
              </a>
            ) : null}
            {r.pdfUrl ? (
              <a
                href={r.pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-border bg-navy px-5 py-3 font-mono text-[0.7rem] uppercase tracking-[0.16em] text-navy-foreground transition-colors hover:bg-emerald"
              >
                <Download className="h-4 w-4" /> Download PDF
              </a>
            ) : null}
          </Reveal>
        ) : null}

        {r.body ? (
          <Reveal delay={0.12} className="mt-14 grid max-w-3xl gap-5">
            {r.body
              .split(/\n{2,}/)
              .filter(Boolean)
              .map((para, i) => (
                <p key={i} className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                  {para}
                </p>
              ))}
          </Reveal>
        ) : null}

        {r.gallery.length > 0 ? (
          <section className="mt-16">
            <h2 className="text-2xl font-semibold">Charts</h2>
            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              {r.gallery.map((src) => (
                <img
                  key={src}
                  src={src}
                  alt={`${r.title} chart`}
                  loading="lazy"
                  className="w-full border border-border object-cover"
                />
              ))}
            </div>
          </section>
        ) : null}

        {r.tags.length > 0 ? (
          <div className="mt-14 flex flex-wrap gap-2">
            {r.tags.map((tag) => (
              <span
                key={tag}
                className="border border-border px-2.5 py-1 font-mono text-[0.6rem] uppercase tracking-widest text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
        ) : null}

        {related.length > 0 ? (
          <section className="mt-24">
            <h2 className="text-2xl font-semibold">More weekly reports</h2>
            <div className="mt-8 grid gap-5 md:grid-cols-3">
              {related.map((x) => (
                <Link
                  key={x.slug}
                  to="/reports/$slug"
                  params={{ slug: x.slug }}
                  className="surface-card group p-6"
                >
                  <span className="num text-xs font-semibold">{x.asset || x.market}</span>
                  <h3 className="mt-3 text-sm font-semibold leading-snug">{x.title}</h3>
                  <span className="mt-4 inline-flex items-center gap-2 font-mono text-[0.62rem] uppercase tracking-[0.16em] text-muted-foreground transition-colors group-hover:text-emerald">
                    Read <ArrowUpRight className="h-3.5 w-3.5" />
                  </span>
                </Link>
              ))}
            </div>
          </section>
        ) : null}
      </article>
      <div className="h-24" />
    </main>
  );
}
