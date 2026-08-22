import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import { createWhyChooseFeature, type WhyChooseFeatureInput, type SectionSlug } from "@/lib/api";

export async function POST(req: Request) {
  const body = await req.json();
  const { slug, ...input } = body as { slug: SectionSlug } & WhyChooseFeatureInput;

  try {
    const feature = await createWhyChooseFeature(slug, input);
    revalidateTag("sections");
    return NextResponse.json({ feature }, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed to create feature" },
      { status: 400 }
    );
  }
}
