---
title: "Ops 101: Save 4+ hours a week without writing code"
slug: "ops-101"
section: "foundation"
status: "drafted"
type: "readme"
track: "ops-101"
order: 0
time_minutes: 3
audience: "pm-designer-ops"
outcome: "Understand the Ops 101 promise and the route through chapters, quests, and boss fight."
prev: "foundation"
next: "ops-101/why-this-track"
pillar: null
belt: null
tags: ["ops-101"]
updated: "2026-04-27"
---

# Track 0B — Ops 101 (heavy track)

> **Promise.** By the end of Track 0B you have automated at least one ops workflow you do every week, you have a recipe to share so a teammate can fork it, and you've banked four-plus hours a week. You will not have written a single line of code.

---

## Who this is for

PMs, designers, ops folk, TPMs, EAs, business leads — anyone whose calendar is half meetings and half routine work that an agent could plausibly absorb. You don't need to know what a backend is to earn this track. You don't need to know what a deploy is. You don't even strictly need Tech 101, although it'll make Track 0B easier to read.

You **will** need:
- Access to Claude.ai or Cowork (or both).
- The connectors your team actually uses: Slack, Google Workspace, the ticketing tool, calendar.
- Permission to install or configure those connectors. (If you don't have it, the first quest is "ask for it.")
- One ops workflow you do at least weekly that takes 30+ minutes. (Everyone has one. Two is more common.)

## Why this is a heavy track, not a light one

There's a version of this track that's a 4-chapter primer: "here are five automations, copy-paste these recipes, good luck." That version doesn't stick. The patterns become "things I tried once and forgot." When the recipe stops working because Claude updated, or your team workflow shifted, you're back to manual.

The heavy version teaches you the *muscle*: how to spot which routine work is automatable, how to compose Claude with connectors, how to test that an automation is reliable before you depend on it, and how to write the recipe so a teammate can run it on their data. The boss fight is two-week measurement, not a one-shot "I made an agent" trophy. That's why this is heavy. It's also why it earns belt credit — completing Ops 101 is enough on its own to put you on the certification tracker, even if you never touch a repo.

You can think of Ops 101 as a parallel non-coding belt path. White Belt for non-coders. The ladder still works.

## The chapters

| §     | Chapter                                                        | Time   |
|-------|----------------------------------------------------------------|--------|
| 0B.1  | [Why this track exists — the ops tax that AI eats](01-why-this-track.md) | 5 min  |
| 0B.2  | [The non-coding AI surface — Claude.ai, Cowork, Slash, plus connectors](02-non-coding-ai-surface.md) | 15 min |
| 0B.3  | [Triage automations — your inbox, Slack, the on-call queue](03-triage-automations.md) | 25 min |
| 0B.4  | [Generation automations — standups, meeting notes, weekly summaries](04-generation-automations.md) | 25 min |
| 0B.5  | [Ticket automations — drafting, routing, status digesting](05-ticket-automations.md) | 25 min |
| 0B.6  | [Document workflows — researching, drafting, reviewing, exporting](06-document-workflows.md) | 30 min |
| 0B.7  | [Lightweight agents — when "automate this for me" earns its keep](07-lightweight-agents.md) | 25 min |
| 0B.8  | [Building your own minimum viable wiki for any project](08-minimum-viable-wiki.md) | 20 min |

**Total reading time:** ~3 hours if you read straight through. Spread over 2–3 weeks while doing the quests is more typical.

## Quests and boss fight

| § | Work | What it proves |
|---|---|---|
| Quest 0B-1 | [The 30-minute teardown](quest-0B1.md) | You can replace one recurring 30-minute task with an AI-assisted workflow and measure the result. |
| Quest 0B-2 | [The agent diary](quest-0B2.md) | You can spot repeated ops work before deciding what deserves an agent. |
| Boss Fight 0B | [Automate one workflow that saves 4+ hours/week](boss-fight-0B.md) | You can run one safe workflow for two weeks, prove the time saved, and document the recipe. |

## What you can say after Ops 101

> "I've earned my mornings back. I know which of my routine work can be automated, and I've shipped a recipe my team can use."

## How this track relates to the rest of the playbook

- **It's a complete on-ramp** for non-coding readers. You can stop here. The work earned here is real, measurable, and counts on the certification tracker.
- **It's a preview** of the operating philosophy. The "minimum viable wiki" chapter (0B.8) is your first taste of [§0.7](../../prologue/07-operating-principles.md) — knowledge-base-driven development.
- **It's the muscle for higher belts.** Yellow Belt's "find a bug in your area" boss fight uses the same composition skills you build here — Claude + Slack + a ticket system, except now the output is a PR instead of a digest.
- **Recipes compound.** Every Ops 101 boss fight contributes a recipe. Every new reader has more to fork. The library is itself a knowledge base, maintained by the people who use it.

## Files

- `README.md` (this file)
- `01-why-this-track.md` … `08-minimum-viable-wiki.md`
- `quest-0B1.md`, `quest-0B2.md`, `boss-fight-0B.md`
- `recipes/` — community-contributed automation recipes (seed pending). Categorised by ops surface (Slack triage, doc generation, ticket workflows, calendar/inbox, weekly digests).

---

**Next:** [→ 0B.1 Why this track exists](01-why-this-track.md)

**Further reading**
- [Lenny's Newsletter — 25 proven AI-adoption tactics](https://www.lennysnewsletter.com/p/25-proven-tactics-to-accelerate-ai) — the cohort-based and time-saved arguments that led us to make this track heavy
- [Anthropic's introduction to Cowork](https://www.anthropic.com/) — the desktop tool that fits this track best
- Appendix I (Templates [coming]) recipe template for boss-fight contributions
