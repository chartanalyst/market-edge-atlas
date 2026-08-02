import { ArrowUpRight, BadgeCheck } from "lucide-react";
import { Reveal, SectionHeading, Stagger, StaggerItem } from "@/components/site/primitives";
import { useSiteContent } from "@/components/site/content-context";

function formatMonth(value: string) {
  if (!value) return "";
  const date = new Date(value.length === 7 ? `${value}-01` : value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("en-GB", { month: "short", year: "numeric" });
}

export function Certifications() {
  const { certifications } = useSiteContent();
  if (!certifications || certifications.length === 0) return null;

  return (
    <section id="certifications" className="scroll-mt-28 py-24 lg:py-32">
      <div className="mx-auto w-[min(1320px,94vw)]">
        <SectionHeading
          eyebrow="Certifications"
          title="Credentials behind the research."
          description="Formal qualifications and continuing education that underpin the methodology applied to every analysis."
        />

        <Stagger className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3" gap={0.08}>
          {certifications.map((c) => (
            <StaggerItem key={`${c.name}-${c.org}`}>
              <article className="surface-card flex h-full flex-col p-6 sm:p-7">
                {c.image ? (
                  <img
                    src={c.image}
                    alt={`${c.name} certificate`}
                    loading="lazy"
                    className="mb-6 aspect-[4/3] w-full border border-border object-cover"
                  />
                ) : (
                  <span className="mb-6 grid h-11 w-11 place-items-center border border-border text-emerald">
                    <BadgeCheck className="h-5 w-5" />
                  </span>
                )}

                <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                  <span className="num text-[0.65rem] font-semibold text-emerald">
                    {formatMonth(c.date)}
                  </span>
                  {c.credentialId ? (
                    <span className="border border-border px-2 py-0.5 font-mono text-[0.58rem] uppercase tracking-widest text-muted-foreground">
                      ID {c.credentialId}
                    </span>
                  ) : null}
                </div>

                <h3 className="mt-4 text-pretty text-base font-semibold leading-snug">{c.name}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{c.org}</p>
                {c.desc ? (
                  <p className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">{c.desc}</p>
                ) : (
                  <div className="flex-1" />
                )}

                {c.link ? (
                  <a
                    href={c.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-flex items-center gap-2 border-t border-border pt-4 font-mono text-[0.66rem] uppercase tracking-[0.16em] transition-colors hover:text-emerald"
                  >
                    Verify credential
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                ) : null}
              </article>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal className="mt-10">
          <p className="text-xs text-muted-foreground">
            Credential verification links open on the issuing organisation's website.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
