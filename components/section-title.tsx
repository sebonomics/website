"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

const SectionTitleContext = createContext({ title: "Sebastian Tan", setTitle: (_title: string) => {} })

export function SectionTitleProvider({ children }: { children: ReactNode }) {
  const [title, setTitle] = useState("Sebastian Tan")
  return <SectionTitleContext.Provider value={{ title, setTitle }}>{children}</SectionTitleContext.Provider>
}

export function SectionTitle() {
  const { title } = useContext(SectionTitleContext)
  return <span className="flex-1 text-base" aria-live="polite">{title}</span>
}

export function useSectionTitle() {
  return useContext(SectionTitleContext)
}
