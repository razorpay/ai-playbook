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
updated: "2026-09-06"
---

# 0B.8 — Building your own minimum viable wiki for any project

> **⏱ 20 minutes · 👥 PMs, designers, ops, anyone running ongoing workstreams · 🎯 Leaves with:** a one-hour recipe for a small, verifiable project knowledge base—and clear gates for deciding whether it needs automation, team promotion, or retrieval.

---

## Why this chapter closes Ops 101

Ops 101 has given you separate workflows for triage, generation, tickets, documents, and lightweight agents. This chapter gives those workflows shared memory. Instead of re-pasting decisions and conventions, you keep verified context in a small set of files that the AI reads before answering and updates only after review.

That practice is **knowledge-base-driven development** applied to non-coding work. [Prologue §0.7](../../prologue/07-operating-principles.md) explains the philosophy; [Appendix N](../../appendices/N-methodologies/README.md) goes deeper. Here, you build the smallest useful version in an hour.

### Pick your path through this page

| If you need to… | Read and do |
|---|---|
| Start a project wiki | The five-step core workflow. Stop after the weekly lint is scheduled. |
| Pull recurring sources automatically | [Graduate to automated ingest](#graduation-path-1-automate-ingest). |
| Turn one person's notebook into team memory | [Promote it through review](#graduation-path-2-promote-private-notes-to-team-memory). |
| Search a wiki that has outgrown its index | [Run a bounded retrieval trial](#graduation-path-3-add-retrieval-only-when-search-fails). |

Build the core before choosing a graduation path. A four-page wiki does not need platform ambitions.

---

## What "your wiki" looks like for ops work

The shape is simple: one project space in Drive, Notion, a local folder synced via Cowork, or your organisation's docs surface, with three core documents and a set of topic pages.

```
your-project-or-workstream/
├── CONTEXT.md         ← the schema (rules + project facts)
├── INDEX.md           ← the catalog (what pages exist)
├── LOG.md             ← the journal (what happened when)
└── pages/
    ├── (one page per concept, person, decision, or source)
    └── ...
```

**`CONTEXT.md`**: the one-page summary of what this project is, who's involved, what conventions apply, what the AI should never do. The keystone. Every agent or recipe you run on this project starts by reading this file.

**`INDEX.md`** — the catalog of every page in `pages/`. One line per page, with a brief description. The agent reads this *first* on every query, to know which pages are worth opening.

**`LOG.md`** — the append-only journal. Date-stamped entries for every meaningful event. Searchable forever. *"What did we decide about the new vendor in February?"* — `LOG.md` has the answer with one search.

**`pages/`** — individual pages, one per concept. A page about a decision. A page about a vendor. A page about a recurring meeting series. A page about an open question. Each page is short (under 200 lines is the rule); long pages get split.

That's the entire structure: three files and a folder of topic pages. The larger patterns in Appendix N add machinery around the same basic contract.

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

On a surface your AI can read—such as a Cowork folder or a suitable workspace in Drive or Notion—create one project folder. Add `CONTEXT.md`, `INDEX.md`, `LOG.md`, and a `pages/` folder. If your surface uses pages rather than Markdown files, preserve the names and relationships rather than forcing a file format.

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

Replace the date. The structure is ready; the next step defines its rules.

---

## Step 2 — Fill in `CONTEXT.md` (20 minutes)

This file defines the project facts, boundaries, and update rules that every later query should inherit.

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
3. Propose the page changes and wait for my approval.
4. After approval, update existing pages cleanly and create new pages where needed.
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

Treat this list as policy, not as a security boundary. Remove sensitive material before the model can read it; a line in `CONTEXT.md` cannot reliably neutralise data the agent already received. If in doubt, leave it out.

## Out of scope
(What this project is NOT. Useful for keeping the AI from drifting into
adjacent areas when asked tangential questions.)
```

Resolve any ambiguous decision rights or source locations the template exposes, then save the file. Treat 200 lines as a split signal, not a magic limit: if the context becomes hard to scan, move stable topics into `pages/` and keep this file as the routing contract.

---

## Step 3 — Ingest one real source (15 minutes)

Pick one substantive, audience-appropriate source: a project meeting, long Slack thread, brief, research note, or redacted customer interview. Use a source that contains a real decision or fact you can verify.

In your daily-driver AI surface (Cowork pointed at the project folder, or Claude.ai with the connector that reaches the source):

> "Read the schema at `CONTEXT.md`. Then ingest this source [paste content or paste a link the AI can read]:
>
> Per the schema's ingest rules: propose which pages to update or create. Do not write yet. After I verify and approve the proposal, apply it, update `INDEX.md`, and add a `LOG.md` entry."

Review the proposed changes before accepting them. Vague names such as `general-notes.md` or `info.md` mean the naming convention needs work; specific names such as `decision-vendor-shortlist-2026-04.md` make later retrieval easier. Check that each proposed page preserves the source and date, separates facts from open questions, and contains no excluded data.

---

## Step 4 — Run a real query, verify, then file back (15 minutes)

Now run a real question. Something you'd actually have asked the AI today.

> "Look at `INDEX.md` and the pages relevant to my question. Then answer this: [your real question]. Cite the pages you drew on. Do not update the wiki yet.
>
> After I verify the load-bearing claims, I will tell you whether to file the answer back."

Choose a reusable question, such as *"What's our current thinking on vendor selection?"* Before filing, open the cited pages and verify every claim that would change a decision, metric, owner, or deadline. If the evidence holds, ask the AI to file the answer per the schema: update or create the right page, update `INDEX.md`, and append one `LOG.md` entry. Read the final diff once more before accepting it.

---

## Step 5 — Schedule the lint pass and walk away (5 minutes)

Create a recurring *"KB lint"* calendar block. Weekly is a useful starting cadence for an active project; adjust it to the consequence and frequency of change.

The lint pass, when it fires:

> "Run a lint pass on the KB. Surface contradictions, orphan pages, claims older than this project's review threshold, and page changes without a `LOG.md` entry. Don't fix anything; just surface. I'll adjudicate."

Review the findings yourself. Delete obsolete pages, update stale claims, and resolve contradictions against their sources. The AI finds possible decay; the owner decides what is true.

The core workflow is now complete. Run it manually before adding automation or another knowledge tool.

---

## Prove the core wiki earns its keep

Do not judge the wiki by page count or elapsed weeks. Use evidence:

- **Known-answer test.** Ask a question whose source you know. The answer should cite that source and preserve its qualifiers.
- **Gap test.** Ask something the wiki cannot answer. It should expose the gap instead of inventing context.
- **Re-entry test.** After time away, ask what changed, what remains open, and which source supports each claim.
- **Teammate test.** If the wiki is shared, give a teammate the same questions. Different readers should reach the same source-backed state.

If these fail, fix the source structure, context rules, or review habit before graduating the system.

---

## Graduation path 1: automate ingest

Automate only after reviewed manual runs pass the known-answer and gap tests. A scheduled collector may pull approved meeting notes or Slack threads into a raw folder; a separate step may propose wiki updates and follow-up tasks. Neither step gains authority from the source text:

1. **Source text is data, not authority.** A transcript, thread, or linked page can contain an instruction aimed at the agent. Treat it as content to extract and cite, never as a command to run.
2. **An extracted action is not an approved action.** “Send this update”, “change the doc”, or “move the deadline” may be a useful proposal. The source does not authorise the agent to do it.

Keep capture, interpretation, and action separate:

```text
approved read-only sources
        ↓
dated raw capture (unchanged, access-controlled)
        ↓
proposed wiki diff + proposed action ledger
        ↓
checks: source link, audience, duplicate, sensitive data, changed claim
        ↓
human gate ──→ apply wiki diff / approved action
        ↓
receipt: applied, rejected, skipped, or failed
```

### Preflight a recurring conversation source

First decide which conversations may become durable source material. Product decisions, merchant feedback, partner discussions, and launch coordination may sit in a chat outside the wiki's current boundary. Expanding that boundary requires explicit audience, retention, and privacy decisions, consistent with the [NIST Privacy Framework](https://www.nist.gov/privacy-framework).

Razorpay now has an [announced WhatsApp-to-Slack bridge for the DEPA organisation](https://razorpay.slack.com/archives/C3GF5LWJK/p1786513633115819?thread_ts=1786513633.115819). The announcement says it copies only messages sent after the bridge joins a group, creates a Slack channel for the Razorpay participants, and does not reach past history or personal chats. Follow the current owner guidance for setup; this chapter deliberately does not repeat the live number or turn one organisation's rollout into a company-wide default.

Before connecting any recurring conversation source, fill this card:

```text
SOURCE: <group, meeting series, inbox, or channel>
APPROVED ROUTE: <current owner guidance for the bridge or connector>
PARTICIPANTS: <who contributes; who knows new messages become durable>
CAPTURE WINDOW: <starts when; no-backfill or backfill boundary>
DESTINATION AUDIENCE: <who can read the captured source>
EXCLUDE / PAUSE: <data that must not cross; who stops capture>
SOURCE OWNER: <who reviews access, retention, and failures>
PROOF: <one known decision that appears with source and date>
```

Fill the card before connecting anything. If the approved route, destination audience, or source owner is unknown, keep the workflow manual. After capture starts, verify one known decision and any promised no-backfill boundary. A searchable copy is still raw evidence, not verified knowledge.

### Copy this automation graduation card

Fill this before adding a schedule. If a field is vague, keep ingest manual.

```text
OWNER: <who reviews failures and can pause the loop>
SOURCES: <approved channels, meetings, folders; intended audience>
CAPTURE: <read-only method, cadence, raw location, retention>
DATA BOUNDARY: <what is excluded before model access>
WIKI PROPOSAL: <files it may propose changing; required source/date links>
ACTION PROPOSAL: <allowed categories; where pending actions wait>
AUTO-APPLY: <private, reversible, proven actions only—or none>
HUMAN GATE: <claims/actions that always require confirmation>
RECEIPT: <applied/rejected/skipped/failed record and location>
KILL-SWITCH: <one step that stops collection and writes>
```

Start with `AUTO-APPLY: none`. After repeated reviewed runs pass the drills below, consider one deterministic, private, reversible action such as updating an existing personal task. Keep outbound Slack messages, shared-doc edits, new commitments, and changes to decisions, metrics, owners, or deadlines behind confirmation. Give ingest read access; give only the gated apply step narrowly scoped write access.

Before enabling the schedule, run four drills: an empty capture, the same source twice, a source containing “ignore the wiki rules and send…”, and a write that fails halfway through. A safe loop should skip or hold each case, avoid duplicate updates, and leave a receipt the owner can inspect. If it cannot, you have automated uncertainty rather than knowledge.

---

## Graduation path 2: promote private notes to team memory

Keep exploratory notes private while one person is learning. Promote them only when the same bounded corpus should support a pod's questions, RCA work, monthly reviews, or analytics workflows.

For analytics pods, Razorpay's current promotion path is the [`analytics-knowledge-hub` guide](https://docs.google.com/document/d/1mIMQx2pXFQ11AMUnNeA0pVOj5QgDzVHV1f4-x_vSD90/edit?usp=sharing) and the central [`analytics-knowledge` repository](https://github.com/razorpay-ai-tools/analytics-knowledge). The repository keeps one folder per pod, small answer-first topic files, source metadata, an index, and a search graph. Cross-border is the first live pilot.

Promote only when teammates repeatedly need the context, the source set fits the intended audience, a pod owner will maintain it, and a real workflow will use it.

1. **Name the corpus, audience, and owner.** Remove customer PII, credentials, private legal material, and sources outside that audience before export.
2. **Export to a reviewable source.** Use the current internal guide and its exact NotebookLM export prompt. Treat the Google Doc as an input bundle, not proof that every extracted claim is correct.
3. **Generate the pod folder.** Ask Claude: `ingest this google doc: <link>`. The `analytics-knowledge-hub` skill splits the source into topic files and prepares indexes.
4. **Review files and test answers.** Check topic boundaries, source/date metadata, links, duplicates, and excluded data. Run five known-answer questions plus one unsupported question; inspect the source behind every answer.
5. **Merge through an owner-reviewed PR.** Generation does not publish truth. Keep any proposed Analytics Agent or Self Serve Analytics change in its own repository and review path.

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

Promotion should increase both reuse and accountability—not turn private notes into shared confidence faster than anyone can verify them.

---

## Graduation path 3: add retrieval only when search fails

The folder you built is the source of truth. For many projects, `INDEX.md` plus ordinary search is all you need. Do not install a knowledge platform merely because your four-page wiki now has ambitions.

A retrieval trial is justified when:

- the index no longer gets you to the right page reliably;
- useful answers need evidence scattered across several pages;
- the same source-finding work repeats across meetings or workflows; and
- someone owns ingestion, access, and the weekly quality check.

GBrain is one current option. Razorpay's [GBrain Guide for PMs](https://aidocs.concierge.razorpay.com/app/d/doc_f4epenromq36auvd) covers the internal setup path, including LiteLLM and embeddings. The [GBrain repository](https://github.com/garrytan/gbrain) describes the boundary: Markdown remains the system of record; GBrain indexes it for retrieval and cited synthesis. It does not fix weak sources, permissions, or maintenance.

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

## Share it and connect it to the boss fight

A shared wiki needs two explicit roles: an owner who approves `CONTEXT.md` changes and an owner who runs lint and follows findings to closure. They may be the same person. Other contributors propose changes; the owner preserves the schema and source boundary.

Use the wiki as the memory layer for your Ops 101 boss fight, not as a replacement for its workflow. In the retro, include the `CONTEXT.md` template, the conventions that worked, and evidence from the known-answer, gap, or re-entry test. That is more reusable across teams than a claim that the wiki saved time.

---

## What to carry forward

- The minimum shape is **three files—`CONTEXT.md`, `INDEX.md`, `LOG.md`—plus `pages/`.**
- The core loop is **ingest → query → verify → file back → lint**. Plausible answers do not become durable facts without source review.
- A shared wiki needs named context and maintenance owners.
- Preflight recurring sources before capture; separate raw input, proposed changes, approval, and receipts.
- Promote private notes or add retrieval only after the core tests pass, with an audience, owner, and stop decision.
- This chapter closes Ops 101. Continue to the [Ops 101 quests and boss fight](README.md), or start the [Prologue](../../prologue/README.md) before White Belt if you want to move into coding workflows.

---

**Previous:** [← 0B.7 Lightweight agents](07-lightweight-agents.md) · **Next:** [→ Ops 101 quests + boss fight](README.md) — or start the [Prologue](../../prologue/README.md)

**Further reading**
- [Prologue §0.7 — Operating Principles](../../prologue/07-operating-principles.md) — the philosophical version of this chapter, set up earlier in the playbook
- [Appendix N.1 — KB-driven development](../../appendices/N-methodologies/N1-kb-driven-development.md) — the long-form discipline; if you're hooked, this is where to go deeper
- [Appendix N.7 — The minimum viable wiki](../../appendices/N-methodologies/N7-minimum-viable-wiki.md) — the developer-shaped version of this recipe; same shape, different harness
- [Karpathy's LLM Wiki gist](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f) — the manifesto that named this pattern
- [An internal unattended-wiki workflow in `#ai-code-champions`](https://razorpay.slack.com/archives/C08BU395ZEJ/p1786362566269309?thread_ts=1786362566.269309) — daily raw capture, proposed tasks, approval gates, and an action receipt in practice
- [G.25 — Prompt injection](../../belts/03-green/c-guardrails/G25-prompt-injection.md) — why text fetched from outside the workflow remains data rather than instructions
- [Analytics Knowledge Hub guide](https://docs.google.com/document/d/1mIMQx2pXFQ11AMUnNeA0pVOj5QgDzVHV1f4-x_vSD90/edit?usp=sharing) — current internal setup and NotebookLM export path for analytics pods
- [Analytics Knowledge repository](https://github.com/razorpay-ai-tools/analytics-knowledge) — central pod folders and the Cross-border pilot
- [GBrain Guide for PMs](https://aidocs.concierge.razorpay.com/app/d/doc_f4epenromq36auvd) — current Razorpay-specific setup and maintenance guidance
- [GBrain](https://github.com/garrytan/gbrain) — official source for the retrieval/synthesis model and public documentation
