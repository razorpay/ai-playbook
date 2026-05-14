---
title: "The Blade-compliance reviewer skill — file-granularity checks"
slug: "belts/green/blade-compliance-skill"
section: "belts"
status: "drafted"
type: "chapter"
track: "green"
order: 27
time_minutes: 15
audience: "experienced-builder"
outcome: "Run the Blade-compliance reviewer skill on individual UI files to catch design-system drift the pre-ship-check's PR-level scan might miss."
prev: "belts/green/pre-ship-check-skill"
next: "belts/green/security-review-subagent"
pillar: "harness"
belt: "green"
tags: ["green-belt", "blade-compliance", "skill-pattern", "design-system"]
updated: "2026-04-29"
---

# G.27 — The Blade-compliance reviewer skill

A small chapter for a focused skill. Pre-ship-check (G.26) is the PR-level six-layer gate; **Blade-compliance reviewer** is the *per-file* deep dive on UI files specifically. Where pre-ship-check Layer 2 surfaces "this PR has design-system drift," Blade-compliance reviewer says "in this file, line 47 uses a raw colour, line 92 uses a custom button-shaped div, line 134 reinvents an Alert pattern." File granularity catches drift the PR-level scan summarises away.

Treated at contract level (matches G.13 / G.17 / G.26).

---

## If you're short on time

- Pre-ship-check is the PR gate; Blade-compliance reviewer is the per-file scan. The two compose.
- Trigger on individual files when you want a precise, line-by-line drift report. Especially useful inherited code (use after the production-compiler from G.17, or as a check before).
- The skill never auto-fixes. It surfaces; you decide.

> **Where this lives.** The skill is at [`skills/blade-compliance-reviewer/`](../../../skills/blade-compliance-reviewer/). The chapter describes the policy; the skill applies it.

---

## When to reach for it

Three named patterns.

### Pattern 1 — A specific file you suspect drifted

You inherit a UI file from another team or another version of the codebase. Pre-ship-check would flag it at the PR level; Blade-compliance reviewer at the file level shows you exactly where to fix.

### Pattern 2 — A file that resists the production-compiler

Sometimes the production-compiler (G.17) reports "all clean" but the file still feels wrong. The Blade-compliance reviewer's per-file scan catches things the production-compiler did not have a mapping for: minor token drift, accessibility-attribute drift, inconsistent variant choices.

### Pattern 3 — A file you wrote that you want to double-check

Self-review. The skill is fast; running it on a file you just wrote is cheap and catches the small drift the human eye misses (the spacing token you typed as a number, the variant you forgot to set).

---

## The contract

**Trigger phrases.** "Run blade-compliance on this file", "check this file for design-system drift", "/blade-compliance-check" (slash command).

**Bounded job.** Read the named file, scan for design-system drift line by line, produce a per-line report.

**Inputs.** The named file path, the Blade design-system connector (loaded), the team's CLAUDE.md for any team-specific design conventions, the current Blade version pinned by the program.

**Outputs.** A per-line report with one finding per drift, each naming: the line, the drift type (raw value, ad-hoc component, missing variant, accessibility), the suggested fix referencing a real Blade primitive or token.

**Hard rules.** Never auto-fix. Never invent a Blade primitive that does not exist. Never silently "approve" a custom component without flagging the gap. Always cite the Blade version it scanned against.

---

## A worked report

Running the skill on a file that has accumulated drift:

```
Blade-compliance reviewer report

File: apps/dashboard/views/cart/EmptyState.tsx
Blade version: <pinned version>

Findings (5):

Line 12: Raw spacing value `padding: '16px'`
  → Use spacing[3] token (Blade docs)

Line 18: Custom heading shape: `<h2 className="cart-empty-h2">`
  → Use Blade Heading level={2}, drop the className

Line 24: Raw colour value `color: '#0066ff'`
  → Use colors.surface.action.primary.lowContrast token

Line 47: Custom button-shaped div: `<div onClick=...>` styled as button
  → Use Blade Button variant='primary' size='medium'
  → Note: this also drops the focus-ring and aria role; the Blade
    Button gives both for free.

Line 89: Inline SVG using non-token colour
  → Acceptable if intentional; flag in PR description if so.

Summary: 4 RED findings (drift that should be fixed before merge),
1 YELLOW (acceptable with PR-description note).
```

The builder reads the report, fixes the four RED findings (token swap, Heading swap, token swap, Button swap: total ~10 minutes), notes the YELLOW in the PR description, re-runs the scan, ships.

---

## How it composes with G.17 and G.26

**G.17 — production-compiler.** Repairs inherited drift in bulk. Best for "this file came from AI-Studio and needs the full sweep."

**G.27 — Blade-compliance reviewer.** Per-file precise scan. Best for "I want to know exactly what's drifting in this file" or "I just wrote this and want to double-check."

**G.26 — pre-ship-check Layer 2.** PR-level summary. Best for "is this PR ready to ship overall."

The three compose: G.17 for bulk repair, G.27 for per-file precision, G.26 for the PR gate.

---

## Common failure modes

**Skipping the skill on small UI changes.** "It's just one component." Fix: ten seconds to run; catches drift the eye misses.

**Treating findings as suggestions.** A RED finding is a fix-before-merge, not a vibe. Fix: address them.

**Running it on non-UI files.** It is scoped to UI; running on a service file produces useless output. Fix: invoke on UI files only.

**Ignoring the Blade-version line.** A scan against an old Blade version misses new primitives that would solve a finding. Fix: keep Blade pinned current; the skill cites the version it used.

---

## GREEN / YELLOW / RED self-check

- 🟢 GREEN — I run Blade-compliance on UI files I write or inherit; I fix RED findings before merge; I cite YELLOW findings in PR descriptions.
- 🟡 YELLOW — I have used the skill but sometimes ship past RED findings.
- 🔴 RED — I do not use the skill; I rely on PR review to catch design-system drift.

---

## What you can say after this module

> "I run the Blade-compliance reviewer per-file on UI changes I write or inherit, fix RED findings, and cite YELLOWs in PR descriptions. The scan composes with the production-compiler and the pre-ship-check; I know which to reach for when."

---

## Where to go next

G.28 (*Using a subagent for security review*) closes the named-skill cluster. Where G.27 is per-file UI scan and G.26 is per-PR gate, G.28 is the per-PR security pass.

**Previous:** [← G.26 The pre-ship-check skill](G26-pre-ship-check-skill.md) · **Next:** [→ G.28 Security-review subagent](G28-security-review-subagent.md)

**Further reading**

- [G.16 — Blade deep dive](../b-practices/G16-blade-deep-dive.md)
- [G.17 — production-compiler skill](../b-practices/G17-production-compiler-skill.md)
- [G.26 — pre-ship-check skill](G26-pre-ship-check-skill.md)
- [Appendix C — Skills Library](../../../appendices/C-skills-library/README.md)
