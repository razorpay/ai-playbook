---
title: "Building your own minimum viable wiki for any project"
slug: "ops-101/minimum-viable-wiki"
section: "foundation"
status: "drafted"
type: "chapter"
track: "ops-101"
order: 8
time_minutes: 20
audience: "pm-designer-ops"
outcome: "Set up a small project wiki that lets AI work with memory instead of repeated context."
prev: "ops-101/lightweight-agents"
next: "ops-101/quest-30-minute-teardown"
pillar: null
belt: null
tags: ["ops-101", "knowledge-base"]
updated: "2026-04-26"
---

# 0B.8 — Building your own minimum viable wiki for any project

> **⏱ 20 minutes · 👥 PMs, designers, ops, anyone running ongoing workstreams · 🎯 Leaves with:** the operating-philosophy capstone of the Ops 101 track — a one-hour recipe for a knowledge base that grows alongside your work and earns its keep across weeks.

---

## Why this chapter closes Ops 101

Six chapters into Ops 101 you've now done a lot of *individual* work: triage, generation, ticket workflows, document workflows, a configured agent or two. Each chapter saved you some hours. Each was good on its own.

This chapter teaches the move that makes all those hours *compound*. The single-most-important habit for an Ops 101 reader to leave with isn't any specific recipe: it's the discipline of **knowledge-base-driven development**, applied to *your* ongoing work, so that the second time you do anything resembling a task you've done before, the agent already knows what worked the first time.

The full philosophical version of this idea lives in [Prologue §0.7](../../prologue/07-operating-principles.md) and the long-form treatment in [Appendix N](../../appendices/N-methodologies/README.md). This chapter is the *applied* version for non-coders. Same idea, tuned to ops-shaped work, set up in an hour.

---

## The thesis, in one paragraph

Most of the time you spend re-establishing context for an agent — pasting in last month's data, explaining the same pattern again, re-describing your team's conventions for the fifth time — is *waste*. Knowledge-base-driven development is the practice of accumulating that context once, in a structured place, and letting the agent read it on every future query. The agent stops being *amnesia + brilliance* and becomes *brilliance + memory*. Every recipe gets sharper. Every digest pulls from richer context. Every agent fires with more relevant background.

The cost is small (about an hour to set up; about 10 minutes a week to maintain). The compounding is large (the wiki gets sharper every week you use it). The trick that makes this possible *now* and not five years ago is that the LLM does almost all the bookkeeping — you direct, it files. Reading [Appendix N.1](../../appendices/N-methodologies/N1-kb-driven-development.md) is the long version of why this works; this chapter is what you do.

---

## What "your wiki" looks like for ops work

The shape is simple. You'll create a folder somewhere — Drive, Notion, a local folder synced via Cowork, your organisation's docs surface — with a small set of files inside.

```
your-project-or-workstream/
├── CONTEXT.md         ← the schema (rules + project facts)
├── INDEX.md           ← the catalog (what pages exist)
├── LOG.md             ← the journal (what happened when)
└── pages/
    ├── (one markdown file per concept, person, decision, source)
    └── ...
```

**`CONTEXT.md`**: the one-page summary of what this project is, who's involved, what conventions apply, what the AI should never do. The keystone. Every agent or recipe you run on this project starts by reading this file.

**`INDEX.md`** — the catalog of every page in `pages/`. One line per page, with a brief description. The agent reads this *first* on every query, to know which pages are worth opening.

**`LOG.md`** — the append-only journal. Date-stamped entries for every meaningful event. Searchable forever. *"What did we decide about the new vendor in February?"* — `LOG.md` has the answer with one search.

**`pages/`** — individual pages, one per concept. A page about a decision. A page about a vendor. A page about a recurring meeting series. A page about an open question. Each page is short (under 200 lines is the rule); long pages get split.

That's the entire structure. Four files-and-a-folder. Every wiki you'll see — the elaborate ones in N.2 through N.4, the minimum-viable one in N.7 — is a more elaborate version of this same shape.

---

## The hour, broken down

Roughly:

- **Minutes 0–5:** create the structure.
- **Minutes 5–25:** fill in `CONTEXT.md`.
- **Minutes 25–40:** ingest one real source.
- **Minutes 40–55:** run a real query, file the answer back.
- **Minutes 55–60:** schedule the weekly lint pass.

If you're following the more developer-shaped recipe in [Appendix N.7](../../appendices/N-methodologies/N7-minimum-viable-wiki.md), this version of the recipe is the same shape with non-coding tools. Pick whichever surface fits your daily-driver — the discipline is identical.

---

## Step 1 — Create the structure (5 minutes)

In Drive (or Notion, or your Cowork folder) create a new folder for the project. Inside it, create three empty files: `CONTEXT.md`, `INDEX.md`, `LOG.md`. And a sub-folder called `pages/`.

Initial contents for `INDEX.md`:

