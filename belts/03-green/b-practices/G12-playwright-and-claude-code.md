---
title: "E2E testing with Playwright + Claude Code"
slug: "belts/green/playwright-and-claude-code"
section: "belts"
status: "drafted"
type: "chapter"
track: "green"
order: 12
time_minutes: 45
audience: "experienced-builder"
outcome: "Write a Playwright end-to-end test with Claude Code that survives the codebase, reads cleanly, and catches the regression you actually fear."
prev: "belts/green/b-practices"
next: "belts/green/playwright-skill-pattern"
pillar: "harness"
belt: "green"
tags: ["green-belt", "playwright", "e2e-testing", "voice-anchor"]
updated: "2026-04-29"
---

# G.12 — E2E testing with Playwright + Claude Code

This is the voice anchor for Part B. Where Part A taught the craft layer (CLAUDE.md, skills, subagents, prompts), Part B teaches the practices that make the craft pay off. The first practice is end-to-end testing: tests that run against a real browser, against your real app, that catch the regressions a unit test cannot. Claude Code can write the test, run it, and iterate against failures: if you tell it what to test, what to assert, and what not to invent.

---

## If you're short on time

- A good E2E test names a user behaviour, not an implementation detail. "Submitting an empty form shows the inline error" — not "the validateForm function returns false."
- Have Claude write the *spec* in plain English first. Then have it generate the Playwright code from the spec. Two prompts beat one.
- Run the test. Read the failure. Iterate. Do not let Claude "fix" a failing test by relaxing its assertion.

---

## The mental model

```
   ┌─────────────────────────────────────────────┐
   │              E2E TEST FLOW                   │
   ├─────────────────────────────────────────────┤
   │                                                │
   │   You name a behaviour you want to protect.  │
   │                  │                            │
   │                  ▼                            │
   │   Claude drafts the spec in plain English.   │
   │                  │                            │
   │                  ▼                            │
   │   You approve the spec.                      │
   │                  │                            │
   │                  ▼                            │
   │   Claude generates the Playwright code.      │
   │                  │                            │
   │                  ▼                            │
   │   You run it. Tests pass or fail.            │
   │                  │                            │
   │                  ├─── PASS → commit          │
   │                  │                            │
   │                  └─── FAIL → read the failure│
   │                          carefully and       │
   │                          iterate the spec    │
   │                          OR the code, never  │
   │                          relax the assertion │
   │                                                │
   └─────────────────────────────────────────────┘
```

The most important property of this flow: the *spec* is the artefact you review, not the test code. A well-written spec is unambiguous; the code is a faithful translation. If the code is wrong, the spec is wrong.

---

## Worked example

You want to protect against a regression where the dashboard's chart legend overlaps the chart on small viewports. The bug happened once; you do not want it again.

**Step 1 — Tell Claude what to protect.**

> "Write a Playwright spec for the dashboard's reporting view that protects against the legend-overlap bug we fixed in branch `fix/legend-overlap-small-viewport`. The spec should pass on the fix and fail on the pre-fix code. Stay in plain English; do not generate Playwright code yet."

**Step 2 — Read the spec it produces.**

> Spec — Dashboard reporting view, small viewport legend
>
> 1. Visit `/reporting` on a 320px-wide viewport.
> 2. Wait for the chart and legend to render.
> 3. Assert: the legend's bounding box does not overlap the chart's bounding box.
> 4. Resize to 800px-wide. Assert: the legend renders side-by-side with the chart (the layout we had before the fix).
>
> **Anti-success.** The test does not check the legend's content (that is a different test). The test does not assert exact pixel positions (those drift). The test asserts the *non-overlap relationship* and the layout-mode change.

**Step 3 — Generate the Playwright code.**

> "Translate the spec into a Playwright test in `tests/e2e/reporting-legend.spec.ts`. Use the bounding-box helpers we already have in `tests/helpers/layout.ts`. Follow the rest of our Playwright conventions — same `describe` shape, same fixture helpers."

**Step 4 — Run it.**

