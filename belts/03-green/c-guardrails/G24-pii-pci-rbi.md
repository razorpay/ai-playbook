---
title: "PII, PCI, RBI — the regulators, the reasons, the reflexes"
slug: "belts/green/pii-pci-rbi"
section: "belts"
status: "drafted"
type: "chapter"
track: "green"
order: 24
time_minutes: 30
audience: "experienced-builder"
outcome: "Recognise data that falls under PII, PCI, or RBI scope; understand why each regulator cares; develop the reflexes that keep regulator-protected data out of AI-assisted work."
prev: "belts/green/llm-proxy"
next: "belts/green/prompt-injection"
pillar: "context"
belt: "green"
tags: ["green-belt", "compliance", "pii", "pci", "rbi", "regulators"]
updated: "2026-04-29"
---

# G.24 — PII, PCI, RBI

The redlines from G.22 are operational; this chapter is the *why*. Three named regulator surfaces shape Razorpay's data discipline: **PII** (personal data privacy law, broadly scoped), **PCI** (the payment card industry data security standard, narrowly scoped to card data), and **RBI** (the Reserve Bank of India, with overlapping but distinct rules for Indian financial-services data). A Green Belt builder knows what each one cares about, why, and what reflex it produces.

This chapter is not a substitute for the program's compliance training; it is the operational vocabulary so a builder can read a PR description, a CLAUDE.md, or a prompt and spot a regulator-shaped concern.

---

## If you're short on time

- **PII** is broadly scoped: any data that identifies a person. Names, emails, phone, IDs, addresses. Scope varies by region; the program's policy carries the canonical list.
- **PCI** is narrowly scoped: card data: primary account numbers (PANs), CVVs, expiry, magnetic stripe data. The reflex: card data does not transit our systems unredacted, ever.
- **RBI** is jurisdiction-scoped: rules specific to financial services in India. Overlaps with PII; adds rules around KYC, transaction reporting, and data localisation.
- The reflex is "if a regulator names this, treat it as a hard redline regardless of how convenient the workaround would be."

---

## The mental model

```
   ┌────────────────────────────────────────────────┐
   │              REGULATOR SURFACES                  │
   ├────────────────────────────────────────────────┤
   │                                                  │
   │   PII (broad)                                    │
   │   ├── what it is: anything that identifies a    │
   │   │   person                                     │
   │   ├── why: privacy law, customer trust,         │
   │   │   contractual                                │
   │   └── reflex: synthetic data in prompts; real   │
   │       lookups off-channel                        │
   │                                                  │
   │   PCI (narrow)                                   │
   │   ├── what it is: card data (PAN, CVV, expiry)  │
   │   ├── why: payment-industry standard; scope     │
   │   │   reduction is the architecture's job        │
   │   └── reflex: card data does not appear in       │
   │       prompts, logs, or anywhere outside the    │
   │       PCI-scoped path. Period.                   │
   │                                                  │
   │   RBI (jurisdiction)                             │
   │   ├── what it is: India-specific financial      │
   │   │   services rules, KYC, reporting,           │
   │   │   localisation                               │
   │   ├── why: Indian regulator; non-negotiable;    │
   │   │   data localisation is not optional         │
   │   └── reflex: anything KYC, transaction, or     │
   │       cross-border raises a regulator question  │
   │       that has to be answered before a prompt   │
   │       includes it                                │
   │                                                  │
   └────────────────────────────────────────────────┘
```

The three surfaces overlap. A KYC document includes PII; a card transaction includes PCI scope; a transaction in India includes RBI scope. The reflex is to treat the *most restrictive* applicable rule as the binding one. If a piece of data is in PCI scope, it does not matter how convenient the PII rule alone would be — PCI binds.

---

## PII — the broad surface

**What it is.** Any data that identifies a person, alone or in combination with other data. Names, emails, phone, postal address, government IDs (Aadhaar, PAN-as-tax-ID, passport), IP addresses in some interpretations, biometrics. The exact list depends on jurisdiction; the program's policy carries the canonical version.

**Why it matters.** Privacy law (varying by jurisdiction), customer trust (which is its own non-legal currency), contractual commitments to merchants and partners.

**The reflex.** Synthetic data in prompts; real lookups off-channel via approved connectors. When the work is "debug why customer X's report is wrong," the prompt names a synthetic customer; the agent fetches the real data via the approved connector if it needs to and never repeats it back into the prompt history.

**The trap.** Combining two innocent fields. A first name alone might not be PII; a first name plus a city plus an order date might be. The reflex is to default to redaction even when each individual field looks harmless.

---

## PCI — the narrow surface

**What it is.** Cardholder data: primary account numbers (PANs: what most people call "card numbers"), card verification values (CVVs), expiry dates, magnetic-stripe data, and a small set of related fields. The Payment Card Industry Data Security Standard (PCI DSS) is the named regulation.

**Why it matters.** Card data theft is a payment-industry foundational risk. The standard exists because the cost of breach is borne by everyone in the ecosystem, so the rules are non-negotiable for anyone who touches card data.

**The reflex.** **Card data never appears in prompts.** Not in debugging. Not in CLAUDE.md examples. Not in test fixtures. Not in screenshots. The architectural pattern is *scope reduction* — the codebase that handles card data is intentionally small and isolated; AI-assisted work happens *outside* that scope wherever possible.

If your work genuinely needs to touch the card-handling path, that work is reviewed differently and the redline is operationally enforced. For most Green Belt builders, the right answer is "I do not work in PCI scope; nothing I do involves card data."

