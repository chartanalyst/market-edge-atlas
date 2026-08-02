import { useState } from "react";
import { createFileRoute, useNavigate, useRouter } from "@tanstack/react-router";
import { toast } from "sonner";
import { z } from "zod";
import { AuthError } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

const title = "Admin sign in — Market Edge Atlas";
const description = "Private sign-in for Market Edge Atlas content management.";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AuthPage,
});

const schema = z.object({
  email: z.string().trim().email({ message: "Enter a valid email address" }).max(255),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }).max(200),
});

type AuthLog = {
  at: string;
  mode: "signin" | "signup";
  email: string;
  ok: boolean;
  code?: string;
  status?: number;
  message: string;
  hint?: string;
};

function friendlyAuthError(
  mode: "signin" | "signup",
  error: AuthError | Error,
): { message: string; hint?: string } {
  const raw = error.message || "Unknown auth error";
  const code = "code" in error ? String((error as AuthError).code ?? "") : "";
  const status = "status" in error ? Number((error as AuthError).status ?? 0) : 0;
  const lower = raw.toLowerCase();

  if (
    lower.includes("invalid login credentials") ||
    lower.includes("invalid credentials") ||
    code === "invalid_credentials"
  ) {
    return {
      message: "Email or password is incorrect",
      hint:
        mode === "signin"
          ? "If you just signed up, confirm your email first — or use “Create the owner account”. Password must match exactly."
          : undefined,
    };
  }

  if (
    lower.includes("email not confirmed") ||
    code === "email_not_confirmed"
  ) {
    return {
      message: "Email not confirmed yet",
      hint: "Open the confirmation link in your inbox, then sign in again. Check spam for Supabase / Lovable mail.",
    };
  }

  if (
    lower.includes("user already registered") ||
    lower.includes("already been registered") ||
    code === "user_already_exists"
  ) {
    return {
      message: "This email already has an account",
      hint: "Switch to Sign in and use the same password you created.",
    };
  }

  if (lower.includes("password") && (lower.includes("weak") || lower.includes("least"))) {
    return { message: raw, hint: "Use at least 6 characters." };
  }

  if (status === 429 || lower.includes("rate limit")) {
    return {
      message: "Too many attempts",
      hint: "Wait a minute, then try again.",
    };
  }

  if (lower.includes("fetch") || lower.includes("network") || lower.includes("failed to fetch")) {
    return {
      message: "Could not reach auth server",
      hint: "Check internet / Supabase URL in .env (VITE_SUPABASE_URL).",
    };
  }

  return { message: raw, hint: code ? `Code: ${code}` : undefined };
}

function logAuth(entry: AuthLog) {
  const line = `[auth] ${entry.mode} · ${entry.email} · ${entry.ok ? "OK" : "FAIL"} · ${entry.message}`;
  if (entry.ok) console.info(line, entry);
  else console.error(line, entry);
}

