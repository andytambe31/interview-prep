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
// Coding problems — high-frequency Amazon SDE-I / new-grad set, grouped by
// topic. difficulty: Easy | Medium | Hard. freq: high | medium | low.
// status is a user field (todo | attempted | solved).
// ---------------------------------------------------------------------------
const P = (id, title, topic, difficulty, freq, url) => ({
  id,
  title,
  topic,
  difficulty,
  freq,
  url,
  status: 'todo',
  confidence: 0,
  notes: '',
  lastPracticed: '',
})

export const seedProblems = [
  // Arrays & Hashing
  P('two-sum', 'Two Sum', 'Arrays & Hashing', 'Easy', 'high', 'https://leetcode.com/problems/two-sum/'),
  P('best-time-stock', 'Best Time to Buy and Sell Stock', 'Arrays & Hashing', 'Easy', 'high', 'https://leetcode.com/problems/best-time-to-buy-and-sell-stock/'),
  P('maximum-subarray', 'Maximum Subarray (Kadane)', 'Arrays & Hashing', 'Medium', 'high', 'https://leetcode.com/problems/maximum-subarray/'),
  P('product-except-self', 'Product of Array Except Self', 'Arrays & Hashing', 'Medium', 'high', 'https://leetcode.com/problems/product-of-array-except-self/'),
  P('contains-duplicate', 'Contains Duplicate', 'Arrays & Hashing', 'Easy', 'medium', 'https://leetcode.com/problems/contains-duplicate/'),
  P('group-anagrams', 'Group Anagrams', 'Arrays & Hashing', 'Medium', 'medium', 'https://leetcode.com/problems/group-anagrams/'),
  P('valid-anagram', 'Valid Anagram', 'Arrays & Hashing', 'Easy', 'medium', 'https://leetcode.com/problems/valid-anagram/'),
  P('longest-consecutive', 'Longest Consecutive Sequence', 'Arrays & Hashing', 'Medium', 'medium', 'https://leetcode.com/problems/longest-consecutive-sequence/'),
  P('subarray-sum-k', 'Subarray Sum Equals K', 'Arrays & Hashing', 'Medium', 'medium', 'https://leetcode.com/problems/subarray-sum-equals-k/'),
  P('spiral-matrix', 'Spiral Matrix', 'Arrays & Hashing', 'Medium', 'medium', 'https://leetcode.com/problems/spiral-matrix/'),
  P('rotate-image', 'Rotate Image', 'Arrays & Hashing', 'Medium', 'low', 'https://leetcode.com/problems/rotate-image/'),

  // Strings
  P('longest-palindromic', 'Longest Palindromic Substring', 'Strings', 'Medium', 'high', 'https://leetcode.com/problems/longest-palindromic-substring/'),
  P('valid-palindrome', 'Valid Palindrome', 'Strings', 'Easy', 'medium', 'https://leetcode.com/problems/valid-palindrome/'),
  P('atoi', 'String to Integer (atoi)', 'Strings', 'Medium', 'low', 'https://leetcode.com/problems/string-to-integer-atoi/'),

  // Two Pointers
  P('3sum', '3Sum', 'Two Pointers', 'Medium', 'high', 'https://leetcode.com/problems/3sum/'),
  P('container-water', 'Container With Most Water', 'Two Pointers', 'Medium', 'high', 'https://leetcode.com/problems/container-with-most-water/'),
  P('trapping-rain', 'Trapping Rain Water', 'Two Pointers', 'Hard', 'high', 'https://leetcode.com/problems/trapping-rain-water/'),
  P('sort-colors', 'Sort Colors', 'Two Pointers', 'Medium', 'medium', 'https://leetcode.com/problems/sort-colors/'),
  P('boats-save-people', 'Boats to Save People', 'Two Pointers', 'Medium', 'medium', 'https://leetcode.com/problems/boats-to-save-people/'),

  // Sliding Window
  P('longest-substring', 'Longest Substring Without Repeating Characters', 'Sliding Window', 'Medium', 'high', 'https://leetcode.com/problems/longest-substring-without-repeating-characters/'),
  P('min-window-substring', 'Minimum Window Substring', 'Sliding Window', 'Hard', 'high', 'https://leetcode.com/problems/minimum-window-substring/'),
  P('fruit-baskets', 'Fruit Into Baskets', 'Sliding Window', 'Medium', 'high', 'https://leetcode.com/problems/fruit-into-baskets/'),
  P('sliding-window-max', 'Sliding Window Maximum', 'Sliding Window', 'Hard', 'medium', 'https://leetcode.com/problems/sliding-window-maximum/'),

  // Stack
  P('valid-parentheses', 'Valid Parentheses', 'Stack', 'Easy', 'high', 'https://leetcode.com/problems/valid-parentheses/'),
  P('min-stack', 'Min Stack', 'Stack', 'Medium', 'medium', 'https://leetcode.com/problems/min-stack/'),
  P('daily-temperatures', 'Daily Temperatures', 'Stack', 'Medium', 'medium', 'https://leetcode.com/problems/daily-temperatures/'),
  P('decode-string', 'Decode String', 'Stack', 'Medium', 'medium', 'https://leetcode.com/problems/decode-string/'),
  P('asteroid-collision', 'Asteroid Collision', 'Stack', 'Medium', 'medium', 'https://leetcode.com/problems/asteroid-collision/'),
  P('largest-rectangle', 'Largest Rectangle in Histogram', 'Stack', 'Hard', 'low', 'https://leetcode.com/problems/largest-rectangle-in-histogram/'),

  // Binary Search
  P('koko-bananas', 'Koko Eating Bananas', 'Binary Search', 'Medium', 'high', 'https://leetcode.com/problems/koko-eating-bananas/'),
  P('search-rotated', 'Search in Rotated Sorted Array', 'Binary Search', 'Medium', 'high', 'https://leetcode.com/problems/search-in-rotated-sorted-array/'),
  P('ship-packages', 'Capacity To Ship Packages Within D Days', 'Binary Search', 'Medium', 'medium', 'https://leetcode.com/problems/capacity-to-ship-packages-within-d-days/'),
  P('find-min-rotated', 'Find Minimum in Rotated Sorted Array', 'Binary Search', 'Medium', 'medium', 'https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/'),
  P('median-two-sorted', 'Median of Two Sorted Arrays', 'Binary Search', 'Hard', 'medium', 'https://leetcode.com/problems/median-of-two-sorted-arrays/'),

  // Linked List
  P('reverse-linked-list', 'Reverse Linked List', 'Linked List', 'Easy', 'high', 'https://leetcode.com/problems/reverse-linked-list/'),
  P('merge-two-lists', 'Merge Two Sorted Lists', 'Linked List', 'Easy', 'high', 'https://leetcode.com/problems/merge-two-sorted-lists/'),
  P('add-two-numbers', 'Add Two Numbers', 'Linked List', 'Medium', 'high', 'https://leetcode.com/problems/add-two-numbers/'),
  P('copy-random-list', 'Copy List with Random Pointer', 'Linked List', 'Medium', 'medium', 'https://leetcode.com/problems/copy-list-with-random-pointer/'),
  P('remove-nth-node', 'Remove Nth Node From End of List', 'Linked List', 'Medium', 'medium', 'https://leetcode.com/problems/remove-nth-node-from-end-of-list/'),
  P('reverse-k-group', 'Reverse Nodes in k-Group', 'Linked List', 'Hard', 'low', 'https://leetcode.com/problems/reverse-nodes-in-k-group/'),

  // Trees
  P('level-order', 'Binary Tree Level Order Traversal', 'Trees', 'Medium', 'high', 'https://leetcode.com/problems/binary-tree-level-order-traversal/'),
  P('lca-binary-tree', 'Lowest Common Ancestor of a Binary Tree', 'Trees', 'Medium', 'high', 'https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/'),
  P('serialize-tree', 'Serialize and Deserialize Binary Tree', 'Trees', 'Hard', 'high', 'https://leetcode.com/problems/serialize-and-deserialize-binary-tree/'),
  P('zigzag-level', 'Binary Tree Zigzag Level Order Traversal', 'Trees', 'Medium', 'medium', 'https://leetcode.com/problems/binary-tree-zigzag-level-order-traversal/'),
  P('max-path-sum', 'Binary Tree Maximum Path Sum', 'Trees', 'Hard', 'medium', 'https://leetcode.com/problems/binary-tree-maximum-path-sum/'),
  P('validate-bst', 'Validate Binary Search Tree', 'Trees', 'Medium', 'medium', 'https://leetcode.com/problems/validate-binary-search-tree/'),
  P('max-depth', 'Maximum Depth of Binary Tree', 'Trees', 'Easy', 'low', 'https://leetcode.com/problems/maximum-depth-of-binary-tree/'),

  // Tries
  P('implement-trie', 'Implement Trie (Prefix Tree)', 'Tries', 'Medium', 'medium', 'https://leetcode.com/problems/implement-trie-prefix-tree/'),
  P('word-search-ii', 'Word Search II', 'Tries', 'Hard', 'medium', 'https://leetcode.com/problems/word-search-ii/'),
  P('autocomplete-system', 'Design Search Autocomplete System', 'Tries', 'Hard', 'low', 'https://leetcode.com/problems/design-search-autocomplete-system/'),

  // Graphs / BFS / DFS
  P('number-of-islands', 'Number of Islands', 'Graphs', 'Medium', 'high', 'https://leetcode.com/problems/number-of-islands/'),
  P('course-schedule', 'Course Schedule', 'Graphs', 'Medium', 'high', 'https://leetcode.com/problems/course-schedule/'),
  P('rotting-oranges', 'Rotting Oranges', 'Graphs', 'Medium', 'high', 'https://leetcode.com/problems/rotting-oranges/'),
  P('word-ladder', 'Word Ladder', 'Graphs', 'Hard', 'high', 'https://leetcode.com/problems/word-ladder/'),
  P('clone-graph', 'Clone Graph', 'Graphs', 'Medium', 'medium', 'https://leetcode.com/problems/clone-graph/'),
  P('word-search', 'Word Search', 'Graphs', 'Medium', 'medium', 'https://leetcode.com/problems/word-search/'),
  P('surrounded-regions', 'Surrounded Regions', 'Graphs', 'Medium', 'low', 'https://leetcode.com/problems/surrounded-regions/'),
  P('open-the-lock', 'Open the Lock', 'Graphs', 'Medium', 'low', 'https://leetcode.com/problems/open-the-lock/'),
  P('network-connected', 'Number of Operations to Make Network Connected', 'Graphs', 'Medium', 'low', 'https://leetcode.com/problems/number-of-operations-to-make-network-connected/'),

  // Heaps / Priority Queue
  P('k-closest-points', 'K Closest Points to Origin', 'Heaps', 'Medium', 'high', 'https://leetcode.com/problems/k-closest-points-to-origin/'),
  P('reorganize-string', 'Reorganize String', 'Heaps', 'Medium', 'high', 'https://leetcode.com/problems/reorganize-string/'),
  P('merge-k-lists', 'Merge k Sorted Lists', 'Heaps', 'Hard', 'high', 'https://leetcode.com/problems/merge-k-sorted-lists/'),
  P('kth-largest', 'Kth Largest Element in an Array', 'Heaps', 'Medium', 'medium', 'https://leetcode.com/problems/kth-largest-element-in-an-array/'),
  P('top-k-frequent', 'Top K Frequent Elements', 'Heaps', 'Medium', 'medium', 'https://leetcode.com/problems/top-k-frequent-elements/'),

  // Intervals
  P('merge-intervals', 'Merge Intervals', 'Intervals', 'Medium', 'high', 'https://leetcode.com/problems/merge-intervals/'),
  P('meeting-rooms-ii', 'Meeting Rooms II', 'Intervals', 'Medium', 'high', 'https://leetcode.com/problems/meeting-rooms-ii/'),
  P('insert-interval', 'Insert Interval', 'Intervals', 'Medium', 'medium', 'https://leetcode.com/problems/insert-interval/'),

  // Dynamic Programming
  P('coin-change', 'Coin Change', 'Dynamic Programming', 'Medium', 'medium', 'https://leetcode.com/problems/coin-change/'),
  P('word-break', 'Word Break', 'Dynamic Programming', 'Medium', 'medium', 'https://leetcode.com/problems/word-break/'),
  P('lis', 'Longest Increasing Subsequence', 'Dynamic Programming', 'Medium', 'medium', 'https://leetcode.com/problems/longest-increasing-subsequence/'),
  P('unique-paths', 'Unique Paths', 'Dynamic Programming', 'Medium', 'medium', 'https://leetcode.com/problems/unique-paths/'),
  P('max-product-subarray', 'Maximum Product Subarray', 'Dynamic Programming', 'Medium', 'medium', 'https://leetcode.com/problems/maximum-product-subarray/'),
  P('decode-ways', 'Decode Ways', 'Dynamic Programming', 'Medium', 'medium', 'https://leetcode.com/problems/decode-ways/'),
  P('edit-distance', 'Edit Distance', 'Dynamic Programming', 'Medium', 'low', 'https://leetcode.com/problems/edit-distance/'),
  P('climbing-stairs', 'Climbing Stairs', 'Dynamic Programming', 'Easy', 'low', 'https://leetcode.com/problems/climbing-stairs/'),

  // Design
  P('lru-cache', 'LRU Cache', 'Design', 'Medium', 'high', 'https://leetcode.com/problems/lru-cache/'),
  P('design-hashmap', 'Design HashMap', 'Design', 'Easy', 'medium', 'https://leetcode.com/problems/design-hashmap/'),

  // Amazon-signature / recently trending additions
  P('reorder-log-files', 'Reorder Data in Log Files', 'Strings', 'Easy', 'high', 'https://leetcode.com/problems/reorder-data-in-log-files/'),
  P('most-common-word', 'Most Common Word', 'Strings', 'Easy', 'high', 'https://leetcode.com/problems/most-common-word/'),
  P('partition-labels', 'Partition Labels', 'Strings', 'Medium', 'high', 'https://leetcode.com/problems/partition-labels/'),
  P('majority-element', 'Majority Element', 'Arrays & Hashing', 'Easy', 'medium', 'https://leetcode.com/problems/majority-element/'),
  P('analyze-website', 'Analyze User Website Visit Pattern', 'Arrays & Hashing', 'Medium', 'medium', 'https://leetcode.com/problems/analyze-user-website-visit-pattern/'),
  P('search-2d-ii', 'Search a 2D Matrix II', 'Binary Search', 'Medium', 'medium', 'https://leetcode.com/problems/search-a-2d-matrix-ii/'),
  P('subtree-another', 'Subtree of Another Tree', 'Trees', 'Easy', 'high', 'https://leetcode.com/problems/subtree-of-another-tree/'),
  P('right-side-view', 'Binary Tree Right Side View', 'Trees', 'Medium', 'medium', 'https://leetcode.com/problems/binary-tree-right-side-view/'),
  P('all-nodes-distance-k', 'All Nodes Distance K in Binary Tree', 'Trees', 'Medium', 'medium', 'https://leetcode.com/problems/all-nodes-distance-k-in-binary-tree/'),
  P('search-suggestions', 'Search Suggestions System', 'Tries', 'Medium', 'high', 'https://leetcode.com/problems/search-suggestions-system/'),
  P('concatenated-words', 'Concatenated Words', 'Tries', 'Hard', 'medium', 'https://leetcode.com/problems/concatenated-words/'),
  P('critical-connections', 'Critical Connections in a Network', 'Graphs', 'Hard', 'high', 'https://leetcode.com/problems/critical-connections-in-a-network/'),
  P('course-schedule-ii', 'Course Schedule II', 'Graphs', 'Medium', 'high', 'https://leetcode.com/problems/course-schedule-ii/'),
  P('alien-dictionary', 'Alien Dictionary', 'Graphs', 'Hard', 'medium', 'https://leetcode.com/problems/alien-dictionary/'),
  P('top-k-frequent-words', 'Top K Frequent Words', 'Heaps', 'Medium', 'high', 'https://leetcode.com/problems/top-k-frequent-words/'),
  P('find-median-stream', 'Find Median from Data Stream', 'Heaps', 'Hard', 'medium', 'https://leetcode.com/problems/find-median-from-data-stream/'),
  P('connect-sticks', 'Minimum Cost to Connect Sticks', 'Heaps', 'Medium', 'medium', 'https://leetcode.com/problems/minimum-cost-to-connect-sticks/'),
  P('max-ice-cream', 'Maximum Ice Cream Bars', 'Heaps', 'Medium', 'medium', 'https://leetcode.com/problems/maximum-ice-cream-bars/'),
  P('basic-calculator-ii', 'Basic Calculator II', 'Stack', 'Medium', 'medium', 'https://leetcode.com/problems/basic-calculator-ii/'),
  P('jump-game', 'Jump Game', 'Dynamic Programming', 'Medium', 'medium', 'https://leetcode.com/problems/jump-game/'),
  P('lfu-cache', 'LFU Cache', 'Design', 'Hard', 'medium', 'https://leetcode.com/problems/lfu-cache/'),
  P('insert-delete-getrandom', 'Insert Delete GetRandom O(1)', 'Design', 'Medium', 'medium', 'https://leetcode.com/problems/insert-delete-getrandom-o1/'),

  // Object-Oriented / Low-Level Design (talk through classes + APIs; no LeetCode link)
  P('ood-parking-lot', 'Design a Parking Lot', 'Object-Oriented Design', 'Medium', 'high', ''),
  P('ood-vending-machine', 'Design a Vending Machine (state machine)', 'Object-Oriented Design', 'Medium', 'high', ''),
  P('ood-elevator', 'Design an Elevator System', 'Object-Oriented Design', 'Medium', 'medium', ''),
  P('ood-atm', 'Design an ATM', 'Object-Oriented Design', 'Medium', 'medium', ''),
  P('ood-cache', 'Design an LRU / LFU Cache (implement)', 'Object-Oriented Design', 'Medium', 'medium', ''),
  P('ood-deck-cards', 'Design a Deck of Cards', 'Object-Oriented Design', 'Medium', 'medium', ''),
  P('ood-rate-limiter', 'Design a Rate Limiter (token bucket)', 'Object-Oriented Design', 'Medium', 'medium', ''),
  P('ood-amazon-locker', 'Design an Amazon Locker', 'Object-Oriented Design', 'Medium', 'medium', ''),
  P('ood-library', 'Design a Library System', 'Object-Oriented Design', 'Medium', 'low', ''),
  P('ood-tic-tac-toe', 'Design Tic-Tac-Toe (OOD)', 'Object-Oriented Design', 'Medium', 'low', ''),
]

