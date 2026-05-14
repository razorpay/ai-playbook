---
title: "Hierarchical CLAUDE.md in a monorepo — root vs package vs local"
slug: "belts/green/hierarchical-claude-md"
section: "belts"
status: "drafted"
type: "chapter"
track: "green"
order: 4
time_minutes: 30
audience: "experienced-builder"
outcome: "Place the right rule at the right level — root, package, or local — so each session reads only the rules that apply to its working directory."
prev: "belts/green/claude-md-real-service"
next: "belts/green/claude-local-md"
pillar: "context"
belt: "green"
tags: ["green-belt", "claude-md", "monorepo", "hierarchy"]
updated: "2026-04-29"
---

# G.4 — Hierarchical CLAUDE.md

A single 200-line CLAUDE.md works for one service. A monorepo with five services and three shared libraries does not have one set of rules; it has many. Putting them all in one root file would cost everyone the budget of all of them. The Green Belt move is to place each rule at the level where it applies (root, package, or local) and let the agent compose the right context per session.

---

## If you're short on time

- Each working directory's CLAUDE.md is the *union* of itself and every CLAUDE.md above it on the path. The agent reads them all.
- Org-wide rules belong at the root. Service-specific rules belong in the service. Sub-feature rules belong nested deeper.
- Fewer rules at the root, more at the leaves. A leaf rule applies only when working in that leaf; a root rule applies everywhere.

---

## The mental model

```
   monorepo/
   ├── CLAUDE.md              ← org-wide rules (security, design system,
   │                             monorepo conventions, the way we PR)
   ├── apps/
   │   ├── reporting/
   │   │   ├── CLAUDE.md      ← reporting-specific rules from G.3
   │   │   └── ...
   │   ├── checkout/
   │   │   ├── CLAUDE.md      ← checkout-specific rules
   │   │   └── ...
   │   └── dashboard/
   │       ├── CLAUDE.md      ← dashboard-specific rules
   │       └── components/
   │           └── CLAUDE.md  ← UI-only rules for this folder
   └── packages/
       ├── shared-ui/
       │   └── CLAUDE.md      ← design-system contributor rules
       └── shared-utils/
           └── CLAUDE.md      ← utility-library rules
```

When the agent works in `apps/dashboard/components/`, it reads (in order):

1. `CLAUDE.md` at the monorepo root,
2. `CLAUDE.md` in `apps/dashboard/`,
3. `CLAUDE.md` in `apps/dashboard/components/`.

When it works in `packages/shared-ui/`, it reads:

1. `CLAUDE.md` at the monorepo root,
2. `CLAUDE.md` in `packages/shared-ui/`.

The agent never reads CLAUDE.md files on paths it is not working in. A reporting-service session never sees the checkout rules, and that is the point.

---

## What goes at each level

### Root CLAUDE.md (the smallest one, most-read file)

Org-wide rules that apply everywhere. Examples:

- the security redlines (no PII in prompts, the LLM-proxy rule);
- design-system convention (use the design-system connector before custom components);
- PR craft rules (titles, descriptions, the pre-ship-check skill);
- monorepo discipline (where tests live, how packages depend on each other).

Keep this file short. Every line here costs every session, regardless of where it works. A 50-line root CLAUDE.md is preferable to a 150-line one. The longer it is, the more it crowds out the per-directory specifics that actually need attention.

### Service / package CLAUDE.md (the workhorse)

The thing G.3 walked through. Service-level rules: the read-replica rule for reporting, the latency budget for checkout, the contributor protocol for shared-ui. This is where most of your CLAUDE.md authorship effort goes.

Each service deserves its own file. Resist the urge to merge two services' rules into a "common services" file at a higher level; the cost is paid by every session in either service.

### Sub-feature CLAUDE.md (small, narrow, optional)

For folders where a *narrower* set of rules applies than the parent service. Examples:

- a `components/` folder inside an app, where every file should use the design-system component map;
- a `migrations/` folder where the rules are append-only and require runbook approval;
- a `tests/` folder where the seeding pattern is non-obvious.

