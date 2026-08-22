"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Pencil, Award, Clock, Palette, ShieldCheck, Truck, Star, Users, Heart, type LucideIcon } from "lucide-react";
import type { SectionSlug, WhyChooseFeature } from "@/lib/api";
import WhyChooseFeatureForm from "@/components/WhyChooseFeatureForm";
import DeleteWhyChooseFeatureButton from "@/components/DeleteWhyChooseFeatureButton";
import { Card, IconButton, Badge } from "@/components/ui";

const ICON_MAP: Record<string, LucideIcon> = {
  Award,
  Clock,
  Palette,
  ShieldCheck,
  Truck,
  Star,
  Users,
  Heart,
};

export default function WhyChooseFeatureCard({
  sectionSlug,
  feature,
  index = 0,
}: {
  sectionSlug: SectionSlug;
  feature: WhyChooseFeature;
  index?: number;
}) {
  const [editing, setEditing] = useState(false);
  const Icon = ICON_MAP[feature.icon] ?? Award;

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
              <WhyChooseFeatureForm sectionSlug={sectionSlug} feature={feature} onDone={() => setEditing(false)} />
            </Card>
          </motion.div>
        ) : (
          <motion.div key="view" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}>
            <Card className="flex items-start gap-4 p-5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-100 text-ink">
                <Icon className="h-5 w-5" strokeWidth={1.75} />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-3">
                  <p className="font-heading font-semibold text-ink">{feature.title}</p>
                  <Badge variant="neutral" className="shrink-0">
                    #{feature.order}
                  </Badge>
                </div>
                <p className="mt-1 line-clamp-2 text-sm text-gray-500">{feature.description}</p>
                <div className="mt-3 flex items-center justify-end gap-1">
                  <IconButton type="button" onClick={() => setEditing(true)} aria-label="Edit feature">
                    <Pencil className="h-4 w-4" />
                  </IconButton>
                  <DeleteWhyChooseFeatureButton id={feature.id} />
                </div>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
