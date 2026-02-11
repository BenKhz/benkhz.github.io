const e=`# Liskov Substitution: If It Quacks Like a Duck...

The Liskov Substitution Principle is the "L" in SOLID — and it's the one that trips up even experienced developers. Named after Barbara Liskov, it sounds intimidating on paper. In practice, it's about a surprisingly common bug: when a subtype silently breaks the contract its parent made.

## What Is It, Actually?

The principle, stated formally:

> If S is a subtype of T, then objects of type T may be replaced with objects of type S without altering any of the desirable properties of the program.

In plain English: if you have a class that inherits from another class, it should be a *genuine* drop-in replacement. Not just structurally — it should *behave* the way the parent promised it would.

"But it has all the same methods!" Sure. But does it do the same *things* with them?

## The Classic Example (And Why It Matters)

You've probably seen this one, but it's worth walking through because the bug it represents is real:

\`\`\`javascript
class Rectangle {
  constructor(width, height) {
    this.width = width
    this.height = height
  }

  setWidth(w)  { this.width = w }
  setHeight(h) { this.height = h }

  area() {
    return this.width * this.height
  }
}

class Square extends Rectangle {
  constructor(size) {
    super(size, size)
  }

  setWidth(w) {
    this.width = w
    this.height = w  // ← a square has to stay square
  }

  setHeight(h) {
    this.width = h   // ← so setting height also sets width
    this.height = h
  }
}
\`\`\`

Looks fine, right? But watch what happens when someone writes code that works with Rectangles:

\`\`\`javascript
function makeItWide(shape) {
  shape.setWidth(100)
  shape.setHeight(50)
  console.log(shape.area())  // expects 5000
}

makeItWide(new Rectangle(10, 10))  // 5000 ✓
makeItWide(new Square(10))         // 2500 ✗ — setHeight overwrote the width
\`\`\`

The Square *is* a Rectangle structurally. It has all the same methods. But it violates the *behavioral contract* that Rectangle established: setting width and height should be independent. The Square silently breaks that assumption.

This is a Liskov violation. And in a real codebase, this kind of thing shows up as a bug that takes way too long to track down.

## The Fix: Rethink the Hierarchy

The right answer here isn't to make Square work harder. It's to recognize that a Square *isn't actually a Rectangle* in the way the code assumes. They're both shapes, but they have different constraints.

\`\`\`javascript
class Shape {
  area() { throw new Error('Not implemented') }
}

class Rectangle extends Shape {
  constructor(width, height) {
    super()
    this.width = width
    this.height = height
  }

  area() { return this.width * this.height }
}

class Square extends Shape {
  constructor(size) {
    super()
    this.size = size
  }

  area() { return this.size * this.size }
}
\`\`\`

Now both types fulfill the same contract — they have an \`area()\` method — without either one having to lie about how it works internally.

## Why This Matters Beyond Textbooks

Liskov violations are sneaky. They don't cause compile errors. They don't crash immediately. They cause subtle, hard-to-reproduce bugs that show up when someone uses your class in a way you didn't anticipate.

The real-world pattern looks like this:

- Someone creates a subclass that "mostly" works like the parent.
- It passes all the tests that exist right now.
- Six months later, someone writes new code that relies on the parent's contract.
- The subclass quietly does the wrong thing.
- Nobody connects the dots for weeks.

### A more practical example

\`\`\`javascript
class ReadOnlyCollection {
  constructor(items) {
    this._items = [...items]
  }

  get(index) { return this._items[index] }
  length()   { return this._items.length }
}

class CachedCollection extends ReadOnlyCollection {
  // Someone wanted caching, so they extended ReadOnlyCollection.
  // But then they needed to add items to warm the cache...

  push(item) {
    this._items.push(item)   // ← this mutates. ReadOnlyCollection never promised this.
    this._cache = null        // invalidate cache
  }
}
\`\`\`

\`CachedCollection\` is supposed to be a \`ReadOnlyCollection\`. But now it can mutate. Any code that trusts it to be read-only is wrong. Classic Liskov violation — and the kind of thing that slips past code review because "it mostly works."

## How to Spot One

Ask yourself these questions when you're writing a subclass:

- Does my subclass fulfill the *behavioral* contract of the parent — not just the structural one?
- Am I overriding methods to do something the parent version *wouldn't* do?
- Would code written against the parent class still work correctly if I swapped in my subclass?

If any of those answers are "no" or "maybe," you've got a Liskov problem.

## A Rule of Thumb

Inheritance is a tool, not a goal. If you're bending a subclass into shape to fit a parent class it doesn't naturally belong to, stop. Rethink the hierarchy. Composition or a shared interface might be the better fit.

Liskov isn't about making inheritance work at all costs. It's about making sure that when you *do* use inheritance, it actually means something.

## Further Reading

- [Wikipedia — Liskov substitution principle](https://en.wikipedia.org/wiki/Liskov_substitution_principle) — Formal definition and examples
- [Wikipedia — SOLID](https://en.wikipedia.org/wiki/SOLID) — How L fits with the rest
- Barbara Liskov's original paper, *A Notion of Type Abstraction and Type Inheritance* (1987) — the source material, surprisingly accessible for an academic paper
`;export{e as default};
