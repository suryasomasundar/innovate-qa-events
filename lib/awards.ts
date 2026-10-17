export type AwardCriterion = { id: string; name: string; description: string }
export type AwardCategory = {
  id: string
  name: string
  description: string
  displayOrder: number
  scale: number
  criteriaIds: string[]
  nomineeIds: string[]
  winnerId: string | null
}
export type AwardNominee = {
  id: string
  name: string
  photo: string
  jobTitle: string
  organization: string
  biography: string
  summary: string
  achievements: string[]
  supportingInfo?: string
}
export type AwardsEdition = {
  id: string
  conferenceName: string
  title: string
  description: string
  demoNotice: string
  judges: { id: string; name: string }[]
  criteria: AwardCriterion[]
  categories: AwardCategory[]
  nominees: AwardNominee[]
}
export type Evaluation = {
  judgeId: string
  categoryId: string
  nomineeId: string
  scores: Record<string, number>
  comments: string
  status: "draft" | "rated"
  overallScore: number | null
  updatedAt: string
}
export type EvaluationStore = { version: 1; editionId: string; evaluations: Evaluation[] }

export function validateAwardsEdition(edition: AwardsEdition) {
  const unique = (ids: string[]) => new Set(ids).size === ids.length
  if (!edition.categories.length || !edition.judges.length ||
      !unique(edition.categories.map((c) => c.id)) || !unique(edition.nominees.map((n) => n.id)) ||
      !unique(edition.criteria.map((c) => c.id)) || !unique(edition.judges.map((j) => j.id)) ||
      !unique(edition.categories.map((c) => String(c.displayOrder)))) {
    throw new Error("Awards configuration needs categories, judges, and unique identifiers/order.")
  }
  for (const category of edition.categories) {
    if (![5, 10].includes(category.scale) || !category.criteriaIds.length || !category.nomineeIds.length ||
        !unique(category.criteriaIds) || !unique(category.nomineeIds) ||
        category.criteriaIds.some((id) => !edition.criteria.some((c) => c.id === id)) ||
        category.nomineeIds.some((id) => !edition.nominees.some((n) => n.id === id)) ||
        (category.winnerId !== null && !category.nomineeIds.includes(category.winnerId))) {
      throw new Error(`Invalid criteria, scale, nominees, or winner in category "${category.id}".`)
    }
  }
}

export function orderedCategories(edition: AwardsEdition) {
  return [...edition.categories].sort((a, b) => a.displayOrder - b.displayOrder)
}

export function categoryNominees(edition: AwardsEdition, category: AwardCategory) {
  return category.nomineeIds.map((id) => {
    const nominee = edition.nominees.find((n) => n.id === id)
    if (!nominee) throw new Error(`Nominee "${id}" is missing.`)
    return nominee
  })
}

export function scoreEvaluation(category: AwardCategory, scores: Record<string, number>) {
  if (Object.entries(scores).some(([id, score]) =>
    !category.criteriaIds.includes(id) || !Number.isInteger(score) || score < 1 || score > category.scale,
  )) {
    throw new Error(`Scores must use this category's criteria and whole numbers from 1 to ${category.scale}.`)
  }
  const complete = category.criteriaIds.every((id) => Object.hasOwn(scores, id))
  return {
    status: complete ? "rated" as const : "draft" as const,
    overallScore: complete
      ? Number((category.criteriaIds.reduce((sum, id) => sum + scores[id], 0) / category.criteriaIds.length).toFixed(2))
      : null,
  }
}

export function evaluationKey(judgeId: string, categoryId: string, nomineeId: string) {
  return `${judgeId}:${categoryId}:${nomineeId}`
}

export function emptyEvaluationStore(edition: AwardsEdition): EvaluationStore {
  return { version: 1, editionId: edition.id, evaluations: [] }
}

