import { NextResponse } from "next/server";
import { prisma } from "@arjun/db";
import { verifyServiceKey } from "@/lib/auth";
import { URL_TO_ENUM } from "@/lib/section-slug";

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
  if (typeof body.url !== "string" || body.url.trim() === "") {
    return NextResponse.json({ error: "Missing field: url" }, { status: 400 });
  }
  if (body.side !== "left" && body.side !== "right") {
    return NextResponse.json({ error: "side must be 'left' or 'right'" }, { status: 400 });
  }

  const section = await prisma.section.findUnique({ where: { slug: enumSlug } });
  if (!section) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const about = await getOrCreateAbout(section.id);

  let order = body.order;
  if (typeof order !== "number") {
    const last = await prisma.aboutImage.findFirst({
      where: { aboutContentId: about.id, side: body.side },
      orderBy: { order: "desc" },
    });
    order = (last?.order ?? -1) + 1;
  }

  const image = await prisma.aboutImage.create({
    data: { aboutContentId: about.id, url: body.url, side: body.side, order },
  });

  return NextResponse.json({ image }, { status: 201 });
}
