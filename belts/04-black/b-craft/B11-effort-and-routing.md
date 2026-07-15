---
title: "Effort settings, model routing, fall-backs"
slug: "belts/black/effort-and-routing"
section: "belts"
status: "drafted"
type: "chapter"
track: "black"
order: 11
time_minutes: 30
audience: "platform-builder"
outcome: "Tune per-call settings — effort level, model choice, fall-back path — to match the work's stakes; pick the cheapest setting that meets the bar, not the highest setting available."
prev: "belts/black/cost-and-observability"
next: "belts/black/quest-contribution-or-full-stack"
pillar: "harness"
belt: "black"
tags: ["black-belt", "effort-settings", "model-routing", "fall-backs"]
updated: "2026-07-15"
---

# B.11 — Effort settings, model routing, fall-backs

The closing module of Part B. Where B.10 measured cost at scale, B.11 is the per-call lever that shapes the cost-quality trade-off. Three named knobs (effort settings, model routing, fall-backs) that a Black Belt builder tunes to match the work's stakes. The bar is "cheapest setting that meets the quality bar," not "highest setting available."

---

## If you're short on time

- **Effort settings** tell the model how eagerly to spend tokens on a single call. Higher effort costs more; sometimes pays off, sometimes does not.
- **Model routing** picks which model handles which call. Different models for different jobs; cost-quality differs across model families.
- **Fall-backs** define what happens when the primary path fails: rate limit, timeout, classifier flag. A clean fall-back beats a noisy retry loop.
- **Estimate → Execute → Expand.** Start with the minimum route that can reliably do the job. Expand context, model capability, or effort only when verification gives you a reason.
- The discipline: pick by stakes. A 5x cost increase for a 5% quality lift on a low-stakes call is the wrong trade.

---

## The mental model

```
   ┌────────────────────────────────────────────────┐
   │              PER-CALL TUNING                     │
   ├────────────────────────────────────────────────┤
   │                                                  │
   │   1. EFFORT SETTING                              │
   │      How much "thinking" does this call         │
   │      deserve? Low / medium / high (or the      │
   │      provider's named scale).                    │
   │                                                  │
   │   2. MODEL ROUTING                               │
   │      Which model in the family for this call?  │
   │      Smaller models for narrow tasks; larger   │
   │      for open-ended reasoning.                   │
   │                                                  │
   │   3. FALL-BACK PATH                              │
   │      If the primary call fails (rate-limited,  │
   │      timeout, classifier-flagged), what next?  │
   │                                                  │
   └────────────────────────────────────────────────┘
```

The three knobs interact: a high-effort call on a smaller model may cost more than a default-effort call on a larger model and produce less. A Black Belt builder reads the cost-quality trade-off across knobs, not knob by knob.

---

## Route the task before you route the model

A recent internal example separates quick repository lookups, planning, and implementation instead of sending all three through the slowest route. Fresh research calls the broader pattern **Estimate → Execute → Expand (E3)**: judge the work's stakes and minimum evidence, run the smallest credible path, then widen the path only when verification fails.

This is not “always use the cheap model first.” A security review can justify a capable model and high effort on its first pass. The rule is **minimum sufficient execution**, not minimum possible spend.

### Copyable routing card

Fill this in before a repeated workflow or expensive agent run:

```markdown
## Task route
- Outcome: <what must be true when this finishes?>
- Failure cost: <low / medium / high, and why?>
- Minimum evidence: <files, sources, tests, or human checks required>
- Initial route:
  - Context: <smallest relevant folder / source set>
  - Model tier: <fast / balanced / deep-reasoning>
  - Effort: <low / medium / high / provider-supported level>
  - Stop limit: <time, tool calls, or steps>
- Verify with: <test, rubric, source comparison, or reviewer>
- Expand only if: <named failed check or unresolved uncertainty>
- Expansion: <more context, stronger model, higher effort, or human escalation>
```

Run the same representative task at two plausible routes. Record quality, latency, token/cost usage, and failure shape. Pick the cheaper route only when it passes the same acceptance bar. That small trial is the interactive exercise; a model leaderboard would age faster and teach less.

---

## Knob 1 — Effort settings

