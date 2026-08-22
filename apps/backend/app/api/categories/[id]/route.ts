import { NextResponse } from "next/server";
import { prisma } from "@arjun/db";
import { verifyServiceKey } from "@/lib/auth";

const EDITABLE_FIELDS = ["image", "title", "description", "order"] as const;

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!verifyServiceKey(req)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { id } = await params;
  const body = await req.json();

  const data: Record<string, string | number> = {};
  for (const field of EDITABLE_FIELDS) {
    if (field in body) {
      if (field === "order") {
        if (typeof body.order !== "number") {
          return NextResponse.json({ error: "order must be a number" }, { status: 400 });
        }
        data.order = body.order;
      } else {
        if (typeof body[field] !== "string" || body[field].trim() === "") {
          return NextResponse.json({ error: `Invalid field: ${field}` }, { status: 400 });
        }
        data[field] = body[field];
      }
    }
  }

  const category = await prisma.category.update({ where: { id }, data });
  return NextResponse.json({ category });
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!verifyServiceKey(req)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { id } = await params;
  await prisma.category.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