export function parseEvaluationStore(raw: string, edition: AwardsEdition): EvaluationStore {
  const data: unknown = JSON.parse(raw)
  if (!data || typeof data !== "object" || !("version" in data) || data.version !== 1 ||
      !("editionId" in data) || data.editionId !== edition.id ||
      !("evaluations" in data) || !Array.isArray(data.evaluations)) {
    throw new Error("Saved judging data has an unsupported format or edition.")
  }
  const evaluations: Evaluation[] = []
  const keys = new Set<string>()
  for (const record of data.evaluations) {
    if (!record || typeof record !== "object" ||
        typeof record.judgeId !== "string" || !edition.judges.some((j) => j.id === record.judgeId) ||
        typeof record.categoryId !== "string" || typeof record.nomineeId !== "string" ||
        typeof record.comments !== "string" || record.comments.length > 4000 ||
        typeof record.updatedAt !== "string" || !Number.isFinite(Date.parse(record.updatedAt)) ||
        !record.scores || typeof record.scores !== "object" || Array.isArray(record.scores)) {
      throw new Error("A saved evaluation is invalid. Your stored data has not been overwritten.")
    }
    const category = edition.categories.find((c) => c.id === record.categoryId)
    if (!category || !category.nomineeIds.includes(record.nomineeId)) {
      throw new Error("A saved evaluation references an unknown category or nominee.")
    }
    const scores: Record<string, number> = {}
    for (const [id, score] of Object.entries(record.scores)) {
      if (typeof score !== "number" || !category.criteriaIds.includes(id)) throw new Error("A saved criterion score is invalid.")
      scores[id] = score
    }
    const calculated = scoreEvaluation(category, scores)
    if (record.status !== calculated.status || record.overallScore !== calculated.overallScore) {
      throw new Error("A saved evaluation's status or total does not match its scores.")
    }
    const key = evaluationKey(record.judgeId, record.categoryId, record.nomineeId)
    if (keys.has(key)) throw new Error("Saved judging data contains duplicate evaluations.")
    keys.add(key)
    evaluations.push({
      judgeId: record.judgeId, categoryId: record.categoryId, nomineeId: record.nomineeId,
      scores, comments: record.comments, updatedAt: record.updatedAt, ...calculated,
    })
  }
  return { version: 1, editionId: edition.id, evaluations }
}

export type CeremonyPhase = "home" | "category" | "nominee" | "gallery" | "suspense" | "winner" | "recap"
export type CeremonyState = {
  phase: CeremonyPhase
  categoryIndex: number
  nomineeIndex: number
  countdown: number
  completedCategoryIds: string[]
}
export type CeremonyAction = { type: "next" | "back" | "reveal" | "tick" | "reset" }
export const initialCeremonyState: CeremonyState = {
  phase: "home", categoryIndex: 0, nomineeIndex: 0, countdown: 3, completedCategoryIds: [],
}

export function transitionCeremony(
  state: CeremonyState, action: CeremonyAction, categories: AwardCategory[],
): CeremonyState {
  if (action.type === "reset") return { ...initialCeremonyState, completedCategoryIds: [] }
  const category = categories[state.categoryIndex]
  if (!category) return state
  if (action.type === "reveal") {
    return state.phase === "gallery" && category.winnerId
      ? { ...state, phase: "suspense", countdown: 3 } : state
  }
  if (action.type === "tick") {
    if (state.phase !== "suspense") return state
    return state.countdown > 1 ? { ...state, countdown: state.countdown - 1 } : {
      ...state, phase: "winner",
      completedCategoryIds: [...new Set([...state.completedCategoryIds, category.id])],
    }
  }
  if (action.type === "next") {
    switch (state.phase) {
      case "home": return { ...state, phase: "category" }
      case "category": return { ...state, phase: "nominee", nomineeIndex: 0 }
      case "nominee": return state.nomineeIndex + 1 < category.nomineeIds.length
        ? { ...state, nomineeIndex: state.nomineeIndex + 1 } : { ...state, phase: "gallery" }
      case "winner": return state.categoryIndex + 1 < categories.length
        ? { ...state, phase: "category", categoryIndex: state.categoryIndex + 1, nomineeIndex: 0 }
        : { ...state, phase: "recap" }
      default: return state
    }
  }
  switch (state.phase) {
    case "category": return state.categoryIndex === 0 ? { ...state, phase: "home" }
      : { ...state, phase: "winner", categoryIndex: state.categoryIndex - 1, nomineeIndex: 0 }
    case "nominee": return state.nomineeIndex > 0 ? { ...state, nomineeIndex: state.nomineeIndex - 1 }
      : { ...state, phase: "category" }
    case "gallery": return { ...state, phase: "nominee", nomineeIndex: category.nomineeIds.length - 1 }
    case "suspense": return { ...state, phase: "gallery", countdown: 3 }
    case "winner": return { ...state, phase: "gallery" }
    case "recap": return { ...state, phase: "winner" }
    default: return state
  }
}

export function visibleCeremonyWinner(state: CeremonyState, category: AwardCategory) {
  return state.phase === "winner" && state.completedCategoryIds.includes(category.id) ? category.winnerId : null
}