What it is: a per-call parameter that asks the model to invest more or less reasoning time. Anthropic describes effort as how eager Claude is to spend tokens, with supported named levels depending on the model. Other providers may expose a reasoning budget or thinking-token control. **Temperature is not an effort setting**: it changes sampling variability, not how much reasoning the task deserves. Treat effort as a behavioural signal rather than a guaranteed token ceiling.

**When to dial up effort.**

- **Hard reasoning tasks.** Multi-step proofs, edge-case design decisions, security-shaped reviews where missed nuance costs real money.
- **High-stakes one-shots.** A call you cannot easily re-run because the side effect is irreversible.
- **Eval calls.** A judging prompt (per B.9) deserves the most thought you can afford; the cost is amortised over many evaluations.

**When to dial down effort.**

- **Narrow, well-bounded tasks.** "Pick the right Blade primitive for this Figma element" does not need the highest effort setting.
- **High-frequency calls.** A skill invoked 1000 times a day pays the effort multiplier 1000 times. Keep it low unless the quality lift justifies it.
- **Calls that follow up on prior reasoning.** When the previous turn already spent the high-effort budget, the follow-up usually does not need to repeat it.

The trap: defaulting to highest effort because "more is better." More is more *expensive*; sometimes more is also better; sometimes it is the same. Measure (per B.9) before assuming.

---

## Knob 2 — Model routing

What it is: which model in the family handles this call. Anthropic's Claude family includes models tuned for different cost-quality points (Opus, Sonnet, Haiku, etc., with the exact model strings in the program's pinned configuration). Other providers have analogous tiers.

**When to route to a smaller / cheaper model.**

- **Narrow tasks with bounded outputs.** Classification, extraction, simple transformations. Smaller models often handle these as well as larger ones for a fraction of the cost.
- **High-frequency triage.** First-pass classification of incoming work; the second pass can use the larger model on the hard cases.
- **Simple tool calls.** A model picking among a small enum of tools rarely needs the full power of the largest model.

**When to route to a larger / more capable model.**

- **Open-ended reasoning.** Architectural decisions, multi-step debugging, ambiguous human input.
- **Tasks that span many sub-skills.** A workflow that combines coding + design + review benefits from a model that holds it all in one head.
- **Adversarial cases.** When prompt injection or output-classifier shapes are at stake, the larger model's safer behaviour is usually worth the cost.

**The routing layer.** LiteLLM (per [G.23](../../03-green/c-guardrails/G23-llm-proxy.md)) is the public open-source proxy that handles routing in the program's pinned setup. The rule: every call routes through the proxy; the proxy enforces policy on which model handles which call. A Black Belt builder authoring a custom agent (per B.4) routes through the proxy too — same path, same policy enforcement.

---

## Knob 3 — Fall-backs

What it is: what happens when the primary call fails. Three named failure modes:

**Rate-limited.** The provider declined the call because the volume is too high. Fall-back: retry after a backoff window. The proxy usually handles this transparently; a Black Belt builder confirms the retry policy is sensible (exponential backoff, capped retries, named upstream alert if it persists).

**Timeout.** The call took too long. Fall-back: usually retry once with a longer timeout, or fail fast and surface the issue. For interactive calls, fail fast — a 60-second wait is worse than a clear "try again" message. For batch calls, retry with backoff.

**Classifier-flagged.** The proxy's output classifier (per G.25) flagged the response. Fall-back: the proxy refuses or redacts; the calling code surfaces the refusal cleanly. Do not retry blindly; reword the prompt or escalate.

**The principle.** A fall-back path is a *named* path, not a "whatever happens, retry." The agent's failure modes should be understood at design time, with a clear plan for each. The G.21 hard-debugging discipline applies here too: a fall-back that hides the failure is worse than one that surfaces it.

---

## Worked example — tuning a "pre-ship-check" invocation

The pre-ship-check skill (v0.12) runs on every PR in some teams. Route one invocation with E3:

**Estimate.** The required evidence is bounded: redlines, design-system compliance, tests, PR craft, prompt-craft trace, and behaviour preservation. Layers 1–4 are mostly deterministic checks; Layers 5–6 require judgement. The failure cost is high enough that every layer must run, but not every layer needs the same model or effort.

**Execute.** Start Layers 1–4 with bounded context, a smaller model, and low or default effort. Route Layers 5–6 to a more capable model at medium effort because they need deeper reading. Cap retries and require each layer to return named evidence rather than a generic pass.

