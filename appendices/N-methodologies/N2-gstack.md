---
title: "gstack"
slug: "appendices/methodologies/gstack"
section: "appendices"
status: "drafted"
type: "chapter"
track: "methodologies"
order: 2
time_minutes: 10
audience: "engineer"
outcome: "Understand what to lift from gstack and what to leave behind."
prev: "appendices/methodologies/kb-driven-development"
next: "appendices/methodologies/gsd"
pillar: null
belt: null
tags: ["appendix", "frameworks", "gstack"]
updated: "2026-04-26"
---

# N.2 — gstack (Garry Tan)

> **What this section is.** A deep profile of the first of the three frameworks named in [Prologue §0.7](../../prologue/07-operating-principles.md). What gstack actually is, what's interesting about it, what to lift, what to leave, and where it sits in the broader knowledge-base-driven-development conversation laid out in [N.1](N1-kb-driven-development.md).

---

## The pitch in one paragraph

gstack is an opinionated way of structuring how you and Claude Code work together on a project, built around the idea that **a single builder with the right roles encoded as prompts ships like a small team**. About two dozen specialised skills install into your Claude Code's skills folder — `/office-hours`, `/plan-eng-review`, `/design-consultation`, `/qa`, `/ship`, `/retro`, and so on — each summoned by a slash command, each playing a specific role in a sequenced sprint. The framework ships alongside a persistent knowledge base exposed as an MCP server, which is what makes the sprint *compound* across sessions instead of resetting every time. The author calls it *"a process, not a collection of tools,"* and the line is a fair self-description.

---

## The author and the moment

gstack is authored by **the president of Y Combinator**. The repo at `garrytan/gstack` has somewhere north of 80,000 stars at the time of writing, which is enormous (among the larger AI-tooling repos on GitHub) and signals a project that's reached far beyond its author's personal usage.

There are two reasons gstack matters as an artefact, beyond its star count:

The first is that it's the highest-profile public statement to date that *Claude Code is a viable platform on which to build a complete process*. Claude Code is barely two years old as a product. Most communities of practice around it are still nascent. gstack is the most-developed end-to-end opinion that "here is how to actually use this thing, from morning to evening, project after project." It's worth reading even if you adopt none of it, because the *shape* of the opinion is informative.

The second is that gstack is unusually well-aligned with the culture of accelerated product building that the AI moment has produced. Its idea of "a builder with the right roles ships like a team" is exactly the proposition Razorpay's full-stack-builder program is built on: and gstack happens to have already published, in detail, what those roles look like as prompts. Whether or not we adopt gstack directly, the framework is a high-quality reference for *how to encode a role as a prompt*.

---

## The shape of the framework

The mental picture worth carrying:

```
   ┌─────────────────────────────────────────────────────────────┐
   │                      YOU (the builder)                       │
   └────────────────────────────▲────────────────────────────────┘
                                │ summons (via /slash-commands)
   ┌────────────────────────────┴────────────────────────────────┐
   │   Specialist skills (~23 of them, each playing a role)      │
   │                                                              │
   │   Think:  /office-hours  /autoplan                          │
   │   Plan:   /plan-ceo-review  /plan-eng-review                │
   │           /plan-design-review  /plan-devex-review           │
   │   Build:  (your normal Claude Code work)                    │
   │   Review: /review  /design-review  /devex-review            │
   │   Test:   /qa   /qa-only                                    │
   │   Ship:   /ship  /land-and-deploy  /canary                  │
   │   Reflect:/retro  /learn                                    │
   │   Power:  /codex (cross-model 2nd opinion)  /careful        │
   │           /freeze  /guard  /pair-agent                      │
   └────────────────────────────▲────────────────────────────────┘
                                │ all read from / write to
   ┌────────────────────────────┴────────────────────────────────┐
   │   GBrain — persistent knowledge base, exposed as an MCP     │
   │   ("the memory your agent actually keeps between sessions") │
   └─────────────────────────────────────────────────────────────┘
```

Three things in that picture matter more than the specific skill names.

