import "dotenv/config";
import { prisma } from "../index";

async function upsertSection(input: {
  slug: "printing" | "mementoes" | "corporate_gifts";
  label: string;
  tagline: string;
  heroSlides: { image: string; eyebrow: string; heading: string; headingAccent: string; intro: string }[];
  services: { title: string; description: string }[];
}) {
  const section = await prisma.section.upsert({
    where: { slug: input.slug },
    update: { label: input.label, tagline: input.tagline },
    create: { slug: input.slug, label: input.label, tagline: input.tagline },
  });

  await prisma.heroSlide.deleteMany({ where: { sectionId: section.id } });
  await prisma.heroSlide.createMany({
    data: input.heroSlides.map((slide, order) => ({ ...slide, sectionId: section.id, order })),
  });

  await prisma.service.deleteMany({ where: { sectionId: section.id } });
  await prisma.service.createMany({
    data: input.services.map((service, order) => ({ ...service, sectionId: section.id, order })),
  });
}

async function main() {
  await upsertSection({
    slug: "printing",
    label: "Printing Services",
    tagline: "Offset, digital, and large-format printing since 1948.",
    heroSlides: [
      {
        image: "/images/placeholder-hero-1.svg",
        eyebrow: "Arjun Printing Press — Offset",
        heading: "Precision printing,",
        headingAccent: "since 1948",
        intro:
          "Move your brand forward with print that holds up: sharp registration, consistent color, and finishing that lasts.",
      },
      {
        image: "/images/placeholder-hero-2.svg",
        eyebrow: "Arjun Printing Press — Large Format",
        heading: "From business cards",
        headingAccent: "to billboards",
        intro: "One press, every format, decades of craft behind each run.",
      },
    ],
    services: [
      { title: "Offset Printing", description: "High-volume, high-fidelity print runs." },
      { title: "Digital Printing", description: "Fast turnaround for short runs and proofs." },
      { title: "Large Format", description: "Banners, posters, and signage." },
    ],
  });

  await upsertSection({
    slug: "mementoes",
    label: "Mementoes Services",
    tagline: "Custom mementoes and keepsakes for every occasion.",
    heroSlides: [
      {
        image: "/images/placeholder-hero-1.svg",
        eyebrow: "Arjun Printing Press — Mementoes",
        heading: "Mementoes worth",
        headingAccent: "keeping",
        intro: "Custom trophies, plaques, and keepsakes crafted with care.",
      },
    ],
    services: [
      { title: "Trophies & Plaques", description: "Engraved awards for any occasion." },
      { title: "Custom Keepsakes", description: "Personalized mementoes and gifts." },
    ],
  });

  await upsertSection({
    slug: "corporate_gifts",
    label: "Corporate Gifts",
    tagline: "Branded corporate gifting, done right.",
    heroSlides: [
      {
        image: "/images/placeholder-hero-1.svg",
        eyebrow: "Arjun Printing Press — Corporate",
        heading: "Corporate gifting,",
        headingAccent: "elevated",
        intro: "Branded merchandise and gift sets for clients and teams.",
      },
    ],
    services: [
      { title: "Branded Merchandise", description: "Custom-branded corporate gift sets." },
      { title: "Bulk Gifting", description: "Scalable gifting for events and teams." },
    ],
  });

  console.log("Seeded printing, mementoes, corporate_gifts sections.");
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (err) => {
    console.error(err);
    await prisma.$disconnect();
    process.exit(1);
  });
