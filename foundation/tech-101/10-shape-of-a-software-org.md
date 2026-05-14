---
title: "The shape of a software org"
slug: "tech-101/shape-of-a-software-org"
section: "foundation"
status: "drafted"
type: "chapter"
track: "tech-101"
order: 10
time_minutes: 10
audience: "anyone-curious"
outcome: "Understand the roles around software work and how they collaborate."
prev: "tech-101/tests"
next: null
pillar: null
belt: null
tags: ["software-basics", "roles"]
updated: "2026-04-26"
---

# 0A.10 — The shape of a software org (engineers, designers, PMs, ops, SRE)

> **⏱ 10 minutes · 👥 Anyone curious · 🎯 Leaves with:** the cast of roles that make modern software get built, what each one is responsible for, and where the tension between them tends to live.

---

## Why this chapter closes Tech 101

You've now got the technical vocabulary: software, frontend, backend, server, database, API, code, repo, git, build, deploy, tests. What's left is the *people* layer. Who works on which part. Who decides what. Who's accountable when something breaks.

Software org charts vary wildly between companies, but the *roles* are remarkably consistent. Once you can name the cast and the relationships, every product conversation becomes legible — *"I think this is more of a platform-team question"*, *"that's an SRE call"*, *"design and product disagree on this one"* — and you can place yourself in the conversation rather than nodding along.

This chapter is shorter than the technical ones. It's also the one most readers will quote back later when teaching a teammate. *"Read 0A.10. It tells you who does what."*

---

## The core six

Most software product teams have, somewhere, all of the following roles. Sometimes one person plays two; sometimes a role is held by a whole team. The roles are stable.

### Engineer

Writes the code. Reviews other engineers' code. Owns the technical correctness of what gets built. The most numerous role at most software companies, often by a wide margin.

Engineers come in flavours: **frontend engineers** (the dining-room people from chapter 0A.2), **backend engineers** (the kitchen people), **mobile engineers** (specialised in iOS / Android), **full-stack engineers** (comfortable on both sides of the seam — and the role this playbook is mostly oriented toward producing).

The engineer's instinct is *correctness first*. They want the code to do what it claims, robustly, and to keep doing it as the system changes. Their stress is bugs in production; their joy is a clean change that survives a year of evolution without rotting.

Most product friction with engineers is *scope* — what's in the change and what's not. A change that touches eight things is harder than a change that touches one thing, even if both feel "small" in PM-speak.

### Designer

Owns how the product *feels*. Not just how it looks: how it works, how it flows, how it reads, how a user moves through it without confusion or dread. Designers come in two main flavours: **product designers** (responsible for whole flows and end-to-end UX) and **visual / brand designers** (focused more on aesthetics, typography, illustration, marketing surfaces). On most product teams, "designer" without a qualifier means a product designer.

The designer's instinct is *user comprehension first*. They want the user to understand, succeed, and not feel stupid. Their stress is shipping a feature users don't understand; their joy is the support ticket that *doesn't* arrive because the design was clear.

Most product friction with designers is *fidelity-vs-velocity* — when a design isn't quite ready to engineering's eye but the team is under deadline pressure. The instinct gap between designers (more iteration is better) and engineers (more iteration is more risk) is real and managed in every healthy team.

### Product manager (PM)

Owns *what* gets built and *why*. The PM holds the customer view, the business view, and the trade-off view, and turns them into decisions about what the team works on. PMs come in flavours that vary wildly between companies — some are deeply technical, some are deeply customer-facing, some are deeply analytical — but the role's core is the same: *be accountable for whether the right thing is being built*.

The PM's instinct is *outcome first*. They want the team's effort to translate into something that helps users and the business. Their stress is shipping features nobody uses; their joy is the metric that moved.

Most product friction with PMs is *prioritisation* — what's the most important thing to do *right now*, and why this rather than that. Engineers and designers feel this most acutely when the answer changes mid-quarter; the PM is often the one carrying the cost of changing it.

### Ops / operations

The role most people forget when sketching a software org. Ops people do the *invisible work that keeps things running*: onboarding new customers, handling escalations, maintaining internal tools, managing vendor relationships, running back-office processes that touch real money or real customers.

