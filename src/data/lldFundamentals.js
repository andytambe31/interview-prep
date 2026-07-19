// LLD "start here" primer — the fundamentals to know before attempting any
// low-level / object-oriented design question. Beginner-friendly.

export const whatIsLLD =
  'Low-Level Design (LLD) is object-oriented design: given a concrete system (a parking lot, a vending machine, a file system), model the classes, their relationships, and their methods so the design is clean and easy to extend. For SDE I it is NOT distributed-systems / high-level design (load balancers, sharding) — that comes at SDE II+. The interview tests how you think in objects and tradeoffs, not how much code you write.'

export const oopPillars = [
  { name: 'Encapsulation', what: 'Bundle data with the methods that operate on it, and hide the internals behind a clean interface (private fields, public methods). Callers can’t reach in and break invariants.' },
  { name: 'Abstraction', what: 'Expose the essential behavior and hide the details. Program to an interface (“a PaymentMethod”), not a concrete class (“a CreditCard”).' },
  { name: 'Inheritance', what: 'A subclass reuses/extends a base class — an “is-a” relationship (a Car is a Vehicle). Use sparingly; prefer composition when it’s really “has-a”.' },
  { name: 'Polymorphism', what: 'One interface, many implementations — the same call (spot.canFit(vehicle)) behaves differently per subtype. Lets you add new types without changing callers.' },
]

export const solid = [
  { letter: 'S', name: 'Single Responsibility', idea: 'A class should have one reason to change — one job.', smell: 'A “god class” doing parsing + storage + printing.' },
  { letter: 'O', name: 'Open/Closed', idea: 'Open for extension, closed for modification — add behavior via new classes, not by editing old ones.', smell: 'A giant if/switch you edit every time a new type appears.' },
  { letter: 'L', name: 'Liskov Substitution', idea: 'A subclass must be usable anywhere its base type is expected, without surprises.', smell: 'A subclass that throws on a method the base promised (Square extends Rectangle).' },
  { letter: 'I', name: 'Interface Segregation', idea: 'Many small, focused interfaces beat one fat interface clients don’t fully use.', smell: 'Implementing an interface with methods you leave empty / unsupported.' },
  { letter: 'D', name: 'Dependency Inversion', idea: 'Depend on abstractions, not concretions — high-level code shouldn’t hard-wire low-level classes.', smell: 'A class that `new`s its collaborators instead of receiving them (inject the interface).' },
]

export const supporting =
  'Also live by DRY (Don’t Repeat Yourself), KISS (Keep It Simple), and YAGNI (You Aren’t Gonna Need It — don’t build speculative features).'

export const relationships = [
  { name: 'Association', meaning: 'One class uses/knows another (“uses-a”).', example: 'Driver uses a Car.' },
  { name: 'Aggregation', meaning: 'A “has-a” where the part can outlive the whole (weak ownership).', example: 'A Team has Players; players exist without the team.' },
  { name: 'Composition', meaning: 'A “has-a” where the part dies with the whole (strong ownership).', example: 'A House has Rooms; no house, no rooms.' },
  { name: 'Inheritance (is-a)', meaning: 'A subtype specializes a base type.', example: 'A Motorcycle is a Vehicle.' },
  { name: 'Dependency', meaning: 'A transient reference — one class takes another as a parameter / uses it briefly.', example: 'OrderService depends on a PaymentGateway passed in.' },
]

