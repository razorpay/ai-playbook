---
name: playbook-course
description: Walks a learner through the Razorpay Org-Wide AI Playbook one belt at a time, reading the same Markdown the HTML hub serves and tracking progress in a LEARNER.md file in the working directory. Triggers on phrases like "start the playbook", "start white belt", "continue my belt", "what's next in my belt", "where am I in the playbook", "show my progress", "show my learner state", "claim white belt", or "claim yellow belt". Use when a learner wants a paced, conversational walk through belt content with progress tracking and quest/boss-fight gating that records claims without bypassing Appendix L's reviewer protocol.
---

# Playbook Course

## Overview

This skill is the third consumption surface of the playbook. The first is the raw Markdown source. The second is the HTML hub (Astro Starlight) generated from that Markdown. This skill is the conversational, paced track: a learner says "continue my belt" and gets walked through the next module, with progress tracked in `LEARNER.md` and gating handled at quests and boss fights.

The skill never invents content. It reads `curriculum.json` (generated from `manifest.yml`) to find the next item, opens the chapter Markdown from disk, applies the teaching patterns in `teaching-patterns.md`, and logs the learner's progress in `LEARNER.md`.

## Hard Rules

- Do not invent module content. Read the chapter Markdown from disk.
- Do not skip the eight-section template; walk every section in order.
- Do not store artefact bodies (PRs, screenshots). Store URLs and short notes only.
- Do not write a value that looks like a secret into `LEARNER.md`.
- Do not write a personal name beyond the optional learner handle.
- Do not declare a belt awarded. Awarding is Appendix L's reviewer protocol; the skill only records claims.
- Do not bypass quest prerequisites silently. If the learner skips, log a Notes entry and let them.
- Do not run shell commands or modify files in worked examples without explicit per-command consent.
- Do not silently rewrite a learner's hand edits to `LEARNER.md`.
- Do not pretend Green / Black / Grandmaster are drafted. Until those belts land, the skill says "not yet drafted, come back."

## Inputs

The skill reads, but does not require, the following inputs from the learner:

- a **belt name** ("start white belt", "start yellow belt") — optional; defaults to `current_belt` from `LEARNER.md` if it exists, else asks the learner;
- an **action verb** — implicit in the trigger phrase: "start" (new belt), "continue" (next module), "show" (progress dump), "claim" (quest/boss-fight gating).

The skill always reads `curriculum.json` from the same directory as itself. It always reads chapter Markdown from the playbook repo root.

## Outputs

- **Module walk-through.** The skill applies the section-by-section behaviours from `teaching-patterns.md`. Logs to `LEARNER.md`.
- **Quest claim.** The skill applies the gating from `quest-and-boss-fight-handling.md`. Records URLs and short notes.
- **Boss-fight claim plus badge handoff.** Pre-fills the badge template, surfaces Appendix L's reviewer protocol, marks the boss fight `claimed: yes — submitted: <date>` if the learner sends it on.
- **Progress dump.** "show my progress" prints the relevant belt section of `LEARNER.md` plus a one-line "next is X" pointer.

## Workflow

### Step 1 — Resolve location

1. Look for `LEARNER.md` in the current working directory.
2. If it does not exist, ask the learner whether to create one. If yes, write the bare-bones template from `state-schema.md` with `started: <today>`, empty `learner`, `current_belt: <belt-from-trigger-phrase or unset>`, `last_seen_module: ""`, and the belt's modules listed unchecked.
3. If it exists, read its front-matter and the relevant belt section.

### Step 2 — Load curriculum

1. Read `curriculum.json` from the skill directory.
2. If the requested belt has `status: planned`, tell the learner: "That belt is not yet drafted. Here is what is drafted:" and list the drafted belts. Stop.
3. If `status: drafted`, find the next item per the rules below.

### Step 3 — Decide the next item

The next item is determined in this priority order:

1. If a quest or the boss fight is the natural next step (i.e., all preceding modules are checked and at least one un-claimed quest or boss fight exists), route to the quest/boss-fight handler.
2. Otherwise, find the first unchecked module in `LEARNER.md` for the current belt. That is the next item.
3. If every module, every quest, the boss fight, and the badge are claimed for the current belt, advance `current_belt` to the next drafted belt and route to its README.
4. If no further drafted belt exists, congratulate the learner, show the master index status, and stop.

### Step 4 — Walk the next item

Apply the section-by-section behaviours from `teaching-patterns.md`. Read the chapter Markdown from disk; never paraphrase aloud anything you have not just read. Pace to the chapter's `time_minutes`.

For quests and boss fights, apply the rules from `quest-and-boss-fight-handling.md` instead.

### Step 5 — Log

After every section completed, append the corresponding update to `LEARNER.md`:

- module read → check the box, append `read <date>`;
- self-check colour → append `colour: <colour> (<optional note>)`;
- quest claimed → check the box, append `claimed: yes — date: <date> — evidence: <URL or short note>`;
- boss fight claimed → same shape;
- badge submitted → check the box, append `claimed: yes — date: <date> — submitted: <date>`.

Never reorder or delete prior entries.

### Step 6 — Offer the next step

End every interaction with one of three options:

1. Continue to the next item.
2. Take a break (save state and stop).
3. Switch belts or jump to the master index (only if the learner explicitly asks).

## Trigger phrasing

The skill activates on these phrases (case-insensitive, partial match acceptable):

- "start the playbook" / "start <belt> belt" / "begin <belt> belt"
- "continue my belt" / "what's next in my belt" / "where am I in the playbook"
- "show my progress" / "show my learner state"
- "claim <belt> belt" / "claim quest <id>" / "claim boss fight <id>"

If the learner says something close but not exact ("start the course", "what next"), the skill confirms: "Did you mean to invoke the playbook course?"

## Diagrams

When a chapter references an SVG diagram (e.g., `diagrams/03-mental-model.svg`), the skill prints the diagram path and recommends opening the file or the hub. The skill does not try to render SVG inline.

## Diagram-as-link example

> The chapter references `diagrams/03-mental-model.svg`. Open the file directly, or view it in the hub at `/prologue/mental-model`. I cannot render SVG inline.

## What this skill does NOT do

- It does not award belts. Reviewer attestation per Appendix L does that.
- It does not run a quiz engine. Comprehension prompts are open-ended and logged verbatim.
- It does not synchronise progress across multiple working directories. Each `LEARNER.md` is local.
- It does not store artefacts. It stores pointers.
- It does not edit chapter Markdown. The Markdown is read-only from the skill's perspective.
- It does not generate `curriculum.json` at runtime. The build step does that, off-skill.
- It does not enforce belt order strictly; soft order with logging.

## References

- `state-schema.md` — the shape of `LEARNER.md`.
- `teaching-patterns.md` — the section-by-section teaching contract.
- `quest-and-boss-fight-handling.md` — the gating rules.
- `curriculum.json` — generated belt-and-module index.
- `appendices/L-certification/README.md` — the certification policy this skill defers to.
- `INDEX.md` — the master playbook index.

## Versioning

This skill is at v0.8 alpha. It walks White Belt and Yellow Belt — the only drafted belts. Green Belt onwards is recognised but the skill says "not yet drafted." When new belts land, regenerate `curriculum.json` and the skill picks them up automatically.
