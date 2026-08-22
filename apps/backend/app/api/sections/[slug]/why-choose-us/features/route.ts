import { NextResponse } from "next/server";
import { prisma } from "@arjun/db";
import { verifyServiceKey } from "@/lib/auth";
import { URL_TO_ENUM } from "@/lib/section-slug";

const REQUIRED_FIELDS = ["icon", "title", "description"] as const;

async function getOrCreateWhyChoose(sectionId: string) {
  const existing = await prisma.whyChooseContent.findUnique({ where: { sectionId } });
  if (existing) return existing;
  return prisma.whyChooseContent.create({ data: { sectionId } });
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

  const whyChooseUs = await getOrCreateWhyChoose(section.id);

  let order = body.order;
  if (typeof order !== "number") {
    const last = await prisma.whyChooseFeature.findFirst({
      where: { contentId: whyChooseUs.id },
      orderBy: { order: "desc" },
    });
    order = (last?.order ?? -1) + 1;
  }

  const feature = await prisma.whyChooseFeature.create({
    data: {
      contentId: whyChooseUs.id,
      icon: body.icon,
      title: body.title,
      description: body.description,
      order,
    },
  });

  return NextResponse.json({ feature }, { status: 201 });
}
