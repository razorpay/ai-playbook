---
title: "Subagents — when to delegate, how to pass intent cleanly"
slug: "belts/green/subagents"
section: "belts"
status: "drafted"
type: "chapter"
track: "green"
order: 8
time_minutes: 30
audience: "experienced-builder"
outcome: "Decide when a task is better delegated to a subagent than handled in the main session, and pass intent to that subagent without losing context."
prev: "belts/green/writing-your-first-skill"
next: "belts/green/worktrees"
pillar: "harness"
belt: "green"
tags: ["green-belt", "subagents", "delegation", "harness"]
updated: "2026-04-29"
---

# G.8 — Subagents

The main agent in a Claude Code session is a generalist. A subagent is a specialist you spin off to handle a bounded, focused task and report back. Used well, subagents protect the main session's context budget, parallelise focused work, and let you build composed workflows. Used poorly, they fragment your session and confuse you about which agent knows what.

---

## If you're short on time

- A subagent is a child agent the main agent spawns to do a focused task. The subagent has its own context window; only its result returns to the main session.
- Reach for a subagent when the task is bounded, when the context cost would be high in the main session, or when you want the result without the working notes.
- The most important sentence to learn is the prompt you pass to the subagent. It is a one-shot brief, not a conversation.

---

## The mental model

```
   ┌─────────────────────────────────────┐
   │           MAIN AGENT                 │
   │   (your live conversation)           │
   │                                       │
   │   needs a focused task done           │
   │           │                           │
   │           ▼                           │
   │   spawns ──> ┌────────────────────┐  │
   │              │     SUBAGENT        │  │
   │              │  (own context       │  │
   │              │   window, fresh)    │  │
   │              │                      │  │
   │              │  reads, reasons,    │  │
   │              │  returns one        │  │
   │              │  artefact           │  │
   │              └────────────────────┘  │
   │           ◀──── result               │
   │                                       │
   │   resumes with the result in hand    │
   └─────────────────────────────────────┘
```

The key property: the subagent's working notes do not pollute the main agent's context. Only the result returns. This is why subagents are a context-budget tool as much as a parallelism tool.

---

## When to reach for a subagent

Five named patterns where subagents earn their place.

### Pattern 1: A bounded, focused task with verbose intermediate work

You need to find every place a config flag is referenced across a 200-file repo. The agent will read many files, run greps, and assemble a list. If you do this in your main session, all of that reading fills your context. Spin off a subagent: it does the search, returns the list, your main session has only the list.

### Pattern 2: An independent verification step

You have written a change. You want a fresh perspective to review it without the bias of "I just wrote this." A subagent with no prior conversation context can read the diff and produce a review that the main agent could not.

### Pattern 3: A skill that is itself a small workflow

