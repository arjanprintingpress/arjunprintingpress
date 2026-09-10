import { NextResponse } from "next/server";
import { revalidateSections } from "@/lib/revalidate";
import { deleteHeroSlide, updateHeroSlide, type HeroSlideInput } from "@/lib/api";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const input = (await req.json()) as Partial<HeroSlideInput>;

  try {
    const slide = await updateHeroSlide(id, input);
    await revalidateSections();
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
    await revalidateSections();
    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed to delete slide" },
      { status: 400 }
    );
  }
}
