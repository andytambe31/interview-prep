// Per-question "interview mindset" walk-throughs. Each one is a SIMULATED
// interview for a single problem: the interviewer's lines, the candidate's
// spoken replies, and — the point of the whole thing — the candidate's inner
// thoughts rendered as highlighted beats, in the order a strong candidate's
// brain actually produces them. Not a chat; a scripted transcript you read or
// step through beat by beat.
//
// Beat types:
//   stage       — a phase divider (Clarify, Brute force, Optimize, Code, Test…)
//   interviewer — the interviewer speaking
//   say         — the candidate speaking out loud
//   think       — the candidate's inner thought (highlighted, numbered)
//   code        — code the candidate is writing (Java)
//
// Keyed by the coding problem id (slugify(title)).

const S = (label) => ({ t: 'stage', label })
const I = (text) => ({ t: 'interviewer', text })
const SAY = (text) => ({ t: 'say', text })
const TH = (text) => ({ t: 'think', text })
const CODE = (text) => ({ t: 'code', text })

const MINDSETS = {
  // ---------------------------------------------------------------------
  'maximum-depth-of-binary-tree': {
    title: 'Maximum Depth of Binary Tree',
    difficulty: 'Easy',
    prompt: 'Given the root of a binary tree, return its maximum depth — the number of nodes along the longest path from the root down to the farthest leaf.',
    beats: [
      S('Understand & clarify'),
      I("Let's start simple. Given the root of a binary tree, return its maximum depth."),
      TH("“Longest path from root to a leaf.” Depth is a count of nodes on that path. First instinct: what happens on an empty tree?"),
      SAY("Quick check — can the root be null, and is depth counted in nodes or edges?"),
      I("Root can be null. Depth is in nodes — a single node has depth 1."),
      TH("So null → 0, single node → 1. That recursive shape is already screaming at me: the depth of a tree is 1 plus the depth of its deeper subtree."),
      S('Approach'),
      TH("Do I even need a brute force? The recursive definition IS the algorithm. Let me state it cleanly before I trust it: depth(node) = 0 if node is null, else 1 + max(depth(left), depth(right))."),
      SAY("I'll solve it with DFS. A null node contributes 0. For any other node, the answer is 1 plus the max depth of its two children. I recurse and combine."),
      I("Go ahead."),
      TH("This is a postorder shape — I need both children's answers before I can compute mine. Pure return-up, no global state needed."),
      S('Code'),
      SAY("Let me write it."),
      CODE(`public int maxDepth(TreeNode root) {
    if (root == null) return 0;              // base case
    int left  = maxDepth(root.left);
    int right = maxDepth(root.right);
    return 1 + Math.max(left, right);        // me + deeper child
}`),
      TH("Base case first so I never dereference null. Then both sides, take the max, add one for myself."),
      S('Test & complexity'),
      SAY("Let me trace [3,9,20,null,null,15,7]."),
      TH("depth(9)=1, depth(15)=1, depth(7)=1, depth(20)=1+max(1,1)=2, depth(3)=1+max(1,2)=3. Returns 3 — correct."),
      I("Complexity?"),
      SAY("O(n) time — every node visited once. Space O(h) for the call stack: O(log n) balanced, O(n) worst case for a skewed tree."),
      I("Good."),
    ],
    takeaway: 'The recursive definition of a tree problem is often the whole algorithm. Trust recursion: solve for a node assuming its children are already solved, then combine.',
  },

  // ---------------------------------------------------------------------
  'invert-binary-tree': {
    title: 'Invert Binary Tree',
    difficulty: 'Easy',
    prompt: 'Given the root of a binary tree, invert it (mirror it left-to-right) and return its root.',
    beats: [
      S('Understand & clarify'),
      I('Invert a binary tree — mirror it — and return the root.'),
      TH("“Mirror” means at every node the left and right children swap places, all the way down. It's not just the top level."),
      SAY("So I mirror it in place and return the same root, and null stays null?"),
      I('Correct.'),
      TH("Swap children at every node. Recursion again — invert the left subtree, invert the right, and swap. Order won't matter as long as I'm consistent."),
      S('Approach'),
      SAY("DFS: at each node I recurse into both children, then assign them crosswise. Base case null returns null."),
      I('Sounds good.'),
      TH("One trap I can already see: if I write root.left = invert(root.right) but I've already overwritten root.right, I lose the original. So I capture both results first, then assign."),
      S('Code'),
      CODE(`public TreeNode invertTree(TreeNode root) {
    if (root == null) return null;
    TreeNode left  = invertTree(root.left);   // capture BOTH first
    TreeNode right = invertTree(root.right);
    root.left  = right;                        // then assign crosswise
    root.right = left;
    return root;
}`),
      TH("Because I stored left and right before assigning, I don't even need a temp variable — the clobbering bug can't happen."),
      S('Test & complexity'),
      SAY("Trace [4,2,7,1,3,6,9]: after inverting I expect [4,7,2,9,6,3,1]."),
      TH("At the root, left-subtree(2,1,3) and right-subtree(7,6,9) swap, and each of those has already mirrored internally. Matches."),
      I('Complexity?'),
      SAY("O(n) time, O(h) space for the recursion stack."),
    ],
    takeaway: 'When you reassign pointers, capture everything you need before you overwrite anything. The classic bug here is clobbering one child before you use it.',
  },

  // ---------------------------------------------------------------------
  'diameter-of-binary-tree': {
    title: 'Diameter of Binary Tree',
    difficulty: 'Easy',
    prompt: 'Given the root of a binary tree, return the length of its diameter — the number of edges on the longest path between any two nodes. The path may or may not pass through the root.',
    beats: [
      S('Understand & clarify'),
      I('Return the diameter of the tree — the longest path between any two nodes.'),
      TH("“Any two nodes” — so the longest path does NOT have to pass through the root. That's the whole difficulty."),
      SAY("Is the diameter counted in edges or in nodes?"),
      I('Edges.'),
      TH("Here's the key realization: for any single node, the longest path that BENDS at that node is height(left) + height(right), in edges. The diameter is just the maximum of that quantity over every node."),
      S('Approach'),
      SAY("So I'll compute height with DFS, and at each node update a running best = leftHeight + rightHeight. I return the height upward, but track the diameter on the side."),
      I('Why keep it on the side — why not just return it?'),
      SAY("Because each recursive call can only return one value — the height — but the node that maximizes the diameter might be anywhere, not the root. So I need to check every node, and I carry the best-so-far in a field."),
      TH("This is THE core tree pattern: return one thing (height), update another thing (the answer) as a side effect. Return-up plus update-a-global."),
      S('Code'),
      CODE(`int best = 0;

public int diameterOfBinaryTree(TreeNode root) {
    height(root);
    return best;
}

private int height(TreeNode node) {
    if (node == null) return 0;                 // null = 0 edges
    int l = height(node.left);
    int r = height(node.right);
    best = Math.max(best, l + r);               // path bending here, in edges
    return 1 + Math.max(l, r);                  // my height, one edge up
}`),
      TH("Height of null is 0. l + r is exactly the edge count of the path that bends at this node. I return 1 + max(l, r) because stepping up to my parent adds one edge."),
      S('Test & complexity'),
      SAY("Trace [1,2,3,4,5]. Node 2 has left height 1 (node 4) and right height 1 (node 5), so best becomes 2 there; up at the root the longest bend is 3."),
      I('Complexity?'),
      SAY("O(n) time — one height computation per node — and O(h) space."),
    ],
    takeaway: 'When the answer can peak at ANY node but each recursive call can only return one value, compute that value (height) and update the real answer in a field on the side. Return-up + update-a-global is the tree pattern you reuse constantly.',
  },

  // ---------------------------------------------------------------------
  'validate-binary-search-tree': {
    title: 'Validate Binary Search Tree',
    difficulty: 'Medium',
    prompt: 'Given the root of a binary tree, determine whether it is a valid binary search tree (BST): for every node, all values in its left subtree are strictly less and all in its right subtree are strictly greater.',
    beats: [
      S('Understand & clarify'),
      I('Determine whether a binary tree is a valid BST.'),
      TH("The definition is the whole trap: every node must be greater than EVERYTHING in its left subtree and less than everything in its right — not just its immediate children."),
      SAY("Are duplicates allowed, or is it strictly less / strictly greater?"),
      I('Strictly. No duplicates.'),
      TH("So the tempting check — node.left.val < node.val < node.right.val — is wrong. A value buried deep in the left subtree could be larger than an ancestor and still pass a local check. I need to carry the allowed range down from the ancestors."),
      S('Approach'),
      SAY("I'll DFS carrying an open interval (low, high). Each node must satisfy low < val < high. Going left, the high tightens to the node's value; going right, the low tightens to it. The root starts with (-∞, +∞)."),
      I('Makes sense.'),
      TH("Edge case to respect: node values can be Integer.MIN_VALUE or MAX_VALUE, so if I start bounds at int limits the comparison can't tighten correctly. I'll use long bounds — Long.MIN / Long.MAX — so it never overflows."),
      S('Code'),
      CODE(`public boolean isValidBST(TreeNode root) {
    return valid(root, Long.MIN_VALUE, Long.MAX_VALUE);
}

private boolean valid(TreeNode n, long low, long high) {
    if (n == null) return true;                        // empty is valid
    if (!(low < n.val && n.val < high)) return false;  // must fit the range
    return valid(n.left,  low, n.val)                  // left: high := n.val
        && valid(n.right, n.val, high);                // right: low := n.val
}`),
      TH("Left child inherits my value as its new upper bound; right child inherits it as its new lower bound. Both subtrees must pass — that's the &&."),
      S('Test & complexity'),
      SAY("Trace [5,1,4,null,null,3,6] — that 4 is in 5's right subtree, but 4 < 5, so it should fail."),
      TH("valid(4, low=5, high=+∞): is 5 < 4? No — the lower bound rejects it immediately. Returns false. The bounds caught what a parent-only check would have missed."),
      I('Complexity?'),
      SAY("O(n) time, O(h) space."),
    ],
    takeaway: 'The BST property is about ALL ancestors, not just the parent. Carry a (low, high) range down the tree; never validate a node only against its direct children. Use long bounds to dodge Integer.MIN/MAX overflow.',
  },

  // ---------------------------------------------------------------------
  'binary-tree-right-side-view': {
    title: 'Binary Tree Right Side View',
    difficulty: 'Medium',
    prompt: 'Given the root of a binary tree, imagine standing on its right side. Return the values of the nodes you can see, ordered top to bottom.',
    beats: [
      S('Understand & clarify'),
      I("Standing on the right side of the tree, return the nodes you can see, top to bottom."),
      TH("What can I see from the right? The rightmost node on each level. Everything behind it is hidden. So the answer is: the last node of every level."),
      SAY("So I want exactly one value per level — the rightmost — from the top down?"),
      I('Exactly.'),
      TH("Level-by-level processing is the natural fit. That's BFS with a queue: process one full level, and grab the last node I see on it."),
      S('Approach'),
      SAY("I'll BFS. For each level I snapshot the number of nodes currently in the queue, then pop exactly that many; the last one I pop on the level is the rightmost, so I record it."),
      I('Go for it.'),
      TH("Two bugs I know live here — I hit them before. One: I must read size = queue.size() BEFORE the inner loop, because I'm enqueueing children into the same queue as I go. Two: the loop has to cover the whole level — i from 0 while i < size — or I skip a node, the queue never drains, and it loops forever / TLEs."),
      S('Code'),
      CODE(`public List<Integer> rightSideView(TreeNode root) {
    List<Integer> res = new ArrayList<>();
    if (root == null) return res;                 // guard the empty tree
    Queue<TreeNode> q = new LinkedList<>();
    q.offer(root);
    while (!q.isEmpty()) {
        int size = q.size();                      // snapshot the level FIRST
        for (int i = 0; i < size; i++) {          // i from 0 → whole level
            TreeNode node = q.poll();
            if (i == size - 1) res.add(node.val); // last of the level = rightmost
            if (node.left  != null) q.offer(node.left);
            if (node.right != null) q.offer(node.right);   // enqueue BOTH
        }
    }
    return res;
}`),
      TH("Enqueue left THEN right, so within a level the queue stays in left-to-right order and the last poll really is the rightmost. Record only when i == size - 1."),
      S('Test & complexity'),
      SAY("Trace [1,2,3,null,5,null,4]. Levels are [1], [2,3], [5,4]. Rightmost of each: 1, 3, 4."),
      TH("Level [2,3]: I poll 2 (i=0, enqueue its child 5), poll 3 (i=1=size-1, record 3, enqueue its child 4). Answer builds [1,3,4]. Correct."),
      I('Complexity?'),
      SAY("O(n) time — each node enqueued and polled once. O(n) space for the queue, which can hold up to a full level."),
    ],
    takeaway: 'Level-order BFS = snapshot the level size before the loop, poll exactly that many, enqueue both children. The rightmost node is the last poll of the level. An off-by-one on the loop bound is exactly what makes this TLE.',
  },
}

export function mindsetFor(id) {
  return MINDSETS[id] || null
}

export function hasMindset(id) {
  return Boolean(MINDSETS[id])
}

export default MINDSETS
