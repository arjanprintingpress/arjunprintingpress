"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { CategoryItem, Section } from "@/lib/api";
import { sectionHref } from "@/lib/api";
import CategoryCard from "@/components/CategoryCard";

const gridVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09 } },
};

export default function CategoryDetail({
  section,
  category,
}: {
  section: Section;
  category: CategoryItem;
}) {
  const categoriesHref = `${sectionHref(section)}/categories`;
  const subCategories = category.subCategories;
  const count = subCategories.length;

  return (
    <section className="relative overflow-hidden bg-paper px-6 pb-28 pt-40 md:px-10">
      <div className="relative mx-auto max-w-[1600px]">
        <Link
          href={categoriesHref}
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-ink/50 transition hover:text-accent-amber"
        >
          <span aria-hidden>←</span> All categories
        </Link>

        <p className="mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-accent-amber">
          {section.label}
        </p>
        <h1 className="mt-4 font-sans text-5xl font-semibold tracking-tight text-ink sm:text-6xl">
          {category.title}
        </h1>
        <p className="mt-4 max-w-xl text-sm leading-relaxed text-ink/60">
          {category.description}
        </p>

        {count === 0 ? (
          <p className="mt-24 text-center text-sm text-ink/40">
            No subcategories yet — check back soon.
          </p>
        ) : (
          <motion.div
            variants={gridVariants}
            initial="hidden"
            animate="show"
            className="mt-16 grid grid-cols-2 gap-x-6 gap-y-12 sm:grid-cols-3 lg:grid-cols-4"
          >
            {subCategories.map((sub, i) => (
              <CategoryCard
                key={sub.id}
                variant="grid"
                index={i}
                image={sub.image}
                title={sub.title}
                description={sub.description}
              />
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
