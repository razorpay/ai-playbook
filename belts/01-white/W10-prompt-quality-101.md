---
title: "Prompt quality 101"
slug: "belts/white/prompt-quality-101"
section: "belts"
status: "drafted"
type: "chapter"
track: "white"
order: 10
time_minutes: 20
audience: "new-builder"
outcome: "Turn vague asks into scoped prompts with goal, context, constraints, and success criteria."
prev: "belts/white/first-conversation"
next: "belts/white/permission-system"
pillar: "prompt"
belt: "white"
tags: ["white-belt", "prompt-quality", "claude-code"]
updated: "2026-04-27"
---

# W.10 - Prompt quality 101

Prompt quality is not fancy wording. It is the difference between "make it better" and "find the auth handlers in this repo, explain them, and do not edit files."

White Belt prompts are simple. They name the goal, give enough context, set boundaries, and define what a good answer looks like.

---

## If you're short on time

- A good prompt says: goal, context, constraints, success criteria.
- Avoid verbs like "fix," "improve," and "clean up" unless you define the target.
- Ask Claude to explain or plan before asking it to edit.

---

## The mental model

Use this shape:

```text
Goal: what I want to accomplish.
Context: what you should know before helping.
Scope: what files, folders, or behaviours are in bounds.
Constraints: what not to do.
Success criteria: how we know the answer is useful.
```

The prompt does not need to be long. It needs to remove the dangerous ambiguity.

---

## Bad, better, good

Bad:

```text
Make this better.
```

Better:

```text
Improve the README for a first-time reader.
```

Good:

```text
Goal: make the README easier for a first-time White Belt reader.
Context: this is a sandbox repo used for learning PR flow.
Scope: README.md only.
Constraints: keep the change under five lines, do not change setup instructions, do not commit.
Success criteria: propose the change first, then wait for approval before editing.
```

The good prompt is not impressive. It is just reviewable.

---

## Worked example: finding before fixing

Suppose you want to understand auth code later in your journey. A vague prompt would be:

```text
Fix auth.
```

That is too broad and too risky.

White Belt version:

```text
Goal: understand where auth-related code appears in this repo.
Scope: search file names and code references only.
Constraints: do not edit files, do not run tests, and do not inspect anything outside this repo.
Success criteria: list the likely files and explain why each looks relevant.
```

This prompt does not ask Claude to solve the problem before you understand the terrain.

---

## Prompt moves you can reuse

| Move | Prompt fragment |
|---|---|
| Orient | "Read the README and file tree, then summarize the repo shape." |
| Narrow | "Only inspect these files; do not search the whole repo." |
| Plan | "Propose two options with trade-offs; do not edit yet." |
| Minimize | "What is the smallest safe change?" |
| Review | "Show me the diff and explain each changed line." |
| Stop | "Do not continue. Summarize the current state." |

These fragments are more useful than memorizing complete prompts.

---

## Common failure modes

**"The answer is technically correct but not useful."** Your success criteria were probably missing. Say what useful means.

**"Claude changed too many files."** Your scope was too wide or missing. Ask it to revert only its last proposed change if safe, then restart smaller.

**"I asked for a fix before I understood the problem."** Switch back to Orient: "Explain the relevant files before proposing any edit."

**"The prompt includes sensitive details."** Remove them. Use placeholders and describe the shape, not the private content.

**"I wrote a huge prompt and got a huge answer."** White Belt prompts should be compact. The goal is not to bury Claude in instructions.

---

## GREEN / YELLOW / RED self-check

You are **GREEN** if:

- you can rewrite "make it better" into a scoped prompt;
- your prompt has goal, context, constraints, and success criteria;
- you ask for explanation before edits in unfamiliar code;
- you can stop Claude when the answer drifts.

You are **YELLOW** if:

- your prompts often produce large plans;
- you forget constraints;
- you struggle to define success criteria.

You are **RED** if:

- you include sensitive details in prompts;
- Claude edits files you did not intend;
- you cannot explain what you asked Claude to do.

---

## What you can say after this module

> "I can turn a vague ask into a scoped prompt that keeps the work reviewable."

---

**Previous:** [W.9 Your first conversation with Claude Code](W09-first-conversation.md) - **Next:** [W.11 The permission system](W11-permission-system.md)

