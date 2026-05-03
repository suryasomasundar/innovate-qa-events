import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, Mic, Wrench } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import homeData from "@/data/home.json"

const typeConfig: Record<string, { label: string; className: string; icon: React.ElementType }> = {
  talk:     { label: "Talk",     className: "bg-primary/10 text-primary border-primary/20",          icon: Mic },
  workshop: { label: "Workshop", className: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20", icon: Wrench },
}

export function FeaturedSessions() {
  const sessions = homeData.featuredSessions

  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Featured Sessions</h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full mb-6" />
          <p className="text-lg text-muted-foreground">
            A glimpse of what's coming at Innovate QA 2026 · June 5–6 · Westin Bellevue, WA
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {sessions.map((session, i) => {
            const config = typeConfig[session.type] ?? typeConfig.talk
            const Icon = config.icon
            return (
              <Card key={i} className="border border-border/50 hover:shadow-md transition-shadow flex flex-col">
                <CardContent className="p-6 flex flex-col gap-4 h-full">
                  <Badge variant="outline" className={`self-start flex items-center gap-1.5 ${config.className}`}>
                    <Icon className="h-3 w-3" />
                    {config.label}
                  </Badge>
                  <p className="font-semibold text-foreground leading-snug flex-1">{session.title}</p>
                  <div className="flex items-center gap-3 mt-auto pt-2 border-t border-border/40">
                    <div className="flex -space-x-2">
                      {session.speakers.map((s, j) => (
                        <div key={j} className="relative h-10 w-10 rounded-full overflow-hidden border-2 border-background ring-1 ring-border/50">
                          <Image
                            src={s.image}
                            alt={s.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                      ))}
                    </div>
                    <div className="text-sm min-w-0">
                      {session.speakers.map((s, j) => (
                        <p key={j} className="leading-tight truncate">
                          <span className="text-foreground font-medium">{s.name}</span>
                          {s.company && <span className="text-muted-foreground"> · {s.company}</span>}
                        </p>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="text-center mt-12">
          <Button asChild size="lg" variant="outline">
            <Link href="/events/2026#schedule">
              View Full Schedule <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
