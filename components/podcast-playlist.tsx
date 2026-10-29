"use client"

import { useEffect, useRef, useState } from "react"
import Script from "next/script"
import Image from "next/image"
import { Mic2, Youtube } from "lucide-react"

const playlistId = "PLZWbkptMHzKw"

type YouTubePlayer = {
  destroy: () => void
  getPlaylist: () => string[] | null
  getVideoData: () => { video_id?: string }
}

type YouTubePlayerEvent = {
  target: YouTubePlayer
}

declare global {
  interface Window {
    YT?: {
      Player: new (
        element: HTMLElement,
        options: {
          width: string
          height: string
          playerVars: Record<string, string | number>
          events: {
            onReady: (event: YouTubePlayerEvent) => void
            onStateChange: (event: YouTubePlayerEvent) => void
            onError: (event: YouTubePlayerEvent) => void
          }
        },
      ) => YouTubePlayer
    }
  }
}

export function PodcastPlaylist() {
  const mountRef = useRef<HTMLDivElement>(null)
  const playerRef = useRef<YouTubePlayer | null>(null)
  const [scriptLoaded, setScriptLoaded] = useState(false)
  const [hasEpisodes, setHasEpisodes] = useState(false)

  useEffect(() => {
    if (!scriptLoaded) return

    let cancelled = false
    let retryTimer: number | undefined
    let playlistTimer: number | undefined

    const updatePlaylistState = (player: YouTubePlayer, attemptsRemaining = 40) => {
      if (cancelled) return

      const playlistHasEpisodes = Boolean(
        player.getPlaylist()?.length || player.getVideoData().video_id,
      )
      setHasEpisodes(playlistHasEpisodes)

      if (!playlistHasEpisodes && attemptsRemaining > 0) {
        playlistTimer = window.setTimeout(
          () => updatePlaylistState(player, attemptsRemaining - 1),
          250,
        )
      }
    }

    const initializePlayer = () => {
      if (cancelled || playerRef.current || !mountRef.current) return

      if (typeof window.YT?.Player !== "function") {
        retryTimer = window.setTimeout(initializePlayer, 100)
        return
      }

      playerRef.current = new window.YT.Player(mountRef.current, {
        width: "100%",
        height: "100%",
        playerVars: {
          listType: "playlist",
          list: playlistId,
          rel: 0,
        },
        events: {
          onReady: (event) => updatePlaylistState(event.target),
          onStateChange: (event) => updatePlaylistState(event.target, 0),
          onError: (event) => updatePlaylistState(event.target, 0),
        },
      })
    }

    initializePlayer()

    return () => {
      cancelled = true
      if (retryTimer) window.clearTimeout(retryTimer)
      if (playlistTimer) window.clearTimeout(playlistTimer)
      playerRef.current?.destroy()
      playerRef.current = null
    }
  }, [scriptLoaded])

  return (
    <div className="relative aspect-video overflow-hidden rounded-3xl border border-purple-100 bg-gradient-to-br from-purple-950 via-purple-900 to-fuchsia-900 shadow-2xl dark:border-purple-900/50">
      <Script
        src="https://www.youtube.com/iframe_api"
        strategy="afterInteractive"
        onLoad={() => setScriptLoaded(true)}
        onReady={() => setScriptLoaded(true)}
      />

      <div
        className={`absolute inset-0 transition-opacity duration-500 ${hasEpisodes ? "opacity-100" : "pointer-events-none opacity-0"}`}
        aria-hidden={!hasEpisodes}
      >
        <div ref={mountRef} className="h-full w-full" />
      </div>

      {!hasEpisodes ? (
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden px-6 text-center text-white">
          <div className="absolute -left-16 -top-16 h-48 w-48 rounded-full bg-fuchsia-500/25 blur-3xl" />
          <div className="absolute -bottom-20 -right-16 h-56 w-56 rounded-full bg-violet-400/20 blur-3xl" />
          <div className="relative max-w-md">
            <div className="mx-auto mb-5 flex w-fit items-center gap-3 rounded-2xl bg-white p-2 pr-4 text-left text-purple-950 shadow-xl">
              <Image
                src="/innovate-qa-stories-podcast.jpg"
                alt=""
                width={64}
                height={64}
                className="h-14 w-14 rounded-xl object-cover"
              />
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.15em] text-fuchsia-700">Innovate QA Stories</p>
                <p className="text-sm font-semibold">New episodes coming soon</p>
              </div>
            </div>
            <Mic2 className="mx-auto h-8 w-8 text-fuchsia-200" aria-hidden="true" />
            <h3 className="mt-3 text-2xl font-bold md:text-3xl">The first conversations are being prepared.</h3>
            <p className="mt-3 text-sm leading-relaxed text-purple-100 md:text-base">
              Published episodes will appear here automatically from the official YouTube playlist.
            </p>
            <a
              href="https://www.youtube.com/playlist?list=PLZWbkptMHzKw"
              target="_blank"
              rel="noreferrer"
              className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-5 py-2.5 text-sm font-semibold transition-colors hover:bg-white/20"
            >
              <Youtube className="h-4 w-4" aria-hidden="true" /> Open the podcast playlist
            </a>
          </div>
        </div>
      ) : null}
    </div>
  )
}
