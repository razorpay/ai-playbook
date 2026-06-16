---
title: "Your auth setup"
slug: "belts/white/auth-setup"
section: "belts"
status: "drafted"
type: "chapter"
track: "white"
order: 4
time_minutes: 20
audience: "new-builder"
outcome: "Name the auth layers behind Claude Code, recognise which one is failing, and know which fixes are yours vs. the program's."
prev: "belts/white/git-as-savepoints"
next: "belts/white/installing-the-stack"
pillar: "harness"
belt: "white"
tags: ["white-belt", "auth", "litellm", "sso"]
updated: "2026-06-16"
---

# W.4 - Your auth setup

AI coding tools feel magical only after auth works. Before that, they feel unfair: one person's laptop streams completions, another person's laptop says permission denied.

This module gives you the mental model. The exact command path lives in [W.5](W05-installing-the-stack.md). Do not replace that flow with random internet commands.

---

## If you're short on time

- Five auth layers sit between you and a working Claude prompt: **Google SSO, MyAccess approval, Claude.ai SSO, the LiteLLM key, and Zscaler certificate trust**.
- The setup script in [W.5](W05-installing-the-stack.md) handles four of the five. MyAccess is the one you do by hand.
- A setup failure is almost never "Claude is broken." It is one layer missing or stale.
- Never paste secrets or private auth output into a prompt or a Slack message. Redact aggressively.

---

## The mental model

Five layers, top to bottom:

```text
Google SSO (browser)            ← your Razorpay identity
        |
MyAccess "Claude AI" approval   ← grants you the LiteLLM seat
        |
Claude.ai SSO                   ← signs you into the web product
        |
LiteLLM personal key            ← in ~/.claude/settings.json, used by Claude Code
        |
Zscaler certificate trust       ← so package installs + gateway calls work behind the proxy
```

When something fails, ask: which layer?

| Symptom | Likely layer |
|---|---|
| Browser asks you to sign in again at every step | Google SSO |
| MyAccess shows your request as "pending" | MyAccess approval (manager or `@techit`) |
| claude.ai shows you on "Free Plan" after approval | Azure AD sync — wait 30–40 minutes |
| `401 authentication_error` from `claude` | LiteLLM key rotated — re-run the setup script |
| `403 PERMISSION_DENIED` mentioning `aiplatform.googleapis.com` | Stale Vertex env vars in your shell rc (pre-March-2026 leftover) |
| `npm install` or `curl` fails with certificate wording | Zscaler trust |
| Claude Code opens but cannot reach the model | LiteLLM key or shell-env override |

---

## Why this looks different from older notes

Until March 2026, Razorpay routed Claude through Google Vertex AI with `gcloud auth application-default login`. **That path is retired.** The current path goes through Razorpay's LiteLLM gateway at `llm-gateway.razorpay.com`, configured for you by the setup script.

If a teammate's notes, an old wiki page, or your `~/.bashrc` mentions any of these, they are stale and they will break your setup:

```bash
export ANTHROPIC_VERTEX_PROJECT_ID='pod-velocity-claude-code'
export CLAUDE_CODE_USE_VERTEX=1
export CLOUD_ML_REGION='global'
```

Remove them, then re-run the setup script. The script auto-purges these from new shells, but it cannot purge what your current shell already loaded — close the terminal window and open a new one.

---

## Diagnostic commands

You should not need to run any auth commands yourself — the W.5 setup script does it. These are only for diagnosing.

Check Claude Code itself:

```bash
claude --version
```

Check what the harness thinks its endpoint is:

```bash
grep ANTHROPIC_BASE_URL ~/.claude/settings.json
# Expected: "ANTHROPIC_BASE_URL": "https://llm-gateway.razorpay.com"
```

Check for stale Vertex leftovers in your shell rc:

```bash
grep -E 'VERTEX|CLAUDE_CODE_USE_VERTEX|CLOUD_ML_REGION' ~/.bashrc ~/.zshrc
# Expected: no output
```

Check that no shell env var is overriding settings.json:

```bash
env | grep -E '^ANTHROPIC_(BASE_URL|API_KEY)='
# Expected: no output (or matches settings.json exactly)
```

If any of those land wrong, see [W.5 common failure modes](W05-installing-the-stack.md#common-failure-modes).

---

## What to share when asking for help

When you post in [`#ai-help`](https://razorpay.slack.com/archives/C08C35GKJKD), share:

- the command you ran;
- the non-sensitive error text (status code + short message);
- your colour: GREEN / YELLOW / RED;
- the module or step you were following;
- what you already tried.

Do not share:

- the contents of `~/.claude/settings.json` (it has your personal key);
- any `Authorization` header or `Bearer sk-...` value;
- full machine paths with your name in them — paraphrase to `~/...`;
- customer or merchant data;
- screenshots that show your browser profile.

If in doubt, redact and ask how much detail is safe.

---

## Common failure modes

The full seven are in [W.5](W05-installing-the-stack.md#common-failure-modes). The auth-shaped subset:

**"SSO works in browser, but `claude` fails with a 401."** Your LiteLLM key has rotated. Re-run the setup script.

**"`403 PERMISSION_DENIED` referencing `aiplatform.googleapis.com`."** Vertex env vars from the old setup are still in your shell rc. Remove them, restart your terminal.

**"Certificate errors appear during installs."** Zscaler trust layer. Do not bypass certificate checks. Re-run the setup script — it installs the trust chain.

**"A teammate gave me a command that worked for them."** It may be from the old Vertex era. Prefer the W.5 flow unless `#ai-help` explicitly tells you otherwise.

**"I'm being asked to sign in somewhere I don't recognise."** Stop. Don't enter credentials. Screenshot the page (with no profile info visible) and ask in `#ai-help`.

---

## GREEN / YELLOW / RED self-check

You are **GREEN** if:

- Razorpay Google SSO works in the browser;
- MyAccess shows "Claude AI" as approved;
- `claude --version` works;
- `~/.claude/settings.json` points at `llm-gateway.razorpay.com`;
- a small prompt round-trips without error.

You are **YELLOW** if:

- one layer works and another fails;
- the harness opens but a prompt errors with a specific status code (401 / 403 / 429);
- install commands mention certificate or registry issues.

You are **RED** if:

- you cannot sign in through SSO at all;
- MyAccess request is stuck and no admin is reachable;
- you are being asked for credentials in a place that feels wrong.

For RED, stop. Auth is a support problem, not a bravery problem.

---

## What you can say after this module

> "I can name which of the five auth layers is failing instead of saying 'the whole tool is broken'."

---

**Previous:** [W.3 Git as save-points](W03-git-as-savepoints.md) - **Next:** [W.5 Installing the stack](W05-installing-the-stack.md)
