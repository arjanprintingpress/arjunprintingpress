import { notFound } from "next/navigation";
import SectionPage from "@/components/SectionPage";
import { getSection } from "@/lib/api";

export default async function PrintingPage() {
  const section = await getSection("printing");
  if (!section) notFound();
  return <SectionPage section={section} />;
}
