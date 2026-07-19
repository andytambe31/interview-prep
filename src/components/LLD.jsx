import React, { useState } from 'react'
import { useStore } from '../store/StoreContext.jsx'
import { PageHeader, ProgressBar, ConfidenceDots, DifficultyBadge, StatusBadge } from './common.jsx'
import { lldProblems } from '../data/lld.js'
import { lldRound } from '../data/insights.js'
import {
  whatIsLLD,
  oopPillars,
  solid,
  supporting,
  relationships,
  patterns as lldPatterns,
  approach as lldApproach,
  beginnerMistakes,
  learningOrder,
  resources as lldResources,
} from '../data/lldFundamentals.js'

const STATUS_CYCLE = { todo: 'attempted', attempted: 'solved', solved: 'todo' }
const LLD_TOPIC = 'Object-Oriented Design'

function Detail({ title, children }) {
  return (
    <div>
      <div className="kicker mb-1">{title}</div>
      {children}
    </div>
  )
}
const List = ({ items }) => (
  <ul className="space-y-1.5 text-[15px] text-ink/90">
    {items.map((it, i) => (
      <li key={i} className="flex gap-2">
        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-clay-300" />
        <span>{it}</span>
      </li>
    ))}
  </ul>
)

export default function LLD() {
  const { state, dispatch } = useStore()
  // Tracking lives on the coding problems under the OOD topic; join by id.
  const tracked = state.coding.problems.filter((p) => p.topic === LLD_TOPIC)
  const byId = Object.fromEntries(tracked.map((p) => [p.id, p]))
  const solved = tracked.filter((p) => p.status === 'solved').length

  const [open, setOpen] = useState(null)

  const cycle = (p) => p && dispatch({ type: 'UPDATE_PROBLEM', id: p.id, patch: { status: STATUS_CYCLE[p.status] } })

  return (
    <div>
      <PageHeader
        kicker="Low-Level Design"
        title="Design problems from real SDE I loops"
        intro="The object-oriented design prompts most reported in Amazon new-grad loops — each worked out: what to clarify, the core classes, the patterns to reach for, the key APIs, and how to extend it. Rehearse talking through one end-to-end."
      />

      {/* Start-here primer */}
      <Primer />

      {/* Progress */}
      <div className="mb-6">
        <div className="mb-2 flex items-baseline justify-between">
          <span className="font-serif text-lg">Your LLD progress</span>
          <span className="text-sm text-muted">{solved} / {tracked.length} rehearsed</span>
        </div>
        <ProgressBar value={solved} max={tracked.length} tone="sage" />
      </div>

      {/* Problems */}
      <div className="space-y-3">
        {lldProblems.map((prob) => {
          const t = byId[prob.id]
          const isOpen = open === prob.id
          return (
            <div key={prob.id} className="overflow-hidden rounded-2xl border border-line bg-surface">
              <div className="flex flex-wrap items-center gap-3 px-5 py-4">
                {t && (
                  <button onClick={() => cycle(t)} title="Cycle: To do → Attempted → Solved" className="shrink-0">
                    <StatusBadge status={t.status} />
                  </button>
                )}
                <button className="min-w-0 flex-1 text-left" onClick={() => setOpen(isOpen ? null : prob.id)}>
                  <span className="flex flex-wrap items-center gap-2">
                    <span className="font-serif text-lg">{prob.title}</span>
                    {prob.freq === 'high' && <span className="pill bg-clay-50 text-clay-700">high freq</span>}
                    {prob.reported && <span className="pill bg-sage-100 text-sage-600">peer-reported</span>}
                  </span>
                  <span className="mt-1 flex flex-wrap gap-1.5">
                    {prob.patterns.map((pat) => (
                      <span key={pat} className="pill border border-line bg-paper text-muted">{pat}</span>
                    ))}
                  </span>
                </button>
                <DifficultyBadge level={prob.difficulty} />
                {t && <ConfidenceDots value={t.confidence} onChange={(v) => dispatch({ type: 'UPDATE_PROBLEM', id: t.id, patch: { confidence: v } })} />}
                <button className="btn-quiet px-2 text-sm" onClick={() => setOpen(isOpen ? null : prob.id)}>
                  {isOpen ? 'Hide' : 'Study'}
                </button>
              </div>

              {isOpen && (
                <div className="space-y-5 border-t border-line px-5 py-5">
                  {prob.keyInsight && (
                    <p className="rounded-xl bg-clay-50 px-4 py-3 text-[15px] text-clay-700">
                      <span className="font-semibold">Key insight — </span>
                      {prob.keyInsight}
                    </p>
                  )}
                  <Detail title="Clarify / requirements">
                    <List items={prob.requirements} />
                  </Detail>
                  <Detail title="Core classes">
                    <ul className="space-y-1.5 text-[15px] text-ink/90">
                      {prob.entities.map((e, i) => (
                        <li key={i} className="flex gap-2">
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-clay-300" />
                          <span>
                            <span className="font-medium text-ink">{e.name}</span>
                            {e.note && <span className="text-muted"> — {e.note}</span>}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </Detail>
                  <Detail title="Relationships">
                    <p className="text-[15px] text-ink/90">{prob.relationships}</p>
                  </Detail>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Detail title="Key APIs">
                      <ul className="space-y-1 font-mono text-[13px] text-ink/85">
                        {prob.apis.map((a, i) => (
                          <li key={i} className="rounded-lg bg-paper px-2 py-1">{a}</li>
                        ))}
                      </ul>
                    </Detail>
                    <Detail title="Design patterns">
                      <div className="flex flex-wrap gap-1.5">
                        {prob.patterns.map((pat) => (
                          <span key={pat} className="pill bg-clay-50 text-clay-700">{pat}</span>
                        ))}
                      </div>
                    </Detail>
                  </div>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Detail title="Edge cases">
                      <List items={prob.edgeCases} />
                    </Detail>
                    <Detail title="Extensibility">
                      <List items={prob.extensibility} />
                    </Detail>
                  </div>
                  {t && (
                    <Detail title="Your notes">
                      <textarea
                        className="input min-h-[70px]"
                        placeholder="Your own class sketch, the pattern that clicked, what tripped you up…"
                        value={t.notes}
                        onChange={(e) => dispatch({ type: 'UPDATE_PROBLEM', id: t.id, patch: { notes: e.target.value } })}
                      />
                    </Detail>
                  )}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

function Fold({ title, children, defaultOpen = false }) {
  const [o, setO] = useState(defaultOpen)
  return (
    <div className="border-t border-line first:border-t-0">
      <button className="flex w-full items-center justify-between py-3 text-left" onClick={() => setO(!o)}>
        <span className="font-medium text-ink">{title}</span>
        <span className="text-faint">{o ? '−' : '+'}</span>
      </button>
      {o && <div className="pb-4">{children}</div>}
    </div>
  )
}

function Primer() {
  return (
    <div className="mb-8 rounded-2xl border border-clay-200 bg-clay-50/40 p-5">
      <div className="kicker mb-1">New to LLD? Start here</div>
      <p className="mb-2 max-w-prose text-[15px] leading-relaxed text-ink/90">{whatIsLLD}</p>
      <p className="mb-2 max-w-prose text-sm text-muted">{learningOrder}</p>

      <div className="mt-2">
        <Fold title="The 4 OOP pillars" defaultOpen>
          <ul className="space-y-2 text-[15px] text-ink/90">
            {oopPillars.map((p) => (
              <li key={p.name}>
                <span className="font-medium text-ink">{p.name}</span> — <span className="text-muted">{p.what}</span>
              </li>
            ))}
          </ul>
        </Fold>

        <Fold title="SOLID principles">
          <div className="space-y-2">
            {solid.map((s) => (
              <div key={s.letter} className="text-[15px]">
                <span className="font-serif text-lg text-clay-600">{s.letter}</span>{' '}
                <span className="font-medium text-ink">{s.name}</span> — <span className="text-muted">{s.idea}</span>
                <div className="pl-5 text-sm text-faint">smell: {s.smell}</div>
              </div>
            ))}
            <p className="mt-2 text-sm text-muted">{supporting}</p>
          </div>
        </Fold>

        <Fold title="UML relationships (is-a vs has-a)">
          <ul className="space-y-1.5 text-[15px] text-ink/90">
            {relationships.map((r) => (
              <li key={r.name}>
                <span className="font-medium text-ink">{r.name}</span> — <span className="text-muted">{r.meaning}</span>{' '}
                <span className="text-faint">e.g. {r.example}</span>
              </li>
            ))}
          </ul>
        </Fold>

        <Fold title="Design patterns that show up in LLD">
          <div className="space-y-4">
            {Object.entries(lldPatterns).map(([group, list]) => (
              <div key={group}>
                <div className="kicker mb-1">{group}</div>
                <ul className="space-y-1.5 text-[15px] text-ink/90">
                  {list.map((pat) => (
                    <li key={pat.name}>
                      <span className="font-medium text-ink">{pat.name}</span> — {pat.oneLiner}{' '}
                      <span className="text-faint">Use when: {pat.useWhen}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Fold>

        <Fold title="How to attack a question (~40 min)">
          <ol className="list-decimal space-y-1.5 pl-5 text-[15px] text-ink/90">
            {lldApproach.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ol>
          <p className="mt-3 rounded-xl bg-surface px-4 py-3 text-sm text-muted">{lldRound.evaluates}</p>
        </Fold>

        <Fold title="Beginner mistakes to avoid">
          <List items={beginnerMistakes} />
        </Fold>

        <Fold title="Where to learn more">
          <ul className="space-y-1.5 text-[15px]">
            {lldResources.map((r) => (
              <li key={r.title}>
                <a href={r.url} target="_blank" rel="noreferrer" className="font-medium text-clay-600 hover:underline">
                  {r.title}
                </a>{' '}
                <span className="text-faint">— {r.note}</span>
              </li>
            ))}
          </ul>
        </Fold>
      </div>
    </div>
  )
}
