"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const } },
};

function CardBody({
  image,
  title,
  description,
  index,
}: {
  image: string;
  title: string;
  description?: string;
  index: number;
}) {
  return (
    <>
      <div className="relative aspect-[3/4] w-full overflow-hidden rounded-sm bg-paper-muted ring-1 ring-ink/10">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-105"
        />

        <span className="absolute left-4 top-4 font-heading text-xs uppercase tracking-[0.3em] text-white/70 [text-shadow:0_1px_4px_rgba(0,0,0,0.5)]">
          {String(index + 1).padStart(2, "0")}
        </span>

        <span className="pointer-events-none absolute right-3 top-3 h-6 w-6 border-r-2 border-t-2 border-accent-amber opacity-0 transition duration-300 group-hover:opacity-100" />
        <span className="pointer-events-none absolute bottom-3 left-3 h-6 w-6 border-b-2 border-l-2 border-accent-amber opacity-0 transition duration-300 group-hover:opacity-100" />
      </div>

      <div className="mt-3">
        <p className="flex items-center gap-2 font-heading text-lg font-semibold text-ink transition group-hover:text-accent-amber">
          {title}
          <span
            aria-hidden
            className="text-accent-amber opacity-0 transition duration-300 group-hover:translate-x-1 group-hover:opacity-100"
          >
            →
          </span>
        </p>
        {description ? (
          <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-ink/50">{description}</p>
        ) : null}
      </div>
    </>
  );
}

export default function CategoryCard({
  href,
  image,
  title,
  description,
  index,
  variant = "grid",
}: {
  href?: string;
  image: string;
  title: string;
  description?: string;
  index: number;
  variant?: "strip" | "grid";
}) {
  const className = `group relative block ${variant === "strip" ? "w-[190px] flex-shrink-0" : ""}`;
  const body = <CardBody image={image} title={title} description={description} index={index} />;

  return (
    <motion.div variants={cardVariants} className={variant === "strip" ? "flex-shrink-0" : undefined}>
      {href ? (
        <Link href={href} className={className}>
          {body}
        </Link>
      ) : (
        <div className={className}>{body}</div>
      )}
    </motion.div>
  );
}
