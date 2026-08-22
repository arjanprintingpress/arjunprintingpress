"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { sectionHref } from "@/lib/api";
import { useSections } from "@/components/SectionsProvider";

export const NAV_LINKS = [
  { label: "About Us", href: "#about" },
  { label: "Categories", href: "#categories" },
  { label: "Contact Us", href: "#contact" },
];

export default function Nav({ light = false }: { light?: boolean }) {
  const pathname = usePathname();
  const sections = useSections();
  const [scrolled, setScrolled] = useState(light);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setMenuOpen(false);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  useEffect(() => {
    function onScroll() {
      const y = window.scrollY;
      setScrolled(light || y > 24);
      setHidden(y > lastScrollY.current && y > 120);
      lastScrollY.current = y;
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const textColor = scrolled ? "text-ink" : "text-white";

  const sectionRoot = `/${pathname.split("/")[1] ?? ""}`;
  const onSectionRoot = pathname === sectionRoot;

  return (
    <>
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-transform transition-colors duration-300 ${
        hidden ? "-translate-y-full" : "translate-y-0"
      } ${
        light
          ? "bg-paper/95 backdrop-blur"
          : scrolled
            ? "border-b border-black/5 bg-paper/95 shadow-sm backdrop-blur"
            : "border-b border-white/15 bg-transparent"
      }`}
    >
      <nav className="relative mx-auto flex max-w-[1600px] items-center px-10 py-7">
        <Link href="/" className="flex items-center gap-3">
          <Image src="/images/logo.png" alt="Arjun Printing Press" width={38} height={38} />
          <span className={`font-heading text-base font-medium tracking-[0.08em] ${textColor}`}>
            ARJUN PRINTING PRESS
          </span>
        </Link>

        <ul className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 text-base font-normal sm:flex">
          <li>
            <Link
              href={sectionRoot}
              onClick={(e) => {
                if (!onSectionRoot) return;
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className={`transition-colors ${textColor} hover:text-accent-amber`}
            >
              Home
            </Link>
          </li>
          {NAV_LINKS.map((link) => (
            <li key={link.label}>
              <Link
                href={onSectionRoot ? link.href : `${sectionRoot}${link.href}`}
                className={`transition-colors ${textColor} hover:text-accent-amber`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className={`ml-auto flex items-center gap-6 ${textColor}`}>
          <button aria-label="Open menu" onClick={() => setMenuOpen(true)}>
            <svg width="22" height="16" viewBox="0 0 18 13" fill="none">
              <path d="M0 1h18M0 6.5h18M0 12h18" stroke="currentColor" strokeWidth="1.3" />
            </svg>
          </button>
        </div>
      </nav>
    </header>

      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-50 bg-ink/60"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setMenuOpen(false)}
            />
            <motion.div
              className="fixed right-0 top-0 z-50 flex h-full w-[320px] flex-col bg-brand-blue-dark px-8 py-6"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <button
                aria-label="Close menu"
                className="ml-auto text-paper"
                onClick={() => setMenuOpen(false)}
              >
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path
                    d="M1 1l16 16M17 1L1 17"
                    stroke="currentColor"
                    strokeWidth="1.3"
                  />
                </svg>
              </button>

              <ul className="mt-12 flex flex-col gap-8 text-lg font-normal">
                {sections.map((section) => {
                  const href = sectionHref(section);
                  const active = pathname === href;
                  return (
                    <li key={section.slug}>
                      <Link
                        href={href}
                        onClick={() => setMenuOpen(false)}
                        className={`text-paper transition-colors ${
                          active ? "text-accent-amber" : "hover:text-accent-amber"
                        }`}
                      >
                        {section.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
