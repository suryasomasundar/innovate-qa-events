"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowLeft, ArrowRight, CalendarDays, Check, MapPin, Sparkles, Ticket, Users } from "lucide-react"
import event from "@/data/events/2027.json"
import { Button } from "@/components/ui/button"
import {
  calculateTicketOrder,
  formatTicketMoney,
  formatTicketEventDates,
  getQuantityError,
  isEarlyBirdAvailable,
  isTicketType,
  type TicketType,
} from "@/lib/ticket-pricing"

const { pricing } = event
const money = (amount: number) => formatTicketMoney(amount, pricing)
const focusStyle = "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-purple-700"

function dateLabel(value: string, options: Intl.DateTimeFormatOptions) {
  return new Intl.DateTimeFormat("en-US", { ...options, timeZone: pricing.timeZone })
    .format(new Date(`${value}T12:00:00Z`))
}

const eventDates = formatTicketEventDates(event.date.start, event.date.end, pricing.timeZone)
const eventDays = (Date.parse(event.date.end) - Date.parse(event.date.start)) / 86_400_000 + 1
const deadlineLabel = new Intl.DateTimeFormat("en-US", {
  month: "long", day: "numeric", timeZone: pricing.timeZone,
}).format(new Date(pricing.earlyBirdDeadline))

// Static exports must recheck the cutoff in the browser, not only at build time.
function useTicketClock() {
  const [now, setNow] = useState<number | null>(null)
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>
    const update = () => {
      const current = Date.now()
      setNow(current)
      clearTimeout(timer)
      const remaining = Date.parse(pricing.earlyBirdDeadline) - current
      timer = setTimeout(update, remaining > 0 ? Math.min(remaining, 60_000) : 60_000)
    }
    update()
    window.addEventListener("focus", update)
    return () => {
      clearTimeout(timer)
      window.removeEventListener("focus", update)
    }
  }, [])
  return now
}

function EventDetails() {
  return (
    <div className="mt-5 flex flex-wrap justify-center gap-x-6 gap-y-3 text-sm text-slate-600">
      <span className="inline-flex items-center gap-2"><CalendarDays aria-hidden="true" className="size-4" />{eventDates} &middot; {eventDays} days</span>
      <span className="inline-flex items-center gap-2"><MapPin aria-hidden="true" className="size-4" />{event.venue.name}</span>
    </div>
  )
}

