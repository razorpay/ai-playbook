---
title: "Template: Minimum viable wiki seed"
slug: "appendices/templates/mv-wiki-seed"
section: "appendices"
status: "drafted"
type: "template"
track: "templates"
order: 8
time_minutes: 6
audience: "everyone"
outcome: "Stand up a working knowledge-base shape for a project: index, log, schema, and a kb folder. The starter pack that feeds the wiki pattern in §0.7 and N.7."
prev: "appendices/templates/retro"
next: null
pillar: "context"
belt: null
tags: ["template", "wiki", "knowledge-base"]
updated: "2026-05-08"
---

# Template: Minimum viable wiki seed

## What this template is for

The starter pack for a knowledge-base-driven project. The pattern is described in [Prologue §0.7](../../prologue/07-operating-principles.md) and treated more deeply in [Appendix N.7](../N-methodologies/N7-minimum-viable-wiki.md). This template is the artefact: four files plus a kb directory that, when populated even minimally, give an AI-assisted project the context backbone the rest of the playbook depends on.

The minimum viable wiki is *minimum* by design. It does not replace a full documentation system. It is the smallest shape that produces compounding context across an AI-assisted project's life.

The four files:

1. **index.md** — table of contents and orientation.
2. **log.md** — append-only journal of decisions and changes.
3. **schema.md** — what kinds of content live in this wiki and where.
4. **CLAUDE.md** — the wiki-specific Claude Code context (separate from any service-level CLAUDE.md).

Plus a `kb/` directory for topic-specific deep-dives.

## How to use it

1. Create a directory for the wiki: typically `wiki/` or `.kb/` at the project root.
2. Copy each of the four files below into that directory. Replace the placeholders.
3. Create the `kb/` subdirectory empty; populate it as topics emerge.
4. Commit. Update the wiki as the project evolves.

Target length for the seed: each file under 100 lines initially. The wiki grows over the project's life; the four files stay relatively small while `kb/` accumulates depth.

---

## File 1: index.md

```markdown
# <!-- project name --> wiki

<!-- DELETE: This is the entry point. Update it when the wiki structure
     changes. Keep it under 100 lines. -->

## What this wiki is

<!-- replace this with two or three sentences naming what the project is,
     who works on it, and what the wiki covers. -->

## How to find things

| Looking for | Read |
|---|---|
| Recent decisions | [log.md](log.md) |
| What kinds of content live where | [schema.md](schema.md) |
| Topic deep-dives | [kb/](kb/) |
| Project-specific Claude Code context | [CLAUDE.md](CLAUDE.md) |

## Topic index (kb/)

<!-- replace this with a list of the kb/ entries that exist. Each
     entry is a one-line description with a link. Update when new
     topics land. Example:
     - [auth-flow.md](kb/auth-flow.md) — how authentication works in
       this project.
     - [pricing-decisions.md](kb/pricing-decisions.md) — pricing model
       and the trade-offs we considered.
     - [database-conventions.md](kb/database-conventions.md) — table
       naming, migration policy, indexes. -->

## Recent additions

<!-- replace this with the three to five most recent kb/ entries or
     log.md entries. Updated when new content lands. The "what
     changed lately" surface for the wiki. -->

## Maintenance

The wiki is owned by <!-- role or team -->. Pull requests welcome.
Updates land through the project's normal review process.
```

---

## File 2: log.md

```markdown
# <!-- project name --> log

<!-- DELETE: Append-only journal of decisions and changes that affect
     the project. Newest entries at the top. Each entry is short:
     date, author, what changed, why. -->

## Entry format

```
## YYYY-MM-DD — [author] [short title]

What changed: <!-- one to three sentences -->

Why: <!-- one to three sentences -->

References: <!-- PRs, RFCs, kb/ entries, or external links -->
```

## Entries

<!-- replace this with actual log entries, newest first. Example: -->

## 2026-XX-XX — engineer-handle — Migrated tracker integration to canonical class

What changed: We moved off our custom MCP server for tracker integration to the platform's canonical connector class.

Why: Per RFC 0087, three teams (including us) had divergent integrations causing office-hours-queue load. The canonical class is sponsored by the platform team going forward.

References: RFC 0087, kb/integrations.md.

## 2026-XX-XX — designer-handle — Adopted Blade v3.x

What changed: Frontend now uses Blade v3.x; v2.x components are deprecated and will be removed in 90 days.

Why: Blade v2.x is being deprecated org-wide; v3.x has the accessibility patterns we need for the upcoming launch.

References: design/CLAUDE.md, kb/component-migration.md.
```

