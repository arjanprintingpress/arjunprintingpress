import { NextResponse } from "next/server";
import { prisma } from "@arjun/db";
import { corsHeaders, withCors } from "@/lib/cors";
import { verifyServiceKey } from "@/lib/auth";
import { URL_TO_ENUM } from "@/lib/section-slug";

async function getOrCreateWhyChoose(sectionId: string) {
  const existing = await prisma.whyChooseContent.findUnique({
    where: { sectionId },
    include: { features: { orderBy: { order: "asc" } } },
  });
  if (existing) return existing;

  return prisma.whyChooseContent.create({
    data: { sectionId },
    include: { features: true },
  });
}

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const enumSlug = URL_TO_ENUM[slug];
  if (!enumSlug) {
    return withCors(NextResponse.json({ error: "Unknown section" }, { status: 404 }));
  }

  const section = await prisma.section.findUnique({ where: { slug: enumSlug } });
  if (!section) {
    return withCors(NextResponse.json({ error: "Not found" }, { status: 404 }));
  }

  const whyChooseUs = await getOrCreateWhyChoose(section.id);
  return withCors(NextResponse.json({ whyChooseUs }));
}

const EDITABLE_FIELDS = ["eyebrow", "headingPrefix", "headingAccent", "headingSuffix", "intro"] as const;

export async function PATCH(
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

  const body = await req.json();
  const data: Record<string, string> = {};
  for (const field of EDITABLE_FIELDS) {
    if (field in body) {
      if (typeof body[field] !== "string" || body[field].trim() === "") {
        return NextResponse.json({ error: `Invalid field: ${field}` }, { status: 400 });
      }
      data[field] = body[field];
    }
  }

  const existing = await getOrCreateWhyChoose(section.id);
  const whyChooseUs = await prisma.whyChooseContent.update({ where: { id: existing.id }, data });
  return NextResponse.json({ whyChooseUs });
}

export function OPTIONS() {
  return new Response(null, { status: 204, headers: corsHeaders() });
}
