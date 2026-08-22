import "dotenv/config";
import { prisma } from "../index";

const FEATURES = [
  { icon: "Award", title: "75+ Years Experience", description: "Decades of expertise in the printing industry with a proven track record." },
  { icon: "Clock", title: "Fast Turnaround", description: "Quick delivery without compromising on quality and attention to detail." },
  { icon: "Palette", title: "Custom Design", description: "Professional design services to match your brand and business requirements." },
  { icon: "ShieldCheck", title: "Quality Guarantee", description: "100% satisfaction guarantee on all our printing services and products." },
];

const SLUGS = ["printing", "mementoes", "corporate_gifts"] as const;

async function main() {
  for (const slug of SLUGS) {
    const section = await prisma.section.findUnique({ where: { slug } });
    if (!section) {
      console.log(`Skipping ${slug} — section not found`);
      continue;
    }

    const existing = await prisma.whyChooseContent.findUnique({ where: { sectionId: section.id } });
    if (existing) {
      console.log(`Skipping ${slug} — WhyChooseContent already exists`);
      continue;
    }

    const content = await prisma.whyChooseContent.create({ data: { sectionId: section.id } });
    await prisma.whyChooseFeature.createMany({
      data: FEATURES.map((f, order) => ({ ...f, contentId: content.id, order })),
    });
    console.log(`Seeded WhyChooseUs for ${slug}`);
  }
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (err) => {
    console.error(err);
    await prisma.$disconnect();
    process.exit(1);
  });
