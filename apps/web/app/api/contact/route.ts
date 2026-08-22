import { NextResponse } from "next/server";

const VALID_SLUGS = ["printing", "mementoes", "corporate-gifts"];

export async function POST(req: Request) {
  const body = await req.json();

  if (!VALID_SLUGS.includes(body.sectionSlug)) {
    return NextResponse.json({ error: "Missing or invalid sectionSlug" }, { status: 400 });
  }

  try {
    const res = await fetch(`${process.env.BACKEND_URL}/api/sections/${body.sectionSlug}/contact-submissions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-service-key": process.env.BACKEND_SERVICE_KEY ?? "",
      },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error ?? "Failed to submit");
    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed to submit" },
      { status: 400 }
    );
  }
}
