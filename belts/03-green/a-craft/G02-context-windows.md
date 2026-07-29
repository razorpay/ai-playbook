---
title: "Why context windows fill — the single constraint everything else follows"
slug: "belts/green/context-windows"
section: "belts"
status: "drafted"
type: "chapter"
track: "green"
order: 2
updated: "2026-07-26"
time_minutes: 30
audience: "experienced-builder"
outcome: "Understand why context windows fill, protect the useful window, and choose when to continue, compact, or hand off to a fresh session."
prev: "belts/green/three-pillars"
next: "belts/green/claude-md-real-service"
pillar: "context"
belt: "green"
tags: ["green-belt", "context-windows", "constraint"]
---

# G.2 — Why context windows fill

Every other Green Belt module — CLAUDE.md design, skills authorship, subagent delegation, hierarchical context — is downstream of one constraint: **the agent has a finite context window, and the choices you make about what fills it determine the quality of every answer you get back.** Once you internalise this, the rest of the belt feels obvious.

---

## If you're short on time

- A context window is a fixed-size scratchpad the agent reads from while answering. As it fills, older detail may be compacted or receive less attention.
- Quality can drop before the technical limit. Relevant constraints compete with conversation history, broad file reads, logs, and tool output.
- Every CLAUDE.md, active skill body, connector pull, and "read this file" is a withdrawal from a budget you cannot top up inside the same session.

---

## The mental model

```
   ┌────────────────────────────────────────────┐
   │            CONTEXT WINDOW                   │
   │          (a fixed-size budget)              │
   │                                              │
   │  ┌──────────────────────────────────────┐  │
   │  │  System prompt + program plugin      │  │
   │  │  CLAUDE.md (root, package, local)    │  │
   │  │  Skill bodies (loaded on trigger)    │  │
   │  │  Files the agent has read            │  │
   │  │  Tool outputs (test runs, command    │  │
   │  │    output, MCP responses)            │  │
   │  │  Conversation history (your prompts  │  │
   │  │    and the agent's prior responses)  │  │
   │  └──────────────────────────────────────┘  │
   │                                              │
   │  When this fills, oldest content gets       │
   │  truncated or summarised silently.          │
   └────────────────────────────────────────────┘
```

The window is large but not infinite. Anthropic publishes the per-model size; what matters is not the number, but the realisation that *every* piece of information costs space, and the agent's attention degrades as the window fills.

The Green Belt habit: treat context like memory in a constrained system. Spend it on what compounds. Avoid spending it on what does not.

---

## What goes into the window

Roughly in order of how much you control it:

1. **System prompt.** Set by Claude Code and the program-pinned plugin. You do not edit this directly; it is the framing the agent always sees. Cost is fixed-per-session.
2. **CLAUDE.md.** Read on session start. Persists for the session. The single biggest lever you control. G.3 / G.4 / G.5 cover this.
3. **Skill bodies.** Loaded when a skill triggers. Some skills are large; an unused skill costs nothing, an active skill costs its body length.
4. **Files the agent has read.** Every file the agent opens to answer your question stays in the window for as long as it remains relevant.
5. **Tool outputs.** Command stdout, test output, MCP responses, browser screenshots. Often the largest single contributor; a verbose `pnpm install` log can fill more space than five chapters.
6. **Conversation history.** Your prompts and the agent's responses. Grows with every turn. The longest single contributor in a long session.

Each of these is a budget line. Optimising one without seeing the others is how Yellow Belt habits hit a ceiling.

---

## Why quality drops before the window is full

A model's published context capacity is a limit, not a guarantee that every included detail guides every answer equally. Two patterns matter:

- **Uneven attention.** Earlier details compete with newer instructions and may guide the response less reliably as the session grows.
- **Noise pressure.** A 200-line `npm install` log dilutes everything around it. The signal-to-noise ratio of the window matters more than the raw size.

The Green Belt habit is to budget for relevance, not maximum capacity. A smaller window filled with the right evidence beats a larger one filled with residue.

