---
title: "Worktrees — running 3-5 Claude instances in parallel, safely"
slug: "belts/green/worktrees"
section: "belts"
status: "drafted"
type: "chapter"
track: "green"
order: 9
time_minutes: 30
audience: "experienced-builder"
outcome: "Run multiple Claude Code sessions against the same repo at the same time without conflicting edits, broken builds, or confused state."
prev: "belts/green/subagents"
next: "belts/green/hooks-and-slash-commands"
pillar: "harness"
belt: "green"
tags: ["green-belt", "worktrees", "parallelism", "harness"]
updated: "2026-04-29"
---

# G.9 — Worktrees

A worktree is a checkout of the same repo at a different path. Git worktrees let you have several branches checked out at once without cloning the repo five times. For Green Belt builders, this is the safe way to run three or more Claude Code sessions in parallel: each in its own working directory, each on its own branch, each unable to step on the others. This is the chapter with the most operational risk in Part A; treat the rules as load-bearing.

---

## If you're short on time

- A worktree is a separate working directory for the same repo, at a different branch. `git worktree add` creates one.
- Each Claude Code session runs in one working directory. If you want three sessions, you want three worktrees, not three terminals in the same directory.
- The single fastest way to corrupt a checkout is to run two Claude Code sessions in the same working directory at the same time. Don't.

---

## The mental model

```
   ~/work/
   ├── reporting-main/        ← branch: main           ← agent A
   │   └── (full checkout)
   ├── reporting-feature-A/   ← branch: feat/x         ← agent B
   │   └── (full checkout)
   ├── reporting-feature-B/   ← branch: feat/y         ← agent C
   │   └── (full checkout)
   └── reporting-bugfix-1/    ← branch: fix/wrong-tz   ← agent D
       └── (full checkout)
```

Each directory is a real, full working tree. They share the same `.git` storage under the hood (so you do not pay disk for the whole repo four times), but each directory has its own checked-out files, its own branch, its own staging area. An agent in one directory cannot see another directory unless explicitly told.

This is the harness shape that lets you parallelise *your own work*: you run three feature branches concurrently, each with an agent that knows only its branch.

---

## When to reach for a worktree

Three named patterns.

### Pattern 1: Two changes you want to ship in the same week

You have a feature to build and a bug to fix. They are unrelated. In a single working directory, you have to mentally context-switch and the agent has to swap context too. Two worktrees mean two separate sessions on separate branches; neither distracts the other.

### Pattern 2: A long-running change you want a fresh agent to verify

You have been deep in a feature branch for a day. You want a fresh agent (no prior conversation context) to review the diff. Spin up a worktree on the same branch, open a fresh Claude Code session there, ask for the review. The fresh agent has zero bias from your day's worth of conversation.

### Pattern 3: Parallel exploration of two design directions

You want to know whether to use approach A or approach B. Two worktrees, one agent in each, both implementing the change. Compare the diffs at the end. The cost is two implementations; the value is a confident decision.

---

## When NOT to reach for a worktree

**Two related changes in the same area.** The cognitive cost of two parallel sessions in similar code is high. Stay in one worktree and ship sequentially.

**A small one-off task.** Spinning up a worktree for a five-minute change is overhead.

**You do not have a clear branch boundary.** If both changes touch the same files, two worktrees lead to merge conflicts when you reconcile. Ship sequentially in one worktree.

---

## Setting up worktrees safely

The minimal commands you need:

```sh
# from inside the main repo:
git worktree add ../reporting-feature-A feat/x

# the new directory is a full checkout on branch feat/x.
# open Claude Code there:
cd ../reporting-feature-A
claude
```

To remove a worktree when you are done:

```sh
git worktree remove ../reporting-feature-A
```

This removes the directory and tells Git the worktree is gone. The branch itself is untouched.

To list current worktrees:

```sh
git worktree list
```

Useful when you have lost track of how many you have running.

---

## The hard rules

These are the rules that keep parallel agents from corrupting each other's work. Treat them as load-bearing.

### Rule 1 — One agent per working directory

Two Claude Code sessions in the same working directory will edit each other's files, fight over the lockfile, and produce a corrupted state that takes longer to untangle than the parallelism saved. Always: one agent, one directory.

### Rule 2 — Each worktree gets its own branch

Two worktrees pointing at the same branch is allowed by Git but a bad idea for parallel work. The branches will diverge, you will not know which is canonical, the merge will be ugly. Rule of thumb: one worktree, one branch.

### Rule 3 — Each agent gets its own CLAUDE.md context

Worktrees share the `.git` storage but their CLAUDE.md files are independent. If you want all three agents to follow the same team rules, ensure the team CLAUDE.md is under version control (it should be) so each worktree's checkout has it. Per-builder `CLAUDE.local.md` does not propagate; each worktree starts without one.

