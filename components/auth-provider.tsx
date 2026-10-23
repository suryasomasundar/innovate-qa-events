"use client"

import type { ReactNode } from "react"
import { ClerkProvider } from "@clerk/nextjs"

const publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY

export const clerkEnabled = Boolean(publishableKey)

export function AuthProvider({ children }: { children: ReactNode }) {
  if (!publishableKey) return children

  return (
    <ClerkProvider publishableKey={publishableKey} afterSignOutUrl="/community">
      {children}
    </ClerkProvider>
  )
}
