---
title: "Boss Fight G-B: The double-ship"
slug: "belts/green/boss-fight"
section: "belts"
status: "drafted"
type: "boss-fight"
track: "green"
order: 99
time_minutes: 360
audience: "experienced-builder"
outcome: "Ship two merged PRs — one on a product repo with five named sub-requirements, plus your Quest G-2 greenfield PR — and earn Green Belt."
prev: "belts/green/security-review-subagent"
next: "belts/green/badge"
pillar: "harness"
belt: "green"
tags: ["green-belt", "boss-fight", "double-ship", "capstone"]
updated: "2026-04-29"
---

# 🏁 Boss Fight G-B — The double-ship

> **Belt unlocked on completion:** 🟢 Green Belt
> **Time budget:** 6 hours active, more elapsed (review cycles, design alignment)
> **Prerequisites:** Parts A, B, and C all read at GREEN colour; Quest G-1 claimed; Quest G-2 claimed
> **What you'll prove:** that the craft (Part A), the practices (Part B), and the guardrails (Part C) compose into a real product PR (not just a greenfield one) and that you can stand behind the prompt craft of the work to a teammate

---

## What the boss fight is

Two merged PRs. They count together; one without the other is not a passing run.

**PR 1 — The product-repo PR.** A real feature on a product repo that the cohort lead matches you to (the product surface should be one your team or an adjacent team owns; not a one-off sandbox). The product-repo PR is the centre of the boss fight; it must satisfy five named sub-requirements (below).

**PR 2 — The Quest G-2 greenfield PR.** Already claimed in v0.10. References here as the second half of the evidence chain.

The two together demonstrate that you can ship in product (where the guardrails matter most) and in greenfield (where the cross-over of craft and practice is most visible). Green Belt is awarded on the pair.

---

## The five sub-requirements (product-repo PR)

The product-repo PR must include all five:

### (a) A scoped CLAUDE.md for the change

A `CLAUDE.md` (or amendments to the existing one) that names the rules the change cares about: the read-replica rule, the currency rule, the time-zone rule, the design-system rule, whatever the surface's policy actually is. Per [G.3](../a-craft/G03-claude-md-real-service.md) and [G.4](../a-craft/G04-hierarchical-claude-md.md). The CLAUDE.md does not have to be new; an existing one updated to cover the change qualifies.

### (b) At least one Playwright test

A real, runnable, behaviour-focused Playwright test that exercises the changed user-visible behaviour. Per [G.12](../b-practices/G12-playwright-and-claude-code.md) (spec-then-code) and [G.13](../b-practices/G13-playwright-skill-pattern.md) (the Playwright Skill pattern). Snapshot-only tests do not count; the test must assert a named behaviour.

### (c) A pre-ship-check pass with all six layers green

A clean run of the [pre-ship-check skill (G.26)](G26-pre-ship-check-skill.md). All six layers (redlines, design system, tests, PR craft, prompt craft, behaviour preservation) must be GREEN. A YELLOW with an explicit PR-description note is acceptable; a RED is not.

### (d) The PR-guardrail used to construct the PR

