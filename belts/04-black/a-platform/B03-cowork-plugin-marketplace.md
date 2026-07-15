---
title: "Building a plugin marketplace entry for Razorpay Cowork"
slug: "belts/black/cowork-plugin-marketplace"
section: "belts"
status: "drafted"
type: "chapter"
track: "black"
order: 3
time_minutes: 45
audience: "platform-builder"
outcome: "Publish a plugin to the program's Cowork tenant marketplace so non-engineer teammates can install the workflow with one click — and understand how that surface differs from the shared skill library."
prev: "belts/black/skill-pack-publishing"
next: "belts/black/agent-sdk"
pillar: "harness"
belt: "black"
tags: ["black-belt", "cowork", "plugin-marketplace", "publishing"]
updated: "2026-07-15"
---

# B.3 — Building a plugin marketplace entry for Razorpay Cowork

A shared skill in `razorpay/agent-skills` reaches teammates using supported coding agents. The Cowork plugin marketplace reaches a wider audience: PMs, ops, designers, support — anyone using Cowork as their daily AI surface. This module is about contributing a plugin entry to that marketplace.

---

## If you're short on time

- Cowork is Anthropic's desktop AI app for non-engineers (referenced in §0.5 — Tool Tour). Its plugin marketplace lets teammates install bundles of skills, MCPs, and agents with one click.
- A Razorpay tenant of Cowork has a curated marketplace; entries to that marketplace go through a governance step.
- Publishing to the marketplace is what turns "a skill the engineering team uses" into "a skill any teammate can install" — the leverage delta is real.

---

## The mental model

```
   ┌────────────────────────────────────────────────┐
   │              COWORK PLUGIN MARKETPLACE           │
   ├────────────────────────────────────────────────┤
   │                                                  │
   │   Public Cowork marketplace                     │
   │           │                                       │
   │           ▼                                       │
   │   Razorpay's Cowork tenant marketplace          │
   │     - curated, governed                         │
   │     - Razorpay-specific plugins                 │
   │     - can reuse shared agent-skills workflows  │
   │                                                  │
   │   What an entry contains:                       │
   │     - skill(s)                                  │
   │     - MCP integrations (optional)               │
   │     - subagent definitions (optional)           │
   │     - install metadata + governance review     │
   │                                                  │
   └────────────────────────────────────────────────┘
```

The Cowork marketplace itself is public; Anthropic publishes the platform docs. The program's tenant marketplace is the curated subset of plugins Razorpay teammates see when they open Cowork. A Black Belt builder publishes into the tenant marketplace, not the public one.

---

## What a marketplace entry contains

A plugin entry typically packages:

- **One or more skills.** Reuse repository-native workflows from B.2 where the runtime supports them.
- **Optional MCP integrations.** If the plugin needs access to a connector that does not ship with Cowork by default, the entry declares it.
- **Optional subagent definitions.** Specialist subagents the plugin's skills can spawn (per G.8).
- **Install metadata.** Name, version, owner, description, what it does, what it does not do.
- **Governance review record.** The program's review pass that approved the plugin for the tenant marketplace.

The entry is structured (the public Cowork docs name the file shapes); the discipline is what separates a publishable entry from a working-but-rough one.

---

## Why publish to the marketplace, not just the shared skill library

Three audiences differ enough to justify both surfaces.

**The shared skill library** reaches teammates using supported coding agents. They install a named skill from `razorpay/agent-skills`, work in repositories, and can inspect the source and PR history.

**The Cowork marketplace** reaches everyone else. PMs who want a "summarise my sprint" skill. Ops who want a "triage incoming tickets" skill. Designers who want a "audit this Figma frame against Blade" skill. They do not run Claude Code; they open Cowork; they click *Install*.

The same underlying workflow can ship to both surfaces — the source may be shared, but the packaging and audience differ. A Black Belt builder who publishes only to the agent-skills library may leave the non-engineer audience unreached. The leverage delta is real when the workflow genuinely fits both surfaces.

---

## The governance step

Razorpay's tenant marketplace has a governance review. The shape:

1. **Submit.** The author submits the plugin entry with `pack.yml`, README, install metadata, and the rationale for marketplace inclusion.
2. **Scope review.** A program reviewer confirms the plugin's scope is bounded and well-described, mirroring B.1's anti-omnibus discipline.
3. **Safety review.** A program reviewer confirms the plugin does not bypass redlines, does not grant unscoped capabilities, does not handle regulator-protected data without the right path.
4. **Quality review.** A program reviewer runs the plugin's test scenarios; the skill bodies pass the SKILL.md anatomy checks.
5. **Publish.** The reviewer approves; the plugin lands in the tenant marketplace; consumers see it on next refresh.

The review is not bureaucracy — it is the artefact that lets the program promise "every plugin in the marketplace passed safety and scope checks." A plugin that bypasses governance and lands in the marketplace anyway is a plugin that breaks the program's trust contract with non-engineer consumers.

