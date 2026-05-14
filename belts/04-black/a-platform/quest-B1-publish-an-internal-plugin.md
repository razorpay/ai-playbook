---
title: "Quest B-1: Publish an internal plugin"
slug: "belts/black/quest-publish-an-internal-plugin"
section: "belts"
status: "drafted"
type: "quest"
track: "black"
order: 90
time_minutes: 480
audience: "platform-builder"
outcome: "Author and publish a skill pack (with an optional MCP) so at least two PODs outside your team install it within a month — and capture the cross-POD adoption signal."
prev: "belts/black/tool-design"
next: "belts/black/b-craft"
pillar: "harness"
belt: "black"
tags: ["black-belt", "quest", "plugin-publishing", "platform"]
updated: "2026-04-29"
---

# 🎮 Quest B-1 — Publish an internal plugin

> **Belt progress:** Part A of Black Belt
> **Time budget:** ~8 hours active, more elapsed (publishing + install signal collection)
> **Prerequisite:** Green Belt awarded; nomination registered; B.1–B.6 read at GREEN colour
> **What you'll prove:** that you can take a workflow your team owns, bundle it as a published artefact, distribute it through the program's pinned channel, and watch other PODs adopt it — the platform-builder loop in concrete form

---

## What this quest is

Pick a workflow your team owns and runs three or more times by hand. Bundle the workflow as a skill pack (per B.2), with an optional MCP integration if the workflow needs one (per B.1). Publish the pack to the program's pinned distribution channel. Watch for installs from PODs outside your immediate team. The quest is claimed when at least **two PODs outside your immediate team** have installed the plugin within a month of publication.

---

## What does NOT count

- A skill pack only your team has installed.
- A pack published to a personal repo rather than the program's pinned channel.
- A pack installed by your team and one adjacent team that shares your manager — Appendix L's sample-size rule applies; the two installs must be from genuinely outside teams.
- A pack that fails the SKILL.md anatomy checks (per G.7) on any of its skills.
- A pack with no consumer-facing README that names what it is, what it costs, who owns it, and how to report issues.
- A pack that handles regulator-protected data without the right governance path.

---

## How to do it

### Step 1 — Pick a workflow (~30 minutes)

Open your team's recent week. Look for a workflow that:

- you have run by hand three or more times in the last quarter;
- has named, repeated structure (not free-form thinking);
- has a clear trigger (a phrase, a moment, a file pattern);
- produces a concrete artefact each time (a Markdown report, a diff, a list, a draft);
- has plausible value to teams beyond your own — at minimum, two PODs you can name should benefit.

Common candidates that compose into useful packs:

- a **release workflow** for a service your team owns (pre-release check + release-notes drafter + post-release smoke);
- a **triage toolkit** for a recurring incoming-work queue (classify + draft response + route);
- a **standards toolkit** for a domain your team owns (lint a doc, validate a config, suggest a fix);
- a **migration helper** for a pattern other teams need to adopt;
- a **status/reporting toolkit** that produces a structured artefact other teams can consume.

If you cannot list two named PODs that would plausibly install your candidate pack, pick again.

### Step 2 — Run the workflow by hand and take notes (~30 minutes)

Before authoring any SKILL.md, run the workflow one more time deliberately. Take notes on:

- triggers (what makes you reach for it);
- inputs (files, connectors, context);
- judgement calls (where the workflow needs human-in-the-loop);
- outputs (the literal shape);
- failure modes (what goes wrong, and what the recovery looks like).

The notes become the SKILL.md bodies and the consumer-facing README.

### Step 3 — Author the skill(s) (~2 hours active)

Apply the SKILL.md anatomy from G.7. One SKILL.md per skill in the pack; reference files where needed; test scenarios in `tests/`. Pass the trigger / refusal / output-shape tests from G.7's "How to test a skill" section.

If the pack also needs an MCP integration (per B.1), author the MCP server alongside; the pack's `pack.yml` declares the dependency.

### Step 4 — Bundle the pack (~30 minutes)

Apply the structure from B.2:

- `pack.yml` with metadata (name, version, owner team, description, skill list, compatibility);
- `README.md` with consumer-facing answers (what it does, what it does not do, who owns it, how to install, how to report issues);
- `skills/` containing each skill;
- `tests/` containing the acceptance scenarios.

### Step 5 — Run the pack's tests (~30 minutes)

Run the acceptance scenarios. Lint clean. The pack should pass its own tests before you ship it; cohort feedback comes free, but only after the pack is shippable.

### Step 6 — Publish to the program's pinned channel (~30 minutes)

Push to the channel per B.2's publishing flow. Tag at v1.0.0. Confirm the install command works against a clean working directory.

### Step 7 — Announce (~30 minutes elapsed)

