// Pattern-first explanations. The goal is to teach the PATTERN behind a
// problem — how to recognize it and the reusable template — not just how one
// specific problem works. Each coding problem shows the guide(s) for its topic.

export const patterns = {
  hashing: {
    name: 'Hashing / frequency maps',
    recognize: 'You need O(1) lookups, to count occurrences, to find pairs/complements, or to dedupe. Signals: “has it been seen?”, “how many of each?”, “find two things that add up to X”.',
    idea: 'Trade space for time: store what you’ve seen (or its count/index) in a hash map/set so the next lookup is O(1) instead of a rescan. Often one pass: for each element, check what you need against the map, then add yourself.',
    template: [
      'Create a map/set.',
      'Single pass: for each item, compute the thing you’re looking for (e.g., target − x) and check the map.',
      'If found → answer; else record the current item (value → index/count) and continue.',
    ],
    complexity: 'Usually O(n) time, O(n) space.',
    pitfalls: ['Adding yourself to the map before checking (double-counts).', 'Forgetting hash collisions on custom keys — sort or tuple the key (e.g., sorted string for anagrams).'],
    examples: ['Two Sum', 'Group Anagrams', 'Longest Consecutive Sequence'],
  },
  'two-pointers': {
    name: 'Two pointers',
    recognize: 'A sorted array (or one you can sort), or you’re comparing/moving from both ends. Signals: pairs/triplets that meet a condition, palindromes, in-place partitioning, “without extra space”.',
    idea: 'Two indices move toward each other (or one chases the other). At each step a comparison lets you discard a whole side of the search space, turning O(n²) brute force into O(n).',
    template: [
      'Sort if order doesn’t matter and it helps.',
      'left = 0, right = n−1 (or slow/fast from the start).',
      'Loop while left < right: check the condition; move the pointer that can improve it (sum too small → left++, too big → right−−).',
    ],
    complexity: 'O(n) after an optional O(n log n) sort; O(1) extra space.',
    pitfalls: ['Skipping duplicates in 3Sum-style problems.', 'Off-by-one when both pointers can meet.'],
    examples: ['3Sum', 'Container With Most Water', 'Valid Palindrome', 'Trapping Rain Water'],
  },
  'sliding-window': {
    name: 'Sliding window',
    recognize: 'A contiguous subarray/substring that’s “longest/shortest/at most K/exactly K”. Signals: window of characters, running sum/count over a range.',
    idea: 'Maintain a window [l, r]. Expand r to include new elements; when the window breaks a constraint, shrink from l. Each element enters and leaves at most once → O(n).',
    template: [
      'l = 0; keep window state (counts, sum, distinct).',
      'For r in range: add nums[r] to the window state.',
      'While the window is invalid: remove nums[l], l++.',
      'Record the answer (window size / count) when valid.',
    ],
    complexity: 'O(n) time; O(k) space for the window state.',
    pitfalls: ['Shrinking with “if” instead of “while”.', 'Updating the answer at the wrong time (before vs after shrinking).'],
    examples: ['Longest Substring Without Repeating Characters', 'Minimum Window Substring', 'Longest Repeating Character Replacement'],
  },
  stack: {
    name: 'Stack / monotonic stack',
    recognize: 'Matching pairs (parentheses), “most recent unmatched”, or “next greater/smaller element”. Signals: nesting, undo, spans, temperatures.',
    idea: 'A stack remembers things in LIFO order until you can resolve them. A monotonic stack keeps elements in increasing/decreasing order so the moment order breaks, you’ve found the next greater/smaller for the popped items.',
    template: [
      'For each element: while the stack top violates the order you want, pop and resolve it (that element is the answer for the popped index).',
      'Push the current element (or its index).',
    ],
    complexity: 'O(n) — each element is pushed and popped once.',
    pitfalls: ['Storing values when you need indices (for distances).', 'Forgetting to drain the stack at the end.'],
    examples: ['Valid Parentheses', 'Daily Temperatures', 'Largest Rectangle in Histogram'],
  },
  'binary-search': {
    name: 'Binary search (incl. on the answer)',
    recognize: 'A sorted array, OR a monotonic “feasibility” function: if X works, everything bigger (or smaller) works too. Signals: “minimum/maximum value such that…”, “smallest capacity/speed that fits”.',
    idea: 'Halve the search space each step by asking a yes/no question at the midpoint. The key skill is “binary search on the answer”: define feasible(x), then binary-search the smallest/largest x where feasible flips.',
    template: [
      'lo, hi = bounds of the answer space.',
      'while lo < hi: mid = (lo+hi)/2; if feasible(mid): hi = mid; else lo = mid+1.',
      'Return lo.',
    ],
    complexity: 'O(log n) × cost of feasible(); often O(n log n) overall.',
    pitfalls: ['Infinite loops from wrong mid rounding.', 'Wrong boundary update (mid vs mid±1).', 'Not proving monotonicity before using it.'],
    examples: ['Koko Eating Bananas', 'Search in Rotated Sorted Array', 'Find Minimum in Rotated Sorted Array'],
  },
  'linked-list': {
    name: 'Linked list (dummy node, fast/slow, reversal)',
    recognize: 'Anything with next pointers: reverse, merge, detect cycle, find middle, remove Nth. Signals: “in-place”, “one pass”, “O(1) space”.',
    idea: 'Three reusable moves: (1) a dummy head to simplify edge cases at the front; (2) fast/slow pointers to find the middle or a cycle; (3) iterative reversal with prev/curr/next.',
    template: [
      'dummy = Node(0, head); use a tail pointer to build results.',
      'Fast/slow: fast moves 2×, slow 1× → slow lands at middle / they meet in a cycle.',
      'Reverse: while curr: nxt = curr.next; curr.next = prev; prev = curr; curr = nxt.',
    ],
    complexity: 'O(n) time, O(1) space for most.',
    pitfalls: ['Losing the rest of the list — save next before rewiring.', 'Not handling empty/single-node lists.'],
    examples: ['Reverse Linked List', 'Merge Two Sorted Lists', 'Linked List Cycle', 'Reorder List'],
  },
  'tree-dfs': {
    name: 'Tree DFS (recursion)',
    recognize: 'Anything about paths, depth, subtree properties, or comparing a node to its children. Signals: “maximum depth”, “is it balanced”, “path sum”, “validate BST”.',
    idea: 'Recurse on children, then combine their answers at the current node. Decide what each call RETURNS (info flowing up) vs what it PASSES DOWN (constraints/parent state). Most tree problems are “post-order: solve children, then me”.',
    template: [
      'def dfs(node): if not node: return base case.',
      'left = dfs(node.left); right = dfs(node.right).',
      'Combine left/right with node to produce this node’s return value (and update a global answer if needed).',
    ],
    complexity: 'O(n) time; O(h) space for the recursion stack (h = height).',
    pitfalls: ['Confusing “return value up” with “global answer” (e.g., diameter/max-path-sum need both).', 'Wrong base case for null.', 'For BST, pass down valid (min,max) bounds rather than only checking direct children.'],
    examples: ['Maximum Depth of Binary Tree', 'Diameter of Binary Tree', 'Validate Binary Search Tree', 'Binary Tree Maximum Path Sum'],
  },
  'tree-bfs': {
    name: 'Tree BFS (level order)',
    recognize: 'You need to process the tree level by level, or “right side view”, “zigzag”, “min depth”. Signals: anything “per level”.',
    idea: 'Use a queue. Pop the whole current level (size = queue length) before adding the next, so you always know level boundaries.',
    template: [
      'queue = [root]; while queue: size = len(queue).',
      'for _ in range(size): pop node, use it, push its children.',
      'After the inner loop, one level is done (record per-level result).',
    ],
    complexity: 'O(n) time; O(n) space for the queue.',
    pitfalls: ['Not snapshotting the level size before the inner loop.', 'Pushing null children.'],
    examples: ['Binary Tree Level Order Traversal', 'Binary Tree Right Side View', 'Binary Tree Zigzag Level Order Traversal'],
  },
  trie: {
    name: 'Trie (prefix tree)',
    recognize: 'Many strings sharing prefixes; “startsWith”, autocomplete, word dictionaries, or a grid word search over many words. Signals: prefix, dictionary of words.',
    idea: 'A tree where each edge is a character; each node has children[26] and an isWord flag. Prefix operations become O(word length) instead of scanning every word.',
    template: [
      'TrieNode { children: map, isWord: bool }.',
      'insert: walk/create nodes per char, mark isWord at the end.',
      'search/startsWith: walk nodes per char; fail if a child is missing.',
    ],
    complexity: 'insert/search O(L); space O(total chars).',
    pitfalls: ['Forgetting isWord (prefix vs full word).', 'For Word Search II, build the trie from the word list and DFS the grid against it — not one search per word.'],
    examples: ['Implement Trie (Prefix Tree)', 'Search Suggestions System', 'Word Search II'],
  },
  backtracking: {
    name: 'Backtracking',
    recognize: 'Generate all subsets/permutations/combinations, or explore choices with constraints (N-Queens, word search). Signals: “all possible”, “combinations that sum to”, exponential output.',
    idea: 'Build a partial solution one choice at a time (choose → recurse → un-choose). The un-choose (backtrack) restores state so the next branch starts clean. Prune branches that can’t lead to a valid answer.',
    template: [
      'def bt(start, path): if path is a complete answer → record it.',
      'for choice in options(start): make the choice (add to path);',
      'bt(next, path); undo the choice (pop from path).',
    ],
    complexity: 'Exponential by nature (that’s the output size); prune to cut constants.',
    pitfalls: ['Not un-doing the choice.', 'Duplicates — sort and skip equal siblings.', 'Copying the path when recording (not the live reference).'],
    examples: ['Subsets', 'Combination Sum', 'Permutations', 'Word Search'],
  },
  heap: {
    name: 'Heap / top-K',
    recognize: '“K largest/smallest/closest/most frequent”, a running median, or repeatedly grabbing the min/max. Signals: K, streaming, “merge k …”.',
    idea: 'A heap gives O(log n) push/pop of the min or max. For top-K, keep a heap of size K (a MIN-heap for the K largest) so you never sort the whole input. For medians, balance two heaps.',
    template: [
      'Top-K largest: min-heap of size K; push each item, pop when size > K; heap holds the answer.',
      'Median: max-heap (lower half) + min-heap (upper half), kept balanced.',
    ],
    complexity: 'O(n log k) for top-K; O(log n) per median insert.',
    pitfalls: ['Using a max-heap when a size-K min-heap is what keeps it O(n log k).', 'Custom comparators/tuples for “by frequency then lexicographic”.'],
    examples: ['K Closest Points to Origin', 'Top K Frequent Elements', 'Find Median from Data Stream', 'Merge k Sorted Lists'],
  },
  'graph-traversal': {
    name: 'Graph BFS / DFS',
    recognize: 'Grids of cells, connected regions, shortest path in an unweighted graph, reachability. Signals: “islands”, “regions”, “nearest”, “can you get from A to B”.',
    idea: 'Visit nodes, marking visited to avoid cycles. BFS (queue) explores level by level → shortest path in unweighted graphs. DFS (recursion/stack) is great for “flood fill” a whole region.',
    template: [
      'Mark start visited; for each neighbor not visited, recurse (DFS) or enqueue (BFS).',
      'Grids: neighbors are up/down/left/right within bounds.',
      'Multi-source BFS: seed the queue with ALL sources at once (e.g., all rotten oranges).',
    ],
    complexity: 'O(V + E) — for a grid, O(rows × cols).',
    pitfalls: ['Not marking visited (infinite loops / recount).', 'Using DFS for shortest path (use BFS).', 'Revisiting on grids — mark when you enqueue, not when you dequeue.'],
    examples: ['Number of Islands', 'Rotting Oranges', 'Clone Graph', 'Pacific Atlantic Water Flow'],
  },
  'topological-sort': {
    name: 'Topological sort',
    recognize: 'Ordering with prerequisites/dependencies, or detecting a cycle in a directed graph. Signals: “course schedule”, “build order”, “can you finish”.',
    idea: 'Order a DAG so every edge points forward. Kahn’s algorithm: repeatedly take nodes with in-degree 0. If you can’t place all nodes, there’s a cycle.',
    template: [
      'Build adjacency + in-degree counts.',
      'Queue all in-degree-0 nodes; pop one, append to order, decrement neighbors’ in-degree, enqueue new zeros.',
      'If order has all nodes → valid; else there’s a cycle.',
    ],
    complexity: 'O(V + E).',
    pitfalls: ['Confusing edge direction (prereq → course).', 'Forgetting the cycle check (result length < V).'],
    examples: ['Course Schedule', 'Course Schedule II', 'Alien Dictionary'],
  },
  'union-find': {
    name: 'Union-Find (DSU)',
    recognize: 'Grouping/connectivity queries, “number of connected components”, detect a cycle in an undirected graph, “redundant connection”. Signals: merging sets, “are these connected?”.',
    idea: 'Each element points to a parent; find() returns the set’s root (with path compression), union() links two roots (by rank/size). Near-O(1) per operation.',
    template: [
      'parent[i] = i. find(x): follow parents to root, compress path.',
      'union(a,b): ra=find(a), rb=find(b); if ra==rb → already connected (a cycle); else link.',
    ],
    complexity: 'Almost O(1) amortized per op (inverse-Ackermann).',
    pitfalls: ['Skipping path compression / union by rank → slow.', 'Off-by-one when nodes are 1-indexed.'],
    examples: ['Number of Connected Components in an Undirected Graph', 'Graph Valid Tree', 'Redundant Connection'],
  },
  dp: {
    name: 'Dynamic programming',
    recognize: 'Overlapping subproblems + optimal substructure: “count the ways”, “min/max cost”, “can it be done”, choices at each step where future depends only on state. Signals: exponential brute force that recomputes the same things.',
    idea: 'Define a state that captures “where am I”, write the recurrence (answer for a state from smaller states), then either memoize (top-down) or fill a table (bottom-up). 1-D state for sequences; 2-D for two sequences/grids.',
    template: [
      'Define dp[state] = the answer for that subproblem; state = index (1-D) or (i, j) (2-D).',
      'Recurrence: relate dp[state] to smaller states (take/skip, match/mismatch).',
      'Base cases; iterate so dependencies are computed first; return the target state.',
    ],
    complexity: 'O(number of states × work per state).',
    pitfalls: ['Wrong/ambiguous state definition (the #1 mistake).', 'Missing base cases.', 'Iterating in an order where a dependency isn’t ready yet.'],
    examples: ['Coin Change', 'Word Break', 'Longest Common Subsequence', 'House Robber'],
  },
  greedy: {
    name: 'Greedy',
    recognize: 'A locally-optimal choice provably leads to the global optimum: intervals, scheduling, “minimum number of …”, jump reachability. Signals: sort then sweep.',
    idea: 'Make the best immediate choice (often after sorting by a key) and never reconsider. The hard part is arguing the greedy choice is safe — if it isn’t, it’s a DP.',
    template: [
      'Sort by the right key (end time, ratio, value…).',
      'Sweep once, greedily taking/merging/extending, tracking the running best (e.g., farthest reach).',
    ],
    complexity: 'Usually O(n log n) from the sort.',
    pitfalls: ['Assuming greedy works without justification (many need DP).', 'Sorting by the wrong key.'],
    examples: ['Jump Game', 'Maximum Subarray', 'Partition Labels', 'Gas Station'],
  },
  intervals: {
    name: 'Intervals',
    recognize: 'A set of [start, end] ranges: merge overlaps, insert, count rooms/overlaps, remove fewest. Signals: “meeting rooms”, “merge”, “overlapping”.',
    idea: 'Sort by start (or process starts/ends as separate events). Overlap ⇔ current.start ≤ prev.end. For “how many at once” (meeting rooms), sweep starts and ends in time order with a running counter (or a min-heap of end times).',
    template: [
      'Sort intervals by start.',
      'Walk through: if current overlaps the last kept → merge (max end); else start a new one.',
      'Max concurrency: min-heap of end times; pop when a new start ≥ smallest end.',
    ],
    complexity: 'O(n log n) from the sort.',
    pitfalls: ['Forgetting to sort.', 'Boundary: does touching (end == start) count as overlap? Clarify.'],
    examples: ['Merge Intervals', 'Insert Interval', 'Meeting Rooms II'],
  },
  math: {
    name: 'Math & geometry',
    recognize: 'Matrix rotations/traversal in place, number theory (digits, gcd, primes), fast exponentiation, coordinate counting. Signals: “rotate in place”, “spiral”, “pow”.',
    idea: 'Usually a clean invariant or formula: rotate = transpose then reverse rows; spiral = shrink four boundaries; fast power = square-and-halve the exponent. Look for the trick, not brute force.',
    template: [
      'Matrix in place: operate layer by layer / with boundary pointers.',
      'Fast pow: result = 1; while n: if n odd → result *= x; x *= x; n //= 2.',
    ],
    complexity: 'Varies — often O(n) or O(log n) for exponent tricks.',
    pitfalls: ['Aliasing when rotating in place.', 'Integer overflow / negative exponents.'],
    examples: ['Rotate Image', 'Spiral Matrix', 'Pow(x, n)'],
  },
  bit: {
    name: 'Bit manipulation',
    recognize: 'Counting/among-duplicates tricks, sets encoded as ints, “without +/−”, powers of two. Signals: XOR, masks, “appears once”.',
    idea: 'Use bit ops as O(1) tools: XOR cancels pairs (a^a=0), x & (x−1) clears the lowest set bit, masks test/set bits. Great for space-free counting.',
    template: [
      'XOR all → the unique element (pairs cancel).',
      'Count set bits: n &= n−1 each step until 0.',
      'Test bit i: (n >> i) & 1.',
    ],
    complexity: 'O(1) per op; O(n) or O(32n) overall.',
    pitfalls: ['Signed shifts / overflow in some languages.', 'Forgetting masks for 32-bit wraparound.'],
    examples: ['Single Number', 'Number of 1 Bits', 'Counting Bits'],
  },
  design: {
    name: 'Data-structure design',
    recognize: 'Build a class with specific time guarantees: O(1) get/put, random O(1), a running feed. Signals: “design”, “O(1)”, “LRU/LFU”.',
    idea: 'Compose primitives to hit the required complexity. The classic: HashMap for O(1) lookup + a Doubly-Linked List for O(1) ordering/eviction (LRU). Array + HashMap of indices gives O(1) insert/delete/getRandom.',
    template: [
      'List the required ops and their target complexity first.',
      'Pick primitives whose combination meets all of them; keep them in sync on every op.',
    ],
    complexity: 'The point is to hit O(1)/O(log n) as specified.',
    pitfalls: ['Keeping the two structures in sync on every mutation.', 'Edge cases: capacity 0, updating an existing key.'],
    examples: ['LRU Cache', 'Insert Delete GetRandom O(1)', 'Design Twitter'],
  },
}

