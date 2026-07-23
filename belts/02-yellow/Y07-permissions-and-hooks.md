---
title: "Permissions, hooks, slash commands"
slug: "belts/yellow/permissions-and-hooks"
section: "belts"
status: "drafted"
type: "chapter"
track: "yellow"
order: 7
time_minutes: 20
audience: "daily-builder"
outcome: "Use permissions, hooks, and slash commands as daily safety rails instead of speed hacks."
prev: "belts/yellow/reading-code"
next: "belts/yellow/litellm-and-enterprise"
pillar: "harness"
belt: "yellow"
tags: ["yellow-belt", "permissions", "hooks", "slash-commands"]
updated: "2026-07-23"
---

# Y.7 - Permissions, hooks, slash commands

White Belt taught you not to click yes blindly. Yellow Belt adds the daily harness: permissions, hooks, and slash commands. These are not decorations. They are how repeated AI work stays safe when you are moving faster.

---

## If you're short on time

- Permissions decide what the assistant can do right now.
- Hooks run repeatable checks at known moments.
- Slash commands package approved workflows so you do not rebuild them from memory.

---

## The mental model

```text
Permission = should this action happen?
Hook       = what check should run at this moment?
Slash      = what approved workflow should I invoke?
```

You can ship without fancy automation. But once you work daily, repeated manual checks become easy to skip. Harness turns those checks into a path.

---

## Permissions: the live gate

Approve when:

- the action matches your prompt;
- the file or command is expected;
- the result is reviewable;
- the scope is small.

Deny when:

- the command is broad;
- the action touches unrelated files;
- the assistant asks for elevated authority;
- the task has drifted;
- you cannot explain why the action is needed.

Prompt:

```text
Before asking for permission, explain why this action is needed and what output you expect.
```

---

## Hooks: the repeated checks

Hooks are useful when a check should run predictably:

- before a PR is opened;
- after a file edit;
- before running a risky command;
- after tests fail;
- when a branch has unexpected files changed.

Yellow Belt readers are not expected to author complex hooks. You should know what a hook is doing when one fires.

Good hook behaviour:

```text
Changed files include generated output. Confirm before proceeding.
```

Bad hook behaviour:

```text
Silently rewrites half the repo.
```

If a hook surprises you, stop and inspect.

---

## Slash commands: packaged workflows

Slash commands are shortcuts for known workflows. Examples:

- orient in repo;
- run a pre-PR sanity pass;
- summarize branch state;
- prepare a PR description;
- run a design compliance check.

Use them when the workflow is established. Do not use them to avoid understanding. A slash command should make the right path faster, not make the wrong path invisible.

---

## Worked example: pre-PR flow

Before opening a PR, run the approved pre-PR workflow if available:

```text
/pre-pr-sanity
```

Expected output shape:

```text
Branch: yellow/fix-empty-state
Changed files: 2
Generated files: none
Tests run: targeted check passed
Risk notes: visual copy change, screenshot recommended
PR description draft: ready
```

If the command reports unrelated files, stop and inspect before pushing.

---

## Common failure modes

**"I used a slash command without reading the output."** The command is not magic. The output is the review point.

**"A hook failed and I bypassed it."** First understand the failure. Hooks exist because someone saw the mistake repeat.

**"Permission prompts became background noise."** Slow down. That is the moment to reset.

**"Automation edited something surprising."** Use `git status` and `git diff` immediately.

---

## GREEN / YELLOW / RED self-check

You are **GREEN** if:

- you can explain permission, hook, and slash command in one sentence each;
- you read workflow output before continuing;
- you inspect diffs after automated actions;
- you deny surprising actions.

You are **YELLOW** if:

- hooks fire but you do not know why;
- slash commands feel useful but opaque;
- you approve commands from habit.

You are **RED** if:

- automation changed files you cannot explain;
- you bypass failed checks;
- you use always-approve while unfamiliar with the workflow.

---

## What you can say after this module

> "I can use the daily safety harness without surrendering judgement to it."

---

**Previous:** [Y.6 Reading unfamiliar code](Y06-reading-code.md) - **Next:** [Y.8 LiteLLM and Claude workspace access](Y08-litellm-and-enterprise.md)

