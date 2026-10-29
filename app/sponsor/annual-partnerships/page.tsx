import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ArrowDown, ArrowRight, BarChart3, CalendarDays, Check, Mail, Megaphone, Mic, Podcast, Users, Video, type LucideIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { PartnershipPackages } from "@/components/partnership-packages"
import { generateSEO } from "@/components/seo"
import { appConfig } from "@/lib/app-config"
import { BASE_PATH } from "@/lib/constants"
import sponsorData from "@/data/sponsor/2027.json"

const annual = sponsorData.annualPartnerships
const icons: Record<string, LucideIcon> = { Megaphone, Mic, Users, Podcast, CalendarDays, Video }

export const metadata: Metadata = generateSEO({
  title: annual.title,
  description: annual.description,
  canonical: "/sponsor/annual-partnerships/",
})

const { audience, professions, packages, differentiators, metrics } = annual
const goals = annual.goals.map((goal) => ({ ...goal, icon: icons[goal.icon] ?? Megaphone }))
const opportunities = annual.opportunities.map((opportunity) => ({ ...opportunity, icon: icons[opportunity.icon] ?? Megaphone }))
const differentiatorStyles = [
  { icon: Users, gradient: "from-violet-100 via-card to-indigo-50 dark:from-violet-950 dark:to-indigo-950" },
  { icon: Mic, gradient: "from-sky-100 via-card to-cyan-50 dark:from-sky-950 dark:to-cyan-950" },
  { icon: CalendarDays, gradient: "from-amber-100 via-card to-orange-50 dark:from-amber-950 dark:to-orange-950" },
  { icon: Podcast, gradient: "from-rose-100 via-card to-pink-50 dark:from-rose-950 dark:to-pink-950" },
  { icon: Check, gradient: "from-emerald-100 via-card to-teal-50 dark:from-emerald-950 dark:to-teal-950" },
]

