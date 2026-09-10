import { notFound } from "next/navigation";
import { getSection, type SectionSlug } from "@/lib/api";
import WhyChooseTextForm from "@/components/WhyChooseTextForm";
import WhyChooseFeatureCard from "@/components/WhyChooseFeatureCard";
import WhyChooseFeatureForm from "@/components/WhyChooseFeatureForm";
import { Card, EmptyState } from "@/components/ui";
import { Sparkles } from "lucide-react";

const VALID_SLUGS: SectionSlug[] = ["printing", "mementoes", "corporate-gifts"];

export default async function WhyChooseUsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!VALID_SLUGS.includes(slug as SectionSlug)) notFound();

  const section = await getSection(slug as SectionSlug);
  if (!section) notFound();

  const content = section.whyChooseUs ?? {
    id: "",
    eyebrow: "Why Choose Us",
    headingPrefix: "Built on",
    headingAccent: "craft",
    headingSuffix: ", run like a press.",
    intro: "",
    features: [],
  };
  const features = [...content.features].sort((a, b) => a.order - b.order);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-amber">
        {section.label}
      </p>
      <h1 className="mt-2 font-heading text-3xl font-bold text-ink">Why Choose Us</h1>

      <Card className="mt-8 p-6">
        <h2 className="mb-4 font-heading text-lg font-semibold text-ink">Text</h2>
        <WhyChooseTextForm sectionSlug={slug as SectionSlug} content={content} />
      </Card>

      <div className="mt-16 border-t border-gray-200 pt-10">
        <h2 className="font-heading text-2xl font-bold text-ink">Features</h2>
        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
          {features.map((feature, i) => (
            <WhyChooseFeatureCard
              key={feature.id}
              sectionSlug={slug as SectionSlug}
              feature={feature}
              index={i}
            />
          ))}
          {features.length === 0 && (
            <div className="md:col-span-2">
              <EmptyState icon={<Sparkles className="h-5 w-5 text-gray-400" />}>
                No features yet — add the first one below.
              </EmptyState>
            </div>
          )}
        </div>
        <Card className="mt-8 p-6">
          <h3 className="mb-4 font-heading text-lg font-semibold text-ink">Add a feature</h3>
          <WhyChooseFeatureForm sectionSlug={slug as SectionSlug} />
        </Card>
      </div>
    </div>
  );
}
