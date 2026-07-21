import React, { createContext, useContext, useEffect, useMemo, useReducer } from 'react'
import { buildInitialState, mergeSeed, STORAGE_KEY, STATE_VERSION } from './state.js'

const StoreContext = createContext(null)

function reducer(state, action) {
  switch (action.type) {
    case 'PATCH':
      // Shallow-merge a slice at the top level: { key, value }
      return { ...state, [action.key]: action.value }
    case 'PATCH_CANDIDATE':
      return { ...state, candidate: { ...state.candidate, ...action.patch } }
    case 'PATCH_SCHEDULE':
      return { ...state, schedule: { ...state.schedule, ...action.patch } }
    case 'PATCH_LOGISTICS':
      return {
        ...state,
        schedule: {
          ...state.schedule,
          logistics: { ...state.schedule.logistics, ...action.patch },
        },
      }
    case 'UPDATE_PROBLEM':
      return {
        ...state,
        coding: {
          ...state.coding,
          problems: state.coding.problems.map((p) =>
            p.id === action.id ? { ...p, ...action.patch } : p,
          ),
        },
      }
    case 'ADD_PROBLEM':
      return {
        ...state,
        coding: { ...state.coding, problems: [action.problem, ...state.coding.problems] },
      }
    case 'DELETE_PROBLEM':
      return {
        ...state,
        coding: {
          ...state.coding,
          problems: state.coding.problems.filter((p) => p.id !== action.id),
        },
      }
    case 'UPSERT_STORY': {
      const exists = state.stories.some((s) => s.id === action.story.id)
      return {
        ...state,
        stories: exists
          ? state.stories.map((s) => (s.id === action.story.id ? action.story : s))
          : [action.story, ...state.stories],
      }
    }
    case 'DELETE_STORY':
      return { ...state, stories: state.stories.filter((s) => s.id !== action.id) }
    case 'UPDATE_LP':
      return {
        ...state,
        lps: state.lps.map((lp) => (lp.id === action.id ? { ...lp, ...action.patch } : lp)),
      }
    case 'UPSERT_TODO': {
      const exists = state.todos.some((t) => t.id === action.todo.id)
      return {
        ...state,
        todos: exists
          ? state.todos.map((t) => (t.id === action.todo.id ? action.todo : t))
          : [...state.todos, action.todo],
      }
    }
    case 'DELETE_TODO':
      return { ...state, todos: state.todos.filter((t) => t.id !== action.id) }
    case 'UPSERT_RESOURCE': {
      const exists = state.resources.some((r) => r.id === action.resource.id)
      return {
        ...state,
        resources: exists
          ? state.resources.map((r) => (r.id === action.resource.id ? action.resource : r))
          : [action.resource, ...state.resources],
      }
    }
    case 'DELETE_RESOURCE':
      return { ...state, resources: state.resources.filter((r) => r.id !== action.id) }
    case 'UPSERT_RESUME_ITEM': {
      const exists = (state.resumeItems || []).some((r) => r.id === action.item.id)
      return {
        ...state,
        resumeItems: exists
          ? state.resumeItems.map((r) => (r.id === action.item.id ? action.item : r))
          : [...(state.resumeItems || []), action.item],
      }
    }
    case 'DELETE_RESUME_ITEM':
      return { ...state, resumeItems: (state.resumeItems || []).filter((r) => r.id !== action.id) }
    case 'UPSERT_REVISION_CARD': {
      const list = state.revisionCards || []
      const exists = list.some((c) => c.id === action.card.id)
      return {
        ...state,
        revisionCards: exists ? list.map((c) => (c.id === action.card.id ? action.card : c)) : [action.card, ...list],
      }
    }
    case 'DELETE_REVISION_CARD':
      return { ...state, revisionCards: (state.revisionCards || []).filter((c) => c.id !== action.id) }
    case 'REHEARSAL_SET_NOTE': {
      const { key, stageId, value } = action
      const cur = state.rehearsals?.[key] || { draft: null, history: [] }
      const draft = cur.draft || { notes: {} }
      return {
        ...state,
        rehearsals: {
          ...state.rehearsals,
          [key]: { ...cur, draft: { ...draft, notes: { ...(draft.notes || {}), [stageId]: value } } },
        },
      }
    }
    case 'REHEARSAL_SAVE_DRAFT': {
      const { key, patch } = action
      const cur = state.rehearsals?.[key] || { draft: null, history: [] }
      return {
        ...state,
        rehearsals: { ...state.rehearsals, [key]: { ...cur, draft: { ...(cur.draft || {}), ...patch } } },
      }
    }
    case 'REHEARSAL_DISCARD_DRAFT': {
      const cur = state.rehearsals?.[action.key]
      if (!cur) return state
      return { ...state, rehearsals: { ...state.rehearsals, [action.key]: { ...cur, draft: null } } }
    }
    case 'REHEARSAL_COMPLETE': {
      const { key, attempt } = action
      const cur = state.rehearsals?.[key] || { draft: null, history: [] }
      return {
        ...state,
        rehearsals: {
          ...state.rehearsals,
          [key]: { draft: null, history: [attempt, ...(cur.history || [])] },
        },
      }
    }
    case 'SET_UI':
      return { ...state, ui: { ...state.ui, ...action.patch } }
    case 'SET_CHECK':
      return { ...state, checklist: { ...state.checklist, [action.id]: action.value } }
    case 'IMPORT':
      return action.state
    case 'RESET':
      return buildInitialState()
    case 'RESYNC_SEED':
      // Re-pull latest seed reference data while keeping user progress.
      return mergeSeed(state)
    default:
      return state
  }
}

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return buildInitialState()
    const parsed = JSON.parse(raw)
    // Always merge the latest seed content in so newly added reference
    // material (problems, LPs, resources) shows up without wiping progress.
    return mergeSeed({ ...buildInitialState(), ...parsed, version: STATE_VERSION })
  } catch (err) {
    console.warn('Failed to load saved state, starting fresh.', err)
    return buildInitialState()
  }
}

export function StoreProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, undefined, loadState)

  // Persist on every change.
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    } catch (err) {
      console.warn('Failed to persist state.', err)
    }
  }, [state])

  const value = useMemo(() => ({ state, dispatch }), [state])
  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}

export function useStore() {
  const ctx = useContext(StoreContext)
  if (!ctx) throw new Error('useStore must be used within a StoreProvider')
  return ctx
}
