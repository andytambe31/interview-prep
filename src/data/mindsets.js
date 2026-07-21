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
      I("Complexity?",
        'State and justify time and space.'),
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
  'kth-smallest-element-in-a-bst': {
    title: 'Kth Smallest Element in a BST',
    difficulty: 'Medium',
    cast: CAST,
    prompt: 'Given the root of a binary search tree and an integer k, return the kth smallest value (1-indexed) among all the node values in the tree.',
    beats: [
      S('The prompt'),
      I("Given a BST and an integer k, return the kth smallest value in the tree, 1-indexed.",
        'Whether you connect "BST" + "kth smallest" to the inorder-gives-sorted-order fact.'),
      TH("BST plus 'kth smallest' — the fact that unlocks this is that an inorder traversal of a BST visits nodes in sorted order. So the kth smallest is simply the kth node I visit inorder.",
        'Inorder traversal of a BST yields values in ascending sorted order.'),
      SAY("Quick checks: k is 1-indexed, and is it guaranteed 1 ≤ k ≤ number of nodes so I don't have to handle an out-of-range k?"),
      I("Yes — 1-indexed, and k is always valid."),
      TH("Good, no bounds handling. Naive approach: do a full inorder into a list, return list[k-1]. That's O(n) time and O(n) space. But I can do better — I don't need the whole sorted list, just the first k values, and I can stop the moment I've counted k.",
        'I only need the first k of the sorted order, so I can stop early instead of sorting everything.'),
      S('Approach'),
      SAY("I'll do an inorder traversal, counting nodes as I visit them, and return the value the moment my count hits k — no need to traverse the rest."),
      I("Recursive or iterative?",
        'Do you know that iterative inorder lets you stop cleanly at k without unwinding the whole recursion.'),
      TH("Recursion is clean, but stopping early mid-recursion is awkward — I'd carry a counter in a field and short-circuit. An explicit stack lets me pop exactly one node at a time and just stop when k hits 0. I'll go iterative.",
        'An explicit stack makes early termination at k natural; recursion needs a field + short-circuit.'),
      SAY("I'll use an iterative inorder with a stack so I can stop exactly at k."),
      I("Go ahead."),
      TH("The iterative inorder pattern: push the entire left spine, then pop — that popped node is the next smallest. Decrement k; if it hits 0, that's my answer. Otherwise move to the popped node's right child and repeat.",
        'Iterative inorder: dive left pushing nodes, pop = next smallest, then step into its right subtree.'),
      S('Code'),
      CODE(`public int kthSmallest(TreeNode root, int k) {
    Deque<TreeNode> stack = new ArrayDeque<>();
    TreeNode node = root;
    while (node != null || !stack.isEmpty()) {
        while (node != null) {         // dive to the smallest unvisited
            stack.push(node);
            node = node.left;
        }
        node = stack.pop();            // next smallest in order
        if (--k == 0) return node.val; // stop the moment we reach k
        node = node.right;             // then explore its right subtree
    }
    return -1;                         // unreachable when k is valid
}`),
      TH("The inner while pushes the whole left spine so the top of the stack is always the smallest unvisited node. After popping I go right, because everything smaller than the right subtree has already been handled.",
        'Pushing the left spine keeps the smallest unvisited node on top of the stack.'),
      S('Test'),
      SAY("Trace [3,1,4,null,2] with k=1. Sorted order is 1,2,3,4."),
      TH("Push 3, then push 1 (its left); 1.left is null, so pop 1, --k = 0 → return 1. Correct, and I never touched 4. Early stop worked.",
        'The dry run confirms the traversal stops exactly at k, skipping the rest.'),
      I("Complexity? And what if the tree is modified often and I query kth smallest a lot?",
        'Can you state cost precisely, and do you know the augmented-BST follow-up.'),
      SAY("This is O(H + k) time — I push one left spine (up to the height H) and then pop k times — and O(H) space for the stack. Worst case O(n) on a skewed tree."),
      TH("The follow-up is the classic one: if there are frequent inserts/deletes and many kth-smallest queries, augment each node with the size of its left subtree. Then each query is O(H): compare k to leftSize+1 to decide go left, this node, or go right with k adjusted.",
        'Augment nodes with subtree/left counts to answer repeated kth-smallest queries in O(H).'),
      SAY("For frequent modifications plus many queries, I'd augment each node with its left-subtree size, so each kth-smallest query becomes O(H) without re-traversing — you compare k against leftSize + 1 to decide which way to go."),
      I("That's exactly the follow-up I was after. Great."),
    ],
    rubric: [
      'Recognized the key fact: BST inorder traversal = sorted order',
      'Clarified k is 1-indexed and always valid',
      'Chose inorder, counting to k, and stops early (doesn’t sort the whole tree)',
      'Used an iterative stack (or recursion) — push left spine, pop = next smallest, then go right',
      'Stated O(H + k) time and O(H) space',
      'Named the follow-up: augment nodes with left-subtree size for O(H) repeated queries',
    ],
    takeaway: 'For anything "kth / median / sorted-order" on a BST, reach for inorder traversal — it emits values in sorted order. Do it iteratively with a stack so you can stop the instant you hit k. And know the follow-up: augment nodes with subtree sizes to answer repeated order-statistic queries in O(H).',
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

  // ---------------------------------------------------------------------
  'binary-search': {
    title: 'Binary Search',
    difficulty: 'Easy',
    cast: CAST,
    prompt: 'Given a sorted (ascending) array of integers nums and an integer target, return the index of target if it exists, otherwise return -1. Do it in O(log n).',
    beats: [
      S('The prompt'),
      I("Let's start with the fundamental one. You've got an array sorted in ascending order and a target — return the index of the target, or −1 if it's not there. I'd like O(log n).",
        'Whether you have the canonical template down cold and know why it is O(log n).'),
      TH("Sorted array, find an index, O(log n) — this is textbook binary search. Because it's sorted, I can throw away half the search space at every step.",
        'A sorted array + search + O(log n) = binary search, halving the space each step.'),
      SAY("Since it's sorted I'll binary search. Are the values distinct, or could there be duplicates I need to account for here?"),
      I("Assume distinct for this one."),
      TH("Good — plain template then, no leftmost/rightmost variant needed.",
        'Distinct values → the plain template, not the boundary-finding variant.'),
      S('Approach'),
      SAY("I'll keep two inclusive bounds, left and right, over the whole array. Each step I look at the middle: if it's the target I'm done; if it's too big I discard the right half; too small, discard the left half. Loop while left <= right."),
      I("Quick one — how are you computing the middle index? Any concern there?",
        'Do you know the mid-computation overflow pitfall.'),
      TH("If I write (left + right) / 2, for very large indices left + right can overflow int. The safe form is left + (right − left) / 2 — same value, but it never exceeds right.",
        'Compute mid as left + (right − left) / 2 to avoid integer overflow.'),
      SAY("I'll compute mid as left + (right − left) / 2 rather than (left + right) / 2 — identical result, but it can't overflow on large indices."),
      I("That's exactly what I wanted to hear. Go on."),
      S('Code'),
      CODE(`public int search(int[] nums, int target) {
    int left = 0, right = nums.length - 1;   // inclusive bounds
    while (left <= right) {
        int mid = left + (right - left) / 2; // overflow-safe
        if (nums[mid] == target) return mid;
        else if (nums[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    return -1;
}`),
      TH("Inclusive bounds mean the condition is left <= right, and I move past mid with mid ± 1 — so I never re-examine mid and never get stuck in an infinite loop.",
        'Inclusive bounds → loop while left <= right, and always move to mid ± 1.'),
      S('Test'),
      SAY("nums = [-1,0,3,5,9,12], target 9. left0/right5 → mid2 = 3 < 9, so left = 3. left3/right5 → mid4 = 9 == target, return 4."),
      I("And if 9 weren't in the array — say target 4? What happens to your pointers?",
        'Do you know what the pointers mean on a miss (the insertion point).'),
      TH("The loop exits with left sitting at the index where 4 would be inserted to keep the array sorted. For this problem I return −1, but that insertion-point property is exactly why binary search also solves 'search insert position'.",
        'On a miss, left lands on the insertion point that keeps the array sorted.'),
      SAY("It exits with left at the insertion point for 4. Here I just return −1, but that same property solves insert-position problems."),
      I("Complexity?",
        'State and justify time and space.'),
      SAY("O(log n) time — the space halves each step — and O(1) space."),
      I("Perfect. This template is the backbone of the whole pattern, so keep it razor-sharp."),
    ],
    rubric: [
      'Identified binary search from "sorted + search + O(log n)"',
      'Used inclusive bounds with the loop while left <= right',
      'Computed mid overflow-safely as left + (right − left) / 2',
      'Moved to mid ± 1 (never re-checks mid, no infinite loop)',
      'Knew a miss leaves left at the insertion point',
      'Stated O(log n) time and O(1) space',
    ],
    takeaway: '704 is the template you copy for everything else — memorize it cold: inclusive bounds, while left <= right, overflow-safe mid = left + (right − left)/2, move to mid ± 1. On a miss, left is the insertion point.',
  },

  // ---------------------------------------------------------------------
  'search-in-rotated-sorted-array': {
    title: 'Search in Rotated Sorted Array',
    difficulty: 'Medium',
    cast: CAST,
    prompt: 'A sorted array of distinct integers is rotated at an unknown pivot (e.g. [4,5,6,7,0,1,2]). Given the array and a target, return the target’s index, or -1. Required: O(log n).',
    beats: [
      S('The prompt'),
      I("This one comes up a lot with us. A sorted array of distinct integers has been rotated at some unknown pivot — say [4,5,6,7,0,1,2]. Find the index of a target, and I want O(log n).",
        'Whether you can still binary-search when the array is not fully sorted — the Amazon-classic twist.'),
      TH("O(log n) rules out a linear scan — they want binary search, adapted. The array isn't fully sorted anymore, but here's the key property: if I cut at mid, at least ONE of the two halves is always properly sorted.",
        'In a rotated sorted array, at least one side of mid is always fully sorted.'),
      SAY("They're distinct, there's a single rotation, and I return −1 if the target's absent — right?"),
      I("Right on all three."),
      TH("So each step: figure out which half is sorted, then check whether the target lies inside that sorted half's value range. If it does, search there; if not, search the other half.",
        'Detect the sorted half, then use its range to decide which side holds the target.'),
      S('Approach'),
      SAY("Standard bounds. At each mid I decide which side is sorted: if nums[left] <= nums[mid], the left half is sorted; otherwise the right half is. Then I check whether the target is within the sorted half's range and move accordingly."),
      I("Walk me through the left-half-sorted case — what exactly is the check?",
        'Can you state the range condition precisely instead of hand-waving it.'),
      SAY("If the left half is sorted and nums[left] <= target < nums[mid], the target's in the left half, so right = mid − 1. Otherwise it's in the right half, so left = mid + 1. The right-half-sorted case is symmetric."),
      I("Why the <= in nums[left] <= nums[mid] — why not a strict <?",
        'Do you understand the boundary case when the window shrinks to one element.'),
      TH("When the search space shrinks to a single element, mid == left, so nums[left] == nums[mid]. The <= keeps that case classified as 'left half sorted', which is correct; a strict < could misroute it.",
        'The <= handles the one-element case where mid == left correctly.'),
      SAY("When the window is one element, mid equals left so the two are equal — the <= keeps it treated as left-sorted, which is right. A strict < could misclassify that edge."),
      I("That's the subtle part most people miss. Code it up."),
      S('Code'),
      CODE(`public int search(int[] nums, int target) {
    int left = 0, right = nums.length - 1;
    while (left <= right) {
        int mid = left + (right - left) / 2;
        if (nums[mid] == target) return mid;
        if (nums[left] <= nums[mid]) {                 // left half sorted
            if (nums[left] <= target && target < nums[mid]) right = mid - 1;
            else left = mid + 1;
        } else {                                        // right half sorted
            if (nums[mid] < target && target <= nums[right]) left = mid + 1;
            else right = mid - 1;
        }
    }
    return -1;
}`),
      TH("Equality check first. Then classify the sorted half, then make the in-range decision within it. Each step still halves the space, so it stays O(log n).",
        'Check equality first, then classify the sorted half, then the range decision.'),
      S('Test'),
      SAY("[4,5,6,7,0,1,2], target 0. left0/right6 mid3=7; left half [4..7] sorted, is 4<=0<7? no → left=4. left4/right6 mid5=1; left half [0..1] sorted, is 0<=0<1? yes → right=4. left4/right4 mid4=0 == target → index 4."),
      I("And an absent target like 3?"),
      SAY("Same logic runs, the window empties without a match, and I return −1."),
      I("Complexity?",
        'State and justify time and space.'),
      SAY("O(log n) time, O(1) space — still halving each step, just with an extra branch."),
      I("Strong. 'One half is always sorted' is precisely the insight I'm probing for here."),
    ],
    rubric: [
      'Key insight: at any mid, at least one half is fully sorted',
      'Clarified distinct values, single rotation, −1 if absent',
      'Detected the sorted half via nums[left] <= nums[mid]',
      'Correct in-range check to choose the side (nums[left] <= target < nums[mid])',
      'Handled the <= boundary (one-element / mid == left) case',
      'Stated O(log n) time and O(1) space',
    ],
    takeaway: 'Rotated array + O(log n) = adapt binary search around "one half is always sorted." Each step: find the sorted half, test whether target is inside its range, move accordingly. The <= in the sorted-half test is what makes the shrink-to-one-element case behave.',
  },

  // ---------------------------------------------------------------------
  'koko-eating-bananas': {
    title: 'Koko Eating Bananas',
    difficulty: 'Medium',
    cast: CAST,
    prompt: 'Koko has piles[] of bananas and h hours. Each hour she picks one pile and eats up to k bananas from it (the rest of that hour is wasted if the pile is smaller). Return the minimum integer speed k so she finishes all piles within h hours.',
    beats: [
      S('The prompt'),
      I("Koko has piles of bananas and h hours before the guards come back. Each hour she picks one pile and eats up to k bananas from it. Find the minimum eating speed k so she finishes all the piles within h hours.",
        'Whether you spot binary-search-on-the-answer when the array itself is not the search space.'),
      TH("At first glance this isn't a binary search problem — the piles array isn't what I'm searching, and it isn't even sorted. But think about the speed k: if some speed k lets her finish in time, then any speed faster than k also finishes in time. And if k is too slow, everything slower is too slow. That monotonic behavior is the signal — I can binary search on k itself.",
        'Binary search on the ANSWER: feasibility of a speed k is monotonic in k.'),
      SAY("So I'm searching for the smallest feasible speed. The range of k is 1 up to the largest pile, right? Eating faster than the biggest pile can't help, since she only eats from one pile per hour."),
      I("Exactly — nice bounding. Keep going."),
      TH("For a candidate speed k, the hours she needs is the sum over piles of ceil(pile / k). If that total is <= h, k is feasible. I want the smallest k where feasible is true — a leftmost-true search.",
        'For a given k, hours needed = Σ ceil(pile / k); feasible iff that sum ≤ h.'),
      S('Approach'),
      SAY("I'll binary search k in [1, max(piles)]. For each mid speed I compute the hours with a helper; if hours <= h the speed works so I try slower (right = mid − 1); otherwise I go faster (left = mid + 1). left ends on the smallest feasible speed."),
      I("How are you computing ceil(pile / k) — I don't want floating point in here.",
        'Do you know the integer-ceiling trick and why floats are risky here.'),
      TH("Integer ceiling of a / b is (a + b − 1) / b. No doubles, no rounding surprises.",
        'Integer ceiling trick: ceil(pile/k) = (pile + k − 1) / k, no floats.'),
      SAY("Integer math: ceil(pile / k) is (pile + k − 1) / k."),
      I("Good. One more — anything about the hours total you should watch?",
        'Are you alert to integer overflow when summing the hours.'),
      TH("If there are many large piles, the summed hours could exceed int range. I'll accumulate in a long to be safe.",
        'Accumulate the hours sum in a long to avoid overflow on large inputs.'),
      SAY("I'll accumulate the hours in a long, since with many large piles the sum could overflow an int."),
      I("Careful and correct. Let's see it."),
      S('Code'),
      CODE(`public int minEatingSpeed(int[] piles, int h) {
    int left = 1, right = 0;
    for (int p : piles) right = Math.max(right, p);   // max pile = fastest useful speed
    while (left <= right) {
        int k = left + (right - left) / 2;
        if (hours(piles, k) <= h) right = k - 1;      // feasible → try slower
        else                      left  = k + 1;      // too slow → go faster
    }
    return left;                                       // smallest feasible speed
}

private long hours(int[] piles, int k) {
    long total = 0;
    for (int p : piles) total += (p + k - 1) / k;      // ceil(p / k)
    return total;
}`),
      TH("This is the leftmost-true template: on feasible I shrink right, so the loop converges to the minimum feasible k, which is what left holds at the end.",
        'Leftmost-true binary search converges left to the smallest feasible value.'),
      S('Test'),
      SAY("piles = [3,6,7,11], h = 8. Range [1,11]. k=4: hours = 1+2+2+3 = 8 <= 8, feasible → try slower. k=3: 1+2+3+4 = 10 > 8, infeasible → faster. Converges to 4."),
      I("Complexity?",
        'State and justify time and space.'),
      SAY("O(n log m), where n is the number of piles and m is the max pile — log m binary-search steps, each an O(n) feasibility check. O(1) extra space."),
      I("That's the pattern I was fishing for — you searched the answer space, not the array. It shows up constantly in our loops."),
    ],
    rubric: [
      'Recognized binary-search-on-the-answer (feasibility of k is monotonic)',
      'Set correct bounds: k in [1, max(pile)]',
      'Wrote a feasibility check: hours = Σ ceil(pile/k) ≤ h',
      'Used integer ceiling (pile + k − 1)/k, no floating point',
      'Used the leftmost-true template to return the minimum feasible k',
      'Guarded overflow (long sum); stated O(n log m) time',
    ],
    takeaway: 'When the problem asks for a min/max value and "does value v work?" is monotonic (if v works, everything bigger — or smaller — does too), binary search the ANSWER, not the array: write a boolean feasibility check, then leftmost/rightmost-search the value range. Koko, Capacity to Ship Packages, and Split Array Largest Sum are all this one pattern.',
  },

  // ---------------------------------------------------------------------
  'find-first-and-last-position-of-element-in-sorted-array': {
    title: 'Find First and Last Position of Element in Sorted Array',
    difficulty: 'Medium',
    cast: CAST,
    prompt: 'Given a sorted array that may contain duplicates and a target, return the first and last index of target as [first, last], or [-1, -1] if it is not present. Required: O(log n).',
    beats: [
      S('The prompt'),
      I("Sorted array again, but this time it can contain duplicates. Return the first and last index of a target value, or [-1, -1] if it's absent. I want O(log n).",
        'Whether you know the leftmost/rightmost binary-search variant for duplicates.'),
      TH("Duplicates plus 'first and last index' — a plain binary search finds *some* occurrence but not necessarily a boundary. This is the leftmost/rightmost variant: I binary search twice, once biased toward the left, once toward the right.",
        'Duplicates + boundary index → two biased binary searches, leftmost and rightmost.'),
      SAY("I return a two-element array, [-1,-1] if absent. And O(log n) means I can't find one match and scan outward — a big run of duplicates would make that O(n)."),
      I("Right, scan-outward is the trap. So how do you bias the search toward a boundary?",
        'Do you know how to make binary search find a boundary, not just any match.'),
      TH("The twist: when nums[mid] == target, I don't return. For the leftmost search I record the index and keep going left (right = mid − 1) to check for an earlier occurrence. For the rightmost I keep going right (left = mid + 1).",
        'On a match, keep moving toward the boundary instead of returning.'),
      SAY("For the first index, on a match I record it and set right = mid − 1 to keep looking left. For the last index, on a match I set left = mid + 1 to keep looking right. Two O(log n) passes."),
      I("Show me the shared helper — I'd rather you not write the same loop twice.",
        'Will you factor the two near-identical searches into one parameterized helper.'),
      TH("Good push — I'll write one findBound(target, firstFlag) that only differs in which direction it walks on a match. Cleaner and less error-prone.",
        'Factor both searches into one helper that flips direction on a match.'),
      S('Code'),
      CODE(`public int[] searchRange(int[] nums, int target) {
    int first = findBound(nums, target, true);
    if (first == -1) return new int[]{-1, -1};       // absent → skip 2nd search
    int last = findBound(nums, target, false);
    return new int[]{first, last};
}

private int findBound(int[] nums, int target, boolean first) {
    int left = 0, right = nums.length - 1, ans = -1;
    while (left <= right) {
        int mid = left + (right - left) / 2;
        if (nums[mid] == target) {
            ans = mid;                                // remember this hit…
            if (first) right = mid - 1;               // …keep searching left
            else       left  = mid + 1;               // …keep searching right
        } else if (nums[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    return ans;
}`),
      TH("Each pass is the standard template; the only change is that equality drives the search toward the boundary instead of returning immediately.",
        'The sole difference from plain search: equality pushes toward the boundary.'),
      S('Test'),
      SAY("[5,7,7,8,8,10], target 8. The leftmost pass lands on index 3; the rightmost on index 4 → [3,4]."),
      I("And an absent target, say 6?"),
      SAY("Neither pass ever records a hit, so first is −1 and I return [-1,-1] — and I skip the second search entirely in that case."),
      I("Complexity?",
        'State and justify time and space.'),
      SAY("Two O(log n) passes → O(log n) time overall, O(1) space."),
      I("Exactly — biasing the search toward a boundary is the whole idea, and factoring it into one helper is what I like to see."),
    ],
    rubric: [
      'Recognized the leftmost/rightmost variant for duplicates',
      'Rejected find-one-then-scan (O(n) with many duplicates)',
      'Leftmost: on a match, record and go left (right = mid − 1)',
      'Rightmost: on a match, record and go right (left = mid + 1)',
      'Returned [-1,-1] when absent (and skipped the 2nd pass)',
      'Stated O(log n) time and O(1) space',
    ],
    takeaway: 'Duplicates and you need a boundary index? Binary search twice, biased: on equality don\'t return — keep moving toward the boundary (left for first, right for last), remembering the last hit. Never find-one-then-scan; a run of duplicates makes that O(n).',
  },

  // ---------------------------------------------------------------------
  'successful-pairs-of-spells-and-potions': {
    title: 'Successful Pairs of Spells and Potions',
    difficulty: 'Medium',
    cast: CAST,
    prompt: 'Given arrays spells[] and potions[] of positive integers and an integer success, a pair is successful if spell × potion ≥ success. For each spell, return how many potions form a successful pair.',
    beats: [
      S('The prompt'),
      I("You have an array of spells and an array of potions, plus a value called success. A spell-potion pair works if the product of their strengths is at least success. For each spell, return how many potions it can pair with successfully.",
        'Whether you turn a pairing/product condition into a sorted-array + binary-search problem.'),
      TH("Brute force is obvious: for every spell, scan every potion and count the products ≥ success. That's O(n·m). If both arrays are large, that's too slow — the phrasing 'for each spell, count potions' smells like sort-one-and-binary-search-the-other.",
        'Brute force is O(n·m); "for each X, count qualifying Y" hints at a log factor.'),
      SAY("Two quick constraint questions: how large are the arrays, and can the product spell × potion overflow a 32-bit int?"),
      I("Both arrays can be up to 10^5, and strengths up to 10^5 — so yes, the product can blow past int range.",
        'Are you thinking about overflow before writing the comparison.'),
      TH("Product up to 1e5 × 1e5 = 1e10, which overflows int. I must compute spell × potion as a long. Flagging that now so I don't write a silent bug.",
        'spell × potion can reach 1e10 → compute the product as long, not int.'),
      TH("The optimization: for a fixed spell s, a potion p works iff s·p ≥ success. If I SORT the potions, then once a potion is strong enough, every potion to its right also works — the condition is monotonic. So I binary search for the first potion that's strong enough, and the count is (m − that index).",
        'After sorting potions, "qualifies" is monotonic, so the qualifiers are a suffix.'),
      S('Approach'),
      SAY("I'll sort potions once. Then for each spell I binary search for the left-most index where spell × potion ≥ success. If that index is i, then m − i potions qualify."),
      I("Be precise — what exactly are you binary searching for?",
        'Can you state the search target exactly (the leftmost qualifying potion).'),
      SAY("For a given spell, I search the sorted potions for the left-most index where (long) spell × potions[index] ≥ success — the left boundary of the qualifying suffix. Everything from there to the end counts."),
      I("Do you need a threshold like success / spell, or can you avoid the division?",
        'Do you avoid floating-point division and its rounding pitfalls.'),
      TH("I could compute threshold = ceil(success / spell) and search for potions ≥ threshold, but integer ceiling is fiddly and floating-point division risks rounding bugs. Cleaner: binary search comparing the long product directly against success — no division at all.",
        'Comparing the long product directly dodges floating-point ceil/rounding bugs.'),
      SAY("I'll avoid division entirely — I compare the long product against success inside the binary search, so there's no ceil or rounding to get wrong."),
      I("Good. Let's see it."),
      S('Code'),
      CODE(`public int[] successfulPairs(int[] spells, int[] potions, long success) {
    Arrays.sort(potions);
    int m = potions.length;
    int[] ans = new int[spells.length];
    for (int i = 0; i < spells.length; i++) {
        long spell = spells[i];               // long → product won't overflow
        int left = 0, right = m;              // half-open: left-most template
        while (left < right) {
            int mid = left + (right - left) / 2;
            if (spell * potions[mid] >= success) right = mid;   // qualifies → look left
            else                                 left  = mid + 1;
        }
        ans[i] = m - left;                    // potions[left .. m-1] all qualify
    }
    return ans;
}`),
      TH("This is exactly the left-most-insertion-point template: when the product qualifies I move right = mid (this one works, but maybe an earlier one does too); otherwise left = mid + 1. left lands on the first qualifying potion, so m − left is the count.",
        'Left-most insertion-point template: qualifying → shrink right; else raise left.'),
      S('Test'),
      SAY("spells = [5,1,3], potions = [1,2,3,4,5], success = 7. Spell 5: first potion with 5·p ≥ 7 is p=2 at index 1 → 5 − 1 = 4. Spell 1: needs p ≥ 7, none → 0. Spell 3: 3·p ≥ 7 means p ≥ 3, index 2 → 5 − 2 = 3. Answer [4,0,3]."),
      I("Complexity?",
        'State and justify — include the sort.'),
      SAY("Sorting potions is O(m log m). Then n binary searches at O(log m) each → O(n log m). Total O((n + m) log m). Space is O(m) for the sort, O(1) beyond the output otherwise."),
      I("That's it — sort one array, binary search it once per element of the other. It's a pattern you'll reuse constantly."),
    ],
    rubric: [
      'Recognized brute force is O(n·m) and the sizes demand better',
      'Flagged product overflow → compute spell × potion as long',
      'Insight: sort potions so "qualifies" is monotonic (qualifiers form a suffix)',
      'Binary searched the left-most qualifying potion; count = m − index',
      'Avoided floating-point division (compared the long product directly)',
      'Stated O((n + m) log m) time',
    ],
    takeaway: '"For each X, count the Ys satisfying a product/threshold condition" → sort the Ys, then binary search per X. Compare the product in long instead of dividing — that sidesteps both overflow and rounding. The count of qualifiers is m − leftmostQualifyingIndex, using the very same left-most insertion-point template.',
  },

  // ---------------------------------------------------------------------
  'longest-subsequence-with-limited-sum': {
    title: 'Longest Subsequence With Limited Sum',
    difficulty: 'Medium',
    cast: CAST,
    prompt: 'Given nums[] and queries[], for each query return the maximum size of a subsequence of nums whose element sum is ≤ that query value. Queries are independent.',
    beats: [
      S('The prompt'),
      I("For each query you get a budget, and you want the maximum NUMBER of elements you can take from nums — as a subsequence — whose sum stays within that budget. There are many queries. For nums [4,5,2,1] and query 3, the answer is 2, taking [2,1].",
        'Whether you notice a subsequence sum ignores order, which unlocks a greedy choice.'),
      TH("Subsequence means I keep the original order — but order has no effect on the SUM. So really I'm choosing a subset, and I want the most elements with sum ≤ budget. To fit the most elements under a fixed budget, I should take the SMALLEST ones first. That's a greedy sort.",
        'Sum ignores order → to maximize the count under a budget, take the smallest elements first.'),
      SAY("Let me confirm: all elements are positive, 'subsequence' is effectively any subset here since order doesn't change the sum, and each query is answered independently?"),
      I("Correct — all positive, order is irrelevant to the sum, and queries are independent.",
        'Are you confirming positivity — that is exactly what keeps prefix sums monotonic.'),
      TH("Positivity is the load-bearing detail: it makes the prefix sums strictly increasing, which is what lets me binary search them. With negatives or zeros that monotonicity would break.",
        'All-positive values make the prefix sums increasing → binary-searchable.'),
      S('Approach'),
      SAY("Plan: sort nums ascending, then build a prefix-sum array where prefix[k] is the sum of the k smallest elements. Each query then becomes 'what's the largest k with prefix[k] ≤ budget?' — and since prefix is increasing, that's a binary search per query."),
      I("Why precompute the prefix sums instead of just summing per query?",
        'Do you see that m queries force you to preprocess once rather than re-sum each time.'),
      TH("With up to 1000 queries, re-summing per query is O(n) each → O(n·m). Prefix sums cost O(n) once, then every query is O(log n). Classic preprocess-once, answer-many.",
        'Preprocess prefix sums once so each of m queries is O(log n), not O(n).'),
      SAY("Because there are many queries — re-summing per query is O(n·m). I build prefix sums once, then each query is a O(log n) binary search."),
      I("What exactly are you binary searching for — and which template?",
        'Can you state the search target and map it to a template you know.'),
      TH("I want the largest k with prefix[k] ≤ q. With my one 'find first true' template, I search for the first k where prefix[k] > q — the first prefix that BUSTS the budget — and the answer is left − 1. That's the maximum flip: find the first infeasible, take left − 1.",
        'Greedy-maximum via the unified template: first k with prefix[k] > q, answer = left − 1.'),
      SAY("I'll use my standard template to find the first k where prefix[k] > q — the first over-budget prefix — and the answer is left − 1, the largest k that still fits."),
      I("Any overflow concern on the prefix sums?",
        'Did you bound the maximum prefix sum against int range.'),
      TH("n ≤ 1000 and nums[i] ≤ 1e6, so the max prefix sum is about 1e9 — just under int's ~2.1e9 limit. It fits in int, but it's close, so I'll use long as the safe habit.",
        'Max prefix ≈ 1000 × 1e6 = 1e9 < 2.1e9, so int holds — long is the safe default.'),
      SAY("The max prefix sum is around 1e9, just under int's limit, so int works — but I'll use long to be safe."),
      I("Good instincts. Let's see it."),
      S('Code'),
      CODE(`public int[] answerQueries(int[] nums, int[] queries) {
    Arrays.sort(nums);                       // smallest elements first
    int n = nums.length;
    long[] prefix = new long[n + 1];         // prefix[k] = sum of k smallest
    for (int i = 0; i < n; i++) prefix[i + 1] = prefix[i] + nums[i];

    int[] ans = new int[queries.length];
    for (int i = 0; i < queries.length; i++) {
        long q = queries[i];
        int left = 0, right = n + 1;         // search k over [0, n]
        while (left < right) {               // first k with prefix[k] > q
            int mid = left + (right - left) / 2;
            if (prefix[mid] > q) right = mid;
            else                 left  = mid + 1;
        }
        ans[i] = left - 1;                    // largest k that fits the budget
    }
    return ans;
}`),
      TH("prefix has length n+1 with prefix[0] = 0 (taking zero elements), and I search k over [0, n], so the answer can be anywhere from 0 up to n.",
        'prefix[0] = 0 (empty pick); searching k over [0, n] makes every answer 0..n reachable.'),
      S('Test'),
      SAY("nums [4,5,2,1] → sorted [1,2,4,5], prefix [0,1,3,7,12]. Query 3: first prefix > 3 is prefix[3]=7, left=3, answer 3 − 1 = 2. Query 10: first > 10 is prefix[4]=12, left=4, answer 3. Query 21: nothing exceeds, left=5, answer 4. → [2,3,4]."),
      TH("Sanity on example 2: nums [2,3,4,5], prefix [0,2,5,9,14], query 1 → first prefix > 1 is prefix[1]=2, left=1, answer 0. The empty subsequence, correct — the prefix[0]=0 base makes that fall out for free.",
        'The prefix[0] = 0 base makes the empty-subsequence answer (0) come out naturally.'),
      I("Complexity?",
        'State and justify, separating preprocessing from per-query cost.'),
      SAY("Sorting is O(n log n), building prefix O(n). Then m queries at O(log n) each → O(m log n). Total O((n + m) log n), with O(n) extra space for the prefix array."),
      I("Exactly right — sort, prefix, binary search per query. It's the classic 'offline queries' shape, and you nailed the greedy-plus-monotonic reasoning."),
    ],
    rubric: [
      'Saw that a subsequence sum ignores order → take the smallest elements first',
      'Noted all-positive → prefix sums are increasing → binary-searchable',
      'Preprocessed prefix sums once (avoids O(n·m) re-summing across queries)',
      'Binary searched each query for the largest k with prefix[k] ≤ q (first over-budget, answer left − 1)',
      'Handled prefix[0]=0 / empty subsequence and the int-vs-long bound',
      'Stated O((n + m) log n) time and O(n) space',
    ],
    takeaway: 'Many queries + "max count under a budget" → sort, prefix-sum, binary search per query. The sum ignores order so greedily take the smallest; positivity makes the prefixes monotonic. It is the greedy-maximum use of the one template: find the first prefix that busts the budget, answer = left − 1. Preprocess once, answer each query in O(log n).',
  },
}

export function mindsetFor(id) {
  return MINDSETS[id] || null
}

export function hasMindset(id) {
  return Boolean(MINDSETS[id])
}

export default MINDSETS