Some skills (the program's `pre-ship-check`, the `design-intel` skill, security review) are best implemented as subagents. The skill spawns a specialist, the specialist does the focused work, the result returns. The main session stays light.

### Pattern 4: Parallel branches of a larger plan

You have three sub-tasks that do not depend on each other. Three subagents in parallel finish faster than one main agent doing them sequentially. (Worktrees, in G.9, are the safer way to run agents in parallel against a repo; subagents are for parallelism within a single working directory.)

### Pattern 5: Costly synthesis you do not want to repeat

A subagent reads a long log, summarises the failure into three lines, returns the three lines. The main agent now has the summary, not the log. If you ever need the log again, you spawn a fresh subagent.

---

## When NOT to reach for a subagent

Three cases where the main agent is better.

**The task is conversational.** A subagent has no memory of your prior turns and no continuity of voice. If the task is "keep iterating with me on this design," stay in the main session.

**The task is small enough that the context cost is negligible.** Spawning a subagent has overhead: the brief, the result, the integration. For a five-second grep, just run it.

**You will need the subagent's working notes anyway.** If you would have to re-read the subagent's process to verify the result, the subagent did not save you anything. Stay in the main session.

---

## How to pass intent cleanly

The subagent is a one-shot brief. You write a single prompt; the subagent reads it, does the work, returns a result. Three rules for that prompt:

### Rule 1: Name the goal in one sentence

"Find every reference to the `LEGACY_BILLING_FLAG` config flag in this repo and produce a list of file paths and line numbers." That is one sentence. The subagent should not have to ask follow-up questions.

### Rule 2: Name the constraints in three or four bullets

- "Look only inside `apps/` and `packages/`."
- "Ignore matches in test files."
- "Skip matches inside JSDoc comments."

The subagent will not have your session's context. State what is not obvious.

### Rule 3: Name the output shape literally

"Return a Markdown table with columns: file path (relative to repo root), line number, surrounding context (one line above and below), confidence (whether the match is structural or accidental)."

A subagent told to "produce a list" will produce a list shaped however it likes. A subagent told the literal shape produces something the main agent can consume without reformatting.

---

## Worked example

Your main session is a payments-flow change. You want a security review of the diff. You spawn a subagent with this brief:

> Read the current branch's diff against `main`. Identify any pattern that violates the Razorpay redlines from Appendix H: specifically (1) any plaintext storage of secrets, (2) any logging of PII, (3) any unprotected money-handling code path, (4) any SQL that could be injection-vulnerable. For each finding: name the rule violated, the file and line, the specific risk in one sentence, and a suggested fix. If no findings, say so explicitly. Do not modify any code. Return Markdown with one section per finding.

That is a clean brief. The subagent reads the diff (its own context cost), produces a structured artefact, and returns it. Your main session sees only the findings, not the entire diff or the agent's working notes.

Compare to a bad brief:

> Can you check this for security issues?

The subagent has no goal definition, no constraint list, no output shape, no scope. It will produce something — but the something will be inconsistent across runs and probably miss the real issues.

---

## Subagent vs skill — when to do which

A common confusion in Green Belt: when does a focused task become a subagent versus a skill?

**Skill.** When the workflow is the same every time. Same trigger, same inputs, same output shape. The skill ships as a SKILL.md and runs against a registered trigger.

**Subagent.** When the work is task-specific and you need a one-shot specialist for *this* task. No skill exists, or no skill matches.

The two compose: a skill can spawn a subagent inside its workflow. The pre-ship-check skill in the program library is itself a skill that may spawn a subagent for the security-review portion. From the user's perspective, they ran one skill; from the architecture's perspective, the skill delegated.

---

## Common failure modes

**Vague briefs.** A subagent given a vague brief returns vague work. Fix: state goal, constraints, output shape literally.

**Subagent reads the user's main conversation by accident.** The subagent should start fresh. If your harness leaks main-session context into the subagent, you lose the budget benefit. Fix: confirm your subagent invocation pattern starts with a clean context.

**Treating subagents as parallelism only.** They are also a context-budget tool. The main agent stays light because the subagent's working notes never return.

**Spawning subagents for tasks that are conversational.** The result comes back coherent but disconnected from where the conversation was going. Fix: stay in the main session for conversational work.

**Subagent results that the main agent cannot consume.** A subagent that returns a 4,000-word essay is not useful. Constrain the output shape so the result is small and structured.

---

## GREEN / YELLOW / RED self-check

- 🟢 GREEN: I can decide whether to delegate a task to a subagent in under a minute, write the brief in three bullets, and consume the result without re-doing the work.
- 🟡 YELLOW — I have used subagents but my briefs are sometimes too vague.
- 🔴 RED — I have not used subagents and do not know when I would.

---

## What you can say after this module

> "I delegate bounded, focused tasks to subagents with clean briefs and consume their structured results without polluting my main session's context."

---

## Where to go next

G.9 (*Worktrees*) covers the parallelism pattern when you want multiple full-blown Claude Code sessions running against the same repo at the same time. Subagents share a working directory; worktrees give each agent its own.

**Previous:** [← G.7 Writing your first SKILL.md](G07-writing-your-first-skill.md) · **Next:** [→ G.9 Worktrees](G09-worktrees.md)

**Further reading**

- [Anthropic on subagent patterns](https://code.claude.com/docs/en/best-practices)
- [Appendix N.5 — Three pillars (the harness pillar in depth)](../../../appendices/N-methodologies/N5-three-pillars.md)
