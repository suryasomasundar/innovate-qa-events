import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CalendarDays, Check, Mail, MapPin, Megaphone, Sparkles, Trophy, Users, type LucideIcon } from "lucide-react"
import { SponsorshipBrochure } from "@/components/sponsorship-brochure"
import Link from "next/link"
import { generateSEO } from "@/components/seo"
import type { Metadata } from "next"
import sponsorData from "@/data/sponsor/2027.json"

const conference = sponsorData.conference
const icons: Record<string, LucideIcon> = { Trophy, Sparkles, Megaphone, Users }

export const metadata: Metadata = generateSEO({
  title: conference.title,
  description: conference.description,
  keywords: ["QA conference sponsorship", "software testing sponsor", "tech event sponsorship", "quality engineering"],
})

const sponsorshipTiers = conference.tiers.map((tier) => ({ ...tier, icon: icons[tier.icon] ?? Sparkles }))

export default function SponsorPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="border-b border-border bg-gradient-to-br from-primary/20 via-background to-primary/10 py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-primary">Sponsorship Prospectus</p>
            <h1 className="mb-6 text-4xl font-bold text-foreground md:text-5xl lg:text-6xl">
              Sponsor <span className="text-primary drop-shadow-[0_0_15px_rgba(75,0,130,0.5)]">{conference.eventName}</span>
            </h1>
            <p className="mb-6 text-xl text-muted-foreground">
              {conference.intro}
            </p>
            <div className="mb-8 flex flex-col items-center justify-center gap-3 text-sm font-semibold text-foreground sm:flex-row sm:gap-6">
              <span className="inline-flex items-center gap-2">
                <CalendarDays className="h-5 w-5 text-primary" />
                {conference.dates}
              </span>
              <span className="inline-flex items-center gap-2">
                <MapPin className="h-5 w-5 text-primary" />
                {conference.location}
              </span>
            </div>
            <div className="mb-10 grid grid-cols-3 gap-3 rounded-lg border border-border/70 bg-background/70 p-4 shadow-sm backdrop-blur">
              <div>
                <p className="text-2xl font-bold text-primary md:text-3xl">{conference.stats.attendees}</p>
                <p className="text-sm text-muted-foreground">Attendees</p>
              </div>
              <div className="border-x border-border">
                <p className="text-2xl font-bold text-primary md:text-3xl">{conference.stats.speakers}</p>
                <p className="text-sm text-muted-foreground">Speakers</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-primary md:text-3xl">{conference.stats.days}</p>
                <p className="text-sm text-muted-foreground">Days</p>
              </div>
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" asChild>
                <Link href="#packages">View Packages</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="#contact">Contact Us</Link>
              </Button>
              <SponsorshipBrochure />
            </div>
          </div>
        </div>
      </section>

      {/* Why Sponsor Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Sponsor Innovate QA?</h2>
            <p className="text-lg text-muted-foreground">
              {conference.whySponsor.description}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {conference.whySponsor.benefits.map((benefit) => {
              const Icon = icons[benefit.icon] ?? Sparkles
              return (
                <Card key={benefit.title}>
                  <CardContent className="pt-6">
                    <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                      <Icon className="h-6 w-6 text-primary" aria-hidden="true" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                    <p className="text-muted-foreground">{benefit.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Sponsorship Packages */}
      <section id="packages" className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Sponsorship Packages</h2>
            <div className="w-20 h-1 bg-primary mx-auto rounded-full mb-6" />
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              {conference.packagesDescription}
            </p>
          </div>

          <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-2 xl:grid-cols-4">
            {sponsorshipTiers.map((tier) => (
              <Card
                key={tier.name}
                className={`${tier.featured ? 'border-primary border-2 shadow-lg' : 'border-border'} relative overflow-hidden`}
              >
                {tier.featured && (
                  <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-bl-lg">
                    Premium Partnership
                  </div>
                )}
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                      <tier.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold">{tier.name}</h3>
                      <p className="text-3xl font-bold text-primary">{tier.price}</p>
                    </div>
                  </div>
                  <ul className="space-y-3 mb-6">
                    {tier.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-muted-foreground">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full" variant={tier.featured ? 'default' : 'outline'} asChild>
                    <Link href="#contact">Get Started</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          <p className="mx-auto mt-8 max-w-4xl text-center text-sm text-muted-foreground">
            {conference.packagesNote}
          </p>
        </div>
      </section>

      {/* Partnership Benefits */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">Partnership Benefits &amp; ROI</h2>
            <p className="text-lg text-muted-foreground">{conference.partnershipBenefits.description}</p>
          </div>
          <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-3">
            {conference.partnershipBenefits.benefits.map((benefit) => {
              const Icon = icons[benefit.icon] ?? Sparkles
              return (
                <Card key={benefit.title}>
                  <CardContent className="pt-6">
                    <Icon className="mb-4 h-8 w-8 text-primary" aria-hidden="true" />
                    <h3 className="mb-2 text-xl font-semibold">{benefit.title}</h3>
                    <p className="text-muted-foreground">{benefit.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Become a Sponsor?</h2>
            <p className="text-lg text-muted-foreground mb-8">
              {conference.contact.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <a href={`mailto:${conference.contact.email}`}>
                  <Mail className="mr-2 h-5 w-5" />
                  Contact Innovate QA
                </a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href={`mailto:${conference.contact.secondaryEmail}`}>Contact {conference.contact.secondaryName}</a>
              </Button>
            </div>
            <p className="text-sm text-muted-foreground mt-6">
              Email: <a href={`mailto:${conference.contact.email}`} className="text-primary hover:underline">{conference.contact.email}</a>
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
