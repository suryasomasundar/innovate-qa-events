"use client"

import type { ReactNode } from "react"
import { usePathname } from "next/navigation"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { ScrollToTop } from "@/components/scroll-to-top"

export function SiteShell({ children }: { children: ReactNode }) {
  const ceremony = usePathname()?.replace(/\/$/, "") === "/awards/2027/ceremony"
  return (
    <div className="min-h-screen flex flex-col">
      {!ceremony && <Navigation />}
      <main className="flex-1">{children}</main>
      {!ceremony && <><Footer /><ScrollToTop /></>}
    </div>
  )
}
