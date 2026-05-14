---
name: blade-compliance-reviewer
description: Run a per-file design-system drift scan on a Razorpay UI file. Reads the file, scans for raw colour or spacing values where Blade tokens exist, ad-hoc components shaped like Blade primitives, missing variants, and accessibility-attribute drift. Trigger phrases include "run blade-compliance on <file>", "/blade-compliance-check <file>", "check this file for design-system drift", "scan this UI for Blade drift". The skill produces a per-line Markdown report with one finding per drift, each naming the line, the drift type, and a suggested fix referencing a real Blade primitive or token. Use when reviewing or self-reviewing a UI file before shipping or after inheriting code that may not be design-system compliant.
---

# Blade-Compliance Reviewer

## Overview

This skill is the per-file complement to `pre-ship-check`. Where pre-ship-check Layer 2 surfaces "this PR has design-system drift," `blade-compliance-reviewer` says "in this specific file, line 47 uses a raw colour, line 92 reinvents a button, line 134 strips an accessibility attribute." File granularity catches drift the PR-level scan summarises.

The skill never auto-fixes. It surfaces; the builder decides whether to swap to a Blade primitive, file a Blade contribution for a genuinely missing component, or accept a one-off with a flagged note.

The Green Belt boss fight (G.27 in the playbook) explicitly references this skill as the per-file complement to `pre-ship-check`'s Layer 2.

## Hard Rules

- Never auto-fix any finding. Surface; the builder decides.
- Never invent a Blade primitive or token that does not exist in the current pinned Blade version.
- Never silently approve a custom component without flagging the gap.
- Never modify the file under review.
- Always cite the Blade version the scan used; output is invalid without the version stamp.
- Always treat a stripped accessibility attribute on an interactive element as a finding, not a stylistic note.

## Inputs

- A named file path (relative or absolute).
- The Blade design-system connector (loaded by the program-pinned plugin).
- The team's CLAUDE.md for any team-specific design conventions.
- The current Blade version pinned by the program (auto-discovered from the loaded connector).

If the file is not a UI file (no `.tsx` / `.jsx` / `.vue` / `.svelte` extension and no UI-shaped imports), the skill reports "not a UI file" and stops — it does not scan service files or non-UI files.

If the Blade connector is not loaded, the skill reports the missing input and stops.

## Outputs

A Markdown report with this shape:

```markdown
Blade-compliance reviewer report

File: <relative-file-path>
Blade version: <pinned-version>

Findings (<count>):

Line <N>: <drift-type>
  → <one-line suggested fix>

Line <N>: <drift-type>
  → <one-line suggested fix>

...

Summary: <count> RED, <count> YELLOW. <one-line summary>.
```

A clean file produces a "0 findings" report; the summary line reads "Clean — no design-system drift found in this file."

A drifted file produces per-line findings; the summary line counts RED and YELLOW.

The report is reviewer-readable in under one minute.

## Workflow

1. **Resolve inputs.** Read the named file path. Confirm it is a UI file. Load the Blade connector. Pin the Blade version for the report.

2. **Scan for raw values.** Walk the file's CSS-shaped values (inline styles, `style=` props, CSS-in-JS templates, className-derived inline values). For each literal colour, spacing, radius, or shadow value, check whether a Blade token exists; if yes, flag.

3. **Scan for ad-hoc components.** Look for `<div>` styled like a Button (clickable + button-like styles); `<div>` styled like a Card (boxed content with header/body); `<button>` styled outside Blade Button variants; `<input>` styled outside Blade Input variants; reinvented Modal / Tabs / Accordion patterns built from primitives instead of using the Blade pattern primitive.

4. **Scan for missing variants.** Look for Blade primitives invoked without specifying a required variant (e.g., `<Button>` without `variant`).

5. **Scan for accessibility-attribute drift.** Look for interactive elements (clickable elements, form elements, navigation elements) that have stripped `role`, `aria-*`, `tabIndex`, or `onKeyDown` attributes; and for Blade primitives that have been rendered with style overrides that defeat their built-in accessibility.

6. **Compose findings.** For each finding: line number, drift type, one-line suggested fix referencing a real Blade primitive, token, or variant. The suggested fix names the rule and the direction; it does not generate code.

7. **Emit the report.** Apply the canonical shape. Print to chat.

## What this skill does NOT do

- It does not replace `pre-ship-check` Layer 2 (which scans the whole PR's UI surface).
- It does not run the production-compiler (G.17) (which is a bulk-repair workflow, not a scan).
- It does not modify the file under review.
- It does not generate replacement code for findings.
- It does not file Blade contributions for genuinely missing components (that is a separate workflow).
- It does not scan non-UI files; service files and config files are out of scope.

## Trigger phrases

- "run blade-compliance on `<file>`";
- "/blade-compliance-check `<file>`";
- "check this file for design-system drift";
- "scan this UI for Blade drift";
- "is this file Blade-compliant".

## References

- `README.md` — maintainer notes.
- `test-cases.md` — acceptance scenarios.
- [G.16 — Blade deep dive](../../belts/03-green/b-practices/G16-blade-deep-dive.md) — Blade's anatomy.
- [G.17 — production-compiler skill](../../belts/03-green/b-practices/G17-production-compiler-skill.md) — the bulk-repair complement.
- [G.27 — Blade-compliance reviewer skill](../../belts/03-green/c-guardrails/G27-blade-compliance-skill.md) — the chapter that describes this skill at the contract level.
- [Appendix C — Skills Library](../../appendices/C-skills-library/README.md).

## Versioning

This skill is at v0.12 alpha. The Blade primitive vocabulary evolves with the design system; the SKILL.md cites the connector for the current shape rather than hardcoding a list. Bump the skill version when the output shape changes.