Ops varies even more between companies than the other roles: at a fintech, ops is large and consequential (KYC, reconciliation, disputes, refunds, vendor coordination); at a small SaaS startup, ops might be one person juggling everything. What's consistent is that *ops is the role most likely to surface bugs nobody else sees*, because ops is the role most directly in contact with customers when systems misbehave.

The ops instinct is *systemic over heroic*. They want processes that don't depend on any one person remembering. Their stress is repeated manual work; their joy is automation that takes a recurring pain off the team forever. Ops 101 (the parallel track in this Foundation) is for these people.

### Site reliability engineering (SRE) / devops

The team that owns *whether the system stays up*. SREs handle on-call rotations, incident response, capacity planning, deployment infrastructure, monitoring, and the parts of the stack underneath the application layer. *"Devops"* is a related term that emphasises the cultural integration of dev and ops; in practice the two terms overlap heavily and many companies use them interchangeably.

The SRE instinct is *tail-risk first*. They worry about the rare event that takes the whole system down at 3am Saturday. Their stress is the postmortem; their joy is the system that handled a 10x traffic spike without anyone noticing.

Most friction with SRE is *velocity-vs-stability* — features that ship fast can introduce instability; SREs push back on changes they think will make 3am incidents more likely. They're usually right; teams that ignore SRE pushback usually get the postmortem they were warned about.

### QA / test engineering

Owns *whether the change actually works*. QA engineers are the layer between development and production that's specifically incentivised to *find what's broken before customers do*. Some companies have dedicated QA teams; others fold the role into engineering directly (each engineer tests their own work, with peer review as the safety net).

The QA instinct is *adversarial-on-purpose*. They try to break the thing. They ask *"what if the user does this weird sequence?"* They poke at the edges. Their stress is shipping a bug; their joy is finding a bug nobody else spotted.

The QA role has shrunk at many companies as automated testing (chapter 0A.9) absorbs more of the work, but the *function* (somebody whose job it is to be sceptical of new changes) remains essential.

---

## A few specialist roles you'll meet

Beyond the core six, depending on the size of the org, you'll encounter:

**Engineering manager (EM).** Manages a team of engineers. Half technical leadership, half people management. Holds the team's roadmap, growth plans, and morale. The PM and EM are usually peers and split *what* (PM) and *who/how* (EM).

**Tech lead.** Most-senior engineer on a team, plays a leadership role on technical decisions but isn't usually a manager. Bridges between engineering and product/design when architectural calls have to be made. Often the role engineers grow into before becoming an EM.

**Data analyst / analytics engineer.** Owns *what the numbers say*. Pulls reports, writes queries, sets up dashboards, helps PMs and execs understand what's happening in the product. A specialist version of "what is true about our system."

**Security engineer.** Owns *what could go wrong if a bad actor showed up*. Writes security reviews, audits new features, runs penetration tests. Tends to be small in number relative to the rest of engineering, with a large multiplier on what they catch.

**TPM (technical program manager).** Coordinates work across multiple engineering teams. Distinct from a PM — a PM owns the *what*, a TPM owns the *coordination*. TPMs are common at larger companies where features cross many team boundaries.

**Solutions architect / sales engineer.** A specialist engineer who works with sales rather than product, helping prospective customers understand what the system can do and how to integrate. Mostly relevant for B2B companies.

You don't need to memorise this list. The point is that any role you'll meet at a software company is some specialised version of one of the *core six* plus a few specialists. When someone has a title you don't recognise, ask: *"is this a specialised engineer, designer, PM, ops, SRE, or QA?"* — and you've usually triangulated it.

---

## The shape of how decisions get made

