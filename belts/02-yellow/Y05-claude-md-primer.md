---
title: "CLAUDE.md primer"
slug: "belts/yellow/claude-md-primer"
section: "belts"
status: "drafted"
type: "chapter"
track: "yellow"
order: 5
time_minutes: 25
audience: "daily-builder"
outcome: "Understand CLAUDE.md as a project rule book and know what belongs in it."
prev: "belts/yellow/context-101"
next: "belts/yellow/reading-code"
pillar: "context"
belt: "yellow"
tags: ["yellow-belt", "claude-md", "context"]
updated: "2026-04-27"
---

# Y.5 - CLAUDE.md primer

`CLAUDE.md` is a project rule book for Claude Code. It tells the assistant how this repo works, what commands are safe, what conventions matter, and where to look first. Yellow Belt builders do not need to author a perfect one. They need to read it, respect it, and know when it is missing.

---

## If you're short on time

- Read `CLAUDE.md` before asking Claude to make repo changes.
- Good project guidance names commands, conventions, safety rules, and ownership boundaries.
- If a repo has no `CLAUDE.md`, ask Claude to infer carefully and propose a draft note, not to invent rules.

---

## The mental model

```text
README.md   -> teaches humans what the repo is
CLAUDE.md   -> teaches the assistant how to work in the repo
package.json -> tells tools what commands exist
CODEOWNERS  -> tells reviewers who owns paths
```

These files work together. Claude should not guess a test command if the repo already documents one.

---

## What belongs in CLAUDE.md

Useful sections:

- repo purpose;
- common commands;
- test commands;
- lint or format commands;
- folders that matter;
- generated files to avoid;
- review expectations;
- safety constraints;
- known sharp edges.

Bad sections:

- private credentials;
- personal preferences with no repo value;
- stale workarounds;
- giant architecture essays;
- "always do everything" instructions.

`CLAUDE.md` should make the next action safer, not make the assistant read a novel.

---

## Worked example: reading project guidance

In a repo, ask:

```text
Read CLAUDE.md and README.md if they exist.
Do not edit.
Summarize:
1. what this repo is for;
2. the safe commands I can run;
3. files or folders I should avoid touching;
4. what is missing from the guidance.
```

If there is no `CLAUDE.md`, ask:

```text
There is no CLAUDE.md. Inspect README.md, package metadata, and file tree only.
Do not edit.
Propose a short draft of what CLAUDE.md should probably contain, clearly marking inference.
```

This gives you value without pretending inferred rules are official.

---

## Good project guidance shape

```markdown
# CLAUDE.md

## Repo purpose
Short description of the surface or service.

## Common commands
- Install:
- Build:
- Test:
- Lint:

## Editing rules
- Prefer existing components.
- Do not edit generated files.
- Keep PRs small.

## Review notes
- Include screenshots for visual changes.
- Tag the owning team for these paths.

## Known issues
- Local setup note:
- Flaky test note:
```

That is enough for Yellow Belt. Green Belt will teach deeper hierarchy and maintenance.

---

## Common failure modes

**"The repo has stale instructions."** Compare `CLAUDE.md`, README, and actual package scripts. Ask for evidence before following stale commands.

**"Claude ignored the file."** Explicitly tell it to read and follow project guidance first.

**"The guidance says to run an expensive command."** Ask whether there is a narrower command for your change.

**"I want to add a rule because I prefer it."** Project guidance is not a preference dump. Add rules that help future agents avoid real mistakes.

**"No CLAUDE.md exists, so anything goes."** No. Use README, file tree, package scripts, and ask for a cautious plan.

---

## GREEN / YELLOW / RED self-check

You are **GREEN** if:

- you can find and read project guidance;
- you can summarize safe commands;
- you can identify generated files or risky folders;
- you can ask Claude to mark inference separately.

You are **YELLOW** if:

- guidance exists but conflicts with README;
- test commands are unclear;
- you cannot tell whether a file is generated.

You are **RED** if:

- guidance includes private material;
- Claude wants to edit without reading repo rules;
- you are about to change repo-wide conventions.

---

## What you can say after this module

> "I can use CLAUDE.md as the assistant's repo rule book instead of making every session start cold."

---

**Previous:** [Y.4 What Claude can see](Y04-context-101.md) - **Next:** [Y.6 Reading unfamiliar code](Y06-reading-code.md)

