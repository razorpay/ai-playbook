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
updated: "2026-04-29"
---

# B.11 — Effort settings, model routing, fall-backs

The closing module of Part B. Where B.10 measured cost at scale, B.11 is the per-call lever that shapes the cost-quality trade-off. Three named knobs (effort settings, model routing, fall-backs) that a Black Belt builder tunes to match the work's stakes. The bar is "cheapest setting that meets the quality bar," not "highest setting available."

---

## If you're short on time

- **Effort settings** let you ask the model to spend more or less reasoning time on a single call. Higher effort costs more; sometimes pays off, sometimes does not.
- **Model routing** picks which model handles which call. Different models for different jobs; cost-quality differs across model families.
- **Fall-backs** define what happens when the primary path fails: rate limit, timeout, classifier flag. A clean fall-back beats a noisy retry loop.
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

## Knob 1 — Effort settings

What it is: a per-call parameter that asks the model to invest more or less reasoning time. The exact name varies by provider (Anthropic uses "effort levels" with named steps; other providers use temperature, max-thinking-tokens, or similar). The semantic shape is the same: more effort, more cost, sometimes more quality.

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

The pre-ship-check skill (v0.12) runs on every PR in some teams. Tuning the per-call layer:

**Effort.** The skill's six layers are bounded checks, not open-ended reasoning. Default effort is appropriate; high effort would cost more without producing better findings on most PRs. A specific layer (Layer 5 — prompt-craft trace) might benefit from higher effort because it requires nuanced reading of a session log; the SKILL.md could differentiate.

**Model.** The Layers 1–4 (redlines, design system, tests, PR craft) are pattern-matching shaped; a smaller model handles them well. Layer 5 (prompt-craft trace) and Layer 6 (behaviour preservation) benefit from a larger model because they need deeper reasoning. The skill's workflow could route per-layer if the cost difference is meaningful.

**Fall-backs.** Rate-limited: backoff and retry; the skill is not interactive. Timeout: fail fast with a clear "pre-ship-check did not complete; reviewer should run manually" message. Classifier-flagged: surface the flag in the report; do not redact silently.

The result: a skill that costs less per invocation than a default-everything setup, runs reliably under load, and fails cleanly when it fails. A team running pre-ship-check on every PR pays maybe 30–50% of what a naive setup would cost, with no quality drop.

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

**Forgetting the cost cascade.** A skill that runs 1000x/day with a 2x effort multiplier is paying 1000x more than the team thinks. Fix: B.10's per-team rollup catches this; B.11 is what you do once you find it.

---

## GREEN / YELLOW / RED self-check

- 🟢 GREEN: I tune per-call effort, model routing, and fall-back paths against the work's stakes; my skills evaluate effort changes against the golden set; my fall-backs surface failures cleanly.
- 🟡 YELLOW — I understand the knobs but my skills default to the highest setting available without evaluation.
- 🔴 RED — I do not tune per-call settings; my skills inherit whatever default the program-pinned plugin applies and I have not measured.

---

## What you can say after this module

> "I tune per-call effort, model routing, and fall-back paths to match the work's stakes: picking the cheapest setting that meets the quality bar, evaluating changes against the golden set, and naming the fall-back paths at design time."

---

## Where to go next

You have finished Black Belt Part B. Quest B-2 (*Component contribution or full-stack feature*) is the practical test of cross-layer ownership. Either submit a Blade component via the contribution pipeline or ship a full-stack feature you own end-to-end.

**Previous:** [← B.10 Cost + observability](B10-cost-and-observability.md) · **Next:** [→ Quest B-2](quest-B2-contribution-or-full-stack.md)

**Further reading**

- [Anthropic on effort settings](https://docs.claude.com/) — public reference
- [LiteLLM docs](https://docs.litellm.ai/) — the public routing proxy
- [G.23 — The LLM proxy](../../03-green/c-guardrails/G23-llm-proxy.md)
- [B.10 — Cost + observability](B10-cost-and-observability.md) — the dashboards this module's tunings feed
