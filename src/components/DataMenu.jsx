import React, { useRef } from 'react'
import { useStore } from '../store/StoreContext.jsx'
import { STORAGE_KEY } from '../store/state.js'

export default function DataMenu() {
  const { state, dispatch } = useStore()
  const fileRef = useRef(null)

  const exportData = () => {
    const blob = new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `interview-prep-backup.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  const importData = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      try {
        const parsed = JSON.parse(reader.result)
        dispatch({ type: 'IMPORT', state: parsed })
      } catch {
        alert('That file could not be read as valid backup JSON.')
      }
    }
    reader.readAsText(file)
    e.target.value = ''
  }

  const resync = () => {
    dispatch({ type: 'RESYNC_SEED' })
  }

  const reset = () => {
    if (confirm('Reset everything to defaults? This erases all your progress in this browser.')) {
      localStorage.removeItem(STORAGE_KEY)
      dispatch({ type: 'RESET' })
    }
  }

  return (
    <div className="grid grid-cols-2 gap-2">
      <button className="btn-outline text-xs" onClick={exportData}>
        ⬇ Export
      </button>
      <button className="btn-outline text-xs" onClick={() => fileRef.current?.click()}>
        ⬆ Import
      </button>
      <button className="btn-outline text-xs" onClick={resync} title="Pull latest reference content, keep progress">
        ↻ Sync content
      </button>
      <button className="btn-outline text-xs text-rose-600 dark:text-rose-400" onClick={reset}>
        ⟲ Reset
      </button>
      <input ref={fileRef} type="file" accept="application/json" className="hidden" onChange={importData} />
    </div>
  )
}
