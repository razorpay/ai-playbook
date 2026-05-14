---
name: pre-ship-check
description: Run a six-layer structured review on a branch's diff before opening or merging a PR. The six layers are redlines, design system, tests, PR craft, prompt craft, and behaviour preservation. Trigger phrases include "run pre-ship-check on this branch", "/pre-ship-check", "check before review", "is this ready to ship", "pre-ship this PR", "do the six-layer check". The skill produces a structured Markdown report with one section per layer, a colour (GREEN / YELLOW / RED) per layer, and a final summary line. Use when a Razorpay builder is about to open, merge, or hand off a PR; the Green Belt boss fight requires a clean run as sub-requirement (c).
---

# Pre-Ship Check

## Overview

This skill is the canonical Razorpay-shipped review skill that runs before every PR. It applies six layers of structured review against a branch's diff: redlines, design system, tests, PR craft, prompt craft, and behaviour preservation. The output is a structured Markdown report with one section per layer, a colour grade, and a summary line.

The skill never auto-fixes, never weakens a layer's standard to make a PR pass, never silently rewrites a PR description. It surfaces; the builder decides; the reviewer reads the report alongside the diff.

The Green Belt boss fight (Boss Fight G-B in `belts/03-green/c-guardrails/boss-fight-GB-double-ship.md`) requires a clean six-layer pass as sub-requirement (c). This skill is what makes that requirement runnable.

## Hard Rules

- Never auto-fix any finding. Surface; the builder decides.
- Never weaken a layer's standard to make a PR pass.
- Never silently rewrite the PR description.
- Never bypass a layer because of time pressure.
- Always emit the report in the canonical structured shape from `output-shape.md`.
- A YELLOW with an explicit PR-description note is acceptable. An unaddressed YELLOW is not.
- A single RED at any layer blocks the PR.
- Never include raw redline-flagged values in the report; redact to a shape.
- Never write to disk (the report goes to chat; the builder copies it).

## Inputs

- The current branch (default: `git rev-parse --abbrev-ref HEAD`).
- The base branch (default: `main`; configurable via the team's CLAUDE.md).
- The team's CLAUDE.md (loaded automatically by Claude Code).
- The redline patterns reference (`redline-patterns.md` next to this SKILL.md).
- The Blade design-system connector (loaded by the program-pinned plugin).
- The Playwright test directory (auto-detected from common conventions: `tests/`, `__tests__/`, `e2e/`).
- The session log from the program-pinned plugin (used by Layer 5; optional but recommended).

If any required input is missing, the skill reports the missing input and stops — it does not run a partial check.

## Outputs

A structured Markdown report exactly matching the shape in `output-shape.md`. The report has:

- a fixed header (branch, base, run-at, skill version);
- a layer-row table with one row per layer and a GREEN / YELLOW / RED colour;
- per-layer detail blocks for any non-GREEN layer, with file/line findings and one-line suggested fixes;
- a final summary line.

The report is reviewer-readable in under two minutes and machine-parseable for downstream tools (CI bots, dashboards).

## Workflow

1. **Resolve inputs.** Identify the branch and the base. Load the team's CLAUDE.md. Confirm the redline patterns reference and the Blade connector are loadable. Confirm the session log path if Layer 5 is to run with full evidence; if not available, Layer 5 runs in summary-only mode.

2. **Compute the diff.** `git diff <base>...<branch>` or equivalent. Hold the diff in working memory; do not write it to disk.

3. **Run Layer 1 — Redlines.** Scan the diff against the patterns in `redline-patterns.md`. For each match, record the file path, line number, pattern category, and the matched shape (redacted). Determine GREEN / YELLOW / RED per the layer-spec.

4. **Run Layer 2 — Design system.** Identify UI files in the diff. For each, scan for raw values where tokens exist, ad-hoc components shaped like Blade primitives, reinvented patterns, missing accessibility attributes. Record findings with file paths, line numbers, and suggested fixes.

5. **Run Layer 3 — Tests.** Identify changed code in the diff. For each named export or new file, check the test directory for coverage. Identify weakened assertions and silently-updated snapshots. Record findings.

6. **Run Layer 4 — PR craft.** Inspect the PR description (if available via the connector) and metadata. Check title shape, description completeness, ticket reference if applicable, preview URL if the change is UI-shaped, test plan presence.

7. **Run Layer 5 — Prompt craft.** Read the session log if available. Look for three-pillar discipline (G.1), appropriate skill invocations (production-compiler for inherited drift, design-intel for design-to-code, etc.), and pushback patterns (G.21) where applicable. Summarise as GREEN / YELLOW / RED with rationale.

8. **Run Layer 6 — Behaviour preservation.** Cross-check the diff's surface area against the PR description's named scope. Flag unrelated material changes.

9. **Emit the report.** Apply the structure from `output-shape.md`. Print to chat. Do not write to disk; do not post anywhere; the builder consumes the report and acts on it.

## Layer behaviour

The full per-layer specifications live in `layer-specs.md`. The SKILL.md cites that file; updating policy means editing `layer-specs.md`, not this SKILL.md.

## What this skill does NOT do

- It does not auto-fix any finding.
- It does not run the actual Playwright tests (Layer 3 checks for *coverage existence*, not *test passing*; running tests is a separate workflow).
- It does not call into the design-system connector to *generate* fixes (Layer 2 surfaces drift; G.17's `production-compiler` is the bulk-repair fallback).
- It does not modify the PR description.
- It does not post to messaging or commenting platforms.
- It does not enforce policy that does not appear in `layer-specs.md`.

## Trigger phrases

The skill activates on:

- "run pre-ship-check on this branch";
- "/pre-ship-check";
- "check before review";
- "is this ready to ship";
- "pre-ship this PR";
- "do the six-layer check".

If the user says something close but not exact, the skill confirms before running.

## References

- `layer-specs.md` — the per-layer specifications (the policy holder).
- `redline-patterns.md` — the patterns Layer 1 scans for.
- `output-shape.md` — the canonical report shape.
- `test-cases.md` — acceptance scenarios.
- [G.26 — The pre-ship-check skill](../../belts/03-green/c-guardrails/G26-pre-ship-check-skill.md) — the chapter that describes this skill at the contract level.
- [Appendix H — Reference Cards](../../appendices/H-reference-cards/README.md) — the canonical redline cards.
- [Appendix C — Skills Library](../../appendices/C-skills-library/README.md) — the skills library entry.

## Versioning

This skill is at v0.12 alpha. The layer specs and the redline patterns evolve with policy; the SKILL.md body stays a thin orchestrator. Bump the skill version when the output shape changes; downstream tools depend on shape stability.
