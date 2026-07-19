---
title: "The minimum viable wiki"
slug: "appendices/methodologies/minimum-viable-wiki"
section: "appendices"
status: "drafted"
type: "chapter"
track: "methodologies"
order: 7
time_minutes: 20
audience: "engineer"
outcome: "Stand up a small working wiki with schema, catalog, journal, and pages."
prev: "appendices/methodologies/spec-first"
next: "appendices/methodologies/evaluating-frameworks"
pillar: null
belt: null
tags: ["appendix", "knowledge-base"]
updated: "2026-07-19"
---

# N.7 — The minimum viable wiki: a one-hour stand-up

> **What this section is.** The most concrete, copy-paste-able section in Appendix N. A step-by-step recipe to stand up your own knowledge base in about an hour, distilled from the patterns in N.2 ([gstack](N2-gstack.md)), N.3 ([Get Shit Done](N3-gsd.md)), and N.4 ([the LLM Wiki pattern](N4-llm-wiki.md)). If you've read all the other sections and want *something to do*, this is the section.

---

## What you'll have at the end

After one hour with this recipe:

- A `CLAUDE.md` schema file at the root of your project, ~100 lines of conventions and KB rules.
- A `.kb/` folder with three files (`index.md`, `log.md`, and one starter page) and ready to grow.
- Three habits installed: ingest, query-verify-file-back, lint.
- A first ingested source (a real meeting transcript, doc, or thread) that's already taught the wiki something.

What you won't have: a complete wiki. The wiki *grows* through use. The recipe puts you in position to grow it; the growth itself is months of accumulation.

---

## Before you start

A few prerequisites. Each is small, but skip any one and the recipe wobbles:

- **A project to apply this to.** Not "AI in general" — a specific project or workstream you've been on for a few weeks and expect to stay on for a few more. The KB patterns compound only when there's a *bounded thing* they're accumulating context for.
- **Claude Code installed and working** (or another harness — Codex with `AGENTS.md` works identically, just substitute the schema filename throughout). If you're a non-coder, Cowork pointed at the project folder works perfectly well too.
- **Git, on the project's repo.** The wiki itself is text files; you'll commit them. Without git, the lint pass and the cross-session memory both work, but you lose the audit trail of *who edited what when*.
- **A real source to ingest.** A meeting transcript, a doc, a long Slack thread, a research note. Something with substance — not "the README of the project." The first ingest is what teaches you the rhythm.

If you don't yet have any of these, stop here and come back when you do. The recipe assumes you're already inside a real piece of work.

---

## The hour, broken down

Roughly:

- **Minutes 0–5:** create the files.
- **Minutes 5–25:** write the schema (`CLAUDE.md`).
- **Minutes 25–40:** ingest your first source.
- **Minutes 40–50:** run a query, verify the answer, file it back.
- **Minutes 50–60:** commit the lot, write yourself the calendar block for the weekly lint pass.

That's the whole arc. If you read the rest of this section, follow it, and end the hour on time, you've installed something durable.

---

## Step 1 — Create the files (5 minutes)

In the root of your project, create the following:

```
your-project/
├── CLAUDE.md          ← the schema file (we'll fill it next)
├── .kb/
│   ├── index.md       ← the catalog
│   ├── log.md         ← the journal
│   └── pages/         ← where individual wiki pages live
│       └── (empty for now)
└── (your existing project files)
```

For the empty starter files, put placeholder content so the AI doesn't get confused by blank files:

`.kb/index.md`:
```markdown
# Knowledge Base — Index

This is the catalog of every page in this project's knowledge base.

## Pages

(none yet — pages will be added by the LLM as they're filed)
```

`.kb/log.md`:
```markdown
# Knowledge Base — Log

Append-only journal of meaningful events in this project.

## [YYYY-MM-DD] init | KB structure created
```

