import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import { createSubCategory, type SubCategoryInput } from "@/lib/api";

export async function POST(req: Request) {
  const body = await req.json();
  const { categoryId, ...input } = body as { categoryId: string } & SubCategoryInput;

  try {
    const subCategory = await createSubCategory(categoryId, input);
    revalidateTag("sections");
    return NextResponse.json({ subCategory }, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed to create subcategory" },
      { status: 400 }
    );
  }
}