**The roles are sequenced.** Every project moves through the same arc: Think → Plan → Build → Review → Test → Ship → Reflect. Each phase has dedicated skills. The discipline is that you don't skip phases: you always start with `/office-hours` (or its equivalent) before building, you always run a `/review` before `/qa`, you always do a `/retro` after `/ship`. Most of the value isn't in any one skill — it's in the sequence enforcing that you don't shortcut.

**The roles are voices.** `/plan-ceo-review` reads your plan from the perspective of a CEO who cares about scope and outcome. `/plan-eng-review` reads it from an engineering manager who cares about feasibility and risk. `/plan-design-review` reads it from a designer who cares about user experience and craft. Each is a *different prompt*, encoding a different lens. The interesting move is that the framework makes the voices *cheap to summon* — you can run a 60-second CEO review on your plan before committing to it, and the value of doing that is high enough that most builders skip it without the prompt right there.

**The KB is the thing that compounds.** GBrain (registered as an MCP) is what turns a sprint of work into a *learning event*. The `/learn` skill, run after a project, distils the patterns, pitfalls, and preferences from the sprint into pages in GBrain that downstream sessions read first. Without GBrain, the framework is a clever set of prompts. With it, the prompts get sharper every time you use them, because each invocation has more context to draw on.

---

## What's specifically interesting about it

A few things gstack does that are worth noticing whether or not you adopt the framework.

**Roles as cheap summons.** Most product orgs have rituals (design crits, eng review, exec one-pagers) that exist *because* the act of submitting your work to a different lens reliably catches problems your own lens missed. The interesting move gstack makes is to drop the cost of those rituals to almost zero. You can run an "engineering review" on your half-formed plan in 60 seconds, alone at your desk, before any human is involved. The first version of the plan, when it lands in front of a real engineer, is much further along than it would have been. *Pre-submission self-review is the highest-leverage habit gstack installs.*

**The sequence is the discipline.** Think before plan, plan before build, build before review, review before test, test before ship, ship before reflect. Stated as words it's obvious; in practice almost no one does it consistently. The framework's contribution is to encode the sequence as a sequence of slash commands you'll actually use, with each command refusing to skip to the next phase if the prerequisites aren't met. If you've ever shipped something and then realised you'd skipped the planning step entirely, you'll appreciate the value of *the framework refusing*.

**Continuous checkpointing.** gstack's skills periodically commit a structured "context body" tag back to the conversation, so if a session crashes or has to be resumed, the new session can pick up where the old one left off without losing the working memory. This is a small detail with enormous practical consequence — most builders have at some point lost an hour of agent context to a crashed session, and the protection here is one of the things you wish was in the platform itself.

**Cross-model second opinions.** The `/codex` power tool is built around "ask a different model the same question." If Claude is stuck or appears to be confidently wrong, sending the same prompt to a different family of model often surfaces the issue. The framework normalises this as a *step* rather than an act of desperation, which lowers the bar to actually doing it.

---

## What to lift

Three patterns from gstack that you can apply tomorrow, without installing the framework itself.

**Author your own role-skills.** Take the three or four most common review lenses your team applies (design review, security review, accessibility review, customer-impact review) and write each as a SKILL.md that *runs the review for you*. Don't try to replace the human review; just make sure your work has *passed* your own version of each lens before it goes to a human. This is the gstack idea, ported to your team's specifics. You'll catch 80% of the issues your reviewers would have caught, and they'll spend their time on the 20% that needed real eyes.

**Encode the sequence.** Decide on the phases your team's work moves through, and *make those phases visible*. A `.gstack/phase` file. A SKILL.md called `/start-build` that refuses to start unless `/end-plan` has run. A `/ship` that checks that `/review` and `/qa` have both fired. The mechanism is not the point; the *visibility of the sequence* is. Most projects skip phases not because anyone decided to, but because nobody noticed the skip. The skipped step costs you in retrospect.

