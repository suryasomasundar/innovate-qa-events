export type TicketType = "earlyBird" | "standard" | "vip"
export type AdmissionType = TicketType | "workshopOnly"

export type TicketPricing = {
  currency: string
  timeZone: string
  earlyBirdDeadline: string
  tickets: Record<TicketType, {
    name: string
    price: number
    description: string
    features: string[]
  }>
  workshop: { name: string; date: string; price: number; description: string }
  virtualPass: { name: string; price: number; description: string }
  groupTiers: { min: number; max: number | null; price: number; savingsPercent: number }[]
}

export function isTicketType(value: string | null): value is TicketType {
  return value === "earlyBird" || value === "standard" || value === "vip"
}

export function isAdmissionType(value: string | null): value is AdmissionType {
  return value === "workshopOnly" || isTicketType(value)
}

export function isEarlyBirdAvailable(pricing: TicketPricing, now: number) {
  return now < Date.parse(pricing.earlyBirdDeadline)
}

export function getQuantityError(value: string) {
  const quantity = Number(value)
  return !/^\d+$/.test(value) || !Number.isSafeInteger(quantity) || quantity < 1
    ? "Enter a whole number of attendees, at least 1."
    : null
}

export function calculateTicketOrder(
  pricing: TicketPricing,
  admission: AdmissionType,
  quantity: number,
  workshop: boolean,
  now: number,
) {
  if (!Number.isSafeInteger(quantity) || quantity < 1) {
    throw new RangeError("Attendee quantity must be a positive safe integer.")
  }
  if (admission === "earlyBird" && !isEarlyBirdAvailable(pricing, now)) {
    throw new RangeError("Early Bird tickets are no longer available.")
  }
  const workshopOnly = admission === "workshopOnly"
  const groupTier = admission === "standard"
    ? pricing.groupTiers.find((tier) => quantity >= tier.min && (tier.max === null || quantity <= tier.max))
    : undefined
  const unitPrice = workshopOnly ? pricing.workshop.price : groupTier?.price ?? pricing.tickets[admission].price
  const workshopUnitPrice = groupTier
    ? Math.round(pricing.workshop.price * (1 - groupTier.savingsPercent / 100) * 100) / 100
    : pricing.workshop.price
  const conferenceCents = workshopOnly ? 0 : Math.round(unitPrice * 100) * quantity
  const workshopCents = workshopOnly || workshop ? Math.round(workshopUnitPrice * 100) * quantity : 0
  const totalCents = conferenceCents + workshopCents
  if (!Number.isSafeInteger(totalCents)) {
    throw new RangeError("The order total exceeds the supported amount.")
  }
  return { unitPrice, workshopUnitPrice, conferenceCents, workshopCents, totalCents, groupTier, workshopOnly }
}

export function formatTicketMoney(amount: number, pricing: TicketPricing) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: pricing.currency,
    maximumFractionDigits: 2,
    minimumFractionDigits: Number.isInteger(amount) ? 0 : 2,
  }).format(amount)
}

export function formatTicketEventDates(start: string, end: string, timeZone: string) {
  const formatter = new Intl.DateTimeFormat("en-US", {
    month: "long", day: "numeric", year: "numeric", timeZone,
  })
  // Node and browsers use different ICU spacing around date-range separators.
  return formatter.formatRange(new Date(`${start}T12:00:00Z`), new Date(`${end}T12:00:00Z`))
    .replace(/\s+/g, " ")
    .replace(/\s*[\u2013\u2014-]\s*/g, "-")
}
