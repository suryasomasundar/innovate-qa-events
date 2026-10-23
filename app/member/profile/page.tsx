import type { Metadata } from "next"
import { MemberProfileForm } from "@/components/member-profile-form"

export const metadata: Metadata = {
  title: "Member Profile | Innovate QA",
  description: "Create and manage your Innovate QA community member profile.",
}

export default function MemberProfilePage() {
  return (
    <main className="min-h-screen bg-muted/25 py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="mx-auto mb-9 max-w-3xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-primary">Free community membership</p>
          <h1 className="mt-3 text-4xl font-bold md:text-5xl">Your member profile</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Keep your interests and professional details current so Innovate QA can connect you with relevant people, events, and opportunities.
          </p>
        </div>
        <MemberProfileForm />
      </div>
    </main>
  )
}
