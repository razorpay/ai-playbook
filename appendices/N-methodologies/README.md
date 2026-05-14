---
title: "Appendix N: Methodologies & Frameworks"
slug: "appendices/methodologies"
section: "appendices"
status: "drafted"
type: "readme"
track: "methodologies"
order: 0
time_minutes: 5
audience: "engineer"
outcome: "Know which methodology reference to read for deeper context on KB-driven development."
prev: null
next: "appendices/methodologies/kb-driven-development"
pillar: null
belt: null
tags: ["appendix", "knowledge-base"]
updated: "2026-04-26"
---

# Appendix N — Methodologies & Frameworks

> **What this is.** The long-form companion to [Prologue §0.7 — Operating Principles](../../prologue/07-operating-principles.md). If §0.7 is the 10-minute version of "knowledge-base-driven development is the operating philosophy," this appendix is the 60-minute version: deep profiles of the three frameworks named there, the supporting frames that fit alongside them, the one-hour recipe for standing up your own minimum viable wiki, and a rubric for evaluating the next gstack-equivalent that comes along.

---

## Why this appendix exists

If you've internalised §0.7, you don't *need* to read this appendix. The chapter gave you the thesis (most AI failures are context failures) and the recipe (CLAUDE.md + index.md + log.md + a `.kb/` folder; three habits: ingest, query-and-file-back, lint).

This appendix is for two kinds of reader.

The first is the reader who finished §0.7 and wants more. Maybe you want to see what Garry Tan's framework actually looks like inside, beyond the one-paragraph summary. Maybe you want to understand *why* GSD's `.planning/` directory has the structure it does. Maybe you want to read the full Karpathy gist before deciding which patterns from it to lift. The deep profiles in N.2–N.4 are for you.

The second is the reader who's already built something — a custom CLAUDE.md, a skills library, a private wiki, an internal MCP — and wants the synthesis. The "evaluating new frameworks" rubric in N.8 is the most useful page in this appendix for that reader. It's the lens you'll re-use in six months when the next gstack-equivalent ships and your team is debating whether to adopt it.

Either way: this appendix is reference material. You don't read it linearly. You dip in.

---

## Sections

| §   | Section                                                          | What it covers |
|-----|------------------------------------------------------------------|----------------|
| N.1 | [Knowledge-base-driven development as a discipline](N1-kb-driven-development.md) | The thesis: don't re-derive context, accumulate it. The single idea uniting everything below. |
| N.2 | [gstack (Garry Tan)](N2-gstack.md) | Specialist skills as roles. Sprint sequencing. Persistent KB exposed as MCP. The *"process, not tools"* framing. |
| N.3 | [Get Shit Done (TÂCHES)](N3-gsd.md) | Meta-prompting + context engineering + spec-driven development. The `.planning/` directory pattern. XML plans sized for fresh windows. Subagent waves. |
| N.4 | [The LLM Wiki pattern (Karpathy)](N4-llm-wiki.md) | Anti-RAG. The wiki as a persistent, compounding artefact. `index.md`, `log.md`, the schema file. Memex lineage. |
| N.5 | [Simon Willison's three pillars](N5-three-pillars.md) | Prompt × Context × Harness as orthogonal axes. How the other frameworks distribute across them. |
| N.6 | [Spec-first / agentic-loop design](N6-spec-first.md) | The harness pattern that makes the rest reliable. |
| N.7 | [The minimum viable wiki — a one-hour stand-up](N7-minimum-viable-wiki.md) | A single concrete recipe drawn from N.2–N.4. CLAUDE.md schema + index.md + log.md + a `.kb/` directory. |
| N.8 | [Evaluating new frameworks — a rubric](N8-evaluating-frameworks.md) | When the next gstack-equivalent appears in 6 months, here's the lens. |

---

## How to read

- **If you read §0.7 and want more depth on a specific framework:** jump to N.2, N.3, or N.4.
- **If you want the synthesis without the framework profiles:** N.1 → N.5 → N.7 → N.8.
- **If you're preparing to evaluate a new framework someone is pitching to your team:** N.8 first, and then dip into whichever of N.2–N.4 the new thing most resembles.
- **If you want to actually build the recipe before reading the theory:** N.7 alone works.

There are no quests, boss fights, or belt requirements in this appendix. It's reference, not curriculum.

---

## How this fits with the rest of the playbook

The five places knowledge-base-driven development shows up across the playbook, ascending in scale:

- **The minimum viable wiki** — a single project, an individual builder. Recipe in N.7.
- **CLAUDE.md and skills** — your repo, your team. Yellow → Green Belt.
- **The Compass plugin** — Razorpay-wide skills library, exposed to every Claude Code session. White Belt.
- **The Razorpay Knowledge Base** (Layer 3 of the [Enablement Stack](../../prologue/04-enablement-stack.md)) — org-wide context, durable across years and team rotations. Green Belt contribution + permanent reference.
- **External frameworks**: gstack, GSD, the Wiki pattern. Communities of practice you can lift from. This appendix.

Same idea at five different scales. A full-stack builder can move between all five fluently — and *that's* what later belts train you to do.

---

**Up to:** [↑ Master INDEX](../../INDEX.md) · **Companion chapter:** [Prologue §0.7 — Operating Principles](../../prologue/07-operating-principles.md)

**Further reading**
- [gstack on GitHub](https://github.com/garrytan/gstack)
- [Get Shit Done on GitHub](https://github.com/gsd-build/get-shit-done)
- [Karpathy's LLM Wiki gist](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f)
- [Simon Willison — designing agentic loops](https://simonwillison.net/2025/Oct/15/designing-agentic-loops/)
- [Anthropic's Model Context Protocol](https://modelcontextprotocol.io/)
