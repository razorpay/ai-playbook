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
outcome: "Understand what the program-pinned plugin is for, how to verify it, and how to avoid stale-plugin drift."
prev: "belts/white/llm-gateway"
next: "belts/white/green-yellow-red"
pillar: "context"
belt: "white"
tags: ["white-belt", "plugin", "compass"]
updated: "2026-04-27"
---

# W.7 - Compass plugin

The plugin is the program's way of packaging local guidance, commands, and checks into the place builders actually work. You can think of it as a small layer of shared muscle memory.

White Belt does not require you to author plugins. It requires you to install the program-pinned plugin, verify the version, and understand why stale plugin state creates confusing failures.

---

## If you're short on time

- The plugin packages program-approved workflows so every learner does not reinvent them.
- Version matters. A stale plugin can make the right command behave like the wrong command.
- If plugin verification fails, repair the plugin before debugging the module you were trying to complete.

---

## The mental model

```text
Playbook explains the practice
Plugin packages the repeatable steps
Verification proves your local copy matches the program path
```

The playbook is the source of learning. The plugin is the operational helper. Do not confuse them. If the plugin changes, the playbook should eventually describe the new behaviour; if the playbook changes, the plugin may need a matching update.

---

## What is inside the plugin, conceptually

A program-pinned plugin can include:

- setup verification commands;
- repo orientation helpers;
- pre-PR sanity checks;
- design-track helpers;
- safe prompt recipes;
- links to local playbook routes;
- version metadata.

The exact contents can change by release. White Belt only cares that your local plugin matches the pinned release for this cohort or self-paced run.

---

## Worked example

Run the plugin verification command from the program setup path. The output should answer:

```text
Plugin installed: yes
Plugin version: matches pinned version
Required commands available: yes
Configured model path: expected
Setup verification available: yes
```

If your output has a version mismatch, do not proceed to Quest W-0 yet. Repair plugin state first.

Ask Claude Code a scoped question:

```text
Which program plugin version is active? Do not make changes.
```

If Claude cannot tell, that is okay. The verification command is the source of truth. Claude is an assistant, not the plugin registry.

---

## Stale plugin symptoms

| Symptom | Why it matters |
|---|---|
| A command named in the playbook is missing | Plugin may be old or not installed. |
| Verification output shape differs from the module | Plugin and playbook may be out of sync. |
| A teammate's output has extra checks | You may be on different plugin versions. |
| The setup command succeeds but Quest W-0 cannot run | Setup installed tools but not the plugin layer. |

Treat stale plugin as a root cause, not as a side note.

---

## Common failure modes

**"I installed Claude Code, so I assumed the plugin exists."** Tool install and plugin install are different.

**"I copied a plugin folder manually."** Manual copying can hide version drift. Use the approved installer or update path.

**"The plugin works in one repo but not another."** You may be confusing global plugin state with repo-local config. Capture both paths and ask for help.

**"The command name changed."** Follow the current pinned version. Do not keep old command names alive in cohort notes.

---

## GREEN / YELLOW / RED self-check

You are **GREEN** if:

- plugin verification says installed;
- version matches the pinned release;
- setup verification is available;
- you understand that plugin repair comes before module debugging.

You are **YELLOW** if:

- plugin exists but version differs;
- one expected command is missing;
- output shape differs from the playbook.

You are **RED** if:

- plugin installation fails;
- repair fails;
- you are relying on a manually copied plugin.

---

## What you can say after this module

> "I can verify the program plugin and recognize stale-plugin drift."

---

**Previous:** [W.6 The LLM Gateway](W06-llm-gateway.md) - **Next:** [W.8 GREEN / YELLOW / RED](W08-green-yellow-red.md)

