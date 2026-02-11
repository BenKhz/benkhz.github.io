const e=`# Single Responsibility: One Job. Do It Well.

Single Responsibility is the "S" in SOLID — and ironically, it's the one people think they understand best while getting the most wrong. "One class, one job." Sure, sounds simple. Except nobody ever agrees on what counts as "one job."

Let's dig into what it actually means, where it goes sideways, and how to tell when you're violating it without realizing it.

## What Is Single Responsibility, Actually?

The principle, as Robert C. Martin put it:

> A class should have one, and only one, reason to change.

Notice that's not "do one thing." It's **one reason to change.** That's a subtle but important difference. The question isn't "how many functions does this class have?" It's "if the business requirements shift, how many places in my code do I need to touch?"

If changing how you format a report and changing how you save it to the database both require edits to the same file, that file is doing too much.

## A Concrete Example

Say you're building a user management system. Here's a file that's trying to be everything:

\`\`\`javascript
// user.js — way too much going on here
class User {
  constructor(name, email) {
    this.name = name
    this.email = email
  }

  save() {
    // connects to database, inserts record
    const db = new DatabaseConnection()
    db.insert('users', { name: this.name, email: this.email })
  }

  sendWelcomeEmail() {
    // formats and sends an email
    const emailBody = \`Welcome, \${this.name}!\`
    EmailService.send(this.email, 'Welcome', emailBody)
  }

  formatForDisplay() {
    return \`\${this.name} <\${this.email}>\`
  }
}
\`\`\`

This class has at least three reasons to change: you change how users are stored, you change the welcome email, or you change how users are displayed. Three separate concerns crammed into one place.

Split it up:

\`\`\`javascript
// user.js — just the data
class User {
  constructor(name, email) {
    this.name = name
    this.email = email
  }

  formatForDisplay() {
    return \`\${this.name} <\${this.email}>\`
  }
}

// userRepository.js — handles persistence
class UserRepository {
  save(user) {
    const db = new DatabaseConnection()
    db.insert('users', { name: user.name, email: user.email })
  }
}

// userNotifier.js — handles welcome emails
class UserNotifier {
  sendWelcome(user) {
    const emailBody = \`Welcome, \${user.name}!\`
    EmailService.send(user.email, 'Welcome', emailBody)
  }
}
\`\`\`

Now each piece changes for exactly one reason. Want to switch from email to SMS for welcome messages? Touch \`userNotifier.js\`. Switch from PostgreSQL to MongoDB? Touch \`userRepository.js\`. The rest stays put.

## Why It's Worth Doing

### Changes are safer

When a file only does one thing, changing it is less likely to break something unrelated. You're not playing whack-a-mole across the codebase every time a requirement shifts.

### Testing is easier

A class with one responsibility is easier to test in isolation. You don't need to set up a database connection just to test email formatting.

### Teams work better

If two developers need to change different things, they're less likely to step on each other if those things live in different files. Fewer merge conflicts. Less yelling.

## Where It Goes Wrong

### "One responsibility" becomes "one function"

People hear "one job" and start splitting classes until every file has a single method. That's not the point. A repository class that has \`save\`, \`findById\`, and \`delete\` is fine — they're all part of the same responsibility: data persistence.

### It becomes an excuse to over-split

The flip side: some people take it so far that a simple feature is scattered across a dozen tiny files that are impossible to follow. If you're jumping through ten files to understand one feature, something's gone wrong — even if each file technically has "one responsibility."

### Ignoring cohesion

The real question isn't "how small can I make this?" It's "do these things change together for the same reason?" Things that change together should live together. Things that change for different reasons shouldn't.

## A Rule of Thumb

Ask yourself: "If a requirement changes, how many files do I need to touch?" If the answer is one, you're probably good. If it's five, something might be wrong — either something is too spread out, or too many things are tangled into one place.

Single Responsibility isn't about making things small. It's about making changes **predictable.**

## Further Reading

- [Wikipedia — Single-responsibility principle](https://en.wikipedia.org/wiki/Single-responsibility_principle) — Clear definition and examples
- [Wikipedia — SOLID](https://en.wikipedia.org/wiki/SOLID) — The full set of principles and how they relate
- Robert C. Martin's *Clean Code* — Chapter 8 goes deep on this one; worth the read if you haven't already
`;export{e as default};
