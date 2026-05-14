---
title: "Advanced prompting — goals, constraints, worked examples"
slug: "belts/green/advanced-prompting"
section: "belts"
status: "drafted"
type: "chapter"
track: "green"
order: 11
time_minutes: 40
audience: "experienced-builder"
outcome: "Write prompts that name the goal, the constraints, and the success criteria precisely enough that the agent's output is consistent across runs and worth shipping."
prev: "belts/green/hooks-and-slash-commands"
next: "belts/green/quest-author-a-team-skill"
pillar: "prompt"
belt: "green"
tags: ["green-belt", "prompting", "prompt-craft"]
updated: "2026-04-29"
---

# G.11 — Advanced prompting

White Belt (W.10) taught the difference between "make it better" and "find all auth handlers." Yellow Belt (Y.3) taught the four-part shape: intent, constraints, success criteria, scope. Green Belt closes the loop. This chapter goes one step deeper: how to write prompts that produce consistent results across runs, that compose with skills and CLAUDE.md, and that are worth saving as templates the team reuses.

---

## If you're short on time

- A prompt that depends on the agent guessing your goal is a prompt that will produce different outputs on different runs.
- The five elements of a Green-Belt prompt: goal, constraints, success criteria, output shape, and what success does *not* look like.
- The shortest path to consistency is making the prompt do the work the CLAUDE.md cannot.

---

## The mental model

```
   ┌────────────────────────────────────────────────┐
   │              A GREEN BELT PROMPT                │
   ├────────────────────────────────────────────────┤
   │                                                  │
   │  1. GOAL          → one sentence, named         │
   │  2. CONSTRAINTS   → three to five bullets       │
   │  3. SUCCESS       → what done looks like        │
   │  4. OUTPUT SHAPE  → the artefact, literally     │
   │  5. ANTI-SUCCESS  → what done does NOT look     │
   │                     like                        │
   │                                                  │
   └────────────────────────────────────────────────┘
```

Every Yellow Belt prompt has goal, constraints, success criteria. Every Green Belt prompt adds output shape and anti-success. The fourth and fifth elements are what produce repeatability.

---

## The five elements, deepened

### 1 — Goal

One sentence. Named. Not "improve the code" but "remove the hard-coded timezone offset from `lib/time.ts` and replace it with the `getZoneFor(user)` helper."

The Green Belt move is the *level of specificity*. A goal that names the file and the helper is testable; a goal that says "improve handling" is not.

### 2 — Constraints

Three to five bullets. The constraints are the things you cannot afford to discover after the agent runs. Examples:

- "Do not change the public API of the function."
- "Preserve the existing test coverage; add new tests for the new branch."
- "Use the design-system Button component if any UI changes."
- "Do not introduce any new dependencies."

Constraints either come from CLAUDE.md (where they apply to all sessions) or from the prompt (where they apply to this task). The constraint list in the prompt should be only the *task-specific* constraints; the always-on ones already live in CLAUDE.md.

### 3 — Success criteria

What "done" looks like. This is what you would tell a teammate if they asked "how will I know I'm done?" Examples:

- "All existing tests pass."
- "The new branch has at least one test covering the new code path."
- "The PR description references the bug ticket."
- "The diff is under 200 lines."

Success criteria should be *checkable*. "The code is clean" is not a criterion. "The lint passes with zero warnings" is.

### 4 — Output shape

What the agent should produce, named literally. This is the Green Belt addition over Yellow.

- For a code change: "open a branch, make the change, run the tests, and pause before opening the PR so I can review the diff."
- For a review: "produce a Markdown report with sections X, Y, Z; one finding per row in a table."
- For a refactor plan: "produce a numbered plan with the file change for each step; do not edit any files yet."

Output shape names the artefact. Without it, the agent picks one and you get inconsistency across runs. With it, two runs of the same prompt produce comparable artefacts.

### 5 — Anti-success

What done does *not* look like. This is the rarest element in Yellow Belt prompts and the most useful Green Belt addition. Examples:

- "Done does not look like a 1,000-line refactor that 'while I was here' touches unrelated areas."
- "Done does not look like new dependencies being added; if you find yourself wanting one, stop and explain."
- "Done does not look like commented-out code in the diff."
- "Done does not look like a PR that ships and then needs follow-up."

Anti-success is your future-self's check on the agent's tendency to over-deliver. An agent given a clean goal but no anti-success will sometimes produce a *correct* output that is also a *wrong* output — correct against the literal goal, wrong against your unstated intent.

---

## Worked example: the same task, three prompt qualities

You want to fix a bug where the dashboard's chart legend overlaps the chart at small viewport sizes.

### Yellow Belt prompt

> Fix the legend overlapping the chart on the dashboard at small screens.

The agent guesses where to look. The agent guesses what "small screens" means. The agent guesses whether to use the design-system breakpoints or new ones. The output is workable but inconsistent across runs.

### Green Belt prompt

