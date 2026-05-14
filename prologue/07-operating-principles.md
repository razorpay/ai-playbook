---
title: "Operating Principles"
slug: "prologue/operating-principles"
section: "prologue"
status: "drafted"
type: "chapter"
track: null
order: 7
time_minutes: 10
audience: "everyone"
outcome: "Understand knowledge-base-driven development as the operating philosophy of the playbook."
prev: "prologue/roles-and-forums"
next: "prologue/how-to-read"
pillar: null
belt: null
tags: ["orientation", "knowledge-base"]
updated: "2026-04-26"
---

# 0.7 — Operating Principles (knowledge-base-driven development)

> **⏱ 10 minutes · 👥 Everyone · 🎯 Leaves with:** the single operating philosophy that unites every belt in this playbook, three real frameworks that embody it, and a one-hour recipe to apply it tomorrow morning.

---

## If you're short on time

1. **Most AI-coding failures are context failures.** The fix isn't a better prompt: it's a knowledge base your AI maintains alongside you, between sessions, between tasks, between teammates.
2. Three independent frameworks have all converged on this same idea: **gstack** (specialist roles + a persistent KB-as-MCP), **Get Shit Done / GSD** (a structured `.planning/` directory with cross-session memory), and **Karpathy's LLM Wiki** (the LLM as your wiki maintainer, not your search engine). They argue it in different voices. They all say: *don't re-derive context, accumulate it.*
3. You can stand up a "minimum viable wiki" for any project in about an hour: a `CLAUDE.md` schema, an `index.md`, a `log.md`, and a `.kb/` folder where good answers get filed back as pages. That's the recipe.

If that lands, jump to [§0.8 — How to use this playbook (as a reader)](08-how-to-read.md). Otherwise, read on — this chapter is short, but it's the philosophical spine that the next four belts assume.

---

## The thesis: most AI failures are context failures

Watch a designer use Claude Code for the first time. They give a clean prompt. They get back something that looks fine. They run it. It's wrong in a way that's specific to how *their* repo, their team, their convention does things. They re-prompt. They get something marginally less wrong. They re-prompt again. They start to lose hope.

What just happened? Their prompts were fine. The model is fine. The harness is fine. What was missing was the *context Claude needed to be confident from the first try*: which Razorpay quirk applies, which file is canonical, what the team's review culture actually rejects, where the test fixtures live, what was tried last week and why it didn't work.

That context exists somewhere: in someone's head, in a Slack thread three months old, in a comment buried in a closed PR. The cost of *re-deriving* it on every task is enormous. The cost of *accumulating* it once and keeping it warm is small. That's the entire pitch. It is the same pitch that ships the Compass plugin, the same pitch that ships the Razorpay Knowledge Base layer, the same pitch behind every CLAUDE.md you'll write at Yellow Belt.

The philosophy has a name now (**knowledge-base-driven development**) and three independent communities of practitioners have built frameworks around it. We're not introducing a new idea here. We're naming an idea you'll recognise once you've seen it three times in three voices.

---

## The three frameworks (a one-paragraph profile each)

You don't need to install any of these to earn any belt at Razorpay. You need to *recognise* the patterns, because every Compass skill, every CLAUDE.md, every internal MCP we ship is a specific instance of one of these patterns. Read each as "this is one community's answer to the same question we're solving."

### gstack

Garry Tan's framework (the YC president, ~80K stars on GitHub) is built around the idea that **a single builder with the right roles encoded as prompts ships like a team**. About twenty specialist skills install into your Claude Code's skills folder: `/office-hours`, `/plan-eng-review`, `/design-consultation`, `/qa`, `/ship`, `/retro`, etc. — each summoned by a slash command. They sequence the work as **Think → Plan → Build → Review → Test → Ship → Reflect**. Crucially, the framework ships with **GBrain**, a persistent knowledge base exposed as an MCP server, and a `/learn` skill that compounds project-specific patterns across sessions. *"gstack is a process, not a collection of tools."* The KB is what makes the process compound.

