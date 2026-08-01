import React from 'react'

// Render **bold** inline spans within a line.
export function inline(s) {
  return s.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
    part.startsWith('**') && part.endsWith('**') ? (
      <strong key={i} className="font-semibold text-ink">{part.slice(2, -2)}</strong>
    ) : (
      <span key={i}>{part}</span>
    ),
  )
}

// Lightweight structured renderer for a card's back text:
// blank line → spacing, "• / - " lines → a bullet list, everything else → a
// paragraph. Makes notes read as structure, not one wall of text.
export function RichText({ text }) {
  const lines = (text || '').split('\n')
  const blocks = []
  let bullets = null
  const flush = () => { if (bullets) { blocks.push({ t: 'ul', items: bullets }); bullets = null } }
  for (const raw of lines) {
    const s = raw.trim()
    if (!s) { flush(); blocks.push({ t: 'gap' }); continue }
    if (/^[•\-–]\s+/.test(s)) {
      if (!bullets) bullets = []
      bullets.push(s.replace(/^[•\-–]\s+/, ''))
    } else {
      flush()
      blocks.push({ t: 'p', text: s })
    }
  }
  flush()
  return (
    <div className="space-y-2.5">
      {blocks.map((b, i) => {
        if (b.t === 'gap') return <div key={i} className="h-1" />
        if (b.t === 'ul')
          return (
            <div key={i} className="space-y-1.5">
              {b.items.map((it, j) => (
                <div key={j} className="flex gap-2.5 text-[15px] leading-relaxed text-ink/90">
                  <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-clay-400" />
                  <span>{inline(it)}</span>
                </div>
              ))}
            </div>
          )
        return <div key={i} className="text-[15px] leading-relaxed text-ink/90">{inline(b.text)}</div>
      })}
    </div>
  )
}
