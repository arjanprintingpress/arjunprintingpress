"use client";

import { motion } from "framer-motion";

const STATS = [
  { value: "75+", label: "Years Experience" },
  { value: "10,000+", label: "Happy Customers" },
  { value: "50,000+", label: "Projects Completed" },
];

const LEFT_SEEDS = ["about-l1", "about-l2", "about-l3", "about-l4", "about-l5"];
const RIGHT_SEEDS = ["about-r1", "about-r2", "about-r3", "about-r4", "about-r5"];

const IMAGE_HEIGHT = 220;
const IMAGE_GAP = 6;

function MarqueeColumn({
  seeds,
  direction,
  side,
}: {
  seeds: string[];
  direction: "up" | "down";
  side: "left" | "right";
}) {
  const images = [...seeds, ...seeds];
  const trackHeight = seeds.length * (IMAGE_HEIGHT + IMAGE_GAP);

  return (
    <div
      className={`absolute top-0 hidden h-full w-[260px] overflow-hidden lg:block ${
        side === "left" ? "left-0" : "right-0"
      }`}
      style={{
        maskImage:
          "linear-gradient(to bottom, transparent, black 6%, black 94%, transparent)",
        WebkitMaskImage:
          "linear-gradient(to bottom, transparent, black 6%, black 94%, transparent)",
      }}
    >
      <motion.div
        className="flex flex-col"
        style={{ gap: IMAGE_GAP }}
        animate={{ y: direction === "up" ? [0, -trackHeight] : [-trackHeight, 0] }}
        transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
      >
        {images.map((seed, i) => (
          <img
            key={`${seed}-${i}`}
            src={`https://picsum.photos/seed/${seed}/400/${IMAGE_HEIGHT}`}
            alt=""
            className="block w-full shrink-0 object-cover"
            style={{ height: IMAGE_HEIGHT }}
          />
        ))}
      </motion.div>
    </div>
  );
}

export default function AboutUs() {
  return (
    <section className="relative flex min-h-screen w-full items-center overflow-hidden bg-paper py-24">
      <MarqueeColumn seeds={LEFT_SEEDS} direction="up" side="left" />
      <MarqueeColumn seeds={RIGHT_SEEDS} direction="down" side="right" />

      <div className="mx-auto max-w-xl px-6 lg:px-0">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-amber">
          About Us
        </p>
        <h2 className="mt-4 font-sans text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          About Arjun Printing Press
        </h2>
        <p className="mt-6 text-ink/60">
          With over 75 years of experience in the printing industry, we have been
          serving businesses and individuals with high-quality printing solutions.
          Our commitment to excellence and customer satisfaction has made us a
          trusted name in the industry.
        </p>

        <div className="mt-10 flex divide-x divide-black/10">
          {STATS.map((stat) => (
            <div key={stat.label} className="flex-1 px-6 first:pl-0">
              <p className="font-sans text-3xl font-semibold tracking-tight text-ink">
                {stat.value}
              </p>
              <p className="mt-1 text-xs uppercase tracking-wide text-ink/50">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
