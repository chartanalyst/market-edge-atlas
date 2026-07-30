import { useState, type FormEvent } from "react";
import { ArrowRight, Check, Clock, Mail, MapPin } from "lucide-react";
import { toast } from "sonner";
import { Reveal, SectionHeading } from "@/components/site/primitives";
import { socials } from "@/components/site/footer";

export function Contact() {
  const [sent, setSent] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSent(true);
    toast.success("Message received", {
      description: "I reply to every enquiry within one business day.",
    });
  };

  return (
    <section id="contact" className="relative scroll-mt-28 overflow-hidden py-24 lg:py-32">
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{ background: "var(--gradient-hero)" }}
      />
      <div className="mx-auto grid w-[min(1320px,94vw)] gap-12 lg:grid-cols-[0.95fr_1.05fr]">
        <div>
          <SectionHeading
            eyebrow="Contact"
            title="Let's discuss your markets."
            description="Research retainers, community coverage, education or a one-off custom review — tell me what you need and I'll respond with a scope and timeline."
          />

          <Reveal delay={0.1} className="mt-10 grid gap-4">
            {[
              { icon: Mail, l: "Email", v: "research@technical-analyst.io" },
              { icon: Clock, l: "Response time", v: "Within one business day" },
              { icon: MapPin, l: "Coverage", v: "Asia · London · New York sessions" },
            ].map((c) => (
              <div key={c.l} className="flex items-center gap-4 border border-border bg-card p-5 backdrop-blur">
                <span className="grid h-10 w-10 shrink-0 place-items-center border border-emerald bg-transparent text-emerald">
                  <c.icon className="h-4 w-4" />
                </span>
                <div className="min-w-0">
                  <p className="eyebrow text-[0.6rem]">{c.l}</p>
                  <p className="truncate text-sm font-medium">{c.v}</p>
                </div>
              </div>
            ))}
          </Reveal>

          <Reveal delay={0.16} className="mt-8">
            <p className="eyebrow">Direct channels</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  className="inline-flex items-center gap-2 border border-border bg-card px-4 py-2.5 text-xs font-semibold transition-colors hover:border-emerald hover:text-emerald"
                >
                  <s.icon className="h-3.5 w-3.5" />
                  {s.label}
                </a>
              ))}
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.12}>
          <form
            onSubmit={onSubmit}
            className="border border-border bg-card p-7 shadow-[var(--shadow-lift)] sm:p-9"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Full name" name="name" placeholder="Alex Morgan" />
              <Field label="Email" name="email" type="email" placeholder="alex@fund.com" />
            </div>
            <div className="mt-5 grid gap-5 sm:grid-cols-2">
              <Field label="Organisation" name="org" required={false} placeholder="Fund, desk or community" />
              <div>
                <label htmlFor="topic" className="eyebrow">
                  Engagement
                </label>
                <select
                  id="topic"
                  name="topic"
                  className="mt-2.5 w-full border border-border bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-emerald"
                >
                  {[
                    "Technical analysis retainer",
                    "Institutional report",
                    "Community coverage",
                    "Education / mentoring",
                    "Custom market review",
                    "Consulting",
                  ].map((o) => (
                    <option key={o}>{o}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mt-5">
              <label htmlFor="message" className="eyebrow">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                placeholder="Markets you trade, timeframe, and what you'd like covered…"
                className="mt-2.5 w-full resize-none border border-border bg-background px-4 py-3 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-emerald"
              />
            </div>

            <button
              type="submit"
              className="group mt-7 inline-flex w-full items-center justify-center gap-2 bg-navy px-6 py-3.5 text-sm font-semibold text-navy-foreground transition-transform hover:-translate-y-0.5"
            >
              {sent ? (
                <>
                  <Check className="h-4 w-4 text-emerald" />
                  Message sent
                </>
              ) : (
                <>
                  Send enquiry
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </>
              )}
            </button>
            <p className="mt-4 text-center text-xs text-muted-foreground">
              Prefer a call? Book a 45-minute consultation and I'll send a written summary afterwards.
            </p>
          </form>
        </Reveal>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
  required = true,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={name} className="eyebrow">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="mt-2.5 w-full border border-border bg-background px-4 py-3 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-emerald"
      />
    </div>
  );
}
