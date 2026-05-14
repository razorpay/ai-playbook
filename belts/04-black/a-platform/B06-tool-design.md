---
title: "Tool design — JSON schemas, output shapes, error contracts"
slug: "belts/black/tool-design"
section: "belts"
status: "drafted"
type: "chapter"
track: "black"
order: 6
time_minutes: 30
audience: "platform-builder"
outcome: "Design tool contracts — input schemas, output shapes, error shapes — that compose, scale, and survive version changes without breaking the agents that depend on them."
prev: "belts/black/multi-agent-orchestration"
next: "belts/black/quest-publish-an-internal-plugin"
pillar: "harness"
belt: "black"
tags: ["black-belt", "tool-design", "json-schema", "contracts"]
updated: "2026-04-29"
---

# B.6 — Tool design

Every tool an agent calls has a contract: how the input is shaped, how the output is shaped, how errors are shaped. B.1 named the layer; this module is the design discipline. Tool contracts are the smallest unit of platform infrastructure a Black Belt builder ships, and they are the easiest one to get wrong.

---

## If you're short on time

- A tool's contract is three things: input schema, output shape, error shape. All three are typed; none is free-form.
- Outputs are objects, not strings. Errors are typed, not text.
- Schemas evolve with semantic versioning. Adding fields is safe; renaming fields is breaking.

---

## The mental model

```
   ┌────────────────────────────────────────────────┐
   │              TOOL CONTRACT                       │
   ├────────────────────────────────────────────────┤
   │                                                  │
   │   1. INPUT SCHEMA (JSON Schema)                 │
   │      Required parameters, optional parameters, │
   │      types, enums, defaults.                    │
   │                                                  │
   │   2. OUTPUT SHAPE (typed object)                │
   │      Named fields, types, units. Never a       │
   │      free-form string.                          │
   │                                                  │
   │   3. ERROR SHAPE (typed object)                 │
   │      A small set of named error types, each   │
   │      with a meaningful message and (optional)  │
   │      a remediation hint.                        │
   │                                                  │
   │   4. SIDE EFFECTS (documented)                  │
   │      What writes, what doesn't. Idempotency.   │
   │                                                  │
   │   5. VERSIONING                                  │
   │      Backward-compatible additions vs breaking │
   │      renames; semantic versioning at the       │
   │      server level (per B.1).                    │
   │                                                  │
   └────────────────────────────────────────────────┘
```

Each layer composes with the others. A perfect input schema with a free-form output makes the agent re-parse on every call. A perfect output shape with untyped errors leaves the agent unable to react to failure.

---

## Layer 1 — Input schemas

JSON Schema is the canonical shape Anthropic's tool-calling format uses. A tool's input declaration names parameters, types, requireds, optionals, and constraints (enums, ranges, lengths).

**Three rules.**

1. **Required parameters are required.** A parameter that is "usually needed" is wrong; either it is required or it has a default. Hedging produces unreliable tool calls.
2. **Enumerate where you can.** A `status` parameter with an enum of `["open", "closed", "draft"]` lets the agent fail at the input layer if it tries `"in-progress"`. A free-string `status` lets it succeed and then return wrong data.
3. **Defaults are explicit.** A parameter with a default behaves like an optional but the agent should know the default. Document it in the description.

The trap: free-form `query` strings. They look flexible; they invite drift; consumers cannot cache against them. If the tool is a search, name the searchable fields; if it is a query language, document the grammar.

---

## Layer 2 — Output shapes

A tool that returns a string forces every consumer to parse. A tool that returns a structured object: `{ tickets: [{id, title, status, ...}, ...] }` — composes.

**Three rules.**

1. **Always return an object, never a bare string or array.** An object lets you add fields later without breaking consumers. A bare list cannot grow.
2. **Name units.** A `latency` field that returns a number is ambiguous; `latency_ms` is clear. A `cost` field is ambiguous; `cost_usd` or `cost_inr_paise` is clear. The unit lives in the field name when there is any chance of confusion.
3. **Pagination is part of the shape.** A list endpoint returns `{ items: [...], next_cursor: <opaque>, total_count: <int> }`, not just `{ items: [...] }`. Pagination is structural; agents cannot iterate without it.

A useful test: two consumers reading the output shape should agree on what every field means without having to read the implementation. If they disagree on units or shape, the contract is too loose.

---

## Layer 3 — Error shapes

The most-skipped layer. A tool that returns "an error occurred" gives the agent nothing to reason against. The agent's only choice is to retry blindly or surface the failure to the user.

**A typed error shape:**

```json
{
  "error": {
    "type": "unauthorised | not_found | rate_limited | invalid_input | upstream_error",
    "message": "<human-readable, one sentence>",
    "remediation": "<optional, one-sentence hint>",
    "request_id": "<for audit>"
  }
}
```

Five rules.

1. **A small set of typed errors.** Five to ten named types. Not "anything goes."
2. **`unauthorised` is different from `not_found`.** Conflating them tells the agent to retry when it should escalate, or to escalate when it should retry.
3. **`rate_limited` includes a retry hint.** When can the agent try again? Without the hint, the agent guesses.
4. **`invalid_input` is the input-schema layer's failure mode.** The agent reads the message, fixes the input, retries.
5. **`upstream_error` is the catch-all for failures the tool's owning service produced.** The agent surfaces; it does not retry blindly.

The agent reasons about typed errors. It cannot reason about strings.

---

## Layer 4 — Side effects and idempotency

A tool's contract should name its side effects clearly:

- **Read-only:** the tool does not mutate state. Calling twice returns the same result. Safe for retry.
- **Mutating, idempotent:** the tool mutates state, but calling twice with the same input produces the same final state. Safe for retry; common for "set" operations (`set_status_to_done`).
- **Mutating, non-idempotent:** the tool mutates state and calling twice doubles the effect. Not safe for retry; common for "create" operations (`create_ticket`).

