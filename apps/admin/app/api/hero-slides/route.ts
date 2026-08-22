import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import { createHeroSlide, type HeroSlideInput, type SectionSlug } from "@/lib/api";

export async function POST(req: Request) {
  const body = await req.json();
  const { slug, ...input } = body as { slug: SectionSlug } & HeroSlideInput;

  try {
    const slide = await createHeroSlide(slug, input);
    revalidateTag("sections");
    return NextResponse.json({ slide }, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed to create slide" },
      { status: 400 }
    );
  }
}
