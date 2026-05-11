"use client"

import { Fragment, useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight, ChevronDown, Clock, Linkedin } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import event2026 from "@/data/events/2026.json"

const typeConfig: Record<string, { label: string; className: string }> = {
  keynote: { label: "Keynote", className: "bg-primary/10 text-primary border-primary/20" },
  talk: { label: "Talk", className: "bg-blue-500/10 text-blue-600 border-blue-200" },
  workshop: { label: "Workshop", className: "bg-emerald-500/10 text-emerald-600 border-emerald-200" },
  panel: { label: "Panel", className: "bg-orange-500/10 text-orange-600 border-orange-200" },
  discussion: { label: "Discussion", className: "bg-purple-500/10 text-purple-600 border-purple-200" },
  gameshow: { label: "Game Show", className: "bg-pink-500/10 text-pink-600 border-pink-200" },
  networking: { label: "Networking", className: "bg-teal-500/10 text-teal-600 border-teal-200" },
}

const DAY_LABELS: Record<string, string> = {
  "2026-06-04": "Day 1 · June 4",
  "2026-06-05": "Day 2 · June 5",
}

const speakerMap = new Map(event2026.speakers.map((speaker) => [speaker.id, speaker]))
const rooms = event2026.rooms
const days = Object.keys(event2026.schedule)

type Speaker = (typeof event2026.speakers)[number]

type ScheduleSession = {
  title?: string
  type: string
  room?: string
  description?: string
  speakers?: string[]
  speakerId?: string
}

type ScheduleSlot = {
  time: string
  duration?: number
  sessions: ScheduleSession[]
}

type ScheduleItem = {
  id: string
  time: string
  duration?: number
  roomName: string
  session: ScheduleSession
  speakers: Speaker[]
}

const getTypeConfig = (type: string) => typeConfig[type] ?? typeConfig.talk

const getSpeakers = (session: ScheduleSession) => {
  const ids = session.speakers ?? (session.speakerId ? [session.speakerId] : [])
  return ids.map((id) => speakerMap.get(id)).filter(Boolean) as Speaker[]
}

