"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Pencil } from "lucide-react";
import type { AboutStat, SectionSlug } from "@/lib/api";
import AboutStatForm from "@/components/AboutStatForm";
import DeleteAboutStatButton from "@/components/DeleteAboutStatButton";
import { Card, IconButton, Badge } from "@/components/ui";

export default function AboutStatCard({
  sectionSlug,
  stat,
  index = 0,
}: {
  sectionSlug: SectionSlug;
  stat: AboutStat;
  index?: number;
}) {
  const [editing, setEditing] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.03 }}
    >
      <AnimatePresence mode="wait" initial={false}>
        {editing ? (
          <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}>
            <Card className="p-5">
              <AboutStatForm sectionSlug={sectionSlug} stat={stat} onDone={() => setEditing(false)} />
            </Card>
          </motion.div>
        ) : (
          <motion.div key="view" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}>
            <Card className="flex items-center justify-between p-5">
              <div>
                <p className="font-heading text-xl font-bold text-ink">{stat.value}</p>
                <p className="text-sm text-gray-500">{stat.label}</p>
              </div>
              <div className="flex items-center gap-1">
                <Badge variant="neutral">#{stat.order}</Badge>
                <IconButton type="button" onClick={() => setEditing(true)} aria-label="Edit stat">
                  <Pencil className="h-4 w-4" />
                </IconButton>
                <DeleteAboutStatButton id={stat.id} />
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
