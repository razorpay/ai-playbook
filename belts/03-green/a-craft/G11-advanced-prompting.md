---
title: "Advanced prompting — goals, constraints, worked examples"
slug: "belts/green/advanced-prompting"
section: "belts"
status: "drafted"
type: "chapter"
track: "green"
order: 11
time_minutes: 50
audience: "experienced-builder"
outcome: "Write precise prompts for small tasks, and turn larger PRD-to-production work into a gated, resumable workflow with checkable evidence."
prev: "belts/green/hooks-and-slash-commands"
next: "belts/green/quest-author-a-team-skill"
pillar: "prompt"
belt: "green"
tags: ["green-belt", "prompting", "prompt-craft"]
updated: "2026-09-05"
---

# G.11 — Advanced prompting

White Belt (W.10) taught the difference between "make it better" and "find all auth handlers." Yellow Belt (Y.3) taught the four-part shape: intent, constraints, success criteria, scope. Green Belt closes the loop. This chapter goes one step deeper: how to write prompts that produce consistent results across runs, that compose with skills and CLAUDE.md, and that are worth saving as templates the team reuses.

---

## If you're short on time

- A prompt that depends on the agent guessing your goal is a prompt that will produce different outputs on different runs.
- The five elements of a Green-Belt prompt: goal, constraints, success criteria, output shape, and what success does *not* look like.
- The shortest path to consistency is making the prompt do the work the CLAUDE.md cannot.
- When one prompt grows into a PRD, spec, implementation, human approvals, and evaluation, stop making the prompt longer. Use Superprompt's gated workflow so the work can pause, resume, and prove each gate.

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

## When a prompt should become a pipeline

The five-element prompt is still the unit of clear work. It is not always the whole workflow.

Use a single prompt for a small, reversible task with one main artefact. Use a pipeline when the work starts from a PRD, needs a reviewed spec, crosses human-only actions, may pause for hours or days, or must reconcile the final implementation against its requirements.

Razorpay's [Superprompt plugin](https://github.com/razorpay/claude-plugins/tree/master/plugins/superprompt) turns that larger path into a resumable workflow:

```text
PRD review → final spec → gated run → independent evaluation → captured gaps
```

This matters to PMs and designers because automation does not transfer product judgement. You still own the requirement, unresolved trade-offs, acceptance criteria, and approvals. The pipeline makes those decisions visible instead of letting the agent quietly invent them midway through implementation.

### Run the workflow

1. **Clean the source requirement.** Run `/superprompt:prd <aidoc-url>`. It comments on the PRD where it lives; the PM updates that document, which remains the source of truth.
2. **Produce a reviewable spec.** Run `/superprompt:spec`. It interviews you, grounds a draft in the repository, explores alternatives, collects team review, and publishes a final tech spec. Resolve interaction and product-policy decisions here, before implementation makes them expensive.
3. **Emit the run contract.** Run `/superprompt`. From the final spec, it creates the implementation prompt, definition of done, human gates, and PR plan, then offers to start the run.
4. **Let probes—not confidence—pass gates.** The run works on every unblocked slice, saves state, and stops when a human action is the only thing left. After the human acts, run `/superprompt` again. The workflow re-runs the gate's live probe and resumes only when that probe passes.
5. **Evaluate against the contract.** Run `/superprompt:eval`. Two evaluators review the result from different context positions, report gaps, run a separate fix loop, and reconcile implementation changes back into the spec.
6. **Preserve the learning.** Run `/superprompt:gaps` when the agent gets something wrong. Capture the failure; do not hide it inside a heroic final prompt that nobody else can reuse.

For a small task without a PRD, `/superprompt <ask>` still interviews you and emits a saved prompt. The decision is not “manual prompt or automation.” It is “one bounded task or a workflow with hand-offs?”

### Why a live probe changes the work

“I completed the migration” is a status update. A read against the live schema is evidence. A human gate should name both the human action and the probe the agent can safely run to verify its effect.

| Weak gate | Checkable gate |
|---|---|
| “PM approved the requirement.” | “PM resolves the blocking PRD comments; probe confirms none remain open.” |
| “The configuration is ready.” | “Owner applies the configuration; probe reads the target environment and matches the expected value.” |
| “The route is live.” | “Owner deploys the route; probe sends the documented read-only request and verifies the expected response.” |

Never ask the agent to bypass a failed probe because the action “definitely happened.” Fix the action, the probe, or the expected result. Otherwise the gate is decoration.

### Try it: audit one gate

Take one upcoming task that needs a human action. Fill this before you run it:

```text
Human action:
Why the agent must not do it:
Safe live probe:
Expected passing result:
Work the agent can continue while blocked:
```

- [ ] The probe observes the real target, not a local plan or generated file.
- [ ] The probe is read-only or otherwise safe to repeat.
- [ ] A failed probe keeps the dependent work blocked.
- [ ] The remaining lanes can advance without pretending the gate passed.

If you cannot write the probe, the gate is not ready for an autonomous run. Keep that step manual and narrow the workflow.

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

**Stretching one prompt across a staged delivery.** The agent forgets a decision, assumes a human action happened, or cannot resume cleanly. Fix: use the Superprompt workflow when the task needs a PRD, spec, gates, resumable state, and final evaluation.

**Treating a human's “done” as evidence.** The run resumes before the external state changed. Fix: define a safe live probe for every human gate and resume only after it passes.

---

## GREEN / YELLOW / RED self-check

- 🟢 GREEN — I can write a Green Belt prompt with all five elements in under three minutes for any task my team owns, and I save reusable templates for prompts I run more than three times.
- 🟡 YELLOW — I understand the elements but my prompts often skip output shape or anti-success.
- 🔴 RED — I write Yellow Belt prompts and treat the inconsistent results as the agent's fault.

---

## What you can say after this module

> "I write bounded prompts with goal, constraints, success criteria, output shape, and anti-success. When the work becomes a staged delivery, I use a gated pipeline that can pause, resume, and prove what passed."

---

## Where to go next

You have finished Part A. Quest G-1 (*Author a team skill*) is the test of G.6 and G.7 in particular, and it is what the cohort lead will look at when reviewing your Part A progress.

**Previous:** [← G.10 Hooks + slash commands](G10-hooks-and-slash-commands.md) · **Next:** [→ Quest G-1](quest-G1-author-a-team-skill.md)

**Further reading**

- [Yellow Belt Y.3 — Prompt quality, deep dive](../../02-yellow/Y03-prompt-quality-deep.md)
- [Anthropic on prompt engineering](https://docs.claude.com/en/docs/build-with-claude/prompt-engineering/overview)
- [Superprompt plugin — commands, pipeline, gates, and prerequisites](https://github.com/razorpay/claude-plugins/blob/master/plugins/superprompt/README.md)
