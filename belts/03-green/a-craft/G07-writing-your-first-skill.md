---
title: "Writing your first SKILL.md — the anatomy, naming, discipline"
slug: "belts/green/writing-your-first-skill"
section: "belts"
status: "drafted"
type: "chapter"
track: "green"
order: 7
time_minutes: 45
audience: "experienced-builder"
outcome: "Write a SKILL.md that triggers reliably, does a bounded job, and earns a place in the team's skill library."
prev: "belts/green/skills-overview"
next: "belts/green/subagents"
pillar: "context"
belt: "green"
tags: ["green-belt", "skill-authorship", "skill-md", "anatomy"]
updated: "2026-04-29"
---

# G.7 — Writing your first SKILL.md

A SKILL.md is two parts: a frontmatter block that controls when the skill activates, and a body that controls what it does once active. This chapter walks both, with a real worked example you can copy as a starting point. The chapter is the longest in Part A by time budget on purpose: skill authorship is where Green Belt builders start producing leverage that other builders consume.

---

## If you're short on time

- The frontmatter has two fields: `name` (the slug-shaped ID) and `description` (the natural-language trigger that matches phrases the user types).
- The body has Overview, Hard Rules, Inputs, Outputs, and Workflow sections at minimum. Skill bodies usually run 100–300 lines.
- The discipline that separates a working skill from a noisy one: every behaviour the skill takes is named explicitly, every behaviour it refuses is named explicitly.

---

## The anatomy of a SKILL.md

```markdown
---
name: <slug-shaped-id>
description: >
  When to reach for this skill. Phrases the user might type that
  should match. What it will do at a high level. What it will not
  do. The description is what the agent matches against to decide
  whether to load this skill.
---

# <Human-readable name>

## Overview

One paragraph: what the skill is for, in plain English. Read by
maintainers and by reviewers; sets the tone for the rest of the file.

## Hard Rules

A bulleted list of things the skill will not do. Stated negatively
on purpose. Examples: "Do not modify code before showing the plan."
"Do not write secrets to disk." "Do not bypass the design system."

## Inputs

What the skill needs to do its job. Files, repo state, connectors,
prior conversation, user-provided arguments. If something is
optional, name what happens when it is missing.

## Outputs

The shape of the artefact the skill produces. A categorised list, a
markdown report, a diff, a rendered template. Be specific: "a
markdown PR description with sections X, Y, Z" not "a PR
description."

## Workflow

The step-by-step the skill applies. Numbered. Each step names what
the skill reads, what it produces, and what it asks the user.

## References

Files, appendices, or external docs the skill defers to. The skill
is not the policy; it is the behaviour against the policy. Name the
policy.
```

That is the canonical shape. Every Razorpay-shipped skill follows it. The frontmatter is enforced; the body sections are convention but heavily recommended.

---

## A real worked SKILL.md (small, end-to-end)

Take a workflow you might actually own. Suppose your team writes weekly status updates and you keep doing the same shape: pull the week's merged PRs, summarise by area, surface anything blocked. You have done it three times by hand. Time for a skill.

```markdown
---
name: weekly-status-summary
description: >
  Generate the weekly engineering status summary for our team.
  Trigger phrases: "draft this week's status", "generate the weekly",
  "summarise the week", or "weekly summary please". Use when a team
  lead or a contributor wants a Markdown summary of the merged PRs
  from the last seven days, grouped by area, with blockers
  highlighted. Defers to the team's shared CLAUDE.md for area
  taxonomy and tone conventions.
---

# Weekly Status Summary

## Overview

Reads the merged PRs for the calling team in the last seven days,
groups them by the area taxonomy in the team's CLAUDE.md, and
produces a Markdown summary that the team lead can edit lightly and
post. The skill never posts anywhere by itself.

## Hard Rules

- Do not post to messaging platforms by itself. Print the summary
  for human review and stop.
- Do not include PRs that are still open. Merged-only.
- Do not name individual contributors in the body of the summary;
  refer to the team or the area. (Names attract noise; the goal is
  surface health.)
- Do not invent a blocker. Only name a PR as blocked if its
  description or comments say so.
- Do not pull data from outside the configured ticket and PR
  systems.

## Inputs

- The team's repo or repo set, configured by the team's
  CLAUDE.md or a `STATUS.md` config in the team folder.
- The PR system connector for fetching merged PRs.
- Optionally, the ticketing connector for cross-referencing
  blockers.
- The current date (used to compute the seven-day window).

## Outputs

A Markdown summary of this shape:

```
# Weekly status — week of <date>

