---
title: "Razorpay Org-Wide AI Playbook"
slug: "/"
section: "root"
status: "drafted"
type: "readme"
track: null
order: 0
time_minutes: 5
audience: "everyone"
outcome: "Know what this playbook is, what version you are holding, and where to start."
prev: null
next: "foundation"
pillar: null
belt: null
tags: ["orientation"]
updated: "2026-05-12"
---

# Razorpay Org-Wide AI Playbook

> **You are here.** This is the entry point for the v0.21b alpha: a Markdown-first, belt-progression playbook with a Starlight hub, the `playbook-course` Claude Code skill, six runnable program skills, the full belt curriculum, the Staff+ Council section, fourteen appendices, six quick-reference cards, **nine signature SVG diagrams, and seven hand-drawn companion illustrations**. The drafting is complete, the polish pass has run, and both tiers of the visual language have shipped.

This playbook is the operating manual for Razorpay's AI builder program. It starts before tools, before Terminal, before anyone assumes you know what an API is. Then it climbs through Prologue, belts, quests, and boss fights until a reader can ship code with AI, lead a team adoption sprint, or contribute back to the internal skills and knowledge-base layer. Above the belts sits the Staff+ Council, the standing community of senior contributors who shape the program over multi-year horizons. The appendices catalogue the references, the templates, and the printable cards builders use beside live workflows.

**Version.** v0.21b alpha, updated 2026-05-12. This version layers the second visual tier on top of v0.21's signature SVGs: seven hand-drawn-style companion illustrations land in `excalidraw/` and into seven chapters where narrative work lands better than polished reference — the Origin Story before/after, the Boss Fight B-B month timeline, office hours, the embedded sprint week, inbox triage, the White Belt first-day map, and the RFC anti-patterns grid. The two tiers (polished SVG for identity, hand-drawn for narrative) are documented in `excalidraw/README.md` and `diagrams/README.md`. The initial cut was script-generated (`scripts/generate-handdrawn-svg.py`); each file can be replaced with a real Excalidraw sketch later without changing any chapter reference.

**Start here.** If you are new to software, begin with [Part 0 — Foundation](foundation/README.md). If you already know what an API, database, and deploy are, start with the [Prologue](prologue/README.md). If you are reviewing the whole playbook as a sponsor or maintainer, open the [Master Index](INDEX.md) first. If you want a guided walk, run Claude Code in this directory and say "start the playbook."

**What is drafted.** Foundation, Prologue, all four belts, the Staff+ Council section, fourteen appendices, six runnable program skills, six quick-reference cards, nine signature SVG diagrams, and seven hand-drawn companion illustrations. Three appendices ship as drafted skeletons (D Known Issues, E Roles & Forums, F Slack Channels) whose entries seed over time. The `playbook-course` skill walks the full curriculum. The reading order is coherent end-to-end from first commit to Council membership.

**How this is served.** The source of truth is Markdown. `slugs.yml` defines stable URL and skill IDs. `manifest.yml` defines the navigable course structure. The HTML hub in `hub/` reads those files and generates Starlight pages without a second editable source tree. The `playbook-course` skill at `skills/playbook-course/` reads a generated `curriculum.json` (also derived from `manifest.yml`) plus the chapter Markdown directly. Three doors, one source.

**Run the hub locally.** From `hub/`, run `npm install` once, then `npm run dev`. The local site opens at `http://127.0.0.1:4321/`. For a production build, run `npm run build`; static output lands in `hub/dist/`.

**Run the course skill.** From any working directory with Claude Code and the program-pinned plugin loaded, type "start the playbook" or "continue my belt." The skill creates a `LEARNER.md` and walks the next module. Maintainer notes are at [`skills/playbook-course/README.md`](skills/playbook-course/README.md).

---

**Next:** [→ Part 0 — Foundation](foundation/README.md) · [→ Master Index](INDEX.md)
