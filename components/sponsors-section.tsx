import { Button } from "@/components/ui/button"
import type { ReactNode } from "react"
import Link from "next/link"
import Image from "next/image"
import { ExternalLink, Handshake } from "lucide-react"
import { BASE_PATH } from "@/lib/constants"
import homeData from "@/data/home.json"

type Sponsor = { name: string; logo: string; width: number; height: number; url?: string }

function sponsorLogoSrc(sponsor: Sponsor) {
  return sponsor.logo.startsWith("http") ? sponsor.logo : `${BASE_PATH}/${sponsor.logo}`
}

function SponsorLink({
  sponsor,
  className,
  children,
}: {
  sponsor: Sponsor
  className: string
  children: ReactNode
}) {
  if (sponsor.url) {
    return (
      <a
        href={sponsor.url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Visit ${sponsor.name}`}
        className={`${className} cursor-pointer`}
      >
        {children}
      </a>
    )
  }

  return <div className={className}>{children}</div>
}

function SponsorLogo({
  sponsor,
  className,
}: {
  sponsor: Sponsor
  className: string
}) {
  return (
    <Image
      src={sponsorLogoSrc(sponsor)}
      alt={sponsor.name}
      width={sponsor.width}
      height={sponsor.height}
      className={className}
      style={{ width: "auto" }}
    />
  )
}

function sponsorLogoClass(sponsor: Sponsor, compact = false) {
  const name = sponsor.name.toLowerCase()
  const base = "object-contain"

  if (name.includes("stories")) return `${base} max-h-24 max-w-[80%] scale-125`
  if (name.includes("testlio")) return `${base} max-h-20 max-w-[78%] scale-125`
  if (name.includes("flint")) return `${base} max-h-20 max-w-[72%] scale-110`
  if (name.includes("dev it")) return `${base} max-h-16 max-w-[70%] scale-110`
  if (name.includes("wearedevelopers")) return `${base} max-h-16 max-w-[72%] scale-110`
  if (name.includes("plusqa")) return `${base} max-h-24 max-w-[84%]`

  return `${base} ${compact ? "max-h-16 max-w-[76%]" : "max-h-24 max-w-[84%]"}`
}

function PremierSponsorCard({ sponsor }: { sponsor: Sponsor }) {
  return (
    <SponsorLink
      sponsor={sponsor}
      className="group relative flex min-h-[180px] flex-col rounded-lg border border-border/70 bg-card p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-lg"
    >
      <div className="mb-5 flex items-center justify-between gap-4">
        <span className="rounded-full border border-primary/15 bg-primary/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-normal text-primary">
          Platinum
        </span>
        {sponsor.url && (
          <ExternalLink className="h-4 w-4 text-muted-foreground transition-colors group-hover:text-primary" />
        )}
      </div>
      <div className="flex flex-1 items-center justify-center">
        <SponsorLogo sponsor={sponsor} className={sponsorLogoClass(sponsor)} />
      </div>
    </SponsorLink>
  )
}

function SponsorLogoTile({
  sponsor,
  tier,
  compact = false,
}: {
  sponsor: Sponsor
  tier: string
  compact?: boolean
}) {
  return (
    <SponsorLink
      sponsor={sponsor}
      className={`group relative flex ${compact ? "min-h-[116px]" : "min-h-[128px]"} flex-col rounded-lg border border-border/70 bg-card p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md`}
    >
      <div className="mb-3 flex items-center justify-between gap-3">
        <span className="rounded-full border border-primary/15 bg-primary/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-normal text-primary">
          {tier}
        </span>
        {sponsor.url && (
          <ExternalLink className="h-3.5 w-3.5 text-muted-foreground transition-colors group-hover:text-primary" />
        )}
      </div>
      <div className="flex flex-1 items-center justify-center">
        <SponsorLogo sponsor={sponsor} className={sponsorLogoClass(sponsor, compact)} />
      </div>
    </SponsorLink>
  )
}

function SponsorTierRow({
  title,
  description,
  sponsors,
  tier,
  compact = false,
}: {
  title: string
  description: string
  sponsors: Sponsor[]
  tier: string
  compact?: boolean
}) {
  if (!sponsors.length) return null

  return (
    <div className="grid gap-5 border-t border-border/70 pt-7 md:grid-cols-[220px_1fr] lg:gap-8">
      <div>
        <h3 className="mb-2 text-lg font-bold text-foreground">{title}</h3>
        <p className="text-sm leading-relaxed text-muted-foreground">{description}</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {sponsors.map((sponsor) => (
          <SponsorLogoTile key={sponsor.name} sponsor={sponsor} tier={tier} compact={compact} />
        ))}
      </div>
    </div>
  )
}

export function SponsorsSection() {
  const { sponsors } = homeData

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
          {sponsors.platinum && sponsors.platinum.length > 0 && (
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
                {sponsors.platinum.map((sponsor) => (
                  <PremierSponsorCard key={sponsor.name} sponsor={sponsor} />
                ))}
              </div>
            </div>
          )}

          <div className="space-y-7">
            <SponsorTierRow
              title="Gold Sponsors"
              description="Product teams and platforms attendees can explore during the conference."
              sponsors={sponsors.gold}
              tier="Gold"
            />
            <SponsorTierRow
              title="Silver Sponsors"
              description="Companies supporting practical learning, networking, and community access."
              sponsors={sponsors.silver}
              tier="Silver"
            />
            <SponsorTierRow
              title="Community Partners"
              description="Partner channels helping connect Innovate QA with builders and practitioners."
              sponsors={sponsors.partners}
              tier="Partner"
              compact
            />
            <SponsorTierRow
              title="Bronze Sponsors"
              description="Additional supporters helping make the conference possible."
              sponsors={sponsors.bronze}
              tier="Bronze"
              compact
            />
          </div>
        </div>
      </div>
    </section>
  )
}