export function TicketSales() {
  const now = useTicketClock()
  const earlyBird = now !== null && isEarlyBirdAvailable(pricing, now)
  const types: TicketType[] = earlyBird ? ["earlyBird", "standard", "vip"] : ["standard", "vip"]
  return (
    <div className="bg-slate-50 text-slate-950">
      <div className="container mx-auto max-w-6xl px-4 py-14 md:py-20">
        <header className="ticket-hero mb-12 rounded-3xl border border-purple-100 px-5 py-12 text-center md:px-10 md:py-16">
          <div aria-hidden="true" className="ticket-hero-art">
            <span className="ticket-hero-glow ticket-hero-glow-left" />
            <span className="ticket-hero-glow ticket-hero-glow-right" />
            <Ticket className="ticket-hero-accent ticket-hero-accent-left" />
            <Sparkles className="ticket-hero-accent ticket-hero-accent-right" />
          </div>
          <div className="relative z-10 mx-auto max-w-3xl">
            <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-purple-800">Learn. Connect. Elevate.</p>
            <h1 className="text-3xl font-bold tracking-tight md:text-5xl">Choose Your {event.name} Experience</h1>
            <EventDetails />
            <p className="mt-6 text-slate-600">Two days of quality engineering insights. An extra day to put them into practice.</p>
            <p className="mt-4 text-sm font-medium text-purple-800">Payments coming soon. Explore tickets and plan your order.</p>
          </div>
        </header>

        <section aria-label="Conference tickets" className={`grid gap-6 ${earlyBird ? "md:grid-cols-3" : "mx-auto max-w-4xl md:grid-cols-2"}`}>
          {types.map((type) => {
            const ticket = pricing.tickets[type]
            const featured = type === "earlyBird"
            return (
              <article key={type} className={`relative flex flex-col rounded-2xl border-2 bg-white p-6 md:p-8 ${featured ? "border-purple-700 shadow-xl shadow-purple-900/10" : "border-slate-200"}`}>
                {featured && <p className="mb-5 inline-flex items-center gap-2 self-start rounded-full bg-purple-100 px-3 py-1 text-xs font-bold text-purple-900"><Sparkles aria-hidden="true" className="size-3" />Early Bird offer</p>}
                <h2 className="text-xl font-bold">{ticket.name}</h2>
                <p className="mt-5 text-5xl font-bold tracking-tight">{money(ticket.price)}</p>
                <p className="mt-2 text-sm text-slate-600">{pricing.currency} per person</p>
                <p className="mt-5 font-medium">{featured ? `Before ${deadlineLabel}` : ticket.description}</p>
                <ul className="my-6 flex-1 space-y-3 text-sm text-slate-600">
                  {ticket.features.map((feature) => <li key={feature} className="flex gap-2"><Check aria-hidden="true" className="size-4 shrink-0 text-purple-800" /><span>{feature}</span></li>)}
                </ul>
                <Button asChild size="lg" className={`min-h-11 ${focusStyle} ${featured ? "bg-purple-800 text-white hover:bg-purple-900" : "bg-slate-900 text-white hover:bg-slate-800"}`}>
                  <Link href={`/tickets/order?ticket=${type}`} aria-label={type === "vip" ? "Go Premium: select Premium / VIP" : `Get your ticket: select ${ticket.name}`}>
                    {type === "vip" ? "Go Premium" : "Get Your Ticket"}<ArrowRight aria-hidden="true" className="size-4" />
                  </Link>
                </Button>
              </article>
            )
          })}
        </section>

        <section aria-labelledby="workshop-heading" className="mt-8 flex flex-col gap-6 rounded-2xl border border-purple-200 bg-purple-50 p-6 md:flex-row md:items-center md:justify-between md:p-8">
          <div className="max-w-2xl">
            <p className="mb-2 text-sm font-semibold text-purple-900">{dateLabel(pricing.workshop.date, { month: "long", day: "numeric" })} &middot; Optional add-on</p>
            <h2 id="workshop-heading" className="text-2xl font-bold">Add the Workshop Day</h2>
            <p className="mt-3 text-slate-700">{pricing.workshop.description}</p>
          </div>
          <div className="shrink-0">
            <p className="mb-3 text-2xl font-bold">+{money(pricing.workshop.price)} <span className="text-sm font-normal text-slate-600">per person</span></p>
            <Button asChild variant="outline" className={`min-h-11 border-purple-800 bg-white text-purple-900 ${focusStyle}`}>
              <Link href="/tickets/order?workshop=true">Add Workshop Day<ArrowRight aria-hidden="true" className="size-4" /></Link>
            </Button>
          </div>
        </section>

        <section aria-labelledby="team-heading" className="mx-auto mt-16 max-w-4xl text-center">
          <Users aria-hidden="true" className="mx-auto mb-4 size-6 text-slate-600" />
          <h2 id="team-heading" className="text-2xl font-bold">Bringing Your Team? Save More.</h2>
          <p className="mt-3 text-slate-600">Team rates apply to Standard admission. Not combined with Early Bird or VIP pricing.</p>
          <div className="mt-7 grid gap-4 sm:grid-cols-3">
            {pricing.groupTiers.map((tier) => (
              <div key={tier.min} className="rounded-xl border border-slate-200 bg-white p-5">
                <h3 className="font-semibold">{tier.max === null ? `${tier.min}+` : `${tier.min}-${tier.max}`} people</h3>
                <p className="mt-3 text-3xl font-bold">{money(tier.price)}</p>
                <p className="mt-1 text-sm text-slate-600">per person</p>
                <p className="mt-3 text-sm font-semibold text-purple-800">Save {tier.savingsPercent}%</p>
              </div>
            ))}
          </div>
          <Button asChild variant="outline" size="lg" className={`mt-7 min-h-11 border-slate-500 ${focusStyle}`}>
            <Link href={`/tickets/order?ticket=standard&quantity=${pricing.groupTiers[0].min}`}>Register a Team<ArrowRight aria-hidden="true" className="size-4" /></Link>
          </Button>
          <p className="mt-4 text-xs text-slate-600">All prices in {pricing.currency}. Workshop add-ons are priced separately per attendee.</p>
        </section>
      </div>
    </div>
  )
}

