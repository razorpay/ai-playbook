---
title: "The safety brief"
slug: "prologue/safety-brief"
section: "prologue"
status: "drafted"
type: "chapter"
track: null
order: 11
time_minutes: 10
audience: "everyone"
outcome: "Memorise the redlines for prompts and know the reflex that keeps work safe."
prev: "prologue/self-assessment"
next: "prologue/whats-shipping"
pillar: null
belt: null
tags: ["security", "safety"]
updated: "2026-04-26"
---

# 0.11 — The safety brief (what never goes into a prompt)

> **⏱ 10 minutes · 👥 Everyone: yes, everyone · 🎯 Leaves with:** the redlines you cannot cross when working with AI in any Razorpay context, and the reflexes that keep you from tripping over them by accident.

---

## Why this chapter is non-negotiable

Razorpay handles money. Razorpay handles regulated data. Razorpay sits on top of compliance regimes that aren't symbolic — they exist because mishandled financial data hurts real people. *The safety brief in this chapter isn't optional even for casual readers of the playbook.* Skip every other chapter if you must, but read this one.

The good news: the rules are not numerous. Most of them are intuitive once named. The risk isn't from people who maliciously try to leak data — those are rare and handled by other systems. The risk is from people who *forget* in the middle of a productive flow, paste something they shouldn't into a prompt, and only realise an hour later. This chapter is about installing the reflex that catches the paste *before* it happens.

The other good news: most of what you do every day with AI is *fine*. The redlines are narrow; the safe space is wide. Once you know the lines, you stop worrying about them and just work.

---

## The four redlines

Read these. Memorise them. Internalise them so deeply that you'd notice if a teammate broke one.

### 1. Customer PII (personally identifiable information) never goes into a prompt

What counts: customer names, email addresses, phone numbers, account IDs, transaction IDs, addresses, dates of birth, IDs (PAN, Aadhaar fragments), any field that could identify or be tied back to an individual.

Why: Razorpay's compliance posture, the RBI's data-localisation rules, and basic customer trust all depend on this data being handled inside our systems, not pasted into AI surfaces — even ones we trust. The model provider may not be storing your prompts, but you can't audit that, and the compliance officer who'd have to defend the choice in a regulator audit cannot say *"we trust them not to."*

The reflex: when you're drafting a prompt that needs customer data, *redact first*. Replace `merchant_id=ZAR123456` with `merchant_id=XXX`. Replace `email=ravi@example.com` with `email=user@example.com`. The AI's reasoning rarely depends on the specific value; what it needs is the *shape*. Give it the shape, not the data.

### 2. Money-handling code/decisions/edits get an extra review

What counts: any code that calls payment APIs, any logic that touches transactions or balances, any change that could move money or change who has access to money. Frontend code that *displays* a balance is generally fine. Backend code that *computes* or *transfers* a balance is the danger zone.

Why: bugs in money-handling code cost real money and real customer trust. The cost asymmetry is severe — a bug in a settings page costs minutes of confusion; a bug in a transfer function can cost days of incident response and possibly customer reimbursement.

The reflex: when AI is helping you with code that touches money, the *PR review bar is higher*. A senior engineer reviews. A second pair of eyes verifies the test coverage is real. The pre-ship-check skill must pass with all six layers green. *No exceptions because the change "looks small."* Most money bugs land precisely because they looked small.

### 3. Credentials, tokens, and keys never go into a prompt

What counts: API keys, secret tokens, OAuth secrets, database passwords, signed certificates, anything that *grants access* to a system. This includes the contents of your `.env` file, the credentials section of your `~/.gcloud/`, anything that ends in `_SECRET` or `_TOKEN`.

Why: pasting a credential into a prompt logs that credential in the AI surface's history, possibly the model provider's logs, possibly your team's prompt-tracing system. Once a credential is in those places, it's compromised — the only safe response is to rotate it, which takes hours and may break things downstream.

The reflex: when AI suggests something that involves a credential, replace the credential with `<REDACTED>` before pasting. *Always.* If a teammate's prompt history shows a real credential, alert them and the security team — that's an incident, even if nothing exploited it.

A specific subcase: when configuring connectors (Slack, Google Workspace, etc.), *never paste the OAuth token into a chat to debug it*. The setup flows for these connectors handle tokens internally; if the connector needs reauthorisation, run the setup flow again, don't try to manually inspect the token.

### 4. Internal-only confidential data stays internal

What counts: financial data, strategy documents, hiring decisions, performance reviews, any document marked "internal" or "confidential." Also: contract drafts, legal correspondence, security incident details, any communication clearly meant for a specific named audience.

Why: even when the AI surface is "trusted," sharing internal-only data with it is a *cultural* breach as much as a technical one. Other teammates and partners contributed to those documents trusting that they'd circulate inside Razorpay; pasting them into an AI prompt may exfiltrate them in a way that's hard to undo.

The reflex: when in doubt about a document's classification, ask. Internal-only documents usually carry a banner; if the document doesn't have one but the contents *feel* sensitive, treat it as sensitive. *Default to caution.* The information cost of a paranoid moment is small; the cost of a leaked doc is large.

---

## The connector question

A specific case worth handling explicitly: connectors (Slack, Google Workspace, the ticketing tool, etc.) let AI surfaces *read* data from those systems. Doesn't that violate redline 1 (customer PII)?

The answer is nuanced and important.

