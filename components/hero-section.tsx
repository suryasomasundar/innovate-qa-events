import { Button } from "@/components/ui/button"
import { ArrowDown, CalendarDays, MapPin, PlayCircle, Sparkles, Users } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { BASE_PATH, RECORDINGS_URL } from "@/lib/constants"
import homeData from "@/data/home.json"

const iconMap = {
  Users,
  CalendarDays,
  MapPin,
}

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-primary/10 via-background to-background">
      <div
        className="absolute inset-0 opacity-5 bg-cover bg-center"
        style={{ backgroundImage: `url(${BASE_PATH}/abstract-geometric-purple.png)` }}
      />
      <div className="pointer-events-none absolute -left-24 top-20 h-72 w-72 rounded-full bg-fuchsia-500/15 blur-3xl" />
      <div className="pointer-events-none absolute right-[8%] top-10 h-96 w-96 rounded-full bg-primary/15 blur-3xl" />
      <div className="container mx-auto px-4 py-16 md:py-24 lg:py-32 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
          <div className="text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-background/80 px-4 py-2 text-sm font-bold text-primary shadow-sm backdrop-blur">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full rounded-full bg-fuchsia-500 opacity-70 motion-safe:animate-ping" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-primary" />
              </span>
              Recordings now live
            </div>

            <h1 className="mb-6 text-balance text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
              {homeData.hero.title.split("Innovate QA")[0]}
              <span className="bg-gradient-to-r from-primary via-purple-600 to-fuchsia-600 bg-clip-text text-transparent drop-shadow-[0_0_18px_rgba(75,0,130,0.25)]">
                Innovate QA
              </span>
              {homeData.hero.title.split("Innovate QA")[1]}
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground mb-10 text-pretty">
              {homeData.hero.subtitle}
            </p>

            <div className="mb-6 inline-flex items-center gap-2 text-base font-bold text-primary">
              <Sparkles className="h-5 w-5 motion-safe:animate-pulse" />
              Unlimited viewing
            </div>

            <div className="mx-auto mb-5 grid w-full max-w-3xl grid-cols-1 gap-4 sm:grid-cols-2">
              <Button
                size="lg"
                className="h-13 w-full gap-2 bg-gradient-to-r from-primary via-purple-700 to-fuchsia-600 px-7 text-base shadow-[0_14px_35px_rgba(75,0,130,0.35)] transition-transform hover:scale-[1.03] hover:from-primary hover:via-purple-700 hover:to-fuchsia-500"
                asChild
              >
                <a href={RECORDINGS_URL}>
                  <PlayCircle className="h-5 w-5" />
                  Watch Recordings
                  <Sparkles className="h-4 w-4 motion-safe:animate-pulse" />
                </a>
              </Button>
              <Button size="lg" variant="outline" className="h-13 w-full bg-transparent px-7 text-base" asChild>
                <Link href="/events/2026">Explore the 2026 event</Link>
              </Button>
            </div>

            <Link
              href="#testimonials"
              className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-primary/80 hover:underline"
            >
              See what attendees said
              <ArrowDown className="h-4 w-4" />
            </Link>

            <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10 text-sm text-muted-foreground">
              {homeData.hero.stats.map((stat, index) => {
                const Icon = iconMap[stat.icon as keyof typeof iconMap]
                return (
                  <div key={index} className="flex items-center gap-2">
                    <Icon className="h-5 w-5 text-primary" />
                    <span>{stat.text}</span>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="flex items-center justify-center lg:justify-end">
            <div className="relative w-full max-w-md aspect-square mt-10">
              <div className="absolute inset-0">
                <svg viewBox="0 0 200 200" className="w-full h-full">
                  <defs>
                    <path
                      id="circlePath"
                      d="M 100, 95 m -75, 0 a 75,75 0 1,1 150,0 a 75,75 0 1,1 -150,0"
                    />
                    <filter id="embossed">
                      <feGaussianBlur in="SourceAlpha" stdDeviation="2" result="blur"/>
                      <feOffset in="blur" dx="3" dy="3" result="offsetBlur"/>
                      <feFlood floodColor="rgba(0, 0, 0, 0.4)" result="offsetColor"/>
                      <feComposite in="offsetColor" in2="offsetBlur" operator="in" result="shadow"/>
                      <feGaussianBlur in="SourceAlpha" stdDeviation="1" result="blur2"/>
                      <feOffset in="blur2" dx="-2" dy="-2" result="offsetBlur2"/>
                      <feFlood floodColor="rgba(4, 0, 8, 0.6)" result="offsetColor2"/>
                      <feComposite in="offsetColor2" in2="offsetBlur2" operator="in" result="highlight"/>
                      <feMerge>
                        <feMergeNode in="shadow"/>
                        <feMergeNode in="highlight"/>
                        <feMergeNode in="SourceGraphic"/>
                      </feMerge>
                    </filter>
                  </defs>
                  <text className="text-[20px] font-bold tracking-[0.3em]" style={{ letterSpacing: '0.3em', fill: 'white', filter: 'url(#embossed)', textShadow: '0 0 10px rgba(87, 3, 165, 0.8)' }}>
                    <textPath href="#circlePath" startOffset="25%" textAnchor="middle">INNOVATE</textPath>
                  </text>
                </svg>
              </div>
              <Image
                src={`${BASE_PATH}/logo.svg`}
                alt="Innovate QA Conference 2026"
                fill
                className="object-contain drop-shadow-2xl pt-15"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
