// LLD "start here" primer — the fundamentals to know before attempting any
// low-level / object-oriented design question. Beginner-friendly.

export const whatIsLLD =
  'Low-Level Design (LLD) is object-oriented design: given a concrete system (a parking lot, a vending machine, a file system), model the classes, their relationships, and their methods so the design is clean and easy to extend. For SDE I it is NOT distributed-systems / high-level design (load balancers, sharding) — that comes at SDE II+. The interview tests how you think in objects and tradeoffs, not how much code you write.'

export const oopPillars = [
  {
    name: 'Encapsulation',
    what: 'Bundle data with the methods that operate on it, and hide the internals behind a clean interface (private fields, public methods). Callers can’t reach in and break invariants.',
    code: `class BankAccount:
    def __init__(self):
        self.__balance = 0          # private field
    def deposit(self, amt):         # controlled access
        if amt <= 0: raise ValueError("bad amount")
        self.__balance += amt
    def get_balance(self):
        return self.__balance

acc = BankAccount()
acc.deposit(100)
# acc.__balance = -5   # blocked — invariant stays safe`,
  },
  {
    name: 'Abstraction',
    what: 'Expose the essential behavior and hide the details. Program to an interface (“a PaymentMethod”), not a concrete class (“a CreditCard”).',
    code: `class PaymentMethod(ABC):
    @abstractmethod
    def pay(self, amount): ...

class CreditCard(PaymentMethod):
    def pay(self, amount): charge_card(amount)
class Wallet(PaymentMethod):
    def pay(self, amount): debit_wallet(amount)

def checkout(method: PaymentMethod, total):
    method.pay(total)   # doesn't care which concrete type`,
  },
  {
    name: 'Inheritance',
    what: 'A subclass reuses/extends a base class — an “is-a” relationship (a Car is a Vehicle). Use sparingly; prefer composition when it’s really “has-a”.',
    code: `class Vehicle:
    def __init__(self, plate): self.plate = plate
    def start(self): print("vroom")

class Car(Vehicle):          # Car IS-A Vehicle
    def open_trunk(self): ...

Car("KA-01").start()         # reused from Vehicle`,
  },
  {
    name: 'Polymorphism',
    what: 'One interface, many implementations — the same call (spot.can_fit(vehicle)) behaves differently per subtype. Lets you add new types without changing callers.',
    code: `class ParkingSpot(ABC):
    @abstractmethod
    def can_fit(self, v): ...

class CompactSpot(ParkingSpot):
    def can_fit(self, v): return v.size <= SMALL
class LargeSpot(ParkingSpot):
    def can_fit(self, v): return True

for spot in spots:           # same call, different behavior
    if spot.can_fit(vehicle): assign(spot); break`,
  },
]

