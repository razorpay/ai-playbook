---
title: "Quest G-2: The Greenfield cross-over"
slug: "belts/green/quest-greenfield-crossover"
section: "belts"
status: "drafted"
type: "quest"
track: "green"
order: 91
time_minutes: 480
audience: "experienced-builder"
outcome: "Ship one meaningful change in a greenfield surface that exercises Part A craft and Part B practices together — and capture the cross-over in the reflection."
prev: "belts/green/debugging-hard-kind"
next: "belts/green/c-guardrails"
pillar: "harness"
belt: "green"
tags: ["green-belt", "quest", "greenfield", "crossover"]
updated: "2026-04-29"
---

# 🎮 Quest G-2 — The Greenfield cross-over

> **Belt progress:** Part B of Green Belt
> **Time budget:** ~8 hours over a week (mostly elapsed time, not active hours)
> **Prerequisite:** Part A complete (Quest G-1 claimed) and Part B modules read at GREEN colour through G.20 at minimum
> **What you'll prove:** that the craft layer (Part A) and the practices layer (Part B) compose — that you can ship a real change that uses the CLAUDE.md, skills, and harness from Part A *together with* the testing, design-to-code, and observability from Part B

---

## What this quest is

Pick a **greenfield surface**: an internal tool, a new agent skill pack, a self-serve analytics surface, a small plugin, or any repo where you have room to ship something new without colliding with someone else's roadmap. Ship **one meaningful change** that exercises Part A and Part B together. Get a teammate (ideally one outside your immediate team, per Appendix L) to review and merge it.

The quest is the bridge between Green Belt and the Boss Fight in Part C. Boss Fight G-B requires both quests claimed; Quest G-2 specifically requires the greenfield surface so the boss fight (which lands on a *product* repo) is its own distinct demonstration.

---

## What does NOT count

- A change on a product repo. That is the boss fight in Part C, not this quest.
- A change that exercises only Part A (a skill, a CLAUDE.md, a worktree pattern) without any Part B practice. The cross-over is the point.
- A change that exercises only Part B (a Playwright test, a design-to-code flow) without any Part A craft. Same.
- A solo PR with no review.
- A change that is a tweak to an existing surface rather than a meaningfully new shape.
- A reflection that does not name *which* Part A techniques and *which* Part B practices the change exercised. The naming is the proof.

---

## How to do it

### Step 1 — Pick the greenfield (~30 minutes)

A "greenfield surface" for this quest's purposes:

- a repo, a folder, or a project where the change is *new shape* rather than *modify existing shape*;
- a place where you have room to ship without coordinating with someone else's sprint;
- a place where the change can be reviewed by a builder outside your immediate team.

Common candidates: an internal tool you and one other team use; a new utility or skill pack; a self-serve analytics page that does not exist yet; a small plugin or extension; a CLI helper. Avoid: a half-built feature on a product repo (that is boss-fight territory); a change that requires a design partner's full sprint (slow); a refactor of existing code (not greenfield).

### Step 2 — Plan the cross-over (~30 minutes)

Before writing code, sketch a plan that names:

- **The Part A techniques** the change will exercise. At least two from: Three-Pillar diagnosis (G.1), CLAUDE.md authoring (G.3), hierarchical CLAUDE.md (G.4), skills authoring (G.7), subagents (G.8), worktrees (G.9), hooks (G.10), advanced prompting (G.11).
- **The Part B practices** the change will exercise. At least two from: Playwright tests (G.12 / G.13 / G.14), design-to-code (G.15 / G.16 / G.17), the daily loop (G.18), branch preview (G.19), observability with AI (G.20), debugging the hard kind (G.21).

If you cannot list two of each, the change is not a cross-over yet. Re-scope.

### Step 3 — Build (~4–5 hours active, more elapsed)

Build the change using the techniques you named. Some patterns that show up often:

- A new repo gets a tight CLAUDE.md from G.3 on day one.
- The first feature in the repo earns a small SKILL.md per G.7 if the workflow is repeated three times.
- Worktrees from G.9 if you are running anything in parallel.
- Playwright tests from G.12 / G.13 for any interactive surface.
- Design-to-code from G.15 if there is a UI.
- The daily loop from G.18 with per-branch ports.
- Branch preview from G.19 in your PR description.
- Observability with AI from G.20 if the surface emits logs or traces.

The list is not a checklist — pick what fits the change. The cross-over is real when at least two from each part land naturally in the work.

### Step 4 — Run the pre-ship-check pattern (~30 minutes)

Before opening the PR:

- run the test suite (the Playwright tests you wrote during the build);
- run a `pre-ship-check`-style review of the diff (referenced as a concept across the playbook; if your team has the skill loaded, invoke it; if not, run a manual review against the same checklist);
- preview on a branch URL per G.19;
- self-review at desktop and 320px per G.18.

