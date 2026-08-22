import { redirect } from "next/navigation";

export default async function SectionIndexRedirect({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  redirect(`/sections/${slug}/hero-slides`);
}
