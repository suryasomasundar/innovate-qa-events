import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { SpeakerCard } from "@/components/Speaker-Card"
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Zap,
  Target,
  Users,
  TrendingUp,
  CheckCircle2,
  Award,
  Briefcase,
  Code,
  Shield,
  Lightbulb,
  BarChart3,
  Rocket,
  Ticket,
  Mic,
  Clock,
  MapPin,
  Calendar
} from "lucide-react";
import battleData from "@/data/events/battle.json";
import { BASE_PATH } from "@/lib/constants"
import { TestimonialsCarousel } from "@/components/testimonials-carousel"
export const metadata = {
  title: "Battle of AI Test Tools | Innovate QA Events",
  description: "Experience the best AI test tools hands-on—and see how they fit into your testing strategy. A live, in-person event with real-world testing challenges.",
};

const typeColors: Record<string, string> = {
  keynote: "bg-primary text-primary-foreground",
  talk: "bg-accent text-accent-foreground",
  workshop: "bg-chart-2 text-white",
  panel: "bg-chart-3 text-white",
  break: "bg-muted text-muted-foreground",
  welcome: "bg-purple-600 text-white",
  special: "bg-chart-5 text-white",
};

export default function BattleOfAITestToolsPage() {
  const roomMap = new Map(battleData.rooms.map((r) => [r.id, r.name]));
  const speakerMap = new Map(battleData.speakers.map((s) => [s.id, s]));
  const scheduleEntries = Object.entries(battleData.schedule);

  return (
    <div className="min-h-screen">

      {/* Hero */}
      <section className="relative bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 text-white overflow-hidden">
        <div className="container mx-auto max-w-6xl px-4 py-16 md:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-purple-200 text-sm mb-6">
                Past Event · April 3, 2026
              </div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                Battle of AI Test Tools
              </h1>
              <p className="text-xl text-purple-100 mb-8">
                Experience the best AI test tools hands-on—and see how they fit into your testing strategy
              </p>
              <div className="flex flex-wrap gap-4 text-purple-200 text-sm">
                <span className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  April 3, 2026
                </span>
                <span className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  AWS Builder Loft, San Francisco
                </span>
              </div>
            </div>
            <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/battle.webp"
                alt="Battle of AI Test Tools"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-background border-b border-border">
        <div className="container mx-auto max-w-6xl px-4 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="flex flex-col items-center gap-2">
              <div className="h-10 w-10 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center">
                <Users className="h-5 w-5 text-purple-600" />
              </div>
              <p className="text-4xl font-bold text-purple-600">100+</p>
              <p className="text-sm text-muted-foreground">Attendees</p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="h-10 w-10 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center">
                <Zap className="h-5 w-5 text-purple-600" />
              </div>
              <p className="text-4xl font-bold text-purple-600">3</p>
              <p className="text-sm text-muted-foreground">AI Tools Tested</p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="h-10 w-10 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center">
                <Mic className="h-5 w-5 text-purple-600" />
              </div>
              <p className="text-4xl font-bold text-purple-600">{battleData.speakers.length}</p>
              <p className="text-sm text-muted-foreground">Speakers</p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="h-10 w-10 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center">
                <Clock className="h-5 w-5 text-purple-600" />
              </div>
              <p className="text-4xl font-bold text-purple-600">4</p>
              <p className="text-sm text-muted-foreground">Hours of Competition</p>
            </div>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="py-16 bg-background">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="prose prose-lg max-w-none dark:prose-invert mb-16">
            <p className="text-xl leading-relaxed">
              The Battle of AI Test Tools is a live, in-person event hosted by Innovate QA, designed to move beyond demos, slides, and marketing claims—and show how AI testing tools actually perform in real-world conditions.
            </p>
          </div>
          <Card className="border-2 border-purple-200 dark:border-purple-800 overflow-hidden">
            <CardContent className="p-8">
              <div className="flex items-start gap-4 mb-6">
                <div className="bg-purple-100 dark:bg-purple-900 p-3 rounded-lg">
                  <Zap className="h-8 w-8 text-purple-600 dark:text-purple-400" />
                </div>
                <h2 className="text-3xl font-bold mt-2">This is not a traditional conference.</h2>
              </div>
              <p className="text-lg leading-relaxed mb-6">
                At the core of the event is a live testing battle, where teams use AI-powered testing tools against real products, real workflows, and real constraints. Attendees get a hands-on, front-row view into how these tools behave when the stakes, complexity, and time pressure are real.
              </p>
              <p className="text-lg leading-relaxed mb-4">
                Alongside the battle, the event offers parallel tracks for presentations and networking, allowing attendees to shape their own experience:
              </p>
              <div className="grid md:grid-cols-3 gap-4 my-6">
                <div className="flex items-start gap-3 p-4 bg-purple-50 dark:bg-purple-950 rounded-lg">
                  <Target className="h-6 w-6 text-purple-600 dark:text-purple-400 flex-shrink-0 mt-1" />
                  <span className="text-base">Participate directly in the testing competition</span>
                </div>
                <div className="flex items-start gap-3 p-4 bg-purple-50 dark:bg-purple-950 rounded-lg">
                  <Mic className="h-6 w-6 text-purple-600 dark:text-purple-400 flex-shrink-0 mt-1" />
                  <span className="text-base">Attend curated 30-minute talks about future of QA with AI</span>
                </div>
                <div className="flex items-start gap-3 p-4 bg-purple-50 dark:bg-purple-950 rounded-lg">
                  <Users className="h-6 w-6 text-purple-600 dark:text-purple-400 flex-shrink-0 mt-1" />
                  <span className="text-base">Network with peers, leaders, and hands-on engineers</span>
                </div>
              </div>
              <p className="text-lg leading-relaxed mt-6">
                Live leaderboard updates, judge commentary, and team insights connect everything together—so even if you're not competing, you're continuously learning from what's happening in the battle.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* What Makes This Different */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto max-w-6xl px-4">
          <h2 className="text-4xl font-bold mb-8 text-center">What Makes This Event Different</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="bg-green-100 dark:bg-green-900 p-3 rounded-lg flex-shrink-0">
                    <CheckCircle2 className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-3">Real tools. Real testing. Real constraints.</h3>
                    <p>Experience AI testing tools in authentic scenarios, not controlled demos.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-lg flex-shrink-0">
                    <BarChart3 className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-3">Transparent comparison with clear judging criteria</h3>
                    <p>See how tools perform with objective evaluation and live results.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="bg-orange-100 dark:bg-orange-900 p-3 rounded-lg flex-shrink-0">
                    <Code className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-3">Practitioner-first learning, not sales pitches</h3>
                    <p>Learn from engineers who use these tools daily in production.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="bg-purple-100 dark:bg-purple-900 p-3 rounded-lg flex-shrink-0">
                    <Lightbulb className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-3">Focused on clarity and outcomes—not hype</h3>
                    <p>Get evidence-based insights to make informed decisions about AI testing.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          <p className="text-center text-lg mt-8 font-medium">
            The Battle of AI Test Tools is built for leaders and practitioners who want to make smarter, more confident decisions about AI in testing—based on evidence, not promises.
          </p>
        </div>
      </section>

      {/* Schedule */}
      <section id="schedule" className="py-16 bg-background">
        <div className="container mx-auto max-w-6xl px-4">
          <h2 className="text-4xl font-bold mb-2 text-center">Schedule</h2>
          <p className="text-center text-muted-foreground mb-10">April 3, 2026 · AWS Builder Loft, San Francisco</p>
          {scheduleEntries.map(([date, day]) => (
            <div key={date} className="space-y-4">
              {day.slots.map((slot, slotIndex) => (
                <div key={slotIndex} className="border-l-2 border-purple-400/50 pl-4">
                  <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400 font-semibold mb-3">
                    <Clock className="h-4 w-4" />
                    {slot.time}
                    <span className="text-xs text-muted-foreground font-normal">({slot.duration} min)</span>
                  </div>
                  <div className={`grid gap-4 ${slot.sessions.length > 1 ? "md:grid-cols-2 lg:grid-cols-3" : ""}`}>
                    {slot.sessions.map((session, sessionIndex) => {
                      const speaker = "speakerId" in session && session.speakerId ? speakerMap.get(session.speakerId) : null
                      const sessionSpeakers = "speakers" in session && (session as Record<string, unknown>).speakers
                        ? ((session as Record<string, unknown>).speakers as string[])
                            .map((id) => speakerMap.get(id))
                            .filter(Boolean)
                        : []
                      return (
                        <Card key={sessionIndex} className="bg-card border-border/50">
                          <CardContent className="p-4">
                            <div className="flex flex-wrap items-center gap-2 mb-2">
                              <Badge className={typeColors[session.type] || "bg-muted"} variant="secondary">
                                {session.type}
                              </Badge>
                              <span className="text-xs text-muted-foreground flex items-center gap-1">
                                <MapPin className="h-3 w-3" />
                                {roomMap.get(session.room) || session.room}
                              </span>
                            </div>
                            <h4 className="font-semibold text-foreground mb-1">{session.title}</h4>
                            {speaker && (
                              <p className="text-sm text-primary font-medium">
                                {speaker.name} - {speaker.company}
                              </p>
                            )}
                            {sessionSpeakers.length > 0 && (
                              <div className="text-sm text-primary font-medium">
                                {sessionSpeakers.length === 1 ? (
                                  <p>{sessionSpeakers[0]?.name} - {sessionSpeakers[0]?.company}</p>
                                ) : (
                                  <div>
                                    <p className="text-muted-foreground mb-1">Speakers:</p>
                                    <ul className="space-y-0.5">
                                      {sessionSpeakers.map((spk, idx) => (
                                        <li key={idx}>{spk?.name} - {spk?.company}</li>
                                      ))}
                                    </ul>
                                  </div>
                                )}
                              </div>
                            )}
                            {session.description && (
                              <p className="text-sm text-muted-foreground mt-1">{session.description}</p>
                            )}
                          </CardContent>
                        </Card>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* What Engineers Will Gain */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto max-w-6xl px-4">
          <h2 className="text-4xl font-bold mb-8 flex items-center gap-3">
            <Code className="h-10 w-10 text-blue-600 dark:text-blue-400" />
            What Engineers Will Gain
          </h2>
          <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 border-2 border-blue-200 dark:border-blue-800">
            <CardContent className="p-8">
              <p className="text-lg font-semibold mb-6 flex items-center gap-3">
                <Rocket className="h-6 w-6 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                Built expertise and exposure that helps future-proof your QA career as AI becomes part of modern testing practices.
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3 p-4 bg-white dark:bg-blue-900/30 rounded-lg">
                  <CheckCircle2 className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                  <span>Hands-on exposure to AI test tools in real scenarios, not curated demos or scripted examples.</span>
                </div>
                <div className="flex items-start gap-3 p-4 bg-white dark:bg-blue-900/30 rounded-lg">
                  <CheckCircle2 className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                  <span>Practical insight into how AI fits into day-to-day testing workflows, including where it helps and where it breaks down.</span>
                </div>
                <div className="flex items-start gap-3 p-4 bg-white dark:bg-blue-900/30 rounded-lg">
                  <CheckCircle2 className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                  <span>A clearer understanding of trade-offs around speed, signal quality, flakiness, and maintenance.</span>
                </div>
                <div className="flex items-start gap-3 p-4 bg-white dark:bg-blue-900/30 rounded-lg">
                  <CheckCircle2 className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                  <span>Concrete ideas you can apply immediately to improve test coverage, feedback loops, and reliability.</span>
                </div>
                <div className="flex items-start gap-3 p-4 bg-white dark:bg-blue-900/30 rounded-lg md:col-span-2">
                  <CheckCircle2 className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                  <span>Peer learning from other engineers and SDETs actively testing and evaluating AI tools.</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* What Quality Leaders Will Gain */}
      <section className="py-16 bg-background">
        <div className="container mx-auto max-w-6xl px-4">
          <h2 className="text-4xl font-bold mb-8 flex items-center gap-3">
            <Briefcase className="h-10 w-10 text-purple-600 dark:text-purple-400" />
            What Quality Leaders Will Gain
          </h2>
          <Card className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950 border-2 border-purple-200 dark:border-purple-800">
            <CardContent className="p-8">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3 p-4 bg-white dark:bg-purple-900/30 rounded-lg">
                  <TrendingUp className="h-5 w-5 text-purple-600 dark:text-purple-400 flex-shrink-0 mt-0.5" />
                  <span>Clear evidence to support or challenge AI adoption decisions before investing budget and organizational trust.</span>
                </div>
                <div className="flex items-start gap-3 p-4 bg-white dark:bg-purple-900/30 rounded-lg">
                  <Users className="h-5 w-5 text-purple-600 dark:text-purple-400 flex-shrink-0 mt-0.5" />
                  <span>A realistic view of how AI changes roles, ownership, and quality processes across teams.</span>
                </div>
                <div className="flex items-start gap-3 p-4 bg-white dark:bg-purple-900/30 rounded-lg">
                  <Shield className="h-5 w-5 text-purple-600 dark:text-purple-400 flex-shrink-0 mt-0.5" />
                  <span>Guidance on where AI delivers real value—and where it introduces risk in modern SDLCs.</span>
                </div>
                <div className="flex items-start gap-3 p-4 bg-white dark:bg-purple-900/30 rounded-lg">
                  <BarChart3 className="h-5 w-5 text-purple-600 dark:text-purple-400 flex-shrink-0 mt-0.5" />
                  <span>Better framing for executive conversations around ROI, trust, scalability, and governance.</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Who Should Attend */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto max-w-6xl px-4">
          <h2 className="text-4xl font-bold mb-8 text-center flex items-center justify-center gap-3">
            <Award className="h-10 w-10 text-indigo-600 dark:text-indigo-400" />
            Who Should Attend
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            <Card className="hover:shadow-lg transition-shadow border-2 border-indigo-200 dark:border-indigo-800">
              <CardContent className="p-6 text-center">
                <div className="bg-indigo-100 dark:bg-indigo-900 p-3 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Briefcase className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
                </div>
                <h3 className="font-semibold mb-2">QA Leaders</h3>
                <p className="text-sm text-muted-foreground">QA Managers and Quality Engineering Leaders</p>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow border-2 border-indigo-200 dark:border-indigo-800">
              <CardContent className="p-6 text-center">
                <div className="bg-indigo-100 dark:bg-indigo-900 p-3 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <TrendingUp className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
                </div>
                <h3 className="font-semibold mb-2">Engineering Leaders</h3>
                <p className="text-sm text-muted-foreground">Engineering Managers, Directors, and VPs</p>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow border-2 border-indigo-200 dark:border-indigo-800">
              <CardContent className="p-6 text-center">
                <div className="bg-indigo-100 dark:bg-indigo-900 p-3 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Code className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
                </div>
                <h3 className="font-semibold mb-2">QA Engineers</h3>
                <p className="text-sm text-muted-foreground">QA and Test Automation Engineers</p>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow border-2 border-indigo-200 dark:border-indigo-800">
              <CardContent className="p-6 text-center">
                <div className="bg-indigo-100 dark:bg-indigo-900 p-3 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Target className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
                </div>
                <h3 className="font-semibold mb-2">SDETs</h3>
                <p className="text-sm text-muted-foreground">SDETs and Senior Engineers</p>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow border-2 border-indigo-200 dark:border-indigo-800 md:col-span-2">
              <CardContent className="p-6 text-center">
                <div className="bg-indigo-100 dark:bg-indigo-900 p-3 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Lightbulb className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
                </div>
                <h3 className="font-semibold mb-2">AI Testing Enthusiasts</h3>
                <p className="text-sm text-muted-foreground">Anyone evaluating or adopting AI-driven testing and quality practices</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Speakers */}
      <section id="speakers" className="py-16 bg-background">
        <div className="container mx-auto max-w-6xl px-4">
          <h2 className="text-3xl font-bold text-foreground mb-8">Speakers</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {battleData.speakers.map((speaker) => (
              <SpeakerCard key={speaker.id} speaker={speaker} />
            ))}
          </div>
        </div>
      </section>

      {/* Judges */}
      <section id="judges" className="py-16 bg-muted/30">
        <div className="container mx-auto max-w-6xl px-4">
          <h2 className="text-3xl font-bold text-foreground mb-8">Judges</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {battleData.judges.map((judge) => (
              <SpeakerCard key={judge.id} speaker={judge} />
            ))}
          </div>
        </div>
      </section>

      {/* Sponsors */}
      {battleData.sponsors.gold && battleData.sponsors.gold.length > 0 && (
        <section className="py-16 bg-background">
          <div className="container mx-auto max-w-6xl px-4">
            <h2 className="text-4xl font-bold mb-8 text-center">Sponsors</h2>
            <h3 className="text-lg font-semibold text-primary mb-6 text-center">Gold Sponsors</h3>
            <div className="flex flex-wrap justify-center gap-6">
              {battleData.sponsors.gold.map((sponsor) => (
                <a key={sponsor.name} href={sponsor.url || "#"} target="_blank" rel="noopener noreferrer" className="w-full sm:w-[338px]">
                  <Card className="h-full hover:shadow-lg transition-shadow border-primary/20 bg-gradient-to-br from-yellow-50 to-amber-50 dark:from-yellow-950/20 dark:to-amber-950/20">
                    <CardContent className="px-6 pb-6 pt-0 flex flex-col items-center text-center">
                      <div className="h-28 w-full flex items-center justify-center mb-4">
                        <Image
                          src={sponsor.logo ? (sponsor.logo.startsWith('http') ? sponsor.logo : `${BASE_PATH}/${sponsor.logo}`) : "/placeholder.svg"}
                          alt={sponsor.name}
                          width={200}
                          height={112}
                          className="h-28 object-contain"
                          style={{ width: "auto" }}
                          unoptimized={sponsor.logo?.startsWith("http") || sponsor.logo?.endsWith(".svg")}
                        />
                      </div>
                      <h4 className="font-semibold text-foreground mb-2">{sponsor.name}</h4>
                      {sponsor.tagline && (
                        <p className="text-sm text-muted-foreground">{sponsor.tagline}</p>
                      )}
                    </CardContent>
                  </Card>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Photo Gallery */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto max-w-6xl px-4">
          <h2 className="text-4xl font-bold mb-4 text-center">Event Gallery</h2>
          <p className="text-center text-muted-foreground mb-10">Highlights from the Battle of AI Test Tools — April 3, 2026 · San Francisco</p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
            {[
              "1.png","2.png","3.png","4.png","5.png",
              "6.png","7.png","8.png","9.png","10.png",
              "11.png","12.png","13.png","14.png","15.png",
            ].map((file) => (
              <div key={file} className="aspect-square rounded-lg overflow-hidden bg-muted relative group">
                <Image
                  src={`/photos/battle/${file}`}
                  alt={`Battle of AI Test Tools - ${file}`}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  unoptimized
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-background">
        <div className="container mx-auto max-w-6xl px-4">
          <TestimonialsCarousel />
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
        <div className="container mx-auto max-w-6xl px-4 text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-white/10 p-4 rounded-full">
              <Rocket className="h-12 w-12" />
            </div>
          </div>
          <h2 className="text-4xl font-bold mb-6">See You at Innovate QA 2026!</h2>
          <p className="text-xl mb-8">
            The Battle of AI Test Tools was an incredible event. Join us next at Innovate QA Conference 2026 — June 5–6 in Bellevue, WA.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button size="lg" asChild className="bg-white hover:bg-purple-50">
              <Link href="https://www.eventbrite.com/e/innovate-qa-2026-software-quality-annual-conference-tickets-1979920880652?aff=oddtdtcreator" target="_blank" rel="noopener noreferrer" className="text-purple-900">
                <Ticket className="mr-2 h-5 w-5" />
                Get Tickets for Innovate QA 2026
              </Link>
            </Button>
          </div>
        </div>
      </section>

    </div>
  );
}
