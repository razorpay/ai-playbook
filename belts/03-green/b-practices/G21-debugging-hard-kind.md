---
title: "Debugging the hard kind — when Claude is wrong, and you have to tell"
slug: "belts/green/debugging-hard-kind"
section: "belts"
status: "drafted"
type: "chapter"
track: "green"
order: 21
time_minutes: 30
audience: "experienced-builder"
outcome: "Recognise when Claude's analysis is wrong, push back productively, and get to the right answer without falling into either capitulation or argument."
prev: "belts/green/observability-with-ai"
next: "belts/green/quest-greenfield-crossover"
pillar: "prompt"
belt: "green"
tags: ["green-belt", "debugging", "prompt-craft", "capstone"]
updated: "2026-04-29"
---

# G.21 — Debugging the hard kind

This is the Prompt-pillar capstone of Part B and the most senior prompt skill in the playbook so far. Most of the time, asking Claude a clear question gets a useful answer. The hard kind of debugging is when the answer is confidently wrong: plausible, well-formatted, even partially correct, but missing the actual cause. The Green Belt skill is to recognise the moment, push back productively, and get to the right answer without either capitulating or escalating into argument.

---

## If you're short on time

- A confidently wrong answer feels useful. The first sign is that the user has stopped reasoning and started copying.
- Push back with evidence, not with frustration. "Here's what I saw on the trace; that doesn't match your hypothesis" beats "you're wrong."
- The agent is not your adversary; it is a stuck colleague. Treat it like one and the conversation gets unstuck.

---

## The mental model

```
   ┌────────────────────────────────────────────────┐
   │              WHEN CLAUDE IS WRONG                │
   ├────────────────────────────────────────────────┤
   │                                                  │
   │   1. Notice. The output is plausible but it     │
   │      contradicts something you know is true.    │
   │                                                  │
   │   2. Name the contradiction. State the fact    │
   │      that disagrees with the agent's claim.    │
   │                                                  │
   │   3. Ask the agent to reconcile. Either it     │
   │      revises the claim or it explains why the  │
   │      contradiction is illusory.                 │
   │                                                  │
   │   4. If it doubles down without new evidence:  │
   │      the agent is confidently wrong. Pause.    │
   │                                                  │
   │   5. Hand the agent new evidence. A code path, │
   │      a log line, a screenshot. Then ask again. │
   │                                                  │
   │   6. If still stuck: change the harness. New   │
   │      session, smaller scope, fresh agent.      │
   │                                                  │
   └────────────────────────────────────────────────┘
```

The skill is recognising step 4 quickly. A Yellow Belt builder accepts the plausible answer and walks into the next bug. A Green Belt builder names the contradiction and forces a reconciliation.

---

## The four tells

Four signs that the agent is confidently wrong. Watch for them.

### Tell 1 — The agent's claim contradicts something you know is true

You know the read replica does not have writes enabled. The agent says "the slow query is from a write." That is a contradiction. The agent is wrong about *something*: the query type, the writeability, or the cause-of-slowness. Name the contradiction and ask which part is wrong.

### Tell 2 — The agent's hypothesis is conveniently complete

The first hypothesis explains everything. Slowness, the timing, the metric, and your morning coffee. Real causes are usually messier. A hypothesis that is suspiciously complete is often a confident fit on partial evidence.

The fix: ask "what does this hypothesis NOT explain?" If the agent cannot name a piece of evidence that pushes back, the hypothesis is over-fit.

### Tell 3 — The agent stopped citing sources

Earlier in the session, the agent said "according to the trace at 04:02 UTC..." Now it is making claims with no source. The transition is silent. The agent has moved from analysing evidence to generating plausible-sounding analysis.

The fix: ask "where did you read that?" If the answer is hand-wavy, the claim is hand-wavy.

### Tell 4 — Your own reasoning has stopped

The most insidious tell. You are nodding along. The agent is producing fluent, structured paragraphs. Your hands have stopped typing follow-up questions; you are copying the agent's plan into a ticket.

The fix: stop. Ask yourself "what would I check if the agent's hypothesis were wrong?" If you do not have an answer, you are not debugging; you are ratifying.

---

## How to push back productively

Three habits.

### Habit 1 — State the disagreement; do not argue it

"That doesn't match what I saw on the trace at 04:02. The slow span was the DB query, not the cache lookup." That is a statement of disagreement with evidence. The agent now has a fact to reconcile against.

Compare to: "I don't think you're right." That is an argument. The agent has nothing to do but defend or capitulate; either path is a dead end.

### Habit 2 — Hand the agent new evidence

The agent's first answer was based on the evidence it had. If the answer is wrong, the agent needs more evidence to revise. Pasting a span detail, a log line, a code excerpt (anything concrete) gives the agent something to update against.

### Habit 3 — Time-box the back-and-forth

If two rounds of "here's evidence; reconcile" do not converge, the agent is stuck in the wrong frame. The fix is not a third round; the fix is a new session with a tighter scope or a fresh agent.

---

## A worked example

A real session, condensed.

