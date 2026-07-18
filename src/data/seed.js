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

  // Object-Oriented Design (whiteboard-style, no LeetCode link)
  P('ood-parking-lot', 'Design a Parking Lot (OOD)', 'Object-Oriented Design', 'Medium', 'medium', ''),
  P('ood-deck-cards', 'Design a Deck of Cards (OOD)', 'Object-Oriented Design', 'Medium', 'medium', ''),
  P('ood-library', 'Design a Library System (OOD)', 'Object-Oriented Design', 'Medium', 'low', ''),
  P('ood-elevator', 'Design an Elevator System (OOD)', 'Object-Oriented Design', 'Medium', 'low', ''),
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
    ['Tell me about a time you went above and beyond for a customer/user.',
     'Describe a time you used customer feedback to drive a change.',
     'Tell me about a hard decision you made that prioritized the customer.']),
  LP('ownership', 'Ownership', 'high',
    'Act on behalf of the whole company, think long-term, never say "that\'s not my job".',
    ['Tell me about a time you took on something outside your responsibilities.',
     'Describe a time you had to make a decision without complete information / no manager around.',
     'Tell me about a time you sacrificed short-term gain for long-term value.']),
  LP('invent-simplify', 'Invent and Simplify', 'high',
    'Seek new ideas and simplify; not invented here is fine to borrow ideas.',
    ['Tell me about a time you invented something or found a simpler solution.',
     'Describe a process you improved or simplified.',
     'Tell me about a creative solution to a difficult problem.']),
  LP('right-a-lot', 'Are Right, A Lot', 'medium',
    'Strong judgment; seek diverse perspectives and disconfirm your own beliefs.',
    ['Tell me about a time you were wrong / made a bad judgment call.',
     'Describe a decision you made with incomplete data that turned out right.',
     'Tell me about a time you had to change your opinion based on new information.']),
  LP('learn-curious', 'Learn and Be Curious', 'high',
    'Always learning, curious about new possibilities and self-improvement.',
    ['Tell me about a time you taught yourself a new skill quickly.',
     'Describe something new you learned recently and how you applied it.',
     'Tell me about a time you stepped outside your comfort zone.']),
  LP('hire-develop', 'Hire and Develop the Best', 'low',
    'Raise the performance bar; coach and mentor others.',
    ['Tell me about a time you mentored or helped a teammate grow.',
     'Describe a time you gave difficult feedback.']),
  LP('highest-standards', 'Insist on the Highest Standards', 'medium',
    'Continually raise the bar; don\'t let defects travel downstream.',
    ['Tell me about a time you refused to compromise on quality.',
     'Describe a time you weren\'t satisfied with "good enough".',
     'Tell me about the highest standard you have set for yourself.']),
  LP('think-big', 'Think Big', 'medium',
    'Bold direction that inspires results; think differently and look around corners.',
    ['Tell me about a time you proposed an ambitious idea.',
     'Describe a time you thought beyond the immediate task.']),
  LP('bias-action', 'Bias for Action', 'high',
    'Speed matters; many decisions are reversible and don\'t need extensive study.',
    ['Tell me about a time you made a quick decision under pressure.',
     'Describe a time you took a calculated risk.',
     'Tell me about a time you acted without waiting for full approval/data.']),
  LP('frugality', 'Frugality', 'low',
    'Accomplish more with less; constraints breed resourcefulness.',
    ['Tell me about a time you completed something with limited resources.',
     'Describe a time you saved time, money, or effort with a clever approach.']),
  LP('earn-trust', 'Earn Trust', 'medium',
    'Listen attentively, speak candidly, treat others respectfully; self-critical.',
    ['Tell me about a time you had a conflict with a teammate and resolved it.',
     'Describe a time you had to earn the trust of a skeptical team.',
     'Tell me about a time you received tough feedback and how you responded.']),
  LP('dive-deep', 'Dive Deep', 'high',
    'Operate at all levels, audit frequently, no task is beneath you; details matter.',
    ['Tell me about a time you dug into data to solve a problem.',
     'Describe a time you found the root cause of a difficult bug/issue.',
     'Tell me about a time your deep analysis uncovered something others missed.']),
  LP('backbone', 'Have Backbone; Disagree and Commit', 'medium',
    'Respectfully challenge decisions you disagree with, then fully commit.',
    ['Tell me about a time you disagreed with your manager/team.',
     'Describe a time you committed to a decision you initially disagreed with.',
     'Tell me about a time you stood up for what you believed was right.']),
  LP('deliver-results', 'Deliver Results', 'high',
    'Focus on key inputs, deliver with quality and on time; rise to setbacks.',
    ['Tell me about a time you delivered under a tight deadline.',
     'Describe a time you overcame a major obstacle to finish something.',
     'Tell me about your most challenging project and its outcome.']),
  LP('earths-best-employer', "Strive to be Earth's Best Employer", 'low',
    'Create a safe, productive, inclusive work environment; lead with empathy.',
    ['Tell me about a time you helped make your team environment better.',
     'Describe a time you supported a struggling teammate.']),
  LP('broad-responsibility', 'Success and Scale Bring Broad Responsibility', 'low',
    'Consider the broader impact of your work on the community and world.',
    ['Tell me about a time you considered the wider impact of a decision.',
     'Describe a time you did the right thing even when it was harder.']),
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
