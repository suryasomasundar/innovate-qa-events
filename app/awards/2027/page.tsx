import Link from "next/link"
import { ArrowRight, Gavel, Sparkles, Trophy } from "lucide-react"
import { awards2027 as edition } from "@/lib/awards-data"
import { orderedCategories } from "@/lib/awards"
import { AwardsTrophy } from "@/components/awards/shared"
import { generateSEO } from "@/components/seo"

export const metadata = generateSEO({
  title: `${edition.conferenceName} Awards Studio`,
  description: "Explore the interactive 2027 awards judging and cinematic ceremony prototype with fictional demo nominees.",
  canonical: "/awards/2027",
  noIndex: true,
})

export default function Awards2027Page() {
  return (
    <div className="awards-experience px-4 py-14 md:py-20">
      <div className="mx-auto max-w-6xl">
        <header className="mx-auto max-w-3xl text-center">
          <p className="awards-eyebrow">{edition.conferenceName} / Awards studio</p>
          <AwardsTrophy />
          <h1 className="awards-display">Great work.<br /><span>Extraordinary people.</span></h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-300">{edition.description}</p>
        </header>
        <div className="awards-demo-notice my-10"><Sparkles aria-hidden="true" className="size-5 shrink-0" /><p>{edition.demoNotice} Judging is browser-local, not authenticated. Demo winners are public configuration, not confidential results.</p></div>
        <div className="grid gap-6 md:grid-cols-2">
          <article className="awards-panel p-7 md:p-10">
            <Gavel aria-hidden="true" className="mb-7 size-9 text-amber-200" />
            <p className="awards-eyebrow">Consider every contribution</p>
            <h2 className="mt-4 text-3xl font-semibold">The judging room</h2>
            <p className="my-5 leading-relaxed text-slate-300">Meet the nominees, evaluate the evidence, and save thoughtful ratings. One focused workspace for every award.</p>
            <Link className="awards-button" href="/awards/2027/judging">Open Judging<ArrowRight aria-hidden="true" className="size-4" /></Link>
          </article>
          <article className="awards-panel awards-panel-gold p-7 md:p-10">
            <Trophy aria-hidden="true" className="mb-7 size-9 text-amber-200" />
            <p className="awards-eyebrow">Give excellence its moment</p>
            <h2 className="mt-4 text-3xl font-semibold">The ceremony stage</h2>
            <p className="my-5 leading-relaxed text-slate-300">A cinematic, presenter-led journey. Nominees in the spotlight, an intentional reveal, and a celebration to remember.</p>
            <Link className="awards-button" href="/awards/2027/ceremony">Launch Ceremony<ArrowRight aria-hidden="true" className="size-4" /></Link>
          </article>
        </div>
        <section className="mt-16" aria-labelledby="studio-categories-heading">
          <h2 id="studio-categories-heading" className="text-center text-2xl font-semibold">Seven categories. A world of possibility.</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {orderedCategories(edition).map((category) => <article key={category.id} className="awards-panel p-6"><p className="awards-eyebrow">0{category.displayOrder}</p><h3 className="mt-3 text-xl font-semibold">{category.name}</h3><p className="mt-3 text-sm leading-relaxed text-slate-300">{category.description}</p><p className="mt-5 text-xs text-amber-200">{category.nomineeIds.length} demo nominees · {category.criteriaIds.length} criteria</p></article>)}
          </div>
        </section>
        <p className="mt-12 text-center"><Link href="/awards" className="awards-text-link">Explore the existing Innovate QA Awards</Link></p>
      </div>
    </div>
  )
}
