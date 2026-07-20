---
title: "Building your own minimum viable wiki for any project"
slug: "ops-101/minimum-viable-wiki"
section: "foundation"
status: "drafted"
type: "chapter"
track: "ops-101"
order: 8
time_minutes: 30
audience: "pm-designer-ops"
outcome: "Set up a small project wiki that lets AI work with memory instead of repeated context."
prev: "ops-101/lightweight-agents"
next: "ops-101/quest-30-minute-teardown"
pillar: null
belt: null
tags: ["ops-101", "knowledge-base"]
updated: "2026-07-20"
---

# 0B.8 — Building your own minimum viable wiki for any project

> **⏱ 30 minutes · 👥 PMs, designers, ops, anyone running ongoing workstreams · 🎯 Leaves with:** the operating-philosophy capstone of the Ops 101 track — a one-hour recipe for a knowledge base that grows alongside your work and earns its keep across weeks.

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
- **Minutes 40–55:** run a real query, verify the answer, file it back.
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
3. Answer the question, citing which pages you drew on. Do not write yet.
4. I will verify the load-bearing claims against those pages.
5. Only after I approve, file the answer as a page in pages/, link it from
   INDEX.md, and add a line to LOG.md.

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

## Step 4 — Run a real query, verify, then file back (15 minutes)

Now run a real question. Something you'd actually have asked the AI today.

> "Look at `INDEX.md` and the pages relevant to my question. Then answer this: [your real question]. Cite the pages you drew on. Do not update the wiki yet.
>
> After I verify the load-bearing claims, I will tell you whether to file the answer back."

The first question should be one whose answer would help future-you. *"What's our current thinking on vendor selection?"* is good. *"What time is it?"* is bad. Reusability is the first test. Before filing, open the cited pages and verify the claims that would change a decision, metric, owner, or deadline. If they hold, ask the AI to file the answer per the schema: a new page in `pages/`, an update to `INDEX.md`, and a line in `LOG.md`.

Read the filed page once more. *Notice the compounding starting*: your second question, even five minutes later, will draw on the just-filed, verified page.

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

By week 3 you have 10–20 pages in the wiki, mostly verified and filed back from queries. You start *expecting* the AI to know things. You stop re-pasting context. You also learn not to file a plausible answer until its load-bearing claims check out.

By week 8:

- **Re-entry test.** Take a few days off from the project. Come back, ask *"where was I? what's open? what should I pick up first?"* — and the answer is genuinely useful. Five minutes back in flow, instead of an hour.
- **Teammate test.** If you've shared the wiki, watch what happens when a teammate uses it. Your `CONTEXT.md` is now deciding their interactions too. The wiki is a team artefact, not just a personal one.
- **Surprising find.** The wiki surfaces something the AI knew but you'd forgotten — a decision from week 4, a vendor's specific quirk you'd flagged. *That moment* is when the wiki has fully earned its keep.

This is when it lands. Not before; not by accident.

---

## When a private NotebookLM should become team memory

NotebookLM is useful while one person is exploring a bounded set of documents. It becomes a bottleneck when the same context should power a pod's questions, RCA work, monthly reviews, or analytics workflows — but only one person's notebook can use it.

For analytics pods, Razorpay's current promotion path is the [`analytics-knowledge-hub` guide](https://docs.google.com/document/d/1mIMQx2pXFQ11AMUnNeA0pVOj5QgDzVHV1f4-x_vSD90/edit?usp=sharing) and the central [`analytics-knowledge` repository](https://github.com/razorpay-ai-tools/analytics-knowledge). The repository keeps one folder per pod, small answer-first topic files, source metadata, an index, and a search graph. Cross-border is the first live pilot.

Promote a notebook only when:

- teammates repeatedly need the same domain context;
- the source set is appropriate for the whole intended audience;
- a pod owner will review changes and keep the folder current; and
- the knowledge will support a real workflow, not merely make a nicer archive.

### Promote one pod with a review gate

Use the current internal guide for installation and its exact NotebookLM export prompt. The durable workflow is:

