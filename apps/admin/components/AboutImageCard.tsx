"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Pencil } from "lucide-react";
import type { AboutImage, SectionSlug } from "@/lib/api";
import AboutImageForm from "@/components/AboutImageForm";
import DeleteAboutImageButton from "@/components/DeleteAboutImageButton";
import { Card, IconButton, Badge } from "@/components/ui";

export default function AboutImageCard({
  sectionSlug,
  image,
  index = 0,
}: {
  sectionSlug: SectionSlug;
  image: AboutImage;
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
              <AboutImageForm sectionSlug={sectionSlug} image={image} onDone={() => setEditing(false)} />
            </Card>
          </motion.div>
        ) : (
          <motion.div key="view" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}>
            <Card className="flex gap-4 p-3">
              <img src={image.url} alt="" className="h-16 w-16 shrink-0 rounded-lg object-cover" />
              <div className="flex flex-1 items-center justify-between">
                <Badge variant="neutral">#{image.order}</Badge>
                <div className="flex items-center gap-1">
                  <IconButton type="button" onClick={() => setEditing(true)} aria-label="Edit image">
                    <Pencil className="h-4 w-4" />
                  </IconButton>
                  <DeleteAboutImageButton id={image.id} />
                </div>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
