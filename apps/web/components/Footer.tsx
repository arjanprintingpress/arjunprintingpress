"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_LINKS } from "@/components/Nav";

const SOCIALS = [
  { label: "Instagram", href: "#" },
  { label: "YouTube", href: "#" },
  { label: "LinkedIn", href: "#" },
];

export default function Footer({ plain = false }: { plain?: boolean }) {
  const pathname = usePathname();
  const sectionRoot = `/${pathname.split("/")[1] ?? ""}`;
  const onSectionRoot = pathname === sectionRoot;

  return (
    <footer className={`bg-paper py-16 ${plain ? "" : "border-t-4 border-ink"}`}>
      <div className="mx-auto grid max-w-[1600px] grid-cols-1 gap-x-16 gap-y-12 px-10 lg:grid-cols-[1fr_auto] lg:items-start">
        <div>
          <p className="font-sans text-xl text-ink/70">
            Quality that outlasts the trend.
            <br />
            Join our newsletter today.
          </p>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="mt-6 flex w-full max-w-md bg-paper-muted p-1"
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

        <ul className="space-y-1">
          <li>
            <Link
              href={sectionRoot}
              onClick={(e) => {
                if (!onSectionRoot) return;
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="font-sans text-3xl font-medium text-ink transition hover:text-accent-amber"
            >
              Home
            </Link>
          </li>
          {NAV_LINKS.map((link) => (
            <li key={link.label}>
              <Link
                href={onSectionRoot ? link.href : `${sectionRoot}${link.href}`}
                className="font-sans text-3xl font-medium text-ink transition hover:text-accent-amber"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

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
    </footer>
  );
}
