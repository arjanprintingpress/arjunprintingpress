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

export type SubCategory = {
  id: string;
  image: string;
  title: string;
  description: string;
  order: number;
};

export type Category = {
  id: string;
  image: string;
  title: string;
  description: string;
  order: number;
  subCategories: SubCategory[];
};

export type AboutStat = {
  id: string;
  value: string;
  label: string;
  order: number;
};

export type AboutImage = {
  id: string;
  url: string;
  side: "left" | "right";
  order: number;
};

export type AboutContent = {
  id: string;
  eyebrow: string;
  heading: string;
  body: string;
  stats: AboutStat[];
  images: AboutImage[];
};

export type WhyChooseFeature = {
  id: string;
  icon: string;
  title: string;
  description: string;
  order: number;
};

export type WhyChooseContent = {
  id: string;
  eyebrow: string;
  headingPrefix: string;
  headingAccent: string;
  headingSuffix: string;
  intro: string;
  features: WhyChooseFeature[];
};

export type Section = {
  id: string;
  slug: string; // backend enum form, e.g. "corporate_gifts"
  label: string;
  tagline: string;
  heroSlides: HeroSlide[];
  categories: Category[];
  about: AboutContent | null;
  whyChooseUs: WhyChooseContent | null;
};

export const ENUM_TO_URL: Record<string, SectionSlug> = {
  printing: "printing",
  mementoes: "mementoes",
  corporate_gifts: "corporate-gifts",
};

function serviceHeaders() {
  return {
    "Content-Type": "application/json",
    "x-service-key": process.env.BACKEND_SERVICE_KEY ?? "",
  };
}

