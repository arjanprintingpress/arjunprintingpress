import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";

// Called by the admin app after any content mutation so the public site
// reflects edits immediately instead of waiting for the 60s revalidate window.
export async function POST(req: Request) {
  const key = req.headers.get("x-service-key");
  if (!key || key !== process.env.BACKEND_SERVICE_KEY) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  revalidateTag("sections", { expire: 0 });
  return NextResponse.json({ revalidated: true });
}
