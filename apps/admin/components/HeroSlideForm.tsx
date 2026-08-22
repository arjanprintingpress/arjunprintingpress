"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Upload } from "lucide-react";
import type { HeroSlide, SectionSlug } from "@/lib/api";
import { Button, FieldLabel, Input, Textarea } from "@/components/ui";

type Props = {
  sectionSlug: SectionSlug;
  slide?: HeroSlide;
  onDone?: () => void;
};

const EMPTY = { image: "", eyebrow: "", heading: "", headingAccent: "", intro: "", order: 0 };

export default function HeroSlideForm({ sectionSlug, slide, onDone }: Props) {
  const router = useRouter();
  const [values, setValues] = useState(slide ?? EMPTY);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function set<K extends keyof typeof values>(key: K, value: (typeof values)[K]) {
    setValues((v) => ({ ...v, [key]: value }));
  }

  async function handleUpload(file: File) {
    setUploading(true);
    setError(null);
    try {
      const form = new FormData();
      form.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: form });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Upload failed");
      set("image", data.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      const res = await fetch(slide ? `/api/hero-slides/${slide.id}` : "/api/hero-slides", {
        method: slide ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(slide ? values : { slug: sectionSlug, ...values }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Failed to save slide");
      if (!slide) setValues(EMPTY);
      router.refresh();
      onDone?.();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save slide");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex items-center gap-4">
        {values.image ? (
          <img src={values.image} alt="" className="h-16 w-24 shrink-0 rounded-lg object-cover" />
        ) : (
          <div className="flex h-16 w-24 shrink-0 items-center justify-center rounded-lg bg-paper-muted text-gray-300">
            <Upload className="h-5 w-5" />
          </div>
        )}
        <div className="flex-1 space-y-1.5">
          <Input
            type="text"
            placeholder="Image URL (e.g. /images/hero-3.jpg)"
            value={values.image}
            onChange={(e) => set("image", e.target.value)}
            required
          />
          <label className="inline-block cursor-pointer text-xs font-medium text-brand-blue hover:underline">
            {uploading ? "Uploading…" : "Upload image"}
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => e.target.files?.[0] && handleUpload(e.target.files[0])}
            />
          </label>
        </div>
      </div>

      <div>
        <FieldLabel>Eyebrow</FieldLabel>
        <Input
          type="text"
          placeholder="e.g. Arjun Printing Press — Offset"
          value={values.eyebrow}
          onChange={(e) => set("eyebrow", e.target.value)}
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
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
          <FieldLabel>Heading accent</FieldLabel>
          <Input
            type="text"
            value={values.headingAccent}
            onChange={(e) => set("headingAccent", e.target.value)}
            required
          />
        </div>
      </div>

      <div>
        <FieldLabel>Intro text</FieldLabel>
        <Textarea
          value={values.intro}
          onChange={(e) => set("intro", e.target.value)}
          required
          rows={2}
        />
      </div>

      <div className="flex items-center gap-4 pt-1">
        <label className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-gray-500">
          Order
          <Input
            type="number"
            value={values.order}
            onChange={(e) => set("order", Number(e.target.value))}
            className="w-16"
          />
        </label>
        <Button type="submit" disabled={saving || uploading}>
          {saving ? "Saving…" : slide ? "Save changes" : "Add slide"}
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
