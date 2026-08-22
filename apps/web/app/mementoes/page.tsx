import { notFound } from "next/navigation";
import SectionPage from "@/components/SectionPage";
import Categories from "@/components/Categories";
import AboutUs from "@/components/AboutUs";
import WhyChooseUs from "@/components/WhyChooseUs";
import ContactSection from "@/components/ContactSection";
import { getSection } from "@/lib/api";

export default async function MementoesPage() {
  const section = await getSection("mementoes");
  if (!section) notFound();
  return (
    <SectionPage section={section}>
      <Categories categories={section.categories} sectionSlug="mementoes" />
      {section.about && <AboutUs about={section.about} />}
      {section.whyChooseUs && <WhyChooseUs data={section.whyChooseUs} />}
      <ContactSection sectionSlug="mementoes" />
    </SectionPage>
  );
}
