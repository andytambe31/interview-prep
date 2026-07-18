import React, { useMemo, useState } from 'react'
import { useStore } from '../store/StoreContext.jsx'
import { SectionHeader, EmphasisBadge, ConfidenceDots, Empty } from './common.jsx'
import { starMethod } from '../data/insights.js'

function newId() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) return crypto.randomUUID()
  return 'story-' + Date.now() + '-' + Math.floor(Math.random() * 1e6)
}

const emptyStory = () => ({
  id: newId(),
  title: '',
  situation: '',
  task: '',
  action: '',
  result: '',
  lpIds: [],
})

export default function LeadershipPrinciples() {
  const { state, dispatch } = useStore()
  const { lps, stories } = state
  const [tab, setTab] = useState('principles') // principles | stories
  const [editing, setEditing] = useState(null)

  const coverage = useMemo(() => {
    const map = {}
    for (const s of stories) for (const id of s.lpIds || []) map[id] = (map[id] || 0) + 1
    return map
  }, [stories])

  const highLps = lps.filter((lp) => lp.emphasis === 'high')
  const highCovered = highLps.filter((lp) => coverage[lp.id]).length

  return (
    <div>
      <SectionHeader
        title="Leadership Principles"
        subtitle={`${highCovered}/${highLps.length} high-priority LPs covered · ${stories.length} stories in bank`}
        right={
          <div className="flex rounded-lg border border-slate-200 p-0.5 dark:border-slate-700">
            {['principles', 'stories'].map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`rounded-md px-3 py-1.5 text-sm font-medium capitalize ${
                  tab === t ? 'bg-brand-600 text-white' : 'text-slate-600 dark:text-slate-300'
                }`}
              >
                {t === 'principles' ? 'The 16 LPs' : 'Story Bank'}
              </button>
            ))}
          </div>
        }
      />

      {tab === 'principles' ? (
        <PrinciplesTab lps={lps} coverage={coverage} stories={stories} dispatch={dispatch} />
      ) : (
        <StoriesTab
          stories={stories}
          lps={lps}
          editing={editing}
          setEditing={setEditing}
          dispatch={dispatch}
        />
      )}
    </div>
  )
}

