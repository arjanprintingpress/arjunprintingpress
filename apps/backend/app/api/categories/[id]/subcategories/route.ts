import { NextResponse } from "next/server";
import { prisma } from "@arjun/db";
import { verifyServiceKey } from "@/lib/auth";

const REQUIRED_FIELDS = ["image", "title", "description"] as const;

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!verifyServiceKey(req)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { id: categoryId } = await params;

  const body = await req.json();
  for (const field of REQUIRED_FIELDS) {
    if (typeof body[field] !== "string" || body[field].trim() === "") {
      return NextResponse.json({ error: `Missing field: ${field}` }, { status: 400 });
    }
  }

  const category = await prisma.category.findUnique({ where: { id: categoryId } });
  if (!category) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  let order = body.order;
  if (typeof order !== "number") {
    const last = await prisma.subCategory.findFirst({
      where: { categoryId },
      orderBy: { order: "desc" },
    });
    order = (last?.order ?? -1) + 1;
  }

  const subCategory = await prisma.subCategory.create({
    data: {
      categoryId,
      image: body.image,
      title: body.title,
      description: body.description,
      order,
    },
  });

  return NextResponse.json({ subCategory }, { status: 201 });
}
