import React, { useState } from 'react'
import { useStore } from '../store/StoreContext.jsx'
import { PageHeader, formatDate, daysUntil, Empty } from './common.jsx'

function newId(prefix) {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) return prefix + '-' + crypto.randomUUID()
  return prefix + '-' + Date.now() + '-' + Math.floor(Math.random() * 1e6)
}

function Field({ label, children }) {
  return (
    <div>
      <label className="label">{label}</label>
      {children}
    </div>
  )
}

export default function Logistics() {
  const { state, dispatch } = useStore()
  const { schedule, candidate } = state
  const { logistics, interviews, availability, chosen } = schedule

  const setLog = (patch) => dispatch({ type: 'PATCH_LOGISTICS', patch })
  const setChosen = (patch) => dispatch({ type: 'PATCH_SCHEDULE', patch: { chosen: { ...chosen, ...patch } } })
  const setIv = (id, patch) =>
    dispatch({ type: 'PATCH_SCHEDULE', patch: { interviews: interviews.map((iv) => (iv.id === id ? { ...iv, ...patch } : iv)) } })
  const days = daysUntil(chosen.date)

  return (
    <div>
      <PageHeader
        kicker="Logistics"
        title="Everything for the day, in one place"
        intro={`In-person at ${candidate.office}. Recruiter: ${candidate.recruiter}. Fill things in as they’re confirmed so nothing lives in your inbox on the day.`}
      />

      {/* Date + LiveCode side by side */}
      <div className="grid gap-4 md:grid-cols-2">
        <div className="surface p-5">
          <div className="kicker mb-3">Confirmed interview</div>
          <Field label="Date (once confirmed)">
            <input type="date" className="input" value={chosen.date} onChange={(e) => setChosen({ date: e.target.value })} />
          </Field>
          {chosen.date && (
            <p className="mt-2 text-sm text-clay-600">
              {formatDate(chosen.date)} · {days > 0 ? `${days} days away` : days === 0 ? 'today' : 'past'}
            </p>
          )}
          <div className="mt-4">
            <Field label="Notes">
              <textarea className="input min-h-[64px]" value={chosen.notes} placeholder="Arrival time, building, contact…" onChange={(e) => setChosen({ notes: e.target.value })} />
            </Field>
          </div>
        </div>

        <div className="surface p-5">
          <div className="kicker mb-3">Key details</div>
          <Field label="LiveCode link">
            <input className="input" value={logistics.livecodeLink} placeholder="Paste when it arrives by email" onChange={(e) => setLog({ livecodeLink: e.target.value })} />
          </Field>
          <div className="mt-3 grid grid-cols-2 gap-3">
            <Field label="Flight">
              <input className="input" value={logistics.flightInfo} onChange={(e) => setLog({ flightInfo: e.target.value })} />
            </Field>
            <Field label="Hotel">
              <input className="input" value={logistics.hotelInfo} onChange={(e) => setLog({ hotelInfo: e.target.value })} />
            </Field>
          </div>
          <div className="mt-3 flex flex-wrap gap-4 text-sm">
            <label className="flex items-center gap-2 text-muted">
              <input type="checkbox" checked={logistics.lunchBuddy} onChange={(e) => setLog({ lunchBuddy: e.target.checked })} /> Lunch buddy
            </label>
            <label className="flex items-center gap-2 text-muted">
              <input type="checkbox" checked={logistics.saveTheDateReceived} onChange={(e) => setLog({ saveTheDateReceived: e.target.checked })} /> Save-the-Date received
            </label>
          </div>
        </div>
      </div>

      {/* The 4 rounds */}
      <section className="mt-10">
        <h2 className="mb-1 text-2xl font-semibold">The four rounds</h2>
        <p className="mb-4 max-w-prose text-sm text-muted">
          Typically ~2 coding, one behavioral (often the Bar Raiser), and one mixed — with principle questions in
          every round. Fill in as you learn the agenda.
        </p>
        <div className="grid gap-3 md:grid-cols-2">
          {interviews.map((iv) => (
            <div key={iv.id} className="rounded-2xl border border-line bg-surface p-4">
              <div className="mb-2 font-serif text-lg">{iv.label}</div>
              <div className="grid grid-cols-2 gap-2">
                <input className="input" value={iv.type} placeholder="Type (Coding / LP / Bar Raiser)" onChange={(e) => setIv(iv.id, { type: e.target.value })} />
                <input className="input" value={iv.time} placeholder="Time" onChange={(e) => setIv(iv.id, { time: e.target.value })} />
                <input className="input" value={iv.interviewer} placeholder="Interviewer" onChange={(e) => setIv(iv.id, { interviewer: e.target.value })} />
                <input className="input" value={iv.focus} placeholder="Focus / topic" onChange={(e) => setIv(iv.id, { focus: e.target.value })} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Bring + availability */}
      <section className="mt-10 grid gap-4 md:grid-cols-2">
        <div className="surface p-5">
          <div className="kicker mb-2">What to bring</div>
          <textarea className="input min-h-[120px]" value={logistics.bringChecklist} onChange={(e) => setLog({ bringChecklist: e.target.value })} />
        </div>
        <div className="surface p-5">
          <div className="kicker mb-3">Availability you provided</div>
          <div className="space-y-1.5 text-sm">
            {availability.map((a, i) => (
              <div key={a.id} className="flex items-center justify-between border-b border-line pb-1.5 last:border-0">
                <span className="text-ink">
                  <span className="mr-2 text-faint">{i + 1}</span>
                  {formatDate(a.date, { weekday: 'short', month: 'short', day: 'numeric' })}
                </span>
                <span className="text-muted">
                  {a.start}–{a.end} {a.tz}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Todos />
      <Resources />
    </div>
  )
}

function Todos() {
  const { state, dispatch } = useStore()
  const [text, setText] = useState('')
  const [due, setDue] = useState('')
  const [priority, setPriority] = useState('medium')

  const add = () => {
    if (!text.trim()) return
    dispatch({ type: 'UPSERT_TODO', todo: { id: newId('todo'), text: text.trim(), due, priority, done: false } })
    setText('')
    setDue('')
    setPriority('medium')
  }
  const sorted = [...state.todos].sort((a, b) => Number(a.done) - Number(b.done))

  return (
    <section className="mt-10">
      <h2 className="mb-3 text-2xl font-semibold">To-dos</h2>
      <div className="mb-3 flex flex-wrap gap-2">
        <input className="input min-w-[12rem] flex-1" placeholder="Add a task…" value={text} onChange={(e) => setText(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && add()} />
        <input type="date" className="input max-w-[9rem]" value={due} onChange={(e) => setDue(e.target.value)} />
        <select className="input max-w-[7rem]" value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
        <button className="btn-primary" onClick={add}>Add</button>
      </div>
      {sorted.length === 0 ? (
        <Empty>No tasks yet.</Empty>
      ) : (
        <ul className="divide-y divide-line rounded-2xl border border-line bg-surface">
          {sorted.map((t) => (
            <li key={t.id} className="flex items-center gap-3 px-4 py-2.5">
              <input type="checkbox" checked={t.done} onChange={() => dispatch({ type: 'UPSERT_TODO', todo: { ...t, done: !t.done } })} />
              <span className={`h-2 w-2 shrink-0 rounded-full ${t.priority === 'high' ? 'bg-clay-500' : t.priority === 'medium' ? 'bg-clay-200' : 'bg-line'}`} />
              <span className={`flex-1 text-sm ${t.done ? 'text-faint line-through' : 'text-ink'}`}>
                {t.text}
                {t.due && <span className="ml-1.5 text-xs text-faint">· {formatDate(t.due, { month: 'short', day: 'numeric' })}</span>}
              </span>
              <button className="text-faint hover:text-[#9a3a2a]" onClick={() => dispatch({ type: 'DELETE_TODO', id: t.id })}>✕</button>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

function Resources() {
  const { state, dispatch } = useStore()
  const grouped = state.resources.reduce((acc, r) => {
    ;(acc[r.category] = acc[r.category] || []).push(r)
    return acc
  }, {})

  return (
    <section className="mt-10">
      <h2 className="mb-3 text-2xl font-semibold">Resources</h2>
      <div className="grid gap-6 sm:grid-cols-2">
        {Object.entries(grouped).map(([cat, items]) => (
          <div key={cat}>
            <div className="kicker mb-2">{cat}</div>
            <ul className="space-y-2">
              {items.map((r) => (
                <li key={r.id} className="text-sm">
                  {r.url ? (
                    <a href={r.url} target="_blank" rel="noreferrer" className="font-medium text-clay-600 hover:underline">
                      {r.title}
                    </a>
                  ) : (
                    <span className="font-medium">{r.title}</span>
                  )}
                  {r.note && <div className="text-xs text-muted">{r.note}</div>}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}
