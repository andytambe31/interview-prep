import React, { useEffect, useState } from 'react'
import { useStore } from './store/StoreContext.jsx'
import { daysUntil, interviewDate } from './lib/focus.js'
import Today from './components/Today.jsx'
import TheLoop from './components/TheLoop.jsx'
import Coding from './components/Coding.jsx'
import Behavioral from './components/Behavioral.jsx'
import Logistics from './components/Logistics.jsx'
import SettingsDrawer from './components/SettingsDrawer.jsx'

const NAV = [
  { id: 'today', label: 'Today', hint: 'Your next steps' },
  { id: 'loop', label: 'The Loop', hint: 'What to expect' },
  { id: 'coding', label: 'Coding', hint: 'Problems & patterns' },
  { id: 'behavioral', label: 'Behavioral', hint: 'Principles & stories' },
  { id: 'logistics', label: 'Logistics', hint: 'Schedule & day-of' },
]

function useHashRoute(defaultRoute) {
  const [route, setRoute] = useState(() => window.location.hash.replace('#', '') || defaultRoute)
  useEffect(() => {
    const onHash = () => {
      setRoute(window.location.hash.replace('#', '') || defaultRoute)
      window.scrollTo({ top: 0 })
    }
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [defaultRoute])
  const go = (r) => {
    if (('#' + r) === window.location.hash) setRoute(r)
    else window.location.hash = r
  }
  return [route, go]
}

export default function App() {
  const { state } = useStore()
  const [route, go] = useHashRoute('today')
  const [mobileOpen, setMobileOpen] = useState(false)
  const [settingsOpen, setSettingsOpen] = useState(false)

  const days = daysUntil(interviewDate(state))
  const firstName = state.candidate.name.split(' ')[0]

  const view = () => {
    switch (route) {
      case 'loop':
        return <TheLoop />
      case 'coding':
        return <Coding />
      case 'behavioral':
        return <Behavioral />
      case 'logistics':
        return <Logistics />
      default:
        return <Today onNavigate={go} />
    }
  }

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-30 flex w-64 transform flex-col border-r border-line bg-surface transition-transform md:static md:translate-x-0 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="px-6 pb-6 pt-7">
          <div className="font-serif text-lg font-semibold leading-none">Interview&nbsp;Room</div>
          <div className="mt-1 text-xs text-faint">{firstName}’s Amazon SDE prep</div>

          {days !== null && (
            <div className="mt-5 rounded-2xl border border-line bg-paper px-4 py-3">
              <div className="flex items-baseline gap-1.5">
                <span className="font-serif text-3xl font-semibold text-clay-600">
                  {days > 0 ? days : days === 0 ? '0' : '—'}
                </span>
                <span className="text-xs text-muted">
                  {days > 1 ? 'days to go' : days === 1 ? 'day to go' : days === 0 ? 'today' : 'set a date'}
                </span>
              </div>
            </div>
          )}
        </div>

        <nav className="flex-1 space-y-1 px-3">
          {NAV.map((item) => {
            const active = route === item.id
            return (
              <button
                key={item.id}
                onClick={() => {
                  go(item.id)
                  setMobileOpen(false)
                }}
                className={`group flex w-full flex-col rounded-xl px-3 py-2.5 text-left transition ${
                  active ? 'bg-clay-50' : 'hover:bg-paper'
                }`}
              >
                <span className={`text-sm font-medium ${active ? 'text-clay-700' : 'text-ink'}`}>{item.label}</span>
                <span className={`text-xs ${active ? 'text-clay-600/70' : 'text-faint'}`}>{item.hint}</span>
              </button>
            )
          })}
        </nav>

        <div className="px-3 pb-5 pt-2">
          <button className="btn-quiet w-full justify-start px-3 text-sm" onClick={() => setSettingsOpen(true)}>
            <span className="text-faint">⚙</span> Settings & backup
          </button>
        </div>
      </aside>

      {mobileOpen && <div className="fixed inset-0 z-20 bg-ink/20 md:hidden" onClick={() => setMobileOpen(false)} />}

      {/* Main */}
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex items-center gap-3 border-b border-line px-4 py-3 md:hidden">
          <button className="btn-quiet px-2" onClick={() => setMobileOpen(true)}>
            ☰
          </button>
          <span className="font-serif font-semibold">Interview Room</span>
        </header>
        <main className="mx-auto w-full max-w-4xl flex-1 px-5 py-10 md:px-10">{view()}</main>
      </div>

      <SettingsDrawer open={settingsOpen} onClose={() => setSettingsOpen(false)} />
    </div>
  )
}
