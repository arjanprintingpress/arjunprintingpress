import { NextResponse } from "next/server";
import { revalidateSections } from "@/lib/revalidate";
import { deleteCategory, updateCategory, type CategoryInput } from "@/lib/api";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const input = (await req.json()) as Partial<CategoryInput>;

  try {
    const category = await updateCategory(id, input);
    await revalidateSections();
    return NextResponse.json({ category });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed to update category" },
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
    await deleteCategory(id);
    await revalidateSections();
    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed to delete category" },
      { status: 400 }
    );
  }
}
