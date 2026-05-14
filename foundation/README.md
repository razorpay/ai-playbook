---
title: "Part 0 — Foundation"
slug: "foundation"
section: "foundation"
status: "drafted"
type: "readme"
track: null
order: 0
time_minutes: 5
audience: "everyone"
outcome: "Know whether to start with Tech 101, Ops 101, or skip straight to the Prologue."
prev: null
next: "tech-101"
pillar: null
belt: null
tags: ["orientation"]
updated: "2026-04-27"
---

# Part 0 — Foundation

> **You are here.** This is the section we wrote for two readers: the Razorpayan who picked up this playbook and isn't sure what a backend is, and the outside reader who wants the complete handbook for the way of working we're developing. Both of you should stay. The rest of the playbook will be sharper for it.

---

## Who this part is for

Read Part 0 if any of these apply:

- You've never opened Terminal and aren't sure what software actually *is* under the hood.
- You can use Claude.ai or Cowork comfortably, but the moment someone says "frontend" or "deploy" you tune out.
- You're a PM or designer drowning in routine ops overhead (Slack triage, ticket grooming, weekly summaries, meeting notes) and want to claw four hours back per week without writing code.
- You're an outside reader who picked this up and wants the universal version of the way of working before the Razorpay-specific belts.

You can **skip Part 0** if you already know what an API, a database, and a deploy are. If you don't recognise two of those three, stay.

---

## The two tracks

Part 0 has two parallel tracks. Read them in order if you're a complete newcomer; pick the one that fits your role if you have some background.

### Track 0A — Tech 101: What is this world I'm in?

The minimum viable picture of how software actually works. By the end you can read a tech blog post, a product spec, or a Slack thread between engineers without losing the plot. No coding required. No tools to install.

Ten short chapters, ~90 minutes total:

- 0A.1 — What is software, really?
- 0A.2 — Frontend vs backend (and why most product friction lives in between)
- 0A.3 — What is a server? What is a client? What is HTTP?
- 0A.4 — Databases: the world's most important spreadsheet
- 0A.5 — What is an API? What is a UI?
- 0A.6 — Code is text: repos, files, the source of truth
- 0A.7 — Git, conceptually: save points for files
- 0A.8 — Build, deploy, staging, production: the journey of a change
- 0A.9 — Tests: what they are, why they exist
- 0A.10 — The shape of a software org: engineers, designers, PMs, ops, SRE

**Files:** `foundation/tech-101/01-what-is-software.md` … `foundation/tech-101/10-shape-of-a-software-org.md` plus a `README.md` index.

### Track 0B — Ops 101: Save 4+ hours a week without writing code

The non-coding AI track. By the end you've automated at least one ops workflow you do weekly, and you've internalised the habit of asking *"could a configured agent have done this?"* before doing anything routine again.

Eight chapters plus quests + a real boss fight:

- 0B.1 — Why this track exists: the ops tax that AI eats
- 0B.2 — The non-coding AI surface: Claude.ai, Cowork, Slash, plus connectors
- 0B.3 — Triage automations: your inbox, Slack, the on-call queue
- 0B.4 — Generation automations: standups, meeting notes, weekly summaries
- 0B.5 — Ticket automations: drafting, routing, status digesting
- 0B.6 — Document workflows: researching, drafting, reviewing, exporting
- 0B.7 — Lightweight agents: when "automate this for me" earns its keep
- 0B.8 — Building your own minimum viable wiki for any project (preview of §0.7)

**Quests:** Quest 0B-1 (the 30-minute teardown) and Quest 0B-2 (the agent diary).
**Boss fight:** automate one workflow that saves you 4+ hours/week, run it for two weeks, contribute the recipe back to the library.

**Files:** `foundation/ops-101/01-why-this-track.md` … `foundation/ops-101/08-minimum-viable-wiki.md` plus quests, boss-fight, and a `recipes/` subfolder where boss-fight contributions land.

---

## Why Part 0 exists at all

Three reasons.

The first is **inclusion at the top of the funnel**. If a designer reads the Prologue and the first sentence assumes she knows what a server is, we lost her in the first thirty seconds. Part 0 means the same playbook works for the absolute newcomer and the staff engineer.

The second is **outside marketability**. The way of working developed inside this program — belts, quests, knowledge-base-driven development, version-locked tooling, GREEN/YELLOW/RED triage — is genuinely transferable. Other companies are wrestling with the same shift. Tech 101 + Ops 101 + the Prologue, packaged on their own, are a complete handbook anyone outside Razorpay could pick up. That's an unlock for the program's reputation, and it costs us almost nothing to write.

The third is **the ops-tax wedge**. A PM who has never touched a repo can save four hours a week with the right Claude+connector setup, today, before learning anything else. Track 0B exists because that PM should not have to wait for White Belt to start banking time. The earned hours fund the curiosity to climb further. *"I just got my mornings back"* is a more durable hook than *"AI is the future."*

---

## How to read Part 0

- **If you're a complete newcomer:** read Track 0A first, in order. Then read the Prologue. Then come back to Track 0B if you're in a non-coding role; otherwise go straight to White Belt.
- **If you're a PM or designer with some technical exposure:** skim Track 0A for any chapter where the title doesn't already feel obvious. Spend most of your time in Track 0B — that's where the leverage is for you.
- **If you're an engineer:** Track 0A is review for you, but it's worth a 20-minute skim because the *vocabulary* is what your non-engineer teammates will pick up. Knowing how it's framed for them helps you onboard them faster. Track 0B is a useful surprise: most engineers underestimate how much overhead AI agents can absorb on the ops side.
- **If you're a manager or team lead:** read Track 0B fully. The boss fight gives you a clean way to evaluate whether your team is actually using AI for the boring stuff yet, before they touch any repo.

---

## Files

- `README.md` (this file)
- `tech-101/`
  - `README.md`
  - `01-what-is-software.md` … `10-shape-of-a-software-org.md`
- `ops-101/`
  - `README.md`
  - `01-why-this-track.md` … `08-minimum-viable-wiki.md`
  - `quest-0B1.md`, `quest-0B2.md`, `boss-fight-0B.md`
  - `recipes/` — community-contributed automation recipes (seed pending)

---

**Next:** [→ Tech 101 README](tech-101/README.md) · [→ Ops 101 README](ops-101/README.md)
