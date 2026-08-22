import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import { createAboutStat, type AboutStatInput, type SectionSlug } from "@/lib/api";

export async function POST(req: Request) {
  const body = await req.json();
  const { slug, ...input } = body as { slug: SectionSlug } & AboutStatInput;

  try {
    const stat = await createAboutStat(slug, input);
    revalidateTag("sections", { expire: 0 });
    return NextResponse.json({ stat }, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed to create stat" },
      { status: 400 }
    );
  }
}
