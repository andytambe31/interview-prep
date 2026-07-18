import React, { useMemo, useState, useEffect, useRef } from 'react'
import { useStore } from '../store/StoreContext.jsx'
import { PageHeader, ProgressBar, ConfidenceDots, DifficultyBadge, StatusBadge } from './common.jsx'
import { highYield } from '../data/insights.js'
import { patternsFor } from '../data/patterns.js'
import { DSA_SPRINT_ORDER, LLD_TOPIC } from '../lib/focus.js'

const STATUS_CYCLE = { todo: 'attempted', attempted: 'solved', solved: 'todo' }

// Ordered weak/hard first (trees, graphs …) to match the personalized sprint.
const DSA_TOPICS = DSA_SPRINT_ORDER

export default function Coding() {
  const { state, dispatch } = useStore()
  // LLD/OOD lives in its own section — Coding is DSA only.
  const problems = state.coding.problems.filter((p) => p.topic !== LLD_TOPIC)
  const focusTopic = state.ui.codingTopic

  const [query, setQuery] = useState('')
  const [difficulty, setDifficulty] = useState('All')
  const [freqOnly, setFreqOnly] = useState(false)
  const [neetOnly, setNeetOnly] = useState(false)
  const [hideSolved, setHideSolved] = useState(false)
  const [open, setOpen] = useState(() => (focusTopic ? { [focusTopic]: true } : {}))
  const [expanded, setExpanded] = useState(null)
  const focusRef = useRef(null)

  // When arriving with a focus topic, open it and scroll to it once.
  useEffect(() => {
    if (focusTopic) {
      setOpen((o) => ({ ...o, [focusTopic]: true }))
      const t = setTimeout(() => focusRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 150)
      return () => clearTimeout(t)
    }
  }, [focusTopic])

  const solved = problems.filter((p) => p.status === 'solved').length

  const matches = (p) => {
    if (difficulty !== 'All' && p.difficulty !== difficulty) return false
    if (freqOnly && p.freq !== 'high') return false
    if (neetOnly && !p.neet) return false
    if (hideSolved && p.status === 'solved') return false
    if (query && !p.title.toLowerCase().includes(query.toLowerCase())) return false
    return true
  }

  const groups = useMemo(() => {
    return DSA_TOPICS
      .map((topic) => {
        const all = problems.filter((p) => p.topic === topic)
        const shown = all.filter(matches)
        const done = all.filter((p) => p.status === 'solved').length
        return { topic, all, shown, done }
      })
      .filter((g) => g.all.length > 0)
  }, [problems, query, difficulty, freqOnly, neetOnly, hideSolved])

  const cycleStatus = (p) => dispatch({ type: 'UPDATE_PROBLEM', id: p.id, patch: { status: STATUS_CYCLE[p.status] } })
  const anyFilter = query || difficulty !== 'All' || freqOnly || neetOnly || hideSolved

  return (
    <div>
      <PageHeader
        kicker="Coding"
        title="Work the patterns, not just the problems"
        intro="The NeetCode 150 (pattern-based) with an Amazon frequency overlay, grouped by pattern and ordered to your weak spots first. Click “Learn” on any problem to see the pattern behind it — how to recognize it and the reusable template. Tap a status chip to move a problem To do → Attempted → Solved."
      />

      {/* Must-do */}
      <div className="mb-8 rounded-2xl border border-line bg-surface p-5">
        <div className="kicker mb-3">If you only do 15 — do these</div>
        <div className="flex flex-wrap gap-2">
          {highYield.map((t) => {
            const solvedHere = problems.some((p) => p.title.startsWith(t.split('/')[0]) && p.status === 'solved')
            return (
              <span
                key={t}
                className={`pill ${solvedHere ? 'bg-sage-100 text-sage-600' : 'bg-paper text-muted border border-line'}`}
              >
                {solvedHere ? '✓ ' : ''}
                {t}
              </span>
            )
          })}
        </div>
      </div>

      {/* Overall + filters */}
      <div className="mb-6">
        <div className="mb-2 flex items-baseline justify-between">
          <span className="font-serif text-lg">Overall progress</span>
          <span className="text-sm text-muted">
            {solved} / {problems.length} solved
          </span>
        </div>
        <ProgressBar value={solved} max={problems.length} tone="sage" />
      </div>

      <div className="mb-8 flex flex-wrap items-center gap-2">
        <input className="input max-w-[16rem]" placeholder="Search problems…" value={query} onChange={(e) => setQuery(e.target.value)} />
        <select className="input max-w-[8rem]" value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
          {['All', 'Easy', 'Medium', 'Hard'].map((d) => (
            <option key={d}>{d}</option>
          ))}
        </select>
        <label className="pill cursor-pointer border border-line bg-surface text-muted">
          <input type="checkbox" className="mr-1" checked={freqOnly} onChange={(e) => setFreqOnly(e.target.checked)} />
          High-frequency
        </label>
        <label className="pill cursor-pointer border border-line bg-surface text-muted">
          <input type="checkbox" className="mr-1" checked={neetOnly} onChange={(e) => setNeetOnly(e.target.checked)} />
          NeetCode 150
        </label>
        <label className="pill cursor-pointer border border-line bg-surface text-muted">
          <input type="checkbox" className="mr-1" checked={hideSolved} onChange={(e) => setHideSolved(e.target.checked)} />
          Hide solved
        </label>
        {focusTopic && (
          <button className="btn-quiet ml-auto text-xs" onClick={() => dispatch({ type: 'SET_UI', patch: { codingTopic: null } })}>
            Clear focus on {focusTopic}
          </button>
        )}
      </div>

      {/* Topic groups */}
      <div className="space-y-3">
        {groups.map((g) => {
          const isFocus = g.topic === focusTopic
          const isOpen = open[g.topic] ?? false
          const visible = anyFilter ? g.shown : g.all
          if (anyFilter && g.shown.length === 0) return null
          return (
            <div
              key={g.topic}
              ref={isFocus ? focusRef : null}
              className={`overflow-hidden rounded-2xl border bg-surface ${isFocus ? 'border-clay-300 ring-2 ring-clay-500/10' : 'border-line'}`}
            >
              <button
                className="flex w-full items-center gap-3 px-5 py-4 text-left"
                onClick={() => setOpen((o) => ({ ...o, [g.topic]: !isOpen }))}
              >
                <span className="min-w-0 flex-1">
                  <span className="flex items-center gap-2">
                    <span className="font-serif text-lg">{g.topic}</span>
                    {isFocus && <span className="pill bg-clay-50 text-clay-700">Focus</span>}
                  </span>
                  <span className="mt-1 flex items-center gap-3">
                    <ProgressBar value={g.done} max={g.all.length} tone="sage" className="max-w-[180px]" />
                    <span className="text-xs text-faint">
                      {g.done}/{g.all.length}
                    </span>
                  </span>
                </span>
                <span className="text-faint">{isOpen ? '−' : '+'}</span>
              </button>

              {isOpen && (
                <div className="divide-y divide-line border-t border-line">
                  {visible.map((p) => (
                    <div key={p.id}>
                      <div className="flex flex-wrap items-center gap-3 px-5 py-3">
                        <button onClick={() => cycleStatus(p)} title="Cycle: To do → Attempted → Solved" className="shrink-0">
                          <StatusBadge status={p.status} />
                        </button>
                        <span className="min-w-0 flex-1">
                          <span className="flex items-center gap-2">
                            {p.url ? (
                              <a href={p.url} target="_blank" rel="noreferrer" className="truncate font-medium hover:text-clay-600 hover:underline">
                                {p.title}
                              </a>
                            ) : (
                              <span className="truncate font-medium">{p.title}</span>
                            )}
                            {p.freq === 'high' && <span className="pill bg-clay-50 text-clay-700">high freq</span>}
                          </span>
                        </span>
                        <DifficultyBadge level={p.difficulty} />
                        <ConfidenceDots value={p.confidence} onChange={(v) => dispatch({ type: 'UPDATE_PROBLEM', id: p.id, patch: { confidence: v } })} />
                        <button className="btn-quiet px-2 text-xs" onClick={() => setExpanded(expanded === p.id ? null : p.id)}>
                          {expanded === p.id ? 'Hide' : 'Learn'}
                        </button>
                      </div>
                      {expanded === p.id && (
                        <div className="space-y-4 px-5 pb-5">
                          {patternsFor(p).map((pat) => (
                            <PatternGuide key={pat.name} pat={pat} />
                          ))}
                          <div>
                            <div className="kicker mb-1">Your notes</div>
                            <textarea
                              className="input min-h-[70px]"
                              placeholder="Your own take, gotchas, the trick to remember…"
                              value={p.notes}
                              onChange={(e) => dispatch({ type: 'UPDATE_PROBLEM', id: p.id, patch: { notes: e.target.value } })}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

function PatternGuide({ pat }) {
  const Row = ({ label, children }) => (
    <div>
      <div className="kicker mb-1">{label}</div>
      <div className="text-[15px] leading-relaxed text-ink/90">{children}</div>
    </div>
  )
  return (
    <div className="rounded-xl border border-clay-200 bg-clay-50/40 p-4">
      <div className="mb-3 font-serif text-lg text-clay-700">Pattern · {pat.name}</div>
      <div className="space-y-3">
        <Row label="How to recognize it">{pat.recognize}</Row>
        <Row label="The core idea">{pat.idea}</Row>
        <Row label="The template">
          <ol className="list-decimal space-y-1 pl-5">
            {pat.template.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ol>
        </Row>
        <div className="grid gap-3 sm:grid-cols-2">
          <Row label="Complexity">{pat.complexity}</Row>
          <Row label="Common pitfalls">
            <ul className="list-disc space-y-1 pl-5">
              {pat.pitfalls.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ul>
          </Row>
        </div>
        {pat.examples?.length > 0 && (
          <div className="text-xs text-faint">Also uses this pattern: {pat.examples.join(' · ')}</div>
        )}
      </div>
    </div>
  )
}
