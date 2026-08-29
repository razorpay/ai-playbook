---
title: "Git, conceptually: save points for files"
slug: "tech-101/git"
section: "foundation"
status: "drafted"
type: "chapter"
track: "tech-101"
order: 7
time_minutes: 8
audience: "anyone-curious"
outcome: "Understand commits, branches, and pull requests as collaboration primitives."
prev: "tech-101/code-is-text"
next: "tech-101/build-deploy"
pillar: null
belt: null
tags: ["software-basics", "git"]
updated: "2026-08-29"
---

# 0A.7 — Git, conceptually (save points for files)

> **⏱ 8 minutes · 👥 Anyone curious · 🎯 Leaves with:** the mental model behind every PR, every branch, and every "merge conflict" conversation you'll ever overhear.

---

## The one-paragraph answer

**Git records named snapshots of a project's tracked files, with the ability to compare them, branch into parallel versions, and merge those versions back together — even when many people are editing at once.** It is widely used by modern software teams, but not every folder or repository uses Git. You don't need to learn Git's commands to read this playbook. You do need the mental model. This chapter is the model; the commands are taught in White Belt.

---

## The save-point analogy

If you've played a video game, you know what a save point is. You play for an hour. You hit a save point. You can keep playing — and if something goes catastrophically wrong, you can return to the save point and try again from there.

Git is that idea for a project's tracked files. Every time you finish a meaningful chunk of work, you tell Git: *"save this, with a note about what I did."* Git records a snapshot of those files at that moment. You can keep editing. If you mess something up, you can return to an earlier save point. If a teammate wants to know what changed since yesterday, they can compare two snapshots and inspect the difference.

That single idea (*every meaningful change is a save point you can rewind to*) is most of what makes Git useful. The rest of the chapter is what you can do *with* a list of save points once you have one.

---

## The vocabulary, in one pass

You'll hear all of these. Here's what each actually means:

**Commit.** One save point. It records a snapshot of the project's tracked files, plus metadata such as its parent, author, time, and a short message. Git can compare that snapshot with another commit to show a diff; the commit itself is not stored as a change list. Every commit has an ID (a hash such as `8a3f9c1`) you can refer to it by. *"Commit"* is also a verb: *"I'll commit this and push it up"* means *"I'll record a save point and share it."*

**Branch.** A movable name pointing to a line of commits — usefully pictured as a *parallel timeline*. A hosted repo usually designates a default branch, often called `main`. When you start a new piece of work, you create a branch from an existing commit and make new commits there. Your work does not change `main` until it is integrated. When the work is ready, you can *merge* your branch into its target branch, combining the histories.

**Merge.** Combining two branches' histories into one. If you and a colleague worked on different branches at the same time, your branches each have commits the other doesn't. Merging integrates both. Most merges happen smoothly; the awkward ones are *merge conflicts* (next term).

**Merge conflict.** When Git cannot automatically reconcile two histories. Overlapping edits to the same lines are the familiar case, but a conflict can also happen when one branch edits a file that the other deletes. Git marks the conflict and asks a human to resolve the competing intent. A conflict is not corruption; it is a request for a decision.

**Push.** Sending local commits and branch updates to a remote repository, so others and hosted automation can see them.

**Pull.** Fetching changes from a remote and integrating them into your current branch, usually with a merge or rebase. The integration step can produce a conflict when remote and local work cannot be reconciled automatically.

**Pull request (PR).** A formal *proposal* on a hosting service to merge one branch into another — often your working branch into `main`. Git itself has no PR object; GitHub and Bitbucket add pull requests on top, while GitLab calls the equivalent a merge request. We'll come back to this; it's where much of the team-collaboration value lives.

That's the working set. Seven terms; the rest is detail.

---

## The picture: branches as parallel timelines

The mental picture worth carrying:

```
                                     ┌─── feature/login-fix ───●────●───●
                                    /                                   \
   main ──●──●──●──●──●──●──●──●──●──●──●──●──●─────────────────────────●─── ●─── ...
                          \                                              ↑
                           └── feature/cart-redesign ──●──●──●──●────────┘
                                                                merged
```

`main` is the trunk in this example. New work happens on branches that start from a commit on `main`, run alongside for a while, and eventually merge back. A busy repo may have dozens of branches in flight: features being built, bugs being fixed, experiments being tried, and stalled work that someone may or may not return to.

This is the central trick of Git: **multiple streams of work can move in parallel, then be reconciled deliberately.** It is how a team of 50 engineers can work in the same codebase without simply overwriting one another's accepted changes.

---

## The pull request — where teams actually use Git

A pull request is the *social* layer on top of the technical machinery. When your branch is ready to merge, you don't just merge it — you open a PR.

A PR is a page on GitHub (or whichever hosting service you use) that shows:

- *What's in your branch that's not in `main`* — the diff. Every changed line, side by side.
- *A description* you wrote, explaining what the change does and why.
- *Comments and discussions*: your reviewers leave inline notes on specific lines, the team debates, you respond, you make follow-up commits.
- *Automated checks*: the tests, linters, and security scans configured for this repo report their results. Green checks, red Xs, or a clear sign that no check covers that risk.
- *The merge button* — once required reviews and checks pass, the PR can be merged into its target branch. Your change becomes part of that branch's history.

Most of the *real* work of a team using Git happens in PRs, not in raw commits. The PR is where:

