---
title: "When to reach for which tool"
slug: "belts/yellow/tool-decision-tree"
section: "belts"
status: "drafted"
type: "chapter"
track: "yellow"
order: 2
time_minutes: 20
audience: "daily-builder"
outcome: "Use a simple decision tree to choose the right AI surface, including a reviewable product-spec check, before starting."
prev: "belts/yellow/tool-atlas"
next: "belts/yellow/prompt-quality-deep"
pillar: "harness"
belt: "yellow"
tags: ["yellow-belt", "tools", "decision-tree"]
updated: "2026-08-14"
---

# Y.2 - When to reach for which tool

This module turns the Tool Atlas into a decision tree you can use in ten seconds. Yellow Belt builders should not spend twenty minutes deciding where to start. They should know the first safe surface and move.

---

## If you're short on time

- If the answer requires repo files or edits, start in Claude Code.
- If the answer requires Slack, docs, design, or tickets, start with the relevant connector and bring the result into the repo loop.
- If the answer is only thinking or drafting, start in a chat surface.

---

## The mental model

Use this decision tree:

```text
Does the task require editing repo files?
  yes -> Claude Code or coding agent
  no  -> Does it require private org context?
          yes -> approved enterprise or connector surface
          no  -> general chat surface is enough

Does the task require context from another tool?
  yes -> fetch that context first, then act
  no  -> keep the surface narrow

Will the result ship?
  yes -> make it reviewable through git, PR, or tracker evidence
  no  -> a note or summary may be enough
```

The key move is separating **fetch context** from **change files**.

---

## Worked example: four tasks

### Task A: "Summarize this product spec"

Start in a chat or approved enterprise surface. The output is a summary, not a code change. If the spec contains sensitive material, use the approved enterprise route and keep excerpts minimal.

Prompt:

```text
Goal: summarize this product spec for an engineer joining the project.
Context: pasted excerpt below.
Constraints: do not invent requirements; call out ambiguity.
Success criteria: five bullets plus three open questions.
```

### Task B: "Review this product spec before handoff"

A summary tells you what the spec says. A review asks whether the spec is ready to move. Do not use a generic chat prompt for the second job when the current Compass workflow is available: it checks the product spec through Problem, Solution, Requirements, and Adoption lenses and traces findings to evidence.

First verify Compass using [W.7](../01-white/W07-compass-plugin.md). Then run the review from Claude Code with a file or project directory:

```text
/compass:review-spec docs/<project-or-spec-path>
```

Treat the output as a review receipt, not a grade to optimise. Check these fields before acting:

```text
PRODUCT-SPEC REVIEW RECEIPT
[ ] Input: the full spec or finished artefact chain, not a summary
[ ] Confidence: enough source content was available to score
[ ] Evidence: each important finding cites a spec snippet or gate
[ ] Requirements: at or above the plugin's Green bar
[ ] Top gap: one concrete change, with an owner
[ ] Decision: revise and rerun / ask a human reviewer / stop
```

Use this loop:

1. **Point at the complete source.** A partial export can produce a confident-looking partial review. If the result is `Unscored` or reports low confidence, repair the input before repairing the prose.
2. **Inspect the evidence, not just the band.** A Green, Amber, or Red label without traceable snippets is not actionable. Missing evidence stays missing; do not write a claim into the spec merely to earn points.
3. **Fix the highest-consequence gap.** Requirements below the active plugin's Green bar veto the overall band because the build handoff is not yet testable. Start there before polishing lower-impact wording.
4. **Rerun on the same input path.** Compare the cited gap and band before and after. Save the receipt beside the normal review notes when the spec moves forward.
5. **Keep approval human.** Compass can expose gaps and make review faster. It cannot approve product scope, regulatory handling, launch risk, or an owner's decision.

**What this example teaches.** A specialised workflow beats an open-ended prompt when the job has a stable rubric and a review contract. The smallest useful interactive element here is the receipt checklist: it makes a score inspectable without turning the lesson into a second command catalogue.

### Task C: "Find where the dashboard renders this empty state"

Start in Claude Code. The missing context is repo structure.

Prompt:

```text
Goal: locate the empty-state component for this dashboard surface.
Scope: inspect file names, routes, and component imports only.
Constraints: do not edit files.
Success criteria: list likely files and why each is relevant.
```

### Task D: "A teammate mentioned this bug last week"

Start with the messaging connector. Search for the symptom, component name, and surface name. Bring the useful thread summary into Claude Code later.

Prompt after context:

```text
Here is the thread summary and the one-sentence symptom. Use it to locate likely code. Do not fix yet.
```

---

## The handoff pattern

Many Yellow Belt tasks use two surfaces:

```text
Connector -> short summary -> Claude Code -> diff -> PR
```

Do not paste a full Slack thread if a five-line summary is enough. Do not ask Claude Code to infer design intent if the design connector can provide it. Do not ask a connector to modify code.

Good handoff:

```text
The relevant Slack thread says users see a blank state after filtering by date.
The owner suggested the empty-state copy may live in the dashboard frontend repo.
No ticket is linked.
Use this context to locate the likely component. Do not edit yet.
```

---

## Common failure modes

**"I started in the wrong tool."** That is fine. Stop, summarize what you learned, move the context to the right tool.

**"I pasted everything into Claude Code."** Summarize first. Context windows are not storage bins.

**"I used a connector to browse around."** Connectors should answer a named question. Curiosity needs scope too.

**"I kept switching tools and lost the thread."** Write a one-paragraph state note before switching surfaces.

**"Compass gave the spec Green, so I treated it as approved."** A rubric result is review evidence, not authority. Keep the human owner and the normal approval path in the loop.

---

## GREEN / YELLOW / RED self-check

You are **GREEN** if:

- you can use the decision tree without opening Appendix A;
- you can separate context fetching from file editing;
- you can distinguish a summary from a rubric-based review and inspect the review evidence;
- you can write a short handoff summary between tools.

You are **YELLOW** if:

- you often need to restart in another surface;
- you paste too much context during handoff;
- you cannot decide whether a task needs repo access.

You are **RED** if:

- you ask tools to act outside their permissions;
- you cannot tell where context came from;
- you treat an automated review band as product approval;
- a task ships without reviewable evidence.

---

## Further reading

- [Compass `review-spec` command](https://github.com/razorpay/claude-plugins/blob/master/plugins/compass/commands/review-spec.md)
- [Compass product-spec review contract](https://github.com/razorpay/claude-plugins/blob/master/plugins/compass/skills/reviewing-product-specs/SKILL.md)
- [Compass v2 product-spec workflow](https://github.com/razorpay/claude-plugins/pull/894)

---

## What you can say after this module

> "I can choose the first surface and hand context between tools without losing control."

---

**Previous:** [Y.1 The Tool Atlas](Y01-tool-atlas.md) - **Next:** [Y.3 Prompt quality, deep dive](Y03-prompt-quality-deep.md)

