"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { ArrowLeft, CheckCircle2, ClipboardList, Save, ShieldCheck } from "lucide-react"
import { awards2027 as edition } from "@/lib/awards-data"
import {
  categoryNominees, emptyEvaluationStore, evaluationKey, orderedCategories,
  parseEvaluationStore, scoreEvaluation, type Evaluation, type EvaluationStore,
} from "@/lib/awards"
import { NomineePortrait } from "@/components/awards/shared"

const storageKey = `${edition.id}:evaluations:v1`
const categories = orderedCategories(edition)
type Draft = { scores: Record<string, number>; comments: string }

export function AwardsJudging() {
  const [categoryId, setCategoryId] = useState(categories[0].id)
  const [judgeId, setJudgeId] = useState(edition.judges[0].id)
  const [store, setStore] = useState<EvaluationStore | null>(null)
  const [drafts, setDrafts] = useState<Record<string, Draft>>({})
  const [error, setError] = useState("")
  const [message, setMessage] = useState("")
  const heading = useRef<HTMLHeadingElement>(null)
  const category = categories.find((item) => item.id === categoryId)!
  const nominees = categoryNominees(edition, category)
  const criteria = category.criteriaIds.map((id) => edition.criteria.find((criterion) => criterion.id === id)!)
  const dirty = Object.keys(drafts).length > 0

  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey)
      setStore(raw ? parseEvaluationStore(raw, edition) : emptyEvaluationStore(edition))
    } catch (cause) {
      setError(`Unable to load local evaluations: ${cause instanceof Error ? cause.message : String(cause)}. Saving is disabled until local data is reset.`)
    }
  }, [])

  useEffect(() => {
    if (!dirty) return
    const warn = (event: BeforeUnloadEvent) => { event.preventDefault(); event.returnValue = "" }
    const confirmNavigation = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return
      const link = event.target instanceof Element ? event.target.closest("a") : null
      if (!link || link.target === "_blank" || link.hasAttribute("download")) return
      const destination = new URL(link.href, window.location.href)
      if (destination.origin !== window.location.origin || destination.pathname === window.location.pathname) return
      if (!window.confirm("Leave the judging room? Unsaved edits will be lost. Save each evaluation before leaving.")) {
        event.preventDefault()
        event.stopPropagation()
      }
    }
    window.addEventListener("beforeunload", warn)
    document.addEventListener("click", confirmNavigation, true)
    return () => {
      window.removeEventListener("beforeunload", warn)
      document.removeEventListener("click", confirmNavigation, true)
    }
  }, [dirty])

  function savedEvaluation(nomineeId: string, targetCategoryId = categoryId) {
    return store?.evaluations.find((record) =>
      record.judgeId === judgeId && record.categoryId === targetCategoryId && record.nomineeId === nomineeId,
    )
  }

  function draftFor(nomineeId: string): Draft {
    const saved = savedEvaluation(nomineeId)
    return drafts[evaluationKey(judgeId, categoryId, nomineeId)] ?? {
      scores: saved?.scores ?? {}, comments: saved?.comments ?? "",
    }
  }

  function updateDraft(nomineeId: string, draft: Draft) {
    setDrafts((current) => ({ ...current, [evaluationKey(judgeId, categoryId, nomineeId)]: draft }))
    setMessage("")
  }

  function save(nomineeId: string) {
    if (!store) return
    const draft = draftFor(nomineeId)
    const record: Evaluation = {
      judgeId, categoryId, nomineeId, ...draft,
      ...scoreEvaluation(category, draft.scores),
      updatedAt: new Date().toISOString(),
    }
    const key = evaluationKey(judgeId, categoryId, nomineeId)
    let next: EvaluationStore
    try {
      const raw = localStorage.getItem(storageKey)
      const latest = raw ? parseEvaluationStore(raw, edition) : emptyEvaluationStore(edition)
      next = {
        ...latest,
        evaluations: [...latest.evaluations.filter((item) => evaluationKey(item.judgeId, item.categoryId, item.nomineeId) !== key), record],
      }
      const serialized = JSON.stringify(next)
      parseEvaluationStore(serialized, edition)
      localStorage.setItem(storageKey, serialized)
    } catch (cause) {
      setError(`Evaluation was not saved: ${cause instanceof Error ? cause.message : String(cause)}. Your edits remain on this page.`)
      return
    }
    setStore(next)
    setDrafts((current) => {
      const remaining = { ...current }
      delete remaining[key]
      return remaining
    })
    setError("")
    const name = nominees.find((nominee) => nominee.id === nomineeId)!.name
    setMessage(record.status === "rated" ? `Rating saved for ${name}.` : `Draft saved for ${name}. Score every criterion to mark this evaluation Rated.`)
  }

  function resetLocalData() {
    if (!window.confirm("Delete all prototype evaluations for every demo judge on this browser? This cannot be undone.")) return
    try {
      localStorage.removeItem(storageKey)
    } catch (cause) {
      setError(`Local data could not be reset: ${cause instanceof Error ? cause.message : String(cause)}.`)
      return
    }
    setStore(emptyEvaluationStore(edition))
    setDrafts({})
    setError("")
    setMessage("All local prototype evaluations were cleared.")
  }

  const completed = store?.evaluations.filter((record) => record.judgeId === judgeId && record.status === "rated").length ?? 0
  const total = categories.reduce((sum, item) => sum + item.nomineeIds.length, 0)

  return (
    <div className="awards-experience awards-judging">
      <div className="mx-auto max-w-[1500px] px-4 py-10 md:px-8">
        <Link href="/awards/2027" className="awards-text-link"><ArrowLeft aria-hidden="true" className="size-4" />Awards studio</Link>
        <header className="my-8 flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="awards-eyebrow">The judging room / 2027</p>
            <h1 className="mt-3 text-3xl font-semibold md:text-5xl">Recognize the extraordinary.</h1>
            <p className="mt-4 max-w-2xl text-slate-300">Explore every nomination. Consider the evidence. Give great work the attention it deserves.</p>
          </div>
          <div className="awards-panel min-w-0 p-5">
            <label htmlFor="demo-judge" className="mb-2 block text-sm font-medium">Local demo judge</label>
            <select id="demo-judge" value={judgeId} onChange={(event) => { setJudgeId(event.target.value); setMessage("") }} className="awards-input">
              {edition.judges.map((judge) => <option key={judge.id} value={judge.id}>{judge.name}</option>)}
            </select>
            <p className="mt-2 text-xs text-slate-300">A local profile, not a signed-in account.</p>
          </div>
        </header>
        <div className="awards-demo-notice">
          <ShieldCheck aria-hidden="true" className="size-5 shrink-0" />
          <div><p>{edition.demoNotice}</p><p className="mt-2">Evaluations stay on this browser, are not encrypted, and do not sync between devices. Do not enter confidential information. Demo winners are configured separately and never displayed here.</p></div>
        </div>
        {error && <div role="alert" className="awards-error mt-5">{error}</div>}
        <p role="status" className="my-4 min-h-6 text-sm text-emerald-200">{message}</p>
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4 text-sm">
          <span><CheckCircle2 aria-hidden="true" className="mr-2 inline size-4 text-amber-200" />{completed} of {total} evaluations rated{dirty ? " · Unsaved edits" : ""}</span>
          <button type="button" onClick={resetLocalData} className="awards-text-link">Reset local evaluations</button>
        </div>
        {!store && !error ? <p role="status">Loading local evaluations...</p> : (
          <div className="grid items-start gap-7 lg:grid-cols-[260px_minmax(0,1fr)]">
            <nav aria-label="Award categories" className="awards-panel p-3 lg:sticky lg:top-24">
              <p className="px-3 py-3 text-xs font-semibold uppercase tracking-widest text-slate-300">Seven ways to shine</p>
              {categories.map((item, index) => {
                const rated = store?.evaluations.filter((record) => record.judgeId === judgeId && record.categoryId === item.id && record.status === "rated").length ?? 0
                return (
                  <button type="button" key={item.id} aria-current={item.id === categoryId ? "true" : undefined} className={`awards-category-button ${item.id === categoryId ? "is-selected" : ""}`} onClick={() => { setCategoryId(item.id); setMessage(""); requestAnimationFrame(() => heading.current?.focus()) }}>
                    <span className="text-xs text-amber-200">{String(index + 1).padStart(2, "0")}</span>
                    <span className="flex-1">{item.name}<span className="mt-1 block text-xs text-slate-300">{rated}/{item.nomineeIds.length} rated</span></span>
                  </button>
                )
              })}
            </nav>
            <div className="min-w-0">
              <section aria-labelledby="judging-category-heading">
                <div className="mb-6">
                  <p className="awards-eyebrow">Category {category.displayOrder} / {categories.length}</p>
                  <h2 ref={heading} tabIndex={-1} id="judging-category-heading" className="mt-2 text-3xl font-semibold">{category.name}</h2>
                  <p className="mt-3 text-slate-300">{category.description}</p>
                  <p className="mt-2 text-sm text-amber-200">Rate 1-{category.scale}. Overall score is the equal-weight average of all criteria.</p>
                </div>
                <div className="space-y-6">
                  {nominees.map((nominee) => {
                    const draft = draftFor(nominee.id)
                    const saved = savedEvaluation(nominee.id)
                    const result = scoreEvaluation(category, draft.scores)
                    const unsaved = !!drafts[evaluationKey(judgeId, categoryId, nominee.id)]
                    const status = unsaved ? "Unsaved edits" : saved?.status === "rated" ? "Rated" : saved ? "Draft · Not rated" : "Not rated"
                    return (
                      <article key={nominee.id} aria-labelledby={`nominee-${nominee.id}`} className="awards-panel overflow-hidden">
                        <div className="grid md:grid-cols-[210px_minmax(0,1fr)]">
                          <div className="p-5">
                            <NomineePortrait nominee={nominee} />
                            <span className="awards-status mt-4">{status}</span>
                          </div>
                          <div className="min-w-0 p-5 md:pl-0">
                            <h3 id={`nominee-${nominee.id}`} className="text-2xl font-semibold">{nominee.name}</h3>
                            <p className="mt-1 text-sm text-amber-200">{nominee.jobTitle}</p>
                            <p className="mt-1 text-sm text-slate-300">{nominee.organization}</p>
                            <p className="mt-4 text-slate-200">{nominee.summary}</p>
                            <ul className="mt-4 space-y-2 text-sm text-slate-300">{nominee.achievements.map((achievement) => <li key={achievement} className="flex gap-2"><CheckCircle2 aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-amber-200" />{achievement}</li>)}</ul>
                            <details className="mt-4 text-sm text-slate-300">
                              <summary className="cursor-pointer py-2 text-amber-100">Supporting information</summary>
                              <p className="mt-2">{nominee.biography}</p><p className="mt-2">{nominee.supportingInfo}</p>
                            </details>
                          </div>
                        </div>
                        <form onSubmit={(event) => { event.preventDefault(); save(nominee.id) }} className="border-t border-slate-600 p-5 md:p-6">
                          <fieldset disabled={!store}>
                            <legend className="mb-4 font-semibold">Evaluate {nominee.name}</legend>
                            <div className="grid gap-4 sm:grid-cols-2">
                              {criteria.map((criterion) => {
                                const id = `${nominee.id}-${criterion.id}`
                                return <div key={id}>
                                  <label htmlFor={id} className="mb-2 block text-sm font-medium">{criterion.name}</label>
                                  <select id={id} value={draft.scores[criterion.id] ?? ""} aria-describedby={`${id}-help`} className="awards-input w-full" onChange={(event) => {
                                    const scores = { ...draft.scores }
                                    if (event.target.value === "") delete scores[criterion.id]
                                    else scores[criterion.id] = Number(event.target.value)
                                    updateDraft(nominee.id, { ...draft, scores })
                                  }}>
                                    <option value="">Not scored</option>
                                    {Array.from({ length: category.scale }, (_, index) => <option key={index + 1} value={index + 1}>{index + 1} / {category.scale}</option>)}
                                  </select>
                                  <p id={`${id}-help`} className="mt-2 text-xs text-slate-300">{criterion.description}</p>
                                </div>
                              })}
                            </div>
                            <label htmlFor={`${nominee.id}-comments`} className="mb-2 mt-5 block text-sm font-medium">Judge comments <span className="font-normal text-slate-300">(optional, up to 4,000 characters)</span></label>
                            <textarea id={`${nominee.id}-comments`} rows={3} maxLength={4000} value={draft.comments} onChange={(event) => updateDraft(nominee.id, { ...draft, comments: event.target.value })} className="awards-input w-full resize-y" />
                            <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
                              <p aria-live="polite" className="text-sm text-slate-200">Overall: <strong className="text-xl text-amber-200">{result.overallScore === null ? "Incomplete" : `${result.overallScore.toFixed(2)} / ${category.scale}`}</strong></p>
                              <button type="submit" className="awards-button"><Save aria-hidden="true" className="size-4" />{result.status === "draft" ? "Save Draft" : saved ? "Update Rating" : "Save Rating"}</button>
                            </div>
                          </fieldset>
                        </form>
                      </article>
                    )
                  })}
                </div>
              </section>
              <section aria-labelledby="comparison-heading" className="awards-panel mt-8 p-5 md:p-6">
                <h2 id="comparison-heading" className="flex items-center gap-2 text-xl font-semibold"><ClipboardList aria-hidden="true" className="size-5 text-amber-200" />Category overview</h2>
                <p className="mt-2 text-sm text-slate-300">Your saved evaluations only. No rankings, aggregated results, or winners.</p>
                <div role="region" aria-label="Saved evaluation comparison" tabIndex={0} className="mt-5 overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <caption className="sr-only">{category.name}: saved scores for this local judge</caption>
                    <thead><tr><th scope="col">Nominee</th>{criteria.map((criterion) => <th key={criterion.id} scope="col">{criterion.name}</th>)}<th scope="col">Overall</th><th scope="col">Status</th></tr></thead>
                    <tbody>{nominees.map((nominee) => {
                      const record = savedEvaluation(nominee.id)
                      return <tr key={nominee.id}><th scope="row">{nominee.name}</th>{criteria.map((criterion) => <td key={criterion.id}>{record?.scores[criterion.id] ?? "—"}</td>)}<td>{record?.overallScore?.toFixed(2) ?? "Incomplete"}</td><td>{record?.status === "rated" ? "Rated" : record ? "Draft" : "Not rated"}</td></tr>
                    })}</tbody>
                  </table>
                </div>
              </section>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
