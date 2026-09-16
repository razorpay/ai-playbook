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
updated: "2026-09-16"
---

# G.7 — Writing your first SKILL.md

A `SKILL.md` has two jobs: its frontmatter helps an agent decide when to load it, and its body tells the agent how to do the work. This chapter walks both, shows where supporting material belongs, and ends with the test-and-publish loop for a skill another person can actually use.

---

## If you're short on time

- Every skill needs `name` and `description`. Write the description as a precise “Use when…” condition; the agent cannot use trigger guidance that appears only after the body loads.
- Keep `SKILL.md` focused on the workflow. Put detailed reference material in `references/`, repeatable deterministic code in `scripts/`, and output templates or media in `assets/`.
- Test activation, refusal, and output behaviour. For shared use, validate in `razorpay/agent-skills`, open an owning-team PR, and prove a clean install after merge.

---

## The anatomy of a SKILL.md

```markdown
---
name: <slug-shaped-id>
description: >
  What this skill does. Use when the request, artefact, or situation
  matches these concrete conditions. Include likely user language
  where it improves discovery. The agent reads this before deciding
  whether to load the body.
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

This is a strong starting shape, not an enforced table of contents. `name` and `description` are the portable frontmatter contract. The body must make the workflow, boundaries, required context, and expected result unambiguous; use the headings that make those facts easiest to find. Check the destination repository before adding client-specific frontmatter fields.

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

## Keep the main file small enough to load

A skill directory can carry four useful kinds of material:

```text
<skill-name>/
├── SKILL.md       # required: trigger, core workflow, boundaries, output
├── references/    # optional: policy, schemas, detailed examples
├── scripts/       # optional: tested deterministic helpers
└── assets/        # optional: templates or files used in output
```

Start with `SKILL.md` alone. Add a directory only when it reduces context or makes repeated work more reliable:

- Move long lookup material to `references/` and link it from the exact step that needs it.
- Put code in `scripts/` when the same fragile operation would otherwise be regenerated on every run. Test every script directly.
- Put templates, images, or boilerplate in `assets/` when the skill copies or transforms them rather than reading them as instructions.
- Do not add a neighbouring README, install guide, or changelog by habit. The shared repository owns discovery, installation, and history; the skill directory should contain what the agent needs to do the job.

This is progressive disclosure: load the core workflow first, then fetch detail only when the task reaches it. A 300-line `SKILL.md` is not automatically bad, and a 30-line one is not automatically good. The test is whether the main file contains the control flow without hauling every policy and example into context.

---

## Naming discipline

The `name` field is the skill's slug-shaped ID. Three rules:

1. **Lowercase, hyphenated.** `weekly-status-summary`, not `WeeklyStatusSummary` or `weekly_status_summary`.
2. **Verb-noun or noun-noun.** `summarise-tests`, `pre-ship-check`, `design-intel`. Avoid generic names; "helper" and "utility" attract clutter.
3. **Unique in the destination scope.** Search the target repository and the skills your intended client already loads. A collision makes discovery ambiguous even when installation succeeds.

The `description` field is the natural-language trigger. Three rules:

1. **State the condition.** Use “Use when…” and name representative requests, artefacts, or situations. Put all activation context here; a “When to use” section in the body arrives too late to help discovery.
2. **Name the bounded job.** A one-line summary of what the skill does and what it does not do.
3. **Cite the policy.** If the skill defers to an appendix, a CLAUDE.md, or a team convention, name it. Skills that defer are easier to keep current than skills that re-derive.

A poor description (`"helps with PRs"`) gives the agent no guidance and matches everything. A useful one (`"Drafts a PR description for the current branch using the team's tone conventions. Use when the user asks to draft, rewrite, or complete a PR body; do not review code or open the PR."`) names both the activation boundary and the job.

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

## Test and publish without skipping the handoff

Run these checks before declaring a skill ready:

1. **Trigger test.** Type three or four phrasings the skill should match. The agent should load it. Type two phrasings the skill should *not* match. The agent should not load it.
2. **Refusal test.** Drive the skill toward each of its Hard Rules. The agent should refuse and explain. If it does not, the rule is too soft or the prompt missed it; tighten.
3. **Output-shape test.** Run the skill on a real task. The output should match the named output shape literally. If it drifts, name the drift in the body and re-test.
4. **Repository validation.** If the skill is going to [`razorpay/agent-skills`](https://github.com/razorpay/agent-skills), put it in the shared technical, team, or business path that owns the workflow, run `make test`, and include any script fixtures in the PR evidence.
5. **Clean-install test.** After merge, install the named skill in a clean environment and run one representative request:

   ```bash
   npx skills add razorpay/agent-skills --skill <skill-name>
   ```

   A merged directory is not useful distribution until another user can discover and execute it.

For a focused local review in `razorpay/agent-skills`, the repository also documents:

```bash
python generic-helpers/skills/skill-reviewer/scripts/validate.py path/to/SKILL.md
```

The five checks are the exercise for this chapter. Keep the prompts, outputs, and clean-install result with the PR so the reviewer can distinguish a prose review from behavioural proof.

---

## Choose local or shared ownership

A skill should start where the workflow can be owned:

- Keep it project-local while the workflow depends on one repository or is still changing.
- Publish a team-owned workflow under the team's path in `razorpay/agent-skills` when teammates need the same behaviour across repositories.
- Publish a shared technical or cross-functional workflow only when its owning team or function can review future changes and support consumers outside the original project.

Shared publication is a repository PR, not an automatic move into the program-pinned plugin. The PR names the use case, path, owner, invocation, validation, and non-goals. Structural changes require the repository's DevEx review; normal workflow review follows the owning team or business function. [B.2](../../04-black/a-platform/B02-skill-pack-publishing.md) covers that publishing workflow end to end.

The in-repo `playbook-course` definition is a long worked example you can read end-to-end at `skills/playbook-course/SKILL.md`. It shows the same shape this chapter teaches; inspect `/help` before assuming any equivalent skill is installed.

---

## Common failure modes

**A skill that triggers on too many phrases.** A vague description matches almost any prompt. The agent loads the skill in sessions where it is irrelevant; the user wonders why their session feels weird. Fix: tighten the description. Name the phrases.

**A skill with no Hard Rules.** No refusals means no safety net. The agent will be polite and helpful in ways the author did not intend. Fix: write three to five Hard Rules; the act of writing them surfaces the risk surface.

**A skill that is mostly free-form prose.** The body reads like a blog post. The agent has no concrete steps to follow. Fix: convert the prose into Inputs / Outputs / Workflow.

**A skill written before the workflow is stable.** The first version drifts every week. Fix: skill bodies are written *after* a workflow has run cleanly three times by hand.

**A skill that contradicts its own Hard Rules.** "Do not post" in the rules but "post the summary" in step 5. Fix: review for self-consistency before shipping.

**A skill nobody owns.** It goes stale fastest. Fix: publish under the team or function that owns the workflow, and use the destination repository's frontmatter, CODEOWNERS, and PR review path. Do not invent a per-skill README to substitute for ownership.

---

## GREEN / YELLOW / RED self-check

- 🟢 GREEN — I can write a focused `SKILL.md`, place supporting files deliberately, pass the behavioural and repository checks, and prove another user can install and run it.
- 🟡 YELLOW — I understand the anatomy, but the activation boundary, ownership, output shape, or clean-install evidence is incomplete.
- 🔴 RED — I have only copied a skill, or I am calling a merged file “published” without a working consumer path.

---

## What you can say after this module

> "I can write a focused SKILL.md that triggers cleanly, refuses what it should refuse, uses progressive disclosure, produces a precise artefact, and survives a clean install by another user."

---

## Where to go next

G.8 (*Subagents*) opens the Harness cluster of Part A. The skills you write are content for a single agent; subagents are how you delegate parts of a task to specialist agents.

**Previous:** [← G.6 Skills overview](G06-skills-overview.md) · **Next:** [→ G.8 Subagents](G08-subagents.md)

**Further reading**

- [Appendix C — Skills Library](../../../appendices/C-skills-library/README.md)
- The reference implementation: [`skills/playbook-course/SKILL.md`](../../../skills/playbook-course/SKILL.md)
- [`razorpay/agent-skills` contribution guide](https://github.com/razorpay/agent-skills/blob/master/docs/contributing.md) — current placement, validation, review, and installation route
- [`razorpay/agent-skills` best practices](https://github.com/razorpay/agent-skills/blob/master/docs/BEST_PRACTICES.md) — frontmatter, progressive disclosure, optional resources, and validation
- [B.2 — Publishing a shared skill](../../04-black/a-platform/B02-skill-pack-publishing.md)
- [Anthropic on skill authoring](https://code.claude.com/docs/en/best-practices)
