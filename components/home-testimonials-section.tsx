import Link from "next/link"
import { ArrowRight, Quote } from "lucide-react"
import { Button } from "@/components/ui/button"

type Testimonial = {
  quote: string
  name: string
  title: string
  company?: string
  featured?: boolean
}

const testimonials: Testimonial[] = [
  {
    quote:
      "This was one of the most engaged, approachable, and upbeat collections of conference attendees I've ever witnessed.",
    name: "Matt Eonta",
    title: "Head of Growth & Operation",
    featured: true,
  },
  {
    quote:
      "The audience engagement was phenomenal: thoughtful questions, sharp perspectives, and meaningful feedback.",
    name: "Priyamvada Govil",
    title: "Senior Manager, Quality Engineering",
    company: "Amazon",
  },
  {
    quote:
      "The most lasting value was the conversations with leaders and peers across the industry who are thinking hard about the same problems I am.",
    name: "Raj Shah",
    title: "Quality Assurance Engineer, ISTQB Certified Tester",
    company: "Amazon",
  },
  {
    quote:
      "I walked into a room with people I had never worked with before, and within hours we were building, testing, and shipping together.",
    name: "Vishnu M Menon",
    title: "Senior SDET | QA Automation",
  },
  {
    quote:
      "The challenge was to build an entire regression suite in just 5 hours using AI-powered testing tools. It was a great hands-on experience.",
    name: "Meenaakshi M",
    title: "QA Engineering Manager | AI Model Validation Expert",
  },
  {
    quote:
      "In just a few hours, we aligned as a brand-new team, built a solid testing strategy, and delivered a final presentation to a live audience.",
    name: "Neetu Kulshrestha",
    title: "Engineering & Quality Leader",
  },
  {
    quote:
      "I didn't know QA hackathons were a thing. I walked away with a win and, even better, a new community.",
    name: "Andrew Quintana",
    title: "AI Software and Evaluations",
  },
  {
    quote:
      "In just 4 hours, we drafted a full test plan, built E2E suites, ran tests in real time, and covered edge cases to accessibility.",
    name: "Nagamani Vajrala",
    title: "QA Automation Engineer",
  },
  {
    quote:
      "This was not just innovation. It was proof of how fast and creatively the future of QA is unfolding.",
    name: "Shashi Pajjuri",
    title: "Senior QA Lead",
  },
  {
    quote:
      "That was a fun and fulfilling event, a chance to meet some amazing test engineers, leaders, founders and builders.",
    name: "Manju Abraham",
    title: "Product Operations Executive",
  },
  {
    quote:
      "Getting hands-on access to these AI tools gives me a better way to share their capabilities and make educated decisions.",
    name: "Attendee",
    title: "Battle of AI Test Tools Participant",
  },
]

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <article
      className={`flex min-h-[210px] w-[330px] shrink-0 flex-col justify-between rounded-lg border bg-card p-6 shadow-sm ${
        testimonial.featured ? "border-primary/25 shadow-primary/10" : "border-border/70"
      }`}
    >
      <div>
        <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary">
          <Quote className="h-4 w-4" />
        </div>
        <p className="line-clamp-5 text-sm leading-relaxed text-foreground">{testimonial.quote}</p>
      </div>
      <div className="mt-5 border-t border-border/60 pt-4">
        <p className="font-bold leading-tight text-primary">{testimonial.name}</p>
        <p className="mt-1 text-sm leading-snug text-muted-foreground">
          {testimonial.title}
          {testimonial.company ? `, ${testimonial.company}` : ""}
        </p>
      </div>
    </article>
  )
}

export function HomeTestimonialsSection() {
  const rollingTestimonials = [...testimonials, ...testimonials]

  return (
    <section id="testimonials" className="overflow-hidden bg-background py-20 md:py-24">
      <div className="container mx-auto px-4">
        <div className="mb-10 grid gap-6 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <p className="mb-3 text-sm font-bold uppercase tracking-wider text-primary">Attendee Voices</p>
            <h2 className="mb-4 max-w-3xl text-4xl font-bold leading-tight tracking-normal text-foreground md:text-5xl">
              What attendees are saying
            </h2>
            <p className="max-w-3xl text-lg leading-relaxed text-muted-foreground">
              Real feedback from attendees, speakers, and participants who joined Innovate QA experiences.
            </p>
          </div>
          <Button asChild className="w-fit rounded-full px-7 shadow-lg shadow-primary/20">
            <Link href="/battle-of-ai-test-tools#gallery">
              See Event Gallery Highlights
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="relative hidden md:block">
          <div className="pointer-events-none absolute bottom-0 left-0 top-0 z-10 w-24 bg-gradient-to-r from-background to-transparent" />
          <div className="pointer-events-none absolute bottom-0 right-0 top-0 z-10 w-24 bg-gradient-to-l from-background to-transparent" />
          <div className="testimonials-marquee flex w-max gap-4 py-2">
            {rollingTestimonials.map((testimonial, index) => (
              <TestimonialCard key={`${testimonial.name}-${index}`} testimonial={testimonial} />
            ))}
          </div>
        </div>

        <div className="-mx-4 flex gap-4 overflow-x-auto px-4 pb-4 md:hidden">
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.name} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </section>
  )
}
