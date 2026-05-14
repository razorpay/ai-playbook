---
title: "Template: SKILL.md (full, with progressive disclosure)"
slug: "appendices/templates/skill-md-full"
section: "appendices"
status: "drafted"
type: "template"
track: "templates"
order: 5
time_minutes: 6
audience: "engineer"
outcome: "Author a SKILL.md that stays small in its default body but reveals depth on demand through reference files and external pointers."
prev: "appendices/templates/skill-md-minimum"
next: "appendices/templates/rfc"
pillar: "context"
belt: null
tags: ["template", "skill-md", "progressive-disclosure"]
updated: "2026-05-08"
---

# Template: SKILL.md (full, with progressive disclosure)

## What this template is for

A SKILL.md that uses the progressive-disclosure pattern: the default body stays small (under 200 lines), with depth available on demand through reference files in the skill directory and pointers to external sources. Use this when the workflow has more shape than the [minimum-viable template](SKILL-md-minimum.md) accommodates: branching logic, multiple modes, edge cases that need their own treatment.

The discipline is covered in [G.7 — Writing your first SKILL.md](../../belts/03-green/a-craft/G07-writing-your-first-skill.md) and [B.7 — Progressive disclosure](../../belts/04-black/b-craft/B07-progressive-disclosure.md). Read both before authoring a skill in this shape; the patterns are subtle and easy to get wrong.

Target length: SKILL.md body 100 to 200 lines; reference files in the same directory as needed. The total content can be much larger; what matters is the body stays scannable.

## How to use it

1. Create a directory for your skill: `skills/<skill-name>/`.
2. Copy the template body below into `skills/<skill-name>/SKILL.md`.
3. Identify the parts of the workflow that warrant separate reference files. Create them as `skills/<skill-name>/<topic>.md`.
4. Add `tests/` with acceptance scenarios.
5. Verify the skill passes the G.7 trigger / refusal / output-shape tests plus the B.7 default-body-stays-small check.

---

## Template body

```markdown
---
name: <!-- kebab-case name -->
description: <!-- one sentence; specific triggers; see SKILL-md-minimum
                  for guidance -->
---

# <!-- human-readable skill name -->

## Triggers

<!-- replace this with one or two sentences naming when the skill should
     activate. Same shape as the minimum template. -->

## Body

<!-- replace this with the default-path workflow. The most common case.
     Numbered steps. Five to ten for a typical skill. The body should be
     readable in two minutes; depth lives in the reference files. -->

1. <!-- step one of the most-common-case workflow -->
2. <!-- step two -->
3. <!-- continue for the most-common case -->

## Modes

<!-- replace this with the skill's named modes. Each mode is the case
     where the default workflow does not apply. The body covers the
     default; the modes branch from it. Examples:

     - **Quick mode.** When the user wants a fast pass and is willing to
       accept lower-fidelity output. See `quick-mode.md`.
     - **Detailed mode.** When the user wants the full thorough pass. See
       `detailed-mode.md`.
     - **Edge-case mode.** When the inputs are non-standard. See
       `edge-cases.md`. -->

## Output shape

<!-- replace this with the literal shape of the output. The body's output
     shape is the default. Each mode may produce a different shape; if
     so, the mode's reference file describes that shape. -->

## When to refuse

<!-- replace this with refusal cases for the default workflow. The modes
     may have their own refusal cases in their reference files. -->

## Reference files

<!-- replace this with the list of reference files in the skill directory.
     Example:
     - `quick-mode.md` — the quick-pass workflow and output shape.
     - `detailed-mode.md` — the thorough-pass workflow.
     - `edge-cases.md` — non-standard input handling.
     - `examples/` — worked examples for each mode. -->

## External references

<!-- replace this with pointers to external chapters or skills the user
     should read for context that does not belong in this skill.
     Example:
     - [G.7](../../belts/03-green/a-craft/G07-writing-your-first-skill.md)
       for the SKILL.md authoring discipline.
     - [B.7](../../belts/04-black/b-craft/B07-progressive-disclosure.md)
       for the progressive-disclosure pattern this skill uses. -->
```

---

## Worked example

A populated full SKILL.md for a more complex skill.

