// Researched "what to expect" content for the Amazon new-grad SDE I in-person
// loop (Boston). Synthesized from firsthand candidate reports (Reddit, Blind,
// Glassdoor, LeetCode Discuss, Medium) and official Amazon guidance, July 2026.
// This is reference material rendered read-only in the Insights view.

export const loopStructure = {
  summary:
    'Your loop is 4 × 60-min rounds, 1-on-1 (in person in Boston; many new-grad loops run virtually over Amazon Chime + LiveCode). Reports converge on ~2 coding/DSA rounds, 1 object-oriented / low-level design (LLD) round, and 1 behavioral round (often the Bar Raiser). Leadership Principles are probed in EVERY round — each interviewer is assigned ~2–3 to dig into.',
  rounds: [
    { round: 1, focus: 'Coding / DSA', detail: 'Often an arrays / strings / hashmap / two-pointer opener. 1 medium (sometimes 2 easy-mediums), plus 1–2 LP questions.' },
    { round: 2, focus: 'Coding / DSA (harder)', detail: 'The "raise-the-bar" technical round — frequently trees, graphs, heaps, or DP, often with a follow-up to optimize.' },
    { round: 3, focus: 'Object-oriented / low-level design', detail: 'For SDE I this is OOD (parking lot, vending machine, LRU/LFU cache) — NOT distributed systems. Sometimes a 2nd coding problem instead.' },
    { round: 4, focus: 'Behavioral / Bar Raiser', detail: 'Mostly LP deep-dives with 3–4 layers of follow-up; may never open the editor. From outside the team; holds effective veto.' },
  ],
  perRound:
    'Within a 60-min round: ~5 min intro, ~10–15 min Leadership Principle questions, ~30–40 min technical work, ~5 min your questions. Do NOT treat any round as "coding only." The Bar Raiser round inverts this — it can be 45–60 min of pure behavioral.',
  genAiNote:
    'Some 2025–26 loops add a "Gen AI" round. Despite the name, candidates report it is essentially another standard DSA coding round with AI-adjacent framing — don’t over-prepare exotic ML.',
}

// The stages before the onsite loop.
export const funnel = {
  intro:
    'The new-grad pipeline is: Application → Online Assessment (OA) → (sometimes a phone screen — often skipped for strong OA scores) → the 4-round loop → debrief → offer. University hiring is rolling, so timelines can stretch to months; apply early.',
  oa: {
    platform: 'HackerRank (proctored), ~1.5–2 hrs of actual work inside a larger window.',
    parts: [
      '2 coding problems (~70 min) — easy-to-medium DSA, auto-graded on hidden tests with partial credit. This score is the heaviest gate.',
      'Work Simulation ("Day in the Life", ~1–2 hrs) — video situational-judgment scenarios mapped to Leadership Principles.',
      'Work Styles Assessment (~15 min) — agree/disagree survey mapped to the 16 LPs.',
      'Code Debugging (~20 min, common for SDE I) — fix several short buggy snippets fast.',
    ],
  },
}

// Object-oriented / low-level design round.
export const lldRound = {
  intro:
    'For SDE I the design round is object-oriented (LLD) — model classes for a concrete real-world object in ~40 min. Not distributed systems. Interviewers care more about clean modeling, tradeoffs, and extensibility than lines of code.',
  approach: [
    'Clarify requirements & scope first (5–8 min) — functional needs, constraints, what’s out of scope. State assumptions aloud.',
    'Identify core entities → classes; list attributes and responsibilities. Use enums for fixed categories.',
    'Define relationships — composition vs. inheritance, “has-a” vs. “is-a”.',
    'Define public methods/APIs and the main flows (e.g., park(), unpark()).',
    'Apply design patterns where they fit naturally — Strategy, State, Factory, Singleton, Observer — and justify them.',
    'Handle constraints & edge cases; design for extensibility (Open/Closed) so new types plug in without rewrites.',
    'Talk through it the whole time; write class skeletons. Breadth first, then depth on one area.',
  ],
  prompts: [
    'Parking Lot (the most common)',
    'Elevator / elevator control system',
    'Vending Machine (state machine)',
    'ATM',
    'LRU / LFU cache (implement end-to-end)',
    'Deck of Cards / card game',
    'Library / book management',
    'Amazon Locker / package pickup',
    'Rate Limiter (token bucket)',
    'Tic-Tac-Toe',
  ],
  evaluates:
    'Clean OOD fundamentals (decomposition, encapsulation, single responsibility), SOLID + sensible patterns, extensibility/maintainability, requirement-gathering & tradeoff reasoning, and edge cases — usually with LP probing mixed in.',
}

export const tools = [
  { name: 'LiveCode', note: 'Amazon’s shared editor for coding rounds. Syntax highlighting, but NO run/compile and NO autocomplete — write correct code and dry-run it by hand.' },
  { name: 'Amazon Chime', note: 'The video platform for virtual rounds. Just need a laptop, mic, and a quiet space.' },
  { name: 'HackerRank', note: 'The proctored OA platform.' },
  { name: 'NeetCode 150', note: 'Best pattern-based problem roadmap for the coding rounds.' },
  { name: 'LeetCode — Amazon (last 6 months)', note: 'Highest-signal list for recently-asked questions.' },
  { name: 'Pramp / interviewing.io', note: 'Live mock coding interviews with peers or pros.' },
  { name: 'Hello Interview', note: 'Structured guides for LLD and behavioral, with an L4 track.' },
]

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
  'Critical Connections in a Network', 'LRU Cache', 'Merge Intervals', 'Koko Eating Bananas',
  'K Closest Points to Origin', 'Top K Frequent Words', 'Reorder Data in Log Files',
  'Search Suggestions System', 'Copy List with Random Pointer', 'Serialize/Deserialize Binary Tree',
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

