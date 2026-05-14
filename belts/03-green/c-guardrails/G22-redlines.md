---
title: "What never goes into a prompt — the Razorpay redlines"
slug: "belts/green/redlines"
section: "belts"
status: "drafted"
type: "chapter"
track: "green"
order: 22
time_minutes: 20
audience: "experienced-builder"
outcome: "Internalise the things that must never appear in a prompt — the redlines — and the reflexes that catch them before you hit Enter."
prev: "belts/green/c-guardrails"
next: "belts/green/llm-proxy"
pillar: "harness"
belt: "green"
tags: ["green-belt", "redlines", "voice-anchor", "guardrails", "safety"]
updated: "2026-04-29"
---

# G.22 — The redlines

Voice anchor for Part C. Where Parts A and B taught you what to *do*, Part C teaches you what to *never* do. The redlines are the small list of things that must never appear in a prompt sent to any model: production credentials, raw customer PII, payment instrument data, regulator-protected fields. Knowing the list is necessary; the skill is the *reflex* that catches a prompt before the redline gets pasted in.

---

## If you're short on time

- The canonical redline list lives in [Appendix H — Reference Cards](../../../appendices/H-reference-cards/README.md). This chapter teaches the *reflex*; the appendix carries the *cards*.
- The four categories that matter: credentials, money-handling code with live identifiers, raw customer PII, regulator-protected fields (PII / PCI / RBI scope).
- The skill is to notice *before* you press Enter. Every Razorpay builder should feel a small "wait" before pasting anything that looks like one of the four.

---

## The mental model

```
   ┌────────────────────────────────────────────────┐
   │              YOUR PROMPT                         │
   ├────────────────────────────────────────────────┤
   │                                                  │
   │   Before pressing Enter, scan for:              │
   │                                                  │
   │   1. CREDENTIALS                                 │
   │      tokens, API keys, secrets, .env values     │
   │                                                  │
   │   2. MONEY-HANDLING IDENTIFIERS                  │
   │      live transaction IDs, payment instrument   │
   │      data, anything that names a real charge    │
   │                                                  │
   │   3. RAW CUSTOMER PII                            │
   │      names, emails, phone, address, IDs         │
   │                                                  │
   │   4. REGULATOR-PROTECTED FIELDS                  │
   │      PCI scope (card numbers / CVVs), RBI       │
   │      scope (KYC docs), region-specific PII      │
   │                                                  │
   │   If any of the four appears, stop and route   │
   │   through the safe path (G.23 covers the proxy │
   │   layer; Appendix H names the cards).          │
   │                                                  │
   └────────────────────────────────────────────────┘
```

The redlines are not "things Claude will judge harshly." They are things that, if they leak via a prompt, become real legal, financial, and trust costs. The reflex is the cheapest defence; the proxy and the classifiers (G.23 / G.25) are the safety net.

---

## The four categories, with reasons

### 1. Credentials

Tokens, API keys, secrets, raw values from `.env` files, anything that grants access to a system. The reason is obvious; the failure mode is a builder who pastes "here's the auth call" with the actual token still in the snippet because they were debugging.

The reflex: every snippet you paste gets a five-second skim for `Bearer ...`, `key=...`, `password=`, or anything that *looks* like a long opaque string near a recognisable word.

### 2. Money-handling identifiers

A real transaction ID. A payment instrument identifier. The internal ledger reference for a specific charge. These are not technically "secrets" in the cryptographic sense, but they let an attacker who reads the prompt history correlate to real money flows. The reflex is to redact identifiers in any debugging session that involves real charges; use synthetic IDs in the prompt, look up the real one off-channel.

### 3. Raw customer PII

Names, emails, phone numbers, addresses, government IDs. The reflex is the same redaction pattern: synthetic data in the prompt; real lookup off-channel. If you are debugging "why is customer X's report wrong," the prompt should say "customer X" or "tenant_id ABC," not the customer's actual email.

### 4. Regulator-protected fields

The category that encompasses the others when a regulator is involved. PCI scope (card numbers, CVVs, anything that touches the card-data flow). RBI scope (KYC documents, financial-fraud signals, regulator-specific reports). Region-specific PII rules. The reflex is "if it has a compliance acronym attached, it does not go in a prompt under any circumstance." G.24 walks the regulators and the reasons.

---

## The reflex, named

A Green Belt builder before pressing Enter:

- glances at the prompt for the four shapes;
- if any shape matches, asks "do I need this in the prompt, or can I describe it?";
- if it really must be in the prompt, asks "is this a synthetic / anonymised version, or a real value?";
- if it is a real value, the prompt does not get sent. The builder finds another path.

