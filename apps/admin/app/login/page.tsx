"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Eye, EyeOff } from "lucide-react";
import { FieldLabel, Input, SHADOW_RAISED } from "@/components/ui";

export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user, password }),
    });
    setLoading(false);
    if (!res.ok) {
      setError("Invalid credentials");
      return;
    }
    router.push("/");
  }

  return (
    <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
      <div className="relative hidden items-center justify-center overflow-hidden bg-[linear-gradient(160deg,#001122_0%,#002244_45%,#003366_100%)] lg:flex">
        <div className="halftone-bg pointer-events-none absolute inset-0 opacity-[0.12]" />
        <div className="intro-orb-a pointer-events-none absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-brand-blue/25 blur-3xl" />
        <div className="intro-orb-b pointer-events-none absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-brand-blue-dark/50 blur-3xl" />

        <div className="relative flex flex-col items-center px-10 text-center">
          <Image src="/images/logo.png" alt="" width={220} height={122} className="h-auto w-48" />
          <p className="mt-6 font-heading text-2xl font-bold uppercase tracking-[0.15em] text-white">
            Arjun Printing Press
          </p>
          <p className="mt-3 max-w-xs text-sm text-white/60">
            Content admin for the homepage hero carousel and categories.
          </p>
        </div>
      </div>

      <div className="flex items-center justify-center bg-paper-muted px-6 py-16">
        <form
          onSubmit={handleSubmit}
          className={`w-full max-w-sm rounded-xl border border-gray-200 bg-paper p-8 ${SHADOW_RAISED}`}
        >
          <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-accent-amber">
            <span className="h-px w-6 bg-accent-amber" />
            Arjun Printing Press
          </p>
          <h1 className="mt-3 font-heading text-2xl font-bold text-ink">Sign in</h1>
          <p className="mt-1 text-sm text-ink/50">Admin access only</p>

          <div className="mt-8">
            <FieldLabel>Username</FieldLabel>
            <Input
              value={user}
              onChange={(e) => setUser(e.target.value)}
              autoComplete="username"
            />
          </div>

          <div className="mt-4">
            <FieldLabel>Password</FieldLabel>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                className="pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute inset-y-0 right-0 flex w-10 items-center justify-center text-ink/40 hover:text-ink"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {error && <p className="mt-3 text-sm text-accent-pink">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="mt-8 w-full rounded-full bg-brand-blue py-2.5 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-brand-blue-dark disabled:opacity-50"
          >
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}
