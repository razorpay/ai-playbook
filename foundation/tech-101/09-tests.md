---
title: "Tests: what they are, why they exist"
slug: "tech-101/tests"
section: "foundation"
status: "drafted"
type: "chapter"
track: "tech-101"
order: 9
time_minutes: 8
audience: "anyone-curious"
outcome: "Know why a green test suite is evidence, not ceremony."
prev: "tech-101/build-deploy"
next: "tech-101/shape-of-a-software-org"
pillar: null
belt: null
tags: ["software-basics", "testing"]
updated: "2026-04-26"
---

# 0A.9 — Tests (what they are, why they exist)

> **⏱ 8 minutes · 👥 Anyone curious · 🎯 Leaves with:** the right mental picture for *why a green test suite is the single biggest predictor of how fast a team can actually ship*.

---

## The one-paragraph answer

A **test** is code that checks other code. You write a small program that says *"given input X, the system should produce output Y,"* the test runs whenever the codebase changes, and if Y stops being what comes out, the test fails — loudly, before anyone gets to use the broken version. A team's collection of tests is its **test suite**. A team with a strong test suite ships fast and breaks rarely; a team without one ships slowly and breaks often. *Tests are the technical artefact most directly responsible for whether a team feels confident or terrified to deploy.*

---

## Re-anchoring

In chapter 0A.8 we traced the journey from a merged PR to users seeing the change. Step three of that journey was *test*. We said the build runs the test suite, and a failing test fails the build, and a failing build doesn't deploy. That's true and important. But it doesn't explain *why* tests get to be the gate.

This chapter is the why. You won't write tests yourself unless you become an engineer (and even then, AI now writes most of them) but you'll hear about tests every day. Whether a team is "well-tested" or "not well-tested" is the single most-used shorthand for "is this code base safe to change."

---

## What a test actually looks like

Imagine the world's simplest function: take two numbers, add them, return the result. A test for it might read like:

```javascript
test("add returns the sum of two numbers", () => {
  expect(add(2, 2)).toBe(4);
});
```

In words: *the test is named "add returns the sum of two numbers." When run, it calls `add(2, 2)`. It expects the result to be `4`. If the result is `4`, the test passes. If anything else, the test fails.*

A real-world test suite has hundreds or thousands of these, each checking a different small claim about how the code should behave. The suite as a whole is run automatically: on every PR, on every build, on every deploy. A new bug almost always shows up as *a previously-passing test that's now failing*. That signal is what makes tests valuable.

You don't need to read code to read this chapter. The shape is what matters: *given input, expect output, run automatically*. Tests are the codified version of "I'd hoped this would work."

---

## Three kinds of tests, in plain English

There are dozens of names for kinds of tests in the wild. Three categories cover most conversations:

**Unit tests.** Tests of one *small piece* of code in isolation — typically a single function. Fast (milliseconds each), narrow, lots of them. The example above is a unit test. Unit tests catch bugs in *individual building blocks*; they run thousands at a time in seconds.

**Integration tests.** Tests of *multiple pieces working together*. *"When a customer places an order, the order is saved in the database, the payment is charged, and the customer gets a confirmation email."* Integration tests are slower (seconds each), broader, fewer of them. They catch bugs that arise *between* pieces — exactly the seam-bug class we met in chapter 0A.2.

**End-to-end (E2E) tests.** Tests of the *whole system* from a user's perspective. A real browser opens the app, clicks through the actual UI, fills in the actual forms, hits the actual API, reads the actual response, asserts that the right thing happened. Slow (tens of seconds to minutes each), expensive to maintain, but the most realistic. E2E tests catch the bugs that look fine in isolation and break only when the *user journey* is exercised.

A healthy test suite has all three, in roughly a triangle: many unit tests at the bottom, fewer integration tests in the middle, even fewer E2E tests at the top. This is sometimes called the "test pyramid"; you'll hear the term and now you know what it's about.

---

## Why a green test suite is the *thing* that matters

Most engineers will tell you, if asked honestly, that the difference between *terrified* deploys and *confident* deploys is whether the team has a strong test suite. The reasoning isn't subtle:

**Without tests**, every change is a guess. You change one file and pray nothing else breaks. The only way to know the system still works is to manually check, by hand, every behaviour you can think of. You can't think of all of them. You miss things. Things break. Customers find them.

**With tests**, every change runs the suite. The thousand things you might have broken are checked automatically. If you broke any of them, the suite fails, you fix it, you re-run. By the time the change reaches users, *every codified expectation about how the system should behave* has been verified.

The compounding is the part that makes test suites enormous. A team that writes a test every time they fix a bug grows a suite that catches that bug *forever after*. The same bug never makes it past the suite again. A team that doesn't write that test fixes the same bug three or four times over the course of a year, each time wondering if they've seen this before.

