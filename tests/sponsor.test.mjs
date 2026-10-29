import assert from "node:assert/strict"
import { existsSync, readFileSync } from "node:fs"
import test from "node:test"

const current = JSON.parse(readFileSync(new URL("../data/sponsor/2027.json", import.meta.url), "utf8"))
const archived = JSON.parse(readFileSync(new URL("../data/sponsor/2026.json", import.meta.url), "utf8"))

test("2027 conference sponsorship preserves approved tiers and benefits", () => {
  assert.equal(current.year, 2027)
  assert.deepEqual(current.conference.tiers.map(({ name, price }) => [name, price]), [
    ["Platinum Sponsor", "$14,000"], ["Gold Sponsor", "$6,500"],
    ["Silver Sponsor", "$4,500"], ["Bronze Sponsor", "$2,000"],
  ])
  assert.deepEqual(current.conference.tiers.map(({ benefits }) => benefits.length), [10, 8, 6, 6])
  assert.equal(current.conference.tiers.filter(({ featured }) => featured).length, 1)
  assert.equal("renewalRates" in current.conference, false)
  assert.equal("annualPackages" in current.conference, false)
  const icons = new Set(["Trophy", "Sparkles", "Megaphone", "Users"])
  for (const item of [...current.conference.tiers, ...current.conference.whySponsor.benefits, ...current.conference.partnershipBenefits.benefits]) {
    assert.ok(icons.has(item.icon))
  }
})

test("annual partnership tables, opportunities and media are complete", () => {
  const annual = current.annualPartnerships
  assert.equal(annual.audience.length, 4)
  assert.equal(annual.goals.length, 3)
  assert.equal(annual.opportunities.length, 6)
  assert.equal(annual.packages.length, 6)
  assert.ok(annual.packages.every((row) => row.length === 3))
  assert.equal(annual.metrics.length, 5)
  assert.ok(annual.metrics.every((row) => row.length === 2))
  for (const image of [annual.hero.image, ...annual.images.map(({ src }) => src)]) {
    assert.ok(existsSync(new URL(`../public${image}`, import.meta.url)), image)
  }
  assert.equal(current.customMarketing.message, "Coming soon.")
})

test("2026 sponsor archive retains the historical roster, separate from 2027 offers", () => {
  const event = JSON.parse(readFileSync(new URL("../data/events/2026.json", import.meta.url), "utf8"))
  assert.equal("sponsors" in event, false)
  assert.equal(archived.year, 2026)
  assert.deepEqual(Object.keys(archived.sponsors), ["platinum", "gold", "silver", "bronze", "partners"])
  assert.deepEqual(archived.sponsors.platinum.map(({ name }) => name), ["ContextQA", "The Stories and Wisdom Company"])
  assert.equal(archived.sponsors.gold.length, 8)
  assert.equal(archived.sponsors.silver.length, 2)
  assert.equal(archived.sponsors.bronze.length, 1)
  assert.equal(archived.sponsors.partners.length, 4)
  for (const sponsor of Object.values(archived.sponsors).flat()) {
    assert.ok(sponsor.name)
    assert.ok(sponsor.logo)
    assert.ok(sponsor.url.startsWith("https://"))
  }
})