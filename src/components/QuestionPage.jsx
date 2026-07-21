import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useStore } from '../store/StoreContext.jsx'
import { StatusBadge, DifficultyBadge } from './common.jsx'
import { PatternGuide } from './Coding.jsx'
import { patternsFor } from '../data/patterns.js'
import { mindsetFor } from '../data/mindsets.js'

const STATUS_CYCLE = { todo: 'attempted', attempted: 'solved', solved: 'todo' }

export default function QuestionPage({ id, onBack }) {
  const { state, dispatch } = useStore()
  const problem = state.coding.problems.find((p) => p.id === id)
  const mindset = mindsetFor(id)
  const [showSim, setShowSim] = useState(false)

  const title = mindset?.title || problem?.title || 'Question'
  const difficulty = problem?.difficulty || mindset?.difficulty

  return (
    <div>
      <button className="btn-quiet mb-5 px-2 text-sm" onClick={onBack}>
        ← Back to Coding
      </button>

      <header className="mb-6">
        <div className="mb-2 flex flex-wrap items-center gap-2">
          {problem && (
            <button onClick={() => dispatch({ type: 'UPDATE_PROBLEM', id, patch: { status: STATUS_CYCLE[problem.status] } })} title="Cycle status">
              <StatusBadge status={problem.status} />
            </button>
          )}
          {difficulty && <DifficultyBadge level={difficulty} />}
          {problem?.freq === 'high' && <span className="pill bg-clay-50 text-clay-700">high freq</span>}
          {problem?.topic && <span className="pill border border-line bg-paper text-muted">{problem.topic}</span>}
        </div>
        <h1 className="text-3xl font-semibold leading-tight md:text-[2.4rem]">{title}</h1>
        {mindset?.prompt && <p className="mt-3 max-w-prose text-[15px] leading-relaxed text-muted">{mindset.prompt}</p>}
        <div className="mt-3 flex flex-wrap gap-2">
          {problem?.url && (
            <a href={problem.url} target="_blank" rel="noreferrer" className="pill border border-line bg-surface text-clay-600 hover:underline">
              Open on LeetCode ↗
            </a>
          )}
        </div>
      </header>

      {/* Score yourself — attempt first, tick what you covered, then reveal Alex */}
      {mindset?.rubric && problem && (
        <div className="mb-5">
          <Scorecard problem={problem} rubric={mindset.rubric} dispatch={dispatch} candidate={mindset.cast?.candidate || 'Alex'} />
        </div>
      )}

      {/* Interview simulation — gated behind a button */}
      {mindset ? (
        <div className="rounded-2xl border border-clay-200 bg-clay-50/40 p-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="max-w-prose">
              <div className="kicker mb-1 text-clay-700">Interview simulation</div>
              <p className="text-[15px] leading-relaxed text-ink/90">
                Watch a fictional candidate, {mindset.cast?.candidate || 'the candidate'}, work this exact problem with an
                interviewer — every spoken line, and the thoughts in between.
              </p>
            </div>
            {!showSim && (
              <button className="btn-primary shrink-0 px-4 text-sm" onClick={() => setShowSim(true)}>
                ▶ See the interview simulation
              </button>
            )}
          </div>
          {showSim && (
            <div className="mt-5">
              <Transcript mindset={mindset} onHide={() => setShowSim(false)} />
            </div>
          )}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-line bg-surface/50 p-6 text-sm text-muted">
          An interview simulation for this problem isn’t written yet. In the meantime, study the pattern below.
        </div>
      )}

      {/* Pattern guide for the problem */}
      {problem && (
        <div className="mt-8 space-y-4">
          <div className="kicker">The pattern behind it</div>
          {patternsFor(problem).map((pat) => (
            <PatternGuide key={pat.name} pat={pat} />
          ))}
        </div>
      )}

      {/* Notes */}
      {problem && (
        <div className="mt-8">
          <div className="kicker mb-1">Your notes</div>
          <textarea
            className="input min-h-[90px]"
            placeholder="The trick to remember, where you got stuck, your own phrasing…"
            value={problem.notes}
            onChange={(e) => dispatch({ type: 'UPDATE_PROBLEM', id, patch: { notes: e.target.value } })}
          />
        </div>
      )}
    </div>
  )
}