There's a famous practitioner's saying: *the test suite is the team's institutional memory of "things that have hurt us."* It's a defensible claim. *"What broke last time?"* is the most-asked question in any engineering org; the answer either lives in the test suite (where it's automatic) or in someone's head (where it eventually leaves).

---

## Why "we don't have tests" is a confession

When a team admits they don't have tests, what they're really admitting is one of three things:

- **They're early enough that they haven't yet paid the cost.** A 2-month-old project can move fast without tests, because the surface area is small enough that bugs are visible. By month six, the cost compounds.
- **They wrote tests once but stopped when the suite became inconvenient.** A neglected test suite gradually becomes a *failing* test suite — tests that nobody bothers to keep green because the signal got too noisy. A failing test suite is worse than no tests, because it teaches the team that the suite isn't trustworthy.
- **They wrote tests at the wrong layer.** Some teams have hundreds of unit tests but no integration tests, and break constantly at the seams. Some have only E2E tests and nothing finer-grained, and pay for it in slow CI.

The healthiest teams have a *believed-in* test suite. The signal is true. Everyone knows that when the suite is green, the change is safe to ship. When the suite is red, *something is actually broken*. That belief, once established, is worth a lot. A team that *believes* its tests can deploy ten times a day; a team that doesn't can deploy once a week.

---

## What AI changed

Tests used to be a tax: boring code, written under duress, that nobody enjoyed writing. AI changed the economics.

Modern AI coding tools (Claude Code among them) write tests *very well*. Given a function, given the surrounding code, given a description of what the function should do, AI produces a near-complete unit test in seconds. Integration tests follow the same pattern. E2E tests are slower for AI to write (they involve more orchestration) but Playwright + Claude Code is, today, the most efficient way most teams write E2E tests they actually maintain.

The practical implication: *the cost of writing tests is no longer the bottleneck.* The bottleneck is now the *discipline* of writing them. Whether you get a test added every time a bug is found is a culture question, not a productivity one. AI removed the labour; the habit is what's left.

For non-engineers reading this: when you hear *"this team has good test coverage,"* what's increasingly meant is *"this team has internalised the discipline of asking AI to write tests alongside fixes."* The technique part is solved; the habit part is the differentiator.

---

## What "test coverage" actually means

You'll hear the phrase **test coverage** — usually expressed as a percentage. It refers to the fraction of the codebase that's exercised by the test suite when it runs. *"This service has 80% coverage"* means roughly four-fifths of its lines of code are hit by at least one test.

Coverage is a useful metric and a misleading one. Useful: a project with 5% coverage is genuinely undertested; a project with 80% is genuinely well-tested. Misleading: a project with 100% coverage might still have terrible tests (every line is run, but no claims are checked); a project with 60% coverage in the *right* places might be more reliable than one with 95% in the wrong places.

The mental model: coverage is necessary but not sufficient. *"What's the coverage?"* is the wrong question. *"Are the tests checking what would actually break us if it broke?"* is the right one. Coverage is a proxy; the proxy is sometimes wrong.

---

## What tests don't catch

For honesty's sake, a few things tests don't catch:

- **Bugs the team didn't think to test for.** Tests check the things you knew to check. Novel bugs (the surprise, the edge case nobody imagined) go through the suite untouched.
- **User-experience problems.** A test can verify a button exists and is clickable; it can't verify that the button is *findable*. UX bugs tend to need humans.
- **Performance regressions.** A change that makes the system slower might pass every functional test. Specific *performance* tests exist, but they're rarer and harder to maintain.
- **Issues that only emerge at scale.** A bug that only happens at 10x current traffic won't appear in any test that runs in a normal CI environment.

For these, teams use other layers: staged rollouts, observability, beta testing, customer support feedback. Tests are powerful but not omnipotent. The best teams pair a strong test suite with a strong "we'll find out fast and roll back" culture, on the theory that both layers together catch what either misses.

---

## What you should carry into the next chapter

- **A test is code that checks other code.** Given input, expect output, run automatically.
- **Three kinds: unit, integration, end-to-end.** Different speed/scope trade-offs; healthy suites have all three.
- **A green test suite is the single biggest predictor of fast, confident shipping.** A red or absent suite is the single biggest predictor of fragility.
- **AI changed the cost of writing tests, not the value of having them.** The discipline of *adding tests* is now the differentiator, not the labour.
- **Coverage is a proxy.** Useful at extremes, misleading in the middle. *"Are tests checking what would break us?"* is the better question.
- The next chapter ([0A.10 — Shape of a software org](10-shape-of-a-software-org.md)) closes Tech 101 with the cast (engineers, designers, PMs, ops, SRE, QA) and how they interact to make all of this work.

---

**Previous:** [← 0A.8 Build, deploy, staging, production](08-build-deploy.md) · **Next:** [→ 0A.10 Shape of a software org](10-shape-of-a-software-org.md)

**Further reading**
- [Martin Fowler — The practical test pyramid](https://martinfowler.com/articles/practical-test-pyramid.html) — the canonical write-up of the unit/integration/E2E mix
- [Kent C. Dodds: Write tests, not too many, mostly integration](https://kentcdodds.com/blog/write-tests) — the modern counterargument; useful for nuance
- [Playwright documentation](https://playwright.dev/) — the E2E testing framework most teams now use; pairs cleanly with AI-assisted authoring
