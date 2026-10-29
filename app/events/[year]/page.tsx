import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Calendar, MapPin, Play, Handshake } from "lucide-react"
import awardsData from "@/data/awards/2026.json"
import sponsors2026 from "@/data/sponsor/2026.json"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { Metadata } from "next"
import { generateSEO } from "@/components/seo"
import { EventLD, BreadcrumbLD } from "@/components/json-ld"
import { EventJudgePanel } from "@/components/event-judge-panel"
import { EventSpeakerCarousel } from "@/components/event-speaker-carousel"
import { EventSchedulePlanner } from "@/components/event-schedule-planner"
import { PremierSponsorCard, SponsorTierRow, withLogo, type Sponsor } from "@/components/sponsor-cards"
import { BASE_PATH, RECORDINGS_URL } from "@/lib/constants"

import event2027 from "@/data/events/2027.json"
import event2026 from "@/data/events/2026.json"
import event2025 from "@/data/events/2025.json"
import event2024 from "@/data/events/2024.json"

const events: Record<string, typeof event2027 | typeof event2026 | typeof event2025 | typeof event2024> = {
  "2027": event2027,
  "2026": event2026,
  "2025": event2025,
  "2024": event2024,
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
  return [{ year: "2027" }, { year: "2026" }, { year: "2025" }, { year: "2024" }]
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

  const scheduleEntries = Object.entries(event.schedule)
  const eventEndDate = parseDateOnly(event.date.end)
  eventEndDate.setHours(23, 59, 59, 999)
  const isPastEvent = eventEndDate < new Date()
  const sponsors: EventSponsors = year === "2026"
    ? sponsors2026.sponsors
    : "sponsors" in event ? event.sponsors as EventSponsors : {}
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

            <div className="flex flex-col gap-5 lg:items-end">
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
              {year === "2026" && (
                <Button asChild variant="secondary" className="gap-2">
                  <a href={RECORDINGS_URL}>
                    <Play className="h-4 w-4" />
                    Watch 2026 Recordings
                  </a>
                </Button>
              )}
              {year === "2027" && (
                <Button asChild variant="secondary">
                  <Link href="/tickets">Buy Tickets for 2027</Link>
                </Button>
              )}
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
              <p className="mb-3 text-sm font-bold uppercase tracking-normal text-muted-foreground">
                {isPastEvent ? "Past Event Schedule" : "Event Schedule"}
              </p>
              <h2 className="text-5xl font-semibold leading-none tracking-normal text-primary md:text-6xl lg:text-7xl">
                {isPastEvent ? "Past Schedule" : "Schedule"}
              </h2>
            </div>
            <p className="max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg lg:justify-self-end">
              Explore the sessions, workshops, discussions, and networking moments at Innovate QA {year}.
            </p>
          </div>

          <EventSchedulePlanner scheduleEntries={scheduleEntries} rooms={event.rooms} speakers={event.speakers} />
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
                The partner ecosystem behind Innovate QA {year}
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

          {withLogo(sponsors.platinum).length > 0 && (
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
                {withLogo(sponsors.platinum).map((sponsor) => (
                  <PremierSponsorCard key={sponsor.name} sponsor={sponsor} />
                ))}
              </div>
            </div>
          )}

          <div className="space-y-6">
            <SponsorTierRow
              title="Gold Sponsors"
              description="Product teams and platforms attendees can explore during the conference."
              sponsors={withLogo(sponsors.gold)}
              tier="Gold"
              labelClassName="text-white"
              descriptionClassName="text-white/60"
              borderClassName="border-white/10"
            />
            <SponsorTierRow
              title="Silver Sponsors"
              description="Companies supporting practical learning, networking, and community access."
              sponsors={withLogo(sponsors.silver)}
              tier="Silver"
              labelClassName="text-white"
              descriptionClassName="text-white/60"
              borderClassName="border-white/10"
            />
            <SponsorTierRow
              title="Bronze Sponsors"
              description="Additional supporters helping make the conference possible."
              sponsors={withLogo(sponsors.bronze)}
              tier="Bronze"
              compact
              labelClassName="text-white"
              descriptionClassName="text-white/60"
              borderClassName="border-white/10"
            />
            <SponsorTierRow
              title="Community Partners"
              description="Community channels helping connect Innovate QA with builders and practitioners."
              sponsors={withLogo(sponsors.partners)}
              tier="Partner"
              compact
              labelClassName="text-white"
              descriptionClassName="text-white/60"
              borderClassName="border-white/10"
            />
          </div>

        </div>
      </section>
    </>
  )
}
