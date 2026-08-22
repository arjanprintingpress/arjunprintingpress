"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";
import { IconButton } from "@/components/ui";

export default function DeleteSubmissionButton({ id }: { id: string }) {
  const router = useRouter();
  const [deleting, setDeleting] = useState(false);

  async function handleDelete() {
    if (!confirm("Delete this submission? This can't be undone.")) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/contact-submissions/${id}`, { method: "DELETE" });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? "Failed to delete submission");
      }
      router.refresh();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to delete submission");
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
      aria-label="Delete submission"
    >
      <Trash2 className="h-4 w-4" />
    </IconButton>
  );
}
