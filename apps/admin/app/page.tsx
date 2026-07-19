import { prisma } from "@arjun/db";

export default async function AdminDashboard() {
  const sections = await prisma.section.findMany({ orderBy: { slug: "asc" } });

  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <h1 className="font-heading text-2xl font-bold text-ink">Admin</h1>
      <p className="mt-2 text-ink/70">
        Content CRUD screens per section go here (hero slides, services, gallery, testimonials).
      </p>
      <ul className="mt-8 space-y-2">
        {sections.length === 0 && (
          <li className="rounded-lg border border-black/10 p-4 text-ink/60">
            No sections seeded yet — run the seed script once the schema is migrated.
          </li>
        )}
        {sections.map((section) => (
          <li key={section.id} className="rounded-lg border border-black/10 p-4">
            {section.label}
          </li>
        ))}
      </ul>
    </div>
  );
}
