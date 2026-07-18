// Seed / reference content for the interview command center.
// User progress (status, confidence, notes, stories) lives in localStorage and
// is merged on top of this. Editing this file and redeploying updates the
// reference material without wiping progress (see store/state.js mergeSeed).

export const seedCandidate = {
  name: 'Raveena Ingale',
  role: 'Software Development Engineer (SDE I)',
  company: 'Amazon',
  office: 'Boston, MA (in-person loop)',
  format: '4 interviews × 60 min · LiveCode',
  recruiter: 'Song Hee (Erika) An — Amazon University Talent Acquisition',
  windowStart: '2026-07-27',
  windowEnd: '2026-08-07',
}

// Availability provided to the recruiter (EDT, 9:00 AM – 5:00 PM).
export const seedAvailability = [
  { id: 'a1', date: '2026-07-29', start: '09:00', end: '17:00', tz: 'EDT' },
  { id: 'a2', date: '2026-07-30', start: '09:00', end: '17:00', tz: 'EDT' },
  { id: 'a3', date: '2026-07-31', start: '09:00', end: '17:00', tz: 'EDT' },
  { id: 'a4', date: '2026-08-03', start: '09:00', end: '17:00', tz: 'EDT' },
  { id: 'a5', date: '2026-08-04', start: '09:00', end: '17:00', tz: 'EDT' },
  { id: 'a6', date: '2026-08-05', start: '09:00', end: '17:00', tz: 'EDT' },
  { id: 'a7', date: '2026-08-06', start: '09:00', end: '17:00', tz: 'EDT' },
  { id: 'a8', date: '2026-08-07', start: '09:00', end: '17:00', tz: 'EDT' },
]

export const seedLogistics = {
  livecodeLink: '',
  lunchBuddy: true,
  dietary: 'None',
  accommodations: 'None required',
  saveTheDateReceived: false,
  travelNotes: 'Boston, MA corporate office. Travel details arrive with the Save-the-Date email.',
  flightInfo: '',
  hotelInfo: '',
  bringChecklist: 'Laptop, charger, Wi-Fi capable, photo ID, copies of resume, questions for interviewers.',
}

// ---------------------------------------------------------------------------
// Coding problems. Backbone = the NeetCode 150 (pattern-based), with an Amazon
// frequency overlay (freq: high | medium | low) and a `neet` flag so the list
// can be filtered to just the 150. A few Amazon-signature problems not in the
// 150 are appended. Object-oriented design lives in its own topic.
// ---------------------------------------------------------------------------
const slugify = (t) => t.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')
const URL_OVERRIDE = {
  'Pow(x, n)': 'powx-n',
  'Insert Delete GetRandom O(1)': 'insert-delete-getrandom-o1',
}

