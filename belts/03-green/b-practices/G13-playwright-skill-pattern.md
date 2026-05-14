---
title: "The Playwright Skill pattern — one-shot test quality"
slug: "belts/green/playwright-skill-pattern"
section: "belts"
status: "drafted"
type: "chapter"
track: "green"
order: 13
time_minutes: 30
audience: "experienced-builder"
outcome: "Package the Playwright spec-then-code loop into a skill that turns a behaviour description into a working test in one invocation."
prev: "belts/green/playwright-and-claude-code"
next: "belts/green/seed-spec"
pillar: "context"
belt: "green"
tags: ["green-belt", "playwright", "skill-pattern", "skill-authoring"]
updated: "2026-04-29"
---

# G.13 — The Playwright Skill pattern

G.12 taught the spec-then-code loop. This chapter packages it. A `playwright-spec` skill lets a builder say "write a test for the legend-overlap regression" once and get a vetted, runnable Playwright test back — same shape, every time. This is the canonical example of the Skills pattern from G.6/G.7 applied to an operational workflow.

---

## If you're short on time

- A skill is the right wrapper when the spec-then-code loop has run cleanly three times by hand. Writing the skill freezes the shape.
- The skill's body names the spec template, the code conventions, the fixture imports, the failing-first rule. Builders read none of it; the agent applies all of it.
- The output is a Playwright test file plus a one-line invocation log saying which behaviour it protects.

---

## The shape

A `playwright-spec` skill follows the SKILL.md anatomy from G.7. The frontmatter declares the trigger; the body declares the behaviour. The skill *itself* exists as a single SKILL.md file in the team's skills directory and gets invoked by typing one of its trigger phrases or via a `/playwright-spec` slash command.

The skill captures:

- **Trigger phrases.** "Write a Playwright test for...", "protect against the X regression", "write an E2E test that...".
- **Hard rules.** Spec-first; never weaken an assertion to pass; always test user-visible behaviour, not internals; always run the test once; always commit only after the test fails appropriately.
- **Inputs.** The behaviour description (one sentence from the user), the target test directory, the available fixture helpers, the Playwright config.
- **Outputs.** The spec in plain English; the Playwright code; the run log; a one-line invocation log.
- **Workflow.** Read the behaviour description → draft the spec → ask the user to approve → translate to code → run the test → report.

---

## A worked SKILL.md (sketch)

```markdown
---
name: playwright-spec
description: >
  Write a Playwright end-to-end test from a behaviour description.
  Trigger phrases: "write a Playwright test for...",
  "protect against the X regression", "write an E2E test that...".
  The skill always produces the spec in plain English first, then
  translates it to code, then runs it and reports the result. Defers
  to the team CLAUDE.md for Playwright conventions.
---

# Playwright Spec

## Overview

This skill turns a user-described behaviour into a working Playwright
test. The skill always writes the spec in plain English first, lets
the user approve it, then translates the spec to code and runs the
test. The skill never ships a test whose assertion was weakened to
make it pass.

## Hard Rules

- Always write the spec in plain English first; never skip to code.
- Never weaken an assertion to make a test pass. If the test fails,
  read the failure carefully; the spec or the code is wrong.
- Always test user-visible behaviour, not internal calls. No
  spying on internal functions.
- Always run the test at least once before reporting. A test that
  has not run is not a test.
- Never silently change a snapshot to make it match. Snapshots
  drift; that is a different conversation.
- Never invent fixture helpers; if the helper does not exist,
  surface the gap and stop.

## Inputs

- A behaviour description from the user (one sentence).
- The target test directory (default `tests/e2e/`).
- The available fixture helpers (auto-discovered from the
  fixtures directory).
- The Playwright config (auto-loaded).

## Outputs

- The spec in plain English (printed to chat for user approval).
- The Playwright test file at `<target>/<descriptive-name>.spec.ts`.
- A run log showing the test passed or failed, with the relevant
  trace excerpt if it failed.
- A one-line invocation log: "Authored Playwright test for
  <behaviour> at <path>; <pass|fail>."

## Workflow

1. Read the behaviour description. If it is too vague (e.g. "test
   the dashboard"), ask the user to scope it to one named behaviour
   and stop.
2. Read the target test directory and the existing fixture
   helpers. Do not invent helpers; reuse what exists.
3. Draft the spec in plain English with: setup steps, assertion(s),
   anti-success ("the test does not assert ..."). Print the spec
   and ask the user to approve.
4. On approval, translate the spec into Playwright code. Use the
   team's existing test conventions (auto-detect from neighbouring
   test files) for `describe`/`test` shape, fixture imports, and
   helper usage.
5. Run the test. Report pass or fail with the relevant excerpt.
6. If the test passed, suggest committing. If it failed, surface
   the failure and ask the user whether to fix the spec, the test,
   or the underlying code. Do not relax the assertion.

## References

- Team CLAUDE.md (Playwright conventions, fixture layout)
- Playwright docs (the public reference)
- G.12 (the spec-then-code loop this skill encodes)
```

