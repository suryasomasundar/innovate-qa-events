import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, Bell, Sparkles, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { MembershipAccess } from "@/components/membership-access"

export const metadata: Metadata = {
  title: "Innovate QA Membership | Coming Soon",
  description:
    "Innovate QA Membership is coming soon—a year-round community for quality professionals to connect, learn, and grow.",
}

export default function CommunityPage() {
  return (
    <main className="relative flex min-h-[calc(100vh-5rem)] items-center overflow-hidden bg-[radial-gradient(circle_at_20%_20%,rgba(217,70,239,0.24),transparent_32%),linear-gradient(135deg,#21053f_0%,#4b0b78_52%,#27114f_100%)] px-4 py-20 text-white">
      <div className="absolute inset-0 bg-[url('/abstract-purple-tech-pattern.png')] bg-cover bg-center opacity-[0.07]" />
      <div className="container relative mx-auto">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-white/20 bg-white/10 shadow-xl backdrop-blur">
            <Users className="h-8 w-8 text-fuchsia-200" aria-hidden="true" />
          </div>
          <div className="mt-7 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold backdrop-blur">
            <Sparkles className="h-4 w-4" aria-hidden="true" />
            Something useful is taking shape
          </div>
          <h1 className="mt-6 text-balance text-4xl font-bold tracking-tight md:text-6xl lg:text-7xl">
            Innovate QA Membership is coming soon.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-purple-100 md:text-xl">
            We are building a year-round home for quality professionals to connect, learn from practitioners, and grow
            together. More details will be shared soon.
          </p>
          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <Button asChild size="lg" className="h-12 bg-white px-7 text-base font-semibold text-purple-950 hover:bg-purple-50">
              <Link href="/#newsletter">
                <Bell className="mr-2 h-4 w-4" aria-hidden="true" /> Get membership updates
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="h-12 border-white/35 bg-white/5 px-7 text-base text-white hover:bg-white/15 hover:text-white">
              <Link href="/podcast">
                Explore the podcast <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
              </Link>
            </Button>
          </div>
          <p className="mt-5 text-sm text-purple-200">No payment or membership signup is available yet.</p>
          <MembershipAccess />
        </div>
      </div>
    </main>
  )
}
