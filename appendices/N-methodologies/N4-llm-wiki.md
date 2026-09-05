---
title: "The LLM Wiki pattern"
slug: "appendices/methodologies/llm-wiki"
section: "appendices"
status: "drafted"
type: "chapter"
track: "methodologies"
order: 4
time_minutes: 12
audience: "engineer"
outcome: "Understand the wiki-as-context pattern and why it differs from RAG-first thinking."
prev: "appendices/methodologies/gsd"
next: "appendices/methodologies/three-pillars"
pillar: null
belt: null
tags: ["appendix", "frameworks", "knowledge-base"]
updated: "2026-09-05"
---

# N.4 — The LLM Wiki pattern (Karpathy)

> **What this section is.** A practical profile of the lightest methodology named in [Prologue §0.7](../../prologue/07-operating-principles.md). gstack ([N.2](N2-gstack.md)) gives you roles. GSD ([N.3](N3-gsd.md)) gives you a planning structure. The LLM Wiki gives you three layers and three habits for keeping knowledge useful.

---

## The pattern in one minute

The LLM Wiki is a personal or team knowledge base that an LLM helps maintain. Its central rule is simple: keep source material immutable, compile useful knowledge into linked Markdown, and tell the LLM exactly how to maintain it.

| Part | What lives there | Ownership rule |
|---|---|---|
| **Raw sources** | Documents, meetings, threads | You provide them; the LLM reads but does not edit them. |
| **Wiki** | `index.md`, `log.md`, linked topic pages | The LLM drafts and updates; you verify and curate. |
| **Schema** | `CLAUDE.md` or `AGENTS.md` | You set the conventions; the LLM follows them. |

Three operations keep those parts moving:

1. **Ingest** a source into the relevant pages.
2. **Query** the wiki, verify reusable answers, and file them back.
3. **Lint** for contradictions, orphans, stale claims, and missing journal entries.

That is the whole pattern. The rest of this chapter explains why those boundaries matter and how to try them safely.

---

## The author and the idea

