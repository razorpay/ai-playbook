---
title: "Authoring an internal MCP server — architecture, auth, packaging"
slug: "belts/black/internal-mcp-server"
section: "belts"
status: "drafted"
type: "chapter"
track: "black"
order: 1
time_minutes: 60
audience: "platform-builder"
outcome: "Author an internal MCP server with sound architecture, real auth, and a packaging story other PODs can install — without becoming a vendor of an unscoped capability."
prev: "belts/black/a-platform"
next: "belts/black/skill-pack-publishing"
pillar: "harness"
belt: "black"
tags: ["black-belt", "mcp", "voice-anchor", "platform"]
updated: "2026-04-29"
---

# B.1 — Authoring an internal MCP server

This is the voice anchor for Black Belt. Where Green Belt taught you to *use* the connectors the program-pinned plugin loaded for you, Black Belt teaches you to *author* one: the MCP server other PODs install when their teams need an interface to your team's data, your team's tools, your team's services. This module is the longest in Part A on purpose: the architecture, auth, and packaging decisions you make here propagate to every team that adopts the server.

---

## If you're short on time

- An MCP server is a bounded interface that exposes named tools to an agent. The server is yours; the contract is the consumers'.
- The three decisions that shape every internal MCP server: **scope** (what tools to expose), **auth** (who can call which tool), and **packaging** (how other PODs install and pin a version).
- Most internal MCP servers fail not because the protocol is hard but because their scope grew unbounded. Decide what the server is *not* for before you decide what it is for.

---

## The mental model

```
   ┌────────────────────────────────────────────────┐
   │              YOUR INTERNAL MCP SERVER            │
   ├────────────────────────────────────────────────┤
   │                                                  │
   │   1. SCOPE                                       │
   │      What tools does this server expose?       │
   │      What tools does it explicitly NOT expose? │
   │                                                  │
   │   2. AUTH                                        │
   │      Who can call which tool?                  │
   │      How is identity carried (per-call, per   │
   │      session, per program)?                    │
   │                                                  │
   │   3. PACKAGING                                   │
   │      How does another POD install and pin a    │
   │      version? What is the upgrade path? What   │
   │      breaks them when it changes?              │
   │                                                  │
   │   4. CONTRACTS                                   │
   │      Tool input schemas, output shapes, error  │
   │      shapes. Stable across versions or         │
   │      breaking-change tagged.                    │
   │                                                  │
   │   5. OBSERVABILITY                               │
   │      Per-call audit log, latency, error rate,  │
   │      cost-attribution tag, scope of access.    │
   │                                                  │
   └────────────────────────────────────────────────┘
```

The MCP protocol itself is small. The hard problem is the five layers around it: scope, auth, packaging, contracts, observability. A Black Belt builder owns all five.

---

## Layer 1 — Scope

Every MCP server starts with a scope decision. Two named anti-patterns to avoid.

### Anti-pattern A — The omnibus server

A server that exposes "everything our team owns": read tools, write tools, admin tools, debug tools, metrics tools, all in one server. The trouble: every consumer that loads the server pays the context cost of every tool they did not need; every change to any tool risks every consumer.

### Anti-pattern B — The micro-server-per-tool

A server that exposes one tool. The trouble: governance overhead and discovery overhead overwhelm the value. Five teams each with a one-tool server is harder to reason about than one team with a five-tool server.

### The right scope

A scope tied to a *job* or a *user-facing surface*: "summarise my team's tickets" exposes 3–5 read tools. "Run our team's release pipeline" exposes 4–6 read+write tools with a clear safety story. "Query our team's analytics warehouse" exposes 2–3 read tools with a query-cost gate.

A useful test: can you write a one-paragraph "what this server is for and what it is not for" that the consuming team can read in 30 seconds? If yes, the scope is right-sized.

---

## Layer 2 — Auth

Every internal MCP server runs against auth-shaped questions:

