import { notFound } from "next/navigation";
import { getSection, type SectionSlug } from "@/lib/api";
import CategoryForm from "@/components/CategoryForm";
import CategoryCard from "@/components/CategoryCard";
import { Card, EmptyState } from "@/components/ui";
import { Sparkles } from "lucide-react";

const VALID_SLUGS: SectionSlug[] = ["printing", "mementoes", "corporate-gifts"];

export default async function CategoriesPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!VALID_SLUGS.includes(slug as SectionSlug)) notFound();

  const section = await getSection(slug as SectionSlug);
  if (!section) notFound();

  const categories = [...section.categories].sort((a, b) => a.order - b.order);

  return (
    <div className="mx-auto max-w-6xl px-8 py-12">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-amber">
        {section.label}
      </p>
      <h1 className="mt-2 font-heading text-3xl font-bold text-ink">Categories</h1>

      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
        {categories.map((category, i) => (
          <CategoryCard key={category.id} category={category} sectionSlug={slug as SectionSlug} index={i} />
        ))}

        {categories.length === 0 && (
          <div className="md:col-span-2">
            <EmptyState icon={<Sparkles className="h-5 w-5 text-gray-400" />}>No categories yet — add the first one below.</EmptyState>
          </div>
        )}
      </div>

      <Card className="mt-8 p-6">
        <h2 className="mb-4 font-heading text-lg font-semibold text-ink">Add a category</h2>
        <CategoryForm sectionSlug={slug as SectionSlug} />
      </Card>
    </div>
  );
}
