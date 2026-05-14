---
title: "Bug hunting with AI"
slug: "belts/yellow/bug-hunting"
section: "belts"
status: "drafted"
type: "chapter"
track: "yellow"
order: 11
time_minutes: 30
audience: "daily-builder"
outcome: "Use AI, git history, connectors, and repo reading to find a small real bug worth fixing."
prev: "belts/yellow/slack-and-gworkspace-mcps"
next: "belts/yellow/debugging-loop"
pillar: "prompt"
belt: "yellow"
tags: ["yellow-belt", "bug-hunting", "triage"]
updated: "2026-04-27"
---

# Y.11 - Bug hunting with AI

The Yellow Belt boss fight grades the loop: notice, triage, propose, ship. This module teaches the first half. You are not looking for heroic bugs. You are looking for small real papercuts that can teach you the system.

---

## If you're short on time

- Pick a surface you use weekly; familiarity helps you spot real friction.
- Write the symptom in one sentence before opening code.
- Use git history and connectors to understand context before proposing a fix.

---

## The mental model

```text
Notice -> Symptom -> Reproduce -> Locate -> Triage -> Candidate fix
```

AI helps with Locate and Triage. You still own Notice and judgement.

---

## What makes a good Yellow bug

Good:

- visible to you;
- reproducible;
- small;
- likely frontend or documentation scoped;
- has a clear before/after;
- can be reviewed by a surface owner.

Risky:

- payment flow behaviour;
- security or compliance behaviour;
- backend contract changes;
- multi-service changes;
- data correctness;
- anything you cannot reproduce.

Risky does not mean unimportant. It means not Yellow Belt boss-fight scope.

---

## Worked example: from annoyance to candidate

Observation:

```text
The transaction table shows an empty state after I apply a date filter, even though matching rows exist.
```

Prompt:

```text
Goal: triage a small dashboard bug candidate.
Symptom: the transaction table shows an empty state after applying a date filter that should return rows.
Context: I can reproduce locally. A messaging thread suspected date range transform.
Scope: locate likely frontend files first.
Constraints: do not edit files.
Success criteria:
- list likely files;
- identify recent relevant git changes;
- suggest whether this is Yellow Belt scope.
```

Follow-up:

```text
Run read-only git history checks on the likely files and summarize recent changes. Do not edit.
```

Triage summary:

```text
Likely area: date filter transform in dashboard table component.
Evidence: route imports filter component; recent commit touched date formatting; empty state reads filtered result count.
Scope: likely frontend-only if data exists before filter transform.
Next step: propose two smallest fixes, no edit yet.
```

That summary goes into the PR later.

---

## Git history questions

Ask:

```text
For these likely files, summarize recent git history relevant to this symptom.
Use git log and blame only as needed.
Do not edit.
```

Look for:

- recent changes near the bug;
- commit messages naming the surface;
- refactors around the state;
- old code that probably was not the cause;
- reviewers or owners in the history.

Git history is not blame. It is context.

---

## Common failure modes

**"I picked a bug I cannot reproduce."** Park it. Choose a reproducible one for Yellow Belt.

**"Claude found a big architectural issue."** That may be real, but it is not this belt. Scope down.

**"I skipped the symptom sentence."** Without it, triage drifts. Write the sentence first.

**"I searched Slack after coding."** Search before coding. Prior context can change the fix.

**"I treated git blame as personal blame."** Do not. It is a map, not a courtroom.

---

## GREEN / YELLOW / RED self-check

You are **GREEN** if:

- you can write a one-sentence symptom;
- you can reproduce the issue;
- you can locate likely files;
- you can produce a triage paragraph before fixing.

You are **YELLOW** if:

- the symptom is real but hard to reproduce;
- likely files span multiple surfaces;
- git history raises questions you cannot answer.

You are **RED** if:

- the bug touches regulated or sensitive flows;
- backend contracts appear necessary;
- you cannot explain the user-facing impact.

---

## What you can say after this module

> "I can find a small real bug and build enough context to decide whether it is safe to fix."

---

**Previous:** [Y.10 Slack and Google Workspace MCPs](Y10-slack-and-gworkspace-mcps.md) - **Next:** [Y.12 Debugging with Claude](Y12-debugging-loop.md)

