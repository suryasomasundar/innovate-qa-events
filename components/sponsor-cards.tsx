import type { ReactNode } from "react"
import Image from "next/image"
import { ExternalLink } from "lucide-react"
import { BASE_PATH } from "@/lib/constants"

export type Sponsor = {
  name: string
  logo?: string
  /** Intrinsic image width. Falls back to 320 if absent (Next/Image requires a value). */
  width?: number
  /** Intrinsic image height. Falls back to 128 if absent. */
  height?: number
  url?: string
  /** Optional CSS scale multiplier (e.g. 1.5) for logos whose source has heavy internal padding. */
  scale?: number
}

function sponsorLogoSrc(sponsor: Sponsor) {
  if (!sponsor.logo) return "/placeholder.svg"
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
  compact = false,
}: {
  sponsor: Sponsor
  compact?: boolean
}) {
  if (!sponsor.logo) return null
  const boxClass = compact ? "h-20 w-[220px]" : "h-24 w-[260px]"
  const scaleStyle = sponsor.scale ? { transform: `scale(${sponsor.scale})` } : undefined
  return (
    <div className={`flex items-center justify-center ${boxClass}`}>
      <Image
        src={sponsorLogoSrc(sponsor)}
        alt={sponsor.name}
        width={sponsor.width ?? 320}
        height={sponsor.height ?? 128}
        className="h-full w-full object-contain"
        style={scaleStyle}
        unoptimized
      />
    </div>
  )
}

export function PremierSponsorCard({ sponsor }: { sponsor: Sponsor }) {
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
        <SponsorLogo sponsor={sponsor} />
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
        <SponsorLogo sponsor={sponsor} compact={compact} />
      </div>
    </SponsorLink>
  )
}

export function SponsorTierRow({
  title,
  description,
  sponsors,
  tier,
  compact = false,
  labelClassName = "text-foreground",
  descriptionClassName = "text-muted-foreground",
  borderClassName = "border-border/70",
}: {
  title: string
  description: string
  sponsors: Sponsor[]
  tier: string
  compact?: boolean
  labelClassName?: string
  descriptionClassName?: string
  borderClassName?: string
}) {
  if (!sponsors.length) return null

  return (
    <div className={`grid gap-5 border-t ${borderClassName} pt-7 md:grid-cols-[220px_1fr] lg:gap-8`}>
      <div>
        <h3 className={`mb-2 text-lg font-bold ${labelClassName}`}>{title}</h3>
        <p className={`text-sm leading-relaxed ${descriptionClassName}`}>{description}</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {sponsors.map((sponsor) => (
          <SponsorLogoTile key={sponsor.name} sponsor={sponsor} tier={tier} compact={compact} />
        ))}
      </div>
    </div>
  )
}

export function withLogo<T extends Sponsor>(list: T[] | undefined): T[] {
  return (list ?? []).filter((sponsor) => sponsor.logo)
}
