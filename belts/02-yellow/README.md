---
title: "Yellow Belt: The First Builds"
slug: "belts/yellow"
section: "belts"
status: "drafted"
type: "readme"
track: "yellow"
order: 0
time_minutes: 12
audience: "daily-builder"
outcome: "Understand the Yellow Belt path, daily AI-building claim, quests, boss fight, and evidence chain."
prev: "belts/white/badge"
next: "belts/yellow/tool-atlas"
pillar: null
belt: "yellow"
tags: ["yellow-belt", "orientation", "certification"]
updated: "2026-07-23"
---

# Yellow Belt - The First Builds

> **Promise.** By the end of Yellow Belt, Claude Code is part of your daily rhythm. You can choose the right tool, give it useful context, use connectors safely, read unfamiliar code, and ship a real bug fix in a surface you care about.

Yellow Belt is where the playbook stops being "setup and first PR" and becomes a working habit. White Belt proved you can ship code once. Yellow Belt proves you can find small useful work, bring the right context to the AI, and close the loop with review.

The claim is:

> "I build with AI daily. I find and fix things in the surfaces I care about."

---

## Who this is for

Start here if:

- White Belt is complete;
- you have a GREEN environment;
- you can open a PR without needing the whole room to stop;
- you want Claude Code to become a daily teammate instead of an event-day novelty;
- you are ready to use Slack, docs, design files, tickets, and git history as context sources.

If you already use AI tools every day, skim the first two modules and spend your energy on Y03, Y11, Y12, Y13, and the boss fight. That is where Yellow Belt earns its name.

---

## What Yellow Belt proves

Yellow Belt proves four things:

1. **Tool judgement.** You know when to use Claude Code, Codex, a provisioned Claude workspace, Cursor, Copilot, Slash, or a connector surface.
2. **Prompt judgement.** You can state intent, constraints, context, and success criteria without turning every prompt into an essay.
3. **Context judgement.** You can give Claude the right repo files, threads, docs, and design context without leaking sensitive material or flooding the window.
4. **Shipping judgement.** You can notice a real bug, triage it with AI, propose a small fix, and get the PR reviewed.

White Belt asks: can you ship one tiny change?

Yellow Belt asks: can you repeat the loop with judgement?

---

## Prerequisites

You need:

- White Belt awarded or equivalent evidence;
- a working Claude Code setup;
- a repo you are allowed to inspect;
- access to the approved connector surfaces for your role;
- a team or program route for review.

Design-track readers should also complete the design environment add-on before Y09. That add-on is not repeated here; Yellow Belt uses it.

---

## Time budget

Yellow Belt is designed for 6-8 hours over two weeks, plus the time it takes for PR review.

| Block | Time | What happens |
|---|---:|---|
| Y01-Y02 | ~45 min | Tool choice and decision flow |
| Y03-Y05 | ~85 min | Prompt quality and context foundations |
| Y06-Y08 | ~65 min | Reading code, permissions, model path vocabulary |
| Y09-Y10 | ~60 min | Design, Slack, and workspace connectors |
| Y11-Y14 | ~90 min | Bug hunting, debugging, PR craft, staying current |
| Quests + boss fight | variable | Habit proof, utility proof, and one real shipped fix |

The modules are meant to be read in order the first time. After that, they become a reference.

---

## Modules

| Section | Chapter | Pillar | Time |
|---|---|---|---:|
| Y.1 | [The Tool Atlas](Y01-tool-atlas.md) | Context | 30 min |
| Y.2 | [When to reach for which tool](Y02-tool-decision-tree.md) | Harness | 15 min |
| Y.3 | [Prompt quality, deep dive](Y03-prompt-quality-deep.md) | Prompt | 40 min |
| Y.4 | [What Claude can see and what it cannot](Y04-context-101.md) | Context | 20 min |
| Y.5 | [CLAUDE.md primer](Y05-claude-md-primer.md) | Context | 25 min |
| Y.6 | [Reading unfamiliar code with Claude](Y06-reading-code.md) | Prompt | 30 min |
| Y.7 | [Permissions, hooks, slash commands](Y07-permissions-and-hooks.md) | Harness | 20 min |
| Y.8 | [LiteLLM and Claude workspace access](Y08-litellm-and-enterprise.md) | Harness | 15 min |
| Y.9 | [Figma MCP for non-engineers](Y09-figma-mcp.md) | Context | 30 min |
| Y.10 | [Slack MCP + Google Workspace MCP](Y10-slack-and-gworkspace-mcps.md) | Context | 30 min |
| Y.11 | [Bug hunting with AI](Y11-bug-hunting.md) | Prompt | 30 min |
| Y.12 | [Debugging with Claude](Y12-debugging-loop.md) | Prompt | 30 min |
| Y.13 | [PR craft](Y13-pr-craft.md) | Harness | 20 min |
| Y.14 | [Staying current](Y14-staying-current.md) | Meta | 10 min |

Each module follows the same rhythm you saw in White Belt: promise, short version, mental model, worked example, common failures, colour self-check, and what you can say after.

---

## Evidence chain

Yellow Belt is awarded when the evidence chain closes:

| Evidence | File | What it proves |
|---|---|---|
| White Belt awarded | White badge row | You have the baseline setup and first PR loop. |
| Y-1 working utility | [Quest Y-1](quest-Y1-standup-bot.md) | You can build a small useful tool with Claude Code. |
| Y-2 daily practice log | [Quest Y-2](quest-Y2-30-day-challenge.md) | You can sustain the habit in normal work. |
| Y-B merged or review-active PR | [Boss Fight Y-B](boss-fight-YB.md) | You can find, triage, fix, and ship one real bug. |
| Claim template | [Badge](badge.md) | Your evidence can be tracked and certified. |

Yellow evidence includes one thing White did not: a reflection on prompt, context, and harness decisions. The point is not just that you shipped. The point is that you can explain the judgement that made shipping possible.

---

## Design-track add-on

If you are a designer, Y09 is the bridge from design artefact to running code. Before that chapter, make sure your design-track setup is GREEN:

- approved design connector available;
- design-system connector available where applicable;
- local package install path verified;
- sandbox repo ready;
- permission boundaries clear.

Do not debug design connector setup inside Y09. Use Appendix B routing first.

---

## What not to optimize for

Do not optimize for the largest prompt, the most tools, the most dramatic demo, or the longest streak screenshot.

Optimize for:

- the smallest useful tool for Quest Y-1;
- two minutes of real daily practice for Quest Y-2;
- a small but real bug for the boss fight;
- PR descriptions that show your triage;
- reflections that name the context you gave the AI.

Yellow Belt is not about proving you can make AI do everything. It is about proving you know when and how to use it.

---

## What you can say after this belt

> "I build with AI daily. I find and fix things in the surfaces I care about."

---

**Previous:** [White Belt badge](../01-white/badge.md) - **Next:** [Y.1 The Tool Atlas](Y01-tool-atlas.md)

