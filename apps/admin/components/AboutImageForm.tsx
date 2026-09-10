"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Upload } from "lucide-react";
import type { AboutImage, SectionSlug } from "@/lib/api";
import { Button, FieldLabel, Input, Select } from "@/components/ui";

type Props = {
  sectionSlug: SectionSlug;
  image?: AboutImage;
  defaultSide?: "left" | "right";
  onDone?: () => void;
};

export default function AboutImageForm({ sectionSlug, image, defaultSide, onDone }: Props) {
  const router = useRouter();
  const [values, setValues] = useState(
    image ?? { url: "", side: defaultSide ?? "left", order: 0 }
  );
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
      set("url", data.url);
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
      const res = await fetch(image ? `/api/about/images/${image.id}` : "/api/about/images", {
        method: image ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(image ? values : { slug: sectionSlug, ...values }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Failed to save image");
      if (!image) set("url", "");
      router.refresh();
      onDone?.();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save image");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        {values.url ? (
          <img src={values.url} alt="" className="h-16 w-16 shrink-0 rounded-lg object-cover" />
        ) : (
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-lg bg-paper-muted text-gray-300">
            <Upload className="h-5 w-5" />
          </div>
        )}
        <div className="flex-1 space-y-1.5">
          <Input
            type="text"
            placeholder="Image URL"
            value={values.url}
            onChange={(e) => set("url", e.target.value)}
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

      <div className="flex flex-wrap items-center gap-3">
        <div className="w-32">
          <FieldLabel>Side</FieldLabel>
          <Select value={values.side} onChange={(e) => set("side", e.target.value as "left" | "right")}>
            <option value="left">Left</option>
            <option value="right">Right</option>
          </Select>
        </div>
        <label className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-gray-500">
          Order
          <Input
            type="number"
            value={values.order}
            onChange={(e) => set("order", Number(e.target.value))}
            className="w-16"
          />
        </label>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <Button type="submit" className="w-full sm:w-auto" disabled={saving || uploading}>
          {saving ? "Saving…" : image ? "Save changes" : "Add image"}
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
