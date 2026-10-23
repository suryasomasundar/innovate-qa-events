import Link from "next/link"
import type { Metadata } from "next"
import {
  ArrowRight,
  Award,
  BookOpen,
  CalendarDays,
  Check,
  Lightbulb,
  MessageSquare,
  Network,
  Sparkles,
  Users,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CommunityJoinPanel } from "@/components/community-join-panel"

export const metadata: Metadata = {
  title: "Free QA Community Membership (Beta) | Innovate QA",
  description:
    "Join Innovate QA's free community membership for practitioner-led events, practical learning, meaningful connections, and opportunities to contribute.",
}

const benefits = [
  {
    icon: CalendarDays,
    title: "Community events",
    description: "Discover virtual and in-person meetups, roundtables, workshops, and conference activities.",
  },
  {
    icon: BookOpen,
    title: "Practical learning",
    description: "Get useful ideas on AI in testing, automation, quality strategy, leadership, and modern delivery.",
  },
  {
    icon: Network,
    title: "Meaningful connections",
    description: "Meet QA professionals, SDETs, managers, and engineering leaders solving real problems.",
  },
  {
    icon: Lightbulb,
    title: "Early access",
    description: "Hear about new sessions, calls for speakers, workshops, and community programs early.",
  },
  {
    icon: MessageSquare,
    title: "Ways to contribute",
    description: "Share a lesson, lead a conversation, volunteer, write, speak, or help shape future events.",
  },
  {
    icon: Award,
    title: "Community recognition",
    description: "Celebrate practitioners and leaders moving quality engineering forward through real impact.",
  },
]

const steps = [
  {
    number: "01",
    title: "Join free",
    description: "Tell us who you are and what parts of quality engineering interest you.",
  },
  {
    number: "02",
    title: "Choose your events",
    description: "Get updates and register for the conversations, meetups, and learning that fit you.",
  },
  {
    number: "03",
    title: "Learn and contribute",
    description: "Build relationships, apply practical ideas, and share what you learn with the community.",
  },
]

const audiences = ["QA & Test Engineers", "SDETs", "QA Managers", "Engineering Leaders", "Early-career Professionals"]

export default function CommunityPage() {
  return (
    <main className="min-h-screen bg-background">
      <section className="relative overflow-hidden border-b bg-[radial-gradient(circle_at_top_left,rgba(192,38,211,0.22),transparent_36%),linear-gradient(135deg,#2e0754_0%,#4b0b78_48%,#24104f_100%)] text-white">
        <div className="absolute inset-0 bg-[url('/abstract-purple-tech-pattern.png')] bg-cover bg-center opacity-[0.08]" />
        <div className="container relative mx-auto px-4 py-20 md:py-28">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold backdrop-blur">
              <Sparkles className="h-4 w-4" aria-hidden="true" />
              Free membership · Beta
            </div>
            <h1 className="text-balance text-4xl font-bold tracking-tight md:text-6xl lg:text-7xl">
              Grow your QA career with people doing the work.
            </h1>
            <p className="mx-auto mt-6 max-w-3xl text-pretty text-lg leading-relaxed text-purple-100 md:text-xl">
              Join a practitioner-led community for useful events, honest conversations, and modern quality
              engineering—from hands-on testing to leadership.
            </p>
            <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
              <Button asChild size="lg" className="h-12 bg-white px-7 text-base font-semibold text-purple-950 hover:bg-purple-50">
                <a href="#join">
                  Join free <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                </a>
              </Button>
              <Button asChild size="lg" variant="outline" className="h-12 border-white/35 bg-white/5 px-7 text-base text-white hover:bg-white/15 hover:text-white">
                <Link href="/meetups">Explore community events</Link>
              </Button>
            </div>
            <p className="mt-5 text-sm text-purple-200">No membership fee. Join from anywhere.</p>
          </div>
        </div>
      </section>

      <section className="border-b bg-purple-50/70 py-7 dark:bg-purple-950/20">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm font-medium text-purple-950 dark:text-purple-100">
            {audiences.map((audience) => (
              <span key={audience} className="inline-flex items-center gap-2">
                <Check className="h-4 w-4 text-primary" aria-hidden="true" /> {audience}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="py-18 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-primary">Your membership</p>
            <h2 className="text-balance text-3xl font-bold md:text-5xl">A useful community—not another noisy feed.</h2>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
              Come for practical learning and relevant events. Stay for the people, perspective, and opportunities to
              help shape the future of quality.
            </p>
          </div>

          <div className="mx-auto grid max-w-6xl gap-5 md:grid-cols-2 lg:grid-cols-3">
            {benefits.map((benefit) => (
              <Card key={benefit.title} className="border-purple-100 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg dark:border-purple-900/50 dark:bg-card">
                <CardContent className="p-6">
                  <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-purple-100 text-primary dark:bg-purple-950/60">
                    <benefit.icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <h3 className="text-lg font-semibold">{benefit.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-muted/35 py-18 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto grid max-w-6xl items-start gap-12 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-primary">Simple by design</p>
              <h2 className="text-3xl font-bold md:text-4xl">How the beta works</h2>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                We are starting with the essentials: a direct way to join, find community events, and stay connected.
                Member profiles and a personalized dashboard can follow after we learn what members actually use.
              </p>
              <Button asChild variant="outline" className="mt-7">
                <Link href="/meetups">
                  View community events <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                </Link>
              </Button>
            </div>

            <div className="space-y-4">
              {steps.map((step) => (
                <div key={step.number} className="grid grid-cols-[3.5rem_1fr] gap-4 rounded-2xl border bg-background p-5 shadow-sm">
                  <span className="font-mono text-2xl font-bold text-primary/45">{step.number}</span>
                  <div>
                    <h3 className="text-lg font-semibold">{step.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="join" className="scroll-mt-24 bg-[linear-gradient(135deg,#2e0754_0%,#4b0b78_55%,#24104f_100%)] py-18 text-white md:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center">
            <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10">
              <Users className="h-6 w-6" aria-hidden="true" />
            </div>
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-purple-200">Founding beta members</p>
            <h2 className="text-3xl font-bold md:text-5xl">Join the Innovate QA community</h2>
            <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-purple-100">
              Sign up free for community events, practical QA learning, opportunities to contribute, and important
              membership updates.
            </p>
            <div className="mt-9">
              <CommunityJoinPanel />
            </div>
            <p className="mt-5 text-xs leading-relaxed text-purple-200">
              By joining, you agree to receive Innovate QA community and event emails. You can unsubscribe at any time.
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}
