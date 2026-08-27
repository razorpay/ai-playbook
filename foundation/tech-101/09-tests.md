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
updated: "2026-08-27"
---

# 0A.9 — Tests (what they are, why they exist)

> **⏱ 8 minutes · 👥 Anyone curious · 🎯 Leaves with:** the right mental picture for *why a maintained test suite is strong evidence that a team can ship safely and quickly*.

---

## The one-paragraph answer

A **test** is code that checks other code. You write a small program that says *"given input X, the system should produce output Y,"* the test runs whenever the codebase changes, and if Y stops being what comes out, the test fails — loudly, before anyone gets to use the broken version. A team's collection of tests is its **test suite**. A strong suite makes changes safer and faster because known expectations are checked automatically. It is evidence, not a guarantee: the suite can check only the behaviours it contains.

---

## Re-anchoring

In chapter 0A.8 we traced the journey from a merged PR to users seeing the change. Step three of that journey was *test*. We said the build runs the test suite, and a failing test fails the build, and a failing build doesn't deploy. That's true and important. But it doesn't explain *why* tests get to be the gate.

This chapter is the why. You may not write tests yourself unless you become an engineer, but you will hear about them every day. Whether a team is "well-tested" or "not well-tested" is common shorthand for how safely its codebase can change.

---

## What a test actually looks like

Imagine the world's simplest function: take two numbers, add them, return the result. A test for it might read like:

```javascript
test("add returns the sum of two numbers", () => {
  expect(add(2, 2)).toBe(4);
});
```

In words: *the test is named "add returns the sum of two numbers." When run, it calls `add(2, 2)`. It expects the result to be `4`. If the result is `4`, the test passes. If anything else, the test fails.*

A real-world test suite has hundreds or thousands of these, each checking a different small claim about how the code should behave. The suite as a whole is run automatically: on every PR, on every build, or before every deploy. When a change breaks a behaviour the suite already covers, a previously passing test should fail. That early signal is what makes tests valuable.

You don't need to read code to read this chapter. The shape is what matters: *given input, expect output, run automatically*. Tests are the codified version of "I'd hoped this would work."

---

## Three kinds of tests, in plain English

There are dozens of names for kinds of tests in the wild. Three categories cover most conversations:

**Unit tests.** Tests of one *small piece* of code in isolation — typically a single function. Fast (milliseconds each), narrow, lots of them. The example above is a unit test. Unit tests catch bugs in *individual building blocks*; they run thousands at a time in seconds.

**Integration tests.** Tests of *multiple pieces working together*. *"When a customer places an order, the order is saved in the database, the payment is charged, and the customer gets a confirmation email."* Integration tests are slower (seconds each), broader, fewer of them. They catch bugs that arise *between* pieces — exactly the seam-bug class we met in chapter 0A.2.

**End-to-end (E2E) tests.** Tests of the *whole system* from a user's perspective. A real browser opens the app, clicks through the actual UI, fills in the actual forms, hits the actual API, reads the actual response, asserts that the right thing happened. Slow (tens of seconds to minutes each), expensive to maintain, but the most realistic. E2E tests catch the bugs that look fine in isolation and break only when the *user journey* is exercised.

A healthy test suite has all three, in roughly a triangle: many unit tests at the bottom, fewer integration tests in the middle, even fewer E2E tests at the top. This is sometimes called the "test pyramid"; you'll hear the term and now you know what it's about.

---

## Why a strong test suite matters

A maintained test suite is one of the clearest differences between a risky deploy and a routine one. The reasoning is straightforward:

**Without tests**, every change is a guess. You change one file and pray nothing else breaks. The only way to know the system still works is to manually check, by hand, every behaviour you can think of. You can't think of all of them. You miss things. Things break. Customers find them.

**With tests**, every change runs the suite. The codified expectations are checked automatically. If one fails, you investigate, fix the code or the expectation, and rerun. A green result means those checks passed; it does not say anything about behaviour the suite never tested.

The compounding is the part that makes test suites powerful. A team that writes a regression test when it fixes a bug keeps an executable record of the failure. If the same behaviour breaks again and the test remains trustworthy, the suite should catch it. Without that test, the team may rediscover the same bug later with only human memory to help.

