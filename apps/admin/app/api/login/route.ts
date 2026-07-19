import { NextResponse } from "next/server";
import { createSessionCookie } from "@/lib/auth";

export async function POST(req: Request) {
  const { user, password } = await req.json();
  if (typeof user !== "string" || typeof password !== "string") {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const backendRes = await fetch(`${process.env.BACKEND_URL}/api/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-service-key": process.env.BACKEND_SERVICE_KEY ?? "",
    },
    body: JSON.stringify({ user, password }),
  });

  if (!backendRes.ok) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const cookie = createSessionCookie();
  const res = NextResponse.json({ ok: true });
  res.cookies.set(cookie.name, cookie.value, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: cookie.maxAge,
    path: "/",
  });
  return res;
}
