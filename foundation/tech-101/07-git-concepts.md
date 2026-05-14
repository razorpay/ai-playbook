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
updated: "2026-04-26"
---

# 0A.7 — Git, conceptually (save points for files)

> **⏱ 8 minutes · 👥 Anyone curious · 🎯 Leaves with:** the mental model behind every PR, every branch, and every "merge conflict" conversation you'll ever overhear.

---

## The one-paragraph answer

**Git is a system for tracking every change to a folder of files, with the ability to rewind, branch into parallel versions, and merge those versions back together — even when many people are editing at once.** Every modern software team uses it. Every repo (chapter 0A.6) is, technically, a Git repo. You don't need to learn Git's commands to read this playbook. You do need the mental model. This chapter is the model; the commands are taught in White Belt.

---

## The save-point analogy

If you've played a video game, you know what a save point is. You play for an hour. You hit a save point. You can keep playing — and if something goes catastrophically wrong, you can return to the save point and try again from there.

Git is exactly that, but for folders of files. Every time you finish a meaningful chunk of work, you tell Git: *"save this, with a note about what I did."* Git records the state of the entire folder at that moment. You can keep editing. If you mess something up, you can rewind to any save point. If a teammate wants to know what changed since yesterday, they can compare today's state to yesterday's save point and see exactly what's different.

That single idea (*every meaningful change is a save point you can rewind to*) is most of what makes Git useful. The rest of the chapter is what you can do *with* a list of save points once you have one.

---

## The vocabulary, in one pass

You'll hear all of these. Here's what each actually means:

**Commit.** One save point. A snapshot of the folder at a moment in time, *plus* the difference from the previous snapshot, *plus* a short message describing what changed. Every commit has a unique ID (a hash like `8a3f9c1`) you can refer to it by. *"Commit"* is also a verb: *"I'll commit this and push it up"* means *"I'll record a save point and share it."*

**Branch.** A *parallel timeline* of commits. Every repo has a default branch (usually called `main`) which is the canonical line of history. When you start a new piece of work, you create a *branch* from `main` and make commits there. Your branch is a separate timeline; you can experiment freely without affecting `main`. When the work is ready, you *merge* your branch back into `main`, combining your commits with everyone else's.

**Merge.** Combining two branches' histories into one. If you and a colleague worked on different branches at the same time, your branches each have commits the other doesn't. Merging integrates both. Most merges happen smoothly; the awkward ones are *merge conflicts* (next term).

**Merge conflict.** When two branches have *both* changed the same lines of the same file in different ways, Git can't automatically decide which version wins. It marks the conflict and asks a human to resolve it. Conflicts sound scarier than they are — most are resolved in a minute, by reading the two versions and combining them. They're an unavoidable cost of multiple people editing the same files at once, and a healthy team's tooling and conventions keep them rare.

**Push.** Sending your local commits up to the shared repo on GitHub, so others can see them.

**Pull.** Fetching the latest commits from GitHub down to your laptop, so your local copy is up to date.

**Pull request (PR).** A formal *proposal* to merge your branch into the main branch. We'll come back to this; it's where most of the team-collaboration value of Git lives.

That's the working set. Six commits' worth of vocabulary; the rest is detail.

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

`main` is the trunk. New work happens on branches that start from a point on `main`, run alongside for a while, and eventually merge back. At any moment a real repo has dozens of branches in flight: features being built, bugs being fixed, experiments being tried, stalled-out work that someone may or may not return to.

This is the central trick of Git: **everyone's work is in flight in parallel, and the merging is what reconciles them.** It's how a team of 50 engineers can all be editing the same codebase simultaneously without overwriting each other.

---

## The pull request — where teams actually use Git

A pull request is the *social* layer on top of the technical machinery. When your branch is ready to merge, you don't just merge it — you open a PR.

A PR is a page on GitHub (or whichever hosting service you use) that shows:

- *What's in your branch that's not in `main`* — the diff. Every changed line, side by side.
- *A description* you wrote, explaining what the change does and why.
- *Comments and discussions*: your reviewers leave inline notes on specific lines, the team debates, you respond, you make follow-up commits.
- *Automated checks*: the test suite ran on your branch, the lint checker ran, the security scanner ran. Green checks or red Xs.
- *The merge button* — once everyone's happy, the PR gets merged into `main`. Your branch's commits become part of the canonical history.

