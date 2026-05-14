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
outcome: "Use Claude Code with the observability connectors to triage production-shape issues — logs, traces, and cost attribution — without dumping raw output into the chat window."
prev: "belts/green/design-preview-platform"
next: "belts/green/debugging-hard-kind"
pillar: "harness"
belt: "green"
tags: ["green-belt", "observability", "logs", "traces", "cost-attribution"]
updated: "2026-04-29"
---

# G.20 — Observability with AI

Observability is what tells you what production is actually doing. Logs (what happened), traces (how it happened), metrics (how often, how slow). Bringing AI into observability is not "ask Claude what's wrong": it is a deliberate context-engineering pattern: hand the agent the *summarised* shape of a problem, not the raw firehose, and let it correlate, hypothesise, and propose.

This chapter is the discipline that lets a Green Belt builder triage a production-shape issue with AI without melting their context budget.

---

## If you're short on time

- Never paste raw logs into the chat window. Summarise first; paste structure, not noise.
- Use the observability connectors (logs, traces, metrics) to let the agent fetch directly. Pre-filter the query.
- Cost attribution (knowing which agent calls cost what) is the metric most teams skip. It separates "AI is great" from "AI is great and we know why."

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
   │    1. Define the question precisely.                │
   │    2. Use the connector to fetch a scoped slice.   │
   │    3. Summarise to structure.                       │
   │    4. Hand the agent the structure, not the slice. │
   │    5. Iterate on the summary, not the raw data.    │
   │                                                    │
   └──────────────────────────────────────────────────┘
