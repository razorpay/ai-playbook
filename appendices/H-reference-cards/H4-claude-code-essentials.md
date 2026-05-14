---
title: "Claude Code essentials"
slug: "appendices/reference-cards/claude-code-essentials"
section: "appendices"
status: "drafted"
type: "reference-card"
track: "reference-cards"
order: 4
time_minutes: 3
audience: "everyone"
outcome: "Use a one-page reference to remember the permission system, the slash commands, and the rhythm of working with Claude Code day to day."
prev: "appendices/reference-cards/git-essentials"
next: "appendices/reference-cards/playwright-essentials"
pillar: "harness"
belt: null
tags: ["appendix", "reference-card", "claude-code"]
updated: "2026-05-08"
---

# H.4 — Claude Code essentials

> **Printable card · Companion to [W.7](../../belts/01-white/W07-compass-plugin.md), [W.11](../../belts/01-white/W11-permission-system.md), [Y.7](../../belts/02-yellow/Y07-permissions-and-hooks.md), and [G.10](../../belts/03-green/a-craft/G10-hooks-and-slash-commands.md).** The keyboard rhythm of working with Claude Code.

---

## The permission system

Every time Claude Code wants to do something that affects your environment (run a command, edit a file, fetch a URL), it asks. You answer one of three ways.

| Key | Meaning | When to use |
|---|---|---|
| **y** | Yes, this once | Default for anything you want to think about |
| **n** | No, stop this action | When the proposed action looks wrong |
| **a** | Yes, and always say yes to this kind of action | For trusted, repetitive actions only |

The trap: pressing `a` too often. The permission system protects you; an "always yes" is a small piece of trust permanently given. See [W.11](../../belts/01-white/W11-permission-system.md) for the discipline.

---

## Common slash commands

Type `/` in a Claude Code conversation to invoke a slash command. Common ones:

| Command | What it does |
|---|---|
| `/help` | Shows the available commands |
| `/skills` | Lists available skills |
| `/clear` | Clears the current session and starts fresh |
| `/cd <path>` | Changes working directory |

Custom slash commands defined in your project's CLAUDE.md or by installed plugins are also available; `/help` lists them.

---

## The setup colour check

Every White Belt module ends with a colour question. The full skill is [`setup-verify`](../../skills/setup-verify/README.md), but the underlying framing:

| Colour | What it means |
|---|---|
| **GREEN** | Everything works. You can claim Quest W-0. |
| **YELLOW** | Things work, but with caveats worth fixing. |
| **RED** | Something is broken. Quest W-0 not yet claimable. |

When in doubt, run setup-verify. It is faster than guessing.

---

## The daily rhythm

A typical day with Claude Code as a White or Yellow Belt:

1. **Open the project.** `cd` into the repo. Claude Code reads CLAUDE.md automatically.
2. **Start a session.** Describe what you want to do in plain English. Be specific about success criteria.
3. **Watch the permission prompts.** Each `y` is a decision; each `a` is a small piece of trust.
4. **Inspect changes before commit.** `git status` and `git diff` are how you verify what Claude actually did.
5. **Commit with a useful message.** The commit message is what your team reads later. See [H.3 — Git essentials](H3-git-essentials.md).

---

## What to do when stuck

| Situation | The move |
|---|---|
| Claude is doing something you did not ask for | Press `n` to stop. Re-prompt with what you actually wanted. |
| Claude says it cannot do something | The refusal is usually correct. Re-read the refusal; the explanation is the path forward. |
| Claude is going in circles | Type `/clear` and start fresh. Long sessions accumulate confusion. |
| Claude does not have context | Read CLAUDE.md, or paste the relevant file content explicitly. |
| Something looks wrong but you cannot tell what | Ask Claude: "What did you just do? Show me the diff." |

---

## What this card is not

**Not a Claude Code manual.** The full reference is in the Anthropic docs and in [W.7](../../belts/01-white/W07-compass-plugin.md).

**Not a substitute for the chapters.** W.7, W.11, Y.7, and G.10 cover the patterns this card lists at the level of why they work.

**Not a permission to always say yes.** The "always" option (`a`) is a tool; using it for everything defeats the safety the permission system provides. See [§0.11 The safety brief](../../prologue/11-safety-brief.md).

---

**Remember:** every `a` is permanent for the session. Use it sparingly.

**Up to:** [↑ Appendix H](README.md) · **Companion:** [W.7](../../belts/01-white/W07-compass-plugin.md), [W.11](../../belts/01-white/W11-permission-system.md)