**The trap.** A test fixture with a "fake" card number. Some patterns of "fake" PAN are real (test cards from card networks). If a fixture ships a real-shaped PAN, treat the fixture itself as in-scope. The program's approved fixtures are clearly labelled; do not invent your own.

---

## RBI — the jurisdiction surface

**What it is.** The Reserve Bank of India regulates financial services in India. Rules of interest to a Razorpay builder include: data localisation (certain payment data must reside in India), KYC standards (what counts as Know-Your-Customer evidence), transaction reporting, and cross-border movement constraints.

**Why it matters.** India is a primary jurisdiction for Razorpay; RBI rules are non-negotiable; non-compliance has real licensing consequences.

**The reflex.** When the work touches anything KYC, anything transaction-reporting-shaped, or anything cross-border, raise a regulator question *before* the prompt is sent. The right move is to confirm with the program lead whether the work is in RBI scope; if it is, the rules are stricter than the default.

**The trap.** Assuming "internal tools" are out of RBI scope. An internal tool that displays KYC data is still in scope; the regulator does not care about the front door. Fix: the data classification is what matters, not the surface that displays it.

---

## How the three interact

A real example. A merchant onboarding flow.

- The merchant's name, email, address: **PII**.
- The merchant's KYC documents (PAN card image, GST certificate): **PII + RBI scope**.
- The merchant's bank account number for settlement: **PII + RBI scope** (banking data).
- The first card the merchant uses to make a test transaction: **PCI scope**.
- The transaction itself, in India: **RBI scope**.

A builder writing a Green-Belt-grade feature on this flow needs to know where each surface starts and ends. The boss fight in Part C explicitly checks this — a product PR that touches a regulator-scoped surface gets a different reviewer treatment than one that does not.

---

## The reflex sequence

A Green Belt builder, before sending any prompt that might involve real-world data:

1. **Is there real-world data in this prompt?** If no, ship it. If yes, continue.
2. **What category does it fall in?** PII (broad)? PCI (card)? RBI (India financial-services)?
3. **Is the prompt the right place for this data?** Almost always: no. Synthetic / redacted / off-channel.
4. **If the prompt really needs the data, is the work in regulator scope?** If yes, the work is reviewed differently; consult the program lead off-channel before continuing.
5. **Does the proxy / pre-ship-check / output classifier catch this if I miss it?** Probably, but the reflex is the cheap front line and earns the builder's right to do this work at all.

The whole sequence takes ten seconds. A builder who does it consistently is the kind of builder a compliance team trusts. A builder who does it occasionally is the kind of builder a compliance team has to monitor.

---

## What about regions outside India?

Razorpay operates beyond India; other regulators apply. PCI is global. PII rules vary (GDPR in Europe, CCPA in California, others elsewhere). RBI is India-specific; other countries have their own central-bank or financial-services regulators.

The Green Belt builder's reflex is the same shape regardless of jurisdiction: treat regulator-scoped data as a hard redline, default to redaction, escalate when uncertain. The specifics live in the program's compliance training, not in this chapter.

---

## Common failure modes

**Treating PII as a soft rule.** "This name is harmless." Combined fields are PII; default to redaction. Fix: the reflex is "redact unless you can prove it is fine," not the other way around.

**Pasting card-shaped numbers in test prompts.** Even if the number is fake, the shape teaches bad habits and may overlap with real test PANs. Fix: never. Use clearly synthetic shapes (`4xxx-xxxx-xxxx-xxxx` literal placeholder) or, better, do not include card numbers at all.

**Assuming "internal" means "out of scope."** Internal tools that display KYC are RBI-scoped. Fix: data classification, not surface.

**Skipping the regulator question on cross-border work.** A transaction routed through a non-Indian system is still subject to RBI rules if it originated in India. Fix: cross-border == regulator question, every time.

**Working around the proxy when it flags a regulator-shaped prompt.** Same anti-pattern as G.23. Fix: report; do not reshape to evade.

**Forgetting that the reflex is everyone's job.** Compliance is not a separate team's responsibility. Fix: every Green Belt builder owns the reflex.

---

## GREEN / YELLOW / RED self-check

- 🟢 GREEN: I can name what falls under PII, PCI, and RBI scope; I run the reflex sequence on every prompt that might touch real-world data; I escalate cleanly when uncertain.
- 🟡 YELLOW — I understand the regulators in concept but my reflex is partial; I rely on the proxy as a backstop more than I should.
- 🔴 RED — I cannot tell which regulator surface a piece of data belongs to.

---

## What you can say after this module

> "I recognise data that falls under PII, PCI, or RBI scope, I redact regulator-protected data before it touches a prompt, and I escalate to the program lead when I am uncertain rather than guessing."

---

## Where to go next

G.25 (*Prompt injection + output classifiers*) covers the threat side of the same surface: what attackers do to *cause* regulator-protected data to leak, and what classifiers do to catch it.

**Previous:** [← G.23 The LLM proxy](G23-llm-proxy.md) · **Next:** [→ G.25 Prompt injection](G25-prompt-injection.md)

**Further reading**

- [Appendix H — Reference Cards](../../../appendices/H-reference-cards/README.md) — the canonical redline cards
- [PCI DSS overview](https://www.pcisecuritystandards.org/) — the public standard
- [RBI public circulars](https://www.rbi.org.in/) — the Indian regulator's public guidance
- [Prologue 0.11 — The safety brief](../../../prologue/11-safety-brief.md)
