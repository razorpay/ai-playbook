---
title: "Green Belt Part B — The Practices"
slug: "belts/green/b-practices"
section: "belts"
status: "drafted"
type: "readme"
track: "green"
order: 0
time_minutes: 10
audience: "experienced-builder"
outcome: "Understand what Part B teaches, what Part A muscle memory it assumes, and the order to walk it in."
prev: "belts/green/quest-author-a-team-skill"
next: "belts/green/playwright-and-claude-code"
pillar: null
belt: "green"
tags: ["green-belt", "part-b", "the-practices", "readme"]
updated: "2026-04-29"
---

# Part B — The Practices

> **Part B promise.** By the end, you can ship across product and greenfield surfaces with E2E tests, design-to-code, observability, and a daily loop that scales — using the craft layer Part A taught.
>
> **Prerequisite.** Part A complete (Quest G-1 claimed). The Harness chapters (G.18–G.20) and the testing cluster (G.12–G.14) build directly on G.6 / G.7 (skills) and G.8–G.10 (subagents, worktrees, hooks).
> **Time budget.** ~5h40m for the ten modules; ~8h for Quest G-2. Plan over a week or two.

---

## What you'll learn

Part A taught the craft — three pillars, hierarchical CLAUDE.md, skills, subagents, worktrees, advanced prompting. Part B is where that craft meets the daily reality of a Green Belt builder: end-to-end tests written *with* the agent, design-to-code flows that respect the design system, branch-preview workflows, observability with AI in the loop, and the hard-kind debugging where you have to tell Claude it is wrong.

Ten modules, one quest. The boss fight (Part C, v0.11) requires Quests G-1 and G-2 both claimed.

---

## The ten modules

| §    | Chapter | Pillar | Time |
|------|---------|--------|------|
| G.12 | [E2E testing with Playwright + Claude Code](G12-playwright-and-claude-code.md) | Harness | 45 min |
| G.13 | [The Playwright Skill pattern — one-shot test quality](G13-playwright-skill-pattern.md) | Context | 30 min |
| G.14 | [`tests/seed.spec.ts` — saving the agent 10,000 tokens](G14-tests-seed-spec.md) | Context | 15 min |
| G.15 | [Design-to-code — Figma + Blade + Code Connect, end to end](G15-design-to-code.md) | Context | 60 min |
| G.16 | [Blade deep dive — tokens, primitives, variants, accessibility](G16-blade-deep-dive.md) | Context | 45 min |
| G.17 | [The production-compiler skill — repair AI-Studio output to Blade](G17-production-compiler-skill.md) | Context | 30 min |
| G.18 | [The daily loop — Node, pnpm, localhost, mobile viewport](G18-daily-loop.md) | Harness | 30 min |
| G.19 | [Branch-preview platform — branch → live URL](G19-design-preview-platform.md) | Harness | 30 min |
| G.20 | [Observability with AI — logs, traces, cost attribution](G20-observability-with-ai.md) | Harness | 25 min |
| G.21 | [Debugging the hard kind — when Claude is wrong, and you have to tell](G21-debugging-hard-kind.md) | Prompt | 30 min |

Walk them in order on a first read. The testing cluster (G.12–G.14) and the design-to-code cluster (G.15–G.17) build on each other; the harness cluster (G.18–G.20) is the daily-loop machinery.

---

## Quest G-2

[Quest G-2 — Greenfield cross-over](quest-G2-greenfield-crossover.md). Pick a greenfield surface and ship one meaningful change that exercises Part A and Part B together.

The quest is the bridge between Green Belt and the Boss Fight in Part C. Boss Fight G-B requires both quests claimed.

---

## What you can say after Part B

> "I ship across product and greenfield surfaces with end-to-end tests, design-to-code, branch previews, and observability — using the craft I learned in Part A."

---

## What comes next

Part C (*Fintech Guardrails*) covers the redlines, the LLM proxy, PII / PCI / regulator reflexes, prompt injection, the pre-ship-check skill, the compliance reviewer, and security-review subagents. Boss Fight G-B and the badge come with Part C.

---

**Previous:** [← Quest G-1](../a-craft/quest-G1-author-a-team-skill.md) · **Next:** [→ G.12 Playwright + Claude Code](G12-playwright-and-claude-code.md)
