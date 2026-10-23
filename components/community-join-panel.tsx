"use client"

import Link from "next/link"
import { Show, SignInButton, SignUpButton } from "@clerk/nextjs"
import { ArrowRight, CheckCircle2, LogIn, UserRoundPlus } from "lucide-react"
import { clerkEnabled } from "@/components/auth-provider"
import { Button } from "@/components/ui/button"
import { MailerLiteEmbed } from "@/components/mailerlite-embed"

function ClerkJoinActions() {
  return (
    <div className="rounded-2xl border border-white/15 bg-white p-6 text-foreground shadow-2xl sm:p-8">
      <Show when="signed-out">
        <div className="text-center">
          <UserRoundPlus className="mx-auto h-9 w-9 text-primary" aria-hidden="true" />
          <h3 className="mt-4 text-xl font-semibold">Create your free member account</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Sign up with Google or email. It takes less than a minute.
          </p>
          <SignUpButton mode="modal" forceRedirectUrl="/member/profile">
            <Button size="lg" className="mt-6 w-full gap-2">
              Join free <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Button>
          </SignUpButton>
          <SignInButton mode="modal" forceRedirectUrl="/member/profile">
            <button className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline">
              <LogIn className="h-4 w-4" aria-hidden="true" />
              Already a member? Sign in
            </button>
          </SignInButton>
        </div>
      </Show>
      <Show when="signed-in">
        <div className="text-center">
          <CheckCircle2 className="mx-auto h-10 w-10 text-emerald-600" aria-hidden="true" />
          <h3 className="mt-4 text-xl font-semibold">You&apos;re part of the community</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Complete or update your member profile so we can make events and opportunities more relevant.
          </p>
          <Button asChild size="lg" className="mt-6 w-full">
            <Link href="/member/profile">Manage my profile</Link>
          </Button>
        </div>
      </Show>
    </div>
  )
}

export function CommunityJoinPanel() {
  if (!clerkEnabled) {
    return (
      <div className="rounded-2xl border border-white/15 bg-white p-5 text-left text-foreground shadow-2xl sm:p-7">
        <div className="mb-5 text-center">
          <h3 className="text-lg font-semibold">Join the beta waitlist</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Member accounts activate when Clerk keys are connected to this site.
          </p>
        </div>
        <MailerLiteEmbed />
      </div>
    )
  }

  return <ClerkJoinActions />
}
