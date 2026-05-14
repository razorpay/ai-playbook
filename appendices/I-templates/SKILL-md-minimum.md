---
title: "Template: SKILL.md (minimum viable)"
slug: "appendices/templates/skill-md-minimum"
section: "appendices"
status: "drafted"
type: "template"
track: "templates"
order: 4
time_minutes: 5
audience: "engineer"
outcome: "Author your first SKILL.md that passes the anatomy checks: clear triggers, a minimum body, a stable output shape."
prev: "appendices/templates/claude-local-md"
next: "appendices/templates/skill-md-full"
pillar: "context"
belt: null
tags: ["template", "skill-md", "minimum"]
updated: "2026-05-08"
---

# Template: SKILL.md (minimum viable)

## What this template is for

The smallest SKILL.md that passes the G.7 anatomy checks. Use it when you are authoring your first skill or when the workflow is genuinely simple enough that progressive disclosure is overkill.

A minimum-viable SKILL.md has three required sections: triggers (when does the skill activate), body (what does the skill do), and output shape (what does the user get back). Target length: 60 to 120 lines.

If the workflow needs reference files, on-demand depth, or external pointers, use the [full SKILL.md template](SKILL-md-full.md) instead. The discipline behind both templates is covered in [G.7](../../belts/03-green/a-craft/G07-writing-your-first-skill.md) and (for the progressive-disclosure version) [B.7](../../belts/04-black/b-craft/B07-progressive-disclosure.md).

## How to use it

1. Create a directory for your skill: `skills/<skill-name>/`.
2. Copy the template body below into `skills/<skill-name>/SKILL.md`.
3. Replace the placeholders with your content.
4. Add a `tests/` subdirectory with at least one acceptance scenario.
5. Verify the skill passes the G.7 trigger / refusal / output-shape tests.

---

## Template body

```markdown
---
name: <!-- replace with kebab-case name, e.g., generate-weekly-status -->
description: <!-- replace with one sentence describing what the skill does
                  and when to invoke it. This is the line the LLM reads
                  to decide whether to use the skill. Be specific about
                  triggers. Bad: "Helps with status updates." Good:
                  "Generates the team's weekly status report from the
                  tracker and primary Slack channel, formatted for the
                  team's standard report shape." -->
---

# <!-- replace with human-readable skill name -->

## Triggers

<!-- replace this with one or two sentences naming when the skill should
     activate. The trigger phrasing should help the LLM disambiguate from
     other skills. Example:
     "Activate when the user says 'generate the weekly status', 'run the
     status report', or asks for the weekly summary." -->

## Body

<!-- replace this with the workflow itself. Numbered steps. Each step
     names what to do, not how to do it. Five to fifteen steps for a
     simple skill. Example:

     1. Read the tracker (default: the last seven days of closed and in-flight items).
     2. Read the primary team Slack channel for the same window.
     3. Identify the three to five items most relevant to the team's current sprint goal.
     4. Format the report using the team's standard shape (introduction, accomplishments, in flight, blockers, asks).
     5. Output the report as markdown ready to paste. -->

## Output shape

<!-- replace this with the literal shape of the output. A skill that
     produces a markdown report describes the report's section headers
     and their order. A skill that produces a code change describes the
     diff shape. Example:

     The output is a markdown document with five sections in this order:

     ## This week's accomplishments
     <!-- bulleted list, three to five items -->

     ## In flight
     <!-- bulleted list, in-progress items -->

     ## Blockers
     <!-- bulleted list, surfaced if and only if blockers exist -->

     ## Asks
     <!-- bulleted list, requests of other teams -->

     ## Looking ahead
     <!-- one paragraph, what next week looks like -->
     -->

## When to refuse

<!-- replace this with named situations where the skill should refuse
     rather than try. Two to four entries. Example:
     - The tracker has fewer than three items in the window. Refuse;
       suggest the user check the tracker first.
     - The team has not committed a sprint goal in the past month. Refuse;
       suggest the user run the goal-setting flow first.
     - The user asks for a non-team-shaped report. Refuse; this skill is
       team-specific. -->
```

---

## Worked example

A populated minimum-viable SKILL.md for a real skill.

```markdown
---
name: generate-weekly-status
description: Generates the team's weekly status report from the tracker and the primary Slack channel, formatted for the team's standard report shape. Activate when the user says "generate the weekly status", "run the status report", or asks for the weekly summary.
---

# Generate weekly status

## Triggers

Activate when the user explicitly asks for the weekly status report. Common phrasings: "generate the weekly status", "run the status report", "weekly summary please".

## Body

1. Read the tracker for the last seven days. Pull all items that closed in the window plus all items currently in-flight that are owned by the team.
2. Read the primary team Slack channel for the same window. Identify the three to five most-discussed engineering threads.
3. Identify the three to five items most relevant to the team's current sprint goal. Sprint goal lives in the team's pinned doc; if not present, treat the most-discussed thread as the sprint goal proxy.
4. Format the report using the team's standard shape: this week's accomplishments, in flight, blockers, asks, looking ahead.
5. Output the report as markdown ready to paste into the team's standup or shared doc.

## Output shape

The output is a markdown document with five sections in this order:

## This week's accomplishments
- Three to five bulleted items.
- Each item is a single sentence describing what shipped, who shipped it (using team handles, not individual names), and what changed for the user.

## In flight
- Bulleted list of items currently in flight.
- Each item with the owner role and an expected close date if known.

## Blockers
- Bulleted list, surfaced if and only if blockers exist.
- Each blocker names the dependency, the team that owns it, and the asks.

## Asks
- Bulleted list of requests of other teams.
- Each ask names the team and the specific ask.

## Looking ahead
- One paragraph describing what the next week looks like.

## When to refuse

- The tracker has fewer than three items in the window. Refuse; suggest the user check the tracker first.
- The team has not committed a sprint goal in the past month. Refuse; suggest the user run the goal-setting flow first.
- The user asks for a non-team-shaped report (e.g., personal status). Refuse; this skill is team-specific.
- Sensitive data (regulator-protected fields) appears in any source the skill reads. Refuse; surface that the data classification needs review.
```

This populated example is around 50 lines. The skill is small, focused, and testable.

---

## What this template is not

**Not a substitute for the chapter.** [G.7](../../belts/03-green/a-craft/G07-writing-your-first-skill.md) covers the discipline: how to scope a skill, how to test it, how to evolve it. The template is the artefact; the chapter is the rationale.

**Not a substitute for tests.** A SKILL.md without acceptance scenarios in `tests/` is incomplete. The G.7 trigger / refusal / output-shape tests are how the skill becomes shippable.

**Not the final shape if the workflow grows.** A skill that started as minimum-viable but has accumulated reference files, branching logic, and on-demand depth is a candidate for the [full SKILL.md template](SKILL-md-full.md) and the progressive-disclosure pattern in [B.7](../../belts/04-black/b-craft/B07-progressive-disclosure.md).

**Not a place for instructions to humans.** The SKILL.md is read by Claude Code; the README of a skill pack is read by humans. Use the README for human-facing instructions; use SKILL.md for the skill itself.

---

**Previous:** [← CLAUDE.local.md template](CLAUDE-local-md.md) · **Next:** [→ SKILL.md full template](SKILL-md-full.md)
