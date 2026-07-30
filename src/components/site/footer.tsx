import { Link } from "@tanstack/react-router";
import { Mail, MessageCircle, Linkedin, Send, Twitter } from "lucide-react";

export const socials = [
  { label: "Email", href: "mailto:research@technical-analyst.io", icon: Mail },
  { label: "X", href: "https://x.com", icon: Twitter },
  { label: "LinkedIn", href: "https://linkedin.com", icon: Linkedin },
  { label: "Discord", href: "https://discord.com", icon: MessageCircle },
  { label: "Telegram", href: "https://telegram.org", icon: Send },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-hairline bg-surface/60">
      <div className="mx-auto w-[min(1320px,94vw)] py-16">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div className="max-w-sm">
            <div className="flex items-center gap-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-none bg-navy text-navy-foreground">
                <span className="font-display text-sm font-bold">TA</span>
              </span>
              <span className="font-display text-sm font-semibold">Technical Market Analyst</span>
            </div>
            <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
              Institutional-grade technical research across crypto, forex, equities, commodities and
              indices. Structure first, risk always.
            </p>
            <div className="mt-6 flex gap-2">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="grid h-9 w-9 place-items-center rounded-none border border-border text-muted-foreground transition-colors hover:border-emerald hover:text-emerald"
                >
                  <s.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <FooterCol
            title="Navigate"
            items={[
              { label: "About", href: "/#about" },
              { label: "Markets", href: "/#markets" },
              { label: "Featured analysis", href: "/#featured" },
              { label: "Performance", href: "/#performance" },
            ]}
          />
          <FooterCol
            title="Work"
            items={[
              { label: "Services", href: "/#services" },
              { label: "Process", href: "/#process" },
              { label: "Experience", href: "/#experience" },
              { label: "Testimonials", href: "/#testimonials" },
            ]}
          />
          <div>
            <p className="eyebrow">Resources</p>
            <ul className="mt-5 grid gap-3 text-sm">
              <li>
                <Link to="/insights" className="text-muted-foreground transition-colors hover:text-foreground">
                  Insights & education
                </Link>
              </li>
              <li>
                <a href="/#faq" className="text-muted-foreground transition-colors hover:text-foreground">
                  FAQ
                </a>
              </li>
              <li>
                <a href="/#contact" className="text-muted-foreground transition-colors hover:text-foreground">
                  Book a consultation
                </a>
              </li>
              <li>
                <a
                  href="/cv-technical-market-analyst.txt"
                  download
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  Download CV
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-hairline pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Technical Market Analyst. All rights reserved.</p>
          <p className="max-w-xl sm:text-right">
            Research and education only. Nothing published here constitutes financial advice.
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, items }: { title: string; items: { label: string; href: string }[] }) {
  return (
    <div>
      <p className="eyebrow">{title}</p>
      <ul className="mt-5 grid gap-3 text-sm">
        {items.map((i) => (
          <li key={i.label}>
            <a href={i.href} className="text-muted-foreground transition-colors hover:text-foreground">
              {i.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
