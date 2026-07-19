import { NextResponse } from "next/server";
import { verifyCredentials, verifyServiceKey } from "@/lib/auth";

export async function POST(req: Request) {
  if (!verifyServiceKey(req)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { user, password } = await req.json();
  if (typeof user !== "string" || typeof password !== "string" || !verifyCredentials(user, password)) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  return NextResponse.json({ ok: true });
}
