---
title: "Quest Y-1: Ship the Stand-up Bot"
slug: "belts/yellow/quest-standup-bot"
section: "belts"
status: "drafted"
type: "quest"
track: "yellow"
order: 90
time_minutes: 360
audience: "daily-builder"
outcome: "Build a small working utility with Claude Code, demo it, and explain the prompt, context, and harness decisions."
prev: "belts/yellow/staying-current"
next: "belts/yellow/quest-30-day-challenge"
pillar: "harness"
belt: "yellow"
tags: ["yellow-belt", "quest", "utility", "standup-bot"]
updated: "2026-04-27"
---

# Quest Y-1 - Ship the Stand-up Bot

> **Win condition:** a small utility runs, solves a real repeated task, and has a short demo plus a Three Pillars retro.

The quest name says "Stand-up Bot," but the shape matters more than the exact utility. Build something small that saves repeated effort: a Slack formatter, a docs summarizer, a spreadsheet cleanup script, a weekly update drafter, or a stand-up digest helper.

---

## Prerequisite

You need:

- White Belt complete;
- Yellow modules Y01-Y08 read;
- a GREEN local environment;
- one repeated task worth making lighter;
- a repo, gist, or approved workspace where the utility can live.

If the task touches sensitive data, choose another task or reduce it to redacted sample input.

---

## The task

Build a small utility end-to-end with Claude Code in a single working day.

The utility should:

- accept an input you can safely share;
- produce a useful output;
- run more than once;
- have a short README or usage note;
- be demoable in under two minutes.

The utility does not need to be production software. It does need to run.

---

## Four copyable ideas

**Stand-up formatter.** Input: rough bullets. Output: structured yesterday/today/blockers update.

**Docs summarizer.** Input: a redacted meeting note. Output: decisions, action items, open questions.

**Spreadsheet cleanup helper.** Input: sample CSV with fake data. Output: normalized column names or sorted rows.

**PR description drafter.** Input: `git diff --stat` plus your notes. Output: PR sections you review before using.

Pick the one closest to your real work.

---

## Worked build loop

Prompt:

```text
Goal: build a tiny stand-up formatter utility.
Context: I often start with rough bullets and need a clean update.
Input shape: plain text bullets with optional labels.
Output shape: Yesterday, Today, Blockers.
Constraints:
- use sample data only;
- keep implementation in one small file plus README;
- do not add dependencies unless necessary;
- show a plan before editing.
Success criteria:
- I can run it locally;
- README shows usage;
- sample input produces structured output.
```

After plan:

```text
Apply the smallest implementation. Then show me:
1. files changed;
2. how to run it;
3. sample output.
```

Then run the command yourself. Do not claim success from code alone.

---

## Three Pillars retro

Your retro must name:

| Pillar | What to record |
|---|---|
| Prompt | Which prompt made the task clearer? |
| Context | What input, examples, or constraints did Claude need? |
| Harness | What command, test, README, or demo made the output reviewable? |

Example:

```text
Prompt: the useful move was defining input and output shapes before asking for code.
Context: I gave two fake stand-up examples and the sections I wanted.
Harness: I kept it to one script and a sample command in README, then ran it locally.
```

---

## Evidence template

```markdown
## Quest Y-1 evidence

Builder handle:
Date:
Utility name:
Repo or artefact URL:
Demo link or screenshot:
How to run:

Prompt decision:
Context decision:
Harness decision:

Reviewer or pair:
Follow-up needed:
```

---

## What counts

This counts:

- a utility that runs locally;
- a README or usage note;
- a short demo;
- a retro that names prompt, context, and harness decisions;
- safe sample input.

This does not count:

- a tool that does not run;
- a prompt-only idea with no artefact;
- a utility built without Claude Code;
- a retro that only says "Claude wrote it";
- use of sensitive raw work data.

---

## Common failure modes

**"I picked a task too large for one day."** Cut it down to one input and one output.

**"The utility works only on my exact sample."** That may be fine for Yellow if the sample is representative. Name the limitation.

**"Claude added dependencies."** Ask whether the task can be done without them. Small utility first.

**"The demo is confusing."** Demo one happy path. Save edge cases for later.

---

## Success criteria

You pass Quest Y-1 when:

- the utility runs;
- usage is documented;
- demo evidence exists;
- the Three Pillars retro exists;
- no sensitive material is included.

---

## What you can say after this quest

> "I can build a small useful utility with Claude Code and explain the decisions that made it work."

---

**Previous:** [Y.14 Staying current](Y14-staying-current.md) - **Next:** [Quest Y-2 The 30-day challenge](quest-Y2-30-day-challenge.md)

