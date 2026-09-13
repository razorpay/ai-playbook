---
title: "Observability with AI — logs, traces, cost attribution"
slug: "belts/green/observability-with-ai"
section: "belts"
status: "drafted"
type: "chapter"
track: "green"
order: 20
time_minutes: 25
audience: "experienced-builder"
outcome: "Use Claude Code with approved observability sources to triage production-shape issues while preserving provenance, separating observations from hypotheses, and avoiding raw-data dumps."
prev: "belts/green/design-preview-platform"
next: "belts/green/debugging-hard-kind"
pillar: "harness"
belt: "green"
tags: ["green-belt", "observability", "logs", "traces", "cost-attribution"]
updated: "2026-09-13"
---

# G.20 — Observability with AI

Observability tells you what production is actually doing: logs record events, traces connect work across a request, and metrics show rates and distributions. Bringing AI into observability is not "ask Claude what's wrong." It is a controlled investigation: query an approved source, preserve how the evidence was produced, and use the agent to compare and propose—not to declare a cause.

This chapter is the discipline that lets a Green Belt builder triage a production-shape issue with AI without melting their context budget.

---

## If you're short on time

- Use an approved, read-only observability surface. If the source is unavailable, mark the investigation `BLOCKED`; do not substitute remembered numbers.
- Start with one question, a time window, and a healthy comparison. Fetch the smallest useful slice.
- Preserve the source, filter or query, window, and result. A summary without provenance is a story, not evidence.
- Keep **observations** separate from **hypotheses**, then test the leading hypothesis before acting.
- Attribute usage or cost only from the program's authoritative records. Compare like tasks; do not estimate from vibes or token-shaped placeholders.

---

## The mental model

```
   ┌──────────────────────────────────────────────────┐
   │              OBSERVABILITY WITH AI                 │
   ├──────────────────────────────────────────────────┤
   │                                                    │
   │  Production data is huge. Context windows are not. │
   │                                                    │
   │  Bad pattern:                                       │
   │    "Here is 800 lines of log output. What's wrong?"│
   │    → context floods; agent attention degrades.    │
   │                                                    │
   │  Good pattern:                                      │
   │    1. Define the question and decision.             │
   │    2. Confirm an approved, read-only source.        │
   │    3. Fetch a scoped slice and healthy comparison. │
   │    4. Record source, query, window, and result.     │
   │    5. Test hypotheses against that evidence.        │
   │                                                    │
   └──────────────────────────────────────────────────┘
```

The discipline is the same as G.2's context-budget logic, applied to production data instead of CLAUDE.md.

---

## The three observability surfaces

### Logs

What happened. Free-form, often verbose, frequently noisy. The right shape to hand the agent:

- a **time window** ("the last hour" or "around 14:32 UTC");
- a **filter** (a redacted request ID, an error code, or another approved identifier);
- a **summary** (count by error type, count by handler) rather than raw lines.

A good prompt to the agent looks like:

> "Using the approved logs surface, pull the last hour of reporting-service errors. Filter to 5xx responses. Return the source, exact filter, UTC window, count by error type, and one redacted example per type. Do not paste raw log volume."

When the approved source is connected, the agent can fetch and summarise this slice. Otherwise, fetch it through the normal read-only interface and provide the redacted result with its query and link. Ask follow-ups against the structure rather than repeatedly widening the raw fetch.

### Traces

How it happened. A single request's path through services, with timing per span. Traces are richer than logs and more useful for debugging *slowness*.

The right shape:

- a **specific trace ID** (when you have one);
- a **slow-trace filter** (p99 traces in the last hour);
- a **service-narrowed view** when you only care about one hop.

Trace data gives the agent named spans and timings to compare. It can state, for example, that a database span took four seconds in the slow trace and 200 milliseconds in the healthy trace. That is an observation. Whether a preceding cache miss caused the difference remains a hypothesis to test.

### Metrics

How often, how slow. Aggregated values: request count, error rate, latency percentiles. Less rich per-request than traces, more useful for trend detection.

The right shape:

- a **named metric** ("p95 latency for `/reporting/dashboard`");
- a **window** ("the last 24 hours");
- a **comparison** ("compared to the same window last week").

Metrics are where "is this regressing" lives. Ask the agent to compare defined windows and show the query or dashboard link behind the result. If the windows are incomplete or use different definitions, stop before interpreting the change.

---

## Cost attribution — measure, do not estimate

Usage matters only when it is tied to an outcome. Token count alone is not spend, and spend alone does not say whether the task succeeded.

For a repeated workflow, capture the task class, accepted outcome, model or route when the platform exposes it, retries, and usage or cost from the authoritative reporting surface. Compare the same task class over time. If one run is unusually expensive, inspect the evidence before blaming a long context: retries, oversized inputs, tool failures, route changes, and genuinely harder work can all change usage.

If your approved surface does not expose task-level cost, write `UNKNOWN — source does not expose task-level cost`. If you lack approved access, write `BLOCKED — access required`. Do not fill the gap with an invented baseline.

### Copyable investigation receipt

```text
Question and decision:
Approved source + owner:
Access mode: read-only / other approved mode
Window + timezone:
Filter or query:
Healthy comparison:
Observed result:
Missing or unknown:
Hypothesis:
Disconfirming check:
Evidence state: SUPPORTED / UNKNOWN / BLOCKED
Decision + evidence links:
Usage/cost source (or UNKNOWN/BLOCKED):
```

