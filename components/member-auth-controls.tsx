"use client"

import Link from "next/link"
import { Show, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs"
import { LogIn, UserRoundPlus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { clerkEnabled } from "@/components/auth-provider"

export function MemberAuthControls({ mobile = false }: { mobile?: boolean }) {
  if (!clerkEnabled) {
    return (
      <Button asChild variant="outline" className={mobile ? "w-full gap-2" : "gap-2"}>
        <a href="/community#join">
          <UserRoundPlus className="h-4 w-4" aria-hidden="true" />
          Join Free
        </a>
      </Button>
    )
  }

  return (
    <>
      <Show when="signed-out">
        <SignInButton mode="modal">
          <Button variant="ghost" className={mobile ? "w-full gap-2" : "gap-2"}>
            <LogIn className="h-4 w-4" aria-hidden="true" />
            Sign in
          </Button>
        </SignInButton>
        <SignUpButton mode="modal" forceRedirectUrl="/member/profile">
          <Button variant="outline" className={mobile ? "w-full gap-2" : "gap-2"}>
            <UserRoundPlus className="h-4 w-4" aria-hidden="true" />
            Join Free
          </Button>
        </SignUpButton>
      </Show>
      <Show when="signed-in">
        <Button asChild variant="outline" className={mobile ? "w-full" : ""}>
          <Link href="/member/profile">My Profile</Link>
        </Button>
        <div className={mobile ? "flex justify-center py-2" : "flex items-center"}>
          <UserButton userProfileMode="modal" />
        </div>
      </Show>
    </>
  )
}
