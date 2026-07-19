import type { Metadata } from "next";
import { Inter, Poppins, Fraunces } from "next/font/google";
import IntroSequence from "@/components/IntroSequence";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  weight: ["500", "600", "700", "800"],
  subsets: ["latin"],
});

// Hero headline accent only — Poppins/Inter remain the fixed site typography.
const fraunces = Fraunces({
  variable: "--font-fraunces",
  weight: ["500"],
  style: ["italic"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Arjun Printing Press — Since 1948",
  description:
    "Printing services, mementoes, and corporate gifts from Arjun Printing Press.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${poppins.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <IntroSequence />
        {children}
      </body>
    </html>
  );
}
