---
title: "Compass plugin"
slug: "belts/white/compass-plugin"
section: "belts"
status: "drafted"
type: "chapter"
track: "white"
order: 7
time_minutes: 20
audience: "new-builder"
outcome: "Distinguish plugin source from installed runtime state, verify the commands you actually have, and route missing commands without guessing."
prev: "belts/white/llm-gateway"
next: "belts/white/green-yellow-red"
pillar: "context"
belt: "white"
tags: ["white-belt", "plugin", "compass"]
updated: "2026-08-22"
---

# W.7 - Compass plugin

A plugin packages shared guidance, commands, hooks, or connectors into the place builders work. Think of it as reusable team muscle memory—not proof that every documented workflow is installed on your machine.

White Belt does not require you to author plugins. It requires you to separate three things that are easy to blur:

```text
Playbook or repository definition  -> what a workflow is meant to do
Supported distribution             -> where maintainers currently publish it
Your Claude Code session            -> what you can invoke right now
```

The seven directories under this playbook's [`skills/`](../../skills/) folder are **reference definitions**. Their presence in GitHub does not mean Compass or another marketplace ships equivalent commands. The runtime is the evidence.

---

## If you're short on time

- Use `/help` inside Claude Code to discover commands available in the current session.
- A command documented in a repository but absent from `/help` is not installed evidence.
- Do not copy a skill folder or guess an old command name. Use the chapter's manual workflow or confirm the current supported distribution in [`#ai-help`](https://razorpay.slack.com/archives/C08C35GKJKD).

---

## Worked example: prove the command before using it

Suppose a chapter or teammate tells you to run a plugin command.

1. Start Claude Code in the same environment and repository where you plan to work.
2. Run `/help`.
3. Search the displayed commands for the exact command or namespace.
4. If it appears, open its help text before giving it real input.
5. If it does not appear, stop. Check the plugin's current install instructions or ask in `#ai-help` with the missing command and the redacted `/help` result.

Capture a small receipt:

```markdown
Expected command:
Visible in `/help`: yes / no
Plugin or marketplace source, if known:
Session restarted after install/update: yes / no
Next action:
```

This receipt is more useful than asking Claude which version it thinks is active. Claude is an assistant, not the plugin registry.

---

## Source is not distribution

A workflow can exist in source without being runnable in your session. Common states include:

| State | What it proves | What it does not prove |
|---|---|---|
| A `SKILL.md` exists in a repository | The workflow has a reviewable definition | Your client installed or discovered it |
| A marketplace contains a plugin | A package is published | Your local copy is current or enabled |
| The command appears in `/help` | Your current session discovered it | Its connectors and permissions will succeed |
| A representative invocation succeeds | That input worked on that surface | Every client or repository behaves the same |

That boundary matters on Day 1. Debugging an absent command as if it were a broken setup wastes time and encourages unsupported manual copies.

---

## Common failure modes

**"The folder exists in GitHub, so I assumed the command exists."** Source is reviewable intent. `/help` is local discovery evidence.

**"I copied a plugin folder manually."** Manual copying hides provenance and update state. Remove the guesswork and return to the approved install route.

**"The plugin works in one repo but not another."** Capture the client, repository, install scope, and `/help` result from both sessions. Global and project-local state can differ.

**"The command name changed."** Do not preserve an old name in personal notes. Follow current plugin documentation or use the manual chapter workflow.

**"I installed or updated it, but nothing changed."** Restart Claude Code, then check `/help` again before escalating.

---

## GREEN / YELLOW / RED self-check

You are **GREEN** if:

- you can distinguish a reference definition from a supported distribution;
- `/help` proves whether the command you need is available;
- you know the manual or support route when it is absent.

You are **YELLOW** if:

- a required command is absent after a documented install and restart;
- the plugin appears installed but its expected namespace does not;
- behaviour differs between two sessions and you have not isolated why.

You are **RED** if:

- the approved installation fails;
- a command requests permissions or data outside its documented boundary;
- you are about to copy unverified plugin files or credentials by hand.

---

## What you can say after this module

> "I can prove what my current session has instead of treating a repository folder as an installed command."

---

**Previous:** [W.6 The LLM Gateway](W06-llm-gateway.md) - **Next:** [W.8 GREEN / YELLOW / RED](W08-green-yellow-red.md)