export const solid = [
  {
    letter: 'S', name: 'Single Responsibility', idea: 'A class should have one reason to change — one job.',
    smell: 'A “god class” doing parsing + storage + printing.',
    code: `# BAD: one class, three jobs
class Report:
    def parse(self): ...
    def save_to_db(self): ...
    def render_html(self): ...

# GOOD: one responsibility each
class ReportParser: ...
class ReportRepository: ...   # persistence
class ReportRenderer: ...     # presentation`,
  },
  {
    letter: 'O', name: 'Open/Closed', idea: 'Open for extension, closed for modification — add behavior via new classes, not by editing old ones.',
    smell: 'A giant if/switch you edit every time a new type appears.',
    code: `# BAD: edit this for every new shape
def area(shape):
    if shape.type == "circle": ...
    elif shape.type == "square": ...

# GOOD: add a new subclass, touch nothing existing
class Shape(ABC):
    @abstractmethod
    def area(self): ...
class Circle(Shape):
    def area(self): return 3.14 * self.r ** 2
class Square(Shape):
    def area(self): return self.s * self.s`,
  },
  {
    letter: 'L', name: 'Liskov Substitution', idea: 'A subclass must be usable anywhere its base type is expected, without surprises.',
    smell: 'A subclass that throws on a method the base promised (Square extends Rectangle).',
    code: `# BAD: Square breaks Rectangle's contract
class Rectangle:
    def set_w(self, w): self.w = w
    def set_h(self, h): self.h = h
class Square(Rectangle):
    def set_w(self, w): self.w = self.h = w   # surprises callers!

# GOOD: don't force the is-a; give them a common base (Shape)
# so a Square can't be passed where a resizable Rectangle is expected.`,
  },
  {
    letter: 'I', name: 'Interface Segregation', idea: 'Many small, focused interfaces beat one fat interface clients don’t fully use.',
    smell: 'Implementing an interface with methods you leave empty / unsupported.',
    code: `# BAD: fat interface forces unused methods
class Machine(ABC):
    def print(self): ...
    def scan(self): ...
    def fax(self): ...
class OldPrinter(Machine):
    def scan(self): raise NotImplementedError   # forced & unused

# GOOD: small, focused interfaces
class Printer(ABC):
    @abstractmethod
    def print(self): ...
class Scanner(ABC):
    @abstractmethod
    def scan(self): ...`,
  },
  {
    letter: 'D', name: 'Dependency Inversion', idea: 'Depend on abstractions, not concretions — high-level code shouldn’t hard-wire low-level classes.',
    smell: 'A class that news its collaborators instead of receiving them (inject the interface).',
    code: `# BAD: high-level code hard-wires a low-level class
class OrderService:
    def __init__(self):
        self.db = MySQLDatabase()      # can't swap or test

# GOOD: depend on an abstraction, inject it
class Database(ABC): ...
class OrderService:
    def __init__(self, db: Database):  # any Database works
        self.db = db`,
  },
]

export const supporting =
  'Also live by DRY (Don’t Repeat Yourself), KISS (Keep It Simple), and YAGNI (You Aren’t Gonna Need It — don’t build speculative features).'

export const relationships = [
  {
    name: 'Association', meaning: 'One class uses/knows another (“uses-a”); both exist independently.', example: 'Driver uses a Car.',
    code: `class Driver:
    def drive(self, car: Car):   # knows/uses a Car
        car.start()`,
  },
  {
    name: 'Aggregation', meaning: 'A “has-a” where the part can outlive the whole (weak ownership).', example: 'A Team has Players; players exist without the team.',
    code: `class Team:
    def __init__(self, players):
        self.players = players   # passed in; live on if team is gone`,
  },
  {
    name: 'Composition', meaning: 'A “has-a” where the part dies with the whole (strong ownership).', example: 'A House has Rooms; no house, no rooms.',
    code: `class House:
    def __init__(self):
        self.rooms = [Room(), Room()]   # created & owned here;
                                        # gone when the house is gone`,
  },
  {
    name: 'Inheritance (is-a)', meaning: 'A subtype specializes a base type.', example: 'A Motorcycle is a Vehicle.',
    code: `class Vehicle: ...
class Motorcycle(Vehicle):   # Motorcycle IS-A Vehicle
    ...`,
  },
  {
    name: 'Dependency', meaning: 'A transient reference — one class takes another as a parameter / uses it briefly.', example: 'OrderService depends on a PaymentGateway passed in.',
    code: `class OrderService:
    def checkout(self, gateway: PaymentGateway):  # used briefly
        gateway.charge(self.total)`,
  },
]

