"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp, Play } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

type Category = "AI & Modern QA" | "Careers & Leadership" | "Practitioner Stories"

type Episode = {
  title: string
  duration?: string
  videoId: string
  category: Category
}

const playlistId = "PLKkqQ3Fvc0U3J4-WQEq5EJJqwy_fVpoNP"

const episodes: Episode[] = [
  // Editorially selected first six: a balanced starting point across AI, career, leadership, and practitioner insight.
  { title: "Applying AI Across the Quality Engineering Lifecycle", duration: "51 min", videoId: "NsEVle-9XQU", category: "AI & Modern QA" },
  { title: "LLM Evaluation: Foundations of a Test Framework", duration: "55 min", videoId: "YuO_G5-RoQk", category: "AI & Modern QA" },
  { title: "Fireside Chat: AI in the Future of Quality", duration: "43 min", videoId: "m2HN25vwh9c", category: "AI & Modern QA" },
  { title: "AI-Powered Job Search: Beat the 2026 Application Tsunami", duration: "53 min", videoId: "2djHdHFDzy0", category: "Careers & Leadership" },
  { title: "Journey to Leadership: From SDET to Engineering Manager", duration: "41 min", videoId: "8h-hvdafbuM", category: "Careers & Leadership" },
  { title: "Interview with Ruslan Desyatnikov", duration: "46 min", videoId: "UDNaXpdkWkc", category: "Practitioner Stories" },
  { title: "Will AI Replace QA?", duration: "50 sec", videoId: "WAOaRVzOH9E", category: "AI & Modern QA" },
  { title: "What Will QA Look Like in the Age of AI?", duration: "54 sec", videoId: "DT0TmoQJrgk", category: "AI & Modern QA" },
  { title: "Will Travel to Find a Job: Advanced Job Search Strategies", duration: "9 min", videoId: "uZeCBWXQTTw", category: "Careers & Leadership" },
  { title: "Welcome to Our Live Show", duration: "24 min", videoId: "w7o76h9BedM", category: "Practitioner Stories" },
  { title: "AI in the Future of Management", videoId: "IT7qkfYP2GE", category: "Careers & Leadership" },
  { title: "How to Use LinkedIn to Land More Interviews", duration: "50 min", videoId: "C7GzvXCCoYA", category: "Careers & Leadership" },
  { title: "Build Break Beyond with Tatyana Arbouzova", duration: "15 min", videoId: "-Aqr8ICKggg", category: "Practitioner Stories" },
  { title: "Interview with Kanika Pandey", duration: "25 min", videoId: "d3TV8TYU9Ss", category: "Practitioner Stories" },
  { title: "Interview with Joe Colantonio", duration: "25 min", videoId: "jFwwqpbhemk", category: "Practitioner Stories" },
  { title: "Interview with Ryan Wilder", duration: "27 min", videoId: "zbtASvs9S6w", category: "Practitioner Stories" },
  { title: "ZAPTALK Episode 6", duration: "42 min", videoId: "RpyV5F21vTo", category: "Practitioner Stories" },
]

const categories: Array<"All" | Category> = ["All", "AI & Modern QA", "Careers & Leadership", "Practitioner Stories"]

export function PodcastLibrary() {
  const [activeCategory, setActiveCategory] = useState<(typeof categories)[number]>("All")
  const [showAll, setShowAll] = useState(false)
  const visibleEpisodes = activeCategory === "All" ? episodes : episodes.filter((episode) => episode.category === activeCategory)
  const displayedEpisodes = showAll ? visibleEpisodes : visibleEpisodes.slice(0, 6)

  return (
    <div className="mx-auto max-w-6xl">
      <div className="mb-8 flex flex-wrap gap-2" role="group" aria-label="Filter podcast episodes by topic">
        {categories.map((category) => {
          const count = category === "All" ? episodes.length : episodes.filter((episode) => episode.category === category).length
          const isActive = activeCategory === category
          return (
            <button
              key={category}
              type="button"
              onClick={() => {
                setActiveCategory(category)
                setShowAll(false)
              }}
              aria-pressed={isActive}
              className={`rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
                isActive
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-purple-200 bg-background text-foreground hover:border-primary/50 hover:text-primary dark:border-purple-900"
              }`}
            >
              {category} <span className={isActive ? "text-white/70" : "text-muted-foreground"}>({count})</span>
            </button>
          )
        })}
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {displayedEpisodes.map((episode) => (
          <a
            key={episode.videoId}
            href={`https://www.youtube.com/watch?v=${episode.videoId}&list=${playlistId}`}
            target="_blank"
            rel="noreferrer"
            className="group block"
          >
            <Card className="h-full overflow-hidden border-purple-100 bg-white p-0 shadow-sm transition-all group-hover:-translate-y-1 group-hover:shadow-xl dark:border-purple-900/50 dark:bg-card">
              <div className="relative aspect-video overflow-hidden bg-purple-950">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`https://i.ytimg.com/vi/${episode.videoId}/hqdefault.jpg`}
                  alt=""
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/10 transition-colors group-hover:bg-black/25" />
                <span className="absolute bottom-3 left-3 flex h-10 w-10 items-center justify-center rounded-full bg-white text-primary shadow-lg transition-transform group-hover:scale-110">
                  <Play className="ml-0.5 h-4 w-4 fill-current" aria-hidden="true" />
                </span>
                {episode.duration ? (
                  <span className="absolute bottom-3 right-3 rounded-md bg-black/80 px-2 py-1 text-xs font-semibold text-white">
                    {episode.duration}
                  </span>
                ) : null}
              </div>
              <CardContent className="p-5">
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-primary">{episode.category}</p>
                <h3 className="mt-2 text-lg font-semibold leading-snug group-hover:text-primary">{episode.title}</h3>
              </CardContent>
            </Card>
          </a>
        ))}
      </div>

      <div className="mt-8 flex flex-col items-center gap-3">
        {visibleEpisodes.length > 6 ? (
          <button
            type="button"
            onClick={() => setShowAll((current) => !current)}
            aria-expanded={showAll}
            className="inline-flex min-h-11 items-center justify-center rounded-full border border-primary/25 bg-background px-6 py-2.5 text-sm font-semibold text-primary shadow-sm transition-all hover:border-primary/50 hover:bg-purple-50 hover:shadow-md dark:hover:bg-purple-950/30"
          >
            {showAll ? (
              <>
                Show fewer episodes <ChevronUp className="ml-2 h-4 w-4" aria-hidden="true" />
              </>
            ) : (
              <>
                Show all {visibleEpisodes.length} episodes <ChevronDown className="ml-2 h-4 w-4" aria-hidden="true" />
              </>
            )}
          </button>
        ) : null}
        <p className="text-center text-sm text-muted-foreground">
          {showAll || visibleEpisodes.length <= 6
            ? `Showing ${visibleEpisodes.length} currently public ${visibleEpisodes.length === 1 ? "episode" : "episodes"}.`
            : `Showing 6 of ${visibleEpisodes.length} episodes.`}{" "}
          One additional playlist item is unavailable on YouTube.
        </p>
      </div>
    </div>
  )
}
