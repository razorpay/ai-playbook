---
title: "Terminal fluency"
slug: "belts/white/terminal-fluency"
section: "belts"
status: "drafted"
type: "chapter"
track: "white"
order: 2
time_minutes: 30
audience: "new-builder"
outcome: "Use the small set of Terminal commands and shortcuts needed for setup, git, and Claude Code."
prev: "belts/white/file-system"
next: "belts/white/git-as-savepoints"
pillar: "harness"
belt: "white"
tags: ["white-belt", "terminal", "harness"]
updated: "2026-04-27"
---

# W.2 - Terminal fluency

Terminal is a text interface to your machine. That sounds grand. In White Belt, it mostly means: type a command, press Return, read the output, decide the next step.

You do not need to become a shell expert. You need a small command vocabulary and a calm habit of checking your location before action.

---

## If you're short on time

- Terminal is a conversation with your computer: command in, output out.
- The White Belt command set is small: `pwd`, `ls`, `cd`, `mkdir`, `touch`, `cat`, `less`, `cp`, `mv`, `git`, `npm`, and `claude`.
- The most useful shortcuts are Tab completion, Up arrow history, Control-C to stop, and Control-L to clear the screen.

---

## The mental model

Terminal is not "the dangerous app." It is a harness.

A harness does three things:

1. **Runs repeatable actions.** A setup script works because commands can be repeated.
2. **Shows exact output.** Error messages are text you can share and search.
3. **Connects tools.** Git, Node, package managers, and Claude Code all meet here.

The danger comes from running commands you do not understand in folders you have not checked. White Belt prevents that with a simple rhythm:

```text
Where am I?  -> pwd
What is here? -> ls
What do I want? -> one command
What happened? -> read output
```

---

## The 12 commands

| Command | Use it for | Safe beginner example |
|---|---|---|
| `pwd` | Print current folder | `pwd` |
| `ls` | List files | `ls` |
| `cd` | Change folder | `cd project-name` |
| `mkdir` | Make folder | `mkdir notes` |
| `touch` | Make empty file | `touch notes.md` |
| `cat` | Print small file | `cat README.md` |
| `less` | Read long file | `less README.md` |
| `cp` | Copy file | `cp README.md README-copy.md` |
| `mv` | Move or rename | `mv old.md new.md` |
| `git` | Version control | `git status` |
| `npm` / `pnpm` | Project tooling | `npm run build` |
| `claude` | Claude Code | `claude` |

Two cautions:

- `rm` deletes. You will see it in the real world, but it is not a White Belt habit.
- `sudo` asks for elevated authority. Do not use it unless the official setup flow requires it and you know why.

---

## The 4 shortcuts

| Shortcut | What it does | Why it matters |
|---|---|---|
| Tab | Completes file and folder names | Prevents spelling mistakes. |
| Up arrow | Brings back the previous command | Lets you edit instead of retyping. |
| Control-C | Stops a running command | Your emergency brake. |
| Control-L | Clears the screen | Gives you a clean visual reset. |

If a command appears to hang, do not close the whole app immediately. Press Control-C once, wait, then decide.

---

## Worked example

Run this in a practice folder:

```bash
pwd
mkdir terminal-practice
cd terminal-practice
touch README.md
ls
cat README.md
```

Now rename the file:

```bash
mv README.md NOTES.md
ls
```

Copy it:

```bash
cp NOTES.md NOTES-copy.md
ls
```

Read it with `less`:

```bash
less NOTES.md
```

Press `q` to quit `less`.

Now practice history. Press Up arrow. The previous command appears. Do not run it yet. Press Control-L to clear the screen. Run:

```bash
pwd
ls
```

That is Terminal fluency at White Belt: move, inspect, read, pause.

---

## Common failure modes

**"The command is not found."** The tool may not be installed, or your shell cannot see it. Do not improvise install commands. The setup modules handle this.

**"The prompt changed and I do not know what it wants."** Some commands open interactive modes. Try `q`, Escape, or Control-C. Then ask Claude Code or a mentor what mode you entered.

**"I pasted multiple commands and one failed in the middle."** Copy one command at a time while learning. Multi-line pastes are for people who can recover from the third line failing.

**"The output is huge."** Use `less` for reading, or ask Claude to summarize the command output after you copy the relevant section.

**"I ran the command in the wrong folder."** Stop. Run `git status` if you are in a repo. If files changed, do not delete. Ask for help with the exact output.

---

## GREEN / YELLOW / RED self-check

You are **GREEN** if you can:

- run the worked example without help;
- explain what Tab, Up arrow, Control-C, and Control-L do;
- run `git status` in a repo and recognize whether files changed;
- stop before using `sudo` or deletion commands.

You are **YELLOW** if:

- commands work but the outputs blur together;
- you cannot tell when a command is still running;
- `code`, `claude`, `npm`, or `pnpm` is missing.

You are **RED** if:

- Terminal commands consistently fail;
- you cannot recover from an interactive screen;
- you are tempted to paste unknown setup commands from chat.

For YELLOW or RED, capture the exact command and output. That text is the fastest route to help.

---

## What you can say after this module

> "I can use Terminal as a calm, repeatable harness instead of a mystery box."

---

**Previous:** [W.1 The File System](W01-file-system.md) - **Next:** [W.3 Git as save-points](W03-git-as-savepoints.md)

