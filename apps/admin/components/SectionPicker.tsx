"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Gem, Gift, Printer, Sparkles } from "lucide-react";
import { ENUM_TO_URL, type Section } from "@/lib/api";

const HOVER_DELAY_MS = 90;

const SERVICE_ICONS: Record<string, typeof Printer> = {
  printing: Printer,
  mementoes: Gem,
  corporate_gifts: Gift,
};

const PANEL_TINTS = [
  "from-brand-blue-dark to-brand-blue",
  "from-ink to-brand-blue-dark",
  "from-brand-blue-dark to-ink",
];

function splitLabel(label: string) {
  const words = label.split(" ");
  const accent = words.pop() ?? label;
  return { lead: words.join(" "), accent };
}

export default function SectionPicker({ sections }: { sections: Section[] }) {
  const router = useRouter();
  const prefersReducedMotion = useReducedMotion();
  const [activeSlug, setActiveSlug] = useState<string | null>(null);
  const hoverTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  function hoverStart(slug: string) {
    if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
    hoverTimerRef.current = setTimeout(() => setActiveSlug(slug), HOVER_DELAY_MS);
  }

  function hoverEnd() {
    if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
    setActiveSlug(null);
  }

  return (
    <div className="relative flex min-h-full flex-col overflow-hidden bg-[linear-gradient(135deg,#001122_0%,#002244_25%,#003366_50%,#004488_75%,#0055aa_100%)] md:flex-row">
      <div className="intro-orb-a pointer-events-none absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-brand-blue/30 blur-3xl" />
      <div className="intro-orb-b pointer-events-none absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-brand-blue-dark/50 blur-3xl" />
      <div className="intro-dot-grid pointer-events-none absolute inset-0 opacity-40" />

      {sections.map((section, i) => {
        const Icon = SERVICE_ICONS[section.slug] ?? Sparkles;
        const { lead, accent } = splitLabel(section.label);
        const image = section.heroSlides?.[0]?.image;
        const isActive = activeSlug === section.slug;
        const slideCount = section.heroSlides.length;
        const transition = { duration: prefersReducedMotion ? 0.15 : 0.5, ease: "easeInOut" as const };

        return (
          <motion.button
            key={section.slug}
            type="button"
            onClick={() =>
              router.push(`/sections/${ENUM_TO_URL[section.slug] ?? section.slug}/hero-slides`)
            }
            onMouseEnter={() => hoverStart(section.slug)}
            onMouseLeave={hoverEnd}
            onFocus={() => hoverStart(section.slug)}
            aria-label={`Manage ${section.label}`}
            animate={{ flexGrow: isActive ? 2.2 : 1 }}
            transition={transition}
            className="group relative min-h-[30vh] flex-1 cursor-pointer overflow-hidden border-white/10 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-white/80 md:min-h-full md:border-r md:last:border-r-0"
          >
            {image ? (
              <motion.img
                src={image}
                alt=""
                animate={{ scale: prefersReducedMotion ? 1 : isActive ? 1.12 : 1.04 }}
                transition={transition}
                className="absolute inset-0 h-full w-full object-cover"
              />
            ) : (
              <div className={`absolute inset-0 bg-gradient-to-br ${PANEL_TINTS[i % PANEL_TINTS.length]}`} />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />
            <div className="absolute inset-0 bg-brand-blue-dark/20" />

            <span className="absolute left-5 top-5 font-heading text-xs uppercase tracking-[0.3em] text-white/50">
              0{i + 1}
            </span>
            <div className="absolute right-5 top-5 flex items-center gap-2">
              <span className="rounded-full bg-white/15 px-2.5 py-1 text-xs font-medium text-white/80 backdrop-blur-sm">
                {slideCount} slide{slideCount === 1 ? "" : "s"}
              </span>
              <Icon className="h-5 w-5 text-white/70" strokeWidth={1.5} />
            </div>

            <div className="absolute inset-x-5 bottom-6 flex flex-col gap-2 md:inset-x-8 md:bottom-8">
              <span className="font-heading text-2xl font-semibold leading-tight text-white sm:text-3xl md:text-4xl">
                {lead} <span className="font-serif-accent italic text-accent-amber">{accent}</span>
              </span>
              <motion.div
                initial={false}
                animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 8 }}
                transition={{ duration: 0.3 }}
                className="flex items-center gap-2 md:max-w-xs"
              >
                <p className="hidden text-sm text-white/75 md:block">{section.tagline}</p>
                <ArrowRight className="h-4 w-4 shrink-0 text-white transition-transform group-hover:translate-x-1" />
              </motion.div>
            </div>
          </motion.button>
        );
      })}
    </div>
  );
}
