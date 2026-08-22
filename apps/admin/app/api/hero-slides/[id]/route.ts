import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import { deleteHeroSlide, updateHeroSlide, type HeroSlideInput } from "@/lib/api";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const input = (await req.json()) as Partial<HeroSlideInput>;

  try {
    const slide = await updateHeroSlide(id, input);
    revalidateTag("sections", { expire: 0 });
    return NextResponse.json({ slide });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed to update slide" },
      { status: 400 }
    );
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    await deleteHeroSlide(id);
    revalidateTag("sections", { expire: 0 });
    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed to delete slide" },
      { status: 400 }
    );
  }
}
