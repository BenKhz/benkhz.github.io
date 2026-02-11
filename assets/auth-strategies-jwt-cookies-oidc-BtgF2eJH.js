const e=`# Auth Strategies: JWT vs Cookies vs OIDC — Pick the Right One

I've been on enough projects now to know that auth is the thing everyone gets opinionated about before anyone actually builds it. JWT, cookies, sessions, OIDC — the acronym soup is thick. I spent a good stretch sorting through what actually works where, so here's what I landed on.

## The Quick Version

Before we dig in: there is no universally "best" auth strategy. The right choice depends on what you're building. If someone tells you otherwise, they're probably selling something.

## JWT (JSON Web Tokens)

JWTs are everywhere right now, and honestly, they deserve the hype — with some caveats.

A JWT is a signed string of JSON data, split into three parts: header, payload, and signature. The server signs it, hands it to the client, and from that point on the client can prove who they are without the server needing to check a database. Stateless auth. Clean.

You can play with them yourself at [jwt.io](https://jwt.io) — decode one, see exactly what's inside.

### The Good Stuff

- **No server-side session storage.** Your auth is self-contained. Scale horizontally without worrying about session sync.
- **Portable.** Works great for APIs, mobile apps, microservices — anywhere a token needs to travel between services.
- **Inspectable.** The payload is just base64. You can decode it and see what's in it without hitting a database. Great for debugging.

### The Gotchas

- **You can't revoke them.** Once signed, a JWT is valid until it expires. Period. If someone steals one, you're stuck until the expiry window closes — unless you build a token blacklist, which kind of defeats the stateless argument.
- **Size matters.** JWTs aren't small. If you're stuffing claims into the payload and sending one with every request, that adds up.
- **XSS risk.** If you store your JWT in \`localStorage\`, any JavaScript running on your page can grab it. That's a real attack surface.

### When to Reach for JWTs

APIs. Microservices. Mobile apps. Anywhere the client needs to carry proof of identity across service boundaries. The spec is [RFC 7519](https://datatracker.ietf.org/doc/html/rfc7519) if you want the full picture.

## Cookie-Based Sessions

Cookies are old school, but "old school" doesn't mean bad. Session cookies are still the backbone of a huge number of web applications — and for good reason.

The flow is simple: you log in, the server creates a session, drops a session ID in a cookie, and every subsequent request sends that cookie back automatically. The server looks up the session on its end. Done.

### The Good Stuff

- **HttpOnly cookies.** The browser sends them, but JavaScript can't touch them. That's a big win for security — XSS can't steal what it can't read.
- **Automatic.** Browsers handle cookies without you writing a single line of code on the client side.
- **Easy to revoke.** Want to log someone out? Delete the session server-side. Instant.

### The Gotchas

- **CSRF.** Because the browser sends cookies automatically, a malicious site can trick your browser into making requests to your app. You need CSRF tokens to fight this off. It's a well-understood problem, but it's still a problem you have to solve. The [OWASP Session Management Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html) is the go-to reference here.
- **Server state.** You need somewhere to store sessions — Redis, a database, whatever. That's another moving part to manage and scale.

### When to Reach for Cookies

Traditional server-rendered web apps. Anything where the browser is your main client. If you're building a standard web app with login/logout, cookies are still a perfectly solid choice.

## OIDC (OpenID Connect)

OIDC is where things get a little more enterprise-y, but don't let that scare you off. It's actually solving a really specific and important problem: **"Who are you?"** — not just "Are you allowed to do this?"

OIDC is built on top of [OAuth 2.0](https://datatracker.ietf.org/doc/html/rfc6749). OAuth handles authorization ("what can you do?"), and OIDC adds the identity layer on top ("who are you?"). It uses ID tokens — which are JWTs, by the way — to hand you a verified identity from a trusted provider. The full spec lives at [openid.net](https://openid.net/specs/openid-connect-core-1_0.html).

### The Good Stuff

- **SSO.** One login, access everywhere. Users don't love creating a dozen separate accounts.
- **Standardized.** Everyone's working off the same playbook. Google, Microsoft, Okta — they all speak OIDC.
- **Separation of concerns.** You don't have to manage passwords or user databases yourself. That's someone else's problem now.

### The Gotchas

- **Complexity.** There are a lot of moving parts: authorization servers, redirect URIs, token endpoints, refresh tokens. It's not something you bolt on in an afternoon if you've never done it before.
- **Dependency.** You're trusting a third party with your auth. If their service goes down, so does your login flow. Plan accordingly.

### When to Reach for OIDC

When you need SSO. When you're integrating with enterprise customers. When managing user identities yourself sounds like a nightmare you'd rather avoid.

## So Which One Do I Actually Use?

Here's my rough decision tree:

| Scenario | Strategy |
|----------|----------|
| Public API with mobile or third-party clients | JWT |
| Traditional web app with server rendering | Cookie sessions |
| Enterprise app needing SSO | OIDC |
| Microservices talking to each other | JWT (short-lived) |
| App where you don't want to manage passwords | OIDC |

The honest truth? Most real-world apps end up using more than one. A cookie-based session for the web UI, JWTs for the API layer, and OIDC for the login flow. They're not mutually exclusive — they're tools, and you pick the right one for the job.

## Further Reading

- [jwt.io](https://jwt.io) — Decode and understand JWTs interactively
- [RFC 7519 — JSON Web Token](https://datatracker.ietf.org/doc/html/rfc7519) — The JWT spec
- [RFC 6749 — OAuth 2.0](https://datatracker.ietf.org/doc/html/rfc6749) — The foundation OIDC builds on
- [OWASP Session Management Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html) — Solid reference for cookie security
- [OpenID Connect Core 1.0](https://openid.net/specs/openid-connect-core-1_0.html) — The OIDC spec
`;export{e as default};
