// What Amazon expects of an SDE I (L4) — so you can prepare to the bar.
// Representative of the Amazon University Talent Acquisition SDE I req family.
// Amazon.jobs was blocked during research; quals are stable boilerplate that
// recurs across SDE I postings — treat wording as representative, not verbatim.

export const role = {
  program: 'Amazon University Talent Acquisition · Software Development Engineer I (L4)',
  forWho: 'New grads — Bachelor’s/Master’s in CS or related, graduating ~Oct 2025 – Sept 2026 (or within the last ~24 months).',

  responsibilities: [
    'Own the full lifecycle of your code — design, implementation, testing, deployment, and operations ("you build it, you run it").',
    'Write clean, tested, maintainable code and follow established design patterns.',
    'Debug and resolve production issues (with mentorship), often on an on-call rotation.',
    'Collaborate with PMs, senior SDEs and other teams in technical design discussions.',
    'Deliver well-defined features/components on schedule for products used by millions.',
  ],

  basicQuals: [
    'Bachelor’s/graduate degree in CS, CE, Data Science, or a related STEM field (grad window ~Oct 2025 – Sept 2026, or within 24 months).',
    'Experience with at least one general-purpose language: Java, Python, C++, C#, Go, Rust, or TypeScript.',
    'CS fundamentals: data structures, algorithms, object-oriented design, problem solving, and complexity analysis.',
  ],

  preferredQuals: [
    'Previous technical internship(s) or equivalent hands-on project experience.',
    'Exposure to distributed / multi-tiered systems, algorithms, and relational databases.',
    'Ability to articulate technical tradeoffs clearly and work with ambiguous, undefined problems.',
  ],

  // What the loop actually weighs for a new grad.
  evaluation: [
    { area: 'Coding / DSA', weight: 'Primary gate', note: 'Two dedicated rounds. The biggest technical share — and the OA coding score often gates the whole pipeline.' },
    { area: 'Leadership Principles', weight: 'Co-equal with coding', note: 'Probed in EVERY round and often decides the outcome. Do not treat it as a formality.' },
    { area: 'Object-oriented design', weight: 'Meaningful, lighter than L5', note: 'Clean class modeling and tradeoff talk — not full distributed-system design.' },
  ],

  // The bar you're measured against for promotion is the L5 column — start
  // showing ownership beyond assigned tasks early.
  leveling: [
    { dim: 'Scope', l4: 'Owns small features/components within a service', l5: 'Owns medium components / whole services' },
    { dim: 'Ownership', l4: 'Delivers defined tasks; debugs prod with mentorship', l5: 'Runs own workload with minimal supervision' },
    { dim: 'Ambiguity', l4: 'Works within defined tasks, guidance from seniors', l5: 'Handles ambiguity; influences team decisions' },
    { dim: 'Influence', l4: 'Contributes to team; ramping on tools', l5: 'Mentors L4s; coordinates cross-team work' },
  ],

  // Boston Seaport hub org families — match your "why this team" to whichever
  // the recruiter names.
  bostonDomains: [
    { name: 'AWS', note: 'Distributed systems, scale/latency, service ownership + on-call. Strongest DSA/systems bar.' },
    { name: 'Alexa / Devices', note: 'Speech/ML-adjacent, embedded + cloud, real-time. Customer Obsession heavily tested.' },
    { name: 'Amazon Pharmacy', note: 'Healthcare data, correctness/compliance. Highest-Standards + Earn Trust emphasis.' },
    { name: 'Robotics', note: 'Fulfillment automation, real-time control, ML (North Reading / Westborough MA).' },
  ],
}
