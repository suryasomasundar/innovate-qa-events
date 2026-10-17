"use client"

import { useCallback, useEffect, useReducer, useRef, useState, type CSSProperties } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, ArrowRight, Expand, Minimize, PartyPopper, RotateCcw, Trophy } from "lucide-react"
import { awards2027 as edition } from "@/lib/awards-data"
import {
  categoryNominees, initialCeremonyState, orderedCategories,
  transitionCeremony, visibleCeremonyWinner,
} from "@/lib/awards"
import { AwardsTrophy, NomineePortrait } from "@/components/awards/shared"

const categories = orderedCategories(edition)

export function AwardsCeremony() {
  const [state, dispatch] = useReducer(
    (current: typeof initialCeremonyState, action: Parameters<typeof transitionCeremony>[1]) => transitionCeremony(current, action, categories),
    initialCeremonyState,
  )
  const [fullscreen, setFullscreen] = useState(false)
  const [error, setError] = useState("")
  const [celebration, setCelebration] = useState(0)
  const root = useRef<HTMLDivElement>(null)
  const heading = useRef<HTMLHeadingElement>(null)
  const revealButton = useRef<HTMLButtonElement>(null)
  const category = categories[state.categoryIndex]
  const nominees = categoryNominees(edition, category)
  const nominee = nominees[state.nomineeIndex]
  const winnerId = visibleCeremonyWinner(state, category)
  const winner = winnerId ? nominees.find((item) => item.id === winnerId) : undefined
  const stageKey = `${state.phase}-${state.categoryIndex}-${state.nomineeIndex}`

  useEffect(() => {
    heading.current?.focus({ preventScroll: true })
    root.current?.scrollTo({ top: 0 })
  }, [stageKey])

  useEffect(() => {
    if (state.phase !== "suspense") return
    const timer = setTimeout(() => dispatch({ type: "tick" }), 1000)
    return () => clearTimeout(timer)
  }, [state.phase, state.countdown])

  useEffect(() => {
    const update = () => setFullscreen(document.fullscreenElement === root.current)
    document.addEventListener("fullscreenchange", update)
    return () => document.removeEventListener("fullscreenchange", update)
  }, [])

  const next = useCallback(() => {
    if (state.phase === "gallery") revealButton.current?.focus()
    else dispatch({ type: "next" })
  }, [state.phase])

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.defaultPrevented || event.repeat || event.ctrlKey || event.metaKey || event.altKey) return
      if (event.key === "Escape" && document.fullscreenElement === root.current) {
        event.preventDefault()
        void document.exitFullscreen().catch((cause: unknown) => {
          setError(`Full screen could not be exited: ${cause instanceof Error ? cause.message : String(cause)}.`)
        })
        return
      }
      if (event.target instanceof Element) {
        if (event.target.closest("input, select, textarea, [contenteditable=true]")) return
        if (["Enter", " "].includes(event.key) && event.target.closest("button, a, summary")) return
      }
      if (["Enter", " ", "ArrowRight", "ArrowLeft"].includes(event.key)) {
        event.preventDefault()
        if (event.key === "ArrowLeft") dispatch({ type: "back" })
        else next()
      }
    }
    document.addEventListener("keydown", onKeyDown)
    return () => document.removeEventListener("keydown", onKeyDown)
  }, [next])

  async function toggleFullscreen() {
    setError("")
    try {
      if (document.fullscreenElement) await document.exitFullscreen()
      else if (root.current?.requestFullscreen) await root.current.requestFullscreen()
      else setError("Full screen is not supported in this browser. Use your browser's presentation or full-screen mode.")
    } catch (cause) {
      setError(`Full screen could not be changed: ${cause instanceof Error ? cause.message : String(cause)}.`)
    }
  }

  function restart() {
    if (!window.confirm("Restart this demo ceremony? All reveal progress will be reset.")) return
    dispatch({ type: "reset" })
    setCelebration(0)
  }

  const continueLabel = state.phase === "home" ? "Start Awards Ceremony"
    : state.phase === "category" ? "Enter Category"
      : state.phase === "nominee" ? state.nomineeIndex + 1 < nominees.length ? "Next Nominee" : "View All Nominees"
        : state.phase === "winner" ? state.categoryIndex + 1 < categories.length ? "Next Award" : "View Winners Recap"
          : ""

  return (
    <div ref={root} className="awards-experience awards-ceremony">
      <div aria-hidden="true" className="awards-stage-light awards-stage-light-left" />
      <div aria-hidden="true" className="awards-stage-light awards-stage-light-right" />
      <div aria-hidden="true" className="awards-stars" />
      <div className="relative z-10 flex min-h-svh flex-col">
        <header className="awards-ceremony-top">
          <Link href="/awards/2027" className="inline-flex min-h-11 items-center gap-3 text-sm font-semibold">
            <Image src="/logo.svg" alt="" width={32} height={32} className="rounded-full bg-white p-1" />
            {edition.conferenceName}
          </Link>
          <p className="text-xs uppercase tracking-widest text-amber-200">{state.phase === "home" ? "Awards Ceremony" : state.phase === "recap" ? "The winners circle" : `Award ${state.categoryIndex + 1} of ${categories.length}`}</p>
          <button type="button" onClick={toggleFullscreen} className="awards-button-secondary">{fullscreen ? <Minimize aria-hidden="true" className="size-4" /> : <Expand aria-hidden="true" className="size-4" />}{fullscreen ? "Exit Full Screen" : "Full Screen"}</button>
        </header>
        <p className="mx-auto max-w-5xl px-5 text-center text-xs leading-relaxed text-slate-300">DEMO CEREMONY · Fictional nominees and configured demo winners. Public demo data is inspectable; this is not a confidential or official awards system.</p>
        {error && <p role="alert" className="awards-error mx-5 mt-4">{error}</p>}
        <section key={stageKey} aria-labelledby="ceremony-heading" className="awards-stage">
          {state.phase === "home" && (
            <>
              <p className="awards-eyebrow">An evening for the extraordinary</p>
              <AwardsTrophy />
              <h1 ref={heading} tabIndex={-1} id="ceremony-heading" className="awards-display">Awards<br /><span>Ceremony</span></h1>
              <p className="mx-auto mt-6 max-w-xl text-lg text-slate-300">{edition.title}. Celebrating the minds moving quality forward.</p>
              <div className="awards-home-categories">{categories.map((item) => <span key={item.id}>{item.name}</span>)}</div>
            </>
          )}
          {state.phase === "category" && (
            <>
              <p className="awards-eyebrow">Excellence deserves a spotlight</p>
              <AwardsTrophy />
              <h1 ref={heading} tabIndex={-1} id="ceremony-heading" className="awards-display"><span>{category.name}</span></h1>
              <p className="mx-auto mt-8 max-w-2xl text-lg text-slate-300 md:text-2xl">{category.description}</p>
            </>
          )}
          {state.phase === "nominee" && (
            <>
              <p className="awards-eyebrow">{category.name} / Nominee {state.nomineeIndex + 1} of {nominees.length}</p>
              <h1 ref={heading} tabIndex={-1} id="ceremony-heading" className="mb-8 mt-4 text-2xl font-light text-slate-200 md:text-3xl">And the nominees are...</h1>
              <div className="awards-nominee-spotlight">
                <NomineePortrait nominee={nominee} large />
                <div className="text-left">
                  <p className="awards-eyebrow">A vision. A voice. An impact.</p>
                  <h2 className="mt-4 text-4xl font-semibold tracking-tight md:text-6xl">{nominee.name}</h2>
                  <p className="mt-4 text-lg text-amber-200">{nominee.jobTitle}</p>
                  <p className="mt-1 text-slate-300">{nominee.organization}</p>
                  <p className="mt-7 max-w-xl border-l-2 border-amber-300/50 pl-5 text-xl leading-relaxed text-slate-200">{nominee.summary}</p>
                </div>
              </div>
            </>
          )}
          {(state.phase === "gallery" || state.phase === "suspense") && (
            <>
              <p className="awards-eyebrow">{category.name}</p>
              <h1 ref={heading} tabIndex={-1} id="ceremony-heading" className="mt-4 text-3xl font-semibold md:text-5xl">{state.phase === "suspense" ? "A moment for greatness." : "An extraordinary field."}</h1>
              <div className={`awards-nominee-gallery ${state.phase === "suspense" ? "is-dimmed" : ""}`}>
                {nominees.map((item) => <article key={item.id} className="awards-gallery-card">
                  <NomineePortrait nominee={item} />
                  <h2 className="mt-4 text-2xl font-semibold">{item.name}</h2>
                  <p className="mt-2 text-sm text-amber-200">{item.jobTitle}</p>
                  <p className="mt-1 text-sm text-slate-300">{item.organization}</p>
                </article>)}
              </div>
              {state.phase === "suspense" && <div className="awards-countdown" role="status" aria-live="polite" aria-atomic="true"><span key={state.countdown}>{state.countdown}</span><p>The award goes to...</p></div>}
              {state.phase === "gallery" && !category.winnerId && <p role="status" className="mt-5 text-amber-200">A winner has not been configured. The presenter cannot reveal this award yet.</p>}
            </>
          )}
          {state.phase === "winner" && winner && (
            <>
              <p className="awards-eyebrow">{category.name}</p>
              <h1 ref={heading} tabIndex={-1} id="ceremony-heading" className="awards-winner-title"><Trophy aria-hidden="true" />Winner</h1>
              <div className="awards-winner-card">
                <NomineePortrait nominee={winner} large />
                <div><p className="awards-eyebrow">The spotlight is yours</p><h2 className="mt-4 text-4xl font-semibold md:text-7xl">{winner.name}</h2><p className="mt-4 text-xl text-amber-200">{winner.organization}</p><p className="mt-3 text-slate-300">{winner.summary}</p><p className="mt-6 text-sm text-slate-300">Configured demo winner · Not derived from judging scores</p></div>
              </div>
              <div key={celebration} aria-hidden="true" className="awards-confetti">{Array.from({ length: 32 }, (_, index) => <i key={index} style={{ "--particle": index, left: `${(index * 37) % 100}%` } as CSSProperties} />)}</div>
            </>
          )}
          {state.phase === "recap" && (
            <>
              <p className="awards-eyebrow">{edition.conferenceName} / Demo winners circle</p>
              <AwardsTrophy />
              <h1 ref={heading} tabIndex={-1} id="ceremony-heading" className="awards-display">Congratulations to<br /><span>All Our Winners</span></h1>
              <div className="awards-recap-grid">
                {categories.filter((item) => state.completedCategoryIds.includes(item.id)).map((item) => {
                  const recipient = edition.nominees.find((person) => person.id === item.winnerId)
                  return recipient ? <article key={item.id} className="awards-gallery-card"><NomineePortrait nominee={recipient} /><p className="awards-eyebrow mt-5">{item.name}</p><h2 className="mt-3 text-2xl font-semibold">{recipient.name}</h2><p className="mt-2 text-sm text-slate-300">{recipient.organization}</p></article> : null
                })}
              </div>
              <p className="mt-10 text-lg text-amber-100">Quality connects us. Excellence inspires us. See you at {edition.conferenceName}.</p>
            </>
          )}
        </section>
        <footer className="awards-presenter-controls">
          <div className="flex flex-wrap justify-center gap-3">
            {state.phase !== "home" && <button type="button" className="awards-button-secondary" onClick={() => dispatch({ type: "back" })}><ArrowLeft aria-hidden="true" className="size-4" />Back</button>}
            {continueLabel && <button type="button" className="awards-button" onClick={next}>{continueLabel}<ArrowRight aria-hidden="true" className="size-4" /></button>}
            {state.phase === "gallery" && <button ref={revealButton} type="button" disabled={!category.winnerId} className="awards-button awards-reveal-button" onClick={() => dispatch({ type: "reveal" })}><Trophy aria-hidden="true" className="size-5" />Reveal Winner</button>}
            {state.phase === "winner" && <button type="button" className="awards-button-secondary" onClick={() => setCelebration((current) => current + 1)}><PartyPopper aria-hidden="true" className="size-4" />Celebrate</button>}
            {state.phase === "recap" && <button type="button" className="awards-button" onClick={restart}><RotateCcw aria-hidden="true" className="size-4" />Restart Ceremony</button>}
          </div>
          <p className="mt-4 text-center text-xs text-slate-300">Enter / Space: continue · →: next · ←: back · Esc: exit full screen. At the gallery, activate Reveal Winner explicitly. Refreshing restarts the demo.</p>
        </footer>
      </div>
    </div>
  )
}
