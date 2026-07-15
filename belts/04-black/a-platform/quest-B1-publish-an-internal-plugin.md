---
title: "Quest B-1: Publish a shared skill"
slug: "belts/black/quest-publish-an-internal-plugin"
section: "belts"
status: "drafted"
type: "quest"
track: "black"
order: 90
time_minutes: 480
audience: "platform-builder"
outcome: "Publish a skill to razorpay/agent-skills so at least two PODs outside your team install it within a month — and capture the cross-POD adoption signal."
prev: "belts/black/tool-design"
next: "belts/black/b-craft"
pillar: "harness"
belt: "black"
tags: ["black-belt", "quest", "skill-publishing", "platform"]
updated: "2026-07-15"
---

# 🎮 Quest B-1 — Publish a shared skill

> **Belt progress:** Part A of Black Belt
> **Time budget:** ~8 hours active, more elapsed (publishing + install signal collection)
> **Prerequisite:** Green Belt awarded; nomination registered; B.1–B.6 read at GREEN colour
> **What you'll prove:** that you can take a workflow your team owns, publish it through `razorpay/agent-skills`, and watch other PODs adopt it — the platform-builder loop in concrete form

---

## What this quest is

Pick a workflow your team owns and runs three or more times by hand. Author it as a focused skill (per B.2), using an MCP integration only if the workflow needs one (per B.1). Publish the skill to `razorpay/agent-skills`. The quest is claimed when at least **two PODs outside your immediate team** have installed the merged skill within a month of publication.

---

## What does NOT count

- A skill only your team has installed.
- A skill published to a personal repo instead of `razorpay/agent-skills`.
- A skill installed by your team and one adjacent team that shares your manager — Appendix L's sample-size rule applies; the two installs must be from genuinely outside teams.
- A skill that fails the repository validation or G.7 anatomy checks.
- A skill with no clear owner, trigger, usage example, or clean-install proof.
- A skill that handles regulator-protected data without the right governance path.

---

## How to do it

### Step 1 — Pick a workflow (~30 minutes)

Open your team's recent week. Look for a workflow that:

- you have run by hand three or more times in the last quarter;
- has named, repeated structure (not free-form thinking);
- has a clear trigger (a phrase, a moment, a file pattern);
- produces a concrete artefact each time (a Markdown report, a diff, a list, a draft);
- has plausible value to teams beyond your own — at minimum, two PODs you can name should benefit.

Common candidates for a reusable skill:

- a **release workflow** for a service your team owns (pre-release check + release-notes drafter + post-release smoke);
- a **triage toolkit** for a recurring incoming-work queue (classify + draft response + route);
- a **standards toolkit** for a domain your team owns (lint a doc, validate a config, suggest a fix);
- a **migration helper** for a pattern other teams need to adopt;
- a **status/reporting toolkit** that produces a structured artefact other teams can consume.

If you cannot list two named PODs that would plausibly install your candidate skill, pick again.

### Step 2 — Run the workflow by hand and take notes (~30 minutes)

Before authoring any SKILL.md, run the workflow one more time deliberately. Take notes on:

- triggers (what makes you reach for it);
- inputs (files, connectors, context);
- judgement calls (where the workflow needs human-in-the-loop);
- outputs (the literal shape);
- failure modes (what goes wrong, and what the recovery looks like).

The notes become the `SKILL.md` workflow, examples, stop conditions, and supporting references.

### Step 3 — Author the skill (~2 hours active)

Apply the SKILL.md anatomy from G.7. Keep one `SKILL.md` for the workflow; add `references/`, `scripts/`, or `assets/` only when needed. Pass the trigger, refusal, output-shape, and representative execution tests from G.7.

If the skill needs an MCP integration (per B.1), name that precondition and the failure path in `SKILL.md`. Do not hide connector requirements inside an invented pack manifest.

### Step 4 — Place it in the shared repository (~30 minutes)

Apply the placement decision from B.2:

- `<category>/skills/<skill-name>/` for a shared technical capability;
- `teams/<team>/skills/<skill-name>/` for a team-owned workflow; or
- `business/<domain>/<skill-name>/` for a cross-functional business workflow.

Put required instructions in `SKILL.md`. Follow the repository's current frontmatter and CODEOWNERS guidance for the chosen path.

### Step 5 — Run repository validation (~30 minutes)

Run `make test` from the `agent-skills` root and the focused skill reviewer from B.2. Run any bundled scripts against representative fixtures. Cohort feedback comes free, but only after the contribution is shippable.

### Step 6 — Open and merge the pull request (~30 minutes)

Open a normal PR to `razorpay/agent-skills`. State the use case, path decision, owner, invocation, validation, and non-goals. Get approval from the owning team; involve DevEx when the PR changes repository structure. After merge, confirm the real `npx skills add razorpay/agent-skills --skill <skill-name>` command from a clean environment.

### Step 7 — Announce (~30 minutes elapsed)

Post in `#devex-skills` with:

