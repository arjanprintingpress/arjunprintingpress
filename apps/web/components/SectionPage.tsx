import Nav from "@/components/Nav";
import HeroCarousel from "@/components/HeroCarousel";
import Footer from "@/components/Footer";
import type { Section } from "@/lib/api";

export default function SectionPage({
  section,
  children,
}: {
  section: Section;
  children?: React.ReactNode;
}) {
  return (
    <>
      <Nav />
      {children ? (
        <div className="relative h-[200vh]">
          <HeroCarousel slides={section.heroSlides} />
        </div>
      ) : (
        <HeroCarousel slides={section.heroSlides} />
      )}
      {children}
      <Footer />
    </>
  );
}
