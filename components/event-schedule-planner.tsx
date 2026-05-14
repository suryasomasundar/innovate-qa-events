"use client"

import { useMemo, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Clock, Linkedin } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { cn } from "@/lib/utils"

type Speaker = {
  id: string
  name: string
  title?: string
  company?: string
  image?: string
  linkedin?: string
}

type Room = {
  id: string
  name: string
  capacity?: number
}

type ScheduleSession = {
  title?: string
  type?: string
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

type ScheduleDay = {
  dayLabel: string
  slots: ScheduleSlot[]
}

type ScheduleItem = {
  id: string
  date: string
  time: string
  duration?: number
  roomName: string
  session: ScheduleSession
  speakers: Speaker[]
}

type EventSchedulePlannerProps = {
  scheduleEntries: Array<[string, ScheduleDay]>
  rooms: Room[]
  speakers: Speaker[]
}

const typeConfig: Record<string, { label: string; className: string }> = {
  keynote: { label: "Keynote", className: "border-primary/25 bg-primary/10 text-primary" },
  talk: { label: "Talk", className: "border-blue-200 bg-blue-500/10 text-blue-700" },
  workshop: { label: "Workshop", className: "border-emerald-200 bg-emerald-500/10 text-emerald-700" },
  panel: { label: "Panel", className: "border-orange-200 bg-orange-500/10 text-orange-700" },
  discussion: { label: "Discussion", className: "border-purple-200 bg-purple-500/10 text-purple-700" },
  gameshow: { label: "Game Show", className: "border-pink-200 bg-pink-500/10 text-pink-700" },
  networking: { label: "Networking", className: "border-teal-200 bg-teal-500/10 text-teal-700" },
  break: { label: "Break", className: "border-primary/20 bg-secondary text-primary" },
}

const roomDescriptions: Record<string, string> = {
  leadership: "Strategy, culture, awards",
  practitioner: "Applied QA practice",
  demo: "Tools, products, live demos",
  discussion: "Roundtables and workshops",
}

function displayDayLabel(date: string, fallback: string, index: number) {
  const [year, month, day] = date.split("-").map(Number)
  if (!year || !month || !day) return fallback.replace(" - ", " · ")

  const label = new Date(year, month - 1, day).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
  })
  return `Day ${index + 1} · ${label}`
}

function getTypeConfig(type?: string) {
  return typeConfig[type || "talk"] ?? typeConfig.talk
}

function getSpeakerIds(session: ScheduleSession) {
  if (session.speakers?.length) return session.speakers.filter(Boolean)
  if (session.speakerId) return [session.speakerId]
  return []
}

function getInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase()
}

function cleanTitle(title?: string) {
  return title?.trim() || "Session details"
}

