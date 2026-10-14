import Image from "next/image"
import Link from "next/link"
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Lightbulb,
  MapPin,
  TrendingUp,
  Users,
  Wrench,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BreadcrumbLD } from "@/components/json-ld"
import { generateSEO } from "@/components/seo"
import workshopData from "@/data/events/workshop-day.json"

const benefitIcons = {
  "hands-on-practice": Wrench,
  "expert-guidance": Lightbulb,
  "career-growth": TrendingUp,
  "community-connections": Users,
}

export const metadata = generateSEO({
  title: "Workshop Day",
  description: workshopData.description,
  canonical: "/events/workshop-day",
  ogType: "event",
  keywords: [
    "QA workshop",
    "quality engineering",
    "test automation",
    "AI testing",
    "Bellevue",
  ],
})

export default function WorkshopDayPage() {
  return (
    <>
      <BreadcrumbLD
        items={[
          { name: "Home", url: "/" },
          { name: workshopData.name, url: "/events/workshop-day" },
        ]}
      />

      <header className="event-connected-header border-b border-white/10 text-white">
        <div className="event-header-orbital" aria-hidden="true" />
        <div className="event-header-mask" aria-hidden="true" />
        <div className="container relative z-10 mx-auto px-4 py-20 md:py-28">
          <div className="max-w-4xl">
            <Badge className="mb-6 border-white/20 bg-white/10 text-white hover:bg-white/10">
              November 2026 · Dates to be confirmed
            </Badge>
            <h1 className="text-5xl font-bold leading-tight text-white md:text-7xl">
              {workshopData.name}
            </h1>
            <p className="mt-5 max-w-3xl text-xl font-semibold leading-relaxed text-purple-100 md:text-2xl">
              {workshopData.tagline}
            </p>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/80">
              {workshopData.description}
            </p>

            <div className="mt-8 flex flex-col gap-3 text-white/85 sm:flex-row sm:flex-wrap sm:gap-6">
              <span className="flex items-center gap-2">
                <CalendarDays className="h-5 w-5 text-cyan-200" aria-hidden="true" />
                Four tentative November dates
              </span>
              <span className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-cyan-200" aria-hidden="true" />
                {workshopData.venue.name}
              </span>
              <span className="flex items-center gap-2">
                <Clock3 className="h-5 w-5 text-cyan-200" aria-hidden="true" />
                Full-day, hands-on format
              </span>
            </div>

            <Button asChild size="lg" variant="secondary" className="mt-10 min-h-11">
              <Link
                href={workshopData.registration.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {workshopData.registration.label}
                <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <div>
        <section aria-labelledby="format-heading" className="bg-background py-16 md:py-20">
          <div className="container mx-auto grid gap-10 px-4 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
            <div>
              <p className="mb-3 text-sm font-bold uppercase tracking-wider text-primary">
                Learn by doing
              </p>
              <h2 id="format-heading" className="text-3xl font-bold md:text-4xl">
                More depth than a traditional conference session
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
                Rather than short conference-style talks, Workshop Day gives you more time to
                dive into practical topics with experienced industry leaders — from AI and
                modern test automation to career development.
              </p>
            </div>

            <div className="rounded-2xl border bg-card p-6 shadow-sm md:p-8">
              <div className="flex items-center gap-3">
                <CalendarDays className="h-7 w-7 text-primary" aria-hidden="true" />
                <h2 className="text-2xl font-bold">Tentative dates</h2>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                The final date will be announced to the waiting list.
              </p>
              <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                {workshopData.dates.map((option) => (
                  <li
                    key={option.date}
                    className="flex items-center gap-3 rounded-lg border bg-background px-4 py-3"
                  >
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
                    <span className="font-medium">{option.label}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-5 flex items-center gap-2 text-sm font-medium">
                <MapPin className="h-4 w-4 text-primary" aria-hidden="true" />
                Bellevue, Washington · {workshopData.venue.name}
              </p>
            </div>
          </div>
        </section>

        <section
          aria-labelledby="workshops-heading"
          className="border-y bg-muted/40 py-16 md:py-24"
        >
          <div className="container mx-auto px-4">
            <div className="mx-auto mb-12 max-w-3xl text-center">
              <p className="mb-3 text-sm font-bold uppercase tracking-wider text-primary">
                Workshops &amp; speakers
              </p>
              <h2 id="workshops-heading" className="text-3xl font-bold md:text-5xl">
                Practical sessions led by industry experts
              </h2>
            </div>

            <ul className="grid gap-6 md:grid-cols-2">
              {workshopData.workshops.map((workshop) => (
                <li key={workshop.speaker}>
                  <article className="h-full overflow-hidden rounded-2xl border bg-card shadow-sm">
                    <div className="grid h-full sm:grid-cols-[10rem_1fr]">
                      <div className="relative min-h-64 bg-muted sm:min-h-full">
                        <Image
                          src={workshop.image}
                          alt={`Portrait of ${workshop.speaker}`}
                          fill
                          sizes="(max-width: 640px) 100vw, 160px"
                          className="object-cover"
                        />
                      </div>
                      <div className="flex flex-col p-6">
                        <h3 className="text-2xl font-bold">{workshop.speaker}</h3>
                        <p className="mt-1 text-sm text-muted-foreground">
                          {workshop.title}
                          {workshop.company && ` · ${workshop.company}`}
                        </p>
                        <div className="my-5 h-px bg-border" aria-hidden="true" />
                        <p className="text-lg font-semibold text-primary">{workshop.topic}</p>
                        <p className="mt-3 leading-relaxed text-muted-foreground">
                          {workshop.description}
                        </p>
                      </div>
                    </div>
                  </article>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section aria-labelledby="benefits-heading" className="bg-background py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="mx-auto mb-12 max-w-3xl text-center">
              <p className="mb-3 text-sm font-bold uppercase tracking-wider text-primary">
                Workshop benefits
              </p>
              <h2 id="benefits-heading" className="text-3xl font-bold md:text-5xl">
                Leave with more than notes
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
                Spend the day building practical skills, learning from experts, and connecting
                with people who care about better software quality.
              </p>
            </div>

            <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {workshopData.benefits.map((benefit) => {
                const Icon = benefitIcons[benefit.id as keyof typeof benefitIcons]

                return (
                  <li key={benefit.id}>
                    <article className="h-full rounded-2xl border bg-card p-6 shadow-sm">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                        <Icon className="h-6 w-6" aria-hidden="true" />
                      </div>
                      <h3 className="mt-6 text-xl font-bold">{benefit.title}</h3>
                      <p className="mt-3 leading-relaxed text-muted-foreground">
                        {benefit.description}
                      </p>
                    </article>
                  </li>
                )
              })}
            </ul>
          </div>
        </section>

        <section aria-labelledby="attend-heading" className="bg-background py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl rounded-3xl bg-primary p-8 text-primary-foreground md:p-12">
              <div className="grid gap-8 md:grid-cols-[auto_1fr] md:items-start">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/10">
                  <Users className="h-7 w-7" aria-hidden="true" />
                </div>
                <div>
                  <h2 id="attend-heading" className="text-3xl font-bold md:text-4xl">
                    Why attend?
                  </h2>
                  <p className="mt-5 text-lg leading-relaxed text-primary-foreground/85">
                    {workshopData.whyAttend}
                  </p>
                  <div className="mt-8 flex flex-wrap items-center gap-4">
                    <Button asChild size="lg" variant="secondary" className="min-h-11">
                      <Link
                        href={workshopData.registration.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Join the waiting list
                        <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                      </Link>
                    </Button>
                    <span className="flex items-center gap-2 text-sm text-primary-foreground/80">
                      <Wrench className="h-4 w-4" aria-hidden="true" />
                      Final date and venue updates will be shared by email.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
