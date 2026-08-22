"use client";

import { motion } from "framer-motion";
import { sectionHref, type Section } from "@/lib/api";
import CategoryCard from "@/components/CategoryCard";

function splitHeading(label: string) {
  const words = label.split(" ");
  const accent = words.pop() ?? label;
  return { lead: words.join(" "), accent };
}

const gridVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09 } },
};

export default function CategoriesGrid({ section }: { section: Section }) {
  const { lead, accent } = splitHeading("All categories.");
  const categories = section.categories;
  const count = categories.length;
  const base = sectionHref(section);

  return (
    <section className="relative overflow-hidden bg-paper px-6 pb-28 pt-40 md:px-10">
      <div className="relative mx-auto max-w-[1600px]">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-amber">
          {section.label}
        </p>
        <h1 className="mt-4 font-sans text-5xl font-semibold tracking-tight text-ink sm:text-6xl">
          {lead} <span className="font-serif-accent italic text-accent-amber">{accent}</span>
        </h1>

        {count === 0 ? (
          <p className="mt-24 text-center text-sm text-ink/40">
            Nothing here yet — check back soon.
          </p>
        ) : (
          <motion.div
            variants={gridVariants}
            initial="hidden"
            animate="show"
            className="mt-16 grid grid-cols-2 gap-x-6 gap-y-12 sm:grid-cols-3 lg:grid-cols-4"
          >
            {categories.map((category, i) => (
              <CategoryCard
                key={category.id}
                variant="grid"
                index={i}
                href={`${base}/categories/${category.id}`}
                image={category.image}
                title={category.title}
                description={category.description}
              />
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
