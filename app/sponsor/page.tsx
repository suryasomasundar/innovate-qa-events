import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Building2, CalendarDays, Check, Mail, MapPin, Megaphone, Sparkles, Trophy, Users } from "lucide-react"
import Link from "next/link"
import { generateSEO } from "@/components/seo"
import type { Metadata } from "next"

export const metadata: Metadata = generateSEO({
  title: "Become a Sponsor - Innovate QA 2027",
  description: "Partner with Innovate QA 2027 in Seattle and connect with 250+ quality engineering professionals, leaders, and decision-makers.",
  keywords: ["QA conference sponsorship", "software testing sponsor", "tech event sponsorship", "quality engineering"],
})

const sponsorshipTiers = [
  {
    name: "Platinum Sponsor",
    price: "$14,000",
    icon: Trophy,
    featured: true,
    benefits: [
      "5 complimentary conference passes",
      "50% ticket discount for qualified attendees",
      "Physical on-site presence and event signage",
      "Swag bag insert",
      "Sponsor Track speaking spot",
      "Branded activation by the main stage",
      "Website placement and social media mention",
      "Keynote video ad",
      "Pre-event registration list access",
      "Post-event attendee engagement report",
    ],
  },
  {
    name: "Gold Sponsor",
    price: "$6,500",
    icon: Sparkles,
    featured: false,
    benefits: [
      "3 complimentary conference passes",
      "30% ticket discount for qualified attendees",
      "Physical on-site presence and event signage",
      "Swag bag insert",
      "Sponsor Track speaking spot",
      "Website placement and social media mention",
      "Pre-event registration list access",
      "Post-event attendee engagement report",
    ],
  },
  {
    name: "Silver Sponsor",
    price: "$4,500",
    icon: Sparkles,
    featured: false,
    benefits: [
      "2 complimentary conference passes",
      "20% ticket discount for qualified attendees",
      "Physical on-site presence and event signage",
      "Swag bag insert",
      "Website placement",
      "Social media mention",
    ],
  },
  {
    name: "Bronze Sponsor",
    price: "$2,000",
    icon: Megaphone,
    featured: false,
    benefits: [
      "1 complimentary conference pass",
      "Ticket discount for qualified attendees",
      "Physical on-site presence and event signage",
      "Swag bag insert",
      "Website placement",
      "Social media mention",
    ],
  },
]

const renewalRates = [
  {
    tier: "Bronze Renewal",
    price: "$1,700",
  },
  {
    tier: "Silver Renewal",
    price: "$3,400",
  },
  {
    tier: "Gold Renewal",
    price: "$5,100",
  },
]

const annualPackages = [
  {
    name: "Gold-Based",
    price: "$10,750/year",
    conferenceTier: "Gold Tier",
    leadershipMeetup: "Once a year",
    regionalEvents: "Priority invite, booth, and speaking slot",
  },
  {
    name: "Silver-Based",
    price: "$9,000/year",
    conferenceTier: "Silver Tier",
    leadershipMeetup: "Not included",
    regionalEvents: "Priority invite and booth",
  },
]

