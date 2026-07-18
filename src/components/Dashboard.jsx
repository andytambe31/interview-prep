import React from 'react'
import { useStore } from '../store/StoreContext.jsx'
import { Stat, ProgressBar, SectionHeader, daysUntil, formatDate } from './common.jsx'
import { highYield } from '../data/insights.js'

export default function Dashboard({ onNavigate }) {
  const { state } = useStore()
  const { coding, lps, stories, todos, schedule, candidate } = state

  const solved = coding.problems.filter((p) => p.status === 'solved').length
  const attempted = coding.problems.filter((p) => p.status === 'attempted').length
  const totalProblems = coding.problems.length

  const coveredLpIds = new Set(stories.flatMap((s) => s.lpIds || []))
  const highLps = lps.filter((lp) => lp.emphasis === 'high')
  const highCovered = highLps.filter((lp) => coveredLpIds.has(lp.id)).length

  const openTodos = todos.filter((t) => !t.done)
  const chosenDate = schedule.chosen.date
  const countdownDate = chosenDate || schedule.availability[0]?.date
  const days = daysUntil(countdownDate)

  return (
    <div>
      <SectionHeader
        title={`Welcome, ${candidate.name.split(' ')[0]} 👋`}
        subtitle={`${candidate.company} · ${candidate.role} · ${candidate.format}`}
      />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <Stat
          label="Countdown"
          value={days === null ? '—' : days > 0 ? `${days}d` : days === 0 ? 'Today' : 'Past'}
          sub={countdownDate ? formatDate(countdownDate) + (chosenDate ? ' (confirmed)' : ' (first slot)') : 'Pick a date'}
        />
        <Stat label="Problems solved" value={`${solved}/${totalProblems}`} sub={`${attempted} attempted`} />
        <Stat label="High-priority LPs covered" value={`${highCovered}/${highLps.length}`} sub={`${stories.length} stories in bank`} />
        <Stat label="Open to-dos" value={openTodos.length} sub={`${todos.length - openTodos.length} done`} />
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        {/* Coding progress */}
        <div className="card lg:col-span-2">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="font-semibold text-slate-900 dark:text-white">Coding progress</h2>
            <button className="text-sm font-medium text-brand-600 hover:underline" onClick={() => onNavigate('coding')}>
              Open tracker →
            </button>
          </div>
          <div className="mb-2 flex items-center justify-between text-sm text-slate-500 dark:text-slate-400">
            <span>{solved} solved · {attempted} attempted · {totalProblems - solved - attempted} to do</span>
            <span>{Math.round((solved / totalProblems) * 100)}%</span>
          </div>
          <ProgressBar value={solved} max={totalProblems} />
          <div className="mt-4">
            <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
              Highest-yield problems to over-prepare
            </div>
            <div className="flex flex-wrap gap-1.5">
              {highYield.slice(0, 15).map((t) => (
                <span key={t} className="badge bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Next actions */}
        <div className="card">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="font-semibold text-slate-900 dark:text-white">Next actions</h2>
            <button className="text-sm font-medium text-brand-600 hover:underline" onClick={() => onNavigate('resources')}>
              All →
            </button>
          </div>
          {openTodos.length === 0 ? (
            <p className="text-sm text-slate-500">All caught up 🎉</p>
          ) : (
            <ul className="space-y-2">
              {openTodos.slice(0, 6).map((t) => (
                <li key={t.id} className="flex items-start gap-2 text-sm">
                  <span
                    className={`mt-1 h-2 w-2 shrink-0 rounded-full ${
                      t.priority === 'high' ? 'bg-rose-500' : t.priority === 'medium' ? 'bg-amber-500' : 'bg-slate-400'
                    }`}
                  />
                  <span className="text-slate-700 dark:text-slate-300">
                    {t.text}
                    {t.due && <span className="ml-1 text-xs text-slate-400">· {formatDate(t.due)}</span>}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Quick nav cards */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <NavCard title="Schedule & Logistics" desc="Interview date, LiveCode link, travel, lunch buddy" onClick={() => onNavigate('schedule')} />
        <NavCard title="Leadership Principles" desc="Build your STAR story bank across the 16 LPs" onClick={() => onNavigate('lps')} />
        <NavCard title="Insights & Playbook" desc="Loop structure, Bar Raiser, day-of tips, study plan" onClick={() => onNavigate('insights')} />
      </div>
    </div>
  )
}

function NavCard({ title, desc, onClick }) {
  return (
    <button onClick={onClick} className="card text-left transition hover:border-brand-400 hover:shadow-md">
      <div className="font-semibold text-slate-900 dark:text-white">{title}</div>
      <div className="mt-1 text-sm text-slate-500 dark:text-slate-400">{desc}</div>
    </button>
  )
}
