import { notFound } from "next/navigation";
import SectionPage from "@/components/SectionPage";
import { getSection } from "@/lib/api";

export default async function CorporateGiftsPage() {
  const section = await getSection("corporate-gifts");
  if (!section) notFound();
  return <SectionPage section={section} />;
}