```markdown
# Knowledge Base — Index

Catalog of every page in this project's KB. Read this first before any query.

## Pages

(none yet — pages will be added by the AI as they're filed)
```

Initial contents for `LOG.md`:

```markdown
# Knowledge Base — Log

Append-only journal of meaningful events.

## [YYYY-MM-DD] init | KB structure created
```

(Replace the date.)

You now have the bones. We'll give them a brain in the next step.

---

## Step 2 — Fill in `CONTEXT.md` (20 minutes)

This is the keystone. Spend the time. The act of filling it in is itself most of the value.

A useful template, adapted for ops/PM work:

```markdown
# CONTEXT — [Project / Workstream Name]

## What this is
(One paragraph: what is this project or workstream? What's its purpose?
What are we trying to make true that isn't true today?)

## Who's involved
(Roles, not names — names rotate. Who owns it. Who reviews. Who's the customer.
Who decides on what kinds of questions.)

## What's at stake
(Why is this important? What changes if it succeeds? What's lost if it fails?
The motivation matters because the AI will draw on it when reasoning.)

## Where things live
- Project folder: [link]
- Tracker / dashboard: [link]
- Discussion channel(s): [list]
- Meeting series: [list]
- Knowledge base: this folder

## How the KB works (instructions for the AI)

When I ask a question:
1. Read INDEX.md first.
2. Find the relevant pages in pages/ and read them.
3. Answer the question, citing which pages you drew on.
4. If the answer is good (reusable, non-trivial), file it back as a new page
   in pages/, link it from INDEX.md, and add a line to LOG.md.

When I share a new source (a meeting, a thread, a doc):
1. Read the source.
2. Decide which existing pages it should update.
3. Update those pages cleanly (refactor, don't append).
4. Create new pages where needed.
5. Update INDEX.md.
6. Add a single line to LOG.md: ## [YYYY-MM-DD] ingest | <source title>.

When I ask you to lint:
1. Scan INDEX.md and the pages.
2. Surface contradictions, orphan pages, stale claims, missing log entries.
3. Don't fix anything yourself. Surface; I adjudicate.

## Conventions

### Tone / voice
(Describe how prose should read. Direct? Plain? List words to avoid, words to use.)

### Page naming
(How should pages be named? Kebab-case? Specific topic prefixes?)

### What NEVER goes into the KB
- Customer PII (names, emails, phone numbers, account IDs)
- Internal-only legal language
- Anything you'd be uncomfortable seeing in a forwarded email
- Credentials or tokens of any kind

The AI will obey this stringently. If in doubt, leave it out.

## Out of scope
(What this project is NOT. Useful for keeping the AI from drifting into
adjacent areas when asked tangential questions.)
```

Spend the 20 minutes. By the end you'll have caught at least two decisions you'd been hand-waving about (every project has them). Save and commit.

The 200-line rule still applies — if your `CONTEXT.md` is much over 200 lines, you have two projects pretending to be one.

---

## Step 3 — Ingest one real source (15 minutes)

Pick a source. Something with substance: a meeting transcript from the project, a long Slack thread, a brief, a research note, a customer interview transcript. Not the project README; that's not yet a *source*.

In your daily-driver AI surface (Cowork pointed at the project folder, or Claude.ai with the connector that reaches the source):

> "Read the schema at `CONTEXT.md`. Then ingest this source [paste content or paste a link the AI can read]:
>
> Per the schema's ingest rules: identify which pages it should update, create new pages where needed, update `INDEX.md`, and add a `LOG.md` entry."

The first time, there are no existing pages — the AI will create new ones. Watch what it creates. The names of the pages tell you whether your `CONTEXT.md` is dialled-in. If the AI creates pages with vague names (`general-notes.md`, `info.md`), tighten the page-naming convention in `CONTEXT.md` and re-ingest. If the names are specific (`decision-vendor-shortlist-2026-04.md`, `customer-interview-merchant-onboarding.md`), the schema is doing its job.

Read what got written. Edit anything off. Don't *rewrite* — let the AI hold the pen, but tell it where to push harder.

---

## Step 4 — Run a real query, file back (15 minutes)

Now run a real question. Something you'd actually have asked the AI today.

> "Look at `INDEX.md` and the pages relevant to my question. Then answer this: [your real question]. Cite the pages you drew on.
>
> If your answer is good (reusable for future-me) file it back per the schema: a new page in `pages/`, an update to `INDEX.md`, a line in `LOG.md`."

The first question should be one whose answer would help future-you. *"What's our current thinking on vendor selection?"* is good. *"What time is it?"* is bad. The reusability is the test.

Read the answer. Read the page that got filed. *Notice the compounding starting*: your second question, even five minutes later, will draw on the just-filed page.

---

## Step 5 — Schedule the lint pass and walk away (5 minutes)

