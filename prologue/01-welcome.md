---
title: "Welcome, and why this playbook exists"
slug: "prologue/welcome"
section: "prologue"
status: "drafted"
type: "chapter"
track: null
order: 1
time_minutes: 5
audience: "everyone"
outcome: "Understand the program promise and what shipped code means here."
prev: "prologue"
next: "prologue/origin-story"
pillar: null
belt: null
tags: ["orientation"]
updated: "2026-06-16"
---

# 0.1 — Welcome, and why this playbook exists

> **⏱ 5 minutes · 👥 Everyone · 🎯 Leaves with:** a clear sense of why this document is in front of you, and what "shipped code" actually means here.

---

## If you're short on time

Read just these three lines:

1. AI has changed what "building a product" means at Razorpay. Designers, PMs, ops folk, and TPMs can now ship code themselves — in weeks, not semesters.
2. This playbook is the road from *"I have never opened Terminal"* to *"my team ships faster because of how I use AI."* The path is divided into four belts, each earned by actually shipping something small.
3. The program is already working. A designer with no prior shipping experience can now go from idea to a merged pull request inside two weeks. A room full of non-engineers, given the right preparation, can push dozens of commits over a single two-day event. You are not the first. You are the next.

If that landed, skip ahead to [§0.2 — The origin story](02-bd1-bd2-origin.md). Otherwise, read on.

---

## The problem this playbook solves

Until quite recently, if you weren't a front-end engineer and you wanted a button moved on the dashboard, you filed a ticket, waited for someone's sprint to have room, and accepted a week-long round-trip. Frontend capacity was the bottleneck for the entire product organisation. Designers drew, PMs spec'd, and then everyone waited.

AI coding tools — specifically Claude Code, paired with Razorpay's design system (Blade), a Figma connector, and a steadily growing library of internal skills — collapse that round-trip. A designer can describe a change in plain English, watch Claude make the edit in the actual repo, preview it live, and open a pull request. What used to take a week takes an afternoon. What used to require an engineer requires a designer with curiosity and this playbook.

The problem we are solving is not *"PMs and designers want to feel technical."* The problem is that Razorpay has more good product ideas than frontend capacity to build them, and AI now lets the people closest to the customer (designers, PMs, ops, TPMs) turn their own judgement into shipped code. This playbook is the instruction manual for that shift.

---

## Who this playbook is for

Four audiences, one document. Read the row that fits you today.

| You are…                                              | This playbook gives you                                                         |
|-------------------------------------------------------|---------------------------------------------------------------------------------|
| **A designer or PM who has never opened Terminal**    | White Belt. The path from zero to your first merged PR, step by step.           |
| **A designer or PM who's used Claude Code once or twice** | Yellow Belt. Daily habit, first real features, your first org-repo PR.      |
| **An engineer who wants to level up AI usage**        | Green + Black Belts. Three Pillars, skills, subagents, worktrees, plugin authoring. |
| **A manager or team lead**                            | [§0.9 — How to lead](09-how-to-lead.md) and [Appendix L — Certification](../appendices/L-certification/README.md). |

There is no audience this playbook locks out. A staff engineer and a first-year designer can both earn Yellow Belt from the same modules — the boss fight just looks different depending on who you are.

---

## What "shipped code" means here

When this playbook says "you've shipped code," it means something precise: you have opened a pull request (using the tools and conventions described in White and Yellow Belt) that has either been merged or is under review by a named teammate. Not a sandbox commit. Not a personal project. A real PR in a real Razorpay org repo.

That definition matters because it is also the definition of **Yellow Belt**: one pull request raised in a Razorpay org repo, merged or under review, using the harness and skills this playbook teaches. You earn the belt by shipping. You don't earn it by reading.

---

## Why belts, and why quests

A ladder of levels ("Level 1, Level 2…") is easy to write and easy to game. A belt system is different. Belts tell a story of *earned competence*, they map onto a martial-arts metaphor most people already understand intuitively, and (critically) they gate progression on a **quest** (a small hands-on exercise) and a **boss fight** (a real-world capstone).

You don't self-report Yellow Belt. You open a pull request, someone looks at it, and your belt updates. That's it. The lineage here is Ramp's L0–L3 proficiency framework (the industry gold standard), reimagined in a voice that doesn't feel like corporate L&D and reshaped around what we can actually verify: merged PRs, skill-invocation traces, teammate sign-off.

If you find yourself reading a module and thinking *"this is too much,"* that's a signal. Every belt has a "what you can say after this belt" line near the bottom. Read that line first. If it's not the thing you're trying to be able to say, you're in the wrong belt. Go back one level.

---

## What this playbook is *not*

- **Not a tool manual.** Anthropic publishes excellent Claude Code documentation. We link to it liberally. We don't duplicate it. ([code.claude.com/docs](https://code.claude.com/docs/en/best-practices))
- **Not a security policy.** Razorpay's security team owns the actual redlines. We translate them into reflexes you can internalise — the "never put this in a prompt" card (§0.10 and Appendix H) — but the policy itself lives with security.
- **Not static.** Every chapter will change as Claude Code changes, as our skills library grows, as the devstack improves. See [§0.12 What's shipping this week](12-whats-shipping.md). The [**Staff+ Council**](../belts/05-council/README.md) meets on a published cadence and revises the charter annually.
- **Not optional if you're in a structured cohort.** If you're enrolled in the Ship-to-Learn track, the playbook is your spine. If you're an occasional tinkerer, read what you need and leave the rest.

---

## The promise, in one sentence

**By the time you've earned Black Belt, you will have shipped code that matters, written skills that other PODs install, and quite possibly contributed a Blade component that lives in every Razorpay surface.** You will not be "someone who uses AI." You will be a force multiplier for the organisation — and the tracker row with your name on it will say so.

That's the destination. The Prologue is the first step. Keep going.

---

## Why this belongs to you

The playbook is owned, for now, by the small group that has been running the program — but the authorship is designed to spread. Every belt has a contribution flow. When you hit a known issue that isn't in Appendix D, you'll add it. When you write a skill your team uses three times a week, it'll join Appendix C. The playbook gets sharper with every builder who reads it — by design.

We're borrowing this idea from the way good design systems are supposed to work: *the system improves faster than any central team can manage, because everyone using it has permission to improve it.* If this playbook stays a museum piece curated by a single team, it has failed. If it becomes a living document touched by every reader, it has succeeded.

---

## Ready?

Pick one:

- Keep reading the Prologue → [§0.2 The origin story](02-bd1-bd2-origin.md)
- Jump to self-assessment → [§0.10 Which belt should you start at?](10-self-assessment.md)
- Jump to safety → [§0.11 The safety brief](11-safety-brief.md)

If you want to say hello to the program itself, post in [`#ai-help`](https://razorpay.slack.com/archives/C08C35GKJKD) with *"just started the playbook — any tips for a first-time reader?"* You'll get answers within the hour.

---

**Previous:** [← Prologue README](README.md) · **Next:** [→ 0.2 The origin story](02-bd1-bd2-origin.md)

**Further reading**
- [Lenny's Newsletter — 25 proven AI-adoption tactics](https://www.lennysnewsletter.com/p/25-proven-tactics-to-accelerate-ai) — the pattern behind why we use champions and visible wins
- [Claude Code best-practices docs](https://code.claude.com/docs/en/best-practices)
- [Simon Willison — designing agentic loops](https://simonwillison.net/2025/Oct/15/designing-agentic-loops/)
