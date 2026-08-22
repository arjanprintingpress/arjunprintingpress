import { notFound } from "next/navigation";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import CategoryDetail from "@/components/CategoryDetail";
import { getSection } from "@/lib/api";

export default async function CorporateGiftsCategoryDetailPage({
  params,
}: {
  params: Promise<{ categoryId: string }>;
}) {
  const { categoryId } = await params;
  const section = await getSection("corporate-gifts");
  if (!section) notFound();
  const category = section.categories.find((c) => c.id === categoryId);
  if (!category) notFound();

  return (
    <>
      <Nav light />
      <CategoryDetail section={section} category={category} />
      <Footer plain />
    </>
  );
}