## Highlights
- 2-4 bullets, each about a shipped change worth surfacing,
  written for a team lead and not for engineers.

## By area
### <area-1>
- merged: <N> PRs
- notable: 1-line headline of one PR worth naming

### <area-2>
- ...

## Blocked or at risk
- <N> items
- For each: one-line title, link, what's blocking it.
```

## Workflow

1. Read the team's CLAUDE.md or `STATUS.md` to find the area
   taxonomy. If neither exists, ask the user for the taxonomy and
   stop.
2. Compute the seven-day window from today.
3. Fetch merged PRs from the configured repo set in that window
   via the PR connector.
4. Group PRs by area using the taxonomy. PRs that match no area
   go into an "uncategorised" bucket and are surfaced explicitly.
5. Identify blockers. A PR or ticket is "blocked" only if its
   description or a recent comment says so, or if it has been open
   past a threshold the team's CLAUDE.md names.
6. Produce the Markdown in the output shape above.
7. Print to chat. Do not post anywhere. Do not write to disk
   unless the user explicitly says "save this to STATUS-week-N.md".

## References

- Team CLAUDE.md (area taxonomy, tone)
- Appendix L (this skill is not a certification artefact; do not
  conflate)
- The team's tracker for blocker thresholds
```

That is roughly 100 lines including the frontmatter. It is small enough to read in five minutes, specific enough to behave, and disciplined enough to be safe — the Hard Rules block prevents the most common failure modes before they happen.

---

## Naming discipline

The `name` field is the skill's slug-shaped ID. Three rules:

1. **Lowercase, hyphenated.** `weekly-status-summary`, not `WeeklyStatusSummary` or `weekly_status_summary`.
2. **Verb-noun or noun-noun.** `summarise-tests`, `pre-ship-check`, `design-intel`. Avoid generic names; "helper" and "utility" attract clutter.
3. **Unique within the loaded plugin.** A name collision means whichever was loaded last wins; the older skill becomes invisible. The program-pinned plugin has a name registry to prevent collisions; team-local skills should still pick names that obviously do not collide.

The `description` field is the natural-language trigger. Three rules:

1. **Name the trigger phrases explicitly.** "Trigger phrases: …" in the description so the agent matches reliably.
2. **Name the bounded job.** A one-line summary of what the skill does and what it does not do.
3. **Cite the policy.** If the skill defers to an appendix, a CLAUDE.md, or a team convention, name it. Skills that defer are easier to keep current than skills that re-derive.

A poor description (`"helps with PRs"`) gives the agent no guidance and matches everything; a good description (`"draft a PR description for an open branch using the team's tone conventions; trigger phrases: 'draft my PR description', 'write the PR body'; defers to team CLAUDE.md for tone"`) matches the right phrases and refuses the rest.

---

## Body discipline

Three lessons that distinguish a working skill from a noisy one.

### Hard Rules first

Putting the don'ts before the dos sets the tone. The Hard Rules block names what could go wrong if the skill behaves badly: writing secrets, posting without review, inventing data, bypassing policy. Reviewers read this block first when auditing the skill; named refusals build trust.

### Inputs and Outputs are precise

