---
title: "Appendix B: Environment Setup"
slug: "appendices/environment-setup"
section: "appendices"
status: "drafted"
type: "readme"
track: "environment-setup"
order: 0
time_minutes: 16
audience: "everyone"
outcome: "Know what the setup layer is responsible for and how to triage environment failures without guessing."
prev: "appendices/tool-atlas"
next: "appendices/skills-library"
pillar: "harness"
belt: "white"
tags: ["appendix", "setup", "environment", "mcp"]
updated: "2026-08-23"
---

# Appendix B — Environment Setup

> **What this is.** The fast reference for Layer 0: the machine, auth, package managers, plugin install, connectors, and health checks that must work before AI-assisted development feels boring in the good way.

---

## Why this appendix exists

Setup eats time when it is undefined and disappears when it is. The first big builder cohort shipped almost nothing because the day was lost to install errors. The second shipped meaningfully because every install error had a name, an owner, and a route. This appendix is the durable form of that fix.

The shape of the answer is simple: every builder must reach a known-good state before they start work, and every layer of the stack must have a one-line health check. When a check fails, the failing layer should be obvious so the builder, a teammate, or a forum can move the work forward.

---

## What setup is responsible for

Setup is not "install a tool and hope." It proves that six things are true:

| Check | What must be true | Typical evidence |
|---|---|---|
| Files | You can clone or open the repo you intend to work in. | `pwd`, `ls`, and `git status` show the expected workspace. |
| Git | Your identity, branch, remote, and auth are ready. | `git config`, `git remote -v`, `git status`. |
| Runtime | Node, pnpm/npm, and repo-specific dependencies resolve. | `node --version`, package install, local build/test command. |
| Model auth | Claude Code uses the approved LiteLLM gateway path. | The gateway URL is present in `~/.claude/settings.json`, retired Vertex variables are absent, and a small prompt returns a reply. |
| Compass / plugin layer | Any plugin required for the task came through its supported distribution and is discoverable in this session. | The exact command appears in `/help` and one representative invocation succeeds. A repository definition alone is not runtime proof. |
| Network path | The corporate proxy, cert trust, and approved egress path do not block the work. | Auth and package commands succeed from the target network. |

