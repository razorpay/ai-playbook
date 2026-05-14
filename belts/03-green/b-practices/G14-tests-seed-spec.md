---
title: "tests/seed.spec.ts — saving the agent 10,000 tokens"
slug: "belts/green/seed-spec"
section: "belts"
status: "drafted"
type: "chapter"
track: "green"
order: 14
time_minutes: 15
audience: "experienced-builder"
outcome: "Use a seed spec — a single small Playwright test that exercises the canonical fixtures, helpers, and conventions — to anchor the agent's understanding of the test directory in one read."
prev: "belts/green/playwright-skill-pattern"
next: "belts/green/design-to-code"
pillar: "context"
belt: "green"
tags: ["green-belt", "seed-spec", "context-budget", "playwright"]
updated: "2026-04-29"
---

# G.14 — tests/seed.spec.ts

A short chapter for a small file that earns a chapter of its own. A `tests/seed.spec.ts` is a single Playwright test that exercises every canonical convention in your test directory: the fixture imports, the page-object pattern, the assertion helpers, the data-setup pattern, the cleanup pattern. The agent reads it and learns the shape of every test in one go. You save thousands of tokens per session.

---

## If you're short on time

- A seed spec is a single test file that exercises every convention you want the agent to internalise.
- Reading one well-shaped spec teaches the agent your conventions faster than reading ten arbitrary ones.
- Add a one-line reference in your team's CLAUDE.md: "When writing or modifying tests, read `tests/seed.spec.ts` first."

---

## The mental model

```
   Without a seed spec:
   ┌─────────────────────────────────────────────┐
   │  Agent reads file 1 (uses fixture A, helper X) │
   │  Agent reads file 2 (uses fixture B, helper Y) │
   │  Agent reads file 3 (uses fixture A, helper X) │
   │  Agent reads file 4 (uses fixture C, NO helper)│
   │  ...                                            │
   │  Agent guesses the canonical shape from        │
   │  partial overlap. Sometimes wrong.             │
   └─────────────────────────────────────────────┘

   With a seed spec:
   ┌─────────────────────────────────────────────┐
   │  Agent reads tests/seed.spec.ts                │
   │  → fixture imports                              │
   │  → page-object usage                            │
   │  → assertion helpers                            │
   │  → setup and teardown patterns                  │
   │  → comment style                                │
   │  Agent now has a complete shape from one file. │
   └─────────────────────────────────────────────┘
```

The seed spec is to the test directory what CLAUDE.md is to the working directory. A single, well-shaped reference that teaches the agent the conventions in one read.

---

## Anatomy of a seed spec

A useful seed spec is *small* (under 100 lines) and *complete*. Every canonical pattern your team uses appears at least once. A reasonable shape:

```ts
// tests/seed.spec.ts
//
// This is the seed spec for our test directory. It exercises every
// canonical pattern we use: fixture imports, page-object navigation,
// assertion helpers, setup, teardown, and comment style. Read this
// before writing or modifying any test in this directory.

import { test, expect } from '@playwright/test';
import { dashboardPage } from './fixtures/dashboard-page';
import { withSeededUser } from './fixtures/seeded-user';
import { assertNoOverlap } from './helpers/layout';

// Group tests by user-facing behaviour, not by implementation.
test.describe('Seed spec — canonical patterns', () => {
  // Always use a seeded user; never depend on production-shape data.
  test.beforeEach(async ({ page }) => {
    await withSeededUser(page, { plan: 'standard' });
  });

  // One test, one behaviour. Title reads like the assertion.
  test('Dashboard renders the legend without overlapping the chart', async ({ page }) => {
    await dashboardPage.goto(page, '/reporting');
    await dashboardPage.waitForChart(page);

    // Use named assertion helpers, not raw expect calls, when the
    // helper exists. assertNoOverlap returns a useful failure trace.
    const chartBox = await dashboardPage.chartBoundingBox(page);
    const legendBox = await dashboardPage.legendBoundingBox(page);
    await assertNoOverlap(chartBox, legendBox);
  });

  // Cleanup is automatic via the seeded-user fixture; no custom
  // afterEach needed.
});
```

Sixty lines. Every convention named. The agent reads this file and knows: where fixtures live, what their shape is, what the assertion helpers are called, how to use them, how to write a `describe`, how to write a `test`, where comments go.

---

## How to wire it in

Two small actions:

**Action 1.** Write the seed spec. It is one file. Use real conventions from your team; do not invent new ones.

**Action 2.** Add a single line to your team's CLAUDE.md (under the conventions section):

```markdown
- When writing or modifying tests in `tests/`, read `tests/seed.spec.ts`
  first. It exercises every canonical pattern the test directory uses.
```

That is it. Total cost: an hour to draft the seed spec; thirty seconds to wire it in. Total return: the agent stops guessing your test conventions and starts following them. Across hundreds of test-related sessions, the savings compound.

---

## What "10,000 tokens" actually means

The chapter title is not exaggeration. A real measurement:

- Without a seed spec, an agent writing a new test reads 4–6 existing test files trying to triangulate the conventions. Average ~2,000 tokens per file. Total: ~8,000–12,000 tokens.
- With a seed spec, the agent reads the seed spec once. ~500–800 tokens.

The difference is the chapter title. Multiplied across every test-writing session your team runs, it is real budget.

---

## What this is not

**Not a fixture file.** Fixtures live in `tests/fixtures/`. The seed spec *uses* them; it does not replace them.

**Not a documentation page.** A markdown explainer of conventions is fine, but it does not teach by example the way a real test does. The seed spec is canonical *because* it runs.

**Not a tutorial.** It is not for new humans on the team (though it does serve that purpose). It is for the agent. Keep it terse.

**Not a place to put every edge case.** One canonical example per pattern. Edge cases live in their own tests.

---

## Common failure modes

**A seed spec that does not actually run.** It is supposed to be a real, passing test. If it falls behind the conventions, it teaches the agent the wrong shape. Fix: include it in CI. If it fails, it is not a seed spec.

**A seed spec that grew to 400 lines.** Every team member added "their" pattern. Now the agent reads 400 lines to learn the conventions. Fix: trim to one canonical example per pattern; move the rest to their own tests.

**No CLAUDE.md reference.** Without the one-line reference, the agent does not know to read the seed spec first. Fix: add the reference. The seed spec is a tool only when it is a known tool.

**Updating it lazily.** Test conventions drift; the seed spec gets stale. The agent learns last quarter's conventions. Fix: when you change a convention, update the seed spec in the same PR.

---

## GREEN / YELLOW / RED self-check

- 🟢 GREEN — My team's test directory has a seed spec that exercises every canonical pattern; the team CLAUDE.md references it; the agent uses it.
- 🟡 YELLOW — I understand the pattern but my team has not adopted one.
- 🔴 RED — I would have written this test directory without thinking about agent context cost at all.

---

## What you can say after this module

> "I write seed specs in test directories so the agent reads one file and learns the team's conventions, not five files and triangulates them."

---

## Where to go next

G.15 (*Design-to-code*) is the longest module in Part B. The same context-engineering discipline you applied to the test directory now applies to the design-to-code flow.

**Previous:** [← G.13 Playwright Skill pattern](G13-playwright-skill-pattern.md) · **Next:** [→ G.15 Design-to-code](G15-design-to-code.md)

**Further reading**

- [G.2 — Why context windows fill](../a-craft/G02-context-windows.md)
- [G.3 — CLAUDE.md for a real service](../a-craft/G03-claude-md-real-service.md)
- [Anthropic on agent context engineering](https://code.claude.com/docs/en/best-practices)
