"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { AboutStat, SectionSlug } from "@/lib/api";
import { Button, FieldLabel, Input } from "@/components/ui";

type Props = {
  sectionSlug: SectionSlug;
  stat?: AboutStat;
  onDone?: () => void;
};

const EMPTY = { value: "", label: "", order: 0 };

export default function AboutStatForm({ sectionSlug, stat, onDone }: Props) {
  const router = useRouter();
  const [values, setValues] = useState(stat ?? EMPTY);
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
      const res = await fetch(stat ? `/api/about/stats/${stat.id}` : "/api/about/stats", {
        method: stat ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(stat ? values : { slug: sectionSlug, ...values }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Failed to save stat");
      if (!stat) setValues(EMPTY);
      router.refresh();
      onDone?.();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save stat");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div>
          <FieldLabel>Value</FieldLabel>
          <Input
            type="text"
            placeholder="e.g. 75+"
            value={values.value}
            onChange={(e) => set("value", e.target.value)}
            required
          />
        </div>
        <div>
          <FieldLabel>Label</FieldLabel>
          <Input
            type="text"
            placeholder="e.g. Years Experience"
            value={values.label}
            onChange={(e) => set("label", e.target.value)}
            required
          />
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-3">
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
          {saving ? "Saving…" : stat ? "Save changes" : "Add stat"}
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
