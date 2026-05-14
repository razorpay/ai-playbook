---
title: "Black Belt — Part C: Shape the Org"
slug: "belts/black/c-org"
section: "belts"
status: "drafted"
type: "readme"
track: "black"
order: 0
time_minutes: 8
audience: "platform-builder"
outcome: "Understand the Part C arc — the cultural and governance moves that turn an individual platform-builder into a force multiplier for the whole org — and know how to walk it."
prev: "belts/black/quest-contribution-or-full-stack"
next: "belts/black/running-office-hours"
pillar: null
belt: "black"
tags: ["black-belt", "readme", "org", "culture", "governance"]
updated: "2026-05-07"
---

# ⚫ Black Belt — Part C: Shape the Org

> **Promise.** By the end of Part C you can run office hours that surface POD-set blockers, embed for a week and ship *with* a team rather than for it, write an AI RFC that earns a merge, contribute to API Council reviews on AI-specific submissions, and govern plugin and skill lifecycles cleanly. The capstone (Boss Fight B-B) exercises Parts A, B, and C in concert.
>
> **Prerequisite.** Parts A and B complete. Quest B-1 claimed. Quest B-2 claimed.
> **Time budget.** ~3 hours of reading across the five modules; the boss fight is one elapsed month.
> **Pillar shape.** Two cultural modules (B.12–B.13), three governance modules (B.14–B.16). Part C is the *organisational* layer, not a deeper craft layer; the craft is now in your tools — what changes is *how the work moves through the org*.

---

## What you've already done

You walked Part A (*Build the Platform*) and authored an MCP server, a skill pack, a plugin marketplace entry, a custom agent, and learnt multi-agent orchestration and tool design. You walked Part B (*Push the Craft*) and now keep skills small with progressive disclosure, design memory systems, run prompt evals, instrument cost and observability at team and org scale, and tune effort settings + model routing + fall-backs. You shipped Quests B-1 and B-2: a published plugin adopted by two PODs outside your team, and a Blade contribution or full-stack feature you owned end-to-end.

Part C does not add more building. It adds the **moves you make around the building** so that the leverage you create propagates without your hand on every keyboard.

---

## The Part C arc

### B.12 — Running office hours · Culture · ~30 min

The cheapest way to surface in-flight blockers across a POD set without creating yet-another-ritual. The Whoop / Ramp pattern, adapted for Razorpay's program. A weekly slot, public queue, redacted decision log so the same answers do not get re-litigated.

> [Open B.12 →](B12-running-office-hours.md)

### B.13 — Embedded sprints · Culture · ~30 min

The "embed for a week" pattern from staff-engineer literature. Time-boxed (one week). Deliverable shared (you ship *with* the team, not for them). Written debrief (so the next embed inherits the lessons).

> [Open B.13 →](B13-embedded-sprints.md)

### B.14 — Writing an AI RFC · Governance · ~45 min

A written proposal for a change to the program's AI surface: a new connector, a new policy, a new shared skill pack. Problem statement, options considered, recommendation, cost-and-risk, rollout plan, success metric, rollback plan. The bar: an RFC merges when reviewers can name what would change and how to measure whether it worked.

> [Open B.14 →](B14-writing-an-ai-rfc.md)

### B.15 — API Council contributions for AI · Governance · ~30 min

The API Council exists at Razorpay; this module is the AI-specific lens on it. MCP server interfaces, agent tool schemas, public-facing AI surfaces — all subject to API design discipline. The schemas matter *more* when the consumer is an LLM, not less.

> [Open B.15 →](B15-api-council-contributions.md)

### B.16 — Plugin + skill governance · Governance · ~45 min

Three governance moves: approval (for new plugin marketplace entries), deprecation (for plugins no team owns anymore), security review (for plugins handling sensitive data). The lifecycle: published → adopted → deprecated → removed. Each transition has a named owner and a written trigger.

> [Open B.16 →](B16-plugin-and-skill-governance.md)

---

## The capstone — Boss Fight B-B

After the modules, the boss fight. Embed with a POD outside your own for one month. Pick a shared metric *with the POD lead* before the embed begins. Intervene through the full Black Belt toolkit: skill packs, MCPs, custom agents, training, office hours, embedded sprints. Measure the lift. Write a one-pager case study. Present in an all-hands or the program's main forum.

> [Open Boss Fight B-B →](boss-fight-BB-pod-ai-uplift.md)

After the boss fight ships, you claim the **Black Belt badge**.

> [Open the badge →](badge.md)

---

## Reading order

1. This README.
2. B.12 (Running office hours) — the voice anchor for Part C.
3. B.13 (Embedded sprints).
4. B.14 (Writing an AI RFC).
5. B.15 (API Council contributions).
6. B.16 (Plugin + skill governance).
7. Boss Fight B-B.
8. Black Belt badge.

A typical reader spreads Part C over one to two weeks of evening or morning reading, then runs the boss fight across a calendar month with active hours of two to four per week.

---

## What this Part is not

**Not a management track.** Part C is platform-builder work that happens to look like organisational moves. You are not becoming a people-manager; you are learning the moves that make your platform work spread.

**Not a substitute for Council membership.** Part C teaches the moves a Black Belt makes around their building. The [Staff+ Council](../../05-council/README.md) is the standing community where those moves shape the program's direction over years.

**Not a replacement for direct line management.** The cultural patterns in B.12 and B.13 work *in addition to* a healthy reporting structure, not in place of it. If your manager owns a 1:1 with a POD lead, your office hours do not replace that.

**Not optional.** A Black Belt who can build leverage but not propagate it stops at "very strong individual contributor." Part C is what makes Black Belt mean *force multiplier*, which is the promise the badge carries.

---

## What you can say after Part C

> "I run office hours that surface blockers across a POD set; I embed with teams outside my own and ship *with* them; I write AI RFCs that earn a merge; I contribute to API Council reviews on AI-specific submissions; I govern plugin and skill lifecycles. The leverage I build propagates without my hand on every keyboard."

That sentence, plus a claimed Boss Fight B-B, plus the Black Belt badge, is the platform-builder loop closed. The next horizon is the [Staff+ Council](../../05-council/README.md), where Council membership, RFC sponsorship, mentoring Black Belt candidates, and external artefacts come into reach. Part C is what makes that horizon legible.

---

**Previous:** [← Quest B-2](../b-craft/quest-B2-contribution-or-full-stack.md) · **Next:** [→ B.12 Running office hours](B12-running-office-hours.md)

**Further reading**

- [Black Belt — Part A: Build the Platform](../a-platform/README.md) — the platform-builder craft.
- [Black Belt — Part B: Push the Craft](../b-craft/README.md) — the prompt and eval craft.
- [Appendix L — Certification](../../../appendices/L-certification/README.md) — the reviewer rules for Boss Fight B-B and the badge claim.
