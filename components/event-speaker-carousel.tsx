"use client"

import type { CSSProperties, KeyboardEvent, WheelEvent } from "react"
import { useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight, Linkedin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { BASE_PATH } from "@/lib/constants"

type EventSpeaker = {
  id: string
  name: string
  title?: string
  role?: string
  company?: string
  image?: string
  linkedin?: string
  social?: { linkedin?: string }
  topic?: string
}

const slotStyles: Record<string, CSSProperties> = {
  "0": {
    transform: "translateX(-720px) rotateY(-34deg) scale(0.78)",
    opacity: 0.26,
    zIndex: 1,
    filter: "blur(0.25px)",
    pointerEvents: "none",
  },
  "1": {
    transform: "translateX(-540px) rotateY(-26deg) scale(0.84)",
    opacity: 0.5,
    zIndex: 2,
  },
  "2": {
    transform: "translateX(-360px) rotateY(-16deg) scale(0.92)",
    opacity: 0.82,
    zIndex: 3,
  },
  "3": {
    transform: "translateX(-118px) rotateY(0deg) scale(1.08)",
    opacity: 1,
    zIndex: 5,
  },
  "4": {
    transform: "translateX(124px) rotateY(16deg) scale(0.92)",
    opacity: 0.82,
    zIndex: 3,
  },
  "5": {
    transform: "translateX(304px) rotateY(26deg) scale(0.84)",
    opacity: 0.5,
    zIndex: 2,
  },
  "6": {
    transform: "translateX(484px) rotateY(34deg) scale(0.78)",
    opacity: 0.26,
    zIndex: 1,
    filter: "blur(0.25px)",
    pointerEvents: "none",
  },
  "out-left": {
    transform: "translateX(-890px) rotateY(-38deg) scale(0.72)",
    opacity: 0,
    zIndex: 0,
    pointerEvents: "none",
  },
  "out-right": {
    transform: "translateX(654px) rotateY(38deg) scale(0.72)",
    opacity: 0,
    zIndex: 0,
    pointerEvents: "none",
  },
}

function nameLines(name: string) {
  const parts = name.trim().split(/\s+/)

  if (parts.length <= 1) return [name]
  if (parts[0] === "Dr." && parts.length > 2) return [`${parts[0]} ${parts[1]}`, parts.slice(2).join(" ")]
  if (parts.length === 2) return parts

  return [parts[0], parts.slice(1).join(" ")]
}

function imageSrc(speaker: EventSpeaker) {
  return speaker.image ? `${BASE_PATH}${speaker.image}` : "/placeholder.svg"
}

function linkedinUrl(speaker: EventSpeaker) {
  return speaker.linkedin ?? speaker.social?.linkedin ?? ""
}

export function EventSpeakerCarousel({
  speakers,
  eyebrow = "Featured Speakers",
  title = "Speakers",
}: {
  speakers: EventSpeaker[]
  eyebrow?: string
  title?: string
}) {
  const initialIndex = Math.min(3, Math.max(speakers.length - 1, 0))
  const [activeIndex, setActiveIndex] = useState(initialIndex)
  const wheelRemainder = useRef(0)

  const hasPrevious = activeIndex > 0
  const hasNext = activeIndex < speakers.length - 1

  function previous() {
    setActiveIndex((index) => Math.max(0, index - 1))
  }

  function next() {
    setActiveIndex((index) => Math.min(speakers.length - 1, index + 1))
  }

  function slotFor(index: number) {
    const slot = index - activeIndex + 3

    if (slot < 0) return "out-left"
    if (slot > 6) return "out-right"
    return String(slot)
  }

  function handleWheel(event: WheelEvent<HTMLDivElement>) {
    const horizontalIntent = event.shiftKey || Math.abs(event.deltaX) > Math.abs(event.deltaY)

    if (!horizontalIntent) return

    event.preventDefault()

    const delta = event.shiftKey ? event.deltaY : event.deltaX
    wheelRemainder.current += delta

    if (wheelRemainder.current > 58) {
      next()
      wheelRemainder.current = 0
    }

    if (wheelRemainder.current < -58) {
      previous()
      wheelRemainder.current = 0
    }
  }

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "ArrowLeft") {
      event.preventDefault()
      previous()
    }

    if (event.key === "ArrowRight") {
      event.preventDefault()
      next()
    }
  }

  return (
    <section id="speakers" className="overflow-hidden bg-[#f8f5fb] py-20">
      <div className="container mx-auto px-4">
        <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-5xl font-semibold leading-none tracking-normal text-primary md:text-6xl lg:text-7xl">
            {title}
          </h2>
          <Button asChild className="w-fit rounded-full px-8">
            <Link href="/speakers">See all speakers</Link>
          </Button>
        </div>

        <p className="mb-5 text-sm font-bold uppercase tracking-normal text-muted-foreground">{eyebrow}</p>

        <div
          className="outline-none"
          tabIndex={0}
          role="region"
          aria-label="Featured speaker carousel"
          onKeyDown={handleKeyDown}
          onWheel={handleWheel}
        >
          <div
            className="relative h-[500px] overflow-hidden bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.98)_0%,rgba(248,246,251,0.9)_42%,rgba(220,214,224,0.82)_100%)]"
            style={{ perspective: "1400px", transformStyle: "preserve-3d", overscrollBehaviorX: "contain" }}
          >
            {speakers.map((speaker, index) => {
              const slot = slotFor(index)
              const link = linkedinUrl(speaker)
              const role = speaker.title ?? speaker.role ?? ""

              return (
                <article
                  key={speaker.id}
                  className="absolute left-1/2 top-14 h-[370px] w-[236px] origin-center bg-white shadow-[0_22px_58px_rgba(45,24,64,0.18)] transition-[transform,opacity,filter] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                  style={slotStyles[slot]}
                  aria-hidden={slot === "out-left" || slot === "out-right"}
                >
                  <div className="relative h-full overflow-hidden">
                    <Link
                      href={`/speakers/${speaker.id}`}
                      className="absolute inset-0 z-30"
                      aria-label={`View ${speaker.name}'s speaker profile`}
                    />

                    <div className="relative z-10 px-4 pt-5">
                      <h3 className="text-[1.68rem] font-semibold leading-[0.96] tracking-normal text-[#c83bea]">
                        {nameLines(speaker.name).map((line) => (
                          <span key={line} className="block">
                            {line}
                          </span>
                        ))}
                      </h3>
                    </div>

                    <div className="absolute left-0 right-0 top-[128px] h-[174px] bg-[#d8d3da] [clip-path:polygon(0_16%,100%_0,100%_100%,0_100%)]" />
                    <div className="absolute left-4 right-4 top-[104px] z-10 h-[174px] overflow-hidden bg-muted">
                      <Image
                        src={imageSrc(speaker)}
                        alt={speaker.name}
                        fill
                        sizes="236px"
                        className={`${speaker.id === "amber" ? "object-contain" : "object-cover"} object-top`}
                      />
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 z-20 min-h-[84px] px-4 pb-5 pt-4">
                      <div className="absolute inset-0 -z-10 bg-[#efeaf1] [clip-path:polygon(0_14%,100%_0,100%_100%,0_100%)]" />
                      {speaker.company && (
                        <p className="max-w-[168px] text-sm font-bold leading-tight tracking-normal text-primary">
                          {speaker.company}
                        </p>
                      )}
                      {role && <p className="max-w-[168px] text-xs font-medium leading-snug text-primary/75">{role}</p>}

                      {link && (
                        <a
                          href={link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="absolute bottom-4 right-4 z-40 flex h-9 w-9 items-center justify-center rounded-full border border-primary/10 bg-white text-primary shadow-sm transition-colors hover:bg-primary hover:text-white"
                          aria-label={`${speaker.name} on LinkedIn`}
                        >
                          <Linkedin className="h-4 w-4" />
                        </a>
                      )}
                    </div>
                  </div>
                </article>
              )
            })}
          </div>

          <div className="mt-6 flex items-center justify-between">
            <button
              type="button"
              onClick={previous}
              disabled={!hasPrevious}
              className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors hover:bg-primary hover:text-white disabled:pointer-events-none disabled:opacity-35"
              aria-label="Previous speaker"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={next}
              disabled={!hasNext}
              className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors hover:bg-primary hover:text-white disabled:pointer-events-none disabled:opacity-35"
              aria-label="Next speaker"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
