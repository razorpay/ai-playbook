---
title: "Git essentials"
slug: "appendices/reference-cards/git-essentials"
section: "appendices"
status: "drafted"
type: "reference-card"
track: "reference-cards"
order: 3
time_minutes: 3
audience: "everyone"
outcome: "Use a one-page reference to remember the everyday Git commands and four recovery moves that handle most situations a White Belt or Yellow Belt encounters."
prev: "appendices/reference-cards/terminal-essentials"
next: "appendices/reference-cards/claude-code-essentials"
pillar: "harness"
belt: null
tags: ["appendix", "reference-card", "git"]
updated: "2026-05-08"
---

# H.3 — Git essentials

> **Printable card · Companion to [W.3 — Git as save-points](../../belts/01-white/W03-git-as-savepoints.md).** The everyday commands plus the four recovery moves.

---

## The everyday commands

| Command | What it does |
|---|---|
| `git status` | Shows what is changed, staged, and untracked. The "where am I" of Git. |
| `git add <file>` | Stages a file for the next commit |
| `git add .` | Stages everything in the current directory |
| `git commit -m "<message>"` | Creates a commit with a message |
| `git push` | Sends commits to the remote |
| `git pull` | Pulls remote changes into your branch |
| `git log` | Shows the commit history. Add `--oneline` for a compact view. |
| `git diff` | Shows what is changed but not staged |
| `git diff --staged` | Shows what is staged but not committed |
| `git branch` | Lists local branches; the current one is marked |
| `git checkout -b <name>` | Creates a new branch and switches to it |
| `git checkout <name>` | Switches to an existing branch |

## The four recovery moves

| Situation | The move |
|---|---|
| You changed a file but want the original back | `git checkout -- <file>` (discards local changes; cannot be undone) |
| You committed something you should not have | `git reset HEAD~1` (undoes the last commit but keeps the changes) |
| You pushed to the wrong branch | Talk to someone before you act. The fix usually involves `git revert`, which is safe. Avoid `git push --force` unless you know exactly what you are doing. |
| You are completely lost and want a clean slate | `git stash` (saves your changes for later); then you can sync with the remote without losing work |

---

## The mental model

Git tracks save-points (commits) of your work. A repository is a tree of those save-points. Branches are named pointers into the tree. The everyday commands move between save-points; the recovery moves get you out of trouble.

Two things to remember:
1. Once a commit is pushed to a shared branch, it is public. Treat it as permanent.
2. `git status` is free. Run it any time you are unsure of state. The output tells you exactly what is happening.

---

## Commit message shape

A good commit message is short, present-tense, and imperative.

| Good | Less good |
|---|---|
| `Add weekly status report skill` | `Added a skill for generating weekly status reports` |
| `Fix off-by-one in pagination` | `Fixed bug` |
| `Document the RFC review cadence in C.3` | `Updated docs` |

The first line is what shows up in `git log --oneline`. Make it useful.

---

## When to escalate

If `git pull` produces a merge conflict and you do not know what to do, **stop typing**. Take a screenshot or copy the output, and ask in the program's primary support channel. Bad merge resolutions are how repositories get into states that are hard to recover from.

If you see "DETACHED HEAD" in `git status`, you can usually recover with `git checkout <branch-name>`. If you are unsure, ask.

---

## What this card is not

**Not a full Git reference.** Git has thousands of options. This card covers what you actually need for White Belt and Yellow Belt.

**Not a substitute for the chapter.** W.3 covers the mental model of save-points, the relationship between local and remote, and the patterns that compound.

**Not a manual for advanced workflows.** Rebasing, cherry-picking, interactive rebase, and submodules all exist; they are not in this card because they are not in White or Yellow Belt.

---

**Remember:** `git status` is free. Run it whenever you are unsure.

**Up to:** [↑ Appendix H](README.md) · **Companion:** [W.3 — Git as save-points](../../belts/01-white/W03-git-as-savepoints.md)
