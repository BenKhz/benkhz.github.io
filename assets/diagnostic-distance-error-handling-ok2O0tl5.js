const e=`# Diagnostic Distance: The Hidden Cost in Your Error Handling

There's a metric most teams never measure but feel every single day: the distance between where an error appears and where the information you actually need to fix it lives.

Call it **diagnostic distance** — the gap between the error surface and the error source. Large diagnostic distance means a 500 in your logs, three hours of digging, and eventually finding that a required env variable had a typo. Small diagnostic distance means seeing *exactly* what failed, in what context, and why, the moment it happened.

It sounds obvious when you put it that way. But the default behavior of most web frameworks actively makes it worse, and most codebases make it much worse still.

## What It Looks Like in Practice

Here's the classic version. Your Node/Express app throws something:

\`\`\`
TypeError: Cannot read properties of undefined (reading 'id')
    at Layer.handle [as handle_request] (express/lib/router/layer.js:95:5)
    at next (express/lib/router/route.js:149:13)
    at Route.dispatch (express/lib/router/route.js:119:3)
    at Layer.handle [as handle_request] (express/lib/router/layer.js:95:5)
    at /app/middleware/auth.js:34:12
\`\`\`

The stack trace tells you Express's router caught something. It tells you your auth middleware was involved. It does not tell you *what* was undefined, *which request* triggered it, *which user* was affected, or *what business operation* was in progress. You are now at maximum diagnostic distance — you have a fact (\`undefined.id\` somewhere) and no context.

Now multiply that by a production app handling thousands of requests. Without correlation IDs, request context, or structured error metadata, you're searching through flat log lines hoping timestamps line up.

## Why This Happens

The root cause is that most error handling is written as an afterthought, designed to *contain* failures rather than *explain* them. Errors get caught, wrapped in a generic response, and the original context — the user, the operation, the state — gets discarded.

The three most common patterns that widen diagnostic distance:

**1. Swallowing errors**
\`\`\`javascript
try {
  await createOrder(payload)
} catch (err) {
  res.status(500).json({ error: 'Something went wrong' })
  // err is gone. context is gone. good luck.
}
\`\`\`

**2. Re-throwing without context**
\`\`\`javascript
try {
  const user = await db.users.findOne({ id: userId })
  return user.profile.settings // throws if user is null
} catch (err) {
  throw new Error('Failed to load settings') // lost: which userId, what db returned
}
\`\`\`

**3. Logging late and generic**

Catching at the top of the app and logging \`err.message\` strips the stack and all intermediate context. By the time you see it, the frame that mattered is gone.

## Designing for Short Diagnostic Distance

The fix isn't a library or a tool — it's a design habit. Errors are a developer-facing interface. Treat them like one.

### Wrap with context at each layer

Every time an error crosses a boundary, add what that layer knows:

\`\`\`javascript
async function getOrdersForUser(userId) {
  try {
    return await db.orders.findAll({ userId })
  } catch (err) {
    throw Object.assign(
      new Error(\`Failed to fetch orders for user \${userId}: \${err.message}\`),
      { cause: err, userId, operation: 'getOrdersForUser' }
    )
  }
}
\`\`\`

Node 16+ supports the native \`cause\` option on \`Error\` — use it:

\`\`\`javascript
throw new Error('Failed to fetch orders', { cause: err })
\`\`\`

Now \`err.cause\` chains the full history. The error is richer at every layer, not poorer.

### Attach structured metadata, not just messages

A string message is hard to query. Structured metadata isn't:

\`\`\`javascript
class AppError extends Error {
  constructor(message, { code, context, cause } = {}) {
    super(message, { cause })
    this.code    = code    // machine-readable: 'ORDER_NOT_FOUND'
    this.context = context // { userId, orderId, requestId }
  }
}
\`\`\`

When this lands in your logging pipeline, you can filter by \`code\`, group by \`context.userId\`, and correlate with \`context.requestId\` in one query instead of grepping text.

### Correlate across the request lifecycle

The most underused pattern in web apps: attach a request ID at the boundary and carry it everywhere.

\`\`\`javascript
// middleware
app.use((req, res, next) => {
  req.requestId = crypto.randomUUID()
  res.setHeader('X-Request-ID', req.requestId)
  next()
})

// in your service layer
logger.error('Order creation failed', {
  requestId: req.requestId,
  userId:    req.user.id,
  payload:   req.body,
  error:     err.message,
  cause:     err.cause?.message,
})
\`\`\`

Now every log line from that request shares an ID. You can pull the full story of any failure in one query. Diagnostic distance collapses.

### Don't catch until you have something useful to add

The instinct to catch-at-every-level leads to over-catching. If a lower function can't add meaningful context, let the error propagate to somewhere that can.

\`\`\`javascript
// don't do this — adds nothing
async function fetchUser(id) {
  try {
    return await db.users.findOne(id)
  } catch (err) {
    throw err // pointless re-throw
  }
}

// do this — catch where you have context to add
async function handleProfileRequest(req, res) {
  try {
    const user = await fetchUser(req.params.id)
    res.json(user.profile)
  } catch (err) {
    throw new AppError('Profile request failed', {
      code:    'PROFILE_FETCH_ERROR',
      context: { userId: req.params.id, requestId: req.requestId },
      cause:   err,
    })
  }
}
\`\`\`

## The UI Parallel

Diagnostic distance isn't just a backend problem. On the client, it looks like this:

- A toast: *"An error occurred."* — what operation? which data?
- A form that clears on submission failure — the user lost their input and doesn't know why
- A loading spinner that just stops — was it a network error? auth? rate limiting?

Every error your UI surfaces is also an interface — for the user *and* for you when you read the support ticket. The same principle applies: carry context forward, surface it at the right level, don't discard what you know.

## The Payoff

Short diagnostic distance doesn't just speed up debugging. It changes how you write code — you start thinking about failure modes as first-class concerns, not edge cases. You write code that fails loudly and informatively rather than silently and generically.

The goal isn't zero errors. It's maximum signal when errors happen. Every error should tell you exactly where to look.

## Further Reading

- [OWASP Error Handling Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Error_Handling_Cheat_Sheet.html) — security-aware perspective on what errors should and shouldn't expose
- [MDN — Error: cause](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error/cause) — native error chaining in JavaScript
- [Wikipedia — Fault localization](https://en.wikipedia.org/wiki/Fault_localization) — the academic root of diagnostic distance as a formal concept
- [Honeycomb — Observability Engineering](https://www.honeycomb.io/what-is-observability) — how structured events replace log-line archaeology at scale
`;export{e as default};
