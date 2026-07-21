import React, { useMemo, useState } from 'react'
import { useStore } from '../store/StoreContext.jsx'
import { PageHeader, ConfidenceDots, Empty } from './common.jsx'
import { rehearseIntro, codingStages, lldStages, totalMinutes } from '../data/rehearsal.js'
import { lldProblems } from '../data/lld.js'
import { LLD_TOPIC } from '../lib/focus.js'

function fmtDur(secs) {
  const m = Math.round((secs || 0) / 60)
  return m < 1 ? '<1 min' : `${m} min`
}
function fmtDate(iso) {
  try {
    return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  } catch {
    return ''
  }
}

export default function Rehearse() {
  const { state, dispatch } = useStore()
  const start = (kind, id, title) => dispatch({ type: 'SET_UI', patch: { rehearseSession: { kind, id, title } } })

  const codingProblems = state.coding.problems.filter((p) => p.topic !== LLD_TOPIC)
  const [codingPick, setCodingPick] = useState('')
  const [lldPick, setLldPick] = useState('')

  // Flatten every attempt across problems, newest first; note in-progress drafts.
  const { attempts, drafts } = useMemo(() => {
    const attempts = []
    const drafts = []
    for (const [key, rec] of Object.entries(state.rehearsals || {})) {
      for (const a of rec.history || []) attempts.push({ ...a, key })
      if (rec.draft) {
        const [kind] = key.split(':')
        drafts.push({ key, kind, title: rec.draft.title, stage: rec.draft.stage ?? 0 })
      }
    }
    attempts.sort((a, b) => (a.at < b.at ? 1 : -1))
    return { attempts, drafts }
  }, [state.rehearsals])

  // A draft may predate storing its title; recover it from the picker lists.
  const titleFor = (kind, id) => {
    if (kind === 'lld') return lldProblems.find((p) => p.id === id)?.title || id
    return state.coding.problems.find((p) => p.id === id)?.title || id
  }

  return (
    <div>
      <PageHeader
        kicker="Rehearse"
        title="Run the interview, not just the problem"
        intro={rehearseIntro}
      />

      {/* Launchers */}
      <div className="mb-8 grid gap-4 sm:grid-cols-2">
        <Launcher
          label="Coding rehearsal"
          minutes={totalMinutes('coding')}
          tone="sage"
          value={codingPick}
          onChange={setCodingPick}
          onStart={() => {
            const p = codingProblems.find((x) => x.id === codingPick)
            if (p) start('coding', p.id, p.title)
          }}
          options={codingProblems.map((p) => ({ id: p.id, label: p.title, done: p.status === 'solved' }))}
        />
        <Launcher
          label="LLD rehearsal"
          minutes={totalMinutes('lld')}
          tone="clay"
          value={lldPick}
          onChange={setLldPick}
          onStart={() => {
            const p = lldProblems.find((x) => x.id === lldPick)
            if (p) start('lld', p.id, p.title)
          }}
          options={lldProblems.map((p) => ({ id: p.id, label: p.title }))}
        />
      </div>

      {/* Resume in-progress drafts */}
      {drafts.length > 0 && (
        <div className="mb-8">
          <div className="kicker mb-2">In progress — pick up where you left off</div>
          <div className="flex flex-wrap gap-2">
            {drafts.map((d) => {
              const id = d.key.split(':').slice(1).join(':')
              const title = d.title || titleFor(d.kind, id)
              return (
                <button
                  key={d.key}
                  className="pill border border-clay-300 bg-clay-50 text-clay-700"
                  onClick={() => start(d.kind, id, title)}
                >
                  ▶ {title} <span className="text-clay-600/70">· stage {d.stage + 1}</span>
                </button>
              )
            })}
          </div>
        </div>
      )}

      {/* The process reference */}
      <div className="mb-8 space-y-3">
        <StageList title="The coding flow" subtitle={`~${totalMinutes('coding')} min`} stages={codingStages} defaultOpen />
        <StageList title="The LLD flow" subtitle={`~${totalMinutes('lld')} min`} stages={lldStages} />
      </div>

      {/* History */}
      <section className="rule pt-8">
        <h2 className="mb-3 text-2xl font-semibold">Your attempts</h2>
        {attempts.length === 0 ? (
          <Empty>No rehearsals yet. Pick a problem above and run it end-to-end — your attempts and self-ratings will collect here so you can watch yourself improve.</Empty>
        ) : (
          <div className="space-y-2">
            {attempts.map((a) => {
              const id = a.problemId || a.key.split(':').slice(1).join(':')
              const title = a.title || titleFor(a.kind, id)
              return (
                <div key={a.id} className="flex flex-wrap items-center gap-3 rounded-xl border border-line bg-surface px-4 py-3">
                  <span className={`pill ${a.kind === 'lld' ? 'bg-clay-50 text-clay-700' : 'bg-sage-100 text-sage-600'}`}>
                    {a.kind === 'lld' ? 'LLD' : 'Coding'}
                  </span>
                  <span className="min-w-0 flex-1 truncate font-medium">{title}</span>
                  {a.rating > 0 && <ConfidenceDots value={a.rating} />}
                  <span className="text-xs text-faint">{fmtDur(a.durationSec)} · {fmtDate(a.at)}</span>
                  <button
                    className="btn-quiet px-2 text-xs"
                    onClick={() => start(a.kind, id, title)}
                    title="Run this problem again"
                  >
                    Redo
                  </button>
                </div>
              )
            })}
          </div>
        )}
      </section>
    </div>
  )
}

