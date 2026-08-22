"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { SectionSlug, WhyChooseContent } from "@/lib/api";
import { Button, FieldLabel, Input, Textarea } from "@/components/ui";

export default function WhyChooseTextForm({
  sectionSlug,
  content,
}: {
  sectionSlug: SectionSlug;
  content: WhyChooseContent;
}) {
  const router = useRouter();
  const [values, setValues] = useState({
    eyebrow: content.eyebrow,
    headingPrefix: content.headingPrefix,
    headingAccent: content.headingAccent,
    headingSuffix: content.headingSuffix,
    intro: content.intro,
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
      const res = await fetch("/api/why-choose-us", {
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
      <div className="grid grid-cols-3 gap-3">
        <div>
          <FieldLabel>Heading prefix</FieldLabel>
          <Input
            type="text"
            value={values.headingPrefix}
            onChange={(e) => set("headingPrefix", e.target.value)}
            required
          />
        </div>
        <div>
          <FieldLabel>Heading accent</FieldLabel>
          <Input
            type="text"
            value={values.headingAccent}
            onChange={(e) => set("headingAccent", e.target.value)}
            required
          />
        </div>
        <div>
          <FieldLabel>Heading suffix</FieldLabel>
          <Input
            type="text"
            value={values.headingSuffix}
            onChange={(e) => set("headingSuffix", e.target.value)}
            required
          />
        </div>
      </div>
      <div>
        <FieldLabel>Intro</FieldLabel>
        <Textarea
          value={values.intro}
          onChange={(e) => set("intro", e.target.value)}
          required
          rows={3}
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