Open your calendar. Create a recurring weekly 10-minute block called *"KB lint."* Pick a slot you'll actually keep. *This single calendar entry is the difference between a wiki that stays trustworthy and one that doesn't.*

The lint pass, when it fires:

> "Run a lint pass on the KB. Surface contradictions, orphan pages, stale claims (pages not updated in 90+ days), and any updates to pages that didn't get a `LOG.md` entry. Don't fix anything; just surface. I'll adjudicate."

You read the output, decide what to fix, and adjudicate. Sometimes you delete a page. Sometimes you update a stale claim. Sometimes you reconcile a contradiction. Five to ten minutes a week. The wiki stays honest because *something is watching it*, and that something is now the AI surfacing decay for you.

Walk away. The first hour is done.

---

## What changes between week 1 and week 8

Week 1 feels like overhead. You're typing more around the AI, not less. *That's expected.* The compounding is mathematical, not motivational — week 1 is the investment phase.

By week 3 you have 10–20 pages in the wiki, mostly filed back from queries. You start *expecting* the AI to know things. You stop re-pasting context. You catch yourself ending prompts with *"file the answer back"* without thinking about it.

By week 8:

- **Re-entry test.** Take a few days off from the project. Come back, ask *"where was I? what's open? what should I pick up first?"* — and the answer is genuinely useful. Five minutes back in flow, instead of an hour.
- **Teammate test.** If you've shared the wiki, watch what happens when a teammate uses it. Your `CONTEXT.md` is now deciding their interactions too. The wiki is a team artefact, not just a personal one.
- **Surprising find.** The wiki surfaces something the AI knew but you'd forgotten — a decision from week 4, a vendor's specific quirk you'd flagged. *That moment* is when the wiki has fully earned its keep.

This is when it lands. Not before; not by accident.

---

## How this connects to the boss fight

If you've been working through Ops 101 in order, your boss fight has probably been a triage / generation / ticket / agent automation. The wiki is *not* a replacement for any of those — it's the *substrate they all run better on*.

Two suggestions:

- **Build your wiki in parallel with whatever your boss-fight automation is.** They reinforce each other. The agent's prompts get sharper because the wiki has more context; the wiki gets sharper because the agent's queries file back into it.
- **Document the wiki itself in your boss-fight retro.** When you contribute a recipe back to the recipe library at the end of the boss fight, include the `CONTEXT.md` template you used and a short note on what conventions worked best. That's the part that *transfers across teams*; specific recipes are personal, but the wiki structure is universal.

---

## A small caveat for shared wikis

If the wiki is being shared across more than one teammate, two extra disciplines kick in:

- **Decide who owns `CONTEXT.md`.** It can't be edited by everyone whenever they want; that's how schemas get inconsistent. Pick one owner; others propose changes, the owner approves.
- **Decide who runs lint.** It can be the same person who owns `CONTEXT.md` or someone else; the point is that *one named person owns the discipline*. Without ownership, the lint pass gets skipped, the wiki rots, the team distrusts it, and you're back to a graveyard.

Shared wikis compound much harder than personal ones (the value scales with the number of teammates contributing) but only if the discipline scales too. Pick the owner first, then start filling.

---

## What you should carry forward

- A wiki is **`CONTEXT.md` + `INDEX.md` + `LOG.md` + `pages/`.** Four files plus a folder.
- **`CONTEXT.md` is the keystone.** The 20 minutes you spend filling it in is itself most of the value.
- **The three habits are ingest, query-and-file-back, lint.** Each one is a sentence at the end of an existing prompt; together they're how the wiki grows.
- The compounding is delayed (week 1 feels like overhead) but real (week 8 is when it lands).
- A shared wiki needs a named owner for `CONTEXT.md` and for the weekly lint pass. Without ownership, it rots.
- This chapter closes Ops 101. You can stop here: the boss fight (if you've completed it), the wiki (if you've stood it up), and the seven prior chapters are a coherent on-ramp into AI-leveraged work that doesn't require any code.
- If you want to graduate to *coding* AI work next, the natural next step is the [Prologue](../../prologue/README.md), which orients you to the developer side. White Belt picks up from there.

---

**Previous:** [← 0B.7 Lightweight agents](07-lightweight-agents.md) · **Next:** [→ Ops 101 quests + boss fight](README.md) — or start the [Prologue](../../prologue/README.md)

**Further reading**
- [Prologue §0.7 — Operating Principles](../../prologue/07-operating-principles.md) — the philosophical version of this chapter, set up earlier in the playbook
- [Appendix N.1 — KB-driven development](../../appendices/N-methodologies/N1-kb-driven-development.md) — the long-form discipline; if you're hooked, this is where to go deeper
- [Appendix N.7 — The minimum viable wiki](../../appendices/N-methodologies/N7-minimum-viable-wiki.md) — the developer-shaped version of this recipe; same shape, different harness
- [Karpathy's LLM Wiki gist](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f) — the manifesto that named this pattern