---

## Run a five-minute context audit

Context hygiene is a loop, not a heroic cleanup after the agent gets confused. Run this audit before a long research, analysis, or build step. You do not need an extra compression proxy to start.

### 1. Inspect the budget

Run `/context`. Sort what you see into three buckets:

- **Startup context:** system instructions, `CLAUDE.md`, enabled plugins, MCP tool definitions, and hooks.
- **Task inputs:** the brief, files, screenshots, data, and references needed for this outcome.
- **Session residue:** earlier turns, superseded plans, broad searches, logs, and tool output that helped before but does not help now.

Do not chase a magic utilisation percentage. Ask a better question: **does most of the available attention support the next decision?**

### 2. Remove waste at the source

Trim only what is irrelevant to the task:

- narrow broad file, log, or data reads to the fields and time range you need;
- move long, reusable procedures out of `CLAUDE.md` and into skills that load when invoked;
- temporarily disable unused plugins or MCP servers if their definitions dominate startup context;
- keep safety rules, acceptance criteria, and source links visible. Shorter is not better if it deletes the contract.

### 3. Choose the right reset

| Situation | Action |
|---|---|
| The goal is unchanged and the working context is focused | Continue. |
| The goal is unchanged, but old conversation and tool output dominate | Run `/compact` with a focus such as `Preserve the accepted scope, unresolved decisions, source links, and verification commands.` |
| The goal has changed, or the next phase needs a different evidence set | Write a handoff and start a fresh session. |

A useful handoff is short and inspectable:

```markdown
Goal:
Accepted decisions:
Evidence and artefact links:
Open questions:
Next action and success check:
```

### 4. Verify the reset

After compaction or a fresh session, run `/context` again. Ask the agent to restate the goal, constraints, unresolved decisions, and success check before it acts. If those changed, restore them from the source artefact rather than from memory.

> **Try it now (five minutes).** Open one active session, run `/context`, name the largest item in each bucket, remove one irrelevant source, then choose **continue**, **compact**, or **handoff**. Record the before/after observation in your work note. The point is a repeatable decision, not a heroic token-savings screenshot.

