import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import { createCategory, type CategoryInput, type SectionSlug } from "@/lib/api";

export async function POST(req: Request) {
  const body = await req.json();
  const { slug, ...input } = body as { slug: SectionSlug } & CategoryInput;

  try {
    const category = await createCategory(slug, input);
    revalidateTag("sections", { expire: 0 });
    return NextResponse.json({ category }, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed to create category" },
      { status: 400 }
    );
  }
}
