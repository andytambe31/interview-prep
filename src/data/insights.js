// Researched "what to expect" content for the Amazon new-grad SDE I in-person
// loop (Boston). Synthesized from firsthand candidate reports (Reddit, Blind,
// Glassdoor, LeetCode Discuss, Medium) and official Amazon guidance, July 2026.
// This is reference material rendered read-only in the Insights view.

export const loopStructure = {
  summary:
    '4 back-to-back 60-min rounds, one day, 1-on-1. Reports converge on ~2 coding/DSA rounds, 1 largely behavioral round (often the Bar Raiser), and 1 mixed round (object-oriented design, or a 2025–26 "AI/GenAI + behavioral + DSA" hybrid). Leadership Principles appear in EVERY round.',
  rounds: [
    { round: 1, focus: 'Coding / DSA', detail: 'Often an arrays / strings / hashmap / two-pointer opener. 1 medium (sometimes 2 easy-mediums).' },
    { round: 2, focus: 'Coding / DSA (harder)', detail: 'The "raise-the-bar" technical round — frequently trees, graphs, or DP.' },
    { round: 3, focus: 'Mixed — OOD or 2nd coding', detail: 'For SDE I, design is object-oriented (parking lot, deck of cards), NOT distributed systems.' },
    { round: 4, focus: 'Bar Raiser', detail: 'Heavily behavioral/LP with deep follow-ups; often one coding problem too. Holds effective veto.' },
  ],
  perRound:
    'Within a 60-min round: ~5 min intro, ~10–15 min Leadership Principle questions, ~30–40 min technical problem, ~5 min your questions. Do NOT treat any round as "coding only."',
}

export const liveCode = [
  'LiveCode is Amazon\'s shared/collaborative editor — you and the interviewer see the same document in real time.',
  'It has syntax highlighting but does NOT run or compile code, and has no autocomplete. Practice writing complete, correct code cold.',
  'Because nothing executes, you must talk through your logic and hand-trace test cases to "test" your solution.',
  'Language-agnostic — use the language you\'re strongest in.',
  'In-person: you type into LiveCode on your laptop (bring it + charger; confirm Wi-Fi with the recruiter). You may sketch on a whiteboard to explain, but the solution is typed.',
]

export const barRaiser = {
  what: 'A specially trained interviewer from OUTSIDE the hiring team who upholds Amazon\'s hiring bar and keeps the decision unbiased. Reinstated for entry-level SDE I (L4) roles in 2024.',
  identify: 'You usually aren\'t told which round it is. The tell: the interviewer isn\'t on the team you\'re applying to. Best strategy: treat every round as the Bar Raiser.',
  focus: 'Mostly behavioral / Leadership Principles, probing depth and consistency; digs 2–3 follow-ups deep until a story holds up or falls apart. For new grads: coachability, ownership, customer thinking, learning from mistakes.',
  weight: 'Effective veto — a strong "not inclined" can override multiple "hire" votes. Being scheduled for one does NOT mean you passed earlier rounds; it\'s part of the same loop.',
}

export const starMethod = {
  intro: 'Aim for ~1.5–2.5 min per answer. Amazon weights Leadership Principles heavily — strong code with weak LP answers can still fail.',
  parts: [
    { k: 'S — Situation', pct: '10–15%', tip: '1–2 sentences of context. Don\'t ramble here — the top failure mode is long setup before the point.' },
    { k: 'T — Task', pct: '10–15%', tip: 'YOUR specific responsibility/goal, not the team\'s.' },
    { k: 'A — Action', pct: '50–60%', tip: 'The core. What YOU personally did, step by step, and WHY. This is what\'s scored.' },
    { k: 'R — Result', pct: '15–20%', tip: 'Quantified outcome PLUS what you learned / would do differently.' },
  ],
  rules: [
    'Say "I", not "we". Bar Raisers will interrupt to ask what YOU specifically did.',
    'Metrics are mandatory. "No metrics / describe more impact" is the #1 critical feedback. Quantify everything: % improvement, latency, hours saved, users, $ saved, rank.',
    'Build Dive-Deep depth into every story — be ready to go 2–3 layers deeper on technical decisions, trade-offs, and "why not X".',
    'Own failure stories. Never blame others; end on the lesson and the change you made.',
    'Pick recent, appropriately-scoped stories. Avoid stale or trivial ones.',
  ],
  storyBank:
    'Build a tight bank of ~8–10 strong, distinct stories — do NOT memorize one per LP. Map each story to 2–4 LPs by reframing. Track which you\'ve used so you don\'t repeat across rounds (interviewers compare notes). As a new grad, draw on internships, capstone/course projects, hackathons, research, TA/club leadership, and personal projects.',
}

