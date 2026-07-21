import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, CheckCircle2, CreditCard, LockKeyhole, Mail } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { generateSEO } from "@/components/seo"
import { RecordingPurchaseButton } from "@/components/recordings/recording-purchase-button"
import { getRecordingBySlug } from "@/data/recordings"
import { requireAuth } from "@/lib/authguard"

export const dynamic = "force-dynamic"

interface RecordingPurchasePageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: RecordingPurchasePageProps): Promise<Metadata> {
  const { slug } = await params
  const recording = getRecordingBySlug(slug)

  if (!recording) {
    return generateSEO({ title: "Recording Not Found", noIndex: true })
  }

  return generateSEO({
    title: `Buy ${recording.title} | Innovate QA`,
    description: `Purchase protected access to ${recording.title} and receive the private viewing link by email.`,
    canonical: `/recordings/${slug}/purchase`,
    noIndex: true,
  })
}

export default async function RecordingPurchasePage({ params }: RecordingPurchasePageProps) {
  const { slug } = await params
  const recording = getRecordingBySlug(slug)

  if (!recording) {
    notFound()
  }

  const session = await requireAuth(`/recordings/${slug}/purchase`)
  const entitledRecordingSlugs = session.entitledRecordingSlugs || []
  const alreadyPurchased = entitledRecordingSlugs.includes("*") || entitledRecordingSlugs.includes(recording.slug)

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
                Secure checkout
              </Badge>
              <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl">Buy {recording.title}</h1>
              <p className="mt-4 max-w-3xl text-lg leading-8 text-muted-foreground">
                Checkout is handled by our Next.js API layer. After payment succeeds, your session gets access to this recording only.
              </p>
            </div>

            <Card className="py-0">
              <CardContent className="p-6">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Single recording</p>
                    <p className="mt-2 text-xl font-semibold text-foreground">{recording.price}</p>
                  </div>
                  <Badge>{recording.accessTier}</Badge>
                </div>
                <div className="mt-6 space-y-3 text-sm text-muted-foreground">
                  <p className="flex items-center gap-2">
                    <CreditCard className="h-4 w-4 text-primary" />
                    Stripe-ready checkout via Next.js API
                  </p>
                  <p className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-primary" />
                    Private access link delivered by email
                  </p>
                  <p className="flex items-center gap-2">
                    <LockKeyhole className="h-4 w-4 text-primary" />
                    Access is limited to this purchased video only
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto grid gap-8 px-4 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="space-y-6">
            <Card>
              <CardContent className="p-8">
                <h2 className="text-2xl font-semibold text-foreground">Included with this purchase</h2>
                <div className="mt-6 space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                    <p className="text-muted-foreground">Full protected playback for {recording.duration}</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                    <p className="text-muted-foreground">Chapter markers and full session summary</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                    <p className="text-muted-foreground">An email link that opens only this recording after purchase</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-8">
                <h2 className="text-2xl font-semibold text-foreground">Session summary</h2>
                <p className="mt-4 leading-7 text-muted-foreground">{recording.excerpt}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {recording.tags.map((tag) => (
                    <Badge key={tag} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardContent className="p-8">
                <h2 className="text-xl font-semibold text-foreground">Checkout</h2>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">
                  Signed in as {session.user?.email || "member"}. Continue to checkout and this purchase will unlock only this recording.
                </p>

                <div className="mt-6 rounded-2xl border border-border/60 bg-muted/40 p-5">
                  <p className="text-sm text-muted-foreground">Recording</p>
                  <p className="mt-1 text-lg font-semibold text-foreground">{recording.title}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{recording.speaker} · {recording.event}</p>
                  <p className="mt-4 text-2xl font-bold text-foreground">{recording.price}</p>
                </div>

                <div className="mt-6">
                  {alreadyPurchased ? (
                    <div className="space-y-3">
                      <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                        This member session already has access to this recording.
                      </div>
                      <Button asChild className="w-full" size="lg">
                        <Link href={`/recordings/${recording.slug}`}>Open recording</Link>
                      </Button>
                    </div>
                  ) : (
                    <RecordingPurchaseButton
                      slug={recording.slug}
                      sku={recording.sku}
                      title={recording.title}
                      price={recording.price}
                      priceCents={recording.priceCents}
                      currency={recording.currency}
                      customerEmail={session.user?.email}
                    />
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}