Sub-feature CLAUDE.md files should be the shortest of the lot. If a sub-feature CLAUDE.md is over 30 lines, ask whether the rules really belong at this level or at the service level.

---

## Worked example: the reporting service in a monorepo

Take the reporting-service CLAUDE.md from G.3. In a monorepo, parts of it are not service-specific. Rework:

**Move to the root CLAUDE.md** (org-wide):

- "Do not skip the design-system connector for new UI." This is true in every service.
- "Do not add new dependencies without security-team approval." Org-wide.
- The general "errors flow up" pattern, if your monorepo follows it everywhere.

**Keep in `apps/reporting/CLAUDE.md`** (service-specific):

- The read-replica rule (specific to this service's data layout).
- Currency handling in minor units (specific to financial services).
- The aggregation cache pattern (specific to this service's architecture).
- The 50k req/min log discipline (specific to this service's scale).
- Time-zone conversion at the boundary (this service's design choice).

**Add a `apps/reporting/migrations/CLAUDE.md`** (sub-feature):

- "Migrations are append-only and generated. The runbook is at `<wiki link>`. Manual edits skip the runbook." Five lines.

The result: a 50-line root file that every session reads, a 70-line service file that reporting sessions read, and a 5-line migrations file that only sessions inside that folder read. Total context spent on a reporting session: 125 lines. Total context spent on a checkout session: 50 lines + checkout's file. Each session pays for what it actually needs.

---

## When NOT to nest

Hierarchical CLAUDE.md is a tool, not an obligation. Cases where one file at the service level beats nesting:

- the sub-feature is too small to deserve its own file (a single-file folder, a one-page wiki, a tests folder with five tests);
- the sub-feature's rules are already obvious from the parent;
- the sub-feature is rarely worked on standalone — sessions tend to span the service, not the sub-feature.

A good test: would a reader find the sub-feature CLAUDE.md surprising and useful, or annoying and redundant? If the answer is the second, do not write it.

---

## Composition rules the agent applies

When CLAUDE.md files conflict, the *more specific* one wins by convention. If the root says "use approach A" and the service says "use approach B," the service wins inside that service. This is rare in practice (well-designed hierarchies do not contradict) but knowing the rule helps when you migrate from a flat to a hierarchical setup.

The agent does *not* automatically detect conflicts and ask. If your hierarchy has contradictions, the agent will follow whichever it read last and the result will be unpredictable. Run a mid-quarter audit; the cost is small and the surprise prevented is large.

---

## Common failure modes

**Putting service rules at the root.** A reporting-only rule at the root costs every checkout session, every dashboard session, every shared-utils session. Fix: move it down.

**Putting org-wide rules in every service file.** The same security redline copy-pasted into ten service CLAUDE.md files is ten copies of the same context. Fix: one copy at the root.

**Treating nesting as a way to write more.** The hierarchy is for *separation*, not for *expansion*. If you are nesting in order to fit more rules, you have not trimmed enough.

**Conflicting rules across levels.** Root says A, service says B. The agent picks one and you get unpredictable behaviour. Fix: agree at one level; remove from the other.

**Sub-feature CLAUDE.md for every folder.** Twenty CLAUDE.md files in a service is a maintenance nightmare and signals you are over-using the tool. Fix: most folders should not have one.

---

## GREEN / YELLOW / RED self-check

- 🟢 GREEN — Given a monorepo and a list of rules, I can place each rule at the right level and explain why.
- 🟡 YELLOW — I understand hierarchy in principle but my own monorepo has either everything at root or everything in services.
- 🔴 RED — My CLAUDE.md is one big file regardless of structure.

---

## What you can say after this module

> "I place each CLAUDE.md rule at the level where it applies (root, service, or sub-feature) so each session pays only for the context it actually needs."

---

## Where to go next

G.5 — *CLAUDE.local.md* — covers the personal overrides layer. Same hierarchy, but per-builder rather than per-team.

**Previous:** [← G.3 CLAUDE.md for a real service](G03-claude-md-real-service.md) · **Next:** [→ G.5 CLAUDE.local.md](G05-claude-local-md.md)
