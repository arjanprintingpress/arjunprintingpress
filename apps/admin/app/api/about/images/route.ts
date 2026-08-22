import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import { createAboutImage, type AboutImageInput, type SectionSlug } from "@/lib/api";

export async function POST(req: Request) {
  const body = await req.json();
  const { slug, ...input } = body as { slug: SectionSlug } & AboutImageInput;

  try {
    const image = await createAboutImage(slug, input);
    revalidateTag("sections", { expire: 0 });
    return NextResponse.json({ image }, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed to create image" },
      { status: 400 }
    );
  }
}
