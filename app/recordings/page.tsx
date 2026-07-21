import Link from "next/link"
import { PlayCircle, ShieldCheck, Sparkles, Clock3, LockKeyhole, CreditCard } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { generateSEO } from "@/components/seo"
import { recordings } from "@/data/recordings"
import { getAuthSession } from "@/lib/authguard"

export const dynamic = "force-dynamic"

export const metadata = generateSEO({
  title: "Member Recordings Library | Innovate QA",
  description: "Browse protected conference recordings and premium QA sessions available to paid members.",
  canonical: "/recordings",
  noIndex: true,
})

export default async function RecordingsPage() {
  const session = await getAuthSession()
  const accessibleSlugs = new Set(session?.entitledRecordingSlugs || [])

  return (
    <div className="min-h-screen bg-background">
      <section className="relative overflow-hidden bg-gradient-to-br from-purple-950 via-purple-900 to-indigo-900 py-24 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(126,225,229,0.22),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.08),transparent_28%)]" />
        <div className="container relative z-10 mx-auto px-4">
          <Badge variant="secondary" className="mb-6 bg-white/12 text-white hover:bg-white/12">
            Innovate QA 2026 Conference Recordings Catalog
          </Badge>
          <div className="max-w-4xl">
            <h1 className="mb-5 text-4xl font-bold tracking-tight md:text-6xl">
              On-demand recordings for QA leaders and engineering teams
            </h1>
            <p className="max-w-3xl text-lg leading-8 text-white/80">
              Browse full Innovate QA sessions, premium replays, and tactical deep-dives. Sign in and purchase per recording to unlock playback.
            </p>
            <div className="mt-8 flex flex-wrap gap-4 text-sm text-white/75">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2">
                <ShieldCheck className="h-4 w-4 text-[#7ee1e5]" />
                Sign-in required to watch
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2">
                <PlayCircle className="h-4 w-4 text-[#7ee1e5]" />
                Full session playback
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2">
                <Sparkles className="h-4 w-4 text-[#7ee1e5]" />
                Premium member catalog
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="mb-3 text-sm font-bold uppercase tracking-normal text-muted-foreground">Available Replays</p>
              <h2 className="text-4xl font-semibold tracking-tight text-foreground md:text-5xl">Browse recordings</h2>
            </div>
            <p className="max-w-xl text-base leading-7 text-muted-foreground">
              This catalog shows both owned and locked recordings. Users can buy a single recording and unlock access for that purchased video only.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {recordings.map((recording) => {
              const hasAccess = accessibleSlugs.has("*") || accessibleSlugs.has(recording.slug)

              return (
              <Card key={recording.slug} className="overflow-hidden border-border/60 py-0">
                <div className="bg-gradient-to-br from-purple-900 via-indigo-900 to-slate-900 px-6 py-8 text-white">
                  <div className="mb-6 flex items-start justify-between gap-4">
                    <Badge variant="secondary" className="bg-white/12 text-white hover:bg-white/12">
                      {hasAccess ? "Unlocked" : recording.accessTier}
                    </Badge>
                    <span className="text-sm text-white/75">{recording.category}</span>
                  </div>
                  <h3 className="text-2xl font-semibold leading-tight">{recording.title}</h3>
                  <p className="mt-4 text-sm text-white/75">
                    {recording.speaker} · {recording.company}
                  </p>
                </div>
                <CardContent className="p-6">
                  <div className="mb-4 flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="inline-flex items-center gap-1.5">
                      <Clock3 className="h-4 w-4" />
                      {recording.duration}
                    </span>
                    <span>{recording.event}</span>
                  </div>
                  <p className="text-sm leading-6 text-muted-foreground">{recording.excerpt}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {recording.tags.map((tag) => (
                      <Badge key={tag} variant="outline">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="mt-6 flex items-center justify-between gap-4">
                    <div>
                      <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                        {hasAccess ? "Purchased" : "Single Access"}
                      </p>
                      <p className="text-lg font-semibold text-foreground">{recording.price}</p>
                    </div>
                    <Button asChild variant={hasAccess ? "default" : "outline"}>
                      <Link href={hasAccess ? `/recordings/${recording.slug}` : `/recordings/${recording.slug}/purchase`}>
                        {hasAccess ? (
                          <>
                            <PlayCircle className="mr-2 h-4 w-4" />
                            Watch now
                          </>
                        ) : (
                          <>
                            <CreditCard className="mr-2 h-4 w-4" />
                            Buy access
                          </>
                        )}
                      </Link>
                    </Button>
                  </div>
                  {!hasAccess && (
                    <p className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
                      <LockKeyhole className="h-3.5 w-3.5" />
                      Payment unlocks only this recording and the emailed link stays scoped to it.
                    </p>
                  )}
                </CardContent>
              </Card>
            )})}
          </div>
        </div>
      </section>
    </div>
  )
}