export type SectionSlug = "printing" | "mementoes" | "corporate-gifts";

export type HeroSlide = {
  image: string;
  eyebrow: string;
  heading: string;
  headingAccent: string;
  intro: string;
};

export type SectionContent = {
  slug: SectionSlug;
  label: string;
  tagline: string;
  heroSlides: HeroSlide[];
  services: { title: string; description: string }[];
};

export const sections: Record<SectionSlug, SectionContent> = {
  printing: {
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
  },
  mementoes: {
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
  },
  "corporate-gifts": {
    slug: "corporate-gifts",
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
  },
};

export const sectionList = Object.values(sections);
