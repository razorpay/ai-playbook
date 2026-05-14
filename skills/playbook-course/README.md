# Playbook Course Skill — Maintainer README

> **What this is.** The maintainer-facing notes for `skills/playbook-course/` — the Claude Code skill that walks a learner through belt content one paced module at a time.

---

## Why this skill exists

The playbook ships content in three consumption modes:

1. **Markdown source** at the repository root. Diff-friendly, search-friendly, the only editable surface.
2. **HTML hub** at `hub/` (Astro Starlight). Generated from the Markdown for browseable navigation.
3. **This skill.** A conversational, paced, progress-tracking walk through the same Markdown.

The architectural promise made in v0.4 was that every Markdown chapter is consumable by all three modes without duplication. v0.5 closed Markdown + HTML. v0.8 closes Markdown + skill. The same chapter, three doors.

---

## How it works

Three artefacts power the skill:

- `SKILL.md` — the skill definition Claude Code loads. Frontmatter declares the trigger phrases; the body declares the workflow.
- `curriculum.json` — a generated map of belts → modules → quests → boss-fight → badge, derived from `manifest.yml`. The skill reads this at runtime, not `manifest.yml`.
- `LEARNER.md` — the per-learner state file the skill creates inside the learner's working directory.

The skill resolves the next item from `LEARNER.md` and `curriculum.json`, opens the chapter Markdown from the repo root, applies the teaching patterns, and logs progress.

---

## Files in this directory

| File | Purpose |
|---|---|
| `SKILL.md` | Skill definition. The thing Claude Code loads. |
| `README.md` | This file. Maintainer notes. |
| `state-schema.md` | The shape of `LEARNER.md`. The skill's persistence contract. |
| `teaching-patterns.md` | Section-by-section behaviour for the eight-section template. |
| `quest-and-boss-fight-handling.md` | Gating rules. Defers to Appendix L for certification. |
| `curriculum.json` | Generated map of belts → modules → quests → boss-fight → badge. |
| `scripts/generate-curriculum.mjs` | The generator that produces `curriculum.json` from `manifest.yml`. |
| `test-cases.md` | Acceptance scenarios the skill must pass before a release. |

---

## Regenerating the curriculum

Run from the repo root:

```sh
node skills/playbook-course/scripts/generate-curriculum.mjs
```

The script:

- reads `manifest.yml`;
- filters to `section: "belts"` chapters;
- groups by `track`;
- emits `skills/playbook-course/curriculum.json`;
- verifies every referenced path exists on disk (fails the script otherwise).

Re-run after any of these:

- a new chapter is added to a belt;
- a chapter's slug or path changes;
- a new belt is drafted (Green, Black, Grandmaster);
- the front-matter schema changes in a way the script's parser cares about.

The generator is intentionally a small file (a few hundred lines, no dependencies) so a maintainer can read and audit it in one sitting.

---

## When to update each file

| Change | Files to update |
|---|---|
| New module in an existing drafted belt | `manifest.yml`, then re-run the generator. The skill picks up the new module via `curriculum.json`. No edits to skill code needed. |
| New belt drafted (e.g. Green Belt) | `manifest.yml`, the generator. The skill says "not yet drafted" until `status: drafted` propagates into `curriculum.json`. |
| Eight-section template changes | `teaching-patterns.md`, possibly `SKILL.md` workflow step 4. |
| Appendix L policy changes | `quest-and-boss-fight-handling.md` (NOT `appendices/L-certification/README.md` — the dependency direction is policy → skill). |
| State file shape changes | `state-schema.md`, plus a migration plan in `SKILL.md`. Bump `schema_version`. |
| Trigger-phrase additions | `SKILL.md` frontmatter `description` and the "Trigger phrasing" section. |
| Skill name change | `SKILL.md` frontmatter, this README, every cross-reference in the playbook. |

---

## Running the skill locally

From any working directory, with Claude Code installed and the program-pinned plugin loaded:

```
claude
> start white belt
```

The skill should:

1. Detect there is no `LEARNER.md`, ask whether to create one.
2. On confirmation, write the template.
3. Walk W01 — *The File System*.

If the skill does not activate, check:

- the plugin version (run the program's verification skill);
- the SKILL.md frontmatter (the `description` field is what Claude Code matches trigger phrases against);
- the trigger phrase exactly (case-insensitive, but spelling matters).

---

## Vendoring into the program plugin

This skill currently lives in-repo at `skills/playbook-course/`. The intended path forward is for the program-pinned Compass plugin to vendor it as a first-party skill. That is a separate decision and a separate version (post-v0.8). When vendoring:

- the skill directory copies wholesale into the plugin's skills directory;
- `curriculum.json` is regenerated against the plugin's pinned manifest version;
- the skill name stays `playbook-course` to avoid trigger-phrase collisions.

Until vendoring lands, the skill is loadable directly from the repo if the learner clones the playbook and points Claude Code at it.

---

## Testing

The acceptance criteria for any release of this skill live in `test-cases.md`. They run against the current White Belt and Yellow Belt content and exercise: cold-start, mid-belt resume, quest gating, boss-fight handoff, hand-edit respect, planned-belt deferral, lint compliance, and the curriculum-generator path-integrity check.

A passing run does not mean the skill is great. It means it does not regress against known good behaviour. A first real-learner walk-through is the real test, and that is captured separately in v0.8's retro.

---

## Content rules

This skill follows the playbook's content rules:

- no personal names beyond the optional learner handle in `LEARNER.md` front-matter;
- no internal-doc paths or links to private docs;
- no FSB-1/2/3 vocabulary;
- public references (Anthropic Claude Code skill docs, MCP docs) are fine when they earn a footnote;
- Razorpay specifics stay at the conceptual level: "the program-pinned plugin," "the cohort tracker," "the program's primary Slack channel."

The lint sweep on a v0.8 release greps the standard violation list across this directory.

---

## Boundary with Appendix L

The skill defers to Appendix L for certification. This file documents the dependency for maintainers:

- the skill never writes "awarded";
- the skill records `claimed`, optionally `submitted`, and stops;
- the badge entry's `reviewer` and `review_link` are filled by the learner after attestation, not by the skill;
- if Appendix L's tracker fields change, mirror the change in `state-schema.md` and `belts/01-white/badge.md` / `belts/02-yellow/badge.md`. The skill's behaviour follows.
