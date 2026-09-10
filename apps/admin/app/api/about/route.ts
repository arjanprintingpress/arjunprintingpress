import { NextResponse } from "next/server";
import { revalidateSections } from "@/lib/revalidate";
import { updateAboutContent, type AboutContentInput, type SectionSlug } from "@/lib/api";

export async function PATCH(req: Request) {
  const body = await req.json();
  const { slug, ...input } = body as { slug: SectionSlug } & AboutContentInput;

  try {
    const about = await updateAboutContent(slug, input);
    await revalidateSections();
    return NextResponse.json({ about });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed to update about content" },
      { status: 400 }
    );
  }
}
