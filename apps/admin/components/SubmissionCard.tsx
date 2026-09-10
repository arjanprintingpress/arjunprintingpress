"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Mail, MailOpen } from "lucide-react";
import type { ContactSubmission } from "@/lib/api";
import DeleteSubmissionButton from "@/components/DeleteSubmissionButton";
import { Card, IconButton, Badge } from "@/components/ui";

const EXTRA_FIELD_LABEL: Record<string, string> = {
  paperSpec: "Paper / Finish Spec",
  eventDate: "Event Date",
  brandingRequirements: "Branding Requirements",
};

export default function SubmissionCard({
  submission,
  index = 0,
}: {
  submission: ContactSubmission;
  index?: number;
}) {
  const extraKey = (["paperSpec", "eventDate", "brandingRequirements"] as const).find(
    (key) => submission[key]
  );
  const router = useRouter();
  const [toggling, setToggling] = useState(false);

  async function handleToggleRead() {
    setToggling(true);
    try {
      const res = await fetch(`/api/contact-submissions/${submission.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ read: !submission.read }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? "Failed to update submission");
      }
      router.refresh();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to update submission");
    } finally {
      setToggling(false);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.03 }}
    >
      <Card className={`p-5 ${!submission.read ? "border-brand-blue/30 bg-brand-blue/[0.03]" : ""}`}>
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <p className="font-heading font-semibold text-ink">{submission.name}</p>
              {!submission.read && <Badge variant="blue">New</Badge>}
            </div>
            <p className="mt-1 break-words text-sm text-gray-500">
              {submission.email} · {submission.phone}
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-1">
            <IconButton
              type="button"
              onClick={handleToggleRead}
              disabled={toggling}
              aria-label={submission.read ? "Mark as unread" : "Mark as read"}
            >
              {submission.read ? <Mail className="h-4 w-4" /> : <MailOpen className="h-4 w-4" />}
            </IconButton>
            <DeleteSubmissionButton id={submission.id} />
          </div>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-4 border-t border-gray-100 pt-4 text-sm sm:grid-cols-2">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-gray-500">Service</p>
            <p className="mt-1 text-ink">{submission.serviceType}</p>
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-gray-500">Quantity</p>
            <p className="mt-1 text-ink">{submission.quantity}</p>
          </div>
        </div>

        {extraKey && (
          <div className="mt-4">
            <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
              {EXTRA_FIELD_LABEL[extraKey]}
            </p>
            <p className="mt-1 text-sm text-gray-600">{submission[extraKey]}</p>
          </div>
        )}

        <div className="mt-4">
          <p className="text-xs font-medium uppercase tracking-wide text-gray-500">Details</p>
          <p className="mt-1 text-sm text-gray-600">{submission.details}</p>
        </div>

        <p className="mt-4 text-xs text-gray-400">
          {new Date(submission.createdAt).toLocaleString()}
        </p>
      </Card>
    </motion.div>
  );
}