// Which pattern guide(s) to show for each topic.
export const topicPatterns = {
  'Arrays & Hashing': ['hashing'],
  Strings: ['hashing', 'two-pointers'],
  'Two Pointers': ['two-pointers'],
  'Sliding Window': ['sliding-window'],
  Stack: ['stack'],
  'Binary Search': ['binary-search'],
  'Linked List': ['linked-list'],
  Trees: ['tree-dfs', 'tree-bfs'],
  Tries: ['trie'],
  Backtracking: ['backtracking'],
  Heaps: ['heap'],
  Graphs: ['graph-traversal', 'topological-sort', 'union-find'],
  'Dynamic Programming': ['dp'],
  Greedy: ['greedy'],
  Intervals: ['intervals'],
  'Math & Geometry': ['math'],
  'Bit Manipulation': ['bit'],
  Design: ['design'],
}

// Per-problem overrides where the pattern differs from the topic default.
export const problemPatterns = {
  'find-the-duplicate-number': ['two-pointers'], // Floyd's cycle detection
  'linked-list-cycle': ['linked-list'],
  'time-based-key-value-store': ['binary-search'],
  'kth-largest-element-in-an-array': ['heap'],
}

export function patternsFor(problem) {
  const ids = problemPatterns[problem.id] || topicPatterns[problem.topic] || []
  return ids.map((id) => patterns[id]).filter(Boolean)
}