function Scorecard({ problem, rubric, dispatch, candidate }) {
  const practice = problem.practice || { checked: {} }
  const checked = practice.checked || {}
  const total = rubric.length
  const hit = rubric.reduce((n, _, i) => n + (checked[i] ? 1 : 0), 0)
  const pct = total ? Math.round((hit / total) * 100) : 0

  const toggle = (i) => {
    const next = { ...checked, [i]: !checked[i] }
    dispatch({ type: 'UPDATE_PROBLEM', id: problem.id, patch: { practice: { ...practice, checked: next } } })
  }
  const reset = () =>
    dispatch({ type: 'UPDATE_PROBLEM', id: problem.id, patch: { practice: { ...practice, checked: {} } } })

  const verdict =
    hit === 0
      ? 'Attempt it out loud first, then tick what you covered.'
      : hit === total
        ? '★ Full marks — interview-ready on this one.'
        : hit >= Math.ceil(total * 0.7)
          ? 'Solid — close the gaps you left unticked.'
          : hit >= Math.ceil(total * 0.4)
            ? 'Getting there — a few key beats are missing.'
            : `Shaky — read ${candidate}’s answer below, then try again.`

  return (
    <div className="rounded-2xl border border-sage-200 bg-sage-50/40 p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="max-w-prose">
          <div className="kicker mb-1 text-sage-700">Score yourself</div>
          <p className="text-[15px] leading-relaxed text-ink/90">
            Answer the question out loud or on paper first. Then tick every point you actually covered — that’s your
            score. Reveal how {candidate} answered below to check yourself.
          </p>
        </div>
        <div className="shrink-0 text-right">
          <div className="font-serif text-3xl leading-none text-sage-700">
            {hit}
            <span className="text-lg text-faint"> / {total}</span>
          </div>
        </div>
      </div>

      <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-line">
        <div className="h-full rounded-full bg-sage-500 transition-all duration-300" style={{ width: `${pct}%` }} />
      </div>
      <div className="mt-2 flex items-center justify-between">
        <span className="text-sm text-sage-700">{verdict}</span>
        {hit > 0 && (
          <button className="btn-quiet px-2 text-xs" onClick={reset}>Reset</button>
        )}
      </div>

      <ul className="mt-4 space-y-2">
        {rubric.map((pt, i) => (
          <li key={i}>
            <label className="flex cursor-pointer items-start gap-2.5 text-[15px] leading-relaxed">
              <input
                type="checkbox"
                className="mt-1 h-4 w-4 shrink-0 accent-sage-500"
                checked={!!checked[i]}
                onChange={() => toggle(i)}
              />
              <span className={checked[i] ? 'text-ink/90 line-through decoration-sage-400/60' : 'text-muted'}>{pt}</span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  )
}

function Transcript({ mindset, onHide }) {
  const beats = mindset.beats
  const cast = mindset.cast || { interviewer: 'Interviewer', candidate: 'Candidate' }
  const [stepMode, setStepMode] = useState(false)
  const [revealed, setRevealed] = useState(beats.length) // full by default
  const lastRef = useRef(null)

  // Number the thoughts so the sequence is legible ("thought 3 of 9").
  const thoughtIndex = useMemo(() => {
    const map = new Map()
    let n = 0
    beats.forEach((b, i) => {
      if (b.t === 'think') { n += 1; map.set(i, n) }
    })
    return { map, total: n }
  }, [beats])

  const enterStep = () => { setStepMode(true); setRevealed(1) }
  const enterFull = () => { setStepMode(false); setRevealed(beats.length) }
  const next = () => setRevealed((r) => Math.min(beats.length, r + 1))

  useEffect(() => {
    if (stepMode) lastRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }, [revealed, stepMode])

  const shown = stepMode ? beats.slice(0, revealed) : beats
  const done = revealed >= beats.length

  return (
    <div>
      {/* Cast + mode toggle */}
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <span className="text-sm text-muted">
          <span className="font-medium text-ink">{cast.interviewer}</span> (interviewer) ·{' '}
          <span className="font-medium text-ink">{cast.candidate}</span> (candidate)
        </span>
        <span className="mx-1 text-faint">·</span>
        <button className={stepMode ? 'pill border border-line bg-surface text-muted' : 'pill bg-clay-500 text-white'} onClick={enterFull}>
          Full script
        </button>
        <button className={stepMode ? 'pill bg-clay-500 text-white' : 'pill border border-line bg-surface text-muted'} onClick={enterStep}>
          Step through
        </button>
        {onHide && (
          <button className="btn-quiet ml-auto px-2 text-xs" onClick={onHide}>Hide</button>
        )}
        {stepMode && (
          <span className="w-full text-xs text-faint">{Math.min(revealed, beats.length)} / {beats.length} lines</span>
        )}
      </div>

      <div className="rounded-2xl border border-line bg-surface p-4 sm:p-6">
        <div className="space-y-3">
          {shown.map((b, i) => (
            <div key={i} ref={i === shown.length - 1 ? lastRef : null}>
              <Beat beat={b} cast={cast} thoughtNo={thoughtIndex.map.get(i)} thoughtTotal={thoughtIndex.total} />
            </div>
          ))}
        </div>

        {stepMode && !done && (
          <div className="mt-5 flex items-center gap-3 border-t border-line pt-4">
            <button className="btn-primary px-4 text-sm" onClick={next}>Next line →</button>
            <button className="btn-quiet px-3 text-sm" onClick={enterFull}>Reveal all</button>
          </div>
        )}
        {stepMode && done && (
          <div className="mt-5 border-t border-line pt-4 text-sm text-muted">That’s the whole conversation, end to end. ✓</div>
        )}
      </div>

      {/* Takeaway */}
      {mindset.takeaway && (
        <div className="mt-4 rounded-2xl border border-clay-200 bg-clay-50/50 p-5">
          <div className="kicker mb-1 text-clay-700">The one thing to carry into the room</div>
          <p className="text-[15px] leading-relaxed text-clay-800">{mindset.takeaway}</p>
        </div>
      )}
    </div>
  )
}

// A side annotation — the metadata attached to a beat, styled to read as a
// margin note rather than part of the dialogue.
function Annotation({ label, text, tone }) {
  const styles =
    tone === 'probe'
      ? 'border-sage-300 bg-sage-50/70 text-sage-700'
      : 'border-clay-300 bg-surface text-clay-700'
  return (
    <div className={`mt-1.5 flex items-start gap-2 rounded-md border border-dashed ${styles} px-2.5 py-1`}>
      <span className="shrink-0 pt-px text-[10px] font-semibold uppercase tracking-wider opacity-70">{label}</span>
      <span className="text-xs not-italic leading-relaxed">{text}</span>
    </div>
  )
}

function Beat({ beat, cast, thoughtNo, thoughtTotal }) {
  if (beat.t === 'stage') {
    return (
      <div className="flex items-center gap-3 pt-3 first:pt-0">
        <span className="kicker whitespace-nowrap text-clay-600">{beat.label}</span>
        <span className="h-px flex-1 bg-line" />
      </div>
    )
  }
  if (beat.t === 'interviewer') {
    return (
      <div className="flex gap-3">
        <span className="w-16 shrink-0 pt-0.5 text-right text-sm font-semibold text-ink/70">{cast.interviewer}</span>
        <div className="flex-1">
          <p className="text-[15px] leading-relaxed text-ink/90">{beat.text}</p>
          {beat.probing && <Annotation label="Looking for" text={beat.probing} tone="probe" />}
        </div>
      </div>
    )
  }
  if (beat.t === 'say') {
    return (
      <div className="flex gap-3">
        <span className="w-16 shrink-0 pt-0.5 text-right text-sm font-semibold text-clay-600">{cast.candidate}</span>
        <p className="flex-1 text-[15px] leading-relaxed text-ink">{beat.text}</p>
      </div>
    )
  }
  if (beat.t === 'think') {
    return (
      <div className="flex gap-3">
        <span className="w-16 shrink-0 pt-0.5 text-right text-xs font-medium text-clay-500/80">💭</span>
        <div className="flex-1 rounded-xl border border-clay-200 bg-clay-50 px-4 py-2.5">
          <div className="kicker mb-0.5 text-clay-700">
            {cast.candidate} thinks
            {thoughtNo && <span className="ml-1 text-clay-500/70">· {thoughtNo} of {thoughtTotal}</span>}
          </div>
          <p className="text-[15px] italic leading-relaxed text-clay-900">{beat.text}</p>
          {beat.concept && <Annotation label="Concept" text={beat.concept} tone="concept" />}
        </div>
      </div>
    )
  }
  if (beat.t === 'code') {
    return (
      <div className="flex gap-3">
        <span className="w-16 shrink-0 pt-1 text-right text-xs font-medium text-faint">{cast.candidate} types</span>
        <pre className="flex-1 overflow-x-auto rounded-lg border border-line bg-paper p-3 font-mono text-[12.5px] leading-snug text-ink/85">
          {beat.text}
        </pre>
      </div>
    )
  }
  return null
}
