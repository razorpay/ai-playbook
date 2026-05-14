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
updated: "2026-04-27"
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

Your setup verification should cover:

| # | Check | GREEN means |
|---:|---|---|
| 1 | Terminal | Shell opens and basic commands work. |
| 2 | Git | `git --version` and `git status` work in a repo. |
| 3 | Repo access | Assigned sandbox repo can be cloned. |
| 4 | Node | Expected runtime is available. |
| 5 | Package manager | Repo's package manager is available. |
| 6 | Registry path | Installs can reach the approved package path. |
| 7 | Auth | Browser and local auth layers are valid. |
| 8 | Model path | Claude Code can reach the approved model route. |
| 9 | Plugin | Program plugin is installed and version-aligned. |
| 10 | PR path | You can push a branch to the sandbox repo. |

Quest W-0 asks you to capture the GREEN output.

---

## Worked example

Run the verification command from the program-pinned setup path.

Read the output like a table, not like a wall of text:

```text
Terminal: GREEN
Git: GREEN
Repo access: GREEN
Node: GREEN
Package manager: GREEN
Registry path: YELLOW
Auth: GREEN
Model path: GREEN
Plugin: GREEN
PR path: not checked
```

This is not GREEN. It is YELLOW because at least one required check is YELLOW and one check is incomplete.

The correct next move is not "try Quest W-1 anyway." The correct next move is:

1. apply the one-line fix for registry path;
2. rerun verification;
3. if still YELLOW, post the redacted output through the support route.

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

**"I skipped the PR path check."** Then W-1 may fail later. Run it while support is available.

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

