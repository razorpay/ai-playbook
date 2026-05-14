---
title: "Green Belt Part A — The Craft"
slug: "belts/green/a-craft"
section: "belts"
status: "drafted"
type: "readme"
track: "green"
order: 0
time_minutes: 8
audience: "experienced-builder"
outcome: "Understand what Part A teaches, what it expects you to know already, and the order to walk it in."
prev: "belts/green"
next: "belts/green/three-pillars"
pillar: null
belt: "green"
tags: ["green-belt", "part-a", "the-craft", "readme"]
updated: "2026-04-29"
---

# Part A — The Craft

> **Part A promise.** By the end, you can shape your team's context with hierarchical CLAUDE.md, author skills that compound, run subagents and worktrees safely, and prompt with discipline.
>
> **Prerequisite.** 🟡 Yellow Belt complete. If you are mid-Yellow, finish first; Part A reads thin without daily-builder muscle memory.
> **Time budget.** ~5h25m for the eleven modules; ~4h for Quest G-1. Plan over a week.

---

## What you'll learn

Part A is the foundational craft layer of Green Belt. Where Yellow Belt taught you to *use* Claude Code daily, Part A teaches you to *shape* it: how the agent sees the world (context engineering), how to extend it (skills, hooks, slash commands), how to scale it (subagents, worktrees), and how to ask it precisely (advanced prompting).

Eleven modules, one quest. The boss fight is in Part C; you cannot earn Green Belt with Part A alone.

---

## The eleven modules

| §    | Chapter | Pillar | Time |
|------|---------|--------|------|
| G.1  | [The Three Pillars — prompt × context × harness](G01-three-pillars.md) | All | 20 min |
| G.2  | [Why context windows fill](G02-context-windows.md) | Context | 20 min |
| G.3  | [CLAUDE.md for a real service](G03-claude-md-real-service.md) | Context | 45 min |
| G.4  | [Hierarchical CLAUDE.md](G04-hierarchical-claude-md.md) | Context | 30 min |
| G.5  | [CLAUDE.local.md — personal overrides](G05-claude-local-md.md) | Context | 10 min |
| G.6  | [Skills — what they are, why they compound](G06-skills-overview.md) | Context | 25 min |
| G.7  | [Writing your first SKILL.md](G07-writing-your-first-skill.md) | Context | 45 min |
| G.8  | [Subagents](G08-subagents.md) | Harness | 30 min |
| G.9  | [Worktrees — 3–5 Claude instances in parallel](G09-worktrees.md) | Harness | 30 min |
| G.10 | [Hooks + slash commands](G10-hooks-and-slash-commands.md) | Harness | 30 min |
| G.11 | [Advanced prompting](G11-advanced-prompting.md) | Prompt | 40 min |

Walk them in order on a first read. The CLAUDE.md cluster (G.3–G.5) and the Skills cluster (G.6–G.7) build on each other; the Harness cluster (G.8–G.10) builds on context and skills.

---

## Quest G-1

[Quest G-1 — Author a team skill](quest-G1-author-a-team-skill.md). Pick a workflow your team has run three or more times by hand. Write a SKILL.md that captures it. Get a teammate to invoke it.

The quest is the practical test of G.6 and G.7. Do it after both modules are read at GREEN colour.

---

## What you can say after Part A

> "I can shape my team's context, author skills that other builders use, and prompt with intent — not vibes."

---

## What comes next

Part B (E2E testing, design-to-code, observability, hard debugging) builds the *practices* on top of the *craft* you'll learn here. Part C (Razorpay redlines, the LLM proxy, security review) builds the *guardrails*. Both are planned for v0.10 and v0.11.

---

**Previous:** [← Green Belt README](../README.md) · **Next:** [→ G.1 The Three Pillars](G01-three-pillars.md)