```

The discipline is the same as G.2's context-budget logic, applied to production data instead of CLAUDE.md.

---

## The three observability surfaces

### Logs

What happened. Free-form, often verbose, frequently noisy. The right shape to hand the agent:

- a **time window** ("the last hour" or "around 14:32 UTC");
- a **filter** (a request ID, a user ID, an error code);
- a **summary** (count by error type, count by handler) rather than raw lines.

A good prompt to the agent looks like:

> "Pull the last hour's error logs from the reporting service via the logs connector. Filter to 5xx responses. Summarise by error type with counts and one example log line per type. Do not paste raw log volume."

The agent fetches, summarises, and hands you a structured surface. You ask follow-ups against the structure, not against new raw fetches.

### Traces

How it happened. A single request's path through services, with timing per span. Traces are richer than logs and more useful for debugging *slowness*.

The right shape:

- a **specific trace ID** (when you have one);
- a **slow-trace filter** (p99 traces in the last hour);
- a **service-narrowed view** when you only care about one hop.

Trace data is structurally easier for the agent to reason about than logs, because spans are typed. The agent can say "this span spent 300ms in the cache lookup; the next span spent 4 seconds in the DB; the slowness is downstream of the cache miss" — that kind of structured analysis is exactly what AI is good at, *if* you hand it the trace and not the firehose.

### Metrics

How often, how slow. Aggregated values: request count, error rate, latency percentiles. Less rich per-request than traces, more useful for trend detection.

The right shape:

- a **named metric** ("p95 latency for `/reporting/dashboard`");
- a **window** ("the last 24 hours");
- a **comparison** ("compared to the same window last week").

Metrics are where "is this regressing" lives. The agent reads metrics well; pre-filter the query.

---

## Cost attribution — the metric most teams skip

Every Claude Code session costs tokens. Tokens cost money. A Green Belt program that ships AI-assisted code without watching cost-per-task is flying blind.

Three habits.

**Habit 1 — Tag your sessions.** When the program-pinned plugin supports it, attach a tag (a ticket ID, a project name, a builder handle) to each session. Tags become rows in a cost-attribution dashboard.

**Habit 2 — Read the cost dashboard weekly.** Look for outliers: sessions that cost ten times the average. Outliers are usually a sign of a context-budget failure — a long session that should have been multiple short sessions.

**Habit 3 — Build a per-feature cost intuition.** "Authoring a Playwright test runs ~$X." "Running the production-compiler on a file runs ~$Y." Once you know the rough costs, a session that runs $5Y for the same task is a signal to look at why.

This is the discipline that separates "AI is great" from "AI is great and we know it is sustainable." Razorpay's program at scale only works if cost stays in line with value.

---

## A worked example: triaging a production-shape issue

A real session, condensed.

**Builder.** "Reports are slow this morning. I want to figure out what's going on without flooding my context."

**Agent (after the first prompt).** "Let me start by pulling the metric for `/reporting/dashboard` p95 latency over the last 6 hours via the metrics connector. Standby."

> p95 latency:
> - 02:00 UTC: 800ms
> - 03:00 UTC: 850ms
> - 04:00 UTC: 1.2s
> - 05:00 UTC: 4.5s ← spike
> - 06:00 UTC: 4.8s ← still elevated
> - 07:00 UTC: 4.7s

**Builder.** "Spike at 04:00. Pull a slow-trace from around 04:00 via the traces connector."

**Agent (after the second prompt).** "Pulling one slow trace from 04:02 UTC. Trace summary:"

> Span: HTTP /reporting/dashboard — 4.8s total
>   ├── auth (50ms)
>   ├── cache lookup (120ms — MISS)
>   ├── db query (4.4s) ← slow span
>   └── render (200ms)
>
> The DB query took 4.4 of the 4.8 seconds. Cache miss preceded it.

**Builder.** "Pull the DB query's text and the metrics for that query family."

**Agent (after the third prompt).** "Query is the aggregated-reports query for `tenant_id`. Metrics for this query family over the last 24h:"

> - Avg execution time: 80ms
> - p95: 220ms
> - p95 spike at 04:00 UTC: 4.4s ← matches the dashboard regression

**Builder.** "Find what changed at 04:00. Check deployments and config changes via the deployments connector."

**Agent (after the fourth prompt).** "One deployment at 03:55 UTC. The change updated the aggregated-reports query to add a new GROUP BY clause. The new clause is not indexed."

**Builder.** "Got it. Filing a hotfix to revert the GROUP BY pending an index."

That whole session took fifteen minutes and used ~1,500 tokens. Without the discipline, the same investigation would have flooded the context with raw log volume and either taken an hour or led the agent to a wrong hypothesis.

---

## What the agent does well in observability

- **Correlation across services.** Given traces from two services, the agent finds the cross-service span where time is spent.
- **Anomaly framing.** "p95 went from 800ms to 4.5s; here are three spans that are different in the slow trace versus the fast one."
- **Hypothesis ranking.** Given a regression and a deployment list, the agent ranks the deployments by likelihood of causing the regression.
- **Query authorship.** Given the metric you want and the connector available, the agent writes the query that fetches it.

---

## What the agent does poorly in observability

- **Raw-log scanning.** Pasting a 4,000-line log and asking "what's wrong" produces noise. The agent is not a regex engine.
- **Pattern-matching rare events from sparse data.** A bug that fires once an hour is hard to find without sampling logic the agent does not have.
- **Real-time correlation.** Anything that requires watching a stream over minutes — set up an alert; do not ask the agent.
- **Authoritative root-cause statements.** The agent hypothesises; the human verifies. Treat the agent's analysis as a starting point.

---

## Common failure modes

**Pasting raw logs.** The most common failure mode. Fix: pre-filter via the connector; summarise to structure.

**Asking "what's wrong" with no scope.** A flood of plausible-but-irrelevant analysis. Fix: scope by time window, by service, by metric.

**Trusting the agent's hypothesis without verification.** A confident wrong answer is worse than no answer. Fix: every hypothesis the agent makes should be verifiable; verify before acting.

**Skipping cost attribution.** "How much did this triage session cost?" — the team that does not track this finds out when the bill arrives. Fix: weekly cost-dashboard review; tag sessions.

**Letting an observability session run for fifty turns.** The window fills; the early-fetch context degrades; the agent drifts. Fix: a fifteen-minute session with five prompts beats a fifty-prompt marathon almost every time.

**Asking the agent to *fix* a production issue from inside the observability session.** Two contexts: triage and remediation. Triage names the cause; remediation drafts the fix. Run them as separate sessions if possible.

---

## GREEN / YELLOW / RED self-check

- 🟢 GREEN — I triage production-shape issues with AI in tight, scoped sessions; I never paste raw log volume; I read cost attribution weekly.
- 🟡 YELLOW — I use AI for observability sometimes but my sessions get long and noisy; I do not look at cost.
- 🔴 RED — I have not used AI for observability at all, or I use it by pasting raw logs.

---

## What you can say after this module

> "I triage production observability with AI by handing the agent structured summaries (not raw log volume) and I track cost so I know whether the AI investment is paying off."

---

## Where to go next

G.21 (*Debugging the hard kind*) closes Part B. Observability tells you what is wrong; G.21 is the prompt-craft for arguing with the agent when the agent's first answer is also wrong.

**Previous:** [← G.19 Branch-preview platform](G19-design-preview-platform.md) · **Next:** [→ G.21 Debugging the hard kind](G21-debugging-hard-kind.md)

**Further reading**

- [G.2 — Why context windows fill](../a-craft/G02-context-windows.md)
- [Yellow Belt Y.12 — Debugging with Claude](../../02-yellow/Y12-debugging-loop.md)
- [Yellow Belt Y.10 — Slack + Google Workspace MCPs](../../02-yellow/Y10-slack-and-gworkspace-mcps.md) — connector mechanics