export const patterns = {
  Creational: [
    {
      name: 'Singleton', oneLiner: 'Exactly one shared instance with a global access point.', useWhen: 'A single registry/controller (the ParkingLot, the machine).',
      code: `class ParkingLot:
    _instance = None
    @classmethod
    def instance(cls):
        if cls._instance is None:
            cls._instance = cls()
        return cls._instance

ParkingLot.instance()   # same object every time`,
    },
    {
      name: 'Factory Method', oneLiner: 'A method decides which concrete class to instantiate.', useWhen: 'Creation depends on a type/enum (make a Spot for a vehicle type).',
      code: `def make_spot(vtype):
    return {
        "motorcycle": MotorcycleSpot,
        "car": CompactSpot,
        "truck": LargeSpot,
    }[vtype]()          # caller doesn't name the concrete class`,
    },
    {
      name: 'Builder', oneLiner: 'Assemble a complex object step by step.', useWhen: 'Many optional fields / staged construction (a pizza, a query).',
      code: `class PizzaBuilder:
    def __init__(self): self.toppings = []
    def add(self, t): self.toppings.append(t); return self  # chain
    def build(self): return Pizza(self.toppings)

pizza = PizzaBuilder().add("cheese").add("olives").build()`,
    },
  ],
  Structural: [
    {
      name: 'Adapter', oneLiner: 'Wrap an incompatible interface to look like the one you need.', useWhen: 'Integrating a third-party/legacy API.',
      code: `class LegacyPrinter:
    def print_doc(self, text): ...        # wrong method name

class PrinterAdapter(Printer):            # the interface we want
    def __init__(self, legacy): self.legacy = legacy
    def print(self, text):
        self.legacy.print_doc(text)       # translate the call`,
    },
    {
      name: 'Composite', oneLiner: 'Treat individual objects and groups uniformly (a tree).', useWhen: 'Part-whole hierarchies — a file system (File/Directory).',
      code: `class Entry(ABC):
    @abstractmethod
    def size(self): ...
class File(Entry):
    def size(self): return self._size
class Directory(Entry):
    def __init__(self): self.children = []
    def size(self):                       # same call as a File
        return sum(c.size() for c in self.children)`,
    },
    {
      name: 'Decorator', oneLiner: 'Add behavior by wrapping, not subclassing.', useWhen: 'Optional add-ons (coffee + milk + sugar; toppings).',
      code: `class Coffee:
    def cost(self): return 2
class MilkDecorator:
    def __init__(self, c): self.c = c
    def cost(self): return self.c.cost() + 0.5

MilkDecorator(Coffee()).cost()   # 2.5 — no subclass explosion`,
    },
    {
      name: 'Facade', oneLiner: 'One simple entry point over a complex subsystem.', useWhen: 'Hide messy internals behind a clean API.',
      code: `class OrderFacade:
    def place(self, cart):
        Inventory().reserve(cart)
        Payment().charge(cart)
        Shipping().schedule(cart)   # one call hides 3 subsystems`,
    },
  ],
  Behavioral: [
    {
      name: 'Strategy', oneLiner: 'Swap an algorithm at runtime behind a common interface.', useWhen: 'Pluggable policies — pricing, spot allocation, eviction, sorting.',
      code: `class PricingStrategy(ABC):
    @abstractmethod
    def price(self, hours): ...
class FlatRate(PricingStrategy):
    def price(self, hours): return 5 * hours
class Weekend(PricingStrategy):
    def price(self, hours): return 3 * hours

lot.pricing = FlatRate()     # swap the algorithm at runtime`,
    },
    {
      name: 'State', oneLiner: 'Behavior changes with an internal state object.', useWhen: 'A lifecycle/state machine — vending machine, ATM, order status.',
      code: `class VendingMachine:
    def __init__(self): self.state = IdleState(self)
    def insert(self, coin): self.state.insert(coin)

class IdleState:
    def __init__(self, m): self.m = m
    def insert(self, coin):
        self.m.state = HasMoneyState(self.m)   # transition`,
    },
    {
      name: 'Observer', oneLiner: 'Subscribers get notified when a subject changes.', useWhen: 'Events/notifications — display boards, alerts, pub-sub.',
      code: `class Board:                       # observer
    def update(self, free): print("free:", free)

class ParkingLot:                 # subject
    def __init__(self): self.observers = []
    def _notify(self):
        for o in self.observers: o.update(self.free)`,
    },
    {
      name: 'Command', oneLiner: 'Wrap a request as an object (supports queue/undo).', useWhen: 'Undo/redo, job queues, remote requests.',
      code: `class AddText:
    def __init__(self, doc, text): self.doc, self.text = doc, text
    def execute(self): self.doc.append(self.text)
    def undo(self): self.doc.remove(self.text)

history.append(cmd); cmd.execute()   # cmd.undo() later`,
    },
    {
      name: 'Iterator', oneLiner: 'Traverse a collection without exposing its internals.', useWhen: 'Custom iteration order over your structure.',
      code: `class Playlist:
    def __init__(self): self._songs = []
    def __iter__(self):
        for s in self._songs:   # internals stay hidden
            yield s

for song in playlist: play(song)`,
    },
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
