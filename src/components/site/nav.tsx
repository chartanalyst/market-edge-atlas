import { Link, useRouterState } from "@tanstack/react-router";
import { motion, useScroll, useSpring } from "motion/react";
import { useEffect, useState } from "react";
import { ArrowUp, Download, Menu, Moon, Sun, X } from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { label: "About", href: "/#about" },
  { label: "Markets", href: "/#markets" },
  { label: "Analysis", href: "/#featured" },
  { label: "Process", href: "/#process" },
  { label: "Services", href: "/#services" },
  { label: "Insights", href: "/insights" },
  { label: "FAQ", href: "/#faq" },
];

function useTheme() {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    const stored = window.localStorage.getItem("tma-theme");
    const initial = stored === "dark";
    setDark(initial);
    document.documentElement.classList.toggle("dark", initial);
  }, []);
  const toggle = () => {
    setDark((d) => {
      const next = !d;
      document.documentElement.classList.toggle("dark", next);
      window.localStorage.setItem("tma-theme", next ? "dark" : "light");
      return next;
    });
  };
  return { dark, toggle };
}

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
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { dark, toggle } = useTheme();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled ? "py-2" : "py-4",
      )}
    >
      <div className="mx-auto w-[min(1200px,94vw)]">
        <nav
          className={cn(
            "flex items-center justify-between rounded-none px-4 py-2.5 transition-all duration-500 sm:px-5",
            scrolled ? "glass-panel shadow-[var(--shadow-soft)]" : "border border-transparent",
          )}
        >
          <Link to="/" className="flex min-w-0 items-center gap-2.5">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-none bg-navy text-navy-foreground">
              <span className="font-display text-sm font-bold">TA</span>
            </span>
            <span className="hidden min-w-0 flex-col leading-tight sm:flex">
              <span className="truncate font-display text-sm font-semibold">Technical Analyst</span>
              <span className="eyebrow text-[0.6rem]">Market Research</span>
            </span>
          </Link>

          <div className="hidden items-center gap-1 lg:flex">
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="rounded-none px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              >
                {l.label}
              </a>
            ))}
          </div>

          <div className="flex shrink-0 items-center gap-2">
            <button
              onClick={toggle}
              aria-label="Toggle colour theme"
              className="grid h-9 w-9 place-items-center rounded-none border border-border text-muted-foreground transition-colors hover:text-foreground"
            >
              {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
            <a
              href="/#contact"
              className="hidden rounded-none bg-navy px-4 py-2 text-sm font-semibold text-navy-foreground transition-transform hover:-translate-y-0.5 sm:inline-flex"
            >
              Book a consultation
            </a>
            <button
              onClick={() => setOpen((o) => !o)}
              aria-label="Toggle navigation"
              className="grid h-9 w-9 place-items-center rounded-none border border-border lg:hidden"
            >
              {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </nav>

        {open ? (
          <div className="glass-panel mt-2 rounded-none p-3 lg:hidden">
            <div className="grid gap-1">
              {links.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="rounded-none px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-secondary hover:text-foreground"
                >
                  {l.label}
                </a>
              ))}
              <a
                href="/#contact"
                onClick={() => setOpen(false)}
                className="mt-1 rounded-none bg-navy px-3 py-2.5 text-center text-sm font-semibold text-navy-foreground"
              >
                Book a consultation
              </a>
            </div>
          </div>
        ) : null}
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
      <a
        href="/cv-technical-market-analyst.txt"
        download
        className="glass-panel hidden items-center gap-2 rounded-none px-4 py-2.5 text-sm font-medium shadow-[var(--shadow-soft)] transition-transform hover:-translate-y-0.5 sm:inline-flex"
      >
        <Download className="h-4 w-4 text-emerald" />
        Download CV
      </a>
      <motion.button
        initial={false}
        animate={{ opacity: show ? 1 : 0, scale: show ? 1 : 0.7, y: show ? 0 : 12 }}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Back to top"
        className="grid h-11 w-11 place-items-center rounded-none bg-navy text-navy-foreground shadow-[var(--shadow-lift)]"
        style={{ pointerEvents: show ? "auto" : "none" }}
      >
        <ArrowUp className="h-4 w-4" />
      </motion.button>
    </div>
  );
}