> **Goal.** Fix the chart-legend overlap on the dashboard's reporting view at viewport widths below 480px.
>
> **Constraints.**
> - Use the design-system breakpoint tokens, not new ones.
> - Do not change the chart component; the change should be in the legend or its container.
> - Preserve the legend's accessibility behaviour (screen-reader order, focus ring).
>
> **Success criteria.**
> - On a 320px viewport, the legend wraps below the chart instead of overlapping.
> - On viewports ≥ 480px, the layout is unchanged.
> - The existing Playwright test for the dashboard view still passes; if it does not cover small viewports, add one that does.
>
> **Output shape.** Open a branch named `fix/legend-overlap-small-viewport`, make the change, run the tests, and pause before opening the PR so I can review the diff.
>
> **Anti-success.** The fix is not a refactor of the chart component. The fix does not introduce a new wrapper component if an existing one suffices. The fix does not silently change the legend's content or order.

This prompt produces near-identical artefacts across runs. The agent has no room to invent.

### Saved prompt template

Once you have written the Green Belt prompt above, the structure is reusable. The next "fix a layout overlap on a viewport" task uses the same template with three substitutions: which view, which dimension, which breakpoints. Save it as a personal note or a team skill (G.7 / G.10) once it has run cleanly three times.

---

## Composing prompts with CLAUDE.md and skills

A common Yellow Belt habit: re-stating constraints in every prompt. "Use the design-system Button. Use the read-replica. Treat amounts in minor units."

The Green Belt fix: those constraints belong in CLAUDE.md. Write them once. The prompt then carries only the *task-specific* constraints. Three benefits:

1. The prompt is shorter, so the goal is clearer.
2. The constraints in CLAUDE.md apply across all sessions, not just the one with the prompt.
3. The agent does not have to choose between the prompt's stated rules and CLAUDE.md's; if they agree, no choice; if they disagree, you have a real bug to fix.

Same logic with skills. If you find yourself writing the same multi-element prompt three times, the prompt should become a skill (G.7). The skill ships the goal-constraints-success shape; the user supplies only the per-task variables.

---

## Multi-turn prompting

Some tasks need a conversation, not a one-shot prompt. The Green Belt habit: each turn carries the full shape, not just the next ask.

**Yellow Belt multi-turn:**

> "Now make it work on iPhone."
> "Now also for tablets."
> "Now reduce the padding."

The agent loses track of which constraints applied to which step.

**Green Belt multi-turn:**

> "Now extend the same fix to iPad-size viewports (≥ 768px and < 1024px). Same constraints as before — design-system breakpoints, no chart-component changes. Success: the existing tablet Playwright test passes; the new tablet edge case does not regress."

Each turn re-anchors the constraints. The agent treats each turn as a self-contained prompt with prior context, not a continuation that loses memory of the rules.

---

## The "explain the reasoning" pattern

For complex tasks, ask for the reasoning before the change.

> "Before making the change, explain in one paragraph the three approaches you considered and why you picked one. Do not edit code yet."

Two benefits:

1. You catch wrong-approach decisions before they cost you a diff to revert.
2. The reasoning becomes part of the PR description (or the team's knowledge base, if you ask for it).

This pattern doubles the cost of the first turn and saves the cost of an entire wrong implementation. Worth it on any change you cannot easily revert.

---

## Common failure modes

**Vague goals.** "Improve the code." "Make it better." Fix: name the file, name the change, name the verb. "Replace the hard-coded X in `path/to/file.ts` with the helper Y."

**Constraints that belong in CLAUDE.md.** Re-stating "use the design system" in every prompt. Fix: commit to CLAUDE.md once.

**Success criteria that are not checkable.** "The code is clean." Fix: replace with "lint passes with zero warnings."

**No output shape.** "Refactor this." Fix: name the artefact ("produce a numbered plan with file paths and line ranges; do not edit code yet").

**No anti-success.** The agent ships a "correct" output that is also a 1,000-line over-engineering. Fix: name what done does *not* look like.

**Multi-turn drift.** Each turn loses constraint context. Fix: re-anchor on every turn.

**Skipping "explain the reasoning" on hard tasks.** Save five minutes of prompt time, lose two hours to the wrong implementation. Fix: ask for the reasoning first when the task is hard or expensive to revert.

---

## GREEN / YELLOW / RED self-check

- 🟢 GREEN — I can write a Green Belt prompt with all five elements in under three minutes for any task my team owns, and I save reusable templates for prompts I run more than three times.
- 🟡 YELLOW — I understand the elements but my prompts often skip output shape or anti-success.
- 🔴 RED — I write Yellow Belt prompts and treat the inconsistent results as the agent's fault.

---

## What you can say after this module

> "I write prompts with goal, constraints, success criteria, output shape, and anti-success — and I move repeatable shapes into skills or CLAUDE.md so I do not write them again."

---

## Where to go next

You have finished Part A. Quest G-1 (*Author a team skill*) is the test of G.6 and G.7 in particular, and it is what the cohort lead will look at when reviewing your Part A progress.

**Previous:** [← G.10 Hooks + slash commands](G10-hooks-and-slash-commands.md) · **Next:** [→ Quest G-1](quest-G1-author-a-team-skill.md)

**Further reading**

- [Yellow Belt Y.3 — Prompt quality, deep dive](../../02-yellow/Y03-prompt-quality-deep.md)
- [Anthropic on prompt engineering](https://docs.claude.com/en/docs/build-with-claude/prompt-engineering/overview)
