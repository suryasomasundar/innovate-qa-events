"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, Clock } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import event2026 from "@/data/events/2026.json"

const typeConfig: Record<string, { label: string; className: string }> = {
  keynote:    { label: "Keynote",    className: "bg-primary/10 text-primary border-primary/20" },
  talk:       { label: "Talk",       className: "bg-blue-500/10 text-blue-600 border-blue-200" },
  workshop:   { label: "Workshop",   className: "bg-emerald-500/10 text-emerald-600 border-emerald-200" },
  panel:      { label: "Panel",      className: "bg-orange-500/10 text-orange-600 border-orange-200" },
  discussion: { label: "Discussion", className: "bg-purple-500/10 text-purple-600 border-purple-200" },
  gameshow:   { label: "Game Show",  className: "bg-pink-500/10 text-pink-600 border-pink-200" },
  networking: { label: "Networking", className: "bg-teal-500/10 text-teal-600 border-teal-200" },
}

const SKIP_TYPES = new Set(["break"])
const DAY_LABELS: Record<string, string> = {
  "2026-06-05": "Day 1 · June 5",
  "2026-06-06": "Day 2 · June 6",
}

const speakerMap = new Map(event2026.speakers.map((s) => [s.id, s]))
const days = Object.keys(event2026.schedule)

type ScheduleSession = {
  title?: string
  type: string
  speakers?: string[]
  speakerId?: string
}

export function FeaturedSessions() {
  const [activeDay, setActiveDay] = useState(days[0])

  const schedule = event2026.schedule as Record<string, { dayLabel: string; slots: Array<{ time: string; sessions: ScheduleSession[] }> }>
  const slots = schedule[activeDay]?.slots ?? []

  const cards = slots.flatMap((slot) =>
    slot.sessions
      .filter((s) => !SKIP_TYPES.has(s.type) && s.title?.trim())
      .map((s) => {
        const ids = s.speakers ?? (s.speakerId ? [s.speakerId] : [])
        const speakers = ids.map((id) => speakerMap.get(id)).filter(Boolean)
        return { time: slot.time, type: s.type, title: s.title!, speakers }
      })
  )

  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4">

        <div className="max-w-3xl mx-auto text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Schedule</h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full mb-6" />
          <p className="text-lg text-muted-foreground">
            Innovate QA 2026 · June 5–6 · Westin Bellevue, WA
          </p>
        </div>

        {/* Day tabs */}
        <div className="flex gap-2 justify-center mb-8">
          {days.map((date) => (
            <button
              key={date}
              onClick={() => setActiveDay(date)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${
                activeDay === date
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {DAY_LABELS[date] ?? date}
            </button>
          ))}
        </div>

        {/* Session cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
          {cards.map((card, i) => {
            const config = typeConfig[card.type] ?? typeConfig.talk
            return (
              <Card key={i} className="border border-border/50 hover:shadow-md transition-shadow flex flex-col">
                <CardContent className="p-4 flex flex-col gap-3 h-full">
                  <div className="flex items-center justify-between gap-2">
                    <Badge variant="outline" className={`text-xs ${config.className}`}>
                      {config.label}
                    </Badge>
                    <span className="text-xs text-muted-foreground flex items-center gap-1 shrink-0">
                      <Clock className="h-3 w-3" />
                      {card.time}
                    </span>
                  </div>
                  {card.type === "discussion" ? (
                    <ul className="flex-1 flex flex-col gap-1">
                      {card.title.split("|").map((item, j) => (
                        <li key={j} className="text-xs text-foreground leading-snug flex items-start gap-1.5">
                          <span className="text-primary mt-0.5 shrink-0">•</span>
                          <span>{item.replace(/^#\d+\s*/, "").trim()}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm font-semibold text-foreground leading-snug flex-1">{card.title}</p>
                  )}
                  {card.speakers.length > 0 && (
                    <div className="flex items-center gap-2 pt-2 border-t border-border/40 mt-auto">
                      <div className="flex -space-x-1.5">
                        {card.speakers.slice(0, 3).map((spk, j) => (
                          spk?.image ? (
                            <div key={j} className="relative h-7 w-7 rounded-full overflow-hidden border-2 border-background ring-1 ring-border/50">
                              <Image src={spk.image} alt={spk.name} fill className="object-cover" unoptimized />
                            </div>
                          ) : (
                            <div key={j} className="h-7 w-7 rounded-full bg-muted border-2 border-background ring-1 ring-border/50 flex items-center justify-center text-xs font-medium text-muted-foreground">
                              {spk?.name?.[0]}
                            </div>
                          )
                        ))}
                      </div>
                      <span className="text-xs text-muted-foreground truncate">
                        {card.speakers.slice(0, 2).map((s) => s?.name).join(", ")}
                        {card.speakers.length > 2 && ` +${card.speakers.length - 2}`}
                      </span>
                    </div>
                  )}
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="text-center mt-10">
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
