"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { HeroSlide } from "@/lib/api";

const SLIDE_DURATION_MS = 6000;

export default function HeroCarousel({ slides }: { slides: HeroSlide[] }) {
  const [index, setIndex] = useState(0);
  const slide = slides[index];
  const nextSlide = slides[(index + 1) % slides.length];

  useEffect(() => {
    if (slides.length <= 1) return;
    const id = setTimeout(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, SLIDE_DURATION_MS);
    return () => clearTimeout(id);
  }, [index, slides.length]);

  return (
    <div className="relative h-screen w-full overflow-hidden bg-brand-blue-dark">
      <AnimatePresence mode="wait">
        <motion.div
          key={slide.image}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: "easeInOut" }}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${slide.image})` }}
        />
      </AnimatePresence>
      <div className="absolute inset-0 bg-gradient-to-t from-brand-blue-dark/70 via-transparent to-brand-blue-dark/20" />

      {slides.length > 1 && (
        <button
          aria-label="Next slide"
          onClick={() => setIndex((i) => (i + 1) % slides.length)}
          className="absolute right-0 top-1/2 hidden h-40 w-40 -translate-y-1/2 translate-x-1/3 overflow-hidden rounded-full border-4 border-white/30 shadow-2xl transition hover:translate-x-1/4 sm:block"
        >
          <div
            className="h-full w-full bg-cover bg-center"
            style={{ backgroundImage: `url(${nextSlide.image})` }}
          />
        </button>
      )}

      <div className="relative flex h-full max-w-6xl flex-col justify-between px-6 pb-8 pt-28 mx-auto">
        <AnimatePresence mode="wait">
          <motion.p
            key={slide.intro}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-xs text-sm leading-relaxed text-white/80"
          >
            {slide.intro}
          </motion.p>
        </AnimatePresence>

        {slides.length > 1 && (
          <div className="flex items-center gap-6">
            {slides.map((s, i) => (
              <button
                key={s.image + i}
                onClick={() => setIndex(i)}
                className="flex flex-col items-start gap-2"
              >
                <span
                  className={`text-xs font-semibold tracking-wide ${
                    i === index ? "text-white" : "text-white/50"
                  }`}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="relative h-px w-10 bg-white/25">
                  {i === index && (
                    <motion.span
                      key={index}
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: SLIDE_DURATION_MS / 1000, ease: "linear" }}
                      className="absolute inset-y-0 left-0 bg-accent-amber"
                    />
                  )}
                </span>
              </button>
            ))}
          </div>
        )}

        <div className="flex items-end justify-between gap-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={slide.heading}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-amber">
                {slide.eyebrow}
              </p>
              <h1 className="mt-4 font-heading text-5xl font-semibold leading-[1.1] text-white sm:text-6xl lg:text-7xl">
                <span className="block">{slide.heading}</span>
                <span className="font-serif-accent block italic text-accent-amber">
                  {slide.headingAccent}
                </span>
              </h1>
            </motion.div>
          </AnimatePresence>

          <a
            href="#services"
            className="mb-2 hidden shrink-0 items-center gap-2 text-sm font-semibold uppercase tracking-wide text-white transition hover:text-accent-amber sm:flex"
          >
            Explore Now
            <span aria-hidden>→</span>
          </a>
        </div>
      </div>
    </div>
  );
}