Post in [`#rzp-claude-skills`](https://razorpay.slack.com/archives/C0ABFFW6XNW) with:

- the pack name and the install command;
- a one-paragraph "what this is for and why your POD might want it";
- a link to the pack's README;
- the team handle that owns it;
- a polite ask: "if your POD installs this, drop a 👍 here so I can track adoption."

The announcement is the reach — without it, only you know the pack exists. With it, the two other PODs are reachable in a single thread.

### Step 8 — Watch for installs (~elapsed; ~3-4 hours active over a month)

The quest's success criterion is **two PODs outside your immediate team install the pack within a month**. Help that signal materialise without forcing it:

- talk to the teams who 👍'd the announcement;
- offer a 15-minute "is this useful for you" pairing session if a team is on the fence;
- iterate on the pack if early feedback surfaces gaps; ship a v1.1 that addresses real friction;
- collect install confirmations as they happen.

If after a month you do not have two outside-team installs, the quest is not yet claimed. Two paths forward: (a) talk to [`#rzp-claude-skills`](https://razorpay.slack.com/archives/C0ABFFW6XNW) for advice on adoption; (b) revisit the workflow choice — your candidate may not have generalised as much as you thought.

### Step 9 — Reflect (~30 minutes)

Write a one-paragraph reflection covering:

- what the workflow does and why other PODs found it useful;
- the moment(s) you discovered the pack needed something you did not anticipate;
- what you would do differently for the next pack;
- the v1 → v1.1 changes that came from outside-team adoption signal;
- one thing about the program's pinned-channel publishing flow that worked or did not.

The reflection is what the cohort lead reads. It is what makes the quest "claimed" rather than just "merged."

---

## Evidence template

Copy into your tracker or `LEARNER.md`:

```markdown
## Quest B-1 — Publish an internal plugin

- Builder: <handle>
- Date claimed: <YYYY-MM-DD>
- Pack name: <pack-name>
- Pack version at claim: <v1.x.y>
- Repo URL: <link>
- Install command: <command>
- Owner team: <team-handle>
- POD install confirmations (≥2 outside immediate team):
  - <POD-1 handle>, install date <YYYY-MM-DD>, confirmation link
  - <POD-2 handle>, install date <YYYY-MM-DD>, confirmation link
- Reviewer (out-of-team per Appendix L): <handle>
- Reflection: <one-paragraph or link>
```

The pack itself is the artefact. The two install confirmations are the proof of cross-POD adoption. The reflection is the proof of internalisation.

---

## Reviewer routing

When the quest is claimed, route per [Appendix L](../../../appendices/L-certification/README.md). For Black Belt and above, every piece of evidence should be reviewed by a builder outside the candidate's immediate team — Quest B-1 is the first quest where this rule meaningfully bites because the install confirmations themselves come from outside teams; the reviewer's job is to verify the chain.

The reviewer attests that:

- the pack exists at the named path and version;
- `pack.yml` names a team owner (not a personal handle);
- the consumer-facing README answers the six questions from B.2 / B.3;
- the skills inside the pack pass the SKILL.md anatomy checks;
- the two install confirmations are from genuinely outside teams (not adjacent teams with the same manager);
- the reflection shows comprehension of the platform-builder loop, not just compliance.

---

## Common pitfalls

**Picking a workflow that does not generalise.** Three runs by your team do not predict three other teams will want it. Fix: pick again with the "two named PODs" test before authoring.

**Skipping the consumer-facing README.** Other teams cannot evaluate. Fix: take B.2's README guidance seriously.

**Personal-handle owner.** A pack owned by an individual is orphan-ready. Fix: team handle.

**Authoring all the skills before testing the install flow.** Bundle and install-test early; if the install is broken nobody can adopt regardless of skill quality. Fix: get a working install of an empty-ish pack early; add skills incrementally.

**Treating the announcement as optional.** Without reach, no installs. Fix: post in [`#rzp-claude-skills`](https://razorpay.slack.com/archives/C0ABFFW6XNW); offer pairing time.

**Skipping the reflection.** The reflection is what makes the quest signal-bearing. Fix: 30 minutes; future-you will use the notes for the next pack.

**Over-claiming.** Two installs that are friends doing you a favour are not the same as two installs from teams that will use the pack. Fix: be honest. The cohort tracker reads the reflection.

---

## What you can say after this quest

> "I authored a skill pack, published it to the program's pinned channel, and at least two PODs outside my team adopted it within a month. I know what makes a pack reach beyond its origin team and what does not."

---

**Previous:** [← B.6 Tool design](B06-tool-design.md) · **Next:** Part B (Push the Craft) lands in v0.14

**Further reading**

- [B.1 — Authoring an internal MCP server](B01-internal-mcp-server.md)
- [B.2 — Publishing a skill pack](B02-skill-pack-publishing.md)
- [B.3 — Cowork plugin marketplace](B03-cowork-plugin-marketplace.md)
- [G.7 — Writing your first SKILL.md](../../03-green/a-craft/G07-writing-your-first-skill.md)
- [Appendix L — Certification](../../../appendices/L-certification/README.md)
