"use client"

import { useMemo, useState } from "react"
import {
  ArrowRight,
  BrainCircuit,
  BriefcaseBusiness,
  Check,
  Copy,
  Lightbulb,
  Network,
  Presentation,
  Rocket,
  Target,
} from "lucide-react"
import { Button } from "@/components/ui/button"

type RoleKey = "qa" | "senior" | "manager" | "leader" | "early"

type RoleValue = {
  label: string
  title: string
  promise: string
  progression: string
  learn: string
  apply: string
  impact: string
  career: string
  takeaway: string
  organization: string
  personal: string
  metric: string
}

const roleValues: Record<RoleKey, RoleValue> = {
  qa: {
    label: "QA / Test Engineer",
    title: "For QA and Test Engineers",
    promise: "Move from hearing about AI and modern testing to knowing where they fit in your daily work.",
    progression: "From executor to problem solver",
    learn: "Practical AI-assisted testing, stronger test design, useful automation patterns, and new ways to reason about risk.",
    apply: "Try workshop techniques in one real workflow, improve coverage choices, and remove repetitive work without losing judgment.",
    impact: "Faster feedback, more meaningful tests, clearer defect prevention, and better conversations with developers and product teams.",
    career: "Broaden your toolkit, communicate quality more strategically, and build confidence to lead improvements—not only execute tests.",
    takeaway: "A practical experiment to run, reusable ideas for the team, and a clearer point of view on responsible AI in testing.",
    organization: "Stronger test design, faster feedback, and practical AI-assisted workflows the team can evaluate.",
    personal: "Build confidence applying AI and modern test techniques while growing from test execution into quality problem-solving.",
    metric: "Authoring or review time, feedback speed, rework, escaped defects, or flaky-test effort in one selected workflow.",
  },
  senior: {
    label: "Senior / Staff SDET",
    title: "For Senior and Staff SDETs",
    promise: "Translate new tooling and practices into scalable technical direction for the wider engineering organization.",
    progression: "From expert to technical multiplier",
    learn: "Agentic testing patterns, architecture trade-offs, observability, reliability, test-platform design, and adoption failure modes.",
    apply: "Evaluate one high-value automation or AI use case, define guardrails, and improve how quality capabilities scale across teams.",
    impact: "Stronger frameworks, lower maintenance cost, fewer flaky signals, and technical decisions connected to delivery risk.",
    career: "Strengthen staff-level influence by connecting implementation detail, platform thinking, and measurable business outcomes.",
    takeaway: "A technical recommendation, an adoption experiment, and language for aligning engineering leaders around quality investments.",
    organization: "Scalable automation decisions, lower maintenance risk, and clearer technical direction across teams.",
    personal: "Grow staff-level influence by connecting architecture choices with measurable delivery and quality outcomes.",
    metric: "Framework maintenance effort, CI feedback time, flake rate, platform adoption, or engineering hours recovered.",
  },
  manager: {
    label: "QA Manager",
    title: "For QA Managers",
    promise: "Build a practical plan for team capability, AI adoption, and quality outcomes—not just more test volume.",
    progression: "From activity to measurable outcomes",
    learn: "How peers prioritize AI and automation, measure progress, structure teams, manage change, and avoid adoption traps.",
    apply: "Refine your roadmap, choose metrics that matter, identify skill gaps, and set realistic guardrails for experimentation.",
    impact: "Better prioritization, clearer ROI conversations, stronger team development, and quality work tied to delivery goals.",
    career: "Grow as a people and strategy leader who can guide transformation while protecting trust, focus, and engineering standards.",
    takeaway: "A sharper roadmap, peer benchmarks, a team learning plan, and concrete ideas to discuss with engineering leadership.",
    organization: "A stronger quality roadmap, practical adoption metrics, and a clearer case for team investment.",
    personal: "Strengthen strategic leadership, change-management judgment, and the ability to connect team development with business goals.",
    metric: "Team throughput, feedback time, rework, adoption progress, skill coverage, or a pilot’s measurable result.",
  },
  leader: {
    label: "Engineering / Quality Leader",
    title: "For Engineering and Quality Leaders",
    promise: "See where modern quality creates leverage across delivery, customer trust, and engineering effectiveness.",
    progression: "From initiatives to operating capability",
    learn: "Operating models, risk signals, AI investment choices, quality ownership, and lessons from real organizational change.",
    apply: "Challenge assumptions, clarify ownership, sponsor the right experiments, and connect quality strategy to business priorities.",
    impact: "More reliable delivery decisions, stronger cross-functional accountability, and investment focused on durable capability.",
    career: "Expand your executive perspective, strengthen industry relationships, and lead quality as a business capability.",
    takeaway: "Decision criteria, peer insight, and a clearer narrative for how quality supports speed, resilience, and customer confidence.",
    organization: "Better investment decisions, shared quality ownership, and stronger links between delivery risk and business priorities.",
    personal: "Expand executive perspective and strengthen the ability to lead quality as an organization-wide business capability.",
    metric: "Cycle time, reliability or rework trends, customer-impacting defects, tool spend, or adoption of a sponsored improvement.",
  },
  early: {
    label: "Early-career QA Professional",
    title: "For Early-career QA Professionals",
    promise: "Build a clear map of the field, see real practices in action, and discover where your interests can take you.",
    progression: "From learning to career direction",
    learn: "The foundations of modern testing, automation, AI-assisted work, quality thinking, and how different QA roles operate.",
    apply: "Practice new techniques, improve how you explain bugs and risk, and identify one skill to develop next.",
    impact: "More confidence in day-to-day testing, better questions, stronger collaboration, and faster learning from experienced peers.",
    career: "Meet mentors and practitioners, understand possible career paths, and turn curiosity into a focused development plan.",
    takeaway: "A personal learning plan, practical notes, new community connections, and clearer next steps for your QA career.",
    organization: "Faster skill development, stronger day-to-day testing judgment, and practical learning shared with the team.",
    personal: "Build foundational confidence, understand career paths, and turn broad curiosity into a focused development plan.",
    metric: "Review corrections, task independence, onboarding progress, test-design quality, or time saved with one new technique.",
  },
}

