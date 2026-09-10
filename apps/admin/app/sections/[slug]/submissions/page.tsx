import { notFound } from "next/navigation";
import { getSection, getSectionSubmissions, type SectionSlug } from "@/lib/api";
import SubmissionCard from "@/components/SubmissionCard";
import { EmptyState } from "@/components/ui";
import { Inbox } from "lucide-react";

const VALID_SLUGS: SectionSlug[] = ["printing", "mementoes", "corporate-gifts"];

export default async function SubmissionsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!VALID_SLUGS.includes(slug as SectionSlug)) notFound();

  const section = await getSection(slug as SectionSlug);
  if (!section) notFound();

  const submissions = await getSectionSubmissions(slug as SectionSlug);

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-amber">
        {section.label}
      </p>
      <h1 className="mt-2 font-heading text-3xl font-bold text-ink">Submissions</h1>

      <div className="mt-8 space-y-4">
        {submissions.map((submission, i) => (
          <SubmissionCard key={submission.id} submission={submission} index={i} />
        ))}

        {submissions.length === 0 && <EmptyState icon={<Inbox className="h-5 w-5 text-gray-400" />}>No submissions yet.</EmptyState>}
      </div>
    </div>
  );
}
