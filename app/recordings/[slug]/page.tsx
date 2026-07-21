import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, CheckCircle2, Clock3, CreditCard, LockKeyhole, PlayCircle, ShieldCheck } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { generateSEO } from "@/components/seo"
import { RecordingPurchaseButton } from "@/components/recordings/recording-purchase-button"
import { getRecordingBySlug, recordings } from "@/data/recordings"
import { requireAuth } from "@/lib/authguard"

export const dynamic = "force-dynamic"

interface RecordingDetailPageProps {
  params: Promise<{ slug: string }>
  searchParams?: Promise<Record<string, string | string[] | undefined>>
}

export async function generateStaticParams() {
  return recordings.map((recording) => ({ slug: recording.slug }))
}

export async function generateMetadata({ params }: RecordingDetailPageProps): Promise<Metadata> {
  const { slug } = await params
  const recording = getRecordingBySlug(slug)

  if (!recording) {
    return generateSEO({ title: "Recording Not Found", noIndex: true })
  }

  return generateSEO({
    title: `${recording.title} | Member Recording`,
    description: recording.excerpt,
    canonical: `/recordings/${recording.slug}`,
    noIndex: true,
  })
}

export default async function RecordingDetailPage({ params, searchParams }: RecordingDetailPageProps) {
  const { slug } = await params
  if (searchParams) {
    await searchParams
  }
  const recording = getRecordingBySlug(slug)

  if (!recording) {
    notFound()
  }

  const session = await requireAuth(`/recordings/${slug}`)
  const entitledRecordingSlugs = session.entitledRecordingSlugs || []
  const hasAccess = entitledRecordingSlugs.includes("*") || entitledRecordingSlugs.includes(recording.slug)

  return (
    <div className="min-h-screen bg-background">
      <section className="border-b border-border bg-muted/30 py-10">
        <div className="container mx-auto px-4">
          <Button variant="ghost" asChild className="mb-6">
            <Link href="/recordings">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to recordings
            </Link>
          </Button>

          <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
            <div>
              <Badge variant="outline" className="mb-4">
                {recording.category}
              </Badge>
              <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl">{recording.title}</h1>
              <p className="mt-4 max-w-3xl text-lg leading-8 text-muted-foreground">{recording.excerpt}</p>
              <div className="mt-6 flex flex-wrap gap-3 text-sm text-muted-foreground">
                <span>{recording.speaker}</span>
                <span>·</span>
                <span>{recording.company}</span>
                <span>·</span>
                <span>{recording.recordedOn}</span>
              </div>
            </div>

            <Card className="py-0">
              <CardContent className="p-6">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Access Tier</p>
                    <p className="mt-2 text-xl font-semibold text-foreground">{recording.accessTier}</p>
                  </div>
                  <Badge>{recording.price}</Badge>
                </div>
                <div className="mt-6 space-y-3 text-sm text-muted-foreground">
                  <p className="flex items-center gap-2">
                    <Clock3 className="h-4 w-4 text-primary" />
                    {recording.duration} of full playback
                  </p>
                  <p className="flex items-center gap-2">
                    <ShieldCheck className="h-4 w-4 text-primary" />
                    {hasAccess
                      ? "Access granted from your authenticated member purchase/session entitlements"
                      : "You are signed in, but this recording is still locked until it is purchased"}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto grid gap-8 px-4 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-8">
            <Card className="overflow-hidden border-border/60 py-0">
              <div className="flex aspect-video items-center justify-center bg-gradient-to-br from-purple-950 via-indigo-900 to-slate-950 px-8 text-center text-white">
                <div>
                  {hasAccess ? (
                    <>
                      <PlayCircle className="mx-auto h-14 w-14 text-[#7ee1e5]" />
                      <h2 className="mt-5 text-2xl font-semibold">Protected playback area</h2>
                      <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-white/75">
                        Replace this player panel with your signed Vimeo, YouTube private, or custom video embed after your Next.js backend confirms entitlement and updates the session cookie.
                      </p>
                    </>
                  ) : (
                    <>
                      <LockKeyhole className="mx-auto h-14 w-14 text-[#7ee1e5]" />
                      <h2 className="mt-5 text-2xl font-semibold">This recording is locked</h2>
                      <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-white/75">
                        Complete purchase to unlock this recording. After payment, your backend should email a single-recording access link and grant entitlement on your member session.
                      </p>
                    </>
                  )}
                </div>
              </div>
            </Card>

            {!hasAccess && (
              <Card>
                <CardContent className="p-8">
                  <h2 className="text-2xl font-semibold text-foreground">Unlock this recording</h2>
                  <p className="mt-4 leading-7 text-muted-foreground">
                    You are signed in as {session.user?.email || "member"}. Purchase this recording to receive your payment confirmation and access link.
                  </p>
                  <div className="mt-6 rounded-2xl border border-border/60 bg-muted/40 p-5">
                    <p className="text-sm text-muted-foreground">Recording</p>
                    <p className="mt-1 text-lg font-semibold text-foreground">{recording.title}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{recording.speaker} · {recording.event}</p>
                    <p className="mt-4 text-2xl font-bold text-foreground">{recording.price}</p>
                  </div>
                  <div className="mt-6">
                    <RecordingPurchaseButton
                      slug={recording.slug}
                      sku={recording.sku}
                      title={recording.title}
                      price={recording.price}
                      priceCents={recording.priceCents}
                      currency={recording.currency}
                      customerEmail={session.user?.email}
                    />
                  </div>
                  <p className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
                    <CreditCard className="h-3.5 w-3.5" />
                    Payment unlocks only this recording and the emailed link stays scoped to it.
                  </p>
                </CardContent>
              </Card>
            )}

            <Card>
              <CardContent className="p-8">
                <h2 className="text-2xl font-semibold text-foreground">What you will learn</h2>
                <div className="mt-6 space-y-4">
                  {recording.outcomes.map((outcome) => (
                    <div key={outcome} className="flex items-start gap-3">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                      <p className="text-muted-foreground">{outcome}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-8">
                <h2 className="text-2xl font-semibold text-foreground">Session overview</h2>
                <div className="mt-6 space-y-4">
                  {recording.description.map((paragraph) => (
                    <p key={paragraph} className="leading-7 text-muted-foreground">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardContent className="p-8">
                <h2 className="text-xl font-semibold text-foreground">Chapter markers</h2>
                <div className="mt-6 space-y-5">
                  {recording.chapters.map((chapter) => (
                    <div key={`${recording.slug}-${chapter.time}`} className="border-l-2 border-primary/25 pl-4">
                      <p className="text-sm font-semibold text-primary">{chapter.time}</p>
                      <h3 className="mt-1 font-medium text-foreground">{chapter.title}</h3>
                      <p className="mt-1 text-sm leading-6 text-muted-foreground">{chapter.summary}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-8">
                <h2 className="text-xl font-semibold text-foreground">Tags</h2>
                <div className="mt-5 flex flex-wrap gap-2">
                  {recording.tags.map((tag) => (
                    <Badge key={tag} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}