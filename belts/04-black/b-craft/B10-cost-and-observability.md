---
title: "Cost attribution + observability at team + org scale"
slug: "belts/black/cost-and-observability"
section: "belts"
status: "drafted"
type: "chapter"
track: "black"
order: 10
time_minutes: 30
audience: "platform-builder"
outcome: "Instrument cost and observability at team and org scale, not just per-session — and identify the patterns that run quietly expensive before they become a finance problem."
prev: "belts/black/prompt-evals"
next: "belts/black/effort-and-routing"
pillar: "harness"
belt: "black"
tags: ["black-belt", "cost-attribution", "observability", "scale"]
updated: "2026-04-29"
---

# B.10 — Cost + observability at scale

Yellow Belt's Y.20 — sorry, Green Belt's [G.20](../../03-green/b-practices/G20-observability-with-ai.md) — covered observability for a single builder triaging a single production-shape issue. B.10 is the same discipline at team and org scale. Where a Green Belt builder asks "why is this session expensive," a Black Belt builder asks "which patterns across our team's invocations consume the most budget, and which ones produce the most value." The answers are different; the instrumentation has to support both.

---

## If you're short on time

- Per-session cost (G.20) is the floor; per-team and per-org cost is the ceiling. Both matter; both need separate dashboards.
- The patterns that run quietly expensive: long-running sessions that should have been multiple short ones, agents with broad capabilities used narrowly, multi-agent workflows running at a multiplier nobody noticed (per B.5).
- Cost attribution is not finance hygiene; it is a feedback signal that shapes which patterns get adopted.

---

## The mental model

```
   ┌────────────────────────────────────────────────┐
   │              SCALE OF OBSERVABILITY              │
   ├────────────────────────────────────────────────┤
   │                                                  │
   │   PER SESSION (G.20)                             │
   │   The builder's view. Was this triage cheap?   │
   │   Are my sessions getting bloated?              │
   │                                                  │
   │   PER TEAM                                       │
   │   The team lead's view. Which workflows are    │
   │   our biggest line items? Which builders run   │
   │   the most-expensive sessions and why?         │
   │                                                  │
   │   PER ORG                                        │
   │   The program lead's view. Which teams are     │
   │   the biggest consumers? Which patterns        │
   │   propagate well? Where are the outliers?      │
   │                                                  │
   └────────────────────────────────────────────────┘
```

Each scale has its own questions. The dashboards differ in granularity, in audience, and in cadence. A Black Belt builder authors team-level patterns and reads org-level signal.

---

## What every scale needs

Five named signals at every layer.

### Signal 1 — Spend rollup

Total tokens, total dollars, broken down by the right axis. At session scale, one row per session. At team scale, one row per team-week. At org scale, one row per team or per workflow per month.

### Signal 2 — Outlier surfacing

The single most useful observability output. Not "average cost" but "the top five most-expensive sessions / weeks / workflows this week." Outliers are where the patterns hide.

### Signal 3 — Workflow attribution

Which skill was invoked? Which agent? Which connector? Without workflow attribution, "the team is expensive" is unactionable; with it, "the team's pre-ship-check invocations are 40% of spend" tells you exactly where to look.

### Signal 4 — Pattern detection

Which named patterns are running? Multi-agent runs (per B.5)? Long-running sessions? Adversarial-cost agents? Pattern detection turns "this team is expensive" into "this team is running fan-out + reduce on every PR; the multiplier is the cause."

### Signal 5 — Trend lines

Week-over-week spend per workflow. A workflow that doubles in cost in a quarter is a signal — usually a context-bloat problem (per G.2) or an over-eager multi-agent rollout. Trends catch what point-in-time snapshots miss.

---

## Per-team observability

The team lead's view. The questions:

- **Which workflows consume the most budget?** Roll up by skill name; sort descending. The top three are usually 80% of the spend.
- **Which builders are running the most expensive sessions?** Not for blame; for coaching. A builder who runs 100-turn sessions has a context-budget problem (per G.2) the team can solve.
- **Which sessions ran into a multi-agent multiplier?** Per B.5, the multipliers are real (3x for sequential, 11x for fan-out + reduce, etc.). A team running a lot of multi-agent workflows pays for it; the question is whether the value justifies the multiplier.
- **What changed week over week?** A 30% spike usually has a named cause. Find it.

A useful cadence: a 15-minute team review of the cost dashboard once a week. Not deep; just "anything weird? what's the top line item? do we want to keep paying for it?"

---

## Per-org observability

The program lead's view. The questions:

- **Which teams have the most expensive patterns?** Not "the most expensive teams" — that mixes team size with pattern efficiency. Compare per-builder cost.
- **Which named skills propagate well?** A skill installed by one team and not adopted is different from a skill installed by ten teams; the latter is leverage, the former is debt.
- **Where do the outliers live?** The org-level dashboard should surface "team X had a single session that cost $50 in tokens" as an investigable event. Outliers are the most likely place to find a wrong-shape multi-agent pattern or a runaway loop.
- **Are evals being run on shipped skills?** A team shipping skills without evals (per B.9) is a team adding org-level cost without org-level confidence. Track skill-update events and flag updates that ship without an eval log.

The org-level review is monthly, not weekly. The cadence matches the time it takes for patterns to stabilise enough to be visible.

