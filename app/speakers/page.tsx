import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import event2026 from "@/data/events/2026.json"
import { SpeakerCard } from "@/components/Speaker-Card"
import { generateSEO } from "@/components/seo"

export const metadata: Metadata = generateSEO({
  title: "Innovate QA 2026 Speakers",
  description: "Explore the Innovate QA 2026 speaker lineup.",
  canonical: "/speakers",
  keywords: ["Innovate QA", "QA conference speakers", "software testing", "quality engineering"],
})

export default function SpeakersPage() {
  return (
    <main className="min-h-screen bg-[#f8f5fb]">
      <section className="border-b border-border/60 py-20">
        <div className="container mx-auto px-4">
          <Link
            href="/events/2026#speakers"
            className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to event
          </Link>
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <h1 className="text-5xl font-semibold leading-none tracking-normal text-primary md:text-6xl lg:text-7xl">
              Speakers
            </h1>
            <div className="max-w-xl text-lg leading-relaxed text-muted-foreground lg:justify-self-end">
              <p>
                Quality leaders, practitioners, founders, and engineering voices shaping modern testing,
                automation, AI, and software quality.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {event2026.speakers.map((speaker) => (
              <SpeakerCard key={speaker.id} speaker={speaker} />
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
