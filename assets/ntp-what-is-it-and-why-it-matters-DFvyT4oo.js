const e=`# NTP: The Quiet Protocol Holding the Internet Together

If you've never had to think about NTP, congrats — it's been doing its job. That's actually the mark of a really good protocol. But once something goes wrong with time sync, you will never forget it.

I stumbled into an NTP rabbit hole a while back when logs from two different services started showing timestamps that were slightly off from each other. A few hundred milliseconds. Didn't sound like much at first — until I realized those logs were supposed to be correlated, and the drift was enough to make event ordering unreliable. Down the rabbit hole I went.

## What Is NTP, Anyway?

NTP — Network Time Protocol — is how computers on a network keep their clocks in sync. It's been around since [1985](https://en.wikipedia.org/wiki/Network_Time_Protocol), which in internet years is ancient. The current version is NTPv4, defined in [RFC 5905](https://datatracker.ietf.org/doc/html/rfc5905).

The basic idea is simple: your computer asks a time server "what time is it?", the server responds, and your machine adjusts its clock accordingly. It also accounts for network latency — the round-trip time of the request — so the correction is actually pretty accurate.

## How It Works (The Short Version)

1. Your machine sends a request to an NTP server, stamping its current time on the way out.
2. The server stamps when it received the request and when it's sending the response back.
3. Your machine gets the response, notes the arrival time, and does the math to figure out the actual offset between its clock and the server's.
4. It adjusts — but not all at once. NTP nudges the clock gradually to avoid sudden jumps.

That last part matters more than you'd think. A sudden 2-second correction can break log ordering, mess up database transactions, or cause all kinds of subtle bugs that are a pain to track down.

## The Stratum System

NTP uses a hierarchy called "strata" — layers of time sources, each one syncing from the layer above it.

- **Stratum 0** — Atomic clocks, GPS receivers. The source of truth. These aren't network-accessible; they feed into the next layer.
- **Stratum 1** — Servers directly connected to a Stratum 0 source. These are the "official" time servers. [NIST](https://www.nist.gov/pml/time-and-frequency-division/ntp) runs some of the well-known ones.
- **Stratum 2** — Servers that sync from Stratum 1. This is where most of us end up.
- **Stratum 3+** — It goes deeper. Each layer syncs from the one above, picking up a little more potential drift each time.

For most applications, Stratum 2 or 3 is more than good enough. You don't need an atomic clock for your web server.

## Why Should I Actually Care?

Here's where it gets interesting. Time synchronization isn't just a "nice to have" — it's a foundational assumption that a surprising number of systems quietly depend on.

### TLS Certificates

Your browser checks whether an HTTPS certificate is valid *right now*. If your system clock is off by enough, perfectly valid certs can appear expired — or worse, expired certs can appear valid. Clock skew has broken TLS in production more than once, and it's the kind of bug that looks like a completely unrelated networking issue until someone thinks to check the time.

### Log Correlation

If you're running multiple services and trying to piece together what happened during an incident, you need the timestamps to line up. A 500ms drift between services can be the difference between understanding an outage and being completely lost in a pile of out-of-order logs.

### Distributed Systems

Distributed databases like CockroachDB and Google's Spanner rely on tight clock synchronization to maintain consistency across nodes. If clocks drift too far, they have to fall back to slower coordination mechanisms — which kills performance. Time is not just metadata in these systems; it's part of the correctness guarantee.

### Financial Transactions

Exchanges and payment processors need accurate timestamps for ordering transactions. In high-frequency trading, milliseconds aren't just a number — they're the difference between a valid trade and a duplicate.

## What Happens When NTP Goes Wrong?

I've seen it firsthand. Two services with logs that don't line up. A monitoring alert firing because a cert appeared expired due to clock skew. A distributed lock behaving unpredictably because the nodes disagreed on time.

The thing about NTP is that it usually runs silently in the background, doing its job. Most cloud providers configure it for you out of the box. But if you're running on-premises, spinning up your own VMs, or building something distributed, it's worth taking 30 seconds to verify that your machines are actually synced.

## Checking Your Sync

On Linux, it's a quick check:

\`\`\`bash
chronyc tracking
# or
timedatectl status
\`\`\`

On a cloud instance, your provider almost certainly has NTP configured. But it never hurts to confirm, especially after provisioning something new.

## The Takeaway

NTP is one of those protocols that just works — until it doesn't. It's not glamorous, it won't show up in your architecture diagrams, but it's holding a lot of the internet's assumptions together. Next time you're setting up a new server or a new environment, spend a minute checking that the clock is synced. Future you will thank present you.

## Further Reading

- [RFC 5905 — NTPv4](https://datatracker.ietf.org/doc/html/rfc5905) — The spec itself, surprisingly readable
- [NIST Time & Frequency](https://www.nist.gov/pml/time-and-frequency-division/ntp) — Where to find official NTP servers
- [Wikipedia: Network Time Protocol](https://en.wikipedia.org/wiki/Network_Time_Protocol) — Good overview with history and context
`;export{e as default};
