---
title: "Your first PR"
slug: "belts/white/first-pr"
section: "belts"
status: "drafted"
type: "chapter"
track: "white"
order: 12
time_minutes: 30
audience: "new-builder"
outcome: "Move one reviewed local change from branch to pull request with a clear title, description, and reviewer path."
prev: "belts/white/permission-system"
next: "belts/white/quest-turn-green"
pillar: "harness"
belt: "white"
tags: ["white-belt", "pull-request", "review"]
updated: "2026-04-27"
---

# W.12 - Your first PR

A pull request is the bridge between "I changed a file" and "the team can review this." White Belt PRs are tiny by design. You are learning the loop, not trying to impress anyone with scope.

Quest W-1 asks for a sandbox PR. Boss Fight W-B asks for one merged real typo fix. This module teaches the mechanics both use.

---

## If you're short on time

- A PR needs a branch, a commit, a push, a title, a description, and a reviewer path.
- Keep the first PR to one intentional file change.
- The description should say what changed, why it is safe, and how it was checked.

---

## The mental model

```text
local edit -> git diff -> commit -> push -> pull request -> review -> merge or close
```

Each step makes the change more visible:

- `git diff` makes it visible to you;
- commit makes it a named save point;
- push makes it visible remotely;
- PR makes it visible to reviewers;
- merge makes it part of the shared branch.

---

## Worked example

Start from a clean sandbox repo:

```bash
git status
git switch -c white-belt/hello-razorpay
```

Ask Claude Code for a one-line README change, or edit it yourself. Then inspect:

```bash
git diff
git status
```

If the diff is exactly what you expect:

```bash
git add README.md
git commit -m "docs: add hello razorpay note"
git push -u origin white-belt/hello-razorpay
```

Open the PR in the remote host.

Use this PR shape:

```markdown
## What changed

Added one White Belt practice line to README.md.

## Why

This confirms I can create a branch, make a tiny change, commit, push, and open a PR.

## Checks

- Ran `git diff` before commit.
- Confirmed only README.md changed.
- No product code touched.
```

For Quest W-1, the PR can be closed after review. For Boss Fight W-B, the PR must merge.

---

## Reviewer path

Every PR should have a human path:

- sandbox PR: assigned cohort reviewer, mentor, or self-attested path if allowed by the quest;
- real typo PR: repo owner or docs owner;
- unclear owner: ask in the program route with the repo name and one-line summary.

Do not tag a random teammate just because they are online. Review is part of the program signal.

---

## What counts as checked

For a one-line README change:

- `git diff` shows one intended change;
- no generated files changed;
- no lockfiles changed;
- branch name is readable;
- PR title says what happened;
- PR description includes checks.

For a typo PR:

- the typo is real;
- the fix does not alter meaning;
- the target file is public-facing or open-source;
- reviewer can verify in under two minutes.

---

## Common failure modes

**"My PR includes extra files."** Stop. Do not ask for review yet. Use `git diff` and `git status` to identify extra changes.

**"I committed before reviewing diff."** Review now. If the commit is wrong, ask for help before stacking more commits.

**"I do not know what to write in the description."** Use the three headings: what changed, why, checks.

**"Review feels scary."** Good review is a safety net. White Belt changes are intentionally small so the first review can be gentle and fast.

**"The PR is open but nobody saw it."** Route it to the assigned reviewer path with one sentence and the link.

---

## GREEN / YELLOW / RED self-check

You are **GREEN** if:

- you can create a branch;
- make one intentional README change;
- commit and push;
- open a PR with a clear title and description;
- show a reviewer the evidence.

You are **YELLOW** if:

- push works but the PR UI is confusing;
- extra files appear in the diff;
- you are unsure who should review.

You are **RED** if:

- repo access blocks clone or push;
- conflicts appear;
- you cannot tell what is in the PR.

---

## What you can say after this module

> "I can turn one local change into a reviewable pull request."

---

**Previous:** [W.11 The permission system](W11-permission-system.md) - **Next:** [Quest W-0 Turn GREEN](quest-W0-turn-green.md)

