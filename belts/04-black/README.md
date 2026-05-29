---
title: "Black Belt"
slug: "belts/black"
section: "belts"
status: "drafted"
type: "readme"
track: "black"
order: 0
time_minutes: 15
audience: "platform-builder"
outcome: "Understand the Black Belt arc, walk Parts A, B, and C, claim Quests B-1 and B-2, ship Boss Fight B-B, and earn the badge."
prev: "belts/green/badge"
next: "belts/black/a-platform"
pillar: null
belt: "black"
tags: ["black-belt", "readme", "platform"]
updated: "2026-05-07"
---

# ⚫ Black Belt — AI-Native Builder

> **Promise.** You build the leverage others run on. You author skills and plugins that propagate across PODs. You coach. You shape Razorpay's AI posture with RFCs, API reviews, and strategy input.
>
> **Prerequisite.** 🟢 Green Belt + nomination by a manager or a Green Belt teammate.
> **Time budget.** 15–25 hours of playbook, plus the boss fight (one-month POD embed).
> **Ramp L-level.** L3 (delegating workflows to agents; building with AI).

---

## Status: fully drafted

Black Belt is a three-part belt. **All three parts are drafted.** A nominated builder can read the belt end-to-end, claim Quests B-1 and B-2, ship Boss Fight B-B, and claim the badge.

The next horizon for builders who have closed the belt is the [**Staff+ Council**](../05-council/README.md), the standing community of senior contributors who shape the program's AI direction over multi-year horizons. Council membership is invitation-only.

---

## Nomination

Black Belt entry requires nomination by a manager or a Green Belt teammate. Nomination is registered with the cohort lead. Reading the chapters without nomination is fine — the chapters are open. Tracker certification, however, requires the nomination to be recorded before any of the quests are claimed.

---

## What you can say after Black Belt

> "I am a force multiplier for Razorpay."

---

## The full belt arc

### Part A — Build the Platform

| §    | Chapter | Pillar | Time |
|------|---------|--------|------|
| B.1  | [Authoring an internal MCP server — architecture, auth, packaging](a-platform/B01-internal-mcp-server.md) | Harness | 60 min |
| B.2  | [Publishing a skill pack — naming, versioning, governance](a-platform/B02-skill-pack-publishing.md) | Context | 30 min |
| B.3  | [Building a plugin marketplace entry for Razorpay Cowork](a-platform/B03-cowork-plugin-marketplace.md) | Harness | 45 min |
| B.4  | [The Claude Agent SDK — when to write your own agent](a-platform/B04-agent-sdk.md) | Harness | 45 min |
| B.5  | [Multi-agent orchestration — patterns that work, patterns that don't](a-platform/B05-multi-agent-orchestration.md) | Harness | 45 min |
| B.6  | [Tool design — JSON schemas, output shapes, error contracts](a-platform/B06-tool-design.md) | Harness | 30 min |

### Part B — Push the Craft

| §    | Chapter | Pillar | Time |
|------|---------|--------|------|
| B.7  | [Progressive disclosure — skills that stay small](b-craft/B07-progressive-disclosure.md) | Context | 25 min |
| B.8  | [Memory systems — auto-memory, session state, long-running agents](b-craft/B08-memory-systems.md) | Context | 45 min |
| B.9  | [Prompt evals — A/B, regression, golden sets](b-craft/B09-prompt-evals.md) | Prompt | 45 min |
| B.10 | [Cost attribution + observability at team + org scale](b-craft/B10-cost-and-observability.md) | Harness | 30 min |
| B.11 | [Effort settings, model routing, fall-backs](b-craft/B11-effort-and-routing.md) | Harness | 30 min |

### Part C — Shape the Org

| §    | Chapter | Pillar | Time |
|------|---------|--------|------|
| B.12 | [Running office hours — the Whoop / Ramp pattern](c-org/B12-running-office-hours.md) | Culture | 30 min |
| B.13 | [Embedded sprints — the CTO-with-a-team week](c-org/B13-embedded-sprints.md) | Culture | 30 min |
| B.14 | [Writing an AI RFC — what good looks like at Razorpay](c-org/B14-writing-an-ai-rfc.md) | Governance | 45 min |
| B.15 | [Contributing to the API Council (AI-specific reviews)](c-org/B15-api-council-contributions.md) | Governance | 30 min |
| B.16 | [Plugin + skill governance — approval, deprecation, security review](c-org/B16-plugin-and-skill-governance.md) | Governance | 45 min |

---

## Quests and boss fight

### Quest B-1 — Publish an internal plugin

[Quest B-1](a-platform/quest-B1-publish-an-internal-plugin.md). Publish a skill pack (and optionally an MCP integration) so another POD can install it with one command. At least two installs from PODs outside your team within a month.

### Quest B-2 — Component contribution or full-stack feature

[Quest B-2](b-craft/quest-B2-contribution-or-full-stack.md). Either submit a Blade component via the contribution pipeline, or ship a feature involving a backend change you own end-to-end.

### Boss Fight B-B — Own a POD's AI uplift for a month

[Boss Fight B-B](c-org/boss-fight-BB-pod-ai-uplift.md). Embed with a POD outside your own for one month. Pick a shared metric *with the POD lead* before the embed begins. Intervene through the full Black Belt toolkit. Measure the lift. Write a one-pager case study. Present in an all-hands or the program's main forum.

---

## Evidence chain

Awarding Black Belt requires evidence per [Appendix L](../../appendices/L-certification/README.md):

- Green Belt awarded date (referenced, not duplicated);
- nomination record (manager or Green Belt teammate);
- Quest B-1 — published plugin URL plus install confirmations from two PODs outside the immediate team;
- Quest B-2 — merged contribution or full-stack PR;
- Boss Fight B-B: signed-off metric lift, intervention documentation, all-hands share, contributed case study;
- a one-paragraph "what I built that other teams now run on" reflection from the builder.

The [Black Belt badge](c-org/badge.md) closes the belt and mirrors the White, Yellow, and Green templates. Two reviewers (one out-of-team, one Black-Belt-or-above) sign the claim.

---

## What to do next

- **If you have just earned Green Belt and been nominated:** open [Part A README](a-platform/README.md) and start with B.1.
- **If you have walked Parts A and B and claimed both quests:** open [Part C README](c-org/README.md) and start with B.12.
- **If you have shipped Boss Fight B-B and want to claim the belt:** open [the badge](c-org/badge.md) and follow the claim ceremony.
- **If you are a cohort lead:** the Black Belt reviewer protocol is stricter than Green's — at least one out-of-team reviewer per piece of evidence, and the boss fight specifically requires a Black-Belt-or-above reviewer in addition. Direct managers cannot certify their own reports. See [Appendix L](../../appendices/L-certification/README.md).
- **If you have closed the belt:** open the [Staff+ Council section](../05-council/README.md). The chapters describe what the Council is, how it operates, and the moves a closed-belt builder can already make: sponsoring an RFC, reviewing a peer's Boss Fight, mentoring a Black Belt candidate.

---

**Files:** `belts/04-black/` — organised into subfolders `a-platform/`, `b-craft/`, and `c-org/`, all drafted. Both quests claimable; Boss Fight B-B and the badge close the belt.

**Previous:** [← Green Belt badge](../03-green/c-guardrails/badge.md) · **Next:** [→ Part A README](a-platform/README.md)