```markdown
---
name: pre-ship-check
description: Runs a six-layer pre-PR review across redlines, design system compliance, tests, PR craft, prompt-craft trace, and behaviour preservation. Activate before any PR opens. The check produces a structured report with green/amber/red per layer.
---

# Pre-ship-check

## Triggers

Activate when the user says "pre-ship check", "run the gate", or "is this ready to PR". Activate proactively when the user is about to open a PR and has not yet run the check.

## Body

The default-path workflow runs all six layers in order and produces a single structured report.

1. Layer 1 (redlines). Scan the diff for redline patterns per [G.22](../../belts/03-green/c-guardrails/G22-redlines.md). See `layer-1-redlines.md` for the full pattern set.
2. Layer 2 (design system). If the diff touches design surfaces, run the Blade compliance check. See `layer-2-design-system.md`.
3. Layer 3 (tests). Verify tests exist for the changed code paths. See `layer-3-tests.md`.
4. Layer 4 (PR craft). Suggest improvements to the PR title and description per [Y.13](../../belts/02-yellow/Y13-pr-craft.md). See `layer-4-pr-craft.md`.
5. Layer 5 (prompt-craft trace). Read the session log; surface the prompt-shape choices the engineer made. See `layer-5-prompt-craft-trace.md`.
6. Layer 6 (behaviour preservation). Verify the change does not silently alter existing behaviour. See `layer-6-behaviour.md`.

Output the report with green/amber/red per layer plus a summary verdict at the top.

## Modes

- **Quick mode.** Run only Layers 1, 3, and 6 (the safety-critical layers). Use when the engineer needs a fast pass on a non-controversial change. See `quick-mode.md`.
- **Detailed mode.** Run all six layers plus the on-demand subagent reviews. Use when the change is high-stakes (regulatory-shaped, large refactor, security-relevant). See `detailed-mode.md`.

## Output shape

The default output is a markdown report with this shape:

## Pre-ship-check verdict
**Overall:** GREEN / AMBER / RED

## Layer summary
| Layer | Status | Findings |
|---|---|---|
| 1 — Redlines | green/amber/red | summary |
| ... |

## Detailed findings (per layer)
<!-- one section per layer with non-green findings -->

## Recommended actions
<!-- numbered list of what the engineer should do before opening the PR -->

The report is ready to paste into the PR description as a comment.

## When to refuse

- The diff exceeds 5,000 lines. Refuse; suggest the user split the PR first. See `edge-cases.md` for the threshold reasoning.
- The diff includes regulator-protected data in test fixtures. Refuse; surface the data classification issue.
- The session log is not available. Refuse the prompt-craft-trace layer specifically; run the other five layers and note the gap.

## Reference files

- `layer-1-redlines.md` — the full redline pattern set and detection rules.
- `layer-2-design-system.md` — the Blade compliance check rules.
- `layer-3-tests.md` — test-coverage discipline and how to detect missing tests.
- `layer-4-pr-craft.md` — PR title and description quality rubric.
- `layer-5-prompt-craft-trace.md` — how to read session logs for prompt-shape decisions.
- `layer-6-behaviour.md` — behaviour-preservation patterns.
- `quick-mode.md` — the three-layer quick pass.
- `detailed-mode.md` — the six-layer plus subagent pass.
- `edge-cases.md` — non-standard diff handling.
- `examples/` — worked examples per layer for green, amber, and red findings.

## External references

- [G.7](../../belts/03-green/a-craft/G07-writing-your-first-skill.md) for SKILL.md authoring.
- [B.7](../../belts/04-black/b-craft/B07-progressive-disclosure.md) for the progressive-disclosure pattern.
- [G.26](../../belts/03-green/c-guardrails/G26-pre-ship-check-skill.md) for the chapter that defines the six layers.
- [G.22](../../belts/03-green/c-guardrails/G22-redlines.md) for the Razorpay-specific redlines.
```

This populated SKILL.md is around 90 lines. The body covers the default path. Modes branch off into reference files. Edge cases live in `edge-cases.md`. The body stays scannable; depth is available on demand.

---

## What this template is not

**Not a substitute for the chapters.** Both [G.7](../../belts/03-green/a-craft/G07-writing-your-first-skill.md) and [B.7](../../belts/04-black/b-craft/B07-progressive-disclosure.md) are required reading. The patterns are subtle.

**Not a default for every skill.** Use the [minimum-viable template](SKILL-md-minimum.md) when the workflow is genuinely simple. Progressive disclosure has a cost; do not pay it when you do not need to.

**Not unbounded depth.** A skill with thirty reference files and a 500-line body has lost the discipline. The body should stay under 200 lines; reference files should each be small and focused. If the skill is exceeding these guidelines, consider whether it should be split into multiple skills.

**Not a substitute for tests.** Same as the minimum-viable template: every skill needs `tests/` with acceptance scenarios. The progressive-disclosure pattern adds reference-file-specific tests on top of the body's tests.

---

**Previous:** [← SKILL.md minimum template](SKILL-md-minimum.md) · **Next:** [→ RFC template](RFC-template.md)
