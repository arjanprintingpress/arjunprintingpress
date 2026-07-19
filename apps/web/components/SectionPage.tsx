import Nav from "@/components/Nav";
import HeroCarousel from "@/components/HeroCarousel";
import type { SectionContent } from "@/content/sections";

export default function SectionPage({ section }: { section: SectionContent }) {
  return (
    <>
      <Nav />
      <HeroCarousel slides={section.heroSlides} />
      <main className="mx-auto max-w-6xl px-6 py-20">
        <h2 className="font-heading text-3xl font-bold text-ink">{section.label}</h2>
        <p className="mt-2 max-w-2xl text-ink/70">{section.tagline}</p>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {section.services.map((service) => (
            <div
              key={service.title}
              className="rounded-2xl border border-black/5 bg-paper-muted p-6 shadow-sm"
            >
              <h3 className="font-heading text-lg font-semibold text-ink">
                {service.title}
              </h3>
              <p className="mt-2 text-sm text-ink/70">{service.description}</p>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
