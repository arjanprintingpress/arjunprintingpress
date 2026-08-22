"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Link from "next/link";
import type { CategoryItem } from "@/lib/api";

const SLIDE_DURATION_MS = 4000;
const HOVER_DELAY_MS = 150;
const TRANSITION_MS = 700;
const ITEM_WIDTH = 260;
const ITEM_GAP = 24;

export default function Categories({
  categories,
  sectionSlug,
}: {
  categories: CategoryItem[];
  sectionSlug: string;
}) {
  const router = useRouter();
  const [index, setIndex] = useState(0);
  const pausedRef = useRef(false);
  const isAnimatingRef = useRef(false);
  const hoverTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const goTo = (i: number) => {
    setIndex((current) => {
      if (i === current || isAnimatingRef.current) return current;
      isAnimatingRef.current = true;
      setTimeout(() => {
        isAnimatingRef.current = false;
      }, TRANSITION_MS);
      return i;
    });
  };

  useEffect(() => {
    if (categories.length < 2) return;
    const id = setTimeout(() => {
      if (!pausedRef.current) {
        goTo((index + 1) % categories.length);
      }
    }, SLIDE_DURATION_MS);
    return () => clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, categories.length]);

  const handleHoverStart = (i: number) => {
    if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
    hoverTimerRef.current = setTimeout(() => goTo(i), HOVER_DELAY_MS);
  };
  const handleHoverEnd = () => {
    if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
  };

  if (categories.length === 0) return null;

  const active = categories[index];
  const trackOffset = -(index * (ITEM_WIDTH + ITEM_GAP)) - ITEM_WIDTH / 2;

  return (
    <section
      id="categories"
      className="relative z-10 -mt-[100vh] flex h-screen w-full flex-col justify-center overflow-hidden bg-ink py-16"
      onMouseEnter={() => (pausedRef.current = true)}
      onMouseLeave={() => (pausedRef.current = false)}
    >
      <div className="halftone-bg pointer-events-none absolute inset-0 opacity-[0.15]" />

      <div className="relative mx-auto flex w-full max-w-6xl items-end justify-between px-6">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-amber">
            Categories
          </p>
          <h2 className="mt-4 font-sans text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            What we print.
          </h2>
        </div>
        <Link
          href={`/${sectionSlug}/categories`}
          className="mb-2 hidden shrink-0 items-center gap-2 text-sm font-semibold uppercase tracking-wide text-white transition hover:text-accent-amber sm:flex"
        >
          Explore more
          <span aria-hidden>→</span>
        </Link>
      </div>

      <div className="relative mt-12 h-[420px] w-full">
        <motion.div
          className="absolute left-1/2 flex items-center"
          style={{ gap: ITEM_GAP }}
          animate={{ x: trackOffset }}
          transition={{ duration: TRANSITION_MS / 1000, ease: "easeInOut" }}
        >
          {categories.map((category, i) => {
            const distance = Math.abs(i - index);
            const isActive = distance === 0;
            const scale = isActive ? 1 : distance === 1 ? 0.82 : 0.68;
            const opacity = isActive ? 1 : distance === 1 ? 0.55 : 0.25;
            const height = isActive ? 420 : distance === 1 ? 320 : 260;

            return (
              <motion.div
                key={category.id}
                className="relative shrink-0"
                style={{ width: ITEM_WIDTH }}
                animate={{ scale, opacity, height }}
                transition={{ duration: TRANSITION_MS / 1000, ease: "easeInOut" }}
              >
                <button
                  type="button"
                  aria-label={isActive ? `View ${category.title}` : `Show ${category.title}`}
                  onMouseEnter={() => handleHoverStart(i)}
                  onMouseLeave={handleHoverEnd}
                  onFocus={() => handleHoverStart(i)}
                  onClick={() =>
                    isActive
                      ? router.push(`/${sectionSlug}/categories/${category.id}`)
                      : goTo(i)
                  }
                  className="relative block h-full w-full cursor-pointer overflow-hidden"
                >
                  <img src={category.image} alt={category.title} className="h-full w-full object-cover" />
                </button>
                {isActive && (
                  <>
                    <span className="pointer-events-none absolute -right-2 -top-2 h-4 w-4 border-r-2 border-t-2 border-white/70" />
                    <span className="pointer-events-none absolute -bottom-2 -left-2 h-4 w-4 border-b-2 border-l-2 border-white/70" />
                  </>
                )}
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      <div className="mx-auto mt-10 max-w-6xl px-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Link
              href={`/${sectionSlug}/categories/${active.id}`}
              className="group inline-flex items-center gap-2 font-sans text-sm font-semibold uppercase tracking-wide text-white transition hover:text-accent-amber"
            >
              {active.title}
              <span aria-hidden className="transition group-hover:translate-x-1">
                →
              </span>
            </Link>
            <p className="mt-1 max-w-md text-sm text-white/60">{active.description}</p>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
