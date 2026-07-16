---
title: "Why context windows fill — the single constraint everything else follows"
slug: "belts/green/context-windows"
section: "belts"
status: "drafted"
type: "chapter"
track: "green"
order: 2
time_minutes: 20
audience: "experienced-builder"
outcome: "Internalise the context-window constraint and use it to make better decisions about what to load, what to summarise, and what to leave out."
prev: "belts/green/three-pillars"
next: "belts/green/claude-md-real-service"
pillar: "context"
belt: "green"
tags: ["green-belt", "context-windows", "constraint"]
updated: "2026-07-16"
---

# G.2 — Why context windows fill

Every other Green Belt module — CLAUDE.md design, skills authorship, subagent delegation, hierarchical context — is downstream of one constraint: **the agent has a finite context window, and the choices you make about what fills it determine the quality of every answer you get back.** Once you internalise this, the rest of the belt feels obvious.

---

## If you're short on time

- A context window is a fixed-size scratchpad the agent reads from while answering. Once it is full, older content gets pushed out.
- Quality drops well before the window is full. By the time you are at 80%, the agent is missing things it read at the start.
- Every CLAUDE.md, every skill, every connector pull, every "read this file" is a withdrawal from a budget you cannot top up.

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

The agent does not stop working when the window hits 99%. Quality drops well before, because attention is not uniform across the window. Two patterns matter:

- **Recency bias.** Recent content gets more attention. Older content gets less. By turn fifteen of a long session, the CLAUDE.md you read at turn one is still technically "in the window" but barely guiding the response.
- **Noise pressure.** A 200-line `npm install` log dilutes everything around it. The signal-to-noise ratio of the window matters more than the raw size.

The Green Belt habit is to treat the window as 50% useful, not 100% useful, and design for that.

---

## What this means for your habits

Six rules of thumb:

1. **Front-load constraints.** Important rules belong in CLAUDE.md or in the first few sentences of a prompt, not in a follow-up turn.
2. **Trim tool output.** When a command's output is verbose, ask the agent to summarise before continuing. Or run with quieter flags.
3. **Use skills to bundle context.** Skill bodies load on demand. A workflow you use weekly should be in a skill, not pasted into every prompt.
4. **Retire context that is no longer relevant.** When a file is no longer needed, stop referencing it; the agent will rotate it out of attention.
5. **Start fresh sessions for unrelated work.** A 90-turn session about authentication is the wrong place to start a styling task. New session, new window.
6. **Watch for "the agent forgot" moments.** The fix is rarely to remind it; the fix is usually to start a new session with a tighter CLAUDE.md.

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
