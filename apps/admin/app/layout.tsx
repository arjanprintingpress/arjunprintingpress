import type { Metadata } from "next";
import { Inter, Poppins, Fraunces } from "next/font/google";
import AdminShell from "@/components/AdminShell";
import { getSectionSubmissions, getSections, type SectionSlug } from "@/lib/api";
import "./globals.css";

const SECTION_SLUGS: SectionSlug[] = ["printing", "mementoes", "corporate-gifts"];

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const poppins = Poppins({
  variable: "--font-poppins",
  weight: ["600", "700"],
  subsets: ["latin"],
});

// Section-picker headline accent only — matches the public site's IntroSequence.
const fraunces = Fraunces({
  variable: "--font-fraunces",
  weight: ["500"],
  style: ["italic"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Arjun Printing Press — Admin",
  description: "Content admin for Arjun Printing Press.",
  robots: { index: false, follow: false },
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const [sections, submissionsBySlug] = await Promise.all([
    getSections(),
    Promise.all(SECTION_SLUGS.map((slug) => getSectionSubmissions(slug))),
  ]);
  const unreadCounts = Object.fromEntries(
    SECTION_SLUGS.map((slug, i) => [slug, submissionsBySlug[i].filter((s) => !s.read).length])
  );

  return (
    <html
      lang="en"
      className={`${inter.variable} ${poppins.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="min-h-screen md:h-screen md:overflow-hidden">
        <AdminShell sections={sections} unreadCounts={unreadCounts}>
          {children}
        </AdminShell>
      </body>
    </html>
  );
}
