import React, { useRef } from 'react'
import { useStore } from '../store/StoreContext.jsx'
import { STORAGE_KEY } from '../store/state.js'

export default function SettingsDrawer({ open, onClose }) {
  const { state, dispatch } = useStore()
  const fileRef = useRef(null)

  const exportData = () => {
    const blob = new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'interview-room-backup.json'
    a.click()
    URL.revokeObjectURL(url)
  }

  const importData = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      try {
        dispatch({ type: 'IMPORT', state: JSON.parse(reader.result) })
        onClose()
      } catch {
        alert('That file could not be read as a valid backup.')
      }
    }
    reader.readAsText(file)
    e.target.value = ''
  }

  const reset = () => {
    if (confirm('Reset everything to defaults? This erases your progress in this browser.')) {
      localStorage.removeItem(STORAGE_KEY)
      dispatch({ type: 'RESET' })
      onClose()
    }
  }

  return (
    <>
      <div
        className={`fixed inset-0 z-40 bg-ink/20 transition-opacity ${open ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
        onClick={onClose}
      />
      <aside
        className={`fixed inset-y-0 right-0 z-50 w-full max-w-sm transform border-l border-line bg-surface p-6 transition-transform ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between">
          <h2 className="font-serif text-xl font-semibold">Settings & backup</h2>
          <button className="btn-quiet px-2" onClick={onClose}>
            ✕
          </button>
        </div>

        <p className="mt-4 text-sm text-muted">
          Everything you enter lives only in this browser. Export a backup now and then so nothing is lost if you
          clear site data or switch devices.
        </p>

        <div className="mt-5 space-y-2">
          <button className="btn-outline w-full justify-start" onClick={exportData}>
            ⬇ Export a backup (.json)
          </button>
          <button className="btn-outline w-full justify-start" onClick={() => fileRef.current?.click()}>
            ⬆ Restore from a backup
          </button>
          <button
            className="btn-outline w-full justify-start"
            onClick={() => dispatch({ type: 'RESYNC_SEED' })}
            title="Pull the latest reference content while keeping your progress"
          >
            ↻ Refresh study content
          </button>
          <input ref={fileRef} type="file" accept="application/json" className="hidden" onChange={importData} />
        </div>

        <div className="mt-8 rule pt-5">
          <div className="kicker mb-2">About you</div>
          <p className="text-sm text-muted">
            {state.candidate.name} · {state.candidate.role}
            <br />
            {state.candidate.office}
          </p>
        </div>

        <div className="mt-8">
          <button className="btn-quiet px-3 text-[#9a3a2a]" onClick={reset}>
            Reset everything
          </button>
        </div>
      </aside>
    </>
  )
}
