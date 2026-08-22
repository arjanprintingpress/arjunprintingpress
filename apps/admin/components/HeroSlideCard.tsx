"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Pencil } from "lucide-react";
import type { HeroSlide, SectionSlug } from "@/lib/api";
import HeroSlideForm from "@/components/HeroSlideForm";
import DeleteSlideButton from "@/components/DeleteSlideButton";
import { Card, IconButton, Badge } from "@/components/ui";

export default function HeroSlideCard({
  slide,
  sectionSlug,
  index = 0,
}: {
  slide: HeroSlide;
  sectionSlug: SectionSlug;
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
          <motion.div
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            <Card className="p-5">
              <HeroSlideForm sectionSlug={sectionSlug} slide={slide} onDone={() => setEditing(false)} />
            </Card>
          </motion.div>
        ) : (
          <motion.div
            key="view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            <Card className="overflow-hidden">
              <div className="aspect-[16/9] w-full bg-paper-muted">
                <img src={slide.image} alt="" className="h-full w-full object-cover" />
              </div>
              <div className="p-5">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-xs font-semibold uppercase tracking-wide text-accent-amber">
                      {slide.eyebrow}
                    </p>
                    <p className="mt-1 font-heading font-semibold text-ink">
                      {slide.heading} <span className="font-serif-accent italic">{slide.headingAccent}</span>
                    </p>
                  </div>
                  <Badge variant="neutral" className="shrink-0">
                    #{slide.order}
                  </Badge>
                </div>
                <p className="mt-2 line-clamp-2 text-sm text-gray-500">{slide.intro}</p>

                <div className="mt-4 flex items-center justify-end gap-1 border-t border-gray-100 pt-3">
                  <IconButton type="button" onClick={() => setEditing(true)} aria-label="Edit slide">
                    <Pencil className="h-4 w-4" />
                  </IconButton>
                  <DeleteSlideButton id={slide.id} />
                </div>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
