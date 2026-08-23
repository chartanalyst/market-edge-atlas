import { o as __toESM } from "../_runtime.mjs";
import { c as createServerFn } from "./createServerFn-CIHAFgYl.mjs";
import { o as require_jsx_runtime, s as require_react } from "../_libs/@ai-sdk/react+[...].mjs";
import { n as createSsrRpc, r as useServerFn, t as cn } from "./createSsrRpc-vr7yBYzy.mjs";
import { n as liveQueryOptions, t as LIVE_POLL_MS } from "./live-poll-BjhnCmuD.mjs";
import { It as objectType, Lt as stringType, Mt as arrayType } from "../_libs/@ai-sdk/gateway+[...].mjs";
import { n as ChartAreaSkeleton } from "./analyses.functions-BviDkd_w.mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { t as normalizePairKey } from "./market-symbols-CRwjrnsQ.mjs";
import { n as useReducedMotion } from "../_libs/framer-motion.mjs";
import { t as motion } from "../_libs/motion.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/use-market-charts-CRMd_iw4.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var ease = [
	.22,
	1,
	.36,
	1
];
function normalizeSeries(series) {
	return series.map((v) => typeof v === "number" ? v : Number(v)).filter((v) => Number.isFinite(v));
}
/** Map series values to SVG coordinates — x must span the full chart width. */
function toPath(series, w, h, pad = 4) {
	const min = Math.min(...series);
	const span = Math.max(...series) - min || 1;
	const step = (w - pad * 2) / Math.max(series.length - 1, 1);
	return series.map((v, i) => {
		return [pad + i * step, pad + (h - pad * 2) * (1 - (v - min) / span)];
	});
}
function smooth(points) {
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
var accentColors = {
	emerald: {
		stroke: "var(--emerald)",
		fill: "var(--emerald)",
		glow: "var(--emerald)"
	},
	blue: {
		stroke: "oklch(0.55 0.14 250)",
		fill: "oklch(0.55 0.14 250)",
		glow: "oklch(0.55 0.14 250)"
	}
};
function AreaChart({ series, className, height = 160, animate = true, showGrid = true, accent = "emerald", endLabel, chartKey }) {
	const reduceMotion = useReducedMotion();
	const id = (0, import_react.useId)().replace(/:/g, "");
	const colors = accentColors[accent];
	const w = 320;
	const values = (0, import_react.useMemo)(() => normalizeSeries(series), [series]);
	const { line, area, last, rising, bob } = (0, import_react.useMemo)(() => {
		if (values.length < 2) return {
			line: "",
			area: "",
			last: [0, height / 2],
			rising: true,
			bob: 4
		};
		const pts = toPath(values, w, height);
		const linePath = smooth(pts);
		return {
			line: linePath,
			area: `${linePath} L ${pts[pts.length - 1][0]} ${height} L ${pts[0][0]} ${height} Z`,
			last: pts[pts.length - 1],
			rising: values[values.length - 1] >= values[values.length - 2],
			bob: Math.max(3, height * .028)
		};
	}, [
		values,
		height,
		w
	]);
	const identityKey = chartKey ?? "chart";
	const shouldAnimate = animate && !reduceMotion && line.length > 0;
	const lastY = last[1];
	const bobKeyframes = rising ? [
		lastY,
		lastY - bob,
		lastY,
		lastY + bob * .35,
		lastY
	] : [
		lastY,
		lastY + bob,
		lastY,
		lastY - bob * .35,
		lastY
	];
	if (values.length < 2) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartAreaSkeleton, {
		height,
		className
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: `0 0 ${w} ${height}`,
		className: cn("w-full overflow-visible", className),
		preserveAspectRatio: "none",
		role: "img",
		"aria-label": "Market chart",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("defs", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
				id: `fill-${id}`,
				x1: "0",
				y1: "0",
				x2: "0",
				y2: "1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
					offset: "0%",
					stopColor: colors.fill,
					stopOpacity: "0.28"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
					offset: "100%",
					stopColor: colors.fill,
					stopOpacity: "0"
				})]
			}) }),
			showGrid ? [
				.25,
				.5,
				.75
			].map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
				x1: 0,
				x2: w,
				y1: height * f,
				y2: height * f,
				stroke: "var(--hairline)",
				strokeWidth: "1",
				strokeDasharray: "3 5"
			}, f)) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.path, {
				d: area,
				fill: `url(#fill-${id})`,
				initial: shouldAnimate ? { opacity: 0 } : false,
				animate: {
					d: area,
					opacity: 1
				},
				transition: {
					d: {
						duration: .7,
						ease
					},
					opacity: {
						duration: .9,
						ease,
						delay: shouldAnimate ? .35 : 0
					}
				}
			}, `area-${identityKey}`),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.path, {
				d: line,
				fill: "none",
				stroke: colors.stroke,
				strokeWidth: "2",
				strokeLinecap: "round",
				strokeLinejoin: "round",
				vectorEffect: "non-scaling-stroke",
				initial: shouldAnimate ? {
					pathLength: 0,
					opacity: .5
				} : false,
				animate: {
					d: line,
					pathLength: 1,
					opacity: 1
				},
				transition: {
					d: {
						duration: .7,
						ease
					},
					pathLength: {
						duration: 1.5,
						ease
					},
					opacity: { duration: .5 }
				}
			}, `line-${identityKey}`),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.g, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.circle, {
				cx: last[0],
				r: "7",
				fill: colors.glow,
				initial: shouldAnimate ? {
					cy: lastY,
					opacity: 0
				} : false,
				animate: shouldAnimate ? {
					cy: bobKeyframes,
					opacity: .18
				} : {
					cy: lastY,
					opacity: .18
				},
				transition: {
					cy: {
						duration: 2.8,
						repeat: Infinity,
						ease: "easeInOut",
						delay: 1.5
					},
					opacity: {
						duration: .4,
						delay: 1.4
					}
				}
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.circle, {
				cx: last[0],
				r: "3.5",
				fill: colors.stroke,
				initial: shouldAnimate ? {
					cy: lastY,
					opacity: 0,
					scale: 0
				} : false,
				animate: shouldAnimate ? {
					cy: bobKeyframes,
					opacity: 1,
					scale: 1,
					r: [
						3.5,
						4.2,
						3.5
					]
				} : {
					cy: lastY,
					opacity: 1,
					scale: 1,
					r: 3.5
				},
				transition: {
					cy: {
						duration: 2.8,
						repeat: Infinity,
						ease: "easeInOut",
						delay: 1.5
					},
					opacity: {
						duration: .4,
						delay: 1.4
					},
					scale: {
						duration: .4,
						delay: 1.4
					},
					r: {
						duration: 2.8,
						repeat: Infinity,
						ease: "easeInOut",
						delay: 1.5
					}
				}
			})] }, `dot-${identityKey}`),
			endLabel ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.text, {
				x: Math.min(last[0] + 6, 316),
				y: Math.max(lastY - 10, 12),
				textAnchor: "start",
				className: "num fill-current text-[11px] font-semibold",
				style: { fill: colors.stroke },
				initial: shouldAnimate ? { opacity: 0 } : false,
				animate: { opacity: 1 },
				transition: {
					duration: .4,
					delay: 1.6
				},
				children: endLabel
			}) : null
		]
	});
}
function DonutChart({ segments, className, chartKey = "donut", showLegend = true, showCallouts = false }) {
	const reduceMotion = useReducedMotion();
	const [hoveredIndex, setHoveredIndex] = (0, import_react.useState)(null);
	const size = showCallouts ? 340 : 220;
	const height = showCallouts ? 270 : 220;
	const cx = showCallouts ? 170 : size / 2;
	const cy = showCallouts ? 136 : height / 2;
	const r = showCallouts ? 64 : 78;
	const stroke = showCallouts ? 30 : 34;
	const c = 2 * Math.PI * r;
	const gap = showCallouts ? 4 : 5;
	const shouldAnimate = !reduceMotion && segments.length > 0;
	const arcs = (0, import_react.useMemo)(() => {
		const total = segments.reduce((sum, seg) => sum + Math.max(seg.pct, 0), 0) || 100;
		let offset = 0;
		return segments.map((seg, i) => {
			const pct = Math.max(seg.pct, 0) / total * 100;
			const len = pct / 100 * c;
			const drawLen = Math.max(len - gap, 0);
			const dash = `${drawLen} ${c - drawLen}`;
			const midAngle = -90 + (offset + len / 2) / c * 360;
			const arc = {
				...seg,
				pct,
				dash,
				len,
				offset: -offset,
				midAngle,
				index: i
			};
			offset += len;
			return arc;
		});
	}, [
		segments,
		c,
		gap
	]);
	const hoveredSegment = hoveredIndex === null ? null : arcs[hoveredIndex];
	const calloutPositions = [
		{
			x: 268,
			y: 72,
			anchor: "middle"
		},
		{
			x: 88,
			y: 44,
			anchor: "middle"
		},
		{
			x: 64,
			y: 144,
			anchor: "middle"
		},
		{
			x: 92,
			y: 230,
			anchor: "middle"
		}
	];
	const labelText = (label) => label === "Stocks & Indices" ? "Stocks/Indices" : label;
	const pointOnCircle = (angle, radius) => {
		const rad = angle * Math.PI / 180;
		return {
			x: cx + Math.cos(rad) * radius,
			y: cy + Math.sin(rad) * radius
		};
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("mx-auto w-full max-w-[320px]", className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
			viewBox: `0 0 ${size} ${height}`,
			className: "w-full drop-shadow-[0_12px_22px_rgba(0,0,0,0.14)]",
			role: "img",
			"aria-label": "Asset class distribution",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("defs", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("radialGradient", {
					id: `donut-glow-${chartKey}`,
					cx: "50%",
					cy: "50%",
					r: "58%",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
							offset: "0%",
							stopColor: "rgba(255,255,255,0.18)"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
							offset: "72%",
							stopColor: "rgba(255,255,255,0.035)"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
							offset: "100%",
							stopColor: "rgba(255,255,255,0)"
						})
					]
				}) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.circle, {
					cx,
					cy,
					r: r + stroke * .85,
					fill: `url(#donut-glow-${chartKey})`,
					initial: shouldAnimate ? {
						opacity: 0,
						scale: .86
					} : false,
					whileInView: {
						opacity: 1,
						scale: 1
					},
					viewport: {
						once: true,
						margin: "-80px"
					},
					transition: {
						duration: .8,
						ease
					},
					style: { transformOrigin: "center" }
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.circle, {
					cx,
					cy,
					r,
					fill: "none",
					stroke: "var(--border)",
					strokeWidth: stroke,
					initial: shouldAnimate ? {
						opacity: 0,
						scale: .94
					} : false,
					whileInView: {
						opacity: 1,
						scale: 1
					},
					viewport: {
						once: true,
						margin: "-80px"
					},
					transition: {
						duration: .65,
						ease
					},
					style: { transformOrigin: "center" }
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.g, {
					transform: `rotate(-90 ${cx} ${cy})`,
					initial: shouldAnimate ? {
						rotate: -96,
						opacity: .72
					} : false,
					whileInView: {
						rotate: -90,
						opacity: 1
					},
					viewport: {
						once: true,
						margin: "-80px"
					},
					transition: {
						duration: .9,
						ease
					},
					style: { transformOrigin: "center" },
					children: arcs.map((arc, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.circle, {
						cx,
						cy,
						r,
						fill: "none",
						stroke: arc.color,
						strokeWidth: stroke,
						strokeLinecap: "butt",
						strokeDasharray: arc.dash,
						strokeDashoffset: arc.offset,
						strokeLinejoin: "round",
						initial: shouldAnimate ? {
							strokeDasharray: `0 ${c}`,
							strokeDashoffset: arc.offset,
							opacity: 0
						} : false,
						whileInView: {
							strokeDasharray: arc.dash,
							strokeDashoffset: arc.offset,
							opacity: 1
						},
						whileHover: {
							opacity: .94,
							scale: 1.012
						},
						onMouseEnter: () => setHoveredIndex(i),
						onMouseLeave: () => setHoveredIndex(null),
						onFocus: () => setHoveredIndex(i),
						onBlur: () => setHoveredIndex(null),
						viewport: {
							once: true,
							margin: "-80px"
						},
						transition: {
							duration: 1.05,
							delay: .08 + i * .09,
							ease
						},
						style: {
							cursor: "pointer",
							transformOrigin: "center"
						},
						tabIndex: 0
					}, `${chartKey}-${arc.label}`))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.circle, {
					cx,
					cy,
					r: r - stroke / 1.82,
					fill: "var(--surface)",
					stroke: "var(--surface)",
					strokeWidth: "2",
					initial: shouldAnimate ? {
						scale: .9,
						opacity: 0
					} : false,
					whileInView: {
						scale: 1,
						opacity: 1
					},
					viewport: {
						once: true,
						margin: "-80px"
					},
					transition: {
						duration: .65,
						delay: .35,
						ease
					},
					style: { transformOrigin: "center" }
				}),
				showCallouts ? arcs.map((arc, i) => {
					const dot = pointOnCircle(arc.midAngle, r - stroke * .2);
					const edge = pointOnCircle(arc.midAngle, r + stroke * .42);
					const label = calloutPositions[i % calloutPositions.length];
					const isLight = i === arcs.length - 1;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.g, {
						initial: shouldAnimate ? {
							opacity: 0,
							y: 3
						} : false,
						whileInView: {
							opacity: 1,
							y: 0
						},
						viewport: {
							once: true,
							margin: "-80px"
						},
						transition: {
							duration: .45,
							delay: .75 + i * .08,
							ease
						},
						style: { pointerEvents: "none" },
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
								d: `M ${dot.x} ${dot.y} L ${edge.x} ${edge.y} L ${label.x} ${label.y + 10}`,
								fill: "none",
								stroke: "var(--muted-foreground)",
								strokeOpacity: "0.58",
								strokeWidth: "1"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
								cx: dot.x,
								cy: dot.y,
								r: "3.5",
								fill: "var(--card)",
								stroke: arc.color
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
								x: label.x - 47,
								y: label.y - 15,
								width: "94",
								height: "28",
								rx: "5",
								fill: arc.color,
								stroke: "var(--border)"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("text", {
								x: label.x,
								y: label.y + 4,
								textAnchor: label.anchor,
								className: "font-mono text-[8px] font-semibold",
								fill: isLight ? "var(--foreground)" : "white",
								children: [
									labelText(arc.label),
									" ",
									Math.round(arc.pct),
									"%"
								]
							})
						]
					}, `${chartKey}-${arc.label}-callout`);
				}) : null,
				hoveredSegment ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.g, {
					initial: {
						opacity: 0,
						y: 3,
						scale: .98
					},
					animate: {
						opacity: 1,
						y: 0,
						scale: 1
					},
					transition: {
						duration: .2,
						ease
					},
					style: {
						pointerEvents: "none",
						transformOrigin: "center"
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
						x: cx,
						y: cy - 3,
						textAnchor: "middle",
						className: "fill-foreground font-display text-[8px] font-semibold",
						children: hoveredSegment.label
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("text", {
						x: cx,
						y: cy + 15,
						textAnchor: "middle",
						className: "fill-muted-foreground font-mono text-[13px] font-semibold",
						children: [Math.round(hoveredSegment.pct), "%"]
					})]
				}, hoveredSegment.label) : null
			]
		}), showLegend ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-5 flex flex-wrap justify-center gap-x-4 gap-y-2",
			children: segments.map((seg, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
				className: "flex min-w-fit items-center gap-2 text-xs text-muted-foreground transition duration-300 hover:-translate-y-0.5 hover:text-foreground",
				initial: shouldAnimate ? {
					opacity: 0,
					y: 4
				} : false,
				whileInView: {
					opacity: 1,
					y: 0
				},
				whileHover: { y: -2 },
				viewport: {
					once: true,
					margin: "-80px"
				},
				transition: {
					duration: .45,
					delay: .55 + i * .04,
					ease
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "h-2.5 w-2.5 shrink-0 rounded-sm",
						style: {
							backgroundColor: seg.color,
							color: seg.color
						},
						"aria-hidden": true
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "whitespace-nowrap font-display font-semibold",
						children: seg.label
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "num text-[0.7rem] font-semibold text-foreground",
						children: [Math.round(seg.pct), "%"]
					})
				]
			}, seg.label))
		}) : null]
	});
}
function polyline(points) {
	if (points.length < 2) return "";
	return points.map(([x, y], i) => `${i === 0 ? "M" : "L"} ${x} ${y}`).join(" ");
}
function areaPath(points, baseline) {
	if (points.length < 2) return "";
	const line = polyline(points);
	const first = points[0];
	return `${line} L ${points[points.length - 1][0]} ${baseline} L ${first[0]} ${baseline} Z`;
}
/** Glowing equity line — jagged rise / break / rise, synced to trading R data. */
function GlowLineChart({ series, className, height = 120, chartKey = "glow-equity" }) {
	const reduceMotion = useReducedMotion();
	const id = (0, import_react.useId)().replace(/:/g, "");
	const w = 320;
	const values = (0, import_react.useMemo)(() => normalizeSeries(series), [series]);
	const shouldAnimate = !reduceMotion && values.length >= 2;
	const { line, area, last } = (0, import_react.useMemo)(() => {
		if (values.length < 2) return {
			line: "",
			area: "",
			last: [312, height / 2]
		};
		const pts = toPath(values, w, height, 6);
		return {
			line: polyline(pts),
			area: areaPath(pts, height - 4),
			last: pts[pts.length - 1]
		};
	}, [
		values,
		height,
		w
	]);
	if (values.length < 2) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartAreaSkeleton, {
		height,
		className
	});
	const lastY = last[1];
	const stroke = values[values.length - 1] >= values[0] ? "var(--emerald)" : "var(--destructive)";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: `0 0 ${w} ${height}`,
		className: cn("w-full overflow-visible", className),
		preserveAspectRatio: "none",
		role: "img",
		"aria-label": "Equity curve",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("defs", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
					id: `glow-fill-${id}`,
					x1: "0%",
					y1: "0%",
					x2: "0%",
					y2: "100%",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
							offset: "0%",
							stopColor: stroke,
							stopOpacity: "0.2"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
							offset: "72%",
							stopColor: stroke,
							stopOpacity: "0.045"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
							offset: "100%",
							stopColor: stroke,
							stopOpacity: "0"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
					id: `glow-stroke-${id}`,
					x1: "0%",
					y1: "0%",
					x2: "100%",
					y2: "0%",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
						offset: "0%",
						stopColor: "var(--muted-foreground)",
						stopOpacity: "0.7"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
						offset: "100%",
						stopColor: stroke
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("filter", {
					id: `glow-filter-${id}`,
					x: "-30%",
					y: "-40%",
					width: "160%",
					height: "180%",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("feGaussianBlur", {
						stdDeviation: "2.8",
						result: "blur"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("feMerge", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("feMergeNode", { in: "blur" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("feMergeNode", { in: "SourceGraphic" })] })]
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
				x1: 0,
				x2: 0,
				y1: 4,
				y2: height - 2,
				stroke: "var(--border)",
				strokeWidth: "1"
			}),
			[
				.25,
				.5,
				.75
			].map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
				x1: 0,
				x2: w,
				y1: height * f,
				y2: height * f,
				stroke: "oklch(0.78 0.01 80 / 0.7)",
				strokeWidth: "1",
				strokeDasharray: "3 6"
			}, f)),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.path, {
				d: area,
				fill: `url(#glow-fill-${id})`,
				initial: shouldAnimate ? { opacity: 0 } : false,
				animate: {
					d: area,
					opacity: 1
				},
				transition: {
					d: {
						duration: .8,
						ease
					},
					opacity: {
						duration: .7,
						delay: .35
					}
				}
			}, `glow-area-${chartKey}`),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.path, {
				d: line,
				fill: "none",
				stroke: `url(#glow-stroke-${id})`,
				strokeWidth: "2",
				strokeLinecap: "round",
				strokeLinejoin: "round",
				vectorEffect: "non-scaling-stroke",
				filter: `url(#glow-filter-${id})`,
				initial: shouldAnimate ? {
					pathLength: 0,
					opacity: .5
				} : false,
				animate: {
					d: line,
					pathLength: 1,
					opacity: 1
				},
				transition: {
					pathLength: {
						duration: 2.2,
						ease
					},
					d: {
						duration: .8,
						ease
					},
					opacity: { duration: .5 }
				}
			}, `glow-line-${chartKey}`),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.g, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.circle, {
				cx: last[0],
				r: "8",
				fill: stroke,
				initial: shouldAnimate ? {
					cy: lastY,
					opacity: 0
				} : false,
				animate: {
					cy: lastY,
					opacity: [
						.22,
						.5,
						.22
					]
				},
				transition: {
					cy: {
						duration: .8,
						ease
					},
					opacity: {
						duration: 2,
						repeat: Infinity,
						ease: "easeInOut",
						delay: 2.2
					}
				}
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.circle, {
				cx: last[0],
				r: "3.5",
				fill: stroke,
				initial: shouldAnimate ? {
					cy: lastY,
					opacity: 0,
					scale: 0
				} : false,
				animate: {
					cy: lastY,
					opacity: 1,
					scale: 1
				},
				transition: {
					duration: .5,
					delay: 2.1,
					ease
				}
			})] }, `glow-dot-${chartKey}`)
		]
	});
}
var DEFAULT_CANDLES = [
	[
		46,
		62,
		42,
		58
	],
	[
		58,
		66,
		54,
		55
	],
	[
		55,
		60,
		44,
		47
	],
	[
		47,
		52,
		38,
		50
	],
	[
		50,
		64,
		48,
		62
	],
	[
		62,
		70,
		58,
		68
	],
	[
		68,
		72,
		60,
		63
	],
	[
		63,
		66,
		52,
		55
	],
	[
		55,
		78,
		54,
		76
	],
	[
		76,
		84,
		72,
		82
	],
	[
		82,
		86,
		74,
		77
	],
	[
		77,
		92,
		75,
		90
	]
];
function CandleChart({ className, candles = DEFAULT_CANDLES, animate = true, chartKey }) {
	const reduceMotion = useReducedMotion();
	const w = 300;
	const h = 130;
	const step = w / candles.length;
	const { min, max } = (0, import_react.useMemo)(() => {
		const lows = candles.map(([, , lo]) => lo);
		const highs = candles.map(([, hi]) => hi);
		const lo = Math.min(...lows);
		const hi = Math.max(...highs);
		const pad = (hi - lo) * .08 || 1;
		return {
			min: lo - pad,
			max: hi + pad
		};
	}, [candles]);
	const y = (v) => h - (v - min) / (max - min) * 118 - 6;
	const shouldAnimate = animate && !reduceMotion;
	const identityKey = chartKey ?? "candles";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
		viewBox: `0 0 ${w} ${h}`,
		className: cn("w-full overflow-visible", className),
		role: "presentation",
		children: candles.map(([o, hi, lo, c], i) => {
			const up = c >= o;
			const x = i * step + step / 2;
			const color = up ? "var(--emerald)" : "var(--muted-foreground)";
			const bodyTop = Math.min(y(o), y(c));
			const bodyHeight = Math.max(Math.abs(y(o) - y(c)), 2);
			const midY = (y(hi) + y(lo)) / 2;
			const delay = shouldAnimate ? i * .045 : 0;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.line, {
				x1: x,
				x2: x,
				stroke: color,
				strokeWidth: "1.2",
				initial: shouldAnimate ? {
					y1: midY,
					y2: midY,
					opacity: 0
				} : false,
				animate: {
					y1: y(hi),
					y2: y(lo),
					opacity: .95
				},
				transition: {
					duration: .45,
					delay,
					ease
				}
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.rect, {
				x: x - step * .26,
				width: step * .52,
				rx: "1.5",
				fill: up ? color : "transparent",
				stroke: color,
				strokeWidth: "1.2",
				initial: shouldAnimate ? {
					height: 0,
					y: y(lo),
					opacity: 0
				} : false,
				animate: {
					height: bodyHeight,
					y: bodyTop,
					opacity: .95
				},
				transition: {
					duration: .5,
					delay: delay + .05,
					ease
				}
			})] }, `${identityKey}-${i}`);
		})
	});
}
var getMarketCharts = createServerFn({ method: "POST" }).validator((input) => objectType({ pairs: arrayType(stringType().trim().min(1).max(80)).max(24) }).parse(input)).handler(createSsrRpc("51d6cb024544966651441616d2966700e6ed07e2adf3970cd9a99c4b7afbf399"));
/** Live 7-day price series + spot quote for analysis cards (CoinGecko / Yahoo, auto-refresh). */
function useMarketCharts(pairs, pollMs = LIVE_POLL_MS) {
	const fetchCharts = useServerFn(getMarketCharts);
	const pairKey = (0, import_react.useMemo)(() => [...new Set(pairs.map(normalizePairKey).filter(Boolean))].sort().join("|"), [pairs]);
	const uniquePairs = (0, import_react.useMemo)(() => pairKey ? pairKey.split("|") : [], [pairKey]);
	const { data: charts = {}, isLoading, dataUpdatedAt } = useQuery({
		queryKey: ["market-charts", pairKey],
		queryFn: () => fetchCharts({ data: { pairs: uniquePairs } }),
		enabled: uniquePairs.length > 0,
		...liveQueryOptions,
		refetchInterval: pollMs,
		staleTime: pollMs / 2
	});
	return {
		charts,
		loading: isLoading,
		updatedAt: dataUpdatedAt
	};
}
function getChartForPair(charts, pair) {
	return charts[normalizePairKey(pair)];
}
//#endregion
export { getChartForPair as a, GlowLineChart as i, CandleChart as n, useMarketCharts as o, DonutChart as r, AreaChart as t };
