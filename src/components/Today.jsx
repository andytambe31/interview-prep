import React from 'react'
import { useStore } from '../store/StoreContext.jsx'
import { buildPlan, readiness, daysUntil, interviewDate, formatDate } from '../lib/focus.js'
import { ProgressBar } from './common.jsx'

const KIND_LABEL = {
  read: 'Read',
  practice: 'Practice',
  story: 'Write',
  logistics: 'Prepare',
}

export default function Today({ onNavigate }) {
  const { state, dispatch } = useStore()
  const plan = buildPlan(state)
  const r = readiness(state)
  const days = daysUntil(interviewDate(state))
  const date = interviewDate(state)
  const firstName = state.candidate.name.split(' ')[0]

  const focus = plan[0]
  const upNext = plan.slice(1, 4)

  const goStep = (step) => {
    if (!step?.cta) return
    if (step.cta.topic) dispatch({ type: 'SET_UI', patch: { codingTopic: step.cta.topic } })
    onNavigate(step.cta.route)
  }

  const goPlan = () => {
    onNavigate('loop')
    setTimeout(() => document.getElementById('plan')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 250)
  }

  const greeting =
    days === null
      ? `Let’s get you ready, ${firstName}.`
      : days > 1
        ? `${days} days until your loop, ${firstName}.`
        : days === 1
          ? `Tomorrow’s the day, ${firstName}.`
          : days === 0
            ? `Today’s the day, ${firstName}. You’ve got this.`
            : `Hope the loop went well, ${firstName}.`

  return (
    <div>
      {/* Greeting */}
      <div className="mb-10">
        <div className="kicker mb-2">
          {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
        </div>
        <h1 className="max-w-prose text-3xl font-semibold leading-tight md:text-[2.6rem]">{greeting}</h1>
        {date && (
          <p className="mt-3 meta">
            {state.candidate.company} · {state.candidate.role} ·{' '}
            {state.schedule.chosen.date ? `confirmed for ${formatDate(date)}` : `first available ${formatDate(date)}`}
          </p>
        )}
        <div className="mt-4 flex flex-wrap gap-2">
          <button className="btn-soft" onClick={goPlan}>
            📋 View study plan
          </button>
          <button className="btn-outline" onClick={() => onNavigate('coding')}>
            Start practicing →
          </button>
        </div>
      </div>

      {/* Focus now */}
      {focus ? (
        <section className="surface overflow-hidden shadow-soft">
          <div className="border-l-4 border-clay-500 p-6 md:p-8">
            <div className="kicker mb-3 flex items-center gap-2">
              <span>Focus now</span>
              {focus.minutes && <span className="font-normal normal-case tracking-normal text-faint">· about {focus.minutes} min</span>}
            </div>
            <h2 className="text-2xl font-semibold leading-snug">{focus.title}</h2>
            {focus.detail && <p className="mt-2 max-w-prose text-[15px] leading-relaxed text-ink/80">{focus.detail}</p>}
            <p className="mt-4 max-w-prose text-sm italic text-muted">{focus.why}</p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <button className="btn-primary" onClick={() => goStep(focus)}>
                {focus.cta.label} →
              </button>
              {focus.check && (
                <button
                  className="btn-quiet"
                  onClick={() => dispatch({ type: 'SET_CHECK', id: focus.check, value: true })}
                >
                  Mark as done
                </button>
              )}
            </div>
          </div>
        </section>
      ) : (
        <section className="surface p-8 text-center shadow-soft">
          <h2 className="text-2xl font-semibold">You’re in great shape 🎉</h2>
          <p className="mx-auto mt-2 max-w-prose text-muted">
            You’ve worked through the core plan. Keep reviewing your weak spots and rehearsing stories out loud.
          </p>
        </section>
      )}

      {/* Up next */}
      {upNext.length > 0 && (
        <section className="mt-8">
          <div className="kicker mb-3">Up next</div>
          <div className="divide-y divide-line rounded-2xl border border-line bg-surface">
            {upNext.map((step) => (
              <button
                key={step.id}
                onClick={() => goStep(step)}
                className="flex w-full items-center gap-4 px-5 py-4 text-left transition hover:bg-paper"
              >
                <span className="pill w-20 shrink-0 justify-center bg-paper text-faint">{KIND_LABEL[step.kind] || 'Next'}</span>
                <span className="min-w-0 flex-1">
                  <span className="block font-medium">{step.title}</span>
                  {step.detail && <span className="block truncate text-sm text-muted">{step.detail}</span>}
                </span>
                <span className="shrink-0 text-faint">→</span>
              </button>
            ))}
          </div>
        </section>
      )}

      {/* Quiet readiness */}
      <section className="mt-10">
        <div className="kicker mb-4">Where you stand</div>
        <div className="grid gap-8 sm:grid-cols-2">
          <ReadinessRow
            label="Coding"
            lead={`${r.coding.solved} of ${r.coding.total} solved`}
            sub={`${r.codingHigh.solved}/${r.codingHigh.total} high-frequency`}
            value={r.coding.solved}
            max={r.coding.total}
            onClick={() => onNavigate('coding')}
          />
          <ReadinessRow
            label="Behavioral stories"
            lead={`${r.behavioral.covered} of ${r.behavioral.total} core principles covered`}
            sub={`${r.behavioral.stories} stories in your bank`}
            value={r.behavioral.covered}
            max={r.behavioral.total}
            tone="sage"
            onClick={() => onNavigate('behavioral')}
          />
          <ReadinessRow
            label="Low-level design"
            lead={`${r.lld.solved} of ${r.lld.total} rehearsed`}
            sub="Object-oriented design prompts"
            value={r.lld.solved}
            max={r.lld.total}
            onClick={() => onNavigate('lld')}
          />
        </div>
      </section>
    </div>
  )
}

function ReadinessRow({ label, lead, sub, value, max, tone, onClick }) {
  return (
    <button onClick={onClick} className="group text-left">
      <div className="flex items-baseline justify-between">
        <span className="font-serif text-lg">{label}</span>
        <span className="text-sm text-muted group-hover:text-clay-600">{lead}</span>
      </div>
      <ProgressBar value={value} max={max} tone={tone} className="mt-2" />
      <div className="mt-1.5 text-xs text-faint">{sub}</div>
    </button>
  )
}
