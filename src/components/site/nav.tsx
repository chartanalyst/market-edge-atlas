import { Link, useRouterState } from "@tanstack/react-router";
import { motion, useScroll, useSpring } from "motion/react";
import { useEffect, useState } from "react";
import { ArrowUp, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { MarketTicker } from "@/components/site/ticker";
import { BrandLogo } from "@/components/site/brand-logo";
import { useSiteContent } from "@/components/site/content-context";

const links = [
  { label: "About", href: "/#about" },
  { label: "Research", href: "/#markets" },
  { label: "Analysis", href: "/#featured" },
  { label: "Journal", href: "/#journal" },
  { label: "Reports", href: "/#reports" },
  { label: "Process", href: "/#process" },
  { label: "Services", href: "/#services" },
  { label: "Certifications", href: "/#certifications" },
  { label: "FAQ", href: "/#faq" },
];

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 26, restDelta: 0.001 });
  return (
    <motion.div
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-emerald"
      aria-hidden
    />
  );
}

export function SiteNav() {
  const { sections } = useSiteContent();
  const showTicker = sections.find((s) => s.id === "ticker")?.enabled ?? true;
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.documentElement.classList.remove("dark");
    try {
      window.localStorage.removeItem("tma-theme");
    } catch {
      /* ignore */
    }
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {showTicker ? <MarketTicker /> : null}
      <div
        className={cn(
          "border-b transition-colors duration-500",
          scrolled
            ? "border-border bg-[var(--glass)] backdrop-blur-md backdrop-saturate-150"
            : "border-border bg-background",
        )}
      >
      <div className="mx-auto w-[min(1320px,94vw)]">
        <nav
          className={cn(
            "flex items-center justify-between transition-all duration-500",
            scrolled ? "py-3" : "py-5",
          )}
        >
          <Link to="/" className="flex min-w-0 items-center">
            <BrandLogo />
          </Link>

          <div className="hidden items-center lg:flex">
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="link-underline px-3.5 py-1 font-mono text-[0.7rem] uppercase tracking-[0.16em] text-muted-foreground transition-colors hover:text-foreground"
              >
                {l.label}
              </a>
            ))}
          </div>

          <div className="flex shrink-0 items-center gap-2">
            <a
              href="/#contact"
              className="hidden border border-border bg-navy px-4 py-2 font-mono text-[0.7rem] uppercase tracking-[0.14em] text-navy-foreground transition-all hover:bg-emerald hover:text-navy-foreground sm:inline-flex"
            >
              Book a consultation
            </a>
            <button
              onClick={() => setOpen((o) => !o)}
              aria-label="Toggle navigation"
              className="grid h-9 w-9 place-items-center border border-border lg:hidden"
            >
              {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </nav>

        {open ? (
          <div className="mb-3 border border-border bg-card lg:hidden">
            <div className="grid">
              {links.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="border-b border-border px-4 py-3 font-mono text-[0.72rem] uppercase tracking-[0.16em] text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                >
                  {l.label}
                </a>
              ))}
              <a
                href="/#contact"
                onClick={() => setOpen(false)}
                className="bg-navy px-4 py-3 text-center font-mono text-[0.72rem] uppercase tracking-[0.16em] text-navy-foreground"
              >
                Book a consultation
              </a>
            </div>
          </div>
        ) : null}
      </div>
      </div>
    </header>
  );
}

export function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 900);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed bottom-6 right-5 z-50 flex flex-col items-end gap-3">
      <motion.button
        initial={false}
        animate={{ opacity: show ? 1 : 0, scale: show ? 1 : 0.7, y: show ? 0 : 12 }}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Back to top"
        className="grid h-11 w-11 place-items-center border border-border bg-navy text-navy-foreground"
        style={{ pointerEvents: show ? "auto" : "none" }}
      >
        <ArrowUp className="h-4 w-4" />
      </motion.button>
    </div>
  );
}
