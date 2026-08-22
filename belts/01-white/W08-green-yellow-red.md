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
outcome: "Run the supported manual setup gate, interpret colour honestly, and route failures without depending on an undistributed command."
prev: "belts/white/compass-plugin"
next: "belts/white/first-conversation"
pillar: "harness"
belt: "white"
tags: ["white-belt", "health-check", "setup"]
updated: "2026-08-22"
---

# W.8 - GREEN / YELLOW / RED

The colour system is the program's shared language for readiness. It turns setup from vague anxiety into a route.

GREEN means continue. YELLOW means focused repair. RED means stop and ask. Nobody earns extra points for pretending RED is GREEN.

---

## If you're short on time

- Run the [W.5 manual gate](W05-installing-the-stack.md#what-setup-verification-should-prove) before quests, not after frustration.
- GREEN means every required check passed on the machine you will use.
- YELLOW and RED are routing states. They are not personal labels.

---

## The mental model

```text
GREEN  -> proceed
YELLOW -> try one named fix, then ask with output
RED    -> stop, route, do not improvise
```

The colour belongs to the environment, not to the person. Say "my gateway check is YELLOW," not "I am bad at setup." That wording keeps the team solving the right problem.

---

## The supported manual gate

The `skills/setup-verify/` directory in this repository preserves a ten-check **reference definition**. It is useful to maintainers, but its presence does not prove that your Compass or Claude Code setup installs an equivalent command.

Quest W-0 therefore uses seven checks that a new builder can run directly:

| # | Check | GREEN means |
|---:|---|---|
| 1 | Git | `git --version` prints a version. |
| 2 | Node | `node --version` prints a version. |
| 3 | pnpm | `pnpm --version` prints a version. |
| 4 | Claude Code | `claude --version` prints a version. |
| 5 | LiteLLM configuration | `~/.claude/settings.json` points `ANTHROPIC_BASE_URL` at `https://llm-gateway.razorpay.com`. |
| 6 | Retired Vertex configuration | The current shell and shell startup files contain none of the three retired Vertex variables named in W.5. |
| 7 | Prompt round-trip | A fresh `claude` session opens and returns a reply to `hello`. |

This gate proves the Day-1 terminal path. In a repository that explicitly uses another package manager, follow its README after W-0. Quest W-1 separately proves Git identity, corporate SSO, push, and pull-request access. A plugin-specific module may add its own install and command checks; those are not hidden prerequisites for W-0.

---

## Worked example

Run the copyable block in [W.5](W05-installing-the-stack.md#what-setup-verification-should-prove), then record what happened:

```markdown
| Check | Evidence | Colour |
|---|---|---|
| Git | `git version ...` | GREEN |
| Node | `v...` | GREEN |
| pnpm | version string | GREEN |
| Claude Code | version string | GREEN |
| LiteLLM configuration | expected gateway URL present | GREEN |
| Retired Vertex configuration | no retired variables found | GREEN |
| Prompt round-trip | `hello` received a reply | GREEN |

Overall: GREEN / YELLOW / RED
```

One non-GREEN row makes the overall result non-GREEN. Fix the named layer, rerun that command, then refresh the complete table. Do not substitute a teammate's output or a report from another machine.

---

## One-line fix discipline

Each non-GREEN check should have one suggested next action.

Good:

```text
LiteLLM configuration: YELLOW
Fix: rerun the supported setup script, restart the terminal, then inspect the gateway line again.
```

Bad:

```text
LiteLLM configuration: YELLOW
Fix: try a bunch of environment variables until one works.
```

White Belt setup should converge, not branch into folklore.

---

## Common failure modes

**"Six checks are green, so I counted it."** No. Quest W-0 requires all seven checks GREEN.

**"I fixed it locally but did not capture the rerun."** The repair is not evidence until the failed command passes.

**"The check is flaky."** Treat flakiness as YELLOW until you can explain it.

**"The setup gate was GREEN, but I have not tried the PR path."** Quest W-0 proves local setup health; Quest W-1 proves the Git push and PR path.

**"A reference skill said ten checks, so I waited for a command."** The reference contract is not current distribution evidence. Run the manual gate above.

**"I posted a screenshot with too much detail."** Redact keys, tokens, private paths, and unrelated environment values. Support needs symptoms, not secrets.

---

## GREEN / YELLOW / RED self-check

You are **GREEN** if:

- all seven required checks pass;
- you can explain which layer each check belongs to;
- you saved the evidence for Quest W-0.

You are **YELLOW** if:

- one or more checks need a known repair;
- a fix works but you do not know why;
- a check is intermittent.

You are **RED** if:

- the supported setup flow cannot complete;
- a required check still fails after one focused repair;
- support asks you to stop and wait.

---

## What you can say after this module

> "I can tell the truth about my setup state and route the next action."

---

**Previous:** [W.7 Compass plugin](W07-compass-plugin.md) - **Next:** [W.9 Your first conversation with Claude Code](W09-first-conversation.md)