**Builder.** Pulled metric and trace data per G.20. Spike in p95 latency at 04:00 UTC. Slow span is the aggregated-reports DB query. Asks: "What changed at 04:00? Pull deployments and config diffs."

**Agent (after pulling).** "There were two deployments at 04:00 UTC. Deployment A added a new index to the reports table. Deployment B updated the cache TTL from 60s to 600s. The cache TTL increase is the cause: longer TTL means stale data, so the query had to do more work."

**Builder (notices Tell 1 — contradiction).** "That doesn't match. A longer cache TTL means *less* work for the DB, not more — the cache absorbs more queries. Are you sure that's the cause?"

**Agent.** "You're right; my reasoning was inverted. Let me re-examine the deployments. Deployment A added an index — but the index is on a column not used in the slow query. Deployment B updated cache TTL, which as you noted should reduce DB load. Neither deployment obviously causes a 5x latency increase. Let me pull the actual query plan from the slow trace."

**Agent (after pulling the query plan).** "The slow query has a new GROUP BY clause that was not in the prior version. The clause is not indexed. This is a query change, not a deployment change — looking for the source."

**Builder.** "Pull the most recent change to the reports query path."

**Agent.** "Found it. A commit at 03:55 UTC changed the aggregated-reports query to add the new GROUP BY for a feature ticket. The GROUP BY is on `tenant_id`, which is not indexed."

**Builder.** "Got it. Filing the hotfix to revert the GROUP BY pending an index."

That session worked because the builder noticed the contradiction in the agent's first answer, named it with evidence, and forced a reconciliation. Without that intervention, the team would have rolled back two innocent deployments while the actual bug (a query change) sat untouched.

---

## When you should defer to the agent

The skill is *not* "always assume the agent is wrong." It is "verify before acting." Two patterns where deferring is correct.

**Pattern A — The agent is reading evidence you have not seen.** If the agent has just pulled a trace or a log and you have not, the agent's analysis is more grounded than your prior. Read the evidence yourself before pushing back.

**Pattern B — The agent's reasoning chain is sound and you do not have a counterexample.** Sometimes the agent is right and your gut is wrong. If you cannot name a fact that disagrees, the right move is to act and verify, not to pre-emptively distrust.

The Green Belt skill is calibration: knowing when to push back and when to defer. The four tells help with the first; humility helps with the second.

---

## What this is not

**Not arguing for sport.** A debate club mindset wastes the agent's context and your time. The goal is the right answer, not winning.

**Not browbeating the agent.** "You're wrong" without evidence is empty. The agent will either capitulate (also wrong) or repeat itself. Neither helps.

**Not treating every fluent answer as suspect.** Most of the agent's answers are correct. Suspect every answer is paranoia and a different failure mode.

**Not skipping verification when the agent admits it was wrong.** A capitulating agent is not necessarily a correct agent. The agent's *new* answer also needs verification.

---

## Common failure modes

**Capitulating to confident wrongness.** The agent says it confidently; you stop reasoning. Fix: the four tells; the "what would I check if this were wrong" question.

**Arguing without evidence.** "I don't think that's right." The agent has nothing to update on. Fix: state the disagreement with a specific fact.

**Going to a third round when you should switch sessions.** Two reconciliation rounds are healthy; a fifth is sunk-cost. Fix: a new session, tighter scope, fresh agent.

**Treating the agent as adversarial.** "Gotcha" pushback. The agent is not the enemy; it is a stuck colleague. Fix: tone matters more than you think; productive pushback gets unstuck faster than combative pushback.

**Forgetting to verify after the agent revises.** The new answer is also a hypothesis. Fix: verify both the wrong-and-right transition.

**Accepting "I'm not sure" as the final answer.** The agent saying "I'm not sure" is a starting point; ask what evidence would resolve the uncertainty.

---

## GREEN / YELLOW / RED self-check

- 🟢 GREEN: I notice when the agent is confidently wrong, push back productively with evidence, and get to the right answer in two reconciliation rounds or fewer.
- 🟡 YELLOW — I sometimes capitulate to confident wrongness or escalate into unproductive argument.
- 🔴 RED — I treat every fluent answer as authoritative.

---

## What you can say after this module

> "I notice when Claude is confidently wrong, name the contradiction with evidence, and force a reconciliation: without capitulating, arguing, or wasting context."

---

## Where to go next

You have finished Part B. Quest G-2 (*The Greenfield cross-over*) is the test of Part A and Part B together. Pick a greenfield surface, ship one meaningful change, and exercise both halves of Green Belt.

**Previous:** [← G.20 Observability with AI](G20-observability-with-ai.md) · **Next:** [→ Quest G-2](quest-G2-greenfield-crossover.md)

**Further reading**

- [G.11 — Advanced prompting](../a-craft/G11-advanced-prompting.md) — the Part A capstone this module builds on
- [Yellow Belt Y.12 — Debugging with Claude](../../02-yellow/Y12-debugging-loop.md)
- [Anthropic on calibrated trust](https://docs.claude.com/en/docs/build-with-claude/prompt-engineering/overview)
