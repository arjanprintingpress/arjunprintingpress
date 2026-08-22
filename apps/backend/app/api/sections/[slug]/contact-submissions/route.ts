import { NextResponse } from "next/server";
import { prisma } from "@arjun/db";
import { verifyServiceKey } from "@/lib/auth";
import { URL_TO_ENUM } from "@/lib/section-slug";

const REQUIRED_FIELDS = ["name", "email", "phone", "serviceType", "quantity", "details"] as const;

const EXTRA_FIELD_BY_SLUG: Record<string, "paperSpec" | "eventDate" | "brandingRequirements"> = {
  printing: "paperSpec",
  mementoes: "eventDate",
  "corporate-gifts": "brandingRequirements",
};

export async function POST(
  req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  if (!verifyServiceKey(req)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { slug } = await params;
  const enumSlug = URL_TO_ENUM[slug];
  if (!enumSlug) {
    return NextResponse.json({ error: "Unknown section" }, { status: 404 });
  }

  const body = await req.json();
  for (const field of REQUIRED_FIELDS) {
    if (typeof body[field] !== "string" || body[field].trim() === "") {
      return NextResponse.json({ error: `Missing field: ${field}` }, { status: 400 });
    }
  }

  const section = await prisma.section.findUnique({ where: { slug: enumSlug } });
  if (!section) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const extraField = EXTRA_FIELD_BY_SLUG[slug];
  const extraValue = typeof body[extraField] === "string" ? body[extraField] : undefined;

  const submission = await prisma.contactSubmission.create({
    data: {
      sectionId: section.id,
      name: body.name,
      email: body.email,
      phone: body.phone,
      serviceType: body.serviceType,
      quantity: body.quantity,
      details: body.details,
      [extraField]: extraValue,
    },
  });

  return NextResponse.json({ submission }, { status: 201 });
}

export async function GET(
  req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  if (!verifyServiceKey(req)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { slug } = await params;
  const enumSlug = URL_TO_ENUM[slug];
  if (!enumSlug) {
    return NextResponse.json({ error: "Unknown section" }, { status: 404 });
  }

  const section = await prisma.section.findUnique({ where: { slug: enumSlug } });
  if (!section) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const submissions = await prisma.contactSubmission.findMany({
    where: { sectionId: section.id },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json({ submissions });
}
