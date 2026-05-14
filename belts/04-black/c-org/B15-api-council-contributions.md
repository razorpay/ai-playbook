---
title: "Contributing to the API Council (AI-specific reviews)"
slug: "belts/black/api-council-contributions"
section: "belts"
status: "drafted"
type: "chapter"
track: "black"
order: 15
time_minutes: 30
audience: "platform-builder"
outcome: "Contribute to API Council reviews on AI-specific submissions and apply API design discipline to MCP server interfaces, agent tool schemas, and public-facing AI surfaces."
prev: "belts/black/writing-an-ai-rfc"
next: "belts/black/plugin-and-skill-governance"
pillar: "governance"
belt: "black"
tags: ["black-belt", "api-council", "governance"]
updated: "2026-05-07"
---

# B.15 — Contributing to the API Council: AI-specific reviews

The API Council exists at Razorpay. It reviews API designs against a shared standard so that the surfaces consumers see (internal teams, partner integrations, third-party developers) are coherent. This module is the *AI-specific lens* on it: when the consumer of the API is an LLM, an MCP client, or an agent, the API design discipline does not bend. If anything, it bites *harder*, because the LLM consumer is less forgiving of inconsistency than a human one.

A Black Belt who has authored an MCP server (per B.1), shipped a custom agent (per B.4), or written a tool schema (per B.6) has built API surface. Contributing to the API Council on AI-specific submissions is the next move — bringing the platform-builder's perspective to API reviews, and submitting your own AI-facing surfaces to API Council scrutiny before shipping.

---

## If you're short on time

- The API Council reviews API designs against the official **API Design Guide** and historical Council feedback. AI-shaped surfaces (MCP servers, agent tools, public AI APIs) submit to the same process.
- API design discipline applies *more* to LLM consumers, not less: schemas, error contracts, naming, and idempotency all matter when the consumer cannot ask a clarifying question.
- The platform-builder's job at the API Council is **two-way**: submit your own AI surfaces for review, and contribute the AI-shaped lens when reviewing peers' submissions.

---

## Why this is a Black Belt module

The Razorpay API Design Guide is the source of truth for API quality. The `razorpay-api-review` skill (Compass) automates a large part of the rubric: REST principles, naming, error responses, data type compliance. A Green Belt who has used the skill has run their own design through it; a Black Belt building AI surfaces has more responsibility: their MCP servers, their agent tools, and their plugins-with-API-surfaces are *consumed by other teams' agents*, which means the design choices propagate.

When an LLM consumer hits an inconsistent API, the failure mode is silent: the model invents a plausible-looking output, the calling code believes it, and the bug surfaces three layers downstream. The fix lives at the API design layer; debugging from the symptom is expensive. The Council exists to catch these at design time. The Black Belt's job is to *bring AI-shaped submissions to the Council* and *bring AI-shaped scrutiny to peer submissions*.

---

## The mental model

```
   ┌─────────────────────────────────────────────────────┐
   │              ONE API COUNCIL REVIEW                   │
   ├─────────────────────────────────────────────────────┤
   │                                                       │
   │   AUTHOR submits a design doc with examples,         │
   │   error contracts, naming, idempotency, auth.        │
   │                                                       │
   │   REVIEWERS apply the API Design Guide rubric:       │
   │     - REST principles                                │
   │     - Naming conventions                             │
   │     - Error response shapes                          │
   │     - Data type compliance                           │
   │     - Integration examples                           │
   │                                                       │
   │   AI-SPECIFIC LAYER (this module):                   │
   │     - Does the schema work for LLM consumers?       │
   │     - Are errors actionable for non-human callers?  │
   │     - Are tool/function descriptions unambiguous?   │
   │     - Is the API resilient under retries?           │
   │                                                       │
   │   VERDICT: Red / Amber / Green; path to Green named. │
   │                                                       │
   └─────────────────────────────────────────────────────┘
```

The API Design Guide rubric runs first; the AI-specific lens runs *additionally*. Skipping the rubric in favour of "but the LLM seems fine" is a regression to the kind of API drift the Council exists to prevent.

---

## What changes when the consumer is an LLM

Five places where the AI-specific lens bites harder than the human-consumer lens.

