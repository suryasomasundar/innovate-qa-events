import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Calendar, MapPin, Clock, Play } from "lucide-react"
import awardsData from "@/data/awards.json"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { Metadata } from "next"
import { generateSEO } from "@/components/seo"
import { EventLD, BreadcrumbLD } from "@/components/json-ld"
import { SpeakerCard } from "@/components/Speaker-Card"
import { BASE_PATH } from "@/lib/constants"

import event2026 from "@/data/events/2026.json"
import event2025 from "@/data/events/2025.json"
import event2024 from "@/data/events/2024.json"

const events: Record<string, typeof event2026 | typeof event2025 | typeof event2024> = {
  "2026": event2026,
  "2025": event2025,
  "2024": event2024,
}

const typeColors: Record<string, string> = {
  keynote: "bg-primary text-primary-foreground",
  talk: "bg-accent text-accent-foreground",
  workshop: "bg-chart-2 text-white",
  panel: "bg-chart-3 text-white",
  break: "bg-muted text-muted-foreground",
  social: "bg-chart-4 text-white",
  special: "bg-chart-5 text-white",
}

export async function generateStaticParams() {
  return [{ year: "2026" }, { year: "2025" }, { year: "2024" }]
}

export async function generateMetadata({ params }: { params: Promise<{ year: string }> }): Promise<Metadata> {
  const { year } = await params
  const event = events[year]

  if (!event) {
    return generateSEO({ title: "Event Not Found", noIndex: true })
  }

  return generateSEO({
    title: event.name,
    description: `${event.tagline}. View the schedule, speakers, and highlights from ${event.name}.`,
    canonical: `/events/${year}`,
    keywords: ["QA conference", year, event.venue.city, "software testing", "automation"],
  })
}

