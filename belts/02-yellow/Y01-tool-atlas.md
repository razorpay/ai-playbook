---
title: "Tool Atlas in practice"
slug: "belts/yellow/tool-atlas"
section: "belts"
status: "drafted"
type: "chapter"
track: "yellow"
order: 1
time_minutes: 20
audience: "daily-builder"
outcome: "Pick the right AI surface for the job you're about to do, by working through three real decision examples."
prev: "belts/yellow"
next: "belts/yellow/tool-decision-tree"
pillar: "context"
belt: "yellow"
tags: ["yellow-belt", "tools", "tool-atlas"]
updated: "2026-05-13"
---

> **The reference atlas lives in [Appendix A — Tool Atlas](../../appendices/A-tool-atlas/README.md).** This chapter is the practice version: three worked decisions you walk through to internalise *how* to choose, not *what* the options are. Read both — Appendix A is the table; this chapter is the muscle memory.

This module replaces the "which tool do I open?" hesitation with a habit. The habit has one move: before you start, ask *where does the missing context live, what action do I need the AI to take, and what would make the output reviewable?* The three examples below walk that habit through three common Yellow-Belt jobs.

---

## If you're short on time

Three decision rules, in priority order:

1. **Context wins.** The right surface is the one that can already see the thing you need to act on. If the missing context lives in Slack, the design system, or a ticketing tool, reach for the connector surface first.
2. **Repo work needs Claude Code.** Anything that touches files, runs commands, or produces a diff belongs in Claude Code, not a chat window. Chat windows hallucinate filenames.
3. **Drafting and thinking want chat.** Pure writing, explanation, summarisation, or "help me think through this" works best in [Claude.ai](https://claude.ai) or Cowork — surfaces that can hold a long thread without the cost of repo access.

When in doubt, the [Decision flow in Appendix A](../../appendices/A-tool-atlas/README.md#decision-flow) is the canonical chart.

---

## Worked example 1 — "Fix a confusing empty state in the dashboard"

The job: you noticed a dashboard's empty state shows "Loading..." forever when there's actually no data. You want to fix it.

**Bad instinct.** Open Claude.ai and paste the description, hoping it'll write the fix.

**Why it fails.** Claude.ai can't see your repo. It'll guess at component names, file paths, and prop shapes — and the guesses will be wrong because they're not grounded in your actual code. You'll waste 20 minutes pasting context piecemeal, and even then the patch won't apply cleanly.

**The right sequence.**

1. **Slack connector** first, to find the team thread where this was reported. The complaint usually has more detail than your one-line memory of it.
2. **[Figma connector](../../belts/02-yellow/Y09-figma-mcp.md)** next, to check whether the empty state has a designed-target. If yes, the fix is unambiguous; if no, you'll need to negotiate the right copy with design.
3. **[Claude Code](../../appendices/A-tool-atlas/README.md#claude-code)** to actually edit the file. Ask it to locate the empty-state component first, then propose a small plan, then apply.
4. **Local check** via `npm run dev` or the equivalent — make sure the fix renders.
5. **Open the PR.** Claude Code can draft the description; you review and submit.

Four surfaces, each doing what it's best at. No single surface "owns" the loop.

**What this example teaches.** Bug fixes are multi-surface tasks. The mistake is trying to do them in one tool. The discipline is: connector for context, repo tool for the change, chat surface only if you genuinely need to think through the approach.

---

## Worked example 2 — "Summarise the past month of #product-design-bulletin"

The job: your skip-level asked for a digest of what design has shipped in the last month. You want the summary on their desk by tomorrow morning.

**Bad instinct.** Open Claude Code and ask it to read Slack.

**Why it fails.** Claude Code is a repo tool. It doesn't read Slack natively, and even if you stitched a connector in, the working-directory context is the wrong frame for this task. You're writing a digest, not editing code.

**The right sequence.**

1. **[Cowork](../../appendices/A-tool-atlas/README.md#cowork)** with the Slack connector turned on. Cowork is purpose-built for "AI agent doing non-coding work with my org's tools attached."
2. Ask it to pull the last 30 days of `#product-design-bulletin`, cluster by surface or pod, and give you a one-paragraph summary per cluster with links to the original posts.
3. Review the output. Two patterns to expect: it'll over-credit posts with many emoji reactions; it'll under-credit work that shipped in threads.
4. Hand-edit the digest. AI gives you the 80% draft; the last 20% needs your judgement about what your skip-level actually wants to see.

**What this example teaches.** Non-repo work has a different home than repo work. Cowork is built for the "I'm a PM/ops/designer who wants AI to do the boring sorting" job. [Claude.ai](https://claude.ai) works too if you're paste-driven; Cowork wins when the source data lives behind connectors.

---

## Worked example 3 — "Help me write a Yellow Belt-readable explanation of how the LLM gateway works"

The job: you've internalised how `~/.claude/settings.json`, LiteLLM, and the Razorpay proxy fit together. Now you have to write a one-paragraph explanation for a colleague who hasn't.

**Bad instinct.** Open Claude Code and ask it.

**Why it fails.** Claude Code's strength is acting on a repo. Pure writing — finding the right metaphor, the right level of detail, the right opening sentence — is a thinking task, not a doing task. Claude Code's prompts are optimised for "what should the next file edit be," not "what's the clearest way to explain this."

**The right sequence.**

1. **[Claude.ai](../../appendices/A-tool-atlas/README.md#claudeai)** in a long thread. Paste your draft, ask for three rewrites at different levels (one-sentence, one-paragraph, three-paragraph). Pick the one closest to what your colleague needs.
2. Iterate on tone: "make this more conversational"; "drop the jargon"; "explain it like the reader has never seen LiteLLM before."
3. Once the wording is right, paste the final into the chat thread or doc where your colleague will read it. No PR involved.

**What this example teaches.** Drafting wants chat, not code. Claude.ai's long-thread context window is the right harness for iteration. [Cowork](../../appendices/A-tool-atlas/README.md#cowork) is a fine alternative if you want connector access to pull in reference material; Claude Code is the wrong tool for this job.

---

## What you can say after this module

> "I can name the right first surface for any AI task I'm about to start, and justify it in one sentence."

The proof is the next time you catch yourself opening the wrong tool. The first instinct is rarely the right surface; the second-thought question — *where does the missing context live?* — usually is.

---

**Companion reference:** [Appendix A — Tool Atlas](../../appendices/A-tool-atlas/README.md) (the canonical tool cards + decision flow). **Next:** [Y.2 When to reach for which tool](Y02-tool-decision-tree.md) — the decision tree that formalises what you just walked through.

**Previous:** [Yellow Belt overview](README.md) · **Next:** [Y.2 Tool decision tree](Y02-tool-decision-tree.md)
