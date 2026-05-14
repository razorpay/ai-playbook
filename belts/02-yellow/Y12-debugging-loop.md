---
title: "Debugging with Claude"
slug: "belts/yellow/debugging-loop"
section: "belts"
status: "drafted"
type: "chapter"
track: "yellow"
order: 12
time_minutes: 30
audience: "daily-builder"
outcome: "Use Claude to run a disciplined reproduce, observe, hypothesize, isolate, fix, verify debugging loop."
prev: "belts/yellow/bug-hunting"
next: "belts/yellow/pr-craft"
pillar: "prompt"
belt: "yellow"
tags: ["yellow-belt", "debugging", "triage"]
updated: "2026-04-27"
---

# Y.12 - Debugging with Claude

Debugging is not guessing faster. It is reducing uncertainty. Claude is useful when it helps you form hypotheses, inspect evidence, and choose the next smallest check.

Yellow Belt debugging avoids heroic rewrites. You are learning the loop.

---

## If you're short on time

- Reproduce before fixing.
- Ask Claude for hypotheses ranked by evidence, not just possible causes.
- Verify the fix against the original symptom before opening a PR.

---

## The mental model

```text
Reproduce -> Observe -> Hypothesize -> Isolate -> Fix -> Verify -> Explain
```

Do not skip Verify. A fix that only sounds right is not a fix.

---

## Worked example: debugging prompt

```text
Goal: debug a small frontend bug without broad edits.
Symptom: the submit button stays disabled after editing a valid field.
Reproduction: open settings page, edit display name, button remains disabled.
Context: likely form validation or dirty-state tracking.
Constraints:
- do not edit yet;
- inspect form component and validation helpers first;
- stop if backend changes appear necessary.
Success criteria:
- list top three hypotheses ranked by evidence;
- propose the smallest observation that would distinguish them;
- wait before applying a fix.
```

Good answer:

```text
Hypothesis 1: dirty state is not updated after display name change.
Evidence: button disabled prop depends on isDirty.
Next observation: inspect onChange handler and dirty-state setter.
```

That answer gives you the next check, not just a theory.

---

## Observation before edit

Useful observations:

- current diff;
- failing test output;
- console error;
- network response shape;
- rendered state before and after input;
- relevant component props;
- recent commit history;
- screenshot of the symptom.

Avoid:

- "maybe";
- "probably";
- "seems broken";
- "Claude thinks."

The debugger's currency is observed fact.

---

## Fix sizing

Ask:

```text
What is the smallest fix that would test hypothesis 1?
What could this break?
Which existing pattern nearby should we follow?
```

If the answer touches five unrelated files, ask for a smaller isolation step.

If the fix requires new architecture, park it for Green Belt or a team-owned task.

---

## Verify and explain

After the edit:

```text
Review the diff.
Explain how this change addresses the original symptom.
Name one thing it does not prove.
```

Then run the narrowest meaningful check:

- local reproduction;
- targeted test;
- typecheck or lint if relevant;
- screenshot for visual state;
- before/after note.

Do not claim "fixed" until the original symptom is gone.

---

## Common failure modes

**"Claude proposed a fix before reproduction."** Ask for reproduction and observations first.

**"I changed multiple things and the bug disappeared."** You may not know which change fixed it. Narrow if possible.

**"The fix passed locally but the PR failed checks."** Treat CI output as new evidence, not betrayal.

**"The root cause is bigger than Yellow scope."** That is a good discovery. Write the triage and escalate.

**"I kept debugging after I was tired."** Debugging quality drops fast. Save state and pause.

---

## GREEN / YELLOW / RED self-check

You are **GREEN** if:

- you can reproduce before fixing;
- you can ask for ranked hypotheses;
- you can isolate before editing;
- you can verify against the original symptom.

You are **YELLOW** if:

- reproduction is flaky;
- hypotheses are plausible but evidence is thin;
- verification requires a teammate's environment.

You are **RED** if:

- the bug touches sensitive flows;
- the fix requires broad architecture changes;
- you cannot reproduce or verify.

---

## What you can say after this module

> "I can use Claude to reduce debugging uncertainty instead of guessing faster."

---

**Previous:** [Y.11 Bug hunting with AI](Y11-bug-hunting.md) - **Next:** [Y.13 PR craft](Y13-pr-craft.md)