---

## What the marketplace entry's README should answer

Non-engineer consumers read a marketplace entry differently than engineers read a CLI install. The README answers, in this order:

1. **What does this plugin do?** Plain English, no jargon. A PM should understand in 30 seconds.
2. **What does it not do?** Bounded scope; the same anti-omnibus discipline from B.1.
3. **What connectors does it need?** Cowork shows connector requirements at install time; the README confirms.
4. **What does success look like?** A worked example from a real teammate. "After install, type 'summarise my last sprint' and get a Markdown summary in 30 seconds."
5. **Who owns it?** Team handle. Same governance rule as B.2.
6. **How do I report issues?** A link or a Slack channel. Without this, broken plugins go unfixed.

---

## When NOT to publish to the marketplace

Three patterns where the shared skill library is the better surface.

**Pattern 1.** The plugin is engineering-only. A `release-pipeline-toolkit` plugin has no use for a designer; surfacing it in the marketplace is noise.

**Pattern 2.** The plugin requires repo-shape context that Cowork users do not have. Cowork is folder-first, not repo-first; a plugin that assumes a git checkout fits awkwardly there.

**Pattern 3.** The workflow handles regulator-scoped data. Use the approved restricted path and review boundary; do not broaden distribution merely to gain marketplace reach.

---

## Worked sketch — publishing a release workflow to Cowork

Following on from B.2: the team has published a `release-pipeline-toolkit` skill to `razorpay/agent-skills`. Should it also go to the Cowork marketplace?

**Decision.** No. The workflow is engineering-only: it operates on git branches and CI pipelines. The shared skill library is the right surface.

Now consider a different skill: `weekly-status-summary`. It summarises a team's week from merged PRs and ticket activity. It is useful to engineers, PMs, and engineering managers.

**Decision.** Yes. Publish to the Cowork marketplace.

The marketplace entry's README:

> **What this plugin does.** Generates a weekly status summary for a named team from merged PRs and ticket activity. Outputs a one-page Markdown summary you can edit lightly and share.
>
> **What it does not do.** Post to messaging platforms by itself. Track individual contributors. Generate forward-looking plans.
>
> **Connectors needed.** PR system connector and ticketing connector (both bundled with Cowork by default).
>
> **Worked example.** Type "draft this week's status for team X" — get a Markdown summary in 30 seconds.
>
> **Owner.** Team handle.
>
> **Report issues.** Program's primary Slack channel.

The plugin goes through governance review (clean), lands in the tenant marketplace, and PMs across the program install it within a month. The leverage delta is what Black Belt is for.

---

## Common failure modes

**Skipping governance.** Pushing the plugin to the public Cowork marketplace bypasses the program's tenant review. Fix: never; tenant publishing is the path.

**No README, just install instructions.** Non-engineers cannot evaluate. Fix: the six-question README from §"What the marketplace entry's README should answer".

**Publishing engineering-only plugins to the marketplace.** Noise for non-engineers; clutter for everyone. Fix: keep the workflow in the shared skill library; reserve the marketplace for plugins that pay off across audiences.

**Same author for code and review.** Conflict of interest. Fix: a different reviewer per the program's governance rule.

**No update path.** A plugin published in v1.0 that has never been updated to v1.1 in two quarters. Fix: maintenance discipline; quarterly review; deprecate or update.

**Treating Cowork install metadata as a checkbox.** It is the contract a non-engineer reads. Fix: take the README and the install metadata seriously.

---

## GREEN / YELLOW / RED self-check

- 🟢 GREEN: I can publish a plugin to the Razorpay Cowork tenant marketplace, pass governance review, and produce an entry README a non-engineer can evaluate in 30 seconds.
- 🟡 YELLOW — I have authored shared skills but have not navigated the marketplace publishing flow.
- 🔴 RED — I do not yet know what the Cowork marketplace is or why it differs from the shared skill library.

---

## What you can say after this module

> "I publish plugins to the Razorpay Cowork tenant marketplace, pass governance review, and produce entries non-engineer teammates install with one click."

---

## Where to go next

B.4 (*The Claude Agent SDK*) covers the build-vs-install decision at the next layer up. When the shared skill library and marketplace cannot satisfy the workflow, you reach for the SDK and write your own agent.

**Previous:** [← B.2 Publishing a shared skill](B02-skill-pack-publishing.md) · **Next:** [→ B.4 The Claude Agent SDK](B04-agent-sdk.md)

**Further reading**

- [Anthropic's Cowork plugin docs](https://claude.com/) — the public reference for plugin shape
- [B.2 — Publishing a shared skill](B02-skill-pack-publishing.md)
- [Prologue 0.5 — Meet your tools](../../../prologue/05-tool-tour.md) — Cowork in the tool atlas