There's a famous practitioner's saying: *the test suite is the team's institutional memory of "things that have hurt us."* It's a defensible claim. *"What broke last time?"* is the most-asked question in any engineering org; the answer either lives in the test suite (where it's automatic) or in someone's head (where it eventually leaves).

---

## Why "we don't have tests" is a confession

When a team admits they don't have tests, what they're really admitting is one of three things:

- **They're early enough that they haven't yet paid the cost.** A 2-month-old project can move fast without tests, because the surface area is small enough that bugs are visible. By month six, the cost compounds.
- **They wrote tests once but stopped when the suite became inconvenient.** A neglected test suite gradually becomes a *failing* test suite — tests that nobody bothers to keep green because the signal got too noisy. A failing test suite is worse than no tests, because it teaches the team that the suite isn't trustworthy.
- **They wrote tests at the wrong layer.** Some teams have hundreds of unit tests but no integration tests, and break constantly at the seams. Some have only E2E tests and nothing finer-grained, and pay for it in slow CI.

The healthiest teams have a *trusted* test suite: failures are investigated, flaky checks are repaired, and important behaviours are represented. Green means no known check failed, so the team can combine that result with review, staged rollout, and monitoring. Red means the team stops to understand whether the product, the test, or the environment is wrong. The value comes from acting on the signal, not believing it blindly.

---

## What AI changed

AI coding tools reduce the effort of drafting tests, especially when the expected behaviour and repository conventions are clear. They do not remove the reasoning work.

Given a function, surrounding code, and a precise behaviour, an AI tool can draft unit, integration, or end-to-end tests quickly. The draft can still assert the implementation instead of the requirement, miss a risky boundary, invent fixtures, or pass without proving the intended outcome. A human must define the behaviour, review the assertions, run the test, and inspect failures.

The practical implication: use AI for the first draft, not the final verdict. Ask it to identify behaviours and edge cases, choose the right test layer, and produce a test that fails before the fix and passes after it. Then review whether the assertions prove the requirement rather than merely exercise the code.

For non-engineers, *"this team has good test coverage"* should prompt a follow-up: *which important behaviours and risk boundaries do the tests cover?* How the first draft was produced matters less than whether the finished tests are meaningful and trusted.

---

## What "test coverage" actually means

You'll hear the phrase **test coverage** — usually expressed as a percentage. It reports how much instrumented code ran during the suite. A tool may report lines, statements, functions, or branches, so first ask which measure is being quoted. *"This service has 80% line coverage"* means roughly four-fifths of its instrumented lines ran at least once; it does not mean 80% of its behaviour is correct.

Coverage is useful for finding code the suite never reaches and for spotting sudden drops. It is misleading when treated as a quality score. A project with 100% line coverage might still have weak assertions, while a project with a lower percentage might test its highest-risk behaviours more effectively.

The mental model: coverage describes **execution breadth**, not **test quality**. Ask both *"what ran?"* and *"what important claim did the test prove?"* The percentage can guide investigation; it cannot replace it.

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
- **A maintained test suite is strong evidence, not a safety guarantee.** Green means the codified checks passed; review, rollout, and monitoring still matter.
- **AI speeds up the first draft, not the judgement.** Humans still define expected behaviour, review assertions, run the tests, and inspect failures.
- **Coverage measures execution breadth, not quality.** Ask what ran and what important claim the test proved.
- The next chapter ([0A.10 — Shape of a software org](10-shape-of-a-software-org.md)) closes Tech 101 with the cast (engineers, designers, PMs, ops, SRE, QA) and how they interact to make all of this work.

---

**Previous:** [← 0A.8 Build, deploy, staging, production](08-build-deploy.md) · **Next:** [→ 0A.10 Shape of a software org](10-shape-of-a-software-org.md)

**Further reading**
- [Martin Fowler — The practical test pyramid](https://martinfowler.com/articles/practical-test-pyramid.html) — the canonical write-up of the unit/integration/E2E mix
- [Kent C. Dodds: Write tests, not too many, mostly integration](https://kentcdodds.com/blog/write-tests) — the modern counterargument; useful for nuance
- [Playwright documentation](https://playwright.dev/) — the E2E testing framework most teams now use; pairs cleanly with AI-assisted authoring
