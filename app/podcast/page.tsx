import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import {
  ArrowRight,
  BriefcaseBusiness,
  ExternalLink,
  HeartHandshake,
  Mic2,
  Sparkles,
  Users,
  Youtube,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { PodcastPlaylist } from "@/components/podcast-playlist"

const channelUrl = "https://www.youtube.com/@InnovateQAEvents?sub_confirmation=1"
const playlistId = "PLZWbkptMHzKw"
const playlistUrl = `https://www.youtube.com/playlist?list=${playlistId}`

export const metadata: Metadata = {
  title: "Innovate QA Stories | People, Connections & Belonging",
  description:
    "Personal stories from the speakers, attendees, volunteers, and community members who make Innovate QA special.",
  alternates: { canonical: "https://innovateqaevents.com/podcast/" },
}

const storyThemes = [
  {
    icon: BriefcaseBusiness,
    label: "Career journeys",
    description: "The turning points, challenges, and opportunities that shaped each guest's path.",
  },
  {
    icon: Sparkles,
    label: "Lessons learned",
    description: "Honest reflections and practical lessons from people across the quality community.",
  },
  {
    icon: HeartHandshake,
    label: "Connection & belonging",
    description: "How community helps people find confidence, friendship, and their next opportunity.",
  },
]

export default function PodcastPage() {
  return (
    <main className="min-h-screen bg-background">
      <section className="relative overflow-hidden border-b bg-[radial-gradient(circle_at_82%_20%,rgba(217,70,239,0.28),transparent_28%),linear-gradient(135deg,#21053f_0%,#4b0b78_52%,#27114f_100%)] text-white">
        <div className="absolute inset-0 bg-[url('/abstract-purple-tech-pattern.png')] bg-cover bg-center opacity-[0.07]" />
        <div className="container relative mx-auto grid items-center gap-12 px-4 py-20 md:py-28 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="max-w-3xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold backdrop-blur">
              <Mic2 className="h-4 w-4" aria-hidden="true" />
              A podcast hosted by Tatyana Arbouzova
            </div>
            <h1 className="text-balance text-4xl font-bold tracking-tight md:text-6xl lg:text-7xl">
              People. Connections. Belonging.
            </h1>
            <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-purple-100 md:text-xl">
              Welcome to Innovate QA Stories—a podcast about the people, experiences, and connections that make the
              quality engineering community special.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" className="h-12 bg-white px-7 text-base font-semibold text-purple-950 hover:bg-purple-50">
                <a href={playlistUrl} target="_blank" rel="noreferrer">
                  <Youtube className="mr-2 h-5 w-5" aria-hidden="true" /> Open podcast playlist
                </a>
              </Button>
              <Button asChild size="lg" variant="outline" className="h-12 border-white/35 bg-white/5 px-7 text-base text-white hover:bg-white/15 hover:text-white">
                <a href="#episodes">Explore the series</a>
              </Button>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-md">
            <div className="absolute -inset-5 rounded-[2rem] bg-fuchsia-400/25 blur-2xl" />
            <div className="relative overflow-hidden rounded-[2rem] border border-white/15 bg-white/10 p-3 shadow-2xl backdrop-blur">
              <Image
                src="/tatyana.jpg"
                alt="Tatyana Arbouzova, host of Innovate QA Stories"
                width={800}
                height={800}
                priority
                className="aspect-square w-full rounded-[1.45rem] object-cover"
              />
              <div className="absolute inset-x-3 bottom-3 rounded-b-[1.45rem] bg-gradient-to-t from-black/90 via-black/55 to-transparent px-5 pb-5 pt-24">
                <div className="flex items-end gap-4">
                  <Image
                    src="/innovate-qa-stories-podcast.jpg"
                    alt="Innovate QA Stories podcast logo"
                    width={96}
                    height={96}
                    className="h-20 w-20 shrink-0 rounded-2xl border-2 border-white bg-white object-cover shadow-lg"
                  />
                  <div className="pb-1">
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-fuchsia-200">Your host</p>
                    <p className="mt-1 text-xl font-bold">Tatyana Arbouzova</p>
                    <p className="text-sm text-white/75">Founder, Innovate QA</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b bg-purple-50/70 py-8 dark:bg-purple-950/20">
        <div className="container mx-auto grid gap-6 px-4 md:grid-cols-3">
          {storyThemes.map((theme) => (
            <div key={theme.label} className="flex gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-primary shadow-sm dark:bg-card">
                <theme.icon className="h-5 w-5" aria-hidden="true" />
              </div>
              <div>
                <h2 className="font-semibold text-purple-950 dark:text-purple-100">{theme.label}</h2>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{theme.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="episodes" className="scroll-mt-24 py-18 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-primary">The new podcast</p>
              <h2 className="text-balance text-3xl font-bold md:text-5xl">The first stories are on the way.</h2>
              <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
                New episodes will appear here automatically as they are published to the official Innovate QA Stories
                playlist. Follow the playlist on YouTube to find each new story.
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Button asChild>
                  <a href={playlistUrl} target="_blank" rel="noreferrer">
                    Open podcast playlist <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                  </a>
                </Button>
                <Button asChild variant="outline">
                  <a href={channelUrl} target="_blank" rel="noreferrer">
                    Subscribe to the channel <ExternalLink className="ml-2 h-4 w-4" aria-hidden="true" />
                  </a>
                </Button>
              </div>
            </div>
            <PodcastPlaylist />
          </div>
        </div>
      </section>

      <section className="bg-muted/35 py-18 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <div className="rounded-[2rem] border bg-background p-7 shadow-sm md:p-10">
              <Users className="h-10 w-10 text-primary" aria-hidden="true" />
              <h2 className="mt-5 text-balance text-3xl font-bold md:text-4xl">More than a conference.</h2>
              <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
                Conferences create memorable sessions, but some of the most meaningful moments happen outside the
                agenda—a conversation that becomes a friendship, a connection that opens a door, or an experience that
                gives someone confidence to take the next step.
              </p>
            </div>
            <div>
              <p className="text-lg leading-relaxed text-muted-foreground">
                Hosted by Tatyana Arbouzova, founder of Innovate QA, this podcast shares the personal stories of our
                speakers, attendees, volunteers, and community members.
              </p>
              <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
                We explore their career journeys, challenges, lessons learned, and how professional communities helped
                them grow, find opportunities, and build lasting relationships.
              </p>
              <p className="mt-6 text-xl font-semibold text-purple-950 dark:text-purple-100">
                Innovate QA is a community where you can find your people.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-18 md:py-24">
        <div className="container mx-auto px-4">
          <div
            className="mx-auto max-w-5xl overflow-hidden rounded-[2rem] px-6 py-12 text-center text-white shadow-xl md:px-12 md:py-16"
            style={{ background: "linear-gradient(135deg, #3b0764 0%, #581c87 55%, #701a75 100%)" }}
          >
            <Mic2 className="mx-auto h-10 w-10 text-fuchsia-200" aria-hidden="true" />
            <h2 className="mt-5 text-balance text-3xl font-bold md:text-5xl">Have a story the community needs?</h2>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-purple-100">
              Share a meaningful career experience, community connection, challenge, or lesson that could help another
              quality professional take their next step.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Button asChild size="lg" className="bg-white text-purple-950 hover:bg-purple-50">
                <a href="mailto:info@innovateqaevents.com?subject=Innovate%20QA%20Stories%20Guest">
                  Pitch your story <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                </a>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white/30 bg-white/5 text-white hover:bg-white/15 hover:text-white">
                <Link href="/community">Explore membership</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
