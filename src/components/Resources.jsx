import React, { useState } from 'react'
import { useStore } from '../store/StoreContext.jsx'
import { SectionHeader, formatDate, Empty } from './common.jsx'

function newId(prefix) {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) return prefix + '-' + crypto.randomUUID()
  return prefix + '-' + Date.now() + '-' + Math.floor(Math.random() * 1e6)
}

export default function Resources() {
  const { state, dispatch } = useStore()
  const { resources, todos } = state

  return (
    <div>
      <SectionHeader title="Resources & To-Dos" subtitle="Your link library and action list" />
      <div className="grid gap-4 lg:grid-cols-2">
        <Todos todos={todos} dispatch={dispatch} />
        <ResourceList resources={resources} dispatch={dispatch} />
      </div>
    </div>
  )
}

function Todos({ todos, dispatch }) {
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

  const sorted = [...todos].sort((a, b) => Number(a.done) - Number(b.done))

  return (
    <div className="card">
      <h2 className="mb-3 font-semibold text-slate-900 dark:text-white">To-Do</h2>
      <div className="mb-3 flex flex-wrap gap-2">
        <input
          className="input flex-1 min-w-[10rem]"
          placeholder="Add a task…"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && add()}
        />
        <input type="date" className="input max-w-[9rem]" value={due} onChange={(e) => setDue(e.target.value)} />
        <select className="input max-w-[7rem]" value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
        <button className="btn-primary" onClick={add}>
          Add
        </button>
      </div>

      {sorted.length === 0 ? (
        <Empty>No tasks yet.</Empty>
      ) : (
        <ul className="space-y-1.5">
          {sorted.map((t) => (
            <li key={t.id} className="flex items-center gap-2 rounded-lg px-1 py-1 hover:bg-slate-50 dark:hover:bg-slate-800/60">
              <input
                type="checkbox"
                checked={t.done}
                onChange={() => dispatch({ type: 'UPSERT_TODO', todo: { ...t, done: !t.done } })}
              />
              <span
                className={`h-2 w-2 shrink-0 rounded-full ${
                  t.priority === 'high' ? 'bg-rose-500' : t.priority === 'medium' ? 'bg-amber-500' : 'bg-slate-400'
                }`}
              />
              <span className={`flex-1 text-sm ${t.done ? 'text-slate-400 line-through' : 'text-slate-700 dark:text-slate-200'}`}>
                {t.text}
                {t.due && <span className="ml-1 text-xs text-slate-400">· {formatDate(t.due)}</span>}
              </span>
              <button
                className="text-xs text-slate-400 hover:text-rose-500"
                onClick={() => dispatch({ type: 'DELETE_TODO', id: t.id })}
              >
                ✕
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

function ResourceList({ resources, dispatch }) {
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  const [category, setCategory] = useState('Coding')

  const add = () => {
    if (!title.trim()) return
    dispatch({
      type: 'UPSERT_RESOURCE',
      resource: { id: newId('res'), title: title.trim(), url: url.trim(), category, note: '' },
    })
    setTitle('')
    setUrl('')
  }

  const grouped = resources.reduce((acc, r) => {
    ;(acc[r.category] = acc[r.category] || []).push(r)
    return acc
  }, {})

  return (
    <div className="card">
      <h2 className="mb-3 font-semibold text-slate-900 dark:text-white">Resources</h2>
      <div className="mb-3 grid gap-2">
        <div className="flex gap-2">
          <input className="input flex-1" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
          <select className="input max-w-[9rem]" value={category} onChange={(e) => setCategory(e.target.value)}>
            {['Coding', 'Behavioral', 'Official', 'Other'].map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </div>
        <div className="flex gap-2">
          <input className="input flex-1" placeholder="URL (optional)" value={url} onChange={(e) => setUrl(e.target.value)} />
          <button className="btn-primary" onClick={add}>
            Add
          </button>
        </div>
      </div>

      {Object.keys(grouped).length === 0 ? (
        <Empty>No resources yet.</Empty>
      ) : (
        <div className="space-y-4">
          {Object.entries(grouped).map(([cat, items]) => (
            <div key={cat}>
              <div className="mb-1 text-xs font-semibold uppercase tracking-wide text-slate-500">{cat}</div>
              <ul className="space-y-1.5">
                {items.map((r) => (
                  <li key={r.id} className="flex items-start gap-2 text-sm">
                    <span className="mt-1 text-slate-300">•</span>
                    <div className="min-w-0 flex-1">
                      {r.url ? (
                        <a href={r.url} target="_blank" rel="noreferrer" className="font-medium text-brand-600 hover:underline">
                          {r.title}
                        </a>
                      ) : (
                        <span className="font-medium text-slate-700 dark:text-slate-200">{r.title}</span>
                      )}
                      {r.note && <div className="text-xs text-slate-400">{r.note}</div>}
                    </div>
                    <button
                      className="text-xs text-slate-400 hover:text-rose-500"
                      onClick={() => dispatch({ type: 'DELETE_RESOURCE', id: r.id })}
                    >
                      ✕
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