function AuthPage() {
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("mdimam.cse9.bu@gmail.com");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [lastLog, setLastLog] = useState<AuthLog | null>(null);
  const navigate = useNavigate();
  const router = useRouter();

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const parsed = schema.safeParse({ email, password });
    if (!parsed.success) {
      const message = parsed.error.issues[0].message;
      const entry: AuthLog = {
        at: new Date().toISOString(),
        mode,
        email: email.trim(),
        ok: false,
        message,
        hint: "Fix the form fields and try again.",
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
          options: { emailRedirectTo: `${window.location.origin}/admin` },
        });
        if (error) throw error;

        if (!data.session) {
          const entry: AuthLog = {
            at: new Date().toISOString(),
            mode: "signup",
            email: usedEmail,
            ok: true,
            message: "Account created — email confirmation required",
            hint: "Check inbox (and spam). After confirming, switch to Sign in.",
          };
          setLastLog(entry);
          logAuth(entry);
          toast.success("Account created", {
            description: entry.hint,
          });
          setMode("signin");
          return;
        }

        const entry: AuthLog = {
          at: new Date().toISOString(),
          mode: "signup",
          email: usedEmail,
          ok: true,
          message: "Account created and signed in",
        };
        setLastLog(entry);
        logAuth(entry);
      } else {
        console.info("[auth] signin start", { email: usedEmail });
        const { data, error } = await supabase.auth.signInWithPassword({
          email: usedEmail,
          password: parsed.data.password,
        });
        if (error) throw error;

        const entry: AuthLog = {
          at: new Date().toISOString(),
          mode: "signin",
          email: usedEmail,
          ok: true,
          message: `Signed in as ${data.user?.email ?? usedEmail}`,
        };
        setLastLog(entry);
        logAuth(entry);
      }

      await router.invalidate();
      navigate({ to: "/admin" });
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error));
      const authErr = err as AuthError;
      const friendly = friendlyAuthError(mode, err);
      const entry: AuthLog = {
        at: new Date().toISOString(),
        mode,
        email: usedEmail,
        ok: false,
        code: authErr.code,
        status: authErr.status,
        message: friendly.message,
        hint: friendly.hint ?? `Raw: ${err.message}`,
      };
      setLastLog(entry);
      logAuth(entry);
      toast.error(friendly.message, {
        description: friendly.hint,
        duration: 8000,
      });
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="mx-auto flex min-h-[80vh] w-[min(460px,92vw)] flex-col justify-center py-28">
      <p className="eyebrow">Restricted area</p>
      <h1 className="mt-4 text-3xl font-semibold tracking-[-0.03em]">
        {mode === "signin" ? "Sign in to manage content" : "Create the owner account"}
      </h1>
      <p className="mt-3 text-sm text-muted-foreground">
        This area is for the site owner only. Initial admin: mdimam.cse9.bu@gmail.com
      </p>

      <form onSubmit={onSubmit} className="mt-10 border border-border bg-card p-7">
        <label htmlFor="email" className="eyebrow">
          Email
        </label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-2.5 w-full border border-border bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-emerald"
        />

        <label htmlFor="password" className="eyebrow mt-6 block">
          Password
        </label>
        <input
          id="password"
          type="password"
          autoComplete={mode === "signin" ? "current-password" : "new-password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-2.5 w-full border border-border bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-emerald"
        />

        <button
          type="submit"
          disabled={busy}
          className="mt-8 w-full border border-border bg-navy px-6 py-4 font-mono text-[0.72rem] uppercase tracking-[0.16em] text-navy-foreground transition-colors hover:bg-emerald disabled:opacity-60"
        >
          {busy ? "Please wait…" : mode === "signin" ? "Sign in" : "Create account"}
        </button>

        <button
          type="button"
          onClick={() => {
            setMode(mode === "signin" ? "signup" : "signin");
            setLastLog(null);
          }}
          className="mt-5 w-full text-center text-xs text-muted-foreground transition-colors hover:text-foreground"
        >
          {mode === "signin"
            ? "First time here? Create the owner account"
            : "Already have an account? Sign in"}
        </button>
      </form>

      {lastLog ? (
        <div
          className={`mt-6 border p-4 font-mono text-[0.7rem] leading-relaxed ${
            lastLog.ok
              ? "border-emerald/40 bg-emerald-soft/40 text-foreground"
              : "border-destructive/40 bg-destructive/5 text-foreground"
          }`}
          role="status"
          aria-live="polite"
        >
          <p className="uppercase tracking-[0.14em] text-muted-foreground">
            Auth log · {lastLog.mode} · {lastLog.ok ? "ok" : "error"}
          </p>
          <p className="mt-2 break-all">{lastLog.email}</p>
          <p className="mt-1 font-semibold">{lastLog.message}</p>
          {lastLog.hint ? <p className="mt-1 text-muted-foreground">{lastLog.hint}</p> : null}
          {lastLog.code || lastLog.status ? (
            <p className="mt-2 text-muted-foreground">
              {lastLog.code ? `code=${lastLog.code}` : ""}
              {lastLog.code && lastLog.status ? " · " : ""}
              {lastLog.status ? `status=${lastLog.status}` : ""}
            </p>
          ) : null}
          <p className="mt-2 text-muted-foreground">Also printed in browser DevTools → Console</p>
        </div>
      ) : null}
    </main>
  );
}
