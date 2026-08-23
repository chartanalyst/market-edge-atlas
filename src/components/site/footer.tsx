import { Link } from "@tanstack/react-router";
import { BrandLogo } from "@/components/site/brand-logo";
import {
  Github,
  Globe,
  Instagram,
  Linkedin,
  LineChart,
  Mail,
  MessageCircle,
  Send,
  Twitter,
  type LucideIcon,
} from "lucide-react";
import { useSiteContent } from "@/components/site/content-context";

/** Icons per supported platform — keys are matched case-insensitively. */
const platformIcons: Record<string, LucideIcon> = {
  email: Mail,
  x: Twitter,
  twitter: Twitter,
  linkedin: Linkedin,
  discord: MessageCircle,
  telegram: Send,
  instagram: Instagram,
  tradingview: LineChart,
  github: Github,
};

export function iconForPlatform(platform: string): LucideIcon {
  return platformIcons[platform.trim().toLowerCase()] ?? Globe;
}

export function SiteFooter() {
  const { copy, links } = useSiteContent();
  const brand = copy.brand;
  const socials = links.filter((l) => l.href.trim().length > 0);

  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto w-[min(1320px,94vw)] py-16">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div className="max-w-sm">
            <div className="flex items-center gap-2.5">
              <BrandLogo showText={false} imageClassName="h-11 w-11" />
              <span className="font-display text-sm font-semibold">{brand.name}</span>
            </div>
            <p className="mt-5 text-sm leading-relaxed text-muted-foreground">{brand.tagline}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {socials.map((s) => {
                const Icon = iconForPlatform(s.platform);
                const isMail = s.href.startsWith("mailto:");
                return (
                  <a
                    key={`${s.platform}-${s.href}`}
                    href={s.href}
                    aria-label={s.label || s.platform}
                    title={s.label || s.platform}
                    {...(isMail ? {} : { target: "_blank", rel: "noopener noreferrer" })}
                    className="grid h-9 w-9 place-items-center border border-border text-muted-foreground transition-colors hover:border-emerald hover:text-emerald"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                );
              })}
            </div>
          </div>

          <FooterCol
            title="Navigate"
            items={[
              { label: "About", href: "/#about" },

              { label: "Featured analysis", href: "/#featured" },
              { label: "Trading journal", href: "/#journal" },
            ]}
          />
          <FooterCol
            title="Work"
            items={[
              { label: "Services", href: "/#services" },
              { label: "Process", href: "/#process" },
              { label: "Certifications", href: "/#certifications" },
              { label: "Testimonials", href: "/#testimonials" },
            ]}
          />
          <div>
            <p className="eyebrow">Resources</p>
            <ul className="mt-5 grid gap-3 text-sm">
              <li>
                <Link
                  to="/"
                  hash="reports"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  Weekly reports
                </Link>
              </li>
              <li>
                <a
                  href="/#faq"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  FAQ
                </a>
              </li>
              <li>
                <a
                  href="/#contact"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  Book a consultation
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {brand.name}. All rights reserved.
          </p>
          <p className="max-w-xl sm:text-right">{brand.disclaimer}</p>
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
            <a
              href={i.href}
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              {i.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