// Amazon frequency overlay by canonical title.
const HIGH = new Set([
  'Two Sum', 'Best Time to Buy and Sell Stock', 'Product of Array Except Self', 'Group Anagrams',
  'Longest Consecutive Sequence', '3Sum', 'Container With Most Water', 'Trapping Rain Water',
  'Longest Substring Without Repeating Characters', 'Minimum Window Substring', 'Valid Parentheses',
  'Search in Rotated Sorted Array', 'Koko Eating Bananas', 'Merge Two Sorted Lists', 'Merge k Sorted Lists',
  'Copy List with Random Pointer', 'Add Two Numbers', 'LRU Cache', 'Binary Tree Level Order Traversal',
  'Binary Tree Right Side View', 'Lowest Common Ancestor of a Binary Search Tree', 'Subtree of Another Tree',
  'Serialize and Deserialize Binary Tree', 'Word Search II', 'K Closest Points to Origin',
  'Find Median from Data Stream', 'Number of Islands', 'Rotting Oranges', 'Course Schedule',
  'Course Schedule II', 'Word Ladder', 'Alien Dictionary', 'Longest Palindromic Substring', 'Coin Change',
  'Word Break', 'Merge Intervals', 'Meeting Rooms II', 'Maximum Subarray', 'Jump Game', 'Partition Labels',
  // Amazon-signature extras
  'Reorder Data in Log Files', 'Critical Connections in a Network', 'Search Suggestions System',
  'Top K Frequent Words', 'Fruit Into Baskets', 'Reorganize String',
])
const MED = new Set([
  'Valid Anagram', 'Contains Duplicate', 'Top K Frequent Elements', 'Encode and Decode Strings',
  'Two Sum II - Input Array Is Sorted', 'Longest Repeating Character Replacement', 'Min Stack',
  'Daily Temperatures', 'Search a 2D Matrix', 'Find Minimum in Rotated Sorted Array',
  'Median of Two Sorted Arrays', 'Time Based Key-Value Store', 'Reorder List', 'Remove Nth Node From End of List',
  'Find the Duplicate Number', 'Reverse Nodes in k-Group', 'Validate Binary Search Tree',
  'Kth Smallest Element in a BST', 'Construct Binary Tree from Preorder and Inorder Traversal',
  'Binary Tree Maximum Path Sum', 'Diameter of Binary Tree', 'Implement Trie (Prefix Tree)',
  'Design Add and Search Words Data Structure', 'Subsets', 'Combination Sum', 'Permutations', 'Word Search',
  'Letter Combinations of a Phone Number', 'Kth Largest Element in an Array', 'Task Scheduler', 'Design Twitter',
  'Clone Graph', 'Pacific Atlantic Water Flow', 'Surrounded Regions',
  'Number of Connected Components in an Undirected Graph', 'Graph Valid Tree', 'House Robber', 'House Robber II',
  'Decode Ways', 'Maximum Product Subarray', 'Longest Increasing Subsequence', 'Unique Paths',
  'Longest Common Subsequence', 'Edit Distance', 'Insert Interval', 'Non-overlapping Intervals', 'Gas Station',
  'Rotate Image', 'Spiral Matrix', 'Set Matrix Zeroes', 'Single Number', 'Number of 1 Bits', 'Counting Bits',
  'Missing Number', 'Reverse Integer', 'Reverse Linked List', 'Reverse Bits',
  // extras
  'Most Common Word', 'Analyze User Website Visit Pattern', 'All Nodes Distance K in Binary Tree',
  'Concatenated Words', 'Minimum Cost to Connect Sticks', 'Maximum Ice Cream Bars', 'Basic Calculator II',
  'Insert Delete GetRandom O(1)', 'LFU Cache', 'Boats to Save People', 'Binary Tree Zigzag Level Order Traversal',
])
const fq = (t) => (HIGH.has(t) ? 'high' : MED.has(t) ? 'medium' : 'low')

const mk = (title, topic, difficulty, neet) => ({
  id: slugify(title),
  title,
  topic,
  difficulty,
  freq: fq(title),
  neet,
  url: 'https://leetcode.com/problems/' + (URL_OVERRIDE[title] || slugify(title)) + '/',
  status: 'todo',
  confidence: 0,
  notes: '',
  lastPracticed: '',
})

