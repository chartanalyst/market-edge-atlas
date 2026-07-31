import { useState } from "react";
import { createFileRoute, useNavigate, useRouter } from "@tanstack/react-router";
import { toast } from "sonner";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";

const title = "Admin sign in — Technical Market Analyst";
const description = "Private sign-in for the site owner to manage website content.";

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
  password: z.string().min(8, { message: "Password must be at least 8 characters" }).max(200),
});

function AuthPage() {
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const navigate = useNavigate();
  const router = useRouter();

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const parsed = schema.safeParse({ email, password });
    if (!parsed.success) {
      toast.error(parsed.error.issues[0].message);
      return;
    }
    setBusy(true);
    try {
      if (mode === "signup") {
        const { data, error } = await supabase.auth.signUp({
          email: parsed.data.email,
          password: parsed.data.password,
          options: { emailRedirectTo: `${window.location.origin}/admin` },
        });
        if (error) throw error;
        if (!data.session) {
          toast.success("Account created", {
            description: "Check your email to confirm the address, then sign in.",
          });
          setMode("signin");
          return;
        }
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email: parsed.data.email,
          password: parsed.data.password,
        });
        if (error) throw error;
      }
      await router.invalidate();
      navigate({ to: "/admin" });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not sign in");
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
        This area is for the site owner only. Visitors do not need an account.
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
          onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
          className="mt-5 w-full text-center text-xs text-muted-foreground transition-colors hover:text-foreground"
        >
          {mode === "signin"
            ? "First time here? Create the owner account"
            : "Already have an account? Sign in"}
        </button>
      </form>
    </main>
  );
}
