import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import { deleteAboutStat, updateAboutStat, type AboutStatInput } from "@/lib/api";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const input = (await req.json()) as Partial<AboutStatInput>;

  try {
    const stat = await updateAboutStat(id, input);
    revalidateTag("sections");
    return NextResponse.json({ stat });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed to update stat" },
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
    await deleteAboutStat(id);
    revalidateTag("sections");
    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed to delete stat" },
      { status: 400 }
    );
  }
}