// The NeetCode 150, grouped by our topic names. [title, difficulty]
const NEET = {
  'Arrays & Hashing': [
    ['Contains Duplicate', 'Easy'], ['Valid Anagram', 'Easy'], ['Two Sum', 'Easy'],
    ['Group Anagrams', 'Medium'], ['Top K Frequent Elements', 'Medium'], ['Encode and Decode Strings', 'Medium'],
    ['Product of Array Except Self', 'Medium'], ['Valid Sudoku', 'Medium'], ['Longest Consecutive Sequence', 'Medium'],
  ],
  'Two Pointers': [
    ['Valid Palindrome', 'Easy'], ['Two Sum II - Input Array Is Sorted', 'Medium'], ['3Sum', 'Medium'],
    ['Container With Most Water', 'Medium'], ['Trapping Rain Water', 'Hard'],
  ],
  'Sliding Window': [
    ['Best Time to Buy and Sell Stock', 'Easy'], ['Longest Substring Without Repeating Characters', 'Medium'],
    ['Longest Repeating Character Replacement', 'Medium'], ['Permutation in String', 'Medium'],
    ['Minimum Window Substring', 'Hard'], ['Sliding Window Maximum', 'Hard'],
  ],
  'Stack': [
    ['Valid Parentheses', 'Easy'], ['Min Stack', 'Medium'], ['Evaluate Reverse Polish Notation', 'Medium'],
    ['Generate Parentheses', 'Medium'], ['Daily Temperatures', 'Medium'], ['Car Fleet', 'Medium'],
    ['Largest Rectangle in Histogram', 'Hard'],
  ],
  'Binary Search': [
    ['Binary Search', 'Easy'], ['Search a 2D Matrix', 'Medium'], ['Koko Eating Bananas', 'Medium'],
    ['Find Minimum in Rotated Sorted Array', 'Medium'], ['Search in Rotated Sorted Array', 'Medium'],
    ['Time Based Key-Value Store', 'Medium'], ['Median of Two Sorted Arrays', 'Hard'],
  ],
  'Linked List': [
    ['Reverse Linked List', 'Easy'], ['Merge Two Sorted Lists', 'Easy'], ['Reorder List', 'Medium'],
    ['Remove Nth Node From End of List', 'Medium'], ['Copy List with Random Pointer', 'Medium'],
    ['Add Two Numbers', 'Medium'], ['Linked List Cycle', 'Easy'], ['Find the Duplicate Number', 'Medium'],
    ['LRU Cache', 'Medium'], ['Merge k Sorted Lists', 'Hard'], ['Reverse Nodes in k-Group', 'Hard'],
  ],
  'Trees': [
    ['Invert Binary Tree', 'Easy'], ['Maximum Depth of Binary Tree', 'Easy'], ['Diameter of Binary Tree', 'Easy'],
    ['Balanced Binary Tree', 'Easy'], ['Same Tree', 'Easy'], ['Subtree of Another Tree', 'Easy'],
    ['Lowest Common Ancestor of a Binary Search Tree', 'Medium'], ['Binary Tree Level Order Traversal', 'Medium'],
    ['Binary Tree Right Side View', 'Medium'], ['Count Good Nodes in Binary Tree', 'Medium'],
    ['Validate Binary Search Tree', 'Medium'], ['Kth Smallest Element in a BST', 'Medium'],
    ['Construct Binary Tree from Preorder and Inorder Traversal', 'Medium'],
    ['Binary Tree Maximum Path Sum', 'Hard'], ['Serialize and Deserialize Binary Tree', 'Hard'],
  ],
  'Tries': [
    ['Implement Trie (Prefix Tree)', 'Medium'], ['Design Add and Search Words Data Structure', 'Medium'],
    ['Word Search II', 'Hard'],
  ],
  'Backtracking': [
    ['Subsets', 'Medium'], ['Combination Sum', 'Medium'], ['Permutations', 'Medium'], ['Subsets II', 'Medium'],
    ['Combination Sum II', 'Medium'], ['Word Search', 'Medium'], ['Palindrome Partitioning', 'Medium'],
    ['Letter Combinations of a Phone Number', 'Medium'], ['N-Queens', 'Hard'],
  ],
  'Heaps': [
    ['Kth Largest Element in a Stream', 'Easy'], ['Last Stone Weight', 'Easy'], ['K Closest Points to Origin', 'Medium'],
    ['Kth Largest Element in an Array', 'Medium'], ['Task Scheduler', 'Medium'], ['Design Twitter', 'Medium'],
    ['Find Median from Data Stream', 'Hard'],
  ],
  'Graphs': [
    ['Number of Islands', 'Medium'], ['Clone Graph', 'Medium'], ['Max Area of Island', 'Medium'],
    ['Pacific Atlantic Water Flow', 'Medium'], ['Surrounded Regions', 'Medium'], ['Rotting Oranges', 'Medium'],
    ['Walls and Gates', 'Medium'], ['Course Schedule', 'Medium'], ['Course Schedule II', 'Medium'],
    ['Redundant Connection', 'Medium'], ['Number of Connected Components in an Undirected Graph', 'Medium'],
    ['Graph Valid Tree', 'Medium'], ['Word Ladder', 'Hard'],
    ['Reconstruct Itinerary', 'Hard'], ['Min Cost to Connect All Points', 'Medium'], ['Network Delay Time', 'Medium'],
    ['Swim in Rising Water', 'Hard'], ['Alien Dictionary', 'Hard'], ['Cheapest Flights Within K Stops', 'Medium'],
  ],
  'Dynamic Programming': [
    ['Climbing Stairs', 'Easy'], ['Min Cost Climbing Stairs', 'Easy'], ['House Robber', 'Medium'],
    ['House Robber II', 'Medium'], ['Longest Palindromic Substring', 'Medium'], ['Palindromic Substrings', 'Medium'],
    ['Decode Ways', 'Medium'], ['Coin Change', 'Medium'], ['Maximum Product Subarray', 'Medium'],
    ['Word Break', 'Medium'], ['Longest Increasing Subsequence', 'Medium'], ['Partition Equal Subset Sum', 'Medium'],
    ['Unique Paths', 'Medium'], ['Longest Common Subsequence', 'Medium'],
    ['Best Time to Buy and Sell Stock with Cooldown', 'Medium'], ['Coin Change II', 'Medium'],
    ['Target Sum', 'Medium'], ['Interleaving String', 'Medium'], ['Longest Increasing Path in a Matrix', 'Hard'],
    ['Distinct Subsequences', 'Hard'], ['Edit Distance', 'Medium'], ['Burst Balloons', 'Hard'],
    ['Regular Expression Matching', 'Hard'],
  ],
  'Greedy': [
    ['Maximum Subarray', 'Medium'], ['Jump Game', 'Medium'], ['Jump Game II', 'Medium'], ['Gas Station', 'Medium'],
    ['Hand of Straights', 'Medium'], ['Merge Triplets to Form Target Triplet', 'Medium'], ['Partition Labels', 'Medium'],
    ['Valid Parenthesis String', 'Medium'],
  ],
  'Intervals': [
    ['Insert Interval', 'Medium'], ['Merge Intervals', 'Medium'], ['Non-overlapping Intervals', 'Medium'],
    ['Meeting Rooms', 'Easy'], ['Meeting Rooms II', 'Medium'], ['Minimum Interval to Include Each Query', 'Hard'],
  ],
  'Math & Geometry': [
    ['Rotate Image', 'Medium'], ['Spiral Matrix', 'Medium'], ['Set Matrix Zeroes', 'Medium'], ['Happy Number', 'Easy'],
    ['Plus One', 'Easy'], ['Pow(x, n)', 'Medium'], ['Multiply Strings', 'Medium'], ['Detect Squares', 'Medium'],
  ],
  'Bit Manipulation': [
    ['Single Number', 'Easy'], ['Number of 1 Bits', 'Easy'], ['Counting Bits', 'Easy'], ['Reverse Bits', 'Easy'],
    ['Missing Number', 'Easy'], ['Sum of Two Integers', 'Medium'], ['Reverse Integer', 'Medium'],
  ],
}