The agent reads the side-effect documentation and decides retry behaviour accordingly. Tools whose side-effect behaviour is undocumented are tools the agent cannot use safely.

A pattern that helps: an `idempotency_key` parameter on non-idempotent tools. The caller supplies a unique key; the tool deduplicates.

---

## Layer 5 — Versioning

Tool contracts evolve. Semantic versioning at the server level (per B.1) is the discipline; here are the per-field rules:

- **Adding an optional field to inputs:** safe. Existing callers do not pass it; new callers do.
- **Adding a required field to inputs:** breaking. Existing callers fail at the input layer. Deprecate the old shape; bump major version.
- **Adding a field to outputs:** safe. Existing parsers ignore unknown fields. Document the new field in the changelog.
- **Renaming or removing an output field:** breaking. Bump major version; ship a deprecation cycle.
- **Adding a new error type:** safe if the consumer has a default branch in its error handling; breaking if the consumer has an exhaustive switch. Document; assume the latter.
- **Changing units (e.g. `latency_ms` → `latency_seconds`):** always breaking. Even if the field name stays. Add a new field; deprecate the old.

A useful habit: every tool contract has a CHANGELOG. The changelog is what the consumer reads at upgrade time.

---

## Worked sketch — a `tickets.list_open` tool

A real tool from B.1's `team-tickets` server, designed end-to-end:

**Input schema:**

```json
{
  "type": "object",
  "properties": {
    "filter": {
      "type": "object",
      "properties": {
        "owner": { "type": "string", "description": "Team handle" },
        "status": {
          "type": "string",
          "enum": ["open", "in_review", "blocked"]
        },
        "age_days_min": { "type": "integer", "minimum": 0 },
        "age_days_max": { "type": "integer", "maximum": 365 }
      }
    },
    "limit": {
      "type": "integer",
      "minimum": 1,
      "maximum": 200,
      "default": 50
    },
    "cursor": { "type": "string", "description": "Opaque cursor from previous call" }
  },
  "required": ["filter"]
}
```

**Output shape:**

```json
{
  "tickets": [
    {
      "id": "TKT-1234",
      "title": "Dashboard chart legend overlap on mobile",
      "status": "open",
      "owner": "team-foo",
      "age_days": 12,
      "url": "<canonical ticket URL>"
    }
  ],
  "next_cursor": "<opaque or null>",
  "total_count": 47
}
```

**Error shapes:**

```json
{ "error": { "type": "unauthorised", "message": "Caller does not have read access to team-foo tickets.", "request_id": "req_..." } }
{ "error": { "type": "invalid_input", "message": "age_days_min must be less than age_days_max.", "remediation": "Swap the two values.", "request_id": "req_..." } }
{ "error": { "type": "rate_limited", "message": "Too many calls to this tool in the last minute.", "remediation": "Retry in 30 seconds.", "request_id": "req_..." } }
```

**Side effects.** Read-only. Idempotent. Safe for retry on rate-limited responses.

**Versioning.** v1.x. Adding a new optional `priority` filter would be v1.y; renaming `age_days` to `age_in_days` would be v2.0 with a deprecation cycle.

A consumer reading this contract can write a useful agent invocation in five minutes. That is the bar.

---

## Common failure modes

**Free-form `query` strings.** Agents drift; consumers cache against them poorly. Fix: name the searchable fields; document the grammar if a query language is necessary.

**Bare-array outputs.** Cannot grow. Fix: wrap in an object with `items`, `cursor`, `total_count`.

**Untyped errors.** Agent cannot reason. Fix: a named error type set; consistent shape; one-line messages.

**Undocumented side effects.** Retry behaviour ambiguous. Fix: read-only / idempotent-mutating / non-idempotent-mutating, named.

**Breaking changes without major-version bumps.** Consumers surprised. Fix: SemVer at the server level (B.1) and the per-field rules from §"Layer 5".

**Mixing units silently.** `cost` is ambiguous; `cost_inr_paise` is not. Fix: name units in the field.

**No CHANGELOG.** Consumers cannot upgrade safely. Fix: every tool's owning server has one; every contract change lands with an entry.

---

## GREEN / YELLOW / RED self-check

- 🟢 GREEN: I design tool contracts with typed input schemas, structured output shapes, named error types, documented side effects, and SemVer-disciplined evolution. My tools' consumers can write a useful invocation in five minutes from the contract alone.
- 🟡 YELLOW: I understand the layers but my tools have at least one anti-pattern (free-form query, bare-array output, or untyped errors).
- 🔴 RED — I have shipped tools whose contracts consumers cannot read without reading the implementation.

---

## What you can say after this module

> "I design tool contracts (input schemas, output shapes, error shapes, side effects, versioning) that compose with the multi-agent patterns from B.5 and survive evolution without breaking consumers."

---

## Where to go next

You have finished Black Belt Part A. Quest B-1 (*Publish an internal plugin*) is the practical test of B.1 through B.6 together. Pick a workflow your team owns; bundle a skill pack ± an MCP server; publish; get two PODs outside your team to install.

**Previous:** [← B.5 Multi-agent orchestration](B05-multi-agent-orchestration.md) · **Next:** [→ Quest B-1](quest-B1-publish-an-internal-plugin.md)

**Further reading**

- [JSON Schema](https://json-schema.org/)
- [Anthropic on tool use](https://docs.claude.com/en/docs/build-with-claude/tool-use/overview)
- [G.7 — Writing your first SKILL.md](../../03-green/a-craft/G07-writing-your-first-skill.md) — output-shape discipline at the skill level
