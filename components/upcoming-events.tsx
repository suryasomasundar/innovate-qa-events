 
 import { Button } from "@/components/ui/button"
import { ArrowRight, Calendar, MapPin } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import Image from "next/image"
import { format } from "date-fns"
import { BASE_PATH } from "@/lib/constants"
import homeData from "@/data/home.json"

const upcomingEvents = homeData.upcomingEvents.map((event) => ({
  ...event,
  image: `${BASE_PATH}${event.image}`,
}))

export function UpcomingEvents() {
  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            Upcoming Events
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full mb-6" />
          <p className="text-lg text-muted-foreground text-pretty max-w-4xl mx-auto">
            Join us at our next gathering of quality leaders
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {upcomingEvents.map((event) => {
            const formatDateRange = () => {
              const start = format(new Date(event.date), "MMM d")
              if (event.endDate) {
                const end = format(new Date(event.endDate), "d, yyyy")
                return `${start}-${end}`
              }
              return format(new Date(event.date), "MMM d, yyyy")
            }

            return (
              <Card key={event.id} className="group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-500 py-0">
                <div className="relative h-80 overflow-hidden">
                  <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <Badge className={`absolute top-4 right-4 ${event.status === "past" ? "bg-muted text-muted-foreground" : "bg-purple-500 text-primary-foreground"}`}>
                    {event.status === "past" ? "Past Event" : "Upcoming"}
                  </Badge>
                </div>
                <CardContent className="p-6">
                  <h3 className="font-display font-bold text-xl mb-3 group-hover:text-primary transition-colors">
                    {event.title}
                  </h3>
                  <div className="flex flex-col gap-2 mb-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-primary" />
                      <span>{formatDateRange()}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-primary" />
                      <span>{event.location}</span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-6 line-clamp-2">
                    {event.description}
                  </p>
                  <div className="flex gap-3">
                    {event.status !== "past" && (
                      <Button asChild size="sm" className="border-purple-500 text-white hover:bg-purple-900/75">
                        <Link href={event.ticketUrl}>
                          Get Tickets
                        </Link>
                      </Button>
                    )}
                    <Button asChild size="sm" className="border-purple-500 text-white hover:bg-purple-900/75">
                      <Link href={event.learnMoreUrl}>
                        Learn More <ArrowRight className="w-4 h-4 ml-1" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