---

## The patterns that run quietly expensive

Three patterns Black Belt builders learn to spot.

**Pattern 1 — Long-running sessions.** A session that runs for 90 turns is paying the context-bloat tax (per G.2). Cost per useful output is high; the agent's attention degrades; the budget compounds. The fix is not "make the session faster" — it is "split into multiple shorter sessions." The dashboard surfaces sessions over a turn-count threshold.

**Pattern 2 — Broad-capability agents used narrowly.** An agent with twenty tools loaded that only ever uses three is paying for nineteen tools' worth of context every invocation. The fix is to scope the agent narrower or use a subagent (per G.8) for the focused work. The dashboard surfaces agents whose tool-utilisation ratio is low.

**Pattern 3 — Multi-agent workflows running at unintended multipliers.** Per B.5, a fan-out + reduce on 10 subagents costs ~11×. If the team's multi-agent workflows are not paying off in proportion, the multiplier is debt. The dashboard surfaces multi-agent runs with their multipliers and the workflow's outputs.

A Black Belt builder watches for these three and intervenes. A team that does not watch ends up with a quiet quarterly cost report nobody can defend.

---

## What instrumentation needs to exist

The signals above require the proxy (per G.23) to log per-call:

- caller team and caller handle (the cost-attribution tag from G.20);
- skill / agent name (workflow attribution);
- model and model version (effort-setting attribution; see B.11);
- input tokens, output tokens, latency;
- success / failure status, with error type if applicable;
- multi-agent context (was this a subagent call? if so, parent session?).

The program-pinned plugin's proxy provides most of this by default. The org-scale dashboards aggregate. A Black Belt builder authoring custom agents (per B.4) routes through the proxy explicitly so the signals show up in the right rollups.

---

## Worked example — finding a quietly expensive pattern

A team lead opens the weekly dashboard and notices Team X's spend has tripled in three weeks. Walk the questions:

1. **Which workflows are responsible?** Top line: a custom agent the team authored last month, invoked daily.
2. **Which builders?** Spread across the team; not one builder.
3. **Multi-agent?** Yes — fan-out + reduce, 8 subagents per call.
4. **What does the workflow produce?** A daily report.
5. **What is the value?** The report is read by the team lead each morning.

The investigation:

- 8x multiplier on a daily call makes the daily report cost ~$N where the lead expected ~$N/8.
- The lead's read of the report is a five-minute scan; the cost is paying for a research-quality artefact.
- The fix: a single agent, not fan-out + reduce. The report's quality slips marginally; the cost drops 8x.

The team lead messages the team. The custom agent author objects: "fan-out finds more signal." The team agrees to A/B (per B.9) (the single-agent version against the fan-out version) for two weeks, with the team lead reading both reports and judging signal quality.

The A/B reveals the single-agent version is sufficient for the lead's actual use. The fan-out version retires. Three weeks later, the team's spend has settled at sustainable.

This is the loop B.10 is for — observability surfaces the pattern, evals (per B.9) test the proposed change, the team converges on the right shape.

---

## Common failure modes

**No cost dashboard at the team scale.** "We'll find out at finance review." That is the wrong cadence. Fix: a weekly team rollup; even a coarse one.

**Tracking total spend without workflow attribution.** "The team is expensive" is unactionable. Fix: attribute by skill / workflow.

**Skipping the outlier review.** Outliers are where the patterns hide. Averages mask. Fix: top-N every week.

**Treating cost as a finance concern.** It is also a feedback signal. A 3x cost increase usually means the patterns shifted; understanding which ones is the lead's job. Fix: cost is product information.

**Not attributing custom-agent calls.** Per B.4, custom agents must route through the proxy. Without the routing, custom-agent calls are invisible to the org dashboard. Fix: the proxy is the path.

**Eval-skip detection turned off.** A skill ship without an eval log is a quiet quality decay. Fix: track and flag.

---

## GREEN / YELLOW / RED self-check

- 🟢 GREEN — I instrument and read cost + observability at team and org scale; my dashboards surface outliers, workflow attribution, multi-agent multipliers, and trend lines; I treat cost as a feedback signal, not just finance hygiene.
- 🟡 YELLOW — I read per-session cost (per G.20) but my team's aggregated spend is opaque to me.
- 🔴 RED — I have not looked at team or org cost rollups; "we'll find out at finance review" is my baseline.

---

## What you can say after this module

> "I instrument cost and observability at team and org scale, surface the patterns that run quietly expensive, and use the feedback signal to shape which patterns get adopted across the program."

---

## Where to go next

B.11 (*Effort settings, model routing, fall-backs*) is the per-call tuning layer that interacts directly with cost and quality.

**Previous:** [← B.9 Prompt evals](B09-prompt-evals.md) · **Next:** [→ B.11 Effort + routing](B11-effort-and-routing.md)

**Further reading**

- [G.20 — Observability with AI](../../03-green/b-practices/G20-observability-with-ai.md) — the per-session layer this module extends
- [G.23 — The LLM proxy](../../03-green/c-guardrails/G23-llm-proxy.md) — the instrumentation layer all this depends on
- [B.5 — Multi-agent orchestration](../a-platform/B05-multi-agent-orchestration.md) — the multipliers this dashboard surfaces