// Amazon-signature problems NOT in the NeetCode 150. [title, topic, difficulty]
const AMAZON_EXTRA = [
  ['Reorder Data in Log Files', 'Strings', 'Easy'],
  ['Most Common Word', 'Strings', 'Easy'],
  ['Analyze User Website Visit Pattern', 'Arrays & Hashing', 'Medium'],
  ['Boats to Save People', 'Two Pointers', 'Medium'],
  ['Fruit Into Baskets', 'Sliding Window', 'Medium'],
  ['Basic Calculator II', 'Stack', 'Medium'],
  ['Binary Tree Zigzag Level Order Traversal', 'Trees', 'Medium'],
  ['All Nodes Distance K in Binary Tree', 'Trees', 'Medium'],
  ['Search Suggestions System', 'Tries', 'Medium'],
  ['Concatenated Words', 'Tries', 'Hard'],
  ['Critical Connections in a Network', 'Graphs', 'Hard'],
  ['Top K Frequent Words', 'Heaps', 'Medium'],
  ['Reorganize String', 'Heaps', 'Medium'],
  ['Minimum Cost to Connect Sticks', 'Heaps', 'Medium'],
  ['Maximum Ice Cream Bars', 'Greedy', 'Medium'],
  ['Insert Delete GetRandom O(1)', 'Design', 'Medium'],
  ['LFU Cache', 'Design', 'Hard'],
]

const ood = (id, title, difficulty, freq) => ({
  id,
  title,
  topic: 'Object-Oriented Design',
  difficulty,
  freq,
  neet: false,
  url: '',
  status: 'todo',
  confidence: 0,
  notes: '',
  lastPracticed: '',
})

