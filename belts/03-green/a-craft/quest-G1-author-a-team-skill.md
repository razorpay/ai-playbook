---
title: "Quest G-1: Author a team skill"
slug: "belts/green/quest-author-a-team-skill"
section: "belts"
status: "drafted"
type: "quest"
track: "green"
order: 90
time_minutes: 240
audience: "experienced-builder"
outcome: "Capture a real team workflow as a SKILL.md, get one teammate to invoke it on a real task, and log the invocation."
prev: "belts/green/advanced-prompting"
next: "belts/green/b-practices"
pillar: "context"
belt: "green"
tags: ["green-belt", "quest", "skill-authoring", "team"]
updated: "2026-06-19"
---

# 🎮 Quest G-1 — Author a team skill

> **Belt progress:** Part A of Green Belt
> **Time budget:** ~4 hours over a week (mostly elapsed time, not active hours)
> **Prerequisite:** [G.6 Skills overview](G06-skills-overview.md) and [G.7 Writing your first SKILL.md](G07-writing-your-first-skill.md), both at GREEN colour
> **What you'll prove:** that you can take a real workflow your team runs by hand, package it as a skill, and have a teammate use it successfully

---

## What this quest is

Pick a workflow your team has run **three or more times by hand**. Write a `SKILL.md` that captures it. Commit it where teammates can find it. Get at least one teammate to invoke the skill on a real task. Capture the invocation log and a short reflection.

The quest is the practical test of the Skills cluster. G.6 named what counts as a skill; G.7 walked the anatomy. Quest G-1 is where you find out whether your skill survives contact with a real teammate.

---

## What does NOT count

- A SKILL.md only you have used. No teammate invocation = no quest.
- A SKILL.md for a workflow that has run only once or twice by hand. Wait for the third run; the patterns are not real before that.
- A SKILL.md adapted from someone else's skill without a workflow of your own. Adaptation is fine for learning; for the quest, the skill should capture *your team's* workflow.
- A skill that is a clever prompt with no inputs, no output shape, and no guardrails. Re-read G.6 — that is a prompt, not a skill.
- A "skill" that does not actually run because of missing context, broken triggers, or unresolved guardrails.

---

## How to do it

### Step 1 — Pick a workflow (~30 minutes)

Open a notebook, your tracker, your last week's Slack, your team's last few PRs. Look for a workflow that:

- you have run by hand at least three times in the last three months;
- has named, repeated structure (not free-form thinking);
- has a clear trigger (a phrase, a moment, a file pattern);
- produces a concrete artefact each time (a Markdown report, a diff, a list, a draft);
- has a maintenance owner you can name (you, your tech lead, the team).

Common candidates:

- a weekly status summary;
- a PR description drafter scoped to the team's tone;
- a "find the owner of this code" workflow that uses git history plus the team directory;
- a sprint-retro extractor that pulls last-sprint's tickets, groups them by theme, and produces a draft for the retro doc;
- a triage routing workflow for incoming bug reports;
- a release-notes drafter from the merged PRs in a window;
- a "diff against staging" comparator for pre-deploy gut-checks.

If you cannot find a candidate, that is itself useful information: your team may not have a workflow stable enough to skill yet, and the quest can be paused while you do the workflow by hand a few more times.

### Step 2 — Run the workflow by hand and take notes (~30 minutes)

Before you draft the SKILL.md, run the workflow one more time *deliberately*. Take notes on:

- what triggered you to do it;
- what files / connectors / context you needed;
- what you produced;
- what could have gone wrong if you had skipped a step;
- where you found yourself making judgement calls.

The notes become the body of the SKILL.md.

### Step 3 — Draft the SKILL.md (~60 minutes)

Apply the anatomy from G.7. The frontmatter has `name` and `description`; the body has Overview, Hard Rules, Inputs, Outputs, Workflow, References. Use the worked example in G.7 as a shape reference.

Hold the bar:

- every Hard Rule names a specific don't with a specific reason;
- Inputs and Outputs are precise (literal shapes, not "a list");
- the Workflow is numbered and bounded;
- the References cite the policies the skill defers to (your team's CLAUDE.md, an appendix, an external doc).

### Step 4 — Run the trigger / refusal / output-shape tests (~30 minutes)

Per G.7's "How to test" section:

1. **Trigger test.** Type three or four phrasings the skill should match. The agent should load it. Type two phrasings the skill should *not* match. The agent should not load it.
2. **Refusal test.** Drive the skill toward each Hard Rule. The agent should refuse and explain.
3. **Output-shape test.** Run on a real task. The output should match the named shape literally.

If any test fails, revise. Do not invite a teammate to a skill that does not pass its own tests.

### Step 5 — Commit and share (~15 minutes)

Commit the skill to the location your team uses for shared skills. This might be:

- a folder in your team's main repo (e.g. `team-skills/`);
- the program-pinned plugin's contributions area, if your skill is program-shaped;
- a shared playbook-adjacent repo specifically for skills.

Wherever it lands, the location should be one a teammate can find without you telling them where.

Send a short note to the team: "I wrote a skill for X. It triggers on phrases Y and Z. The README is at <path>. Try it; tell me what breaks."

### Step 6 — Get one teammate to invoke it (~30 minutes elapsed; ~5 minutes active)

Wait for a real task that matches the trigger. When it comes up, invite a teammate to invoke the skill on it. Do not run it for them; they invoke it themselves.

Capture the invocation log:

- the phrase they used to trigger the skill;
- the inputs the skill consumed;
- the output the skill produced;
- whether they had to edit the output before using it;
- a one-sentence note on what surprised them.

### Step 7 — Reflect (~30 minutes)

Write a one-paragraph reflection in your `LEARNER.md` Notes section or in a separate file you link from the badge. The reflection covers:

- what the skill does, in plain English;
- why it earns a place in the library (workflow that has run repeatedly, named owner, captures repeated judgement);
- one thing the teammate's invocation revealed that you would change in v2.

The reflection is what shows the cohort lead that you understood the skill, not just that you wrote one.

---

## Evidence template

Copy into your tracker or `LEARNER.md`:

```markdown
## Quest G-1 — Author a team skill

- Builder: <handle>
- Date claimed: <YYYY-MM-DD>
- Skill repo and path: <URL or path>
- Skill name: <name from frontmatter>
- Teammate handle who invoked: <handle>
- Invocation log link or paste: <link or short paste>
- Trigger / refusal / output-shape tests: all pass
- Reflection: <one-paragraph or link>
```

The skill itself is the artefact. The teammate's invocation is the proof that the skill is alive, not just authored. Both are required.

---

## Reviewer routing

When the quest is claimed, route per [Appendix L](../../../appendices/L-certification/README.md) reviewer protocol. For Green Belt and above, at least one piece of evidence should be reviewed by someone outside your immediate team (Appendix L Section: Sample size). For this quest, that means at least one teammate invocation should be from a builder outside your day-to-day team if your team is small.

The reviewer attests that:

- the skill exists at the named path;
- the skill passes the three tests;
- the teammate's invocation log is real and the skill's output is plausible;
- the reflection shows comprehension, not just compliance;
- no part of the skill or evidence violates the program's redlines (no PII, no secrets, no internal-doc paste-throughs).

---

## Common pitfalls

**Picking a workflow that has not stabilised.** First-version skills written too early need rewriting in two weeks. Wait for the third run.

**Drafting in one sitting without testing.** A skill that has not survived its own tests will not survive a teammate. Run the three tests before sharing.

**Choosing a maintenance owner who has not agreed.** "I think my tech lead would own this" is not the same as "my tech lead said yes." Get the agreement before shipping.

**Skipping the teammate invocation step.** The point is not the SKILL.md; it is the *use* by someone other than the author. Without that, the quest is incomplete.

**Skipping the reflection.** Tracking is for cohort leads; reflection is for you. Future you will want to know what surprised you about the v1.

**Treating the badge as the goal.** The goal is leverage for your team. The badge is the artefact that proves you produced it.

---

## What you can say after this quest

> "I have written a skill that captures one of my team's repeated workflows, and at least one teammate has used it successfully on a real task. I now know how to recognise the next workflow that earns a skill."

---

**Previous:** [← G.11 Advanced prompting](G11-advanced-prompting.md) · **Next:** [→ Part B README](../b-practices/README.md)

**Further reading**

- [G.6 — Skills overview](G06-skills-overview.md)
- [G.7 — Writing your first SKILL.md](G07-writing-your-first-skill.md)
- [Appendix C — Skills Library](../../../appendices/C-skills-library/README.md)
- [Appendix L — Certification](../../../appendices/L-certification/README.md)
- The reference implementation: [`skills/playbook-course/SKILL.md`](../../../skills/playbook-course/SKILL.md)
