---
title: "White Belt: The Foundation Layer"
slug: "belts/white"
section: "belts"
status: "drafted"
type: "readme"
track: "white"
order: 0
time_minutes: 10
audience: "new-builder"
outcome: "Understand the White Belt path, evidence chain, and the exact work required to earn the first belt."
prev: "prologue/whats-shipping"
next: "belts/white/file-system"
pillar: null
belt: "white"
tags: ["white-belt", "orientation", "certification"]
updated: "2026-04-27"
---

# White Belt - The Foundation Layer

> **Promise.** By the end of White Belt, you have opened Terminal, verified your environment, had your first useful Claude Code conversation, opened a first PR, and landed one tiny real change.

White Belt is not a reading certificate. It is the point where the program stops being abstract and becomes something your laptop can actually do. You will learn enough file system, terminal, git, auth, setup, prompting, permissions, and PR workflow to move from "I have a machine" to "I can ship a tiny change without freezing."

The belt is deliberately small. The evidence is not.

---

## Who this is for

Start here if any of these are true:

- you have never opened Terminal before;
- you have opened Terminal but mostly copy-paste commands without knowing what they do;
- git, branches, commits, push, and pull feel like a bundle of magic words;
- Claude Code works for someone else on the team but not yet on your machine;
- you want to earn Yellow Belt later and need the setup gate to be honest.

If you already use Terminal, git, Claude Code, and PRs every week, you can skim this belt and go straight to the quests. Do not skip Quest W-0. Green setup is the entry ticket for every later belt.

---

## What White Belt proves

White Belt proves four things:

1. **Your machine is ready.** You can run the setup verification and understand what GREEN, YELLOW, and RED mean.
2. **You can navigate the repo world.** You know where you are, which files changed, and how to get back to safety.
3. **You can use Claude Code with supervision.** You can ask scoped questions, review what changed, and say no when the action is wrong.
4. **You can ship one tiny real change.** Not a grand feature. One merged typo or equivalent micro-fix is enough because the loop is the point.

The belt claim is simple:

> "I have shipped code."

---

## Prerequisites

You need:

- a Razorpay laptop;
- Google SSO working in the browser;
- access to the program-pinned setup path;
- a repo assigned for the sandbox PR;
- enough time to complete the modules over a week.

You do **not** need prior coding experience. You do need willingness to pause when a command asks for permission and to ask for help when your colour is YELLOW or RED.

---

## Time budget

White Belt is designed for 4-6 hours over a week.

| Block | Time | What happens |
|---|---:|---|
| W01-W03 | ~95 min | File system, Terminal, git basics |
| W04-W08 | ~125 min | Auth, install, gateway, plugin, health checks |
| W09-W12 | ~95 min | Claude Code conversation, prompt quality, permissions, PR workflow |
| Quests + boss fight | ~3 hours | Evidence work, including review and merge time |

Do not try to sprint the whole belt in one sitting unless you already have the mechanics. A calmer week produces better evidence than a frantic afternoon.

---

## Modules

| Section | Chapter | Pillar | Time |
|---|---|---|---:|
| W.1 | [The File System](W01-file-system.md) | Context | 20 min |
| W.2 | [Terminal fluency](W02-terminal-fluency.md) | Harness | 30 min |
| W.3 | [Git as save-points](W03-git-as-savepoints.md) | Harness | 45 min |
| W.4 | [Your auth setup](W04-auth-setup.md) | Harness | 30 min |
| W.5 | [Installing the stack](W05-installing-the-stack.md) | Harness | 40 min |
| W.6 | [The LLM Gateway](W06-llm-gateway.md) | Context | 15 min |
| W.7 | [Compass plugin](W07-compass-plugin.md) | Context | 20 min |
| W.8 | [GREEN / YELLOW / RED](W08-green-yellow-red.md) | Harness | 20 min |
| W.9 | [Your first conversation with Claude Code](W09-first-conversation.md) | Prompt | 30 min |
| W.10 | [Prompt quality 101](W10-prompt-quality-101.md) | Prompt | 20 min |
| W.11 | [The permission system](W11-permission-system.md) | Harness | 15 min |
| W.12 | [Your first PR](W12-first-pr.md) | Harness | 30 min |

Each module follows the same pattern: promise, short version, mental model, worked example, common failures, colour self-check, and where to go next.

---

## Evidence chain

White Belt is awarded when the evidence chain closes:

| Evidence | File | What it proves |
|---|---|---|
| W-0 GREEN setup verification | [Quest W-0](quest-W0-turn-green.md) | Your machine can run the program path. |
| W-1 HelloRazorpay PR | [Quest W-1](quest-W1-hello-razorpay.md) | You can create, push, and close a sandbox PR. |
| W-B merged typo PR | [Boss Fight W-B](boss-fight-WB-one-real-typo.md) | You can land one real change with review. |
| Claim template | [Badge](badge.md) | Your evidence can be tracked and certified. |

If any link is missing, the belt is not awarded yet. That is not failure; it is routing. The colour system tells you what to fix next.

---

## The colour rule

Every White Belt reader should be able to say one of three things after each module:

- **GREEN:** I can do the step on my own machine and show the output.
- **YELLOW:** I can describe the step, but something local is blocked or fuzzy.
- **RED:** I cannot proceed without help.

GREEN means continue. YELLOW means try the one-line fix, then ask if you are still stuck after a focused attempt. RED means stop and route. White Belt gets easier when people tell the truth about colour early.

---

## What not to optimize for

Do not optimize for speed, clever prompts, giant diffs, or sounding technical.

Optimize for:

- running one command at a time;
- reading the output before the next command;
- keeping changes tiny;
- asking Claude to explain before asking it to edit;
- saying no to risky permission prompts;
- leaving evidence a reviewer can check in two minutes.

That is the whole White Belt muscle.

---

## What you can say after this belt

> "I have shipped code."

Not "I understand all of software." Not "I can fix production." Just the first honest claim. It is small, and it matters.

---

**Next:** [W.1 - The File System](W01-file-system.md)
