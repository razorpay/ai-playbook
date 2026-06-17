---
title: "Green Belt"
slug: "belts/green"
section: "belts"
status: "drafted"
type: "readme"
track: "green"
order: 0
time_minutes: 14
audience: "experienced-builder"
outcome: "Understand the Green Belt arc, what is drafted in Part A, and what comes next in Parts B and C."
prev: "belts/yellow/badge"
next: "belts/green/a-craft"
pillar: null
belt: "green"
tags: ["green-belt", "readme", "team-velocity"]
updated: "2026-06-17"
---

# 🟢 Green Belt — Team Velocity

> **Promise.** You don't just use AI — you *engineer around it*. You shape your team's context, author skills, orchestrate subagents, run multiple agents in parallel. You understand the three pillars and teach them to teammates.
>
> **Prerequisite.** 🟡 Yellow Belt. Optionally, enrolment in the Ship-to-Learn track (3 phases over ~7 weeks: Foundations → Guided Build → Solo Ship), nominated via the Selection Framework.
> **Time budget.** 10–14 hours of playbook, plus the capstone feature. Cohort enrolment runs over a calendar quarter.
> **Ramp L-level.** L2 (team-workflow integration).

---

## Status: drafted end-to-end

Green Belt is a three-part belt and ships in three drops. **All three Parts are drafted.** Boss Fight G-B and the Green Belt badge are drafted; the belt is now claimable end-to-end. The full belt is awarded when a builder completes Parts A + B + C, both quests, and the boss fight, per Appendix L's reviewer protocol.

Cohort leads, see [Appendix L — Certification](../../appendices/L-certification/README.md) for reviewer-protocol specifics.

---

## What you can say after Green Belt

> "My team moves faster because of how I use AI."

---

## The full belt arc

### Part A — The Craft

| §    | Chapter | Pillar | Time |
|------|---------|--------|------|
| G.1  | [The Three Pillars — prompt × context × harness](a-craft/G01-three-pillars.md) | All | 20 min |
| G.2  | [Why context windows fill — the single constraint everything else follows](a-craft/G02-context-windows.md) | Context | 20 min |
| G.3  | [CLAUDE.md for a real service — WHAT + WHY, under 200 lines](a-craft/G03-claude-md-real-service.md) | Context | 45 min |
| G.4  | [Hierarchical CLAUDE.md in a monorepo — root vs package vs local](a-craft/G04-hierarchical-claude-md.md) | Context | 30 min |
| G.5  | [CLAUDE.local.md — personal overrides, and what belongs there](a-craft/G05-claude-local-md.md) | Context | 10 min |
| G.6  | [Skills — what they are, why they compound](a-craft/G06-skills-overview.md) | Context | 25 min |
| G.7  | [Writing your first SKILL.md — the anatomy, naming, discipline](a-craft/G07-writing-your-first-skill.md) | Context | 45 min |
| G.8  | [Subagents — when to delegate, how to pass intent cleanly](a-craft/G08-subagents.md) | Harness | 30 min |
| G.9  | [Worktrees — running 3–5 Claude instances in parallel, safely](a-craft/G09-worktrees.md) | Harness | 30 min |
| G.10 | [Hooks + slash commands — when to automate the pre-flight](a-craft/G10-hooks-and-slash-commands.md) | Harness | 30 min |
| G.11 | [Advanced prompting — goals, constraints, worked examples](a-craft/G11-advanced-prompting.md) | Prompt | 40 min |

### Part B — The Practices

| §    | Chapter | Pillar | Time |
|------|---------|--------|------|
| G.12 | [E2E testing with Playwright + Claude Code](b-practices/G12-playwright-and-claude-code.md) | Harness | 45 min |
| G.13 | [The Playwright Skill pattern — one-shot test quality](b-practices/G13-playwright-skill-pattern.md) | Context | 30 min |
| G.14 | [`tests/seed.spec.ts` — saving the agent 10,000 tokens](b-practices/G14-tests-seed-spec.md) | Context | 15 min |
| G.15 | [Design-to-code — Figma + Blade + Code Connect, end to end](b-practices/G15-design-to-code.md) | Context | 60 min |
| G.16 | [Blade deep dive — tokens, primitives, variants, accessibility](b-practices/G16-blade-deep-dive.md) | Context | 45 min |
| G.17 | [The production-compiler skill — repair AI-Studio output to Blade](b-practices/G17-production-compiler-skill.md) | Context | 30 min |
| G.18 | [The daily loop — Node, pnpm, localhost, mobile viewport](b-practices/G18-daily-loop.md) | Harness | 30 min |
| G.19 | [Branch-preview platform — branch → live URL](b-practices/G19-design-preview-platform.md) | Harness | 30 min |
| G.20 | [Observability with AI — logs, traces, cost attribution](b-practices/G20-observability-with-ai.md) | Harness | 25 min |
| G.21 | [Debugging the hard kind — when Claude is wrong, and you have to tell](b-practices/G21-debugging-hard-kind.md) | Prompt | 30 min |

