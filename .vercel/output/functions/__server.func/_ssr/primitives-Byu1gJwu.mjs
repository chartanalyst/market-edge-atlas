import { o as __toESM } from "../_runtime.mjs";
import { o as require_jsx_runtime, s as require_react } from "../_libs/@ai-sdk/react+[...].mjs";
import { t as cn } from "./createSsrRpc-vr7yBYzy.mjs";
import { i as useMotionValue, r as useSpring, t as useInView } from "../_libs/framer-motion.mjs";
import { t as motion } from "../_libs/motion.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/primitives-Byu1gJwu.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var easing = [
	.22,
	1,
	.36,
	1
];
var revealVariants = {
	hidden: {
		opacity: 0,
		y: 26
	},
	show: {
		opacity: 1,
		y: 0,
		transition: {
			duration: .75,
			ease: easing
		}
	}
};
function Reveal({ children, className, delay = 0, as = "div" }) {
	const Comp = motion[as];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Comp, {
		className,
		initial: "hidden",
		whileInView: "show",
		viewport: {
			once: true,
			margin: "-80px"
		},
		variants: {
			hidden: {
				opacity: 0,
				y: 26
			},
			show: {
				opacity: 1,
				y: 0,
				transition: {
					duration: .75,
					ease: easing,
					delay
				}
			}
		},
		children
	});
}
function Stagger({ children, className, gap = .08 }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
		className,
		initial: "hidden",
		whileInView: "show",
		viewport: {
			once: true,
			margin: "-70px"
		},
		variants: {
			hidden: {},
			show: { transition: { staggerChildren: gap } }
		},
		children
	});
}
function StaggerItem({ children, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
		className,
		variants: revealVariants,
		children
	});
}
function Counter({ value, suffix = "", decimals = 0, className }) {
	const ref = (0, import_react.useRef)(null);
	const inView = useInView(ref, {
		once: true,
		margin: "-60px"
	});
	const mv = useMotionValue(0);
	const spring = useSpring(mv, {
		stiffness: 60,
		damping: 20,
		mass: 1
	});
	const [display, setDisplay] = (0, import_react.useState)("0");
	(0, import_react.useEffect)(() => {
		if (inView) mv.set(value);
	}, [
		inView,
		mv,
		value
	]);
	(0, import_react.useEffect)(() => {
		return spring.on("change", (v) => {
			setDisplay(v.toLocaleString("en-US", {
				minimumFractionDigits: decimals,
				maximumFractionDigits: decimals
			}));
		});
	}, [spring, decimals]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		ref,
		className: cn("num", className),
		children: [display, suffix]
	});
}
function TiltCard({ children, className }) {
	const ref = (0, import_react.useRef)(null);
	const rx = useSpring(useMotionValue(0), {
		stiffness: 150,
		damping: 18
	});
	const ry = useSpring(useMotionValue(0), {
		stiffness: 150,
		damping: 18
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
		ref,
		style: {
			rotateX: rx,
			rotateY: ry,
			transformPerspective: 900
		},
		onMouseMove: (e) => {
			const el = ref.current;
			if (!el) return;
			const r = el.getBoundingClientRect();
			const px = (e.clientX - r.left) / r.width - .5;
			const py = (e.clientY - r.top) / r.height - .5;
			ry.set(px * 2.5);
			rx.set(-py * 2.5);
		},
		onMouseLeave: () => {
			rx.set(0);
			ry.set(0);
		},
		className,
		children
	});
}
function SectionHeading({ eyebrow, title, description, align = "left", className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, {
		className: cn(align === "center" && "mx-auto max-w-3xl text-center", "max-w-3xl", className),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: cn("flex items-center gap-3 border-t border-border pt-4", align === "center" && "justify-center"),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-1.5 w-1.5 bg-emerald" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "eyebrow",
					children: eyebrow
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-6 text-balance text-3xl font-semibold leading-[1.03] tracking-[-0.04em] sm:text-4xl lg:text-[3.2rem]",
				children: title
			}),
			description ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-5 text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg",
				children: description
			}) : null
		]
	});
}
//#endregion
export { StaggerItem as a, Stagger as i, Reveal as n, TiltCard as o, SectionHeading as r, revealVariants as s, Counter as t };