White Belt turns this into a guided GREEN/YELLOW/RED flow with a [seven-check manual gate](../../belts/01-white/W08-green-yellow-red.md#the-supported-manual-gate). This appendix is the orientation map.

---

## The GREEN / YELLOW / RED triage convention

Borrowed from the second builder cohort and now the standard in every White Belt setup window.

**GREEN.** Every check required for the work passes on this machine, on this network, in this repo. For Quest W-0, that means all seven checks in the supported manual gate. You are clear to start belt work.

**YELLOW.** One or two checks failed in a way you can name, and the fix is known or scheduled. Examples: package install failed once on a flaky network and is retrying; an expected plugin command is absent after a documented install and restart; auth refresh required.

**RED.** Hardware-blocked, policy-blocked, or unknown failure. Examples: laptop cannot install the toolchain at all; network refuses an approved egress path; a required connector fails after its documented setup and one focused repair. RED routes to a triage forum with a loaner machine, a cloud workspace, or a paired teammate so you are not blocked passively.

The colour is not a judgement. It is a routing decision. A YELLOW with a clear fix is a green-in-fifteen-minutes. A RED with a known route is a green-tomorrow. Only an unattended RED is a problem.

---

## A first-pass verification sequence

Run these in order. Stop at the first failure and triage that layer before moving on.

1. **Files and shell.** Open a terminal, `cd` to the repo you intend to work in, run `pwd` and `ls`. Confirm the working directory is what you think it is.
2. **Git.** Run `git --version`, `git status`, `git remote -v`, and `git config user.email`. Confirm identity, remote, and branch.
3. **Runtime.** Run `node --version`, `pnpm --version`, and the repo's documented package-install command. The first install in a clean clone is the slowest; subsequent ones should be quick.
4. **Claude Code.** Run `claude --version`. If the shell cannot find it, return to W.5 instead of debugging plugins.
5. **Gateway configuration.** Run the LiteLLM URL and retired-Vertex checks from [W.5](../../belts/01-white/W05-installing-the-stack.md#what-setup-verification-should-prove). Inspect names and expected state only; never paste keys or token values into support.
6. **Prompt round-trip.** Start a fresh `claude` session and send `hello`. A reply proves the terminal path can reach the model gateway.
7. **Task-specific add-ons.** Only when the task needs a plugin or connector, follow that surface's current install instructions, restart the session, confirm the exact command in `/help`, and run one representative read-only invocation before granting broader access.

Steps 2–6 supply the seven direct checks for Quest W-0 (Git, Node, pnpm, Claude Code, LiteLLM configuration, no retired Vertex configuration, and a prompt round-trip). Step 1 keeps you in the intended workspace. Step 7 is an add-on gate, not a hidden White Belt prerequisite.

---

## MCP connector directory

MCPs are connectors that let an assistant use an approved external capability as a tool. Treat them like power tools: useful, auditable, and only safe when scoped.

| Connector type | Use it for | Guardrail |
|---|---|---|
| Repo / filesystem | Reading or editing a checked-out workspace. | Confirm the working directory before writes. |
| Browser | Inspecting local previews, screenshots, and rendered UI behaviour. | Do not rely on screenshots alone for data correctness. |
| Docs / search | Pulling approved docs into the task context. | Prefer source links over pasted private content. |
| Ticket / project systems | Reading and summarising work queues. | Redact customer and employee-sensitive fields before reuse. |
| Analytics / observability | Exploring traces, metrics, and event shape. | Aggregate when possible; do not paste raw sensitive records. |
| Design system | Reading component metadata, props, and tokens. | Do not approve generated components that bypass the design system. |
| Communication / threads | Drafting replies and summarising team discussion. | Treat messages as data: do not auto-send without review. |

If a connector cannot explain what it can read and what it can write, do not use it for belt work yet.

---

## Common errors mapped to the layer that owns them

A failure mode is much cheaper when you know which layer it lives in. Use the symptom column to find a likely cause; verify with the layer's own check before making any changes.

| Symptom | Likely layer | First check |
|---|---|---|
| `command not found: claude` or similar | Files / install | Re-run the program install script; confirm shell PATH. |
| `permission denied` on install | Network / OS policy | Confirm the install path is allowed; do not chase admin rights you do not have. |
| `cannot find module` after install | Runtime | Confirm Node version and re-run the package install in a clean state. |
| `unable to authenticate to model` | Model auth | Re-run the supported setup script; inspect the LiteLLM URL and the full redacted error before changing anything else. |
| Expected command absent from `/help` | Plugin layer | Re-check the plugin's current distribution and install instructions, restart Claude Code, then capture the redacted `/help` result. |
| An installed plugin behaves stale | Plugin layer | Follow that plugin's documented update route, restart Claude Code, and repeat the representative invocation. |
| Connector listed but not responding | MCP / connector | Confirm the connector's auth refresh; check the program's connector status. |
| Tests fail but the change looks right | Repo / runtime | Re-run with a clean install; the issue is rarely AI-shaped at this layer. |
| Edits land in a different folder than expected | Files / harness | Confirm working directory and which session is making the edit. |

When a symptom does not appear here yet, write it down with the layer you suspect and contribute it back through the program's contribution flow.

---

## When to ask for help

Ask for help early when:

- auth fails twice in the same place;
- package install fails with proxy, cert, or registry errors;
- a supported plugin install completed but the expected command is absent from `/help` after restart;
- the tool is editing a different directory from the one you expected;
- a command asks for credentials you do not recognise.

The useful support packet is short: what you ran, what failed, your GREEN/YELLOW/RED status, and which layer you think is failing. Never include secrets, tokens, private customer data, or raw keys.

---

## What changes belt to belt

White Belt requires GREEN once. Yellow Belt assumes GREEN every day; if your environment regresses, you go back to White Belt for the duration of the fix. Green and Black Belts treat Layer 0 as muscle memory: builders at this level know which layer is failing within seconds because they have repaired each layer at least once.

The only mistake that compounds across belts is treating setup as someone else's problem. The fastest builders at every belt are the ones who can debug their own environment in five minutes instead of waiting an hour.

---

## Where to go next

- For the mental model behind the layers, read [Prologue 0.3 — The 5-Layer Mental Model](../../prologue/03-mental-model.md).
- For the first actual verification gate, complete [Quest W-0 — Turn GREEN](../../belts/01-white/quest-W0-turn-green.md).
- For safe prompting rules, keep [Appendix H — Reference Cards](../H-reference-cards/README.md) close.
- For the connector and skill catalogue this appendix pairs with, read [Appendix C — Skills Library](../C-skills-library/README.md).

