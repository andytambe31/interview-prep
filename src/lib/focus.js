// The "strong guide" brain. Given the current state, decide what the person
// should do next and why — so the home screen can lead instead of asking the
// user to figure out where to click.

import { seedCodingTopics } from '../data/seed.js'

export function daysUntil(dateStr) {
  if (!dateStr) return null
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const target = new Date(dateStr + 'T00:00:00')
  return Math.round((target - today) / (1000 * 60 * 60 * 24))
}

export function formatDate(dateStr, opts) {
  if (!dateStr) return '—'
  const d = new Date(dateStr + 'T00:00:00')
  return d.toLocaleDateString('en-US', opts || { weekday: 'long', month: 'long', day: 'numeric' })
}

export function interviewDate(state) {
  return state.schedule.chosen.date || state.schedule.availability[0]?.date || ''
}

// Per-topic coding progress, ordered by the study sequence.
export function topicProgress(problems) {
  const map = {}
  for (const t of seedCodingTopics) map[t] = { topic: t, total: 0, solved: 0, highTotal: 0, highSolved: 0 }
  for (const p of problems) {
    const m = map[p.topic]
    if (!m) continue
    m.total++
    if (p.status === 'solved') m.solved++
    if (p.freq === 'high') {
      m.highTotal++
      if (p.status === 'solved') m.highSolved++
    }
  }
  return seedCodingTopics.map((t) => map[t]).filter((m) => m.total > 0)
}

// The single topic to practice next: the earliest topic in the study order
// that still has unsolved high-frequency problems (fall back to any unsolved).
export function nextCodingTopic(problems) {
  const prog = topicProgress(problems)
  const byHigh = prog.find((m) => m.highSolved < m.highTotal)
  if (byHigh) return byHigh.topic
  const byAny = prog.find((m) => m.solved < m.total)
  return byAny ? byAny.topic : null
}

export function unsolvedInTopic(problems, topic, freqFirst = true) {
  const list = problems.filter((p) => p.topic === topic && p.status !== 'solved')
  if (freqFirst) {
    const order = { high: 0, medium: 1, low: 2 }
    list.sort((a, b) => (order[a.freq] ?? 3) - (order[b.freq] ?? 3))
  }
  return list
}

// The first high-emphasis Leadership Principle without a mapped story.
export function nextUncoveredLP(lps, stories) {
  const covered = new Set(stories.flatMap((s) => s.lpIds || []))
  return lps.find((lp) => lp.emphasis === 'high' && !covered.has(lp.id)) || null
}

// How many days before the interview we switch from the DSA sprint to the
// "everything else" final push (behavioral, LLD, résumé, mocks).
export const FINAL_PUSH_DAYS = 4

export function currentPhase(state) {
  const days = daysUntil(interviewDate(state))
  if (days !== null && days <= FINAL_PUSH_DAYS) return 'final'
  return 'dsa'
}