```sh
pnpm playwright test tests/e2e/reporting-legend.spec.ts
```

If the test passes against the fix and fails against the pre-fix code, you have your protection. If it passes against both, the assertion is too weak. If it fails against both, the assertion is too strict — or the test is testing the wrong thing.

---

## The "read the failure carefully" rule

When a test fails, the failure message is almost always more useful than the failing assertion. Three habits:

**Habit 1.** Read the actual rendered HTML from the failure trace. Playwright captures it. The HTML usually reveals whether the page rendered, whether the elements you queried for exist, whether the CSS shape is what you expected.

**Habit 2.** Distinguish "test wrong" from "code wrong" before changing anything. The test is wrong if the assertion does not match the spec. The code is wrong if the spec describes the right behaviour and the code does not implement it. Same flow:

```
   FAIL → read the spec → read the failure trace
        → are they describing the same shape?
              YES → code is wrong, fix code
              NO  → spec or test is wrong, fix that first
```

**Habit 3.** Never let Claude "fix" the test by relaxing the assertion. A failing test that you weaken is no longer a test; it is a vibe. If Claude proposes "changing `expect(...).toBe(false)` to `expect(...).toBeTruthy()` to make it pass," refuse and ask why the underlying behaviour changed.

---

## Why Claude is good at Playwright

Three properties of Playwright that match Claude Code's strengths:

- **Tests are readable code.** Not magical macros. Claude reads them well, writes them well, and refactors them well.
- **Failures are well-structured.** Trace files, screenshots, network logs. Claude can ingest them and reason.
- **Fixtures are explicit.** Page objects, helpers, test data — all readable code Claude can find by reading the test directory.

The combination means a Green Belt builder can author Playwright tests with the agent confidently. The boss fight in Part C requires at least one Playwright test on the product-repo PR for exactly this reason.

---

## Common failure modes

**Tests that pass for the wrong reason.** A selector that matches anything; an assertion that is `expect(true).toBe(true)`. Fix: write the *failing* test first against pre-fix code; only then write the fix.

**Tests that test implementation, not behaviour.** "The validateForm function was called once." Fix: rewrite the spec around what the *user* sees or experiences, not internal calls.

**Letting Claude generate the test in one shot.** Spec-then-code is two prompts on purpose. The spec is the contract. Skipping it produces tests that read fluently but assert sloppily.

**Treating Playwright snapshots as a substitute for assertions.** Snapshots drift; they catch unintentional changes but are noisy. Use them sparingly. Real assertions on visible behaviour beat snapshot diffs.

**Not running the test before committing.** Generated tests sometimes have small import-path errors or missing fixtures. The agent did not run it. You did not run it. CI did. Fix: run it locally first.

**Testing too many things in one spec.** Five `expect` statements across three behaviours. When it fails, you do not know which behaviour broke. Fix: one spec per named behaviour.

---

## GREEN / YELLOW / RED self-check

- 🟢 GREEN: I can author a Playwright test from a behaviour description, run it, read failures carefully, and ship it without weakening assertions.
- 🟡 YELLOW — I can write tests with Claude but rely on it to fix failures without reading the trace myself.
- 🔴 RED — I have not written a Playwright test with Claude and would not know where to start.

---

## What you can say after this module

> "I write Playwright end-to-end tests with Claude Code spec-first, read failures carefully, and refuse to ship a test whose assertion was weakened to make it pass."

---

## Where to go next

G.13 (*The Playwright Skill pattern*) packages this loop into a reusable skill so you do not write the spec-then-code shape from memory each time.

**Previous:** [← Part B README](README.md) · **Next:** [→ G.13 Playwright Skill pattern](G13-playwright-skill-pattern.md)

**Further reading**

- [Playwright docs](https://playwright.dev/)
- [Yellow Belt Y.11 — Bug hunting with AI](../../02-yellow/Y11-bug-hunting.md)
- [Anthropic on testing-with-the-agent patterns](https://code.claude.com/docs/en/best-practices)
