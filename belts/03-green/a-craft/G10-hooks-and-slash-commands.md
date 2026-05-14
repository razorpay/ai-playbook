---
title: "Hooks + slash commands — when to automate the pre-flight"
slug: "belts/green/hooks-and-slash-commands"
section: "belts"
status: "drafted"
type: "chapter"
track: "green"
order: 10
time_minutes: 30
audience: "experienced-builder"
outcome: "Use hooks to enforce pre-flight checks automatically, and slash commands to give yourself reliable shortcuts; know which is the right shape for which job."
prev: "belts/green/worktrees"
next: "belts/green/advanced-prompting"
pillar: "harness"
belt: "green"
tags: ["green-belt", "hooks", "slash-commands", "automation", "harness"]
updated: "2026-04-29"
---

# G.10 — Hooks + slash commands

A hook is automation that fires at a specific lifecycle moment (pre-commit, pre-PR, post-tool-call) without the user asking for it. A slash command is a typed shortcut that triggers a named workflow when the user does ask for it. Both extend the harness; together they let your team encode discipline that survives "I forgot."

---

## If you're short on time

- **Hook:** automatic, fires on a lifecycle event, runs whether you remember or not. Use to enforce things you cannot afford to forget.
- **Slash command:** manual, triggered by the user typing `/<name>`, runs only when invoked. Use to give yourself reliable shortcuts to skills or workflows.
- The right tool is rarely both. A pre-commit secret-scan is a hook. A "draft my PR description" is a slash command.

---

## The mental model

```
   ┌────────────────────────────────────────────────┐
   │              CLAUDE CODE SESSION                │
   ├────────────────────────────────────────────────┤
   │                                                  │
   │   Lifecycle events (file edit, tool use,        │
   │   pre-commit, pre-PR, end-of-turn) ─────┐       │
   │                                          │       │
   │   User types `/<name>` ─────────────┐    │       │
   │                                      │    │       │
   │                                      ▼    ▼       │
   │                              ┌──────────────────┐ │
   │                              │   HOOK / SLASH   │ │
   │                              │     COMMAND      │ │
   │                              │   runs script    │ │
   │                              │   or skill       │ │
   │                              └──────────────────┘ │
   │                                      │            │
   │                              result returns to   │
   │                              the session         │
   └────────────────────────────────────────────────┘
```

Hooks are reactive; slash commands are imperative. Hooks subscribe to lifecycle events and fire automatically. Slash commands are buttons the user presses.

---

## Hooks — when to use one

A hook earns its place when its job is "always do this, regardless of whether anyone remembers." Examples:

- **Secret scanning before commit.** A pre-commit hook scans staged files for tokens, credentials, or known-shape secrets and refuses the commit if any are found. The cost of forgetting is data loss; a hook removes the possibility.
- **Format-on-save or format-on-commit.** Standard formatting applied automatically so reviews focus on logic, not whitespace.
- **Lint-before-PR.** A pre-PR hook runs the project's lint and refuses to open a PR with errors. Catches mistakes the human would have caught later, faster.
- **Pre-ship-check on PR creation.** The program-pinned `pre-ship-check` skill (referenced in G.6) can be wired as a hook that fires when a builder is about to open a PR. Surfaces issues before review burns reviewer time.
- **Post-test summarisation.** When the agent runs the test suite and the output is verbose, a post-test hook summarises into three lines and drops the rest. Protects the context window per G.2.

The hook layer is where team discipline becomes infrastructure. A team rule like "we always run the pre-ship-check before opening a PR" becomes "we *cannot* open a PR without running it." Discipline that does not depend on memory is the most reliable discipline.

---

## Slash commands — when to use one

A slash command earns its place when the workflow has a clear name and the user wants to invoke it on demand. Examples:

- **`/setup-verify`** — runs the program's verification skill and prints the GREEN / YELLOW / RED status.
- **`/pre-ship-check`** — explicitly runs the pre-ship-check skill before the user opens a PR (the same skill the hook would run automatically; the slash command is the manual lever).
- **`/draft-pr-description`** — invokes a team skill that drafts a PR body in the team's tone for the current branch.
- **`/find-bug-context`**: invokes a triage workflow that pulls git history, related Slack threads via the connector, and any open ticket via the ticketing connector for a named symptom.
- **`/start-the-playbook`** — the playbook-course skill from v0.8 has trigger phrases; some teams wire `/start-the-playbook` as a slash-command shortcut to one of those phrases.

A slash command is a name the user can remember. If your team writes a custom skill, give it a slash command shortcut so muscle memory finds it.

---

## When the same job is both

Sometimes a workflow benefits from both. The pre-ship-check pattern:

- as a **hook** firing on PR creation: catches the case where the builder forgot;
- as a **slash command** the builder can invoke earlier: catches issues during the build, before the PR creation moment.

Same skill, two surfaces. The hook makes it impossible to forget; the slash command makes it convenient to use early. Run them together and the workflow stops being something the team has to remember.

---