// Build an ordered plan. The first item is "Focus now"; the rest are "up next".
// The plan is phase-aware: ~7 days of DSA first (repeated questions prioritized),
// then the last few days pivot to behavioral, LLD, résumé, and mocks.
export function buildPlan(state) {
  const { coding, lps, stories, schedule, checklist, resumeItems = [] } = state
  const days = daysUntil(interviewDate(state))
  const phase = currentPhase(state)

  // --- Candidate steps (null if not applicable) ---

  const readStep = !checklist.readLoop
    ? {
        id: 'read-loop',
        kind: 'read',
        minutes: 6,
        title: 'Understand how the loop actually works',
        detail: 'The 4 rounds, LiveCode, the Bar Raiser, the LP round, and LLD — read it once end-to-end.',
        why: 'Knowing the shape of the day makes everything else you prepare land better.',
        cta: { label: 'Read the overview', route: 'loop' },
        check: 'readLoop',
      }
    : null

  const topic = nextCodingTopic(coding.problems)
  const codingStep = topic
    ? (() => {
        const picks = unsolvedInTopic(coding.problems, topic).slice(0, 3)
        const hasHigh = picks.some((p) => p.freq === 'high')
        return {
          id: 'practice-' + topic,
          kind: 'practice',
          minutes: 90,
          title: `Practice ${topic}`,
          detail: picks.length ? picks.map((p) => p.title).join(' · ') : `Work through the ${topic} set.`,
          why: hasHigh
            ? 'These are high-frequency for Amazon — repeated questions come first.'
            : 'Keep building coverage across the core patterns.',
          cta: { label: `Open ${topic}`, route: 'coding', topic },
        }
      })()
    : null

  const lp = nextUncoveredLP(lps, stories)
  const storyStep = lp
    ? {
        id: 'story-' + lp.id,
        kind: 'story',
        minutes: 20,
        title: `Draft a story for “${lp.name}”`,
        detail: lp.questions[0],
        why: `${lp.name} is one of the most-tested principles for new-grad SDE and has no story yet.`,
        cta: { label: 'Open Behavioral', route: 'behavioral' },
      }
    : null

  const notReadyResume = resumeItems.find((r) => !r.ready)
  const resumeStep =
    resumeItems.length === 0
      ? {
          id: 'resume-add',
          kind: 'resume',
          minutes: 15,
          title: 'Add your résumé projects',
          detail: 'Drop in each project/experience so we can prep the dive-deep questions asked on every bullet.',
          why: 'Amazon expects you to speak in depth to everything on your résumé.',
          cta: { label: 'Open Résumé', route: 'resume' },
        }
      : notReadyResume
        ? {
            id: 'resume-' + notReadyResume.id,
            kind: 'resume',
            minutes: 20,
            title: `Prep dive-deep answers: ${notReadyResume.title || 'a résumé project'}`,
            detail: 'Problem, your role, tech & tradeoffs, hardest part, impact, what you’d change.',
            why: 'Interviewers drill 2–3 layers deep on résumé projects — have the details cold.',
            cta: { label: 'Open Résumé', route: 'resume' },
          }
        : null

  const oodLeft = unsolvedInTopic(coding.problems, 'Object-Oriented Design')
  const lldStep = oodLeft.length
    ? {
        id: 'lld-review',
        kind: 'lld',
        minutes: 45,
        title: 'Practice object-oriented design',
        detail: oodLeft.slice(0, 3).map((p) => p.title.replace(' (OOD)', '')).join(' · '),
        why: 'SDE I often has an LLD/OOD round — practice talking through classes and APIs.',
        cta: { label: 'Open Object-Oriented Design', route: 'coding', topic: 'Object-Oriented Design' },
      }
    : null

  const livecodeStep =
    !schedule.logistics.livecodeLink && days !== null && days <= 10
      ? {
          id: 'livecode',
          kind: 'logistics',
          minutes: 1,
          title: 'Save your LiveCode link',
          detail: 'It arrives by email once your interview is scheduled — keep it one tap away.',
          why: 'You’ll want it ready on the day, not buried in your inbox.',
          cta: { label: 'Open Logistics', route: 'logistics' },
        }
      : null

  // --- Order by phase ---
  const order =
    phase === 'final'
      ? [readStep, storyStep, resumeStep, lldStep, codingStep, livecodeStep]
      : [readStep, codingStep, storyStep, resumeStep, lldStep, livecodeStep]

  return order.filter(Boolean)
}

// A compact readiness snapshot for the home screen.
export function readiness(state) {
  const solved = state.coding.problems.filter((p) => p.status === 'solved').length
  const total = state.coding.problems.length
  const highTotal = state.coding.problems.filter((p) => p.freq === 'high').length
  const highSolved = state.coding.problems.filter((p) => p.freq === 'high' && p.status === 'solved').length
  const covered = new Set(state.stories.flatMap((s) => s.lpIds || []))
  const highLps = state.lps.filter((lp) => lp.emphasis === 'high')
  const highCovered = highLps.filter((lp) => covered.has(lp.id)).length
  return {
    coding: { solved, total, pct: total ? Math.round((solved / total) * 100) : 0 },
    codingHigh: { solved: highSolved, total: highTotal },
    behavioral: { covered: highCovered, total: highLps.length, stories: state.stories.length },
  }
}
