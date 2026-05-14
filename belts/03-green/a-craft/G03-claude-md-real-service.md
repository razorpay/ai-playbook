---
title: "CLAUDE.md for a real service — WHAT + WHY, under 200 lines"
slug: "belts/green/claude-md-real-service"
section: "belts"
status: "drafted"
type: "chapter"
track: "green"
order: 3
time_minutes: 45
audience: "experienced-builder"
outcome: "Write a CLAUDE.md that names what the service is, what matters, and what to avoid — under 200 lines, with WHY beside every rule."
prev: "belts/green/context-windows"
next: "belts/green/hierarchical-claude-md"
pillar: "context"
belt: "green"
tags: ["green-belt", "claude-md", "context-engineering"]
updated: "2026-04-29"
---

# G.3 — CLAUDE.md for a real service

A `CLAUDE.md` is the single most leveraged artefact in your context budget. The agent reads it on every session start; a 100-line file improves a hundred turns of conversation. This chapter is the longest in Part A on purpose: a real service deserves a real CLAUDE.md, and the difference between a 50-line file that helps and a 50-line file that does not is in the *shape*, not the length.

---

## If you're short on time

- A good CLAUDE.md answers three questions in plain English: what is this, what matters, what to avoid.
- Every rule needs a "why" — the reason the rule exists. Without the why, the agent will follow the rule mechanically and break it the first time the situation looks slightly different.
- Keep it under 200 lines. If you go longer, you are doing the work of G.4 (Hierarchical CLAUDE.md) badly.

---

## The mental model

Think of CLAUDE.md as a one-page constitution for the directory the agent is working in. It is the contract that shapes every session that opens here.

Three sections, one purpose each:

```
   ┌────────────────────────────────────────────┐
   │              CLAUDE.md                      │
   ├────────────────────────────────────────────┤
   │                                              │
   │  WHAT IS THIS    →  Give context about the  │
   │                     service, its place in   │
   │                     the system, its scale.  │
   │                                              │
   │  WHAT MATTERS    →  The constraints that    │
   │                     shape every change.     │
   │                                              │
   │  WHAT TO AVOID   →  The redlines and known  │
   │                     traps. Always with WHY. │
   │                                              │
   └────────────────────────────────────────────┘
```

The agent reads this once per session and uses it to evaluate every proposed change. A good CLAUDE.md compresses years of tribal knowledge into something the agent can act on; a bad one is a wish list of generic principles that do nothing.

---

## A worked CLAUDE.md, end to end

This is a sample `CLAUDE.md` for a hypothetical reporting service. Read it carefully; the rest of this chapter dissects why every section is shaped the way it is.

```markdown
# CLAUDE.md — reporting-service

## What this is

A read-only HTTP service that aggregates merchant transaction data into
weekly and monthly reports. Backed by a read replica of the primary
payments database; never writes to that DB. Runs on the org-approved
Node.js runtime, deployed via the standard pipeline. Latency budget is
2s p95 for the dashboard view; report generation runs async via the
job queue, not in the request path.

This service is a downstream consumer of payments. We do not own
payment correctness; we own surface area. If a number looks wrong, the
question is "is our query right" not "did the payment happen."

## What matters

### The read-replica rule (HARD)

This service never writes to the primary payments database. All
queries go to the read replica. WHY: a stray write here can corrupt
ledger records that the rest of the company depends on. There is no
"just this once" exception.

### Currency handling

All amounts are stored and computed in minor units (paise for INR).
We display major units in the UI but never compute on them. WHY:
floating-point drift on currency is the most common bug in this
codebase. Three of the last six post-mortems were this.

### Time zones

All timestamps in the database are UTC. All displayed timestamps are
in IST. The conversion happens at the boundary, in `lib/time.ts`.
WHY: mixing zones inside the codebase is how the Q3 rollover bug got
shipped.

### The aggregation cache

Reports are pre-aggregated and cached. The cache is the source of
truth for "what the report shows;" the live query is the source of
truth for "what the data is." If they disagree, the cache is
authoritative for what the user sees but the query is authoritative
for the next aggregation. WHY: a synchronous re-query on every
request would melt the read replica.

## What to avoid

### Do not add new dependencies

The service has 12 npm dependencies. Adding a thirteenth requires a
written-up reason and a security-team approval. WHY: every dependency
is a CVE surface and a build-time cost; we are deliberately small.

### Do not write tests against the live DB

All tests use the seeded fixture in `tests/fixtures/`. WHY: the live
DB has variable data; flaky tests teach reviewers to ignore CI; we
already lived through that.

### Do not edit the migrations folder by hand

Migrations are append-only and generated. WHY: the team has a runbook
for forward and rollback; manual edits skip the runbook and have
caused two incidents.

### Do not add logging to the hot path

The dashboard endpoint runs ~50k req/min at peak. New log lines on
that path must be debated; logging volume costs more than people
think. WHY: last log explosion cost the team a week of cleanup.

### Do not skip the design-system connector for new UI

If a change adds a UI component, use the design-system connector to
choose the component. WHY: ad-hoc components drift; we have the
production-compiler skill for fixing AI-Studio output, but the right
move is to not generate ad-hoc components in the first place.

## Conventions worth knowing

- The route handlers in `routes/` are kept thin — fetch, transform,
  return. Business logic lives in `services/`.
- Tests are colocated with the file under test. `foo.ts` →
  `foo.test.ts` next to it. Fixtures live in `tests/fixtures/`.
- Errors flow up; the route layer turns them into HTTP codes. Do not
  swallow errors in `services/`.
- The cache key format is documented in `services/cache.ts`. Do not
  invent new key formats.

## How to ask for help

If you (the agent) are stuck, the right move is to surface the
specific question, not guess. Acceptable: "I need to know whether the
read replica supports the LATERAL join syntax in this migration."
Not acceptable: silently picking a join syntax and shipping the
diff.

## What this CLAUDE.md is not

This file is not the architecture document. It is the agent-facing
constitution. The architecture lives in the team's wiki; if you need
deeper background, the agent can ask and a human can paste in the
relevant section.
```

