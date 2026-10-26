import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import {
  ArrowRight,
  BrainCircuit,
  BriefcaseBusiness,
  ExternalLink,
  Mic2,
  Play,
  Quote,
  Sparkles,
  Youtube,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { PodcastLibrary } from "@/components/podcast-library"

const channelUrl = "https://www.youtube.com/@InnovateQAEvents/podcasts"
const playlistUrl = "https://www.youtube.com/playlist?list=PLKkqQ3Fvc0U3J4-WQEq5EJJqwy_fVpoNP"

export const metadata: Metadata = {
  title: "Innovate QA Podcast | Real Conversations About Quality",
  description:
    "Watch practical conversations with QA practitioners and engineering leaders about AI, quality engineering, testing, leadership, and career growth.",
  alternates: { canonical: "https://innovateqaevents.com/podcast/" },
}

const focusAreas = [
  {
    icon: BrainCircuit,
    label: "AI & modern testing",
    description: "Where AI helps, where it fails, and how quality teams are adapting.",
  },
  {
    icon: Sparkles,
    label: "Quality engineering",
    description: "Practical systems, tools, and lessons from people doing the work.",
  },
  {
    icon: BriefcaseBusiness,
    label: "Leadership & careers",
    description: "Honest paths into influence, management, and meaningful career growth.",
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
              Innovate QA Podcast
            </div>
            <h1 className="text-balance text-4xl font-bold tracking-tight md:text-6xl lg:text-7xl">
              Real conversations about what quality looks like next.
            </h1>
            <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-purple-100 md:text-xl">
              Learn from practitioners and engineering leaders navigating AI, testing, quality strategy, leadership,
              and career growth—without the polished sales pitch.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" className="h-12 bg-white px-7 text-base font-semibold text-purple-950 hover:bg-purple-50">
                <a href="#episodes">
                  <Play className="mr-2 h-4 w-4 fill-current" aria-hidden="true" /> Watch episodes
                </a>
              </Button>
              <Button asChild size="lg" variant="outline" className="h-12 border-white/35 bg-white/5 px-7 text-base text-white hover:bg-white/15 hover:text-white">
                <a href={channelUrl} target="_blank" rel="noreferrer">
                  <Youtube className="mr-2 h-5 w-5" aria-hidden="true" /> Subscribe on YouTube
                </a>
              </Button>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-md">
            <div className="absolute -inset-5 rounded-[2rem] bg-fuchsia-400/20 blur-2xl" />
            <div className="relative overflow-hidden rounded-[2rem] border border-white/15 bg-white/10 p-3 shadow-2xl backdrop-blur">
              <Image
                src="/tatyana.jpg"
                alt="Tatyana Arbouzova, host of the Innovate QA Podcast"
                width={800}
                height={800}
                priority
                className="aspect-square w-full rounded-[1.45rem] object-cover"
              />
              <div className="absolute inset-x-3 bottom-3 rounded-b-[1.45rem] bg-gradient-to-t from-black/90 via-black/55 to-transparent px-6 pb-5 pt-20">
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-fuchsia-200">Your host</p>
                <p className="mt-1 text-2xl font-bold">Tatyana Arbouzova</p>
                <p className="mt-1 text-sm text-white/75">Founder, Innovate QA</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b bg-purple-50/70 py-8 dark:bg-purple-950/20">
        <div className="container mx-auto grid gap-6 px-4 md:grid-cols-3">
          {focusAreas.map((area) => (
            <div key={area.label} className="flex gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-primary shadow-sm dark:bg-card">
                <area.icon className="h-5 w-5" aria-hidden="true" />
              </div>
              <div>
                <h2 className="font-semibold text-purple-950 dark:text-purple-100">{area.label}</h2>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{area.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="episodes" className="scroll-mt-24 py-18 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto mb-10 flex max-w-6xl flex-col justify-between gap-5 md:flex-row md:items-end">
            <div className="max-w-3xl">
              <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-primary">Featured conversations</p>
              <h2 className="text-balance text-3xl font-bold md:text-5xl">Find the conversation you need.</h2>
              <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
                Browse every public episode by AI and modern QA, career and leadership, or practitioner stories.
              </p>
            </div>
            <Button asChild variant="outline" className="shrink-0">
              <a href={playlistUrl} target="_blank" rel="noreferrer">
                Open YouTube playlist <ExternalLink className="ml-2 h-4 w-4" aria-hidden="true" />
              </a>
            </Button>
          </div>
          <PodcastLibrary />
        </div>
      </section>

      <section className="bg-muted/35 py-18 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-primary">The complete series</p>
              <h2 className="text-balance text-3xl font-bold md:text-5xl">One place for every conversation.</h2>
              <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
                The playlist updates whenever a new episode is published on YouTube, so this page never becomes a
                second library the team has to maintain.
              </p>
              <p className="mt-5 flex items-start gap-3 rounded-2xl border bg-background p-5 text-sm leading-relaxed text-muted-foreground shadow-sm">
                <Quote className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
                Interviews with QA leaders around the globe—focused on the choices, challenges, and lessons behind the
                work.
              </p>
            </div>
            <div className="overflow-hidden rounded-3xl border border-purple-100 bg-black shadow-2xl dark:border-purple-900/50">
              <iframe
                className="aspect-video w-full"
                src="https://www.youtube-nocookie.com/embed/videoseries?list=PLKkqQ3Fvc0U3J4-WQEq5EJJqwy_fVpoNP"
                title="Innovate QA Podcasts playlist"
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
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
            <h2 className="mt-5 text-balance text-3xl font-bold md:text-5xl">Have a lesson the QA community needs?</h2>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-purple-100">
              Pitch a practical conversation. Tell us what you learned, what changed, and what another quality
              professional can use.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Button asChild size="lg" className="bg-white text-purple-950 hover:bg-purple-50">
                <a href="mailto:info@innovateqaevents.com?subject=Innovate%20QA%20Podcast%20Guest">
                  Pitch an episode <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                </a>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white/30 bg-white/5 text-white hover:bg-white/15 hover:text-white">
                <Link href="/community">Join the community</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
