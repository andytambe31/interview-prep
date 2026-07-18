import {
  seedCandidate,
  seedAvailability,
  seedLogistics,
  seedProblems,
  seedLPs,
  seedResources,
  seedTodos,
} from '../data/seed.js'

export const STORAGE_KEY = 'interview-prep:v1'
export const STATE_VERSION = 1

// Fields on each entity that belong to the USER (progress) and must survive
// a re-sync of seed reference content.
const USER_FIELDS = {
  problem: ['status', 'confidence', 'notes', 'lastPracticed'],
  lp: ['confidence', 'notes'],
}

// Merge a fresh seed list into a stored list, keyed by id.
// - Seed items get their reference fields refreshed from seed.
// - User progress fields are preserved from the stored copy.
// - User-created items (ids not in seed) are kept and appended.
function mergeList(storedList = [], seedList = [], userFields = []) {
  const storedById = new Map(storedList.map((item) => [item.id, item]))
  const seedIds = new Set(seedList.map((item) => item.id))

  const merged = seedList.map((seedItem) => {
    const stored = storedById.get(seedItem.id)
    if (!stored) return { ...seedItem }
    const preserved = {}
    for (const f of userFields) {
      if (stored[f] !== undefined) preserved[f] = stored[f]
    }
    return { ...seedItem, ...preserved }
  })

  const userCreated = storedList.filter((item) => !seedIds.has(item.id))
  return [...merged, ...userCreated]
}

export function buildInitialState() {
  return {
    version: STATE_VERSION,
    candidate: { ...seedCandidate },
    schedule: {
      availability: seedAvailability.map((a) => ({ ...a })),
      chosen: { date: '', notes: '' },
      logistics: { ...seedLogistics },
      interviews: defaultInterviews(),
    },
    coding: { problems: seedProblems.map((p) => ({ ...p })) },
    lps: seedLPs.map((lp) => ({ ...lp, confidence: 0, notes: '' })),
    stories: [],
    resources: seedResources.map((r) => ({ ...r })),
    todos: seedTodos.map((t) => ({ ...t })),
    // Lightweight "have you read/done this" flags for the guided steps.
    checklist: {},
    ui: { codingTopic: null },
  }
}

// The 4 interview slots described in the invite (4 x 60 min).
function defaultInterviews() {
  return [1, 2, 3, 4].map((n) => ({
    id: `round-${n}`,
    order: n,
    label: `Round ${n}`,
    type: '', // e.g. Coding, Behavioral/LP, Bar Raiser
    interviewer: '',
    time: '',
    focus: '',
    notes: '',
  }))
}

// Re-sync reference content while keeping user progress.
export function mergeSeed(state) {
  return {
    ...state,
    coding: {
      ...state.coding,
      problems: mergeList(state.coding?.problems, seedProblems, USER_FIELDS.problem),
    },
    lps: mergeList(state.lps, seedLPs, USER_FIELDS.lp),
    resources: mergeList(state.resources, seedResources, []),
  }
}