That is 110 lines. It compresses two years of incident learnings, the team's read-replica rule, currency handling, time zones, the migrations runbook, the logging discipline, the design-system rule, the error pattern, and the help protocol. The agent gets all of this on every session start.

---

## Why each section is shaped the way it is

### "What this is" comes first

The agent has read no code yet. Without a paragraph framing the service's place in the system, the agent will pick up rules without context and apply them too narrowly or too widely. The "downstream consumer of payments" line in the example does enormous work: it tells the agent that "if a number looks wrong" is a query bug, not a payment bug. That single sentence saves hours over a year of sessions.

### "What matters" leads with HARD rules

Hard rules (the read-replica rule, currency in minor units, UTC in the DB) are stated first because they are the rules whose violation would cause the worst incidents. The agent should know these before knowing anything else. Each rule names *what* and *why*. The why is what lets the agent extrapolate to situations the rule did not literally name.

### Every rule has a why

This is the single most important shape rule in CLAUDE.md authorship. A rule without a why is brittle. Faced with a slightly different situation, the agent will either follow the rule mechanically (often wrong) or break it (also often wrong). With a why, the agent can reason: "this case is different in a way that does not violate the underlying reason, so the rule does not apply" or "this case is different but the underlying reason still applies, so the rule extends."

The "WHY: three of the last six post-mortems were this" line in the currency section is doing the same job as a senior engineer pairing on the change. It transmits the *cost of getting it wrong*, not just the rule.

### "What to avoid" is bounded and concrete

Each "do not" item names the action and the specific cost. Not "follow good security practices" — that is a wish, not a rule. "Do not add new dependencies" with the specific rationale and the specific approval path is actionable.

### Conventions are the tail, not the head

The conventions section is at the bottom because it is the lowest-stakes content. A wrong handler shape costs a code-review comment. A wrong read-replica decision costs an incident. Order matters; the agent's attention falls off as the file grows.

---

## Length discipline

The example is 110 lines. The 200-line ceiling is not a rule against documentation; it is a rule against trying to make CLAUDE.md a do-everything file. If your CLAUDE.md is heading past 200 lines, ask:

- can a sub-directory get its own CLAUDE.md (G.4 covers this);
- can a worked example move to a skill body (G.6 / G.7);
- can the architecture detail move to a wiki page the agent can fetch on demand;
- can a "good to know" item just be removed?

A 100-line CLAUDE.md that the agent reads carefully is better than a 400-line CLAUDE.md whose middle the agent skims.

---

## Common failure modes

**Stating rules without whys.** The most common shape error. Fix: every "do" or "do not" line gets a "WHY:" line. If you cannot write the why, the rule is probably not load-bearing.

**Vague principles that do nothing.** "Write clean code." "Follow best practices." "Be respectful in PR comments." None of these change what the agent does. Fix: replace with one specific named rule per principle.

**A CLAUDE.md that argues with the codebase.** The file says "we always use approach X" but the existing code uses approach Y. The agent gets confused; the codebase wins. Fix: when reality and CLAUDE.md disagree, fix one of them.

**Over-documenting low-stakes conventions.** The route-handler shape rule is a one-line convention. Spending a paragraph on it crowds out the read-replica rule. Fix: name it once, move on.

**Letting it grow.** Every new rule feels worth adding. Three months later, the file is 600 lines and nobody trims it. Fix: a quarterly review where every rule justifies its presence; remove anything that has not earned its line.

---

## GREEN / YELLOW / RED self-check

- 🟢 GREEN — I can write a CLAUDE.md for any service my team owns, under 200 lines, with WHY beside every rule, in under an hour.
- 🟡 YELLOW — I have written a CLAUDE.md but it leans on principles instead of named rules. I struggle to write whys.
- 🔴 RED — I have not written a CLAUDE.md from scratch.

---

## What you can say after this module

> "I can write a CLAUDE.md that compresses my team's tribal knowledge into rules with whys, under 200 lines, that the agent will actually follow."

---

## Where to go next

G.4 — *Hierarchical CLAUDE.md* — covers what to do when 200 lines is not enough. The right answer is rarely "a longer file"; it is usually "more files at the right level."

**Previous:** [← G.2 Context windows](G02-context-windows.md) · **Next:** [→ G.4 Hierarchical CLAUDE.md](G04-hierarchical-claude-md.md)

**Further reading**

- [Yellow Belt Y.5 — CLAUDE.md primer](../../02-yellow/Y05-claude-md-primer.md)
- [Anthropic on agent context engineering](https://code.claude.com/docs/en/best-practices)
