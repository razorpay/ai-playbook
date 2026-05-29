---
title: "Appendix C: Skills Library"
slug: "appendices/skills-library"
section: "appendices"
status: "drafted"
type: "readme"
track: "skills-library"
order: 0
time_minutes: 16
audience: "everyone"
outcome: "Understand what belongs in a reusable skill, see three concrete examples, and know how to contribute back without making the library worse."
prev: "appendices/environment-setup"
next: "appendices/certification"
pillar: "context"
belt: "green"
tags: ["appendix", "skills", "agents", "workflow"]
updated: "2026-04-27"
---

# Appendix C — Skills Library

> **What this is.** The first index for reusable AI workflows: skills, slash commands, recipes, and agent patterns that should not be rediscovered from scratch by every team.

---

## Why a library

A skill is a frozen piece of judgement. A workflow that someone has already worked out, written down, and made repeatable. The library exists because the gap between "I figured this out once" and "anyone on the program can do this" is an order of magnitude: and the work of closing that gap, done well, is more valuable than most one-off features.

The risk a library faces is the opposite of obscurity: **dilution.** If everything is a skill, nothing is. The bar should hurt a little. A skill earns a place when it captures judgement, not when it captures a sequence of clicks.

---

## What counts as a skill

A skill earns a place in the library when it packages repeatable judgement. A good skill has:

- **a clear trigger:** when a user should reach for it, in plain language;
- **a bounded job:** what it will and will not do, written before any code;
- **context requirements:** files, docs, connectors, or repo state it needs;
- **output shape:** the artefact it produces, named precisely;
- **guardrails:** safety, review, and rollback expectations;
- **maintenance owner:** who updates it when the underlying workflow changes;
- **freshness signal:** when it was last validated against a real run.

One clever prompt is not a skill. A repeatable workflow with named inputs, checks, and a useful output probably is.

---

## Current categories

| Category | Example use | Belt relevance |
|---|---|---|
| Setup and health | Verify environment, plugin version, auth, local build. | White |
| Code navigation | Map a repo, find owners, explain a module. | Yellow |
| Product workflow | Turn a ticket, spec, or bug report into a concrete implementation path. | Yellow / Green |
| Design workflow | Inspect design-system usage and component fit. | Green |
| Review and release | Pre-ship checks, PR review, changelog, deployment notes. | Green / Black |
| Knowledge capture | Convert discoveries into wiki pages, recipes, or playbook updates. | Green / Black |
| Program operations | Cohort tracking, certification evidence, office-hours triage. | Black |

Ops 101 recipes live near this appendix conceptually, even when their first version is just a Markdown checklist.

---

## Three first-pass skill entries

These are the three skills every belt rests on. Each is described by the same template the library uses going forward.

### Skill: setup-verify

**Where it lives.** [`skills/setup-verify/`](../../skills/setup-verify/). Quest W-0 depends on it.

**Trigger.** Run before starting any belt work after a fresh install, a plugin upgrade, or a network change. Also activate proactively when the user has just finished running the setup script or reports environmental symptoms.

**Bounded job.** Walks the ten setup checks (Node + pnpm versions, Claude Code auth, internal npm registry, corp-proxy cert, gcloud + Vertex, LiteLLM proxy, Compass plugin checksum, Git + corp SSO, env vars, health endpoints) and prints a GREEN / YELLOW / RED summary with named failures and one-line fixes.

**Context requirements.** Local working directory, the repo intended for work, the program-pinned plugin, and approved connectors.

**Output shape.** A structured Markdown report with the overall colour, a ten-row table per check, a "What to fix first" section (RED before YELLOW with one-line fixes), and an escalation footer. Canonical shape in `skills/setup-verify/output-shape.md`.

**Guardrails.** Read-only; never modifies the environment. Never stores credentials. Never logs env var values (names only). Refuses to bypass a RED. Refuses to run on shared CI hosts or production servers.

**Maintenance owner.** Whoever owns the program-pinned plugin for the current cycle.

**Freshness signal.** Re-run after every plugin pin change; the output always includes the plugin version it validated against. New checks require a charter revision and a curriculum update.

### Skill: pre-ship-check

**Where it lives.** [`skills/pre-ship-check/`](../../skills/pre-ship-check/). 

**Trigger.** Run before opening a pull request from any belt-graded work; the Green Belt boss fight requires a clean pass as sub-requirement (c).

**Bounded job.** Six-layer structured review against the diff: redlines, design system, tests, PR craft, prompt-craft trace, behaviour preservation. Surfaces issues; does not auto-fix; never weakens a layer to make a PR pass.

**Context requirements.** The current branch, the base branch, the team's CLAUDE.md, the redline patterns reference, the Blade design-system connector, the Playwright test directory, the program-pinned plugin's session log if available.

