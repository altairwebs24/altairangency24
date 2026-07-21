import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { ADMIN_EMAIL } from "@/lib/portfolio-data";
import { Loader2, LogIn } from "lucide-react";
const LOGO_URL = "/altair-logo.png";

export const Route = createFileRoute("/auth")({
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate({ to: "/admin" });
    });
  }, [navigate]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setInfo(null);
    setLoading(true);
    try {
      if (mode === "signup") {
        if (email.toLowerCase() !== ADMIN_EMAIL) {
          throw new Error("Only the site owner can create an admin account.");
        }
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: `${window.location.origin}/admin` },
        });
        if (error) throw error;
        setInfo("Account created. If email confirmation is on, check your inbox — otherwise you're signed in.");
        const { data } = await supabase.auth.getSession();
        if (data.session) navigate({ to: "/admin" });
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        navigate({ to: "/admin" });
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-secondary/40 px-4">
      <div className="w-full max-w-sm rounded-2xl border border-border bg-background p-6 shadow-sm">
        <div className="mb-6 flex flex-col items-center gap-2 text-center">
          <img src={LOGO_URL} alt="Altairagency24" className="h-14 w-14 rounded-full object-contain" />
          <h1 className="text-xl font-bold">Admin sign in</h1>
          <p className="text-xs text-muted-foreground">Only {ADMIN_EMAIL} can manage projects.</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="email"
            required
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
          />
          <input
            type="password"
            required
            minLength={6}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
          />
          {error && <p className="text-xs text-destructive">{error}</p>}
          {info && <p className="text-xs text-muted-foreground">{info}</p>}
          <button
            type="submit"
            disabled={loading}
            className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-foreground px-4 py-2 text-sm font-semibold text-background transition hover:opacity-90 disabled:opacity-60"
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <LogIn className="h-4 w-4" />}
            {mode === "signup" ? "Create admin account" : "Sign in"}
          </button>
        </form>
        <button
          onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
          className="mt-4 w-full text-center text-xs text-muted-foreground hover:text-foreground"
        >
          {mode === "signin" ? "First time? Create the admin account" : "Have an account? Sign in"}
        </button>
      </div>
    </div>
  );
}