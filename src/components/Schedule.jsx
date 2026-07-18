import React from 'react'
import { useStore } from '../store/StoreContext.jsx'
import { SectionHeader, formatDate, daysUntil } from './common.jsx'

function Field({ label, children }) {
  return (
    <div>
      <label className="label">{label}</label>
      {children}
    </div>
  )
}

export default function Schedule() {
  const { state, dispatch } = useStore()
  const { schedule, candidate } = state
  const { logistics, interviews, availability, chosen } = schedule

  const setLogistics = (patch) => dispatch({ type: 'PATCH_LOGISTICS', patch })
  const setChosen = (patch) => dispatch({ type: 'PATCH_SCHEDULE', patch: { chosen: { ...chosen, ...patch } } })
  const setInterview = (id, patch) =>
    dispatch({
      type: 'PATCH_SCHEDULE',
      patch: { interviews: interviews.map((iv) => (iv.id === id ? { ...iv, ...patch } : iv)) },
    })

  const days = daysUntil(chosen.date)

  return (
    <div>
      <SectionHeader
        title="Schedule & Logistics"
        subtitle={`${candidate.format} · Recruiter: ${candidate.recruiter}`}
      />

      <div className="grid gap-4 lg:grid-cols-3">
        {/* Confirmed date */}
        <div className="card lg:col-span-1">
          <h2 className="mb-3 font-semibold text-slate-900 dark:text-white">Confirmed interview</h2>
          <Field label="Date (once confirmed)">
            <input type="date" className="input" value={chosen.date} onChange={(e) => setChosen({ date: e.target.value })} />
          </Field>
          {chosen.date && (
            <div className="mt-2 text-sm text-brand-700 dark:text-brand-300">
              {formatDate(chosen.date)} · {days > 0 ? `${days} days away` : days === 0 ? 'Today!' : 'Past'}
            </div>
          )}
          <div className="mt-3">
            <Field label="Notes">
              <textarea className="input min-h-[70px]" value={chosen.notes} onChange={(e) => setChosen({ notes: e.target.value })} placeholder="Save-the-date details, arrival time…" />
            </Field>
          </div>
        </div>

        {/* Logistics */}
        <div className="card lg:col-span-2">
          <h2 className="mb-3 font-semibold text-slate-900 dark:text-white">Logistics</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            <Field label="LiveCode link">
              <input className="input" value={logistics.livecodeLink} onChange={(e) => setLogistics({ livecodeLink: e.target.value })} placeholder="Paste when it arrives" />
            </Field>
            <Field label="Dietary restrictions">
              <input className="input" value={logistics.dietary} onChange={(e) => setLogistics({ dietary: e.target.value })} />
            </Field>
            <Field label="Flight info">
              <input className="input" value={logistics.flightInfo} onChange={(e) => setLogistics({ flightInfo: e.target.value })} placeholder="Airline, times, confirmation #" />
            </Field>
            <Field label="Hotel info">
              <input className="input" value={logistics.hotelInfo} onChange={(e) => setLogistics({ hotelInfo: e.target.value })} placeholder="Hotel, check-in/out" />
            </Field>
          </div>
          <div className="mt-3 flex flex-wrap gap-4">
            <label className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
              <input type="checkbox" checked={logistics.lunchBuddy} onChange={(e) => setLogistics({ lunchBuddy: e.target.checked })} />
              Lunch Buddy requested
            </label>
            <label className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
              <input type="checkbox" checked={logistics.saveTheDateReceived} onChange={(e) => setLogistics({ saveTheDateReceived: e.target.checked })} />
              Save-the-Date received
            </label>
          </div>
          <div className="mt-3">
            <Field label="What to bring">
              <textarea className="input min-h-[60px]" value={logistics.bringChecklist} onChange={(e) => setLogistics({ bringChecklist: e.target.value })} />
            </Field>
          </div>
        </div>
      </div>

      {/* The 4 rounds */}
      <div className="card mt-4">
        <h2 className="mb-3 font-semibold text-slate-900 dark:text-white">The 4 rounds</h2>
        <p className="mb-4 text-sm text-slate-500 dark:text-slate-400">
          Fill these in as you learn the agenda. Reports suggest ~2 coding, 1 behavioral (often Bar Raiser), and 1 mixed round — with Leadership Principle questions in every round.
        </p>
        <div className="grid gap-3 md:grid-cols-2">
          {interviews.map((iv) => (
            <div key={iv.id} className="rounded-lg border border-slate-200 p-3 dark:border-slate-700">
              <div className="mb-2 text-sm font-semibold text-slate-800 dark:text-slate-100">{iv.label}</div>
              <div className="grid grid-cols-2 gap-2">
                <input className="input" value={iv.type} onChange={(e) => setInterview(iv.id, { type: e.target.value })} placeholder="Type (Coding / LP / Bar Raiser)" />
                <input className="input" value={iv.time} onChange={(e) => setInterview(iv.id, { time: e.target.value })} placeholder="Time" />
                <input className="input" value={iv.interviewer} onChange={(e) => setInterview(iv.id, { interviewer: e.target.value })} placeholder="Interviewer" />
                <input className="input" value={iv.focus} onChange={(e) => setInterview(iv.id, { focus: e.target.value })} placeholder="LP focus / topic" />
              </div>
              <textarea className="input mt-2 min-h-[48px]" value={iv.notes} onChange={(e) => setInterview(iv.id, { notes: e.target.value })} placeholder="Notes" />
            </div>
          ))}
        </div>
      </div>

      {/* Availability sent */}
      <div className="card mt-4">
        <h2 className="mb-3 font-semibold text-slate-900 dark:text-white">Availability you provided</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs uppercase tracking-wide text-slate-500">
                <th className="pb-2 pr-4">#</th>
                <th className="pb-2 pr-4">Date</th>
                <th className="pb-2 pr-4">Window</th>
                <th className="pb-2 pr-4">TZ</th>
              </tr>
            </thead>
            <tbody>
              {availability.map((a, i) => (
                <tr key={a.id} className="border-t border-slate-100 dark:border-slate-800">
                  <td className="py-2 pr-4 text-slate-400">{i + 1}</td>
                  <td className="py-2 pr-4 font-medium text-slate-700 dark:text-slate-200">{formatDate(a.date)}</td>
                  <td className="py-2 pr-4 text-slate-600 dark:text-slate-300">{a.start}–{a.end}</td>
                  <td className="py-2 pr-4 text-slate-500">{a.tz}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
