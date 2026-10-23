import Link from "next/link"
import {
  ArrowRight,
  BriefcaseBusiness,
  CalendarDays,
  CheckCircle2,
  CircleDollarSign,
  Lightbulb,
  MapPin,
  Network,
  Presentation,
  TrendingUp,
  Users,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { BreadcrumbLD } from "@/components/json-ld"
import { ManagerApprovalEmail } from "@/components/manager-approval-email"
import { generateSEO } from "@/components/seo"
import event from "@/data/events/2027.json"
import { formatTicketEventDates, formatTicketMoney } from "@/lib/ticket-pricing"

const { pricing } = event
const money = (amount: number) => formatTicketMoney(amount, pricing)
const eventDates = formatTicketEventDates(event.date.start, event.date.end, pricing.timeZone)

const businessBenefits = [
  {
    title: "Practical learning",
    description: "Bring back approaches, examples, and ideas that can be applied to current quality and delivery challenges.",
    icon: Lightbulb,
  },
  {
    title: "Peer insight",
    description: "Learn how other quality practitioners and engineering leaders are solving similar problems.",
    icon: Users,
  },
  {
    title: "Stronger decisions",
    description: "Evaluate emerging AI, automation, and quality-engineering practices with better context.",
    icon: TrendingUp,
  },
]

const careerBenefits = [
  "Build stronger technical and strategic judgment",
  "Learn directly from experienced practitioners and leaders",
  "Develop a professional network across the quality community",
  "Discover opportunities to speak, write, volunteer, and contribute",
]

const managerEmail = `Subject: Request to attend Innovate QA 2027

Hi [Manager's name],

I would like to request approval to attend Innovate QA 2027, taking place ${eventDates} at ${event.venue.name} in Bellevue, Washington.

The conference brings together quality practitioners, engineering leaders, and technology experts to share practical experience in AI-assisted testing, automation, quality engineering, and leadership. I plan to focus on sessions that align with our current priorities and challenges.

The conference registration investment starts at ${money(pricing.tickets.earlyBird.price)}. Workshop Day is available for an additional ${money(pricing.workshop.price)}, and team discounts are available for groups of three or more. Travel and accommodation would be separate.

By attending, I expect to bring back:
- Practical ideas we can evaluate within our engineering and quality workflows
- Current perspectives on AI, automation, and modern quality practices
- Lessons from teams solving challenges similar to ours
- Useful industry connections and resources

After the event, I will share a concise summary with the team, including key takeaways, recommended actions, and relevant resources so the investment benefits more than one attendee.

Event details and ticket options are available at https://innovateqaevents.com/tickets/

Thank you for considering my request.

Best,
[Your name]`

export const metadata = generateSEO({
  title: "Convince Your Manager | Innovate QA 2027",
  description: "Make the business case for attending Innovate QA 2027 with clear costs, organizational value, career benefits, and a ready-to-use manager request.",
  canonical: "/convince-your-manager",
  keywords: ["Innovate QA 2027", "conference approval", "quality engineering conference", "manager request"],
})

export default function ConvinceYourManagerPage() {
  return (
    <>
      <BreadcrumbLD
        items={[
          { name: "Home", url: "/" },
          { name: "2027 Tickets", url: "/tickets" },
          { name: "Convince Your Manager", url: "/convince-your-manager" },
        ]}
      />

      <header className="relative overflow-hidden bg-slate-950 text-white">
        <div aria-hidden="true" className="absolute -left-24 top-10 size-80 rounded-full bg-purple-700/30 blur-3xl" />
        <div aria-hidden="true" className="absolute -right-20 bottom-0 size-72 rounded-full bg-fuchsia-600/20 blur-3xl" />
        <div className="container relative mx-auto max-w-6xl px-4 py-20 md:py-28">
          <p className="mb-5 text-sm font-bold uppercase tracking-[0.2em] text-purple-300">Manager approval guide</p>
          <h1 className="max-w-4xl text-4xl font-bold tracking-tight md:text-6xl">Make the case for Innovate QA 2027.</h1>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-slate-300 md:text-xl">
            Explain the investment, the value to your organization, and what you will bring back to your team—clearly and confidently.
          </p>
          <div className="mt-8 flex flex-col gap-3 text-sm text-slate-200 sm:flex-row sm:flex-wrap sm:gap-6">
            <span className="inline-flex items-center gap-2"><CalendarDays aria-hidden="true" className="size-5 text-purple-300" />{eventDates}</span>
            <span className="inline-flex items-center gap-2"><MapPin aria-hidden="true" className="size-5 text-purple-300" />{event.venue.name}, Bellevue</span>
          </div>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" className="min-h-11 bg-white text-slate-950 hover:bg-purple-50">
              <Link href="/tickets">View Ticket Options<ArrowRight aria-hidden="true" className="size-4" /></Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="min-h-11 border-white/40 bg-transparent text-white hover:bg-white/10 hover:text-white">
              <Link href="/events/2027">Explore the Event</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="bg-slate-50 text-slate-950">
        <section aria-labelledby="value-heading" className="container mx-auto max-w-6xl px-4 py-16 md:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-bold uppercase tracking-wider text-purple-800">Why attend</p>
            <h2 id="value-heading" className="mt-3 text-3xl font-bold tracking-tight md:text-5xl">An investment that returns to the team</h2>
            <p className="mt-5 text-lg leading-relaxed text-slate-600">Innovate QA is designed to turn three days of learning and connection into ideas your organization can evaluate and apply.</p>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {businessBenefits.map(({ title, description, icon: Icon }) => (
              <article key={title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-7">
                <div className="flex size-12 items-center justify-center rounded-xl bg-purple-100 text-purple-800"><Icon aria-hidden="true" className="size-6" /></div>
                <h3 className="mt-5 text-xl font-bold">{title}</h3>
                <p className="mt-3 leading-relaxed text-slate-600">{description}</p>
              </article>
            ))}
          </div>
        </section>

        <section aria-labelledby="investment-heading" className="border-y border-purple-100 bg-white">
          <div className="container mx-auto grid max-w-6xl gap-10 px-4 py-16 md:py-24 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div>
              <p className="text-sm font-bold uppercase tracking-wider text-purple-800">The investment</p>
              <h2 id="investment-heading" className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">Make the cost clear—and connect it to the return.</h2>
              <p className="mt-5 leading-relaxed text-slate-600">Registration covers the selected conference experience. Travel, accommodation, and time away from regular work should be planned separately.</p>
              <p className="mt-5 rounded-xl border border-purple-200 bg-purple-50 p-4 text-sm leading-relaxed text-purple-950"><strong>The commitment:</strong> attend relevant sessions, capture actionable takeaways, and share a concise post-event summary with the wider team.</p>
            </div>
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
              <div className="flex items-center gap-3 border-b border-slate-200 bg-slate-950 px-6 py-5 text-white">
                <CircleDollarSign aria-hidden="true" className="size-6 text-purple-300" />
                <h3 className="text-xl font-bold">2027 registration options</h3>
              </div>
              <dl className="divide-y divide-slate-200">
                <div className="flex items-center justify-between gap-4 px-6 py-5"><dt><span className="block font-semibold">Early Bird</span><span className="text-sm text-slate-600">Two-day conference</span></dt><dd className="text-xl font-bold">{money(pricing.tickets.earlyBird.price)}</dd></div>
                <div className="flex items-center justify-between gap-4 px-6 py-5"><dt><span className="block font-semibold">Standard</span><span className="text-sm text-slate-600">General admission</span></dt><dd className="text-xl font-bold">{money(pricing.tickets.standard.price)}</dd></div>
                <div className="flex items-center justify-between gap-4 px-6 py-5"><dt><span className="block font-semibold">Workshop Day</span><span className="text-sm text-slate-600">Standalone or conference add-on</span></dt><dd className="text-xl font-bold">{money(pricing.workshop.price)}</dd></div>
                <div className="flex items-center justify-between gap-4 px-6 py-5"><dt><span className="block font-semibold">Team registration</span><span className="text-sm text-slate-600">For three or more attendees</span></dt><dd className="text-right font-bold text-purple-800">Save 10–20%</dd></div>
              </dl>
              <div className="border-t border-slate-200 bg-white px-6 py-4 text-xs text-slate-500">Prices shown in USD. Current pricing and availability are always confirmed on the Tickets page.</div>
            </div>
          </div>
        </section>

        <section className="container mx-auto grid max-w-6xl gap-8 px-4 py-16 md:py-24 lg:grid-cols-2">
          <article className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm md:p-9">
            <div className="flex size-12 items-center justify-center rounded-xl bg-purple-100 text-purple-800"><BriefcaseBusiness aria-hidden="true" className="size-6" /></div>
            <h2 className="mt-5 text-2xl font-bold">What your organization receives</h2>
            <ul className="mt-6 space-y-4 text-slate-700">
              {["Actionable ideas connected to current engineering challenges", "Current perspectives on AI, automation, and quality strategy", "Examples from practitioners working through similar problems", "A post-event summary with takeaways and recommended next steps"].map((item) => <li key={item} className="flex gap-3"><CheckCircle2 aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-purple-700" /><span>{item}</span></li>)}
            </ul>
          </article>
          <article className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm md:p-9">
            <div className="flex size-12 items-center justify-center rounded-xl bg-purple-100 text-purple-800"><Network aria-hidden="true" className="size-6" /></div>
            <h2 className="mt-5 text-2xl font-bold">How it supports career growth</h2>
            <ul className="mt-6 space-y-4 text-slate-700">
              {careerBenefits.map((item) => <li key={item} className="flex gap-3"><CheckCircle2 aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-purple-700" /><span>{item}</span></li>)}
            </ul>
          </article>
        </section>

        <section aria-labelledby="takeaways-heading" className="bg-purple-950 text-white">
          <div className="container mx-auto max-w-6xl px-4 py-16 md:py-20">
            <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:items-center">
              <div>
                <Presentation aria-hidden="true" className="size-9 text-purple-300" />
                <h2 id="takeaways-heading" className="mt-5 text-3xl font-bold md:text-4xl">Turn attendance into shared value.</h2>
                <p className="mt-4 leading-relaxed text-purple-100">A simple follow-through plan makes the organizational return visible.</p>
              </div>
              <ol className="grid gap-4 sm:grid-cols-3">
                {[{ step: "01", title: "Choose", text: "Prioritize sessions connected to team goals." }, { step: "02", title: "Capture", text: "Document useful ideas, examples, and contacts." }, { step: "03", title: "Share", text: "Present takeaways and recommended actions afterward." }].map((item) => (
                  <li key={item.step} className="rounded-2xl border border-white/15 bg-white/10 p-5">
                    <span className="text-sm font-bold text-purple-300">{item.step}</span>
                    <h3 className="mt-3 text-xl font-bold">{item.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-purple-100">{item.text}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        <section aria-labelledby="email-heading" className="container mx-auto max-w-5xl px-4 py-16 md:py-24">
          <div className="mx-auto mb-9 max-w-3xl text-center">
            <p className="text-sm font-bold uppercase tracking-wider text-purple-800">Ask for approval</p>
            <h2 id="email-heading" className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">Start with a clear, practical request.</h2>
            <p className="mt-4 text-slate-600">Copy this message, update the placeholders and details for your role and priorities, and send it to your manager.</p>
          </div>
          <ManagerApprovalEmail email={managerEmail} />
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button asChild size="lg" className="min-h-11 bg-purple-800 text-white hover:bg-purple-900">
              <Link href="/tickets">Review Tickets<ArrowRight aria-hidden="true" className="size-4" /></Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="min-h-11 border-slate-400">
              <Link href="/contact">Questions? Contact Us</Link>
            </Button>
          </div>
        </section>
      </main>
    </>
  )
}