export async function getSections(): Promise<Section[]> {
  try {
    const res = await fetch(`${process.env.BACKEND_URL}/api/sections`, {
      cache: "force-cache",
      next: { tags: ["sections"] },
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
      cache: "force-cache",
      next: { tags: ["sections"] },
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data.section;
  } catch {
    return null;
  }
}

export type HeroSlideInput = {
  image: string;
  eyebrow: string;
  heading: string;
  headingAccent: string;
  intro: string;
  order?: number;
};

export async function createHeroSlide(slug: SectionSlug, input: HeroSlideInput) {
  const res = await fetch(`${process.env.BACKEND_URL}/api/sections/${slug}/hero-slides`, {
    method: "POST",
    headers: serviceHeaders(),
    body: JSON.stringify(input),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error ?? "Failed to create slide");
  return data.slide as HeroSlide;
}

export async function updateHeroSlide(id: string, input: Partial<HeroSlideInput>) {
  const res = await fetch(`${process.env.BACKEND_URL}/api/hero-slides/${id}`, {
    method: "PATCH",
    headers: serviceHeaders(),
    body: JSON.stringify(input),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error ?? "Failed to update slide");
  return data.slide as HeroSlide;
}

export async function deleteHeroSlide(id: string) {
  const res = await fetch(`${process.env.BACKEND_URL}/api/hero-slides/${id}`, {
    method: "DELETE",
    headers: serviceHeaders(),
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.error ?? "Failed to delete slide");
  }
}

export type CategoryInput = {
  image: string;
  title: string;
  description: string;
  order?: number;
};

export async function createCategory(slug: SectionSlug, input: CategoryInput) {
  const res = await fetch(`${process.env.BACKEND_URL}/api/sections/${slug}/categories`, {
    method: "POST",
    headers: serviceHeaders(),
    body: JSON.stringify(input),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error ?? "Failed to create category");
  return data.category as Category;
}

export async function updateCategory(id: string, input: Partial<CategoryInput>) {
  const res = await fetch(`${process.env.BACKEND_URL}/api/categories/${id}`, {
    method: "PATCH",
    headers: serviceHeaders(),
    body: JSON.stringify(input),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error ?? "Failed to update category");
  return data.category as Category;
}

export async function deleteCategory(id: string) {
  const res = await fetch(`${process.env.BACKEND_URL}/api/categories/${id}`, {
    method: "DELETE",
    headers: serviceHeaders(),
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.error ?? "Failed to delete category");
  }
}

export type SubCategoryInput = {
  image: string;
  title: string;
  description: string;
  order?: number;
};

export async function createSubCategory(categoryId: string, input: SubCategoryInput) {
  const res = await fetch(`${process.env.BACKEND_URL}/api/categories/${categoryId}/subcategories`, {
    method: "POST",
    headers: serviceHeaders(),
    body: JSON.stringify(input),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error ?? "Failed to create subcategory");
  return data.subCategory as SubCategory;
}

export async function updateSubCategory(id: string, input: Partial<SubCategoryInput>) {
  const res = await fetch(`${process.env.BACKEND_URL}/api/subcategories/${id}`, {
    method: "PATCH",
    headers: serviceHeaders(),
    body: JSON.stringify(input),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error ?? "Failed to update subcategory");
  return data.subCategory as SubCategory;
}

export async function deleteSubCategory(id: string) {
  const res = await fetch(`${process.env.BACKEND_URL}/api/subcategories/${id}`, {
    method: "DELETE",
    headers: serviceHeaders(),
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.error ?? "Failed to delete subcategory");
  }
}

export type AboutContentInput = {
  eyebrow?: string;
  heading?: string;
  body?: string;
};

export async function updateAboutContent(slug: SectionSlug, input: AboutContentInput) {
  const res = await fetch(`${process.env.BACKEND_URL}/api/sections/${slug}/about`, {
    method: "PATCH",
    headers: serviceHeaders(),
    body: JSON.stringify(input),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error ?? "Failed to update about content");
  return data.about as AboutContent;
}

export type AboutStatInput = {
  value: string;
  label: string;
  order?: number;
};

export async function createAboutStat(slug: SectionSlug, input: AboutStatInput) {
  const res = await fetch(`${process.env.BACKEND_URL}/api/sections/${slug}/about/stats`, {
    method: "POST",
    headers: serviceHeaders(),
    body: JSON.stringify(input),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error ?? "Failed to create stat");
  return data.stat as AboutStat;
}

export async function updateAboutStat(id: string, input: Partial<AboutStatInput>) {
  const res = await fetch(`${process.env.BACKEND_URL}/api/about/stats/${id}`, {
    method: "PATCH",
    headers: serviceHeaders(),
    body: JSON.stringify(input),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error ?? "Failed to update stat");
  return data.stat as AboutStat;
}

export async function deleteAboutStat(id: string) {
  const res = await fetch(`${process.env.BACKEND_URL}/api/about/stats/${id}`, {
    method: "DELETE",
    headers: serviceHeaders(),
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.error ?? "Failed to delete stat");
  }
}

export type AboutImageInput = {
  url: string;
  side: "left" | "right";
  order?: number;
};

export async function createAboutImage(slug: SectionSlug, input: AboutImageInput) {
  const res = await fetch(`${process.env.BACKEND_URL}/api/sections/${slug}/about/images`, {
    method: "POST",
    headers: serviceHeaders(),
    body: JSON.stringify(input),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error ?? "Failed to create image");
  return data.image as AboutImage;
}

export async function updateAboutImage(id: string, input: Partial<AboutImageInput>) {
  const res = await fetch(`${process.env.BACKEND_URL}/api/about/images/${id}`, {
    method: "PATCH",
    headers: serviceHeaders(),
    body: JSON.stringify(input),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error ?? "Failed to update image");
  return data.image as AboutImage;
}

export async function deleteAboutImage(id: string) {
  const res = await fetch(`${process.env.BACKEND_URL}/api/about/images/${id}`, {
    method: "DELETE",
    headers: serviceHeaders(),
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.error ?? "Failed to delete image");
  }
}

export type WhyChooseContentInput = {
  eyebrow?: string;
  headingPrefix?: string;
  headingAccent?: string;
  headingSuffix?: string;
  intro?: string;
};

export async function updateWhyChooseContent(slug: SectionSlug, input: WhyChooseContentInput) {
  const res = await fetch(`${process.env.BACKEND_URL}/api/sections/${slug}/why-choose-us`, {
    method: "PATCH",
    headers: serviceHeaders(),
    body: JSON.stringify(input),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error ?? "Failed to update why-choose-us content");
  return data.whyChooseUs as WhyChooseContent;
}

export type WhyChooseFeatureInput = {
  icon: string;
  title: string;
  description: string;
  order?: number;
};

export async function createWhyChooseFeature(slug: SectionSlug, input: WhyChooseFeatureInput) {
  const res = await fetch(`${process.env.BACKEND_URL}/api/sections/${slug}/why-choose-us/features`, {
    method: "POST",
    headers: serviceHeaders(),
    body: JSON.stringify(input),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error ?? "Failed to create feature");
  return data.feature as WhyChooseFeature;
}

export async function updateWhyChooseFeature(id: string, input: Partial<WhyChooseFeatureInput>) {
  const res = await fetch(`${process.env.BACKEND_URL}/api/why-choose-us/features/${id}`, {
    method: "PATCH",
    headers: serviceHeaders(),
    body: JSON.stringify(input),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error ?? "Failed to update feature");
  return data.feature as WhyChooseFeature;
}

export async function deleteWhyChooseFeature(id: string) {
  const res = await fetch(`${process.env.BACKEND_URL}/api/why-choose-us/features/${id}`, {
    method: "DELETE",
    headers: serviceHeaders(),
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.error ?? "Failed to delete feature");
  }
}

export type ContactSubmission = {
  id: string;
  name: string;
  email: string;
  phone: string;
  serviceType: string;
  quantity: string;
  details: string;
  paperSpec: string | null;
  eventDate: string | null;
  brandingRequirements: string | null;
  read: boolean;
  createdAt: string;
};

export async function getSectionSubmissions(slug: SectionSlug): Promise<ContactSubmission[]> {
  try {
    const res = await fetch(`${process.env.BACKEND_URL}/api/sections/${slug}/contact-submissions`, {
      headers: serviceHeaders(),
      cache: "force-cache",
      next: { tags: ["submissions"] },
    });
    if (!res.ok) return [];
    const data = await res.json();
    return data.submissions;
  } catch {
    return [];
  }
}

export async function updateContactSubmission(id: string, input: { read: boolean }) {
  const res = await fetch(`${process.env.BACKEND_URL}/api/contact-submissions/${id}`, {
    method: "PATCH",
    headers: serviceHeaders(),
    body: JSON.stringify(input),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error ?? "Failed to update submission");
  return data.submission as ContactSubmission;
}

export async function deleteContactSubmission(id: string) {
  const res = await fetch(`${process.env.BACKEND_URL}/api/contact-submissions/${id}`, {
    method: "DELETE",
    headers: serviceHeaders(),
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.error ?? "Failed to delete submission");
  }
}
