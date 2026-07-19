// LLD "start here" primer — the fundamentals to know before attempting any
// low-level / object-oriented design question. Beginner-friendly. Code in Java.

export const whatIsLLD =
  'Low-Level Design (LLD) is object-oriented design: given a concrete system (a parking lot, a vending machine, a file system), model the classes, their relationships, and their methods so the design is clean and easy to extend. For SDE I it is NOT distributed-systems / high-level design (load balancers, sharding) — that comes at SDE II+. The interview tests how you think in objects and tradeoffs, not how much code you write.'

export const oopPillars = [
  {
    name: 'Encapsulation',
    what: 'Bundle data with the methods that operate on it, and hide the internals behind a clean interface (private fields, public methods). Callers can’t reach in and break invariants.',
    code: `class BankAccount {
    private int balance = 0;                 // hidden field
    public void deposit(int amt) {           // controlled access
        if (amt <= 0) throw new IllegalArgumentException();
        balance += amt;
    }
    public int getBalance() { return balance; }
}
// acc.balance = -5;  // won't compile — invariant stays safe`,
  },
  {
    name: 'Abstraction',
    what: 'Expose the essential behavior and hide the details. Program to an interface (“a PaymentMethod”), not a concrete class (“a CreditCard”).',
    code: `interface PaymentMethod { void pay(int amount); }

class CreditCard implements PaymentMethod {
    public void pay(int amount) { chargeCard(amount); }
}
class Wallet implements PaymentMethod {
    public void pay(int amount) { debitWallet(amount); }
}

void checkout(PaymentMethod method, int total) {
    method.pay(total);   // doesn't care which concrete type
}`,
  },
  {
    name: 'Inheritance',
    what: 'A subclass reuses/extends a base class — an “is-a” relationship (a Car is a Vehicle). Use sparingly; prefer composition when it’s really “has-a”.',
    code: `class Vehicle {
    String plate;
    Vehicle(String plate) { this.plate = plate; }
    void start() { System.out.println("vroom"); }
}
class Car extends Vehicle {          // Car IS-A Vehicle
    Car(String p) { super(p); }
    void openTrunk() { }
}
new Car("KA-01").start();            // reused from Vehicle`,
  },
  {
    name: 'Polymorphism',
    what: 'One interface, many implementations — the same call (spot.canFit(vehicle)) behaves differently per subtype. Lets you add new types without changing callers.',
    code: `abstract class ParkingSpot {
    abstract boolean canFit(Vehicle v);
}
class CompactSpot extends ParkingSpot {
    boolean canFit(Vehicle v) { return v.size <= SMALL; }
}
class LargeSpot extends ParkingSpot {
    boolean canFit(Vehicle v) { return true; }
}
for (ParkingSpot spot : spots)       // same call, different behavior
    if (spot.canFit(vehicle)) { assign(spot); break; }`,
  },
]

export const solid = [
  {
    letter: 'S', name: 'Single Responsibility', idea: 'A class should have one reason to change — one job.',
    smell: 'A “god class” doing parsing + storage + printing.',
    code: `// BAD: one class, three jobs
class Report {
    void parse() { }
    void saveToDb() { }
    void renderHtml() { }
}
// GOOD: one responsibility each
class ReportParser { }
class ReportRepository { }   // persistence
class ReportRenderer { }     // presentation`,
  },
  {
    letter: 'O', name: 'Open/Closed', idea: 'Open for extension, closed for modification — add behavior via new classes, not by editing old ones.',
    smell: 'A giant if/switch you edit every time a new type appears.',
    code: `// BAD: edit this for every new shape
double area(Shape s) {
    if (s.type == CIRCLE) { ... }
    else if (s.type == SQUARE) { ... }
}
// GOOD: add a subclass, touch nothing existing
interface Shape { double area(); }
class Circle implements Shape {
    public double area() { return Math.PI * r * r; }
}
class Square implements Shape {
    public double area() { return s * s; }
}`,
  },
  {
    letter: 'L', name: 'Liskov Substitution', idea: 'A subclass must be usable anywhere its base type is expected, without surprises.',
    smell: 'A subclass that throws on a method the base promised (Square extends Rectangle).',
    code: `// BAD: Square breaks Rectangle's contract
class Rectangle {
    void setW(int w) { this.w = w; }
    void setH(int h) { this.h = h; }
}
class Square extends Rectangle {
    void setW(int w) { this.w = this.h = w; }  // surprises callers!
}
// GOOD: don't force the is-a; give both a common Shape base
// so a Square can't stand in for a resizable Rectangle.`,
  },
  {
    letter: 'I', name: 'Interface Segregation', idea: 'Many small, focused interfaces beat one fat interface clients don’t fully use.',
    smell: 'Implementing an interface with methods you leave empty / unsupported.',
    code: `// BAD: fat interface forces unused methods
interface Machine { void print(); void scan(); void fax(); }
class OldPrinter implements Machine {
    public void print() { }
    public void scan() { throw new UnsupportedOperationException(); }
    public void fax()  { throw new UnsupportedOperationException(); }
}
// GOOD: small, focused interfaces
interface Printer { void print(); }
interface Scanner { void scan(); }`,
  },
  {
    letter: 'D', name: 'Dependency Inversion', idea: 'Depend on abstractions, not concretions — high-level code shouldn’t hard-wire low-level classes.',
    smell: 'A class that constructs its collaborators instead of receiving them (inject the interface).',
    code: `// BAD: high-level code hard-wires a low-level class
class OrderService {
    private Database db = new MySQLDatabase();   // can't swap or test
}
// GOOD: depend on an abstraction, inject it
interface Database { }
class OrderService {
    private final Database db;
    OrderService(Database db) { this.db = db; }  // any Database works
}`,
  },
]

