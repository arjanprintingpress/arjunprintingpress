import { NextResponse } from "next/server";
import { prisma } from "@arjun/db";
import { verifyServiceKey } from "@/lib/auth";

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
  if ("url" in body) {
    if (typeof body.url !== "string" || body.url.trim() === "") {
      return NextResponse.json({ error: "Invalid field: url" }, { status: 400 });
    }
    data.url = body.url;
  }
  if ("side" in body) {
    if (body.side !== "left" && body.side !== "right") {
      return NextResponse.json({ error: "side must be 'left' or 'right'" }, { status: 400 });
    }
    data.side = body.side;
  }
  if ("order" in body) {
    if (typeof body.order !== "number") {
      return NextResponse.json({ error: "order must be a number" }, { status: 400 });
    }
    data.order = body.order;
  }

  const image = await prisma.aboutImage.update({ where: { id }, data });
  return NextResponse.json({ image });
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!verifyServiceKey(req)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { id } = await params;
  await prisma.aboutImage.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
