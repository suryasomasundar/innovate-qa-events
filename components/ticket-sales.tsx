"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowLeft, ArrowRight, CalendarDays, Check, Clock3, LibraryBig, MapPin, PlayCircle, Sparkles, Ticket, Users } from "lucide-react"
import event from "@/data/events/2027.json"
import stripeTest from "@/data/stripe-test-links.json"
import { Button } from "@/components/ui/button"
import {
  calculateTicketOrder,
  formatTicketMoney,
  formatTicketEventDates,
  getQuantityError,
  isAdmissionType,
  isEarlyBirdAvailable,
  type AdmissionType,
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

type StripeTestLinkKey = keyof typeof stripeTest.links

function getStripeTestCheckoutLink(admission: AdmissionType, quantity: number, workshop: boolean) {
  let key: StripeTestLinkKey
  if (admission === "workshopOnly") {
    key = "workshopOnly"
  } else if (admission === "earlyBird") {
    key = workshop ? "earlyBirdWorkshop" : "earlyBird"
  } else if (admission === "vip") {
    key = workshop ? "vipWorkshop" : "vip"
  } else {
    const tier = quantity >= 10 ? "standard10" : quantity >= 5 ? "standard5" : quantity >= 3 ? "standard3" : "standard"
    key = `${tier}${workshop ? "Workshop" : ""}` as StripeTestLinkKey
  }
  return stripeTest.links[key]
}

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
            <p className="mx-auto mb-5 w-fit rounded-full border border-amber-300 bg-amber-100 px-4 py-2 text-xs font-bold uppercase tracking-wider text-amber-950">
              Stripe test mode — no real payments
            </p>
            <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-purple-800">Learn. Connect. Elevate.</p>
            <h1 className="text-3xl font-bold tracking-tight md:text-5xl">Choose Your {event.name} Experience</h1>
            <EventDetails />
            <p className="mt-6 text-slate-600">Two days of quality engineering insights. An extra day to put them into practice.</p>
            <p className="mt-4 text-sm font-medium text-purple-800">Temporary Stripe test checkout is available for QA. No real payments or tickets.</p>
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
            <p className="mb-2 text-sm font-semibold text-purple-900">{dateLabel(pricing.workshop.date, { month: "long", day: "numeric" })} &middot; Available standalone or as an add-on</p>
            <h2 id="workshop-heading" className="text-2xl font-bold">Workshop Day Pass</h2>
            <p className="mt-3 text-slate-700">{pricing.workshop.description}</p>
          </div>
          <div className="shrink-0">
            <p className="mb-3 text-2xl font-bold">{money(pricing.workshop.price)} <span className="text-sm font-normal text-slate-600">per person</span></p>
            <div className="flex flex-col gap-3 sm:flex-row md:flex-col">
              <Button asChild className={`min-h-11 bg-purple-800 text-white hover:bg-purple-900 ${focusStyle}`}>
                <Link href="/tickets/order?workshop=true">Add to Conference Ticket<ArrowRight aria-hidden="true" className="size-4" /></Link>
              </Button>
              <Button asChild variant="outline" className={`min-h-11 border-purple-800 bg-white text-purple-900 ${focusStyle}`}>
                <Link href="/tickets/order?ticket=workshopOnly">Buy Workshop Pass Only<ArrowRight aria-hidden="true" className="size-4" /></Link>
              </Button>
            </div>
          </div>
        </section>

        <section aria-labelledby="team-heading" className="mx-auto mt-16 max-w-4xl text-center">
          <Users aria-hidden="true" className="mx-auto mb-4 size-6 text-slate-600" />
          <h2 id="team-heading" className="text-2xl font-bold">Bringing Your Team? Save More.</h2>
          <p className="mt-3 text-slate-600">Team rates apply to the full Standard order, including Workshop Day add-ons. Not combined with Early Bird or VIP pricing.</p>
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
          <p className="mt-4 text-xs text-slate-600">All prices in {pricing.currency}. Every attendee in a team order receives the same ticket and add-on.</p>
        </section>

        <section aria-labelledby="virtual-pass-heading" className="relative mt-16 overflow-hidden rounded-3xl bg-slate-950 px-6 py-8 text-white shadow-xl shadow-purple-950/10 md:px-10 md:py-10">
          <div aria-hidden="true" className="absolute -right-16 -top-24 size-72 rounded-full bg-fuchsia-600/25 blur-3xl" />
          <div aria-hidden="true" className="absolute -bottom-32 left-1/3 size-72 rounded-full bg-purple-600/20 blur-3xl" />
          <div className="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div className="max-w-3xl">
              <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-purple-300/30 bg-purple-400/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-purple-100">
                <PlayCircle aria-hidden="true" className="size-4" /> Can&apos;t attend in person?
              </p>
              <h2 id="virtual-pass-heading" className="text-3xl font-bold tracking-tight md:text-4xl">Take the full Innovate QA learning experience with you.</h2>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-300">Get on-demand access to the recorded conference sessions and workshops after the event—built for teams and professionals who want the learning, wherever they are.</p>
              <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3 text-sm font-medium text-slate-200">
                <span className="inline-flex items-center gap-2"><LibraryBig aria-hidden="true" className="size-4 text-purple-300" />Conference + workshop recordings</span>
                <span className="inline-flex items-center gap-2"><Clock3 aria-hidden="true" className="size-4 text-purple-300" />On demand after the event</span>
              </div>
            </div>
            <div className="min-w-56 rounded-2xl border border-white/15 bg-white/10 p-6 backdrop-blur-sm lg:text-center">
              <p className="text-sm font-semibold uppercase tracking-wider text-purple-200">Virtual Pass</p>
              <p className="mt-2 text-5xl font-bold tracking-tight">{money(pricing.virtualPass.price)}</p>
              <p className="mt-1 text-sm text-slate-300">one complete library</p>
              <Button asChild size="lg" className={`mt-5 min-h-11 w-full bg-white text-slate-950 hover:bg-purple-50 ${focusStyle}`}>
                <Link href="/#newsletter">Get Virtual Pass Updates<ArrowRight aria-hidden="true" className="size-4" /></Link>
              </Button>
              <p className="mt-3 text-xs text-slate-400">Post-event recordings · Not a livestream</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export function TicketOrder() {
  const now = useTicketClock()
  const [admission, setAdmission] = useState<AdmissionType>("standard")
  const [quantity, setQuantity] = useState("1")
  const [workshop, setWorkshop] = useState(false)
  const [notice, setNotice] = useState("")
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const requested = params.get("ticket")
    const messages: string[] = []
    if (requested !== null) {
      if (!isAdmissionType(requested)) {
        messages.push("That admission type is not recognized. Please choose an option below.")
      } else if (requested === "earlyBird" && !isEarlyBirdAvailable(pricing, Date.now())) {
        messages.push("Early Bird has ended. Standard admission is selected; please review your order.")
      } else {
        setAdmission(requested)
      }
    } else if (isEarlyBirdAvailable(pricing, Date.now())) {
      setAdmission("earlyBird")
    }
    const count = params.get("quantity")
    if (count !== null) setQuantity(count)
    const addWorkshop = params.get("workshop")
    if (addWorkshop !== null && addWorkshop !== "true" && addWorkshop !== "false") {
      messages.push("The workshop option is not recognized. Please choose whether to add workshops below.")
    }
    setWorkshop(requested === "workshopOnly" ? false : addWorkshop === "true")
    const checkout = params.get("checkout")
    if (checkout === "success") {
      messages.push("Stripe test checkout completed. No real payment was collected and no ticket was issued.")
    } else if (checkout === "cancelled") {
      messages.push("Stripe test checkout was cancelled. You can adjust the order and try again.")
    }
    if (checkout !== null) {
      params.delete("checkout")
      const query = params.toString()
      window.history.replaceState({}, "", `${window.location.pathname}${query ? `?${query}` : ""}${window.location.hash}`)
    }
    setNotice(messages.join(" "))
    setReady(true)
  }, [])

  const earlyBird = now !== null && isEarlyBirdAvailable(pricing, now)
  const workshopOnly = admission === "workshopOnly"
  const expired = admission === "earlyBird" && now !== null && !earlyBird
  const quantityError = getQuantityError(quantity)
  const admissionPrice = workshopOnly ? pricing.workshop.price : pricing.tickets[admission].price
  const totalTooLarge = !quantityError && !Number.isSafeInteger(
    Math.round((admissionPrice + (!workshopOnly && workshop ? pricing.workshop.price : 0)) * 100) * Number(quantity),
  )
  const error = quantityError ?? (totalTooLarge ? "This order is too large. Enter a smaller attendee count." : null)
  const order = ready && now !== null && !error && !expired
    ? calculateTicketOrder(pricing, admission, Number(quantity), workshop, now)
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
          <h2 className="font-bold">Temporary Stripe test checkout</h2>
          <p className="mt-2 text-sm">This sandbox is for QA only. Use card 4242 4242 4242 4242, any future expiration date, and any three-digit CVC. No real payment is collected and no ticket is issued.</p>
        </div>
        {!ready || now === null ? <p role="status">Loading ticket options...</p> : (
          <>
            {notice && <p role="status" className="mb-6 rounded-lg border border-amber-700 bg-amber-50 p-4 text-amber-950">{notice}</p>}
            {expired && <p role="alert" className="mb-6 rounded-lg border border-amber-700 bg-amber-50 p-4 text-amber-950">Early Bird has ended. Choose Standard or Premium / VIP to see a new total.</p>}
            <div className="grid items-start gap-8 md:grid-cols-[1.2fr_1fr]">
              <section aria-labelledby="selection-heading" className="rounded-2xl border border-slate-200 bg-white p-6 md:p-8">
                <h2 id="selection-heading" className="mb-6 text-xl font-bold">Your experience</h2>
                <fieldset>
                  <legend className="mb-3 font-semibold">Choose your admission</legend>
                  <div className="space-y-3">
                    {types.map((type) => (
                      <label key={type} className={`flex min-h-14 cursor-pointer items-start gap-3 rounded-xl border p-4 ${admission === type ? "border-purple-800 bg-purple-50" : "border-slate-400"}`}>
                        <input type="radio" name="admission" value={type} checked={admission === type} disabled={type === "earlyBird" && !earlyBird} onChange={() => setAdmission(type)} className={`mt-1 size-4 shrink-0 accent-purple-800 ${focusStyle}`} />
                        <span className="min-w-0 flex-1"><span className="block font-semibold">{pricing.tickets[type].name}{type === "earlyBird" && !earlyBird ? " (expired)" : ""}</span><span className="text-sm text-slate-600">{pricing.tickets[type].description}</span></span>
                        <span className="font-semibold">{money(pricing.tickets[type].price)}</span>
                      </label>
                    ))}
                    <label className={`flex min-h-14 cursor-pointer items-start gap-3 rounded-xl border p-4 ${workshopOnly ? "border-purple-800 bg-purple-50" : "border-slate-400"}`}>
                      <input type="radio" name="admission" value="workshopOnly" checked={workshopOnly} onChange={() => { setAdmission("workshopOnly"); setWorkshop(false) }} className={`mt-1 size-4 shrink-0 accent-purple-800 ${focusStyle}`} />
                      <span className="min-w-0 flex-1"><span className="block font-semibold">Workshop Day Pass Only</span><span className="text-sm text-slate-600">{dateLabel(pricing.workshop.date, { month: "long", day: "numeric" })} &middot; No conference ticket required</span></span>
                      <span className="font-semibold">{money(pricing.workshop.price)}</span>
                    </label>
                  </div>
                </fieldset>
                <div className="mt-7">
                  <label htmlFor="attendee-count" className="block font-semibold">Number of attendees</label>
                  <input id="attendee-count" type="number" min="1" step="1" required value={quantity} onChange={(e) => setQuantity(e.target.value)} aria-invalid={!!error} aria-describedby={`quantity-help${error ? " quantity-error" : ""}`} className={`mt-3 min-h-11 w-full rounded-lg border border-slate-500 bg-white p-3 ${focusStyle}`} />
                  <p id="quantity-help" className="mt-2 text-sm text-slate-600">{workshopOnly ? "Each attendee receives one Workshop Day Pass." : `Standard team rates apply automatically for ${pricing.groupTiers[0].min}+ attendees. All attendees receive the same ticket and add-on.`}</p>
                  {error && <p id="quantity-error" role="alert" className="mt-2 text-sm font-medium text-red-800">{error}</p>}
                </div>
                {!workshopOnly && (
                  <label className="mt-7 flex cursor-pointer items-start gap-3 rounded-xl border border-slate-400 p-4">
                    <input type="checkbox" checked={workshop} onChange={(e) => setWorkshop(e.target.checked)} className={`mt-1 size-4 shrink-0 accent-purple-800 ${focusStyle}`} />
                    <span><span className="block font-semibold">Add {pricing.workshop.name}</span><span className="text-sm text-slate-600">{dateLabel(pricing.workshop.date, { month: "long", day: "numeric" })} &middot; +{money(pricing.workshop.price)} per attendee</span></span>
                  </label>
                )}
              </section>
              <section aria-labelledby="summary-heading" className="rounded-2xl border border-slate-200 bg-white p-6 md:p-8">
                <h2 id="summary-heading" className="text-xl font-bold">Order summary</h2>
                <div aria-live="polite" aria-atomic="true">
                  {order ? (
                    <>
                      <dl className="mt-6 space-y-5 text-sm">
                        {!workshopOnly && <div className="flex justify-between gap-4"><dt>{quantity} &times; {pricing.tickets[admission].name}<span className="mt-1 block text-slate-600">{money(order.unitPrice)} per attendee</span></dt><dd className="shrink-0 font-semibold">{money(order.conferenceCents / 100)}</dd></div>}
                        {order.groupTier && <div className="rounded-lg bg-purple-50 p-3 text-purple-900"><dt className="font-semibold">Team rate applied: save {order.groupTier.savingsPercent}%</dt><dd>On Standard admission and Workshop Day add-ons</dd></div>}
                        {(workshopOnly || workshop) && <div className="flex justify-between gap-4"><dt>{quantity} &times; {workshopOnly ? "Workshop Day Pass" : pricing.workshop.name}<span className="mt-1 block text-slate-600">{money(order.workshopUnitPrice)} per attendee</span></dt><dd className="shrink-0 font-semibold">{money(order.workshopCents / 100)}</dd></div>}
                        <div className="flex flex-wrap justify-between gap-3 border-t border-slate-200 pt-5 text-lg font-bold"><dt>Estimated total</dt><dd>{money(order.totalCents / 100)} {pricing.currency}</dd></div>
                      </dl>
                      <p className="mt-4 text-xs text-slate-600">Estimated subtotal only. Any applicable taxes or payment fees appear in Stripe Test Checkout.</p>
                    </>
                  ) : <p className="mt-6 text-sm text-slate-600">Review your selection to calculate an order total.</p>}
                </div>
                {order ? (
                  <Button asChild className="mt-7 min-h-11 w-full bg-purple-800 text-white hover:bg-purple-900">
                    <a href={getStripeTestCheckoutLink(admission, Number(quantity), workshop)} target="_blank" rel="noopener noreferrer">
                      Continue to Stripe Test Checkout
                    </a>
                  </Button>
                ) : (
                  <Button disabled className="mt-7 min-h-11 w-full bg-slate-900 text-white disabled:opacity-100">Review order to continue</Button>
                )}
                <p className="mt-4 text-sm text-slate-600">Stripe opens with the minimum quantity for the selected pricing tier. Confirm the attendee quantity—and workshop quantity when selected—before completing the test checkout.</p>
                <Link href="/contact" className={`mt-5 inline-flex min-h-11 items-center text-sm font-medium text-purple-900 underline underline-offset-4 ${focusStyle}`}>Questions about tickets? Contact us</Link>
              </section>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
