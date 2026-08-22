import { NextResponse } from "next/server";
import { prisma } from "@arjun/db";
import { verifyServiceKey } from "@/lib/auth";
import { URL_TO_ENUM } from "@/lib/section-slug";

const REQUIRED_FIELDS = ["value", "label"] as const;

async function getOrCreateAbout(sectionId: string) {
  const existing = await prisma.aboutContent.findUnique({ where: { sectionId } });
  if (existing) return existing;
  return prisma.aboutContent.create({
    data: { sectionId, heading: "About Arjun Printing Press", body: "" },
  });
}

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

  const about = await getOrCreateAbout(section.id);

  let order = body.order;
  if (typeof order !== "number") {
    const last = await prisma.aboutStat.findFirst({
      where: { aboutContentId: about.id },
      orderBy: { order: "desc" },
    });
    order = (last?.order ?? -1) + 1;
  }

  const stat = await prisma.aboutStat.create({
    data: { aboutContentId: about.id, value: body.value, label: body.label, order },
  });

  return NextResponse.json({ stat }, { status: 201 });
}
