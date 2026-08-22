"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Pencil } from "lucide-react";
import type { SubCategory } from "@/lib/api";
import SubCategoryForm from "@/components/SubCategoryForm";
import DeleteSubCategoryButton from "@/components/DeleteSubCategoryButton";
import { Card, IconButton, Badge } from "@/components/ui";

export default function SubCategoryCard({
  subCategory,
  categoryId,
  index = 0,
}: {
  subCategory: SubCategory;
  categoryId: string;
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
              <SubCategoryForm
                categoryId={categoryId}
                subCategory={subCategory}
                onDone={() => setEditing(false)}
              />
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
              <img src={subCategory.image} alt="" className="h-20 w-20 shrink-0 rounded-lg object-cover" />
              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-3">
                  <p className="font-heading font-semibold text-ink">{subCategory.title}</p>
                  <Badge variant="neutral" className="shrink-0">
                    #{subCategory.order}
                  </Badge>
                </div>
                <p className="mt-1 line-clamp-2 text-sm text-gray-500">{subCategory.description}</p>
                <div className="mt-3 flex items-center justify-end gap-1">
                  <IconButton type="button" onClick={() => setEditing(true)} aria-label="Edit subcategory">
                    <Pencil className="h-4 w-4" />
                  </IconButton>
                  <DeleteSubCategoryButton id={subCategory.id} />
                </div>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