export default function AnnualPartnershipsPage() {
  const { partnershipCallUrl } = appConfig.sponsorship

  return (
    <div className="min-h-screen bg-background">
      <section className="relative isolate overflow-hidden bg-black py-16 text-white md:py-24">
        <Image src={`${BASE_PATH}${annual.hero.image}`} alt="" fill priority sizes="100vw" className="-z-20 object-cover" />
        <div className="absolute inset-0 -z-10 bg-black/75" />
        <div className="container mx-auto px-4">
          <div className="max-w-4xl">
            <p className="mb-5 text-sm font-semibold uppercase">{annual.hero.eyebrow}</p>
            <h1 className="mb-6 text-4xl font-bold leading-tight text-balance md:text-5xl">{annual.hero.title}</h1>
            <p className="mb-4 max-w-3xl text-xl leading-relaxed text-white/95">{annual.hero.description}</p>
            <p className="max-w-3xl text-base leading-relaxed text-white/85">{annual.hero.detail}</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button size="lg" asChild className="h-auto min-h-11 whitespace-normal">
                <a href={partnershipCallUrl}><Mail className="mr-2 h-4 w-4 shrink-0" aria-hidden="true" />Discuss a Partnership</a>
              </Button>
              <Button size="lg" variant="outline" asChild className="h-auto min-h-11 whitespace-normal border-white/60 bg-black/30 text-white hover:bg-white hover:text-black">
                <Link href="#packages"><ArrowDown className="mr-2 h-4 w-4 shrink-0" aria-hidden="true" />View Partnership Packages</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="container mx-auto max-w-6xl px-4">
          <h2 className="mb-10 text-3xl font-bold md:text-4xl">Connect With the Innovate QA Community</h2>
          <dl className="grid grid-cols-2 gap-6 border-y border-border py-8 md:grid-cols-4">
            {audience.map(([value, label]) => (
              <div key={label} className="min-w-0">
                <dt className="text-sm text-muted-foreground">{label}</dt>
                <dd className="mt-2 text-3xl font-bold text-primary md:text-4xl">{value}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-4 text-sm text-muted-foreground">{annual.audienceNote}</p>
          <h3 className="mb-5 mt-10 text-xl font-semibold">Our community includes</h3>
          <ul className="grid gap-4 md:grid-cols-2">
            {professions.map((profession) => <li key={profession} className="flex gap-3"><Check className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" /><span>{profession}</span></li>)}
          </ul>
        </div>
      </section>

      <section className="bg-muted/30 py-16 md:py-20">
        <div className="container mx-auto max-w-6xl px-4">
          <h2 className="mb-10 text-3xl font-bold md:text-4xl">Built Around Your Marketing Goals</h2>
          <div className="grid gap-8 md:grid-cols-3">
            {goals.map((goal) => (
              <div key={goal.title}>
                <goal.icon className="mb-4 h-7 w-7 text-primary" aria-hidden="true" />
                <h3 className="mb-3 text-xl font-semibold">{goal.title}</h3>
                <p className="leading-relaxed text-muted-foreground">{goal.description}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 border-t border-border pt-6">
            <h3 className="mb-2 text-lg font-semibold">Support Demand Generation</h3>
            <p className="max-w-4xl text-muted-foreground">{annual.demandGeneration}</p>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="container mx-auto max-w-6xl px-4">
          <h2 className="mb-10 text-3xl font-bold md:text-4xl">One Partnership. Multiple Ways to Engage.</h2>
          <div className="grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
            {opportunities.map((opportunity) => (
              <div key={opportunity.title} className="border-t border-border pt-5">
                <opportunity.icon className="mb-4 h-6 w-6 text-primary" aria-hidden="true" />
                <h3 className="mb-2 text-xl font-semibold">{opportunity.title}</h3>
                <p className="text-muted-foreground">{opportunity.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="packages" className="scroll-mt-24 bg-muted/30 py-16 md:py-20">
        <div className="container mx-auto max-w-6xl px-4">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">Partnership Packages</h2>
          <p className="mb-8 max-w-3xl text-lg text-muted-foreground">{annual.packagesDescription}</p>
          <PartnershipPackages packages={packages} partnershipCallUrl={partnershipCallUrl} year={sponsorData.year} />
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="container mx-auto max-w-6xl px-4">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">Why Innovate QA?</h2>
          <p className="mb-4 max-w-3xl text-xl font-medium">{annual.whySponsor.intro}</p>
          <p className="mb-4 max-w-4xl leading-relaxed text-muted-foreground">{annual.whySponsor.description}</p>
          <p className="mb-8 max-w-4xl leading-relaxed text-muted-foreground">{annual.whySponsor.detail}</p>
          <div className="grid gap-6 sm:grid-cols-2">
            {annual.images.map((image) => <Image key={image.src} src={`${BASE_PATH}${image.src}`} alt={image.alt} width={900} height={600} sizes="(max-width: 640px) 100vw, 50vw" className="aspect-[3/2] w-full rounded-lg object-cover" />)}
          </div>
          <h3 className="mb-6 mt-10 text-2xl font-semibold">What Makes Us Different</h3>
          <dl className="grid gap-6 md:grid-cols-2">
            {differentiators.map(([title, description], index) => {
              const { icon: Icon, gradient } = differentiatorStyles[index]
              return (
                <div
                  key={title}
                  className={`group rounded-2xl border border-border/70 bg-gradient-to-br ${gradient} p-6 shadow-sm transition-[translate,box-shadow,border-color] duration-300 motion-safe:hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-4 motion-safe:duration-700 motion-reduce:transition-none`}
                  style={{ animationDelay: `${index * 80}ms`, animationFillMode: "backwards" }}
                >
                  <dt className="mb-3 flex items-center gap-3 text-lg font-semibold">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-primary/10 bg-card/80 text-primary transition-transform duration-300 motion-safe:group-hover:rotate-6 motion-reduce:transition-none">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    {title}
                  </dt>
                  <dd className="leading-relaxed text-muted-foreground">{description}</dd>
                </div>
              )
            })}
          </dl>
          <figure className="mt-10 border-l-4 border-primary pl-6">
            <blockquote className="max-w-3xl text-xl leading-relaxed">&ldquo;{annual.testimonial.quote}&rdquo;</blockquote>
            <figcaption className="mt-4 text-sm text-muted-foreground">{annual.testimonial.attribution}</figcaption>
          </figure>
        </div>
      </section>

      <section className="bg-muted/30 py-16 md:py-20">
        <div className="container mx-auto max-w-6xl px-4">
          <BarChart3 className="mb-4 h-7 w-7 text-primary" aria-hidden="true" />
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">Visibility You Can Measure</h2>
          <p className="mb-8 max-w-3xl text-lg text-muted-foreground">{annual.reportingDescription}</p>
          <table className="w-full table-fixed border-collapse text-left text-sm md:text-base">
            <caption className="sr-only">Partnership objectives and available reporting</caption>
            <thead><tr className="border-b-2 border-border"><th scope="col" className="w-[35%] px-2 py-4 sm:px-4">Marketing objective</th><th scope="col" className="px-2 py-4 sm:px-4">What Innovate QA can report</th></tr></thead>
            <tbody>{metrics.map(([objective, reporting]) => <tr key={objective} className="border-b border-border"><th scope="row" className="px-2 py-4 font-medium sm:px-4">{objective}</th><td className="px-2 py-4 text-muted-foreground sm:px-4">{reporting}</td></tr>)}</tbody>
          </table>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <h2 className="mb-5 text-3xl font-bold md:text-4xl">{annual.closing.title}</h2>
          <p className="mb-4 text-lg text-muted-foreground">{annual.closing.description}</p>
          <p className="mb-8 text-muted-foreground">{annual.closing.detail}</p>
          <Button size="lg" asChild className="h-auto min-h-11 whitespace-normal"><a href={partnershipCallUrl}><CalendarDays className="mr-2 h-5 w-5 shrink-0" aria-hidden="true" />Schedule a Partnership Call</a></Button>
        </div>
      </section>
    </div>
  )
}