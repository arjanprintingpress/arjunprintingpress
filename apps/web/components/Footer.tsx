"use client";

import Link from "next/link";
import { sectionHref } from "@/lib/api";
import { useSections } from "@/components/SectionsProvider";

const SOCIALS = [
  { label: "Instagram", href: "#" },
  { label: "YouTube", href: "#" },
  { label: "LinkedIn", href: "#" },
];

export default function Footer() {
  const sections = useSections();

  return (
    <footer className="border-t-4 border-ink bg-paper py-16">
      <div className="mx-auto max-w-[1600px] px-10">
        <div className="flex flex-col gap-16 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <p className="font-sans text-xl text-ink/70">
              Quality that outlasts the trend.
              <br />
              Join our newsletter today.
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="mt-6 flex w-full max-w-4xl bg-paper-muted p-1"
            >
              <input
                type="email"
                placeholder="name@email.com"
                className="w-full bg-transparent px-4 py-2.5 text-lg text-ink placeholder:text-ink/40 focus:outline-none"
              />
              <button
                type="submit"
                className="shrink-0 border border-black/10 bg-paper px-7 py-2.5 text-base font-semibold text-ink shadow-sm transition hover:bg-paper-muted"
              >
                Subscribe
              </button>
            </form>
          </div>

          <div>
            <ul className="space-y-1">
              <li>
                <Link
                  href="/"
                  className="font-sans text-3xl font-medium text-ink transition hover:text-accent-amber"
                >
                  Home
                </Link>
              </li>
              {sections.map((section) => (
                <li key={section.slug}>
                  <Link
                    href={sectionHref(section)}
                    className="font-sans text-3xl font-medium text-ink transition hover:text-accent-amber"
                  >
                    {section.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-between gap-4">
          <div className="flex gap-6">
            {SOCIALS.map((social) => (
              <a
                key={social.label}
                href={social.href}
                className="text-xs font-semibold uppercase tracking-wide text-ink/70 transition hover:text-accent-amber"
              >
                {social.label}
              </a>
            ))}
          </div>
          <p className="text-xs text-ink/50">
            ARJUN PRINTING PRESS. ALL RIGHTS RESERVED.
          </p>
        </div>
      </div>
    </footer>
  );
}
