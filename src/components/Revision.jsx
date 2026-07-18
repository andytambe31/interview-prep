import React, { useMemo, useState, useEffect } from 'react'
import { useStore } from '../store/StoreContext.jsx'
import { PageHeader, Empty } from './common.jsx'

function newId() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) return 'rc-' + crypto.randomUUID()
  return 'rc-' + Date.now() + '-' + Math.floor(Math.random() * 1e6)
}

export default function Revision() {
  const { state, dispatch } = useStore()
  const cards = state.revisionCards || []

  const decks = useMemo(() => [...new Set(cards.map((c) => c.deck))], [cards])
  const [deck, setDeck] = useState(decks[0] || '')
  const [order, setOrder] = useState(null) // shuffled index order (array of card ids) or null
  const [pos, setPos] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [editing, setEditing] = useState(null)
  const [showList, setShowList] = useState(false)

  // Keep a valid selected deck.
  useEffect(() => {
    if (!decks.includes(deck)) setDeck(decks[0] || '')
  }, [decks, deck])

  const deckCards = useMemo(() => cards.filter((c) => c.deck === deck), [cards, deck])

  // Resolve the studying sequence (shuffled or natural).
  const sequence = useMemo(() => {
    if (!order) return deckCards
    const byId = Object.fromEntries(deckCards.map((c) => [c.id, c]))
    return order.map((id) => byId[id]).filter(Boolean)
  }, [order, deckCards])

  // Reset position when the deck/sequence changes.
  useEffect(() => {
    setPos(0)
    setFlipped(false)
  }, [deck, order])

  const card = sequence[pos]

  const go = (delta) => {
    if (sequence.length === 0) return
    setFlipped(false)
    setPos((p) => (p + delta + sequence.length) % sequence.length)
  }
  const shuffle = () => {
    const ids = deckCards.map((c) => c.id)
    for (let i = ids.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[ids[i], ids[j]] = [ids[j], ids[i]]
    }
    setOrder(ids)
  }

  const startNew = () => setEditing({ id: newId(), deck: deck || 'General', front: '', back: '' })
  const save = () => {
    if (!editing || (!editing.front.trim() && !editing.back.trim())) return
    dispatch({ type: 'UPSERT_REVISION_CARD', card: editing })
    if (editing.deck && editing.deck !== deck) setDeck(editing.deck)
    setEditing(null)
  }

  return (
    <div>
      <PageHeader
        kicker="Revision"
        title="Flashcards for quick recall"
        intro="Cards you build as you study — front is the prompt, flip for the detail. Dictate more to me any time and I’ll add them, or add your own here."
        right={
          <button className="btn-primary" onClick={startNew}>
            + New card
          </button>
        }
      />

      {cards.length === 0 && !editing ? (
        <Empty>No cards yet. Click “New card”, or tell me what you’ve read and I’ll turn it into cards.</Empty>
      ) : (
        <>
          {/* Deck picker */}
          <div className="mb-6 flex flex-wrap gap-2">
            {decks.map((d) => (
              <button
                key={d}
                onClick={() => {
                  setDeck(d)
                  setOrder(null)
                }}
                className={`pill border ${
                  d === deck ? 'border-clay-500 bg-clay-500 text-white' : 'border-line bg-surface text-muted hover:border-clay-300'
                }`}
              >
                {d} · {cards.filter((c) => c.deck === d).length}
              </button>
            ))}
          </div>

          {/* Flashcard */}
          {card ? (
            <div>
              <button
                onClick={() => setFlipped((f) => !f)}
                className="flex min-h-[240px] w-full flex-col items-center justify-center rounded-2xl border border-line bg-surface p-8 text-center shadow-soft transition hover:border-clay-300"
              >
                <div className="kicker mb-4">{flipped ? 'Answer' : 'Prompt'} · tap to flip</div>
                {flipped ? (
                  <div className="w-full max-w-prose text-left">
                    <div className="whitespace-pre-wrap text-[16px] leading-relaxed text-ink/90">{card.back}</div>
                    {card.diagram && (
                      <pre className="mt-4 overflow-x-auto rounded-lg bg-paper p-3 text-left font-mono text-[12.5px] leading-snug text-ink/80">
                        {card.diagram}
                      </pre>
                    )}
                  </div>
                ) : (
                  <div className="max-w-prose font-serif text-2xl text-ink">{card.front}</div>
                )}
              </button>

              <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <button className="btn-outline" onClick={() => go(-1)}>
                    ← Prev
                  </button>
                  <button className="btn-primary" onClick={() => setFlipped((f) => !f)}>
                    Flip
                  </button>
                  <button className="btn-outline" onClick={() => go(1)}>
                    Next →
                  </button>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-muted">
                    {pos + 1} / {sequence.length}
                  </span>
                  <button className="btn-quiet text-sm" onClick={shuffle}>
                    ⇄ Shuffle
                  </button>
                  {order && (
                    <button className="btn-quiet text-sm" onClick={() => setOrder(null)}>
                      Reset order
                    </button>
                  )}
                </div>
              </div>

              <div className="mt-3 flex justify-center gap-2">
                <button className="btn-quiet text-xs" onClick={() => setEditing(card)}>
                  Edit this card
                </button>
                <button
                  className="btn-quiet text-xs text-[#9a3a2a]"
                  onClick={() => {
                    if (confirm('Delete this card?')) {
                      dispatch({ type: 'DELETE_REVISION_CARD', id: card.id })
                      go(1)
                    }
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          ) : (
            <Empty>This deck is empty.</Empty>
          )}

          {/* All cards list */}
          <div className="mt-10">
            <button className="kicker" onClick={() => setShowList((s) => !s)}>
              {showList ? '− Hide' : '+ Show'} all {deckCards.length} cards in “{deck}”
            </button>
            {showList && (
              <div className="mt-3 space-y-2">
                {deckCards.map((c) => (
                  <div key={c.id} className="rounded-xl border border-line bg-surface p-3">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <div className="font-medium text-ink">{c.front}</div>
                        <div className="mt-1 text-sm text-muted">{c.back}</div>
                      </div>
                      <div className="flex shrink-0 gap-1">
                        <button className="btn-quiet px-2 text-xs" onClick={() => setEditing(c)}>
                          Edit
                        </button>
                        <button
                          className="btn-quiet px-2 text-xs text-[#9a3a2a]"
                          onClick={() => confirm('Delete this card?') && dispatch({ type: 'DELETE_REVISION_CARD', id: c.id })}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}

      {/* Editor */}
      {editing && (
        <div className="fixed inset-0 z-40 flex items-end justify-center bg-ink/20 p-0 sm:items-center sm:p-6" onClick={() => setEditing(null)}>
          <div className="w-full max-w-lg rounded-t-2xl border border-line bg-surface p-6 sm:rounded-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-serif text-xl">{(state.revisionCards || []).some((c) => c.id === editing.id) ? 'Edit card' : 'New card'}</h3>
              <button className="btn-quiet px-2" onClick={() => setEditing(null)}>
                ✕
              </button>
            </div>
            <label className="label">Deck</label>
            <input className="input mb-3" list="deck-options" value={editing.deck} onChange={(e) => setEditing({ ...editing, deck: e.target.value })} />
            <datalist id="deck-options">
              {decks.map((d) => (
                <option key={d} value={d} />
              ))}
            </datalist>
            <label className="label">Front (prompt)</label>
            <textarea className="input mb-3 min-h-[70px]" value={editing.front} onChange={(e) => setEditing({ ...editing, front: e.target.value })} />
            <label className="label">Back (answer)</label>
            <textarea className="input mb-4 min-h-[100px]" value={editing.back} onChange={(e) => setEditing({ ...editing, back: e.target.value })} />
            <label className="label">Diagram / code (optional, monospace)</label>
            <textarea
              className="input mb-4 min-h-[70px] font-mono text-xs"
              value={editing.diagram || ''}
              onChange={(e) => setEditing({ ...editing, diagram: e.target.value })}
            />
            <button className="btn-primary" onClick={save}>
              Save card
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
