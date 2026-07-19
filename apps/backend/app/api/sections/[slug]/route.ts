import { NextResponse } from "next/server";
import { prisma } from "@arjun/db";
import { corsHeaders, withCors } from "@/lib/cors";

const URL_TO_ENUM: Record<string, "printing" | "mementoes" | "corporate_gifts"> = {
  printing: "printing",
  mementoes: "mementoes",
  "corporate-gifts": "corporate_gifts",
};

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const enumSlug = URL_TO_ENUM[slug];
  if (!enumSlug) {
    return withCors(NextResponse.json({ error: "Unknown section" }, { status: 404 }));
  }

  const section = await prisma.section.findUnique({
    where: { slug: enumSlug },
    include: {
      heroSlides: { orderBy: { order: "asc" } },
      services: { orderBy: { order: "asc" } },
    },
  });

  if (!section) {
    return withCors(NextResponse.json({ error: "Not found" }, { status: 404 }));
  }

  return withCors(NextResponse.json({ section }));
}

export function OPTIONS() {
  return new Response(null, { status: 204, headers: corsHeaders() });
}