export const seedProblems = [
  ...Object.entries(NEET).flatMap(([topic, list]) => list.map(([t, d]) => mk(t, topic, d, true))),
  ...AMAZON_EXTRA.map(([t, topic, d]) => mk(t, topic, d, false)),
  // Object-oriented / low-level design (talk through classes + APIs; no LeetCode link)
  ood('ood-parking-lot', 'Design a Parking Lot', 'Medium', 'high'),
  ood('ood-vending-machine', 'Design a Vending Machine (state machine)', 'Medium', 'high'),
  ood('ood-elevator', 'Design an Elevator System', 'Medium', 'medium'),
  ood('ood-atm', 'Design an ATM', 'Medium', 'medium'),
  ood('ood-cache', 'Design an LRU / LFU Cache (implement)', 'Medium', 'medium'),
  ood('ood-deck-cards', 'Design a Deck of Cards', 'Medium', 'medium'),
  ood('ood-rate-limiter', 'Design a Rate Limiter (token bucket)', 'Medium', 'medium'),
  ood('ood-amazon-locker', 'Design an Amazon Locker', 'Medium', 'medium'),
  ood('ood-library', 'Design a Library System', 'Medium', 'low'),
  ood('ood-tic-tac-toe', 'Design Tic-Tac-Toe (OOD)', 'Medium', 'low'),
]

// Topic reference list (all DSA topics + design areas).
export const seedCodingTopics = [
  'Arrays & Hashing',
  'Strings',
  'Two Pointers',
  'Sliding Window',
  'Stack',
  'Binary Search',
  'Linked List',
  'Trees',
  'Tries',
  'Backtracking',
  'Heaps',
  'Graphs',
  'Intervals',
  'Dynamic Programming',
  'Greedy',
  'Design',
  'Math & Geometry',
  'Bit Manipulation',
  'Object-Oriented Design',
]

// ---------------------------------------------------------------------------
// Amazon Leadership Principles (16). Each has a plain-English "what they want"
// and commonly reported behavioral questions. confidence/notes are user fields.
// ---------------------------------------------------------------------------
const LP = (id, name, emphasis, want, questions) => ({ id, name, emphasis, want, questions })

