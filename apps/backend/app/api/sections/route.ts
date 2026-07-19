import { NextResponse } from "next/server";
import { prisma } from "@arjun/db";
import { corsHeaders, withCors } from "@/lib/cors";

export async function GET() {
  const sections = await prisma.section.findMany({
    orderBy: { slug: "asc" },
    include: {
      heroSlides: { orderBy: { order: "asc" } },
      services: { orderBy: { order: "asc" } },
    },
  });
  return withCors(NextResponse.json({ sections }));
}

export function OPTIONS() {
  return new Response(null, { status: 204, headers: corsHeaders() });
}
