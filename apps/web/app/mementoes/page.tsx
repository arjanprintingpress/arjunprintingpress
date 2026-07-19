import { notFound } from "next/navigation";
import SectionPage from "@/components/SectionPage";
import { getSection } from "@/lib/api";

export default async function MementoesPage() {
  const section = await getSection("mementoes");
  if (!section) notFound();
  return <SectionPage section={section} />;
}
