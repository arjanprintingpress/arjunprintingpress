import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import { deleteContactSubmission, updateContactSubmission } from "@/lib/api";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const input = (await req.json()) as { read: boolean };

  try {
    const submission = await updateContactSubmission(id, input);
    revalidateTag("submissions", { expire: 0 });
    return NextResponse.json({ submission });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed to update submission" },
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
    await deleteContactSubmission(id);
    revalidateTag("submissions", { expire: 0 });
    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed to delete submission" },
      { status: 400 }
    );
  }
}
