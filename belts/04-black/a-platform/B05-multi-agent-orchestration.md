---
title: "Multi-agent orchestration — patterns that work, patterns that don't"
slug: "belts/black/multi-agent-orchestration"
section: "belts"
status: "drafted"
type: "chapter"
track: "black"
order: 5
time_minutes: 45
audience: "platform-builder"
outcome: "Choose the right multi-agent orchestration pattern for the job, recognise which patterns reliably work, and refuse the patterns that consistently fail."
prev: "belts/black/agent-sdk"
next: "belts/black/tool-design"
pillar: "harness"
belt: "black"
tags: ["black-belt", "multi-agent", "orchestration", "patterns"]
updated: "2026-04-29"
---

# B.5 — Multi-agent orchestration

G.8 introduced subagents. B.5 is the systems-design layer above subagents: when you have *several* agents running in concert (sequentially, in parallel, with a supervisor, or in a marketplace) which patterns actually work and which keep failing in ways the literature does not always admit. This module is the most cognitive-heavy chapter in Part A; it carries the patterns a Black Belt builder needs to recognise on sight.

---

## If you're short on time

- Three patterns reliably work: **sequential pipeline**, **fan-out + reduce**, **supervisor + specialists**.
- Two patterns reliably fail at scale: **agent free-for-all** and **deep recursive delegation**.
- Pick by job. The wrong pattern is an order of magnitude more expensive than the right one.

---

## The mental model

```
   ┌────────────────────────────────────────────────┐
   │              MULTI-AGENT PATTERNS                │
   ├────────────────────────────────────────────────┤
   │                                                  │
   │   PATTERNS THAT WORK                            │
   │                                                  │
   │   1. Sequential pipeline                        │
   │      A → B → C, each stage's output is the     │
   │      next stage's input.                        │
   │                                                  │
   │   2. Fan-out + reduce                          │
   │      Spawn N parallel subagents on independent │
   │      slices; combine results.                   │
   │                                                  │
   │   3. Supervisor + specialists                   │
   │      One main agent decides; spawns specialist │
   │      subagents; consumes their outputs.        │
   │                                                  │
   │   PATTERNS THAT FAIL                            │
   │                                                  │
   │   4. Agent free-for-all                        │
   │      No coordinator; agents claim work; chaos. │
   │                                                  │
   │   5. Deep recursive delegation                  │
   │      Agent spawns agent spawns agent; context  │
   │      thrash, attribution loss.                  │
   │                                                  │
   └────────────────────────────────────────────────┘
```

The patterns differ in three properties: who decides, who reads what, and how cost scales.

---

## Pattern 1 — Sequential pipeline (works)

```
   Input → Agent A → Agent B → Agent C → Output
```

Each stage transforms its input into the next stage's input. Stages are bounded; their outputs are typed.

**When this works:** the work has a natural order and each stage benefits from a fresh-context agent. A canonical example: (a) classify the incoming ticket, (b) draft a reply, (c) check the reply against the team's tone CLAUDE.md. Three agents in sequence; the second never sees the classification logic; the third never sees the draft logic.

**Why it works:** each agent has the smallest context window it needs. Composition is testable per stage. Failures are localised.

**Failure mode:** stages whose outputs are not typed. If Agent A returns a free-form Markdown blob, Agent B has to parse and the pipeline becomes brittle.

---

## Pattern 2 — Fan-out + reduce (works)

```
                    ┌─→ Subagent_1 ─┐
   Input ─→ Splitter│─→ Subagent_2 ─├─→ Reducer → Output
                    └─→ Subagent_N ─┘
```

A splitter divides the work into independent slices; N parallel subagents process the slices; a reducer combines.

**When this works:** the work has natural independence: search a hundred files, classify a hundred tickets, summarise a hundred PRs. Independence is the key property; if the slices interact, the pattern is wrong.

**Why it works:** parallelism in time; bounded context per subagent; the reducer's input is structured because each subagent emitted typed output.