export const seedLPs = [
  LP('customer-obsession', 'Customer Obsession', 'high',
    'Start from the customer and work backwards; earn and keep customer trust.',
    ['Tell me about a time you used customer feedback to drive an improvement or innovation.',
     'Tell me about a time a customer wanted one thing but you felt they needed something else — what did you do?',
     'Tell me about a time you had to balance the needs of the customer against the needs of the business.',
     'Tell me about a time you went above and beyond for a customer/user.',
     'Describe a time you chose what was right for the customer over what was easy for your team.']),
  LP('ownership', 'Ownership', 'high',
    'Act on behalf of the whole company, think long-term, never say "that\'s not my job".',
    ['Tell me about a time you took on something significant outside your area of responsibility.',
     'Tell me about a time you took complete ownership of a project and drove it through obstacles.',
     'Tell me about a time you sacrificed short-term gain for a longer-term goal.',
     'Tell me about a time you realized you might miss a commitment — how did you surface and communicate the risk?',
     'Tell me about a time you had to make an important decision without your manager’s approval.']),
  LP('invent-simplify', 'Invent and Simplify', 'medium',
    'Seek new ideas and simplify; "not invented here" is fine — borrow good ideas.',
    ['Tell me about a time you solved a complex problem with a simple solution.',
     'Tell me about a time you invented something or came up with a novel approach.',
     'Tell me about a time you redesigned or simplified a process — why, and what was the outcome?',
     'Tell me about a time you tried to simplify something but failed. What would you do differently?']),
  LP('right-a-lot', 'Are Right, A Lot', 'medium',
    'Strong judgment; seek diverse perspectives and disconfirm your own beliefs.',
    ['Tell me about a time you had to make a decision with little or incomplete data.',
     'Tell me about a time you made a decision based on your instincts/judgment.',
     'Tell me about a time you were wrong — how did you find out, and what did you do?',
     'Tell me about a time you sought out diverse perspectives before making a call.']),
  LP('learn-curious', 'Learn and Be Curious', 'high',
    'Always learning, curious about new possibilities and self-improvement.',
    ['Tell me about a skill or technology you recently taught yourself — why, and how?',
     'Tell me about a time you failed and what you changed afterward.',
     'Tell me about a time you took on something new and unfamiliar and had to ramp up fast.',
     'Tell me about a time your curiosity led you to explore beyond your immediate task.',
     'Tell me about a time you sought out feedback to improve yourself.']),
  LP('hire-develop', 'Hire and Develop the Best', 'low',
    'Raise the performance bar; coach and mentor others.',
    ['Tell me about a time you gave feedback that helped a peer improve.',
     'Tell me about a time you stepped in to help a struggling teammate.',
     'Tell me about a time you mentored, tutored, or onboarded someone.',
     'Tell me about a time you received negative feedback and acted on it.']),
  LP('highest-standards', 'Insist on the Highest Standards', 'medium',
    'Continually raise the bar; don\'t let defects travel downstream.',
    ['Tell me about a time you weren’t satisfied with the status quo and raised the bar.',
     'Tell me about a project you wish you’d done better — how would you do it differently today?',
     'Tell me about a time you refused to compromise on quality under pressure.',
     'Tell me about a time your attention to standards caught a problem others missed.']),
  LP('think-big', 'Think Big', 'medium',
    'Bold direction that inspires results; think differently and look around corners.',
    ['Tell me about your most significant accomplishment — why was it significant?',
     'Tell me about a time you proposed a bold, non-obvious solution.',
     'Tell me about a time you went well beyond the original scope and delivered.',
     'Tell me about a time you communicated an ambitious vision to get others on board.']),
  LP('bias-action', 'Bias for Action', 'high',
    'Speed matters; many decisions are reversible and don\'t need extensive study.',
    ['Tell me about a time you took quick action on a problem — what was at stake?',
     'Tell me about a calculated risk you took where speed was critical.',
     'Tell me about a time you made a decision quickly with incomplete information.',
     'Tell me about a time you saw a problem and took the initiative instead of waiting.']),
  LP('frugality', 'Frugality', 'low',
    'Accomplish more with less; constraints breed resourcefulness.',
    ['Tell me about a time you delivered with limited budget, time, or resources.',
     'Tell me about a clever way you saved time, money, or effort.',
     'Tell me about a time constraints forced you to be creative.']),
  LP('earn-trust', 'Earn Trust', 'medium',
    'Listen attentively, speak candidly, treat others respectfully; be self-critical.',
    ['Tell me about a time you earned the trust of a skeptical colleague or group.',
     'Tell me about a time you had to give someone difficult feedback.',
     'Tell me about a time you had to admit you were wrong / were vocally self-critical.',
     'Tell me about a conflict with a teammate and how you rebuilt the relationship.']),
  LP('dive-deep', 'Dive Deep', 'high',
    'Operate at all levels, audit frequently, no task is beneath you; details matter.',
    ['Tell me about a time you did a deep-dive analysis to solve a problem or find a root cause.',
     'Tell me about a time your attention to detail led to a positive outcome.',
     'Tell me about a time the data contradicted what people assumed, and you dug in.',
     'Tell me about a time you had to debug or audit something end-to-end to understand it.']),
  LP('backbone', 'Have Backbone; Disagree and Commit', 'medium',
    'Respectfully challenge decisions you disagree with, then fully commit.',
    ['Tell me about a time you disagreed with a teammate or manager — how did you handle it?',
     'Tell me about a time you committed to a group decision you initially disagreed with.',
     'Tell me about a time your work or idea was criticized — how did you respond?',
     'Tell me about a time you stood firm on an unpopular position.']),
  LP('deliver-results', 'Deliver Results', 'high',
    'Focus on key inputs, deliver with quality and on time; rise to setbacks.',
    ['Tell me about a time you delivered results under a tight deadline.',
     'Tell me about a time you hit a major obstacle mid-project and still delivered.',
     'Tell me about a time you had to juggle multiple priorities at once.',
     'Tell me about your most challenging project and its outcome.']),
  LP('earths-best-employer', "Strive to be Earth's Best Employer", 'low',
    'Create a safe, productive, inclusive work environment; lead with empathy.',
    ['Tell me about a time you went out of your way to make your team better.',
     'Tell me about a time you empowered a person or group to accomplish something.',
     'Tell me about a time you removed a roadblock holding your team back.']),
  LP('broad-responsibility', 'Success and Scale Bring Broad Responsibility', 'low',
    'Consider the broader, second-order impact of your work on the community and world.',
    ['Tell me about a time you considered the broader/long-term impact of a decision.',
     'Tell me about a decision about your work that you regret — what would you change?',
     'Tell me about a time you balanced speed against doing the responsible thing.']),
]