- **Caller identity.** Who is calling? Identity comes from the program-pinned plugin (the consumer's team handle propagates to the server) or from per-call auth tokens.
- **Per-tool authorisation.** Some tools are read-only and broadly safe; others are write-capable and need a tighter authorisation step. The server enforces this; the consumer cannot bypass.
- **PCI / RBI / regulator-scoped paths.** If any tool reads or writes regulator-protected data, the auth story is stricter than the team's default. This belongs in a separate *gated* tool that requires explicit per-call approval, not a default-on tool that hopes for the best.
- **Audit trail.** Every call is logged with caller identity, tool name, scope of data accessed. The audit log is the artefact that lets compliance trust the server.

The trap: assuming the program-pinned plugin's proxy handles all auth concerns. The proxy handles model-call routing; the MCP server handles tool-call authorisation. Two different layers; both need their own design.

---

## Layer 3 — Packaging

The packaging decision is what separates a server you and three teammates use from a server every Razorpay POD installs. Three components.

### Component 1 — Versioning

Semantic versioning. A breaking change to a tool's input or output shape bumps major; a backward-compatible addition bumps minor; a bug fix bumps patch. Consumers pin the major version.

### Component 2 — Distribution

Internal MCP servers ship through the program-pinned distribution channel — a checksummed package that consumers install via a known command. Mirror the Compass plugin pattern: a single pinned link, a verification skill that confirms the install, an audit trail.

### Component 3 — Upgrade story

When a consumer upgrades, what breaks? The answer should be: "nothing, unless they pinned to a major version we deprecated, in which case they got a deprecation warning two minor versions ago." This is the contract that lets other PODs adopt without fear.

---

## Layer 4 — Contracts

Every tool the server exposes has a contract: the input schema, the output shape, the error shape, the side effects. B.6 covers tool-contract design in detail; for now, three rules:

1. **Inputs are JSON-schema typed.** No free-form blobs. The agent should fail at the input layer if a parameter is missing or shaped wrong.
2. **Outputs are structured.** A tool that returns "a string" forces every consumer to parse. A tool that returns an object with named fields composes.
3. **Errors are typed.** "Something went wrong" is not an error shape. "Authorisation failed because the caller does not have access to tenant X" is. The consumer's agent reasons about typed errors; it cannot reason about strings.

---

## Layer 5 — Observability

An internal MCP server without observability is a server you cannot defend. The five things every internal server logs:

- per-call: caller, tool, parameters (redacted), output size, success/failure, latency;
- aggregated: per-tool call rate, error rate, p95 latency, cost-attribution rollup;
- audit-shape: every call that touches regulator-scoped data, with a separate audit channel;
- deprecation signal: how many consumers are still using the old version of a tool that has been superseded;
- adoption signal: which teams have installed the server, which have invoked it in the last week.

The signal flows into the program's observability dashboard (Y.20-shape). The cost-attribution tag is the same one the proxy uses; the rollup is at the server level.

---

## Worked sketch — a "tickets-summary" MCP server

A real internal MCP server might look like:

- **Name.** `team-tickets`. Owned by a specific team. Versioned as `1.x`.
- **Scope.** Read-only access to the team's ticket store. Three tools: `list_open_tickets`, `get_ticket_detail`, `search_tickets_by_text`. Explicitly does not: write tickets, modify status, send notifications.
- **Auth.** Caller identity propagates from the program-pinned plugin. Per-tool: all three are read-only and broadly authorised; if a future tool adds a write capability, it goes in a gated `team-tickets-write` companion server.
- **Packaging.** Distributed via the program's pinned channel; consumers install with the standard install command. Pinned to `1.x`.
- **Contracts.** `list_open_tickets(filter)` returns `{ tickets: [{id, title, status, owner, age_days}, …] }`. `get_ticket_detail(id)` returns a typed Ticket object. `search_tickets_by_text(query, limit)` returns the same shape as `list_open_tickets`. Errors are typed: `unauthorised`, `not_found`, `rate_limited`, `query_too_broad`.
- **Observability.** Standard per-call logging plus a quarterly "who is using this server" report.

Three teams adopt it in the first month; ten by the third. The server is small, scoped, owned, and useful — the canonical shape of a Black-Belt-authored internal MCP server.

---

## Common failure modes

**Scope creep.** "While we're at it, we should also expose write tools." Fix: a separate companion server. Two servers with bounded jobs are better than one omnibus server.

**Skipping auth design.** "Everyone in the program can read everything." Real for some tools; not for tools that touch regulator-scoped data. Fix: design the auth layer per-tool from day one.

**No packaging plan.** "We'll figure out distribution when other teams ask." Then nobody asks because nobody knows. Fix: distribute via the pinned channel from day one.

**Free-form output.** A tool that returns a Markdown blob looks friendly but composes badly. Fix: structured outputs; consumers Markdown-format on their side.

**Untyped errors.** "An error occurred." The agent has nothing to reason against. Fix: typed errors with named shapes.

**No observability.** "We'll add metrics when we see a problem." Then a problem arrives invisibly. Fix: logging on day one; dashboards before the first cohort install.

**Treating the server as a one-team artefact.** A server installed by other PODs is now infrastructure; you cannot move fast and break things on it. Fix: treat the server as a contract from the day a second team installs.

---

## GREEN / YELLOW / RED self-check

- 🟢 GREEN: I can scope, design, package, and observe an internal MCP server other PODs adopt; my server's contracts are stable across versions; my deprecation story is real.
- 🟡 YELLOW: I have authored an MCP server but the scope is broad, the auth is informal, or the packaging is ad-hoc.
- 🔴 RED — I have not authored an internal MCP server.

---

## What you can say after this module

> "I author internal MCP servers with bounded scope, real auth, sound packaging, typed contracts, and observability — not omnibus servers other teams cannot reason about."

---

## Where to go next

B.2 (*Publishing a skill pack*) is the immediate complement. An MCP server gives other agents tools; a skill pack gives them workflows. Together they are the platform layer.

**Previous:** [← Part A README](README.md) · **Next:** [→ B.2 Publishing a skill pack](B02-skill-pack-publishing.md)

**Further reading**

- [Anthropic on the Model Context Protocol](https://modelcontextprotocol.io/)
- [G.8 — Subagents](../../03-green/a-craft/G08-subagents.md)
- [Yellow Belt Y.9 — Figma MCP for non-engineers](../../02-yellow/Y09-figma-mcp.md) — a consumer-side companion
