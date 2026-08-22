import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Sparkles } from "lucide-react";
import { getSection, type SectionSlug } from "@/lib/api";
import SubCategoryForm from "@/components/SubCategoryForm";
import SubCategoryCard from "@/components/SubCategoryCard";
import { Card, EmptyState } from "@/components/ui";

const VALID_SLUGS: SectionSlug[] = ["printing", "mementoes", "corporate-gifts"];

export default async function SubCategoriesPage({
  params,
}: {
  params: Promise<{ slug: string; categoryId: string }>;
}) {
  const { slug, categoryId } = await params;
  if (!VALID_SLUGS.includes(slug as SectionSlug)) notFound();

  const section = await getSection(slug as SectionSlug);
  if (!section) notFound();

  const category = section.categories.find((c) => c.id === categoryId);
  if (!category) notFound();

  const subCategories = [...category.subCategories].sort((a, b) => a.order - b.order);

  return (
    <div className="mx-auto max-w-6xl px-8 py-12">
      <Link
        href={`/sections/${slug}/categories`}
        className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-ink"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to categories
      </Link>

      <p className="mt-4 text-xs font-semibold uppercase tracking-[0.2em] text-accent-amber">
        {category.title}
      </p>
      <h1 className="mt-2 font-heading text-3xl font-bold text-ink">Subcategories</h1>

      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
        {subCategories.map((subCategory, i) => (
          <SubCategoryCard key={subCategory.id} subCategory={subCategory} categoryId={category.id} index={i} />
        ))}

        {subCategories.length === 0 && (
          <div className="md:col-span-2">
            <EmptyState icon={<Sparkles className="h-5 w-5 text-gray-400" />}>
              No subcategories yet — add the first one below.
            </EmptyState>
          </div>
        )}
      </div>

      <Card className="mt-8 p-6">
        <h2 className="mb-4 font-heading text-lg font-semibold text-ink">Add a subcategory</h2>
        <SubCategoryForm categoryId={category.id} />
      </Card>
    </div>
  );
}
