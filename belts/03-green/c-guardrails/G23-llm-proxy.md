---
title: "The LLM proxy — what LiteLLM does and why every call routes through it"
slug: "belts/green/llm-proxy"
section: "belts"
status: "drafted"
type: "chapter"
track: "green"
order: 23
time_minutes: 25
audience: "experienced-builder"
outcome: "Understand why every model call routes through a proxy, what LiteLLM gives you that direct calls do not, and how to debug when the proxy is the friction."
prev: "belts/green/redlines"
next: "belts/green/pii-pci-rbi"
pillar: "harness"
belt: "green"
tags: ["green-belt", "llm-proxy", "litellm", "harness"]
updated: "2026-07-07"
---

# G.23 — The LLM proxy

Every approved model call from a Razorpay program-pinned environment routes through an LLM proxy. The proxy is not a performance overhead; it is a safety, observability, and policy layer that makes the program defensible to security, compliance, and finance teams. This chapter is what every Green Belt builder should know about that layer: what LiteLLM does, what the proxy lets the program do that direct API calls cannot, and how to debug when the proxy itself is the friction.

> **Migration note.** Until March 2026, the proxy's upstream was Google Vertex AI. Today LiteLLM routes to the enabled provider for the selected model — Claude, GPT, or an approved open-weight route depending on the current rollout. The chapter's frame — scan, log, gate, attribute — is unchanged; only the provider hop changed.

---

## If you're short on time

- The proxy is the layer between Claude Code (or any client) and the model provider. Calls go: client → proxy → model.
- The proxy gives you four things you cannot get from a direct call: scanning (redlines), logging (audit), gating (policy), and cost attribution (G.20).
- Most of the time the proxy is invisible. When it is *not* invisible, the symptoms have a small set of named causes; this chapter walks them.

---

## The mental model

```
   ┌────────────────────────────────────────────────┐
   │                                                  │
   │   Claude Code  ─────┐                           │
   │   (or any client)    │                           │
   │                       ▼                           │
   │              ┌──────────────────┐               │
   │              │   LLM PROXY      │               │
   │              │   (LiteLLM)      │               │
   │              │                   │               │
   │              │ - redline scan   │               │
   │              │ - audit log      │               │
   │              │ - policy gate    │               │
   │              │ - cost attribute │               │
   │              │ - retry / route  │               │
   │              └──────────────────┘               │
   │                       │                           │
   │                       ▼                           │
   │              ┌──────────────────┐               │
   │              │ ENABLED PROVIDER │               │
   │              │ Claude/GPT/OSS   │               │
   │              └──────────────────┘               │
   │                                                  │
   └────────────────────────────────────────────────┘
```

Every link in the chain has a job:

- **Client → Proxy:** the place where the redline reflex from G.22 should have caught anything dangerous.
- **Proxy:** the program's safety net. Scans for redline shapes the reflex missed; logs the call for audit; enforces policy (rate, model, cost); attributes the call to the right team for billing.
- **Proxy → model host:** the egress to the actual provider. The model itself does not see the calling team's identity; the proxy holds that mapping.
- **Response back through the chain:** the response can be classified (G.25's output classifiers) before it reaches the client.

LiteLLM is the open-source proxy that Razorpay's program-pinned setup uses. The upstream is the enabled provider route for the selected model (post the March-2026 migration off Google Vertex AI); LiteLLM holds the provider credentials so individual builders never see them.

---

## The four jobs the proxy does

### Job 1 — Scanning

Every prompt is scanned for redline shapes (the four categories from G.22) before it is forwarded. A clean prompt passes through invisibly; a flagged prompt either gets blocked (with a clear error to the client) or gets routed to a human review queue depending on the policy and the severity.

The scan is not perfect. It catches the obvious shapes (a token-shaped string, a regulator-protected field name) and misses the cleverly-worded ones. The reflex from G.22 remains the front line; the scan is the safety net.

### Job 2 — Logging

Every call gets an entry: timestamp, calling team or builder (via the tag from G.20), prompt token count, response token count, model, latency, success or failure. This audit log is what lets the program answer "did anyone send PII to a model" and "which team is using the most tokens" and "is the model behaving consistently across teams."

The log does not store full prompt content by default — that would be its own redline risk. It stores enough metadata to investigate, with the option to escalate to full-prompt review if a redline scan flags a call.

### Job 3 — Gating

Policy enforcement: rate limits per team or per builder; allowed-model list; cost ceilings; time-of-day rules if any. A call that violates policy gets refused at the proxy, not at the model. This is cheaper and faster than the model refusing, and it produces a single audit trail.

### Job 4 — Cost attribution

Per-team and per-builder rollups. The cost dashboard from G.20 reads from the proxy's log. Without the proxy, cost attribution would require every team to instrument every model call themselves; the proxy does it once, centrally.

---

## Why direct model calls are not approved

A builder might wonder: "I have a provider API key; why do I need to route through a proxy?" The answer is that a direct call:

- bypasses the redline scan;
- does not generate the audit log;
- does not respect policy gates;
- does not roll up into cost attribution;
- and ties the API key to a personal identity that is hard to revoke cleanly.

A program that allows direct calls cannot honestly tell its security or compliance counterparts "we know what model traffic looks like." The proxy is the artefact that lets the program make that claim.

For Green Belt builders specifically: direct API keys are a redline of their own. If you have one for a personal project, that is fine; you do not use it for Razorpay work.

---

## How the proxy looks from Claude Code

Most of the time, invisible. You install Claude Code, the program-pinned plugin configures the client to route through the proxy automatically, and you never think about it again. Three signs the proxy is doing its job:

- a prompt with a redline shape gets refused with a clear error;
- the cost dashboard from G.20 has data when you check it;
- a session you started today shows up in the audit log when an investigation happens.

Three signs the proxy is the friction:

- a clean prompt is being refused (you suspect the scan has a false positive);
- latency is high (the proxy itself or the proxy-to-provider hop has a problem);
- the model output looks weird (an output classifier may have rewritten or filtered).

The next section is what to do when the proxy is the friction.

---

## Debugging when the proxy is the friction

### Symptom: clean prompt refused

A prompt you believe is clean comes back with a "policy refused" or "redline flag" error. Two habits.

**Habit 1.** Read the proxy's error message before assuming the proxy is wrong. The error usually names the rule. "Looks like a token-shaped string in line 12" is a real signal even if the string is harmless; rephrase or redact the harmless-but-suspicious part.

**Habit 2.** If the rule is a known false-positive, route the question via [`#ai-help`](https://razorpay.slack.com/archives/C08C35GKJKD). The proxy's policy is tunable; legitimate false positives get fixed centrally. Do not work around them by reshaping the prompt to evade the scan; that defeats the purpose.

### Symptom: latency

A response that used to take two seconds now takes thirty. Two layers to check.

**Layer 1.** The proxy itself. The proxy is generally fast (single-digit ms overhead); a sustained slowness usually means the proxy is rate-limiting or queuing.

**Layer 2.** The model-provider hop. Regional latency and provider queues vary by enabled route. A slowdown is usually transient; if it persists, the program lead has the dashboards.

The right move on a transient slowdown: wait, retry. The right move on a sustained slowdown: report via [`#ai-help`](https://razorpay.slack.com/archives/C08C35GKJKD); do not switch off the proxy.

### Symptom: weird output

The response includes "[redacted]" or has fields missing or refuses to discuss something benign. The output classifier (G.25) has flagged the response. Two paths.

**Path 1.** If the redaction is obviously correct (the prompt asked for something the response should not have included), the classifier did its job. Reword the prompt.

**Path 2.** If the redaction is a false positive, escalate via [`#ai-help`](https://razorpay.slack.com/archives/C08C35GKJKD). Same as the prompt-side false positives: tunable, fixable, do not work around.

---

## What the proxy does NOT do

- **Replace the redline reflex.** The reflex is cheaper, faster, and the front line. The proxy is the safety net.
- **Replace human review.** The proxy catches shapes; it does not catch all judgement. PR review (G.26) and security review (G.28) catch the rest.
- **Allow the program to be careless.** "The proxy will catch it" is not a substitute for thinking. Builders who lean on the proxy as a substitute for thought get their patterns flagged in calibration retros.
- **Slow you down meaningfully.** Single-digit ms overhead in normal operation; the perceived slowness is usually elsewhere in the chain.

---

## Common failure modes

**Trying to bypass the proxy.** Direct API keys, side-channel calls. Fix: the program does not approve these; direct calls are a redline of their own.

**Treating proxy errors as bugs.** A "redline flag" error is the proxy doing its job. Fix: read the error; usually the rule is correct.

**Working around a false positive instead of escalating.** Reshaping a prompt to evade the scan defeats the proxy's purpose. Fix: report; let the program tune the policy.

**Routing personal-project calls through the program proxy.** The proxy is for program work. Personal projects use your own provider account. Fix: keep the two cleanly separated.

**Assuming the proxy logs everything.** It logs metadata, not full prompt content (that would be a redline of its own). Investigations can request full-prompt review on flagged calls; do not assume default logging captures everything.

**Forgetting the proxy when debugging cost.** A spike in cost is usually a signal about the calling code, not the proxy. Fix: G.20's cost dashboard reads the proxy's data; start there.

---

## GREEN / YELLOW / RED self-check

- 🟢 GREEN: I know what the proxy does (scan, log, gate, attribute), I trust it, I report false positives instead of working around them, and I never use direct model APIs for program work.
- 🟡 YELLOW — I understand the proxy at a high level but I have worked around a flag at least once.
- 🔴 RED — I do not know what the proxy is doing or why; I treat it as overhead.

---

## What you can say after this module

> "Every program model call routes through the LLM proxy. I know the four jobs the proxy does (scan, log, gate, attribute) and I trust it as the safety net behind the redline reflex."

---

## Where to go next

G.24 (*PII / PCI / RBI*) names the regulators behind the redlines. The proxy enforces; the regulator is *why*.

**Previous:** [← G.22 The redlines](G22-redlines.md) · **Next:** [→ G.24 PII / PCI / RBI](G24-pii-pci-rbi.md)

**Further reading**

- [LiteLLM docs](https://docs.litellm.ai/) — the open-source proxy
- [W.6 — The LLM Gateway](../../01-white/W06-llm-gateway.md) — the Day-1 source of truth for enabled-provider routing
- [G.20 — Observability with AI](../b-practices/G20-observability-with-ai.md) — the cost dashboard reads proxy data