Fill this in while investigating. It keeps the evidence, explanation, test, and decision reviewable without copying an entire dashboard into the conversation.

---

## A worked example: triaging a production-shape issue

The numbers below are synthetic. They demonstrate the investigation sequence; they are not a production incident or a performance baseline.

**Builder.** "Reports are slow this morning. Use the approved metrics surface to compare the last six complete hourly windows with the same windows yesterday. Return the source, query, timezone, and completeness status."

**Agent.** "The candidate window is complete. Yesterday is complete. The reporting endpoint's p95 changed as follows:"

> p95 latency:
> - 02:00 UTC: 800ms
> - 03:00 UTC: 850ms
> - 04:00 UTC: 1.2s
> - 05:00 UTC: 4.5s ← spike
> - 06:00 UTC: 4.8s ← still elevated
> - 07:00 UTC: 4.7s

**Builder.** "Observed: p95 rises after 04:00 UTC. Pull one slow trace and one healthy trace from the approved trace surface. Redact identifiers and preserve both trace links."

**Agent.** "The slow trace at 04:02 UTC shows:"

> Span: HTTP /reporting/dashboard — 4.8s total
>   ├── auth (50ms)
>   ├── cache lookup (120ms — MISS)
>   ├── db query (4.4s) ← slow span
>   └── render (200ms)
>
> The DB query took 4.4 of the 4.8 seconds. Cache miss preceded it.

**Builder.** "That establishes a slow database span, not its cause. Compare the query family with a healthy trace and check recent deployments."

**Agent.** "The database span is slower in the candidate window. One deployment at 03:55 UTC changed the query's grouping:"

> - Healthy comparison p95: 220ms
> - Candidate-window p95: 4.4s
> - Deployment: added one grouping field at 03:55 UTC

**Builder.** "Hypothesis: the grouping change caused the slowdown. Run the read-only query plan or another owner-approved check that can disconfirm it. If the required access is unavailable, mark the cause `UNKNOWN`."

Only after that check supports the mechanism should remediation begin. The receipt keeps the observation (latency and span change), hypothesis (grouping change), test, and decision separate. G.21 continues with the full causal-claim workflow.

---

## Good uses for the agent

- **Compare structured evidence.** Ask it to contrast healthy and failing traces or complete metric windows.
- **Frame anomalies.** Ask it to state what changed, by how much, and which evidence supports that statement.
- **Generate hypotheses.** Ask for ranked explanations and a disconfirming check for each one.
- **Draft queries.** Let it propose a query, then inspect scope, permissions, and cost before execution.

---

## Keep these decisions human-owned

- **Source and access choice.** An agent must not route around an unavailable or restricted observability surface.
- **Query approval.** A plausible query can still be too broad, expensive, or unsafe.
- **Root-cause sign-off.** The agent proposes mechanisms; an accountable owner accepts the evidence.
- **Production changes.** Keep triage read-only. Move remediation into its own reviewed workflow.

---

## Common failure modes

**Pasting raw logs.** Volume buries the comparison and may expose data the task does not need. Fix: pre-filter through the approved source, redact, and summarise to structure.

**Asking "what's wrong" with no scope.** A flood of plausible-but-irrelevant analysis. Fix: scope by time window, by service, by metric.

**Trusting the agent's hypothesis without verification.** A confident wrong answer is worse than no answer. Fix: every hypothesis the agent makes should be verifiable; verify before acting.

**Reporting a summary without provenance.** The reader cannot reproduce or challenge it. Fix: preserve the source, filter or query, timezone, window completeness, and evidence links in the receipt.

**Guessing task cost from token counts or placeholders.** Pricing and routes can differ, and an expensive run may still be valuable. Fix: use the authoritative usage surface, compare like tasks, and mark attribution `UNKNOWN` or `BLOCKED` when the evidence is missing.

**Asking the agent to *fix* a production issue from inside the observability session.** Two contexts: triage and remediation. Triage narrows and tests the explanation; remediation drafts the fix after human sign-off. Run them as separate sessions if possible.

---

## GREEN / YELLOW / RED self-check

- 🟢 GREEN — I use approved sources, preserve query and window provenance, compare against a healthy baseline, and test hypotheses before acting.
- 🟡 YELLOW — I scope queries but do not consistently record provenance, missing evidence, or disconfirming checks.
- 🔴 RED — I paste raw production data, route around access controls, or treat an AI explanation as a verified cause.

---

## What you can say after this module

> "I use AI to compare scoped observability evidence, preserve how each result was produced, and test hypotheses before anyone acts on them."

---

## Where to go next

G.21 (*Debugging the hard kind*) closes Part B. Observability shows what changed; G.21 teaches you to challenge the explanation when the agent's first answer is wrong.

**Previous:** [← G.19 Branch-preview platform](G19-design-preview-platform.md) · **Next:** [→ G.21 Debugging the hard kind](G21-debugging-hard-kind.md)

**Further reading**

- [G.2 — Why context windows fill](../a-craft/G02-context-windows.md)
- [Yellow Belt Y.12 — Debugging with Claude](../../02-yellow/Y12-debugging-loop.md)
- [Yellow Belt Y.10 — Slack + Google Workspace MCPs](../../02-yellow/Y10-slack-and-gworkspace-mcps.md) — connector mechanics
- [Google SRE — Effective troubleshooting](https://sre.google/sre-book/effective-troubleshooting/) — test hypotheses against confirming and disconfirming evidence
