// The "mock interview" flow, codified. Two stage sequences — one for coding
// rounds, one for LLD — that you run end-to-end for any problem, the way a
// real SDE II interviewer expects to watch you work. Each stage carries what
// you DO and the SIGNAL it sends (what the interviewer is actually scoring),
// plus a suggested time budget so the whole thing fits a real round.

export const rehearseIntro =
  'Grinding problems teaches you to solve. Rehearsing the flow teaches you to solve the way an SDE II wants to watch — clarify before coding, get buy-in before typing, and test your own code before they ask. Run this on every problem until the sequence is automatic.'

// ---- Coding round (~35–40 min) ----
export const codingStages = [
  {
    id: 'understand',
    title: 'Understand',
    minutes: 2,
    do: 'Read the prompt aloud, then restate it in your own words. Name the inputs and the expected output.',
    signal: 'That you genuinely understand the problem before touching it — not pattern-matching on keywords.',
    placeholder: 'Restate the problem in one or two sentences. What goes in, what comes out?',
  },
  {
    id: 'clarify',
    title: 'Clarify',
    minutes: 2,
    do: 'Ask the questions a careful engineer asks: input size, value ranges (overflow?), duplicates, sorted or not, empty/null, output format, can I mutate the input, how to break ties.',
    signal: 'You surface constraints and edge cases up front. Ranges → overflow → int vs long is a classic thing they wait to see if you catch.',
    placeholder: 'List the clarifying questions you would ask the interviewer…',
  },
  {
    id: 'examples',
    title: 'Examples & edges',
    minutes: 2,
    do: 'Walk one concrete example by hand to confirm your understanding, then list the tricky edge cases (empty, single element, negatives, duplicates, overflow).',
    signal: 'Rigor and communication — you reason with concrete cases, not just abstractions.',
    placeholder: 'Your worked example + the edge cases you would test…',
  },
  {
    id: 'bruteforce',
    title: 'Brute force',
    minutes: 3,
    do: 'State the naive approach out loud, and its time & space complexity. Do not code it yet — just establish a working baseline.',
    signal: 'You can always produce something correct. It also gives you a bottleneck to beat.',
    placeholder: 'The brute-force approach + its Big-O (time and space)…',
  },
  {
    id: 'optimize',
    title: 'Optimize & get buy-in',
    minutes: 5,
    do: 'Name the bottleneck in the brute force. Name the pattern or data structure that removes it. State the improved Big-O. Then sketch the plan (pseudocode / steps) and CONFIRM the approach with the interviewer before you write real code.',
    signal: 'The core problem-solving signal — plus collaboration. Starting to code without buy-in is the #1 SDE II red flag.',
    placeholder: 'Bottleneck → pattern/data structure → new Big-O → step-by-step plan. What would you confirm with the interviewer before coding?',
  },
  {
    id: 'code',
    title: 'Write the code (Java)',
    minutes: 15,
    mono: true,
    do: 'Write clean Java, narrating as you go. Good names, handle the edge cases you found, keep it readable.',
    signal: 'Code quality and communication under pressure — can you talk and write correct code at the same time?',
    placeholder: 'Write or sketch your solution here…',
  },
  {
    id: 'dryrun',
    title: 'Dry run & test',
    minutes: 5,
    do: 'Trace your code on the main example AND one edge case, line by line, tracking each variable. Find and fix your own bugs before the interviewer points them out.',
    signal: 'Testing instinct — the most-skipped stage and one of the strongest positive signals when you do it unprompted.',
    placeholder: 'Trace: variable values step by step. Any bugs you found & how you fixed them…',
  },
  {
    id: 'complexity',
    title: 'Complexity & follow-ups',
    minutes: 2,
    do: 'State the final time & space complexity and justify it. Discuss trade-offs, and be ready for "can we do better?" or a follow-up variation.',
    signal: 'Depth and grace under the follow-up — where hire vs strong-hire often gets decided.',
    placeholder: 'Final Big-O (justified) + any follow-up ideas or trade-offs…',
  },
]

// ---- LLD round (~40 min) ----
export const lldStages = [
  {
    id: 'requirements',
    title: 'Clarify requirements',
    minutes: 5,
    do: 'Pin down functional requirements (what it must do), non-functional ones (scale, concurrency), and what is explicitly out of scope. List the key use cases.',
    signal: 'You scope the problem before designing — you do not build what nobody asked for.',
    placeholder: 'Functional + non-functional requirements, in/out of scope, main use cases…',
  },
  {
    id: 'entities',
    title: 'Core entities / classes',
    minutes: 5,
    do: 'Pull the nouns out of the requirements → candidate classes. Give each one a single, clear responsibility (SRP). Note the enums you will need.',
    signal: 'You find the right abstractions and keep responsibilities clean.',
    placeholder: 'The core classes + a one-line responsibility for each; enums you need…',
  },
  {
    id: 'relationships',
    title: 'Relationships',
    minutes: 4,
    do: 'Connect the classes: is-a (inheritance) vs has-a, and for has-a which kind — association, aggregation (part outlives whole), or composition (part dies with whole). Note multiplicity (one-to-many, etc.).',
    signal: 'You model the domain correctly, using precise UML relationships.',
    placeholder: 'How the classes relate (is-a / association / aggregation / composition) + multiplicities…',
  },
  {
    id: 'classdesign',
    title: 'Class design',
    minutes: 8,
    mono: true,
    do: 'Flesh out each class: fields, key methods, access modifiers. Apply encapsulation (private state, guarded access). Note where each SOLID principle shows up.',
    signal: 'Clean, encapsulated OO design — not one god-class doing everything.',
    placeholder: 'Sketch the classes: fields + methods. Where does encapsulation / SOLID apply?',
  },
  {
    id: 'patterns',
    title: 'Apply design patterns',
    minutes: 5,
    do: 'Decide where a pattern genuinely helps: Factory (creation), Strategy (interchangeable behavior), Singleton (one shared instance), Observer (notifications), State (mode transitions). Justify each — do not name-drop.',
    signal: 'You reach for patterns with a reason, which reads as real design maturity.',
    placeholder: 'Which patterns, where, and why each one earns its place…',
  },
  {
    id: 'apis',
    title: 'Key APIs / interfaces',
    minutes: 5,
    mono: true,
    do: 'Define the main public methods and their signatures — what they take, what they return, how errors surface. These are the seams other code depends on.',
    signal: 'Usable, well-thought interfaces that hide the internals.',
    placeholder: 'The main method signatures (params → return), error handling…',
  },
  {
    id: 'walkthrough',
    title: 'Walk a use case',
    minutes: 5,
    do: 'Pick the primary flow (e.g. "park a car and pay") and trace it through your objects call by call, showing they collaborate to produce the result.',
    signal: 'Proof your design actually works end-to-end, not just on paper.',
    placeholder: 'Trace the main use case: which object calls which method, in order…',
  },
  {
    id: 'extend',
    title: 'Extensibility & trade-offs',
    minutes: 3,
    do: 'Show how a new requirement drops in cleanly (new type = new class, no edits — OCP). Address concurrency if relevant, and name the trade-offs you made.',
    signal: 'Forward-thinking design and honest engineering judgement.',
    placeholder: 'How would you add feature X? Concurrency? What did you trade off and why?',
  },
]

export function stagesFor(kind) {
  return kind === 'lld' ? lldStages : codingStages
}

export function totalMinutes(kind) {
  return stagesFor(kind).reduce((sum, s) => sum + s.minutes, 0)
}