export default function SponsorPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="border-b border-border bg-gradient-to-br from-primary/20 via-background to-primary/10 py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-primary">Sponsorship Prospectus</p>
            <h1 className="mb-6 text-4xl font-bold text-foreground md:text-5xl lg:text-6xl">
              Sponsor <span className="text-primary drop-shadow-[0_0_15px_rgba(75,0,130,0.5)]">Innovate QA 2027</span>
            </h1>
            <p className="mb-6 text-xl text-muted-foreground">
              Connect with quality engineering leaders, decision-makers, and senior practitioners shaping the future of software quality.
            </p>
            <div className="mb-8 flex flex-col items-center justify-center gap-3 text-sm font-semibold text-foreground sm:flex-row sm:gap-6">
              <span className="inline-flex items-center gap-2">
                <CalendarDays className="h-5 w-5 text-primary" />
                May 4-6, 2027
              </span>
              <span className="inline-flex items-center gap-2">
                <MapPin className="h-5 w-5 text-primary" />
                Bellevue, Washington
              </span>
            </div>
            <div className="mb-10 grid grid-cols-3 gap-3 rounded-lg border border-border/70 bg-background/70 p-4 shadow-sm backdrop-blur">
              <div>
                <p className="text-2xl font-bold text-primary md:text-3xl">250+</p>
                <p className="text-sm text-muted-foreground">Attendees</p>
              </div>
              <div className="border-x border-border">
                <p className="text-2xl font-bold text-primary md:text-3xl">40+</p>
                <p className="text-sm text-muted-foreground">Speakers</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-primary md:text-3xl">3</p>
                <p className="text-sm text-muted-foreground">Days</p>
              </div>
            </div>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Button size="lg" asChild>
                <Link href="#packages">View Packages</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="#contact">Contact Us</Link>
              </Button>
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
              Meet the people defining quality engineering as AI reshapes testing, engineering, and shared ownership of quality.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card>
              <CardContent className="pt-6">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">The Right Audience</h3>
                <p className="text-muted-foreground">
                  Reach an audience where 55% are decision-makers, influencers, or senior engineering professionals.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Trophy className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">A Leading Tech Hub</h3>
                <p className="text-muted-foreground">
                  Build relationships in Seattle, home to Microsoft, Amazon, and thousands of technology companies.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Sparkles className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">The Right Moment</h3>
                <p className="text-muted-foreground">
                  Show how your organization is advancing AI-enabled engineering, agentic systems, and modern quality practices.
                </p>
              </CardContent>
            </Card>
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
              Choose the package that best fits your goals and budget.
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
            Every sponsorship level includes access to our 12,000+ professional network, social media promotion, and post-event lead-sharing opportunities.
          </p>
        </div>
      </section>

      {/* Early Renewal */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-primary">Past Sponsors Only</p>
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">Early Renewal Rates</h2>
            <p className="text-lg text-muted-foreground">
              Returning sponsors can lock in preferred pricing before general sponsorship sales open.
            </p>
          </div>

          <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-3">
            {renewalRates.map((renewal) => (
              <Card key={renewal.tier}>
                <CardContent className="pt-6 text-center">
                  <p className="mb-2 text-3xl font-bold text-primary">{renewal.price}</p>
                  <h3 className="font-semibold">{renewal.tier}</h3>
                </CardContent>
              </Card>
            ))}
          </div>
          <p className="mt-6 text-center text-sm font-medium text-muted-foreground">
            Exclusive renewal pricing is available to past sponsors through December 31, 2026.
          </p>
        </div>
      </section>

      {/* Annual Marketing Packages */}
      <section className="bg-muted/30 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">Ultimate Annual Marketing Package</h2>
            <p className="text-lg text-muted-foreground">
              Keep your brand visible throughout the year with conference sponsorship, digital promotion, and community events.
            </p>
          </div>
          <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-2">
            {annualPackages.map((annualPackage) => (
              <Card key={annualPackage.name} className="border-primary/30">
                <CardContent className="pt-6">
                  <div className="mb-6 flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm font-semibold uppercase tracking-wider text-primary">{annualPackage.name}</p>
                      <p className="mt-1 text-3xl font-bold">{annualPackage.price}</p>
                    </div>
                    <Building2 className="h-8 w-8 shrink-0 text-primary" />
                  </div>
                  <ul className="space-y-3 text-sm text-muted-foreground">
                    <li className="flex gap-2"><Check className="h-5 w-5 shrink-0 text-primary" />{annualPackage.conferenceTier} conference sponsorship</li>
                    <li className="flex gap-2"><Check className="h-5 w-5 shrink-0 text-primary" />Monthly LinkedIn posts, 12 per year</li>
                    <li className="flex gap-2"><Check className="h-5 w-5 shrink-0 text-primary" />Prominent year-round website placement</li>
                    <li className="flex gap-2"><Check className="h-5 w-5 shrink-0 text-primary" />Quarterly audience meetups, 4 per year</li>
                    <li className="flex gap-2"><Check className="h-5 w-5 shrink-0 text-primary" />Quality Leadership meetup: {annualPackage.leadershipMeetup}</li>
                    <li className="flex gap-2"><Check className="h-5 w-5 shrink-0 text-primary" />Regional events: {annualPackage.regionalEvents}</li>
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
          <p className="mx-auto mt-6 max-w-3xl text-center text-sm text-muted-foreground">
            Regional events include Battle of AI Test Tools, Workshop Days in cities such as Seattle, and similar Innovate QA programs.
          </p>
        </div>
      </section>

      {/* Partnership Benefits */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">Partnership Benefits &amp; ROI</h2>
            <p className="text-lg text-muted-foreground">Build visibility, credibility, and meaningful relationships with your target market.</p>
          </div>
          <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-3">
            <Card>
              <CardContent className="pt-6">
                <Trophy className="mb-4 h-8 w-8 text-primary" />
                <h3 className="mb-2 text-xl font-semibold">Thought Leadership</h3>
                <p className="text-muted-foreground">Lead sponsor-track sessions, form content partnerships, and demonstrate expertise to key decision-makers.</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <Users className="mb-4 h-8 w-8 text-primary" />
                <h3 className="mb-2 text-xl font-semibold">Strategic Networking</h3>
                <p className="text-muted-foreground">Connect through engaging booths, happy hours, private dinners, and facilitated networking sessions.</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <Megaphone className="mb-4 h-8 w-8 text-primary" />
                <h3 className="mb-2 text-xl font-semibold">Digital Presence</h3>
                <p className="text-muted-foreground">Extend your reach through the Innovate QA website, social platforms, meetups, announcements, and promotions.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Become a Sponsor?</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Let's discuss how we can create the perfect sponsorship package for your organization.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <a href="mailto:contact@innovateqaevents.com">
                  <Mail className="mr-2 h-5 w-5" />
                  Contact Innovate QA
                </a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="mailto:tatyana.arbouzova@gmail.com">Contact Tatyana Arbouzova</a>
              </Button>
            </div>
            <p className="text-sm text-muted-foreground mt-6">
              Email: <a href="mailto:contact@innovateqaevents.com" className="text-primary hover:underline">contact@innovateqaevents.com</a>
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
