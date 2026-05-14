---
title: "Minimum viable wiki one-pager"
slug: "appendices/reference-cards/mv-wiki-one-pager"
section: "appendices"
status: "drafted"
type: "reference-card"
track: "reference-cards"
order: 6
time_minutes: 3
audience: "everyone"
outcome: "Use a one-page reference to remember the four-file wiki shape and the discipline that keeps a project's context compounding."
prev: "appendices/reference-cards/playwright-essentials"
next: null
pillar: "context"
belt: null
tags: ["appendix", "reference-card", "knowledge-base", "wiki"]
updated: "2026-05-08"
---

# H.6 — Minimum viable wiki one-pager

> **Printable card · Companion to [§0.7 — Operating Principles](../../prologue/07-operating-principles.md) and [N.7 — The minimum viable wiki](../N-methodologies/N7-minimum-viable-wiki.md).** The four files plus the discipline.

---

## The four files

A minimum viable wiki has exactly four files plus a `kb/` directory.

| File | Purpose | Length target |
|---|---|---|
| `index.md` | Orientation; what kinds of content live where | < 100 lines |
| `log.md` | Append-only journal of decisions and changes | Grows over time |
| `schema.md` | What kinds of content go where, with examples | < 80 lines |
| `CLAUDE.md` | Wiki-specific Claude Code context | < 60 lines |
| `kb/` | Topic deep-dives, one file per topic | Each file 100-300 lines |

The full template is in [Appendix I — Minimum viable wiki seed](../I-templates/minimum-viable-wiki-seed.md).

---

## The discipline

Four practices that keep the wiki useful instead of letting it drift.

1. **Newest entries at the top of `log.md`.** Append-only. Each entry has date, author, what changed, why. Never edit old entries.
2. **`schema.md` defines what goes where.** If you find yourself unsure whether to add an entry to log.md or a new kb/ file, the schema is the source of truth. Update the schema when patterns shift.
3. **Add a kb/ entry when the same question gets asked twice.** Recurring questions are signal that the answer needs to be findable. The kb/ entry is shorter than re-deriving the answer every time.
4. **The wiki points at canonical sources; it does not duplicate them.** When the API design guide lives elsewhere, the wiki's kb/ entry on API design points at it rather than copying the content.

---

## When to start one

Start a wiki when:

- The project is more than one person and likely to outlast a single quarter.
- Decisions are being made that the team will want to remember later.
- Onboarding a new contributor is starting to take more than a day.
- The same question gets asked in chat repeatedly.

Do not start a wiki for:

- A one-week prototype.
- A solo project nobody else will join.
- A project whose canonical context already lives in a well-maintained docs system.

---

## The compounding loop

A wiki works because the cost of writing an entry is small, the benefit is amortised across everyone who reads it, and the patterns surface from repeated entries.

```
Question asked → answer given in chat → if asked again,
add kb/ entry → next reader finds the entry → no third asking.
```

Without the loop, the same answer gets given over and over and the team's context never compounds. With the loop, the team's institutional memory is the wiki.

---

## Common failure modes

| Mode | Fix |
|---|---|
| Wiki grows to 200 kb/ entries with no curation | Quarterly review: archive entries no longer relevant; merge duplicates; update the schema |
| Wiki becomes a "things I might need later" dumping ground | Schema is the gate: every entry has a defined kind |
| Wiki drifts out of date | Mark entries with their last-updated date; entries older than six months get a re-verify pass |
| Wiki is treated as the canonical source for everything | The wiki points at canonical sources; it does not replace them. Be clear about what the wiki owns versus what it links to. |

---

## What this card is not

**Not a documentation system.** Confluence, Notion, internal wikis serve broader content with more structure. The minimum viable wiki is project-shaped and Markdown-based.

**Not a substitute for the chapter.** [§0.7](../../prologue/07-operating-principles.md) covers the operating philosophy. [N.7](../N-methodologies/N7-minimum-viable-wiki.md) covers the deeper treatment.

**Not exhaustive.** The four files cover the working core. Some projects grow to need more (an architecture-decisions directory, a runbooks directory). Grow when the need is real.

---

**Remember:** four files. Append-only log. Schema as gate. kb/ entries when a question is asked twice.

**Up to:** [↑ Appendix H](README.md) · **Companion:** [§0.7](../../prologue/07-operating-principles.md) · [Template](../I-templates/minimum-viable-wiki-seed.md)
