import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Calendar, MapPin, Users, Layers } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { format } from "date-fns"
import { BASE_PATH } from "@/lib/constants"
import homeData from "@/data/home.json"

const upcomingEvent = homeData.upcomingEvents.find((e) => e.status === "upcoming")

export function UpcomingEvents() {
  if (!upcomingEvent) return null

  const start = format(new Date(upcomingEvent.date), "MMM d")
  const dateRange = upcomingEvent.endDate
    ? `${start}–${format(new Date(upcomingEvent.endDate), "d, yyyy")}`
    : format(new Date(upcomingEvent.date), "MMM d, yyyy")

  return (
    <section className="py-20 md:py-28 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Next Event</h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
        </div>

        <div className="max-w-6xl mx-auto rounded-2xl overflow-hidden shadow-xl border border-border/50 bg-card grid lg:grid-cols-2">
          {/* Details */}
          <div className="p-8 md:p-12 flex flex-col justify-center gap-6">
            <div className="flex items-center gap-3">
              <Badge className="bg-purple-500 text-white">Upcoming</Badge>
            </div>

            <h3 className="text-3xl md:text-4xl font-bold text-foreground leading-tight">
              {upcomingEvent.title}
            </h3>

            <div className="flex flex-col gap-3 text-muted-foreground">
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-primary shrink-0" />
                <span className="font-medium">{dateRange}</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-primary shrink-0" />
                <span>{upcomingEvent.location}</span>
              </div>
            </div>

            <p className="text-muted-foreground leading-relaxed">
              {upcomingEvent.description}
            </p>

            <div className="flex gap-6 py-4 border-y border-border/50">
              <div className="flex items-center gap-2 text-sm">
                <Users className="h-4 w-4 text-primary" />
                <span className="text-foreground font-medium">250+</span>
                <span className="text-muted-foreground">Attendees</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Layers className="h-4 w-4 text-primary" />
                <span className="text-foreground font-medium">40+</span>
                <span className="text-muted-foreground">Sessions</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link href={upcomingEvent.ticketUrl} target="_blank" rel="noopener noreferrer">
                  Get Tickets
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href={upcomingEvent.learnMoreUrl}>
                  Learn More <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Image */}
          <div className="relative min-h-[320px] lg:min-h-0">
            <Image
              src={`${BASE_PATH}${upcomingEvent.image}`}
              alt={upcomingEvent.title}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-card/30 to-transparent lg:from-transparent" />
          </div>
        </div>
      </div>
    </section>
  )
}
