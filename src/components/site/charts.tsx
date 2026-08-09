import { useId, useMemo } from "react";
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
            shouldAnimate
              ? { cy: bobKeyframes, opacity: 0.18 }
              : { cy: lastY, opacity: 0.18 }
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
}: {
  segments: DonutSegment[];
  className?: string;
  chartKey?: string;
}) {
  const reduceMotion = useReducedMotion();
  const size = 220;
  const cx = size / 2;
  const cy = size / 2;
  const r = 78;
  const stroke = 28;
  const c = 2 * Math.PI * r;
  let offset = 0;

  const arcs = segments.map((seg) => {
    const len = (seg.pct / 100) * c;
    const dash = `${len} ${c - len}`;
    const arc = { ...seg, dash, offset: -offset };
    offset += len;
    return arc;
  });

  return (
    <div className={cn("mx-auto w-full max-w-[280px]", className)}>
      <svg viewBox={`0 0 ${size} ${size}`} className="w-full" role="img" aria-label="Asset class distribution">
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="var(--hairline)" strokeWidth={stroke} />
        <g transform={`rotate(-90 ${cx} ${cy})`}>
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
              initial={reduceMotion ? false : { strokeDasharray: `0 ${c}` }}
              animate={{ strokeDasharray: arc.dash }}
              transition={{ duration: 1.1, delay: i * 0.12, ease }}
            />
          ))}
        </g>
      </svg>
      <div className="mt-6 flex flex-wrap justify-center gap-x-4 gap-y-2">
        {segments.map((seg) => (
          <div key={seg.label} className="flex items-center gap-2 text-xs text-muted-foreground">
            <span className="h-2 w-2 rounded-sm" style={{ backgroundColor: seg.color }} aria-hidden />
            <span>{seg.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function polyline(points: readonly (readonly [number, number])[]) {
  if (points.length < 2) return "";
  return points.map(([x, y], i) => `${i === 0 ? "M" : "L"} ${x} ${y}`).join(" ");
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

  const { line, last } = useMemo(() => {
    if (values.length < 2) {
      return { line: "", last: [w - 8, height / 2] as const };
    }
    const pts = toPath(values, w, height, 6);
    // Sharp segments read as rise → pullback → rise (equity style)
    return { line: polyline(pts), last: pts[pts.length - 1] };
  }, [values, height, w]);

  if (values.length < 2) {
    return <ChartAreaSkeleton height={height} className={className} />;
  }

  const lastY = last[1];

  return (
    <svg
      viewBox={`0 0 ${w} ${height}`}
      className={cn("w-full overflow-visible", className)}
      preserveAspectRatio="none"
      role="img"
      aria-label="Equity curve"
    >
      <defs>
        <linearGradient id={`glow-stroke-${id}`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="var(--foreground)" />
          <stop offset="100%" stopColor="var(--foreground)" />
        </linearGradient>
        <filter id={`glow-filter-${id}`} x="-30%" y="-40%" width="160%" height="180%">
          <feGaussianBlur stdDeviation="2.8" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <line
        x1={0}
        x2={0}
        y1={4}
        y2={height - 2}
        stroke="var(--foreground)"
        strokeWidth="1"
      />

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
        key={`glow-line-${chartKey}`}
        d={line}
        fill="none"
        stroke="var(--foreground)"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
        initial={shouldAnimate ? { pathLength: 0, opacity: 0.5 } : false}
        animate={{ d: line, pathLength: 1, opacity: 1 }}
        transition={{ pathLength: { duration: 2.2, ease }, d: { duration: 0.8, ease }, opacity: { duration: 0.5 } }}
      />

      <motion.g key={`glow-dot-${chartKey}`}>
        <motion.circle
          cx={last[0]}
          r="8"
          fill="oklch(0.62 0.24 25)"
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
          fill="oklch(0.62 0.24 25)"
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
    <svg viewBox={`0 0 ${w} ${h}`} className={cn("w-full overflow-visible", className)} role="presentation">
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
