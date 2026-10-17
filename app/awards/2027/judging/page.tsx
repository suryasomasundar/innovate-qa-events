import { AwardsJudging } from "@/components/awards/judging"
import { generateSEO } from "@/components/seo"

export const metadata = generateSEO({
  title: "2027 Awards Judging Studio",
  description: "Evaluate fictional award nominees in a browser-local judging prototype.",
  canonical: "/awards/2027/judging",
  noIndex: true,
})

export default function AwardsJudgingPage() {
  return <AwardsJudging />
}
