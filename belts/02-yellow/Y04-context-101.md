---
title: "What Claude can see and what it cannot"
slug: "belts/yellow/context-101"
section: "belts"
status: "drafted"
type: "chapter"
track: "yellow"
order: 4
time_minutes: 20
audience: "daily-builder"
outcome: "Understand local files, pasted context, connector context, and the limits of what Claude can see."
prev: "belts/yellow/prompt-quality-deep"
next: "belts/yellow/claude-md-primer"
pillar: "context"
belt: "yellow"
tags: ["yellow-belt", "context", "claude-code"]
updated: "2026-04-27"
---

# Y.4 - What Claude can see and what it cannot

Claude is not sitting inside every system you use. It sees what the surface gives it, what you paste, what connectors expose, and what you permit it to inspect. Yellow Belt builders stop treating context as magic and start treating it as an explicit input.

---

## If you're short on time

- Claude Code sees the repo through the permissions and tools you grant, not every system at Razorpay.
- A chat surface sees pasted or uploaded context, not your local repo unless you provide it.
- Connectors expose specific tool context; they do not make every private detail safe to use.

---

## The mental model

```text
Task quality = prompt quality + context quality + review quality
```

Context comes in layers:

| Layer | Example | Risk |
|---|---|---|
| Local repo | files Claude Code reads | broad inspection or accidental edits |
| Pasted text | ticket summary, error output | leaking sensitive material |
| Connector context | Slack thread, doc, design, ticket | over-broad search or private details |
| Generated state | Claude's own summary | stale or incorrect assumptions |

Your job is to manage the boundary between those layers.

---

## What Claude Code can see

Claude Code can inspect files and run commands when you allow it. It does not automatically understand:

- which team owns the repo;
- which surface is safest to edit;
- which private context is allowed;
- which production incident is related;
- which design is canonical;
- which reviewer should approve the PR.

You bring that context.

Good prompt:

```text
Context: this repo owns the internal dashboard surface. The bug appears only after applying a date filter. The likely area is search or filter state.
Scope: inspect the dashboard route and nearby components. Do not edit.
```

---

## What chat surfaces can see

Chat surfaces see what you provide. They are excellent for:

- explaining a concept;
- summarizing a redacted excerpt;
- drafting a PR description;
- comparing approaches;
- rehearsing a plan.

They are weak for:

- claiming file paths without repo access;
- giving exact code changes without code;
- verifying whether a PR is safe;
- checking local test output unless you paste it.

If a chat answer names a file it cannot see, treat that as a guess.

---

## Worked example: context packet

Before asking Claude Code to triage a bug, build a compact packet:

```text
Symptom: after filtering transactions by date, the list shows an empty state even when matching records exist.

Observed in: local dashboard, staging-like data set.

Outside context:
- a Slack thread says this may have started after the date-picker change;
- no ticket found;
- design expects the empty state only when no records match.

Ask:
Locate likely frontend files. Do not edit. Separate evidence from inference.
```

This is better than pasting an entire thread or saying "search everything."

---

## Context freshness

Claude may summarize a state early in the conversation. That summary can go stale.

Refresh context when:

- you changed files;
- tests ran after the last summary;
- a reviewer left new feedback;
- a connector search found new material;
- you switched branches;
- more than one hour passed in a long session.

Prompt:

```text
Refresh your understanding from git status and the files we changed. Summarize current state before proposing next steps.
```

---

## Common failure modes

**"Claude said a file exists, but it does not."** It inferred from naming patterns. Ask it to verify by listing files.

**"I pasted a whole Slack thread."** Summarize and redact first. The model does not need every reaction and side conversation.

**"The answer used stale context."** Ask for a state refresh.

**"I assumed connector access meant approval."** Access and appropriateness are different. Use only task-relevant context.

**"I forgot to tell Claude what I already tried."** That makes it repeat failed steps. Put failed attempts in the context packet.

---

## GREEN / YELLOW / RED self-check

You are **GREEN** if:

- you can say what surface can see the relevant context;
- you can create a five-line context packet;
- you can ask Claude to separate evidence from inference;
- you refresh context after changes.

You are **YELLOW** if:

- you know context is missing but not where it lives;
- you paste more than needed;
- you forget to mention failed attempts.

You are **RED** if:

- sensitive details enter prompts;
- Claude acts on unverified assumptions;
- you cannot tell what context an answer used.

---

## What you can say after this module

> "I can manage what Claude sees instead of assuming it knows the world."

---

**Previous:** [Y.3 Prompt quality, deep dive](Y03-prompt-quality-deep.md) - **Next:** [Y.5 CLAUDE.md primer](Y05-claude-md-primer.md)

