import type { Metadata } from "next"
import Link from "next/link"
import { generateSEO } from "@/components/seo"
import sponsorData from "@/data/sponsor/2027.json"

const customMarketing = sponsorData.customMarketing

export const metadata: Metadata = generateSEO({
  title: customMarketing.title,
  description: customMarketing.description,
  canonical: "/sponsor/custom-marketing/",
})

export default function CustomMarketingPage() {
  return (
    <section className="container mx-auto px-4 py-20 md:py-28">
      <div className="mx-auto max-w-3xl">
        <p className="mb-4 text-sm font-semibold uppercase text-primary">For Companies</p>
        <h1 className="mb-6 text-4xl font-bold md:text-5xl">{customMarketing.heading}</h1>
        <p className="text-xl text-muted-foreground">{customMarketing.message}</p>
        <Link href="/sponsor/annual-partnerships" className="mt-8 inline-block font-medium underline underline-offset-4">Explore Annual Partnerships</Link>
      </div>
    </section>
  )
}