---
title: "The non-coding AI surface"
slug: "ops-101/non-coding-ai-surface"
section: "foundation"
status: "drafted"
type: "chapter"
track: "ops-101"
order: 2
time_minutes: 15
audience: "pm-designer-ops"
outcome: "Know which non-coding AI surface to reach for and what connectors change."
prev: "ops-101/why-this-track"
next: "ops-101/triage-automations"
pillar: null
belt: null
tags: ["ops-101", "connectors"]
updated: "2026-09-06"
---

# 0B.2 — The non-coding AI surface

> **⏱ 15 minutes · 👥 PMs, designers, ops, anyone non-engineering · 🎯 Leaves with:** a one-sentence answer to "which AI tool should I open right now?" plus the connector concept that makes the rest of this track work.

---

## If you're short on time

Choose by the job in front of you. Claude.ai, Cowork, and Slash are general work surfaces. Analytics Agent and PM Tracer are specialised PM/Product plugins.

| Your next job | Start here | Check before you begin |
|---|---|---|
| Think, draft, summarise, or challenge an idea | **Claude.ai** | Paste, upload, or connect the source material; it cannot see local files by default. |
| Work through a folder of docs, decks, spreadsheets, or PDFs | **Cowork** | Give it only the folder and plugins this task needs. |
| Research internal context or delegate a bounded remote repo task | **Slash** | Name the question or repo, success criteria, and evidence you expect. |
| Explain or query a Self Serve Analytics metric | **Analytics Agent** | Use the SSA-aware plugin instead of asking a general assistant to infer metric meaning. |
| Check whether PM AI work is visible to the adoption programme | **PM Tracer** | Treat it as instrumentation, not a chat surface. |

The durable distinction is **surface, context path, specialised workflow**:

- A **surface** is where you ask or delegate.
- A **connector** gives an approved surface access to a source such as Slack or Google Workspace.
- A **plugin** packages a specialised workflow, command, skill, or instrumentation path.

Pick a surface quickly. Spend your attention on whether it can reach the right evidence and whether the task needs a specialised plugin.

---

## Claude.ai

Claude.ai is the lowest-setup option for interactive thinking and writing. Use it to draft an email, challenge a brief, summarise an uploaded document, or compare options while you are at the keyboard.

It sees what you type, paste, or upload. An approved workspace connector may let it retrieve from a connected source, but availability and permissions vary. Confirm the source is actually connected before relying on the answer, and inspect citations or links when the task depends on internal facts.

Choose Claude.ai when the output is mostly prose and you want a quick back-and-forth. Choose another surface when the task depends on a local folder, remote repo execution, or a specialised PM workflow.

---

## Cowork

Cowork is the desktop option for work that lives in files. Point it at a bounded folder to summarise meeting notes, clean a spreadsheet, assemble a deck, extract a PDF table, or save a recurring report back beside its sources. Installed plugins can add repeatable workflows.

The folder boundary matters: give Cowork the smallest directory that contains the task, then review writes before sharing the result. It requires a local installation and may need IT approval on a managed laptop.

Cowork does not replace an IDE for serious coding or the normal review path for pull requests. That path is Claude Code, covered in White Belt.

---

## Slash

Slash is Razorpay's remote internal AI worker, invoked with `@slash` in Slack. Use it to research approved internal sources or delegate a bounded task against a named remote repository. For example: ask what changed in a sprint, summarise a linked thread, trace an earlier decision, or request a small repo change with explicit success criteria.

Slash cannot see uncommitted files on your laptop or provide Claude Code's tight edit-run-debug loop. Review a generated answer against its sources and a generated PR against its diff and checks. Creation is a receipt that work ran, not proof that the result is correct.

