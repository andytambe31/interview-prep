import React, { useState } from 'react'
import { useStore } from '../store/StoreContext.jsx'
import { PageHeader, Empty } from './common.jsx'
import { resumeIntro, bulletChecklist, commonResumeQuestions, resumeRedFlags } from '../data/resumePrep.js'

function newId() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) return 'r-' + crypto.randomUUID()
  return 'r-' + Date.now() + '-' + Math.floor(Math.random() * 1e6)
}
const emptyItem = () => ({
  id: newId(),
  title: '',
  oneLiner: '',
  problem: '',
  role: '',
  tech: '',
  hardest: '',
  impact: '',
  improve: '',
  lpIds: [],
  ready: false,
})

export default function Resume() {
  const { state, dispatch } = useStore()
  const items = state.resumeItems || []
  const [editing, setEditing] = useState(null)

  const readyCount = items.filter((i) => i.ready).length

  const save = () => {
    if (!editing) return
    dispatch({ type: 'UPSERT_RESUME_ITEM', item: editing })
    setEditing(null)
  }

  return (
    <div>
      <PageHeader
        kicker="Résumé"
        title="Know your résumé cold"
        intro={resumeIntro}
        right={
          <button className="btn-primary" onClick={() => setEditing(emptyItem())}>
            + Add a project
          </button>
        }
      />

      {items.length > 0 && (
        <p className="mb-6 text-sm text-muted">
          {readyCount} of {items.length} projects marked interview-ready.
        </p>
      )}

      {/* Editor */}
      {editing && (
        <div className="mb-6 rounded-2xl border border-clay-300 bg-surface p-6 ring-2 ring-clay-500/10">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-serif text-xl">{items.some((i) => i.id === editing.id) ? 'Edit project' : 'Add project'}</h3>
            <button className="btn-quiet px-2" onClick={() => setEditing(null)}>✕</button>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="label">Title</label>
              <input className="input" placeholder="e.g. SWE Intern @ Acme, or Capstone: X" value={editing.title} onChange={(e) => setEditing({ ...editing, title: e.target.value })} />
            </div>
            <div>
              <label className="label">Résumé bullet (as written)</label>
              <input className="input" placeholder="Paste the line from your résumé" value={editing.oneLiner} onChange={(e) => setEditing({ ...editing, oneLiner: e.target.value })} />
            </div>
          </div>
          <div className="mt-4 grid gap-4">
            {bulletChecklist.map((f) => (
              <div key={f.key}>
                <label className="label">{f.label}</label>
                <p className="mb-1 text-xs text-faint">{f.hint}</p>
                <textarea className="input min-h-[56px]" value={editing[f.key]} onChange={(e) => setEditing({ ...editing, [f.key]: e.target.value })} />
              </div>
            ))}
          </div>
          <label className="mt-4 flex items-center gap-2 text-sm text-muted">
            <input type="checkbox" checked={editing.ready} onChange={(e) => setEditing({ ...editing, ready: e.target.checked })} />
            I can speak to this project two layers deep
          </label>
          <div className="mt-4">
            <button className="btn-primary" onClick={save}>Save project</button>
          </div>
        </div>
      )}

      {/* Items */}
      {items.length === 0 && !editing ? (
        <Empty>
          No projects yet. Add each project or experience from your résumé — once you paste it in, the app walks you
          through the dive-deep prep for each one.
        </Empty>
      ) : (
        <div className="space-y-3">
          {items.map((it) => (
            <div key={it.id} className="rounded-2xl border border-line bg-surface p-5">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-serif text-lg">{it.title || 'Untitled project'}</span>
                    {it.ready ? (
                      <span className="pill bg-sage-100 text-sage-600">ready</span>
                    ) : (
                      <span className="pill border border-line bg-paper text-faint">in progress</span>
                    )}
                  </div>
                  {it.oneLiner && <div className="mt-1 text-sm italic text-muted">“{it.oneLiner}”</div>}
                </div>
                <div className="flex shrink-0 gap-1">
                  <button className="btn-quiet px-2 text-xs" onClick={() => setEditing(it)}>Edit</button>
                  <button className="btn-quiet px-2 text-xs text-[#9a3a2a]" onClick={() => confirm('Delete this project?') && dispatch({ type: 'DELETE_RESUME_ITEM', id: it.id })}>Delete</button>
                </div>
              </div>
              {bulletChecklist.some((f) => it[f.key]) && (
                <div className="mt-4 grid gap-2 sm:grid-cols-2">
                  {bulletChecklist.map((f) =>
                    it[f.key] ? (
                      <div key={f.key} className="rounded-xl bg-paper p-3 text-sm">
                        <div className="text-xs font-semibold uppercase tracking-wide text-clay-600">{f.label}</div>
                        <div className="mt-0.5 text-ink/85">{it[f.key]}</div>
                      </div>
                    ) : null,
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Guidance */}
      <section className="rule mt-10 pt-8">
        <h2 className="mb-4 text-2xl font-semibold">How to prepare each project</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <div className="kicker mb-2">Questions to expect</div>
            <ul className="space-y-1.5 text-[15px] text-ink/90">
              {commonResumeQuestions.map((q, i) => (
                <li key={i} className="flex gap-2">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-clay-300" />
                  <span>{q}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="kicker mb-2">Red flags to avoid</div>
            <ul className="space-y-1.5 text-[15px] text-ink/90">
              {resumeRedFlags.map((q, i) => (
                <li key={i} className="flex gap-2">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-clay-300" />
                  <span>{q}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  )
}
