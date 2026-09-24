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
    <section className="relative overflow-hidden border-y border-rose-200/50 bg-gradient-to-br from-rose-50 via-background to-sky-50 dark:border-rose-900/30 dark:from-rose-950/20 dark:via-background dark:to-sky-950/20">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-[0.04]"
        style={{ backgroundImage: `url(${BASE_PATH}/abstract-purple-tech-pattern.png)` }}
      />
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
            <div className="relative mt-10 aspect-[1200/630] w-full max-w-xl overflow-hidden rounded-lg border border-rose-200/70 bg-slate-950 shadow-2xl shadow-rose-950/20 lg:mt-0 dark:border-rose-900/50">
              <Image
                src={`${BASE_PATH}/social-preview.jpg`}
                alt="Innovate QA 2026 conference audience and event details"
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 576px, 90vw"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