**Output shape.** A structured Markdown report with one section per layer, a colour grade per layer (GREEN / YELLOW / RED), per-layer detail blocks with file/line findings, and a final summary line. Reviewer-readable in under two minutes; machine-parseable for downstream tools. Canonical shape in `skills/pre-ship-check/output-shape.md`.

**Guardrails.** Never auto-fix. Never weaken a standard. Never silently rewrite the PR description. A YELLOW with an explicit PR-description note is acceptable; an unaddressed YELLOW is not. A single RED blocks the PR.

**Maintenance owner.** Pre-ship workflow lead or the program reviewer rotation.

**Freshness signal.** The skill cites the Blade version it scanned against and the policy version from `layer-specs.md`. Bump the skill version when the output shape changes.

### Skill: design-intel

**Where it lives.** [`skills/design-intel/`](../../skills/design-intel/). The first stage of the design-to-code pipeline.

**Trigger.** Run before turning a Figma frame or design spec into code. The output feeds the `production-compiler` skill.

**Bounded job.** Reads a Figma frame via the Figma MCP and produces structured design intent: components used (with Blade equivalents), layout, interaction states, variants, accessibility considerations, and explicit Open questions. Outputs Markdown, not code.

**Context requirements.** The Figma MCP, the design-system connector for Blade primitive lookup, the target frame URL or ID.

**Output shape.** A Markdown document with named sections (Frame summary, Components used, Layout, States, Variants, Accessibility, Open questions). Canonical shape in `skills/design-intel/output-shape.md`. The shape is the contract with `production-compiler`.

**Guardrails.** Never produces code. Never invents Blade primitives. Refuses on non-auto-layout frames. Refuses on inaccessible frames. Refuses when the frame contains regulator-protected data.

**Maintenance owner.** Design transformation lead jointly with the platform team.

**Freshness signal.** Validated against the most recent Blade release; the component-mapping needs revision when Blade adds new primitives.

### Skill: production-compiler

**Where it lives.** [`skills/production-compiler/`](../../skills/production-compiler/). The second stage of the design-to-code pipeline.

**Trigger.** Run when the user has raw AI-generated UI code (typically from AI Studio or ChatGPT), a design-intel document, or both, and wants Blade-compliant JSX.

**Bounded job.** Three layers in order: component substitution (raw HTML/Tailwind → Blade primitives), token application (raw values → Blade tokens), accessibility verification (the same checks `blade-compliance-reviewer` applies). Outputs Blade JSX plus a translation log plus a "Manual review needed" section.

**Context requirements.** Raw AI-generated code or a design-intel document (or both). Optional: the target repo for Blade version pinning.

**Output shape.** Three sections: Blade JSX (the code), Translation log (what was substituted), Manual review needed (deviations and gaps). Canonical rules in `skills/production-compiler/translation-rules.md`.

**Guardrails.** Refuses without input. Refuses when design-intel has blocking Open questions. Refuses on inputs over ~500 lines. Refuses on regulator-protected data. Refuses to skip accessibility verification.

**Maintenance owner.** Design transformation lead jointly with the platform team.

**Freshness signal.** The translation rules evolve as new patterns emerge from AI Studio, ChatGPT, and other generators. The skill version bumps when the rule set changes.

### Skill: blade-compliance-reviewer

**Where it lives.** [`skills/blade-compliance-reviewer/`](../../skills/blade-compliance-reviewer/). Drafted as a runnable skill in v0.12.

**Trigger.** Run on a single UI file when you want a precise per-line drift report: usually for inherited code, files the production-compiler does not fully repair, or self-review before a PR.

**Bounded job.** Per-file scan of a UI file for raw colour / spacing / radius / shadow values where Blade tokens exist; ad-hoc components shaped like Blade primitives; reinvented Modal / Tabs / Accordion patterns; missing variants on Blade primitives; accessibility-attribute drift on interactive elements.

**Context requirements.** A named UI file path, the Blade design-system connector loaded, the team's CLAUDE.md, the current pinned Blade version.

**Output shape.** A per-line Markdown report with one finding per drift, each naming the line, the drift type, and a one-line suggested fix referencing a real Blade primitive or token. Cites the Blade version it scanned against. A clean file produces a "Clean" report.

**Guardrails.** Never auto-fixes. Never invents Blade primitives or tokens. Never silently approves a custom component without flagging the gap. Refuses to scan non-UI files (reports "not a UI file" and stops).

**Maintenance owner.** Design-system program lead or rotation.

**Freshness signal.** The Blade vocabulary loads from the connector at scan time; the skill picks up new primitives automatically on a pinned-version bump.

### Skill: security-review-subagent

**Where it lives.** [`skills/security-review-subagent/`](../../skills/security-review-subagent/). Drafted as a runnable skill in v0.12.

