import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import { updateWhyChooseContent, type WhyChooseContentInput, type SectionSlug } from "@/lib/api";

export async function PATCH(req: Request) {
  const body = await req.json();
  const { slug, ...input } = body as { slug: SectionSlug } & WhyChooseContentInput;

  try {
    const whyChooseUs = await updateWhyChooseContent(slug, input);
    revalidateTag("sections");
    return NextResponse.json({ whyChooseUs });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed to update why-choose-us content" },
      { status: 400 }
    );
  }
}
