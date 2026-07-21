import Link from "next/link"
import { ArrowLeft, CircleAlert } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { generateSEO } from "@/components/seo"
import { getRecordingBySlug } from "@/data/recordings"

export const metadata = generateSEO({
  title: "Payment Cancelled | Innovate QA",
  description: "Stripe checkout was cancelled before purchase completion.",
  canonical: "/payments/cancel",
  noIndex: true,
})

interface PaymentCancelPageProps {
  searchParams?: Promise<Record<string, string | string[] | undefined>>
}

export default async function PaymentCancelPage({ searchParams }: PaymentCancelPageProps) {
  const resolvedSearchParams = searchParams ? await searchParams : undefined
  const recordingSlug = typeof resolvedSearchParams?.recording === "string" ? resolvedSearchParams.recording : undefined
  const recording = recordingSlug ? getRecordingBySlug(recordingSlug) : undefined

  return (
    <div className="min-h-screen bg-background py-16">
      <div className="container mx-auto max-w-3xl px-4">
        <Card>
          <CardContent className="p-10 text-center">
            <Badge variant="outline" className="mb-6">Checkout cancelled</Badge>
            <CircleAlert className="mx-auto h-14 w-14 text-amber-600" />
            <h1 className="mt-6 text-4xl font-bold tracking-tight text-foreground">No charge was made</h1>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-muted-foreground">
              {recording
                ? `You cancelled checkout for ${recording.title}. You can restart payment whenever you are ready.`
                : "You cancelled checkout before payment completed. You can restart payment whenever you are ready."}
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              {recording && (
                <Button asChild>
                  <Link href={`/recordings/${recording.slug}/purchase`}>Try payment again</Link>
                </Button>
              )}
              <Button asChild variant="outline">
                <Link href="/recordings">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to recordings
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}