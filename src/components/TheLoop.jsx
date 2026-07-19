import React from 'react'
import { useStore } from '../store/StoreContext.jsx'
import { PageHeader } from './common.jsx'
import {
  loopStructure,
  funnel,
  lldRound,
  tools,
  liveCode,
  barRaiser,
  starMethod,
  codingSignals,
  difficultySplit,
  studyPlan,
  studyPlanIntro,
  dailyHabit,
  dayOf,
  timeline,
  redFlags,
  bostonNotes,
  sources,
} from '../data/insights.js'
import { role } from '../data/role.js'

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
  ['role', 'The role & the bar'],
  ['before', 'Before the loop (OA)'],
  ['structure', 'How the day is structured'],
  ['livecode', 'The LiveCode environment'],
  ['lld', 'The design (LLD) round'],
  ['barraiser', 'The Bar Raiser'],
  ['star', 'Telling stories the Amazon way'],
  ['coding-signals', 'What they score while you code'],
  ['difficulty', 'How hard the problems get'],
  ['plan', 'Your study plan'],
  ['tools', 'Tools to know'],
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

      <Section id="role" title="The role & the bar">
        <p className="text-sm text-muted">{role.program}</p>
        <p>{role.forWho}</p>
        <div className="my-4 grid gap-4 sm:grid-cols-2">
          <div>
            <div className="kicker mb-2">What you’ll do</div>
            <Bullets items={role.responsibilities} />
          </div>
          <div>
            <div className="kicker mb-2">What the loop weighs</div>
            <div className="space-y-2">
              {role.evaluation.map((e) => (
                <div key={e.area} className="rounded-xl border border-line bg-surface p-3">
                  <div className="text-sm font-medium text-ink">
                    {e.area} <span className="text-clay-600">· {e.weight}</span>
                  </div>
                  <div className="text-sm text-muted">{e.note}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="my-4 grid gap-4 sm:grid-cols-2">
          <div>
            <div className="kicker mb-2">Basic qualifications</div>
            <Bullets items={role.basicQuals} />
          </div>
          <div>
            <div className="kicker mb-2">Preferred qualifications</div>
            <Bullets items={role.preferredQuals} />
          </div>
        </div>
        <div className="kicker mb-2 mt-6">The bar you’re measured against (L4 → L5)</div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[34rem] text-sm">
            <thead>
              <tr className="text-left text-faint">
                <th className="py-1 pr-4 font-medium"></th>
                <th className="py-1 pr-4 font-medium">SDE I (L4)</th>
                <th className="py-1 font-medium">SDE II (L5)</th>
              </tr>
            </thead>
            <tbody>
              {role.leveling.map((r) => (
                <tr key={r.dim} className="border-t border-line align-top">
                  <td className="py-2 pr-4 font-medium text-ink">{r.dim}</td>
                  <td className="py-2 pr-4 text-muted">{r.l4}</td>
                  <td className="py-2 text-muted">{r.l5}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="kicker mb-2 mt-6">Boston hub — match your “why this team”</div>
        <div className="grid gap-2 sm:grid-cols-2">
          {role.bostonDomains.map((d) => (
            <div key={d.name} className="rounded-xl border border-line bg-surface p-3">
              <div className="text-sm font-medium text-ink">{d.name}</div>
              <div className="text-sm text-muted">{d.note}</div>
            </div>
          ))}
        </div>
      </Section>

      <Section id="before" title="Before the loop — the Online Assessment">
        <p>{funnel.intro}</p>
        <p className="mt-2 text-sm text-muted">Platform: {funnel.oa.platform}</p>
        <Bullets items={funnel.oa.parts} />
      </Section>

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

      <Section id="lld" title="The design (LLD) round">
        <p>{lldRound.intro}</p>
        <p className="mt-3 font-medium text-ink">How to approach it</p>
        <Bullets items={lldRound.approach} />
        <p className="mt-3 font-medium text-ink">Common prompts</p>
        <div className="mt-1 flex flex-wrap gap-2">
          {lldRound.prompts.map((p) => (
            <span key={p} className="pill border border-line bg-surface text-muted">{p}</span>
          ))}
        </div>
        <p className="mt-4 rounded-xl bg-clay-50 px-4 py-3 text-sm text-clay-700">{lldRound.evaluates}</p>
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

      <Section id="plan" title="Your study plan">
        <p>{studyPlanIntro}</p>
        <p className="my-3 rounded-xl bg-clay-50 px-4 py-3 text-sm font-medium text-clay-700">{dailyHabit}</p>
        {[...new Set(studyPlan.map((d) => d.phase))].map((phase) => (
          <div key={phase} className="my-4">
            <div className="kicker mb-2">{phase}</div>
            <div className="space-y-2">
              {studyPlan.filter((d) => d.phase === phase).map((d) => (
                <div key={d.day} className="flex flex-col gap-1 rounded-xl border border-line bg-surface p-3 sm:flex-row sm:gap-4">
                  <div className="w-24 shrink-0">
                    <div className="text-sm font-semibold text-ink">{d.day}</div>
                    <div className="text-xs text-clay-600">{d.theme}</div>
                  </div>
                  <div className="text-sm text-muted">{d.items}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </Section>

      <Section id="tools" title="Tools to know">
        <div className="grid gap-2 sm:grid-cols-2">
          {tools.map((t) => (
            <div key={t.name} className="rounded-xl border border-line bg-surface p-3">
              <div className="text-sm font-medium text-ink">{t.name}</div>
              <div className="text-sm text-muted">{t.note}</div>
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