## Worked example: a pre-commit secret-scan hook

The shape, in plain English:

```
Trigger: pre-commit
Condition: any staged file contains content matching the secret pattern set
  (token-shape strings, env-style key=value with sensitive keys, etc.)
Behaviour:
  1. Print the matching file and line.
  2. Refuse the commit.
  3. Print the next-step ("remove the secret, or use the approved
     secrets store, or use --no-verify only if the apparent
     match is a false positive — and document it in the commit
     message").
```

The hook ships in the program-pinned plugin. A team installs the plugin, and every commit they make is scanned. If a builder bypasses with `--no-verify`, that is logged in the commit metadata for review. The team has not asked anyone to remember; the discipline is structural.

---

## Worked example: a `/draft-pr-description` slash command

The shape:

```
Slash command: /draft-pr-description
Effect: invoke the team skill `pr-description-drafter` against the
  current branch. The skill reads the diff, the related ticket
  (via the ticketing connector), and the team's tone conventions
  from CLAUDE.md. It returns a Markdown PR body.
Behaviour: print the draft. Do not post. Wait for the user to copy
  and edit.
```

Builders type `/draft-pr-description` after the change is ready. The skill produces a draft in the team's voice. The builder edits and posts. The discipline is a name they remember; the muscle memory finds it.

---

## Naming discipline

Slash commands collide. The first ones loaded in a Claude Code session win; later ones are shadowed silently. Two rules.

**Use program-prefixed names for shared commands.** A program-pinned slash command should namespace itself if the program has many: `/playbook-start`, `/playbook-progress`. Generic `/start` collides with anyone else's `/start`.

**Keep team-local commands short and specific.** A team's command for drafting PR descriptions should be specific enough to not collide and short enough to type. `/pr-draft` beats `/teammate-pr-description-helper-v2`.

The skill name registry in the program-pinned plugin tracks active slash commands; check before inventing a new one.

---

## Hook discipline

Hooks fire whether the user wants them to or not. Two rules.

**A hook should be fast.** A hook that takes thirty seconds to run on every commit teaches builders to bypass it. Hooks that gate critical things (secrets, lint) need to be measured in seconds, not tens of seconds.

**A hook should never silently change the result.** If the hook reformats files, the user should see the change. If the hook refuses a commit, the user should see why. Silent mutation is how teams lose trust in their tools.

A hook that fails noisily is salvageable; a hook that silently changes things is not.

---

## Composability

Hooks and slash commands compose with skills (G.6 / G.7) and with subagents (G.8). The shapes:

- a hook fires → invokes a skill → the skill spawns a subagent for the actual work → the result returns;
- a slash command fires → invokes a skill → the skill produces an artefact → printed to chat.

This is how the program-pinned plugin builds large workflows out of small parts. You do not need to write a hook that does everything itself; you write a hook that invokes a skill, and the skill does the work. Same for slash commands.

---

## Common failure modes

**A slow hook.** Builders bypass it; the discipline becomes optional. Fix: profile, optimise, cap the time budget. If the work cannot be done quickly, it is probably better as a slash command the user invokes when ready.

**A silent hook.** A formatter that runs invisibly on commit and the user does not realise their code was changed. Fix: hooks should always print what they did.

**A name collision.** Two skills both register `/check`. The second one shadows the first; the user never sees it loaded. Fix: prefix names; check the registry.

**A hook that runs in CI as if it were local.** The pre-commit hook runs on the developer's machine, not in CI. CI runs its own checks. Conflating the two is a failure of layering. Fix: keep concerns separate.

**Hooks that bypass review.** A hook should never commit, push, post, or send. Surface, refuse, route — but the human action is human-only.

**Slash commands for things that should be hooks.** "Don't forget to run `/lint-before-pr`" is a workflow that depends on memory. Fix: make it a hook so memory is not required.

---

## GREEN / YELLOW / RED self-check

- 🟢 GREEN — I can pick the right shape (hook vs slash command) for a workflow in under a minute and explain the reasoning.
- 🟡 YELLOW — I understand the difference but my team has at least one workflow that should be a hook but is a slash command, or vice versa.
- 🔴 RED — I have not used either and could not name one I would write.

---

## What you can say after this module

> "I use hooks to enforce things I cannot afford to forget, and slash commands to give myself shortcuts to named workflows. I know which shape is right for which job."

---

## Where to go next

G.11 (*Advanced prompting*) is the Prompt-pillar capstone of Part A. After eight Context and Harness chapters, we close the loop with the prompt craft that builds team-velocity-grade habits.

**Previous:** [← G.9 Worktrees](G09-worktrees.md) · **Next:** [→ G.11 Advanced prompting](G11-advanced-prompting.md)

**Further reading**

- [Anthropic on hooks and slash commands](https://code.claude.com/docs/en/best-practices)
- [Yellow Belt Y.7: Permissions, hooks, slash commands](../../02-yellow/Y07-permissions-and-hooks.md) — the introduction this chapter builds on
