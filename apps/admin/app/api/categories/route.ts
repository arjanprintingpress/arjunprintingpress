import { NextResponse } from "next/server";
import { revalidateSections } from "@/lib/revalidate";
import { createCategory, type CategoryInput, type SectionSlug } from "@/lib/api";

export async function POST(req: Request) {
  const body = await req.json();
  const { slug, ...input } = body as { slug: SectionSlug } & CategoryInput;

  try {
    const category = await createCategory(slug, input);
    await revalidateSections();
    return NextResponse.json({ category }, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed to create category" },
      { status: 400 }
    );
  }
}
