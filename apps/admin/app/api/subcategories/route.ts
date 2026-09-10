import { NextResponse } from "next/server";
import { revalidateSections } from "@/lib/revalidate";
import { createSubCategory, type SubCategoryInput } from "@/lib/api";

export async function POST(req: Request) {
  const body = await req.json();
  const { categoryId, ...input } = body as { categoryId: string } & SubCategoryInput;

  try {
    const subCategory = await createSubCategory(categoryId, input);
    await revalidateSections();
    return NextResponse.json({ subCategory }, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed to create subcategory" },
      { status: 400 }
    );
  }
}
