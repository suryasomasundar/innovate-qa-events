"use client"

import Link from "next/link"
import { ArrowDown, CalendarClock, PlayCircle, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CountdownTimer } from "@/components/countdown-timer"
import { useRecordingsLaunch } from "@/components/use-recordings-launch"
import homeData from "@/data/home.json"
import { RECORDINGS_URL } from "@/lib/constants"
import { RECORDINGS_LAUNCH_AT } from "@/lib/recordings-launch"

export function RecordingsLaunchHero() {
  const isLaunched = useRecordingsLaunch()

  if (!isLaunched) {
    return (
      <>
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-background/80 px-4 py-2 text-sm font-bold text-primary shadow-sm backdrop-blur">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full rounded-full bg-fuchsia-500 opacity-70 motion-safe:animate-ping" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-primary" />
          </span>
          Recordings premiere August 10
        </div>

        <h1 className="mb-6 text-balance text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
          The conference ended.
          <span className="block bg-gradient-to-r from-primary via-purple-600 to-fuchsia-600 bg-clip-text text-transparent drop-shadow-[0_0_18px_rgba(75,0,130,0.25)]">
            The learning is about to begin.
          </span>
        </h1>

        <p className="mb-8 text-pretty text-lg text-muted-foreground md:text-xl">
          Innovate QA 2026 sessions launch on demand at midnight Pacific Time on August 10.
        </p>

        <div className="mb-8" aria-label="Time until the recordings launch">
          <CountdownTimer targetDate={RECORDINGS_LAUNCH_AT} />
        </div>

        <div className="mx-auto mb-5 grid w-full max-w-3xl grid-cols-1 gap-4 sm:grid-cols-2">
          <Button size="lg" className="h-13 w-full gap-2 px-7 text-base" disabled>
            <CalendarClock className="h-5 w-5" />
            Launches August 10
          </Button>
          <Button size="lg" variant="outline" className="h-13 w-full bg-transparent px-7 text-base" asChild>
            <Link href="#features">
              Explore
              <ArrowDown className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </>
    )
  }

  return (
    <>
      <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-background/80 px-4 py-2 text-sm font-bold text-primary shadow-sm backdrop-blur">
        <span className="relative flex h-2.5 w-2.5">
          <span className="absolute inline-flex h-full w-full rounded-full bg-fuchsia-500 opacity-70 motion-safe:animate-ping" />
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-primary" />
        </span>
        Recordings now live
      </div>

      <h1 className="mb-6 text-balance text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
        {homeData.hero.title.split("Innovate QA")[0]}
        <span className="bg-gradient-to-r from-primary via-purple-600 to-fuchsia-600 bg-clip-text text-transparent drop-shadow-[0_0_18px_rgba(75,0,130,0.25)]">
          Innovate QA
        </span>
        {homeData.hero.title.split("Innovate QA")[1]}
      </h1>

      <p className="mb-10 text-pretty text-lg text-muted-foreground md:text-xl">{homeData.hero.subtitle}</p>

      <div className="mb-6 inline-flex items-center gap-2 text-base font-bold text-primary">
        <Sparkles className="h-5 w-5 motion-safe:animate-pulse" />
        Unlimited viewing
      </div>

      <div className="mx-auto mb-5 grid w-full max-w-3xl grid-cols-1 gap-4 sm:grid-cols-2">
        <Button
          size="lg"
          className="h-13 w-full gap-2 bg-gradient-to-r from-primary via-purple-700 to-fuchsia-600 px-7 text-base shadow-[0_14px_35px_rgba(75,0,130,0.35)] transition-transform hover:scale-[1.03] hover:from-primary hover:via-purple-700 hover:to-fuchsia-500"
          asChild
        >
          <a href={RECORDINGS_URL}>
            <PlayCircle className="h-5 w-5" />
            Watch Recordings
            <Sparkles className="h-4 w-4 motion-safe:animate-pulse" />
          </a>
        </Button>
        <Button size="lg" variant="outline" className="h-13 w-full bg-transparent px-7 text-base" asChild>
          <Link href="#features">
            Explore
            <ArrowDown className="ml-2 h-5 w-5" />
          </Link>
        </Button>
      </div>

      <Link
        href="#testimonials"
        className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-primary/80 hover:underline"
      >
        See what attendees said
        <ArrowDown className="h-4 w-4" />
      </Link>
    </>
  )
}
