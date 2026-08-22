"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Upload } from "lucide-react";
import type { Category, SectionSlug } from "@/lib/api";
import { Button, FieldLabel, Input, Textarea } from "@/components/ui";

type Props = {
  sectionSlug: SectionSlug;
  category?: Category;
  onDone?: () => void;
};

const EMPTY = { image: "", title: "", description: "", order: 0 };

export default function CategoryForm({ sectionSlug, category, onDone }: Props) {
  const router = useRouter();
  const [values, setValues] = useState(category ?? EMPTY);
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
      const res = await fetch(category ? `/api/categories/${category.id}` : "/api/categories", {
        method: category ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(category ? values : { slug: sectionSlug, ...values }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Failed to save category");
      if (!category) setValues(EMPTY);
      router.refresh();
      onDone?.();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save category");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex items-center gap-4">
        {values.image ? (
          <img src={values.image} alt="" className="h-16 w-16 shrink-0 rounded-lg object-cover" />
        ) : (
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-lg bg-paper-muted text-gray-300">
            <Upload className="h-5 w-5" />
          </div>
        )}
        <div className="flex-1 space-y-1.5">
          <Input
            type="text"
            placeholder="Image URL (e.g. /images/category-1.jpg)"
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
        <FieldLabel>Title</FieldLabel>
        <Input
          type="text"
          placeholder="e.g. Visiting Cards"
          value={values.title}
          onChange={(e) => set("title", e.target.value)}
          required
        />
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
          {saving ? "Saving…" : category ? "Save changes" : "Add category"}
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