That sketch is roughly 70 lines. It is a real skill body: clear trigger, hard rules with reasons, precise inputs and outputs, numbered workflow that names what is read, what is produced, what is asked. A reader can copy this template and adapt it to their team's exact Playwright shape in under an hour.

---

## Why this skill is the canonical Part B example

Three reasons G.13 is worth a chapter, not just a bullet in G.7.

### Reason 1 — It encodes a hard rule that humans forget

The spec-then-code rule is easy to write down and hard to remember at 5 PM on a Friday. A skill that applies it on every invocation is more reliable than a teammate who applies it most of the time.

### Reason 2 — It composes with hooks (G.10)

A `playwright-spec` skill plus a `pre-pr-test-coverage` hook means: every PR that touches a UI component runs through the hook, and the hook can suggest the skill for behaviours not yet covered. The team does not have to remember to write tests; the harness asks.

### Reason 3 — It is the ceiling for a pattern, not the floor

Most teams should not write their own `playwright-spec` skill from scratch. The program-pinned plugin's skills library is where this canonical pattern should live, vendored and maintained centrally. Teams adopt; they do not re-invent. G.13 teaches you to *recognise* this pattern when you see it, *consume* it from the library, and *contribute back* if your team's variant is more general.

---

## What goes wrong without the skill

Without the skill, the spec-then-code rule depends on every builder remembering it every time. The data from busy weeks shows builders skip the spec step, ship tests with weak assertions, and create a slow drift toward "tests we kept around for the green-checkmark feel" rather than "tests that protect what we care about."

The skill makes the rule structural. The team's discipline does not depend on memory.

---

## Common failure modes

**Writing the skill too early.** If your team has run the spec-then-code loop only twice, the skill freezes the wrong shape. Wait for the third run.

**Treating the skill as the policy.** The skill *applies* the policy from G.12. If G.12's policy changes, the skill is updated. If the skill argues with G.12, the skill is wrong.

**Skill bloat.** Adding "and also generate the migration", "and also update the changelog", "and also notify the team in Slack." Each addition makes the skill less reliable. Fix: split. One skill, one job.

**Forgetting the run-and-report step.** A skill that authors the test but does not run it is half a skill. The test file existing is not the same as the test passing.

**Not naming a maintainer.** The skill goes stale. The Playwright API drifts. Six months later, the skill produces tests that fail in confusing ways. Fix: every skill has a named owner; quarterly review.

---

## GREEN / YELLOW / RED self-check

- 🟢 GREEN — I can recognise when a workflow earns a skill, write the SKILL.md, and reason about whether to keep it team-local or contribute it to the program library.
- 🟡 YELLOW — I understand skills as a concept but have not yet drafted the Playwright skill myself.
- 🔴 RED — I would copy the skill from a teammate without reading the body.

---

## What you can say after this module

> "I can package an operational workflow like Playwright spec-then-code into a skill that applies the discipline structurally: and I know when to write it, when to consume it from the library, and when to contribute back."

---

## Where to go next

G.14 — *`tests/seed.spec.ts`* — is the shortest module in Part B. A small file that saves the agent ten thousand tokens of context per session. The compounding investment continues.

**Previous:** [← G.12 Playwright + Claude Code](G12-playwright-and-claude-code.md) · **Next:** [→ G.14 seed.spec.ts](G14-tests-seed-spec.md)

**Further reading**

- [G.6 — Skills overview](../a-craft/G06-skills-overview.md)
- [G.7 — Writing your first SKILL.md](../a-craft/G07-writing-your-first-skill.md)
- [Appendix C — Skills Library](../../../appendices/C-skills-library/README.md)