export function TicketOrder() {
  const now = useTicketClock()
  const [ticket, setTicket] = useState<TicketType>("standard")
  const [quantity, setQuantity] = useState("1")
  const [workshop, setWorkshop] = useState(false)
  const [notice, setNotice] = useState("")
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const requested = params.get("ticket")
    const messages: string[] = []
    if (requested !== null) {
      if (!isTicketType(requested)) {
        messages.push("That ticket type is not recognized. Please choose a ticket below.")
      } else if (requested === "earlyBird" && !isEarlyBirdAvailable(pricing, Date.now())) {
        messages.push("Early Bird has ended. Standard admission is selected; please review your order.")
      } else {
        setTicket(requested)
      }
    } else if (isEarlyBirdAvailable(pricing, Date.now())) {
      setTicket("earlyBird")
    }
    const count = params.get("quantity")
    if (count !== null) setQuantity(count)
    const addWorkshop = params.get("workshop")
    if (addWorkshop !== null && addWorkshop !== "true" && addWorkshop !== "false") {
      messages.push("The workshop option is not recognized. Please choose whether to add workshops below.")
    }
    setWorkshop(addWorkshop === "true")
    setNotice(messages.join(" "))
    setReady(true)
  }, [])

  const earlyBird = now !== null && isEarlyBirdAvailable(pricing, now)
  const expired = ticket === "earlyBird" && now !== null && !earlyBird
  const quantityError = getQuantityError(quantity)
  const totalTooLarge = !quantityError && !Number.isSafeInteger(
    Math.round((pricing.tickets[ticket].price + (workshop ? pricing.workshop.price : 0)) * 100) * Number(quantity),
  )
  const error = quantityError ?? (totalTooLarge ? "This order is too large. Enter a smaller attendee count." : null)
  const order = ready && now !== null && !error && !expired
    ? calculateTicketOrder(pricing, ticket, Number(quantity), workshop, now)
    : null
  const types: TicketType[] = earlyBird || expired ? ["earlyBird", "standard", "vip"] : ["standard", "vip"]

  return (
    <div className="min-h-[70vh] bg-slate-50 px-4 py-12 text-slate-950 md:py-16">
      <div className="mx-auto max-w-5xl">
        <Link href="/tickets" className={`inline-flex min-h-11 items-center gap-2 text-sm font-medium text-purple-900 underline underline-offset-4 ${focusStyle}`}><ArrowLeft aria-hidden="true" className="size-4" />Back to tickets</Link>
        <header className="mb-10 mt-5 text-center">
          <h1 className="text-3xl font-bold md:text-4xl">Plan Your {event.name} Order</h1>
          <EventDetails />
        </header>
        <div className="mb-8 rounded-xl border border-purple-200 bg-purple-50 p-5 text-purple-950">
          <h2 className="font-bold">Payments coming soon</h2>
          <p className="mt-2 text-sm">This is an order preview only. No payment is collected and no tickets are reserved. You do not need to enter personal information.</p>
        </div>
        {!ready || now === null ? <p role="status">Loading ticket options...</p> : (
          <>
            {notice && <p role="status" className="mb-6 rounded-lg border border-amber-700 bg-amber-50 p-4 text-amber-950">{notice}</p>}
            {expired && <p role="alert" className="mb-6 rounded-lg border border-amber-700 bg-amber-50 p-4 text-amber-950">Early Bird has ended. Choose Standard or Premium / VIP to see a new total.</p>}
            <div className="grid items-start gap-8 md:grid-cols-[1.2fr_1fr]">
              <section aria-labelledby="selection-heading" className="rounded-2xl border border-slate-200 bg-white p-6 md:p-8">
                <h2 id="selection-heading" className="mb-6 text-xl font-bold">Your experience</h2>
                <fieldset>
                  <legend className="mb-3 font-semibold">Conference ticket</legend>
                  <div className="space-y-3">
                    {types.map((type) => (
                      <label key={type} className={`flex min-h-14 cursor-pointer items-start gap-3 rounded-xl border p-4 ${ticket === type ? "border-purple-800 bg-purple-50" : "border-slate-400"}`}>
                        <input type="radio" name="ticket" value={type} checked={ticket === type} disabled={type === "earlyBird" && !earlyBird} onChange={() => setTicket(type)} className={`mt-1 size-4 shrink-0 accent-purple-800 ${focusStyle}`} />
                        <span className="min-w-0 flex-1"><span className="block font-semibold">{pricing.tickets[type].name}{type === "earlyBird" && !earlyBird ? " (expired)" : ""}</span><span className="text-sm text-slate-600">{pricing.tickets[type].description}</span></span>
                        <span className="font-semibold">{money(pricing.tickets[type].price)}</span>
                      </label>
                    ))}
                  </div>
                </fieldset>
                <div className="mt-7">
                  <label htmlFor="attendee-count" className="block font-semibold">Number of attendees</label>
                  <input id="attendee-count" type="number" min="1" step="1" required value={quantity} onChange={(e) => setQuantity(e.target.value)} aria-invalid={!!error} aria-describedby={`quantity-help${error ? " quantity-error" : ""}`} className={`mt-3 min-h-11 w-full rounded-lg border border-slate-500 bg-white p-3 ${focusStyle}`} />
                  <p id="quantity-help" className="mt-2 text-sm text-slate-600">Standard team rates apply automatically for {pricing.groupTiers[0].min}+ attendees. All attendees receive the same ticket and add-on.</p>
                  {error && <p id="quantity-error" role="alert" className="mt-2 text-sm font-medium text-red-800">{error}</p>}
                </div>
                <label className="mt-7 flex cursor-pointer items-start gap-3 rounded-xl border border-slate-400 p-4">
                  <input type="checkbox" checked={workshop} onChange={(e) => setWorkshop(e.target.checked)} className={`mt-1 size-4 shrink-0 accent-purple-800 ${focusStyle}`} />
                  <span><span className="block font-semibold">Add {pricing.workshop.name}</span><span className="text-sm text-slate-600">{dateLabel(pricing.workshop.date, { month: "long", day: "numeric" })} &middot; +{money(pricing.workshop.price)} per attendee</span></span>
                </label>
              </section>
              <section aria-labelledby="summary-heading" className="rounded-2xl border border-slate-200 bg-white p-6 md:p-8">
                <h2 id="summary-heading" className="text-xl font-bold">Order summary</h2>
                <div aria-live="polite" aria-atomic="true">
                  {order ? (
                    <>
                      <dl className="mt-6 space-y-5 text-sm">
                        <div className="flex justify-between gap-4"><dt>{quantity} &times; {pricing.tickets[ticket].name}<span className="mt-1 block text-slate-600">{money(order.unitPrice)} per attendee</span></dt><dd className="shrink-0 font-semibold">{money(order.conferenceCents / 100)}</dd></div>
                        {order.groupTier && <div className="rounded-lg bg-purple-50 p-3 text-purple-900"><dt className="font-semibold">Team rate applied: save {order.groupTier.savingsPercent}%</dt><dd>On Standard conference admission</dd></div>}
                        {workshop && <div className="flex justify-between gap-4"><dt>{quantity} &times; {pricing.workshop.name}<span className="mt-1 block text-slate-600">{money(pricing.workshop.price)} per attendee</span></dt><dd className="shrink-0 font-semibold">{money(order.workshopCents / 100)}</dd></div>}
                        <div className="flex flex-wrap justify-between gap-3 border-t border-slate-200 pt-5 text-lg font-bold"><dt>Estimated total</dt><dd>{money(order.totalCents / 100)} {pricing.currency}</dd></div>
                      </dl>
                      <p className="mt-4 text-xs text-slate-600">Ticket and add-on subtotal only. Any applicable taxes or payment fees will be shown when checkout becomes available.</p>
                    </>
                  ) : <p className="mt-6 text-sm text-slate-600">Review your selection to calculate an order total.</p>}
                </div>
                <Button disabled className="mt-7 min-h-11 w-full bg-slate-900 text-white disabled:opacity-100">Checkout coming soon</Button>
                <p className="mt-4 text-sm text-slate-600">No purchase or reservation has been made.</p>
                <Link href="/contact" className={`mt-5 inline-flex min-h-11 items-center text-sm font-medium text-purple-900 underline underline-offset-4 ${focusStyle}`}>Questions about tickets? Contact us</Link>
              </section>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
