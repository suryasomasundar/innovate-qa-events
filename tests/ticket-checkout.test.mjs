import assert from "node:assert/strict"
import test from "node:test"
import { getTicketCheckoutBlocker } from "../lib/ticket-checkout.ts"

const ready = {
  admission: "standard",
  quantity: 1,
  workshop: false,
  earlyBird: true,
  workshopPriceId: "price_workshop",
  checkoutApiUrl: "https://checkout.example.test/tickets",
}

test("checkout is gated until its server endpoint is configured", () => {
  assert.match(getTicketCheckoutBlocker({ ...ready, checkoutApiUrl: "" }), /not connected/)
})

test("workshop selections are gated until the live Workshop Price ID exists", () => {
  assert.match(getTicketCheckoutBlocker({ ...ready, workshop: true, workshopPriceId: null }), /Workshop Stripe Price ID/)
  assert.match(getTicketCheckoutBlocker({ ...ready, admission: "workshopOnly", workshopPriceId: null }), /Workshop Stripe Price ID/)
})

test("fixed-dollar offers cannot silently under-discount multi-attendee orders", () => {
  assert.match(getTicketCheckoutBlocker({ ...ready, admission: "earlyBird", quantity: 2 }), /once per order/)
  assert.match(getTicketCheckoutBlocker({ ...ready, admission: "vip", quantity: 2 }), /once per order/)
  assert.equal(getTicketCheckoutBlocker({ ...ready, admission: "vip", quantity: 2, earlyBird: false, workshop: true }), null)
})

test("combined Early Bird and Workshop offers require one server-validated discount", () => {
  assert.match(getTicketCheckoutBlocker({ ...ready, admission: "earlyBird", workshop: true }), /combined discount/)
  assert.match(getTicketCheckoutBlocker({ ...ready, admission: "vip", workshop: true }), /combined discount/)
})

test("ready base, VIP, workshop-only, and percentage group selections can proceed", () => {
  assert.equal(getTicketCheckoutBlocker(ready), null)
  assert.equal(getTicketCheckoutBlocker({ ...ready, admission: "vip", earlyBird: false, quantity: 4 }), null)
  assert.equal(getTicketCheckoutBlocker({ ...ready, admission: "workshopOnly", quantity: 4 }), null)
  assert.equal(getTicketCheckoutBlocker({ ...ready, quantity: 5, workshop: true }), null)
})
