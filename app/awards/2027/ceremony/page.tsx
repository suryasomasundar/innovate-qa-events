import { AwardsCeremony } from "@/components/awards/ceremony"
import { generateSEO } from "@/components/seo"

export const metadata = generateSEO({
  title: "2027 Awards Ceremony",
  description: "A cinematic presenter-led awards ceremony prototype using fictional demo nominees.",
  canonical: "/awards/2027/ceremony",
  noIndex: true,
})

export default function AwardsCeremonyPage() {
  return <AwardsCeremony />
}
