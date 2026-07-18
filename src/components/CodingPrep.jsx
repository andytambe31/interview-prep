import React, { useMemo, useState } from 'react'
import { useStore } from '../store/StoreContext.jsx'
import {
  SectionHeader,
  ProgressBar,
  ConfidenceDots,
  DifficultyBadge,
  StatusBadge,
  Empty,
} from './common.jsx'
import { seedCodingTopics } from '../data/seed.js'

const STATUS_CYCLE = { todo: 'attempted', attempted: 'solved', solved: 'todo' }

export default function CodingPrep() {
  const { state, dispatch } = useStore()
  const problems = state.coding.problems

  const [topic, setTopic] = useState('All')
  const [difficulty, setDifficulty] = useState('All')
  const [status, setStatus] = useState('All')
  const [freqOnly, setFreqOnly] = useState(false)
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    return problems.filter((p) => {
      if (topic !== 'All' && p.topic !== topic) return false
      if (difficulty !== 'All' && p.difficulty !== difficulty) return false
      if (status !== 'All' && p.status !== status) return false
      if (freqOnly && p.freq !== 'high') return false
      if (query && !p.title.toLowerCase().includes(query.toLowerCase())) return false
      return true
    })
  }, [problems, topic, difficulty, status, freqOnly, query])

  const solved = problems.filter((p) => p.status === 'solved').length

  // Per-topic progress summary
  const byTopic = useMemo(() => {
    const map = {}
    for (const p of problems) {
      if (!map[p.topic]) map[p.topic] = { total: 0, solved: 0 }
      map[p.topic].total++
      if (p.status === 'solved') map[p.topic].solved++
    }
    return map
  }, [problems])

  const cycleStatus = (p) => dispatch({ type: 'UPDATE_PROBLEM', id: p.id, patch: { status: STATUS_CYCLE[p.status] } })
  const setConfidence = (p, v) => dispatch({ type: 'UPDATE_PROBLEM', id: p.id, patch: { confidence: v } })
  const setNotes = (p, v) => dispatch({ type: 'UPDATE_PROBLEM', id: p.id, patch: { notes: v } })

  const [expanded, setExpanded] = useState(null)

  return (
    <div>
      <SectionHeader
        title="Coding Prep"
        subtitle={`${solved}/${problems.length} solved · high-frequency Amazon SDE-I set, grouped by topic`}
        right={
          <label className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
            <input type="checkbox" checked={freqOnly} onChange={(e) => setFreqOnly(e.target.checked)} />
            High-frequency only
          </label>
        }
      />

      {/* Topic progress chips */}
      <div className="card mb-4">
        <div className="mb-3 flex items-center justify-between text-sm">
          <span className="font-medium text-slate-700 dark:text-slate-200">Overall</span>
          <span className="text-slate-500">{Math.round((solved / problems.length) * 100)}%</span>
        </div>
        <ProgressBar value={solved} max={problems.length} />
        <div className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2 sm:grid-cols-3 lg:grid-cols-4">
          {seedCodingTopics.map((t) => {
            const s = byTopic[t]
            if (!s) return null
            return (
              <button
                key={t}
                onClick={() => setTopic(topic === t ? 'All' : t)}
                className={`text-left ${topic === t ? 'opacity-100' : 'opacity-90 hover:opacity-100'}`}
              >
                <div className="flex items-center justify-between text-xs">
                  <span className={`truncate font-medium ${topic === t ? 'text-brand-600' : 'text-slate-600 dark:text-slate-300'}`}>{t}</span>
                  <span className="text-slate-400">{s.solved}/{s.total}</span>
                </div>
                <ProgressBar value={s.solved} max={s.total} className="mt-1" />
              </button>
            )
          })}
        </div>
      </div>

      {/* Filters */}
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <input
          className="input max-w-xs"
          placeholder="Search problems…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <select className="input max-w-[10rem]" value={topic} onChange={(e) => setTopic(e.target.value)}>
          <option>All</option>
          {seedCodingTopics.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
        <select className="input max-w-[8rem]" value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
          {['All', 'Easy', 'Medium', 'Hard'].map((d) => (
            <option key={d}>{d}</option>
          ))}
        </select>
        <select className="input max-w-[9rem]" value={status} onChange={(e) => setStatus(e.target.value)}>
          {['All', 'todo', 'attempted', 'solved'].map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
        <span className="ml-auto text-sm text-slate-500">{filtered.length} shown</span>
      </div>

      {/* Problem list */}
      {filtered.length === 0 ? (
        <Empty>No problems match these filters.</Empty>
      ) : (
        <div className="space-y-2">
          {filtered.map((p) => (
            <div key={p.id} className="card p-0">
              <div className="flex flex-wrap items-center gap-3 p-3">
                <button
                  onClick={() => cycleStatus(p)}
                  title="Click to cycle: to do → attempted → solved"
                  className="shrink-0"
                >
                  <StatusBadge status={p.status} />
                </button>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    {p.url ? (
                      <a href={p.url} target="_blank" rel="noreferrer" className="truncate font-medium text-slate-800 hover:text-brand-600 hover:underline dark:text-slate-100">
                        {p.title}
                      </a>
                    ) : (
                      <span className="truncate font-medium text-slate-800 dark:text-slate-100">{p.title}</span>
                    )}
                    {p.freq === 'high' && (
                      <span className="badge bg-accent-500/15 text-accent-600 dark:text-accent-400">🔥 high freq</span>
                    )}
                  </div>
                  <div className="mt-0.5 text-xs text-slate-400">{p.topic}</div>
                </div>
                <DifficultyBadge level={p.difficulty} />
                <ConfidenceDots value={p.confidence} onChange={(v) => setConfidence(p, v)} />
                <button
                  className="btn-ghost text-xs"
                  onClick={() => setExpanded(expanded === p.id ? null : p.id)}
                >
                  {expanded === p.id ? 'Hide' : 'Notes'}
                </button>
              </div>
              {expanded === p.id && (
                <div className="border-t border-slate-100 p-3 dark:border-slate-800">
                  <textarea
                    className="input min-h-[80px]"
                    placeholder="Approach, gotchas, time/space complexity, patterns to remember…"
                    value={p.notes}
                    onChange={(e) => setNotes(p, e.target.value)}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
