'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

const testimonials = [
  {
    quote: "Excited to have been part of Innovate QA – Battle of AI in San Francisco! I had a great time delivering the keynote on 'AI in the QA Lifecycle: From Automation to Autonomous Decisions.' The audience engagement was phenomenal—thoughtful questions, sharp perspectives, and meaningful feedback that made the conversation even richer. Loved connecting with QA leaders from across the globe and witnessing some amazing talent build AI-powered QA tools from scratch in just a day.",
    name: "Priyamvada Govil",
    title: "Senior Manager, Quality Engineering",
    company: "Amazon",
  },
  {
    quote: "This past Friday I flew down to San Francisco for Battle of AI Test Tools — not just to attend, but to actually get my hands on tools I'd never used before: ContextQA, Donobu and mabl. The most lasting value was the conversations — with leaders and peers across the industry who are thinking hard about the same problems I am. Thank you Innovate QA team for creating a space where that kind of growth actually happens.",
    name: "Raj Shah",
    title: "Quality Assurance Engineer, ISTQB Certified Tester",
    company: "Amazon",
  },
  {
    quote: "Still processing this one—we won Best AI Engineering Execution at the Battle of AI Test Tools. What made it special for me wasn't just the result, but the experience. I walked into a room with people I had never worked with before, and within hours we were building, testing, and shipping together. AI in QA isn't hype—it's execution.",
    name: "Vishnu M Menon",
    title: "Senior SDET | QA Automation",
    company: "",
  },
  {
    quote: "A week ago, I had the opportunity to participate in the 'Battle of AI Test Tools,' organized by Innovate QA at the AWS Builder Loft. The challenge: build an entire regression suite in just 5 hours using AI-powered testing tools. Our 'women-powered' team chose ContextQA, and it provided a great hands-on experience in AI-driven testing. That is exactly what I experienced at the battle field with the #InnovateQA crew.",
    name: "Meenaakshi M",
    title: "QA Engineering Manager | AI Model Validation Expert",
    company: "",
  },
  {
    quote: "Last week, I had the opportunity to participate in a truly unique event—'Battle of the AI Test Tools.' Teams were formed through WhatsApp groups, bringing together a diverse mix of people who had never worked together before. While we didn't take home the top prize, we were honored with a special mention for our strategic thinking and overall approach. In just a few hours, we aligned as a brand-new team, built a solid testing strategy, and delivered a final presentation to a live audience.",
    name: "Neetu Kulshrestha",
    title: "Engineering & Quality Leader",
    company: "",
  },
  {
    quote: "I didn't know QA hackathons were a thing. Last Friday, I got to walk away with a W and, even better, a new community. With the help of Deep Barot, we learned the particular ways to provide the system the context it needed. In 4 hours we were able to create a strong plan, implement and validate it, and even identify bugs! What a great experience.",
    name: "Andrew Quintana",
    title: "AI Software and Evaluations",
    company: "",
  },
  {
    quote: "Last Friday, I joined an exciting challenge in San Francisco: the Battle of the AI Test Tools. The goal was simple but tough: build a full regression framework in just 4 hours using AI. In just 4 hours, we managed to draft a full test plan and build E2E suites, run tests in real-time, cover everything from edge cases to accessibility, and use self-healing and parallel runs. AI tools don't just make testing faster; they change how we think about coverage.",
    name: "Nagamani Vajrala",
    title: "QA Automation Engineer",
    company: "",
  },
  {
    quote: "Proud to share that our team using ContextQA won Best AI Engineering Execution at the Battle of AI Test Tools—turning ideas into working test suites in just hours, not weeks. This wasn't just innovation—it was proof of how fast and creatively the future of QA is unfolding.",
    name: "Shashi Pajjuri",
    title: "Senior QA Lead",
    company: "",
  },
  {
    quote: "That was a fun and fulfilling event, a chance to meet some amazing test engineers, leaders, founders and builders. It was the culmination of months of planning and effort. It was a pleasure to select the judges, to get to know and collaborate with you. To the sponsors, thank you for your engagement at the event too.",
    name: "Manju Abraham",
    title: "Product Operations Executive",
    company: "",
  },
  {
    quote: "I liked getting a chance to get some hands-on workshops and use the AI tools. I wanted to say thanks for giving developers access to these resources—it helps with our day-to-day responsibilities at work. I think access to these AI tools gives me a better way to share with others on their capabilities and make educated decisions!",
    name: "Attendee",
    title: "Battle of AI Test Tools Participant",
    company: "",
  },
]

const CARDS_PER_PAGE = 3

export function TestimonialsCarousel() {
  const [page, setPage] = useState(0)
  const totalPages = Math.ceil(testimonials.length / CARDS_PER_PAGE)
  const visible = testimonials.slice(page * CARDS_PER_PAGE, page * CARDS_PER_PAGE + CARDS_PER_PAGE)

  return (
    <div className="mb-16">
      <h2 className="text-4xl font-bold mb-4 text-center">What Attendees Said</h2>
      <p className="text-center text-muted-foreground mb-10">Real feedback from participants of the Battle of AI Test Tools</p>

      <div className="grid md:grid-cols-3 gap-6 min-h-[320px]">
        {visible.map((t, i) => (
          <Card key={i} className="border border-purple-200 dark:border-purple-800 hover:shadow-lg transition-shadow flex flex-col">
            <CardContent className="p-6 flex flex-col gap-4 h-full">
              <Quote className="h-8 w-8 text-purple-400 shrink-0" />
              <p className="text-muted-foreground text-sm leading-relaxed flex-1 line-clamp-6">{t.quote}</p>
              <div className="border-t border-border/50 pt-4 mt-auto">
                <p className="font-semibold text-foreground">{t.name}</p>
                <p className="text-sm text-purple-600 dark:text-purple-400">{t.title}</p>
                {t.company && <p className="text-sm text-muted-foreground">{t.company}</p>}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-center gap-4 mt-8">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setPage((p) => Math.max(0, p - 1))}
          disabled={page === 0}
          className="border-purple-300 hover:border-purple-500"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        <div className="flex gap-2">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i)}
              className={`h-2 rounded-full transition-all ${
                i === page ? 'w-6 bg-purple-600' : 'w-2 bg-purple-200 dark:bg-purple-800'
              }`}
              aria-label={`Go to page ${i + 1}`}
            />
          ))}
        </div>

        <Button
          variant="outline"
          size="icon"
          onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
          disabled={page === totalPages - 1}
          className="border-purple-300 hover:border-purple-500"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      <p className="text-center text-sm text-muted-foreground mt-3">
        {page * CARDS_PER_PAGE + 1}–{Math.min((page + 1) * CARDS_PER_PAGE, testimonials.length)} of {testimonials.length} testimonials
      </p>
    </div>
  )
}