**Verify.** Run the routed version and the current single-route version against the same golden PR set. Compare missed findings, false positives, latency, and cost. Do not promote the routed version unless it meets the existing quality bar.

**Expand.** If a deterministic layer returns ambiguous evidence, rerun that layer with more context or the stronger route. Rate-limited: back off and retry within the cap. Timeout: fail with a clear "pre-ship-check did not complete; reviewer should run manually" message. Classifier-flagged: surface the flag; do not retry blindly.

The result is not a promised savings percentage. It is a measured route: cheaper only when the golden set proves quality held, and explicit about when to spend more.

---

## What this is not

**Not a magic multiplier.** The cheapest setting that meets the bar is the right setting; the cheapest setting that does *not* meet the bar is a regression. Per B.9, evaluate.

**Not a substitute for prompt quality.** A poorly-crafted prompt does not get rescued by higher effort; the prompt is the lever. Effort and routing are second-order.

**Not a way to bypass safety.** Routing to a smaller model does not weaken the redline reflex (per G.22), the proxy's scan (per G.23), or the output classifiers (per G.25). All three apply at every routing decision.

**Not free to change.** Effort and routing decisions are part of the skill's contract for cost-attribution purposes (per B.10). Changing them changes the cost rollups; document in the skill's CHANGELOG.

---

## Common failure modes

**Defaulting to highest effort everywhere.** Cost compounds; quality lift is often illusory. Fix: measure (per B.9); default to the cheapest setting that meets the bar.

**Routing decisions hardcoded in skill bodies.** Changing the model means editing every skill. Fix: route at the proxy layer; let policy live there.

**No fall-back path.** A skill that fails opaquely on rate-limiting blocks the team. Fix: name the fall-back paths at design time.

**Retry loops that hide failure.** A skill that retries silently for 10 minutes is worse than one that fails in 30 seconds. Fix: cap retries, surface the failure, log to the proxy's audit.

**Effort tuning without eval.** "We dialled up effort and it feels better" is the vibes-driven update B.9 forbids. Fix: A/B against the golden set.

**Expanding before evidence asks for it.** The agent reads the whole repo or jumps to the strongest route before trying the bounded path. Fix: name the initial scope, verification check, and expansion trigger on the routing card.

**Forgetting the cost cascade.** A skill that runs 1000x/day with a 2x effort multiplier is paying 1000x more than the team thinks. Fix: B.10's per-team rollup catches this; B.11 is what you do once you find it.

---

## GREEN / YELLOW / RED self-check

- 🟢 GREEN: I estimate the task's stakes and minimum evidence, execute the smallest credible route, expand only after a named verification failure, evaluate route changes against the golden set, and surface fall-back failures cleanly.
- 🟡 YELLOW — I understand the knobs but my skills default to the highest setting available without evaluation.
- 🔴 RED — I route by model reputation or habit; I have not defined an acceptance bar or an expansion trigger.

---

## What you can say after this module

> "I estimate the task, execute the minimum sufficient route, verify it, and expand only when evidence asks me to — while keeping fall-backs explicit and quality measured against the golden set."

---

## Where to go next

You have finished Black Belt Part B. Quest B-2 (*Component contribution or full-stack feature*) is the practical test of cross-layer ownership. Either submit a Blade component via the contribution pipeline or ship a full-stack feature you own end-to-end.

**Previous:** [← B.10 Cost + observability](B10-cost-and-observability.md) · **Next:** [→ Quest B-2](quest-B2-contribution-or-full-stack.md)

**Further reading**

- [Anthropic on effort settings](https://platform.claude.com/docs/en/build-with-claude/effort) — current parameter semantics and supported levels
- [Yin & Feng — *Do AI Agents Know When a Task Is Simple?*](https://arxiv.org/abs/2607.13034v1) — Estimate → Execute → Expand and minimum-sufficient execution
- [`#ai-help` task-shaped model-routing example (2026-07-15)](https://razorpay.slack.com/archives/C08C35GKJKD/p1784102296404509) — internal fast-lookup, planning, and implementation routes
- [LiteLLM docs](https://docs.litellm.ai/) — the public routing proxy
- [G.23 — The LLM proxy](../../03-green/c-guardrails/G23-llm-proxy.md)
- [B.10 — Cost + observability](B10-cost-and-observability.md) — the dashboards this module's tunings feed