**Trigger.** Run on PRs that touch agent invocations, MCP connector grants, untrusted-input ingestion, or new external surfaces. The Green Belt boss fight assumes this skill has run on the product-repo PR before review.

**Bounded job.** Spawn a fresh-context subagent with the canonical six-check brief. The brief covers: redlines surviving in the diff, prompt-injection capability creep, untrusted-input handling, output exposure, injection-vulnerable shapes, unscoped capabilities. Return a structured Markdown artefact with one section per finding.

**Context requirements.** The current branch, the base branch, the canonical brief template, the team's CLAUDE.md.

**Output shape.** A Markdown report with header (branch, base, run-at, brief version), per-finding sections (file/line, risk, suggested fix), and a summary line. Reviewer-readable in under two minutes; downstream tools extract findings via the `### Finding` markers.

**Guardrails.** Never modifies code. Never produces findings without citing files and lines. Never includes literal redline values in output (redacts to a shape). The subagent's working notes do not return to the main session — only the structured artefact does. Refuses to run on PRs with no security surface (reports "no security surface; recommend `pre-ship-check` instead" and stops).

**Maintenance owner.** Program security lead or the program reviewer rotation. The brief in `brief-template.md` is the policy holder; updating security policy means editing the brief.

**Freshness signal.** Bump the skill version when the brief template's check set or output shape changes; downstream tools depend on shape stability.

### Skill: playbook-course

**Trigger.** Run when a learner wants a paced, conversational walk through belt content with progress tracking. Phrases include "start the playbook," "continue my belt," "show my progress," and "claim white belt."

**Bounded job.** Reads the playbook's Markdown chapters, walks them one at a time using the eight-section template, and tracks progress in a `LEARNER.md` file in the learner's working directory. Gates at quests and boss fights by recording *claimed* evidence without bypassing Appendix L's reviewer protocol.

**Context requirements.** The playbook repo (or a vendored copy of `skills/playbook-course/`), `curriculum.json` (generated from `manifest.yml`), the chapter Markdown for whichever module is next.

**Output shape.** A paced module walk-through with progress logged to `LEARNER.md`, plus quest / boss-fight gating that records claims and routes the learner to Appendix L's reviewer protocol when the badge becomes claim-ready.

**Guardrails.** Never invents content. Never declares a belt awarded. Never stores artefact bodies (screenshots, PR diffs) — URLs and short notes only. Never writes secrets or PII into `LEARNER.md`. Never bypasses the eight-section template. Defers to Appendix L for certification.

**Maintenance owner.** Playbook program lead. The skill lives at `skills/playbook-course/` and is regenerated against `manifest.yml` whenever curriculum changes.

**Freshness signal.** Re-run `scripts/generate-curriculum.mjs` after any `manifest.yml` change; the path-integrity check in the script fails non-zero if any referenced chapter is missing on disk.

---

## Anti-patterns: when not to make a skill

The library's quality bar is the bar that most prompts cannot pass. A skill is the wrong wrapper when:

- **The workflow has run twice.** Wait for three. The third run is where the patterns are real.
- **The output is mostly free-form synthesis.** That belongs in a chat surface, not a skill registry.
- **The judgement is one person's taste.** Skills need a written rule, not a vibe.
- **There is no clear owner.** Unowned skills go stale fastest of all.
- **The trigger is ambiguous.** If you cannot write a one-line "use this when…", the skill will collide with neighbours and confuse readers.
- **It encodes a workaround for a broken tool.** Fix the tool. A skill that papers over a known bug is a debt the next maintainer cannot see.

---

## Contribution pattern

When a workflow repeats three times, capture it in this order:

1. Write the manual recipe in plain language.
2. Run it on a real task and mark what was ambiguous.
3. Add the minimum context files or connector assumptions.
4. Convert the recipe into a skill or slash command only after the manual version works.
5. Add it back to this library with owner, status, and examples.

That order matters. Automating a vague workflow makes the vagueness faster.

---

## Maintenance discipline

A skill is alive when:

- it has been validated against a real task in the last quarter;
- its owner is reachable and current;
- its trigger and bounded job still describe the work it does;
- its output has not silently grown beyond what a reader can scan in twenty seconds;
- its references to design-system, model, plugin, or connector versions match the current pinned builds.

A skill is dead when any of those is no longer true. Dead skills should be marked deprecated, not deleted; readers need to know what changed and what to use instead.

---

## Where to go next

- For the operating philosophy, read [Prologue 0.7 — Operating Principles](../../prologue/07-operating-principles.md).
- For a one-hour knowledge-base recipe, read [Appendix N.7 — Minimum viable wiki](../N-methodologies/N7-minimum-viable-wiki.md).
- For evidence and belt gates, read [Appendix L — Certification](../L-certification/README.md).
- For the surface every skill runs on, read [Appendix A — Tool Atlas](../A-tool-atlas/README.md).
