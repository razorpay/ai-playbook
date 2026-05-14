---
title: "Git as save-points"
slug: "belts/white/git-as-savepoints"
section: "belts"
status: "drafted"
type: "chapter"
track: "white"
order: 3
time_minutes: 45
audience: "new-builder"
outcome: "Use branches, commits, push, pull, status, and diff as the save-point system behind pull requests."
prev: "belts/white/terminal-fluency"
next: "belts/white/auth-setup"
pillar: "harness"
belt: "white"
tags: ["white-belt", "git", "pull-requests"]
updated: "2026-04-27"
---

# W.3 - Git as save-points

Git is the shared save-point system for code. A commit is a named save point. A branch is a safe lane for your work. A pull request is the review conversation around moving your save points back into the shared lane.

White Belt does not require deep git. It requires enough git to avoid losing work and enough judgement to ask before forceful commands.

---

## If you're short on time

- Run `git status` constantly. It tells you what changed and what git thinks is happening.
- Work on a branch, not directly on the shared branch.
- A PR is not "extra admin." It is how your change becomes reviewable and mergeable.

---

## The mental model

Picture a notebook with checkpoints.

```text
main branch:      A --- B --- C
your branch:               \--- D --- E
```

`A`, `B`, `C`, `D`, and `E` are commits. The shared branch has the team's commits. Your branch starts from the shared branch and adds your commits. A PR asks: "Can D and E join the shared branch?"

The four verbs matter:

- **clone**: bring a repo to your laptop;
- **commit**: make a local save point;
- **push**: send your save point to the remote repo;
- **pull**: bring remote updates down to your laptop.

---

## The White Belt git loop

The loop you need is:

```bash
git status
git switch -c white-belt/hello-razorpay
# edit one file
git diff
git add README.md
git commit -m "docs: update hello razorpay note"
git push -u origin white-belt/hello-razorpay
```

You will use that loop in Quest W-1.

---

## Worked example

Use an assigned sandbox repo. Do not practice random commits in a production repo.

Clone the repo:

```bash
git clone <assigned-sandbox-repo>
cd <assigned-sandbox-folder>
git status
```

Create a branch:

```bash
git switch -c white-belt/practice
```

Open `README.md` and add one harmless line in the practice section. Then inspect:

```bash
git status
git diff
```

Read the diff. A `+` line is added. A `-` line is removed. If the diff shows files you did not intend to touch, stop and ask for help before committing.

Stage the intended file:

```bash
git add README.md
git status
```

Commit:

```bash
git commit -m "docs: add white belt practice note"
git status
```

Push:

```bash
git push -u origin white-belt/practice
```

The remote host will give you a PR link or show the branch in the browser. That is the bridge into W12.

---

## Commands you should recognize

| Command | Meaning |
|---|---|
| `git status` | Show current branch and changed files. |
| `git diff` | Show unstaged changes. |
| `git diff --staged` | Show changes ready to commit. |
| `git add <file>` | Stage one file for commit. |
| `git commit -m "message"` | Create a save point. |
| `git switch -c <branch>` | Create and move to a new branch. |
| `git pull` | Bring remote changes down. |
| `git push` | Send local commits up. |

Avoid these until you have help: `reset --hard`, `push --force`, bulk deletion, and anything you cannot explain in one sentence.

---

## Common failure modes

**"I am on the wrong branch."** Run `git status`. If you have no changes, switch to the correct branch. If you have changes, ask before switching.

**"Git says there are conflicts."** Stop. Conflicts mean two changes touched the same lines. That is solvable, but it is not a solo White Belt move.

**"I committed the wrong file."** Pause. A mentor or Claude can help inspect and repair. The important thing is not to stack more commits blindly.

**"Push was rejected."** The remote has changes you do not have, or the branch setup is wrong. Copy the exact output into your help request.

**"I do not understand the diff."** Ask Claude: "Explain this diff line by line. Do not change files." Diff reading is a skill, not a moral test.

---

## GREEN / YELLOW / RED self-check

You are **GREEN** if you can:

- clone an assigned sandbox repo;
- create a branch;
- make one README edit;
- read `git status` and `git diff`;
- commit and push one change.

You are **YELLOW** if:

- commit works but push fails;
- you can read status but not diff;
- you changed extra files accidentally.

You are **RED** if:

- clone fails because of access;
- conflicts appear;
- a command suggests force, reset, or destructive repair.

YELLOW and RED are normal in the first week. Save the exact terminal output.

---

## What you can say after this module

> "I can use git as save-points for one small change."

---

**Previous:** [W.2 Terminal fluency](W02-terminal-fluency.md) - **Next:** [W.4 Your auth setup](W04-auth-setup.md)
