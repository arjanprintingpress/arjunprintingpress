"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { ArrowRight, Gem, Gift, Printer, Sparkles } from "lucide-react";
import { sectionHref } from "@/lib/api";
import { useSections } from "@/components/SectionsProvider";

type Stage = "intro" | "options" | "done";

const SESSION_KEY = "app-intro-shown";
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

export default function IntroSequence() {
  const router = useRouter();
  const sections = useSections();
  const prefersReducedMotion = useReducedMotion();
  const [stage, setStage] = useState<Stage>("done");
  const [revealPhase, setRevealPhase] = useState<0 | 1 | 2>(0);
  const [chosen, setChosen] = useState<string | null>(null);
  const [activeSlug, setActiveSlug] = useState<string | null>(null);
  const hoverTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (sections.length && activeSlug === null) setActiveSlug(sections[0].slug);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sections]);

  useEffect(() => {
    const saved = sessionStorage.getItem(SESSION_KEY);
    if (saved === "options") {
      setStage("options");
      return;
    }
    if (saved === "done") return;

    sessionStorage.setItem(SESSION_KEY, "intro");
    setStage("intro");

    const timers = [
      setTimeout(() => setRevealPhase(1), 2200),
      setTimeout(() => setRevealPhase(2), 3600),
      setTimeout(() => {
        sessionStorage.setItem(SESSION_KEY, "options");
        setStage("options");
      }, 5400),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  function choose(slug: string, href: string) {
    setChosen(slug);
    setTimeout(() => {
      sessionStorage.setItem(SESSION_KEY, "done");
      setStage("done");
      router.replace(href);
    }, 700);
  }

  function hoverStart(slug: string) {
    if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
    hoverTimerRef.current = setTimeout(() => setActiveSlug(slug), HOVER_DELAY_MS);
  }

  function hoverEnd() {
    if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
  }

  if (stage === "done") return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-[linear-gradient(135deg,#001122_0%,#002244_25%,#003366_50%,#004488_75%,#0055aa_100%)]">
      <div className="intro-orb-a pointer-events-none absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-brand-blue/30 blur-3xl" />
      <div className="intro-orb-b pointer-events-none absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-brand-blue-dark/50 blur-3xl" />
      <div className="intro-dot-grid pointer-events-none absolute inset-0 opacity-40" />
      <AnimatePresence mode="wait">
        {stage === "intro" && (
          <motion.div
            key="intro"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center"
          >
            <motion.div
              animate={{
                y: revealPhase >= 1 && !prefersReducedMotion ? -56 : 0,
                scale: revealPhase >= 1 ? 0.86 : 1,
              }}
              transition={{ type: "spring", stiffness: 90, damping: 16, mass: 1 }}
              className="relative flex items-center justify-center"
            >
              <motion.span
                animate={{ opacity: revealPhase >= 1 ? 0 : 1 }}
                transition={{ duration: 0.8 }}
                className="intro-ring absolute h-36 w-36 rounded-full border-4 border-transparent border-t-brand-blue"
              />
              <Image
                src="/images/logo.png"
                alt="Arjun Printing Press"
                width={120}
                height={120}
                className="intro-logo-img relative"
                priority
              />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, filter: "blur(12px)", y: 24, scale: 0.92 }}
              animate={
                revealPhase >= 1
                  ? { opacity: 1, filter: "blur(0px)", y: 0, scale: 1 }
                  : { opacity: 0, filter: "blur(12px)", y: 24, scale: 0.92 }
              }
              transition={{ duration: 1.1, delay: revealPhase >= 1 ? 0.5 : 0, ease: [0.22, 1, 0.36, 1] }}
              className="mt-6 font-heading text-2xl font-semibold tracking-[0.15em] text-white sm:text-3xl"
            >
              ARJUN PRINTING PRESS
            </motion.p>

            <motion.div
              initial={{ opacity: 0, filter: "blur(12px)", y: 16 }}
              animate={
                revealPhase >= 2
                  ? { opacity: 1, filter: "blur(0px)", y: 0 }
                  : { opacity: 0, filter: "blur(12px)", y: 16 }
              }
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="mt-3 text-xl font-extrabold tracking-[0.3em] text-white/80 [text-shadow:0_0_40px_rgba(0,152,218,0.8)]"
            >
              SINCE 1948
            </motion.div>
          </motion.div>
        )}

        {stage === "options" && (
          <motion.div
            key="options"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 flex flex-col md:flex-row"
          >
            {sections.map((section, i) => {
              const Icon = SERVICE_ICONS[section.slug] ?? Sparkles;
              const { lead, accent } = splitLabel(section.label);
              const image = section.heroSlides?.[0]?.image;
              const isChosen = chosen === section.slug;
              const isDimmed = chosen !== null && !isChosen;
              const isActive = chosen === null && activeSlug === section.slug;
              const transition = {
                duration: prefersReducedMotion ? 0.15 : chosen !== null ? 0.7 : 0.5,
                ease: "easeInOut" as const,
              };

              return (
                <motion.button
                  key={section.slug}
                  type="button"
                  onClick={() => choose(section.slug, sectionHref(section))}
                  onMouseEnter={() => hoverStart(section.slug)}
                  onMouseLeave={hoverEnd}
                  onFocus={() => hoverStart(section.slug)}
                  aria-label={`Go to ${section.label}`}
                  animate={{
                    flexGrow: isChosen ? 6 : isDimmed ? 0.001 : isActive ? 2.2 : 1,
                    opacity: isDimmed ? 0 : 1,
                  }}
                  transition={transition}
                  className="group relative min-h-[30vh] flex-1 cursor-pointer overflow-hidden border-white/10 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-white/80 md:min-h-full md:border-r md:last:border-r-0"
                >
                  {image ? (
                    <motion.img
                      src={image}
                      alt=""
                      animate={{
                        scale: prefersReducedMotion ? 1 : isActive || isChosen ? 1.12 : 1.04,
                      }}
                      transition={transition}
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                  ) : (
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${PANEL_TINTS[i % PANEL_TINTS.length]}`}
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />
                  <div className="absolute inset-0 bg-brand-blue-dark/20" />

                  <span className="absolute left-5 top-5 font-heading text-xs uppercase tracking-[0.3em] text-white/50">
                    0{i + 1}
                  </span>
                  <Icon
                    className="absolute right-5 top-5 h-5 w-5 text-white/70"
                    strokeWidth={1.5}
                  />

                  <div className="absolute inset-x-5 bottom-6 flex flex-col gap-2 md:inset-x-8 md:bottom-8">
                    <span className="font-heading text-2xl font-semibold leading-tight text-white sm:text-3xl md:text-4xl">
                      {lead}{" "}
                      <span className="font-serif-accent italic text-accent-amber">
                        {accent}
                      </span>
                    </span>
                    <motion.div
                      initial={false}
                      animate={{
                        opacity: isActive || isChosen ? 1 : 0,
                        y: isActive || isChosen ? 0 : 8,
                      }}
                      transition={{ duration: 0.3 }}
                      className="flex items-center gap-2 md:max-w-xs"
                    >
                      <p className="hidden text-sm text-white/75 md:block">
                        {section.tagline}
                      </p>
                      <ArrowRight className="h-4 w-4 shrink-0 text-white transition-transform group-hover:translate-x-1" />
                    </motion.div>
                  </div>
                </motion.button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
