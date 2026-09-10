import { NextResponse } from "next/server";
import { revalidateSections } from "@/lib/revalidate";
import { deleteSubCategory, updateSubCategory, type SubCategoryInput } from "@/lib/api";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const input = (await req.json()) as Partial<SubCategoryInput>;

  try {
    const subCategory = await updateSubCategory(id, input);
    await revalidateSections();
    return NextResponse.json({ subCategory });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed to update subcategory" },
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
    await deleteSubCategory(id);
    await revalidateSections();
    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed to delete subcategory" },
      { status: 400 }
    );
  }
}
