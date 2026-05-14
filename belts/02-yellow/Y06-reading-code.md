---
title: "Reading unfamiliar code with Claude"
slug: "belts/yellow/reading-code"
section: "belts"
status: "drafted"
type: "chapter"
track: "yellow"
order: 6
time_minutes: 30
audience: "daily-builder"
outcome: "Use Claude Code to orient in an unfamiliar repo without immediately editing or over-reading."
prev: "belts/yellow/claude-md-primer"
next: "belts/yellow/permissions-and-hooks"
pillar: "prompt"
belt: "yellow"
tags: ["yellow-belt", "reading-code", "repo-orientation"]
updated: "2026-04-27"
---

# Y.6 - Reading unfamiliar code with Claude

Yellow Belt builders do not need to understand every file in a repo. They need to find the right neighbourhood, understand the local pattern, and avoid changing code they have not oriented around.

Claude Code is excellent at repo orientation when you ask it to read like a guide, not act like a fixer.

---

## If you're short on time

- Start with repo purpose, file tree, README, project guidance, and package scripts.
- Ask for likely neighbourhoods, not the whole architecture.
- Keep the first pass read-only.

---

## The mental model

```text
Map -> Neighbourhood -> Local pattern -> Possible change
```

Do not skip from Map to Possible change.

Map:

- What kind of repo is this?
- What are the major folders?
- How does it run?

Neighbourhood:

- Where is the surface or behaviour likely implemented?

Local pattern:

- How do nearby files solve similar problems?

Possible change:

- What is the smallest safe edit?

---

## Worked example: service repo

Prompt:

```text
Goal: orient me in this service repo before I ask for any change.
Scope: README, project guidance, package metadata, top-level folders.
Constraints: do not edit files and do not run tests yet.
Success criteria:
- tell me what this service appears to own;
- list the three folders I should understand first;
- name the command that appears to run tests, marking inference if unsure.
```

Follow-up:

```text
Now locate where request validation is likely implemented.
Inspect only file names and nearby imports first.
Do not edit.
```

This keeps the orientation narrow and useful.

---

## Worked example: frontend repo

Prompt:

```text
Goal: find where the transactions empty state is rendered.
Context: the symptom is an empty state after applying a date filter.
Scope: routes, page components, filter components, empty-state components.
Constraints: do not edit, do not run install commands.
Success criteria: list likely files and explain the evidence for each.
```

Good answer shape:

```text
Likely files:
1. src/pages/transactions/index.tsx - route entry.
2. src/components/TransactionFilters.tsx - owns date filter state.
3. src/components/EmptyState.tsx - renders empty state copy.

Evidence:
- route import points to filter component;
- filter component transforms date range;
- empty state receives result count.
```

If the answer only says "probably," ask for evidence.

---

## The evidence versus inference prompt

Use this often:

```text
Separate evidence from inference.
For every likely file, tell me what you saw and what you are guessing.
```

This one prompt prevents a surprising amount of drift.

---

## Common failure modes

**"Claude summarized the whole repo and I learned nothing."** Ask for the three folders relevant to your task, not a tour.

**"I let it edit before I understood the local pattern."** Stop. Ask it to show nearby examples first.

**"The answer names likely files but no evidence."** Ask for evidence versus inference.

**"I ran tests too early."** First locate. Then choose the smallest check.

**"I treated repo orientation as a one-time thing."** Re-orient after branch switches or large diffs.

---

## GREEN / YELLOW / RED self-check

You are **GREEN** if:

- you can run a read-only repo orientation prompt;
- you can locate a relevant neighbourhood;
- you ask for evidence versus inference;
- you stop before edits in unfamiliar code.

You are **YELLOW** if:

- you understand the repo map but not the local pattern;
- Claude's explanation feels plausible but thin;
- the task crosses multiple folders.

You are **RED** if:

- you cannot identify the owning repo;
- Claude proposes edits before locating files;
- the likely fix touches many services or backend contracts.

---

## What you can say after this module

> "I can use Claude Code to find the right neighbourhood in an unfamiliar repo before changing anything."

---

**Previous:** [Y.5 CLAUDE.md primer](Y05-claude-md-primer.md) - **Next:** [Y.7 Permissions, hooks, slash commands](Y07-permissions-and-hooks.md)