"Files" is too vague. "The team's CLAUDE.md, the PR system connector for the configured repo set, the current date" is precise. The agent reads the Inputs block and refuses to run if a required input is missing. Same with Outputs: "a Markdown summary" is too vague; the literal shape from the example is precise enough that two runs of the skill produce comparable artefacts.

### Workflow is numbered and bounded

Each step says what the skill reads, what it produces, what it asks. Steps that say "process the data" or "generate the response" are not steps; they are wishes. Numbered, named, bounded steps survive long after the author has forgotten the original intent.

---

## How to test a skill before shipping

Three quick checks before declaring a skill ready:

1. **Trigger test.** Type three or four phrasings the skill should match. The agent should load it. Type two phrasings the skill should *not* match. The agent should not load it.
2. **Refusal test.** Drive the skill toward each of its Hard Rules. The agent should refuse and explain. If it does not, the rule is too soft or the prompt missed it; tighten.
3. **Output-shape test.** Run the skill on a real task. The output should match the named output shape literally. If it drifts, name the drift in the body and re-test.

Failing any of the three is a sign the skill is not ready. Failing all three means the skill should not have been written yet.

---

## Vendoring and ownership

A team-local skill might evolve into a program-library skill. The signs:

- multiple teams ask for it;
- it has run cleanly for three months without rule churn;
- it solves a workflow the program-pinned plugin owners recognise as program-shaped.

Vendoring means the skill moves into the program plugin's bundle and becomes a first-party artefact. The maintainer changes from a single team to the program-plugin reviewer rotation. The discipline goes up; the audience goes up. Not every team-local skill should vendor; some should stay team-local forever.

The `playbook-course` skill that ships in v0.8 is the canonical Razorpay-shipped reference implementation — a long worked example you can read end-to-end at `skills/playbook-course/SKILL.md`. The shape there is the same shape this chapter teaches.

---

## Common failure modes

**A skill that triggers on too many phrases.** A vague description matches almost any prompt. The agent loads the skill in sessions where it is irrelevant; the user wonders why their session feels weird. Fix: tighten the description. Name the phrases.

**A skill with no Hard Rules.** No refusals means no safety net. The agent will be polite and helpful in ways the author did not intend. Fix: write three to five Hard Rules; the act of writing them surfaces the risk surface.

**A skill that is mostly free-form prose.** The body reads like a blog post. The agent has no concrete steps to follow. Fix: convert the prose into Inputs / Outputs / Workflow.

**A skill written before the workflow is stable.** The first version drifts every week. Fix: skill bodies are written *after* a workflow has run cleanly three times by hand.

**A skill that contradicts its own Hard Rules.** "Do not post" in the rules but "post the summary" in step 5. Fix: review for self-consistency before shipping.

**A skill nobody owns.** Goes stale fastest. Fix: name a maintainer in the README that ships next to the SKILL.md.

---

## GREEN / YELLOW / RED self-check

- 🟢 GREEN — I can write a SKILL.md from scratch, run the trigger / refusal / output-shape tests, and confidently ship it to my team.
- 🟡 YELLOW — I understand the anatomy but my first draft has soft Hard Rules or vague Outputs.
- 🔴 RED — I have not authored a SKILL.md beyond a copy of someone else's.

---

## What you can say after this module

> "I can write a SKILL.md that triggers cleanly, refuses what it should refuse, produces a precise artefact, and earns a place in my team's library."

---

## Where to go next

G.8 (*Subagents*) opens the Harness cluster of Part A. The skills you write are content for a single agent; subagents are how you delegate parts of a task to specialist agents.

**Previous:** [← G.6 Skills overview](G06-skills-overview.md) · **Next:** [→ G.8 Subagents](G08-subagents.md)

**Further reading**

- [Appendix C — Skills Library](../../../appendices/C-skills-library/README.md)
- The reference implementation: [`skills/playbook-course/SKILL.md`](../../../skills/playbook-course/SKILL.md)
- [Anthropic on skill authoring](https://code.claude.com/docs/en/best-practices)
