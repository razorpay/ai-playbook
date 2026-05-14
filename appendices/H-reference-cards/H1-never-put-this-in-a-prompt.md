---
title: "Never put this in a prompt"
slug: "appendices/reference-cards/never-put-this-in-a-prompt"
section: "appendices"
status: "drafted"
type: "reference-card"
track: "reference-cards"
order: 1
time_minutes: 3
audience: "everyone"
outcome: "Use a one-page safety card to decide what must be redacted before prompting."
prev: "appendices/reference-cards"
next: null
pillar: null
belt: null
tags: ["appendix", "reference-card", "safety", "security"]
updated: "2026-04-27"
---

# H.1 — Never put this in a prompt

> **Printable card · Companion to [§0.11 — The safety brief](../../prologue/11-safety-brief.md).** Keep the shape. Strip the identity.

---

## The four redlines

| Never paste | Examples | Safer pattern |
|---|---|---|
| **Customer PII** | names, emails, phone numbers, account IDs, transaction IDs, addresses, PAN/Aadhaar fragments | Replace with placeholders: `customer@example.com`, `merchant_id=XXX`, `[TYPICAL RANGE]`. |
| **Credentials, tokens, keys** | API keys, OAuth tokens, `.env` values, database passwords, certificates | Use `<REDACTED>`. Re-run the approved setup flow instead of inspecting secrets in chat. |
| **Money-moving details** | payment API changes, balance logic, transfer rules, transaction-specific debugging | Use AI for shape and checklist. Keep real identifiers in approved systems. Require senior review. |
| **Internal confidential data** | strategy docs, financials, hiring/performance docs, legal drafts, incident details | Ask whether the surface is approved. Summarise abstractly until classification is clear. |

---

## The 10-second pause

Before you paste, ask:

1. Could this identify a customer, merchant, employee, partner, or transaction?
2. Could this grant access to a system?
3. Could this move money or change who can access money?
4. Would I be uncomfortable seeing this prompt forwarded?

If any answer is yes, redact first or ask in the approved support channel.

---

## Redaction examples

| Instead of | Prompt with |
|---|---|
| `merchant_id=ZAR123456` | `merchant_id=XXX` |
| `ravi@example.com` | `customer@example.com` |
| `pay_X9Y2A4B7C8` | `payment_id=PAYMENT_ID` |
| `amount=₹4,500 for Acme Corp` | `amount in a typical range for a merchant payment` |
| `sk_live_...` | `<REDACTED_API_KEY>` |

The AI usually needs the pattern, not the real value.

---

## Connector rule

Approved connectors can read within their permission scope. That is different from copying connector-read data somewhere else.

Use data in place. Do not exfiltrate it.

---

## If you already pasted something unsafe

Do not hide it. Stop, copy the prompt link or session reference if available, and alert the security or program support channel with the minimum necessary detail. Credentials should be rotated. Sensitive data exposure should be treated as an incident until the right owner says otherwise.

---

**Remember:** strip the identity, keep the shape.

**Up to:** [↑ Appendix H](README.md) · **Companion:** [§0.11 The safety brief](../../prologue/11-safety-brief.md)