---

## File 3: schema.md

```markdown
# <!-- project name --> wiki schema

<!-- DELETE: This file describes what kinds of content live in this
     wiki, where they go, and what they look like. The schema is what
     keeps the wiki from drifting into chaos as it grows. Keep this
     file under 80 lines. -->

## What kinds of content live where

| Kind | Where | Example |
|---|---|---|
| Decisions and changes (chronological) | `log.md` | Migration to canonical connector class |
| Topic deep-dives | `kb/<topic>.md` | How auth works in this project |
| Orientation and navigation | `index.md` | This wiki's entry point |
| Claude-specific context for the wiki | `CLAUDE.md` | How Claude should navigate this wiki |

## kb/ entry shape

A `kb/<topic>.md` entry has roughly this shape:

1. **What this is.** Two-sentence orientation.
2. **The mental model.** A diagram or short explanation.
3. **Worked example.** A concrete walk-through.
4. **Common gotchas.** Three to five named patterns.
5. **References.** Where to look for more.

Length target: 100 to 300 lines. Topics that exceed 500 lines are usually candidates for splitting.

## Naming conventions

- File names are lowercase, hyphenated.
- Topic names match what someone would search for, not internal jargon. (`auth-flow.md`, not `apg-handler.md`.)
- Each kb/ entry is self-contained: it links to other entries but does not require them to make sense.

## When to add a new kb/ entry

Add a new entry when:

- The same question gets asked more than twice.
- A non-obvious decision is made and someone will want to know why later.
- A pattern emerges across multiple log.md entries.

Do not add entries for:

- Information that lives better in code comments.
- Information that the team's CLAUDE.md already covers.
- Speculative future state. The wiki documents what is, not what might be.
```

---

## File 4: CLAUDE.md (wiki-specific)

```markdown
# CLAUDE.md (wiki)

<!-- DELETE: This is the Claude Code context for the wiki itself.
     Distinct from any service-level CLAUDE.md the project may have.
     Keep it under 60 lines. -->

## What this CLAUDE.md is for

This file gives Claude Code context for navigating this project's wiki. When asked about the project, Claude should read index.md first, then the relevant kb/ entries.

## How to find context for a question

1. Read `index.md` for orientation.
2. Check the kb/ topic index for the relevant entry.
3. Read the relevant `kb/<topic>.md` file for depth.
4. Check `log.md` for recent changes that may affect the answer.

## What to update when changes happen

- Significant decisions go in `log.md` immediately.
- Recurring patterns become new `kb/<topic>.md` entries.
- The schema is updated when the wiki's shape changes.

## What not to do

- Do not summarise the wiki when asked a specific question; pull the relevant content directly.
- Do not invent kb/ entries that do not exist; if a topic is missing, surface that as a gap.
- Do not edit log.md retroactively. Append new entries; never modify old ones.
```

---

## Worked example

A populated minimum viable wiki for a small project (sketch). The four files above are roughly 60 to 80 lines each at adoption. The `kb/` directory starts empty and accumulates entries over time. After three months of an active project, a healthy wiki typically has 8 to 15 kb/ entries, a `log.md` with 30 to 50 entries, an updated index.md, and a stable schema.

The discipline: write the four files at project start, then maintain. Do not let the wiki drift; the value is in the compounding context, which only happens if the discipline holds.

---

## What this template is not

**Not a documentation system.** Documentation systems (Confluence, Notion, internal wikis) cover broader content with more structure. The minimum viable wiki is project-shaped and Markdown-based. It works alongside documentation systems; it does not replace them.

**Not a substitute for code comments.** Code-specific information lives in the code. The wiki is for cross-cutting context.

**Not a substitute for the team's CLAUDE.md.** The team's service-level or monorepo CLAUDE.md (use the [service template](CLAUDE-md-service.md)) covers the team's working conventions. The wiki's CLAUDE.md is wiki-specific. Both can coexist.

**Not unbounded.** A wiki that has accumulated 200 kb/ entries with no curation has lost the minimum-viable property. Curate periodically; archive entries that are no longer relevant; keep the index honest.

**Not a substitute for the chapters.** The discipline behind the minimum viable wiki is in [§0.7](../../prologue/07-operating-principles.md) and [N.7](../N-methodologies/N7-minimum-viable-wiki.md). The template is the artefact; the chapters are the rationale.

---

**Previous:** [← Retro template](retro-template.md) · **Back to:** [Appendix I README](README.md)
