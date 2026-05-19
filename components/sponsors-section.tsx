import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Handshake } from "lucide-react"
import homeData from "@/data/home.json"
import { PremierSponsorCard, SponsorTierRow, withLogo, type Sponsor } from "@/components/sponsor-cards"

export function SponsorsSection() {
  const { sponsors } = homeData as { sponsors: Record<string, Sponsor[]> }

  const platinum = withLogo(sponsors.platinum)
  const gold = withLogo(sponsors.gold)
  const silver = withLogo(sponsors.silver)
  const bronze = withLogo(sponsors.bronze)
  const partners = withLogo(sponsors.partners)

  return (
    <section id="sponsors" className="bg-muted/30 py-20 md:py-24">
      <div className="container mx-auto px-4">
        <div className="mb-11 grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p className="mb-3 text-sm font-bold uppercase tracking-wider text-primary">Sponsors & Partners</p>
            <h2 className="mb-4 max-w-3xl text-4xl font-bold leading-tight tracking-normal text-foreground md:text-5xl">
              The partner ecosystem behind Innovate QA 2026
            </h2>
            <p className="max-w-3xl text-lg leading-relaxed text-muted-foreground">
              Tool builders, quality platforms, and community partners helping create a practical conference for
              the teams defining modern software quality.
            </p>
          </div>
          <Button asChild size="lg" className="w-fit rounded-full px-9 shadow-lg shadow-primary/15">
            <Link href="/sponsor">
              <Handshake className="mr-2 h-4 w-4" />
              Become a Sponsor
            </Link>
          </Button>
        </div>

        <div className="space-y-9">
          {platinum.length > 0 && (
            <div>
              <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                <div>
                  <p className="mb-2 text-sm font-bold uppercase tracking-wider text-primary">Premier Support</p>
                  <h3 className="text-2xl font-bold text-foreground">Featured sponsors</h3>
                </div>
                <p className="max-w-xl text-sm leading-relaxed text-muted-foreground">
                  Platinum partners receive the strongest presence across the conference experience, from the
                  website to onsite moments.
                </p>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                {platinum.map((sponsor) => (
                  <PremierSponsorCard key={sponsor.name} sponsor={sponsor} />
                ))}
              </div>
            </div>
          )}

          <div className="space-y-7">
            <SponsorTierRow
              title="Gold Sponsors"
              description="Product teams and platforms attendees can explore during the conference."
              sponsors={gold}
              tier="Gold"
            />
            <SponsorTierRow
              title="Silver Sponsors"
              description="Companies supporting practical learning, networking, and community access."
              sponsors={silver}
              tier="Silver"
            />
            <SponsorTierRow
              title="Community Partners"
              description="Partner channels helping connect Innovate QA with builders and practitioners."
              sponsors={partners}
              tier="Partner"
              compact
            />
            <SponsorTierRow
              title="Bronze Sponsors"
              description="Additional supporters helping make the conference possible."
              sponsors={bronze}
              tier="Bronze"
              compact
            />
          </div>
        </div>
      </div>
    </section>
  )
}
