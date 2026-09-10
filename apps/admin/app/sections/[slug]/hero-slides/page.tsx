import { notFound } from "next/navigation";
import { getSection, type SectionSlug } from "@/lib/api";
import HeroSlideForm from "@/components/HeroSlideForm";
import HeroSlideCard from "@/components/HeroSlideCard";
import { Card, EmptyState } from "@/components/ui";
import { Images } from "lucide-react";

const VALID_SLUGS: SectionSlug[] = ["printing", "mementoes", "corporate-gifts"];

export default async function HeroSlidesPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!VALID_SLUGS.includes(slug as SectionSlug)) notFound();

  const section = await getSection(slug as SectionSlug);
  if (!section) notFound();

  const slides = [...section.heroSlides].sort((a, b) => a.order - b.order);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-amber">
        {section.label}
      </p>
      <h1 className="mt-2 font-heading text-3xl font-bold text-ink">Hero slides</h1>

      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
        {slides.map((slide, i) => (
          <HeroSlideCard key={slide.id} slide={slide} sectionSlug={slug as SectionSlug} index={i} />
        ))}

        {slides.length === 0 && (
          <div className="md:col-span-2">
            <EmptyState icon={<Images className="h-5 w-5 text-gray-400" />}>No slides yet — add the first one below.</EmptyState>
          </div>
        )}
      </div>

      <Card className="mt-8 p-6">
        <h2 className="mb-4 font-heading text-lg font-semibold text-ink">Add a slide</h2>
        <HeroSlideForm sectionSlug={slug as SectionSlug} />
      </Card>
    </div>
  );
}
