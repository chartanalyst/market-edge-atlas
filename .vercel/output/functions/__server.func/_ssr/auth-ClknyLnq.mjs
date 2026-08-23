import { o as __toESM } from "../_runtime.mjs";
import { _ as useNavigate, v as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { o as require_jsx_runtime, s as require_react } from "../_libs/@ai-sdk/react+[...].mjs";
import { It as objectType, Lt as stringType } from "../_libs/@ai-sdk/gateway+[...].mjs";
import { t as supabase } from "./client-B5Bu-311.mjs";
import { n as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/auth-ClknyLnq.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var schema = objectType({
	email: stringType().trim().email({ message: "Enter a valid email address" }).max(255),
	password: stringType().min(6, { message: "Password must be at least 6 characters" }).max(200)
});
function friendlyAuthError(mode, error) {
	const raw = error.message || "Unknown auth error";
	const code = "code" in error ? String(error.code ?? "") : "";
	const status = "status" in error ? Number(error.status ?? 0) : 0;
	const lower = raw.toLowerCase();
	if (lower.includes("invalid login credentials") || lower.includes("invalid credentials") || code === "invalid_credentials") return {
		message: "Email or password is incorrect",
		hint: mode === "signin" ? "If you just signed up, confirm your email first — or use “Create the owner account”. Password must match exactly." : void 0
	};
	if (lower.includes("email not confirmed") || code === "email_not_confirmed") return {
		message: "Email not confirmed yet",
		hint: "Open the confirmation link in your inbox, then sign in again. Check spam for Supabase / Lovable mail."
	};
	if (lower.includes("user already registered") || lower.includes("already been registered") || code === "user_already_exists") return {
		message: "This email already has an account",
		hint: "Switch to Sign in and use the same password you created."
	};
	if (lower.includes("password") && (lower.includes("weak") || lower.includes("least"))) return {
		message: raw,
		hint: "Use at least 6 characters."
	};
	if (status === 429 || lower.includes("rate limit")) return {
		message: "Too many attempts",
		hint: "Wait a minute, then try again."
	};
	if (lower.includes("fetch") || lower.includes("network") || lower.includes("failed to fetch")) return {
		message: "Could not reach auth server",
		hint: "Check internet / Supabase URL in .env (VITE_SUPABASE_URL)."
	};
	return {
		message: raw,
		hint: code ? `Code: ${code}` : void 0
	};
}
function logAuth(entry) {
	const line = `[auth] ${entry.mode} · ${entry.email} · ${entry.ok ? "OK" : "FAIL"} · ${entry.message}`;
	if (entry.ok) console.info(line, entry);
	else console.error(line, entry);
}
function AuthPage() {
	const [mode, setMode] = (0, import_react.useState)("signin");
	const [email, setEmail] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [lastLog, setLastLog] = (0, import_react.useState)(null);
	const navigate = useNavigate();
	const router = useRouter();
	async function onSubmit(e) {
		e.preventDefault();
		const parsed = schema.safeParse({
			email,
			password
		});
		if (!parsed.success) {
			const message = parsed.error.issues[0].message;
			const entry = {
				at: (/* @__PURE__ */ new Date()).toISOString(),
				mode,
				email: email.trim(),
				ok: false,
				message,
				hint: "Fix the form fields and try again."
			};
			setLastLog(entry);
			logAuth(entry);
			toast.error(message);
			return;
		}
		setBusy(true);
		const usedEmail = parsed.data.email;
		try {
			if (mode === "signup") {
				console.info("[auth] signup start", { email: usedEmail });
				const { data, error } = await supabase.auth.signUp({
					email: usedEmail,
					password: parsed.data.password,
					options: { emailRedirectTo: `${window.location.origin}/admin` }
				});
				if (error) throw error;
				if (!data.session) {
					const entry = {
						at: (/* @__PURE__ */ new Date()).toISOString(),
						mode: "signup",
						email: usedEmail,
						ok: true,
						message: "Account created — email confirmation required",
						hint: "Check inbox (and spam). After confirming, switch to Sign in."
					};
					setLastLog(entry);
					logAuth(entry);
					toast.success("Account created", { description: entry.hint });
					setMode("signin");
					return;
				}
				const entry = {
					at: (/* @__PURE__ */ new Date()).toISOString(),
					mode: "signup",
					email: usedEmail,
					ok: true,
					message: "Account created and signed in"
				};
				setLastLog(entry);
				logAuth(entry);
			} else {
				console.info("[auth] signin start", { email: usedEmail });
				const { data, error } = await supabase.auth.signInWithPassword({
					email: usedEmail,
					password: parsed.data.password
				});
				if (error) throw error;
				const entry = {
					at: (/* @__PURE__ */ new Date()).toISOString(),
					mode: "signin",
					email: usedEmail,
					ok: true,
					message: `Signed in as ${data.user?.email ?? usedEmail}`
				};
				setLastLog(entry);
				logAuth(entry);
			}
			await router.invalidate();
			navigate({ to: "/admin" });
		} catch (error) {
			const err = error instanceof Error ? error : new Error(String(error));
			const authErr = err;
			const friendly = friendlyAuthError(mode, err);
			const entry = {
				at: (/* @__PURE__ */ new Date()).toISOString(),
				mode,
				email: usedEmail,
				ok: false,
				code: authErr.code,
				status: authErr.status,
				message: friendly.message,
				hint: friendly.hint ?? `Raw: ${err.message}`
			};
			setLastLog(entry);
			logAuth(entry);
			toast.error(friendly.message, {
				description: friendly.hint,
				duration: 8e3
			});
		} finally {
			setBusy(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto flex min-h-[80vh] w-[min(460px,92vw)] flex-col justify-center py-28",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "eyebrow",
				children: "Restricted area"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-4 text-3xl font-semibold tracking-[-0.03em]",
				children: mode === "signin" ? "Sign in to manage content" : "Create the owner account"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-sm text-muted-foreground",
				children: "This area is for the site owner only. Use your owner email (chartanalyst1000@gmail.com)."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit,
				className: "mt-10 border border-border bg-card p-7",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						htmlFor: "email",
						className: "eyebrow",
						children: "Email"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						id: "email",
						type: "email",
						autoComplete: "email",
						value: email,
						onChange: (e) => setEmail(e.target.value),
						className: "mt-2.5 w-full border border-border bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-emerald"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						htmlFor: "password",
						className: "eyebrow mt-6 block",
						children: "Password"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						id: "password",
						type: "password",
						autoComplete: mode === "signin" ? "current-password" : "new-password",
						value: password,
						onChange: (e) => setPassword(e.target.value),
						className: "mt-2.5 w-full border border-border bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-emerald"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "submit",
						disabled: busy,
						className: "mt-8 w-full border border-border bg-navy px-6 py-4 font-mono text-[0.72rem] uppercase tracking-[0.16em] text-navy-foreground transition-colors hover:bg-emerald disabled:opacity-60",
						children: busy ? "Please wait…" : mode === "signin" ? "Sign in" : "Create account"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => {
							setMode(mode === "signin" ? "signup" : "signin");
							setLastLog(null);
						},
						className: "mt-5 w-full text-center text-xs text-muted-foreground transition-colors hover:text-foreground",
						children: mode === "signin" ? "First time here? Create the owner account" : "Already have an account? Sign in"
					})
				]
			}),
			lastLog ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: `mt-6 border p-4 font-mono text-[0.7rem] leading-relaxed ${lastLog.ok ? "border-emerald/40 bg-emerald-soft/40 text-foreground" : "border-destructive/40 bg-destructive/5 text-foreground"}`,
				role: "status",
				"aria-live": "polite",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "uppercase tracking-[0.14em] text-muted-foreground",
						children: [
							"Auth log · ",
							lastLog.mode,
							" · ",
							lastLog.ok ? "ok" : "error"
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 break-all",
						children: lastLog.email
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 font-semibold",
						children: lastLog.message
					}),
					lastLog.hint ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-muted-foreground",
						children: lastLog.hint
					}) : null,
					lastLog.code || lastLog.status ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-2 text-muted-foreground",
						children: [
							lastLog.code ? `code=${lastLog.code}` : "",
							lastLog.code && lastLog.status ? " · " : "",
							lastLog.status ? `status=${lastLog.status}` : ""
						]
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-muted-foreground",
						children: "Also printed in browser DevTools → Console"
					})
				]
			}) : null
		]
	});
}
//#endregion
export { AuthPage as component };
