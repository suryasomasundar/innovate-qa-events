import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Calendar, MapPin, Clock, Play, ExternalLink, Handshake } from "lucide-react"
import awardsData from "@/data/awards.json"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { Metadata } from "next"
import { generateSEO } from "@/components/seo"
import { EventLD, BreadcrumbLD } from "@/components/json-ld"
import { EventJudgePanel } from "@/components/event-judge-panel"
import { EventSpeakerCarousel } from "@/components/event-speaker-carousel"
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
  discussion: "bg-muted text-muted-foreground",
  gameshow: "bg-muted text-muted-foreground",
}

type Sponsor = {
  name: string
  logo?: string
  url?: string
  tagline?: string
  width?: number
  height?: number
}

type EventSponsors = {
  platinum?: Sponsor[]
  gold?: Sponsor[]
  silver?: Sponsor[]
  bronze?: Sponsor[]
  partners?: Sponsor[]
}

function parseDateOnly(date: string) {
  const [year, month, day] = date.split("-").map(Number)
  return new Date(year, month - 1, day)
}

function formatDateOnly(date: string, options: Intl.DateTimeFormatOptions) {
  return parseDateOnly(date).toLocaleDateString("en-US", options)
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
  const eventEndDate = parseDateOnly(event.date.end)
  eventEndDate.setHours(23, 59, 59, 999)
  const isPastEvent = eventEndDate < new Date()
  const sponsors = event.sponsors as EventSponsors
  const recapHighlights =
    "recap" in event && Array.isArray((event.recap as { highlights?: unknown }).highlights)
      ? ((event.recap as { highlights: string[] }).highlights)
      : []
  const awardJudges = awardsData.judges
    .map((judge) => ({
      id: judge.id,
      name: judge.name,
      title: judge.title,
      company: judge.company,
      image: judge.image,
      linkedin: judge.linkedin,
    }))

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
      <div className="event-connected-header border-b border-white/10 text-white">
        <div className="event-header-orbital" aria-hidden="true" />
        <div className="event-header-node-map" aria-hidden="true">
          <svg viewBox="0 0 640 300" fill="none">
            <path className="event-header-node-line" d="M38 182 C114 110 174 104 244 148 S380 238 470 168 S578 82 622 118" />
            <path className="event-header-node-line event-header-node-line-teal" d="M88 58 C168 94 196 210 292 198 S424 72 548 48" />
            <path className="event-header-node-line" d="M156 242 C222 190 262 96 342 112 S448 210 584 236" />
            <circle className="event-header-node event-header-node-primary" cx="38" cy="182" r="8" />
            <circle className="event-header-node event-header-node-teal" cx="88" cy="58" r="7" />
            <circle className="event-header-node" cx="178" cy="112" r="6" />
            <circle className="event-header-node event-header-node-primary" cx="244" cy="148" r="9" />
            <circle className="event-header-node event-header-node-teal" cx="292" cy="198" r="7" />
            <circle className="event-header-node" cx="342" cy="112" r="6" />
            <circle className="event-header-node event-header-node-primary" cx="470" cy="168" r="8" />
            <circle className="event-header-node event-header-node-teal" cx="548" cy="48" r="7" />
            <circle className="event-header-node" cx="584" cy="236" r="6" />
            <circle className="event-header-node event-header-node-primary" cx="622" cy="118" r="8" />
          </svg>
        </div>
        <div className="event-header-mask" aria-hidden="true" />
        <div className="container relative z-10 mx-auto px-4 py-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white mb-6"
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
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">{event.name}</h1>
              <p className="text-xl text-white font-medium mb-4">{event.tagline}</p>
              <div className="flex flex-wrap gap-4 text-white/70">
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-[#7ee1e5]" />
                  <span>
                    {formatDateOnly(event.date.start, {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                    {event.date.start !== event.date.end &&
                      ` - ${formatDateOnly(event.date.end, {
                        month: "long",
                        day: "numeric",
                      })}`}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-[#7ee1e5]" />
                  <span>
                    {event.venue.city}, {event.venue.state}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-6">
              <div className="text-center">
                <p className="text-3xl font-bold text-white">{event.stats.attendees}+</p>
                <p className="text-sm text-white/65">Attendees</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-white">{event.stats.speakers}</p>
                <p className="text-sm text-white/65">Speakers</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-white">{event.stats.sessions}</p>
                <p className="text-sm text-white/65">Sessions</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recap Video (for past events) */}
      {recapHighlights.length > 0 && (
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
                  {recapHighlights.map((highlight, i) => (
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
      <section id="schedule" className="scroll-mt-24 py-20">
        <div className="container mx-auto px-4">
          <div className="mb-10 grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
            <div>
              <p className="mb-3 text-sm font-bold uppercase tracking-normal text-muted-foreground">Event Schedule</p>
              <h2 className="text-5xl font-semibold leading-none tracking-normal text-primary md:text-6xl lg:text-7xl">
                Schedule
              </h2>
            </div>
            <p className="max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg lg:justify-self-end">
              Explore the sessions, workshops, discussions, and networking moments across both days of Innovate QA 2026.
            </p>
          </div>

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
      <EventSpeakerCarousel speakers={event.speakers} />

      {/* Judges (2026 only) */}
      {year === "2026" && awardsData.judges && awardsData.judges.length > 0 && <EventJudgePanel judges={awardJudges} />}

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
      <section id="sponsors" className="py-24 bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 text-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-10 lg:items-end mb-16">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-white/60 mb-4">Sponsors & Partners</p>
              <h2 className="text-4xl md:text-5xl font-bold tracking-normal text-white mb-5">
                The partner ecosystem behind Innovate QA 2026
              </h2>
              <p className="text-lg text-white/70 max-w-3xl">
                Tool builders, quality platforms, and community partners helping create a practical conference for the teams defining modern software quality.
              </p>
            </div>
            <div className="lg:justify-self-end">
              <div className="grid grid-cols-3 rounded-lg bg-white/5">
                <div className="px-4 py-4 text-center">
                  <p className="text-2xl font-bold text-white">250+</p>
                  <p className="text-xs text-white/60">attendees</p>
                </div>
                <div className="px-4 py-4 text-center">
                  <p className="text-2xl font-bold text-white">40</p>
                  <p className="text-xs text-white/60">speakers</p>
                </div>
                <div className="px-4 py-4 text-center">
                  <p className="text-2xl font-bold text-white">35</p>
                  <p className="text-xs text-white/60">sessions</p>
                </div>
              </div>
              <Button asChild variant="secondary" className="w-full mt-5">
                <Link href="/sponsor">
                  <Handshake className="w-4 h-4 mr-2" />
                  Become a Sponsor
                </Link>
              </Button>
            </div>
          </div>

          {sponsors.platinum && sponsors.platinum.length > 0 && (
            <div className="mb-16">
              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-6">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-wider text-white/60 mb-2">Premier Support</p>
                  <h3 className="text-2xl font-bold text-white">Featured sponsors</h3>
                </div>
                <p className="text-sm text-white/60 max-w-xl">
                  Platinum partners receive the strongest presence across the conference experience, from the website to onsite moments.
                </p>
              </div>
              <div className="grid md:grid-cols-2 gap-5">
                {sponsors.platinum.map((sponsor) => (
                  <PremierSponsorCard key={sponsor.name} sponsor={sponsor} />
                ))}
              </div>
            </div>
          )}

          <div className="space-y-6">
            {sponsors.gold && sponsors.gold.length > 0 && (
              <SponsorTierRow
                title="Gold Sponsors"
                description="Product teams and platforms attendees can explore during the conference."
                sponsors={sponsors.gold}
                tier="Gold"
              />
            )}

            {sponsors.silver && sponsors.silver.length > 0 && (
              <SponsorTierRow
                title="Silver Sponsors"
                description="Companies supporting practical learning, networking, and community access."
                sponsors={sponsors.silver}
                tier="Silver"
              />
            )}

            {sponsors.partners && sponsors.partners.length > 0 && (
              <SponsorTierRow
                title="Community Partners"
                description="Community channels helping connect Innovate QA with builders and practitioners."
                sponsors={sponsors.partners}
                tier="Partner"
                compact
              />
            )}

            {sponsors.bronze && sponsors.bronze.length > 0 && (
              <SponsorTierRow
                title="Bronze Sponsors"
                description="Additional supporters helping make the conference possible."
                sponsors={sponsors.bronze}
                tier="Bronze"
                compact
              />
            )}
          </div>

        </div>
      </section>
    </>
  )
}

function sponsorLogoSrc(sponsor: Sponsor) {
  if (!sponsor.logo) return "/placeholder.svg"
  return sponsor.logo.startsWith("http") ? sponsor.logo : `${BASE_PATH}/${sponsor.logo}`
}

function PremierSponsorCard({ sponsor }: { sponsor: Sponsor }) {
  return (
    <a
      href={sponsor.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative min-h-[250px] rounded-lg bg-white p-7 md:p-8 text-foreground shadow-sm transition-transform hover:-translate-y-0.5 flex flex-col"
    >
      <div className="flex items-center justify-between gap-4 mb-8">
        <span className="text-xs font-semibold uppercase tracking-wider text-primary">Platinum Sponsor</span>
        <ExternalLink className="w-4 h-4 text-muted-foreground transition-colors group-hover:text-primary" />
      </div>
      <div className="flex-1 flex items-center justify-center">
        <Image
          src={sponsorLogoSrc(sponsor)}
          alt={sponsor.name}
          width={sponsor.width ?? 320}
          height={sponsor.height ?? 150}
          className="max-h-36 max-w-[90%] object-contain"
          style={{ width: "auto" }}
          unoptimized
        />
      </div>
    </a>
  )
}

function SponsorLogoTile({
  sponsor,
  tier,
  compact = false,
}: {
  sponsor: Sponsor
  tier: string
  compact?: boolean
}) {
  return (
    <a
      href={sponsor.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group min-h-[168px] rounded-lg bg-white p-5 text-foreground shadow-sm transition-transform hover:-translate-y-0.5 flex flex-col"
    >
      <div className="flex items-center justify-between gap-3 mb-5">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">{tier}</span>
        <ExternalLink className="w-3.5 h-3.5 text-muted-foreground transition-colors group-hover:text-primary" />
      </div>
      <div className="flex-1 flex items-center justify-center">
        <Image
          src={sponsorLogoSrc(sponsor)}
          alt={sponsor.name}
          width={sponsor.width ?? (compact ? 170 : 230)}
          height={sponsor.height ?? (compact ? 82 : 110)}
          className={`${compact ? "max-h-20" : "max-h-28"} max-w-[92%] object-contain`}
          style={{ width: "auto" }}
          unoptimized
        />
      </div>
    </a>
  )
}

function SponsorTierRow({
  title,
  description,
  sponsors,
  tier,
  compact = false,
}: {
  title: string
  description: string
  sponsors: Sponsor[]
  tier: string
  compact?: boolean
}) {
  return (
    <div className="grid lg:grid-cols-[260px_1fr] gap-6 py-8">
      <div>
        <div className="flex items-center gap-3 mb-2">
          <h3 className="text-xl font-semibold text-white">{title}</h3>
        </div>
        <p className="text-sm text-white/60">{description}</p>
      </div>
      <div className={compact ? "grid sm:grid-cols-2 md:grid-cols-3 gap-4" : "grid sm:grid-cols-2 gap-4"}>
        {sponsors.map((sponsor) => (
          <SponsorLogoTile key={sponsor.name} sponsor={sponsor} tier={tier} compact={compact} />
        ))}
      </div>
    </div>
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
              const sessionType = typeof session.type === "string" ? session.type : ""
              const sessionTitle = typeof session.title === "string" && session.title.trim()
                ? session.title
                : "Session details coming soon"
              const isCompactSlot = slot.sessions.length === 1 && slot.duration <= 15
              const speakerId = session.speakerId as string | undefined
              const speakerIds = session.speakers as string[] | undefined
              const speaker = speakerId ? speakerMap.get(speakerId) : null
              const sessionSpeakers = speakerIds && speakerIds.length > 0
                ? speakerIds.map((id) => speakerMap.get(id)).filter(Boolean)
                : []
              const panelists = session.panelists as string[] | undefined
              const participants = session.participants as string[] | undefined
              const sessionDescription = typeof session.description === "string" ? session.description : ""

              return (
                <Card key={sessionIndex} className="bg-card border-border/50">
                  <CardContent className={isCompactSlot ? "p-3" : "p-4"}>
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <Badge className={typeColors[sessionType] || "bg-muted"} variant="secondary">
                        {sessionType}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {roomMap.get(session.room as string) || session.room as string}
                      </span>
                    </div>
                    <h4 className="font-semibold text-foreground mb-1">{sessionTitle}</h4>
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
                    {sessionDescription && <p className="text-sm text-muted-foreground mt-2">{sessionDescription}</p>}
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
