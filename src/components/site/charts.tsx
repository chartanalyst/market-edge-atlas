import { useId, useMemo, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";
import { ChartAreaSkeleton } from "@/components/site/skeletons";

const ease = [0.22, 1, 0.36, 1] as const;

function normalizeSeries(series: number[]): number[] {
  return series
    .map((v) => (typeof v === "number" ? v : Number(v)))
    .filter((v) => Number.isFinite(v));
}

/** Map series values to SVG coordinates — x must span the full chart width. */
function toPath(series: number[], w: number, h: number, pad = 4) {
  const min = Math.min(...series);
  const max = Math.max(...series);
  const span = max - min || 1;
  const step = (w - pad * 2) / Math.max(series.length - 1, 1);
  return series.map((v, i) => {
    const x = pad + i * step;
    const y = pad + (h - pad * 2) * (1 - (v - min) / span);
    return [x, y] as const;
  });
}

function smooth(points: readonly (readonly [number, number])[]) {
  if (points.length < 2) return "";
  let d = `M ${points[0][0]} ${points[0][1]}`;
  for (let i = 1; i < points.length; i++) {
    const [x0, y0] = points[i - 1];
    const [x1, y1] = points[i];
    const cx = (x0 + x1) / 2;
    d += ` C ${cx} ${y0}, ${cx} ${y1}, ${x1} ${y1}`;
  }
  return d;
}

type ChartAccent = "emerald" | "blue";

const accentColors: Record<ChartAccent, { stroke: string; fill: string; glow: string }> = {
  emerald: {
    stroke: "var(--emerald)",
    fill: "var(--emerald)",
    glow: "var(--emerald)",
  },
  blue: {
    stroke: "oklch(0.55 0.14 250)",
    fill: "oklch(0.55 0.14 250)",
    glow: "oklch(0.55 0.14 250)",
  },
};

export function AreaChart({
  series,
  className,
  height = 160,
  animate = true,
  showGrid = true,
  accent = "emerald",
  endLabel,
  chartKey,
}: {
  series: number[];
  className?: string;
  height?: number;
  animate?: boolean;
  showGrid?: boolean;
  accent?: ChartAccent;
  endLabel?: string;
  /** Change to replay draw animation when data updates */
  chartKey?: string;
}) {
  const reduceMotion = useReducedMotion();
  const id = useId().replace(/:/g, "");
  const colors = accentColors[accent];
  const w = 320;
  const values = useMemo(() => normalizeSeries(series), [series]);

  const { line, area, last, rising, bob } = useMemo(() => {
    if (values.length < 2) {
      return {
        line: "",
        area: "",
        last: [0, height / 2] as const,
        rising: true,
        bob: 4,
      };
    }
    const pts = toPath(values, w, height);
    const linePath = smooth(pts);
    const areaPath = `${linePath} L ${pts[pts.length - 1][0]} ${height} L ${pts[0][0]} ${height} Z`;
    const end = pts[pts.length - 1];
    const isRising = values[values.length - 1] >= values[values.length - 2];
    return {
      line: linePath,
      area: areaPath,
      last: end,
      rising: isRising,
      bob: Math.max(3, height * 0.028),
    };
  }, [values, height, w]);

  const identityKey = chartKey ?? "chart";
  const shouldAnimate = animate && !reduceMotion && line.length > 0;
  const lastY = last[1];
  const bobKeyframes = rising
    ? [lastY, lastY - bob, lastY, lastY + bob * 0.35, lastY]
    : [lastY, lastY + bob, lastY, lastY - bob * 0.35, lastY];

  if (values.length < 2) {
    return <ChartAreaSkeleton height={height} className={className} />;
  }

  return (
    <svg
      viewBox={`0 0 ${w} ${height}`}
      className={cn("w-full overflow-visible", className)}
      preserveAspectRatio="none"
      role="img"
      aria-label="Market chart"
    >
      <defs>
        <linearGradient id={`fill-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={colors.fill} stopOpacity="0.28" />
          <stop offset="100%" stopColor={colors.fill} stopOpacity="0" />
        </linearGradient>
      </defs>

      {showGrid
        ? [0.25, 0.5, 0.75].map((f) => (
            <line
              key={f}
              x1={0}
              x2={w}
              y1={height * f}
              y2={height * f}
              stroke="var(--hairline)"
              strokeWidth="1"
              strokeDasharray="3 5"
            />
          ))
        : null}

      <motion.path
        key={`area-${identityKey}`}
        d={area}
        fill={`url(#fill-${id})`}
        initial={shouldAnimate ? { opacity: 0 } : false}
        animate={{ d: area, opacity: 1 }}
        transition={{
          d: { duration: 0.7, ease },
          opacity: { duration: 0.9, ease, delay: shouldAnimate ? 0.35 : 0 },
        }}
      />

      <motion.path
        key={`line-${identityKey}`}
        d={line}
        fill="none"
        stroke={colors.stroke}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
        initial={shouldAnimate ? { pathLength: 0, opacity: 0.5 } : false}
        animate={{ d: line, pathLength: 1, opacity: 1 }}
        transition={{
          d: { duration: 0.7, ease },
          pathLength: { duration: 1.5, ease },
          opacity: { duration: 0.5 },
        }}
      />

      <motion.g key={`dot-${identityKey}`}>
        <motion.circle
          cx={last[0]}
          r="7"
          fill={colors.glow}
          initial={shouldAnimate ? { cy: lastY, opacity: 0 } : false}
          animate={
            shouldAnimate ? { cy: bobKeyframes, opacity: 0.18 } : { cy: lastY, opacity: 0.18 }
          }
          transition={{
            cy: { duration: 2.8, repeat: Infinity, ease: "easeInOut", delay: 1.5 },
            opacity: { duration: 0.4, delay: 1.4 },
          }}
        />
        <motion.circle
          cx={last[0]}
          r="3.5"
          fill={colors.stroke}
          initial={shouldAnimate ? { cy: lastY, opacity: 0, scale: 0 } : false}
          animate={
            shouldAnimate
              ? { cy: bobKeyframes, opacity: 1, scale: 1, r: [3.5, 4.2, 3.5] }
              : { cy: lastY, opacity: 1, scale: 1, r: 3.5 }
          }
          transition={{
            cy: { duration: 2.8, repeat: Infinity, ease: "easeInOut", delay: 1.5 },
            opacity: { duration: 0.4, delay: 1.4 },
            scale: { duration: 0.4, delay: 1.4 },
            r: { duration: 2.8, repeat: Infinity, ease: "easeInOut", delay: 1.5 },
          }}
        />
      </motion.g>

      {endLabel ? (
        <motion.text
          x={Math.min(last[0] + 6, w - 4)}
          y={Math.max(lastY - 10, 12)}
          textAnchor="start"
          className="num fill-current text-[11px] font-semibold"
          style={{ fill: colors.stroke }}
          initial={shouldAnimate ? { opacity: 0 } : false}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 1.6 }}
        >
          {endLabel}
        </motion.text>
      ) : null}
    </svg>
  );
}

export type DonutSegment = { label: string; pct: number; color: string };

export function DonutChart({
  segments,
  className,
  chartKey = "donut",
  showLegend = true,
  showCallouts = false,
}: {
  segments: DonutSegment[];
  className?: string;
  chartKey?: string;
  showLegend?: boolean;
  showCallouts?: boolean;
}) {
  const reduceMotion = useReducedMotion();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const size = showCallouts ? 340 : 220;
  const height = showCallouts ? 270 : 220;
  const cx = showCallouts ? 170 : size / 2;
  const cy = showCallouts ? 136 : height / 2;
  const r = showCallouts ? 64 : 78;
  const stroke = showCallouts ? 30 : 34;
  const c = 2 * Math.PI * r;
  const gap = showCallouts ? 4 : 5;
  const shouldAnimate = !reduceMotion && segments.length > 0;

  const arcs = useMemo(() => {
    const total = segments.reduce((sum, seg) => sum + Math.max(seg.pct, 0), 0) || 100;
    let offset = 0;

    return segments.map((seg, i) => {
      const pct = (Math.max(seg.pct, 0) / total) * 100;
      const len = (pct / 100) * c;
      const drawLen = Math.max(len - gap, 0);
      const dash = `${drawLen} ${c - drawLen}`;
      const midAngle = -90 + ((offset + len / 2) / c) * 360;
      const arc = { ...seg, pct, dash, len, offset: -offset, midAngle, index: i };
      offset += len;
      return arc;
    });
  }, [segments, c, gap]);
  const hoveredSegment = hoveredIndex === null ? null : arcs[hoveredIndex];
  const calloutPositions = [
    { x: 268, y: 72, anchor: "middle" },
    { x: 88, y: 44, anchor: "middle" },
    { x: 64, y: 144, anchor: "middle" },
    { x: 92, y: 230, anchor: "middle" },
  ] as const;
  const labelText = (label: string) => (label === "Stocks & Indices" ? "Stocks/Indices" : label);
  const pointOnCircle = (angle: number, radius: number) => {
    const rad = (angle * Math.PI) / 180;
    return {
      x: cx + Math.cos(rad) * radius,
      y: cy + Math.sin(rad) * radius,
    };
  };

  return (
    <div className={cn("mx-auto w-full max-w-[320px]", className)}>
      <svg
        viewBox={`0 0 ${size} ${height}`}
        className="w-full drop-shadow-[0_12px_22px_rgba(0,0,0,0.14)]"
        role="img"
        aria-label="Asset class distribution"
      >
        <defs>
          <radialGradient id={`donut-glow-${chartKey}`} cx="50%" cy="50%" r="58%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.18)" />
            <stop offset="72%" stopColor="rgba(255,255,255,0.035)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </radialGradient>
        </defs>
        <motion.circle
          cx={cx}
          cy={cy}
          r={r + stroke * 0.85}
          fill={`url(#donut-glow-${chartKey})`}
          initial={shouldAnimate ? { opacity: 0, scale: 0.86 } : false}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease }}
          style={{ transformOrigin: "center" }}
        />
        <motion.circle
          cx={cx}
          cy={cy}
          r={r}
          fill="none"
          stroke="var(--border)"
          strokeWidth={stroke}
          initial={shouldAnimate ? { opacity: 0, scale: 0.94 } : false}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.65, ease }}
          style={{ transformOrigin: "center" }}
        />
        <motion.g
          transform={`rotate(-90 ${cx} ${cy})`}
          initial={shouldAnimate ? { rotate: -96, opacity: 0.72 } : false}
          whileInView={{ rotate: -90, opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease }}
          style={{ transformOrigin: "center" }}
        >
          {arcs.map((arc, i) => (
            <motion.circle
              key={`${chartKey}-${arc.label}`}
              cx={cx}
              cy={cy}
              r={r}
              fill="none"
              stroke={arc.color}
              strokeWidth={stroke}
              strokeLinecap="butt"
              strokeDasharray={arc.dash}
              strokeDashoffset={arc.offset}
              strokeLinejoin="round"
              initial={
                shouldAnimate
                  ? { strokeDasharray: `0 ${c}`, strokeDashoffset: arc.offset, opacity: 0 }
                  : false
              }
              whileInView={{ strokeDasharray: arc.dash, strokeDashoffset: arc.offset, opacity: 1 }}
              whileHover={{ opacity: 0.94, scale: 1.012 }}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              onFocus={() => setHoveredIndex(i)}
              onBlur={() => setHoveredIndex(null)}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 1.05, delay: 0.08 + i * 0.09, ease }}
              style={{ cursor: "pointer", transformOrigin: "center" }}
              tabIndex={0}
            />
          ))}
        </motion.g>
        <motion.circle
          cx={cx}
          cy={cy}
          r={r - stroke / 1.82}
          fill="var(--surface)"
          stroke="var(--surface)"
          strokeWidth="2"
          initial={shouldAnimate ? { scale: 0.9, opacity: 0 } : false}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.65, delay: 0.35, ease }}
          style={{ transformOrigin: "center" }}
        />
        {showCallouts
          ? arcs.map((arc, i) => {
              const dot = pointOnCircle(arc.midAngle, r - stroke * 0.2);
              const edge = pointOnCircle(arc.midAngle, r + stroke * 0.42);
              const label = calloutPositions[i % calloutPositions.length];
              const isLight = i === arcs.length - 1;
              return (
                <motion.g
                  key={`${chartKey}-${arc.label}-callout`}
                  initial={shouldAnimate ? { opacity: 0, y: 3 } : false}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.45, delay: 0.75 + i * 0.08, ease }}
                  style={{ pointerEvents: "none" }}
                >
                  <path
                    d={`M ${dot.x} ${dot.y} L ${edge.x} ${edge.y} L ${label.x} ${label.y + 10}`}
                    fill="none"
                    stroke="var(--muted-foreground)"
                    strokeOpacity="0.58"
                    strokeWidth="1"
                  />
                  <circle cx={dot.x} cy={dot.y} r="3.5" fill="var(--card)" stroke={arc.color} />
                  <rect
                    x={label.x - 47}
                    y={label.y - 15}
                    width="94"
                    height="28"
                    rx="5"
                    fill={arc.color}
                    stroke="var(--border)"
                  />
                  <text
                    x={label.x}
                    y={label.y + 4}
                    textAnchor={label.anchor}
                    className="font-mono text-[8px] font-semibold"
                    fill={isLight ? "var(--foreground)" : "white"}
                  >
                    {labelText(arc.label)} {Math.round(arc.pct)}%
                  </text>
                </motion.g>
              );
            })
          : null}
        {hoveredSegment ? (
          <motion.g
            key={hoveredSegment.label}
            initial={{ opacity: 0, y: 3, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.2, ease }}
            style={{ pointerEvents: "none", transformOrigin: "center" }}
          >
            <text
              x={cx}
              y={cy - 3}
              textAnchor="middle"
              className="fill-foreground font-display text-[8px] font-semibold"
            >
              {hoveredSegment.label}
            </text>
            <text
              x={cx}
              y={cy + 15}
              textAnchor="middle"
              className="fill-muted-foreground font-mono text-[13px] font-semibold"
            >
              {Math.round(hoveredSegment.pct)}%
            </text>
          </motion.g>
        ) : null}
      </svg>
      {showLegend ? (
        <div className="mt-5 flex flex-wrap justify-center gap-x-4 gap-y-2">
          {segments.map((seg, i) => (
            <motion.div
              key={seg.label}
              className="flex min-w-fit items-center gap-2 text-xs text-muted-foreground transition duration-300 hover:-translate-y-0.5 hover:text-foreground"
              initial={shouldAnimate ? { opacity: 0, y: 4 } : false}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -2 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.45, delay: 0.55 + i * 0.04, ease }}
            >
              <span
                className="h-2.5 w-2.5 shrink-0 rounded-sm"
                style={{ backgroundColor: seg.color, color: seg.color }}
                aria-hidden
              />
              <span className="whitespace-nowrap font-display font-semibold">{seg.label}</span>
              <span className="num text-[0.7rem] font-semibold text-foreground">
                {Math.round(seg.pct)}%
              </span>
            </motion.div>
          ))}
        </div>
      ) : null}
    </div>
  );
}

