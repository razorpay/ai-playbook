---
title: "Quest W-0: Turn GREEN"
slug: "belts/white/quest-turn-green"
section: "belts"
status: "drafted"
type: "quest"
track: "white"
order: 90
time_minutes: 60
audience: "new-builder"
outcome: "Run setup verification, reach all-GREEN status, and capture evidence that the local environment is ready."
prev: "belts/white/first-pr"
next: "belts/white/quest-hello-razorpay"
pillar: "harness"
belt: "white"
tags: ["white-belt", "quest", "setup-verify", "evidence"]
updated: "2026-07-20"
---

# Quest W-0 - Turn GREEN

> **Win condition:** setup verification shows all required White Belt checks GREEN, and the evidence is captured in a form a reviewer can inspect.

Quest W-0 is the gate. It happens before the sandbox PR because a broken environment makes every later failure ambiguous.

![The first-day map — fresh laptop, setup, verify, fix, GREEN](../../excalidraw/white-belt-turn-green-journey.svg)

The detours on the map (cert not trusted, plugin checksum mismatch, stale Vertex env vars) are the *common* shapes — landing on one is normal, not a failure. The one-line fix is named beside each.

---

## Prerequisite

Complete or skim:

- [W.4 Your auth setup](W04-auth-setup.md) — MyAccess + manager approval.
- [W.5 Installing the stack](W05-installing-the-stack.md) — the canonical setup script. **Do W.5 first; this quest verifies what W.5 set up.**
- [W.7 Compass plugin](W07-compass-plugin.md)
- [W.8 GREEN / YELLOW / RED](W08-green-yellow-red.md)

Quest W-0 uses the shipped [`setup-verify`](../../skills/setup-verify/README.md) skill. Its ten-check report is the evidence contract. A five-command smoke test can tell you whether Claude opens, but it does not check the registry, certificate, plugin checksum, Git/SSO, required environment variables, or program endpoints.

---

## The task

Run the full ten-check report, resolve every YELLOW or RED, and capture the final GREEN output.

### Step 1 — Start from a fresh terminal

Close the terminal window where you ran W.5 and open a new one. Then start Claude Code:

```bash
claude
```

If `claude` is not found, re-run the W.5 setup script, open another fresh terminal, and retry. If the agent opens, continue.

### Step 2 — Invoke the skill

Inside Claude Code, ask:

```text
Run setup-verify.
```

Wait for the complete report. It must include an overall colour and ten rows covering Node + pnpm, Claude Code auth, the internal npm registry, corporate-proxy trust, stale Vertex variables, the LiteLLM gateway, Compass, Git + corp SSO, required environment variables, and program health endpoints.

### Step 3 — Fix, re-run, then capture GREEN

For each non-GREEN row:

1. apply the named one-line fix yourself; `setup-verify` diagnoses but does not modify your environment;
2. ask Claude Code to re-run that check (for example, `Re-run setup-verify check 7`);
3. once the targeted check passes, run the full `setup-verify` report again.

Capture the ten-row GREEN report. If any RED persists after one focused repair attempt, post the full redacted report in [`#ai-help`](https://razorpay.slack.com/archives/C08C35GKJKD) with the fix you tried.

### If the skill cannot start

Use the symptom to reach the right fix; do not replace the ten-check report with a partial manual pass:

- `zsh: command not found: claude` → follow [D.8](../../appendices/D-known-issues/README.md#d8--command-not-found-claude-after-install-status-fixed), restart the terminal, and retry.
- An in-session `/login` prompt → follow that SSO flow. Do not run `claude /login` from the shell; see [D.11](../../appendices/D-known-issues/README.md#d11--unknown-skill-login-after-running-claude-login-status-fixed) if you already saw `Unknown skill: login`.
- `403 PERMISSION_DENIED` mentioning `aiplatform.googleapis.com` → remove stale Vertex variables via [D.3](../../appendices/D-known-issues/README.md#d3--403-permission_denied-referencing-aiplatformgoogleapiscom-status-fixed), restart the terminal, and retry.
- A skill-not-found error after Claude opens → follow the Compass repair in [W.7](W07-compass-plugin.md), then retry `setup-verify`.

**You are GREEN for Quest W-0 only when the full `setup-verify` report shows all ten checks GREEN.**

---

## Evidence template

Copy this into your tracker note or badge draft:

```markdown
## Quest W-0 evidence

Builder handle:
Date:
Machine class:
Setup route:
Plugin version:
Verification result: GREEN / YELLOW / RED
Screenshot or log link:
Reviewer: self-attested / reviewer handle
Follow-up needed:
```

For W-0, self-attestation is acceptable if the cohort rules allow it. The screenshot or log must still exist.

---

## What counts

This counts:

- all required checks GREEN;
- screenshot or redacted log attached;
- plugin version visible or recorded;
- date recorded;
- any repair notes captured if the first run was not GREEN.

This does not count:

- "It worked on my machine" with no evidence;
- nine GREEN checks and one YELLOW;
- a screenshot that hides which checks ran;
- a verification run from a different machine;
- a teammate's output reused as yours.

---

## Triage routing

If you are YELLOW after one focused repair attempt:

```text
Quest: W-0 Turn GREEN
Colour: YELLOW
Failing check:
Command run:
Redacted output:
What I tried:
```

If you are RED, skip the extra attempts and route immediately. RED is a stop sign.

---

## Success criteria

You pass Quest W-0 when:

- verification result is GREEN;
- evidence template is filled;
- screenshot or redacted log exists;
- plugin version is recorded;
- no private material is included in the evidence.

---

## What you can say after this quest

> "My machine is GREEN for White Belt work."

That is the unlock for Quest W-1.

> **Pin this for the rest of the week.** [H.7 — Day-1 quick reference](../../appendices/H-reference-cards/H7-day-1-quick-reference.md) is the single-page card with every command, channel, and contact you'll need over your first week. Bookmark it now so you don't search later.

---

**Previous:** [W.12 Your first PR](W12-first-pr.md) - **Next:** [Quest W-1 HelloRazorpay commit](quest-W1-hello-razorpay.md)