// The ~15 behavioral prompts most reported for new-grad SDE I — prepare first.
export const mostAskedBehavioral = [
  'Tell me about a time you failed / made a mistake, and what you learned.',
  'Tell me about a time you disagreed with a teammate or manager.',
  'Tell me about a time you delivered under a tight deadline.',
  'Tell me about a time you took ownership of something outside your responsibilities.',
  'Tell me about your most challenging project.',
  'Tell me about a time you received critical feedback and how you responded.',
  'Tell me about a time you went above and beyond for a customer or user.',
  'Tell me about a time you had to learn something new quickly.',
  'Tell me about a time you solved a complex problem with a simple solution.',
  'Tell me about a time you made a decision with incomplete data.',
  'Tell me about a time you took a risk or acted fast.',
  'Tell me about a time you had to juggle competing priorities.',
  'Tell me about a time you dug deep to find a root cause.',
  'Tell me about your most significant accomplishment.',
  'Why Amazon?',
]

// ---------------------------------------------------------------------------
export const seedResources = [
  { id: 'r-topics', category: 'Official', title: 'Amazon Software Development Topics', url: 'https://www.amazon.jobs/en/landing_pages/software-development-topics', note: 'The technical areas listed in your invite.' },
  { id: 'r-lp', category: 'Official', title: 'Amazon Leadership Principles', url: 'https://www.amazon.jobs/content/en/our-workplace/leadership-principles', note: 'The 16 LPs — memorize the themes, not the words.' },
  { id: 'r-prep', category: 'Official', title: 'Interviewing at Amazon', url: 'https://www.amazon.jobs/content/en/how-we-hire/interviewing-at-amazon', note: 'Official prep guide.' },
  { id: 'r-star', category: 'Official', title: 'STAR Method (Amazon)', url: 'https://www.amazon.jobs/content/en/how-we-hire/interview-loop', note: 'Situation, Task, Action, Result.' },
  { id: 'r-neetcode', category: 'Coding', title: 'NeetCode 150', url: 'https://neetcode.io/practice', note: 'The pattern-based set that backs your Coding tab.' },
  { id: 'r-blind75', category: 'Coding', title: 'Blind 75', url: 'https://www.teamblind.com/post/New-Year-Gift---Curated-List-of-Top-75-LeetCode-Questions-to-Save-Your-Time-OaM1orEU', note: 'Classic 75-problem list.' },
  { id: 'r-lc-amazon', category: 'Coding', title: 'LeetCode — Amazon tagged', url: 'https://leetcode.com/company/amazon/', note: 'Recently reported Amazon questions (Premium).' },
]

export const seedTodos = [
  { id: 't-confirm', text: 'Reply to Erika confirming receipt + availability', due: '2026-07-18', done: true, priority: 'high' },
  { id: 't-livecode', text: 'Save the LiveCode link once it arrives', due: '', done: false, priority: 'high' },
  // Phase 1 — the 7 dedicated DSA days
  { id: 't-dsa', text: 'DSA sprint: 7 focused days, trees & graphs first, high-frequency problems prioritized', due: '', done: false, priority: 'high' },
  // Phase 2 — the final ~4 days (everything else)
  { id: 't-stories', text: 'Build a bank of 8–10 STAR stories, each mapped to 2–3 Leadership Principles', due: '', done: false, priority: 'high' },
  { id: 't-resume', text: 'Prep dive-deep answers for every résumé project (metrics, tradeoffs, “why X not Y”)', due: '', done: false, priority: 'high' },
  { id: 't-lld', text: 'Practice core LLD/OOD: parking lot, vending machine, ATM, LRU/LFU', due: '', done: false, priority: 'medium' },
  { id: 't-mock', text: 'Do 1–2 full timed mock loops (coding + behavioral)', due: '', done: false, priority: 'medium' },
  { id: 't-questions', text: 'Prepare 3–4 thoughtful questions to ask interviewers', due: '', done: false, priority: 'medium' },
  { id: 't-logistics', text: 'Confirm travel/hotel after Save-the-Date email', due: '', done: false, priority: 'medium' },
]
