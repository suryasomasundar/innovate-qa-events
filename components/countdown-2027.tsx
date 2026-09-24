import { Button } from "@/components/ui/button"
import { CountdownTimer } from "@/components/countdown-timer"
import { CalendarDays, CalendarRange, MapPin, Presentation, Users } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { BASE_PATH } from "@/lib/constants"

const EVENT_DATE = "2027-05-04T09:00:00"

export function Countdown2027() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-primary/5 via-background to-background">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-5"
        style={{ backgroundImage: `url(${BASE_PATH}/abstract-geometric-purple.png)` }}
      />
      <div className="container relative mx-auto px-4 py-16 md:py-24 lg:py-32">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
          <div className="text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
              <CalendarDays className="h-4 w-4" />
              <span>May 4-6, 2027 • Bellevue, WA</span>
            </div>

            <h1 className="mb-6 text-balance text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
              Welcome to{" "}
               <span className="bg-gradient-to-r from-primary via-purple-600 to-fuchsia-600 bg-clip-text text-transparent drop-shadow-[0_0_18px_rgba(75,0,130,0.25)]">Innovate QA Conference</span>{" "} 2027
            </h1>

            <p className="mb-10 text-pretty text-lg text-muted-foreground md:text-xl">
              Join industry leaders, pioneers, and visionaries sharing insights, best practices, and cutting-edge tools to
              build high-quality, safe, accessible, and reliable systems.
            </p>

            <div className="mb-12">
              <p className="mb-4 text-sm font-medium uppercase tracking-wider text-muted-foreground">Event Starts In</p>
              <CountdownTimer targetDate={EVENT_DATE} />
            </div>

            <div className="mb-12 flex flex-col justify-center gap-4 sm:flex-row">
              <Button size="lg" className="px-8 text-base" asChild>
                <Link href="https://www.eventbrite.com/e/innovate-qa-2027-software-quality-annual-conference-tickets-1979920880652?aff=oddtdtcreator">
                  Buy Ticket
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="bg-transparent px-8 text-base" asChild>
                <Link href="https://docs.google.com/forms/d/e/1FAIpQLSc7UuSnkx7KJEubEnTokjll1-JBqX5X_-rWQfpGqVs9O9ZnAQ/viewform?pli=1">
                  Become Speaker
                </Link>
              </Button>
            </div>

            <div className="mx-auto grid max-w-xl grid-cols-2 items-center gap-x-2 gap-y-3 text-xs text-muted-foreground sm:grid-cols-4 lg:text-sm">
              <div className="flex items-center justify-center gap-1 whitespace-nowrap">
                <Users className="h-4 w-4 shrink-0 text-primary" />
                <span>500+ Attendees</span>
              </div>
              <div className="flex items-center justify-center gap-1 whitespace-nowrap">
                <Presentation className="h-4 w-4 shrink-0 text-primary" />
                <span>20+ Sessions</span>
              </div>
            
              <div className="flex items-center justify-center gap-1 whitespace-nowrap">
                <MapPin className="h-4 w-4 shrink-0 text-primary" />
                <span>Westin Bellevue</span>
              </div>
              <div className="flex items-center justify-center gap-1 whitespace-nowrap">
                <CalendarRange className="h-4 w-4 shrink-0 text-primary" />
                <span>3 Days</span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center lg:justify-end">
            <div className="relative mt-10 aspect-square w-full max-w-md">
              <div className="absolute inset-0">
                <svg viewBox="0 0 200 200" className="h-full w-full" aria-hidden="true">
                  <defs>
                    <path
                      id="countdown2027CirclePath"
                      d="M 100, 95 m -75, 0 a 75,75 0 1,1 150,0 a 75,75 0 1,1 -150,0"
                    />
                    <filter id="countdown2027Embossed">
                      <feGaussianBlur in="SourceAlpha" stdDeviation="2" result="blur" />
                      <feOffset in="blur" dx="3" dy="3" result="offsetBlur" />
                      <feFlood floodColor="rgba(0, 0, 0, 0.4)" result="offsetColor" />
                      <feComposite in="offsetColor" in2="offsetBlur" operator="in" result="shadow" />
                      <feGaussianBlur in="SourceAlpha" stdDeviation="1" result="blur2" />
                      <feOffset in="blur2" dx="-2" dy="-2" result="offsetBlur2" />
                      <feFlood floodColor="rgba(4, 0, 8, 0.6)" result="offsetColor2" />
                      <feComposite in="offsetColor2" in2="offsetBlur2" operator="in" result="highlight" />
                      <feMerge>
                        <feMergeNode in="shadow" />
                        <feMergeNode in="highlight" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                  </defs>
                  <text
                    className="text-[20px] font-bold tracking-[0.3em]"
                    style={{
                      letterSpacing: "0.3em",
                      fill: "white",
                      filter: "url(#countdown2027Embossed)",
                      textShadow: "0 0 10px rgba(87, 3, 165, 0.8)",
                    }}
                  >
                    <textPath href="#countdown2027CirclePath" startOffset="25%" textAnchor="middle">
                      INNOVATE
                    </textPath>
                  </text>
                </svg>
              </div>
              <Image
                src={`${BASE_PATH}/logo.svg`}
                alt="Innovate QA Conference 2027"
                fill
                className="object-contain pt-15 drop-shadow-2xl"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}