- Code review happens (a teammate reads your work and gives feedback before it lands).
- Quality gates run (tests, accessibility checks, security scans).
- Decisions get recorded (the discussion thread can answer "why did we do it this way?" months later).
- Knowledge transfers (a new joiner reads recent merged PRs to learn how the team works).

Every belt in this playbook revolves around opening PRs. The Yellow Belt boss fight asks for one. The Green Belt boss fight asks for two. The Black Belt is about authoring tools that *land in PRs other people open*. The PR is the unit of contribution.

---

## Why Git is common

Git is widely used, but it is not the only version-control system. Teams still use systems such as Subversion and Perforce where their repositories, assets, or workflows call for them. For a PM or designer, the useful conclusion is narrower: Git vocabulary will appear in most software delivery conversations.

Three characteristics explain much of its adoption:

- **It's distributed.** A normal clone gives you local history and lets you commit, inspect, branch, and merge offline. Shallow, partial, and single-branch clones intentionally download less, so do not assume any laptop contains every object or can reconstruct all server-side state.
- **Branching is cheap.** In older systems, branching was an event. In Git, it's a single command, takes microseconds, and the team's mental model expanded to match. Most modern team workflows depend on branching being trivially cheap.
- **Hosting services add collaboration.** GitHub, GitLab, Bitbucket, and internal hosts add PRs or merge requests, discussions, reviews, permissions, and automation on top of Git. Many people encounter Git through one of these hosted workflows, but the host and the version-control system are separate layers.

You don't need to know any of this. But "we use Git" and "we use GitHub" are stated as if they're the same thing in most teams' day-to-day, and now you know they're related-but-not-identical.

---

## The five operations you'll actually do (in concept)

When White Belt teaches you the actual Git commands, here's the conceptual map you're filling in:

1. **Clone.** Get a fresh copy of the repo on your laptop. *"Show me the project."*
2. **Branch.** Create a parallel timeline for your new work. *"I'm starting something new."*
3. **Commit.** Record a save point on your branch. *"Here's what I did."*
4. **Push.** Send your branch's commits to GitHub. *"Sharing my work."*
5. **Pull request → merge.** Propose your changes for inclusion. *"Please review and integrate."*

That's the loop. White Belt walks you through each step with the actual commands. Yellow Belt has you doing it daily. Green Belt has you orchestrating multiple branches at once. Black Belt has you running the loop on someone else's behalf.

When AI joins the picture, the collaboration contract *doesn't* change — Claude Code can help with each step, but its output still needs the same versioning and review. *"Make a branch, commit your work, push it, open a PR"* is a common finish for a shared code change, AI-assisted or not.

---

## Why this chapter matters even if you'll never run a Git command

Two reasons.

The first is conversational. The terms in this chapter (branch, commit, PR, merge conflict) appear in many product teams' daily talk. The PM who asks an engineer *"what's the status of that PR?"* and gets a five-minute answer is much better off if they understand what was being said. *"It's blocked on a merge conflict because the design system was bumped"* lands as English when you've read this chapter; before this chapter it might have been Greek.

The second is collaborative. Many AI workflows you'll soon be running (even non-coding ones in Ops 101) will involve a Git-shaped artefact somewhere. Recipe libraries are committed to repos. Skills are versioned in repos. The distinction between *"I edited it"* and *"I committed and pushed it so my team has it"* matters whether or not you wrote any code.

Once you can name what's happening, you can participate. Once you can participate, you can contribute. That's the on-ramp Git opens.

---

## What you should carry into the next chapter

- **Git is save-points for files**, plus the ability to branch and merge.
- **Seven terms cover most conversations:** commit, branch, merge, merge conflict, push, pull, pull request. Memorise the gist of each.
- **A PR concentrates *team* coordination**: review, automated checks, decisions recorded, knowledge transferred. In this playbook, the PR is the unit of contribution.
- **Git is common because it is distributed, branching is cheap, and hosting services add the social layer.**
- **You don't need to write Git commands to participate** — you need the vocabulary. The commands come at White Belt.
- The next chapter ([0A.8: Build, deploy, staging, production](08-build-deploy.md)) is about what happens *after* a PR is merged. How the change actually reaches users.

---

**Previous:** [← 0A.6 Code is text](06-code-is-text.md) · **Next:** [→ 0A.8 Build, deploy, staging, production](08-build-deploy.md)

**Further reading**
- [Atlassian — Git tutorial](https://www.atlassian.com/git/tutorials) — the most readable hands-on Git intro on the internet, free
- [Pro Git (free book)](https://git-scm.com/book/en/v2) — the canonical reference; you don't need to read it linearly, but the first three chapters are gold if you want depth
- [Julia Evans — How does Git work?](https://wizardzines.com/zines/git/) — paid; the friendliest illustrated explanation of the bits this chapter glossed over
- [Git — commit objects](https://git-scm.com/book/en/v2/Git-Internals-Git-Objects#_commit_objects) — what a commit records
- [Git — `pull`](https://git-scm.com/docs/git-pull) — fetch plus integration into the current branch
- [Git — merge conflicts](https://git-scm.com/docs/git-merge#_how_conflicts_are_presented) — how Git presents conflicts for resolution
- [Git — `clone`](https://git-scm.com/docs/git-clone) — shallow, partial, and single-branch clone options
