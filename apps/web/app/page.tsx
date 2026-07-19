import { notFound } from "next/navigation";
import SectionPage from "@/components/SectionPage";
import { getSection } from "@/lib/api";

export default async function Home() {
  const section = await getSection("printing");
  if (!section) notFound();
  return <SectionPage section={section} />;
}
