---
title: "Green Belt Part C — Fintech Guardrails"
slug: "belts/green/c-guardrails"
section: "belts"
status: "drafted"
type: "readme"
track: "green"
order: 0
time_minutes: 10
audience: "experienced-builder"
outcome: "Understand what Part C teaches, what Parts A and B muscle memory it assumes, and the order to walk it in."
prev: "belts/green/quest-greenfield-crossover"
next: "belts/green/redlines"
pillar: null
belt: "green"
tags: ["green-belt", "part-c", "fintech-guardrails", "readme"]
updated: "2026-06-25"
---

# Part C — Fintech Guardrails

> **Part C promise.** By the end, you can ship into a Razorpay product repo with the full guardrail set running — redlines, proxy, regulator reflexes, threat awareness, the named reviewer skills, and a security-review subagent — and you can pass the Boss Fight that closes Green Belt.
>
> **Prerequisite.** Parts A and B complete (Quests G-1 and G-2 both claimed). Part C reads thin without the craft and practices already in muscle memory.
> **Time budget.** ~2h40m for the seven modules; ~6h for Boss Fight G-B. Plan over a week.

---

## What you'll learn

Part A taught the craft. Part B taught the practices. Part C teaches the rules: the redlines, the regulators, the threats, and the named reviewer skills that turn a Green-Belt-grade builder into one who can ship into product repos with confidence.

Seven modules, one Boss Fight, one badge. The Boss Fight closes the belt; the badge claims it.

---

## The seven modules

| §    | Chapter | Pillar | Time |
|------|---------|--------|------|
| G.22 | [What never goes into a prompt — the Razorpay redlines](G22-redlines.md) | Harness | 20 min |
| G.23 | [The LLM proxy — what LiteLLM does and why every call routes through it](G23-llm-proxy.md) | Harness | 25 min |
| G.24 | [PII, PCI, RBI — the regulators, the reasons, the reflexes](G24-pii-pci-rbi.md) | Context | 30 min |
| G.25 | [Prompt injection + output classifiers — threats and mitigations](G25-prompt-injection.md) | Harness | 30 min |
| G.26 | [The pre-ship-check skill — 6-layer gate before every PR](G26-pre-ship-check-skill.md) | Harness | 20 min |
| G.27 | [The Blade-compliance reviewer skill — file-granularity checks](G27-blade-compliance-skill.md) | Harness | 15 min |
| G.28 | [Using a subagent for security review](G28-security-review-subagent.md) | Harness | 20 min |

Walk them in order on a first read. The redlines and proxy chapters (G.22–G.23) anchor the regulator and threat chapters (G.24–G.25); the named-skill chapters (G.26–G.28) build on both.

---

## Boss Fight G-B and the badge

[Boss Fight G-B — The double-ship](boss-fight-GB-double-ship.md). Two merged PRs: a real product-repo feature with the five sub-requirements (scoped CLAUDE.md, at least one Playwright test, a clean pre-ship-check pass, the PR-guardrail used, a teammate's sign-off on prompt craft) plus your Quest G-2 greenfield PR.

[Green Belt badge](badge.md). The belt-claim artefact with a cross-belt-synthesis reflection — which Part A craft compounded with which Part B practice, and what Part C guardrails caught.

---

## What you can say after Part C

> "I ship into product repos with the full guardrail set running. I know what never goes into a prompt, why every prompt routes through a proxy, what the regulators actually require, what attackers try, and which named skills review my work before I ask a human to."

---

## What comes next

[Black Belt](../../04-black/README.md) — building the leverage other teams run on. Authoring program-pinned skills, mentoring structured cohorts, contributing to the design system at the platform level.

---

**Previous:** [← Quest G-2](../b-practices/quest-G2-greenfield-crossover.md) · **Next:** [→ G.22 The redlines](G22-redlines.md)
