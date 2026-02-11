const e=`# Interface Segregation: Don't Make Me Implement What I Don't Use

The Interface Segregation Principle is the "I" in SOLID. It's deceptively simple to state and surprisingly easy to violate without realizing it. The short version: don't force a class to implement methods it has no business having.

## What Is It, Actually?

The principle:

> Clients should not be forced to depend on interfaces they do not use.

"Fat" interfaces — ones with a bunch of methods crammed together — are the enemy here. If a class has to implement methods it will never actually use (or worse, implement them as no-ops just to satisfy the contract), the interface is too big. Split it.

## A Concrete Example

Say you're building a storage system. Someone designed a single interface for everything:

\`\`\`javascript
// storage.js — one interface to rule them all
class Storage {
  save(key, data)            { throw new Error('Not implemented') }
  load(key)                  { throw new Error('Not implemented') }
  delete(key)                { throw new Error('Not implemented') }
  list()                     { throw new Error('Not implemented') }
  getMetadata(key)           { throw new Error('Not implemented') }
  setPermissions(key, perms) { throw new Error('Not implemented') }
}
\`\`\`

Now you need a simple in-memory cache. All it needs is \`save\` and \`load\`. But because it's extending \`Storage\`, it has to "implement" \`delete\`, \`list\`, \`getMetadata\`, and \`setPermissions\` — even if they do nothing:

\`\`\`javascript
class InMemoryCache extends Storage {
  constructor() {
    super()
    this.store = {}
  }

  save(key, data)  { this.store[key] = data }
  load(key)        { return this.store[key] }
  delete(key)      { /* not needed, but required */ }
  list()           { /* not needed, but required */ }
  getMetadata(key) { /* not needed, but required */ }
  setPermissions() { /* not needed, but required */ }
}
\`\`\`

That's ugly. And if someone calls \`cache.delete('key')\` expecting it to work, it silently does nothing. That's a bug waiting to happen.

Split the interface into focused pieces:

\`\`\`javascript
// Each interface does one thing
class Readable {
  load(key) { throw new Error('Not implemented') }
}

class Writable {
  save(key, data) { throw new Error('Not implemented') }
}

class Deletable {
  delete(key) { throw new Error('Not implemented') }
}

// InMemoryCache only implements what it actually supports
class InMemoryCache {
  constructor() { this.store = {} }
  save(key, data) { this.store[key] = data }
  load(key)       { return this.store[key] }
}

// FileSystemStorage implements the full set because it actually can
class FileSystemStorage {
  save(key, data)            { /* write to disk */ }
  load(key)                  { /* read from disk */ }
  delete(key)                { /* remove file */ }
  list()                     { /* list directory */ }
  getMetadata(key)           { /* stat the file */ }
  setPermissions(key, perms) { /* chmod */ }
}
\`\`\`

Now each class only exposes what it can actually do. No dead methods. No silent no-ops.

## Why It Matters

### It prevents silent failures

A class that implements a method as a no-op is lying about its capabilities. Code that depends on that method will do the wrong thing quietly. Interface Segregation makes those mismatches obvious at design time, not at runtime when something weird happens in production.

### It keeps dependencies tight

If your discount calculator only needs to *read* prices, it shouldn't depend on an interface that also includes *writing* prices. If that write method changes, your calculator gets dragged into a recompile — or a re-test — for no reason.

### It makes code easier to reason about

A small, focused interface tells you exactly what a piece of code can do. A fat interface with twelve methods tells you almost nothing — you have to read the implementation to figure out which ones actually work and which ones are stubs.

## Where It Goes Wrong

### Splitting too early

If you have one class and one use case, one interface is fine. Don't split interfaces until you actually have multiple consumers that need different subsets. Premature segregation is just as bad as no segregation — you're just adding complexity without solving anything.

### Splitting too granularly

The other extreme: every single method gets its own interface. Now you have fifty tiny interfaces and nobody can figure out what implements what. There's a middle ground. Group by *capability* — reading, writing, managing — not by individual method.

### Confusing it with Single Responsibility

Interface Segregation is about what the *client* needs, not about what the *class* does. A class can implement multiple interfaces and still follow both S and I, as long as each interface exists because a *different client* needs it. The question is always: who is consuming this? What do *they* actually need?

## A Rule of Thumb

When you're designing an interface, think about who's going to *use* it — not who's going to *implement* it. If different consumers need different subsets of methods, those subsets should be separate interfaces. If every consumer needs the same thing, one interface is fine.

The smell test: if a class has to implement a method with an empty body or a "not supported" throw, the interface is too fat. Split it.

## Further Reading

- [Wikipedia — Interface segregation principle](https://en.wikipedia.org/wiki/Interface_segregation_principle) — Clean definition and context
- [Wikipedia — SOLID](https://en.wikipedia.org/wiki/SOLID) — How I relates to the other four
- Robert C. Martin's *Clean Code* — The book that popularized SOLID and made these principles accessible to a generation of developers
`;export{e as default};