export const codingSignals = [
  'Ask clarifying questions FIRST — input types, ranges, null/empty, duplicates, sorted?, negatives, output format. (Dive Deep signal.)',
  'Communicate the approach + chosen data structure before coding. Silent coding is a red flag.',
  'State Big-O (time AND space) up front and again after. Discuss brute-force → optimized trade-off.',
  'Write clean, compilable code without an IDE — good names, helper functions.',
  'Test your own code at the end — dry-run 2 examples including an edge case. Catching your own bug is a strong positive.',
  'Handle follow-ups gracefully (streaming input, doesn\'t fit in memory, thread-safe) — shows Learn and Be Curious.',
]

export const difficultySplit = {
  note: 'The loop lives in Medium territory. Target ~70 problems: roughly 10 easy, 45 medium, 15 hard, weighted toward high-frequency.',
  bands: [
    { band: 'Easy', pct: '~15–20%', note: 'Warm-ups / follow-up variants. Don\'t skip, but won\'t carry you.' },
    { band: 'Medium', pct: '~65–70%', note: 'The core. Most rounds are one solid Medium.' },
    { band: 'Hard', pct: '~10–15%', note: 'Raise-the-bar / Bar Raiser round or a Medium extended. Know a handful of classics.' },
  ],
}

export const dayOf = {
  bring: [
    'Government-issued photo ID (required for building access)',
    'Laptop + charger — you type into LiveCode; confirm guest Wi-Fi ahead, have a phone hotspot backup',
    'Copies of your resume',
    'Notepad + pen',
    'A discreet STAR "cheat sheet" mapping stories to Leadership Principles',
    'Water / snack for between rounds',
  ],
  attire: 'Smart casual. Amazon focuses on ideas/experience, not outfit.',
  lunchBuddy:
    'The Lunch Buddy is NOT an interviewer — they submit no feedback and don\'t attend the debrief. Use it to recharge and ask candid questions (team culture, day-to-day, tools, on-call, growth). Still be professional — egregious misconduct could be flagged.',
  questionsToAsk: [
    'What does a typical week look like for an engineer on your team?',
    'How does the team mentor and develop junior engineers? What does SDE I → SDE II growth look like?',
    'What are the biggest technical challenges the team faces right now?',
    'How does your team measure success?',
  ],
}

export const timeline = [
  'Debrief: interviewers + Bar Raiser (who moderates) meet to share written feedback and vote, often within 24–48h.',
  'Decision: most commonly ~1–2 weeks. Range: 3 business days to 3–4 weeks (leveling debates / headcount can delay).',
  'How you\'re told: recruiter, usually by phone (offer) or email.',
  'Follow-up etiquette: reasonable to ping the recruiter after ~5 business days of silence.',
]

export const redFlags = [
  'Weak / ill-fitting Leadership Principle answers — the #1 rejection cause. You can ace coding and still fail on LP signals.',
  'Generic stories forced onto every principle — the interviewer "has nothing to write in the box".',
  'Answers that collapse under follow-ups — vague ownership, no metrics, team credit claimed as "I" without substance.',
  'Silent coding / no edge-case handling — reads as a gap since LiveCode doesn\'t run code.',
  'A Bar Raiser "not inclined" — can sink an otherwise-passing loop.',
  'Not framing experiences in Amazon LP language (Customer Obsession, Ownership, Dive Deep, Bias for Action).',
]

export const bostonNotes = [
  'Amazon\'s Boston tech hub is in the Seaport District. The primary current office is 111 Harbor Way (occupied since 2022) — most likely your loop location, but CONFIRM the exact building/address with your recruiter.',
  'A June 2026 Amazon Boston SDE candidate reported a 4-round in-person loop: behavioral, low-level design, DSA, and a hybrid AI-behavioral-and-DSA round, with behavioral questions in every round — closely matching this format.',
  'Seaport is transit-accessible (Silver Line / South Station). Factor in Boston traffic and parking scarcity; lean on public transit or rideshare and arrive early.',
]

