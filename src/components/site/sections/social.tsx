import { useCallback, useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { ArrowLeft, ArrowRight, ArrowUpRight, Quote, Star } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Reveal, SectionHeading, Stagger, StaggerItem } from "@/components/site/primitives";
import { faqs, insights, testimonials } from "@/lib/site-data";

export function Testimonials() {
  const [index, setIndex] = useState(0);
  const next = useCallback(() => setIndex((i) => (i + 1) % testimonials.length), []);
  const prev = () => setIndex((i) => (i - 1 + testimonials.length) % testimonials.length);

  useEffect(() => {
    const t = setInterval(next, 7000);
    return () => clearInterval(t);
  }, [next]);

  const t = testimonials[index];

  return (
    <section id="testimonials" className="relative scroll-mt-28 overflow-hidden py-24 lg:py-32">
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-70"
        style={{ background: "var(--gradient-hero)" }}
      />
      <div className="mx-auto w-[min(1100px,92vw)]">
        <SectionHeading eyebrow="Testimonials" title="What desks and communities say." align="center" />

        <Reveal delay={0.1} className="relative mt-14">
          <div className="glass-panel p-8 shadow-[var(--shadow-lift)] sm:p-12">
            <Quote className="h-8 w-8 text-emerald/40" />
            <AnimatePresence mode="wait">
              <motion.blockquote
                key={index}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              >
                <p className="mt-6 text-pretty font-display text-xl font-medium leading-snug sm:text-2xl">
                  “{t.quote}”
                </p>
                <footer className="mt-8 flex flex-wrap items-center justify-between gap-5">
                  <div className="flex min-w-0 items-center gap-4">
                    <span className="grid h-12 w-12 shrink-0 place-items-center bg-navy font-display text-sm font-semibold text-navy-foreground">
                      {t.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold">{t.name}</p>
                      <p className="truncate text-xs text-muted-foreground">{t.role}</p>
                    </div>
                  </div>
                  <div className="flex gap-1" aria-label={`${t.rating} out of 5`}>
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-emerald text-emerald" />
                    ))}
                  </div>
                </footer>
              </motion.blockquote>
            </AnimatePresence>
          </div>

          <div className="mt-8 flex items-center justify-center gap-4">
            <button
              onClick={prev}
              aria-label="Previous testimonial"
              className="grid h-10 w-10 place-items-center border border-border bg-card transition-colors hover:border-emerald hover:text-emerald"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  aria-label={`Go to testimonial ${i + 1}`}
                  className={
                    i === index
                      ? "h-1.5 w-7 bg-emerald transition-all"
                      : "h-1.5 w-1.5 bg-hairline transition-all"
                  }
                />
              ))}
            </div>
            <button
              onClick={next}
              aria-label="Next testimonial"
              className="grid h-10 w-10 place-items-center border border-border bg-card transition-colors hover:border-emerald hover:text-emerald"
            >
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function Insights() {
  return (
    <section id="insights" className="scroll-mt-28 border-y border-border bg-surface py-24 lg:py-32">
      <div className="mx-auto w-[min(1320px,94vw)]">
        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <SectionHeading
            eyebrow="Educational content"
            title="Weekly outlooks, technical concepts and research notes."
            description="Free, structured education alongside the professional research — written the same way I write for desks."
          />
          <Reveal delay={0.1}>
            <Link
              to="/insights"
              className="inline-flex items-center gap-2 border border-border bg-card px-5 py-3 text-sm font-semibold transition-colors hover:border-emerald hover:text-emerald"
            >
              All insights
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>

        <Stagger className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {insights.slice(0, 6).map((p) => (
            <StaggerItem key={p.slug}>
              <Link to="/insights" className="surface-card group flex h-full flex-col p-7">
                <div className="flex items-center justify-between gap-3">
                  <span className="border border-emerald bg-transparent px-2.5 py-1 text-[0.6rem] font-semibold uppercase tracking-widest text-accent-foreground">
                    {p.category}
                  </span>
                  <span className="num text-[0.65rem] text-muted-foreground">{p.readTime}</span>
                </div>
                <h3 className="mt-5 text-pretty text-lg font-semibold leading-snug">{p.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{p.excerpt}</p>
                <div className="mt-6 flex items-center justify-between border-t border-border pt-4">
                  <span className="num text-[0.7rem] text-muted-foreground">
                    {new Date(p.date).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-emerald" />
                </div>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

export function Faq() {
  return (
    <section id="faq" className="scroll-mt-28 py-24 lg:py-32">
      <div className="mx-auto grid w-[min(1100px,92vw)] gap-12 lg:grid-cols-[0.85fr_1.15fr]">
        <SectionHeading
          eyebrow="FAQ"
          title="Common questions, answered plainly."
          description="If your question isn't here, the contact form below reaches me directly."
        />
        <Reveal delay={0.1}>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((f, i) => (
              <AccordionItem key={f.q} value={`item-${i}`} className="border-hairline">
                <AccordionTrigger className="py-5 text-left font-display text-base font-semibold hover:no-underline">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="pb-6 text-sm leading-relaxed text-muted-foreground">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  );
}
