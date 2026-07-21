import React, { useEffect, useState, useMemo } from 'react'
import { useStore } from '../store/StoreContext.jsx'
import { ConfidenceDots } from './common.jsx'
import { stagesFor, totalMinutes } from '../data/rehearsal.js'

function fmt(secs) {
  const s = Math.max(0, Math.floor(secs))
  const m = Math.floor(s / 60)
  return `${m}:${String(s % 60).padStart(2, '0')}`
}

// The full-screen mock-interview trainer. Driven by a session descriptor
// { kind: 'coding' | 'lld', id, title } stored on ui.rehearseSession.
export default function RehearseSession({ session, onClose }) {
  const { state, dispatch } = useStore()
  const { kind, id, title } = session
  const key = `${kind}:${id}`
  const stages = stagesFor(kind)

  const record = state.rehearsals?.[key] || { draft: null, history: [] }
  const draft = record.draft
  const notes = draft?.notes || {}
  const stageIdx = Math.min(draft?.stage ?? 0, stages.length - 1)
  const [finishing, setFinishing] = useState(false)
  const [rating, setRating] = useState(0)
  const [improve, setImprove] = useState('')
  const [now, setNow] = useState(() => Date.now())

  // Start a draft (with a start timestamp) the first time this opens.
  useEffect(() => {
    if (!draft) {
      dispatch({ type: 'REHEARSAL_SAVE_DRAFT', key, patch: { startedAt: Date.now(), stage: 0, notes: {}, title } })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key])

  // Tick the timer once a second.
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(t)
  }, [])

  // Close on Escape.
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape' && !finishing) onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose, finishing])

  const elapsed = draft?.startedAt ? (now - draft.startedAt) / 1000 : 0
  const budget = totalMinutes(kind)
  const stage = stages[stageIdx]
  const doneCount = useMemo(() => stages.filter((s) => (notes[s.id] || '').trim().length > 0).length, [notes, stages])

  const setStage = (i) => dispatch({ type: 'REHEARSAL_SAVE_DRAFT', key, patch: { stage: Math.max(0, Math.min(stages.length - 1, i)) } })
  const setNote = (v) => dispatch({ type: 'REHEARSAL_SET_NOTE', key, stageId: stage.id, value: v })

  const finish = () => {
    const attempt = {
      id: String(Date.now()),
      kind,
      problemId: id,
      title,
      at: new Date().toISOString(),
      durationSec: Math.round(elapsed),
      notes: { ...notes },
      rating,
      improve: improve.trim(),
    }
    dispatch({ type: 'REHEARSAL_COMPLETE', key, attempt })
    // Nudge the problem from "to do" to "attempted" if we're tracking it.
    const tracked = state.coding.problems.find((p) => p.id === id)
    if (tracked && tracked.status === 'todo') {
      dispatch({ type: 'UPDATE_PROBLEM', id, patch: { status: 'attempted' } })
    }
    onClose()
  }

  const overBudget = elapsed > budget * 60

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-paper">
      <div className="mx-auto w-full max-w-3xl px-5 py-6 md:px-8">
        {/* Top bar */}
        <div className="mb-5 flex flex-wrap items-center gap-3">
          <span className={`pill ${kind === 'lld' ? 'bg-clay-50 text-clay-700' : 'bg-sage-100 text-sage-600'}`}>
            {kind === 'lld' ? 'LLD rehearsal' : 'Coding rehearsal'}
          </span>
          <span className="min-w-0 flex-1 truncate font-serif text-lg">{title}</span>
          <span
            className={`rounded-lg px-2.5 py-1 font-mono text-sm tabular-nums ${
              overBudget ? 'bg-[#f3ddd7] text-[#9a3a2a]' : 'bg-surface text-muted'
            }`}
            title={`Suggested budget: ${budget} min`}
          >
            {fmt(elapsed)} <span className="text-faint">/ {budget}:00</span>
          </span>
          <button className="btn-quiet px-3 text-sm" onClick={onClose}>Save & exit</button>
        </div>

        {finishing ? (
          <FinishCard
            doneCount={doneCount}
            total={stages.length}
            elapsed={elapsed}
            rating={rating}
            setRating={setRating}
            improve={improve}
            setImprove={setImprove}
            onBack={() => setFinishing(false)}
            onSave={finish}
          />
        ) : (
          <>
            {/* Stage progress */}
            <div className="mb-4">
              <div className="mb-2 flex items-baseline justify-between text-sm">
                <span className="font-medium text-ink">
                  Stage {stageIdx + 1} of {stages.length} · {stage.title}
                </span>
                <span className="text-faint">~{stage.minutes} min</span>
              </div>
              <div className="flex gap-1">
                {stages.map((s, i) => {
                  const filled = (notes[s.id] || '').trim().length > 0
                  return (
                    <button
                      key={s.id}
                      onClick={() => setStage(i)}
                      title={s.title}
                      className={`h-1.5 flex-1 rounded-full transition ${
                        i === stageIdx ? 'bg-clay-500' : filled ? 'bg-sage-400' : 'bg-line'
                      }`}
                    />
                  )
                })}
              </div>
            </div>

            {/* Stage card */}
            <div className="rounded-2xl border border-line bg-surface p-5">
              <div className="mb-1 kicker">Do this</div>
              <p className="text-[15px] leading-relaxed text-ink/90">{stage.do}</p>

              <div className="mt-4 rounded-xl bg-clay-50 px-4 py-3">
                <div className="kicker mb-1 text-clay-700">What the interviewer is scoring</div>
                <p className="text-sm leading-relaxed text-clay-700">{stage.signal}</p>
              </div>

              <div className="mt-4">
                <div className="kicker mb-1">Your work</div>
                <textarea
                  className={`input ${stage.mono ? 'min-h-[220px] font-mono text-[13px] leading-snug' : 'min-h-[130px]'}`}
                  placeholder={stage.placeholder}
                  value={notes[stage.id] || ''}
                  onChange={(e) => setNote(e.target.value)}
                  autoFocus
                />
              </div>
            </div>

            {/* Footer nav */}
            <div className="mt-5 flex items-center justify-between">
              <button
                className="btn-quiet px-3 text-sm disabled:opacity-40"
                onClick={() => setStage(stageIdx - 1)}
                disabled={stageIdx === 0}
              >
                ← Prev
              </button>
              <span className="text-xs text-faint">{doneCount}/{stages.length} stages filled</span>
              {stageIdx < stages.length - 1 ? (
                <button className="btn-outline px-4 text-sm" onClick={() => setStage(stageIdx + 1)}>
                  Next →
                </button>
              ) : (
                <button className="btn-primary px-4 text-sm" onClick={() => setFinishing(true)}>
                  Finish
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

function FinishCard({ doneCount, total, elapsed, rating, setRating, improve, setImprove, onBack, onSave }) {
  return (
    <div className="rounded-2xl border border-line bg-surface p-6">
      <div className="kicker mb-1">Rehearsal complete</div>
      <h2 className="font-serif text-2xl">How did that go?</h2>
      <p className="mt-1 text-sm text-muted">
        {fmt(elapsed)} elapsed · {doneCount}/{total} stages filled. Rate yourself honestly — it’s the record you’ll look back on.
      </p>

      <div className="mt-5">
        <div className="kicker mb-2">Self-rating</div>
        <div className="flex items-center gap-3">
          <ConfidenceDots value={rating} onChange={setRating} />
          <span className="text-sm text-muted">
            {['—', 'Rough — needed lots of help', 'Shaky in places', 'Solid, a few stumbles', 'Strong, interview-ready', 'Nailed it'][rating]}
          </span>
        </div>
      </div>

      <div className="mt-5">
        <div className="kicker mb-1">One thing to do better next time</div>
        <textarea
          className="input min-h-[80px]"
          placeholder="e.g. I jumped to code before confirming the approach; state Big-O without being asked…"
          value={improve}
          onChange={(e) => setImprove(e.target.value)}
        />
      </div>

      <div className="mt-6 flex items-center justify-between">
        <button className="btn-quiet px-3 text-sm" onClick={onBack}>← Back to stages</button>
        <button className="btn-primary px-4 text-sm" onClick={onSave}>Save attempt</button>
      </div>
    </div>
  )
}
