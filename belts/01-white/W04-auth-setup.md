---
title: "Your auth setup"
slug: "belts/white/auth-setup"
section: "belts"
status: "drafted"
type: "chapter"
track: "white"
order: 4
time_minutes: 30
audience: "new-builder"
outcome: "Understand the auth pieces behind Claude Code, Vertex access, Google SSO, gcloud, and corporate certificate trust."
prev: "belts/white/git-as-savepoints"
next: "belts/white/installing-the-stack"
pillar: "harness"
belt: "white"
tags: ["white-belt", "auth", "gcloud", "vertex"]
updated: "2026-04-27"
---

# W.4 - Your auth setup

AI coding tools feel magical only after auth works. Before that, they feel unfair: one person's laptop streams completions, another person's laptop says permission denied.

This module gives you the mental model. The exact command path comes from the program-pinned setup flow. Do not replace that flow with random internet commands.

---

## If you're short on time

- Your browser login, `gcloud`, Vertex access, and corporate certificate trust are separate layers.
- A setup failure is usually not "Claude is broken." It is usually one auth layer missing or stale.
- Never paste secrets or private auth output into a prompt. Share redacted command output through the approved support route.

---

## The mental model

There are four auth layers in White Belt:

```text
Google SSO in browser
        |
gcloud local session
        |
Vertex / model access through the org-approved route
        |
Claude Code using the configured path
```

There is also a network trust layer:

```text
corporate network -> corporate-proxy cert -> package installs and model calls can be trusted
```

When something fails, ask: which layer is failing?

| Symptom | Likely layer |
|---|---|
| Browser asks you to sign in again | Google SSO |
| `gcloud` says no active account | gcloud local session |
| model calls are denied | Vertex / approved model route |
| installs fail with certificate wording | corporate-proxy certificate trust |
| Claude Code opens but cannot use the configured model | Claude Code config path |

---

## Worked example

This example is diagnostic. It does not replace the official setup flow.

Check whether `gcloud` exists:

```bash
gcloud --version
```

Check whether `gcloud` sees an active account:

```bash
gcloud auth list
```

Check current configuration:

```bash
gcloud config list
```

If those commands work, you have a local `gcloud` installation and at least some configuration. If they do not work, your next step is not guessing. Your next step is Appendix B and the program setup route.

For corporate certificate trust, do not hunt for private URLs. Use the program-pinned verification command. It should tell you whether package installs and model calls can pass through the approved network path.

For Claude Code, run the smallest possible check:

```bash
claude --version
```

If Claude Code opens, ask it a non-sensitive local question:

```text
What folder are you running in? Do not inspect files yet.
```

That confirms the tool launches without handing it private context.

---

## What not to share

When asking for help, share:

- the command you ran;
- the non-sensitive error text;
- your colour: GREEN, YELLOW, or RED;
- the module you were following.

Do not share:

- private auth responses;
- session material;
- full machine paths with personal names;
- customer or merchant data;
- screenshots that include browser profile details.

If in doubt, paraphrase the error and ask how to redact it.

---

## Common failure modes

**"SSO works in browser, but Terminal still fails."** Browser login and Terminal auth are related but not identical. Run the official auth refresh step.

**"`gcloud` is missing."** That is setup, not debugging. Go to W05 and Appendix B.

**"Certificate errors appear during installs."** This is usually the trust layer. Do not bypass certificate checks. Use the approved repair path.

**"Claude Code launches but model calls fail."** The app is installed, but the model route is not configured or not authorized. Capture the short error and route it.

**"A teammate gave me a command that worked for them."** It may still be wrong for your machine class. Prefer the pinned flow unless the support channel explicitly tells you otherwise.

---

## GREEN / YELLOW / RED self-check

You are **GREEN** if:

- browser SSO works;
- `gcloud --version` works;
- `gcloud auth list` shows the expected active account shape;
- `claude --version` works;
- setup verification does not show auth or certificate failures.

You are **YELLOW** if:

- one layer works and another fails;
- you can launch Claude Code but cannot reach the configured model path;
- install commands mention certificate or registry issues.

You are **RED** if:

- you cannot sign in through the approved route;
- `gcloud` is missing and setup repair fails;
- you are asked for credentials in a place that feels wrong.

For RED, stop. Auth is a support problem, not a bravery problem.

---

## What you can say after this module

> "I can name which auth layer is failing instead of saying the whole tool is broken."

---

**Previous:** [W.3 Git as save-points](W03-git-as-savepoints.md) - **Next:** [W.5 Installing the stack](W05-installing-the-stack.md)

