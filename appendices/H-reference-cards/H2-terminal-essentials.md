---
title: "Terminal essentials"
slug: "appendices/reference-cards/terminal-essentials"
section: "appendices"
status: "drafted"
type: "reference-card"
track: "reference-cards"
order: 2
time_minutes: 3
audience: "everyone"
outcome: "Use a one-page reference to remember the twelve commands and four shortcuts that get a new user through White Belt comfortably."
prev: "appendices/reference-cards/never-put-this-in-a-prompt"
next: "appendices/reference-cards/git-essentials"
pillar: "harness"
belt: null
tags: ["appendix", "reference-card", "terminal"]
updated: "2026-07-11"
---

# H.2 — Terminal essentials

> **Printable card · Companion to [W.2 — Terminal fluency](../../belts/01-white/W02-terminal-fluency.md).** The twelve commands and four shortcuts you actually need.

---

## The twelve commands

| Command | What it does | Most common use |
|---|---|---|
| `pwd` | Prints the current directory path | "Where am I?" |
| `ls` | Lists files and folders in the current directory | "What is here?" |
| `ls -la` | Lists everything including hidden files, with sizes and dates | "What is *really* here?" |
| `cd <dir>` | Changes into a directory | Navigate down |
| `cd ..` | Goes up one directory level | Navigate up |
| `cd ~` | Goes to your home directory | Quick reset |
| `mkdir <name>` | Creates a new directory | Start a new project folder |
| `touch <file>` | Creates an empty file | Quick scratch file |
| `cat <file>` | Prints a file's contents | Quick look at a file |
| `rm <file>` | Deletes a file (no undo) | Clean up; double-check first |
| `cp <src> <dst>` | Copies a file from src to dst | Duplicate before editing |
| `mv <src> <dst>` | Moves or renames | Rename `foo` to `bar`: `mv foo bar` |

## The four shortcuts

| Shortcut | What it does |
|---|---|
| **Tab** | Auto-completes file or directory names. Press once for a single match; twice to see all matches. |
| **Up arrow** | Recalls the previous command. Press repeatedly for older commands. |
| **Ctrl + C** | Cancels the currently running command. The "make it stop" key. |
| **Ctrl + R** | Searches your command history. Type a few characters; the shell finds the most recent matching command. |

---

## The mental model

The terminal is a conversation. You type a command; the shell responds. Unlike a graphical interface, the shell only does exactly what you ask. There is no undo for destructive commands. The four shortcuts above are how you avoid retyping things.

A new user who has the twelve commands and four shortcuts can do most of what White Belt requires. Everything else is built on top.

---

## When to escalate

If the terminal prints an error you do not understand, copy the full error and ask in [`#ai-help`](https://razorpay.slack.com/archives/C08C35GKJKD). Do not retype the error from memory; the exact wording matters.

If you accidentally delete something with `rm`, stop typing. Some recovery is possible if you act quickly, especially through the system's trash mechanism. Reach out in [`#ai-help`](https://razorpay.slack.com/archives/C08C35GKJKD) before doing anything else.

---

## What this card is not

**Not a full terminal manual.** The shell has hundreds of commands and many advanced features. This card covers what you actually need for White Belt.

**Not OS-specific.** The commands above work on macOS and Linux. Windows uses different commands; a Windows-specific card would belong here too.

**Not a substitute for the chapter.** W.2 covers why each command works the way it does, the deeper mental model, and the patterns that compound across the curriculum.

---

**Remember:** the twelve commands plus the four shortcuts cover everything you need to ship your first PR.

**Up to:** [↑ Appendix H](README.md) · **Companion:** [W.2 — Terminal fluency](../../belts/01-white/W02-terminal-fluency.md)