export const highYield = [
  'Two Sum', 'Best Time to Buy/Sell Stock', 'Longest Substring Without Repeating Characters',
  'Trapping Rain Water', '3Sum', 'Number of Islands', 'Rotting Oranges', 'Course Schedule',
  'LRU Cache', 'Merge Intervals', 'Koko Eating Bananas', 'K Closest Points to Origin',
  'Reorganize String', 'Word Ladder', 'Serialize/Deserialize Binary Tree',
]

export const sources = [
  'onsites.fyi — Amazon SDE I (New Grad) interview questions',
  'IGotAnOffer — Amazon SDE & Bar Raiser guides',
  'interviewing.io — Amazon hiring process guide',
  'liquidslr/leetcode-company-wise-problems — community Amazon frequency data',
  'Blind, Glassdoor, LeetCode Discuss — firsthand loop reports (incl. Boston 2026)',
  'Exponent, DesignGurus, levels.fyi — LP & STAR guidance',
  'amazon.jobs / aboutamazon.com — official prep & Boston office',
]

// A 2-week plan keyed to the interview window (~Jul 27 – Aug 7, 2026).
export const studyPlan = [
  { day: 'Mon Jul 27', theme: 'Arrays & Hashing', items: 'Two Sum · Best Time to Buy/Sell · Contains Duplicate · Group Anagrams · Product Except Self · Top K Frequent. LP: draft 4 stories (Customer Obsession, Ownership).' },
  { day: 'Tue Jul 28', theme: 'Two Pointers & Sliding Window', items: '3Sum · Container With Most Water · Longest Substring · Minimum Window Substring · Fruit Into Baskets. LP: 3 stories (Dive Deep, Bias for Action).' },
  { day: 'Wed Jul 29', theme: 'Stack & Binary Search', items: 'Valid Parentheses · Min Stack · Daily Temperatures · Koko Eating Bananas · Search in Rotated Array. LP: 3 stories (Deliver Results, Learn & Be Curious).' },
  { day: 'Thu Jul 30', theme: 'Trees', items: 'Level Order · Zigzag · LCA · Validate BST · Serialize/Deserialize · Max Path Sum. LP: rehearse out loud.' },
  { day: 'Fri Jul 31', theme: 'Graphs / BFS-DFS', items: 'Number of Islands · Rotting Oranges · Course Schedule · Word Ladder · Word Search · Open the Lock.' },
  { day: 'Sat Aug 1', theme: 'Heaps + Linked Lists', items: 'K Closest Points · Merge k Lists · Kth Largest · Reorganize String; Add Two Numbers · Copy Random List · Reverse k-Group.' },
  { day: 'Sun Aug 2', theme: 'DP + Intervals + Tries', items: 'Coin Change · Word Break · LIS · Max Subarray; Merge Intervals · Insert Interval · Meeting Rooms II; Implement Trie · Word Search II. Rest half-day.' },
  { day: 'Mon Aug 3', theme: 'LRU + Design/OOD', items: 'LRU Cache · Design HashMap; then OOD: Parking Lot + Deck of Cards (class diagrams + method signatures).' },
  { day: 'Tue Aug 4', theme: 'Timed practice (simulate LiveCode)', items: '4 fresh Mediums in a plain editor, 30 min each, narrating + Big-O + testing. Redo any shaky high-freq problem.' },
  { day: 'Wed Aug 5', theme: 'Full mock loop #1', items: '2 coding rounds (1 medium + 1 medium-hard graph/tree) + 1 behavioral. Get feedback on clarifying-questions habit and complexity analysis.' },
  { day: 'Thu Aug 6', theme: 'Weak-spot repair + hards', items: 'Trapping Rain Water · Largest Rectangle · Sliding Window Max + 3 weakest topics. Finalize & time all STAR stories (2 min each).' },
  { day: 'Fri Aug 7', theme: 'Light review — no new hards', items: 'Re-read your top-20 high-freq solutions, run the clarify→plan→code→test→complexity ritual on 2 easy-mediums, review LP stories, sleep early.' },
]
