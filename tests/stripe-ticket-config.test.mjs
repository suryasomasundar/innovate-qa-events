import assert from "node:assert/strict"
import { readFileSync } from "node:fs"
import test from "node:test"

const stripe = JSON.parse(readFileSync(new URL("../data/stripe-live-ticket-config.json", import.meta.url), "utf8"))

test("live Stripe catalog contains the confirmed conference and VIP identifiers", () => {
  assert.equal(stripe.mode, "live")
  assert.equal(stripe.prices.conference, "price_1UUUR8GwHngAC1mfoGoZ7MVj")
  assert.equal(stripe.prices.vip, "price_1Ua4H0GwHngAC1mfWjRF8fSd")
})

test("private coupon identifiers are not shipped in the public browser catalog", () => {
  assert.equal("coupons" in stripe, false)
})

test("live Stripe catalog contains the confirmed 2027 Workshop identifier", () => {
  assert.equal(stripe.prices.workshop, "price_1Ua46EGwHngAC1mftYigQkE1")
})