The reflex takes three seconds. It is the cheapest piece of safety in the whole stack. A builder who has not internalised it will eventually paste something they should not. A builder who has internalised it does not.

---

## Where the reflex sits in the stack

The reflex is the *first* line of defence. The other lines:

- **The LLM proxy (G.23).** Every approved model call routes through a proxy that can scan, log, and gate. The proxy catches what the reflex misses.
- **Output classifiers (G.25).** Even if a prompt passes through, the output is scanned for shapes that should not have been generated in response to a given input.
- **The pre-ship-check skill (G.26).** Before a PR ships, the skill scans the diff for redline shapes that survived earlier layers.
- **Code review.** A human reviewer is the last line.

The reflex is the cheapest because it costs three seconds. Each subsequent layer costs more compute, more time, or more human attention. A builder who relies entirely on the later layers is making the program pay for laziness.

---

## Worked example

You are debugging a webhook handler. A real failed webhook landed in your inbox; you want to ask Claude to figure out why.

**The wrong prompt:**

> "Here's the failed webhook payload: `{ event: 'payment.failed', payment_id: 'pay_NHk4...real_id...', customer_email: 'real.customer@example.com', amount: 50000, ... }`. Why might this fail?"

**The redline reflex catches this.** The payment_id is a money-handling identifier; the customer_email is raw PII. Both should not appear.

**The right prompt:**

> "I have a `payment.failed` webhook payload with these structural fields: payment_id (string), customer_email (string), amount (integer in minor units), and a few others. The payload signature did not validate. What are the common causes for a payment.failed signature mismatch in our stack? Do not assume specific values; reason about the shape."

The agent gets exactly what it needs to be useful (the *shape* of the payload, the *symptom*) without any real values. The investigation proceeds; the redlines hold.

---

## What this chapter is not

**Not the canonical redline list.** Appendix H carries the cards. This chapter teaches the reflex; the cards are the data.

**Not a substitute for the proxy or the classifiers.** The reflex is the cheap front line. G.23 / G.25 / G.26 are the safety net behind it.

**Not a list of things to lawyer about.** The redlines are operational guidance. If you are unsure whether a specific field counts, default to "yes, do not paste it" and ask the program lead off-channel.

**Not optional.** Every Green Belt builder is expected to internalise the reflex. The Boss Fight in Part C explicitly checks that a builder's PR description and prompt history show no redline drift.

---

## Common failure modes

**Pasting a `.env` excerpt for "context."** The most common credential leak. Fix: describe the env var by name; never paste the value.

**Real customer email in a debugging prompt.** Same shape as above with PII. Fix: synthetic email; look up the real one off-channel.

**A real transaction ID in a "why did this fail" prompt.** Money-handling identifier leak. Fix: redact to a synthetic shape; if the agent really needs the real ID, the agent fetches it via an approved connector, not via paste.

**Trusting that "internal-only" tools do not leak.** Anything that goes into a prompt may end up in a log, a transcript, an audit, an export. Fix: treat all prompts as potentially logged; redact accordingly.

**Assuming the proxy will catch it.** It often will, but the cost is shifted: a flagged prompt becomes an audit trail you have to explain. Fix: catch it at the reflex layer.

**Claiming "I know my data is fine."** Confidence in the absence of a check is exactly the failure mode this chapter prevents. Fix: do the three-second scan every time, even when you are sure.

---

## GREEN / YELLOW / RED self-check

- 🟢 GREEN — I scan every prompt for the four redline categories before pressing Enter; the reflex is automatic; I have not pasted a redline this quarter.
- 🟡 YELLOW — I know the four categories but my reflex is not yet automatic; I sometimes catch myself mid-paste.
- 🔴 RED — I have not internalised the reflex; the proxy is my first line of defence and that is wrong.

---

## What you can say after this module

> "I never paste credentials, money-handling identifiers, raw customer PII, or regulator-protected fields into a prompt. The reflex catches it; the proxy is the safety net, not the front line."

---

## Where to go next

G.23 (*The LLM proxy*) covers the safety net behind the reflex. Knowing the proxy exists makes the reflex more reliable, not less; you are not alone, but you are also the first line.

**Previous:** [← Part C README](README.md) · **Next:** [→ G.23 The LLM proxy](G23-llm-proxy.md)

**Further reading**

- [Appendix H — Reference Cards](../../../appendices/H-reference-cards/README.md) — the canonical redline cards
- [Prologue 0.11 — The safety brief](../../../prologue/11-safety-brief.md) — the program-wide redline statement