**Schema clarity.** A human caller can read three integration examples and infer the intended use. An LLM caller is stuck with the JSON schema and the description fields. If the schema permits `quantity: int` but the API actually requires positive integers, the LLM will sometimes pass `-1` and the API will reject it with a generic error. Fix at design time: the schema constraints are the contract; describe them.

**Error contracts.** A human caller reads "Bad Request" and figures out what went wrong. An LLM caller needs the error response to *name the field that broke and how to fix it*. The Razorpay API Design Guide already requires structured error responses; for AI-facing APIs, the structured response is load-bearing.

**Naming consistency.** A human caller learns once that "client" and "customer" mean different things in the API. An LLM caller will switch between them mid-context if the API does not enforce one. Fix at design time: pick one term, use it everywhere, document that the other term is forbidden.

**Idempotency keys.** A human caller does not retry a `POST` reflexively; an LLM caller in a loop might. APIs that accept `POST` without idempotency keys will see duplicate effects from agent retries. Fix at design time: idempotency keys on every mutating endpoint that an agent will call.

**Tool descriptions.** For MCP servers and agent tools, the *tool description* is part of the API surface — it is what the LLM reads to decide whether to call the tool. A description that says "fetches data" is useless; one that says "fetches the customer's most recent five transactions, ordered descending by date, including refunded transactions" is a contract. The description's quality is a Council concern.

---

## How to submit an AI surface to the Council

Six steps a Black Belt walks for their own submissions.

**Step 1 — Run the `razorpay-api-review` skill on your draft design doc.** The skill automates a large part of the rubric; iterate to a Green-or-Amber score before bringing the design to humans.

**Step 2 — Apply the AI-specific lens above.** Walk the five points. Document explicitly how each is handled in your design: schema constraints, structured errors, naming, idempotency, tool descriptions.

**Step 3 — Pre-submit conversation with one Council member.** Same pattern as the pre-RFC conversation in B.14. The pre-conversation surfaces the obvious issues before the public review.

**Step 4 — Submit through the Council's normal process.** AI-facing submissions do not get a fast-lane; the same rubric applies.

**Step 5 — Walk the review.** Council reviews are async. Respond to substantive comments. The "won't fix" pattern from B.14 applies — naming a comment as not-addressed with a reason is valid.

**Step 6 — Land the verdict.** A Green verdict is what ships; an Amber verdict has a named path to Green; a Red verdict is a redesign. Time pressure to ship Amber-or-Red is the wrong move; the Council exists to prevent the API drift that lifts the cost of that pressure.

---

## How to contribute as a reviewer

Three behaviours a Black Belt brings to peer reviews.

**Bring the AI-specific lens.** When a peer's submission is consumed by AI, your job is to verify the five points above. Most submissions you review will *not* be AI-consumed; do not force the lens onto submissions where it does not apply. When it does apply, name it explicitly.

**Be specific.** "This naming feels off" is not a Council comment. "Endpoint naming uses both `client_id` and `customer_id`; the API Design Guide specifies one canonical term per concept; recommend `customer_id` per Section X of the guide" is.

**Cite the guide and the historical feedback.** The `razorpay-api-review` skill's rubric is the same shape Council reviewers should apply. Comments that cite the source make the review *converge*; comments that are personal opinion make it *thrash*.

---

## Worked example — a redacted submission walk

A representative shape. Names removed; numbers illustrative.

> **Submission.** A new MCP server exposing the team's internal billing data. Three tools: `get_invoice`, `list_invoices`, `summarise_invoices`.
>
> **Council review highlights.**
>
> - *Naming:* `get_invoice` and `list_invoices` are fine and consistent with the API Design Guide. `summarise_invoices` returns a *generated summary*, not the raw data; the name implies a different shape than what is returned. Recommendation: rename to `generate_invoice_summary` or split into `list_invoices` (raw) plus an explicit `generate_summary` action.
>
> - *Error contract:* the error responses are consistent with the API Design Guide. *AI-specific:* the `INVOICE_NOT_FOUND` error returns the invoice ID and the lookup parameters. Good.
>
> - *Schema clarity:* the `summarise_invoices` tool's description says "summarises invoices for the period." The period is a parameter but the description does not say what the summary covers. *AI-specific:* an LLM will guess the summary contents. Recommendation: rewrite the description to enumerate the summary's fields ("returns total amount, count of invoices, top three customers by spend, oldest unpaid invoice").
>
> - *Idempotency:* all three tools are read-only; no idempotency keys needed.
>
> - *Tool descriptions:* per above, `summarise_invoices` description needs work. The other two are clear.
>
> **Verdict.** Amber. Path to Green: rename `summarise_invoices`, rewrite its description to enumerate the summary fields.
>
> **Quick wins.** The two recommendations are ~1 hour of work; can be addressed in a v0.2 design and re-submitted.

