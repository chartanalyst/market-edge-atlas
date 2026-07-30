import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight, Search } from "lucide-react";
import { Reveal, Stagger, StaggerItem } from "@/components/site/primitives";
import { insights } from "@/lib/site-data";
import { cn } from "@/lib/utils";

const title = "Market Insights & Technical Education | Technical Market Analyst";
const description =
  "Weekly market outlooks, technical concepts and professional resources on market structure, liquidity and risk across five asset classes.";

export const Route = createFileRoute("/insights")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: InsightsPage,
});

function InsightsPage() {
  const categories = ["All", ...Array.from(new Set(insights.map((i) => i.category)))];
  const [cat, setCat] = useState("All");
  const [query, setQuery] = useState("");

  const visible = useMemo(
    () =>
      insights.filter((p) => {
        const q = query.trim().toLowerCase();
        return (
          (cat === "All" || p.category === cat) &&
          (!q || p.title.toLowerCase().includes(q) || p.excerpt.toLowerCase().includes(q))
        );
      }),
    [cat, query],
  );

  const [featured, ...rest] = visible;

  return (
    <main className="pt-32">
      <section className="mx-auto w-[min(1200px,92vw)]">
        <Reveal>
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-emerald" />
            <p className="eyebrow">Insights & education</p>
          </div>
          <h1 className="mt-5 max-w-3xl text-balance text-4xl font-semibold leading-[1.05] sm:text-5xl lg:text-6xl">
            Research notes, outlooks and technical education.
          </h1>
          <p className="mt-6 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
            {description}
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mt-10 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={cn(
                  "rounded-full border px-4 py-2 text-xs font-semibold transition-all",
                  cat === c
                    ? "border-navy bg-navy text-navy-foreground"
                    : "border-hairline text-muted-foreground hover:border-emerald hover:text-emerald",
                )}
              >
                {c}
              </button>
            ))}
          </div>
          <label className="flex items-center gap-2 rounded-full border border-hairline bg-card px-4 py-2.5">
            <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search articles…"
              aria-label="Search articles"
              className="w-44 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            />
          </label>
        </Reveal>

        {featured ? (
          <Reveal delay={0.14} className="mt-12">
            <article className="surface-card grid gap-8 rounded-3xl p-8 lg:grid-cols-[1.2fr_1fr] lg:p-12">
              <div>
                <span className="rounded-full bg-emerald-soft px-3 py-1 text-[0.6rem] font-semibold uppercase tracking-widest text-accent-foreground">
                  {featured.category}
                </span>
                <h2 className="mt-6 text-balance text-2xl font-semibold leading-snug sm:text-3xl">
                  {featured.title}
                </h2>
                <p className="mt-4 text-pretty text-sm leading-relaxed text-muted-foreground sm:text-base">
                  {featured.excerpt}
                </p>
                <div className="num mt-6 flex gap-4 text-xs text-muted-foreground">
                  <span>{formatDate(featured.date)}</span>
                  <span>{featured.readTime}</span>
                </div>
              </div>
              <div className="grid-lines rounded-2xl border border-hairline bg-surface/50 p-8">
                <p className="eyebrow">In this note</p>
                <ul className="mt-5 grid gap-3 text-sm text-muted-foreground">
                  {["Higher-timeframe context", "Liquidity map", "Key levels & scenarios", "Risk considerations"].map(
                    (l) => (
                      <li key={l} className="flex items-center gap-3">
                        <span className="h-1 w-1 rounded-full bg-emerald" />
                        {l}
                      </li>
                    ),
                  )}
                </ul>
              </div>
            </article>
          </Reveal>
        ) : (
          <p className="mt-16 text-sm text-muted-foreground">No articles match that search.</p>
        )}

        <Stagger className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {rest.map((p) => (
            <StaggerItem key={p.slug}>
              <article className="surface-card group flex h-full flex-col rounded-3xl p-7">
                <div className="flex items-center justify-between gap-3">
                  <span className="rounded-full bg-secondary px-2.5 py-1 text-[0.6rem] font-semibold uppercase tracking-widest text-muted-foreground">
                    {p.category}
                  </span>
                  <span className="num text-[0.65rem] text-muted-foreground">{p.readTime}</span>
                </div>
                <h3 className="mt-5 text-pretty text-lg font-semibold leading-snug">{p.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{p.excerpt}</p>
                <div className="mt-6 flex items-center justify-between border-t border-hairline pt-4">
                  <span className="num text-[0.7rem] text-muted-foreground">{formatDate(p.date)}</span>
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-emerald" />
                </div>
              </article>
            </StaggerItem>
          ))}
        </Stagger>
      </section>
      <div className="h-24" />
    </main>
  );
}

function formatDate(d: string) {
  return new Date(d).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
}