For exact modes and scope syntax, use [Appendix A — Tool Atlas](../../appendices/A-tool-atlas/README.md#slash).

### Pick the lightest research mode that can prove the answer

Slash offers three knowledge-first depths. Put the mode immediately after `@slash`:

| Mode | Use it when... |
|---|---|
| `@slash --plan-fast <question>` | A narrow fact should already exist in curated knowledge and you want the quickest lookup. |
| `@slash --plan <question>` | You need the normal default: curated knowledge plus one round of code evidence. |
| `@slash --plan-accurate <question>` | A high-stakes or cross-service question needs a deeper multi-repo search and can wait longer. |

Start with `--plan` when you are unsure. Use `--plan-fast` for bounded lookups. If fast mode returns `INSUFFICIENT_CURATED_KNOWLEDGE`, move to `--plan` or `--plan-accurate`; do not keep rewording the question until it agrees with you. A deeper search broadens the evidence. It does not make the answer automatically true, so check the cited source and date before acting.

**Hand off the question, not just the escalation.** Treat a deeper research run as a fresh session: repeat the full question and include the facts or links it needs. A reply such as “try again in research mode” does not carry the parent thread's context into the new run, so the research worker has nothing useful to investigate.

Try it with a real decision:

`@slash --plan Which team owns <area>, and which sources support that answer?`

---

## PM/Product add-ons: Analytics Agent and PM Tracer

These plugins answer narrower questions than the three general surfaces.

**Analytics Agent** is the recommended plugin for Self Serve Analytics metric questions. Use it to explain a metric, query a funnel, or review dashboard health with SSA context. Do not ask a general assistant to infer metric meaning from a pasted screenshot or partial schema.

**PM Tracer** is instrumentation for the AI Adoption Leaderboard. Install it when your programme requires it, run its health check, and let it record whether applied PM workflows are visible. It is not a tool you ask questions to, and using more AI surfaces does not make the underlying work better.

For install snippets and caveats, use [Appendix A — Tool Atlas](../../appendices/A-tool-atlas/README.md) and [H.7 — Day-1 quick reference](../../appendices/H-reference-cards/H7-day-1-quick-reference.md). This chapter's job is the mental model: **general surfaces for general work; specialised plugins for specialised PM workflows.**

---

## The supporting concept: connectors

A **connector** is an approved path that lets an AI surface read or act on an external system: Slack, Google Workspace, a ticketing tool, a calendar, or a knowledge base. Without one, you provide context manually. With one, the surface can retrieve or act within the connector's permissions.

Mentally, picture it like this:

```
   ┌─────────────────────────────────────────────────────────────┐
   │            YOUR AI SURFACE (Claude.ai / Cowork / Slash)      │
   └──────────────────────────▲──────────────────────────────────┘
                              │ uses
            ┌─────────────────┼─────────────────┐
            ▼                 ▼                 ▼
       ┌─────────┐      ┌────────────┐      ┌──────────────┐
       │  Slack  │      │   Google   │      │  Ticketing   │
       │connector│      │ Workspace  │      │   tool       │
       │         │      │ connector  │      │  connector   │
       └────▲────┘      └─────▲──────┘      └──────▲───────┘
            │                 │                    │
            ▼                 ▼                    ▼
        Slack itself    Drive / Gmail /        DevRev / Jira /
                        Calendar / Docs        Linear / etc.
```

The surface is the front door. Connectors are the paths to work systems. Each path is separately enabled and permissioned, so access in one surface does not imply access everywhere.

The remaining Ops 101 chapters combine context paths for different jobs: triage may need email, Slack, and ticketing; generation may need Calendar and Docs; document workflows may need Drive; scheduled agents need only the sources required by their recipe. Start with the smallest set for the workflow, verify what each connector can read or change, and add another only when the task requires it.

---

## Make the choice with one real task

Use a task from today rather than designing a perfect tool stack in the abstract.

1. **Name the output.** For example: "a one-page recap of yesterday's design review."
2. **Name the source.** Is the evidence in text you can paste, a local folder, internal systems, or SSA?
3. **Pick from the table above.** Use Claude.ai for pasted or connected prose, Cowork for local files, Slash for internal research or remote delegation, and Analytics Agent for SSA questions.
4. **Run a small read-only test.** Ask for three source-linked bullets before requesting a full artefact or any write action.
5. **Check the boundary.** Could the surface reach the source? Did it cite the right evidence? Did it stay inside the task? If not, fix the context path or switch surfaces before expanding the job.

Before the next chapter, log in to one general surface and confirm one approved context path that your actual workflow needs. Do not enable every connector just because it exists. PM/Product readers can add Analytics Agent or PM Tracer when their workflow or programme requires it; neither is a prerequisite for the rest of Ops 101.

If installation, access, or laptop policy blocks the test, ask in [`#ai-help`](https://razorpay.slack.com/archives/C08C35GKJKD). Do not brute-force a permission problem.

---

## What you should carry into the next chapter

- Pick by **output and source**: Claude.ai for interactive prose, Cowork for local files, Slash for internal research or remote delegation.
- A connector supplies permissioned context. A plugin supplies a specialised workflow. They are not interchangeable.
- Start read-only and source-linked. Expand permissions or enable another connector only when the workflow needs it.
- Analytics Agent handles SSA metric questions; PM Tracer records programme instrumentation.
- Next, [0B.3 — Triage automations](03-triage-automations.md) applies this choice to inbox, Slack, and on-call queues.

---

**Previous:** [← 0B.1 Why this track exists](01-why-this-track.md) · **Next:** [→ 0B.3 Triage automations](03-triage-automations.md)

**Further reading**
- [Model Context Protocol (MCP) documentation](https://modelcontextprotocol.io/) — background on one open standard for connecting AI applications to data sources and tools
- [Lenny's Newsletter — 25 proven AI-adoption tactics](https://www.lennysnewsletter.com/p/25-proven-tactics-to-accelerate-ai) — examples of the adoption patterns the rest of this track turns into workflows