export const supporting =
  'Also live by DRY (Don’t Repeat Yourself), KISS (Keep It Simple), and YAGNI (You Aren’t Gonna Need It — don’t build speculative features).'

export const relationships = [
  {
    name: 'Association', meaning: 'One class uses/knows another (“uses-a”); both exist independently.', example: 'Driver uses a Car.',
    code: `class Driver {
    void drive(Car car) {   // knows/uses a Car
        car.start();
    }
}`,
  },
  {
    name: 'Aggregation', meaning: 'A “has-a” where the part can outlive the whole (weak ownership).', example: 'A Team has Players; players exist without the team.',
    code: `class Team {
    private List<Player> players;
    Team(List<Player> players) {   // passed in; live on if team is gone
        this.players = players;
    }
}`,
  },
  {
    name: 'Composition', meaning: 'A “has-a” where the part dies with the whole (strong ownership).', example: 'A House has Rooms; no house, no rooms.',
    code: `class House {
    // created & owned here; gone when the House is gone
    private final List<Room> rooms = List.of(new Room(), new Room());
}`,
  },
  {
    name: 'Inheritance (is-a)', meaning: 'A subtype specializes a base type.', example: 'A Motorcycle is a Vehicle.',
    code: `class Vehicle { }
class Motorcycle extends Vehicle { }   // Motorcycle IS-A Vehicle`,
  },
  {
    name: 'Dependency', meaning: 'A transient reference — one class takes another as a parameter / uses it briefly.', example: 'OrderService depends on a PaymentGateway passed in.',
    code: `class OrderService {
    void checkout(PaymentGateway gateway) {   // used briefly
        gateway.charge(total);
    }
}`,
  },
]

