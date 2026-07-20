"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const SLIDE_DURATION_MS = 4000;
const HOVER_DELAY_MS = 150;
const TRANSITION_MS = 700;
const ITEM_WIDTH = 260;
const ITEM_GAP = 24;

const CATEGORIES = [
  {
    slug: "visiting-cards",
    title: "Visiting Cards",
    description: "Sharp, professional cards that make the first impression count.",
  },
  {
    slug: "letter-heads",
    title: "Letter Heads",
    description: "Branded stationery that carries your identity into every letter.",
  },
  {
    slug: "bill-books",
    title: "Bill Books",
    description: "Durable, sequential bill books built for daily business use.",
  },
  {
    slug: "wedding-cards",
    title: "Wedding Cards",
    description: "Elegant invitations for the biggest celebration on the calendar.",
  },
  {
    slug: "customized-stamps",
    title: "Customized Stamps",
    description: "Precision rubber and self-inking stamps made to your spec.",
  },
  {
    slug: "flyers",
    title: "Flyers",
    description: "Bold, printed flyers that get your message into people's hands.",
  },
  {
    slug: "t-shirts-hoodies",
    title: "T-Shirts & Hoodies",
    description: "Custom apparel printing for teams, events, and brands.",
  },
  {
    slug: "customized-calendars",
    title: "Customized Calendars",
    description: "Year-round branding that hangs on the wall, not in a drawer.",
  },
  {
    slug: "labels-stickers",
    title: "Labels & Stickers",
    description: "Clean-cut labels and stickers for products and packaging.",
  },
  {
    slug: "customized-stationery",
    title: "Customized Stationery",
    description: "Everyday office stationery, printed exactly how you need it.",
  },
  {
    slug: "advertisement-boards-signage-42",
    title: "Advertisement Boards",
    description: "Signage and boards built to hold up outdoors and stand out.",
  },
];

export default function Categories() {
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
    const id = setTimeout(() => {
      if (!pausedRef.current) {
        goTo((index + 1) % CATEGORIES.length);
      }
    }, SLIDE_DURATION_MS);
    return () => clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index]);

  const handleHoverStart = (i: number) => {
    if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
    hoverTimerRef.current = setTimeout(() => goTo(i), HOVER_DELAY_MS);
  };
  const handleHoverEnd = () => {
    if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
  };

  const active = CATEGORIES[index];
  const trackOffset = -(index * (ITEM_WIDTH + ITEM_GAP)) - ITEM_WIDTH / 2;

  return (
    <section
      className="relative z-10 -mt-[100vh] flex h-screen w-full flex-col justify-center overflow-hidden bg-ink py-16"
      onMouseEnter={() => (pausedRef.current = true)}
      onMouseLeave={() => (pausedRef.current = false)}
    >
      <div className="mx-auto w-full max-w-6xl px-6">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-amber">
          Categories
        </p>
        <h2 className="mt-4 font-sans text-4xl font-semibold tracking-tight text-white sm:text-5xl">
          What we print.
        </h2>
      </div>

      <div className="relative mt-12 h-[420px] w-full">
        <motion.div
          className="absolute left-1/2 flex items-center"
          style={{ gap: ITEM_GAP }}
          animate={{ x: trackOffset }}
          transition={{ duration: TRANSITION_MS / 1000, ease: "easeInOut" }}
        >
          {CATEGORIES.map((category, i) => {
            const distance = Math.abs(i - index);
            const isActive = distance === 0;
            const scale = isActive ? 1 : distance === 1 ? 0.82 : 0.68;
            const opacity = isActive ? 1 : distance === 1 ? 0.55 : 0.25;
            const height = isActive ? 420 : distance === 1 ? 320 : 260;

            return (
              <motion.div
                key={category.slug}
                className="relative shrink-0"
                style={{ width: ITEM_WIDTH }}
                animate={{ scale, opacity, height }}
                transition={{ duration: TRANSITION_MS / 1000, ease: "easeInOut" }}
              >
                <button
                  type="button"
                  aria-label={`Show ${category.title}`}
                  onMouseEnter={() => handleHoverStart(i)}
                  onMouseLeave={handleHoverEnd}
                  onFocus={() => handleHoverStart(i)}
                  className="relative block h-full w-full cursor-pointer overflow-hidden"
                >
                  <img
                    src={`https://picsum.photos/seed/${category.slug}/500/700`}
                    alt={category.title}
                    className="h-full w-full object-cover"
                  />
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
            key={active.slug}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <p className="font-sans text-sm font-semibold uppercase tracking-wide text-white">
              {active.title}
            </p>
            <p className="mt-1 max-w-md text-sm text-white/60">{active.description}</p>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