**Stand up your own GBrain.** A persistent KB exposed via an MCP server is overkill for many small projects, but underkill for any project you'll work on for more than a few weeks. The minimum viable wiki recipe in [N.7](N7-minimum-viable-wiki.md) is the lighter-weight version of the same idea. Either way: have a place where the *learnings* from one sprint feed into the prompts of the next.

---

## What to leave

A few honest cautions about gstack-as-shipped.

**The framework's voice is opinionated.** "You are the CEO," "act like a senior engineer," "we ship." Some readers will love it; some will find it distracting; some will find it alien to a regulated-fintech context. None of those reactions are wrong. If you adopt gstack wholesale, you'll inherit some of the voice; if that's not your team's flavour, expect to fork and tune.

**The depth varies skill to skill.** Some of the role-skills are deeply written and clearly battle-tested; others read like first drafts. Treat the framework as a *menu* — pick the skills that look mature for your use case, leave the rest. The fact that there are 23 skills is not a license to install all 23.

**The community is large but uneven.** gstack's star count is enormous, and its issues queue is large too. There's a lot of energy, but the framework changes shape fairly often, which means a recipe that worked last month may need adjusting this month. If you adopt, version-pin the parts you depend on the way you would any external dependency.

**It's built around individual builders.** The framework's identity is "one person, ships like a team." That's a lot of its appeal. It also means gstack doesn't (yet) have a strong opinion on team-shared KBs, multi-author skills, or coordinated release processes. For team-scale work, you'll need to adapt.

---

## When gstack is the right reach

If you're an individual builder working on a meaningful side project or a small new repo, *and* you want a complete opinion you can lift today, gstack is the most-developed framework available. Install it, run through the sprint sequence on one project, see what fits.

If you're working inside an established team with its own conventions and review culture, you'll get more value by *lifting the patterns* (role-as-skill, sequence-as-discipline, KB-as-MCP) than by adopting the framework wholesale. The patterns travel; the specific implementation often won't.

If you're trying to run knowledge-base-driven development for the first time and want a working example to study, gstack is one of three good options. The others are Get Shit Done (profiled in [N.3](N3-gsd.md)) and the Karpathy LLM Wiki pattern ([N.4](N4-llm-wiki.md)). They'd each tell you to do something slightly different. We'd suggest reading all three before committing to any one of them — it's a couple of hours of reading and the synthesis is worth it.

---

## How gstack maps to the other parts of this playbook

A short cross-reference for the readers who'll come back to this section after reading further into the playbook:

- **gstack's role-skills** ↔ the [Compass plugin](../../prologue/05-tool-tour.md). Compass is, structurally, a Razorpay-flavoured version of gstack's skills layer. Most of the role-as-skill ideas transfer directly. The skill names differ; the pattern is the same.
- **gstack's sequence (Think → Plan → Build → Review → Test → Ship → Reflect)** ↔ the belt boss fights. White Belt is the *Build → Test → Ship* sub-sequence at small scale. Yellow Belt extends it to *find → triage → fix → ship*. Green Belt's double-ship is the full sequence at team scale.
- **GBrain** ↔ the [Razorpay Knowledge Base](../../prologue/04-enablement-stack.md) (Layer 3 of the Enablement Stack). Same idea, different implementation. The KB at org scale.

You don't need any of these mappings to read the rest of the playbook — but if you've used gstack and you're entering this playbook for the first time, the mappings will help you locate yourself faster.

---

**Up to:** [↑ Appendix N README](README.md) · **Previous:** [← N.1 Knowledge-base-driven development](N1-kb-driven-development.md) · **Next:** [→ N.3 Get Shit Done](N3-gsd.md)

**Further reading**
- [gstack on GitHub](https://github.com/garrytan/gstack) — the canonical source. Read at least the top-level README and one or two role-skills before forming an opinion
- [Garry Tan on Y Combinator](https://www.ycombinator.com/) — for context on the author's vantage point; gstack is shaped by his experience watching thousands of small teams ship
- [Anthropic on Claude Code skills](https://code.claude.com/docs) — the platform-level docs for the harness gstack is built on
