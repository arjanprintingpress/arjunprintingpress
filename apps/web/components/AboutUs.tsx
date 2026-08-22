"use client";

import { motion } from "framer-motion";
import type { AboutContent } from "@/lib/api";

const IMAGE_HEIGHT = 220;
const IMAGE_GAP = 6;

function MarqueeColumn({
  urls,
  direction,
  side,
}: {
  urls: string[];
  direction: "up" | "down";
  side: "left" | "right";
}) {
  if (urls.length === 0) return null;
  const images = [...urls, ...urls];
  const trackHeight = urls.length * (IMAGE_HEIGHT + IMAGE_GAP);

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
        {images.map((url, i) => (
          <img
            key={`${url}-${i}`}
            src={url}
            alt=""
            className="block w-full shrink-0 object-cover"
            style={{ height: IMAGE_HEIGHT }}
          />
        ))}
      </motion.div>
    </div>
  );
}

export default function AboutUs({ about }: { about: AboutContent }) {
  const leftUrls = about.images.filter((i) => i.side === "left").sort((a, b) => a.order - b.order).map((i) => i.url);
  const rightUrls = about.images.filter((i) => i.side === "right").sort((a, b) => a.order - b.order).map((i) => i.url);
  const stats = [...about.stats].sort((a, b) => a.order - b.order);

  return (
    <section id="about" className="relative flex min-h-screen w-full items-center overflow-hidden bg-paper py-24">
      <MarqueeColumn urls={leftUrls} direction="up" side="left" />
      <MarqueeColumn urls={rightUrls} direction="down" side="right" />

      <div className="mx-auto max-w-xl px-6 lg:px-0">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-amber">
          {about.eyebrow}
        </p>
        <h2 className="mt-4 font-sans text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          {about.heading}
        </h2>
        <p className="mt-6 text-ink/60">{about.body}</p>

        <div className="mt-10 flex divide-x divide-black/10">
          {stats.map((stat) => (
            <div key={stat.id} className="flex-1 px-6 first:pl-0">
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
