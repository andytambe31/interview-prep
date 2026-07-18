import React, { useMemo, useState } from 'react'
import { useStore } from '../store/StoreContext.jsx'
import { PageHeader, EmphasisBadge, ConfidenceDots, Empty, ProgressBar } from './common.jsx'
import { starMethod } from '../data/insights.js'
import { mostAskedBehavioral } from '../data/seed.js'

function newId() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) return crypto.randomUUID()
  return 'story-' + Date.now() + '-' + Math.floor(Math.random() * 1e6)
}
const emptyStory = () => ({ id: newId(), title: '', situation: '', task: '', action: '', result: '', lpIds: [] })

export default function Behavioral() {
  const { state, dispatch } = useStore()
  const { lps, stories } = state
  const [tab, setTab] = useState('principles')
  const [editing, setEditing] = useState(null)

  const coverage = useMemo(() => {
    const m = {}
    for (const s of stories) for (const id of s.lpIds || []) m[id] = (m[id] || 0) + 1
    return m
  }, [stories])
  const highLps = lps.filter((lp) => lp.emphasis === 'high')
  const highCovered = highLps.filter((lp) => coverage[lp.id]).length

  return (
    <div>
      <PageHeader
        kicker="Behavioral"
        title="Leadership Principles & your stories"
        intro="Amazon weaves principle questions into every round. You don’t need 16 stories — build 8–10 strong ones, each mapped to several principles, and lead every answer with “I”."
        right={
          <div className="inline-flex rounded-full border border-line bg-surface p-1">
            {[['principles', 'Principles'], ['stories', 'My stories']].map(([id, label]) => (
              <button
                key={id}
                onClick={() => setTab(id)}
                className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
                  tab === id ? 'bg-clay-500 text-white' : 'text-muted hover:text-ink'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        }
      />

      {tab === 'principles' ? (
        <Principles lps={lps} coverage={coverage} stories={stories} dispatch={dispatch} highCovered={highCovered} highTotal={highLps.length} />
      ) : (
        <Stories stories={stories} lps={lps} editing={editing} setEditing={setEditing} dispatch={dispatch} />
      )}
    </div>
  )
}

function Principles({ lps, coverage, stories, dispatch, highCovered, highTotal }) {
  const [open, setOpen] = useState(null)
  const storiesFor = (id) => stories.filter((s) => (s.lpIds || []).includes(id)).map((s) => s.title || 'Untitled')

  return (
    <>
      <p className="mb-6 max-w-prose rounded-xl bg-clay-50 px-4 py-3 text-sm text-clay-700">
        You’ve covered <strong>{highCovered} of {highTotal}</strong> core principles with a story. Aim for two stories
        each on the core ones before you branch out.
      </p>

      <details className="mb-6 rounded-2xl border border-line bg-surface p-5">
        <summary className="cursor-pointer font-serif text-lg">The 15 most-asked questions — prepare these first</summary>
        <ol className="mt-3 list-decimal space-y-1 pl-5 text-[15px] text-ink/90">
          {mostAskedBehavioral.map((q, i) => (
            <li key={i}>{q}</li>
          ))}
        </ol>
      </details>
      <div className="divide-y divide-line rounded-2xl border border-line bg-surface">
        {lps.map((lp) => {
          const covered = coverage[lp.id] || 0
          const isOpen = open === lp.id
          return (
            <div key={lp.id}>
              <button className="flex w-full items-start gap-3 px-5 py-4 text-left" onClick={() => setOpen(isOpen ? null : lp.id)}>
                <span className="min-w-0 flex-1">
                  <span className="flex flex-wrap items-center gap-2">
                    <span className="font-serif text-lg">{lp.name}</span>
                    <EmphasisBadge level={lp.emphasis} />
                    {covered > 0 ? (
                      <span className="pill bg-sage-100 text-sage-600">✓ {covered} story{covered > 1 ? 'ies' : ''}</span>
                    ) : (
                      lp.emphasis === 'high' && <span className="pill bg-[#f3ddd7] text-[#9a3a2a]">needs a story</span>
                    )}
                  </span>
                  <span className="mt-1 block max-w-prose text-sm text-muted">{lp.want}</span>
                </span>
                <span className="text-faint">{isOpen ? '−' : '+'}</span>
              </button>
              {isOpen && (
                <div className="px-5 pb-5">
                  <div className="mb-3 flex items-center gap-3">
                    <span className="kicker">Your readiness</span>
                    <ConfidenceDots value={lp.confidence || 0} onChange={(v) => dispatch({ type: 'UPDATE_LP', id: lp.id, patch: { confidence: v } })} />
                  </div>
                  <div className="kicker mb-1">Commonly asked</div>
                  <ul className="max-w-prose space-y-1.5 text-[15px] text-ink/90">
                    {lp.questions.map((q, i) => (
                      <li key={i} className="flex gap-2">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-clay-300" />
                        <span>{q}</span>
                      </li>
                    ))}
                  </ul>
                  {storiesFor(lp.id).length > 0 && (
                    <div className="mt-4">
                      <div className="kicker mb-1">Your mapped stories</div>
                      <div className="flex flex-wrap gap-2">
                        {storiesFor(lp.id).map((t, i) => (
                          <span key={i} className="pill bg-clay-50 text-clay-700">{t}</span>
                        ))}
                      </div>
                    </div>
                  )}
                  <div className="mt-4">
                    <label className="label">Notes</label>
                    <textarea
                      className="input min-h-[56px]"
                      value={lp.notes || ''}
                      placeholder="Which story fits, the angle, keywords to hit…"
                      onChange={(e) => dispatch({ type: 'UPDATE_LP', id: lp.id, patch: { notes: e.target.value } })}
                    />
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </>
  )
}

function Stories({ stories, lps, editing, setEditing, dispatch }) {
  const save = () => {
    if (!editing) return
    dispatch({ type: 'UPSERT_STORY', story: editing })
    setEditing(null)
  }

  return (
    <>
      <div className="mb-6 rounded-2xl border border-line bg-surface p-4">
        <div className="flex items-baseline justify-between">
          <span className="font-serif text-lg">Story bank</span>
          <span className="text-sm text-muted">{Math.min(stories.length, 10)} of 10 built</span>
        </div>
        <ProgressBar value={Math.min(stories.length, 10)} max={10} tone="sage" className="mt-2" />
        <p className="mt-2 text-xs text-faint">Target 8–10 distinct stories, each mapped to 2–3 principles. Build these in the final push — after the DSA sprint.</p>
      </div>

      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div className="grid gap-2 sm:grid-cols-4">
          {starMethod.parts.map((p) => (
            <div key={p.k} className="rounded-xl border border-line bg-surface px-3 py-2">
              <div className="text-sm font-medium">{p.k.split(' — ')[0]}</div>
              <div className="text-xs text-muted">{p.k.split(' — ')[1]} · {p.pct}</div>
            </div>
          ))}
        </div>
        <button className="btn-primary" onClick={() => setEditing(emptyStory())}>
          + New story
        </button>
      </div>

      {editing && (
        <div className="mb-6 rounded-2xl border border-clay-300 bg-surface p-6 ring-2 ring-clay-500/10">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-serif text-xl">{stories.some((s) => s.id === editing.id) ? 'Edit story' : 'New story'}</h3>
            <button className="btn-quiet px-2" onClick={() => setEditing(null)}>✕</button>
          </div>
          <label className="label">Title</label>
          <input className="input mb-4" placeholder="e.g. Cut our capstone’s build time by 40%" value={editing.title} onChange={(e) => setEditing({ ...editing, title: e.target.value })} />
          {[
            ['situation', 'Situation — set the scene briefly'],
            ['task', 'Task — your specific goal'],
            ['action', 'Action — what YOU did, and why (the core)'],
            ['result', 'Result — quantified + what you learned'],
          ].map(([k, label]) => (
            <div key={k} className="mb-4">
              <label className="label">{label}</label>
              <textarea className="input min-h-[64px]" value={editing[k]} onChange={(e) => setEditing({ ...editing, [k]: e.target.value })} />
            </div>
          ))}
          <label className="label">Maps to which principles?</label>
          <div className="mb-4 flex flex-wrap gap-2">
            {lps.map((lp) => {
              const on = editing.lpIds.includes(lp.id)
              return (
                <button
                  key={lp.id}
                  onClick={() => setEditing({ ...editing, lpIds: on ? editing.lpIds.filter((x) => x !== lp.id) : [...editing.lpIds, lp.id] })}
                  className={`pill border ${on ? 'border-clay-500 bg-clay-500 text-white' : 'border-line text-muted hover:border-clay-300'}`}
                >
                  {lp.name}
                </button>
              )
            })}
          </div>
          <button className="btn-primary" onClick={save}>Save story</button>
        </div>
      )}

      {stories.length === 0 && !editing ? (
        <Empty>No stories yet. Start with one from a project or internship — you can map it to several principles.</Empty>
      ) : (
        <div className="space-y-3">
          {stories.map((s) => (
            <div key={s.id} className="rounded-2xl border border-line bg-surface p-5">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="font-serif text-lg">{s.title || 'Untitled story'}</div>
                  <div className="mt-1.5 flex flex-wrap gap-2">
                    {(s.lpIds || []).map((id) => {
                      const lp = lps.find((l) => l.id === id)
                      return lp ? <span key={id} className="pill bg-clay-50 text-clay-700">{lp.name}</span> : null
                    })}
                  </div>
                </div>
                <div className="flex shrink-0 gap-1">
                  <button className="btn-quiet px-2 text-xs" onClick={() => setEditing(s)}>Edit</button>
                  <button className="btn-quiet px-2 text-xs text-[#9a3a2a]" onClick={() => confirm('Delete this story?') && dispatch({ type: 'DELETE_STORY', id: s.id })}>Delete</button>
                </div>
              </div>
              {(s.situation || s.task || s.action || s.result) && (
                <div className="mt-4 grid gap-2 sm:grid-cols-2">
                  {[['S', s.situation], ['T', s.task], ['A', s.action], ['R', s.result]].map(([k, v]) =>
                    v ? (
                      <div key={k} className="rounded-xl bg-paper p-3 text-sm">
                        <span className="mr-1.5 font-serif font-semibold text-clay-500">{k}</span>
                        <span className="text-ink/85">{v}</span>
                      </div>
                    ) : null,
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </>
  )
}
