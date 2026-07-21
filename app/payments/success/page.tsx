import Link from "next/link"
import { cookies } from "next/headers"
import { CheckCircle2, Mail, ArrowRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { generateSEO } from "@/components/seo"
import { getRecordingBySlug } from "@/data/recordings"

const SESSION_COOKIE_NAME = "innovateqa_session"

type SessionCookieShape = {
  user?: {
    email?: string
    name?: string
    role?: string
    plan?: string
  }
  entitledRecordingSlugs?: string[]
}

function parseSessionCookie(value: string): SessionCookieShape | null {
  try {
    const decoded = decodeURIComponent(value)
    const parsed = JSON.parse(decoded)

    if (!parsed || typeof parsed !== "object") {
      return null
    }

    return parsed as SessionCookieShape
  } catch {
    return null
  }
}

export const metadata = generateSEO({
  title: "Payment Successful | Innovate QA",
  description: "Stripe checkout completed. Your recording access is now updated in your member session.",
  canonical: "/payments/success",
  noIndex: true,
})

interface PaymentSuccessPageProps {
  searchParams?: Promise<Record<string, string | string[] | undefined>>
}

export default async function PaymentSuccessPage({ searchParams }: PaymentSuccessPageProps) {
  const resolvedSearchParams = searchParams ? await searchParams : undefined
  const recordingSlug = typeof resolvedSearchParams?.recording === "string" ? resolvedSearchParams.recording : undefined
  const sessionId = typeof resolvedSearchParams?.session_id === "string" ? resolvedSearchParams.session_id : undefined
  const simulated = typeof resolvedSearchParams?.simulated === "string" ? resolvedSearchParams.simulated : undefined
  const recording = recordingSlug ? getRecordingBySlug(recordingSlug) : undefined

  if (simulated === "1" && recordingSlug) {
    const cookieStore = await cookies()
    const existingCookie = cookieStore.get(SESSION_COOKIE_NAME)

    if (existingCookie) {
      const parsed = parseSessionCookie(existingCookie.value)

      if (parsed?.user) {
        const currentEntitlements = Array.isArray(parsed.entitledRecordingSlugs)
          ? parsed.entitledRecordingSlugs.filter((item): item is string => typeof item === "string")
          : []

        if (!currentEntitlements.includes(recordingSlug)) {
          const nextPayload: SessionCookieShape = {
            ...parsed,
            entitledRecordingSlugs: [...currentEntitlements, recordingSlug],
          }

          cookieStore.set(SESSION_COOKIE_NAME, encodeURIComponent(JSON.stringify(nextPayload)), {
            httpOnly: true,
            sameSite: "lax",
            secure: process.env.NODE_ENV === "production",
            path: "/",
            maxAge: 60 * 60 * 24 * 7,
          })
        }
      }
    }
  }

  return (
    <div className="min-h-screen bg-background py-16">
      <div className="container mx-auto max-w-3xl px-4">
        <Card>
          <CardContent className="p-10 text-center">
            <Badge variant="secondary" className="mb-6">Stripe checkout complete</Badge>
            <CheckCircle2 className="mx-auto h-14 w-14 text-emerald-600" />
            <h1 className="mt-6 text-4xl font-bold tracking-tight text-foreground">Payment received</h1>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-muted-foreground">
              {recording
                ? `Your payment for ${recording.title} was received. This member session now has access to that recording.`
                : "Your payment was received. This member session now has access to the purchased recording."}
            </p>

            <div className="mt-8 rounded-2xl border border-border/60 bg-muted/40 p-6 text-left">
              <p className="flex items-start gap-3 text-sm text-muted-foreground">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                Open the recording from the member library to start playback. Access remains scoped to individual purchases.
              </p>
              {sessionId && (
                <p className="mt-4 text-xs uppercase tracking-[0.18em] text-muted-foreground">
                  Stripe session: {sessionId}
                </p>
              )}
            </div>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              {recording && (
                <Button asChild>
                  <Link href={`/recordings/${recording.slug}/purchase`}>
                    Back to purchase details
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              )}
              <Button asChild variant="outline">
                <Link href="/recordings">Member recordings</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}