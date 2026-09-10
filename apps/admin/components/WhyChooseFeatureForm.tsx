"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { SectionSlug, WhyChooseFeature } from "@/lib/api";
import { Button, FieldLabel, Input, Select, Textarea } from "@/components/ui";

export const ICON_OPTIONS = [
  "Award",
  "Clock",
  "Palette",
  "ShieldCheck",
  "Truck",
  "Star",
  "Users",
  "Heart",
] as const;

type Props = {
  sectionSlug: SectionSlug;
  feature?: WhyChooseFeature;
  onDone?: () => void;
};

const EMPTY = { icon: "Award", title: "", description: "", order: 0 };

export default function WhyChooseFeatureForm({ sectionSlug, feature, onDone }: Props) {
  const router = useRouter();
  const [values, setValues] = useState(feature ?? EMPTY);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function set<K extends keyof typeof values>(key: K, value: (typeof values)[K]) {
    setValues((v) => ({ ...v, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      const res = await fetch(
        feature ? `/api/why-choose-us/features/${feature.id}` : "/api/why-choose-us/features",
        {
          method: feature ? "PATCH" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(feature ? values : { slug: sectionSlug, ...values }),
        }
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Failed to save feature");
      if (!feature) setValues(EMPTY);
      router.refresh();
      onDone?.();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save feature");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div>
          <FieldLabel>Icon</FieldLabel>
          <Select value={values.icon} onChange={(e) => set("icon", e.target.value)}>
            {ICON_OPTIONS.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </Select>
        </div>
        <div>
          <FieldLabel>Title</FieldLabel>
          <Input
            type="text"
            placeholder="e.g. Fast Turnaround"
            value={values.title}
            onChange={(e) => set("title", e.target.value)}
            required
          />
        </div>
      </div>

      <div>
        <FieldLabel>Description</FieldLabel>
        <Textarea
          value={values.description}
          onChange={(e) => set("description", e.target.value)}
          required
          rows={2}
        />
      </div>

      <div className="flex flex-wrap items-center gap-3 pt-1">
        <label className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-gray-500">
          Order
          <Input
            type="number"
            value={values.order}
            onChange={(e) => set("order", Number(e.target.value))}
            className="w-16"
          />
        </label>
        <Button type="submit" className="w-full sm:w-auto" disabled={saving}>
          {saving ? "Saving…" : feature ? "Save changes" : "Add feature"}
        </Button>
        {onDone && (
          <button type="button" onClick={onDone} className="text-sm text-gray-500 hover:text-ink">
            Cancel
          </button>
        )}
      </div>
      {error && <p className="text-sm text-accent-pink">{error}</p>}
    </form>
  );
}
