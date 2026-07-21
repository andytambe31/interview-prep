// Per-question INTERVIEW SIMULATIONS. Each one is a script: two fictional
// people — an interviewer (Priya, an Amazon SDE II) and a candidate (Alex, a
// new-grad) — actually talking through one problem, start to finish. The
// candidate's inner thoughts are woven in as highlighted "(thinking)" lines.
//
// Beats also carry METADATA rendered on the side (not spoken):
//   • a think beat can carry `concept` — the concept that thought draws on
//   • an interviewer beat can carry `probing` — what the interviewer is
//     actually testing with that line
//
// Beat types:
//   stage       — a scene divider (Clarify, Approach, Code, Test…)
//   interviewer — the interviewer's line        I(text, probing?)
//   say         — the candidate's spoken line    SAY(text)
//   think       — the candidate's inner thought  TH(text, concept?)
//   code        — code the candidate types       CODE(text)
//
// Keyed by the coding problem id (slugify(title)).

const CAST = { interviewer: 'Priya', candidate: 'Alex' }

const S = (label) => ({ t: 'stage', label })
const I = (text, probing) => ({ t: 'interviewer', text, ...(probing ? { probing } : {}) })
const SAY = (text) => ({ t: 'say', text })
const TH = (text, concept) => ({ t: 'think', text, ...(concept ? { concept } : {}) })
const CODE = (text) => ({ t: 'code', text })

