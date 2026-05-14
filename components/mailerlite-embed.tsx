"use client"

import { useEffect } from "react"

declare global {
  interface Window {
    ml?: (...args: unknown[]) => void
  }
}

export function MailerLiteEmbed() {
  useEffect(() => {
    if (typeof window !== "undefined" && typeof window.ml === "function") {
      window.ml("render")
    }
  }, [])

  return <div className="ml-embedded" data-form="j8fmQQ" />
}
