"use client";

import { motion } from "framer-motion";
import { Award, Clock, Palette, ShieldCheck, Truck, Star, Users, Heart, type LucideIcon } from "lucide-react";
import type { WhyChooseContent } from "@/lib/api";

const ICON_MAP: Record<string, LucideIcon> = {
  Award,
  Clock,
  Palette,
  ShieldCheck,
  Truck,
  Star,
  Users,
  Heart,
};

function RegistrationMark({ className }: { className: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
    >
      <circle cx="12" cy="12" r="6" />
      <path d="M12 0v24M0 12h24" />
    </svg>
  );
}

export default function WhyChooseUs({ data }: { data: WhyChooseContent }) {
  const features = [...data.features].sort((a, b) => a.order - b.order);

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-ink py-16 sm:py-28">
      {/* halftone / press texture */}
      <div className="halftone-bg pointer-events-none absolute inset-0 opacity-[0.15]" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ink via-transparent to-ink" />

      {/* registration / crop marks, printer's-plate motif */}
      <RegistrationMark className="pointer-events-none absolute left-6 top-6 h-6 w-6 text-white/20 md:left-10 md:top-10" />
      <RegistrationMark className="pointer-events-none absolute bottom-6 right-6 h-6 w-6 text-white/20 md:bottom-10 md:right-10" />
      <span className="pointer-events-none absolute right-6 top-6 font-mono text-[10px] uppercase tracking-[0.3em] text-white/25 md:right-10 md:top-10">
        Plate 04 / CMYK
      </span>

      <div className="relative mx-auto grid max-w-[1600px] grid-cols-1 gap-16 px-4 sm:px-6 lg:grid-cols-[minmax(0,320px)_1fr] lg:gap-24 lg:px-10">
        {/* left: sticky editorial heading */}
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="lg:sticky lg:top-32 lg:self-start"
        >
          <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.35em] text-accent-amber">
            <span className="h-px w-8 bg-accent-amber" />
            {data.eyebrow}
          </p>
          <h2 className="mt-6 font-heading text-4xl font-semibold leading-[1.05] tracking-tight text-white sm:text-5xl">
            {data.headingPrefix}
            <br />
            <span className="font-serif-accent italic text-accent-amber">{data.headingAccent}</span>
            {data.headingSuffix}
          </h2>
          <p className="mt-6 max-w-xs text-sm leading-relaxed text-white/50">{data.intro}</p>
        </motion.div>

        {/* right: numbered editorial rows */}
        <div className="border-t border-white/10">
          {features.map((feature, i) => {
            const Icon = ICON_MAP[feature.icon] ?? Award;
            return (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, ease: "easeOut", delay: i * 0.08 }}
                className="group relative grid grid-cols-[auto_1fr_auto] items-center gap-6 border-b border-white/10 py-8 transition-colors hover:bg-white/[0.03] sm:py-10"
              >
                <span className="font-serif-accent text-4xl italic text-white/15 transition-colors group-hover:text-accent-amber/60 sm:text-5xl">
                  {String(i + 1).padStart(2, "0")}
                </span>

                <div className="min-w-0">
                  <h3 className="font-heading text-lg font-semibold text-white sm:text-xl">
                    {feature.title}
                  </h3>
                  <p className="mt-2 max-w-md text-sm leading-relaxed text-white/50">
                    {feature.description}
                  </p>
                </div>

                <Icon
                  strokeWidth={1.25}
                  className="hidden h-[30px] w-[30px] shrink-0 text-white/25 transition-colors group-hover:text-accent-amber sm:block"
                />

                <span className="pointer-events-none absolute bottom-0 left-0 h-px w-0 bg-accent-amber transition-all duration-500 group-hover:w-full" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
