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
outcome: "Choose the right multi-agent orchestration pattern, define its state and failure contract, and refuse patterns that consistently fail."
prev: "belts/black/agent-sdk"
next: "belts/black/tool-design"
pillar: "harness"
belt: "black"
tags: ["black-belt", "multi-agent", "orchestration", "patterns", "state-management", "error-handling"]
updated: "2026-08-04"
---

# B.5 — Multi-agent orchestration

G.8 introduced subagents. B.5 is the systems-design layer above subagents: when you have *several* agents running in concert (sequentially, in parallel, with a supervisor, or in a marketplace) which patterns actually work and which keep failing in ways the literature does not always admit. This module is the most cognitive-heavy chapter in Part A; it carries the patterns a Black Belt builder needs to recognise on sight.

---

## If you're short on time

- Three patterns reliably work: **sequential pipeline**, **fan-out + reduce**, **supervisor + specialists**.
- Two patterns reliably fail at scale: **agent free-for-all** and **deep recursive delegation**.
- Pick by job. The wrong pattern is an order of magnitude more expensive than the right one.
- Before launch, name one state owner and decide what happens when a worker times out, returns invalid output, or cannot finish.

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

## Before launch: write the execution contract

Choosing a pattern answers **who does the work**. It does not answer **who owns the truth when the work is half done**.

Do not let every agent edit one shared state file. Give one coordinator a durable state record. In a supervisor pattern, that coordinator is the supervisor; in a pipeline, it is the orchestrator between stages. Workers receive bounded inputs and return new, immutable results; the coordinator validates and records them. This keeps one timeout from turning into a mystery about which agent wrote what.

Copy this card before the first run:

```text
MULTI-AGENT EXECUTION CONTRACT

Goal + passing artefact:
Pattern + why it fits:
Coordinator / state owner:

For each worker:
- bounded input:
- output shape:
- allowed tools and mutations:
- timeout:

Checkpoint after:
Retry rule:
Partial-result rule:
Human approval before:
Hard stop when:
```

A useful checkpoint records completed task IDs, validated output references, retry counts, the next task, and the human owner. It should let the coordinator resume without repeating successful work or trusting an unvalidated draft.

### Decide failures before they happen

| Failure | Default response |
|---|---|
| Worker times out | Retry once only if the step is safe to repeat; otherwise mark it incomplete. |
| Worker returns the wrong shape | Reject the output. Ask for one bounded repair; never make the reducer guess missing fields. |
| Tool denies access or raises a safety boundary | Stop that path and escalate. Do not retry with improvised credentials or a weaker route. |
| Specialists disagree | Preserve both findings and route the conflict to the coordinator or a human; do not average away the disagreement. |
| One parallel slice fails | Continue only if the passing artefact explicitly allows partial coverage. Label the missing slice. |
| A mutating step fails | Stop before another mutation. Reconcile state and get human approval before retrying. |

The model may adapt around a transient tool failure. The workflow still needs deterministic limits: bounded retries, regular checkpoints, and a stop condition. “The agents will figure it out” is not an error contract.

### Ten-minute failure drill

Pick one real workflow with at least three workers. Fill the card, then test these two interruptions on paper:

1. The second worker times out after the first worker has completed successfully.
2. The final worker returns a plausible answer that does not match its output schema.

For each interruption, point to the checkpoint the coordinator resumes from, the retry budget it consumes, what the final artefact says, and where a human must intervene. If any answer is “restart everything” or “let the reducer infer it,” the contract is not ready.

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

Its execution contract is equally important: the supervisor owns the run record; specialists return findings without editing the PR; each accepted finding is checkpointed. If the security specialist still fails after its bounded retry, the report says security review is incomplete and stops before an approval recommendation. A green-looking report with one missing specialist is not a partial success; it is a mislabelled failure.

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

**Shared mutable state with no owner.** Two agents update the same record and the reducer cannot reconstruct which value is current. Fix: workers return immutable results; one coordinator validates and writes checkpoints.

**Retrying every error.** Permission failures, malformed outputs, and unsafe mutations are not transient network blips. Fix: define which errors get one bounded retry, which produce a partial artefact, and which stop the run.

---

## GREEN / YELLOW / RED self-check

- 🟢 GREEN — I pick the right pattern in under five minutes, name one state owner, checkpoint accepted outputs, and predefine retry, partial-result, approval, and stop rules.
- 🟡 YELLOW — I understand the patterns, but state ownership or failure behaviour still lives in my head rather than an execution contract.
- 🔴 RED — I have launched multi-agent work without deciding which pattern fits or what happens when one worker fails.

---

## What you can say after this module

> "I pick the right multi-agent pattern, give it one state owner, and define checkpoints, retries, partial results, and stop conditions before launch. I default down to a single agent when the patterns do not clearly apply."

---

## Where to go next

B.6 (*Tool design*) closes Part A. Multi-agent patterns work only as well as the tools the agents call; B.6 is the tool-contract layer the patterns rest on.

**Previous:** [← B.4 The Claude Agent SDK](B04-agent-sdk.md) · **Next:** [→ B.6 Tool design](B06-tool-design.md)

**Further reading**

- [G.8 — Subagents](../../03-green/a-craft/G08-subagents.md)
- [G.20 — Observability with AI](../../03-green/b-practices/G20-observability-with-ai.md) — cost attribution
- [Anthropic — How we built our multi-agent research system](https://www.anthropic.com/engineering/multi-agent-research-system) — delegation, state, checkpoints, retries, and resumable failures
