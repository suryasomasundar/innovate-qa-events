import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { LucideLinkedin, ArrowLeft } from "lucide-react"
import event2024 from "@/data/events/2024.json"
import event2025 from "@/data/events/2025.json"
import event2026 from "@/data/events/2026.json"
import battleData from "@/data/events/battle.json"
import homeData from "@/data/home.json"
import awardsData from "@/data/awards.json"
import { BASE_PATH } from "@/lib/constants"

interface SpeakerPageProps {
  params: Promise<{ slug: string }>
}

// Normalize any speaker record (handles 2024/2025/2026/home schema differences)
function normalizeSpeaker(s: any) {
  return {
    id: s.id as string,
    name: (s.name ?? "") as string,
    title: (s.title ?? s.role ?? "") as string,
    company: (s.company ?? "") as string,
    image: (s.image ?? "") as string,
    bio: (s.bio ?? "") as string,
    linkedin: (s.linkedin ?? s.social?.linkedin ?? "") as string,
    topic: (s.topic ?? "") as string,
    topicSummary: (s.topicSummary ?? "") as string,
    keynote: (s.keynote ?? false) as boolean,
    workshop: (s.workshop ?? false) as boolean,
  }
}

// Collect sessions for a speaker from a single event's schedule
function collectSessions(
  schedule: any,
  speakerId: string,
  eventName: string,
  eventYear: number,
  eventVenue: { city: string; state: string }
) {
  const sessions: {
    title: string
    type: string
    time: string
    description: string
    eventName: string
    eventYear: number
    city: string
    state: string
  }[] = []

  Object.values(schedule).forEach((day: any) => {
    day.slots?.forEach((slot: any) => {
      slot.sessions?.forEach((session: any) => {
        const matchById = session.speakerId === speakerId
        // Support both single speakerId and multi-speaker array (for co-presented talks)
        const matchInArray =
          Array.isArray(session.speakers) && session.speakers.includes(speakerId)
        if (matchById || matchInArray) {
          sessions.push({
            title: session.title ?? "",
            type: session.type ?? "",
            time: slot.time ?? "",
            description: session.description ?? "",
            eventName,
            eventYear,
            city: eventVenue.city,
            state: eventVenue.state,
          })
        }
      })
    })
  })

  return sessions
}

// All event sources (ordered chronologically for display)
const eventSources: { data: any; year: number }[] = [
  { data: event2024, year: 2024 },
  { data: event2025, year: 2025 },
  { data: battleData, year: 2026 },
  { data: event2026, year: 2026 },
]

// All speaker sources: event speakers + home.json featured speakers
function getAllSpeakers(): any[] {
  const seen = new Set<string>()
  const all: any[] = []
  for (const { data } of eventSources) {
    for (const s of (data.speakers as any[]) ?? []) {
      if (s?.id && !seen.has(s.id)) {
        seen.add(s.id)
        all.push(s)
      }
    }
  }
   for (const { data } of eventSources) {
    for (const s of (data.judges as any[]) ?? []) {
      if (s?.id && !seen.has(s.id)) {
        seen.add(s.id)
        all.push(s)
      }
    }
  }
  for (const s of ((homeData as any).speakers?.featured as any[]) ?? []) {
    if (s?.id && !seen.has(s.id)) {
      seen.add(s.id)
      all.push(s)
    }
  }
  for (const s of ((awardsData as any).judges as any[]) ?? []) {
    if (s?.id && !seen.has(s.id)) {
      seen.add(s.id)
      all.push(s)
    }
  }
  return all
}