const MINDSETS = {
  // ---------------------------------------------------------------------
  'maximum-depth-of-binary-tree': {
    title: 'Maximum Depth of Binary Tree',
    difficulty: 'Easy',
    cast: CAST,
    prompt: 'Given the root of a binary tree, return its maximum depth — the number of nodes along the longest path from the root down to the farthest leaf.',
    beats: [
      S('The prompt'),
      I("Hi Alex, let's warm up. I'll hand you the root of a binary tree, and I'd like you to return its maximum depth — the number of nodes on the longest path from the root down to a leaf."),
      TH("Okay, breathe. Max depth, longest root-to-leaf path, counted in nodes. Before I say anything clever, let me nail down the boundaries."),
      SAY("Sure. A couple of quick questions first — can the tree be empty, so root is null? And is a single node depth 1 or depth 0?"),
      I("Good — yes, root can be null, and a single node is depth 1. We're counting nodes, not edges."),
      SAY("Got it, so empty is 0 and one node is 1."),
      TH("That framing basically hands me the recursion: the depth of a tree is 1 plus the depth of its deeper subtree, and null is the floor at 0."),
      S('Approach'),
      SAY("I think this is a clean recursion. The depth at any node is 1 plus the max of its left and right subtree depths, and the empty tree gives 0 — that's my base case."),
      I("Makes sense. Recursive or iterative?"),
      TH("A level-order BFS would also work and dodges stack depth on a really skewed tree — worth naming — but recursion reads cleaner and she said warm-up."),
      SAY("I'll go recursive for readability. One caveat — on a very deep skewed tree recursion could hit the stack limit, and a BFS by levels would avoid that. But I'll write the recursive version."),
      I("Sounds good, go for it."),
      S('Code'),
      CODE(`public int maxDepth(TreeNode root) {
    if (root == null) return 0;              // base case: empty = 0
    int left  = maxDepth(root.left);
    int right = maxDepth(root.right);
    return 1 + Math.max(left, right);        // me + my deeper child
}`),
      TH("Base case first, so I never touch a null's fields. Then recurse both sides, take the larger, add one for myself."),
      S('Test'),
      SAY("Let me trace [3,9,20,null,null,15,7] just to be sure."),
      TH("Leaves 9, 15, 7 each return 1. Node 20 is 1 + max(1,1) = 2. Root 3 is 1 + max(1,2) = 3. Returns 3 — matches."),
      I("Great. Complexity?"),
      SAY("Time O(n) — every node once. Space O(h) for the call stack: O(log n) balanced, O(n) worst case for a skewed tree, which is the caveat I flagged earlier."),
      I("Exactly what I wanted to hear. Nice."),
    ],
    rubric: [
      'Clarified the boundaries: empty tree = 0, single node = 1 (counting nodes, not edges)',
      'Recognized the recursion: depth = 1 + max(left depth, right depth)',
      'Named the recursion-vs-BFS tradeoff (stack depth on a skewed tree)',
      'Correct base case: null returns 0',
      'Traced a concrete example to confirm',
      'Stated O(n) time and O(h) space',
    ],
    takeaway: 'The recursive definition of a tree problem is usually the whole algorithm. Trust it: solve for a node assuming its children are already solved, then combine.',
  },

  // ---------------------------------------------------------------------
  'invert-binary-tree': {
    title: 'Invert Binary Tree',
    difficulty: 'Easy',
    cast: CAST,
    prompt: 'Given the root of a binary tree, invert it (mirror it left-to-right) and return its root.',
    beats: [
      S('The prompt'),
      I("Next one, Alex. Invert a binary tree — mirror it left-to-right — and return the root."),
      TH("Mirror. So at every node, left and right children trade places, all the way down — not just at the top."),
      SAY("Just to confirm the shape of the answer: I mutate the tree in place and return the same root, and a null tree just returns null?"),
      I("Correct on both."),
      TH("This is recursion again. At each node: swap the two children. The only question is whether I swap first then recurse, or recurse first then swap — either works as long as I'm consistent."),
      S('Approach'),
      SAY("I'll DFS. At each node I recurse into both children, then assign them crosswise. Base case: null returns null."),
      I("Go ahead — anything you're watching out for?"),
      TH("Yes — the pointer trap. If I write root.left = invert(root.right) but I've already overwritten root.right, the original is gone. So I capture both results before I assign either."),
      SAY("One thing I want to be careful about is not clobbering a child before I've used it, so I'll capture both recursive results first, then assign."),
      I("Good instinct."),
      S('Code'),
      CODE(`public TreeNode invertTree(TreeNode root) {
    if (root == null) return null;
    TreeNode left  = invertTree(root.left);   // capture BOTH first…
    TreeNode right = invertTree(root.right);
    root.left  = right;                        // …then assign crosswise
    root.right = left;
    return root;
}`),
      TH("Because I stored left and right before assigning, I don't even need a temp variable. The clobber bug simply can't happen."),
      S('Test'),
      SAY("Trace [4,2,7,1,3,6,9]. I'd expect [4,7,2,9,6,3,1] back."),
      TH("At the root, the (2,1,3) subtree and the (7,6,9) subtree swap sides, and each has already mirrored internally. That matches the expected output."),
      I("Complexity?"),
      SAY("O(n) time, O(h) space for the recursion stack."),
      I("Clean. Let's move on."),
    ],
    rubric: [
      'Confirmed the contract: mutate in place, return same root, null returns null',
      'Recognized the swap-children recursion (mirror at every node)',
      'Flagged the clobber trap: capture both children before overwriting either',
      'Correct crosswise assignment of the recursed children',
      'Traced a concrete example to confirm',
      'Stated O(n) time and O(h) space',
    ],
    takeaway: 'When you reassign pointers, capture everything you need before you overwrite anything. The classic bug here is clobbering one child before you use it.',
  },

  // ---------------------------------------------------------------------
  'diameter-of-binary-tree': {
    title: 'Diameter of Binary Tree',
    difficulty: 'Easy',
    cast: CAST,
    prompt: 'Given the root of a binary tree, return the length of its diameter — the number of edges on the longest path between any two nodes. The path may or may not pass through the root.',
    beats: [
      S('The prompt'),
      I("Alright Alex — return the diameter of a binary tree: the length of the longest path between any two nodes.",
        'Whether you notice the path need not pass through the root — the detail that makes this more than a height problem.'),
      TH("The words to catch are 'any two nodes.' The longest path does NOT have to go through the root. That's the whole trick.",
        'Reading the problem precisely — the path can bend at any node, not just the root.'),
      SAY("Is the diameter measured in edges or in nodes?"),
      I("Edges."),
      TH("Here's my key realization: for any single node, the longest path that bends at that node is height(left) + height(right), in edges. So the diameter is just the maximum of that over every node.",
        'Reframing the goal in terms of subtree heights — the key insight that unlocks the problem.'),
      S('Approach'),
      SAY("So my plan: compute height with DFS, and at each node update a running best equal to leftHeight + rightHeight. I return the height upward, but I track the diameter separately."),
      I("Why track it separately — why not just return the diameter?",
        'Do you actually understand why one return value is not enough, or did you memorize the trick?'),
      TH("She's testing whether I understand why the global is needed. Good — I do.",
        'Recognizing the interviewer is probing depth of understanding, not just correctness.'),
      SAY("Because each recursive call can only return one value — the height — but the node that maximizes the diameter could be anywhere, not the root. So I visit every node, and I keep the best-so-far in a field."),
      I("That's right."),
      TH("This is the core tree pattern: return one thing, height, and update another thing, the answer, as a side effect. Return-up plus update-a-global.",
        'Return-up + update-a-global — the reusable pattern for whole-tree aggregate problems.'),
      S('Code'),
      CODE(`int best = 0;

public int diameterOfBinaryTree(TreeNode root) {
    height(root);
    return best;
}

private int height(TreeNode node) {
    if (node == null) return 0;             // null = 0 edges
    int l = height(node.left);
    int r = height(node.right);
    best = Math.max(best, l + r);           // path bending HERE, in edges
    return 1 + Math.max(l, r);              // my height, one edge up
}`),
      TH("Height of null is 0. l + r is exactly the edge count of the path that bends at this node. I return 1 + max(l, r) because stepping up to my parent adds one edge.",
        'Height measured in edges: null = 0, and going up one level adds one edge.'),
      S('Test'),
      SAY("Trace [1,2,3,4,5]. Node 2 has left height 1 and right height 1, so best is 2 there; up at the root the longest bend comes out to 3."),
      I("Complexity?",
        'Can you state and justify time and space, not just produce working code.'),
      SAY("O(n) time — one height computation per node — and O(h) space."),
      I("Nicely reasoned."),
    ],
    rubric: [
      'Caught that the path need not pass through the root ("any two nodes")',
      'Clarified diameter is measured in edges',
      'Key insight: longest path bending at a node = height(left) + height(right)',
      'Explained why a side/global value is needed (each call returns only its height)',
      'Correct height: null = 0, return 1 + max(left, right)',
      'Stated O(n) time and O(h) space',
    ],
    takeaway: 'When the answer can peak at ANY node but each recursive call can only return one value, compute that value (height) and update the real answer in a field on the side. Return-up + update-a-global is the tree pattern you reuse constantly.',
  },

  // ---------------------------------------------------------------------
  'validate-binary-search-tree': {
    title: 'Validate Binary Search Tree',
    difficulty: 'Medium',
    cast: CAST,
    prompt: 'Given the root of a binary tree, determine whether it is a valid binary search tree (BST): for every node, all values in its left subtree are strictly less and all in its right subtree are strictly greater.',
    beats: [
      S('The prompt'),
      I("Okay Alex, a medium. Given a binary tree, tell me whether it's a valid BST.",
        'Do you know the true BST invariant, or will you fall for the naive parent-child check?'),
      TH("The definition is the trap here: every node has to be greater than EVERYTHING in its left subtree and less than everything in its right — not just its immediate children.",
        'The BST invariant constrains ALL ancestors, not just the direct parent.'),
      SAY("Are duplicates allowed, or is it strictly less and strictly greater?"),
      I("Strictly. Assume all values are distinct."),
      TH("So the tempting check — left child < node < right child — is wrong. A value buried deep in the left subtree could be bigger than a high-up ancestor and still pass a local check. I need to carry down the range that's allowed.",
        'Why a local parent-child comparison fails: it misses distant-ancestor violations.'),
      SAY("I want to flag something — a naive check comparing each node only to its direct children would actually pass some invalid trees. A value deep in the left subtree could still be larger than an ancestor."),
      I("Good — so how do you fix that?",
        'Can you get from spotting the flaw to the bounds/range technique that fixes it.'),
      SAY("I carry a valid range down the recursion. Each node must satisfy low < value < high. Going left, the high tightens to the node's value; going right, the low tightens to it. The root starts wide open, negative to positive infinity."),
      I("Go ahead."),
      TH("One edge case I have to respect: node values can be Integer.MIN_VALUE or MAX_VALUE. If my bounds are ints, the comparison at the extremes breaks. I'll use long bounds so it never overflows.",
        'Integer overflow at extreme node values — guard it with long bounds.'),
      SAY("I'll use long bounds instead of int, because node values can be right at Integer.MIN or MAX and I don't want the comparison to overflow."),
      I("Nice catch — that's a common bug."),
      S('Code'),
      CODE(`public boolean isValidBST(TreeNode root) {
    return valid(root, Long.MIN_VALUE, Long.MAX_VALUE);
}

private boolean valid(TreeNode n, long low, long high) {
    if (n == null) return true;                        // empty is valid
    if (!(low < n.val && n.val < high)) return false;  // must fit the range
    return valid(n.left,  low, n.val)                  // left:  high := n.val
        && valid(n.right, n.val, high);                // right: low  := n.val
}`),
      TH("Left child inherits my value as its new upper bound; right child inherits it as its new lower bound. Both subtrees must pass — that's the &&.",
        'Propagating bounds down: tighten high going left, low going right; both subtrees must hold.'),
      S('Test'),
      SAY("Let me trace [5,1,4,null,null,3,6] — that 4 sits in 5's right subtree, but 4 < 5, so it should be invalid."),
      TH("valid(4, low=5, high=+∞): is 5 < 4? No. The lower bound rejects it immediately, returns false. The bounds caught what a parent-only check would have missed. Good.",
        'The propagated bound catches a violator that a parent-only check would wrongly accept.'),
      I("Complexity?",
        'State and justify time and space.'),
      SAY("O(n) time, O(h) space."),
      I("Solid — you hit both the range insight and the overflow. That's the full answer."),
    ],
    rubric: [
      'Stated the true invariant: a node beats ALL ancestors, not just its parent',
      'Explained why a local parent-child check fails',
      'Bounds technique: carry (low, high) down — tighten high going left, low going right',
      'Flagged integer overflow at extreme values → use long bounds',
      'Traced an invalid case the bounds correctly reject',
      'Stated O(n) time and O(h) space',
    ],
    takeaway: 'The BST property is about ALL ancestors, not just the parent. Carry a (low, high) range down the tree; never validate a node only against its direct children. Use long bounds to dodge Integer.MIN/MAX overflow.',
  },

  // ---------------------------------------------------------------------
  'binary-tree-right-side-view': {
    title: 'Binary Tree Right Side View',
    difficulty: 'Medium',
    cast: CAST,
    prompt: 'Given the root of a binary tree, imagine standing on its right side. Return the values of the nodes you can see, ordered top to bottom.',
    beats: [
      S('The prompt'),
      I("Last one, Alex. Imagine standing on the right side of a binary tree — return the values of the nodes you can see, top to bottom.",
        'Can you translate a vivid word-picture ("right side") into a precise rule.'),
      TH("What can I actually see from the right? Only the rightmost node on each level; everything behind it is hidden. So the answer is: the last node of every level.",
        'Translating "right side view" into a precise rule: the rightmost node of each level.'),
      SAY("So essentially I want one value per level — the rightmost node at each depth, from the top down?"),
      I("Exactly right."),
      TH("Processing level by level is the natural fit — that's BFS with a queue. I walk one full level and grab the last node I see on it.",
        'Level-by-level processing maps to breadth-first search with a queue.'),
      S('Approach'),
      SAY("I'll do a level-order BFS. For each level I snapshot how many nodes are currently in the queue, then pop exactly that many; the last one I pop on the level is the rightmost, so I record it."),
      I("Sounds right. Any pitfalls you want to avoid?",
        'Do you anticipate the classic BFS bugs before they bite — level-size snapshot and loop bounds.'),
      TH("Yes — I've been burned by two here. One: read size = queue.size() BEFORE the inner loop, because I'm enqueueing children into the same queue as I go. Two: the loop has to cover the whole level — i from 0 while i < size — or I skip a node, the queue never drains, and it spins forever.",
        'The two BFS-by-level pitfalls: snapshot the size first, and iterate the full level (off-by-one → TLE).'),
      SAY("Two, actually. I have to snapshot the level size before the loop, since I'm adding children to the same queue. And I have to iterate the full level from 0 to size — an off-by-one there would skip a node and could loop forever."),
      I("Great awareness. Let's see it."),
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
      TH("Enqueue left then right, so within a level the queue stays left-to-right and the last poll really is the rightmost. Record only when i == size - 1.",
        'Enqueue order (L then R) makes the final poll of a level the rightmost node.'),
      S('Test'),
      SAY("Trace [1,2,3,null,5,null,4]. Levels are [1], then [2,3], then [5,4]. Rightmost of each: 1, 3, 4."),
      TH("On level [2,3]: poll 2 at i=0, enqueue its child 5; poll 3 at i=1 which equals size-1, so record 3 and enqueue its child 4. Result builds to [1,3,4]. Correct.",
        'Dry-running the loop confirms one rightmost value is captured per level.'),
      I("Complexity?",
        'State and justify time and space.'),
      SAY("O(n) time — each node enqueued and polled once. O(n) space for the queue, which can hold up to a full level."),
      I("That's a strong finish. Well done."),
    ],
    rubric: [
      'Reframed the goal as "the last node of each level"',
      'Chose level-order BFS with a queue',
      'Snapshot the level size BEFORE the inner loop',
      'Iterated the full level (i from 0 to size) — no off-by-one',
      'Recorded only i == size-1, and enqueued both children (left then right)',
      'Guarded the null root; stated O(n) time and O(n) space',
    ],
    takeaway: 'Level-order BFS = snapshot the level size before the loop, poll exactly that many, enqueue both children. The rightmost node is the last poll of the level. An off-by-one on the loop bound is exactly what makes this TLE.',
  },

  // ---------------------------------------------------------------------
  'binary-tree-level-order-traversal': {
    title: 'Binary Tree Level Order Traversal',
    difficulty: 'Medium',
    cast: CAST,
    prompt: "Given the root of a binary tree, return its level-order traversal — the node values grouped level by level, from top to bottom, as a list of lists.",
    beats: [
      S('The prompt'),
      I("Return the level-order traversal of a binary tree — the values grouped level by level, top to bottom, as a list of lists.",
        'Whether you reach for BFS and handle the per-level grouping cleanly.'),
      TH("Level by level, grouped — that's textbook BFS with a queue. The one wrinkle is I need each level as its own list, not one flat list.",
        'Grouping the output per level is the only thing beyond a plain BFS.'),
      SAY("Can the tree be empty? And I return a list of lists, one inner list per level?"),
      I("Yes to both — an empty tree returns an empty list."),
      TH("The trick to separate levels: before I process a level, snapshot the queue size. That count is exactly how many nodes are on the current level; everything else in the queue belongs to the next one.",
        'Snapshot the queue size to mark where one level ends and the next begins.'),
      S('Approach'),
      SAY("I'll BFS with a queue. Each round I record the current queue size, pop exactly that many nodes into a fresh list, and enqueue their children for the next level."),
      I("Sounds good. Anything you're careful about?",
        'Do you anticipate the size-snapshot pitfall before it bites.'),
      TH("The one bug: if I loop 'while queue not empty' for the inner loop instead of over a snapshotted size, levels blend together, because I'm adding children as I go.",
        'Snapshot the size before the inner loop, or levels bleed into each other.'),
      SAY("The main thing — I snapshot the size before the inner loop, since I'm enqueueing the next level into the same queue."),
      I("Go ahead."),
      S('Code'),
      CODE(`public List<List<Integer>> levelOrder(TreeNode root) {
    List<List<Integer>> res = new ArrayList<>();
    if (root == null) return res;                 // empty tree
    Queue<TreeNode> q = new LinkedList<>();
    q.offer(root);
    while (!q.isEmpty()) {
        int size = q.size();                      // nodes on THIS level
        List<Integer> level = new ArrayList<>();
        for (int i = 0; i < size; i++) {
            TreeNode node = q.poll();
            level.add(node.val);
            if (node.left  != null) q.offer(node.left);
            if (node.right != null) q.offer(node.right);
        }
        res.add(level);                           // commit one level
    }
    return res;
}`),
      TH("Guard the null root up front so I return an empty list cleanly. Fresh list per level, committed to the result after the inner loop finishes.",
        'Null-root guard, and one fresh list committed per level.'),
      S('Test'),
      SAY("Trace [3,9,20,null,null,15,7]: level 0 is [3], level 1 is [9,20], level 2 is [15,7]. Result [[3],[9,20],[15,7]]."),
      I("Complexity?",
        'State and justify time and space.'),
      SAY("O(n) time — every node once. O(n) space for the queue and the output."),
      I("Clean. This is the template a lot of tree problems build on."),
    ],
    rubric: [
      'Chose BFS with a queue, producing a list-of-lists output',
      'Snapshot the queue size to bound each level',
      'Built a fresh list per level, committed after the inner loop',
      'Guarded the null root (empty tree → empty list)',
      'Traced a concrete example to confirm',
      'Stated O(n) time and O(n) space',
    ],
    takeaway: 'Level-order = BFS where you snapshot the queue size before each level so you know exactly where it ends. That size-snapshot is the backbone of every "per level" tree problem — right side view, zigzag, and vertical order all reuse it.',
  },

  // ---------------------------------------------------------------------
  'binary-tree-zigzag-level-order-traversal': {
    title: 'Binary Tree Zigzag Level Order Traversal',
    difficulty: 'Medium',
    cast: CAST,
    prompt: 'Given the root of a binary tree, return the zigzag level-order traversal of its nodes: left-to-right on the first level, right-to-left on the next, alternating.',
    beats: [
      S('The prompt'),
      I("Return the zigzag level order: level 0 left-to-right, level 1 right-to-left, alternating all the way down.",
        'Can you extend a known pattern (level order) with a twist instead of inventing something new.'),
      TH("This is just level-order traversal with one extra rule: reverse every other level. Crucially, I should NOT change how I traverse — I traverse normally and only flip the direction I record values in.",
        'Reuse level-order BFS; only the recording direction alternates.'),
      SAY("To confirm: level 0 is left-to-right, then it flips every level after?"),
      I("Correct."),
      TH("Two ways to flip: reverse the level's list at the end of the odd levels, or build it reversed as I go by inserting at the front. Front-insertion avoids the extra reverse pass.",
        'Alternate via reversing the list, or via front-insertion with a deque.'),
      S('Approach'),
      SAY("Standard level-order BFS, but I keep a boolean 'leftToRight'. For each level I build the list, and flip the boolean after each level."),
      I("Any way to avoid an explicit reverse?",
        'Do you know the deque / addFirst optimization.'),
      SAY("Yes — instead of reversing, I use a LinkedList as a deque and addFirst on the right-to-left levels, so the values land in the right order directly. Same O(n), but no separate reverse pass."),
      I("Good — either's fine, go with what's clearest."),
      TH("I'll use addFirst / addLast on a Deque so the intent is explicit and I avoid the extra pass.",
        'Deque addFirst/addLast puts each value on the correct end as you go.'),
      S('Code'),
      CODE(`public List<List<Integer>> zigzagLevelOrder(TreeNode root) {
    List<List<Integer>> res = new ArrayList<>();
    if (root == null) return res;
    Queue<TreeNode> q = new LinkedList<>();
    q.offer(root);
    boolean leftToRight = true;
    while (!q.isEmpty()) {
        int size = q.size();
        LinkedList<Integer> level = new LinkedList<>();
        for (int i = 0; i < size; i++) {
            TreeNode node = q.poll();
            if (leftToRight) level.addLast(node.val);
            else             level.addFirst(node.val);   // build reversed directly
            if (node.left  != null) q.offer(node.left);
            if (node.right != null) q.offer(node.right);
        }
        res.add(level);
        leftToRight = !leftToRight;                       // flip each level
    }
    return res;
}`),
      TH("The traversal itself is identical to plain level order — always enqueue left then right. Only where I place the value inside the level list flips.",
        'Traversal order is unchanged; only the placement of each value differs.'),
      S('Test'),
      SAY("Trace [3,9,20,null,null,15,7]: level 0 [3]; level 1 is a flip level, so [20,9] instead of [9,20]; level 2 [15,7]. Result [[3],[20,9],[15,7]]."),
      I("Complexity?",
        'State and justify.'),
      SAY("O(n) time, O(n) space."),
      I("Nicely done — reusing level order was exactly the move."),
    ],
    rubric: [
      'Recognized it as level-order plus a per-level direction flip',
      'Kept the traversal unchanged — flipped only where values are placed',
      'Used a leftToRight flag with addFirst/addLast (or a reverse)',
      'Noted the deque avoids an explicit reverse pass',
      'Traced a flip level to confirm',
      'Stated O(n) time and O(n) space',
    ],
    takeaway: 'Zigzag is just level-order with a direction flag. Don\'t change the traversal — change WHERE you place each value (addFirst vs addLast). Reusing a known pattern with a small twist reads far better than a bespoke solution.',
  },

  // ---------------------------------------------------------------------
  'binary-tree-vertical-order-traversal': {
    title: 'Binary Tree Vertical Order Traversal',
    difficulty: 'Medium',
    cast: CAST,
    prompt: 'Given the root of a binary tree, return its vertical order traversal — the node values grouped by column from leftmost to rightmost. Within a column, order nodes top to bottom; nodes in the same row and column go left to right.',
    beats: [
      S('The prompt'),
      I("Return the vertical order traversal: group the node values by column, from the leftmost column to the rightmost. Within a column, order them top to bottom.",
        'Whether you invent a coordinate system (columns) and pick a traversal that preserves top-to-bottom order.'),
      TH("'Column' means I need a horizontal coordinate. Root is column 0; going left is column − 1, going right is column + 1. Then I group values by column and emit columns left to right.",
        'Assign a column index: root = 0, left = col − 1, right = col + 1.'),
      SAY("Two clarifications: within a column, nodes are top-to-bottom — and if two nodes share the same row and column, what order?"),
      I("Good question — same row and column, order them left to right, i.e. the order you reach them."),
      TH("That last rule is the subtle part. If I use BFS — top-down, left-to-right — nodes arrive already in top-to-bottom, left-to-right order, so I can just append. A DFS would let me reach a lower node before a higher one in the same column, forcing a sort by row afterward. BFS is cleaner here.",
        'BFS gives top-to-bottom, left-to-right order for free; DFS would need an extra sort by row.'),
      SAY("I'll use BFS specifically, so the within-column ordering falls out naturally rather than needing a sort by row like DFS would."),
      I("Go for it."),
      S('Approach'),
      SAY("I'll BFS, carrying each node's column alongside it. I keep a map from column to a list of values, and track the min and max column seen. At the end I read out columns from min to max."),
      I("Why track min and max instead of just sorting the keys at the end?",
        'Do you understand the cost trade-off in your data-structure choice.'),
      TH("Sorting the keys is an O(k log k) pass. But columns are a contiguous range of integers from min to max, so I can just loop that range — linear, no sort. A TreeMap would auto-sort but adds a log factor on every put.",
        'Columns are contiguous ints, so a min..max loop beats sorting the keys.'),
      SAY("Because the columns are contiguous integers, I can loop min..max in linear time instead of paying O(k log k) to sort the keys."),
      I("Nice."),
      S('Code'),
      CODE(`public List<List<Integer>> verticalOrder(TreeNode root) {
    List<List<Integer>> res = new ArrayList<>();
    if (root == null) return res;
    Map<Integer, List<Integer>> cols = new HashMap<>();
    Queue<TreeNode> nodes   = new LinkedList<>();
    Queue<Integer>  columns = new LinkedList<>();   // column paired with each node
    nodes.offer(root);
    columns.offer(0);
    int min = 0, max = 0;
    while (!nodes.isEmpty()) {
        TreeNode node = nodes.poll();
        int col = columns.poll();
        cols.computeIfAbsent(col, k -> new ArrayList<>()).add(node.val);
        min = Math.min(min, col);
        max = Math.max(max, col);
        if (node.left  != null) { nodes.offer(node.left);  columns.offer(col - 1); }
        if (node.right != null) { nodes.offer(node.right); columns.offer(col + 1); }
    }
    for (int c = min; c <= max; c++) res.add(cols.get(c));   // left → right
    return res;
}`),
      TH("I keep two parallel queues — one for nodes, one for their columns — so each node stays paired with its column. Left child shifts to col − 1, right child to col + 1.",
        'Parallel queues keep each node paired with its column as you BFS.'),
      S('Test'),
      SAY("For [3,9,20,null,null,15,7]: col(3)=0, col(9)=−1, col(20)=+1, col(15)=0, col(7)=+2. Columns: −1→[9], 0→[3,15], 1→[20], 2→[7]. Output [[9],[3,15],[20],[7]]."),
      TH("15 is column 0 and sits below 3 — BFS reached 3 first, so [3,15] comes out correctly top-to-bottom. Exactly why BFS saved me a sort.",
        'BFS visiting order yields the correct top-to-bottom column contents.'),
      I("Complexity?",
        'State and justify.'),
      SAY("O(n) time — each node once, and the min..max readout is linear in the number of columns, which is at most n. O(n) space for the map and queues."),
      I("Strong answer — the BFS-over-DFS reasoning is the crux, and you led with it."),
    ],
    rubric: [
      'Assigned a column coordinate: root 0, left −1, right +1',
      'Clarified same-row-same-column ordering (left to right)',
      'Key insight: chose BFS over DFS to avoid a sort by row',
      'Grouped values by column in a map; tracked min and max column',
      'Read columns min→max (no key sort); kept node paired with its column',
      'Traced a concrete example; stated O(n) time and O(n) space',
    ],
    takeaway: 'Vertical order = give each node a column (root 0, left −1, right +1), group by column, read min→max. Use BFS so the within-column order (top-to-bottom, left-to-right) comes for free — DFS would force a sort by row. Track min/max to read columns without sorting the keys.',
  },
}

export function mindsetFor(id) {
  return MINDSETS[id] || null
}

export function hasMindset(id) {
  return Boolean(MINDSETS[id])
}

export default MINDSETS
