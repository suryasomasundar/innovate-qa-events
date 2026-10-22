import type { Metadata } from "next"
import { Brain, Settings, Rocket, Wrench, Globe, Sprout, Sparkles, Trophy, Check, Star, ArrowRight, Building2, type LucideIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { generateSEO } from "@/components/seo"
import { WebPageLD, BreadcrumbLD } from "@/components/json-ld"
import Link from "next/link"
import Image from "next/image"
import awardsData from "@/data/awards.json"

export const metadata: Metadata = generateSEO({
  title: "Innovate QA Awards",
  description: awardsData.description,
  canonical: "/awards",
  keywords: ["QA awards", "software testing awards", "quality engineering", "QA thought leader", "testing innovation"],
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

const styleMap: Record<string, { color: string; bg: string; border: string }> = {
  "thought-leader":     { color: "text-purple-500", bg: "bg-purple-500/10",  border: "border-purple-500/20" },
  "excellence-automation": { color: "text-blue-500",   bg: "bg-blue-500/10",    border: "border-blue-500/20" },
  "innovative-org":     { color: "text-orange-500", bg: "bg-orange-500/10",  border: "border-orange-500/20" },
  "best-tool":          { color: "text-yellow-500", bg: "bg-yellow-500/10",  border: "border-yellow-500/20" },
  "community-champion": { color: "text-green-500",  bg: "bg-green-500/10",   border: "border-green-500/20" },
  "emerging-talent":    { color: "text-teal-500",   bg: "bg-teal-500/10",    border: "border-teal-500/20" },
  "innovation-practice":{ color: "text-primary",    bg: "bg-primary/10",     border: "border-primary/20" },
  "ai-innovation-sdlc": { color: "text-pink-500",   bg: "bg-pink-500/10",    border: "border-pink-500/20" },
}

export default function AwardsPage() {
  return (
    <>
      <WebPageLD
        title="Innovate QA Awards"
        description="Celebrating excellence, innovation, and community impact in software quality engineering."
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
              <span>Innovate QA 2026 Awards</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 text-balance">
              Innovate QA{" "}
              <span className="text-primary drop-shadow-[0_0_15px_rgba(75,0,130,0.5)]">Awards</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 text-pretty">
              Celebrating the people and organizations whose innovation, leadership, and community impact shaped
              quality engineering in 2026.
            </p>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
              <span className="h-2 w-2 rounded-full bg-primary" />
              The inaugural Innovate QA Award winners have been announced.
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="#winners">
                  Meet the 2026 Winners
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="#categories">View Categories</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/awards/2027">Explore 2027 Awards Studio</Link>
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
              <p className="text-3xl font-bold text-primary">{awardsData.winners.length}</p>
              <p className="text-sm text-muted-foreground">Award Winners</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-primary">2026</p>
              <p className="text-sm text-muted-foreground">Inaugural Year</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-primary">{awardsData.ceremonyDate}</p>
              <p className="text-sm text-muted-foreground">Award Ceremony</p>
            </div>
          </div>
        </div>
      </section>

      {/* Winners */}
      <section id="winners" className="relative overflow-hidden py-20 md:py-28">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,hsl(var(--primary)/0.12),transparent_34%),radial-gradient(circle_at_bottom_right,hsl(var(--primary)/0.08),transparent_30%)]" />
        <div className="container relative mx-auto px-4">
          <div className="mx-auto mb-14 max-w-3xl text-center">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
              <Trophy className="h-4 w-4" />
              Inaugural awards class
            </div>
            <h2 className="mb-4 text-3xl font-bold text-foreground md:text-5xl">Meet the 2026 Winners</h2>
            <div className="mx-auto mb-6 h-1 w-20 rounded-full bg-primary" />
            <p className="text-lg text-muted-foreground">
              Eight honorees recognized for advancing quality engineering through technical excellence, bold ideas,
              and meaningful community leadership.
            </p>
          </div>

          <div className="mx-auto grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {awardsData.winners.map((winner) => (
              <article
                key={winner.category}
                className="group overflow-hidden rounded-2xl border border-primary/15 bg-card shadow-[0_18px_50px_rgba(47,19,69,0.08)] transition-all duration-300 hover:-translate-y-1 hover:border-primary/35 hover:shadow-[0_24px_60px_rgba(47,19,69,0.14)]"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-primary/15 via-background to-primary/5">
                  {winner.image ? (
                    <Image
                      src={winner.image}
                      alt={winner.kind === "organization" ? `${winner.name} logo` : winner.name}
                      fill
                      sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                      className={winner.kind === "organization" ? "object-contain p-8" : "object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"}
                    />
                  ) : (
                    <div className="flex h-full flex-col items-center justify-center gap-4 p-8 text-center">
                      <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg">
                        <Building2 className="h-10 w-10" />
                      </div>
                      <span className="text-2xl font-bold text-primary">{winner.name}</span>
                    </div>
                  )}
                  <div className="absolute left-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-background/90 text-primary shadow-md backdrop-blur">
                    <Trophy className="h-5 w-5" />
                  </div>
                </div>
                <div className="p-5">
                  <p className="mb-3 min-h-10 text-xs font-bold uppercase leading-5 tracking-[0.12em] text-primary">
                    {winner.category}
                  </p>
                  <h3 className="text-xl font-bold leading-tight text-foreground">{winner.name}</h3>
                  <p className="mt-2 text-sm font-medium text-muted-foreground">{winner.title}</p>
                  {winner.organization && <p className="mt-1 text-sm text-muted-foreground">{winner.organization}</p>}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Judges */}
      <section className="bg-muted/20 py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Meet the Judges</h2>
            <div className="w-20 h-1 bg-primary mx-auto rounded-full mb-6" />
            <p className="text-lg text-muted-foreground">
              Industry leaders and experts evaluating nominations across all award categories.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {awardsData.judges.map((judge) => (
              <div key={judge.name} className="relative w-full aspect-[3/4] rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                <Image
                  src={judge.photo}
                  alt={judge.name}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section id="categories" className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Award Categories</h2>
            <div className="w-20 h-1 bg-primary mx-auto rounded-full mb-6" />
            <p className="text-lg text-muted-foreground">
              Eight categories recognizing the full spectrum of excellence in quality engineering — from individuals
              and emerging talent to teams, tools, and organizations.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {awardsData.categories.map((cat) => {
              const Icon = iconMap[cat.icon] ?? Sparkles
              const style = styleMap[cat.id] ?? styleMap["innovation-practice"]
              return (
                <Card key={cat.id} className={`border ${style.border} hover:shadow-lg transition-shadow`}>
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

                    {cat.idealNominees.length > 0 && (
                      <div>
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
                      </div>
                    )}

                    {cat.criteria.length > 0 && (
                      <div>
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
                      </div>
                    )}
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="py-20 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <Trophy className="h-12 w-12 text-primary mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Celebrating Excellence in Quality</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Congratulations to our inaugural winners, finalists, nominees, judges, and everyone helping move the
              quality engineering community forward.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/awards/2027">
                  Explore the 2027 Awards
                  <ArrowRight className="ml-2 h-4 w-4" />
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
