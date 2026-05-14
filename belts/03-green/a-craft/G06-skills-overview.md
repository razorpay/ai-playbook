---
title: "Skills — what they are, why they compound"
slug: "belts/green/skills-overview"
section: "belts"
status: "drafted"
type: "chapter"
track: "green"
order: 6
time_minutes: 25
audience: "experienced-builder"
outcome: "Recognise when a workflow has earned a place in the skills library and understand why skills are the second compound interest in AI productivity after CLAUDE.md."
prev: "belts/green/claude-local-md"
next: "belts/green/writing-your-first-skill"
pillar: "context"
belt: "green"
tags: ["green-belt", "skills", "compounding"]
updated: "2026-04-29"
---

# G.6 — Skills

CLAUDE.md is per-directory; skills are per-workflow. Where CLAUDE.md tells the agent the rules of a place, a skill tells the agent the recipe for a job. Both are forms of compounding context investment — write it once, get the value back across hundreds of sessions.

---

## If you're short on time

- A skill is a frozen workflow. A `SKILL.md` file with frontmatter that names the trigger and a body that names the job, the inputs, and the outputs.
- Skills compound: write a `pre-ship-check` once, every PR uses it, every Razorpay builder benefits.
- A clever prompt is not a skill. A repeatable workflow with named inputs, checks, and a useful output probably is.

---

## The mental model

```
   ┌──────────────────────────────────────────────┐
   │             A SKILL                           │
   ├──────────────────────────────────────────────┤
   │                                                │
   │  TRIGGER     →  When the agent should reach   │
   │                 for it. Phrases or context    │
   │                 patterns.                     │
   │                                                │
   │  BOUNDED JOB →  What it will do, and what    │
   │                 it explicitly will not do.   │
   │                                                │
   │  CONTEXT     →  What files, connectors, and  │
   │                 prior state it needs.        │
   │                                                │
   │  OUTPUT      →  The shape of what comes out. │
   │                                                │
   │  GUARDRAILS  →  Safety, review, rollback.    │
   │                                                │
   └──────────────────────────────────────────────┘
```

Skills are loaded when their trigger fires. An installed skill that never triggers costs nothing — the agent does not pay for skills it does not use. A triggered skill loads its body into the context window for the duration of the task.

This is the budget shape from G.2: skills give you on-demand context, not always-on context.

---

## Why skills compound

The same logic as CLAUDE.md but at a different layer:

- **You write it once.** A `pre-ship-check` skill takes 30 minutes to draft and review.
- **Every session that triggers it benefits.** Hundreds of PRs over months.
- **Other builders adopt it.** A skill written by one team that captures a real workflow gets installed by other teams; the value spreads without re-deriving.
- **It encodes judgement.** The skill is the codified version of "what would a senior reviewer notice." That judgement now travels with every PR, including ones the senior reviewer is not on.

This is the second compound-interest layer in AI productivity. CLAUDE.md compounds across sessions in one directory; skills compound across builders, teams, and surfaces.

---

## What counts as a skill

A skill earns a place in the library when it packages **repeatable judgement**. A good skill has:

1. **A clear trigger.** A phrase, a file pattern, or a moment in the workflow where reaching for it is obvious.
2. **A bounded job.** Specific outputs. Things it does not do are explicit.
3. **Context requirements.** Files it needs, connectors it depends on, repo state it assumes.
4. **An output shape.** The artefact it produces, named precisely. "A report" is not enough; "a markdown PR description with sections X, Y, Z" is.
5. **Guardrails.** Safety rules. Review expectations. Rollback paths if something goes wrong.
6. **A maintenance owner.** Skills go stale. Someone has to be on the hook for keeping them current.

Without all six, the workflow is too vague to package. Spend a session running it manually first; the gaps will become obvious.

---

## What does NOT count as a skill

The Skills Library appendix is precise about anti-patterns. Common cases:

- **A clever prompt.** "Write me a prompt that does X" is a prompt, not a skill. Skills package workflows; prompts package phrasing.
- **A workflow that has run twice.** Twice is too few. Wait for the third run; that is when the patterns show.
- **A workflow without a maintenance owner.** Unowned skills go stale fastest. If nobody is on the hook, the skill should not ship.
- **A workflow that just papers over a broken tool.** If a skill exists to compensate for an MCP that is misconfigured, fix the MCP. The skill is debt the next maintainer will not see.
- **A workflow that is mostly free-form synthesis.** If 80% of the work is reasoning the agent will do regardless, the skill saves little. Skills shine when the work has named, repeated structure.

---

## Where skills live in this program

The program ships skills through the program-pinned plugin (Compass). Three audiences worth distinguishing:

**The program library.** The named skills the program ships across the org: the verification skill, the pre-ship-check skill, the design-intel skill, the playbook-course skill, and so on. These have program-level maintenance and ship in a versioned bundle.

