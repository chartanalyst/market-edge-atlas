"use client";

import { motion, useInView, useMotionValue, useSpring, type Variants } from "motion/react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

const easing = [0.22, 1, 0.36, 1] as const;

export const revealVariants: Variants = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.75, ease: easing } },
};

export function Reveal({
  children,
  className,
  delay = 0,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "section" | "li" | "span";
}) {
  const Comp = motion[as];
  return (
    <Comp
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      variants={{
        hidden: { opacity: 0, y: 26 },
        show: { opacity: 1, y: 0, transition: { duration: 0.75, ease: easing, delay } },
      }}
    >
      {children}
    </Comp>
  );
}

export function Stagger({
  children,
  className,
  gap = 0.08,
}: {
  children: ReactNode;
  className?: string;
  gap?: number;
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-70px" }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: gap } } }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div className={className} variants={revealVariants}>
      {children}
    </motion.div>
  );
}

export function Counter({
  value,
  suffix = "",
  decimals = 0,
  className,
}: {
  value: number;
  suffix?: string;
  decimals?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const mv = useMotionValue(0);
  const spring = useSpring(mv, { stiffness: 60, damping: 20, mass: 1 });
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (inView) mv.set(value);
  }, [inView, mv, value]);

  useEffect(() => {
    const unsub = spring.on("change", (v) => {
      setDisplay(
        v.toLocaleString("en-US", {
          minimumFractionDigits: decimals,
          maximumFractionDigits: decimals,
        }),
      );
    });
    return unsub;
  }, [spring, decimals]);

  return (
    <span ref={ref} className={cn("num", className)}>
      {display}
      {suffix}
    </span>
  );
}

export function TiltCard({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const rx = useSpring(useMotionValue(0), { stiffness: 150, damping: 18 });
  const ry = useSpring(useMotionValue(0), { stiffness: 150, damping: 18 });

  return (
    <motion.div
      ref={ref}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 900 }}
      onMouseMove={(e) => {
        const el = ref.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        ry.set(px * 7);
        rx.set(-py * 7);
      }}
      onMouseLeave={() => {
        rx.set(0);
        ry.set(0);
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: {
  eyebrow: string;
  title: ReactNode;
  description?: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <Reveal className={cn(align === "center" && "mx-auto max-w-3xl text-center", "max-w-3xl", className)}>
      <div className={cn("flex items-center gap-3", align === "center" && "justify-center")}>
        <span className="h-px w-8 bg-emerald" />
        <p className="eyebrow">{eyebrow}</p>
      </div>
      <h2 className="mt-5 text-balance text-3xl font-semibold leading-[1.08] sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-5 text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
          {description}
        </p>
      ) : null}
    </Reveal>
  );
}
