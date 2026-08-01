import React, { useMemo, useState } from 'react'
import { useStore } from '../store/StoreContext.jsx'
import { PageHeader, Empty } from './common.jsx'
import { RichText } from './RichText.jsx'

// Group decks into readable sections. Any deck not listed here falls into "More".
const CATEGORIES = [
  {
    name: 'Foundations',
    decks: ['Time Complexity & TLE', 'Abstract Data Structures', 'HashMap / Map APIs'],
  },
  {
    name: 'Arrays & Strings',
    decks: ['Two Pointers & Arrays', 'Sliding Window', 'Binary Search'],
  },
  {
    name: 'Stacks, Queues & Heaps',
    decks: ['Stacks & Queues', 'Monotonic Stack & Queue', 'Heaps & Priority Queue'],
  },
  {
    name: 'Trees & Graphs',
    decks: ['Trees & Traversals', 'Binary Search Trees', 'Graphs — DFS'],
  },
  {
    name: 'Low-Level Design',
    decks: ['OOP Principles', 'SOLID Principles', 'UML Relationships', 'Design Patterns', 'LLD Approach'],
  },
  {
    name: 'Behavioral',
    decks: ['Leadership Principles'],
  },
]

export default function StudyGuide() {
  const { state } = useStore()
  const cards = state.revisionCards || []

  // Bucket cards by deck.
  const byDeck = useMemo(() => {
    const m = {}
    for (const c of cards) (m[c.deck] ||= []).push(c)
    return m
  }, [cards])

  // Build ordered sections; append any decks not in CATEGORIES under "More".
  const sections = useMemo(() => {
    const known = new Set(CATEGORIES.flatMap((c) => c.decks))
    const extra = [...new Set(cards.map((c) => c.deck))].filter((d) => !known.has(d))
    const result = CATEGORIES.map((cat) => ({
      name: cat.name,
      decks: cat.decks.filter((d) => byDeck[d]?.length),
    })).filter((cat) => cat.decks.length)
    if (extra.length) result.push({ name: 'More', decks: extra })
    return result
  }, [cards, byDeck])

  const allDecks = useMemo(() => sections.flatMap((s) => s.decks), [sections])
  const [open, setOpen] = useState(() => new Set()) // decks currently expanded

  const toggle = (deck) =>
    setOpen((prev) => {
      const next = new Set(prev)
      next.has(deck) ? next.delete(deck) : next.add(deck)
      return next
    })
  const expandAll = () => setOpen(new Set(allDecks))
  const collapseAll = () => setOpen(new Set())

  const slug = (d) => 'deck-' + d.replace(/[^a-z0-9]+/gi, '-').toLowerCase()

  if (cards.length === 0) {
    return (
      <div>
        <PageHeader kicker="Study Guide" title="All your revision notes, in one read" />
        <Empty>No notes yet. Add revision cards and they’ll appear here as readable notes.</Empty>
      </div>
    )
  }

  return (
    <div>
      <PageHeader
        kicker="Study Guide"
        title="All your revision notes, in one read"
        intro="Everything from your flashcards, laid out as notes you can just read top-to-bottom. Jump to a topic, or expand a deck to read it in full."
        right={
          <div className="flex gap-2">
            <button className="btn-outline text-sm" onClick={expandAll}>Expand all</button>
            <button className="btn-quiet text-sm" onClick={collapseAll}>Collapse all</button>
          </div>
        }
      />

      {/* Table of contents */}
      <div className="mb-8 rounded-2xl border border-line bg-surface p-5">
        <div className="kicker mb-3">On this page</div>
        <div className="space-y-3">
          {sections.map((sec) => (
            <div key={sec.name}>
              <div className="mb-1 text-xs font-semibold uppercase tracking-wide text-faint">{sec.name}</div>
              <div className="flex flex-wrap gap-2">
                {sec.decks.map((d) => (
                  <a
                    key={d}
                    href={'#guide'}
                    onClick={(e) => {
                      e.preventDefault()
                      setOpen((prev) => new Set(prev).add(d))
                      setTimeout(() => document.getElementById(slug(d))?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 30)
                    }}
                    className="pill border border-line bg-paper text-muted hover:border-clay-300"
                  >
                    {d} · {byDeck[d].length}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sections */}
      <div className="space-y-10">
        {sections.map((sec) => (
          <div key={sec.name}>
            <h2 className="mb-4 font-serif text-2xl text-ink">{sec.name}</h2>
            <div className="space-y-3">
              {sec.decks.map((deck) => {
                const isOpen = open.has(deck)
                const list = byDeck[deck]
                return (
                  <div key={deck} id={slug(deck)} className="overflow-hidden rounded-2xl border border-line bg-surface scroll-mt-6">
                    <button
                      className="flex w-full items-center justify-between px-5 py-4 text-left"
                      onClick={() => toggle(deck)}
                    >
                      <span className="font-serif text-lg text-ink">{deck}</span>
                      <span className="flex items-center gap-3">
                        <span className="text-sm text-muted">{list.length} notes</span>
                        <span className="text-faint">{isOpen ? '−' : '+'}</span>
                      </span>
                    </button>
                    {isOpen && (
                      <div className="space-y-6 border-t border-line px-5 py-6">
                        {list.map((c) => (
                          <div key={c.id}>
                            <h3 className="mb-2 font-medium text-ink">{c.front}</h3>
                            <RichText text={c.back} />
                            {c.diagram && (
                              <pre className="mt-3 overflow-x-auto rounded-lg bg-paper p-3 font-mono text-[12.5px] leading-snug text-ink/80">
                                {c.diagram}
                              </pre>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
