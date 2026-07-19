"use client";

import { createContext, useContext } from "react";
import type { Section } from "@/lib/api";

const SectionsContext = createContext<Section[]>([]);

export function SectionsProvider({
  sections,
  children,
}: {
  sections: Section[];
  children: React.ReactNode;
}) {
  return <SectionsContext.Provider value={sections}>{children}</SectionsContext.Provider>;
}

export function useSections() {
  return useContext(SectionsContext);
}
