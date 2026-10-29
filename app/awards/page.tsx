import type { Metadata } from "next"
import { Brain, Settings, Rocket, Wrench, Globe, Sprout, Sparkles, Trophy, Check, Star, Gavel, type LucideIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { generateSEO } from "@/components/seo"
import { WebPageLD, BreadcrumbLD } from "@/components/json-ld"
import Link from "next/link"
import awardsData from "@/data/awards/2027.json"
import { appConfig } from "@/lib/app-config"
import { EventJudgePanel } from "@/components/event-judge-panel"

export const metadata: Metadata = generateSEO({
  title: awardsData.title,
  description: awardsData.description,
  canonical: "/awards",
  keywords: [`${awardsData.year} QA awards`, "software testing awards", "quality engineering", "award nominations", "testing innovation"],
})

const iconMap: Record<string, LucideIcon> = {
  Brain,
  Settings,
  Rocket,
  Wrench,
  Globe,
  Sprout,
  Sparkles,
}

const styleMap: Record<string, { color: string; bg: string; border: string; gradient: string }> = {
  "thought-leader":     { color: "text-purple-500", bg: "bg-purple-500/10",  border: "border-purple-500/20", gradient: "from-purple-100 via-card to-fuchsia-50 dark:from-purple-950 dark:to-fuchsia-950" },
  "excellence-automation": { color: "text-indigo-500", bg: "bg-indigo-500/10", border: "border-indigo-500/20", gradient: "from-indigo-100 via-card to-purple-50 dark:from-indigo-950 dark:to-purple-950" },
  "innovative-org":     { color: "text-rose-500", bg: "bg-rose-500/10", border: "border-rose-500/20", gradient: "from-rose-100 via-card to-purple-50 dark:from-rose-950 dark:to-purple-950" },
  "best-tool":          { color: "text-violet-500", bg: "bg-violet-500/10", border: "border-violet-500/20", gradient: "from-violet-100 via-card to-fuchsia-50 dark:from-violet-950 dark:to-fuchsia-950" },
  "community-champion": { color: "text-fuchsia-500", bg: "bg-fuchsia-500/10", border: "border-fuchsia-500/20", gradient: "from-fuchsia-100 via-card to-pink-50 dark:from-fuchsia-950 dark:to-pink-950" },
  "emerging-talent":    { color: "text-purple-500", bg: "bg-purple-500/10", border: "border-purple-500/20", gradient: "from-purple-100 via-card to-indigo-50 dark:from-purple-950 dark:to-indigo-950" },
  "innovation-practice":{ color: "text-primary",    bg: "bg-primary/10",     border: "border-primary/20", gradient: "from-indigo-100 via-card to-violet-50 dark:from-indigo-950 dark:to-violet-950" },
  "sponsors-choice":   { color: "text-pink-700",   bg: "bg-pink-500/10",    border: "border-pink-500/20", gradient: "from-pink-100 via-card to-violet-50 dark:from-pink-950 dark:to-violet-950" },
}

export default function AwardsPage() {
  const applicationUrl = appConfig.awards.applicationUrl
  const nominationDeadline = new Intl.DateTimeFormat("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" }).format(new Date(`${awardsData.nominationDeadline}T00:00:00Z`))

  return (
    <>
      <WebPageLD
        title={awardsData.title}
        description={awardsData.description}
        url="/awards"
      />
      <BreadcrumbLD
        items={[
          { name: "Home", url: "/" },
          { name: "Awards", url: "/awards" },
        ]}
      />

      {/* Hero */}
      <section className="relative py-20 md:py-28 bg-gradient-to-br from-primary/20 via-background to-primary/10 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <Trophy className="h-4 w-4" />
              <span>Innovate QA Conference {awardsData.year}</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 text-balance">
              Innovate QA {awardsData.year}{" "}
              <span className="text-primary drop-shadow-[0_0_15px_rgba(75,0,130,0.5)]">Awards</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 text-pretty">{awardsData.description}</p>
            <p className="mb-6 text-sm font-medium text-primary">{applicationUrl ? "Nominations are open." : `${awardsData.year} award nominations`} Nomination deadline: {nominationDeadline}.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild className="h-auto min-h-11 whitespace-normal">
                <a href={applicationUrl || "#apply"}>
                  <Trophy className="mr-2 h-4 w-4 shrink-0" aria-hidden="true" />
                  {applicationUrl ? `Apply for a ${awardsData.year} Award` : `${awardsData.year} Application Details`}
                </a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href={awardsData.judgeApplicationUrl}>
                  <Gavel className="mr-2 h-4 w-4" />
                  Apply to Judge
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="#categories">View Categories</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="py-10 border-b border-border bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 text-center">
            <div>
              <p className="text-3xl font-bold text-primary">{awardsData.categories.length}</p>
              <p className="text-sm text-muted-foreground">Award Categories</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-primary"><time dateTime={awardsData.nominationDeadline}>{nominationDeadline}</time></p>
              <p className="text-sm text-muted-foreground">Nominations Due</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-primary"><time dateTime={awardsData.announcementDate}>{awardsData.ceremonyDate}</time></p>
              <p className="text-sm text-muted-foreground">Award Announcements</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section id="categories" className="scroll-mt-24 py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{awardsData.year} Award Categories</h2>
            <div className="w-20 h-1 bg-primary mx-auto rounded-full mb-6" />
            <p className="text-lg text-muted-foreground">
              {awardsData.categoriesDescription}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {awardsData.categories.map((cat) => {
              const Icon = iconMap[cat.icon] ?? Sparkles
              const style = styleMap[cat.id] ?? styleMap["innovation-practice"]
              return (
                <Card key={cat.id} className={`border ${style.border} bg-gradient-to-br ${style.gradient} hover:shadow-lg transition-shadow`}>
                  <CardHeader className="pb-3">
                    <div className="flex items-start gap-4">
                      <div className={`h-12 w-12 rounded-lg ${style.bg} flex items-center justify-center shrink-0`}>
                        <Icon className={`h-6 w-6 ${style.color}`} />
                      </div>
                      <div>
                        <CardTitle className="text-xl leading-tight mb-1">{cat.title}</CardTitle>
                        <Badge variant="secondary" className="text-xs">{cat.scope}</Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-5">
                    <p className="text-muted-foreground text-sm leading-relaxed">{cat.purpose}</p>

                    {cat.idealNominees.length > 0 && <div>
                      <h4 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-1.5">
                        <Star className="h-3.5 w-3.5 text-primary" />
                        Ideal Nominee
                      </h4>
                      <ul className="space-y-1">
                        {cat.idealNominees.map((item, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <span className={`mt-1.5 h-1.5 w-1.5 rounded-full shrink-0 ${style.bg} border ${style.border}`} />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>}

                    {cat.criteria.length > 0 && <div>
                      <h4 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-1.5">
                        <Check className="h-3.5 w-3.5 text-primary" />
                        Evaluation Criteria
                      </h4>
                      <ul className="space-y-1">
                        {cat.criteria.map((item, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>}
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {awardsData.judges.length > 0 && <EventJudgePanel judges={awardsData.judges} year={awardsData.year} />}

      {/* Nomination CTA */}
      <section id="apply" className="scroll-mt-24 py-20 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <Trophy className="h-12 w-12 text-primary mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Recognize Outstanding Quality in {awardsData.year}</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Nominate a person, team, organization, or tool making a difference in software quality.
              Nominations are due {nominationDeadline}. Awards will be announced on {awardsData.ceremonyDate} at Innovate QA {awardsData.year}.
            </p>
            {!applicationUrl && <p className="mb-6 text-sm text-muted-foreground">The application form is being finalized. Contact us with nomination questions while publication is pending.</p>}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {applicationUrl && <Button size="lg" asChild className="h-auto min-h-11 whitespace-normal"><a href={applicationUrl}><Trophy className="mr-2 h-4 w-4 shrink-0" aria-hidden="true" />Apply for a {awardsData.year} Award</a></Button>}
              <Button size="lg" variant="outline" asChild>
                <Link href={awardsData.judgeApplicationUrl}>
                  <Gavel className="mr-2 h-4 w-4" />
                  Apply to Judge
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
            <p className="text-sm text-muted-foreground mt-6">
              Questions? Email{" "}
              <a href={`mailto:${awardsData.contactEmail}`} className="text-primary hover:underline">
                {awardsData.contactEmail}
              </a>
            </p>
          </div>
        </div>
      </section>
    </>
  )
}