### Part C — Fintech Guardrails

| §    | Chapter | Pillar | Time |
|------|---------|--------|------|
| G.22 | [What never goes into a prompt — the Razorpay redlines](c-guardrails/G22-redlines.md) | Harness | 20 min |
| G.23 | [The LLM proxy — what LiteLLM does and why every call routes through it](c-guardrails/G23-llm-proxy.md) | Harness | 25 min |
| G.24 | [PII, PCI, RBI — the regulators, the reasons, the reflexes](c-guardrails/G24-pii-pci-rbi.md) | Context | 30 min |
| G.25 | [Prompt injection + output classifiers — threats and mitigations](c-guardrails/G25-prompt-injection.md) | Harness | 30 min |
| G.26 | [The pre-ship-check skill — 6-layer gate before every PR](c-guardrails/G26-pre-ship-check-skill.md) | Harness | 20 min |
| G.27 | [The Blade-compliance reviewer skill — file-granularity checks](c-guardrails/G27-blade-compliance-skill.md) | Harness | 15 min |
| G.28 | [Using a subagent for security review](c-guardrails/G28-security-review-subagent.md) | Harness | 20 min |

---

## Quests and boss fight

### Quest G-1 — Author a team skill

[Quest G-1](a-craft/quest-G1-author-a-team-skill.md). Write, commit, and share a SKILL.md that captures one of your team's repeated workflows. At least one teammate must successfully invoke it.

*Success criteria:* merged skill file, invocation log from at least one teammate, one-paragraph reflection.

### Quest G-2 — The Greenfield cross-over

[Quest G-2](b-practices/quest-G2-greenfield-crossover.md). Pick a greenfield target (an internal tool, a new agent skill pack, a self-serve analytics surface, a plugin) and ship one meaningful change that exercises Part A and Part B together.

### Boss Fight G-B — The double-ship

[Boss Fight G-B](c-guardrails/boss-fight-GB-double-ship.md). A real feature on a product repo plus the Quest G-2 greenfield PR. The product-repo PR must include a scoped CLAUDE.md, at least one Playwright test, a pre-ship-check pass, the PR-guardrail used to construct the PR, and a teammate's sign-off on the craft of the prompts. Two merged PRs + retro + teammate sign-off.

---

## Evidence chain

Awarding Green Belt requires evidence per [Appendix L](../../appendices/L-certification/README.md):

- Yellow Belt awarded date (referenced, not duplicated);
- Quest G-1 evidence — merged skill file URL plus invocation-log link;
- Quest G-2 evidence — merged greenfield PR URL plus retro;
- Boss Fight G-B evidence: two merged PRs (one product, one greenfield), Playwright test link, pre-ship-check output, teammate prompt-craft sign-off;
- a one-paragraph "what changed for my team" reflection from the builder.

The badge artefact mirrors the White and Yellow templates.

---

## What to do next

- **If you have just earned Yellow Belt:** open [Part A README](a-craft/README.md) and start with G.1.
- **If you are a cohort lead:** read the [Appendix L](../../appendices/L-certification/README.md) reviewer protocol; Green Belt's reviewer requirements are stricter than Yellow's (one out-of-team reviewer required).


---

**Files:** `belts/03-green/` — organised into subfolders `a-craft/`, `b-practices/`, and `c-guardrails/`, all drafted, plus the Green Belt [badge](c-guardrails/badge.md).

**Previous:** [← Yellow Belt badge](../02-yellow/badge.md) · **Next:** [→ Part A README](a-craft/README.md)
