import { getSections } from "@/lib/api";
import SectionPicker from "@/components/SectionPicker";

export default async function Home() {
  const sections = await getSections();

  if (sections.length === 0) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <p className="rounded-xl border border-gray-200 bg-paper p-4 text-gray-500">
          No sections seeded yet — run the seed script once the schema is migrated.
        </p>
      </div>
    );
  }

  return <SectionPicker sections={sections} />;
}
