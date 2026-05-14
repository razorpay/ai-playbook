---
title: "Knowledge-base-driven development as a discipline"
slug: "appendices/methodologies/kb-driven-development"
section: "appendices"
status: "drafted"
type: "chapter"
track: "methodologies"
order: 1
time_minutes: 15
audience: "engineer"
outcome: "Understand the discipline behind accumulating context instead of re-deriving it."
prev: "appendices/methodologies"
next: "appendices/methodologies/gstack"
pillar: null
belt: null
tags: ["appendix", "knowledge-base"]
updated: "2026-04-26"
---

# N.1 — Knowledge-base-driven development as a discipline

> **What this section is.** The long-form version of the §0.7 thesis. Same idea (*don't re-derive context, accumulate it*) explored deeply enough to be load-bearing for the framework profiles in N.2–N.4 and the rubric in N.8.

---

## The pattern, named

Most AI-coding failures are context failures.

Not prompt failures. Prompt failures are real, but the field has gotten quite good at fixing them: there are dozens of "prompt engineering" books and courses, the techniques are stable, and good prompts can be coached in an afternoon. Not model failures either. The model is whatever it is at any given moment, and almost no team's bottleneck is "the model isn't smart enough." The bottleneck, in 2026, is *context*: what the model knows about your repo, your team, your conventions, your prior decisions, your half-finished thinking from last Tuesday.

Context exists somewhere. It exists in someone's head. In a Slack thread. In a comment on a closed PR. In the README of a repo three branches over. In the meeting notes from a sprint two months ago. Pieces of context exist in dozens of places, none of them connected to each other, and *none of them connected to the model* until you laboriously paste them into a prompt.

That re-pasting tax is the cost we're trying to make go away. Every minute you spend telling Claude *"by the way, our checkout flow uses these three Blade components, the test fixtures live here, we tried this approach last quarter and it didn't work because…"* is a minute you've already spent before, with a different teammate or in a different session. It's a minute you'll spend again next time, because you didn't write it down anywhere durable, because writing it down felt like overhead at the time.

The discipline of **knowledge-base-driven development** is the practice of *making writing it down cheaper than re-pasting it*. That's the whole game. Once writing-it-down is cheap enough, accumulation beats re-derivation, and your AI work compounds instead of resetting at every prompt.

---

## What it is, in one paragraph

Knowledge-base-driven development is the practice of treating *the structured context you accumulate around a project* (files, links, conventions, decisions, learnings, dead ends) as a first-class artefact, *maintained by the AI in collaboration with you*, and used as the primary input to every future AI interaction on the project. The KB is not "documentation" in the old sense (a thing you write under duress for the next person). It is a working artefact that you and the AI both edit, that gets sharper every time it's used, and that pays back the upfront work it costs by *eliminating the need to re-establish context every time you work on the project*.

The four practical commitments are:

1. **Every project has a knowledge base.** A file or folder. Named, structured, in version control where possible. Not a habit; a deliverable.
2. **The AI maintains it.** When you query and get a good answer, you ask the AI to file it back. When a new source matters, you ask the AI to ingest it. The bookkeeping work that doomed every prior attempt at "shared knowledge" is now near-zero, because the LLM does it.
3. **Every AI interaction reads it first.** A schema file (CLAUDE.md or AGENTS.md) ensures that any new session loads the project's accumulated context before doing anything else.
4. **Maintenance is a habit, not a project.** The KB stays current because keeping it current is a five-minute weekly hygiene pass, not a quarterly migration.

Each of those commitments is small. The discipline is in doing all four consistently for one project, end to end, until you can feel the compounding.

---

## Why this is happening now (and not in 2015, or 2020)

Pattern-named-now-but-not-before is suspicious unless you can explain why. There are three reasons knowledge-base-driven development became a *practice* in 2025–2026 rather than the previous decade:

**The maintenance cost is finally near zero.** The original Memex pitch (Vannevar Bush, 1945 — Karpathy's lineage in N.4) failed not because the *idea* was wrong but because nobody had time to be the librarian. Every "shared knowledge base" project from 1990 to 2020 failed for the same reason. The AI is the librarian we never had. It will, on request, read every source, write every cross-reference, and keep every page up to date — for the cost of typing one sentence. That's the unlock.

**Context windows are finally large enough.** A 2018-era model could hold about a thousand words in mind. You couldn't fit a CLAUDE.md schema, an index.md, three relevant pages, and the user's actual question into that — and even if you could, there'd be no room for the answer. A modern 200K-token context window can comfortably absorb the entire structured context of a medium-sized project plus your question plus a long answer. The cost of *consulting* the KB is now negligible.

**The harness is finally good.** Reading and writing files programmatically, running shell commands, calling out to other tools (the third pillar of Simon Willison's three-pillar frame, in N.5) — these were research projects until quite recently. Now Claude Code can edit a `log.md` file, append a new wiki page, and do an `index.md` lint pass without ceremony. The KB-as-files pattern only works when the harness can manipulate files reliably. We're past that threshold.

The pattern *exists now* because all three of those moved at the same time. Each individually wouldn't have been enough.

---

## What "knowledge base" actually means in this discipline

You'll see different communities use different shapes for the KB. They share more than they differ. Roughly:

**A schema file.** This is the keystone. It's named `CLAUDE.md` if your harness is Claude Code; `AGENTS.md` if your harness is Codex; sometimes both. Karpathy calls this "the most important file in the system." It encodes the rules of how the project's KB is organised and how the AI should interact with it. Without a schema file, the AI has to guess; with one, it can follow your conventions.

**A catalog file.** Almost always called `index.md`. The list of every page or document in the KB, with one-line descriptions. The AI reads this *first* on any new query — it's the table of contents for the room. If `index.md` is well-maintained, the AI can locate the relevant page in one hop instead of fishing.

**A journal file.** Almost always called `log.md`. Append-only. Date-stamped entries for everything meaningful that's happened: a decision, an ingest, an edit, a milestone. Greppable. The audit trail that makes the KB self-explainable months later. *"Why did we set the flag to false?"* — `grep` `log.md` for "flag", read the entry from May, you have your answer.

**Pages.** Markdown files, one per concept, person, decision, source, or chunk of structured information. Linked to each other and to `index.md`. These are what the AI reads to answer queries. They're also what gets *filed back* when a query produces a good answer.

**Sources.** The raw inputs the AI ingests but never edits: a meeting transcript, a Slack thread, a competitor's blog post, a research paper. The pages summarise and cross-reference these; the sources stay immutable.

The shapes vary. gstack uses a `~/.claude/skills/gstack/` folder of specialised role-skills plus an MCP-exposed KB called GBrain. GSD uses a `.planning/` directory with a `STATE.md` for cross-session memory and per-phase context files. Karpathy's pattern uses a top-level wiki folder with the catalog and journal as special files. Each is a slightly different way of organising the same five elements above.

---

## The three habits, examined

§0.7 introduced the habits in one line each. Here's what each one really is.

### Ingest

**The habit.** When a new source matters, you ask the AI to *ingest* it: read it, decide which existing pages it touches, update those pages, create new pages if needed, and write a `log.md` entry naming what just happened.

**Why it's the habit, not "save this somewhere."** Sources don't add value just by existing in your KB. The value is in *how they connect to the rest*. A meeting transcript is much less useful as a 90-minute file than as three updates to existing decision pages plus a one-line "decided to adopt approach X" entry in `log.md`. The ingest step is what does that connecting.

**What to ingest.** Decisions made in meetings. Threads where a non-obvious thing got resolved. Documents from other teams that affect your project. Customer interviews. Competitive analyses. Anything you'd otherwise have to re-read in three months when you forget what was decided.

**What *not* to ingest.** Generic reference material that's already searchable elsewhere (the Blade docs, the language reference). FYI threads that don't actually affect your project. Anything that's still in motion — wait until it's settled.

### Query-and-file-back

**The habit.** When you ask the AI a question about the project, you ask it (in the same prompt) to *file the answer back into the KB as a page* if the answer is good. The query is no longer disposable; it becomes a contribution.

**Why it's the habit, not "save the answer somewhere."** The transformation from a one-shot answer into a structured page costs nothing extra in your time — the AI does it. Without this habit, every query is independent; with it, every query that produces a good answer compounds the KB.

**What to file back.** Answers that surprised you. Answers that took the AI a while to assemble. Answers that connect things that weren't obviously connected. Answers about *why* something is the way it is (those are durable; the *what* changes faster).

**What *not* to file back.** Trivial lookups. Answers that were already in the KB and just got re-stated. Anything you suspect might be wrong — better to flag it for verification than to enshrine it.

### Lint

**The habit.** Once a week or so (pick a regular slot) you ask the AI to *lint the KB*: scan for contradictions between pages, orphan pages that nothing links to, stale claims (pages that haven't been touched in 90+ days but reference things that have changed), and any `log.md` entries that should have been but weren't.

**Why it's the habit, not "trust the KB to stay clean."** KBs decay if nothing watches them. The lint pass is the AI's chance to surface decay before you next need to trust the KB. It takes five minutes; the payoff is large.

**What to do with lint output.** Decide. Each flagged item is *your* judgement: should this page be updated, deleted, merged with another? The AI surfaces; you adjudicate. The adjudications themselves are `log.md` entries for next time.

---

## The compounding curve (where the payoff actually shows up)

The honest story about KB-driven development is that the payoff is *delayed but very large*.

In week one, it feels like overhead. You spent half an hour setting up a CLAUDE.md, an index.md, a log.md, and a `.kb/pages/` folder. You used it twice and it took longer than just-prompting-the-AI-from-scratch. You're skeptical.

In week three, it feels neutral. You're using the KB without thinking about it. Some queries are slightly faster because the AI already knew the answer. Others feel about the same.

In week eight, you come back to the project after two weeks of vacation. You ask the AI: *"Where was I? What did we decide last time? What's still open?"* In five minutes you're back in the loop, with full context, ready to ship. *That's* the payoff. You didn't pay the standard "I've been away two weeks" tax.

In month four, a new teammate joins the project. You point them at the project root. They read the CLAUDE.md (200 lines), skim the `index.md`, and within an hour they're useful. You don't need to write an onboarding doc. The KB *is* the onboarding doc.

In month ten, you're running three or four parallel projects, switching between them across days. Each one has its own KB. Each KB has its own AI session memory. Switching contexts now costs you the time it takes to `cd` into the right folder, because the AI rehydrates the project's context the moment you do. You move between projects faster than you used to move between *meetings*.

Each of those moments is the payoff arriving. They're real, they're durable, they're worth more than the upfront investment. But they take *time* to show up. The first user of a KB pattern often gives up at week one because the curve is below the baseline. The reader who pushes through to week eight rarely goes back.

---

## Common failure modes

A few patterns to watch for as you start running this discipline.

**The KB becomes documentation.** It happens slowly. Pages get longer, more comprehensive, more "complete." They start to read like a reference manual instead of a working knowledge base. The AI starts skipping over them because they're long and boring. Fix: keep pages *under 200 lines*. Force yourself to break long pages into smaller ones with cross-references. The KB is for working from, not for reading.

**The KB becomes a graveyard.** You set it up. You used it for two weeks. Then you got busy. Then you forgot about it. Three months later it's frozen in time, full of stale claims, and you stop trusting it. Fix: schedule the lint pass. *It is the single habit that prevents this.* Five minutes a week. Calendar-block it.

**The schema file bloats.** CLAUDE.md starts at 100 useful lines. By month three it's 600 lines, full of edge cases nobody can remember the reasons for. The AI starts ignoring half of it. Fix: aggressive pruning every quarter. *Why* lines stay; *what* lines that aren't referenced anywhere get deleted. Treat CLAUDE.md like code: small, well-factored, well-named.

**The KB is private to one person.** You build a beautiful KB on your laptop. Your teammate doesn't know it exists. When you go on vacation, the team is back to re-deriving everything. Fix: commit the KB to the project repo. *Make sharing the default.* Convince teammates to file back into the same KB. The compounding works much better at team scale than at individual scale.

**The KB is too generic.** Every AI session creates the same five generic pages. Nothing is project-specific enough to be load-bearing. The AI's answers are bland. Fix: ingest *concrete* sources (meeting transcripts, decision threads), not abstract ones. The KB derives its value from the specific shape of *your* project; generic KBs are barely better than no KB.

---

## The single test for whether you've got it

If you can pass this test, you've internalised the discipline:

> *"You're starting work on the project Monday morning, after a week away. You open the project. You haven't checked Slack, email, or the calendar in seven days. In what amount of time can the AI tell you (a) what was decided last week, (b) what's open, (c) what you should pick up first, and (d) what's at risk?"*

Less than five minutes? You've got it. The KB is doing the job.

More than thirty minutes? The KB isn't load-bearing yet. The discipline lives in the gap between five and thirty.

That gap is what every framework profiled in N.2–N.4 is, in its own way, trying to close. They differ in shape, in tone, in vocabulary. They agree on the goal.

---

**Up to:** [↑ Appendix N README](README.md) · **Next:** [→ N.2 — gstack](N2-gstack.md)

**Further reading**
- [Karpathy's LLM Wiki gist](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f) — the manifesto-form version of much of this section
- [Vannevar Bush — *As We May Think* (1945)](https://www.theatlantic.com/magazine/archive/1945/07/as-we-may-think/303881/) — the Memex essay; the great-grandparent of this discipline
- [Simon Willison — designing agentic loops](https://simonwillison.net/2025/Oct/15/designing-agentic-loops/) — the harness side of why this works *now*