1. **Name the corpus and owner.** List the notebook, documents, intended readers, and the role that will approve the generated knowledge files. Remove customer PII, credentials, private legal material, and sources outside that audience before export.
2. **Export to a reviewable source.** Follow the guide to move the notebook's knowledge into a Google Doc. Treat that document as an input bundle, not as proof that every extracted claim is correct.
3. **Ingest through the skill.** Ask Claude: `ingest this google doc: <link>`. The `analytics-knowledge-hub` skill splits the source into topic files and prepares the pod folder and indexes.
4. **Review the generated diff.** Open the files, not just the summary. Check topic boundaries, source and date metadata, links, duplicates, and excluded data. A large clean-looking diff is still a large diff.
5. **Run a known-answer check.** Reuse the [bounded retrieval trial](#run-a-bounded-retrieval-trial) below: five questions with expected sources plus one question the corpus cannot answer. Inspect the source behind each answer and require the missing answer to remain missing.
6. **Merge through a pod PR.** Add the pod folder to `analytics-knowledge` and have the named pod owner review it. The repository becomes shared memory only after that review — generation alone does not publish truth.
7. **Keep downstream changes separate.** If the workflow proposes an Analytics Agent or Self Serve Analytics update, raise and review that in its owning repository. A KB entry may explain a metric; it does not approve the metric definition.

Copy this into the PR description so the review gate survives the demo:

```markdown
## Team KB promotion check — <pod>
- [ ] Intended audience and excluded sources are recorded
- [ ] Generated topic files retain source and date metadata
- [ ] Five known-answer questions surfaced the expected sources
- [ ] One unsupported question was left unanswered
- [ ] Load-bearing metrics, decisions, owners, and dates were checked
- [ ] Pod maintenance owner approved the diff
- [ ] Any SSA or Analytics Agent change is a separate reviewed PR

Decision: Merge / Fix and retest / Stop
```

The failure mode to avoid is turning a private notebook into shared, searchable confidence faster than anyone can verify it. Promotion should improve reuse **and** accountability.

---

## When to add a retrieval layer

The folder you built is the source of truth. For many projects, `INDEX.md` plus ordinary search is all you need. Do not install a knowledge platform merely because your four-page wiki now has ambitions.

A retrieval layer becomes useful when:

- the index no longer gets you to the right page reliably;
- useful answers need evidence scattered across several pages;
- the same source-finding work repeats across meetings or workflows; and
- someone owns ingestion, access, and the weekly quality check.

GBrain is one current option. Razorpay's [GBrain Guide for PMs](https://aidocs.concierge.razorpay.com/app/d/doc_f4epenromq36auvd) covers the internal setup path, including LiteLLM and embeddings. The [GBrain repository](https://github.com/garrytan/gbrain) describes the product boundary: your Markdown repository remains the system of record; GBrain indexes it for raw retrieval and cited synthesis. It does not make source quality, permissions, or maintenance somebody else's problem.

Treat setup as a trial, not a migration.

### Run a bounded retrieval trial

Use one real, non-sensitive project folder and a small known-answer test. You are testing whether retrieval improves your work, not whether installation succeeds.

1. **Freeze the source set.** Use a copy or branch of one wiki. Remove credentials, customer PII, private legal material, and anything outside the intended audience before indexing.
2. **Write five test questions first.** For each question, name the page that contains the answer. Add one question the wiki cannot answer; a trustworthy system should expose that gap rather than improvise.
3. **Follow the internal setup guide.** Use its current Razorpay-specific LiteLLM and embedding steps instead of copying a public provider configuration. Setup changes faster than this playbook should.
4. **Index only the trial folder.** Do not connect Gmail, Slack, Drive, or an automated ingestion pipeline yet. A bounded source set makes a bad result diagnosable.
5. **Test retrieval before synthesis.** Check whether the right source page appears. Then ask for a synthesised answer and inspect every citation. Fluent prose is not a retrieval score.
6. **Test freshness.** Add or correct one fact in the Markdown source, run the guide's update flow, and ask again. If the answer remains stale, the trial has found an ingestion or indexing gap.
7. **Write the decision down.** Adopt, improve and retest, or stop. Record who owns updates and what would make you switch the layer off later.

Use this card so the trial leaves an artefact instead of a vague *"search felt pretty good"* conclusion:

```markdown
# Retrieval trial: <project>

| Question | Expected source | Correct source surfaced? | Answer supported by source? | Notes |
|---|---|---|---|---|
| <known-answer question 1> | <page> | Yes / No | Yes / No | |
| <known-answer question 2> | <page> | Yes / No | Yes / No | |
| <known-answer question 3> | <page> | Yes / No | Yes / No | |
| <known-answer question 4> | <page> | Yes / No | Yes / No | |
| <known-answer question 5> | <page> | Yes / No | Yes / No | |
| <question the wiki cannot answer> | None | N/A | Gap admitted / Invented | |

- Freshness check after one source update: Pass / Fail
- Maintenance owner: <role>
- Decision: Adopt / Improve and retest / Stop
- Why: <one paragraph grounded in the table>
```

Adopt the layer only if it reliably surfaces the right sources for your important questions, keeps citations grounded, reflects updates, and has a maintenance owner. If it fails, fix the Markdown structure or ingestion path before adding more machinery. Retrieval cannot rescue a source set nobody trusts.

### Failure modes to watch

- **Automating ingestion before retrieval works.** More sources make a weak test harder to debug, not more impressive.
- **Treating synthesis as evidence.** The answer is a convenience; the cited page is the evidence. Open it.
- **Indexing beyond the audience.** A technically reachable page is not automatically appropriate to ingest. Preserve the restrictions in `CONTEXT.md`.
- **Replacing the wiki with the index.** Keep edits in Markdown and re-index. If two stores can both become canonical, they eventually disagree.
- **Skipping the owner.** An unattended retrieval layer becomes a faster route to stale context.

The graduation path is intentionally boring: build the folder, prove the habit, test retrieval on known answers, then scale. Boring keeps your knowledge base useful after the demo glow wears off.

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
- **The three habits are ingest, query-verify-file-back, lint.** Together they grow the wiki without turning a plausible answer into durable fiction.
- The compounding is delayed (week 1 feels like overhead) but real (week 8 is when it lands).
- Promote private analytics context into the shared knowledge hub only through source screening, known-answer checks, and a pod-owner-reviewed PR.
- Add a retrieval layer only after a bounded known-answer trial proves that it finds the right sources, stays fresh, and has an owner.
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
- [Analytics Knowledge Hub guide](https://docs.google.com/document/d/1mIMQx2pXFQ11AMUnNeA0pVOj5QgDzVHV1f4-x_vSD90/edit?usp=sharing) — current internal setup and NotebookLM export path for analytics pods
- [Analytics Knowledge repository](https://github.com/razorpay-ai-tools/analytics-knowledge) — central pod folders and the Cross-border pilot
- [GBrain Guide for PMs](https://aidocs.concierge.razorpay.com/app/d/doc_f4epenromq36auvd) — current Razorpay-specific setup and maintenance guidance
- [GBrain](https://github.com/garrytan/gbrain) — official source for the retrieval/synthesis model and public documentation