export const patterns = {
  Creational: [
    { name: 'Singleton', oneLiner: 'Exactly one shared instance with a global access point.', useWhen: 'A single registry/controller (the ParkingLot, the machine).' },
    { name: 'Factory Method', oneLiner: 'A method decides which concrete class to instantiate.', useWhen: 'Creation depends on a type/enum (make a Spot for a vehicle type).' },
    { name: 'Builder', oneLiner: 'Assemble a complex object step by step.', useWhen: 'Many optional fields / staged construction (a pizza, a query).' },
  ],
  Structural: [
    { name: 'Adapter', oneLiner: 'Wrap an incompatible interface to look like the one you need.', useWhen: 'Integrating a third-party/legacy API.' },
    { name: 'Composite', oneLiner: 'Treat individual objects and groups uniformly (a tree).', useWhen: 'Part-whole hierarchies — a file system (File/Directory).' },
    { name: 'Decorator', oneLiner: 'Add behavior by wrapping, not subclassing.', useWhen: 'Optional add-ons (coffee + milk + sugar; toppings).' },
    { name: 'Facade', oneLiner: 'One simple entry point over a complex subsystem.', useWhen: 'Hide messy internals behind a clean API.' },
  ],
  Behavioral: [
    { name: 'Strategy', oneLiner: 'Swap an algorithm at runtime behind a common interface.', useWhen: 'Pluggable policies — pricing, spot allocation, eviction, sorting.' },
    { name: 'State', oneLiner: 'Behavior changes with an internal state object.', useWhen: 'A lifecycle/state machine — vending machine, ATM, order status.' },
    { name: 'Observer', oneLiner: 'Subscribers get notified when a subject changes.', useWhen: 'Events/notifications — display boards, alerts, pub-sub.' },
    { name: 'Command', oneLiner: 'Wrap a request as an object (supports queue/undo).', useWhen: 'Undo/redo, job queues, remote requests.' },
    { name: 'Iterator', oneLiner: 'Traverse a collection without exposing its internals.', useWhen: 'Custom iteration order over your structure.' },
  ],
}

export const approach = [
  'Clarify requirements & scope (5–8 min): functional needs, constraints, what’s explicitly out of scope. State assumptions out loud.',
  'Identify the core entities → classes. Nouns become classes; use enums for fixed categories (spot types, states).',
  'Define relationships: is-a (inheritance) vs has-a (composition/aggregation); draw the class relationships.',
  'Define the public methods / APIs and the main flows (e.g., park(), unpark()).',
  'Apply design patterns where they fit naturally — name them and justify (Strategy for pricing, State for lifecycle). Don’t force patterns.',
  'Handle constraints, edge cases, and concurrency; design for extensibility so new types plug in without rewrites (Open/Closed).',
  'Talk through the whole time; write class skeletons. Go breadth-first, then deep on one area.',
]

export const beginnerMistakes = [
  'Jumping to code before clarifying requirements and listing classes.',
  'Overusing inheritance where composition fits (favor “has-a”).',
  'Forcing design patterns to show off instead of solving the actual need.',
  'One “god class” that does everything (violates Single Responsibility).',
  'Ignoring extensibility — hard-coding types so a new one means editing everything.',
  'Silence — not narrating your reasoning and tradeoffs as you go.',
]

export const learningOrder =
  'Suggested order: OOP pillars → SOLID (+ DRY/KISS/YAGNI) → UML relationships → the high-frequency patterns and their triggers → solve Parking Lot & Vending Machine with the framework → then Elevator, ATM, LRU Cache. Practice out loud and time-boxed.'

// Best places to learn LLD (from research; free first, then paid, then books).
export const resources = [
  { title: 'ashishps1/awesome-low-level-design (GitHub) — free', url: 'https://github.com/ashishps1/awesome-low-level-design', note: 'The best single free starting point: OOP, SOLID, UML, all patterns, and 30+ solved problems.' },
  { title: 'Refactoring.Guru — Design Patterns — free', url: 'https://refactoring.guru/design-patterns/catalog', note: 'The clearest illustrated guide to every pattern, with intent + when-to-use.' },
  { title: 'GeeksforGeeks — How to Prepare for LLD — free', url: 'https://www.geeksforgeeks.org/how-to-prepare-for-low-level-design-interviews/', note: 'Good free breadth and worked examples.' },
  { title: 'Hello Interview — Low Level Design in a Hurry — free', url: 'https://www.hellointerview.com/learn/low-level-design', note: 'Concise interview framework.' },
  { title: 'Grokking the LLD Interview (Educative / Design Gurus) — paid', url: 'https://www.educative.io/courses/grokking-the-low-level-design-interview-using-ood-principles', note: 'Structured self-paced OOD course.' },
  { title: 'Book — Head First Design Patterns', url: 'https://www.oreilly.com/library/view/head-first-design/9781492077992/', note: 'The friendliest intro to patterns.' },
]