[Karpathy's LLM Wiki gist](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f) presents a pattern to copy into an LLM agent and adapt to your own context. It is deliberately not an installable framework.

The gist connects the pattern to Vannevar Bush's 1945 essay *As We May Think* and its idea of the Memex: a personal store of information connected by associative trails. Maintaining those links by hand is expensive. The LLM acts as a librarian that can propose summaries, cross-references, and page updates; the human still owns source selection, verification, and disputed decisions.

This division of labour is the useful idea. It reduces bookkeeping without pretending the knowledge base maintains or verifies itself.

---

## The shape of the framework

```text
   ┌─────────────────────────────────────────────────────────────┐
   │   YOU (the curator)                                          │
   │   Read sources · ask questions · verify · decide             │
   └────────────────────────────▲────────────────────────────────┘
                                │ collaborates with
   ┌────────────────────────────┴────────────────────────────────┐
   │   THE LLM (the librarian)                                    │
   │   Summarise · cross-reference · draft · lint                 │
   └────────────────────────────▲────────────────────────────────┘
                                │ reads/writes
   ┌────────────────────────────┴────────────────────────────────┐
   │                                                              │
   │   ┌──────────────┐    ┌─────────────────┐    ┌──────────┐   │
   │   │ Raw sources  │    │ The wiki        │    │ Schema   │   │
   │   │              │    │                 │    │          │   │
   │   │ - documents  │    │ /index.md       │    │ CLAUDE.md│   │
   │   │ - meetings   │    │ /log.md         │    │ AGENTS.md│   │
   │   │ - threads    │    │ /pages/*.md     │    │          │   │
   │   │              │    │                 │    │          │   │
   │   │ (immutable)  │    │ (linked drafts) │    │ (rules)  │   │
   │   └──────────────┘    └─────────────────┘    └──────────┘   │
   └─────────────────────────────────────────────────────────────┘
```

Two files make the wiki navigable:

- **`index.md` is the catalogue.** It lists each page with a one-line description. The LLM reads it first to decide what deserves closer inspection.
- **`log.md` is the journal.** It records each ingest, meaningful update, and decision with a timestamp. It tells you what changed without requiring a tour of every page.

The schema file is the keystone. It defines page shapes, naming rules, source-link expectations, and the steps each operation must follow. Without it, every session improvises. With it, the workflow has a reviewable contract.

The gist names Obsidian as a visual layer, Web Clipper for capture, `qmd` for local search, and git for versioning. None is required. The pattern still works with Markdown, an editor, and an LLM, which keeps it portable as tools change.

---

## The three operations

### 1. Ingest: connect a source; do not park it

When a new source arrives, the LLM finds the existing pages it affects, proposes updates, creates a page only for a genuinely new concept, and records the ingest in `log.md`. The source pattern imagines one substantial ingest touching roughly 10–15 pages; treat that as an illustration, not a quota.

A meeting transcript should not become an isolated transcript-summary page by default. Its decisions may update a workstream page, its ownership changes may update a people page, and its new terms may need their own entries. The source stays intact; the wiki receives linked, reviewable claims.

### 2. Query: verify, then file back

The LLM starts with `index.md`, opens the relevant pages and their cited sources, and drafts an answer. If that answer will be useful again, verify it against the source before filing it back into the wiki.

Without filing back, the answer disappears into chat history. Without verification, a plausible mistake can compound across future answers. The durable habit is **query → cite → verify → file**.

### 3. Lint: surface decay for a human to resolve

A lint pass looks for:

- pages that contradict one another;
- pages nothing links to;
- time-sensitive claims that may be stale;
- updates with no matching `log.md` entry; and
- claims that do not point back to a source.

The LLM surfaces candidates. A human decides whether a claim is wrong, superseded, or intentionally different. Schedule the pass; an optional habit is usually the first thing a busy week deletes.

---

<details>
<summary><strong>Try it: turn one verified answer into a durable page</strong></summary>

Pick one project question that a teammate is likely to ask again. Give your assistant the relevant source and this prompt:

```text
Answer this question using only the supplied source.

Then show me:
1. the exact source passage supporting each important claim;
2. which existing wiki page should change, or why a new page is needed;
3. the proposed page update;
4. the one-line log entry for this change.

Do not write any files until I verify the answer.
```

Check the citations. Correct any unsupported claim. Only then approve the page update, add it to `index.md` if needed, and append the log entry.

**Success check:** another session can find the answer from `index.md`, trace it to the source, and tell when it was last verified.

</details>

---

## How this differs from RAG-first thinking

Retrieval-augmented generation (RAG) searches a corpus at query time and supplies matching snippets to the model. The LLM Wiki compiles selected knowledge into maintained pages before the next query.

The gist argues for the wiki posture at personal or moderate project scale because readers can inspect, link, and version the compiled knowledge. That is not a universal verdict against RAG. Large or fast-changing corpora may still need retrieval infrastructure; a wiki can also use search. The useful choice is whether your primary context is raw snippets assembled repeatedly or reviewed pages maintained over time.

| Choose the wiki pattern when… | Consider retrieval infrastructure when… |
|---|---|
| The corpus is bounded enough to curate. | The corpus is too large to maintain page by page. |
| Decisions and explanations need durable links. | Coverage of fresh raw material matters more than synthesis. |
| Teammates need to review knowledge changes in git. | A search index is already the governed source of context. |

---

## What to lift tomorrow

1. **Write a schema.** Define the project, page types, naming, source requirements, and forbidden edits in `CLAUDE.md` or `AGENTS.md`.
2. **Create `index.md` and `log.md`.** Start with a catalogue and an append-only journal before inventing more folders.
3. **Adopt “verify, then file.”** Reusable answers become durable only after their evidence is checked.
4. **Calendar the lint pass.** Weekly is a useful starting rhythm; adjust it to the rate at which the sources change.

For the full setup, use [N.7 — The minimum viable wiki](N7-minimum-viable-wiki.md). This chapter teaches the model; N.7 provides the recipe.

---

## What not to assume

- **There is no canonical implementation.** The gist is intentionally abstract. You must adapt its conventions to your project.
- **Personal and team wikis have different governance.** A team needs edit ownership, review, merge, and conflict rules that the pattern does not supply.
- **LLM-maintained does not mean self-healing.** Humans still approve sources, verify reusable claims, and resolve contradictions.
- **Starting is easier than sustaining.** If linting and filing stop, the wiki becomes another folder people distrust.

---

## How it maps to this playbook

- **The schema file** maps to the Yellow and Green Belt `CLAUDE.md` chapters. The playbook adds Razorpay-specific guidance about what belongs there.
- **`index.md` and `log.md`** map to [Ops 0B.8 — Minimum viable wiki](../../foundation/ops-101/08-minimum-viable-wiki.md).
- **A maintained wiki** maps to Layer 3 of the [Enablement Stack](../../prologue/04-enablement-stack.md).
- **“Verify, then file”** maps to Prologue §0.7's operating habits and makes the evidence check explicit.

The three methodologies now form a useful sequence: gstack organises work through roles, GSD organises it through planning structure, and the LLM Wiki organises durable knowledge. Teams may borrow from all three; they do not need to adopt any of them whole.

Use [N.8 — Evaluating new frameworks](N8-evaluating-frameworks.md) when the next methodology arrives and you need to compare it against these basics.

---

**Up to:** [↑ Appendix N README](README.md) · **Previous:** [← N.3 Get Shit Done](N3-gsd.md) · **Next:** [→ N.5 Simon Willison's three pillars](N5-three-pillars.md)

**Further reading**
- [Karpathy's LLM Wiki gist](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f) — the canonical source
- [Vannevar Bush — *As We May Think* (1945)](https://www.theatlantic.com/magazine/archive/1945/07/as-we-may-think/303881/) — the Memex essay
- [Obsidian](https://obsidian.md/) — a Markdown-first visual layer suggested by the gist
- [Andy Matuschak — Evergreen notes](https://notes.andymatuschak.org/Evergreen_notes) — adjacent thinking on durable note-taking