(Replace `YYYY-MM-DD` with today's date.)

That's the skeleton. The wiki has bones; we're about to give it a brain.

---

## Step 2 — Write the schema (CLAUDE.md, 20 minutes)

The `CLAUDE.md` is the keystone. It tells every future AI session what's true about this project, what conventions apply, and how to work with the KB.

A useful template structure — adapt to fit:

```markdown
# CLAUDE.md — [Project Name]

## What this project is

(One paragraph: what we're building, why, who it's for, what success looks like.
Be specific. "Building a checkout flow" is too generic. "Building a one-page
checkout for Indian merchants who pay in INR and want UPI as the default option" is right.)

## Who's involved

(Roles, not names: who owns what, who reviews what, who's the customer / user.
This survives team rotations.)

## Where things live

- Code: [paths, repos]
- Docs: [where canonical docs are]
- Discussions: [which Slack channels, which meeting series]
- Knowledge base: `.kb/` (this directory)

## The KB structure (this is for you, the LLM, to follow)

- `.kb/index.md` — catalog of every page. Read this FIRST on any new query.
- `.kb/log.md` — append-only journal. Add a dated line for any meaningful event.
- `.kb/pages/*.md` — individual pages. One concept, person, decision, or source per page.

### When I ingest a source

When I ask you to ingest a new source:
1. Read the source.
2. Identify which existing pages it should update.
3. Update those pages (don't append; refactor them so the new info is integrated cleanly).
4. Create new pages if the source introduces concepts the wiki doesn't have yet.
5. Update `index.md` with any new pages added.
6. Add a single line to `log.md`: `## [YYYY-MM-DD] ingest | <source title>`.

### When I ask a question

When I ask a question:
1. Read `index.md` and the relevant pages.
2. Answer with citations. Do not update the wiki yet.
3. I will verify the load-bearing claims against those sources.
4. Only after I approve, find or create the right page in `.kb/pages/`.
5. File the answer there (or update an existing page).
6. Update `index.md` if a new page was created.
7. Add a line to `log.md`: `## [YYYY-MM-DD] query | <topic>`.

Don't file trivial lookups or unverified claims. File what *future me* would
want to find without re-asking, after its load-bearing claims check out.

### When I ask you to lint

When I ask you to run a lint pass:
1. Read `index.md`.
2. Read every page (or sample if there are >50).
3. Surface, in a structured list:
   - Contradictions between pages
   - Orphan pages (nothing links to them)
   - Stale claims (pages not touched in 90+ days that may be outdated)
   - Missing log entries (pages updated without a corresponding log line)
4. Don't fix anything yourself. Surface; I adjudicate.

## Conventions

### Tone / voice

(Describe how prose in this project should read. Direct? Plain? Playful?
List any words to avoid. List any words to use.)

### File naming

(Conventions for naming pages, branches, commits, anything that needs naming.)

### What NEVER goes into the KB

(Anything sensitive: credentials, customer PII, internal-only legal language, etc.
Be specific. The LLM will obey this stringently.)

## Out-of-scope

(What this project is NOT. Useful for keeping the LLM from wandering when
asked questions that touch adjacent areas.)
```

Spend the 20 minutes filling in each section *for your specific project*. The act of writing the schema is itself half the value — you'll catch decisions you've been hand-waving about. Keep it under 200 lines; if it grows past 200, you have two projects pretending to be one.

---

## Step 3 — Ingest your first source (15 minutes)

Pick a real source. A meeting transcript, a long thread, a brief, a research note. Something with at least 500 words of meaningful content.

In Claude Code (or your harness of choice), open a session in the project directory and run:

> "Read the schema file at `CLAUDE.md`. Then ingest this source [paste content or link]:
>
> Per the schema's ingest rules: identify which pages it should update, create new pages where needed, update `.kb/index.md`, and add a `log.md` entry."

The first time, Claude has no existing pages to update — it'll create new ones. Watch what it creates. The names of the pages it picks will tell you whether your schema is dialled-in. *If the page names are vague (`general-notes.md`, `info.md`), your schema needs to be more opinionated about how pages should be named.* If the page names are specific (`pricing-decision-2026-04.md`, `customer-segmentation.md`), the schema is doing its job.

Read what got written. Edit anything that's off — but don't *rewrite* anything you'd rather have the LLM write. If a page is wrongly structured, fix the schema and re-ingest. The schema is the lever; the pages are the output.

---

## Step 4 — Run a query, verify, and file the answer back (10 minutes)

Now run a real question. Something you'd actually have asked the AI today:

> "Look at the `.kb/index.md` and the relevant pages. Then answer this question: [your real question]. Cite which pages you drew on. Do not update the wiki yet.
>
> After I verify the load-bearing claims, I will tell you whether to file the answer back."

The first question should be one whose answer would help future-you. *"What's our current thinking on pricing?"* is good. *"What time is it?"* is bad. Reusability is the first test. Before filing, open the cited pages and verify the claims that would change a decision, metric, owner, or deadline. If they hold, ask the AI to file the answer as a new page or update to an existing page, then update `index.md` and `log.md` per the schema.

Read the filed page once more. *Notice the compounding starting*: your second question, even five minutes later, will draw on this just-filed, verified page.

---

## Step 5 — Commit, calendar, walk away (10 minutes)

A few minutes of housekeeping that make the difference between an artefact you'll use and one you'll abandon.

**Commit the lot.** `git add CLAUDE.md .kb/` and commit with a message like *"feat: stand up project knowledge base."* The KB is now version-controlled. Every change from here on has an audit trail.

**Calendar the lint pass.** Open your calendar. Create a recurring weekly 10-minute block called *"KB lint pass."* Pick a slot you'll actually keep — Friday afternoon when you're winding down works for most people. *This single calendar entry is the difference between a wiki that stays trustworthy and one that doesn't.*

**Tell your teammates.** Optional but high-leverage. A one-line message in the team channel: *"Stood up a small KB at `.kb/` for [project]. Try `read .kb/index.md` in your next Claude session — should make context-loading faster. Happy to walk anyone through it."* You've just created a positive social pressure on yourself to keep using it.

**Walk away.** The first hour is done. Resist the urge to tinker for another two hours. The recipe earns its keep through *use over weeks*, not through fiddling on day one.

---

## The first week — what to expect

Week one is when most readers get cold feet. Expect:

- **Friction.** It feels like overhead. You're typing more around the AI, not less.
- **Schema revisions.** You'll find your `CLAUDE.md` is wrong on a few points. *Edit it.* The schema is supposed to evolve; that's why we put it in version control.
- **A few "this didn't help me" moments.** A query where the wiki had nothing useful, and re-pasting context would have been faster. Note it. Decide whether the missing page is worth filing back; sometimes yes, sometimes no.
- **One small surprise.** Something the wiki *did* know that you'd otherwise have re-derived. A small one. Maybe a five-minute saving. *That moment* is what week one is for. It's the proof of concept.

Don't expect transformation. Don't expect to be noticeably faster. Week one is the investment phase. The compounding is mathematical, not motivational: it shows up in week three, four, eight.

---

## The first month — the compounding shows up

By the end of week three, the wiki has 10–20 pages in it, mostly verified and filed back from queries. You start *expecting* the AI to know things. You stop re-pasting context. You also learn not to file a plausible answer until its load-bearing claims check out.

Around week four:

- A re-entry test. Take a few days off from the project. Come back, open Claude in the project dir, ask *"where was I? what's open? what should I pick up first?"* — and the answer is genuinely useful. Five minutes back in flow instead of an hour.
- A teammate test. If you've shared the KB, watch what happens when a teammate uses it. The schema you wrote in week one starts deciding their interactions too. *That moment* is when the artefact becomes a team artefact, not a personal one.
- A lint surprise. The first lint pass surfaces a contradiction or stale claim. *That's the discipline working.* Adjudicate, fix, log.

This is when it lands. Not before; not by accident.

---

## When the recipe doesn't fit

A few honest cases where this recipe is the wrong tool.

**One-off projects.** If you're working on something that'll wrap up in a week, the one-hour set-up doesn't pay off. Use the AI conversationally and move on.

**Highly individual creative work.** If your work is purely creative (writing a novel, designing a logo) the AI's role is more muse than collaborator, and a structured KB can stifle the meander. Use a lighter weight tool (a single notes file, an Obsidian vault) instead.

**Work where the AI is mostly just typing for you.** If your AI use is short bursts of "draft this email" / "fix this typo" without sustained context, a wiki is overkill. Use Claude.ai, do the task, move on.

**Work where context isn't recoverable in text.** Some kinds of work — emotionally complex 1:1s, sensitive customer escalations, anything where the value is in the room rather than the artefact — won't compound through a KB. Don't try.

For everything else — most product work, most strategic work, most multi-week engineering projects, most research initiatives — the recipe pays off.

---

## A printable companion

A one-page printable card version of this recipe lives in [Appendix H](../H-reference-cards/). Same five steps, no commentary, no caveats: just the file structure, the schema template, the three habits. Useful for handing to a teammate who's heard you talk about your KB and wants to try one themselves.

---

**Up to:** [↑ Appendix N README](README.md) · **Previous:** [← N.6 Spec-first / agentic-loop design](N6-spec-first.md) · **Next:** [→ N.8 Evaluating new frameworks — a rubric](N8-evaluating-frameworks.md)

**Further reading**
- [Karpathy's LLM Wiki gist](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f) — the most-direct ancestor of the recipe in this section
- [Get Shit Done on GitHub](https://github.com/gsd-build/get-shit-done) — for what a more elaborate wiki structure looks like once you're past minimum viable
- [gstack on GitHub](https://github.com/garrytan/gstack) — for the "skills as roles" extension of the same pattern
- [Obsidian](https://obsidian.md/) — a markdown-first note-taking tool that pairs beautifully with this pattern if you want a visual UI on top of your `.kb/`
