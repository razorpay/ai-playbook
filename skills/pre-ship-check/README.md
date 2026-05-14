# pre-ship-check — Maintainer README

> **What this is.** Maintainer-facing notes for `skills/pre-ship-check/`. The Razorpay-shipped six-layer review skill that runs before every PR. Its primary consumer is the Green Belt boss fight (sub-requirement c).

---

## Why this skill exists

The Green Belt boss fight requires a clean six-layer pass. Every product PR a Green Belt builder ships is expected to run through this skill. Pre-ship-check exists so the program can claim, with truth, that PR review at Green Belt and above runs against a structured contract — not against reviewer mood.

Without this skill, the program's six-layer review discipline would depend on every reviewer remembering every layer every time. With this skill, the discipline is structural; the reviewer reads the report and focuses on judgement, not on layer enforcement.

---

## Files in this directory

| File | Purpose |
|---|---|
| `SKILL.md` | The skill definition Claude Code loads. Frontmatter declares triggers; body declares workflow. |
| `README.md` | This file. Maintainer notes. |
| `layer-specs.md` | Per-layer policy. The SKILL.md cites this file; policy edits live here, not in SKILL.md. |
| `redline-patterns.md` | The patterns Layer 1 scans for. Cross-references Appendix H. |
| `output-shape.md` | The canonical report shape. Two worked examples. |
| `test-cases.md` | Acceptance scenarios for the skill. |

---

## How the layers compose

Six layers, run in order, against the same diff:

1. **Redlines** — diff scan against patterns in `redline-patterns.md`.
2. **Design system** — UI files scanned for Blade-primitive drift.
3. **Tests** — changed code checked against test coverage.
4. **PR craft** — title, description, ticket, preview, test plan.
5. **Prompt craft** — session-log review for three-pillar discipline.
6. **Behaviour preservation** — diff surface vs description scope.

A YELLOW with an explicit PR-description note is acceptable. An unaddressed YELLOW is not. A single RED blocks the PR.

The skill emits a structured Markdown report (per `output-shape.md`) that is reviewer-readable in under two minutes and machine-parseable for downstream tools.

---

## When to update each file

| Change | Files to update |
|---|---|
| New redline category | Appendix H first; mirror the pattern in `redline-patterns.md`. |
| New Blade primitive or token convention | `layer-specs.md` Layer 2 section. |
| New test convention (e.g., a different fixture pattern) | `layer-specs.md` Layer 3 section. |
| New PR-craft expectation | `layer-specs.md` Layer 4 section. |
| Prompt-craft trace shape changes | `layer-specs.md` Layer 5 section. |
| Behaviour-preservation rule changes | `layer-specs.md` Layer 6 section. |
| Output shape changes | `output-shape.md` and bump the skill version in `SKILL.md` frontmatter. |
| Trigger-phrase additions | `SKILL.md` frontmatter description. |

---

## Running the skill locally

From any working directory with Claude Code installed and the program-pinned plugin loaded:

```
claude
> run pre-ship-check on this branch
```

The skill expects:

- a checked-out git branch with a remote-tracked base;
- the team's CLAUDE.md loadable;
- the redline-patterns reference loadable (lives next to the SKILL.md);
- the Blade design-system connector loaded (program-pinned plugin handles this);
- optionally, the session log accessible for Layer 5.

If a required input is missing, the skill reports the missing input and stops; it does not run a partial check.

---

## Vendoring into the program plugin

This skill currently lives in-repo at `skills/pre-ship-check/`. The intended path is for the program-pinned plugin to vendor it as a first-party skill. When vendoring:

- the directory copies wholesale into the plugin's skills directory;
- `redline-patterns.md` regenerates against the program's pinned redline catalogue;
- the skill name stays `pre-ship-check` to avoid trigger-phrase collisions;
- the layer-specs versioning carries over so policy continuity is preserved.

Until vendoring lands, the skill is loadable directly from the playbook repo if the team clones it and points Claude Code at it.

---

## Testing

Acceptance criteria for any release of this skill live in `test-cases.md`. They run against five canonical scenarios: clean PR, PR with redline flag, PR missing tests, scope-creep PR, PR with stale CLAUDE.md.

A passing test run does not mean the skill is great. It means it does not regress against known good behaviour. A first real-cohort walkthrough is the real test, and that is captured in calibration retros (Appendix L).

---

## Content rules

This skill follows the playbook's content rules:

- no personal names;
- no internal-doc paths or links to private docs;
- no FSB-1/2/3 vocabulary;
- no verbatim copy from the local context folder;
- public references (Anthropic Claude Code skill docs, Playwright docs, Blade docs, Appendix H) are fine when they earn a footnote;
- Razorpay specifics stay at the conceptual level: "the program-pinned plugin," "the team's CLAUDE.md," "the cohort tracker," "the program's primary Slack channel." Not URLs, not server hostnames, not engineer names.

The lint sweep on a release greps the standard violation list across this directory.

---

## Boundary with the chapters

This skill applies policy from G.22 (redlines), G.16 (Blade), G.12-G.14 (tests), Y.13 (PR craft), G.1 / G.21 (prompt craft), and program behaviour-preservation expectations. If the chapters change, the skill follows; the dependency direction is policy → skill, never the other way.

The skill never substitutes for the chapters. A reviewer who has read the chapters reviews better than a reviewer who only reads the report. The report makes the review possible; the chapters make it informed.
