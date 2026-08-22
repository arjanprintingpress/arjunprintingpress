import { notFound } from "next/navigation";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import CategoriesGrid from "@/components/CategoriesGrid";
import { getSection } from "@/lib/api";

export default async function PrintingCategoriesPage() {
  const section = await getSection("printing");
  if (!section) notFound();
  return (
    <>
      <Nav light />
      <CategoriesGrid section={section} />
      <Footer plain />
    </>
  );
}
