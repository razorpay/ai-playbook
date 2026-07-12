---
title: "The permission system"
slug: "belts/white/permission-system"
section: "belts"
status: "drafted"
type: "chapter"
track: "white"
order: 11
time_minutes: 15
audience: "new-builder"
outcome: "Respond safely to yes, no, and always-style permission prompts without handing control away."
prev: "belts/white/prompt-quality-101"
next: "belts/white/first-pr"
pillar: "harness"
belt: "white"
tags: ["white-belt", "permissions", "safety"]
updated: "2026-07-12"
---

# W.11 - The permission system

Permission prompts are not interruptions. They are the point where you remain the operator.

Claude Code may ask before reading a file, running a command, editing, or using a tool. White Belt teaches the simplest rule: approve small, understood actions; deny broad or surprising actions; avoid blanket approval.

---

## If you're short on time

- Say yes only when you understand the action, folder, and expected output.
- Say no when the action is broad, destructive, outside scope, or surprising.
- Use the 10-second test: **action, place, reason, rollback**. If you cannot name all four, ask Claude to explain before approving.
- Do not use always-approve as a White Belt default.

---

## The mental model

Every permission prompt asks:
```text
Should this assistant do this action, in this place, for this reason, right now — and can I undo it?
```

You need all five:

- **this action**: read, edit, run, search, install;
- **this place**: current repo, one file, one folder, outside repo;
- **this reason**: tied to your goal;
- **right now**: after plan and before action;
- **undo it**: `git diff`, a backup, or a clean way to stop.

If any part is unclear, ask Claude to explain before approving.

---

## Yes, no, always

| Choice | Use when | White Belt caution |
|---|---|---|
| Yes | The action is small and expected. | Read the command first. |
| No | The action is surprising or too broad. | Saying no is normal. |
| Always | Repeated low-risk action in a known scope. | Rare in White Belt. |

The risky option is not "no." The risky option is "always" when you are still learning the shape of the task.

Use this tiny decision loop:

1. **Safe yes:** "Read `README.md`" when your prompt named `README.md`.
2. **Ask first:** "Search the repo" when your prompt named one file or one folder.
3. **No:** "Install packages", "delete files", "force push", "change global config", or anything outside the repo unless the chapter explicitly asked for it.
4. **Always:** only for repeated low-risk reads in a known folder after you have seen the first request and understand why it repeats.

When in doubt, reply inside Claude Code with:

```text
Explain why this permission is needed, what exact files or commands it touches, and how I can undo it if it goes wrong.
```

---

## Worked example

Your prompt:

```text
Inspect README.md and propose one line to add. Do not edit.
```

Claude asks to read `README.md`. Approve. That matches the prompt.

Claude asks to search the whole repo. Maybe approve if the repo is tiny, but ask why first:

```text
Why do you need a whole-repo search for a README-only task?
```

Claude asks to run install commands. Deny. That does not match the prompt.

Claude asks to edit README.md after it has proposed the exact line and you approved the plan. Approve if you still want the edit.

### Mini-drill: what would you press?

Before reading the answers, decide: **yes**, **ask first**, or **no**.

| Prompt you gave | Permission Claude asks for | Best move |
|---|---|---|
| "Summarise this README." | Read `README.md`. | **Yes.** It matches the task exactly. |
| "Summarise this README." | Run `npm install`. | **No.** A summary does not need installs. |
| "Find where checkout copy lives." | Search the repo for `checkout`. | **Yes or ask first.** A repo search fits the task; ask first if the repo is huge or sensitive. |
| "Draft a safer wording for this section. Do not edit." | Edit the file directly. | **No.** Ask for the proposed wording first. |
| "Update the docs link in this repo." | Edit one markdown file, then run `git diff`. | **Yes.** Small scoped edit plus verification. |
| "Fix the failing test." | Run `rm -rf` or `sudo` command. | **No.** Destructive/elevated commands need a human-reviewed reason and usually belong outside White Belt. |

---

## Common failure modes

**"I clicked yes because I wanted to keep moving."** Slow down. Permission is where mistakes enter.

**"I clicked always and now Claude is doing a lot."** Stop the session if needed, then inspect `git status` and `git diff`.

**"Claude says it needs a broad permission to be efficient."** Ask for the smallest useful version. Efficient is good; unsupervised wandering is not.

**"I denied something and felt like I broke the flow."** You did not. Ask Claude to explain the action or propose a smaller one.

**"The command includes install, delete, force, or elevated authority."** Deny unless the official setup flow explicitly requires it and you understand the reason.

---

## GREEN / YELLOW / RED self-check

You are **GREEN** if:

- you can explain a permission prompt before approving;
- you deny actions outside scope;
- you avoid always-approve for unfamiliar tasks;
- you inspect `git diff` after edits.

You are **YELLOW** if:

- you approve read-only actions but hesitate on commands;
- you cannot tell whether a search is too broad;
- you accidentally approved one unexpected action and then stopped.

You are **RED** if:

- edits happened and you cannot identify them;
- commands ran outside the repo;
- you used blanket approval and lost track of actions.

---

## What you can say after this module

> "I can stay in control of Claude Code by treating permission prompts as review points."

---

**Previous:** [W.10 Prompt quality 101](W10-prompt-quality-101.md) - **Next:** [W.12 Your first PR](W12-first-pr.md)

