import Nav from "@/components/Nav";
import HeroCarousel from "@/components/HeroCarousel";
import Footer from "@/components/Footer";
import { sectionHref, type Section } from "@/lib/api";

export default function SectionPage({
  section,
  children,
}: {
  section: Section;
  children?: React.ReactNode;
}) {
  const exploreHref = `${sectionHref(section)}/categories`;

  return (
    <>
      <Nav />
      {children ? (
        <div className="relative lg:h-[200svh]">
          <HeroCarousel slides={section.heroSlides} exploreHref={exploreHref} />
        </div>
      ) : (
        <HeroCarousel slides={section.heroSlides} exploreHref={exploreHref} />
      )}
      {children}
      <Footer />
    </>
  );
}
