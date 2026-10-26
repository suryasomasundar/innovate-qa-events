"use client"

import Link from "next/link"
import { Show, SignInButton, UserButton } from "@clerk/react"
import { LogIn, UserRound } from "lucide-react"
import { Button } from "@/components/ui/button"
import { clerkEnabled } from "@/components/auth-provider"

export function MembershipAccess() {
  if (!clerkEnabled) return null

  return (
    <div className="mt-8 border-t border-white/15 pt-7">
      <Show when="signed-out">
        <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
          <span className="text-sm text-purple-200">Already have an Innovate QA account?</span>
          <SignInButton mode="modal" forceRedirectUrl="/member/profile">
            <Button variant="ghost" className="gap-2 text-white hover:bg-white/10 hover:text-white">
              <LogIn className="h-4 w-4" aria-hidden="true" />
              Sign in
            </Button>
          </SignInButton>
        </div>
      </Show>
      <Show when="signed-in">
        <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button asChild variant="outline" className="gap-2 border-white/30 bg-white/5 text-white hover:bg-white/15 hover:text-white">
            <Link href="/member/profile">
              <UserRound className="h-4 w-4" aria-hidden="true" />
              Open my profile
            </Link>
          </Button>
          <UserButton userProfileMode="modal" />
        </div>
      </Show>
    </div>
  )
}
