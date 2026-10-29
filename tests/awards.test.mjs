import assert from "node:assert/strict"
import { readFileSync } from "node:fs"
import test from "node:test"
import {
  categoryNominees, emptyEvaluationStore, initialCeremonyState, orderedCategories,
  parseEvaluationStore, scoreEvaluation, transitionCeremony, validateAwardsEdition,
  visibleCeremonyWinner,
} from "../lib/awards.ts"

const edition = JSON.parse(readFileSync(new URL("../data/awards-2027.json", import.meta.url), "utf8"))
const categories = orderedCategories(edition)
const category = categories[0]
const step = (state, type) => transitionCeremony(state, { type }, categories)

const revisedCategoryNames = [
  "Quality Innovator of the Year",
  "Excellence in QA & Automation",
  "Quality Organization of the Year",
  "Best Quality Tool Contributor",
  "Community Champion",
  "Rising Star in Quality",
  "Outstanding QA Impact",
  "Sponsor’s Choice Award",
]

test("R1: separate 2027 edition has eight valid categories and fictional nominees", () => {
  validateAwardsEdition(edition)
  assert.equal(categories.length, 8)
  assert.deepEqual(categories.map((item) => item.name), revisedCategoryNames)
  assert.equal(edition.nominees.length, 21)
  assert.equal(categories.every((item) => categoryNominees(edition, item).length === 3), true)
  assert.match(edition.demoNotice, /fictional demo data/)
  const current = JSON.parse(readFileSync(new URL("../data/awards/2027.json", import.meta.url), "utf8"))
  assert.deepEqual(current.categories.map((item) => item.title), revisedCategoryNames)
  assert.equal(current.year, 2027)
  assert.equal(current.nominationDeadline, "2027-04-01")
  assert.equal(current.announcementDate, "2027-05-06")
  assert.deepEqual(current.judges, [])
  assert.equal("winners" in current, false)
})

test("2026 archive retains historical winners and judges separately from public nominations", () => {
  const archived = JSON.parse(readFileSync(new URL("../data/awards/2026.json", import.meta.url), "utf8"))
  assert.equal(archived.winners.length, 8)
  assert.equal(archived.winners[0].category, "Emerging QA Talent")
  assert.equal(archived.judges.length, 10)
  assert.equal(archived.ceremonyDate, "June 4–5, 2026")
  assert.equal(archived.categories[0].title, "QA Thought Leader of the Year")
})

test("R1: invalid scales, duplicate orders, and non-nominee winners are rejected", () => {
  for (const change of [
    (value) => { value.categories[0].scale = 7 },
    (value) => { value.categories[0].winnerId = "not-a-nominee" },
    (value) => { value.categories[0].criteriaIds = ["missing"] },
    (value) => { value.categories[1].displayOrder = value.categories[0].displayOrder },
  ]) {
    const value = structuredClone(edition)
    change(value)
    assert.throws(() => validateAwardsEdition(value))
  }
})

test("R2: criteria calculate an equal-weight score only when complete on both supported scales", () => {
  assert.deepEqual(scoreEvaluation(category, {}), { status: "draft", overallScore: null })
  assert.equal(scoreEvaluation(category, { innovation: 4 }).overallScore, null)
  assert.deepEqual(scoreEvaluation(category, { innovation: 5, impact: 4, technical: 3, impression: 5 }), { status: "rated", overallScore: 4.25 })
  const ten = categories[1]
  assert.equal(scoreEvaluation(ten, Object.fromEntries(ten.criteriaIds.map((id) => [id, 10]))).overallScore, 10)
  for (const value of [0, -1, 6, 2.5, NaN, Infinity, "5"]) assert.throws(() => scoreEvaluation(category, { innovation: value }))
  assert.throws(() => scoreEvaluation(category, { other: 4 }))
})

function evaluation() {
  const scores = Object.fromEntries(category.criteriaIds.map((id) => [id, 4]))
  return { judgeId: edition.judges[0].id, categoryId: category.id, nomineeId: category.nomineeIds[0], scores, comments: "Thoughtful demo feedback.", updatedAt: "2026-10-17T01:00:00Z", ...scoreEvaluation(category, scores) }
}