// Official Amazon "Software Development Topics" study areas (from the invite).
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
  'Graphs',
  'Heaps',
  'Intervals',
  'Dynamic Programming',
  'Design',
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
  { id: 'r-neetcode', category: 'Coding', title: 'NeetCode 150', url: 'https://neetcode.io/practice', note: 'Curated pattern-based problem set.' },
  { id: 'r-blind75', category: 'Coding', title: 'Blind 75', url: 'https://www.teamblind.com/post/New-Year-Gift---Curated-List-of-Top-75-LeetCode-Questions-to-Save-Your-Time-OaM1orEU', note: 'Classic 75-problem list.' },
  { id: 'r-lc-amazon', category: 'Coding', title: 'LeetCode — Amazon tagged', url: 'https://leetcode.com/company/amazon/', note: 'Recently reported Amazon questions (Premium).' },
]

export const seedTodos = [
  { id: 't-confirm', text: 'Reply to Erika confirming receipt + availability', due: '2026-07-18', done: true, priority: 'high' },
  { id: 't-livecode', text: 'Save the LiveCode link once it arrives', due: '', done: false, priority: 'high' },
  { id: 't-stories', text: 'Draft 6–8 STAR stories covering all high-emphasis LPs', due: '2026-07-24', done: false, priority: 'high' },
  { id: 't-coding', text: 'Finish high-frequency coding set (arrays, graphs, trees, DP)', due: '2026-07-28', done: false, priority: 'high' },
  { id: 't-mock', text: 'Do at least 2 timed mock interviews (coding + behavioral)', due: '2026-07-27', done: false, priority: 'medium' },
  { id: 't-questions', text: 'Prepare 3–4 thoughtful questions to ask interviewers', due: '2026-07-26', done: false, priority: 'medium' },
  { id: 't-logistics', text: 'Confirm travel/hotel after Save-the-Date email', due: '', done: false, priority: 'medium' },
]