- the skill name and the install command;
- a one-paragraph "what this is for and why your POD might want it";
- a link to the merged PR and skill path;
- the team handle that owns it;
- a polite ask: "if your POD installs this, drop a 👍 here so I can track adoption."

The announcement is the reach — without it, only you know the skill exists. With it, the two other PODs are reachable in a single thread.

### Step 8 — Watch for installs (~elapsed; ~3-4 hours active over a month)

The quest's success criterion is **two PODs outside your immediate team install the skill within a month**. Help that signal materialise without forcing it:

- talk to the teams who 👍'd the announcement;
- offer a 15-minute "is this useful for you" pairing session if a team is on the fence;
- iterate on the skill if early feedback surfaces gaps; merge a follow-up that addresses real friction;
- collect install confirmations as they happen.

If after a month you do not have two outside-team installs, the quest is not yet claimed. Two paths forward: (a) ask in `#devex-skills` for advice on discovery and fit; (b) revisit the workflow choice — your candidate may not have generalised as much as you thought.

### Step 9 — Reflect (~30 minutes)

Write a one-paragraph reflection covering:

- what the workflow does and why other PODs found it useful;
- the moment(s) you discovered the skill needed something you did not anticipate;
- what you would do differently for the next shared skill;
- the changes that came from outside-team adoption signal;
- one thing about the repository PR, review, or install flow that worked or did not.

The reflection is what the cohort lead reads. It is what makes the quest "claimed" rather than just "merged."

---

## Evidence template

Copy into your tracker or `LEARNER.md`:

```markdown
## Quest B-1 — Publish a shared skill

- Builder: <handle>
- Date claimed: <YYYY-MM-DD>
- Skill name: <skill-name>
- Skill path: <path in razorpay/agent-skills>
- Merged PR URL: <link>
- Install command: <command>
- Owner team: <team-handle>
- POD install confirmations (≥2 outside immediate team):
  - <POD-1 handle>, install date <YYYY-MM-DD>, confirmation link
  - <POD-2 handle>, install date <YYYY-MM-DD>, confirmation link
- Reviewer (out-of-team per Appendix L): <handle>
- Reflection: <one-paragraph or link>
```

The merged skill is the artefact. The two install confirmations are the proof of cross-POD adoption. The reflection is the proof of internalisation.

---

## Reviewer routing

When the quest is claimed, route per [Appendix L](../../../appendices/L-certification/README.md). For Black Belt and above, every piece of evidence should be reviewed by a builder outside the candidate's immediate team — Quest B-1 is the first quest where this rule meaningfully bites because the install confirmations themselves come from outside teams; the reviewer's job is to verify the chain.

The reviewer attests that:

- the skill exists at the named repository path and merged PR;
- the path, frontmatter, and CODEOWNERS route identify an accountable owner;
- the skill passes repository validation and the SKILL.md anatomy checks;
- the documented install command works from a clean environment;
- the two install confirmations are from genuinely outside teams (not adjacent teams with the same manager);
- the reflection shows comprehension of the platform-builder loop, not just compliance.

---

## Common pitfalls

**Picking a workflow that does not generalise.** Three runs by your team do not predict three other teams will want it. Fix: pick again with the "two named PODs" test before authoring.

**Writing wrapper docs instead of agent instructions.** Other teams can read the pitch but the agent cannot run the workflow. Fix: keep the trigger, workflow, stop conditions, and example in `SKILL.md`; use repository-level docs for discovery.

**Personal-only ownership.** A skill only its author can review is orphan-ready. Fix: route ownership through the team or function that owns the workflow.

**Testing only in the author's checkout.** If the install path is broken, nobody can adopt regardless of skill quality. Fix: merge through the shared repository, then clean-install the named skill before collecting adoption proof.

**Treating the announcement as optional.** Without reach, no installs. Fix: post the merged path and install command in `#devex-skills`; offer pairing time.

**Skipping the reflection.** The reflection is what makes the quest signal-bearing. Fix: 30 minutes; future-you will use the notes for the next skill.

**Over-claiming.** Two installs that are friends doing you a favour are not the same as two installs from teams that will use the skill. Fix: be honest. The cohort tracker reads the reflection.

---

## What you can say after this quest

> "I published a repository-native skill to `razorpay/agent-skills`, and at least two PODs outside my team adopted it within a month. I know what makes a shared skill reach beyond its origin team and what does not."

---

**Previous:** [← B.6 Tool design](B06-tool-design.md) · **Next:** [→ Part B — Push the Craft](../b-craft/README.md)

**Further reading**

- [B.1 — Authoring an internal MCP server](B01-internal-mcp-server.md)
- [B.2 — Publishing a shared skill](B02-skill-pack-publishing.md)
- [B.3 — Cowork plugin marketplace](B03-cowork-plugin-marketplace.md)
- [G.7 — Writing your first SKILL.md](../../03-green/a-craft/G07-writing-your-first-skill.md)
- [Appendix L — Certification](../../../appendices/L-certification/README.md)
