---
title: "PR craft"
slug: "belts/yellow/pr-craft"
section: "belts"
status: "drafted"
type: "chapter"
track: "yellow"
order: 13
time_minutes: 20
audience: "daily-builder"
outcome: "Write small, reviewable PRs with clear titles, descriptions, staged commits, and reviewer etiquette."
prev: "belts/yellow/debugging-loop"
next: "belts/yellow/staying-current"
pillar: "harness"
belt: "yellow"
tags: ["yellow-belt", "pull-request", "review"]
updated: "2026-04-27"
---

# Y.13 - PR craft

Yellow Belt PRs should be easy to review. The code change may be tiny, but the PR should show the loop: symptom, context, decision, verification.

Reviewers are busy. A clear PR is an act of respect.

---

## If you're short on time

- Keep the PR small enough to review in minutes.
- Include what changed, why, how you checked it, and what context informed it.
- Use staged commits or staged files to keep unrelated changes out.

---

## The mental model

```text
Diff shows what changed.
Description shows why.
Checks show confidence.
Triage shows judgement.
```

The PR description should make the reviewer trust your process before they even read the diff.

---

## Title shape

Good:

```text
fix: keep submit button enabled after valid edit
docs: fix typo in integration guide
ui: clarify empty state copy for date filters
```

Weak:

```text
changes
fix bug
updates
Claude changes
```

The title should be specific enough to find later.

---

## Description template

```markdown
## What changed

One or two bullets.

## Why

The symptom and user-facing impact.

## Triage

What context you checked: git history, Slack thread, ticket, design, doc, or local reproduction.

## Checks

- Ran:
- Verified:
- Screenshots:

## Risk

What this might affect, or why risk is low.
```

For Yellow Belt, the Triage section is the differentiator. It proves you did not ask AI to edit in a vacuum.

---

## Worked example

```markdown
## What changed

- Updated the empty-state copy shown after date filtering.
- Kept existing component and state logic unchanged.

## Why

The current copy reads like there are no transactions at all. The design and thread context indicate it should say no records match the active filter.

## Triage

- Reproduced locally with a filtered transaction list.
- Messaging thread pointed to date-filter confusion.
- Design context provided approved empty-state copy.
- Relevant component is `TransactionEmptyState`.

## Checks

- Reviewed `git diff`.
- Confirmed only one component changed.
- Captured before/after screenshot.

## Risk

Copy-only change. No data logic changed.
```

This is more helpful than a long narrative.

---

## Staged commits and staged files

Use:

```bash
git status
git diff
git add <intended-file>
git diff --staged
git commit -m "fix: clarify filtered empty state"
```

Do not use `git add .` unless you have inspected every changed file. Yellow Belt mistakes often enter through accidental staging.

---

## Review etiquette

- Tag the right reviewer, not the nearest friend.
- Mention why the PR is small.
- Respond to review comments with the change or a question.
- If scope grows, split or pause.
- Thank reviewers by making the next PR easier to review.

If a reviewer asks for a bigger change than Yellow scope, say so:

```text
I can make the typo/copy fix here. The broader state refactor may need a separate team-owned PR.
```

---

## Common failure modes

**"The PR description just says fixed."** Add symptom, triage, and checks.

**"Extra files slipped in."** Use staged files and `git diff --staged`.

**"The PR mixes cleanup with the bug fix."** Split it. Reviewers should not hunt for the relevant change.

**"I tagged no reviewer."** A PR without a path can sit forever.

**"Claude wrote the description and I did not check it."** Read it. Remove invented claims.

---

## GREEN / YELLOW / RED self-check

You are **GREEN** if:

- your PR title is specific;
- your description includes triage and checks;
- the diff is small and intentional;
- a reviewer path is clear.

You are **YELLOW** if:

- the PR is correct but description is thin;
- the reviewer is unclear;
- checks are manual and need better evidence.

You are **RED** if:

- unrelated changes are included;
- the description claims checks not run;
- the PR changes scope during review.

---

## What you can say after this module

> "I can make the reviewer's job easy by showing what changed, why, and how I checked it."

---

**Previous:** [Y.12 Debugging with Claude](Y12-debugging-loop.md) - **Next:** [Y.14 Staying current](Y14-staying-current.md)