function Launcher({ label, minutes, tone, value, onChange, onStart, options }) {
  const accent = tone === 'clay' ? 'text-clay-700' : 'text-sage-600'
  return (
    <div className="rounded-2xl border border-line bg-surface p-5">
      <div className="mb-1 flex items-baseline justify-between">
        <span className={`font-serif text-lg ${accent}`}>{label}</span>
        <span className="text-xs text-faint">~{minutes} min</span>
      </div>
      <p className="mb-3 text-sm text-muted">Pick a problem and walk it through every stage under a timer.</p>
      <div className="flex gap-2">
        <select className="input min-w-0 flex-1" value={value} onChange={(e) => onChange(e.target.value)}>
          <option value="">Choose a problem…</option>
          {options.map((o) => (
            <option key={o.id} value={o.id}>
              {o.done ? '✓ ' : ''}
              {o.label}
            </option>
          ))}
        </select>
        <button className="btn-primary px-4 text-sm disabled:opacity-40" onClick={onStart} disabled={!value}>
          Start
        </button>
      </div>
    </div>
  )
}

function StageList({ title, subtitle, stages, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-surface">
      <button className="flex w-full items-center gap-3 px-5 py-4 text-left" onClick={() => setOpen(!open)}>
        <span className="flex-1">
          <span className="font-serif text-lg">{title}</span>
          <span className="ml-2 text-xs text-faint">{subtitle}</span>
        </span>
        <span className="text-faint">{open ? '−' : '+'}</span>
      </button>
      {open && (
        <ol className="divide-y divide-line border-t border-line">
          {stages.map((s, i) => (
            <li key={s.id} className="flex gap-4 px-5 py-4">
              <span className="font-serif text-xl text-clay-500">{i + 1}</span>
              <div className="min-w-0">
                <div className="flex items-baseline gap-2">
                  <span className="font-medium text-ink">{s.title}</span>
                  <span className="text-xs text-faint">~{s.minutes} min</span>
                </div>
                <p className="mt-0.5 text-sm text-ink/90">{s.do}</p>
                <p className="mt-1 text-sm text-clay-600">Scored: {s.signal}</p>
              </div>
            </li>
          ))}
        </ol>
      )}
    </div>
  )
}
