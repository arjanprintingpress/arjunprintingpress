import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import { deleteCategory, updateCategory, type CategoryInput } from "@/lib/api";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const input = (await req.json()) as Partial<CategoryInput>;

  try {
    const category = await updateCategory(id, input);
    revalidateTag("sections", { expire: 0 });
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
    revalidateTag("sections", { expire: 0 });
    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed to delete category" },
      { status: 400 }
    );
  }
}