// The plan is allocated deliberately: ~7 days all-in on DSA (repeated/high-
// frequency questions first), then the last 3–4 days for everything else.
export const studyPlanIntro =
  'Solo plan tuned to where Raveena is now: strong on arrays/prefix-sums, weakest on the harder round-2 material (trees, graphs). DSA is the main block each day and is front-loaded onto trees & graphs, then heaps / DP / binary search, with the array family as a quick refresh. Because it’s all solo, LLD and behavioral are spread across every day rather than crammed at the end.'

export const dailyHabit =
  'Every day also: 1 hour LLD + 1 hour behavioral. Don’t save them for the end — a little each day is how they stick.'

export const studyPlan = [
  { phase: 'Days 1–6 · DSA-heavy (＋1h LLD ＋1h behavioral daily)', day: 'Day 1 · Jul 19', theme: 'Trees — fundamentals', items: 'DSA: Invert · Max Depth · Same Tree · Subtree · Balanced · Diameter; then Level Order · Right Side View · Zigzag.  ·  LLD (1h): read the primer (OOP, SOLID, patterns).  ·  Behavioral (1h): draft stories — Customer Obsession, Ownership.' },
  { phase: 'Days 1–6 · DSA-heavy (＋1h LLD ＋1h behavioral daily)', day: 'Day 2 · Jul 20', theme: 'Trees — harder + BST', items: 'DSA: Count Good Nodes · Construct from Pre+Inorder · All Nodes Distance K · Validate BST · LCA of BST · Kth Smallest · Max Path Sum · Serialize/Deserialize.  ·  LLD (1h): Parking Lot (talk through + Java skeleton).  ·  Behavioral (1h): Dive Deep, Bias for Action.' },
  { phase: 'Days 1–6 · DSA-heavy (＋1h LLD ＋1h behavioral daily)', day: 'Day 3 · Jul 21', theme: 'Graphs — grids & BFS/DFS', items: 'DSA: Number of Islands · Rotting Oranges · Clone Graph · Max Area of Island · Pacific Atlantic · Surrounded Regions · Word Search.  ·  LLD (1h): Vending Machine (State pattern).  ·  Behavioral (1h): Deliver Results, Learn and Be Curious.' },
  { phase: 'Days 1–6 · DSA-heavy (＋1h LLD ＋1h behavioral daily)', day: 'Day 4 · Jul 22', theme: 'Graphs — topo sort & union-find', items: 'DSA: Course Schedule I/II · Alien Dictionary · Redundant Connection · # Connected Components · Word Ladder.  ·  LLD (1h): LRU / LFU Cache (implement).  ·  Behavioral (1h): Earn Trust, Have Backbone.' },
  { phase: 'Days 1–6 · DSA-heavy (＋1h LLD ＋1h behavioral daily)', day: 'Day 5 · Jul 23', theme: 'Heaps + Binary Search', items: 'DSA: K Closest · Top K Frequent · Kth Largest · Task Scheduler · Merge k Lists · Find Median · Reorganize String; Koko · Search Rotated · Find Min Rotated · Search 2D.  ·  LLD (1h): In-Memory File System (peer-reported).  ·  Behavioral (1h): Invent & Simplify, Are Right A Lot.' },
  { phase: 'Days 1–6 · DSA-heavy (＋1h LLD ＋1h behavioral daily)', day: 'Day 6 · Jul 24', theme: 'DP-common + Intervals + refresh', items: 'DSA: Climbing Stairs · House Robber I/II · Coin Change · Word Break · LIS · Max Product · Unique Paths · Decode Ways · Jump Game; Merge Intervals · Insert Interval · Meeting Rooms II; quick refresh of array/2-pointer/sliding-window/stack/linked-list.  ·  LLD (1h): ATM.  ·  Behavioral (1h): a failure & a conflict story; start “Why Amazon?”.' },
  { phase: 'Days 7–10 · Consolidate + mocks', day: 'Day 7 · Jul 25', theme: 'Weak-spot repair + timed set', items: 'DSA: redo the shakiest trees/graphs/heap problems from memory; one timed mixed set.  ·  LLD (1h): Elevator, or re-do Parking Lot + Vending out loud, timed.  ·  Behavioral (1h): rehearse all stories out loud; map each to 2–3 LPs.' },
  { phase: 'Days 7–10 · Consolidate + mocks', day: 'Day 8 · Jul 26', theme: 'Mock coding + résumé', items: 'DSA: one timed mock coding round (2 mediums, narrate + Big-O + test).  ·  LLD (1h): Deck of Cards / Rate Limiter, or a full core design end-to-end, timed.  ·  Behavioral/Résumé (1h): drill every résumé project 2–3 layers deep (metrics, tradeoffs, “why X not Y”).' },
  { phase: 'Days 7–10 · Consolidate + mocks', day: 'Day 9 · Jul 27', theme: 'Full mock loop', items: 'DSA: mock coding rounds + review.  ·  LLD (1h): a full mock LLD round — talk a design in ~40 min.  ·  Behavioral (1h): mock behavioral round; fill any LP coverage gaps; finalize “Why Amazon?”.' },
  { phase: 'Days 7–10 · Consolidate + mocks', day: 'Day 10 · Jul 28', theme: 'Light review — no new hards', items: 'Re-read your top solutions; run the clarify→plan→code→test ritual on 2 easy-mediums; re-rehearse the LLD framework + top stories; confirm LiveCode link & travel; sleep early.' },
]
