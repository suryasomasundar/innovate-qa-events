import { CalendarDays, MapPin, Users } from "lucide-react"
import Image from "next/image"
import { BASE_PATH } from "@/lib/constants"
import homeData from "@/data/home.json"
import { RecordingsLaunchHero } from "@/components/recordings-launch-hero"

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
            <RecordingsLaunchHero />

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