The `/context` and `/compact` commands are documented in [Claude Code's built-in commands](https://docs.anthropic.com/en/docs/claude-code/interactive-mode#built-in-commands). The lifecycle framing—architect, ingest, consolidate, and forget—comes from [Agentic Context Management](https://arxiv.org/abs/2607.21503v1). For a window-exhaustion error rather than routine hygiene, follow [Appendix D.14](../../../appendices/D-known-issues/README.md).

---

## The five-minute context checkpoint

Knowing that context is finite is not enough. Run this checkpoint when you finish a plan, switch from investigation to editing, or notice the agent repeating itself.

### 1. Inspect what matters

Ask the agent for a short inventory, grounded in the current repo state:

```text
Before the next step, inspect the current context.

Return only:
1. the objective we are still pursuing;
2. decisions and constraints that remain load-bearing;
3. files changed and tests run, verified from git and command output;
4. unresolved questions;
5. context that is now noise;
6. the single next action.

Separate verified state from assumptions. Do not edit anything.
```

Read the result. If a critical constraint is missing or wrong, do not continue on momentum. Re-read the source of truth and correct the checkpoint first.

### 2. Scope the next tool call

Keep the next fetch smaller than the question. Filter by file, time range, error code, or test name. Prefer quiet flags and a representative error over an entire log. For a large repo, inspect the directory map or search results before opening files in bulk.

The rule is simple: **reduce noise at the source before asking the model to summarise it.** A summary of 5,000 irrelevant lines is still a tax on the session.

### 3. Continue, compact, or restart

Use this decision table instead of dragging every session forward by default.

| Signal | Action | What to carry forward |
|---|---|---|
| Same objective; constraints are intact; most context is still relevant | **Continue** | The next action only |
| Same objective; history is noisy; your approved surface supports compaction | **Compact** | Save the checkpoint first, then verify the compacted summary preserved decisions, constraints, changed files, and test state |
| Objective changed; a core constraint was forgotten; tool output dominates the session | **Restart** | Open a fresh session with the checkpoint, then re-read the canonical files rather than trusting the summary alone |

Compaction is lossy by design. Treat its summary as a handoff draft, not a new source of truth. The repo, ticket, design, and test output remain authoritative.

### 4. Automate only after approval

Output-reduction layers can compress logs, tool responses, and conversation history before they reach the model. They can be useful, but a local proxy also sits on the data path. Do not install one from a demo or public repository by reflex. Confirm the approved setup, data handling, TLS path, and rollback with the platform and security owners first.

The durable skill is the checkpoint above. A compression tool may improve it; it does not replace it.

---

## Worked example

You are eight turns into a session about a payments flow. The conversation has read four files, run two test suites with verbose output, and called the design-system connector twice. You ask: "now also add the empty state for the cart screen."

The output uses an outdated component because the design-system connector's output from turn three has been pushed out of recent attention.

**Diagnosis.** Context pillar. The window is full of payment-flow context that is no longer load-bearing. The relevant design-system info is technically still there but no longer recent.

**Fix options, in order of cost.**

1. Cheapest: paste the relevant component name and prop signature back into the next prompt. Pulls it forward.
2. Cheap: ask the agent to re-read the design-system component before generating the empty state. Spends a tool call but refreshes attention.
3. Medium: start a fresh session with a small CLAUDE.md that says "this work uses the design-system connector; the canonical empty-state component is X."
4. Expensive: realise the cart-screen task is a different task and should live in a fresh worktree (G.9) with its own session.

The Yellow Belt move is option 1. The Green Belt move is to recognise the cost of staying in this session and pick option 3 or 4 deliberately.

---

## Common failure modes

**Treating the window as infinite.** A long, multi-day session ends up worse than a fresh ten-turn session because the window is bloated. Fix: start fresh sessions liberally.

**Pasting the same context every turn.** Ten turns of "remember, we use the design system" is ten copies in the window. Fix: commit it once to CLAUDE.md.

**Letting tool output flood the window.** A failed `pnpm install` with 800 lines of output ruins the next ten turns. Fix: summarise the failure, drop the rest, restart if needed.

**Loading every skill at session start.** Skills cost space when they trigger. Loading a dozen "just in case" wastes the budget. Fix: install broadly; trigger narrowly.

**Refusing to start a new session.** Sunk-cost fallacy. The session you have invested in is sometimes the session you should kill. Fix: a clean restart with a tight CLAUDE.md beats a polluted continuation almost every time.

---

## GREEN / YELLOW / RED self-check

- 🟢 GREEN: I can name what is currently filling my context window and decide whether to trim, summarise, or restart.
- 🟡 YELLOW — I know context windows are finite but rarely think about them mid-session.
- 🔴 RED — I treat the agent as if it has unlimited memory and am surprised when it "forgets."

---

## What you can say after this module

> "I think about my context window like a budget. Every CLAUDE.md, skill, file read, and tool call is a line item I am intentionally choosing to spend on."

---

## Where to go next

G.3 — *CLAUDE.md for a real service* — is the longest single chapter in Part A. It applies the budget rules from this module to the most leveraged single artefact in the agent's input.

**Previous:** [← G.1 Three Pillars](G01-three-pillars.md) · **Next:** [→ G.3 CLAUDE.md for a real service](G03-claude-md-real-service.md)

**Further reading**

- [Yellow Belt Y.4 — Context 101](../../02-yellow/Y04-context-101.md)
- [Anthropic on long-context engineering](https://docs.claude.com/en/docs/build-with-claude/prompt-engineering/long-context-tips)
- [Headroom](https://github.com/headroomlabs-ai/headroom) — one open-source example of output and context compression; evaluate against Razorpay's approved data path before use
