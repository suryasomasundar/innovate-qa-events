import eventData from "@/data/events/2026.json"
import { EventSpeakerCarousel } from "@/components/event-speaker-carousel"

export function SpeakersSection() {
  return <EventSpeakerCarousel speakers={eventData.speakers} eyebrow="All Speakers" />
}
