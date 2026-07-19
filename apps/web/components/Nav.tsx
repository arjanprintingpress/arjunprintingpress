"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { sectionList } from "@/content/sections";

export default function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 24);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const textColor = scrolled ? "text-ink" : "text-white";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 border-b transition-colors duration-300 ${
        scrolled
          ? "border-black/5 bg-paper/95 shadow-sm backdrop-blur"
          : "border-white/15 bg-transparent"
      }`}
    >
      <nav className="mx-auto grid max-w-6xl grid-cols-[auto_1fr_auto] items-center gap-8 px-6 py-3.5">
        <div className="flex items-center gap-4">
          <button aria-label="Open menu" className={textColor}>
            <svg width="18" height="13" viewBox="0 0 18 13" fill="none">
              <path d="M0 1h18M0 6.5h18M0 12h18" stroke="currentColor" strokeWidth="1.3" />
            </svg>
          </button>
          <Link href="/" className="flex items-center gap-2">
            <Image src="/images/logo.png" alt="Arjun Printing Press" width={24} height={24} />
            <span className={`font-heading text-xs font-medium tracking-[0.08em] ${textColor}`}>
              ARJUN PRINTING PRESS
            </span>
          </Link>
        </div>

        <ul className="hidden items-center gap-8 text-sm font-normal sm:flex">
          {sectionList.map((section) => {
            const href = `/${section.slug}`;
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

        <div className={`flex items-center gap-6 justify-self-end ${textColor}`}>
          <button aria-label="Search">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.5" />
              <path d="M13 13l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
          <a href="#contact" aria-label="Contact">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <circle cx="9" cy="6" r="3.5" stroke="currentColor" strokeWidth="1.5" />
              <path
                d="M2.5 16c1-3.5 4-5 6.5-5s5.5 1.5 6.5 5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </a>
        </div>
      </nav>
    </header>
  );
}
