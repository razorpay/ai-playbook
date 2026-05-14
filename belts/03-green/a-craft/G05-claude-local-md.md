---
title: "CLAUDE.local.md — personal overrides, and what belongs there"
slug: "belts/green/claude-local-md"
section: "belts"
status: "drafted"
type: "chapter"
track: "green"
order: 5
time_minutes: 10
audience: "experienced-builder"
outcome: "Use CLAUDE.local.md for personal overrides without polluting the team's shared CLAUDE.md."
prev: "belts/green/hierarchical-claude-md"
next: "belts/green/skills-overview"
pillar: "context"
belt: "green"
tags: ["green-belt", "claude-md", "personal-overrides"]
updated: "2026-04-29"
---

# G.5 — CLAUDE.local.md

A short chapter for a small but useful layer: `CLAUDE.local.md` is your personal addendum to a directory's CLAUDE.md. The agent reads it the same way it reads CLAUDE.md, but it is per-builder, gitignored, and lives only on your machine. Use it for the things you want the agent to know that nobody else needs to.

---

## If you're short on time

- `CLAUDE.local.md` lives next to `CLAUDE.md` in any directory and is gitignored. The agent reads both.
- Use it for personal preferences (verbosity, voice), per-builder secrets-shaped context (your sandbox repo, your local fixtures), and short-lived debugging notes.
- Do not use it to override team rules from CLAUDE.md. That is a CLAUDE.md change, not a local override.

---

## The mental model

```
   apps/reporting/
   ├── CLAUDE.md          ← team-shared, in git
   ├── CLAUDE.local.md    ← personal, gitignored
   └── ...
```

When the agent works in `apps/reporting/`, it reads both. The local file appends to the team file. The team file is unchanged on disk; only your sessions see your overrides.

This is the gitignored equivalent of the hierarchical pattern from G.4 — except instead of stratifying by directory, it stratifies by builder.

---

## What belongs in CLAUDE.local.md

**Per-builder repo context.** "My sandbox repo for HelloRazorpay PRs is `<path>` on this machine." The agent uses it when you say "open my sandbox PR." Saves you typing it every session.

**Verbosity preferences.** "When summarising changes, use four-line summaries; I prefer brevity over completeness." Personal taste; nobody else's session is affected.

**Working-mode notes.** "I am pairing with a teammate this week; their handle is X; if I say 'send to teammate,' I mean them." Short-lived, useful for the days it applies.

**Personal failure-mode reminders.** "I keep forgetting to check the read-replica rule on day-one PRs; flag if you see writes to the primary." This is a self-coaching aid that the agent enforces against your habits.

**Local fixture paths or test-data layout.** If your local dev DB has a different shape from the seeded fixtures, document it here so the agent does not get confused.

---

## What does NOT belong

**Team rules.** If you find yourself writing "use approach X here" in CLAUDE.local.md, ask whether the team should also use approach X. If yes, the rule belongs in CLAUDE.md, not the local file. If no, you are off-pattern from your team and the disagreement should be resolved in code review, not in a hidden file.

**Secrets.** Even though `CLAUDE.local.md` is gitignored, the agent reads its content into the context window where it can leak via skill responses, tool calls, or pasted summaries. Do not put credentials, tokens, or PII here. Ever.

**Long debugging logs.** If you are pasting test output into `CLAUDE.local.md` so the agent remembers it across sessions, you are using the wrong tool. Either commit it as a fixture, or attach it to a single session.

**Rules that contradict CLAUDE.md.** If your local file says "ignore the read-replica rule," you have two problems: the rule is wrong, or your behaviour is. Resolve at the policy level, not in a local override.

---

## Worked example

A reporting-service CLAUDE.local.md you might actually have on your machine:

```markdown
# CLAUDE.local.md — reporting-service (mine)

## My sandbox

- My sandbox repo for testing migrations: ~/work/reporting-sandbox
- My local DB has the Q1 2026 fixture loaded; full seed is at ~/work/fixtures/q1-2026.sql

## My voice

- I prefer four-line PR descriptions (not the eight-line standard).
- When summarising, lead with the diff and follow with the rationale.
- If I say "tighten this," I mean reduce noise, not strip detail.

## My known habits to flag

- I sometimes forget to run the migration runbook; flag if a migration
  PR doesn't reference the runbook step.
- I cannot keep IST and UTC straight after 6pm; double-check time zone
  conversions in evening sessions.
```

That is twenty lines. Personal, useful, harmless if it leaks (no secrets, no team policy), and the agent's behaviour in your sessions improves.

---

## Common failure modes

**Treating it as private CLAUDE.md.** Writing team rules here that should be team-visible. Fix: ask "does this rule apply to anyone but me?" If yes, it goes in CLAUDE.md.

**Putting secrets in.** The file is gitignored but not encrypted. Other tools on your machine, including agents, can read it. Fix: never.

**Letting it grow.** Local files have no review pressure. They become attics. Fix: a quarterly trim, same as CLAUDE.md.

**Forgetting it exists.** When something in your sessions feels off, check whether your `CLAUDE.local.md` is overriding a team rule unintentionally. Fix: keep the file short and visible.

---

## GREEN / YELLOW / RED self-check

- 🟢 GREEN — I have one short `CLAUDE.local.md` per service I work in, with personal overrides only and no secrets.
- 🟡 YELLOW — I have written one but it has team rules in it that should be in CLAUDE.md.
- 🔴 RED — I have not used `CLAUDE.local.md` and I do not know what would go in one.

---

## What you can say after this module

> "I use CLAUDE.local.md for personal overrides (voice, sandbox paths, self-coaching) without polluting the team's CLAUDE.md or leaking secrets."

---

## Where to go next

G.6 starts the Skills cluster. CLAUDE.md handles per-directory context; skills handle per-workflow context.

**Previous:** [← G.4 Hierarchical CLAUDE.md](G04-hierarchical-claude-md.md) · **Next:** [→ G.6 Skills overview](G06-skills-overview.md)