export const patterns = {
  Creational: [
    {
      name: 'Singleton', oneLiner: 'Exactly one shared instance with a global access point.', useWhen: 'A single registry/controller (the ParkingLot, the machine).',
      code: `class ParkingLot {
    private static ParkingLot instance;
    private ParkingLot() { }
    public static ParkingLot getInstance() {
        if (instance == null) instance = new ParkingLot();
        return instance;              // same object every time
    }
}`,
    },
    {
      name: 'Factory Method', oneLiner: 'A method decides which concrete class to instantiate.', useWhen: 'Creation depends on a type/enum (make a Spot for a vehicle type).',
      code: `static ParkingSpot makeSpot(VehicleType type) {
    switch (type) {
        case MOTORCYCLE: return new MotorcycleSpot();
        case CAR:        return new CompactSpot();
        default:         return new LargeSpot();
    }                                 // caller never names the class
}`,
    },
    {
      name: 'Builder', oneLiner: 'Assemble a complex object step by step.', useWhen: 'Many optional fields / staged construction (a pizza, a query).',
      code: `class PizzaBuilder {
    private List<String> toppings = new ArrayList<>();
    PizzaBuilder add(String t) { toppings.add(t); return this; } // chain
    Pizza build() { return new Pizza(toppings); }
}
Pizza p = new PizzaBuilder().add("cheese").add("olives").build();`,
    },
  ],
  Structural: [
    {
      name: 'Adapter', oneLiner: 'Wrap an incompatible interface to look like the one you need.', useWhen: 'Integrating a third-party/legacy API.',
      code: `class LegacyPrinter {
    void printDoc(String text) { }          // wrong method name
}
class PrinterAdapter implements Printer {   // the interface we want
    private LegacyPrinter legacy;
    PrinterAdapter(LegacyPrinter l) { legacy = l; }
    public void print(String text) {
        legacy.printDoc(text);              // translate the call
    }
}`,
    },
    {
      name: 'Composite', oneLiner: 'Treat individual objects and groups uniformly (a tree).', useWhen: 'Part-whole hierarchies — a file system (File/Directory).',
      code: `interface Entry { int size(); }
class File implements Entry {
    public int size() { return size; }
}
class Directory implements Entry {
    private List<Entry> children = new ArrayList<>();
    public int size() {                     // same call as a File
        int s = 0;
        for (Entry c : children) s += c.size();
        return s;
    }
}`,
    },
    {
      name: 'Decorator', oneLiner: 'Add behavior by wrapping, not subclassing.', useWhen: 'Optional add-ons (coffee + milk + sugar; toppings).',
      code: `interface Coffee { double cost(); }
class Espresso implements Coffee {
    public double cost() { return 2; }
}
class Milk implements Coffee {
    private Coffee c;
    Milk(Coffee c) { this.c = c; }
    public double cost() { return c.cost() + 0.5; }
}
new Milk(new Espresso()).cost();   // 2.5 — no subclass explosion`,
    },
    {
      name: 'Facade', oneLiner: 'One simple entry point over a complex subsystem.', useWhen: 'Hide messy internals behind a clean API.',
      code: `class OrderFacade {
    void place(Cart cart) {
        new Inventory().reserve(cart);
        new Payment().charge(cart);
        new Shipping().schedule(cart);   // one call hides 3 subsystems
    }
}`,
    },
  ],
  Behavioral: [
    {
      name: 'Strategy', oneLiner: 'Swap an algorithm at runtime behind a common interface.', useWhen: 'Pluggable policies — pricing, spot allocation, eviction, sorting.',
      code: `interface PricingStrategy { int price(int hours); }
class FlatRate implements PricingStrategy {
    public int price(int hours) { return 5 * hours; }
}
class Weekend implements PricingStrategy {
    public int price(int hours) { return 3 * hours; }
}
lot.setPricing(new FlatRate());   // swap the algorithm at runtime`,
    },
    {
      name: 'State', oneLiner: 'Behavior changes with an internal state object.', useWhen: 'A lifecycle/state machine — vending machine, ATM, order status.',
      code: `class VendingMachine {
    State state = new IdleState(this);
    void insert(Coin c) { state.insert(c); }
}
class IdleState implements State {
    private VendingMachine m;
    IdleState(VendingMachine m) { this.m = m; }
    public void insert(Coin c) {
        m.state = new HasMoneyState(m);   // transition
    }
}`,
    },
    {
      name: 'Observer', oneLiner: 'Subscribers get notified when a subject changes.', useWhen: 'Events/notifications — display boards, alerts, pub-sub.',
      code: `interface Observer { void update(int free); }
class Board implements Observer {
    public void update(int free) { System.out.println("free: " + free); }
}
class ParkingLot {                        // subject
    private List<Observer> observers = new ArrayList<>();
    private void notifyObservers(int free) {
        for (Observer o : observers) o.update(free);
    }
}`,
    },
    {
      name: 'Command', oneLiner: 'Wrap a request as an object (supports queue/undo).', useWhen: 'Undo/redo, job queues, remote requests.',
      code: `interface Command { void execute(); void undo(); }
class AddText implements Command {
    private Doc doc; private String text;
    AddText(Doc d, String t) { doc = d; text = t; }
    public void execute() { doc.append(text); }
    public void undo()    { doc.remove(text); }
}
history.push(cmd); cmd.execute();   // cmd.undo() later`,
    },
    {
      name: 'Iterator', oneLiner: 'Traverse a collection without exposing its internals.', useWhen: 'Custom iteration order over your structure.',
      code: `class Playlist implements Iterable<Song> {
    private List<Song> songs = new ArrayList<>();
    public Iterator<Song> iterator() {   // internals stay hidden
        return songs.iterator();
    }
}
for (Song s : playlist) play(s);`,
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
  { title: 'ashishps1/awesome-low-level-design (GitHub) — free', url: 'https://github.com/ashishps1/awesome-low-level-design', note: 'The best single free starting point: OOP, SOLID, UML, all patterns, and 30+ solved problems (Java + others).' },
  { title: 'Refactoring.Guru — Design Patterns — free', url: 'https://refactoring.guru/design-patterns/catalog', note: 'The clearest illustrated guide to every pattern, with intent + when-to-use (has Java examples).' },
  { title: 'GeeksforGeeks — How to Prepare for LLD — free', url: 'https://www.geeksforgeeks.org/how-to-prepare-for-low-level-design-interviews/', note: 'Good free breadth and worked examples.' },
  { title: 'Hello Interview — Low Level Design in a Hurry — free', url: 'https://www.hellointerview.com/learn/low-level-design', note: 'Concise interview framework.' },
  { title: 'Grokking the LLD Interview (Educative / Design Gurus) — paid', url: 'https://www.educative.io/courses/grokking-the-low-level-design-interview-using-ood-principles', note: 'Structured self-paced OOD course.' },
  { title: 'Book — Head First Design Patterns (Java)', url: 'https://www.oreilly.com/library/view/head-first-design/9781492077992/', note: 'The friendliest intro to patterns, in Java.' },
]
