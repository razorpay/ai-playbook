---
title: "Template: CLAUDE.local.md"
slug: "appendices/templates/claude-local-md"
section: "appendices"
status: "drafted"
type: "template"
track: "templates"
order: 3
time_minutes: 3
audience: "engineer"
outcome: "Add a personal, gitignored CLAUDE.local.md with overrides and personal preferences that should not enter the shared CLAUDE.md."
prev: "appendices/templates/claude-md-monorepo"
next: "appendices/templates/skill-md-minimum"
pillar: "context"
belt: null
tags: ["template", "claude-md", "local"]
updated: "2026-05-08"
---

# Template: CLAUDE.local.md

## What this template is for

A personal-overrides file for Claude Code that supplements the shared CLAUDE.md. CLAUDE.local.md is gitignored. It carries personal preferences, machine-specific paths, and conventions that the rest of the team has not committed to.

The file is short by design. Anything that other team members would benefit from belongs in the shared CLAUDE.md, not here. Anything that would confuse Claude when running on a teammate's machine belongs here, not in the shared CLAUDE.md.

The discipline is covered in [G.5 — CLAUDE.local.md](../../belts/03-green/a-craft/G05-claude-local-md.md).

## How to use it

1. Copy the template body below into a `CLAUDE.local.md` file at the root of your repository (or in the package directory if you are working in a monorepo).
2. Add `CLAUDE.local.md` to your `.gitignore` if it is not already there. (Most templates and starter repos do this by default.)
3. Replace the placeholders with your content.
4. Do not commit it. Ever.

Target length: 20 to 60 lines. If your CLAUDE.local.md is approaching 100 lines, reconsider whether some of the content should be promoted to the shared CLAUDE.md.

---

## Template body

```markdown
# CLAUDE.local.md

<!-- DELETE: This file is gitignored. It carries my personal Claude Code
     conventions and machine-specific overrides. Do not commit. -->

## My preferences for this repo

<!-- replace this with personal preferences that affect how Claude works
     in this repo specifically. Examples:
     - When showing diffs, prefer the unified format with three lines of
       context.
     - When suggesting commit messages, use the imperative mood ("Add
       endpoint" not "Added endpoint").
     - When running tests, run only the affected package; the full suite
       takes too long for my iteration cadence. -->

## Machine-specific paths

<!-- replace this with paths that exist on my machine but not on
     teammates'. Examples:
     - My local Postgres is at /Users/me/postgres-data; reset commands
       should use this path.
     - The local secrets file is at ~/.config/repo-name/secrets.env. -->

## Personal scratchpad

<!-- replace this with notes-to-self that you want Claude to remember
     across sessions for this repo. Examples:
     - I am currently debugging the webhook flakiness in feature/foo;
     when I ask about webhooks, this is the context.
     - I prefer to write test cases before implementation in this repo. -->

## What does not go here

<!-- DELETE: For reference. The following belong in the shared
     CLAUDE.md, not here:
     - Team conventions
     - The repo's actual structure
     - Gotchas other team members will hit
     If you find yourself adding any of those here, promote them. -->
```

---

## Worked example

A populated CLAUDE.local.md for an engineer working in a typical monorepo.

```markdown
# CLAUDE.local.md

## My preferences for this repo

- When showing diffs, prefer the unified format with five lines of context.
- When suggesting commit messages, use the imperative mood and keep them under 72 characters.
- When running tests, default to the affected package only (pnpm --filter <package> test). The full monorepo test suite takes 8 minutes; I run it before pushing.
- When I ask for a code review, use the structured format with "blockers", "suggestions", and "questions" sections.

## Machine-specific paths

- Local Postgres data lives at /Users/me/dev/postgres-data. Reset scripts should use this path.
- Local secrets are in ~/.config/platform-monorepo/secrets.env, not in any of the .env files in the repo.
- My personal Claude Code config is at ~/.config/claude-code/ (different from the team-shared one).

## Personal scratchpad

- I am working on feature/billing-refactor this week. Treat any billing/ changes in this scope.
- I prefer to write Playwright tests before implementing new endpoints in api/.
- The new identity/ tests are flaky on my machine; if they fail in unrelated PRs, suggest re-running rather than digging in.
```

This populated example is around 25 lines. CLAUDE.local.md is meant to be small and personal; if yours is growing, the growth is signal that the team's shared CLAUDE.md needs updating instead.

---

## What this template is not

**Not a substitute for the shared CLAUDE.md.** Anything that affects teammates belongs in the shared CLAUDE.md.

**Not a permanent record.** CLAUDE.local.md is meant to drift. As your work shifts, the personal scratchpad changes; as your machine changes, the paths change. Treat it as a rolling document, not a careful artefact.

**Not version-controlled.** Putting CLAUDE.local.md in version control defeats the purpose. Always confirm it is in `.gitignore` before adding content.

**Not a place for secrets.** Even though the file is gitignored, treat secrets the same way you would in any other file: do not put credentials, tokens, or passwords here. Reference paths to where they live elsewhere.

---

**Previous:** [← CLAUDE.md monorepo template](CLAUDE-md-monorepo.md) · **Next:** [→ SKILL.md minimum template](SKILL-md-minimum.md)
