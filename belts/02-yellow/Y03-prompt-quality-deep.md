---
title: "Prompt quality, deep dive"
slug: "belts/yellow/prompt-quality-deep"
section: "belts"
status: "drafted"
type: "chapter"
track: "yellow"
order: 3
time_minutes: 40
audience: "daily-builder"
outcome: "Write prompts that express intent, constraints, context, and success criteria strongly enough for daily repo work."
prev: "belts/yellow/tool-decision-tree"
next: "belts/yellow/context-101"
pillar: "prompt"
belt: "yellow"
tags: ["yellow-belt", "prompting", "intent", "constraints"]
updated: "2026-04-27"
---

# Y.3 - Prompt quality, deep dive

This is the voice anchor for Yellow Belt. White Belt taught you to make prompts safe. Yellow Belt teaches you to make prompts useful under real work pressure.

The upgrade is judgement. You will learn to state intent, select context, set constraints, define success, and ask for intermediate reasoning without turning every task into a ceremony.

---

## If you're short on time

- A Yellow Belt prompt has four load-bearing parts: intent, context, constraints, and success criteria.
- Ask for a plan or comparison before edits when you are in unfamiliar code.
- The best prompts reduce ambiguity. They do not merely add more words.

---

## The mental model

```text
Intent:       what are we trying to accomplish?
Context:      what should the model know?
Constraints:  what must not happen?
Success:      how will we judge the result?
```

White Belt version:

```text
Do not edit. Explain this file.
```

Yellow Belt version:

```text
Goal: understand why the empty-state copy appears after a failed search.
Context: this is the dashboard frontend repo; the symptom is only on filtered search.
Scope: inspect routes, search components, and empty-state components.
Constraints: do not edit files or run installs.
Success criteria: name the likely component, explain the data flow in plain English, and list two possible causes.
```

The second prompt gives Claude a job shape. That is the difference.

---

## Intent

Intent is not the same as action.

Weak:

```text
Fix this.
```

Better:

```text
Find why the submit button stays disabled after a user edits the form.
```

Strong:

```text
Goal: identify the smallest frontend-only change that makes the submit button enable after a valid form edit.
```

Intent should name the user-facing outcome, not just the file operation.

---

## Context

Context is the material the model needs to do the job. It can be:

- a symptom statement;
- a file path;
- a design note;
- a Slack thread summary;
- a ticket summary;
- a previous diff;
- a test output;
- a constraint from a reviewer.

Good context is small and specific.

Bad context:

```text
Here is a giant thread and the whole file tree. Figure it out.
```

Good context:

```text
Thread summary: two users report the filter clears results even when matching records exist.
Ticket summary: owner suspects the date range transform.
Relevant route: src/pages/transactions.
```

---

## Constraints

Constraints protect the work.

Useful constraints:

- do not edit yet;
- inspect only these files;
- keep the change under ten lines;
- do not alter public API shape;
- prefer existing components;
- do not add dependencies;
- do not touch generated files;
- stop if backend changes appear necessary.

Constraints should be concrete. "Be careful" is not a constraint. "Do not change files outside `src/components/SearchEmptyState`" is a constraint.

---

## Success criteria

Success criteria turn an answer into something reviewable.

Examples:

```text
Success criteria: explain the likely cause, show the file path, and recommend whether this is Yellow or Green Belt scope.
```

```text
Success criteria: produce a diff touching only README.md and include a two-line PR description.
```

```text
Success criteria: list three possible fixes, compare risk, and do not apply any change until I choose.
```

If you cannot define success, you are probably not ready to ask for action.

---

## Worked example: from vague to useful

Vague:

```text
The dashboard is broken. Fix it.
```

Yellow Belt:

```text
Goal: triage a dashboard bug where the empty state appears after applying a date filter that should return records.

Context:
- I can reproduce this in the local dashboard.
- The issue appears after filtering by date.
- A teammate mentioned the date transform may be involved.

Scope:
- inspect the dashboard frontend repo;
- search route, filter, and empty-state code;
- do not inspect unrelated admin surfaces.

Constraints:
- do not edit files yet;
- do not run install commands;
- stop if this requires backend changes.

Success criteria:
- identify the likely files;
- explain the data flow in plain English;
- propose two smallest fix directions with trade-offs.
```

This prompt does not guarantee the right answer. It gives the model enough shape to be useful and gives you enough structure to review the answer.

---

## Follow-up prompts

Good first prompts create good follow-ups:

```text
Which part of that answer is evidence from the code, and which part is inference?
```

```text
Show me the smallest possible diff for option 1. Do not apply it yet.
```

```text
What would make this fix unsafe?
```

```text
If this turns out to require backend changes, where should I stop?
```

Follow-ups are how you keep the conversation narrow without starting over.

---

## Common failure modes

**"My prompt is long but still vague."** Length is not specificity. Check whether intent and success criteria are concrete.

**"Claude answered confidently but cited no evidence."** Ask which claims came from files, threads, tests, or inference.

**"The model started solving a different problem."** Restate the goal and scope. Do not keep arguing with a drifted thread.

**"I gave too many constraints."** Constraints should protect the work, not make it impossible. Remove constraints that are preferences rather than boundaries.

**"I skipped success criteria because I was in a hurry."** That is when you need them most.

---

## GREEN / YELLOW / RED self-check

You are **GREEN** if:

- you can write a four-part prompt in under two minutes;
- you can separate intent from action;
- you can name at least one concrete success criterion;
- you ask for evidence versus inference when needed.

You are **YELLOW** if:

- your prompts are safe but often too broad;
- you forget to mention context source;
- Claude's answers feel useful but hard to review.

You are **RED** if:

- prompts include sensitive material;
- the model edits before a plan in unfamiliar code;
- you cannot explain what success would look like.

---

## What you can say after this module

> "I can write prompts that carry intent, context, constraints, and success criteria without burying the task."

---

**Previous:** [Y.2 When to reach for which tool](Y02-tool-decision-tree.md) - **Next:** [Y.4 What Claude can see](Y04-context-101.md)

