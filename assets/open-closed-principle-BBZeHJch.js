const e=`# Open/Closed: Extend It, Don't Butcher It

The Open/Closed Principle is the "O" in SOLID — and it's one of those ideas that sounds almost paradoxical at first. A piece of code should be *open* for extension but *closed* for modification. How do you add new behavior without changing existing code?

Once it clicks, though, it's one of the more practically useful principles in the bunch.

## What Does It Actually Mean?

The principle:

> Software entities should be open for extension, but closed for modification.

Translation: you should be able to add new behavior to your system without rewriting the code that's already there and working. The existing code is "closed" — you don't touch it. But it's "open" — you can build on top of it.

The goal isn't to never touch code again. It's to avoid the pattern where every new feature means digging into existing, tested, stable code and hoping you don't break anything.

## A Real Example

Say you have a discount system. Every time the business adds a new discount type, someone has to go into the discount calculator and add another \`if\` branch:

\`\`\`javascript
// discount.js — open for modification (bad)
function calculateDiscount(order, customerType) {
  if (customerType === 'regular') {
    return order.total * 0.05
  } else if (customerType === 'premium') {
    return order.total * 0.15
  } else if (customerType === 'vip') {      // ← someone added this last week
    return order.total * 0.25
  } else if (customerType === 'employee') { // ← and this one today
    return order.total * 0.30
  }
  return 0
}
\`\`\`

Every new customer type means another branch. Every branch is another place to mess up. And every change touches the same function that's been working fine for months.

Here's the open/closed version:

\`\`\`javascript
// discountStrategies.js — each strategy lives on its own
const discountStrategies = {
  regular:  (total) => total * 0.05,
  premium:  (total) => total * 0.15,
  vip:      (total) => total * 0.25,
  employee: (total) => total * 0.30,
}

// discount.js — closed for modification
function calculateDiscount(order, customerType) {
  const strategy = discountStrategies[customerType]
  return strategy ? strategy(order.total) : 0
}
\`\`\`

Now \`calculateDiscount\` never changes. Adding a new discount type? Add a new entry to \`discountStrategies\`. The calculator doesn't care. It's closed.

You could take this further with a plugin-style architecture where strategies are registered dynamically — but for most codebases, this level is plenty.

## Why It Matters

### Fewer regressions

Code you don't touch can't break. If your discount calculator hasn't changed in three months and it's been working fine, that's a good thing. Don't mess with it.

### Easier to test

New behavior is additive. You write tests for the new strategy without worrying about the existing ones. The existing tests keep passing because the existing code didn't change.

### Cleaner diffs

When you add a feature, the diff is just the new code — not a maze of changes to existing logic. Code reviews get faster. Merges get simpler.

## Where People Mess This Up

### Abstraction for the sake of abstraction

Some people read Open/Closed and immediately build an elaborate plugin system with interfaces and registries — for a codebase with three discount types. That's over-engineering. The principle kicks in when you have a *pattern* of things that change frequently. If it's just happened once or twice, a simple \`if\` is fine. Don't build the extension mechanism until you actually need to extend.

### Confusing "closed" with "frozen"

Open/Closed doesn't mean you can never change existing code. If you discover a bug, fix it. If the requirements genuinely change in a way that affects the foundation, change the foundation. The principle is about *new features*, not about treating old code as sacred.

### Applying it at the wrong level

Open/Closed is most useful at the boundaries — the parts of your code where new requirements are likely to show up. Trying to make every single function in your codebase open/closed is a waste of effort. Focus on the hot spots.

## A Rule of Thumb

If you find yourself repeatedly editing the same function or file every time a new feature comes in, that's your signal. That code needs to be open for extension. Build the extension point, then stop touching it.

If it's only happened once or twice, don't bother. [YAGNI](https://martinfowler.com/bliki/Yagni.html) applies here too.

## Further Reading

- [Wikipedia — Open/closed principle](https://en.wikipedia.org/wiki/Open/closed_principle) — Solid overview of the principle and its history
- [Wikipedia — SOLID](https://en.wikipedia.org/wiki/SOLID) — Where O fits in the bigger picture
- [Martin Fowler — YAGNI](https://martinfowler.com/bliki/Yagni.html) — Because knowing when *not* to apply Open/Closed is half the battle
`;export{e as default};
