"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { sectionHref } from "@/lib/api";
import { useSections } from "@/components/SectionsProvider";

type Stage = "logo" | "year" | "options" | "done";

const SESSION_KEY = "app-intro-shown";

export default function IntroSequence() {
  const router = useRouter();
  const sections = useSections();
  const [stage, setStage] = useState<Stage>("done");
  const [chosen, setChosen] = useState<string | null>(null);

  useEffect(() => {
    if (sessionStorage.getItem(SESSION_KEY)) return;
    sessionStorage.setItem(SESSION_KEY, "1");
    setStage("logo");

    const toYear = setTimeout(() => setStage("year"), 1800);
    const toOptions = setTimeout(() => setStage("options"), 3000);
    return () => {
      clearTimeout(toYear);
      clearTimeout(toOptions);
    };
  }, []);

  function choose(slug: string, href: string) {
    setChosen(slug);
    setTimeout(() => {
      setStage("done");
      router.push(href);
    }, 700);
  }

  if (stage === "done") return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-[linear-gradient(135deg,#001122_0%,#002244_25%,#003366_50%,#004488_75%,#0055aa_100%)]">
      <AnimatePresence mode="wait">
        {stage === "logo" && (
          <motion.div
            key="logo"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.85 }}
            transition={{ duration: 0.5 }}
            className="relative flex items-center justify-center"
          >
            <span className="intro-ring absolute h-36 w-36 rounded-full border-4 border-transparent border-t-brand-blue" />
            <Image
              src="/images/logo.png"
              alt="Arjun Printing Press"
              width={120}
              height={120}
              className="intro-logo-img relative"
              priority
            />
          </motion.div>
        )}

        {stage === "year" && (
          <motion.div
            key="year"
            initial={{ opacity: 0, filter: "blur(8px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, filter: "blur(25px)" }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-extrabold tracking-[0.3em] text-white [text-shadow:0_0_40px_rgba(0,152,218,0.8)]"
          >
            SINCE 1948
          </motion.div>
        )}

        {stage === "options" && (
          <motion.div
            key="options"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-center gap-8"
          >
            <p className="text-sm uppercase tracking-[0.3em] text-white/80">
              Choose Your Service
            </p>
            <div className="flex flex-wrap items-center justify-center gap-8">
              {sections.map((section, i) => (
                <motion.button
                  key={section.slug}
                  onClick={() => choose(section.slug, sectionHref(section))}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    scale: chosen === section.slug ? 1.2 : 1,
                  }}
                  transition={{ delay: i * 0.15, duration: 0.5 }}
                  style={{ animationDelay: `${i * 0.5}s` }}
                  className="service-float flex h-32 w-32 flex-col items-center justify-center gap-1 rounded-full border border-white/20 bg-brand-blue/80 text-center text-xs font-semibold uppercase tracking-wide text-white shadow-lg backdrop-blur transition hover:scale-110 hover:bg-brand-blue"
                >
                  {section.label.split(" ").map((word) => (
                    <span key={word}>{word}</span>
                  ))}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