function PrinciplesTab({ lps, coverage, stories, dispatch }) {
  const [open, setOpen] = useState(null)
  const storyTitlesFor = (lpId) => stories.filter((s) => (s.lpIds || []).includes(lpId)).map((s) => s.title || 'Untitled')

  return (
    <>
      <div className="card mb-4 bg-brand-50/60 dark:bg-brand-900/20">
        <p className="text-sm text-slate-600 dark:text-slate-300">
          Amazon weaves LP questions into <strong>every</strong> round. Prepare <strong>2 stories each</strong> for the
          high-priority principles, then ensure at least one reachable story for the rest. Map each story to multiple LPs.
        </p>
      </div>
      <div className="grid gap-3">
        {lps.map((lp) => {
          const covered = coverage[lp.id] || 0
          const isOpen = open === lp.id
          return (
            <div key={lp.id} className="card p-0">
              <button
                className="flex w-full items-center gap-3 p-4 text-left"
                onClick={() => setOpen(isOpen ? null : lp.id)}
              >
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-semibold text-slate-900 dark:text-white">{lp.name}</span>
                    <EmphasisBadge level={lp.emphasis} />
                    <span
                      className={`badge ${
                        covered > 0
                          ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300'
                          : 'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400'
                      }`}
                    >
                      {covered > 0 ? `${covered} story${covered > 1 ? 'ies' : ''}` : 'no story yet'}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{lp.want}</p>
                </div>
                <span className="text-slate-400">{isOpen ? '−' : '+'}</span>
              </button>
              {isOpen && (
                <div className="border-t border-slate-100 p-4 dark:border-slate-800">
                  <div className="mb-3 flex items-center gap-3">
                    <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">Your readiness</span>
                    <ConfidenceDots
                      value={lp.confidence || 0}
                      onChange={(v) => dispatch({ type: 'UPDATE_LP', id: lp.id, patch: { confidence: v } })}
                    />
                  </div>
                  <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">Commonly asked</div>
                  <ul className="mt-1 list-disc space-y-1 pl-5 text-sm text-slate-600 dark:text-slate-300">
                    {lp.questions.map((q, i) => (
                      <li key={i}>{q}</li>
                    ))}
                  </ul>
                  {storyTitlesFor(lp.id).length > 0 && (
                    <div className="mt-3">
                      <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">Mapped stories</div>
                      <div className="mt-1 flex flex-wrap gap-1.5">
                        {storyTitlesFor(lp.id).map((t, i) => (
                          <span key={i} className="badge bg-brand-100 text-brand-700 dark:bg-brand-900/40 dark:text-brand-300">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  <div className="mt-3">
                    <label className="label">Your notes</label>
                    <textarea
                      className="input min-h-[60px]"
                      value={lp.notes || ''}
                      placeholder="Angle, which story fits, keywords to hit…"
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

function StoriesTab({ stories, lps, editing, setEditing, dispatch }) {
  const startNew = () => setEditing(emptyStory())

  const save = () => {
    if (!editing) return
    dispatch({ type: 'UPSERT_STORY', story: editing })
    setEditing(null)
  }

  return (
    <>
      <div className="card mb-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="text-sm text-slate-600 dark:text-slate-300">
            Build ~8–10 distinct STAR stories. Lead with <strong>“I”</strong>, quantify the <strong>Result</strong>, and
            keep depth ready for follow-ups.
          </div>
          <button className="btn-primary" onClick={startNew}>
            + New story
          </button>
        </div>
        <div className="mt-3 grid gap-2 sm:grid-cols-4">
          {starMethod.parts.map((p) => (
            <div key={p.k} className="rounded-lg bg-slate-50 p-2 text-xs dark:bg-slate-800/60">
              <div className="font-semibold text-slate-700 dark:text-slate-200">{p.k} <span className="text-slate-400">({p.pct})</span></div>
              <div className="mt-0.5 text-slate-500 dark:text-slate-400">{p.tip}</div>
            </div>
          ))}
        </div>
      </div>

      {editing && (
        <div className="card mb-4 border-brand-300 dark:border-brand-700">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="font-semibold text-slate-900 dark:text-white">
              {stories.some((s) => s.id === editing.id) ? 'Edit story' : 'New story'}
            </h3>
            <button className="btn-ghost text-sm" onClick={() => setEditing(null)}>
              Cancel
            </button>
          </div>
          <label className="label">Title</label>
          <input
            className="input mb-3"
            placeholder="e.g. Cut capstone build time 40%"
            value={editing.title}
            onChange={(e) => setEditing({ ...editing, title: e.target.value })}
          />
          {[
            ['situation', 'Situation'],
            ['task', 'Task'],
            ['action', 'Action (the core — what YOU did & why)'],
            ['result', 'Result (quantified + what you learned)'],
          ].map(([key, label]) => (
            <div key={key} className="mb-3">
              <label className="label">{label}</label>
              <textarea
                className="input min-h-[64px]"
                value={editing[key]}
                onChange={(e) => setEditing({ ...editing, [key]: e.target.value })}
              />
            </div>
          ))}
          <label className="label">Maps to Leadership Principles</label>
          <div className="mb-3 flex flex-wrap gap-1.5">
            {lps.map((lp) => {
              const on = editing.lpIds.includes(lp.id)
              return (
                <button
                  key={lp.id}
                  onClick={() =>
                    setEditing({
                      ...editing,
                      lpIds: on ? editing.lpIds.filter((x) => x !== lp.id) : [...editing.lpIds, lp.id],
                    })
                  }
                  className={`badge border ${
                    on
                      ? 'border-brand-500 bg-brand-600 text-white'
                      : 'border-slate-300 text-slate-600 dark:border-slate-600 dark:text-slate-300'
                  }`}
                >
                  {lp.name}
                </button>
              )
            })}
          </div>
          <div className="flex gap-2">
            <button className="btn-primary" onClick={save}>
              Save story
            </button>
          </div>
        </div>
      )}

      {stories.length === 0 && !editing ? (
        <Empty>No stories yet. Click “New story” to start your bank.</Empty>
      ) : (
        <div className="grid gap-3">
          {stories.map((s) => (
            <div key={s.id} className="card">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="font-semibold text-slate-900 dark:text-white">{s.title || 'Untitled story'}</div>
                  <div className="mt-1 flex flex-wrap gap-1.5">
                    {(s.lpIds || []).map((id) => {
                      const lp = lps.find((l) => l.id === id)
                      return lp ? (
                        <span key={id} className="badge bg-brand-100 text-brand-700 dark:bg-brand-900/40 dark:text-brand-300">
                          {lp.name}
                        </span>
                      ) : null
                    })}
                  </div>
                </div>
                <div className="flex shrink-0 gap-1">
                  <button className="btn-ghost text-xs" onClick={() => setEditing(s)}>
                    Edit
                  </button>
                  <button
                    className="btn-ghost text-xs text-rose-600 dark:text-rose-400"
                    onClick={() => confirm('Delete this story?') && dispatch({ type: 'DELETE_STORY', id: s.id })}
                  >
                    Delete
                  </button>
                </div>
              </div>
              {(s.situation || s.task || s.action || s.result) && (
                <div className="mt-3 grid gap-2 text-sm sm:grid-cols-2">
                  {[
                    ['S', s.situation],
                    ['T', s.task],
                    ['A', s.action],
                    ['R', s.result],
                  ].map(([k, v]) =>
                    v ? (
                      <div key={k} className="rounded-lg bg-slate-50 p-2 dark:bg-slate-800/60">
                        <span className="mr-1 font-bold text-brand-600">{k}</span>
                        <span className="text-slate-600 dark:text-slate-300">{v}</span>
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