const splitDiscussionTitle = (title: string) =>
  title
    .split("|")
    .map((item) => item.replace(/^#\d+\s*/, "").trim())
    .filter(Boolean)

function SessionCard({
  item,
  isOpen,
  onToggle,
}: {
  item: ScheduleItem
  isOpen: boolean
  onToggle: () => void
}) {
  const config = getTypeConfig(item.session.type)
  const primarySpeaker = item.speakers[0]
  const discussionItems = item.session.title ? splitDiscussionTitle(item.session.title) : []
  const hasExpandableContent =
    Boolean(item.session.description) ||
    item.speakers.length > 0 ||
    (item.session.type === "discussion" && discussionItems.length > 2)

  return (
    <article className="rounded-xl border border-border/70 bg-card shadow-sm shadow-primary/5 transition-shadow hover:shadow-md">
      <button
        type="button"
        onClick={hasExpandableContent ? onToggle : undefined}
        className={`w-full p-3 text-left ${hasExpandableContent ? "" : "cursor-default"}`}
        aria-expanded={hasExpandableContent ? isOpen : undefined}
      >
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <Badge variant="outline" className={`text-[10px] ${config.className}`}>
            {config.label}
          </Badge>
          {item.duration ? (
            <span className="text-[11px] font-medium text-muted-foreground">{item.duration} min</span>
          ) : null}
          {hasExpandableContent ? (
            <ChevronDown
              className={`ml-auto h-4 w-4 text-muted-foreground transition-transform ${
                isOpen ? "rotate-180 text-primary" : ""
              }`}
            />
          ) : null}
        </div>

        {item.session.type === "discussion" ? (
          <ul className="space-y-1.5">
            {discussionItems.slice(0, isOpen ? undefined : 2).map((title) => (
              <li key={title} className="flex gap-2 text-sm font-semibold leading-snug text-foreground">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                <span>{title}</span>
              </li>
            ))}
            {!isOpen && discussionItems.length > 2 ? (
              <li className="text-xs font-semibold text-primary">+{discussionItems.length - 2} more prompts</li>
            ) : null}
          </ul>
        ) : (
          <h4 className="text-sm font-bold leading-snug text-foreground">{item.session.title}</h4>
        )}

        {primarySpeaker ? (
          <div className="mt-3 flex items-center gap-2 border-t border-border/50 pt-3">
            <div className="relative h-7 w-7 shrink-0 overflow-hidden rounded-full border border-border bg-muted">
              {primarySpeaker.image ? (
                <Image src={primarySpeaker.image} alt={primarySpeaker.name} fill className="object-cover" unoptimized />
              ) : (
                <span className="flex h-full w-full items-center justify-center text-xs font-semibold text-muted-foreground">
                  {primarySpeaker.name[0]}
                </span>
              )}
            </div>
            <div className="min-w-0">
              <p className="truncate text-xs font-semibold text-foreground">
                {item.speakers.map((speaker) => speaker.name).join(", ")}
              </p>
              <p className="truncate text-xs text-muted-foreground">{primarySpeaker.company}</p>
            </div>
          </div>
        ) : null}
      </button>

      {isOpen && (item.session.description || item.speakers.length > 0) ? (
        <div className="border-t border-border/70 bg-background/70 p-3">
          <div className="mb-3 flex flex-wrap items-center gap-2 text-xs font-medium text-muted-foreground">
            <span className="font-semibold text-primary">{item.time}</span>
            <span>{item.roomName}</span>
            {item.duration ? <span>{item.duration} min</span> : null}
          </div>

          {item.session.description ? (
            <p className="mb-3 text-sm leading-relaxed text-muted-foreground">{item.session.description}</p>
          ) : null}

          {item.speakers.length > 0 ? (
            <div className="space-y-3">
              {item.speakers.map((speaker) => (
                <div key={speaker.id} className="flex items-center gap-3">
                  <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-xl border border-border bg-muted">
                    {speaker.image ? (
                      <Image src={speaker.image} alt={speaker.name} fill className="object-cover" unoptimized />
                    ) : (
                      <span className="flex h-full w-full items-center justify-center text-sm font-semibold text-muted-foreground">
                        {speaker.name[0]}
                      </span>
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-bold text-foreground">{speaker.name}</p>
                    <p className="text-xs leading-snug text-muted-foreground">
                      {speaker.title} · {speaker.company}
                    </p>
                  </div>
                  {speaker.linkedin ? (
                    <Link
                      href={speaker.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-secondary text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
                      aria-label={`${speaker.name} on LinkedIn`}
                    >
                      <Linkedin className="h-4 w-4" />
                    </Link>
                  ) : null}
                </div>
              ))}
            </div>
          ) : null}
        </div>
      ) : null}
    </article>
  )
}

export function FeaturedSessions() {
  const [activeDay, setActiveDay] = useState(days[0])
  const [openSessionId, setOpenSessionId] = useState<string | null>(null)

  const schedule = event2026.schedule as Record<string, { dayLabel: string; slots: ScheduleSlot[] }>
  const slots = schedule[activeDay]?.slots ?? []

  const makeItem = (session: ScheduleSession, slot: ScheduleSlot, slotIndex: number, sessionIndex: number): ScheduleItem => {
    const room = rooms.find((item) => item.id === session.room)
    return {
      id: `${activeDay}-${session.room || "main"}-${slotIndex}-${sessionIndex}`,
      time: slot.time,
      duration: slot.duration,
      roomName: room?.name ?? "Main Stage",
      session,
      speakers: getSpeakers(session),
    }
  }

  return (
    <section className="bg-background py-20 md:py-28">
      <div className="container mx-auto px-4">
        <div className="mx-auto mb-10 max-w-4xl text-center">
          <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">Schedule</h2>
          <div className="mx-auto mb-6 h-1 w-20 rounded-full bg-primary" />
          <p className="text-lg text-muted-foreground">
            Full two-day agenda across Leadership, Practitioner, Demo, and Discussion tracks.
          </p>
        </div>

        <div className="mx-auto max-w-7xl rounded-2xl border border-border/70 bg-card shadow-lg shadow-primary/5">
          <div className="flex flex-col gap-5 border-b border-border/70 bg-gradient-to-br from-card via-card to-secondary/40 p-5 md:flex-row md:items-center md:justify-between">
            <div className="inline-flex w-full gap-1 rounded-full border border-border bg-secondary/70 p-1 md:w-auto">
              {days.map((date) => (
                <button
                  key={date}
                  type="button"
                  onClick={() => {
                    setActiveDay(date)
                    setOpenSessionId(null)
                  }}
                  className={`flex-1 rounded-full px-5 py-2 text-sm font-semibold transition-colors md:flex-none ${
                    activeDay === date
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-muted-foreground hover:bg-card/70"
                  }`}
                >
                  {DAY_LABELS[date] ?? date}
                </button>
              ))}
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Tap any session for speaker details, LinkedIn, duration, and description.
            </p>
          </div>

          <div className="p-5 max-lg:hidden">
            <div className="grid grid-cols-[88px_repeat(4,minmax(0,1fr))] gap-3">
              <div className="sticky top-0 z-20 rounded-xl bg-card/95 backdrop-blur" />
              {rooms.map((room) => (
                <div
                  key={room.id}
                  className="sticky top-0 z-20 rounded-xl border border-border/70 bg-secondary/95 p-4 shadow-sm backdrop-blur"
                >
                  <p className="text-sm font-bold text-primary">{room.name}</p>
                </div>
              ))}

              {slots.map((slot, slotIndex) => {
                const breakSession = slot.sessions.find((session) => session.type === "break")
                if (breakSession) {
                  return (
                    <Fragment key={`${activeDay}-${slot.time}-break`}>
                      <div className="rounded-xl px-2 py-4 text-sm font-bold text-primary">{slot.time}</div>
                      <div className="col-span-4 rounded-xl border border-border/70 bg-gradient-to-r from-secondary/80 to-card px-5 py-4">
                        <div className="flex flex-wrap items-center gap-2 text-sm">
                          <Clock className="h-4 w-4 text-primary" />
                          <span className="font-bold text-foreground">{breakSession.title}</span>
                          {slot.duration ? <span className="text-muted-foreground">· {slot.duration} min</span> : null}
                        </div>
                        {breakSession.description ? (
                          <p className="mt-1 text-sm text-muted-foreground">{breakSession.description}</p>
                        ) : null}
                      </div>
                    </Fragment>
                  )
                }

                return (
                  <Fragment key={`${activeDay}-${slot.time}`}>
                    <div className="rounded-xl px-2 py-4 text-sm font-bold text-primary">{slot.time}</div>
                    {rooms.map((room) => {
                      const sessions = slot.sessions.filter(
                        (session) => session.room === room.id && session.type !== "break" && session.title?.trim()
                      )

                      return (
                        <div key={room.id} className="min-h-28 rounded-xl border border-border/50 bg-background/45 p-2">
                          <div className="space-y-2">
                            {sessions.map((session, sessionIndex) => {
                              const item = makeItem(session, slot, slotIndex, sessionIndex)
                              const isOpen = openSessionId === item.id

                              return (
                                <SessionCard
                                  key={item.id}
                                  item={item}
                                  isOpen={isOpen}
                                  onToggle={() => setOpenSessionId(isOpen ? null : item.id)}
                                />
                              )
                            })}
                          </div>
                        </div>
                      )
                    })}
                  </Fragment>
                )
              })}
            </div>
          </div>

          <div className="space-y-4 p-4 lg:hidden">
            {slots.map((slot, slotIndex) => {
              const breakSession = slot.sessions.find((session) => session.type === "break")

              if (breakSession) {
                return (
                  <div key={`${activeDay}-${slot.time}-mobile-break`} className="rounded-xl border border-border/70 bg-secondary/60 p-4">
                    <div className="mb-1 flex items-center gap-2 text-sm font-bold text-primary">
                      <Clock className="h-4 w-4" />
                      {slot.time}
                    </div>
                    <p className="font-bold text-foreground">{breakSession.title}</p>
                    {breakSession.description ? <p className="mt-1 text-sm text-muted-foreground">{breakSession.description}</p> : null}
                  </div>
                )
              }

              return (
                <div key={`${activeDay}-${slot.time}-mobile`} className="rounded-2xl border border-border/70 bg-background/50 p-4">
                  <p className="mb-4 text-sm font-bold text-primary">{slot.time}</p>
                  <div className="space-y-4">
                    {rooms.map((room) => {
                      const sessions = slot.sessions.filter(
                        (session) => session.room === room.id && session.type !== "break" && session.title?.trim()
                      )

                      if (sessions.length === 0) return null

                      return (
                        <div key={room.id}>
                          <p className="mb-2 text-xs font-bold uppercase tracking-wide text-muted-foreground">{room.name}</p>
                          <div className="space-y-2">
                            {sessions.map((session, sessionIndex) => {
                              const item = makeItem(session, slot, slotIndex, sessionIndex)
                              const isOpen = openSessionId === item.id

                              return (
                                <SessionCard
                                  key={item.id}
                                  item={item}
                                  isOpen={isOpen}
                                  onToggle={() => setOpenSessionId(isOpen ? null : item.id)}
                                />
                              )
                            })}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div className="mt-10 text-center">
          <Button asChild size="lg" variant="outline">
            <Link href="/events/2026#schedule">
              View Full Schedule <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
