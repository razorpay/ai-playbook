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
updated: "2026-07-19"
---

# N.4 — The LLM Wiki pattern (Karpathy)

> **What this section is.** A deep profile of the third of the three frameworks named in [Prologue §0.7](../../prologue/07-operating-principles.md). The LLM Wiki is structurally the lightest of the three (it's a *pattern*, not a framework) but philosophically the deepest. Where gstack ([N.2](N2-gstack.md)) gives you skills and GSD ([N.3](N3-gsd.md)) gives you a directory, the LLM Wiki gives you an *intellectual lineage*: an explicit nod to Vannevar Bush's 1945 Memex and an answer to the question Bush couldn't solve.

---

## The pitch in one paragraph

The LLM Wiki is a *pattern* (not a framework) for building a personal or team knowledge base that an LLM maintains alongside you. Three layers: **raw sources** (immutable, the LLM only reads them), **the wiki** (LLM-generated, interlinked markdown pages that the LLM owns and edits), and **a schema file** (`CLAUDE.md` for Claude Code, `AGENTS.md` for Codex; the configuration file that encodes conventions). Two special files anchor the wiki: `index.md` for navigation and `log.md` as an append-only journal. Three operations cycle through them: **ingest** (a new source touches 10–15 wiki pages), **query** (good answers get *filed back* as new pages), and **lint** (periodic health-checks for stale or contradictory claims). The pitch is anti-RAG: don't re-derive knowledge from raw sources every query. *Compile knowledge once and keep it current.* The author's framing is that the LLM is the librarian Vannevar Bush couldn't recruit; the wiki is the Memex he couldn't sustain.

---

## The author and the moment

The LLM Wiki is a public gist published in early 2026 by **a prominent AI researcher** known for terse, opinionated takes on the state of the field. The gist is short (a few hundred lines of markdown) and explicitly framed as a *pattern* designed to be *copied into your own LLM agent so the agent collaborates with you to instantiate it*.

Two reasons this artefact matters disproportionately for its size:

The first is **lineage**. Most knowledge-base-driven-development frameworks shipping in 2026 emerged from the practical pressure of building things with LLMs. The LLM Wiki situates that practical pressure inside a 80-year intellectual tradition: the gist explicitly cites Vannevar Bush's 1945 *As We May Think*, the essay that proposed the Memex, the personal information-organising machine that nearly every subsequent attempt at "shared knowledge management" has failed to realise. The argument: every prior attempt failed because the maintenance cost was too high for humans alone. *The LLM is the missing piece.* Calling that out gives the pattern a depth that no GitHub repo's star count can match.

The second is **distillation**. The other two frameworks profiled in this appendix are large, opinionated systems with dozens of moving parts. The LLM Wiki is essentially three files plus three habits. It's the *minimum* viable expression of knowledge-base-driven development. If you only have an hour, the LLM Wiki gives you the most idea-per-minute. The minimum viable wiki recipe in [N.7](N7-minimum-viable-wiki.md) is a direct lift of this pattern.

---

## The shape of the framework

The mental picture worth carrying:

```
   ┌─────────────────────────────────────────────────────────────┐
   │   YOU (the curator)                                          │
   │   "Read it; ask questions; make decisions"                   │
   └────────────────────────────▲────────────────────────────────┘
                                │ collaborates with
   ┌────────────────────────────┴────────────────────────────────┐
   │   THE LLM (the librarian)                                    │
   │   "Summarise; cross-reference; file; lint"                   │
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
   │   │              │    │ (LLM-owned)     │    │          │   │
   │   │ (immutable;  │    │                 │    │          │   │
   │   │  read only)  │    │ (links between  │    │ (rules)  │   │
   │   │              │    │  pages,         │    │          │   │
   │   │              │    │  to sources)    │    │          │   │
   │   └──────────────┘    └─────────────────┘    └──────────┘   │
   └─────────────────────────────────────────────────────────────┘
```

Three things in that picture matter more than any specific tool.

**Three layers, each with a different ownership rule.** Raw sources are *yours* — you provide them, the LLM never edits them. The wiki is *the LLM's*: it owns the pages, it does the bookkeeping, you interrogate and curate but you don't generally hand-write pages. The schema is *yours and the LLM's together* — you set the conventions, the LLM follows them. The clarity of these ownership rules is what keeps the system from collapsing into an unmaintainable single pile.

**The schema file is the keystone.** `CLAUDE.md` (or `AGENTS.md`) encodes how the wiki is organised, what each kind of page looks like, what conventions to follow when ingesting. Without a schema, the LLM guesses and the wiki diverges; with a schema, every operation is deterministic. The pattern's single most-imitated artefact is the *shape* of a schema file — and it's now a pattern you'll see in dozens of community projects, all tracing back to this gist's framing.

**`index.md` and `log.md` are the load-bearing files.** `index.md` is the catalog — every page in the wiki, with a one-line description. The LLM reads it *first* on every query, and it functions as a substitute for embedding-based RAG at moderate scale. `log.md` is the append-only journal: every operation, every decision, every ingest gets a timestamped line. Greppable forever. *"What did we decide about X in February?"* — `grep '\\[2026-02' log.md | grep X`, and you have the answer in five seconds.

---

## The three operations, examined

This is where the pattern's real teaching lives.

### Ingest

You bring a raw source into the system. The LLM reads it, decides which existing wiki pages it touches (typically 10–15), updates those pages with the new information, creates new pages where the source introduces concepts the wiki doesn't have, and writes a `log.md` entry naming the ingest.

The discipline is that *one source touches many pages*. A meeting transcript isn't a single new page; it's *updates* to several existing pages (the people page, the decisions page, the workstream page) plus possibly one or two new pages for novel concepts. *The information is connected to the wiki's structure, not parked in its own corner.* This is what makes the wiki different from "a folder where you save documents."

### Query

You ask the LLM a question. It reads `index.md` first, locates the relevant pages, reads them, and answers. *If the answer is reusable, you verify it against the cited source before asking the LLM to file it back as a new page.*

That last step is the operation people miss most often, and it's the most consequential. Without filing back, every query is disposable — you got an answer this time, you'll re-derive it next time. With filing back, every good query *adds a page to the wiki*, and the wiki gets sharper every time it's used. The pattern compounds because *the wiki is built incidentally, in the course of doing real work*, not as a separate writing task.

The author's exact phrasing on this is worth remembering: the human reads sources and asks questions; the LLM does the summarising, cross-referencing, filing, and bookkeeping. Curation is yours; bookkeeping is the LLM's.

### Lint

Periodically (weekly is a good rhythm) you ask the LLM to *lint the wiki*. It scans for contradictions between pages (the people page says X but the decisions page says not-X), orphan pages (nothing links to this), stale claims (this page hasn't been touched in 90 days but cites something that's changed), and missing `log.md` entries (this page got updated but no journal entry recorded the change). It surfaces the issues; you adjudicate.

The lint operation is what prevents the wiki from rotting. Without it, knowledge bases gradually become unreliable: there's a stale claim, you don't notice, three months later someone trusts it and gets burned. The lint operation is the AI maintaining its own house, surfacing decay so a human can decide. *Five minutes a week; payoff is the wiki staying trustworthy.*

---

## What's specifically interesting about it

A few things the LLM Wiki pattern does that stand out across the three frameworks.

**The Memex framing isn't decorative.** Vannevar Bush, in 1945, imagined a desk that could hold a person's entire intellectual life (books, articles, correspondence, notes) in associative trails the user could navigate at will. The Memex was a thought experiment because the *maintenance* was uncomputable; nobody had time to build all those associative trails by hand. Eighty years of attempts to build a Memex (Vannevar Bush's own essay anticipated most of them) failed not because the *interface* was wrong but because the *librarian work* was too expensive.

The LLM is, in this framing, *the librarian we never had*: it can draft cross-references and page updates on request, making the mechanical work tractable. Treat that as the ambition, not an automatic maintenance guarantee. Source selection, verification, and contradiction resolution still need explicit human ownership. The pattern claims the Memex lineage directly; the useful advance is cheaper librarian work, not a self-healing wiki.

**Anti-RAG, openly.** Most of the AI tooling community in 2024–2025 was excited about retrieval-augmented generation — the technique of letting the LLM dynamically pull relevant snippets from a large corpus at query time. The LLM Wiki pattern is the *opposite* posture: don't keep your knowledge as raw documents to be re-searched every query; *compile* it once into a wiki, and consult the wiki. The author argues this is more efficient, more accurate, and more durable at moderate scale (anything under, roughly, the size that requires a full search infrastructure). The argument has weight. RAG isn't wrong; it's just appropriate at a different scale than most people use it.

**Tooling is named, but light.** The gist mentions specific tools — Obsidian as the IDE, Web Clipper for ingesting articles, a tool called *qmd* for local search at scale, git for versioning — without depending on any of them. The pattern is "any text editor + any LLM." If you want to be fancy, the tool stack is there. If you want to be lean, three markdown files do the job. *The pattern's robustness to tooling churn is one of its quiet strengths.*

---

## What to lift

Three patterns from the LLM Wiki you can apply tomorrow, with no installation required.

**Stand up a `CLAUDE.md` schema for any project that lasts more than two weeks.** The schema is the keystone. Even a short one (50 lines) dramatically changes how every Claude session you'll have on the project goes. Specify: what kind of artefact this project is, what conventions apply (naming, style, tone), what the wiki/KB structure looks like, what *not* to do. Commit it to the repo so every teammate inherits it.

**Adopt `index.md` and `log.md` as project-level files.** Even without the rest of the wiki structure, having a catalog file and an append-only journal is the lightest possible KB. `index.md` lists every meaningful page, doc, decision, or thread. `log.md` gets a dated line for every meaningful event. Both files are searchable, both are committed to the repo, both are maintained by Claude on request. *This is the 90-minute version of the pattern; do this and you've already got most of the value.*

**Practice "verify, then file the answer back" as a habit.** Every time Claude produces a reusable answer, check it against the cited source, then ask: *"save this verified answer as a new page in the wiki, linked from `index.md`."* The first few times it'll feel performative; by the tenth time, it'll feel obvious. Within a month, your wiki has dozens of pages you didn't deliberately write — they accumulated as a side-effect of working without compounding plausible mistakes.

---

## What to leave

A few honest cautions.

**The pattern is intentionally abstract.** The gist explicitly says it's designed to be *copied into your own LLM agent and instantiated* against your specific context. There is no "LLM Wiki repo" to clone. There is no canonical implementation. *You're expected to do the synthesis yourself.* For some readers, this is freeing; for others, it's exactly the friction that makes them prefer GSD or gstack, both of which ship installable systems. Be honest about which kind of reader you are.

**It's individual-scale by default.** The pattern was written for personal knowledge bases. It works at team scale too: but the team-scale version requires *deliberate* conventions about who edits what, how pages get reviewed, how merges happen. The pattern doesn't help you with those decisions. Adopting at team scale is more work than adopting individually.

**The lint discipline is the hard part.** The pattern is easy to *start* and easy to *abandon*. Most readers set up the schema, the index, the log, and use them happily for two weeks; then a busy fortnight rolls through; then the lint pass gets skipped; then the wiki starts to drift; then the wiki gets distrusted; then it's vestigial. The fix is the same as for any habit (calendar the lint pass, make it sacred) but the failure mode is real.

---

## When the LLM Wiki is the right reach

If you want the *philosophical* foundation for knowledge-base-driven development before adopting any specific tool, read this gist first. It's the shortest of the three frameworks profiled, and it gives you the lens you'll use to evaluate the others.

If you have a specific *personal* project that you want to ship a working KB on this week, the pattern is the lightest path. Three files plus three habits, no installation, no commands to learn.

If your team is fragmented across tools (some on Claude Code, some on Codex, some on something else) the schema-file pattern (`CLAUDE.md` for Claude, `AGENTS.md` for Codex) is the most portable artefact across the three frameworks. You can make the same schema work on multiple harnesses in a way that gstack's skill files and GSD's planning directory can't quite replicate.

If you're prepping to *evaluate* future frameworks (the next gstack-equivalent that ships in six months) read this gist as a *baseline*. Any framework that doesn't include something like the schema/index/log triple, or something philosophically equivalent, is missing a piece. The rubric in [N.8](N8-evaluating-frameworks.md) operationalises this.

---

## How the LLM Wiki maps to the other parts of this playbook

A short cross-reference:

- **The schema file (`CLAUDE.md`)** ↔ the Yellow Belt and Green Belt CLAUDE.md chapters. The pattern says "every project has a schema file"; the playbook teaches you to write one. Same artefact; the playbook adds Razorpay-shaped opinions about what goes in it.
- **`index.md` and `log.md`** ↔ the *minimum viable wiki* preview chapter in Ops 101 (chapter 0B.8). Non-coders can adopt the pattern as easily as coders; the chapter teaches the three-file recipe outside any repo context.
- **The wiki as a maintained artefact** ↔ Layer 3 of the [Enablement Stack](../../prologue/04-enablement-stack.md), the Razorpay Knowledge Base. Same idea at org scale; the LLM Wiki is the project-scale instance.
- **The "verify, then file the answer back" habit** ↔ §0.7's third operating habit. The pattern is the same discipline with an explicit check before the wiki compounds it.

---

## Closing the trio

You've now read profiles of three frameworks pointing in the same direction: gstack ([N.2](N2-gstack.md)) approaches knowledge-base-driven development through *roles*, GSD ([N.3](N3-gsd.md)) approaches it through *structure*, and the LLM Wiki approaches it through *philosophy*. They're complementary, not competing — most teams who go deep eventually adopt patterns from all three, and the three together are an excellent triangulation of what *good* looks like in this discipline today.

The next sections of this appendix step back from the specific frameworks and look at the supporting frames: Simon Willison's three pillars in [N.5](N5-three-pillars.md), the spec-first pattern in [N.6](N6-spec-first.md), the minimum viable wiki recipe in [N.7](N7-minimum-viable-wiki.md), and the rubric for evaluating new frameworks in [N.8](N8-evaluating-frameworks.md).

---

**Up to:** [↑ Appendix N README](README.md) · **Previous:** [← N.3 Get Shit Done](N3-gsd.md) · **Next:** [→ N.5 Simon Willison's three pillars](N5-three-pillars.md)

**Further reading**
- [Karpathy's LLM Wiki gist](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f) — the canonical source. Short enough to read in 20 minutes; influential enough to keep returning to
- [Vannevar Bush — *As We May Think* (1945)](https://www.theatlantic.com/magazine/archive/1945/07/as-we-may-think/303881/) — the Memex essay. The intellectual ancestor of every personal-KB attempt for the last 80 years
- [Obsidian](https://obsidian.md/) — the markdown-first note-taking tool the gist suggests as a UI; works beautifully alongside Claude Code if you want a visual layer on top of your wiki
- [Andy Matuschak — Evergreen notes](https://notes.andymatuschak.org/Evergreen_notes) — adjacent thinking on note-taking discipline; predates LLMs but pairs well with the wiki pattern
