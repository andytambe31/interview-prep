import React from 'react'

export { daysUntil, formatDate } from '../lib/focus.js'

export function ProgressBar({ value, max = 100, className = '', tone = 'clay' }) {
  const pct = max === 0 ? 0 : Math.min(100, Math.round((value / max) * 100))
  const bar = tone === 'sage' ? 'bg-sage-500' : 'bg-clay-500'
  return (
    <div className={`h-1.5 w-full overflow-hidden rounded-full bg-line ${className}`}>
      <div className={`h-full rounded-full ${bar} transition-all duration-500`} style={{ width: `${pct}%` }} />
    </div>
  )
}

export function ConfidenceDots({ value = 0, max = 5, onChange }) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: max }).map((_, i) => {
        const filled = i < value
        return (
          <button
            key={i}
            type="button"
            aria-label={`Set confidence ${i + 1}`}
            onClick={() => onChange && onChange(i + 1 === value ? 0 : i + 1)}
            className={`h-2.5 w-2.5 rounded-full border transition ${
              filled ? 'border-clay-500 bg-clay-500' : 'border-line bg-transparent hover:border-clay-300'
            } ${onChange ? 'cursor-pointer' : 'cursor-default'}`}
          />
        )
      })}
    </div>
  )
}

const DIFF_STYLE = {
  Easy: 'bg-sage-100 text-sage-600',
  Medium: 'bg-clay-50 text-clay-700',
  Hard: 'bg-[#f3ddd7] text-[#9a3a2a]',
}
export function DifficultyBadge({ level }) {
  return <span className={`pill ${DIFF_STYLE[level] || 'bg-paper text-muted'}`}>{level}</span>
}

const STATUS_STYLE = {
  todo: 'bg-paper text-faint border border-line',
  attempted: 'bg-clay-50 text-clay-700',
  solved: 'bg-sage-100 text-sage-600',
}
const STATUS_LABEL = { todo: 'To do', attempted: 'Attempted', solved: 'Solved' }
export function StatusBadge({ status }) {
  return <span className={`pill ${STATUS_STYLE[status] || STATUS_STYLE.todo}`}>{STATUS_LABEL[status] || status}</span>
}

export function EmphasisBadge({ level }) {
  if (level === 'high') return <span className="pill bg-clay-50 text-clay-700">Core principle</span>
  if (level === 'medium') return <span className="pill bg-paper text-muted border border-line">Common</span>
  return <span className="pill bg-paper text-faint border border-line">Situational</span>
}

export function PageHeader({ kicker, title, intro, right }) {
  return (
    <header className="mb-8">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="max-w-prose">
          {kicker && <div className="kicker mb-2">{kicker}</div>}
          <h1 className="text-3xl font-semibold leading-tight md:text-[2.5rem]">{title}</h1>
          {intro && <p className="mt-3 text-[15px] leading-relaxed text-muted">{intro}</p>}
        </div>
        {right}
      </div>
    </header>
  )
}

export function Empty({ children }) {
  return (
    <div className="rounded-2xl border border-dashed border-line bg-surface/50 p-8 text-center text-sm text-muted">
      {children}
    </div>
  )
}