The submission is genuinely good; the Amber verdict and the named path to Green is what makes the Council valuable.

---

## What this is not

**Not a fast lane for AI submissions.** AI-facing APIs do not get less scrutiny because the consumer is "just" an LLM. The opposite, often.

**Not a substitute for security review.** Security review is a separate concern; the Council reviews the *shape* of the API, not whether the API has been threat-modelled. Both happen.

**Not a justification for unstable schemas.** "We can iterate quickly because the consumer is an LLM" is the wrong move. LLMs have effective version-pinning at the prompt layer, but the API Council still reviews stability.

**Not a venue for re-litigating the Design Guide.** If you disagree with the Design Guide's rule, that is an RFC against the guide, not a Council comment on a peer's submission.

**Not optional for AI-facing surfaces.** A new MCP server intended for cross-team use without Council review is a divergence-shaped problem waiting to surface in office hours. Submit early.

---

## Common failure modes

**Skipping the `razorpay-api-review` skill before submitting.** Reviewers spend time on issues the skill would have caught; their time is better spent on the AI-specific lens. Fix: skill first, humans second.

**Treating AI-facing as a different lane.** "Our consumer is an agent so the rules are different" — they are not. Fix: same rubric, plus the AI-specific lens.

**Vague tool descriptions.** "Fetches data" descriptions slip through review because they look harmless to humans. Fix: descriptions enumerate fields and contracts.

**No idempotency on mutating tools.** Agent retries cause duplicate effects in production. Fix: idempotency keys at design time.

**Naming drift.** The submission uses two terms for the same concept. Fix: pick one; the API Design Guide names the canonical term.

**No structured error responses.** Errors come back as text. LLM consumers cannot recover. Fix: structured errors per the Design Guide.

**Reviewer comments without citations.** "This feels wrong" comments thrash the review. Fix: cite the guide section, or cite the historical Council feedback if the rule is from precedent.

**Time-pressure-shipped Amber.** "We'll fix this in a follow-up" — and the follow-up never lands. Fix: ship Green, or ship behind a flag and fix before the flag opens.

---

## GREEN / YELLOW / RED self-check

- 🟢 GREEN — I have submitted at least one AI-facing API surface to the Council and shipped at Green; I review peer submissions with the AI-specific lens; my comments cite the Design Guide.
- 🟡 YELLOW — I have submitted AI surfaces but at Amber; I review submissions but my comments are personal opinion rather than rubric-cited.
- 🔴 RED — I have shipped AI surfaces without Council review; or I review without applying the AI-specific lens to AI-consumed APIs.

---

## What you can say after this module

> "I bring AI-shaped submissions to the API Council and AI-shaped scrutiny to peer reviews; my MCP servers, agent tools, and plugin API surfaces ship at Green because the Design Guide bites *more* on LLM consumers, not less."

---

## Where to go next

The Council reviews the API at design time. After the API ships, the surface enters its lifecycle: adoption, maintenance, deprecation, security review. B.16 covers the lifecycle moves that close the governance loop.

**Previous:** [← B.14 Writing an AI RFC](B14-writing-an-ai-rfc.md) · **Next:** [→ B.16 Plugin + skill governance](B16-plugin-and-skill-governance.md)

**Further reading**

- [The `razorpay-api-review` skill](../../../skills/) — the rubric in skill form; cross-listed in Compass.
- [B.6 — Tool design](../a-platform/B06-tool-design.md) — the schema-and-error-contract foundations.
- [B.1 — Authoring an internal MCP server](../a-platform/B01-internal-mcp-server.md) — the most common AI-facing submission shape.
- [B.14 — Writing an AI RFC](B14-writing-an-ai-rfc.md) — the pre-API-Council move when the surface affects multiple teams.
