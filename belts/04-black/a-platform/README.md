---
title: "Black Belt Part A — Build the Platform"
slug: "belts/black/a-platform"
section: "belts"
status: "drafted"
type: "readme"
track: "black"
order: 0
time_minutes: 8
audience: "platform-builder"
outcome: "Understand what Part A teaches, what Green-Belt muscle memory it assumes, and the order to walk it in."
prev: "belts/black"
next: "belts/black/internal-mcp-server"
pillar: null
belt: "black"
tags: ["black-belt", "part-a", "build-the-platform", "readme"]
updated: "2026-04-29"
---

# Part A — Build the Platform

> **Part A promise.** By the end, you can author MCP servers, publish skill packs, contribute to the Cowork plugin marketplace, decide when to write your own agent with the SDK, orchestrate multi-agent workflows, and design tool contracts that compose.
>
> **Prerequisite.** Green Belt awarded. Nomination registered with the cohort lead. The chapters assume comfort with G.6 / G.7 (skills), G.8 / G.9 (subagents, worktrees), G.26 (pre-ship-check), and the v0.12 SKILL.md anatomy.
> **Time budget.** ~4h 15m for the six modules; ~8h for Quest B-1. Plan over a week or two.

---

## What you'll learn

Green Belt taught you to build *with* AI: craft, practices, and guardrails that ship into a product repo cleanly. Part A of Black Belt teaches you to build the *platform* AI runs on: MCP servers other PODs install, skill packs that compound across teams, plugin marketplace entries that propagate the program's standard, agent-SDK decisions for the cases the program-pinned plugin can't cover, multi-agent orchestration patterns, and tool-contract design.

Six modules, one quest. The boss fight (POD-uplift embed) is in Part C; Black Belt is awarded when all three Parts close.

---

## The six modules

| §    | Chapter | Pillar | Time |
|------|---------|--------|------|
| B.1  | [Authoring an internal MCP server](B01-internal-mcp-server.md) | Harness | 60 min |
| B.2  | [Publishing a skill pack](B02-skill-pack-publishing.md) | Context | 30 min |
| B.3  | [Building a plugin marketplace entry for Razorpay Cowork](B03-cowork-plugin-marketplace.md) | Harness | 45 min |
| B.4  | [The Claude Agent SDK — when to write your own agent](B04-agent-sdk.md) | Harness | 45 min |
| B.5  | [Multi-agent orchestration](B05-multi-agent-orchestration.md) | Harness | 45 min |
| B.6  | [Tool design — JSON schemas, output shapes, error contracts](B06-tool-design.md) | Harness | 30 min |

Walk them in order on a first read. B.1 anchors the platform-builder voice; B.2 and B.3 are the publishing layer; B.4 is the build-vs-buy decision; B.5 and B.6 are the systems-design layer.

---

## Quest B-1

[Quest B-1 — Publish an internal plugin](quest-B1-publish-an-internal-plugin.md). Author and publish a skill pack (with an optional MCP integration) so another POD can install it with one command. At least two installs from PODs outside your team.

The quest is the practical test of B.2 and B.3. Do it after both modules are read at GREEN colour.

---

## What you can say after Part A

> "I author MCP servers, publish skill packs, contribute to the Cowork plugin marketplace, and design tool contracts other teams compose with."

---

## What comes next

Part B (Push the Craft) covers progressive disclosure, memory systems, prompt evals, team-and-org-scale observability, effort settings and model routing — drafted in v0.14. Part C (Shape the Org) covers running office hours, embedded sprints, AI RFCs, API Council contributions, and skill / plugin governance — drafted in v0.15.

---

**Previous:** [← Black Belt README](../README.md) · **Next:** [→ B.1 Authoring an internal MCP server](B01-internal-mcp-server.md)
