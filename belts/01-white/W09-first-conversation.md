---
title: "Your first conversation with Claude Code"
slug: "belts/white/first-conversation"
section: "belts"
status: "drafted"
type: "chapter"
track: "white"
order: 9
time_minutes: 30
audience: "new-builder"
outcome: "Start Claude Code safely, ask a scoped first question, and review the answer before allowing edits."
prev: "belts/white/green-yellow-red"
next: "belts/white/prompt-quality-101"
pillar: "prompt"
belt: "white"
tags: ["white-belt", "claude-code", "prompting"]
updated: "2026-04-27"
---

# W.9 - Your first conversation with Claude Code

The first useful Claude Code conversation is not "build me something." It is "help me understand where I am, then propose the smallest next step."

This module sets the voice for the rest of the belt: calm, scoped, reviewable. Claude Code is powerful, but White Belt work should feel like sitting beside a careful teammate, not firing a cannon at the repo.

---

## If you're short on time

- Start by asking Claude to inspect and explain. Do not ask it to edit first.
- Give goal, scope, constraints, and success criteria in plain English.
- After every answer, decide: ask a follow-up, approve a small action, or say no.

---

## The mental model

Claude Code works best when you separate three moves:

```text
Orient -> Plan -> Act
```

**Orient** means Claude reads the local context and explains what it sees.

**Plan** means Claude proposes steps before changing files.

**Act** means Claude edits or runs commands after you understand the plan.

Most beginner pain comes from skipping Orient and Plan. White Belt trains the slower loop because it is safer and, usually, faster by the end.

---

## The first prompt

Open Claude Code from the root of an assigned sandbox repo:

```bash
pwd
git status
claude
```

Then use this prompt:

```text
I'm doing White Belt practice in this sandbox repo.

Goal: understand the repo well enough to make one tiny README change later.
Scope: inspect the file tree and README only.
Constraints: do not edit files, do not run install commands, and do not access anything outside this repo.
Success criteria: tell me what this repo appears to be, which file I should read first, and one safe next step.
```

This is a good first prompt because it gives Claude:

- a goal;
- a scope;
- constraints;
- success criteria;
- permission boundaries.

It also makes "do nothing yet" explicit.

---

## Worked example transcript

You:

```text
I'm doing White Belt practice in this sandbox repo.
Goal: understand the repo well enough to make one tiny README change later.
Scope: inspect the file tree and README only.
Constraints: do not edit files, do not run install commands, and do not access anything outside this repo.
Success criteria: tell me what this repo appears to be, which file I should read first, and one safe next step.
```

Claude:

```text
I will inspect the file tree and README only, then summarize.
```

If Claude asks to run a read-only command like `ls` or open `README.md`, that is consistent with the prompt. If it asks to run installs, edit files, or inspect unrelated folders, say no and restate the scope.

A good answer looks like:

```text
This appears to be a small documentation sandbox. The README is the first file to read.
Safe next step: add one line under the practice section, then use git diff to review it.
```

Now ask:

```text
Before editing, show me the exact one-line change you would make and why it is safe.
```

Only after that do you allow the edit.

---

## The first edit prompt

When ready:

```text
Apply only the one-line README change you proposed.
After editing, show me the diff.
Do not commit.
```

Notice what this prompt does:

- "Apply only" limits scope.
- "Show me the diff" forces review.
- "Do not commit" keeps git control with you.

After the edit:

```bash
git diff
git status
```

Read both. Then decide whether to keep the change.

---

## Common failure modes

**"Claude started editing before I understood."** Stop the action if possible. Ask it to summarize what changed. Use `git diff`.

**"I gave a vague prompt and got a vague answer."** Add goal, scope, constraints, and success criteria.

**"Claude read too much."** Narrow the scope: "Only inspect README.md and package metadata. Do not open source files."

**"Claude proposed a large change."** Ask: "What is the smallest safe change that still satisfies the goal?"

**"I trusted the answer because it sounded confident."** Confidence is not evidence. For file changes, the diff is evidence.

---

## GREEN / YELLOW / RED self-check

You are **GREEN** if:

- you can start Claude Code from a sandbox repo;
- your first prompt includes goal, scope, constraints, and success criteria;
- Claude can inspect without editing;
- you can review the diff after one small edit.

You are **YELLOW** if:

- Claude starts but permission prompts confuse you;
- your prompts produce broad plans;
- you need help reading the diff.

You are **RED** if:

- Claude Code cannot start;
- it cannot read the repo;
- you allowed edits and cannot tell what changed.

For RED, stop and recover with `git status` plus help.

---

## What you can say after this module

> "I can start a scoped Claude Code conversation and keep the first action reviewable."

---

**Previous:** [W.8 GREEN / YELLOW / RED](W08-green-yellow-red.md) - **Next:** [W.10 Prompt quality 101](W10-prompt-quality-101.md)

