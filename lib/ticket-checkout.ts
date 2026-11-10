import type { AdmissionType } from "./ticket-pricing"

type CheckoutReadiness = {
  admission: AdmissionType
  quantity: number
  workshop: boolean
  earlyBird: boolean
  workshopPriceId: string | null
  checkoutApiUrl: string
}

export function getTicketCheckoutBlocker({
  admission,
  quantity,
  workshop,
  earlyBird,
  workshopPriceId,
  checkoutApiUrl,
}: CheckoutReadiness) {
  if ((admission === "workshopOnly" || workshop) && !workshopPriceId) {
    return "The 2027 Workshop Stripe Price ID is still required before this order can be purchased."
  }
  if (workshop && (admission === "earlyBird" || (admission === "vip" && earlyBird))) {
    return "Early Bird plus Workshop needs one server-validated combined discount before checkout can open."
  }
  if (quantity > 1 && (admission === "earlyBird" || (admission === "vip" && earlyBird))) {
    return "Fixed-dollar Stripe coupons apply once per order. Add dedicated per-ticket prices before selling this multi-attendee selection."
  }
  if (!checkoutApiUrl) {
    return "The secure ticket checkout service is not connected yet."
  }
  return null
}
