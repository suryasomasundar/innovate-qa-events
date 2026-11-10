import assert from "node:assert/strict"
import { readFileSync } from "node:fs"
import test from "node:test"
import {
  calculateTicketOrder,
  getQuantityError,
  isEarlyBirdAvailable,
  isTicketType,
  formatTicketMoney,
  formatTicketEventDates,
} from "../lib/ticket-pricing.ts"

const { pricing } = JSON.parse(readFileSync(new URL("../data/events/2027.json", import.meta.url), "utf8"))
const cutoff = Date.parse(pricing.earlyBirdDeadline)
const before = cutoff - 1

test("R1: configured 2027 prices match approved ticket products", () => {
  assert.deepEqual(Object.values(pricing.tickets).map((ticket) => ticket.price), [399, 499, 799])
  assert.equal(pricing.workshop.price, 299)
  assert.deepEqual(pricing.discounts, { vipEarlyBirdAmount: 200, workshopAdditionAmount: 50 })
  assert.equal(pricing.currency, "USD")
  assert.equal(formatTicketMoney(399, pricing), "$399")
  assert.equal(formatTicketMoney(269.1, pricing), "$269.10")
})

test("R2: Early Bird is removed at February 15 midnight Pacific, including stale orders", () => {
  assert.equal(cutoff, Date.parse("2027-02-15T08:00:00Z"))
  assert.equal(isEarlyBirdAvailable(pricing, before), true)
  assert.equal(isEarlyBirdAvailable(pricing, cutoff), false)
  assert.equal(isEarlyBirdAvailable(pricing, cutoff + 1), false)
  assert.equal(calculateTicketOrder(pricing, "earlyBird", 1, false, before).totalCents, 39900)
  assert.throws(() => calculateTicketOrder(pricing, "earlyBird", 1, false, cutoff), /no longer available/)
})

test("R3: Standard team rates change at exact quantity thresholds", () => {
  for (const [quantity, unitPrice] of [[1, 499], [2, 499], [3, 449.1], [4, 449.1], [5, 424.15], [9, 424.15], [10, 399.2], [25, 399.2]]) {
    const order = calculateTicketOrder(pricing, "standard", quantity, false, before)
    assert.equal(order.unitPrice, unitPrice, `${quantity} attendees`)
    assert.equal(order.totalCents, Math.round(unitPrice * 100) * quantity)
  }
})

test("R3: team savings apply to conference and Workshop receives one automatic order discount", () => {
  const teamOrder = calculateTicketOrder(pricing, "standard", 5, true, before)
  assert.equal(teamOrder.workshopUnitPrice, 299)
  assert.equal(teamOrder.workshopSubtotalCents, 149500)
  assert.equal(teamOrder.workshopDiscountCents, 5000)
  assert.equal(teamOrder.workshopCents, 144500)
  assert.equal(teamOrder.totalCents, 356575)
  assert.equal(calculateTicketOrder(pricing, "earlyBird", 5, true, before).totalCents, 344000)
  assert.equal(calculateTicketOrder(pricing, "vip", 5, true, before).totalCents, 444000)
  assert.equal(calculateTicketOrder(pricing, "vip", 5, false, before).groupTier, undefined)
  assert.equal(calculateTicketOrder(pricing, "workshopOnly", 5, false, before).totalCents, 149500)
})

test("R3: individual workshop and VIP Early Bird discounts match the approved offers", () => {
  const standardWorkshop = calculateTicketOrder(pricing, "standard", 1, true, before)
  assert.equal(standardWorkshop.unitPrice, 499)
  assert.equal(standardWorkshop.workshopUnitPrice, 299)
  assert.equal(standardWorkshop.workshopDiscountCents, 5000)
  assert.equal(standardWorkshop.totalCents, 74800)

  const vipEarlyBird = calculateTicketOrder(pricing, "vip", 1, false, before)
  assert.equal(vipEarlyBird.unitPrice, 599)
  assert.equal(vipEarlyBird.totalCents, 59900)

  const vipAfterCutoff = calculateTicketOrder(pricing, "vip", 1, false, cutoff)
  assert.equal(vipAfterCutoff.unitPrice, 799)
  assert.equal(vipAfterCutoff.totalCents, 79900)
})

test("R3: quantities reject blanks, fractions, negatives, unsafe values, and total overflow", () => {
  for (const value of ["", " ", "0", "-1", "1.5", "NaN", "Infinity", "1e3", "9007199254740992"]) {
    assert.ok(getQuantityError(value), value)
  }
  for (const value of ["1", "3", "10", "1000"]) assert.equal(getQuantityError(value), null)
  for (const quantity of [0, -1, 1.5, NaN, Infinity, Number.MAX_SAFE_INTEGER + 1]) {
    assert.throws(() => calculateTicketOrder(pricing, "standard", quantity, false, before), /positive safe integer/)
  }
  assert.throws(() => calculateTicketOrder(pricing, "standard", Number.MAX_SAFE_INTEGER, true, before), /supported amount/)
})

test("R3: only supported ticket types are accepted by the URL guard", () => {
  for (const value of ["earlyBird", "standard", "vip"]) assert.equal(isTicketType(value), true)
  for (const value of [null, "", "free", "constructor", "__proto__"]) assert.equal(isTicketType(value), false)
})

test("R1: event dates display May 4-6, 2027 as a date range, not a day/year fragment", () => {
  const formatted = formatTicketEventDates("2027-05-04", "2027-05-06", pricing.timeZone)
  assert.equal(formatted, "May 4-6, 2027")
  assert.equal(formatted.includes("(day:"), false)
  assert.equal(formatTicketEventDates("2027-05-04", "2027-05-04", pricing.timeZone), "May 4, 2027")
})