Connectors are an *approved* path for AI to read data within their permission scope. They run inside Razorpay's auth boundary. They don't expose data outside what your account already has access to. Reading customer support tickets through the ticketing connector is *operationally equivalent* to you reading them yourself: same data, same access, just routed through an AI assistant.

What's *not* okay:

- *Copying* the connector-read data and pasting it elsewhere: into a public AI surface, into an external prompt, into a personal note that leaves the corporate boundary.
- *Repurposing* the data into something the original access didn't intend: using customer-support data to train a personal model, exporting tickets into a personal Drive, etc.

The simplification: *if a connector reads it, it's fine to discuss with the AI within that surface. If you're about to copy it elsewhere, that's where the redlines kick in.* Connectors are for in-place reading and acting; they're not for exfiltration.

---

## The "I'm not sure" rule

Most of the time you'll know whether a redline applies. Sometimes you won't. The rule for the in-between cases:

**Default to caution.** Don't paste. Don't share. Ask first.

The cost of being too cautious is a few minutes of "should I have done that" hesitation. The cost of being too cavalier is an incident, possibly a compliance violation, possibly a customer-trust event. *The asymmetry favours caution very strongly.*

Specifically, when you're not sure:

- Strip the sensitive bits before pasting and try the prompt with placeholders. If it works, great. If it doesn't, you've narrowed the question to *does this AI surface need the real data, and if so why?* — which is exactly the question worth asking.
- Ask in [`#claude-onboarding-support`](https://razorpay.slack.com/archives/C0ANCMTCJA2) (see [§0.6](06-people-and-pocs.md) for who reads it). Phrase it abstractly — *"can I share documents marked X with this AI surface?"* not *"here's the document."* You'll get an answer in minutes from someone who's hit the same question.
- If the question has any compliance flavour, escalate to the security or compliance team. They'd much rather answer one question now than handle one incident later.

The reflex you want is small but durable: when something feels off about pasting, *pause*. The pause is the entire safety system.

---

## What's NOT a redline (for completeness)

A few things that *feel* sensitive but actually aren't:

- **Code from public repos.** Razorpay maintains some open-source code (the Blade design system being the prime example). That code is public; you can paste it into any AI surface freely.
- **Documentation that's already on the public web.** Razorpay's developer docs, blog posts, public API references. Public is public. Use freely.
- **Your own work-in-progress code.** Your branch's code, before it's merged. This is fine to share with AI surfaces inside the approved harness (Claude Code via Vertex). It's *not* fine to paste into a public AI surface like Claude.ai or ChatGPT: see the redlines on credentials and internal data, plus the convention this playbook has been pushing throughout: ship via Claude Code, talk-about-code on Claude.ai.
- **Non-customer test data.** Synthetic data, test accounts, fake transactions. Fine to share. Real data anonymised to look-like-test-data is *not* fine — anonymisation often fails to actually remove identifiability.

The point of listing these is to keep the safety brief from becoming a general fear-of-AI brief. Most of what you do is fine. The redlines are narrow.

---

## A scenario to install the reflex

Imagine: you're debugging a payment flow. A specific transaction is misbehaving: a customer's payment isn't being credited, the transaction ID is `pay_X9Y2A4B7C8`, the merchant is *Acme Corp*, and the amount is ₹4,500. You want to ask the AI to help trace what happened.

What's the right prompt?

**Wrong:** *"For transaction pay_X9Y2A4B7C8, from merchant Acme Corp, for amount ₹4,500, the customer says they paid but it wasn't credited. Help me trace what could have gone wrong."*

This pastes the transaction ID, the merchant name, and the amount. Two of those three are PII-adjacent. The amount alone is fine; the *combination* with the merchant name uniquely identifies a specific real-world event.

**Right:** *"A transaction in our payments flow has not been credited despite a customer-side report of payment. The transaction is in [ENVIRONMENT], the merchant is on [TIER], the payment method was [METHOD], the amount is in the [TYPICAL RANGE]. Walk me through the most common reasons a payment is reported as paid but not credited, and the signals I should look for in our logs."*

The redacted version asks the *same question* and gets the *same answer*, without exposing the specific transaction. Then you take the answer back to your real logs and apply it.

This is the pattern. Strip the identity, keep the shape. The AI's reasoning works on the shape; your judgement works on the identity.

---

## What you should carry forward

- **Four redlines:** customer PII, money-handling, credentials/tokens/keys, internal-only confidential data. Memorise.
- **Strip first, then prompt.** The AI's reasoning rarely needs the specific values; it needs the shape.
- **Connectors are an approved path** for reading internal data; the redlines apply to *exfiltrating* that data elsewhere, not to using it in-place.
- **When in doubt, default to caution.** The cost of paranoia is small; the cost of an incident is large.
- **Most of what you do is fine.** The redlines are narrow. Don't let this chapter make you afraid to use AI; let it make you *unembarrassed* about asking before pasting.
- The next chapter ([§0.12 — What's shipping this week](12-whats-shipping.md)) closes the Prologue with the program's recent changelog — you'll know what's new before you start.

---

**Previous:** [← 0.10 Self-assessment](10-self-assessment.md) · **Next:** [→ 0.12 What's shipping this week](12-whats-shipping.md)

**Further reading**
- [RBI on data localisation](https://www.rbi.org.in/) — for the regulatory context behind redline 1
- [Anthropic on responsible deployment](https://www.anthropic.com/) — for the broader posture of safe AI use in regulated contexts
- [Appendix H — Reference cards](../appendices/H-reference-cards/) — the printable "never put this in a prompt" card, suitable for sticking on a monitor
