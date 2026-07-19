export type SectionSlug = "printing" | "mementoes" | "corporate-gifts";

export type HeroSlide = {
  id: string;
  image: string;
  eyebrow: string;
  heading: string;
  headingAccent: string;
  intro: string;
  order: number;
};

export type ServiceItem = {
  id: string;
  title: string;
  description: string;
  order: number;
};

export type Section = {
  id: string;
  slug: string; // backend enum form, e.g. "corporate_gifts"
  label: string;
  tagline: string;
  heroSlides: HeroSlide[];
  services: ServiceItem[];
};

const ENUM_TO_URL: Record<string, SectionSlug> = {
  printing: "printing",
  mementoes: "mementoes",
  corporate_gifts: "corporate-gifts",
};

export function sectionHref(section: Pick<Section, "slug">) {
  return `/${ENUM_TO_URL[section.slug] ?? section.slug}`;
}

export async function getSections(): Promise<Section[]> {
  try {
    const res = await fetch(`${process.env.BACKEND_URL}/api/sections`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return [];
    const data = await res.json();
    return data.sections;
  } catch {
    return [];
  }
}

export async function getSection(slug: SectionSlug): Promise<Section | null> {
  try {
    const res = await fetch(`${process.env.BACKEND_URL}/api/sections/${slug}`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data.section;
  } catch {
    return null;
  }
}