**Failure mode:** trying to fan-out work that is not actually independent. "Summarise these ten interconnected modules" is not fan-out work; it is sequential or supervisor-shaped. Fan-out the wrong job and the reducer either drops cross-slice signal or hallucinates it.

---

## Pattern 3 — Supervisor + specialists (works)

```
                  ┌─→ Specialist_security ─┐
   Main agent ───├─→ Specialist_perf ──────├─→ Findings → Main agent
                  └─→ Specialist_design ───┘
                              │
                              ▼
                  Main agent integrates findings
                  and decides next action
```

A main agent owns the conversation. When it needs deep work in a specialist domain, it spawns a subagent with a tight brief (per G.8). Specialists return structured findings; the main agent integrates and decides.

**When this works:** complex tasks where a generalist cannot hold the depth in context. The boss-fight review pattern (`pre-ship-check`, `blade-compliance-reviewer`, `security-review-subagent` shipped together) is a real-world supervisor-plus-specialists shape.

**Why it works:** the main agent has the conversation; the specialists have the deep context; each pays only the budget it needs. The main agent's context never bloats with the specialists' working notes.

**Failure mode:** specialists with vague briefs. Same anti-pattern as G.8; the supervisor pattern multiplies the cost when briefs drift.

---

## Pattern 4 — Agent free-for-all (fails)

```
   N agents, no coordinator
   Agents claim work from a queue
   Agents may produce overlapping work
   Reducer (if any) cannot reconcile
```

No supervisor; agents pull from a shared queue and claim work; they may produce overlapping outputs or step on each other's writes. The pattern is sometimes proposed as "let the agents self-organise."

**Why it fails:** at small scale (2–3 agents) it looks like it works because the failure modes are rare. At larger scale, the failure modes compound: duplicated work, conflicting writes, orphan tasks that no agent picks up, no audit trail of who did what.

**The cure for the urge to use this pattern:** add a supervisor. Even a thin one. The supervisor's job is solely to assign work and reconcile; everything else stays in the specialists. The cost of the supervisor is small; the cost of free-for-all is unbounded.

---

## Pattern 5 — Deep recursive delegation (fails)

```
   Agent A spawns Agent B
   Agent B spawns Agent C
   Agent C spawns Agent D
   ...
```

Agents recursively spawn agents. Each layer adds context lost to the layer above; attribution becomes impossible; cost scales unpredictably.

**Why it fails:** every spawn loses information. By layer four, the original intent has been re-paraphrased four times. The cost-attribution chain becomes ambiguous. Debugging which layer produced a wrong output is hopeless.

**The cure:** flat or two-deep at most. A supervisor that spawns specialists is two layers; that is enough. If a specialist needs more help, it should return its findings to the supervisor, which decides the next move with full context.

---

## Choosing the right pattern

Three questions to walk before invoking any multi-agent pattern.

**Question 1 — Is the work naturally ordered?** If yes, Pattern 1 (sequential pipeline). If no, continue.

**Question 2 — Is the work naturally parallel and independent?** If yes, Pattern 2 (fan-out + reduce). If no, continue.

**Question 3 — Does the work need a generalist conversation plus deep specialist work?** If yes, Pattern 3 (supervisor + specialists). If no, you probably do not have a multi-agent task; a single subagent (G.8) is enough.

The patterns are not mutually exclusive — a supervisor-with-specialists pipeline is a real shape, where each stage of the pipeline is itself a small supervisor + specialist tree. But this composition is rare and almost always introduced deliberately, not stumbled into.

---

## Cost considerations

Multi-agent patterns multiply cost. A useful rule of thumb:

- single agent: 1× the work's token cost.
- sequential pipeline (3 stages): roughly 3× because each stage is a fresh agent.
- fan-out + reduce (10 subagents): roughly 11× because the reducer has its own cost.
- supervisor + specialists (3 specialists): roughly 4×.
- deep recursive delegation: unpredictable; often 10×+ before the work even completes.