### Rule 4 — No shared mutable state outside the repo

If your service writes to a local DB, a local Redis, or a fixtures folder outside the repo, two agents will fight. Fix: each worktree gets its own dev DB / port / fixture path, or use the repo's standard "scoped per-branch" tooling if the repo has it.

### Rule 5 — Communicate plans across agents you are running

If you are running three agents in parallel and they touch overlapping concerns, plan once before splitting. The cost of a five-minute upfront alignment is much less than the cost of two diffs that merge badly.

---

## Worked example

You are about to start a busy Friday: you owe a small bug fix on the reporting service and you also want to start a feature branch for a new dashboard view. Both are due Monday.

```sh
# you are at ~/work/reporting-main, on branch main, clean
git fetch origin
git worktree add ../reporting-bugfix-tz fix/tz-rollover
git worktree add ../reporting-feature-cart-view feat/cart-view

# in terminal 1:
cd ../reporting-bugfix-tz
claude
# the agent opens; you scope it to the bug fix only

# in terminal 2:
cd ../reporting-feature-cart-view
claude
# the agent opens; you scope it to the new feature only
```

Now: two terminals, two agents, two branches, two completely separate cognitive contexts. The bug fix's agent never reads the feature's CLAUDE.local.md notes. The feature's agent never sees the bug fix's diff. When you push and PR each, they are independent.

When both are merged and you are done:

```sh
git worktree remove ../reporting-bugfix-tz
git worktree remove ../reporting-feature-cart-view
```

The disk is reclaimed; the branches stay until you delete them.

---

## Limits — what worktrees do not give you

**They do not parallelise your attention.** You are still one human; running five worktrees with five agents at once means you are reviewing five diffs. The harness scaling does not change the cognitive scaling.

**They do not isolate everything outside the repo.** Shared services on your laptop (DBs, Redis, ports) still need scoping per worktree.

**They do not protect you from the wrong agent doing the wrong work.** Each agent still needs a scoped CLAUDE.md and a focused conversation. Worktrees prevent collision; they do not prevent confusion.

---

## A common pattern: feature + verification worktree

A useful worktree shape on a long feature: one worktree where you build, one worktree on the same branch where a fresh agent verifies. Three steps:

1. Build in `../feat-x-build/`. The agent there has the conversation history, the design discussion, the test runs.
2. When ready for review: `git worktree add ../feat-x-verify feat/x` — same branch, fresh checkout.
3. Open Claude Code in `../feat-x-verify/`. Ask: "Review the diff between this branch and `main`. Apply the pre-ship-check skill. Report findings." The verification agent has no bias from your build session.

The verification agent is not a subagent (G.8) — it is a peer agent in its own worktree. Both patterns serve "fresh perspective"; worktree-based verification is the right tool when the task requires reading the full repo, not just a brief.

---

## Common failure modes

**Two agents in one directory.** The fastest way to corrupt a checkout. Symptom: both agents claim they edited a file, but one of them reverted the other's change. Fix: never. One agent per directory.

**Forgetting to scope per-branch dev services.** Two agents both trying to seed the same local DB. Fix: each worktree gets its own dev DB or its own port.

**Letting worktrees pile up.** Six abandoned worktrees from last quarter. Disk pressure, mental clutter. Fix: a weekly `git worktree list` and prune.

**Treating a worktree as cheap-clone.** It is cheaper than a clone, but it is not free. Each worktree's `pnpm install` runs separately; each worktree's local cache is separate. Fix: spin one up when you have a reason; tear it down when the reason is gone.

**Mixing personal and team CLAUDE.local.md across worktrees.** Per-builder files do not propagate. If you depend on a personal override, copy it. Better: stop depending on it.

---

## GREEN / YELLOW / RED self-check

- 🟢 GREEN: I run multiple worktrees when the work is genuinely parallel, follow the five rules, and tear them down when done.
- 🟡 YELLOW — I understand worktrees in concept but have run two agents in one directory at least once and seen the mess.
- 🔴 RED — I have not used worktrees and tend to ship sequentially even when parallel would help.

---

## What you can say after this module

> "I run multiple Claude Code sessions in parallel by spinning up worktrees, one branch per worktree, with shared services scoped per-branch."

---

## Where to go next

G.10 (*Hooks + slash commands*) closes the Harness cluster of Part A. Hooks are how you automate the pre-flight; slash commands are how you give yourself shortcuts.

**Previous:** [← G.8 Subagents](G08-subagents.md) · **Next:** [→ G.10 Hooks + slash commands](G10-hooks-and-slash-commands.md)

**Further reading**

- [`git-worktree(1)`](https://git-scm.com/docs/git-worktree) — the canonical Git reference
- [Anthropic on running parallel agents](https://code.claude.com/docs/en/best-practices)
