import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin, Car, Plane, Building, Map } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { BASE_PATH } from "@/lib/constants"
import homeData from "@/data/home.json"

const iconMap = {
  Car,
  Plane,
  MapPin,
}

export function VenueSection() {
  const { venue } = homeData

  return (
    <section id="venue" className="py-20 md:py-28 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Venue</h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full mb-6"></div>
          <p className="text-lg text-muted-foreground">
            {venue.description}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <div className="aspect-video rounded-xl overflow-hidden bg-muted relative">
            <Image
              src={`${BASE_PATH}/${venue.image}`}
              alt={venue.name}
              fill
              className="object-cover"
            />
          </div>

          <div>
            <Card className="bg-card border-border/50 mb-6">
              <CardContent className="pt-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Building className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground text-lg">{venue.name}</h3>
                    <p className="text-muted-foreground">
                      {venue.address}
                      <br />
                      {venue.city}, {venue.state} {venue.zip}
                    </p>
                  </div>
                </div>

                <div className="space-y-3 text-sm text-muted-foreground">
                  {venue.features.map((feature, index) => {
                    const Icon = iconMap[feature.icon as keyof typeof iconMap]
                    return (
                      <div key={index} className="flex items-center gap-2">
                        <Icon className="h-4 w-4 text-primary" />
                        <span>{feature.text}</span>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            <div className="flex flex-col sm:flex-row gap-3 sm:justify-end">
              <Button asChild>
                <Link href={venue.mapsUrl} target="_blank">
                  <Map className="mr-2 h-4 w-4" />
                  Get Directions
                </Link>
              </Button>

            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
