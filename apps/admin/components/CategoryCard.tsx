"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Pencil, Layers } from "lucide-react";
import type { Category, SectionSlug } from "@/lib/api";
import CategoryForm from "@/components/CategoryForm";
import DeleteCategoryButton from "@/components/DeleteCategoryButton";
import { Card, IconButton, Badge } from "@/components/ui";

export default function CategoryCard({
  category,
  sectionSlug,
  index = 0,
}: {
  category: Category;
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
              <CategoryForm sectionSlug={sectionSlug} category={category} onDone={() => setEditing(false)} />
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
            <Card className="flex gap-4 p-5">
              <img src={category.image} alt="" className="h-20 w-20 shrink-0 rounded-lg object-cover" />
              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-3">
                  <p className="font-heading font-semibold text-ink">{category.title}</p>
                  <Badge variant="neutral" className="shrink-0">
                    #{category.order}
                  </Badge>
                </div>
                <p className="mt-1 line-clamp-2 text-sm text-gray-500">{category.description}</p>
                <div className="mt-3 flex items-center justify-between gap-1">
                  <Link
                    href={`/sections/${sectionSlug}/categories/${category.id}`}
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-brand-blue hover:underline"
                  >
                    <Layers className="h-3.5 w-3.5" />
                    Manage subcategories ({category.subCategories.length})
                  </Link>
                  <div className="flex items-center gap-1">
                    <IconButton type="button" onClick={() => setEditing(true)} aria-label="Edit category">
                      <Pencil className="h-4 w-4" />
                    </IconButton>
                    <DeleteCategoryButton id={category.id} />
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
