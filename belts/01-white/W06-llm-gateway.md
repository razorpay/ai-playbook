---
title: "The LLM Gateway"
slug: "belts/white/llm-gateway"
section: "belts"
status: "drafted"
type: "chapter"
track: "white"
order: 6
time_minutes: 15
audience: "new-builder"
outcome: "Understand what the model gateway does, what Vertex is responsible for, and what a White Belt reader does not need to debug."
prev: "belts/white/installing-the-stack"
next: "belts/white/compass-plugin"
pillar: "context"
belt: "white"
tags: ["white-belt", "llm-gateway", "vertex"]
updated: "2026-04-27"
---

# W.6 - The LLM Gateway

You do not need to understand model infrastructure to use Claude Code well. You do need to know that your prompt does not travel straight from your laptop to a mystery model. It moves through an approved path with auth, routing, logging, and policy around it.

This module is intentionally short. The goal is vocabulary, not infrastructure ownership.

---

## If you're short on time

- The gateway is the approved route between your local tool and the model.
- Vertex is part of the managed model path; you do not debug it like a local package.
- If the gateway path fails, capture the short error and route it. Do not try to bypass it.

---

## The mental model

```text
You
  -> Claude Code
  -> local config and plugin
  -> approved model gateway
  -> managed model provider path
  -> response back to Claude Code
```

The gateway exists so the organization can control access, routing, observability, and safety. That is good. Without it, every builder would invent their own model path, and the program would become impossible to support.

White Belt readers need to distinguish three failures:

| Failure | What it feels like |
|---|---|
| Local tool failure | Claude Code does not open or cannot read the folder. |
| Config/plugin failure | Claude Code opens but does not use the expected program path. |
| Gateway/model-path failure | Claude Code starts a request but receives auth, routing, quota, or policy errors. |

Only the first one is mostly local.

---

## Worked example

Ask Claude Code a harmless, local-only question:

```text
What directory are you running in? Do not read files yet.
```

Then ask a small reasoning question that does not require private context:

```text
In one paragraph, explain what a pull request is to a first-time builder.
```

If the first works and the second fails, the local tool may be alive while the model path is not. That is useful evidence.

If both fail, the issue may be local setup.

If both work, run the verification command and trust the result rather than continuing to poke at infrastructure.

---

## What you do not need to know yet

At White Belt, you do not need to know:

- how model routing is implemented;
- how quotas are assigned;
- how provider-specific auth works under the hood;
- how observability traces are stored;
- how fallback models are selected.

You will learn more of this later if your work requires it. For now, the gateway is part of the harness: use the approved path, verify it, and route failures cleanly.

---

## Common failure modes

**"Claude Code opens, but every prompt fails."** Likely gateway or model-path configuration. Capture the shortest error.

**"A teammate says a different model path is faster."** White Belt uses the program path. Do not optimize routing before you can ship the first PR.

**"The response says it cannot access something."** That may be correct. Models do not see every internal surface automatically. Give scoped, non-sensitive context.

**"I pasted too much context trying to help."** Stop and read the safety brief. More context is not automatically better context.

---

## GREEN / YELLOW / RED self-check

You are **GREEN** if:

- Claude Code can answer a small prompt;
- you can explain the difference between local tool failure and gateway failure;
- verification does not show model-path issues.

You are **YELLOW** if:

- local checks work but model calls fail;
- Claude Code appears to use the wrong configured path;
- you cannot tell whether the failure is local or remote.

You are **RED** if:

- you are considering an unapproved model route;
- auth errors persist after the official repair path;
- policy errors appear and you do not understand why.

---

## What you can say after this module

> "I know the model path is managed infrastructure, not something I should bypass locally."

---

**Previous:** [W.5 Installing the stack](W05-installing-the-stack.md) - **Next:** [W.7 Compass plugin](W07-compass-plugin.md)