test("R2: evaluations round-trip, retain judge identity, and validate drafts", () => {
  const store = emptyEvaluationStore(edition)
  store.evaluations.push(evaluation())
  const parsed = parseEvaluationStore(JSON.stringify(store), edition)
  assert.deepEqual(parsed, store)
  const record = { ...evaluation(), scores: { innovation: 2 }, status: "draft", overallScore: null }
  assert.equal(parseEvaluationStore(JSON.stringify({ ...store, evaluations: [record] }), edition).evaluations[0].status, "draft")
})

test("R2: corrupt, stale, duplicated, out-of-range, and forged-total storage is rejected", () => {
  assert.throws(() => parseEvaluationStore("{broken", edition))
  assert.throws(() => parseEvaluationStore("null", edition))
  for (const mutate of [
    (store) => { store.version = 2 },
    (store) => { store.editionId = "another-edition" },
    (store) => { store.evaluations[0].judgeId = "unknown" },
    (store) => { store.evaluations[0].nomineeId = "unknown" },
    (store) => { store.evaluations[0].scores.innovation = 99 },
    (store) => { store.evaluations[0].overallScore = 5 },
    (store) => { store.evaluations[0].comments = "x".repeat(4001) },
    (store) => { store.evaluations.push(store.evaluations[0]) },
  ]) {
    const store = { ...emptyEvaluationStore(edition), evaluations: [evaluation()] }
    mutate(store)
    assert.throws(() => parseEvaluationStore(JSON.stringify(store), edition))
  }
})

test("R3/R4: ordered flow cannot reveal a winner through generic continue or timer actions", () => {
  let state = { ...initialCeremonyState, completedCategoryIds: [] }
  assert.equal(visibleCeremonyWinner(state, category), null)
  assert.equal(step(state, "reveal"), state)
  state = step(state, "next")
  assert.equal(state.phase, "category")
  state = step(state, "next")
  for (let index = 0; index < 3; index++) {
    assert.equal(state.phase, "nominee")
    assert.equal(state.nomineeIndex, index)
    assert.equal(visibleCeremonyWinner(state, category), null)
    state = step(state, "next")
  }
  assert.equal(state.phase, "gallery")
  assert.equal(step(state, "next"), state)
  assert.equal(step(state, "tick"), state)
  state = step(state, "reveal")
  assert.equal(state.phase, "suspense")
  assert.equal(visibleCeremonyWinner(state, category), null)
  state = step(state, "tick")
  state = step(state, "tick")
  assert.equal(state.countdown, 1)
  assert.equal(visibleCeremonyWinner(state, category), null)
  state = step(state, "tick")
  assert.equal(visibleCeremonyWinner(state, category), category.winnerId)
  assert.deepEqual(state.completedCategoryIds, [category.id])
})

test("R3/R4: Back cancels suspense without revealing, and missing winners block reveal", () => {
  let state = { ...initialCeremonyState, phase: "gallery", completedCategoryIds: [] }
  state = step(step(state, "reveal"), "back")
  assert.equal(state.phase, "gallery")
  assert.equal(step(state, "tick"), state)
  assert.equal(state.completedCategoryIds.length, 0)
  const unconfigured = categories.map((item) => ({ ...item, winnerId: null }))
  assert.equal(transitionCeremony(state, { type: "reveal" }, unconfigured), state)
})

test("R3: all eight awards complete before recap, backward navigation and reset preserve boundaries", () => {
  let state = step({ ...initialCeremonyState, completedCategoryIds: [] }, "next")
  for (const item of categories) {
    assert.equal(state.phase, "category")
    state = step(state, "next")
    for (let index = 0; index < item.nomineeIds.length; index++) state = step(state, "next")
    state = step(state, "reveal")
    for (let tick = 0; tick < 3; tick++) state = step(state, "tick")
    assert.equal(visibleCeremonyWinner(state, item), item.winnerId)
    const prior = step(state, "back")
    assert.equal(prior.phase, "gallery")
    assert.equal(visibleCeremonyWinner(prior, item), null)
    state = step(state, "next")
  }
  assert.equal(state.phase, "recap")
  assert.equal(state.completedCategoryIds.length, 8)
  assert.equal(step(state, "back").phase, "winner")
  assert.deepEqual(step(state, "reset"), initialCeremonyState)
})
