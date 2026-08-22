import { notFound } from "next/navigation";
import { getSection, type SectionSlug } from "@/lib/api";
import AboutTextForm from "@/components/AboutTextForm";
import AboutStatCard from "@/components/AboutStatCard";
import AboutStatForm from "@/components/AboutStatForm";
import AboutImageCard from "@/components/AboutImageCard";
import AboutImageForm from "@/components/AboutImageForm";
import { Card, EmptyState } from "@/components/ui";
import { BarChart3, Image as ImageIcon } from "lucide-react";

const VALID_SLUGS: SectionSlug[] = ["printing", "mementoes", "corporate-gifts"];

export default async function AboutPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!VALID_SLUGS.includes(slug as SectionSlug)) notFound();

  const section = await getSection(slug as SectionSlug);
  if (!section) notFound();

  const about = section.about ?? { id: "", eyebrow: "About Us", heading: "", body: "", stats: [], images: [] };
  const stats = [...about.stats].sort((a, b) => a.order - b.order);
  const leftImages = about.images.filter((i) => i.side === "left").sort((a, b) => a.order - b.order);
  const rightImages = about.images.filter((i) => i.side === "right").sort((a, b) => a.order - b.order);

  return (
    <div className="mx-auto max-w-6xl px-8 py-12">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-amber">
        {section.label}
      </p>
      <h1 className="mt-2 font-heading text-3xl font-bold text-ink">About Us</h1>

      <Card className="mt-8 p-6">
        <h2 className="mb-4 font-heading text-lg font-semibold text-ink">Text</h2>
        <AboutTextForm sectionSlug={slug as SectionSlug} about={about} />
      </Card>

      <div className="mt-16 border-t border-gray-200 pt-10">
        <h2 className="font-heading text-2xl font-bold text-ink">Stats</h2>
        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
          {stats.map((stat, i) => (
            <AboutStatCard key={stat.id} sectionSlug={slug as SectionSlug} stat={stat} index={i} />
          ))}
          {stats.length === 0 && (
            <div className="md:col-span-3">
              <EmptyState icon={<BarChart3 className="h-5 w-5 text-gray-400" />}>No stats yet — add the first one below.</EmptyState>
            </div>
          )}
        </div>
        <Card className="mt-8 p-6">
          <h3 className="mb-4 font-heading text-lg font-semibold text-ink">Add a stat</h3>
          <AboutStatForm sectionSlug={slug as SectionSlug} />
        </Card>
      </div>

      <div className="mt-16 border-t border-gray-200 pt-10">
        <h2 className="font-heading text-2xl font-bold text-ink">Marquee images</h2>

        <h3 className="mt-6 font-heading text-sm font-semibold uppercase tracking-wide text-gray-500">
          Left column
        </h3>
        <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {leftImages.map((image, i) => (
            <AboutImageCard key={image.id} sectionSlug={slug as SectionSlug} image={image} index={i} />
          ))}
          {leftImages.length === 0 && <EmptyState icon={<ImageIcon className="h-5 w-5 text-gray-400" />}>No images yet.</EmptyState>}
        </div>
        <Card className="mt-4 p-6">
          <AboutImageForm sectionSlug={slug as SectionSlug} defaultSide="left" />
        </Card>

        <h3 className="mt-10 font-heading text-sm font-semibold uppercase tracking-wide text-gray-500">
          Right column
        </h3>
        <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {rightImages.map((image, i) => (
            <AboutImageCard key={image.id} sectionSlug={slug as SectionSlug} image={image} index={i} />
          ))}
          {rightImages.length === 0 && <EmptyState icon={<ImageIcon className="h-5 w-5 text-gray-400" />}>No images yet.</EmptyState>}
        </div>
        <Card className="mt-4 p-6">
          <AboutImageForm sectionSlug={slug as SectionSlug} defaultSide="right" />
        </Card>
      </div>
    </div>
  );
}
