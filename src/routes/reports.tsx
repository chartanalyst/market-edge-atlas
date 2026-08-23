import { useEffect, useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { ArrowLeft, ArrowRight, ArrowUpRight, Search } from "lucide-react";
import { motion } from "motion/react";
import { SectionHeading } from "@/components/site/primitives";
import { useSiteContent } from "@/components/site/content-context";
import { formatReportDate } from "@/components/site/sections/reports";
import { listPublishedReports } from "@/lib/reports.functions";
import { liveQueryOptions } from "@/lib/live-poll";
import { absoluteUrl, SITE_IMAGE, SITE_NAME } from "@/lib/site-meta";

export const Route = createFileRoute("/reports")({
  head: () => ({
    meta: [
      { title: `Weekly Reports | ${SITE_NAME}` },
      {
        name: "description",
        content: "Browse all published weekly market reports and research notes.",
      },
      { property: "og:title", content: `Weekly Reports | ${SITE_NAME}` },
      {
        property: "og:description",
        content: "Browse all published weekly market reports and research notes.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: absoluteUrl("/reports") },
      { property: "og:image", content: SITE_IMAGE },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: SITE_IMAGE },
    ],
    links: [{ rel: "canonical", href: absoluteUrl("/reports") }],
  }),
  component: ReportsLibrary,
});

const PAGE_SIZE = 9;

function ReportsLibrary() {
  const { reports: fallback } = useSiteContent();
  const fetchReports = useServerFn(listPublishedReports);
  const { data: reports = fallback } = useQuery({
    queryKey: ["published-reports"],
    queryFn: () => fetchReports(),
    ...liveQueryOptions,
  });
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return reports.filter(
      (item) =>
        !q ||
        item.title.toLowerCase().includes(q) ||
        item.market.toLowerCase().includes(q) ||
        item.asset.toLowerCase().includes(q) ||
        item.summary.toLowerCase().includes(q),
    );
  }, [reports, query]);
  const totalPages = Math.max(1, Math.ceil(visible.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const pagedItems = useMemo(
    () => visible.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE),
    [visible, currentPage],
  );
  const pageNumbers = useMemo(() => {
    const start = Math.max(1, Math.min(currentPage - 2, totalPages - 4));
    return Array.from({ length: Math.min(5, totalPages) }, (_, index) => start + index);
  }, [currentPage, totalPages]);

  useEffect(() => {
    setPage(1);
  }, [query]);

  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [page, totalPages]);

  return (
    <main className="pt-36 sm:pt-44">
      <section className="border-b border-border py-16 lg:py-20">
        <div className="mx-auto w-[min(1320px,94vw)]">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
            <SectionHeading
              eyebrow="Weekly reports"
              title="Complete weekly report archive."
              description="All published notes live here, while the homepage only highlights the latest three reports."
            />
            <label className="flex items-center gap-2 border border-border bg-card px-4 py-2.5">
              <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search reports..."
                aria-label="Search all reports"
                className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground lg:w-56"
              />
            </label>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            <div className="border border-border bg-card p-4">
              <p className="eyebrow text-[0.58rem]">Published reports</p>
              <p className="num mt-2 text-2xl font-semibold">{visible.length}</p>
            </div>
            <div className="border border-border bg-card p-4">
              <p className="eyebrow text-[0.58rem]">Current page</p>
              <p className="num mt-2 text-2xl font-semibold">
                {currentPage}/{totalPages}
              </p>
            </div>
            <div className="border border-border bg-card p-4">
              <p className="eyebrow text-[0.58rem]">Per page</p>
              <p className="num mt-2 text-2xl font-semibold">{PAGE_SIZE}</p>
            </div>
          </div>

          <motion.div
            key={`${query.trim().toLowerCase()}-${currentPage}`}
            className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3"
            initial="hidden"
            animate="show"
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.05 } } }}
          >
            {pagedItems.map((item) => (
              <motion.div
                key={item.slug}
                variants={{
                  hidden: { opacity: 0, y: 14, scale: 0.985 },
                  show: { opacity: 1, y: 0, scale: 1 },
                }}
                transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
              >
                <Link
                  to="/reports/$slug"
                  params={{ slug: item.slug }}
                  className="surface-card group flex h-full flex-col p-5 transition-transform duration-300 hover:-translate-y-1 sm:p-6"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="border border-emerald px-2.5 py-1 text-[0.58rem] font-semibold uppercase tracking-widest text-emerald">
                      {item.market}
                    </span>
                    <span className="num text-[0.65rem] text-muted-foreground">
                      {formatReportDate(item.date)}
                    </span>
                  </div>
                  <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1">
                    {item.asset ? (
                      <span className="num text-xs font-semibold">{item.asset}</span>
                    ) : null}
                    {item.weekLabel ? (
                      <span className="num text-[0.65rem] text-muted-foreground">
                        {item.weekLabel}
                      </span>
                    ) : null}
                  </div>
                  <h2 className="mt-3 text-pretty font-display text-lg font-semibold leading-snug">
                    {item.title}
                  </h2>
                  <p className="mt-2.5 line-clamp-4 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {item.summary}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-2 border-t border-border pt-4 font-mono text-[0.66rem] uppercase tracking-[0.16em] transition-colors group-hover:text-emerald">
                    Read report
                    <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </span>
                </Link>
              </motion.div>
            ))}
          </motion.div>

          {visible.length > PAGE_SIZE ? (
            <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-border pt-6 sm:flex-row">
              <p className="num text-xs text-muted-foreground">
                Page {currentPage} of {totalPages} · Showing{" "}
                {Math.min((currentPage - 1) * PAGE_SIZE + 1, visible.length)}-
                {Math.min(currentPage * PAGE_SIZE, visible.length)} of {visible.length}
              </p>
              <div className="flex flex-wrap items-center justify-center gap-2">
                <button
                  type="button"
                  onClick={() => setPage((value) => Math.max(1, value - 1))}
                  disabled={currentPage === 1}
                  className="inline-flex items-center gap-2 border border-border px-3 py-2 text-xs font-semibold text-muted-foreground transition-colors hover:border-emerald hover:text-emerald disabled:pointer-events-none disabled:opacity-40"
                >
                  <ArrowLeft className="h-3.5 w-3.5" />
                  Previous
                </button>
                {pageNumbers.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setPage(item)}
                    aria-current={item === currentPage ? "page" : undefined}
                    className={
                      item === currentPage
                        ? "h-9 min-w-9 border border-navy bg-navy px-3 text-xs font-semibold text-navy-foreground"
                        : "h-9 min-w-9 border border-border px-3 text-xs font-semibold text-muted-foreground transition-colors hover:border-emerald hover:text-emerald"
                    }
                  >
                    {item}
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() => setPage((value) => Math.min(totalPages, value + 1))}
                  disabled={currentPage === totalPages}
                  className="inline-flex items-center gap-2 border border-border px-3 py-2 text-xs font-semibold text-muted-foreground transition-colors hover:border-emerald hover:text-emerald disabled:pointer-events-none disabled:opacity-40"
                >
                  Next
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          ) : null}

          {visible.length === 0 ? (
            <p className="mt-12 text-center text-sm text-muted-foreground">
              No reports match that search yet.
            </p>
          ) : null}
        </div>
      </section>
    </main>
  );
}