A useful frame: most product decisions involve some combination of three of the core six roles: **PM** (what / why), **design** (how it feels), and **engineering** (how it's built). The other three (ops, SRE, QA) tend to be *consulted* rather than *deciding*, except when the question is squarely in their domain.

A simplified picture of how a feature gets built:

```
   ┌──────────┐   "what should we build?"       ┌──────────┐
   │   PM     │──────────────────────────────▶  │  DESIGN  │
   │          │                                  │          │
   └──────────┘                                  └──────────┘
        ▲                                              │
        │  "what's possible / what's hard?"            │  "how should it feel?"
        │                                              ▼
   ┌──────────┐    "let's build it together"   ┌──────────────┐
   │   ENG    │◀──────────────────────────────│  PM + DESIGN  │
   │          │                                │   together    │
   └──────────┘                                └──────────────┘
        │
        │  "is this safe / scalable?"
        ▼
   ┌──────────┐   ┌──────────┐   ┌──────────┐
   │   SRE    │   │   QA     │   │   OPS    │
   │ consults │   │ consults │   │ consults │
   └──────────┘   └──────────┘   └──────────┘
```

The triangle PM ↔ design ↔ engineering is the core of how features get made. The bottom row are *consulted* roles — they shape decisions but don't usually own them. When ops or SRE or QA *do* own a decision, it's because the question is squarely in their domain (an incident response, a migration, a security question).

The triangle's tensions are predictable: PM wants the most impactful thing in the time available; design wants it to be coherent and respectful of the user; engineering wants it to be feasible and not introduce future pain. Each pulls slightly differently. *Healthy product orgs are honest about these tensions and resolve them in conversation*; unhealthy ones force one corner of the triangle to override the others.

---

## How AI changes this picture

The change AI is bringing to the org chart is real and worth naming explicitly.

**The boundaries between roles are softening.** Designers can ship code (Yellow Belt of this playbook is named for that). PMs can write small features end-to-end. Ops can build automations that previously required engineering. The roles still exist; what's changing is *which work is exclusively which role's*. Five years ago, "designer ships frontend code" would have been an org-chart anomaly; today, it's an explicit program direction.

**The triangle is shrinking from three corners toward fewer corners on small features.** A designer who can build a UI change end-to-end *is* the PM-design-engineering triangle for that small change, in one head. The communication overhead between corners disappears. The trade-off (less specialisation, more breadth) is something each org gets to make on each kind of work.

**Engineering capacity goes from being the bottleneck to being the leveraged role.** The story used to be "we need more engineers to ship more features." The new story is "every existing person who builds is now a leveraged engineer, and we need fewer dedicated engineers per shipped feature." This is the underlying business case for the full-stack-builder program; this playbook is the operating manual for that transition.

None of this makes the core six obsolete. It does change the *mix*. A 2030-shaped product team will have fewer dedicated frontend engineers per PM-shaped feature than a 2020-shaped team did, and the ones that remain will be doing harder work: platform, infrastructure, the tail of complexity that AI doesn't yet handle.

---

## What you should carry forward

- **The core six roles** are engineer, designer, PM, ops, SRE, QA. Every software org has them, sometimes blended. Recognise them when you meet them.
- **The PM ↔ design ↔ engineering triangle** is where most product decisions live. The other three are usually consulted, not deciding.
- **Each role has a different default instinct**: correctness (engineer), comprehension (designer), outcome (PM), systemic (ops), tail-risk (SRE), adversarial (QA). Healthy product work needs all six instincts in some balance.
- **AI is softening the boundaries** between roles, especially on small features. The full-stack-builder direction this playbook teaches is the formal embrace of that softening.
- **Tech 101 ends here.** You can now read a tech blog post, a product spec, an incident channel, a PR review thread, a hiring page — and follow what's being said. That's the promise of this track. The Prologue is the natural next read; the Ops 101 track is the parallel track for non-coders.

---

**Previous:** [← 0A.9 Tests](09-tests.md) · **Next:** [→ Foundation README](../README.md) (this is the last chapter of Tech 101) — or proceed to [Prologue §0.1](../../prologue/01-welcome.md)

**Further reading**
- [Camille Fournier — *The Manager's Path*](https://www.oreilly.com/library/view/the-managers-path/9781491973882/) — the canonical book on how the engineering side of an org is structured and grows
- [Marty Cagan — *Inspired*](https://svpg.com/inspired-how-to-create-products-customers-love/) — the canonical book on the PM role and how PM/design/engineering should actually work together
- [Will Larson — *Staff Engineer*](https://staffeng.com/) — for what the senior end of the engineering ladder looks like; useful even if you're not on it
- [Charity Majors — Engineering management posts](https://charity.wtf/) — for the SRE/devops culture that makes the difference between teams that sleep at night and ones that don't