The change should be in shippable shape *before* you ask a human to review it.

### Step 5 — Open the PR with a structured description (~30 minutes)

The PR description names the cross-over explicitly:

```markdown
## What this PR does

<one or two sentences>

## Why now

<one sentence on the trigger / motivation>

## Part A techniques used

- <technique 1, with a one-line note on how it shaped the change>
- <technique 2, ...>

## Part B practices used

- <practice 1, with a one-line note>
- <practice 2, ...>

## Preview

<branch-preview URL>

## Tested

- desktop viewport: <pass/fail>
- 320px mobile viewport: <pass/fail>
- Playwright tests: <list of new specs and their status>

## Reviewer

@<handle of teammate, ideally outside immediate team>
```

Most reviewers will read this in two minutes and click the preview URL in another two. The reviewer protocol from Appendix L applies; for Green Belt, at least one piece of evidence should land with an out-of-team reviewer.

### Step 6 — Iterate on review (~elapsed)

Reviewers comment. You iterate. The hard-kind debugging skill from G.21 applies: if a reviewer's read of the change is confidently wrong, push back productively with evidence; if a reviewer's read is right and yours was wrong, revise.

The PR merges, or it lands under named review per the cohort rule.

### Step 7 — Reflect (~30 minutes)

Write a one-paragraph reflection. The cohort tracker reads it; the reviewer reads it; you read it in three months. Cover:

- which Part A and Part B techniques the change actually used (not just the planned ones);
- where the cross-over compounded — a moment where Part A and Part B together produced more value than either alone;
- one thing that surprised you;
- one thing you would do differently next time.

The reflection is what makes the quest "claimed" rather than just "done." Without it, a future-you reads the PR and remembers nothing.

---

## Evidence template

Copy into your tracker or `LEARNER.md`:

```markdown
## Quest G-2 — Greenfield cross-over

- Builder: <handle>
- Date claimed: <YYYY-MM-DD>
- Greenfield surface: <repo / project name>
- PR URL: <link>
- Merge link or active-review link: <link>
- Reviewer: <handle> (outside immediate team: yes/no)
- Part A techniques used: <list>
- Part B practices used: <list>
- Reflection: <one-paragraph or link>
```

The PR is the artefact. The cross-over list is the proof of comprehension. The reflection is the proof of internalisation. All three are required.

---

## Reviewer routing

When the quest is claimed, route per [Appendix L](../../../appendices/L-certification/README.md). For Green Belt and above, at least one piece of evidence should be reviewed by a builder outside the candidate's immediate team. Quest G-2's PR is the natural place to satisfy that requirement, so plan for an out-of-team reviewer from the start.

The reviewer attests that:

- the PR exists at the named link and is merged or under named review;
- the Part A techniques claimed in the description are actually visible in the change;
- the Part B practices claimed are actually visible (the Playwright test is real, the preview URL renders, the design-to-code chapter's flow shows up in the diff);
- the reflection shows comprehension of the cross-over, not just compliance with the format.

---

## Common pitfalls

**Treating the technique list as a wish list.** Naming five Part A and five Part B techniques in the plan and only using one of each. Fix: pick two of each that the change actually needs; do not pad.

**Picking a "greenfield" that is really a refactor.** If you find yourself touching code that already exists, the surface is not greenfield. Fix: pick again.

**Skipping the reviewer-outside-team rule.** "My same-team teammate said it looked good." Fix: Appendix L is explicit; for this quest, an out-of-team reviewer is the right move.

**Drafting the PR description after the merge.** The naming of techniques happens *before* review, not after. Fix: write the description while building.

**Skipping the reflection.** The technique list shows what; the reflection shows why. Fix: thirty minutes; future-you will thank you.

**Using the change to ship a feature your team wants.** That is fine if it happens to fit; not fine if the quest pulled the work toward your team's roadmap rather than the cross-over. Fix: the cross-over is the goal, not the feature.

---

## What you can say after this quest

> "I have shipped a real change in a greenfield surface that exercised Part A craft and Part B practices together. I can name which techniques compounded and where the cross-over paid off."

---

**Previous:** [← G.21 Debugging the hard kind](G21-debugging-hard-kind.md) · **Next:** [→ Part C — Fintech Guardrails](../c-guardrails/README.md)

**Further reading**

- [Quest G-1 — Author a team skill](../a-craft/quest-G1-author-a-team-skill.md)
- [Appendix L — Certification](../../../appendices/L-certification/README.md)
- All eleven Part A modules and all ten Part B modules (you should have read these before starting the quest)
