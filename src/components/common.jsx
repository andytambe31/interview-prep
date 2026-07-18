import React from 'react'

export function ProgressBar({ value, max = 100, className = '' }) {
  const pct = max === 0 ? 0 : Math.round((value / max) * 100)
  return (
    <div className={`h-2 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800 ${className}`}>
      <div
        className="h-full rounded-full bg-brand-500 transition-all"
        style={{ width: `${pct}%` }}
      />
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
            className={`h-3.5 w-3.5 rounded-full border transition ${
              filled
                ? 'border-brand-500 bg-brand-500'
                : 'border-slate-300 bg-transparent hover:border-brand-400 dark:border-slate-600'
            } ${onChange ? 'cursor-pointer' : 'cursor-default'}`}
          />
        )
      })}
    </div>
  )
}

const DIFF_STYLE = {
  Easy: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300',
  Medium: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300',
  Hard: 'bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300',
}

export function DifficultyBadge({ level }) {
  return <span className={`badge ${DIFF_STYLE[level] || 'bg-slate-100 text-slate-600'}`}>{level}</span>
}

const STATUS_STYLE = {
  todo: 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400',
  attempted: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300',
  solved: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300',
}

export function StatusBadge({ status }) {
  return <span className={`badge ${STATUS_STYLE[status] || STATUS_STYLE.todo}`}>{status}</span>
}

export function EmphasisBadge({ level }) {
  const style =
    level === 'high'
      ? 'bg-brand-100 text-brand-700 dark:bg-brand-900/40 dark:text-brand-300'
      : level === 'medium'
        ? 'bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-200'
        : 'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400'
  return <span className={`badge ${style}`}>{level} priority</span>
}

export function SectionHeader({ title, subtitle, right }) {
  return (
    <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">{title}</h1>
        {subtitle && <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{subtitle}</p>}
      </div>
      {right}
    </div>
  )
}

export function Stat({ label, value, sub }) {
  return (
    <div className="card">
      <div className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
        {label}
      </div>
      <div className="mt-1 text-3xl font-bold text-slate-900 dark:text-white">{value}</div>
      {sub && <div className="mt-1 text-xs text-slate-500 dark:text-slate-400">{sub}</div>}
    </div>
  )
}

export function Empty({ children }) {
  return (
    <div className="rounded-lg border border-dashed border-slate-300 p-6 text-center text-sm text-slate-500 dark:border-slate-700 dark:text-slate-400">
      {children}
    </div>
  )
}

// Days until a YYYY-MM-DD date from today.
export function daysUntil(dateStr) {
  if (!dateStr) return null
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const target = new Date(dateStr + 'T00:00:00')
  return Math.round((target - today) / (1000 * 60 * 60 * 24))
}

export function formatDate(dateStr) {
  if (!dateStr) return '—'
  const d = new Date(dateStr + 'T00:00:00')
  return d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
}