const learningFormats = [
  { title: "Hands-on AI workshops", description: "Practice with tools, prompts, and workflows.", icon: BrainCircuit },
  { title: "Modern QA sessions", description: "Testing strategy, automation, quality, and risk.", icon: Lightbulb },
  { title: "Real implementation stories", description: "What worked, what failed, and what changed.", icon: Rocket },
  { title: "Community perspective", description: "Learn with practitioners at every level.", icon: Network },
]

const outcomeCards = [
  { key: "learn", title: "What you learn", icon: BrainCircuit },
  { key: "apply", title: "What you can apply", icon: Target },
  { key: "impact", title: "Your workplace impact", icon: BriefcaseBusiness },
  { key: "career", title: "Your career growth", icon: Rocket },
] as const

type ConferenceValueExplorerProps = {
  startingPrice: string
}

export function ConferenceValueExplorer({ startingPrice }: ConferenceValueExplorerProps) {
  const [selectedRole, setSelectedRole] = useState<RoleKey>("qa")
  const [copied, setCopied] = useState(false)
  const role = roleValues[selectedRole]

  const managerRequest = useMemo(() => `Subject: Request to attend Innovate QA 2027

Hi [Manager's name],

I’m requesting approval for the ${startingPrice} registration investment to attend Innovate QA 2027.

Why this matters for my growth:
${role.personal}

What the organization should receive:
${role.organization}

I will turn the learning into measurable follow-through by identifying three applicable practices, recommending one 30-day pilot, and sharing the results with the team. I’ll evaluate value through ${role.metric.toLowerCase()}

The registration can pay back if the learning helps recover team time, avoid a rework or escaped-defect cycle, or improve one tooling or process decision. Travel and accommodation, if needed, would be separate.

Thank you for considering my request.

Best,
[Your name]`, [role, startingPrice])

  async function copyManagerRequest() {
    try {
      await navigator.clipboard.writeText(managerRequest)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2500)
    } catch {
      setCopied(false)
    }
  }

  return (
    <section id="conference-value" aria-labelledby="conference-value-heading" className="mt-16 scroll-mt-24 overflow-hidden rounded-3xl border border-purple-200 bg-white shadow-xl shadow-purple-950/10">
      <div className="grid gap-8 bg-gradient-to-br from-purple-50 via-white to-fuchsia-50 px-6 py-8 md:px-10 md:py-10 lg:grid-cols-[1fr_19rem] lg:items-end">
        <div>
          <p className="text-sm font-bold uppercase tracking-wider text-purple-800">What will you take away?</p>
          <h2 id="conference-value-heading" className="mt-3 max-w-3xl text-3xl font-bold tracking-tight md:text-5xl">Learn it. Apply it. Bring the impact back.</h2>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-slate-700 md:text-lg">Practical AI workshops, real QA and testing sessions, and honest lessons from people doing the work—not generic inspiration.</p>
        </div>
        <label className="rounded-2xl border border-purple-200 bg-white/90 p-4 shadow-sm">
          <span className="block text-xs font-bold uppercase tracking-wider text-purple-800">Show value for my role</span>
          <select value={selectedRole} onChange={(event) => setSelectedRole(event.target.value as RoleKey)} className="mt-2 min-h-12 w-full rounded-lg border border-purple-300 bg-white px-3 text-base font-semibold text-slate-950 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-700">
            {(Object.entries(roleValues) as [RoleKey, RoleValue][]).map(([key, value]) => <option key={key} value={key}>{value.label}</option>)}
          </select>
        </label>
      </div>

      <div className="grid bg-purple-950 text-white sm:grid-cols-2 lg:grid-cols-4">
        {learningFormats.map(({ title, description, icon: Icon }) => (
          <div key={title} className="border-b border-white/15 p-5 last:border-b-0 sm:odd:border-r lg:border-b-0 lg:border-r lg:last:border-r-0">
            <h3 className="flex items-center gap-2 font-semibold"><Icon aria-hidden="true" className="size-5 text-purple-300" />{title}</h3>
            <p className="ml-7 mt-2 text-sm leading-relaxed text-purple-100">{description}</p>
          </div>
        ))}
      </div>

      <div aria-live="polite" className="px-6 py-8 md:px-10 md:py-10">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <h3 className="text-2xl font-bold text-purple-900">{role.title}</h3>
            <p className="mt-2 max-w-2xl leading-relaxed text-slate-600">{role.promise}</p>
          </div>
          <p className="w-fit shrink-0 rounded-full bg-purple-100 px-4 py-2 text-sm font-semibold text-purple-900">{role.progression}</p>
        </div>

        <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {outcomeCards.map(({ key, title, icon: Icon }, index) => (
            <article key={key} className="rounded-2xl border border-purple-100 bg-gradient-to-b from-white to-purple-50/50 p-5">
              <div className="flex items-center justify-between gap-3">
                <span className="flex size-10 items-center justify-center rounded-xl bg-purple-100 text-purple-800"><Icon aria-hidden="true" className="size-5" /></span>
                <span className="text-xs font-bold text-purple-400">0{index + 1}</span>
              </div>
              <h4 className="mt-4 font-bold">{title}</h4>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{role[key]}</p>
            </article>
          ))}
        </div>

        <div className="mt-5 flex items-start gap-4 rounded-2xl bg-gradient-to-r from-purple-950 via-purple-900 to-fuchsia-900 p-5 text-white">
          <ArrowRight aria-hidden="true" className="mt-1 size-6 shrink-0 text-purple-300" />
          <div><p className="text-xs font-bold uppercase tracking-wider text-purple-300">You return with</p><p className="mt-1 leading-relaxed text-purple-50">{role.takeaway}</p></div>
        </div>

        <details className="group mt-5 overflow-hidden rounded-2xl border border-purple-200 bg-purple-50/70">
          <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 font-bold text-purple-900 marker:hidden [&::-webkit-details-marker]:hidden">
            <span>Need approval? Build the case for your manager</span>
            <span aria-hidden="true" className="flex size-8 shrink-0 items-center justify-center rounded-full bg-purple-200 text-xl group-open:hidden">+</span>
            <span aria-hidden="true" className="hidden size-8 shrink-0 items-center justify-center rounded-full bg-purple-200 text-xl group-open:flex">−</span>
          </summary>
          <div className="grid gap-5 px-5 pb-5 lg:grid-cols-2">
            <div>
              <dl className="space-y-3">
                <div className="grid gap-1 rounded-xl bg-white/80 p-4 sm:grid-cols-[9rem_1fr]"><dt className="text-sm font-bold text-purple-900">Individual growth</dt><dd className="text-sm leading-relaxed text-slate-700">{role.personal}</dd></div>
                <div className="grid gap-1 rounded-xl bg-white/80 p-4 sm:grid-cols-[9rem_1fr]"><dt className="text-sm font-bold text-purple-900">Organization value</dt><dd className="text-sm leading-relaxed text-slate-700">{role.organization}</dd></div>
                <div className="grid gap-1 rounded-xl bg-white/80 p-4 sm:grid-cols-[9rem_1fr]"><dt className="text-sm font-bold text-purple-900">Measure in 30 days</dt><dd className="text-sm leading-relaxed text-slate-700">{role.metric}</dd></div>
              </dl>
              <div className="mt-3 rounded-xl bg-purple-950 p-4 text-white">
                <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-purple-300"><Presentation aria-hidden="true" className="size-4" />Financial value lens</p>
                <p className="mt-2 text-sm leading-relaxed text-purple-50">A {startingPrice} registration can pay back through recovered team time, avoided rework or escaped defects, or one better tooling decision. Measure the selected improvement against the cost.</p>
              </div>
              <div className="mt-3 flex flex-wrap gap-2 text-xs font-semibold text-purple-900">
                {["3 applicable practices", "1 thirty-day pilot", "1 team share-out"].map((item) => <span key={item} className="rounded-full bg-purple-200 px-3 py-2">{item}</span>)}
              </div>
            </div>

            <div className="rounded-xl bg-white p-5 shadow-sm">
              <p className="text-xs font-bold uppercase tracking-wider text-purple-800">Ready-to-send request</p>
              <pre className="mt-3 max-h-80 overflow-auto whitespace-pre-wrap font-sans text-sm leading-6 text-slate-700">{managerRequest}</pre>
              <Button type="button" onClick={copyManagerRequest} className="mt-4 min-h-11 w-full bg-purple-800 text-white hover:bg-purple-900">
                {copied ? <Check aria-hidden="true" className="size-4" /> : <Copy aria-hidden="true" className="size-4" />}
                {copied ? "Request copied" : "Copy manager request"}
              </Button>
            </div>
          </div>
        </details>
      </div>
    </section>
  )
}
