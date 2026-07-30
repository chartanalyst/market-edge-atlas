import { useId } from "react";
import { cn } from "@/lib/utils";

function toPath(series: number[], w: number, h: number, pad = 4) {
  const min = Math.min(...series);
  const max = Math.max(...series);
  const span = max - min || 1;
  const step = (w - pad * 2) / (series.length - 1);
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

export function AreaChart({
  series,
  className,
  height = 160,
  animate = true,
  showGrid = true,
}: {
  series: number[];
  className?: string;
  height?: number;
  animate?: boolean;
  showGrid?: boolean;
}) {
  const id = useId().replace(/:/g, "");
  const w = 320;
  const pts = toPath(series, w, height);
  const line = smooth(pts);
  const area = `${line} L ${pts[pts.length - 1][0]} ${height} L ${pts[0][0]} ${height} Z`;
  const last = pts[pts.length - 1];

  return (
    <svg
      viewBox={`0 0 ${w} ${height}`}
      className={cn("w-full", className)}
      preserveAspectRatio="none"
      role="img"
      aria-label="Price structure chart"
    >
      <defs>
        <linearGradient id={`fill-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--emerald)" stopOpacity="0.28" />
          <stop offset="100%" stopColor="var(--emerald)" stopOpacity="0" />
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
      <path d={area} fill={`url(#fill-${id})`} />
      <path
        d={line}
        fill="none"
        stroke="var(--emerald)"
        strokeWidth="2"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
        className={animate ? "animate-draw" : undefined}
      />
      <circle cx={last[0]} cy={last[1]} r="3.5" fill="var(--emerald)" />
      <circle cx={last[0]} cy={last[1]} r="7" fill="var(--emerald)" opacity="0.18" />
    </svg>
  );
}

export function CandleChart({ className }: { className?: string }) {
  const candles = [
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
  const w = 300;
  const h = 130;
  const step = w / candles.length;
  const min = 34;
  const max = 96;
  const y = (v: number) => h - ((v - min) / (max - min)) * (h - 12) - 6;

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className={cn("w-full", className)} role="presentation">
      {candles.map(([o, hi, lo, c], i) => {
        const up = c >= o;
        const x = i * step + step / 2;
        const color = up ? "var(--emerald)" : "var(--muted-foreground)";
        return (
          <g key={i} opacity={0.95}>
            <line x1={x} x2={x} y1={y(hi)} y2={y(lo)} stroke={color} strokeWidth="1.2" />
            <rect
              x={x - step * 0.26}
              width={step * 0.52}
              y={Math.min(y(o), y(c))}
              height={Math.max(Math.abs(y(o) - y(c)), 2)}
              rx="1.5"
              fill={up ? color : "transparent"}
              stroke={color}
              strokeWidth="1.2"
            />
          </g>
        );
      })}
    </svg>
  );
}
