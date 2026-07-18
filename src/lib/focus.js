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

// Build an ordered plan. The first item is "Focus now"; the rest are "up next".
export function buildPlan(state) {
  const { coding, lps, stories, schedule, checklist } = state
  const days = daysUntil(interviewDate(state))
  const steps = []

  // 1) Orientation — read what the loop is actually like (once).
  if (!checklist.readLoop) {
    steps.push({
      id: 'read-loop',
      kind: 'read',
      minutes: 6,
      title: 'Understand how the loop actually works',
      detail: '4 rounds, LiveCode, the Bar Raiser, and how Leadership Principles are woven into every round.',
      why: 'Knowing the shape of the day makes everything else you prepare land better.',
      cta: { label: 'Read the overview', route: 'loop' },
      check: 'readLoop',
    })
  }

  // 2) Coding — practice the next high-frequency topic.
  const topic = nextCodingTopic(coding.problems)
  if (topic) {
    const picks = unsolvedInTopic(coding.problems, topic).slice(0, 3)
    steps.push({
      id: 'practice-' + topic,
      kind: 'practice',
      minutes: 90,
      title: `Practice ${topic}`,
      detail:
        picks.length > 0
          ? picks.map((p) => p.title).join(' · ')
          : `Work through the ${topic} set.`,
      why: 'It’s high-frequency for Amazon and you haven’t finished it yet.',
      cta: { label: `Open ${topic}`, route: 'coding', topic },
    })
  }

  // 3) Behavioral — draft a story for an uncovered high-priority LP.
  const lp = nextUncoveredLP(lps, stories)
  if (lp) {
    steps.push({
      id: 'story-' + lp.id,
      kind: 'story',
      minutes: 20,
      title: `Draft a story for “${lp.name}”`,
      detail: lp.questions[0],
      why: `${lp.name} is one of the most-tested principles for new-grad SDE and has no story yet.`,
      cta: { label: 'Open Behavioral', route: 'behavioral' },
    })
  }

  // 4) Logistics — capture the LiveCode link when it's close.
  if (!schedule.logistics.livecodeLink && days !== null && days <= 10) {
    steps.push({
      id: 'livecode',
      kind: 'logistics',
      minutes: 1,
      title: 'Save your LiveCode link',
      detail: 'It arrives by email once your interview is scheduled — keep it here so it’s one tap away.',
      why: 'You’ll want it ready on the day, not buried in your inbox.',
      cta: { label: 'Open Logistics', route: 'logistics' },
    })
  }

  return steps
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
