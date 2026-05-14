---
title: "Quest W-1: The HelloRazorpay commit"
slug: "belts/white/quest-hello-razorpay"
section: "belts"
status: "drafted"
type: "quest"
track: "white"
order: 91
time_minutes: 45
audience: "new-builder"
outcome: "Open and close a tiny sandbox PR that proves branch, commit, push, and PR mechanics."
prev: "belts/white/quest-turn-green"
next: "belts/white/boss-fight"
pillar: "harness"
belt: "white"
tags: ["white-belt", "quest", "pull-request", "sandbox"]
updated: "2026-04-27"
---

# Quest W-1 - The HelloRazorpay commit

> **Win condition:** a PR exists on the assigned sandbox repo, contains one intentional README change, and is closed or reviewed according to the cohort rule.

Quest W-1 proves the mechanics of shipping without the risk of a real product repo.

---

## Prerequisite

Quest W-0 must be GREEN.

If your setup is YELLOW or RED, do not use W-1 to discover more failures. Fix the environment first.

---

## The task

1. Clone the assigned sandbox repo.
2. Create a branch named with the White Belt convention.
3. Change one line in `README.md`.
4. Review the diff.
5. Commit.
6. Push.
7. Open a PR.
8. Close it or route it for review, depending on the cohort rule.

The content of the README line is not important. The loop is important.

---

## Worked command path

```bash
git clone <assigned-sandbox-repo>
cd <assigned-sandbox-folder>
git status
git switch -c white-belt/hello-razorpay
```

Edit `README.md`. Then:

```bash
git diff
git add README.md
git commit -m "docs: add hello razorpay note"
git push -u origin white-belt/hello-razorpay
```

Open the PR in the remote host and use the description from [W.12 Your first PR](W12-first-pr.md).

---

## Evidence template

```markdown
## Quest W-1 evidence

Builder handle:
Date:
Quest W-0 evidence link:
Sandbox repo:
Branch:
PR URL:
PR state: open / reviewed / closed
Files changed:
Reviewer or self-attestation:
Follow-up needed:
```

The PR URL is the core evidence. A screenshot is useful but not enough without the link.

---

## What counts

This counts:

- one branch created by you;
- one intentional README change;
- one commit with a readable message;
- PR opened against the assigned sandbox repo;
- PR link captured in evidence.

This does not count:

- editing a file locally without a PR;
- opening a PR from a personal fork unless the cohort explicitly assigned that path;
- a PR with generated files or unrelated changes;
- a PR someone else opened for you;
- a branch with no commit from your machine.

---

## Common failure modes

**"Push fails."** Check repo access and branch name. Copy the exact output.

**"The PR includes extra files."** Do not close or submit yet. Inspect `git status` and `git diff`.

**"I forgot to branch first."** Stop and ask for help before trying to repair history.

**"The remote UI is confusing."** That is normal. Ask for a reviewer path with the branch link.

---

## Success criteria

You pass Quest W-1 when:

- Quest W-0 is GREEN;
- the sandbox PR exists;
- the PR contains only the intended tiny change;
- the PR URL is captured;
- the PR is closed, reviewed, or accepted according to the cohort rule.

---

## What you can say after this quest

> "I can move one local edit into a pull request."

Now the final White Belt step is to do the same shape of work on one tiny real change.

---

**Previous:** [Quest W-0 Turn GREEN](quest-W0-turn-green.md) - **Next:** [Boss Fight W-B](boss-fight-WB-one-real-typo.md)

