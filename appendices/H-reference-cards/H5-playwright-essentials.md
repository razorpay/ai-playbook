---
title: "Playwright essentials"
slug: "appendices/reference-cards/playwright-essentials"
section: "appendices"
status: "drafted"
type: "reference-card"
track: "reference-cards"
order: 5
time_minutes: 3
audience: "engineer"
outcome: "Use a one-page reference to remember the everyday Playwright commands plus the four most useful debugging moves."
prev: "appendices/reference-cards/claude-code-essentials"
next: "appendices/reference-cards/mv-wiki-one-pager"
pillar: "harness"
belt: null
tags: ["appendix", "reference-card", "playwright", "testing"]
updated: "2026-05-08"
---

# H.5 — Playwright essentials

> **Printable card · Companion to [G.12 — E2E testing with Playwright + Claude Code](../../belts/03-green/b-practices/G12-playwright-and-claude-code.md).** The everyday commands plus four debugging moves.

---

## The everyday commands

| Command | What it does |
|---|---|
| `npx playwright test` | Runs all tests |
| `npx playwright test <file>` | Runs tests in a single file |
| `npx playwright test --grep "<name>"` | Runs only tests whose name matches the pattern |
| `npx playwright test --ui` | Opens the Playwright UI for interactive runs |
| `npx playwright test --debug` | Runs tests in debug mode with the inspector |
| `npx playwright test --headed` | Runs tests with the browser visible (default is headless) |
| `npx playwright codegen <url>` | Records actions into a test script |
| `npx playwright show-report` | Opens the HTML report from the last run |

---

## The four debugging moves

When a test is failing and you cannot tell why:

| Move | What it does |
|---|---|
| **Run with `--headed`** | See the browser. Most "why is this failing" questions resolve when you can see what is happening. |
| **Run with `--ui`** | Time-travel through the test steps. Inspect the DOM at each point. |
| **Add `page.pause()` in the test** | The test stops at this line; you can interact with the browser and the inspector manually. |
| **Read the trace** | After a failure, the trace file in `test-results/` has screenshots, network logs, and DOM snapshots. |

---

## The test shape

A typical Playwright test:

```js
import { test, expect } from '@playwright/test';

test('user can sign in and see dashboard', async ({ page }) => {
  await page.goto('https://example.com/login');
  await page.getByLabel('Email').fill('user@example.com');
  await page.getByLabel('Password').fill('test-password');
  await page.getByRole('button', { name: 'Sign in' }).click();
  await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
});
```

The shape: navigate, interact, assert. Three steps. A test that does more than that is usually doing too much.

---

## Locator best practices

Playwright's locators are stable. Prefer accessible ones:

| Best | Worse |
|---|---|
| `page.getByRole('button', { name: 'Sign in' })` | `page.locator('.btn.btn-primary')` |
| `page.getByLabel('Email')` | `page.locator('#email-input')` |
| `page.getByText('Welcome back')` | `page.locator('div.welcome-msg')` |

Why: role and label locators survive CSS refactors. Class-name locators do not.

---

## The seed pattern

For tests that need authenticated state, use `tests/seed.spec.ts` (see [G.14](../../belts/03-green/b-practices/G14-tests-seed-spec.md)). The seed pre-establishes state once; downstream tests skip the setup. This saves 10,000 tokens of agent context per test run.

---

## What this card is not

**Not a Playwright manual.** The full Playwright docs are at [playwright.dev](https://playwright.dev). This card covers what you actually need for G.12.

**Not a substitute for the chapter.** [G.12](../../belts/03-green/b-practices/G12-playwright-and-claude-code.md) covers the patterns at the level of why they work. [G.13](../../belts/03-green/b-practices/G13-playwright-skill-pattern.md) covers using a skill to author tests one-shot.

**Not the right tool for unit tests.** Playwright is for end-to-end tests against a running app. For unit tests, use the project's unit testing framework.

---

**Remember:** when a test is failing, run with `--headed` or `--ui` first. Most questions resolve when you can see the browser.

**Up to:** [↑ Appendix H](README.md) · **Companion:** [G.12 — E2E testing](../../belts/03-green/b-practices/G12-playwright-and-claude-code.md)