export default async function EventPage({ params }: { params: Promise<{ year: string }> }) {
  const { year } = await params
  const event = events[year]

  if (!event) {
    notFound()
  }

  const speakerMap = new Map(event.speakers.map((s) => [s.id, s]))
  const scheduleEntries = Object.entries(event.schedule)
  const isPastEvent = new Date(event.date.end) < new Date()

  return (
    <>
      <EventLD
        name={event.name}
        description={event.tagline}
        startDate={`${event.date.start}T08:00:00-07:00`}
        endDate={`${event.date.end}T18:00:00-07:00`}
        location={{
          name: event.venue.name,
          address: event.venue.address,
          city: event.venue.city,
          state: event.venue.state,
          country: "US",
        }}
        performers={event.speakers.map((s) => ({ name: s.name }))}
      />
      <BreadcrumbLD
        items={[
          { name: "Home", url: "/" },
          { name: "Past Events", url: "/events" },
          { name: event.name, url: `/events/${year}` },
        ]}
      />

      {/* Header */}
      <div className="bg-gradient-to-br from-primary/20 via-background to-primary/10 border-b border-border">
        <div className="container mx-auto px-4 py-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div>
              {isPastEvent && (
                <Badge variant="secondary" className="mb-4">
                  Past Event
                </Badge>
              )}
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-2">{event.name}</h1>
              <p className="text-xl text-primary font-medium mb-4">{event.tagline}</p>
              <div className="flex flex-wrap gap-4 text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  <span>
                    {new Date(event.date.start).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                    {event.date.start !== event.date.end &&
                      ` - ${new Date(event.date.end).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                      })}`}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  <span>
                    {event.venue.city}, {event.venue.state}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-6">
              <div className="text-center">
                <p className="text-3xl font-bold text-primary">{event.stats.attendees}+</p>
                <p className="text-sm text-muted-foreground">Attendees</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-primary">{event.stats.speakers}</p>
                <p className="text-sm text-muted-foreground">Speakers</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-primary">{event.stats.sessions}</p>
                <p className="text-sm text-muted-foreground">Sessions</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recap Video (for past events) */}
      {"recap" in event && event.recap && (
        <section className="py-12 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-foreground mb-6">Event Highlights</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                <Button variant="outline" size="lg" className="gap-2 bg-transparent">
                  <Play className="h-5 w-5" />
                  Watch Recap Video
                </Button>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Key Highlights</h3>
                <ul className="space-y-2">
                  {event.recap.highlights.map((highlight, i) => (
                    <li key={i} className="flex items-start gap-2 text-muted-foreground">
                      <span className="text-primary">•</span>
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Schedule */}
      <section id="schedule" className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-foreground mb-8">Schedule</h2>

          {scheduleEntries.length > 1 ? (
            <Tabs defaultValue={scheduleEntries[0][0]} className="w-full">
              <TabsList className="mb-6">
                {scheduleEntries.map(([date, day]) => (
                  <TabsTrigger key={date} value={date}>
                    {day.dayLabel}
                  </TabsTrigger>
                ))}
              </TabsList>

              {scheduleEntries.map(([date, day]) => (
                <TabsContent key={date} value={date}>
                  <ScheduleDay day={day} speakerMap={speakerMap} rooms={event.rooms} />
                </TabsContent>
              ))}
            </Tabs>
          ) : (
            <ScheduleDay day={scheduleEntries[0][1]} speakerMap={speakerMap} rooms={event.rooms} />
          )}
        </div>
      </section>

      {/* Speakers */}
      <section id="speakers" className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-foreground mb-8">Speakers</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {event.speakers.map((speaker) => (
              <SpeakerCard key={speaker.id} speaker={speaker} />
            ))}
          </div>
        </div>
      </section>

      {/* Judges (2026 only) */}
      {year === "2026" && awardsData.judges && awardsData.judges.length > 0 && (
        <section id="judges" className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-foreground mb-2">Awards Judges</h2>
            <p className="text-muted-foreground mb-8">Meet the expert panel judging the Innovate QA 2026 Awards</p>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {awardsData.judges.map((judge, i) => (
                <div key={i} className="flex flex-col">
                  <div className="aspect-[3/4] rounded-xl overflow-hidden bg-muted relative mb-3">
                    <Image
                      src={`${BASE_PATH}${judge.photo}`}
                      alt={judge.name}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                  <p className="font-semibold text-foreground text-sm leading-tight">{judge.name}</p>
                  <p className="text-xs text-muted-foreground leading-snug">{judge.title}</p>
                  {judge.company && (
                    <p className="text-xs text-primary font-medium">{judge.company}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Gallery (for past events) */}
      {"gallery" in event && event.gallery && (
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-foreground mb-8">Photo Gallery</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {event.gallery.map((photo, i) => (
                <div key={i} className="aspect-[4/3] rounded-lg overflow-hidden bg-muted relative">
                  <Image
                    src={photo ? `${BASE_PATH}${photo}` : "/placeholder.svg"}
                    alt={`Event photo ${i + 1}`}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Sponsors */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-foreground mb-8">Sponsors & Partners</h2>

          {"platinum" in event.sponsors && event.sponsors.platinum && event.sponsors.platinum.length > 0 && (
            <div className="mb-12">
              <h3 className="text-lg font-semibold text-primary mb-6">Platinum Sponsors</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {event.sponsors.platinum.map((sponsor) => (
                  <a key={sponsor.name} href={sponsor.url} target="_blank" rel="noopener noreferrer">
                    <Card className="h-full hover:shadow-lg transition-shadow border-border/50">
                      <CardContent className="p-6 flex flex-col items-center text-center">
                        <div className="h-20 w-full flex items-center justify-center mb-4 relative">
                          <Image
                            src={sponsor.logo ? (sponsor.logo.startsWith('http') ? sponsor.logo : `${BASE_PATH}/${sponsor.logo}`) : "/placeholder.svg"}
                            alt={sponsor.name}
                            width={160}
                            height={80}
                            className="max-h-20 max-w-full object-contain"
                            style={{ width: "auto" }}
                            unoptimized
                          />
                        </div>
                        <h4 className="font-semibold text-foreground mb-2">{sponsor.name}</h4>
                      </CardContent>
                    </Card>
                  </a>
                ))}
              </div>
            </div>
          )}

          {event.sponsors.gold && event.sponsors.gold.length > 0 && (
            <div className="mb-12">
              <h3 className="text-lg font-semibold text-primary mb-6">Gold Sponsors</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {event.sponsors.gold.map((sponsor) => (
                  <a key={sponsor.name} href={sponsor.url} target="_blank" rel="noopener noreferrer">
                    <Card className="h-full hover:shadow-lg transition-shadow border-border/50">
                      <CardContent className="p-6 flex flex-col items-center text-center">
                        <div className="h-20 w-full flex items-center justify-center mb-4 relative">
                          <Image
                            src={sponsor.logo ? (sponsor.logo.startsWith('http') ? sponsor.logo : `${BASE_PATH}/${sponsor.logo}`) : "/placeholder.svg"}
                            alt={sponsor.name}
                            width={160}
                            height={80}
                            className="max-h-20 max-w-full object-contain"
                            style={{ width: "auto" }}
                            unoptimized
                          />
                        </div>
                        <h4 className="font-semibold text-foreground mb-2">{sponsor.name}</h4>
                        {"tagline" in sponsor && sponsor.tagline && (
                          <p className="text-sm text-muted-foreground">{sponsor.tagline}</p>
                        )}
                      </CardContent>
                    </Card>
                  </a>
                ))}
              </div>
            </div>
          )}

          {event.sponsors.silver && event.sponsors.silver.length > 0 && (
            <div className="mb-12">
              <h3 className="text-lg font-semibold text-muted-foreground mb-6">Silver Sponsors</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {event.sponsors.silver.map((sponsor) => (
                  <a key={sponsor.name} href={sponsor.url} target="_blank" rel="noopener noreferrer">
                    <Card className="h-full hover:shadow-lg transition-shadow border-border/50">
                      <CardContent className="p-6 flex flex-col items-center text-center">
                        <div className="h-16 w-full flex items-center justify-center mb-4 relative">
                          <Image
                            src={sponsor.logo ? (sponsor.logo.startsWith('http') ? sponsor.logo : `${BASE_PATH}/${sponsor.logo}`) : "/placeholder.svg"}
                            alt={sponsor.name}
                            width={128}
                            height={64}
                            className="max-h-16 max-w-full object-contain"
                            style={{ width: "auto" }}
                            unoptimized
                          />
                        </div>
                        <h4 className="font-semibold text-foreground mb-2">{sponsor.name}</h4>
                        {"tagline" in sponsor && sponsor.tagline && (
                          <p className="text-sm text-muted-foreground">{sponsor.tagline}</p>
                        )}
                      </CardContent>
                    </Card>
                  </a>
                ))}
              </div>
            </div>
          )}

          {event.sponsors.bronze && event.sponsors.bronze.length > 0 && (
            <div className="mb-12">
              <h3 className="text-lg font-semibold text-muted-foreground mb-6">Bronze Sponsors</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {event.sponsors.bronze.map((sponsor) => (
                  <a key={sponsor.name} href={sponsor.url} target="_blank" rel="noopener noreferrer">
                    <Card className="h-full hover:shadow-lg transition-shadow border-border/50">
                      <CardContent className="p-5 flex flex-col items-center text-center">
                        <div className="h-14 w-full flex items-center justify-center mb-3 relative">
                          <Image
                            src={sponsor.logo ? (sponsor.logo.startsWith('http') ? sponsor.logo : `${BASE_PATH}/${sponsor.logo}`) : "/placeholder.svg"}
                            alt={sponsor.name}
                            width={112}
                            height={56}
                            className="max-h-14 max-w-full object-contain"
                            style={{ width: "auto" }}
                            unoptimized
                          />
                        </div>
                        <h4 className="font-medium text-foreground mb-1 text-sm">{sponsor.name}</h4>
                        {"tagline" in sponsor && sponsor.tagline && (
                          <p className="text-xs text-muted-foreground">{sponsor.tagline}</p>
                        )}
                      </CardContent>
                    </Card>
                  </a>
                ))}
              </div>
            </div>
          )}

          {event.sponsors.partners && event.sponsors.partners.length > 0 && (
            <div className="mb-12">
              <h3 className="text-lg font-semibold text-muted-foreground mb-6">Partners</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {event.sponsors.partners.map((sponsor) => (
                  <a key={sponsor.name} href={sponsor.url} target="_blank" rel="noopener noreferrer">
                    <Card className="h-full hover:shadow-lg transition-shadow border-border/50">
                      <CardContent className="p-5 flex flex-col items-center text-center">
                        <div className="h-12 w-full flex items-center justify-center mb-3 relative">
                          <Image
                            src={sponsor.logo ? (sponsor.logo.startsWith('http') ? sponsor.logo : `${BASE_PATH}/${sponsor.logo}`) : "/placeholder.svg"}
                            alt={sponsor.name}
                            width={96}
                            height={48}
                            className="max-h-12 max-w-full object-contain"
                            style={{ width: "auto" }}
                            unoptimized
                          />
                        </div>
                        <h4 className="font-medium text-foreground text-sm">{sponsor.name}</h4>
                      </CardContent>
                    </Card>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  )
}

type AnyScheduleDay = {
  dayLabel: string
  slots: Array<{
    time: string
    duration: number
    sessions: Array<Record<string, unknown>>
  }>
}

function ScheduleDay({
  day,
  speakerMap,
  rooms,
}: {
  day: AnyScheduleDay
  speakerMap: Map<string, { id: string; name: string; company: string }>
  rooms: Array<{ id: string; name: string; capacity: number }>
}) {
  const roomMap = new Map(rooms.map((r) => [r.id, r.name]))

  return (
    <div className="space-y-4">
      {day.slots.map((slot, slotIndex) => (
        <div key={slotIndex} className="border-l-2 border-primary/30 pl-4">
          <div className="flex items-center gap-2 text-primary font-semibold mb-3">
            <Clock className="h-4 w-4" />
            {slot.time}
            <span className="text-xs text-muted-foreground font-normal">({slot.duration} min)</span>
          </div>

          <div className={`grid gap-4 ${slot.sessions.length > 1 ? "md:grid-cols-2 lg:grid-cols-3" : ""}`}>
            {slot.sessions.map((session, sessionIndex) => {
              const speakerId = session.speakerId as string | undefined
              const speakerIds = session.speakers as string[] | undefined
              const speaker = speakerId ? speakerMap.get(speakerId) : null
              const sessionSpeakers = speakerIds && speakerIds.length > 0
                ? speakerIds.map((id) => speakerMap.get(id)).filter(Boolean)
                : []
              const panelists = session.panelists as string[] | undefined
              const participants = session.participants as string[] | undefined

              return (
                <Card key={sessionIndex} className="bg-card border-border/50">
                  <CardContent className="p-4">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <Badge className={typeColors[session.type as string] || "bg-muted"} variant="secondary">
                        {session.type as string}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{roomMap.get(session.room as string) || session.room as string}</span>
                    </div>
                    <h4 className="font-semibold text-foreground mb-1">{session.title as string}</h4>
                    {speaker && (
                      <p className="text-sm text-primary font-medium">
                        {speaker.name} - {speaker.company}
                      </p>
                    )}
                    {sessionSpeakers.length > 0 && (
                      <div className="text-sm text-primary font-medium">
                        {sessionSpeakers.length === 1 ? (
                          <p>
                            {sessionSpeakers[0]?.name} - {sessionSpeakers[0]?.company}
                          </p>
                        ) : (
                          <div>
                            <p className="text-muted-foreground mb-1">Speakers:</p>
                            <ul className="space-y-0.5">
                              {sessionSpeakers.map((spk, idx) => (
                                <li key={idx}>
                                  {spk?.name} - {spk?.company}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    )}
                    {panelists && panelists.length > 0 && (
                      <p className="text-sm text-muted-foreground">
                        Panelists: {panelists.map((id) => speakerMap.get(id)?.name).join(", ")}
                      </p>
                    )}
                    {participants && participants.length > 0 && (
                      <p className="text-sm text-muted-foreground">Featuring: {participants.join(", ")}</p>
                    )}
                    {session.description && <p className="text-sm text-muted-foreground mt-2">{session.description as string}</p>}
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}
