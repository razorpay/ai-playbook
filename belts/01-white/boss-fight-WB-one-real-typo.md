---
title: "Boss Fight W-B: One real typo, merged"
slug: "belts/white/boss-fight"
section: "belts"
status: "drafted"
type: "boss-fight"
track: "white"
order: 99
time_minutes: 90
audience: "new-builder"
outcome: "Find one genuine typo or equivalent micro-fix, use AI assistance to triage it, and land the merged PR."
prev: "belts/white/quest-hello-razorpay"
next: "belts/white/badge"
pillar: "harness"
belt: "white"
tags: ["white-belt", "boss-fight", "merged-pr"]
updated: "2026-04-27"
---

# Boss Fight W-B - One real typo, merged

> **Win condition:** one genuine typo or equivalent micro-fix is merged in a public-facing Razorpay doc or open-source repo, with evidence captured.

This boss fight is tiny on purpose. You are not proving that you can build a feature. You are proving that you can notice a real issue, use AI to help triage safely, create a clean PR, and get it merged.

---

## Prerequisite

You must have:

- Quest W-0 GREEN;
- Quest W-1 PR completed;
- a working branch/commit/push/PR loop;
- permission to contribute to the target repo or a clear external contribution path.

---

## What counts as a real typo

A real typo is:

- visible in a public-facing document or open-source repo;
- unambiguous;
- safe to fix without changing product meaning;
- small enough for a reviewer to verify quickly.

Equivalent micro-fixes can count if they are equally small and reviewable:

- broken punctuation in docs;
- repeated word;
- malformed Markdown link text;
- obvious heading mismatch;
- tiny formatting issue that affects readability.

When in doubt, ask before opening the PR.

---

## The AI-assisted triage step

Do not ask Claude to roam the whole internet looking for typos. Use it narrowly.

Good prompt:

```text
Goal: help me inspect this public-facing Markdown file for obvious typos or repeated words.
Scope: this file only.
Constraints: do not rewrite style, do not change meaning, do not edit yet.
Success criteria: list at most three candidate micro-fixes and explain why each is safe.
```

Pick one candidate. Then ask:

```text
Apply only the single typo fix we selected. Show me the diff. Do not commit.
```

Read the diff yourself. If the change is more than one tiny correction, stop and narrow.

---

## Step-by-step

1. Choose a target doc or open-source repo.
2. Create a branch.
3. Use Claude to inspect one file for obvious micro-fixes.
4. Pick exactly one fix.
5. Apply the fix.
6. Review `git diff`.
7. Commit with a clear message.
8. Push and open PR.
9. Route to the appropriate reviewer.
10. Wait for merge or respond to review.

The merge is the belt evidence. An open PR is not enough for White Belt certification.

---

## PR description template

```markdown
## What changed

Fixed one typo in <file>.

## Why

The original text contained <short neutral description>. This PR does not change product meaning.

## Checks

- Reviewed the diff.
- Confirmed only the intended line changed.
- No product code touched.
```

Keep the description boring. Boring is good.

---

## Evidence template

```markdown
## Boss Fight W-B evidence

Builder handle:
Date opened:
Date merged:
Target repo:
Branch:
PR URL:
Merge link:
Reviewer:
Quest W-0 evidence link:
Quest W-1 evidence link:
What changed:
Follow-up needed:
```

Reviewer sign-off is required for the boss fight. If the repo host records the merge, the merge link is enough.

---

## What does NOT count

This does not count:

- a typo fixed only in your local copy;
- a PR opened but not merged;
- a style rewrite disguised as a typo fix;
- a change in a private scratch repo;
- a typo introduced by you and then fixed by you;
- a PR with unrelated cleanup;
- a change made entirely by someone else.

Small does not mean fake. The change must be real.

---

## Common failure modes

**"I found ten typos and fixed all of them."** That is larger than this boss fight. Fix one, or split into clearly scoped PRs after the belt evidence is done.

**"The reviewer asked for wording changes."** Keep the scope tiny. If the review turns into a style discussion, ask whether the original typo fix can land separately.

**"The PR is open but not merged."** Follow up politely through the repo's review path. The belt waits for merge.

**"Claude rewrote the paragraph."** Reject it. Ask for the smallest change that fixes only the typo.

---

## Success criteria

White Belt boss fight passes when:

- the change is genuine;
- the PR is merged;
- the PR contains no unrelated changes;
- reviewer or merge evidence exists;
- the badge template can point to W-0, W-1, and W-B evidence.

---

## What you can say after this boss fight

> "I have shipped code."

That is White Belt.

---

**Previous:** [Quest W-1 HelloRazorpay commit](quest-W1-hello-razorpay.md) - **Next:** [White Belt badge](badge.md)