The program-pinned PR-craft skill (the one Yellow Belt's [Y.13](../../02-yellow/Y13-pr-craft.md) referenced) was applied during the build. This shows up in the prompt-craft trace in pre-ship-check Layer 5; the PR description should mention which skills shaped the work.

### (e) A teammate's sign-off on the *craft of the prompts*

A teammate, ideally outside your immediate team per Appendix L's "sample size" rule for Green and above, signs off specifically on the *prompt craft* — not just whether the output is correct but whether the prompts that produced it show three-pillar discipline (per [G.1](../a-craft/G01-three-pillars.md)) and the Green Belt voice (per [G.11](../a-craft/G11-advanced-prompting.md) and [G.21](../b-practices/G21-debugging-hard-kind.md)).

This is the Green-Belt-distinct review criterion. Yellow Belt asked for "did this PR work"; Green Belt asks for "did this PR show how a Green Belt builder thinks."

---

## What does NOT count

- A product-repo PR that misses any of the five sub-requirements.
- A pre-ship-check that has not been run, or that ran with one layer flagged and was shipped anyway.
- A Playwright test that uses snapshots only without a behaviour assertion.
- A PR whose description does not name the skills used or the three-pillar decisions made.
- A teammate sign-off that is "looks good" without naming prompt craft.
- Two PRs that are both greenfield, or both product. The mix matters.
- A PR that exercises only Parts A and B without Part C's guardrail discipline being visible.

---

## How to do it

### Step 1 — Match to a product surface (~1 hour, mostly elapsed)

Talk to your cohort lead. Together you pick a product surface where:

- you have authorisation to land changes;
- the change is real (not a "for the boss fight" stunt);
- the change is small enough to fit in 4–6 hours of active work;
- the change touches enough surface to exercise Parts A + B + C.

Common shapes: a small UI fix on a dashboard, a settings-page improvement, a small backend endpoint that an existing UI consumes, a typed-model addition with the corresponding UI work.

Avoid: a feature that requires a design partner's full sprint (slow); a refactor that has no user-visible behaviour change (hard to test); a change in PCI/KYC scope (different review path; not boss-fight-suitable).

### Step 2 — Plan the cross-Parts story (~30 minutes)

Before writing code, sketch the same plan shape Quest G-2 used:

- **Part A techniques.** Which CLAUDE.md / skill / subagent / worktree / advanced-prompting moves will this change need? At least three.
- **Part B practices.** Which Playwright pattern / design-to-code / daily loop / branch preview / observability moves? At least three.
- **Part C guardrails.** Which redline reflexes / proxy considerations / regulator-scope checks / pre-ship-check layers / security-review-subagent invocations apply? At least three.

If you cannot list three from each, the change is not big enough. Re-scope with the cohort lead.

### Step 3 — Build (~3–4 hours active)

Build the change. Apply the techniques you planned. Use:

- a scoped CLAUDE.md for the change (sub-requirement a);
- the Playwright spec-then-code loop for at least one test (sub-requirement b);
- the daily loop, branch preview, design-system connector as appropriate;
- the redline reflex on every prompt;
- the security-review subagent on the diff before you open the PR.

### Step 4 — Run the full pre-flight (~30 minutes)

Before opening the PR:

- run the pre-ship-check skill — all six layers must be GREEN;
- run the Blade-compliance reviewer on any UI files touched;
- run the security-review subagent on the diff;
- preview the change at desktop and 320px on the branch URL.

If pre-ship-check flags anything: fix it. **Do not work around the gate.** The boss fight requires a clean pass; a flagged pre-ship-check that ships is a failed boss fight regardless of merger.

### Step 5 — Open the PR (~30 minutes)

The PR description names the cross-Parts story explicitly. Use this shape:

```markdown
## What this PR does

<one or two sentences>

## Why now

<one sentence>

## Part A techniques used

- <technique 1, with a one-line note>
- <technique 2, ...>
- <technique 3, ...>

## Part B practices used

- <practice 1, ...>
- <practice 2, ...>
- <practice 3, ...>

## Part C guardrails applied

- <guardrail 1, ...>
- <guardrail 2, ...>
- <guardrail 3, ...>

## Sub-requirement evidence

- (a) Scoped CLAUDE.md: <path or PR-internal change reference>
- (b) Playwright test: <path>
- (c) pre-ship-check: clean run (all 6 layers GREEN); log <link>
- (d) PR-guardrail used: <skill name(s)>
- (e) Teammate sign-off on prompt craft: @<handle>, see comment

## Preview

<branch-preview URL>

## Tested

- desktop viewport: pass
- 320px mobile viewport: pass
- Playwright suite: <new test name> passes
- security-review subagent: clean (or "X findings, addressed" with link)
```

This shape is the boss fight's evidence chain in PR form. Reviewers click the preview, read the description, click the Playwright test path, and verify the five sub-requirements. The PR is reviewable in fifteen minutes if the description is honest.

### Step 6 — Get the prompt-craft sign-off (~elapsed; ~30 minutes active for the reviewer)

The teammate (outside your immediate team per Appendix L) reviews the PR for prompt craft specifically. They look at:

- whether the PR description's named techniques match what the diff actually shows;
- whether the prompt-craft trace in pre-ship-check Layer 5 shows three-pillar discipline;
- whether the worked examples in the change show Green-Belt voice (advanced prompting per G.11; pushing back on confidently wrong answers per G.21).

The reviewer leaves a comment that explicitly addresses prompt craft: not "code looks good," but "the three-pillar discipline shows in the worked example at line 47" or "the agent's first answer was wrong and the diff shows you noticed."

This sign-off is sub-requirement (e). It is the Green-Belt-distinct review criterion; without it, the boss fight is incomplete.

### Step 7 — Iterate to merge (~elapsed)

Reviewers comment. You iterate. The hard-kind debugging skill from G.21 applies if a reviewer is confidently wrong; the productive-pushback move applies if you are.

The PR merges (or lands under named review per the cohort rule).

### Step 8 — Cross-belt retro (~30 minutes)

Write a retro that ties both PRs together. The retro covers:

- which Part A craft compounded with which Part B practice on the product PR;
- which Part C guardrail caught what;
- where the cross-over with Quest G-2's greenfield PR was (e.g. a skill you wrote in Quest G-1 that ended up useful in the boss-fight PR);
- one thing that surprised you;
- one thing you would do differently next time.

The retro is what the cohort tracker reads; it is what makes the boss fight "claimed" rather than just "merged."

---

## Evidence template

Copy into your tracker or `LEARNER.md`:

```markdown
## Boss Fight G-B — The double-ship

- Builder: <handle>
- Date claimed: <YYYY-MM-DD>
- Product-repo PR URL: <link>
- Product-repo merge link: <link>
- Greenfield PR URL (Quest G-2): <link>
- Greenfield merge link (Quest G-2): <link>
- Reviewer for product PR: <handle> (out-of-team per Appendix L: yes)
- Sub-requirement evidence:
  - (a) Scoped CLAUDE.md: <link>
  - (b) Playwright test: <path>
  - (c) pre-ship-check log: <link or paste>
  - (d) PR-guardrail invoked: <skill name(s)>
  - (e) Prompt-craft sign-off comment: <link>
- Cross-belt retro: <one-paragraph or link>
```

The pair of PRs is the artefact. The five sub-requirements are the proof. The retro is the proof of internalisation. All three are required.

---

## Reviewer routing

The boss fight is the most heavily reviewed artefact in the program. Per [Appendix L](../../../appendices/L-certification/README.md):

- the product-repo PR has at least one out-of-team reviewer;
- the prompt-craft sign-off (sub-requirement e) is from a Green Belt or higher; the cohort lead chases if needed;
- the cohort lead reviews the cross-belt retro;
- the badge claim (next chapter) routes to the program lead for the certification step.

Direct managers cannot be the certifying reviewer for their own report (Appendix L conflict-of-interest rule). The reviewer rotation handles this case.

---

## What you can say after this boss fight

> "I have shipped a real product feature with all five Green Belt sub-requirements — scoped CLAUDE.md, Playwright test, clean pre-ship-check, PR-guardrail used, prompt-craft teammate sign-off — and the cross-Parts retro that ties it to my greenfield work. I am ready for Green Belt."

---

## Common pitfalls

**Picking a product surface that is too big.** The boss fight is 4–6 hours of active work. A surface that needs a sprint is wrong-sized. Fix: re-scope with the cohort lead.

**Skipping a sub-requirement and arguing it was implicit.** All five must be explicit. Fix: name each in the PR description.

**Working around a pre-ship-check flag.** The single most common boss-fight failure. Fix: address the flag; do not weaken the gate.

**Same-team-only sign-off.** Convenient but does not satisfy Appendix L's sample-size rule for Green. Fix: out-of-team reviewer for the prompt-craft sign-off.

**A vague retro.** "I learned a lot" is not the retro. Fix: name specific Part A / Part B / Part C techniques that compounded.

**Treating the boss fight as a feature ship.** The feature is the vehicle; the boss fight is the demonstration of the belt. Both matter; the second is what you are graded on.

---

**Previous:** [← G.28 Security-review subagent](G28-security-review-subagent.md) · **Next:** [→ Green Belt badge](badge.md)

**Further reading**

- [Quest G-1 — Author a team skill](../a-craft/quest-G1-author-a-team-skill.md)
- [Quest G-2 — The Greenfield cross-over](../b-practices/quest-G2-greenfield-crossover.md)
- [Appendix L — Certification](../../../appendices/L-certification/README.md)
- All eleven Part A modules, ten Part B modules, and seven Part C modules
