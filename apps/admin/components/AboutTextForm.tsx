"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { AboutContent, SectionSlug } from "@/lib/api";
import { Button, FieldLabel, Input, Textarea } from "@/components/ui";

export default function AboutTextForm({
  sectionSlug,
  about,
}: {
  sectionSlug: SectionSlug;
  about: AboutContent;
}) {
  const router = useRouter();
  const [values, setValues] = useState({
    eyebrow: about.eyebrow,
    heading: about.heading,
    body: about.body,
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function set<K extends keyof typeof values>(key: K, value: string) {
    setValues((v) => ({ ...v, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      const res = await fetch("/api/about", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug: sectionSlug, ...values }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Failed to save");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <FieldLabel>Eyebrow</FieldLabel>
        <Input
          type="text"
          value={values.eyebrow}
          onChange={(e) => set("eyebrow", e.target.value)}
          required
        />
      </div>
      <div>
        <FieldLabel>Heading</FieldLabel>
        <Input
          type="text"
          value={values.heading}
          onChange={(e) => set("heading", e.target.value)}
          required
        />
      </div>
      <div>
        <FieldLabel>Body</FieldLabel>
        <Textarea
          value={values.body}
          onChange={(e) => set("body", e.target.value)}
          required
          rows={4}
        />
      </div>
      <div className="flex items-center gap-4">
        <Button type="submit" disabled={saving}>
          {saving ? "Saving…" : "Save changes"}
        </Button>
      </div>
      {error && <p className="text-sm text-accent-pink">{error}</p>}
    </form>
  );
}
