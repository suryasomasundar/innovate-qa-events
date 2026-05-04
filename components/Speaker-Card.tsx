import { Card, CardContent } from "@/components/ui/card"
import { Linkedin } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { BASE_PATH } from "@/lib/constants"

interface Speaker {
  id: string
  name: string
  title?: string
  role?: string
  company: string
  image: string
  linkedin?: string
  social?: { linkedin?: string }
  topic?: string
  keynote?: boolean
  workshop?: boolean
}

interface SpeakerCardProps {
  speaker: Speaker
}

export function SpeakerCard({ speaker }: SpeakerCardProps) {
  const displayTitle = speaker.title ?? speaker.role ?? ""
  const linkedinUrl = speaker.linkedin ?? speaker.social?.linkedin ?? ""

  return (
    <Card className="bg-card border-border/50 overflow-hidden group hover:border-primary/30 transition-colors flex flex-col h-full py-0 pb-6 relative">
      {/* Stretched link covers the whole card — excluded from LinkedIn button via z-index */}
      <Link
        href={`/speakers/${speaker.id}`}
        className="absolute inset-0 z-0"
        aria-label={`View ${speaker.name}'s speaker profile`}
      />

      <div className="aspect-[3/4] overflow-hidden bg-muted -m-px relative">
        <Image
          src={speaker.image ? `${BASE_PATH}${speaker.image}` : "/placeholder.svg"}
          alt={speaker.name}
          fill
          className="object-cover object-top group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <CardContent className="pt-4 flex-1 flex flex-col">
        <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">{speaker.name}</h3>
        {displayTitle && <p className="text-sm text-primary font-medium">{displayTitle}</p>}
        {speaker.company && <p className="text-sm text-muted-foreground mb-2">{speaker.company}</p>}

        {speaker.topic && (
          <div className="mb-3">
            <p className="text-xs font-medium text-primary/80 line-clamp-2">
              {speaker.topic}
            </p>
            {(speaker.keynote || speaker.workshop) && (
              <div className="flex gap-1 mt-2">
                {speaker.keynote && (
                  <span className="inline-block px-2 py-0.5 bg-primary/10 text-primary text-xs font-medium rounded">
                    Keynote
                  </span>
                )}
                {speaker.workshop && (
                  <span className="inline-block px-2 py-0.5 bg-primary/10 text-primary text-xs font-medium rounded">
                    Workshop
                  </span>
                )}
              </div>
            )}
          </div>
        )}

        <div className="flex gap-2 mt-auto relative z-10">
          {linkedinUrl && (
            <a
              href={linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="h-8 w-8 rounded-full bg-muted flex items-center justify-center hover:bg-primary/10 transition-colors"
            >
              <Linkedin className="h-4 w-4 text-muted-foreground" />
            </a>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
