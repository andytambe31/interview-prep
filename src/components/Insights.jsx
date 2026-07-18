import React, { useState } from 'react'
import { SectionHeader } from './common.jsx'
import {
  loopStructure,
  liveCode,
  barRaiser,
  starMethod,
  codingSignals,
  difficultySplit,
  dayOf,
  timeline,
  redFlags,
  bostonNotes,
  studyPlan,
  sources,
} from '../data/insights.js'

function Panel({ title, icon, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className="card p-0">
      <button className="flex w-full items-center gap-3 p-4 text-left" onClick={() => setOpen(!open)}>
        <span className="text-lg">{icon}</span>
        <span className="flex-1 font-semibold text-slate-900 dark:text-white">{title}</span>
        <span className="text-slate-400">{open ? '−' : '+'}</span>
      </button>
      {open && <div className="border-t border-slate-100 p-4 dark:border-slate-800">{children}</div>}
    </div>
  )
}

const List = ({ items }) => (
  <ul className="list-disc space-y-1.5 pl-5 text-sm text-slate-600 dark:text-slate-300">
    {items.map((it, i) => (
      <li key={i}>{it}</li>
    ))}
  </ul>
)

export default function Insights() {
  return (
    <div>
      <SectionHeader
        title="Insights & Playbook"
        subtitle="Researched from firsthand candidate reports and official guidance. Treat as high-probability patterns, not a guaranteed script — your recruiter is the authority on the day's agenda."
      />

      <div className="grid gap-3">
        <Panel title="How the loop is structured" icon="🗺️" defaultOpen>
          <p className="mb-3 text-sm text-slate-600 dark:text-slate-300">{loopStructure.summary}</p>
          <div className="grid gap-2 sm:grid-cols-2">
            {loopStructure.rounds.map((r) => (
              <div key={r.round} className="rounded-lg border border-slate-200 p-3 dark:border-slate-700">
                <div className="text-sm font-semibold text-slate-800 dark:text-slate-100">
                  Round {r.round} · {r.focus}
                </div>
                <div className="mt-1 text-sm text-slate-500 dark:text-slate-400">{r.detail}</div>
              </div>
            ))}
          </div>
          <p className="mt-3 rounded-lg bg-amber-50 p-3 text-sm text-amber-800 dark:bg-amber-900/20 dark:text-amber-200">
            {loopStructure.perRound}
          </p>
        </Panel>

        <Panel title="The LiveCode environment" icon="⌨️">
          <List items={liveCode} />
        </Panel>

        <Panel title="The Bar Raiser round" icon="🚩">
          <dl className="space-y-2 text-sm">
            {[
              ['What it is', barRaiser.what],
              ['How to spot it', barRaiser.identify],
              ['What they focus on', barRaiser.focus],
              ['Weight in the decision', barRaiser.weight],
            ].map(([k, v]) => (
              <div key={k}>
                <dt className="font-semibold text-slate-700 dark:text-slate-200">{k}</dt>
                <dd className="text-slate-600 dark:text-slate-400">{v}</dd>
              </div>
            ))}
          </dl>
        </Panel>

        <Panel title="STAR method — the Amazon way" icon="⭐">
          <p className="mb-3 text-sm text-slate-600 dark:text-slate-300">{starMethod.intro}</p>
          <div className="mb-3 grid gap-2 sm:grid-cols-2">
            {starMethod.parts.map((p) => (
              <div key={p.k} className="rounded-lg bg-slate-50 p-2 text-sm dark:bg-slate-800/60">
                <span className="font-semibold text-slate-700 dark:text-slate-200">{p.k}</span>{' '}
                <span className="text-slate-400">({p.pct})</span>
                <div className="text-slate-500 dark:text-slate-400">{p.tip}</div>
              </div>
            ))}
          </div>
          <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">Rules candidates repeat</div>
          <div className="mt-1"><List items={starMethod.rules} /></div>
          <p className="mt-3 rounded-lg bg-brand-50 p-3 text-sm text-brand-800 dark:bg-brand-900/20 dark:text-brand-200">
            {starMethod.storyBank}
          </p>
        </Panel>

        <Panel title="What interviewers score during coding" icon="✅">
          <List items={codingSignals} />
        </Panel>

        <Panel title="Difficulty split & targets" icon="📊">
          <p className="mb-3 text-sm text-slate-600 dark:text-slate-300">{difficultySplit.note}</p>
          <div className="grid gap-2 sm:grid-cols-3">
            {difficultySplit.bands.map((b) => (
              <div key={b.band} className="rounded-lg border border-slate-200 p-3 dark:border-slate-700">
                <div className="text-sm font-semibold text-slate-800 dark:text-slate-100">
                  {b.band} <span className="text-slate-400">{b.pct}</span>
                </div>
                <div className="mt-1 text-sm text-slate-500 dark:text-slate-400">{b.note}</div>
              </div>
            ))}
          </div>
        </Panel>

        <Panel title="2-week study plan (Jul 27 – Aug 7)" icon="📅">
          <div className="space-y-2">
            {studyPlan.map((d) => (
              <div key={d.day} className="flex flex-col gap-1 rounded-lg border border-slate-200 p-3 dark:border-slate-700 sm:flex-row sm:gap-4">
                <div className="w-28 shrink-0">
                  <div className="text-sm font-semibold text-slate-800 dark:text-slate-100">{d.day}</div>
                  <div className="text-xs text-brand-600">{d.theme}</div>
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-300">{d.items}</div>
              </div>
            ))}
          </div>
        </Panel>

        <Panel title="Day-of logistics & tips" icon="🎒">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">What to bring</div>
              <div className="mt-1"><List items={dayOf.bring} /></div>
              <div className="mt-3 text-sm text-slate-600 dark:text-slate-300">
                <span className="font-semibold">Attire:</span> {dayOf.attire}
              </div>
            </div>
            <div>
              <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">Lunch Buddy</div>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{dayOf.lunchBuddy}</p>
              <div className="mt-3 text-xs font-semibold uppercase tracking-wide text-slate-500">Questions to ask</div>
              <div className="mt-1"><List items={dayOf.questionsToAsk} /></div>
            </div>
          </div>
        </Panel>

        <Panel title="After the loop — timeline" icon="⏳">
          <List items={timeline} />
        </Panel>

        <Panel title="Common reasons candidates get rejected" icon="⚠️">
          <List items={redFlags} />
        </Panel>

        <Panel title="Boston office notes" icon="📍">
          <List items={bostonNotes} />
        </Panel>

        <Panel title="Sources" icon="📚">
          <List items={sources} />
        </Panel>
      </div>
    </div>
  )
}