**Team libraries.** Skills a team writes for its own workflows. These do not need to be program-quality; they need to be team-quality. They live in the team's repo or a team-shared skill directory.

**Personal skills.** A skill you keep in your own working directory for things only you do. These do not need to ship; they need to work for you.

The boundary matters. A team skill might not pass program-library review, and that is fine. A program-library skill is held to a higher bar because every Razorpay builder pays for its presence in the loaded plugin.

---

## Worked example: the pre-ship-check skill (sketch)

The Razorpay program ships a `pre-ship-check` skill (referenced as a concept in Yellow Belt and Green Belt). At a sketch level:

- **Trigger.** The builder says "run pre-ship" or "check before review" or the agent recognises a `git diff --stat` plus an open branch state that looks PR-ready.
- **Bounded job.** Inspect the diff for design-system fit, prop and naming conventions, missing tests, console statements, large unrelated changes, and obvious safety-brief violations. Surface issues; do not auto-fix without permission.
- **Context.** The repo, the diff against the base branch, the design-system rules, the redline cards from Appendix H.
- **Output.** A categorised list (must-fix, should-fix, nice-to-have) with line references and a one-line rationale per item.
- **Guardrails.** Never opens a PR by itself. Never strips a comment without showing it. Never marks something must-fix without naming the rule it violates.
- **Maintenance.** The pre-ship workflow lead and the program-pinned plugin's reviewer rotation.

Reading this sketch gives you the shape of every program-library skill. G.7 walks the actual `SKILL.md` body for a smaller worked example you can draft yourself.

---

## How skills interact with CLAUDE.md

CLAUDE.md is always loaded; skills are on-demand. The two divide labour:

- **CLAUDE.md** carries rules that apply to *every* session in this directory. Read-replica rule. Currency in minor units. The design-system convention. These rules govern what the agent does *while* it works on anything here.
- **Skills** carry recipes for *specific* workflows. Pre-ship check. Skill authoring. Design-intel. These recipes activate when the named workflow starts.

A common shape error: putting a skill's content into CLAUDE.md. The result is every session pays for the recipe even when nobody invokes the workflow. The fix is to extract the workflow into a skill and remove it from CLAUDE.md.

---

## When to write a skill vs a CLAUDE.md rule

Quick rule of thumb:

| Property | CLAUDE.md | Skill |
|---|---|---|
| Always relevant in this directory | ✓ | |
| Triggered by a specific phrase or moment | | ✓ |
| Output is a constraint on every change | ✓ | |
| Output is a structured artefact (PR, review, list) | | ✓ |
| Reads only when it triggers | | ✓ |
| Reads on every session start | ✓ | |

If you find a candidate fits both columns, write it as a skill and reference the skill from CLAUDE.md. The skill body is loaded only when needed; the CLAUDE.md reference is a one-line cost.

---

## Common failure modes

**Skill bloat.** A team writes ten skills in a month, half are actually one-off scripts. Fix: hold the bar from G.6 and Appendix C: repeatable judgement, owned, fresh.

**Skill rot.** A skill written six months ago references a version of a connector that no longer exists. Fix: every skill has a freshness signal; quarterly review.

**Skills that argue with CLAUDE.md.** A skill says "use approach A" but the directory's CLAUDE.md says "use approach B." Confusion. Fix: agree at the policy level; the skill defers to CLAUDE.md or the rule moves into the skill explicitly.

**Skills as workarounds for missing tools.** "We don't have a way to get diff context, so this skill manually re-derives it." Fix the missing tool; do not paper over it.

**Skills with no off-switch.** A skill that always triggers becomes always-on context — the worst of both worlds. Fix: make the trigger narrow.

---

## GREEN / YELLOW / RED self-check

- 🟢 GREEN: I can name a workflow my team runs three or more times a month, decide whether it deserves a skill, and explain who would own it.
- 🟡 YELLOW — I understand skills in concept but treat them as "something other people write."
- 🔴 RED — I cannot tell the difference between a clever prompt and a skill.

---

## What you can say after this module

> "I know what makes a skill (repeatable judgement, named inputs and outputs, an owner) and I can decide whether a workflow earns one."

---

## Where to go next

G.7 — *Writing your first SKILL.md* — walks the actual file you will write. It is the second-longest chapter in Part A and is the prerequisite for Quest G-1.

**Previous:** [← G.5 CLAUDE.local.md](G05-claude-local-md.md) · **Next:** [→ G.7 Writing your first SKILL.md](G07-writing-your-first-skill.md)

**Further reading**

- [Appendix C — Skills Library](../../../appendices/C-skills-library/README.md)
- [Anthropic on skill authoring](https://code.claude.com/docs/en/best-practices)