[gstack on GitHub](https://github.com/garrytan/gstack)

### Get Shit Done (GSD)

TÂCHES's framework (~57K stars, shipping a release every few days) takes a more structural approach. It materialises the knowledge base as a **`.planning/` directory** in your repo: `PROJECT.md` (vision), `REQUIREMENTS.md`, `ROADMAP.md`, `STATE.md` for cross-session memory, per-phase `CONTEXT.md` files, and XML-structured plans sized to fit a single fresh context window. Subagents run in **"waves"** — independent plans run in parallel each with their own 200K-token windows; dependent ones serialise. The explicit thesis is solving **"context rot"** — the quality degradation that happens when a single Claude session fills its context with old conversation. *"Claude Code is powerful. GSD makes it reliable."* The reliability comes from the persistent `.planning/` files, not from clever prompts.

[GSD on GitHub](https://github.com/gsd-build/get-shit-done)

### The LLM Wiki pattern (Karpathy)

Karpathy's gist (April 2026) is shorter than the other two and more polemical. It's a **manifesto, not a framework**. Three layers: raw sources (immutable, you read them), the wiki (LLM-generated interlinked markdown that the LLM owns and maintains), and a schema file (`CLAUDE.md` for Claude Code, `AGENTS.md` for Codex). Two special files: **`index.md`** for navigation, **`log.md`** as an append-only journal you can `grep`. Three operations: **ingest** (one source touches 10–15 wiki pages), **query** (good answers get *filed back* as new pages so explorations compound), and **lint** (periodic health-check for stale claims and orphan pages). The argument is anti-RAG: don't re-derive every query against raw embeddings, *compile knowledge once* and keep it current. The lineage Karpathy names is Vannevar Bush's Memex (1945) — and the reason the Memex never worked is exactly the reason this works now: *the maintainer was always meant to be the librarian, and we finally built one that doesn't get bored.*

[Karpathy's LLM Wiki gist](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f)

---

## What unites them

Three frameworks. Three voices. One idea, restated three ways:

**gstack** persists context in GBrain (an MCP-exposed KB) and in the project skills `/learn` writes back. **GSD** persists it in `.planning/STATE.md` and per-phase context files. **Karpathy** persists it in the wiki itself and the `log.md` journal. None of them try to make Claude smarter. All of them try to make Claude's *context* smarter: so that the next prompt, the next session, the next teammate inherits more.

That's the principle. Stop letting context evaporate. Compound it.

It rhymes with how good design systems work: *the system improves faster than any central team can manage, because everyone using it has permission to improve it.* Same with knowledge bases for AI work — the maintenance cost is near zero (the LLM does the bookkeeping), so the only thing that fails the system is forgetting to use it.

---

## How this playbook embodies the same idea

You'll see this principle show up at every belt. It's not an abstraction — it's the spine.

- **Compass plugin (White Belt)** — a Razorpay-specific KB shipped as skills. Not a tool. An accumulated body of knowledge about Blade, our repos, our review culture. Same shape as gstack's GBrain.
- **CLAUDE.md (Yellow → Green Belt)** — your project's rule book. Either Karpathy's `CLAUDE.md` schema or GSD's `STATE.md` — different names, same role. Tells Claude what's true about *this* repo before any prompt fires.
- **Skills you author (Green Belt)** — the `/learn` move at team scale. You hit a workflow your team does three times a week; you commit the playbook of how to do it as a SKILL.md; the next teammate doesn't re-derive it.
- **The Razorpay Knowledge Base (Layer 3 of the Enablement Stack)** — the Wiki pattern at the org level. Test credentials, feature flags, error patterns, repo map. Once written, every builder inherits it. Every gap is filed back when someone solves it. See [§0.4](04-enablement-stack.md).
- **`.planning/` directories on your features (Black Belt)** — the GSD pattern, applied to your own multi-week work. A fresh context window per task; persistent state across windows.

Every layer of the playbook is a different *scale* of the same idea: shrink the cost of re-deriving context until it's effectively zero, and put the bookkeeping on the LLM.

---

## The minimum viable wiki — a one-hour stand-up

If the rest of this chapter feels abstract, here's the concrete recipe. You can do this for any project (a feature, a research initiative, a competitive analysis, a hiring process) in about an hour.

### Files (4 of them)

- **`CLAUDE.md`** at the project root. The schema file. Tells Claude what kind of artefact this project is, what conventions apply, what *not* to do. Under 200 lines. If it grows past 200, you have two projects pretending to be one.
- **`index.md`** in a `.kb/` folder. The catalog. List of every page you've filed, with a one-line description of each. Updated whenever you add a page. This is what Claude reads first on any new query.
- **`log.md`** in `.kb/`. Append-only. Every meaningful event prefixed with a date stamp like `## [2026-04-26] decision | Renamed feature flag from X to Y`. Greppable, never edited, the audit trail.
- **`.kb/pages/`**: one markdown file per concept, person, decision, source. Linked from `index.md`. The LLM owns these — when you query and get a good answer, you ask Claude to file it back here.

### The three habits (5 minutes a day)

- **Ingest.** When a new source matters (a Slack thread, a PR comment, a meeting note) paste it to Claude with "ingest this; touch whatever pages need it." Claude updates the relevant `.kb/pages/` files and writes a new `log.md` entry.
- **Query.** When you ask Claude a question, end with "if the answer is good, file it back to the KB as a page." Don't just consume answers. Let them compound.
- **Lint.** Once a week, ask Claude to review `index.md` and flag contradictions, stale pages, orphans. Five-minute pass. Keeps the wiki honest.

That's it. Four files, three habits, one hour to set up. Every belt above this one assumes you've internalised the idea. Doing the recipe once on a real project is the fastest way to internalise it.

A printable one-pager version of this recipe lives in [Appendix H — Reference Cards](../appendices/H-reference-cards/README.md).

---

## When you'll feel this paying off

The honest answer: not in your first session. The first time you set up a CLAUDE.md, it feels like overhead. The first time you use it, it feels like overhead. The third time you use it on the same project, you stop noticing it. The fifth time, you can't imagine working without it. That's the curve.

You'll feel it specifically in three moments:

- **Coming back to a project after two weeks away.** With no KB, you spend an hour re-loading context into your head. With a KB, you ask Claude to summarise where you were, and you're back in the loop in five minutes.
- **Onboarding a teammate.** With no KB, you write a quick brief, they ask questions for two days. With a KB, you point them at the project root, they read 200 lines of `CLAUDE.md`, scan the `.kb/index.md`, and they're useful inside an hour.
- **Switching between three or four parallel projects.** The Compass plugin already does some of this for you with auto-memory. The KB pattern gives you per-project memory that survives across machines, sessions, and the inevitable browser-tab massacre.

The pay-off is delayed but it's enormous. That's why this is a Prologue chapter and not a Yellow Belt chapter — you read it once before any belt so you know what shape to give your work from the very first project.

---

## Going deeper

If you finished this chapter and want the long-form profiles of each framework, plus Simon Willison's three-pillar frame, the spec-first pattern, and a rubric for evaluating the next gstack-equivalent that ships in six months (that's [Appendix N) Methodologies & Frameworks](../appendices/N-methodologies/README.md).

If you want to read the originals (and you should, eventually):

- [gstack on GitHub](https://github.com/garrytan/gstack) — Garry Tan's framework
- [Get Shit Done on GitHub](https://github.com/gsd-build/get-shit-done) — TÂCHES's framework
- [Karpathy's LLM Wiki gist](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f) — the manifesto
- [Simon Willison — designing agentic loops](https://simonwillison.net/2025/Oct/15/designing-agentic-loops/) — the three-pillar frame
- [Anthropic's Model Context Protocol](https://modelcontextprotocol.io/) — the open standard the KB-as-MCP pattern runs on

---

## What you should carry into the next chapter

- **Most AI failures are context failures.** Not prompt failures. Not model failures. Context.
- **Knowledge-base-driven development is the operating philosophy** of this playbook. Every belt is a different scale of "compound, don't re-derive."
- **Three frameworks have already converged here.** gstack, GSD, and Karpathy's LLM Wiki are different voices saying the same thing. You don't need to adopt any of them whole — you need to recognise the pattern.
- **You can stand up a minimum viable wiki in an hour.** `CLAUDE.md`, `index.md`, `log.md`, `.kb/pages/`. Three habits: ingest, query (and file back), lint.
- **The pay-off is delayed but huge.** Re-entry, onboarding, and parallel projects feel different on the other side of this curve.
- The next chapter ([§0.8 — How to use this playbook (as a reader)](08-how-to-read.md)) is about how to navigate this document itself. After that, [§0.9](09-how-to-lead.md) is the manager-and-team-lead version.

---

**Previous:** [← 0.6 Meet the people](06-people-and-pocs.md) · **Next:** [→ 0.8 How to use this playbook (as a reader)](08-how-to-read.md)

**Further reading**
- [gstack on GitHub](https://github.com/garrytan/gstack) — *"gstack is a process, not a collection of tools"*
- [Get Shit Done on GitHub](https://github.com/gsd-build/get-shit-done) — *"Claude Code is powerful. GSD makes it reliable"*
- [Karpathy's LLM Wiki gist](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f) — *"You read it; the LLM writes it"*
- [Simon Willison — designing agentic loops](https://simonwillison.net/2025/Oct/15/designing-agentic-loops/)
- [Anthropic's Model Context Protocol](https://modelcontextprotocol.io/)
- [Appendix N — Methodologies & Frameworks](../appendices/N-methodologies/README.md)
