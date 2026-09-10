import { NextResponse } from "next/server";
import { revalidateSections } from "@/lib/revalidate";
import { deleteAboutImage, updateAboutImage, type AboutImageInput } from "@/lib/api";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const input = (await req.json()) as Partial<AboutImageInput>;

  try {
    const image = await updateAboutImage(id, input);
    await revalidateSections();
    return NextResponse.json({ image });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed to update image" },
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
    await deleteAboutImage(id);
    await revalidateSections();
    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed to delete image" },
      { status: 400 }
    );
  }
}