function splitDiscussionTitle(title?: string) {
  return (title || "")
    .split("|")
    .map((item) => item.replace(/^#\d+\s*/, "").trim())
    .filter(Boolean)
}

function SpeakerAvatar({ speaker, size = "sm" }: { speaker: Speaker; size?: "sm" | "lg" }) {
  return (
    <div
      className={cn(
        "relative shrink-0 overflow-hidden border border-border bg-secondary text-primary",
        size === "lg" ? "h-16 w-16 rounded-2xl" : "h-8 w-8 rounded-full",
      )}
    >
      {speaker.image ? (
        <Image
          src={speaker.image}
          alt={speaker.name}
          fill
          className="object-cover object-top"
          sizes={size === "lg" ? "64px" : "32px"}
          unoptimized
        />
      ) : (
        <span className="flex h-full w-full items-center justify-center text-xs font-bold">
          {getInitials(speaker.name)}
        </span>
      )}
    </div>
  )
}

function SessionCard({ item, onOpen }: { item: ScheduleItem; onOpen: (item: ScheduleItem) => void }) {
  const config = getTypeConfig(item.session.type)
  const title = cleanTitle(item.session.title)
  const discussionItems = item.session.type === "discussion" ? splitDiscussionTitle(title) : []
  const primarySpeaker = item.speakers[0]

  return (
    <button
      type="button"
      onClick={() => onOpen(item)}
      className="group flex min-h-28 w-full flex-col gap-3 rounded-xl border border-border/75 bg-card p-3 text-left shadow-sm shadow-primary/5 transition-all hover:-translate-y-0.5 hover:border-primary/25 hover:shadow-md hover:shadow-primary/10"
    >
      <div className="flex flex-wrap items-center gap-2">
        <Badge variant="outline" className={cn("rounded-full text-[10px] font-bold", config.className)}>
          {config.label}
        </Badge>
        {item.duration ? (
          <span className="inline-flex items-center gap-1 text-[11px] font-medium text-muted-foreground">
            <Clock className="h-3 w-3" />
            {item.duration} min
          </span>
        ) : null}
      </div>

      {discussionItems.length > 0 ? (
        <div className="space-y-1.5">
          {discussionItems.slice(0, 2).map((prompt) => (
            <p key={prompt} className="flex gap-2 text-sm font-semibold leading-snug text-foreground">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
              <span>{prompt}</span>
            </p>
          ))}
          {discussionItems.length > 2 ? (
            <p className="text-xs font-semibold text-primary">+{discussionItems.length - 2} more prompts</p>
          ) : null}
        </div>
      ) : (
        <h3 className="text-sm font-bold leading-snug text-foreground">{title}</h3>
      )}

      {primarySpeaker ? (
        <div className="mt-auto flex items-center gap-2 border-t border-border/60 pt-3">
          <SpeakerAvatar speaker={primarySpeaker} />
          <div className="min-w-0">
            <p className="truncate text-xs font-semibold text-foreground">
              {item.speakers.map((speaker) => speaker.name).join(", ")}
            </p>
            <p className="truncate text-xs text-muted-foreground">{primarySpeaker.company}</p>
          </div>
        </div>
      ) : null}
    </button>
  )
}

export function EventSchedulePlanner({ scheduleEntries, rooms, speakers }: EventSchedulePlannerProps) {
  const [activeDay, setActiveDay] = useState(scheduleEntries[0]?.[0] || "")
  const [selectedItem, setSelectedItem] = useState<ScheduleItem | null>(null)

  const speakerMap = useMemo(() => new Map(speakers.map((speaker) => [speaker.id, speaker])), [speakers])
  const roomMap = useMemo(() => new Map(rooms.map((room) => [room.id, room.name])), [rooms])
  const activeSchedule = scheduleEntries.find(([date]) => date === activeDay)?.[1] ?? scheduleEntries[0]?.[1]

  const makeItem = (session: ScheduleSession, slot: ScheduleSlot, slotIndex: number, sessionIndex: number): ScheduleItem => {
    const sessionSpeakers = getSpeakerIds(session)
      .map((id) => speakerMap.get(id))
      .filter(Boolean) as Speaker[]

    return {
      id: `${activeDay}-${session.room || "all"}-${slotIndex}-${sessionIndex}`,
      date: activeDay,
      time: slot.time,
      duration: slot.duration,
      roomName: session.room ? roomMap.get(session.room) || session.room : "All tracks",
      session,
      speakers: sessionSpeakers,
    }
  }

  if (!activeSchedule) return null

  return (
    <>
      <div className="overflow-hidden rounded-2xl border border-border/70 bg-card shadow-lg shadow-primary/5">
        <div className="sticky top-0 z-30 flex flex-col gap-5 border-b border-border/70 bg-gradient-to-br from-card via-card to-secondary/50 p-4 backdrop-blur md:flex-row md:items-center md:justify-between md:p-5">
          <div className="relative z-10 inline-flex w-full gap-1 rounded-full border border-border bg-secondary/80 p-1 md:w-auto">
            {scheduleEntries.map(([date, day], index) => (
              <button
                key={date}
                type="button"
                onClick={() => {
                  setActiveDay(date)
                  setSelectedItem(null)
                }}
                onPointerDown={(e) => {
                  if (e.button === 0) {
                    setActiveDay(date)
                    setSelectedItem(null)
                  }
                }}
                className={cn(
                  "relative z-10 flex-1 cursor-pointer rounded-full px-4 py-2 text-sm font-semibold transition-colors md:flex-none md:px-5",
                  activeDay === date
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:bg-card/80",
                )}
              >
                {displayDayLabel(date, day.dayLabel, index)}
              </button>
            ))}
          </div>
          <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
            Scan by time and track. Open session cards for speaker profiles, LinkedIn, room, duration, and details.
          </p>
        </div>

        <div className="max-lg:hidden">
          <div className="sticky top-0 z-20 grid grid-cols-[88px_repeat(4,minmax(0,1fr))] gap-3 border-b border-border/70 bg-background/95 p-4 backdrop-blur">
            <div />
            {rooms.map((room) => (
              <div key={room.id} className="rounded-xl border border-border/70 bg-card p-4 shadow-sm">
                <p className="text-sm font-bold text-primary">{room.name}</p>
                <p className="mt-1 text-xs text-muted-foreground">{roomDescriptions[room.id] || "Sessions"}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-[88px_repeat(4,minmax(0,1fr))] gap-3 p-4">
            {activeSchedule.slots.map((slot, slotIndex) => {
              const breakSession = slot.sessions.find((session) => session.type === "break")

              if (breakSession) {
                const item = makeItem(breakSession, slot, slotIndex, 0)

                return (
                  <div key={`${activeDay}-${slot.time}-break`} className="contents">
                    <div className="px-2 py-4 text-sm font-bold text-primary">{slot.time}</div>
                    <button
                      type="button"
                      onClick={() => setSelectedItem(item)}
                      className="col-span-4 rounded-xl border border-border/70 bg-gradient-to-r from-secondary/80 to-card px-5 py-4 text-left transition-colors hover:border-primary/25"
                    >
                      <div className="flex flex-wrap items-center gap-2">
                        <Badge variant="outline" className={cn("rounded-full text-[10px] font-bold", getTypeConfig("break").className)}>
                          Break
                        </Badge>
                        {slot.duration ? <span className="text-xs font-medium text-muted-foreground">{slot.duration} min</span> : null}
                      </div>
                      <h3 className="mt-2 text-base font-bold text-foreground">{cleanTitle(breakSession.title)}</h3>
                      {breakSession.description ? (
                        <p className="mt-1 text-sm text-muted-foreground">{breakSession.description}</p>
                      ) : null}
                    </button>
                  </div>
                )
              }

              return (
                <div key={`${activeDay}-${slot.time}`} className="contents">
                  <div className="px-2 py-4 text-sm font-bold text-primary">{slot.time}</div>
                  {rooms.map((room) => {
                    const sessions = slot.sessions.filter(
                      (session) => session.room === room.id && session.type !== "break" && cleanTitle(session.title),
                    )

                    return (
                      <div
                        key={room.id}
                        className={cn(
                          "min-h-28 rounded-xl border border-dashed border-primary/10 bg-background/45 p-2",
                          sessions.length > 0 && "border-solid border-border/60 bg-background/60",
                        )}
                      >
                        <div className="space-y-2">
                          {sessions.map((session, sessionIndex) => {
                            const item = makeItem(session, slot, slotIndex, sessionIndex)
                            return <SessionCard key={item.id} item={item} onOpen={setSelectedItem} />
                          })}
                        </div>
                      </div>
                    )
                  })}
                </div>
              )
            })}
          </div>
        </div>

        <div className="space-y-4 p-4 lg:hidden">
          {activeSchedule.slots.map((slot, slotIndex) => {
            const breakSession = slot.sessions.find((session) => session.type === "break")

            if (breakSession) {
              const item = makeItem(breakSession, slot, slotIndex, 0)

              return (
                <button
                  key={`${activeDay}-${slot.time}-mobile-break`}
                  type="button"
                  onClick={() => setSelectedItem(item)}
                  className="w-full rounded-xl border border-border/70 bg-secondary/60 p-4 text-left"
                >
                  <p className="mb-2 text-sm font-bold text-primary">{slot.time}</p>
                  <h3 className="font-bold text-foreground">{cleanTitle(breakSession.title)}</h3>
                  {breakSession.description ? <p className="mt-1 text-sm text-muted-foreground">{breakSession.description}</p> : null}
                </button>
              )
            }

            return (
              <div key={`${activeDay}-${slot.time}-mobile`} className="rounded-2xl border border-border/70 bg-background/50 p-4">
                <p className="mb-4 text-sm font-bold text-primary">{slot.time}</p>
                <div className="space-y-4">
                  {rooms.map((room) => {
                    const sessions = slot.sessions.filter(
                      (session) => session.room === room.id && session.type !== "break" && cleanTitle(session.title),
                    )

                    if (sessions.length === 0) return null

                    return (
                      <div key={room.id}>
                        <p className="mb-2 text-xs font-bold uppercase tracking-wide text-muted-foreground">{room.name}</p>
                        <div className="space-y-2">
                          {sessions.map((session, sessionIndex) => {
                            const item = makeItem(session, slot, slotIndex, sessionIndex)
                            return <SessionCard key={item.id} item={item} onOpen={setSelectedItem} />
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

      <Dialog open={Boolean(selectedItem)} onOpenChange={(open) => !open && setSelectedItem(null)}>
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-3xl">
          {selectedItem ? (
            <>
              <DialogHeader>
                <div className="mb-3 flex flex-wrap items-center gap-2">
                  <Badge
                    variant="outline"
                    className={cn("rounded-full text-[10px] font-bold", getTypeConfig(selectedItem.session.type).className)}
                  >
                    {getTypeConfig(selectedItem.session.type).label}
                  </Badge>
                  <span className="text-xs font-medium text-muted-foreground">
                    {selectedItem.time}
                    {selectedItem.duration ? ` · ${selectedItem.duration} min` : ""} · {selectedItem.roomName}
                  </span>
                </div>
                <DialogTitle className="text-2xl font-bold leading-tight md:text-4xl">
                  {cleanTitle(selectedItem.session.title)}
                </DialogTitle>
                {selectedItem.session.description ? (
                  <DialogDescription className="text-base leading-relaxed">
                    {selectedItem.session.description}
                  </DialogDescription>
                ) : null}
              </DialogHeader>

              {selectedItem.speakers.length > 0 ? (
                <div className="space-y-3">
                  {selectedItem.speakers.map((speaker) => (
                    <div key={speaker.id} className="grid gap-4 rounded-2xl border border-border bg-secondary/35 p-3 sm:grid-cols-[64px_1fr_auto] sm:items-center">
                      <SpeakerAvatar speaker={speaker} size="lg" />
                      <div className="min-w-0">
                        <p className="font-bold text-foreground">{speaker.name}</p>
                        <p className="text-sm leading-snug text-muted-foreground">
                          {[speaker.title, speaker.company].filter(Boolean).join(" · ")}
                        </p>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <Button asChild size="sm">
                          <Link href={`/speakers/${speaker.id}`}>
                            Speaker profile <ArrowRight className="h-3.5 w-3.5" />
                          </Link>
                        </Button>
                        {speaker.linkedin ? (
                          <Button asChild size="sm" variant="outline">
                            <Link href={speaker.linkedin} target="_blank" rel="noopener noreferrer">
                              <Linkedin className="h-3.5 w-3.5" />
                              LinkedIn
                            </Link>
                          </Button>
                        ) : null}
                      </div>
                    </div>
                  ))}
                </div>
              ) : null}

              <div className="mt-6 flex justify-end">
                <DialogClose asChild>
                  <Button variant="outline">Close</Button>
                </DialogClose>
              </div>
            </>
          ) : null}
        </DialogContent>
      </Dialog>
    </>
  )
}