These multipliers are inputs to the build-vs-not decision. A 4× cost multiplier on a workflow that produces 4× value is a win. The same 4× on a workflow that produces 1.5× value is a tax. Black Belt builders watch cost attribution (G.20) and make the multiplier visible.

---

## A worked example

Suppose your team is building an end-to-end PR-review automation. The job: read an open PR, surface findings across security, performance, design-system compliance, and test coverage, then assemble the findings into a structured report a reviewer can read in two minutes.

Walk the questions:

- **Naturally ordered?** Partially (the read happens before the analysis, the analysis before the report) but the four analyses are independent. Not pure sequential.
- **Naturally parallel?** Yes: security, performance, design-system, test coverage are independent of each other.
- **Generalist + specialists?** Yes — a main agent reads the PR and assembles the report; specialists handle each analysis.

Conclusion: a hybrid. A thin supervisor + four parallel specialists + a reducer. The supervisor reads the PR once; spawns four parallel specialists with tight briefs; receives four structured artefacts; assembles the report.

This is essentially what the `pre-ship-check` and `security-review-subagent` skills together implement. The pattern composes; the chapters that drafted them got the pattern right.

---

## What this chapter is not

**Not a replacement for G.8.** G.8 covers single subagent invocation; B.5 covers patterns at the systems level. Both matter; they layer.

**Not a defence of multi-agent at all costs.** Most workflows are best served by a single agent or a single subagent invocation. Reach for multi-agent only when the patterns above genuinely apply.

**Not a research overview.** The literature on multi-agent systems is rich and growing. This chapter names the shapes that work in production at Razorpay's scale. The literature is interesting; the patterns are what ships.

---

## Common failure modes

**Defaulting to multi-agent because it sounds sophisticated.** A single agent with the right brief beats three agents with vague briefs almost always. Fix: walk the three questions; default down.

**Skipping typed contracts between stages.** A sequential pipeline whose stages emit free-form text is a brittle pipeline. Fix: typed outputs; one schema per stage.

**Fan-out on non-independent work.** Cross-slice signal gets dropped or hallucinated. Fix: ask "are these slices truly independent?" If no, the pattern is wrong.

**Free-for-all in disguise.** "We have a coordinator" but the coordinator does not actually decide who does what. Fix: a real supervisor with a real assignment policy.

**Recursive delegation past two layers.** Context loss compounds. Fix: flatten; specialists return findings, do not re-delegate.

**No cost attribution.** Multi-agent multipliers are real; without attribution they accumulate invisibly. Fix: tag every agent invocation; watch the rollup.

**Hand-wavy success criteria.** "It worked" is not a success criterion for a 4× cost multi-agent run. Fix: name what the artefact is and what passing looks like before invoking.

---

## GREEN / YELLOW / RED self-check

- 🟢 GREEN — I pick the right multi-agent pattern in under five minutes by walking the three questions; I refuse free-for-all and deep recursive delegation; I attribute costs deliberately.
- 🟡 YELLOW — I understand the patterns but my pattern choice is sometimes "whatever fits in my head" rather than the three-question walk.
- 🔴 RED — I have invoked multi-agent patterns without thinking through which one is right for the job.

---

## What you can say after this module

> "I pick the right multi-agent pattern by walking three questions, refuse the two failure-shaped patterns, and watch cost attribution as the multiplier scales. I default down to a single agent when the patterns do not clearly apply."

---

## Where to go next

B.6 (*Tool design*) closes Part A. Multi-agent patterns work only as well as the tools the agents call; B.6 is the tool-contract layer the patterns rest on.

**Previous:** [← B.4 The Claude Agent SDK](B04-agent-sdk.md) · **Next:** [→ B.6 Tool design](B06-tool-design.md)

**Further reading**

- [G.8 — Subagents](../../03-green/a-craft/G08-subagents.md)
- [G.20 — Observability with AI](../../03-green/b-practices/G20-observability-with-ai.md) — cost attribution
- [Anthropic on multi-agent patterns](https://docs.claude.com/)