Most of the *real* work of a team using Git happens in PRs, not in raw commits. The PR is where:

- Code review happens (a teammate reads your work and gives feedback before it lands).
- Quality gates run (tests, accessibility checks, security scans).
- Decisions get recorded (the discussion thread is searchable forever; "why did we do it this way?" is answerable months later).
- Knowledge transfers (a new joiner reads recent merged PRs to learn how the team works).

Every belt in this playbook revolves around opening PRs. The Yellow Belt boss fight asks for one. The Green Belt boss fight asks for two. The Black Belt is about authoring tools that *land in PRs other people open*. The PR is the unit of contribution.

---

## What "Git is the standard" actually means

There used to be many version control systems. Subversion, Mercurial, Perforce, CVS. Git won. As of about 2018, Git is *the* version control system for software — somewhere north of 95% of teams use it for their code, and the rest are mostly enterprise hold-outs.

The reason Git won wasn't pretty UX (it's famously difficult). The reasons were three:

- **It's distributed.** Every clone of the repo is a complete copy with the full history. You can work entirely offline. You can recover the whole project from any single laptop. This was a leap forward when Git arrived.
- **Branching is cheap.** In older systems, branching was an event. In Git, it's a single command, takes microseconds, and the team's mental model expanded to match. Most modern team workflows depend on branching being trivially cheap.
- **GitHub.** Strictly, this is about the hosting service rather than Git itself. GitHub built the social layer (PRs, discussions, reviews, automation) on top of Git, made it pleasant to use, and turned Git from a tool into a culture. Most teams' adoption of Git is, more accurately, adoption of GitHub.

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

When AI joins the picture, the loop *doesn't* change — Claude Code helps you author each step, but the steps themselves are the same. *"Make a branch, commit your work, push it, open a PR"* is what every modern coding session ends in, AI-assisted or not.

---

## Why this chapter matters even if you'll never run a Git command

Two reasons.

The first is conversational. The terms in this chapter (branch, commit, PR, merge conflict) appear in every product team's daily talk. The PM who asks an engineer *"what's the status of that PR?"* and gets a five-minute answer is much better off if they understand what was being said. *"It's blocked on a merge conflict because the design system was bumped"* lands as English when you've read this chapter; before this chapter it might have been Greek.

The second is collaborative. Many AI workflows you'll soon be running (even non-coding ones in Ops 101) will involve a Git-shaped artefact somewhere. Recipe libraries are committed to repos. Skills are versioned in repos. The distinction between *"I edited it"* and *"I committed and pushed it so my team has it"* matters whether or not you wrote any code.

Once you can name what's happening, you can participate. Once you can participate, you can contribute. That's the on-ramp Git opens.

---

## What you should carry into the next chapter

- **Git is save-points for files**, plus the ability to branch and merge.
- **Six terms cover most conversations:** commit, branch, merge, merge conflict, push, pull, pull request. Memorise the gist of each.
- **Every PR is the moment of *team* coordination**: review, automated checks, decisions recorded, knowledge transferred. The PR is the unit of contribution in modern software work.
- **Git won because it's distributed, branching is cheap, and GitHub made the social layer pleasant.**
- **You don't need to write Git commands to participate** — you need the vocabulary. The commands come at White Belt.
- The next chapter ([0A.8: Build, deploy, staging, production](08-build-deploy.md)) is about what happens *after* a PR is merged. How the change actually reaches users.

---

**Previous:** [← 0A.6 Code is text](06-code-is-text.md) · **Next:** [→ 0A.8 Build, deploy, staging, production](08-build-deploy.md)

**Further reading**
- [Atlassian — Git tutorial](https://www.atlassian.com/git/tutorials) — the most readable hands-on Git intro on the internet, free
- [Pro Git (free book)](https://git-scm.com/book/en/v2) — the canonical reference; you don't need to read it linearly, but the first three chapters are gold if you want depth
- [Julia Evans — How does Git work?](https://wizardzines.com/zines/git/) — paid; the friendliest illustrated explanation of the bits this chapter glossed over
