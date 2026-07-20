"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { sectionHref } from "@/lib/api";
import { useSections } from "@/components/SectionsProvider";

export default function Nav() {
  const pathname = usePathname();
  const sections = useSections();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    function onScroll() {
      const y = window.scrollY;
      setScrolled(y > 24);
      setHidden(y > lastScrollY.current && y > 120);
      lastScrollY.current = y;
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const textColor = scrolled ? "text-ink" : "text-white";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 border-b transition-transform transition-colors duration-300 ${
        hidden ? "-translate-y-full" : "translate-y-0"
      } ${
        scrolled
          ? "border-black/5 bg-paper/95 shadow-sm backdrop-blur"
          : "border-white/15 bg-transparent"
      }`}
    >
      <nav className="relative mx-auto flex max-w-[1600px] items-center px-10 py-5">
        <Link href="/" className="flex items-center gap-3">
          <Image src="/images/logo.png" alt="Arjun Printing Press" width={32} height={32} />
          <span className={`font-heading text-sm font-medium tracking-[0.08em] ${textColor}`}>
            ARJUN PRINTING PRESS
          </span>
        </Link>

        <ul className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 text-base font-normal sm:flex">
          {sections.map((section) => {
            const href = sectionHref(section);
            const active = pathname === href;
            return (
              <li key={section.slug}>
                <Link
                  href={href}
                  className={`transition-colors ${textColor} ${
                    active ? "text-accent-amber" : "hover:text-accent-amber"
                  }`}
                >
                  {section.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className={`ml-auto flex items-center gap-6 ${textColor}`}>
          <button aria-label="Open menu">
            <svg width="22" height="16" viewBox="0 0 18 13" fill="none">
              <path d="M0 1h18M0 6.5h18M0 12h18" stroke="currentColor" strokeWidth="1.3" />
            </svg>
          </button>
        </div>
      </nav>
    </header>
  );
}
