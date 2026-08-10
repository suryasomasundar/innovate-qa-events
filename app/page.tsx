import { HeroSection } from "@/components/hero-section"
import { FeaturesSection } from "@/components/features-section"
import { AboutSection } from "@/components/about-section"
import { SpeakersSection } from "@/components/speakers-section"
import { FeaturedSessions } from "@/components/featured-sessions"
import { ScheduleSection } from "@/components/schedule-section"
import { VenueSection } from "@/components/venue-section"
import { PricingSection } from "@/components/pricing-section"
import { SponsorsSection } from "@/components/sponsors-section"
import { HomeTestimonialsSection } from "@/components/home-testimonials-section"
import { NewsletterSection } from "@/components/newsletter-section"
import { EventLD } from "@/components/json-ld"
import homeData from "@/data/home.json"

export default function Home() {
  const { eventLD } = homeData

  return (
    <>
      <EventLD
        name={eventLD.name}
        description={eventLD.description}
        startDate={eventLD.startDate}
        endDate={eventLD.endDate}
        location={eventLD.location}
        offers={eventLD.offers}
      />
      <HeroSection />
      <FeaturesSection />
      <AboutSection />
      <SpeakersSection />
      <FeaturedSessions />
      {/* <ScheduleSection /> */}
      <VenueSection />
      <PricingSection />
      <SponsorsSection />
      <HomeTestimonialsSection />
      <NewsletterSection />
    </>
  )
}
