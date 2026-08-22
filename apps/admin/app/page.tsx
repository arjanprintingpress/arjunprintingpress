import { getSections } from "@/lib/api";
import SectionPicker from "@/components/SectionPicker";

export default async function Home() {
  const sections = await getSections();

  if (sections.length === 0) {
    return (
      <div className="mx-auto max-w-6xl px-8 py-12">
        <p className="rounded-xl border border-gray-200 bg-paper p-4 text-gray-500">
          No sections seeded yet — run the seed script once the schema is migrated.
        </p>
      </div>
    );
  }

  return <SectionPicker sections={sections} />;
}
