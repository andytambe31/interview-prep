import React, { useEffect, useState } from 'react'
import { useStore } from './store/StoreContext.jsx'
import { daysUntil } from './components/common.jsx'
import Dashboard from './components/Dashboard.jsx'
import Schedule from './components/Schedule.jsx'
import CodingPrep from './components/CodingPrep.jsx'
import LeadershipPrinciples from './components/LeadershipPrinciples.jsx'
import Resources from './components/Resources.jsx'
import Insights from './components/Insights.jsx'
import DataMenu from './components/DataMenu.jsx'

const NAV = [
  { id: 'dashboard', label: 'Dashboard', icon: '◧' },
  { id: 'schedule', label: 'Schedule & Logistics', icon: '📅' },
  { id: 'coding', label: 'Coding Prep', icon: '⌨' },
  { id: 'lps', label: 'Leadership Principles', icon: '★' },
  { id: 'insights', label: 'Insights & Playbook', icon: '💡' },
  { id: 'resources', label: 'Resources & To-Dos', icon: '🔗' },
]

function useHashRoute(defaultRoute) {
  const [route, setRoute] = useState(() => window.location.hash.replace('#', '') || defaultRoute)
  useEffect(() => {
    const onHash = () => setRoute(window.location.hash.replace('#', '') || defaultRoute)
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [defaultRoute])
  const go = (r) => {
    window.location.hash = r
    setRoute(r)
  }
  return [route, go]
}

function ThemeToggle() {
  const { state, dispatch } = useStore()
  const order = ['system', 'light', 'dark']
  const next = order[(order.indexOf(state.ui.theme) + 1) % order.length]
  const icon = state.ui.theme === 'dark' ? '🌙' : state.ui.theme === 'light' ? '☀️' : '💻'
  return (
    <button
      className="btn-ghost"
      title={`Theme: ${state.ui.theme} (click for ${next})`}
      onClick={() => dispatch({ type: 'SET_THEME', theme: next })}
    >
      <span>{icon}</span>
    </button>
  )
}

export default function App() {
  const { state } = useStore()
  const [route, go] = useHashRoute('dashboard')
  const [mobileOpen, setMobileOpen] = useState(false)

  const chosenDate = state.schedule.chosen.date
  const firstAvail = state.schedule.availability[0]?.date
  const countdownDate = chosenDate || firstAvail
  const days = daysUntil(countdownDate)

  const view = () => {
    switch (route) {
      case 'schedule':
        return <Schedule />
      case 'coding':
        return <CodingPrep />
      case 'lps':
        return <LeadershipPrinciples />
      case 'insights':
        return <Insights />
      case 'resources':
        return <Resources />
      default:
        return <Dashboard onNavigate={go} />
    }
  }

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-30 w-64 transform border-r border-slate-200 bg-white transition-transform dark:border-slate-800 dark:bg-slate-900 md:static md:translate-x-0 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex h-full flex-col">
          <div className="border-b border-slate-200 p-5 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-600 font-bold text-white">
                A
              </div>
              <div>
                <div className="text-sm font-bold leading-tight text-slate-900 dark:text-white">
                  Interview Command
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400">Amazon SDE Loop</div>
              </div>
            </div>
            {days !== null && (
              <div className="mt-4 rounded-lg bg-brand-50 p-3 text-center dark:bg-brand-900/30">
                <div className="text-2xl font-extrabold text-brand-700 dark:text-brand-300">
                  {days > 0 ? `${days}` : days === 0 ? 'Today' : `${Math.abs(days)}d ago`}
                </div>
                <div className="text-[11px] font-medium uppercase tracking-wide text-brand-600/80 dark:text-brand-300/70">
                  {days > 0 ? `days to ${chosenDate ? 'interview' : 'first slot'}` : ''}
                </div>
              </div>
            )}
          </div>

          <nav className="flex-1 space-y-1 overflow-y-auto p-3">
            {NAV.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  go(item.id)
                  setMobileOpen(false)
                }}
                className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition ${
                  route === item.id
                    ? 'bg-brand-600 text-white'
                    : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'
                }`}
              >
                <span className="w-5 text-center">{item.icon}</span>
                {item.label}
              </button>
            ))}
          </nav>

          <div className="border-t border-slate-200 p-3 dark:border-slate-800">
            <DataMenu />
            <p className="mt-3 px-1 text-[11px] leading-snug text-slate-400">
              Data is saved in this browser only (localStorage). Export regularly to back up.
            </p>
          </div>
        </div>
      </aside>

      {mobileOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/40 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Main */}
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white/80 px-4 py-3 backdrop-blur dark:border-slate-800 dark:bg-slate-900/80 md:px-8">
          <div className="flex items-center gap-3">
            <button className="btn-ghost md:hidden" onClick={() => setMobileOpen(true)}>
              ☰
            </button>
            <div className="text-sm text-slate-500 dark:text-slate-400">
              <span className="font-semibold text-slate-800 dark:text-slate-100">
                {state.candidate.name}
              </span>{' '}
              · {state.candidate.role} · {state.candidate.office}
            </div>
          </div>
          <ThemeToggle />
        </header>

        <main className="mx-auto w-full max-w-6xl flex-1 p-4 md:p-8">{view()}</main>
      </div>
    </div>
  )
}
