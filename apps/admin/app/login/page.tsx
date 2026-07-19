"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user, password }),
    });
    if (!res.ok) {
      setError("Invalid credentials");
      return;
    }
    router.push("/");
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-paper-muted">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-2xl border border-black/5 bg-paper p-8 shadow-sm"
      >
        <h1 className="font-heading text-xl font-bold text-ink">Admin Login</h1>
        <label className="mt-6 block text-sm font-medium text-ink">
          Username
          <input
            className="mt-1 w-full rounded-lg border border-black/10 px-3 py-2"
            value={user}
            onChange={(e) => setUser(e.target.value)}
            autoComplete="username"
          />
        </label>
        <label className="mt-4 block text-sm font-medium text-ink">
          Password
          <input
            type="password"
            className="mt-1 w-full rounded-lg border border-black/10 px-3 py-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
          />
        </label>
        {error && <p className="mt-3 text-sm text-accent-pink">{error}</p>}
        <button
          type="submit"
          className="mt-6 w-full rounded-lg bg-brand-blue py-2 font-semibold text-white transition hover:bg-brand-blue-dark"
        >
          Sign in
        </button>
      </form>
    </div>
  );
}
