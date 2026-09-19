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
outcome: "Confirm whether LiteLLM is your provisioned code route, understand what the gateway does, and route failures correctly."
prev: "belts/white/installing-the-stack"
next: "belts/white/compass-plugin"
pillar: "context"
belt: "white"
tags: ["white-belt", "llm-gateway", "litellm"]
updated: "2026-09-19"
---

# W.6 - The LLM Gateway

You do not need to understand model infrastructure to use Claude Code well. You do need to know which code route support provisioned for you. If that route is LiteLLM, your model requests move through Razorpay's LLM gateway with auth, routing, logging, and policy around them. Claude Team and Claude Max are separate routes; do not apply this chapter's LiteLLM settings or diagnostics to them.

This module is intentionally short. The goal is vocabulary and a quick way to triage, not infrastructure ownership.

---

## If you're short on time

- The gateway is `https://llm-gateway.razorpay.com`. It runs **LiteLLM**, an open-source model proxy.
- On the LiteLLM route, Claude Code requests go through the gateway. It authenticates your personal key, checks whether the requested model is enabled for that key, applies the current access and budget rules, routes to the model, and records the usage.
- The LiteLLM setup script in [W.5](W05-installing-the-stack.md) writes that route's settings into `~/.claude/settings.json`. You should not hand-edit them.
- If support provisioned Claude Team or Claude Max, stop here and follow [Y.8's route chooser](../02-yellow/Y08-litellm-and-enterprise.md#choose-your-current-route) plus the current SOP they sent. Do not run the LiteLLM setup to make this chapter's checks pass.
- If a gateway call fails, capture the short error and route it. Do not try to bypass it.

---

## First: confirm this is your route

```text
Did support explicitly provision Claude Team or Claude Max?
  Yes -> use that route's current SOP; do not apply LiteLLM setup or limits
  No  -> continue with the LiteLLM gateway model below
```

Being able to open Claude does not answer this question. Use the route support assigned, not whichever settings happen to be left on your laptop.

---

## The mental model

This diagram describes the **LiteLLM route**:

```text
You
  -> Claude Code
  -> ~/.claude/settings.json (LiteLLM key + model defaults)
  -> Compass plugin (skills, hooks, MCPs)
  -> https://llm-gateway.razorpay.com  ← Razorpay's LiteLLM gateway
  -> enabled model provider (Claude, GPT, or approved OSS)
  -> response back to Claude Code
```

On that route, the gateway gives the organisation control over access, routing, observability, and safety. Three concrete things it does:

1. **Auth.** Each gateway request carries your personal LiteLLM key as a Bearer token. The key is minted by the setup script and rotated on demand.
2. **Routing.** You ask for an enabled model such as `claude-sonnet-4-6`; the gateway picks the right provider route and forwards. The approved model list can include Claude, GPT, or OSS models depending on the current rollout.
3. **Observability and limits.** Gateway requests land in the LiteLLM dashboard with cost, latency, token count, and budget usage. For LiteLLM usage, that dashboard is the source of truth when claude.ai or Claude Desktop shows a different remaining balance; it does not report Team or Max subscription usage.

Without a managed gateway on this route, every LiteLLM user would invent their own model path, and the route would become impossible to support.

---

## Don't accidentally burn your LiteLLM budget

Gateway usage is easier to understand when you think in **tokens**, not messages. One short prompt can become expensive if Claude Code is carrying a huge folder context, running a long agentic loop, asking a verbose reasoning model, or retrying the same task across multiple sessions. On the LiteLLM route, the dashboard is the bill; chat-window "messages left" indicators are only hints.

Use this quick check before a long run:

- **Scope the context.** Open Claude Code in the smallest relevant folder, or tell it exactly which files to read before it starts exploring.
- **Pick the boring model first.** Use Sonnet for routine reading, summarising, and PR prep. Save Opus or heavyweight OSS routes for work that truly needs them.
- **Cap the loop.** Ask for a plan, then approve one step at a time instead of "keep going until done" on a fuzzy task.
- **Restart when the thread is bloated.** A fresh session with a crisp summary is often cheaper than dragging 80 turns of history behind every prompt.
- **Check the dashboard after experiments.** If a run looks surprisingly expensive, inspect usage by session before repeating the pattern. Future-you deserves rent money.

---

## What you control vs. what the gateway controls

If LiteLLM is your route, distinguish these three failure shapes:

| Failure | What it feels like | Owned by |
|---|---|---|
| Local tool failure | Claude Code does not open, or cannot read the folder. | You (Layers 1–2) |
| Config / plugin failure | Claude Code opens but uses the wrong model or no skills. | You (Layers 4–5) |
| Gateway / model-path failure | A LiteLLM request errors with `401`, `403`, `429`, or a network timeout. | The gateway, sometimes your shell environment |

Only the first one is fully local. For a gateway or model-path failure, read the short error before touching setup: fix a `401` or config-shaped `403` with the [W.5 failure modes](W05-installing-the-stack.md#common-failure-modes); use an enabled fallback when only one model is capped; route a `5xx`, timeout, or persistent failure to [`#ai-help`](https://razorpay.slack.com/archives/C08C35GKJKD). Re-running setup will not clear a centrally managed cap or gateway outage.

---

## Worked example for the LiteLLM route

First prove that the local binary exists:

```bash
claude --version
```

Then launch `claude` and ask a small question that does not require private context:

```text
In one paragraph, explain what a pull request is to a first-time builder.
```

- **`claude --version` fails** → the local install or shell path is not ready. Follow [W.5's direct readiness checks](W05-installing-the-stack.md#what-setup-verification-should-prove).
- **The version prints, but `claude` does not open** → the binary exists, but startup or local configuration is failing. Capture the startup error before changing settings.
- **Claude opens, but the question fails** → the local binary works and the model path failed. On LiteLLM, read the short error: `401` usually means a key issue; `403` means either stale Vertex variables *when the error mentions `aiplatform.googleapis.com`* or missing model access *when it lists another enabled-model set*; `429` means quota or rate limit; a timeout needs routing. See [W.5 common failure modes](W05-installing-the-stack.md#common-failure-modes).
- **Claude answers and the request appears in LiteLLM usage** → the local binary and gateway route both worked. Record the evidence and move on.

---

## What you do not need to know yet

At White Belt, you do not need to know:

- How LiteLLM is deployed inside Razorpay.
- How quotas are calculated per builder or per model family.
- How model fallback rules are configured.
- How observability traces are stored or who reads them.

You will learn more of this later if your work requires it (see [G.23 — The LLM proxy](../03-green/c-guardrails/G23-llm-proxy.md) in Green Belt). For now, treat the gateway as part of the LiteLLM harness: use the route assigned to you, verify it with that route's checks, and route failures cleanly.

---

## Common failure modes

These failure modes apply when LiteLLM is your provisioned route. If support moved you to Team or Max, use that route's SOP instead of trying to repair its login with LiteLLM settings. The detailed LiteLLM failure modes are in [W.5](W05-installing-the-stack.md#common-failure-modes); the short version is below.

**`401 authentication_error`.** Your LiteLLM key rotated or expired. If LiteLLM is still your assigned route, re-run the setup script; it re-mints the key into `~/.claude/settings.json`.

**`403 PERMISSION_DENIED` referencing `aiplatform.googleapis.com`.** Stale Vertex env vars in your shell rc from the pre-March-2026 setup. Remove `ANTHROPIC_VERTEX_PROJECT_ID`, `CLAUDE_CODE_USE_VERTEX`, and `CLOUD_ML_REGION` from `~/.bashrc` / `~/.zshrc`, restart your terminal.

**`403 key not allowed to access model` or `This key can only access models=[...]`.** Read the end of the error before re-authenticating. If it says `Tried to access <model>`, compare that route with the enabled-model list in the same message. A leading `Please run /login` can be misleading: when the key already has enabled models, select one of those exact routes with `/model <exact-enabled-route>`. If an approved route you need is absent, add it at `https://llm-gateway.razorpay.com/auth`, wait two to three minutes for the gateway cache to refresh, then restart Claude Code. Escalate to `#ai-help` only if the key is not enrolled or an approved route cannot be enabled.

**`exceeded budget for model=claude-opus-4-6` or `claude-opus-4-7`.** When the route appears in your enabled-model list, its per-model cap is exhausted; the message does not mean the route retired. Check the LiteLLM usage view and use a lower-cost enabled route for routine work. If the route is absent or denied, follow the model-access step above instead.

**`ExceededBudget` or model-wise limit errors.** Trust LiteLLM over the Claude Desktop usage display. Check the LiteLLM usage page, then follow [W.5 failure mode #7](W05-installing-the-stack.md#common-failure-modes): move routine work to an enabled fallback when only a model family is capped, and route true business blockers through `#ai-help` with manager approval visible.

**"My usage isn't showing in the dashboard."** Shell env vars `ANTHROPIC_BASE_URL` or `ANTHROPIC_API_KEY` overriding what `~/.claude/settings.json` sets. `unset` them, then remove from your shell rc.

**"A teammate says a different model path is faster."** White Belt uses the route support provisioned for each builder. Do not copy a teammate's Team, Max, or LiteLLM settings, and do not optimise routing before you can ship the first PR.

---

## GREEN / YELLOW / RED self-check

You are **GREEN** if:

- you can name whether your provisioned code route is LiteLLM, Team, or Max;
- Claude Code answers a small prompt;
- you can explain the difference between local tool failure and gateway failure;
- if LiteLLM is your route, your usage shows up in the LiteLLM dashboard.

You are **YELLOW** if:

- local checks work but model calls fail with a specific status code;
- Claude Code appears to use the wrong model;
- you cannot tell whether the failure is local, remote, or on a different provisioned route.

You are **RED** if:

- you are considering an unapproved model route;
- you are applying LiteLLM setup or diagnostics to a Team or Max route;
- on LiteLLM, auth errors persist after re-running the setup script;
- policy errors appear and you do not understand why.

---

## What you can say after this module

> "I can name my provisioned code route. If it is LiteLLM, I can read a gateway error and tell whether it is mine to fix or the program's."

---

**Previous:** [W.5 Installing the stack](W05-installing-the-stack.md) - **Next:** [W.7 Compass plugin](W07-compass-plugin.md)
