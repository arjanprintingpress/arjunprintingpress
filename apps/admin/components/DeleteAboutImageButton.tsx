"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";
import { IconButton } from "@/components/ui";

export default function DeleteAboutImageButton({ id }: { id: string }) {
  const router = useRouter();
  const [deleting, setDeleting] = useState(false);

  async function handleDelete() {
    if (!confirm("Delete this image? This can't be undone.")) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/about/images/${id}`, { method: "DELETE" });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? "Failed to delete image");
      }
      router.refresh();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to delete image");
    } finally {
      setDeleting(false);
    }
  }

  return (
    <IconButton
      type="button"
      variant="danger"
      onClick={handleDelete}
      disabled={deleting}
      aria-label="Delete image"
    >
      <Trash2 className="h-4 w-4" />
    </IconButton>
  );
}
