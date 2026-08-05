import { useState, type FormEvent } from "react";
import { ArrowRight, Check, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useServerFn } from "@tanstack/react-start";
import { Reveal, SectionHeading } from "@/components/site/primitives";
import { iconForPlatform } from "@/components/site/footer";
import { useSiteContent } from "@/components/site/content-context";
import { submitContact } from "@/lib/contact.functions";
import { cn } from "@/lib/utils";

export function Contact() {
  const { copy, links } = useSiteContent();
  const socials = links.filter((l) => l.href.trim().length > 0);
  const contact = copy.contact;
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);
  const submit = useServerFn(submitContact);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (busy) return;
    const form = e.currentTarget;
    const fd = new FormData(form);
    setBusy(true);
    try {
      const result = await submit({
        data: {
          name: String(fd.get("name") ?? ""),
          email: String(fd.get("email") ?? ""),
          organisation: String(fd.get("org") ?? ""),
          topic: String(fd.get("topic") ?? ""),
          message: String(fd.get("message") ?? ""),
        },
      });
      setSent(true);
      form.reset();
      toast.success("Message received", {
        description: result?.emailed
          ? "I reply to every enquiry within one business day."
          : "Saved — email delivery may need a one-time inbox confirmation.",
      });
    } catch (err) {
      console.error("[contact] form error:", err);
      toast.error(err instanceof Error ? err.message : "Could not send enquiry", {
        duration: 8000,
      });
    } finally {
      setBusy(false);
    }
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
            eyebrow={contact.eyebrow}
            title={contact.title}
            description={contact.description}
          />

          <Reveal delay={0.1} className="mt-10 border border-border bg-card">
            {[
              { l: "Email", v: contact.email },
              { l: "Response time", v: contact.responseTime },
              { l: "Coverage", v: contact.coverage },
            ].map((c, i) => (
              <div
                key={c.l}
                className={cn(
                  "grid gap-1 px-6 py-5 sm:grid-cols-[9rem_1fr] sm:items-baseline sm:gap-6",
                  i > 0 && "border-t border-border",
                )}
              >
                <p className="eyebrow text-[0.62rem]">{c.l}</p>
                <p className="font-display text-sm font-semibold leading-relaxed sm:text-base">{c.v}</p>
              </div>
            ))}
          </Reveal>

          <Reveal delay={0.16} className="mt-8">
            <p className="eyebrow">Direct channels</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {socials.map((s) => {
                const Icon = iconForPlatform(s.platform);
                const isMail = s.href.startsWith("mailto:");
                return (
                  <a
                    key={`${s.platform}-${s.href}`}
                    href={s.href}
                    {...(isMail ? {} : { target: "_blank", rel: "noopener noreferrer" })}
                    className="inline-flex items-center gap-2 border border-border bg-card px-4 py-2.5 text-xs font-semibold transition-colors hover:border-emerald hover:text-emerald"
                  >
                    <Icon className="h-3.5 w-3.5" />
                    {s.label || s.platform}
                  </a>
                );
              })}
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
                  {contact.engagements.map((o) => (
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
              disabled={busy || sent}
              className="group mt-8 inline-flex w-full items-center justify-center gap-2 border border-border bg-navy px-6 py-4 font-mono text-[0.72rem] uppercase tracking-[0.16em] text-navy-foreground transition-colors hover:bg-emerald disabled:opacity-70"
            >
              {busy ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Sending…
                </>
              ) : sent ? (
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
            <p className="mt-4 text-center text-xs text-muted-foreground">{contact.footnote}</p>
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
