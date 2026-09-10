"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  Award,
  Images,
  Inbox,
  Info,
  LayoutGrid,
  LogOut,
  Menu,
  Sparkles,
  X,
} from "lucide-react";
import { ENUM_TO_URL, type Section } from "@/lib/api";
import { Badge } from "@/components/ui";

export default function AdminShell({
  sections,
  unreadCounts,
  children,
}: {
  sections: Section[];
  unreadCounts: Record<string, number>;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  // Close the mobile drawer whenever the route changes.
  useEffect(() => setOpen(false), [pathname]);

  // Scroll-lock + Esc-to-close while the drawer is open (same pattern as web Nav).
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);
  useEffect(() => {
    if (!open) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  // Login page has no shell.
  if (pathname === "/login") return <>{children}</>;

  const sectionMatch = pathname.match(/^\/sections\/([^/]+)/);
  const activeUrlSlug = sectionMatch?.[1];
  const activeSection = activeUrlSlug
    ? sections.find((s) => (ENUM_TO_URL[s.slug] ?? s.slug) === activeUrlSlug)
    : null;

  const unreadTotal = Object.values(unreadCounts).reduce((a, b) => a + b, 0);

  async function handleLogout() {
    await fetch("/api/logout", { method: "POST" });
    router.push("/login");
    router.refresh();
  }

  const navProps = {
    sections,
    unreadCounts,
    pathname,
    activeSection,
    activeUrlSlug,
    onLogout: handleLogout,
  };

  return (
    <div className="flex min-h-screen md:h-screen md:overflow-hidden">
      {/* ponytail: one nav body (SidebarNav), three placements — static aside md+, drawer <md, plus the mobile top bar trigger */}
      <aside className="relative hidden w-64 shrink-0 flex-col overflow-hidden bg-ink md:flex">
        <div className="halftone-bg pointer-events-none absolute inset-0 opacity-[0.12]" />
        <SidebarNav {...navProps} instanceId="desktop" />
      </aside>

      <div className="flex min-w-0 flex-1 flex-col md:overflow-y-auto">
        <header className="sticky top-0 z-30 flex h-14 shrink-0 items-center gap-3 overflow-hidden bg-ink px-4 md:hidden">
          <div className="halftone-bg pointer-events-none absolute inset-0 opacity-[0.12]" />
          <button
            type="button"
            aria-label="Open menu"
            onClick={() => setOpen(true)}
            className="relative -ml-1 flex h-10 w-10 items-center justify-center rounded-lg text-white/80 transition hover:bg-white/10 hover:text-white"
          >
            <Menu className="h-5 w-5" />
            {unreadTotal > 0 && (
              <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-accent-amber" />
            )}
          </button>
          <div className="relative leading-tight">
            <p className="font-heading text-xs font-semibold uppercase tracking-[0.1em] text-white/90">
              Arjun Printing Press
            </p>
            <p className="font-serif-accent text-xs italic text-accent-amber">Admin</p>
          </div>
        </header>

        <main className="min-w-0 flex-1 bg-paper-muted">{children}</main>
      </div>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="fixed inset-0 z-40 bg-ink/60 md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setOpen(false)}
            />
            <motion.aside
              className="fixed inset-y-0 left-0 z-50 flex w-72 max-w-[85vw] flex-col overflow-hidden bg-ink md:hidden"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.28, ease: "easeInOut" }}
            >
              <div className="halftone-bg pointer-events-none absolute inset-0 opacity-[0.12]" />
              <button
                type="button"
                aria-label="Close menu"
                onClick={() => setOpen(false)}
                className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-lg text-white/70 transition hover:bg-white/10 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
              <SidebarNav {...navProps} instanceId="drawer" onNavigate={() => setOpen(false)} />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

function SidebarNav({
  sections: _sections,
  unreadCounts,
  pathname,
  activeSection,
  activeUrlSlug,
  onLogout,
  onNavigate,
  instanceId,
}: {
  sections: Section[];
  unreadCounts: Record<string, number>;
  pathname: string;
  activeSection: Section | null | undefined;
  activeUrlSlug: string | undefined;
  onLogout: () => void;
  onNavigate?: () => void;
  instanceId: string;
}) {
  return (
    <>
      <div className="relative border-b border-white/10 px-6 py-5">
        <p className="font-heading text-sm font-semibold uppercase tracking-[0.1em] text-white/90">
          Arjun Printing Press
        </p>
        <p className="font-serif-accent text-sm italic text-accent-amber">Admin</p>
      </div>

      <nav className="relative flex-1 space-y-1 overflow-y-auto p-3">
        {activeSection ? (
          <>
            <Link
              href="/"
              onClick={onNavigate}
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
              instanceId={instanceId}
              onNavigate={onNavigate}
            >
              Hero Slides
            </SidebarLink>
            <SidebarLink
              href={`/sections/${activeUrlSlug}/categories`}
              active={pathname.endsWith("/categories")}
              icon={Sparkles}
              instanceId={instanceId}
              onNavigate={onNavigate}
            >
              Categories
            </SidebarLink>
            <SidebarLink
              href={`/sections/${activeUrlSlug}/about`}
              active={pathname.endsWith("/about")}
              icon={Info}
              instanceId={instanceId}
              onNavigate={onNavigate}
            >
              About
            </SidebarLink>
            <SidebarLink
              href={`/sections/${activeUrlSlug}/why-choose-us`}
              active={pathname.endsWith("/why-choose-us")}
              icon={Award}
              instanceId={instanceId}
              onNavigate={onNavigate}
            >
              Why Choose Us
            </SidebarLink>
            <SidebarLink
              href={`/sections/${activeUrlSlug}/submissions`}
              active={pathname.endsWith("/submissions")}
              icon={Inbox}
              instanceId={instanceId}
              onNavigate={onNavigate}
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
          <SidebarLink
            href="/"
            active={pathname === "/"}
            icon={LayoutGrid}
            instanceId={instanceId}
            onNavigate={onNavigate}
          >
            Sections
          </SidebarLink>
        )}
      </nav>

      <div className="relative border-t border-white/10 p-3">
        <button
          type="button"
          onClick={onLogout}
          className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-white/55 transition hover:bg-white/10 hover:text-white"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </button>
      </div>
    </>
  );
}

function SidebarLink({
  href,
  active,
  icon: Icon,
  children,
  instanceId,
  onNavigate,
}: {
  href: string;
  active: boolean;
  icon: typeof LayoutGrid;
  children: React.ReactNode;
  instanceId: string;
  onNavigate?: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onNavigate}
      className={`relative flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition ${
        active ? "text-white" : "text-white/55 hover:text-white"
      }`}
    >
      {active && (
        <motion.div
          layoutId={`sidebar-active-pill-${instanceId}`}
          transition={{ type: "spring", stiffness: 500, damping: 40 }}
          className="absolute inset-0 rounded-lg border-l-2 border-accent-amber bg-white/10"
        />
      )}
      <Icon className="relative z-10 h-4 w-4" strokeWidth={1.75} />
      <span className="relative z-10 flex flex-1 items-center">{children}</span>
    </Link>
  );
}
