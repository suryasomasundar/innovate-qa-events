import homeData from "@/data/home.json"
import { EventSpeakerCarousel } from "@/components/event-speaker-carousel"

export function SpeakersSection() {
  return <EventSpeakerCarousel speakers={homeData.speakers.featured} />
}