export default async function SpeakerPage({ params }: SpeakerPageProps) {
  const { slug } = await params

  // Find speaker across all sources
  const raw = getAllSpeakers().find((s) => s.id === slug)
  if (!raw) notFound()

  const speaker = normalizeSpeaker(raw)

  // Collect contributions from every event, grouped by year
  const byYear: Record<
    number,
    { eventName: string; sessions: ReturnType<typeof collectSessions> }
  > = {}

  for (const { data, year } of eventSources) {
    const sessions = collectSessions(
      data.schedule,
      slug,
      data.name,
      year,
      data.venue
    )
    if (sessions.length === 0) continue
    if (!byYear[year]) {
      byYear[year] = { eventName: data.name, sessions: [] }
    }
    byYear[year].sessions.push(...sessions)
  }

  const contributions = Object.entries(byYear)
    .map(([year, val]) => ({ year: Number(year), ...val }))
    .sort((a, b) => a.year - b.year)

  // Most recent session description to show under "Session Topic"
  const latestDescription =
    contributions.length > 0
      ? contributions[contributions.length - 1].sessions[0]?.description
      : ""

  const years = contributions.map((c) => c.year)
  const maxYear = years.length > 0 ? Math.max(...years) : 2026
  const backHref = maxYear < 2026 ? `/events/${maxYear}#speakers` : "/#speakers"

  return (
    <div className="min-h-screen bg-background">
      {/* Back nav */}
      <section className="py-12 border-b border-border">
        <div className="container mx-auto px-4">
          <Button variant="ghost" asChild className="mb-6">
            <Link href={backHref}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Speakers
            </Link>
          </Button>
        </div>
      </section>

      {/* Profile */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-12 max-w-7xl mx-auto">
            {/* Left — photo + contact */}
            <div className="lg:col-span-1">
              <Card className="overflow-hidden pt-0">
                <div className="aspect-square relative bg-muted">
                  <Image
                    src={
                      speaker.image
                        ? speaker.image.startsWith("http")
                          ? speaker.image
                          : `${BASE_PATH}${speaker.image}`
                        : "/placeholder.svg"
                    }
                    alt={speaker.name}
                    fill
                    className="object-cover object-top"
                    unoptimized={speaker.image?.startsWith("http")}
                  />
                </div>
                <CardContent className="p-6">
                  <h1 className="text-2xl font-bold mb-2">{speaker.name}</h1>
                  <p className="text-lg text-primary font-medium mb-1">{speaker.title}</p>
                  <p className="text-muted-foreground mb-4">{speaker.company}</p>
                  {speaker.linkedin && (
                    <Button variant="outline" className="w-full" asChild>
                      <a href={speaker.linkedin} target="_blank" rel="noopener noreferrer">
                        <LucideLinkedin className="w-4 h-4 mr-2" />
                        Connect on LinkedIn
                      </a>
                    </Button>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Right — topic, bio, contributions */}
            <div className="lg:col-span-2">
              {/* Session Topic */}
              {speaker.topic && (
                <div className="mb-8">
                  <h2 className="text-2xl font-bold mb-4">Session Topic</h2>
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-semibold text-primary mb-3">{speaker.topic}</h3>
                      {(speaker.topicSummary || latestDescription) && (
                        <p className="text-muted-foreground mb-4">{speaker.topicSummary || latestDescription}</p>
                      )}
                      <div className="flex flex-wrap gap-2">
                        {speaker.keynote && (
                          <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full">
                            Keynote Speaker
                          </span>
                        )}
                        {speaker.workshop && (
                          <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full">
                            Workshop
                          </span>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* Biography */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Biography</h2>
                <Card>
                  <CardContent className="p-6">
                    <div className="prose prose-neutral dark:prose-invert max-w-none">
                      {(speaker.bio || "Speaker at Innovate QA Events.").split("\n\n").map((paragraph: string, index: number) => (
                        <p key={index} className="mb-4 last:mb-0 text-muted-foreground">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Year-wise Contributions — temporarily hidden */}
              {/* {contributions.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold mb-4">Conference Contributions</h2>
                  <div className="space-y-8">
                    {contributions.map(({ year, eventName, sessions }) => (
                      <div key={year}>
                        <div className="flex items-center gap-3 mb-4">
                          <Badge variant="outline" className="text-base px-3 py-1 font-semibold">
                            {year}
                          </Badge>
                          <span className="text-muted-foreground text-sm">{eventName}</span>
                        </div>
                        <div className="space-y-4 pl-4 border-l-2 border-primary/20">
                          {sessions.map((session, index) => (
                            <Card key={index}>
                              <CardContent className="p-6">
                                <div className="flex items-start gap-4">
                                  <div className="flex-shrink-0">
                                    <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                                      <Calendar className="h-6 w-6 text-primary" />
                                    </div>
                                  </div>
                                  <div className="flex-1">
                                    <h3 className="text-lg font-semibold mb-2">{session.title}</h3>
                                    {session.description && (
                                      <p className="text-sm text-muted-foreground mb-3">
                                        {session.description}
                                      </p>
                                    )}
                                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                                      {session.time && (
                                        <span className="flex items-center gap-1">
                                          <Calendar className="w-4 h-4" />
                                          {session.time}
                                        </span>
                                      )}
                                      {session.type && (
                                        <span className="px-2 py-1 bg-muted rounded-md capitalize">
                                          {session.type}
                                        </span>
                                      )}
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                      <MapPin className="w-4 h-4" />
                                      <span>
                                        {eventName} · {session.city}, {session.state}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )} */}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export async function generateStaticParams() {
  return getAllSpeakers()
    .filter((s) => s?.id)
    .map((s) => ({ slug: s.id as string }))
}
