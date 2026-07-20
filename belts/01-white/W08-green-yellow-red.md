---
title: "GREEN / YELLOW / RED"
slug: "belts/white/green-yellow-red"
section: "belts"
status: "drafted"
type: "chapter"
track: "white"
order: 8
time_minutes: 20
audience: "new-builder"
outcome: "Run the 10-point health check, interpret colour honestly, and route setup failures without wasting a cohort day."
prev: "belts/white/compass-plugin"
next: "belts/white/first-conversation"
pillar: "harness"
belt: "white"
tags: ["white-belt", "health-check", "setup-verify"]
updated: "2026-07-20"
---

# W.8 - GREEN / YELLOW / RED

The colour system is the program's shared language for readiness. It turns setup from vague anxiety into a route.

GREEN means continue. YELLOW means focused repair. RED means stop and ask. Nobody earns extra points for pretending RED is GREEN.

---

## If you're short on time

- Run the health check before quests, not after frustration.
- GREEN means all required checks pass on your machine.
- YELLOW and RED are routing states. They are not personal labels.

---

## The mental model

```text
GREEN  -> proceed
YELLOW -> try the named fix, then ask with output
RED    -> stop, route, do not improvise
```

The colour belongs to the environment, not to the person.

Say "my plugin check is YELLOW," not "I am bad at setup." That wording keeps the team solving the right problem.

---

## The 10-point health check

The [`setup-verify`](../../skills/setup-verify/README.md) skill runs the ten pinned checks below. This table is the contract; a shorter manual smoke test is useful for diagnosis, but it is not Quest W-0 evidence.

| # | Check | GREEN means |
|---:|---|---|
| 1 | Node + pnpm versions | Node matches the pinned major version; pnpm meets the pinned minimum. |
| 2 | Claude Code authentication | Claude Code is installed and authenticated against the program plan. |
| 3 | Internal npm registry | The internal registry is configured and the probe install succeeds without public fallback. |
| 4 | Corporate-proxy certificate | The certificate is trusted by the system, package manager, and Claude Code. |
| 5 | No stale Vertex env vars | Retired Vertex variables are absent from shell startup files and the current shell. |
| 6 | LiteLLM gateway | The gateway health endpoint responds successfully within the timeout. |
| 7 | Compass plugin | The pinned plugin version and checksum match, and its skills are discoverable. |
| 8 | Git + corp SSO | Git uses your Razorpay identity and the corporate SSO credential path. |
| 9 | Environment variables | Every required variable is present; values are never printed. |
| 10 | Health endpoints | The program's required endpoints respond successfully within the timeout. |

Quest W-0 asks you to capture the GREEN output.

---

## Worked example

Open Claude Code and ask:

```text
Run setup-verify.
```

The skill diagnoses your environment; it does not change it. Let all ten checks finish before acting on the report.

Read the output like a table, not like a wall of text:

```text
Overall: YELLOW

Node + pnpm versions: GREEN
Claude Code authentication: GREEN
Internal npm registry: YELLOW
Corporate-proxy certificate: GREEN
No stale Vertex env vars: GREEN
LiteLLM gateway reachable: GREEN
Compass plugin: GREEN
Git + corp SSO: GREEN
Environment variables: GREEN
Health endpoints: GREEN
```

This is not GREEN. One YELLOW check makes the overall result YELLOW.

The correct next move is not "try Quest W-1 anyway." The correct next move is:

1. apply the report's one-line fix for the internal npm registry;
2. ask Claude Code to `Re-run setup-verify check 3`;
3. run the full `setup-verify` report again;
4. if still YELLOW, post the redacted output through the support route.

---

## One-line fix discipline

Each non-GREEN check should have one suggested next action.

Good:

```text
Registry path: YELLOW
Fix: rerun the package-registry repair step from the pinned setup flow, then rerun verification.
```

Bad:

```text
Registry path: YELLOW
Fix: try a bunch of install commands until one works.
```

White Belt setup should converge, not branch into folklore.

---

## Common failure modes

**"Nine checks are green, so I counted it."** No. Quest W-0 requires all required checks GREEN.

**"I fixed it locally but did not write down how."** That makes the next learner pay the same cost. Capture the fix.

**"The check is flaky."** Treat flakiness as YELLOW until you can explain it.

**"The ten-row report was GREEN, but I have not tried the PR path."** Quest W-0 proves setup health; Quest W-1 proves the Git push and PR path. Do not treat one as evidence for the other.

**"I posted a screenshot with too much detail."** Redact sensitive details. The support route needs symptoms, not private material.

---

## GREEN / YELLOW / RED self-check

You are **GREEN** if:

- all required checks pass;
- you can explain which layer each check belongs to;
- you have saved evidence for Quest W-0.

You are **YELLOW** if:

- one or more checks are YELLOW;
- a fix works but you do not know why;
- a check is intermittent.

You are **RED** if:

- any required check is RED;
- the verification command cannot run;
- a support route asks you to stop and wait.

---

## What you can say after this module

> "I can tell the truth about my setup state and route the next action."

---

**Previous:** [W.7 Compass plugin](W07-compass-plugin.md) - **Next:** [W.9 Your first conversation with Claude Code](W09-first-conversation.md)

