import React from 'react'
import { useStore } from '../store/StoreContext.jsx'
import { PageHeader } from './common.jsx'
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
  sources,
} from '../data/insights.js'

function Section({ id, title, children }) {
  return (
    <section id={id} className="rule scroll-mt-6 pt-10">
      <h2 className="mb-4 text-2xl font-semibold">{title}</h2>
      <div className="prose-study max-w-prose">{children}</div>
    </section>
  )
}

const Bullets = ({ items }) => (
  <ul className="my-3 max-w-prose space-y-2">
    {items.map((it, i) => (
      <li key={i} className="flex gap-3 text-[15px] leading-relaxed text-ink/90">
        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-clay-300" />
        <span>{it}</span>
      </li>
    ))}
  </ul>
)

const SECTIONS = [
  ['structure', 'How the day is structured'],
  ['livecode', 'The LiveCode environment'],
  ['barraiser', 'The Bar Raiser'],
  ['star', 'Telling stories the Amazon way'],
  ['coding-signals', 'What they score while you code'],
  ['difficulty', 'How hard the problems get'],
  ['dayof', 'Day-of logistics'],
  ['after', 'After the loop'],
  ['pitfalls', 'Why people get rejected'],
  ['boston', 'Boston notes'],
]

export default function TheLoop() {
  const { state, dispatch } = useStore()
  const read = !!state.checklist.readLoop

  return (
    <div>
      <PageHeader
        kicker="The Loop"
        title="What your interview day is actually like"
        intro="A calm, honest walkthrough drawn from firsthand candidate reports and Amazon’s own guidance. Read it once end-to-end — it makes everything else you prepare land better."
        right={
          <button
            className={read ? 'btn-soft' : 'btn-outline'}
            onClick={() => dispatch({ type: 'SET_CHECK', id: 'readLoop', value: !read })}
          >
            {read ? '✓ Read' : 'Mark as read'}
          </button>
        }
      />

      {/* On this page */}
      <nav className="mb-4 flex flex-wrap gap-x-5 gap-y-1 text-sm">
        {SECTIONS.map(([id, label]) => (
          <a key={id} href={`#loop`} onClick={(e) => { e.preventDefault(); document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }) }} className="text-muted hover:text-clay-600">
            {label}
          </a>
        ))}
      </nav>

      <Section id="structure" title="How the day is structured">
        <p>{loopStructure.summary}</p>
        <div className="my-4 space-y-3">
          {loopStructure.rounds.map((round) => (
            <div key={round.round} className="flex gap-4">
              <div className="font-serif text-xl text-clay-500">{round.round}</div>
              <div>
                <div className="font-medium text-ink">{round.focus}</div>
                <div className="text-sm text-muted">{round.detail}</div>
              </div>
            </div>
          ))}
        </div>
        <p className="rounded-xl bg-clay-50 px-4 py-3 text-sm text-clay-700">{loopStructure.perRound}</p>
      </Section>

      <Section id="livecode" title="The LiveCode environment">
        <Bullets items={liveCode} />
      </Section>

      <Section id="barraiser" title="The Bar Raiser">
        <p><strong>What it is.</strong> {barRaiser.what}</p>
        <p><strong>How to spot it.</strong> {barRaiser.identify}</p>
        <p><strong>What they focus on.</strong> {barRaiser.focus}</p>
        <p><strong>Weight.</strong> {barRaiser.weight}</p>
      </Section>

      <Section id="star" title="Telling stories the Amazon way">
        <p>{starMethod.intro}</p>
        <div className="my-4 grid gap-3 sm:grid-cols-2">
          {starMethod.parts.map((p) => (
            <div key={p.k} className="rounded-xl border border-line bg-surface p-3">
              <div className="font-medium text-ink">
                {p.k} <span className="text-faint">· {p.pct}</span>
              </div>
              <div className="mt-1 text-sm text-muted">{p.tip}</div>
            </div>
          ))}
        </div>
        <p className="font-medium text-ink">Rules candidates repeat:</p>
        <Bullets items={starMethod.rules} />
        <p className="rounded-xl bg-clay-50 px-4 py-3 text-sm text-clay-700">{starMethod.storyBank}</p>
      </Section>

      <Section id="coding-signals" title="What they score while you code">
        <Bullets items={codingSignals} />
      </Section>

      <Section id="difficulty" title="How hard the problems get">
        <p>{difficultySplit.note}</p>
        <div className="my-4 space-y-3">
          {difficultySplit.bands.map((b) => (
            <div key={b.band}>
              <div className="flex items-baseline justify-between">
                <span className="font-medium">{b.band}</span>
                <span className="text-sm text-faint">{b.pct}</span>
              </div>
              <div className="text-sm text-muted">{b.note}</div>
            </div>
          ))}
        </div>
      </Section>

      <Section id="dayof" title="Day-of logistics">
        <p className="font-medium text-ink">What to bring</p>
        <Bullets items={dayOf.bring} />
        <p><strong>Attire.</strong> {dayOf.attire}</p>
        <p><strong>Lunch buddy.</strong> {dayOf.lunchBuddy}</p>
        <p className="font-medium text-ink">Good questions to ask your interviewers</p>
        <Bullets items={dayOf.questionsToAsk} />
      </Section>

      <Section id="after" title="After the loop">
        <Bullets items={timeline} />
      </Section>

      <Section id="pitfalls" title="Why people get rejected">
        <Bullets items={redFlags} />
      </Section>

      <Section id="boston" title="Boston notes">
        <Bullets items={bostonNotes} />
      </Section>

      <section className="rule mt-10 pt-6">
        <div className="kicker mb-2">Sources</div>
        <p className="text-sm text-muted">{sources.join(' · ')}</p>
        <p className="mt-3 text-xs text-faint">
          These are recurring patterns from firsthand reports, not a guaranteed script — your recruiter is the
          authority on your day’s actual agenda.
        </p>
      </section>
    </div>
  )
}