function polyline(points: readonly (readonly [number, number])[]) {
  if (points.length < 2) return "";
  return points.map(([x, y], i) => `${i === 0 ? "M" : "L"} ${x} ${y}`).join(" ");
}

function areaPath(points: readonly (readonly [number, number])[], baseline: number) {
  if (points.length < 2) return "";
  const line = polyline(points);
  const first = points[0];
  const last = points[points.length - 1];
  return `${line} L ${last[0]} ${baseline} L ${first[0]} ${baseline} Z`;
}

/** Glowing equity line — jagged rise / break / rise, synced to trading R data. */
export function GlowLineChart({
  series,
  className,
  height = 120,
  chartKey = "glow-equity",
}: {
  series: number[];
  className?: string;
  height?: number;
  chartKey?: string;
}) {
  const reduceMotion = useReducedMotion();
  const id = useId().replace(/:/g, "");
  const w = 320;
  const values = useMemo(() => normalizeSeries(series), [series]);
  const shouldAnimate = !reduceMotion && values.length >= 2;

  const { line, area, last } = useMemo(() => {
    if (values.length < 2) {
      return { line: "", area: "", last: [w - 8, height / 2] as const };
    }
    const pts = toPath(values, w, height, 6);
    // Sharp segments read as rise → pullback → rise (equity style)
    return { line: polyline(pts), area: areaPath(pts, height - 4), last: pts[pts.length - 1] };
  }, [values, height, w]);

  if (values.length < 2) {
    return <ChartAreaSkeleton height={height} className={className} />;
  }

  const lastY = last[1];
  const positive = values[values.length - 1] >= values[0];
  const stroke = positive ? "var(--emerald)" : "var(--destructive)";

  return (
    <svg
      viewBox={`0 0 ${w} ${height}`}
      className={cn("w-full overflow-visible", className)}
      preserveAspectRatio="none"
      role="img"
      aria-label="Equity curve"
    >
      <defs>
        <linearGradient id={`glow-fill-${id}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={stroke} stopOpacity="0.2" />
          <stop offset="72%" stopColor={stroke} stopOpacity="0.045" />
          <stop offset="100%" stopColor={stroke} stopOpacity="0" />
        </linearGradient>
        <linearGradient id={`glow-stroke-${id}`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="var(--muted-foreground)" stopOpacity="0.7" />
          <stop offset="100%" stopColor={stroke} />
        </linearGradient>
        <filter id={`glow-filter-${id}`} x="-30%" y="-40%" width="160%" height="180%">
          <feGaussianBlur stdDeviation="2.8" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <line x1={0} x2={0} y1={4} y2={height - 2} stroke="var(--border)" strokeWidth="1" />

      {[0.25, 0.5, 0.75].map((f) => (
        <line
          key={f}
          x1={0}
          x2={w}
          y1={height * f}
          y2={height * f}
          stroke="oklch(0.78 0.01 80 / 0.7)"
          strokeWidth="1"
          strokeDasharray="3 6"
        />
      ))}

      <motion.path
        key={`glow-area-${chartKey}`}
        d={area}
        fill={`url(#glow-fill-${id})`}
        initial={shouldAnimate ? { opacity: 0 } : false}
        animate={{ d: area, opacity: 1 }}
        transition={{ d: { duration: 0.8, ease }, opacity: { duration: 0.7, delay: 0.35 } }}
      />

      <motion.path
        key={`glow-line-${chartKey}`}
        d={line}
        fill="none"
        stroke={`url(#glow-stroke-${id})`}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
        filter={`url(#glow-filter-${id})`}
        initial={shouldAnimate ? { pathLength: 0, opacity: 0.5 } : false}
        animate={{ d: line, pathLength: 1, opacity: 1 }}
        transition={{
          pathLength: { duration: 2.2, ease },
          d: { duration: 0.8, ease },
          opacity: { duration: 0.5 },
        }}
      />

      <motion.g key={`glow-dot-${chartKey}`}>
        <motion.circle
          cx={last[0]}
          r="8"
          fill={stroke}
          initial={shouldAnimate ? { cy: lastY, opacity: 0 } : false}
          animate={{ cy: lastY, opacity: [0.22, 0.5, 0.22] }}
          transition={{
            cy: { duration: 0.8, ease },
            opacity: { duration: 2, repeat: Infinity, ease: "easeInOut", delay: 2.2 },
          }}
        />
        <motion.circle
          cx={last[0]}
          r="3.5"
          fill={stroke}
          initial={shouldAnimate ? { cy: lastY, opacity: 0, scale: 0 } : false}
          animate={{ cy: lastY, opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 2.1, ease }}
        />
      </motion.g>
    </svg>
  );
}

const DEFAULT_CANDLES: [number, number, number, number][] = [
  [46, 62, 42, 58],
  [58, 66, 54, 55],
  [55, 60, 44, 47],
  [47, 52, 38, 50],
  [50, 64, 48, 62],
  [62, 70, 58, 68],
  [68, 72, 60, 63],
  [63, 66, 52, 55],
  [55, 78, 54, 76],
  [76, 84, 72, 82],
  [82, 86, 74, 77],
  [77, 92, 75, 90],
];

export function CandleChart({
  className,
  candles = DEFAULT_CANDLES,
  animate = true,
  chartKey,
}: {
  className?: string;
  candles?: [number, number, number, number][];
  animate?: boolean;
  chartKey?: string;
}) {
  const reduceMotion = useReducedMotion();
  const w = 300;
  const h = 130;
  const step = w / candles.length;

  const { min, max } = useMemo(() => {
    const lows = candles.map(([, , lo]) => lo);
    const highs = candles.map(([, hi]) => hi);
    const lo = Math.min(...lows);
    const hi = Math.max(...highs);
    const pad = (hi - lo) * 0.08 || 1;
    return { min: lo - pad, max: hi + pad };
  }, [candles]);

  const y = (v: number) => h - ((v - min) / (max - min)) * (h - 12) - 6;
  const shouldAnimate = animate && !reduceMotion;
  const identityKey = chartKey ?? "candles";

  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      className={cn("w-full overflow-visible", className)}
      role="presentation"
    >
      {candles.map(([o, hi, lo, c], i) => {
        const up = c >= o;
        const x = i * step + step / 2;
        const color = up ? "var(--emerald)" : "var(--muted-foreground)";
        const bodyTop = Math.min(y(o), y(c));
        const bodyHeight = Math.max(Math.abs(y(o) - y(c)), 2);
        const midY = (y(hi) + y(lo)) / 2;
        const delay = shouldAnimate ? i * 0.045 : 0;

        return (
          <g key={`${identityKey}-${i}`}>
            <motion.line
              x1={x}
              x2={x}
              stroke={color}
              strokeWidth="1.2"
              initial={shouldAnimate ? { y1: midY, y2: midY, opacity: 0 } : false}
              animate={{ y1: y(hi), y2: y(lo), opacity: 0.95 }}
              transition={{ duration: 0.45, delay, ease }}
            />
            <motion.rect
              x={x - step * 0.26}
              width={step * 0.52}
              rx="1.5"
              fill={up ? color : "transparent"}
              stroke={color}
              strokeWidth="1.2"
              initial={shouldAnimate ? { height: 0, y: y(lo), opacity: 0 } : false}
              animate={{ height: bodyHeight, y: bodyTop, opacity: 0.95 }}
              transition={{ duration: 0.5, delay: delay + 0.05, ease }}
            />
          </g>
        );
      })}
    </svg>
  );
}
