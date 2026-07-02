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
outcome: "Understand what the LiteLLM gateway does, what Claude Code does, and which failures are yours to debug vs. the gateway's."
prev: "belts/white/installing-the-stack"
next: "belts/white/compass-plugin"
pillar: "context"
belt: "white"
tags: ["white-belt", "llm-gateway", "litellm"]
updated: "2026-07-02"
---

# W.6 - The LLM Gateway

You do not need to understand model infrastructure to use Claude Code well. You do need to know that your prompt does not travel straight from your laptop to a mystery model. It moves through Razorpay's LLM gateway — with auth, routing, logging, and policy around it.

This module is intentionally short. The goal is vocabulary and a quick way to triage, not infrastructure ownership.

---

## If you're short on time

- The gateway is `https://llm-gateway.razorpay.com`. It runs **LiteLLM**, an open-source model proxy.
- Every Claude Code request from your laptop goes through it. The gateway authenticates your personal key, applies the current model-family limits, routes to the enabled model, and records the usage.
- The setup script in [W.5](W05-installing-the-stack.md) writes everything you need into `~/.claude/settings.json`. You should not hand-edit it.
- If a gateway call fails, capture the short error and route it. Do not try to bypass it.

---

## The mental model

```text
You
  -> Claude Code
  -> ~/.claude/settings.json (LiteLLM key + model defaults)
  -> Compass plugin (skills, hooks, MCPs)
  -> https://llm-gateway.razorpay.com  ← Razorpay's LiteLLM gateway
  -> enabled model provider (Claude, GPT, or approved OSS)
  -> response back to Claude Code
```

The gateway exists so the organisation can control access, routing, observability, and safety. Three concrete things it does:

1. **Auth.** Every request carries your personal LiteLLM key as a Bearer token. The key is minted by the setup script and rotated on demand.
2. **Routing.** You ask for an enabled model such as `claude-sonnet-4-6`; the gateway picks the right provider route and forwards. The approved model list can include Claude, GPT, or OSS models depending on the current rollout.
3. **Observability and limits.** Every request lands in the LiteLLM dashboard with cost, latency, token count, and budget usage. That dashboard is the source of truth when claude.ai or Claude Desktop shows a different remaining balance.

Without it, every builder would invent their own model path, and the program would become impossible to support.

---

## What you control vs. what the gateway controls

White Belt readers need to distinguish three failure shapes:

| Failure | What it feels like | Owned by |
|---|---|---|
| Local tool failure | Claude Code does not open, or cannot read the folder. | You (Layers 1–2) |
| Config / plugin failure | Claude Code opens but uses the wrong model or no skills. | You (Layers 4–5) |
| Gateway / model-path failure | A prompt errors with `401`, `403`, `429`, or a network timeout. | The gateway, sometimes your shell environment |

Only the first one is fully local. The third one is usually a setup mismatch you can fix in two minutes (see W.5 failure modes) — but if you've followed the W.5 flow cleanly and still hit them, route it to [`#ai-help`](https://razorpay.slack.com/archives/C08C35GKJKD).

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

- **Both work** → harness and gateway are alive. Trust the verification skill and move on.
- **First works, second fails** → the harness is alive but the gateway request failed. Read the short error: it will be `401` (key issue), `403` (stale Vertex env vars from the old setup), `429` (quota), or a timeout. See [W.5 common failure modes](W05-installing-the-stack.md#common-failure-modes).
- **Both fail** → likely local setup. Re-verify W.5.

---

## What you do not need to know yet

At White Belt, you do not need to know:

- How LiteLLM is deployed inside Razorpay.
- How quotas are calculated per builder or per model family.
- How model fallback rules are configured.
- How observability traces are stored or who reads them.

You will learn more of this later if your work requires it (see [G.23 — The LLM proxy](../03-green/c-guardrails/G23-llm-proxy.md) in Green Belt). For now, the gateway is part of the harness: use the approved path, verify it, and route failures cleanly.

---

## Common failure modes

The detailed failure modes are in [W.5](W05-installing-the-stack.md#common-failure-modes). The short version of the gateway-related ones:

**`401 authentication_error`.** Your LiteLLM key rotated or expired. Re-run the setup script; it re-mints the key into `~/.claude/settings.json`.

**`403 PERMISSION_DENIED` referencing `aiplatform.googleapis.com`.** Stale Vertex env vars in your shell rc from the pre-March-2026 setup. Remove `ANTHROPIC_VERTEX_PROJECT_ID`, `CLAUDE_CODE_USE_VERTEX`, and `CLOUD_ML_REGION` from `~/.bashrc` / `~/.zshrc`, restart your terminal.

**`exceeded budget for model=claude-opus-4-6` or `claude-opus-4-7`.** Those Opus defaults are retired. Enable `claude-opus-4-8` on your LiteLLM key, then run `/model claude-opus-4-8` inside Claude Code or set `"ANTHROPIC_DEFAULT_OPUS_MODEL": "claude-opus-4-8"` in `~/.claude/settings.json`. Use Sonnet or enabled OSS models for routine work when Opus 4.8 is capped.

**`ExceededBudget` or model-wise limit errors.** Trust LiteLLM over the Claude Desktop usage display. Check the LiteLLM usage page, then follow [W.5 failure mode #6](W05-installing-the-stack.md#common-failure-modes): move routine work to an enabled fallback when only a model family is capped, and route true business blockers through `#ai-help` with manager approval visible.

**"My usage isn't showing in the dashboard."** Shell env vars `ANTHROPIC_BASE_URL` or `ANTHROPIC_API_KEY` overriding what `~/.claude/settings.json` sets. `unset` them, then remove from your shell rc.

**"A teammate says a different model path is faster."** White Belt uses the program path. Do not optimise routing before you can ship the first PR.

---

## GREEN / YELLOW / RED self-check

You are **GREEN** if:

- Claude Code answers a small prompt;
- you can explain the difference between local tool failure and gateway failure;
- your usage shows up in the LiteLLM dashboard.

You are **YELLOW** if:

- local checks work but model calls fail with a specific status code;
- Claude Code appears to use the wrong model;
- you cannot tell whether the failure is local or remote.

You are **RED** if:

- you are considering an unapproved model route;
- auth errors persist after re-running the setup script;
- policy errors appear and you do not understand why.

---

## What you can say after this module

> "The model path is managed infrastructure. I can read a gateway error and tell whether it's mine to fix or the program's."

---

**Previous:** [W.5 Installing the stack](W05-installing-the-stack.md) - **Next:** [W.7 Compass plugin](W07-compass-plugin.md)
