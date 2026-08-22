import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import { deleteWhyChooseFeature, updateWhyChooseFeature, type WhyChooseFeatureInput } from "@/lib/api";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const input = (await req.json()) as Partial<WhyChooseFeatureInput>;

  try {
    const feature = await updateWhyChooseFeature(id, input);
    revalidateTag("sections");
    return NextResponse.json({ feature });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed to update feature" },
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
    await deleteWhyChooseFeature(id);
    revalidateTag("sections");
    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed to delete feature" },
      { status: 400 }
    );
  }
}
