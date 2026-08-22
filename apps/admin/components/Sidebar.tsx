"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, Award, Images, Inbox, Info, LayoutGrid, LogOut, Sparkles } from "lucide-react";
import { ENUM_TO_URL, type Section } from "@/lib/api";
import { Badge } from "@/components/ui";

export default function Sidebar({
  sections,
  unreadCounts,
}: {
  sections: Section[];
  unreadCounts: Record<string, number>;
}) {
  const pathname = usePathname();
  const router = useRouter();

  if (pathname === "/login") return null;

  const sectionMatch = pathname.match(/^\/sections\/([^/]+)/);
  const activeUrlSlug = sectionMatch?.[1];
  const activeSection = activeUrlSlug
    ? sections.find((s) => (ENUM_TO_URL[s.slug] ?? s.slug) === activeUrlSlug)
    : null;

  async function handleLogout() {
    await fetch("/api/logout", { method: "POST" });
    router.push("/login");
    router.refresh();
  }

  return (
    <aside className="relative flex w-64 shrink-0 flex-col overflow-hidden bg-ink">
      <div className="halftone-bg pointer-events-none absolute inset-0 opacity-[0.12]" />

      <div className="relative border-b border-white/10 px-6 py-5">
        <p className="font-heading text-sm font-semibold uppercase tracking-[0.1em] text-white/90">
          Arjun Printing Press
        </p>
        <p className="font-serif-accent text-sm italic text-accent-amber">Admin</p>
      </div>

      <nav className="relative flex-1 space-y-1 p-3">
        {activeSection ? (
          <>
            <Link
              href="/"
              className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm text-white/55 transition hover:bg-white/5 hover:text-white"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              All sections
            </Link>
            <p className="px-3 pb-1 pt-3 text-xs font-semibold uppercase tracking-wide text-white/35">
              {activeSection.label}
            </p>
            <SidebarLink
              href={`/sections/${activeUrlSlug}/hero-slides`}
              active={pathname.endsWith("/hero-slides")}
              icon={Images}
            >
              Hero Slides
            </SidebarLink>
            <SidebarLink
              href={`/sections/${activeUrlSlug}/categories`}
              active={pathname.endsWith("/categories")}
              icon={Sparkles}
            >
              Categories
            </SidebarLink>
            <SidebarLink
              href={`/sections/${activeUrlSlug}/about`}
              active={pathname.endsWith("/about")}
              icon={Info}
            >
              About
            </SidebarLink>
            <SidebarLink
              href={`/sections/${activeUrlSlug}/why-choose-us`}
              active={pathname.endsWith("/why-choose-us")}
              icon={Award}
            >
              Why Choose Us
            </SidebarLink>
            <SidebarLink
              href={`/sections/${activeUrlSlug}/submissions`}
              active={pathname.endsWith("/submissions")}
              icon={Inbox}
            >
              <span className="flex flex-1 items-center justify-between">
                Submissions
                {(unreadCounts[activeUrlSlug!] ?? 0) > 0 && (
                  <Badge variant="amber">{unreadCounts[activeUrlSlug!]}</Badge>
                )}
              </span>
            </SidebarLink>
          </>
        ) : (
          <SidebarLink href="/" active={pathname === "/"} icon={LayoutGrid}>
            Sections
          </SidebarLink>
        )}
      </nav>

      <div className="relative border-t border-white/10 p-3">
        <button
          type="button"
          onClick={handleLogout}
          className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-white/55 transition hover:bg-white/10 hover:text-white"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </button>
      </div>
    </aside>
  );
}

function SidebarLink({
  href,
  active,
  icon: Icon,
  children,
}: {
  href: string;
  active: boolean;
  icon: typeof LayoutGrid;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={`relative flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition ${
        active ? "text-white" : "text-white/55 hover:text-white"
      }`}
    >
      {active && (
        <motion.div
          layoutId="sidebar-active-pill"
          transition={{ type: "spring", stiffness: 500, damping: 40 }}
          className="absolute inset-0 rounded-lg border-l-2 border-accent-amber bg-white/10"
        />
      )}
      <Icon className="relative z-10 h-4 w-4" strokeWidth={1.75} />
      <span className="relative z-10 flex flex-1 items-center">{children}</span>
    </Link>
  );
}
