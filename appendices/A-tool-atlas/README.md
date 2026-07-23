---
title: "Appendix A: Tool Atlas"
slug: "appendices/tool-atlas"
section: "appendices"
status: "drafted"
type: "readme"
track: "tool-atlas"
order: 0
time_minutes: 14
audience: "everyone"
outcome: "Choose the right AI tool surface for the job instead of treating every tool as interchangeable."
prev: "prologue/tool-tour"
next: "appendices/environment-setup"
pillar: "harness"
belt: null
tags: ["appendix", "tools", "harness"]
updated: "2026-07-23"
---

# Appendix A — Tool Atlas

> **What this is.** A working map of the AI surfaces named across the playbook. Use it when you are unsure whether a job belongs in Claude Code, Claude.ai, Claude Design, Cowork, Compass, PM tracer, Analytics Agent, Slash, Cursor, Codex, or a more traditional IDE.

---

## The short version

| Tool | Reach for it when | Avoid using it for |
|---|---|---|
| Claude Code | You are changing files in a repo, running commands, reading errors, or iterating on a PR. | Sensitive data dumping, long-form stakeholder writing, or work where the repo is irrelevant. |
| Claude.ai | You need a thinking partner for synthesis, drafts, analysis, or exploration outside a codebase. | Repo edits, terminal work, or anything that must inspect local files. |
| Claude Design | You are exploring UI, deck, or design concepts with Razorpay design-system context. | Repo edits, Blade compliance gates, or anything that must ship through a PR. |
| Cowork | You want a guided enterprise assistant with approved connectors and repeatable non-code workflows. | Deep codebase surgery or local build/test loops. |
| Compass | You need Razorpay-specific skills, hooks, MCPs, and policy-aware workflows inside Claude Code. | One-off general chat. Compass is the overlay, not the conversation surface. |
| PM tracer | You want your PM/Product Claude Code usage to count toward the AI Adoption Leaderboard after your setup is GREEN. | Debugging, answering questions, or trying to "game" adoption through token spend. It is instrumentation, not an assistant. |
| Analytics Agent | You need the standalone Self Serve Analytics path for metric questions, lineage checks, or health reviews. | Native-Windows hand ports, ad-hoc database access, or metric work before the plugin is onboarded. |
| Slash | You need remote internal research or a bounded repo task: use knowledge-first mode to understand, or execution mode to change code and raise a PR. | Local uncommitted work, an interactive dev loop, or a task whose repo and success criteria are still unclear. |
| Cursor | You want an IDE-native coding assistant inside an editor workflow. | Program-specific belt flows that depend on Compass conventions. |
| Codex | Current support guidance confirms that you have access for a bounded implementation, verification, or second-agent check. | General quota fallback, or certification work that depends on Compass skills, Razorpay connectors, or Claude Code guardrails. |

The pattern: **pick the surface that can see the right context and take the right action.** A better model with the wrong visibility still fails.

---

## How to read each tool

For every surface in this atlas, you should be able to answer five questions before you start work in it. Once you can, you have learned the tool well enough.

1. **What can it see?** Files, repo state, browser tabs, internal connectors, the terminal, nothing at all? Visibility is the first constraint.
2. **What can it do?** Edit, run, fetch, send, post, deploy, request review, file a ticket? An assistant that can only suggest is different from one that can act.
3. **Where does it persist?** Are conversations saved? Is there a project, workspace, or skill registry that accumulates? Is the work disposable?
4. **Who else can read what happens?** Personal session, team workspace, audited org workspace, public chat — the answer should be obvious before you paste anything sensitive.
5. **What is the cost of being wrong?** A typo in Claude.ai is harmless. A typo in a Claude Code session pointed at a production repo is not. The wrong surface multiplies small mistakes.

---

## Tool cards

### Claude Code

**Surface type.** A terminal application that runs against a local working directory. The agent reads files, proposes edits, executes commands, and asks for approval on anything it cannot do safely on its own.

**Default context.** The directory you started it from, the open repo, the Compass plugin payload (skills, hooks, MCPs, slash commands), and any files you point it at during the session.

**What it can see.** Local files inside the working directory, output of commands you let it run, connectors exposed by Compass MCPs, and your prompt history within the session.

**What it can do.** Edit files, run tests, run package managers, run scripts, open and amend pull requests via gh, invoke skills, call connectors. With permission, almost anything a developer would do at the command line.

**What it cannot do well.** Long-form synthesis from data it cannot see, browser-style research without a connector, and tasks where the repo is irrelevant. It is not a chat companion; it is a builder.

**Common failure modes.** Pointed at the wrong directory. Auth not refreshed. Compass plugin out of date. Asked to do work that has no repo footprint. Treated as a search engine.

**Belt relevance.** Default tool from White Belt onward.

### Claude.ai

**Surface type.** Browser chat at `claude.ai`. Same family of models as Claude Code, no file access, no repo context, no Compass.

**Default context.** What you paste into the conversation, plus any files you upload, plus the conversation history.

**What it can see.** What you give it. Nothing more.

**What it can do.** Reasoning, drafting, summarisation, exploration, stakeholder writing, and breaking a tangled idea into a sequence. Excellent for product, ops, design, and writing work.

**What it cannot do.** Touch a file you have not uploaded. Run a command. Read your repo. Apply Razorpay-specific conventions on its own.

**Common failure modes.** Drafting code there and pasting it into a Razorpay repo without going back through Claude Code. Code from Claude.ai does not know about Blade conventions, repo guardrails, or pre-ship checks. The fix is a habit: think in Claude.ai, ship in Claude Code.

**Belt relevance.** All belts use Claude.ai for thinking and writing; none use it for shipping.

### Claude Design

**Surface type.** A Claude design workspace at [claude.ai/design](https://claude.ai/design), separate from Claude Code. It is useful for visual ideation and design-system-aware drafts, not for changing source code.

**Default context.** The design system project you select in the workspace. For Razorpay design work, the Blade Design System project provides tokens, component anatomy, states, interaction patterns, and approved deck templates where available.

**What it can see.** The design assets, deck inputs, screenshots, and prompt context you provide inside that workspace. It does not automatically see your local repo, your branch, or the Compass plugin context loaded in Claude Code.

**What it can do.** Generate and iterate on design concepts, UI explorations, and Razorpay-branded deck drafts using the selected design system. A good prompt is explicit: "Use the Blade design system" or "Use the approved deck template."

**What it cannot do.** Open a PR, run tests, verify Blade compliance in a codebase, or replace the Blade MCP / Blade audit path inside Claude Code. If the work needs to ship, move the intent into Claude Code and let the repo plus Compass guardrails drive the implementation.

**Common failure modes.** Treating a pretty Claude Design output as production-ready code. Mixing up Claude Design with Claude Code. Forgetting that generated decks and visuals still need human review for names, numbers, confidential data, and brand fit.

**Belt relevance.** Useful for designers and PMs from Yellow Belt onward as an ideation surface. Green Belt design-to-code work still ships through Claude Code with Figma, Blade, Code Connect, and review evidence.

### Cowork

**Surface type.** A desktop application aimed at builders who are not living in a terminal. Folder-first UI, the same agent loop, the same skills system, designed for workflow-heavy non-code tasks.

**Default context.** A selected folder on your machine and the documents within it, plus connectors that the host application has approved.

**What it can see.** Files in the selected folder, attached documents, and the connector layer the application exposes.

**What it can do.** Build documents, run multi-step research, automate repeatable office workflows, and call into the same skill system that powers Claude Code's polished outputs.

**What it cannot do.** Replace Claude Code for repo work. Cowork is not optimised for editing live source trees; the moment work becomes "open this PR in our repo," move into Claude Code.

**Common failure modes.** Trying to ship a feature from Cowork. Using it as a free-form chat surface when Claude.ai would be faster.

**Belt relevance.** White and Yellow belts use it heavily for non-code workflows; Green and Black belts treat it as a sibling surface to Claude Code.

### Compass

**Surface type.** A plugin layer that runs *inside* Claude Code. Not a separate window. When installed, it injects skills, hooks, MCPs, and slash commands that make Claude Code aware of Razorpay's conventions.

**Default context.** Whatever Claude Code already has, plus the org's curated skill bundle, plus the connector list approved for the program.

**What it can see.** Whatever Claude Code can see. Compass does not see beyond its host.

**What it can do.** Trigger named workflows (`/setup-verify`, `/pre-ship-check`, design and review skills), enforce hooks, and route specialised tasks to subagents.

**What it cannot do.** Run by itself. If Claude Code is broken or unauthed, Compass is not running.

**Common failure modes.** Installed but stale — skills loaded from an older version that does not match current conventions. Always confirm version through the verification skill before high-stakes work.

**Belt relevance.** Required from White Belt setup. Becomes the centre of gravity at Green and Black, where builders begin authoring their own skills.

### PM tracer (`rzp-pm-tracing`)

**Surface type.** A Claude marketplace plugin that instruments PM/Product Claude Code usage for the AI Adoption Leaderboard. It is an add-on after the core Claude Code setup is GREEN, not a Quest W-0 prerequisite.

**Default context.** The Claude Code sessions, skills, and tool-usage signals that the tracing plugin emits once installed and healthy.

**What it can see.** Usage signals from your PM/Product AI workflows. The leaderboard rewards applied usage patterns and shipped work, not raw token burn or cost spend.

**What it can do.** Feed the PM adoption dashboard so your AI workflow activity is visible, check the tracing pipeline through `/tracing-doctor`, and make adoption gaps easier to debug.

**What it cannot do.** Answer metric questions, edit repos, improve the substance of your work, or turn token-heavy sessions into meaningful adoption. It measures; it does not build.

**Common failure modes.** Installing it before Claude Code is healthy. Forgetting to restart Claude Code before running `/tracing-doctor`. Treating the leaderboard as a token-spend contest instead of an applied-work signal.

**Belt relevance.** PM/Product add-on immediately after White Belt setup. H.7 carries the exact install sequence; this atlas explains what surface you are installing.

### Analytics Agent

**Surface type.** A standalone Claude marketplace plugin for Self Serve Analytics work. It replaces the old Compass `querying-metrics` path for metric questions.

**Default context.** The approved SSA connector setup, onboarding state, and analytics sources exposed through the plugin once `/analytics-setup` and `/analytics-onboard` are complete.

**What it can see.** The metric, lineage, and health-review surfaces exposed by the SSA plugin. It should not be treated as a license to paste raw credentials, export customer data, or bypass data-access approvals.

**What it can do.** Run metric questions through `/analytics-query`, support `/analytics-review` health checks, and keep PM analytics work on the maintained SSA path instead of scattered one-off SQL snippets.

**What it cannot do.** Fix missing data-access grants by itself, replace source-of-truth dashboards, or run reliably on native Windows today. The current plugin assumes a Unix-like surface for shell wrappers, `python3`, hooks, and POSIX locking.

**Common failure modes.** Using the deprecated `querying-metrics` habit when the standalone plugin is the current path. Installing on native Windows and trying to hand-port the plumbing. Asking broad business questions before the metric/source is named.

**Belt relevance.** PM/Product add-on after White Belt setup; useful from Yellow Belt onward for metric-backed product work.

#### Routing changed; your workflow did not

The SSA engine now prefers its repo-owned Trino CLI for Trino-backed metrics and keeps the same-gateway Trino MCP as an automatic fallback. This is backend routing, not a new PM setup path. Keep using `/analytics-query` and `/analytics-review`; the skill bootstraps the CLI from existing approved credentials when it can and chooses the fallback when it cannot. Do not hand-edit `.env` or `.mcp.json` just to pick a route.

```text
Ask the metric question normally
  → the skill resolves the source and gateway
  → Trino CLI when healthy; same-gateway MCP when setup is unavailable
  → read-only result and execution receipt
```

The route never changes the safety contract. Do not switch backends to bypass a rejected write, expired access, timeout, or row cap. If a query is blocked, share the exact question, the route or gateway shown, and the redacted error with support; do not paste credentials or invent a manual configuration.

#### Ask, review, or contribute?

Use the smallest Analytics Agent workflow that matches the job:

```text
Need an answer about an existing metric?       → /analytics-query
Need a health check on existing analytics?     → /analytics-review
Found a missing or incorrect metric definition? → contribute one governed metric
```

Contribution is different from asking a question. It changes the shared metric glossary and its certified query, so it belongs in a reviewed PR—not in a chat answer that disappears when the session closes.

Start from a clean local clone of `razorpay/self-serve-analytics`, then run `/analyst:metric-catalog-builder` with no arguments. The skill walks one metric through the current seven-step add-or-modify path:

1. **Bring a metric brief.** Name the metric, product area/domain, description, source table, formula or query, unit, filters, and gotchas. If you cannot name the source and computation yet, use `/analytics-query` to investigate first.
2. **Choose the discovered domain.** Prefer an existing domain from the skill's picker. Creating a new domain needs explicit owner confirmation; a similar-looking folder is not close enough.
3. **Review ADD versus MODIFY.** For an existing metric, inspect every old → new field. For a new metric, confirm the glossary location and certified-query location before files are written.
4. **Require a real query check.** The source table must exist and the query must run in Trino or ClickHouse with `LIMIT 1`. A returned row is GREEN; an empty result needs explicit confirmation; a failed query does not become “documentation only”—fix it before proceeding.
5. **Keep the diff domain-scoped.** The glossary term and certified query may change, plus the generated merged glossary. Unrelated domain cleanup belongs in another PR.
6. **Approve the change summary.** Confirm the metric, domain, serving layer, files, and sample value before the skill commits or opens a PR.
7. **Wait for CI and human review.** A generated PR is a proposal, not a live metric. Merge only after metadata validation passes and the owning reviewer agrees with the definition.

Copy this preflight card before you invoke the skill:

```text
Metric name:
Product area / domain:
What it measures:
Source table:
Formula or query:
Unit:
Filters:
Gotchas:
Owner who can review the definition:
```

**Stop conditions.** Stop and resolve the gap if the source table is unknown, the query fails, the glossary and certified-query counts do not match, the diff reaches another domain, or no owner can review the meaning. The skill can validate SQL and scope; it cannot decide what the business metric ought to mean.

**Why this path exists.** The single-metric workflow, domain discovery, and scope-containment guardrails shipped in [`self-serve-analytics` #1756](https://github.com/razorpay/self-serve-analytics/pull/1756), [#1760](https://github.com/razorpay/self-serve-analytics/pull/1760), and [#1788](https://github.com/razorpay/self-serve-analytics/pull/1788). Keep implementation detail in that repo-owned skill; use this card to choose the workflow and arrive prepared.

### Slash

**Surface type.** Razorpay's remote internal AI worker, invoked with `@slash`. It has a knowledge-first mode for understanding and an execution mode for scoped repo work. It is distinct from the Claude Code session running on your machine.

**Default context.** Your task, any repo scope you name, and the approved skills, plugins, and internal sources available to that Slash run. This is remote task context, not your local terminal state.

**What it can see.** Approved internal data and the remote repo or repos selected for the task. It cannot see uncommitted files on your laptop, and public-web access is not a safe default assumption.

**What it can do.** Research an internal flow, gather context before implementation, invoke approved skills/plugins, implement a scoped change, and raise a PR. Choose the mode explicitly:

- Knowledge first: `@slash --plan <query>` (or `--discover`) when you need to understand a flow, owner, or code path before changing anything.
- Execute: `@slash repo:<repo-name> <task>` (or `repos:<repo-a>,<repo-b>`) when the job and expected result are already clear.

**What it cannot do.** Inspect your local uncommitted state, provide a tight localhost edit-run-debug loop, or turn an opened PR into verified work. Claude Code remains the local belt path; Slash is the remote delegation path.

**Common failure modes.** Executing before the problem is understood. Omitting the repo scope. Assuming a remote run sees local changes. Treating the generated PR as reviewed. Fix the first with knowledge-first mode; fix the rest with explicit scope and normal review evidence.

**Belt relevance.** Useful at every belt for research and scoping; useful from Yellow onward for bounded remote repo tasks. It complements rather than replaces the Claude Code + Compass belt workflow.

### Cursor

**Surface type.** A VS Code-style IDE with an AI side panel, plus an integrated terminal in which Claude Code can run.

**Default context.** Open files and folders in the editor, terminal output, plus whichever AI provider you are connected to in the side panel.

**What it can see.** Whatever the IDE has open, plus the terminal session if you are running Claude Code inside it.

**What it can do.** Multi-file editing, search, IDE navigation, side-panel chat, and a hosted Claude Code session in the integrated terminal.

**What it cannot do.** Replace the policy and skill layer that Compass provides inside Claude Code. The Cursor side panel and Claude Code are separate sessions; what one knows, the other does not.

**Common failure modes.** Treating the side panel as Claude Code. Two sessions, two memories, two outputs — easy to get crossed.

**Belt relevance.** Optional comfort layer for any builder who prefers a graphical editor while running Claude Code in the integrated terminal.

### Codex / non-Claude coding tools

**Surface type.** A coding-agent workspace outside the Claude Code + Compass path. Codex can inspect and edit a local workspace, but it does not automatically inherit Razorpay's Claude-shaped skills, hooks, MCPs, or connector approvals.

**Default context.** The workspace or app session you open, plus whatever files and plugins that surface is allowed to access. Access is controlled separately and can change. Do not assume an earlier MyAccess request or workspace invite is still an active route; confirm the latest support guidance first.

**What it can do.** Bounded implementation, verification, and second opinions when support explicitly confirms access for the task. It is not a general answer to LiteLLM model limits: when Codex is unavailable, continue with Claude or an enabled GPT route through LiteLLM, or follow the Claude Team migration route if support has provisioned you there.

**What it cannot do.** Replace Claude Code as the belt path. It does not make Compass checks optional, and plugin access can still be blocked by org OAuth or security policy even after the base workspace works.

**Common failure modes.** Assuming a Codex plugin has the same connector approval as Claude Code. Treating Codex output as ready to ship without bringing it back through Claude Code, Compass, tests, and the normal PR review path.

**Belt relevance.** Optional secondary surface from Yellow Belt onward when access is confirmed. White Belt still establishes Claude Code + Compass because that is the certified program spine.

---

## Decision flow

Before you open a tool, run this filter in your head:

- If the work edits files in a repo, default to Claude Code.
- If the work is "think with me," default to Claude.ai.
- If the work is visual ideation or a deck draft with design-system context, default to Claude Design.
- If the work is non-code office workflow on a folder, default to Cowork.
- If the work is PM adoption instrumentation, install the PM tracer after Claude Code is GREEN and verify it with `/tracing-doctor`.
- If the work is metric or SSA analysis, use Analytics Agent after its setup/onboarding flow instead of the retired `querying-metrics` habit.
- If the work is internal research, use Slash knowledge-first mode. If it is a bounded remote repo task, give Slash the repo and acceptance criteria in execution mode.
- If the work needs visual file navigation, host Claude Code inside Cursor's terminal.
- If support confirms Codex access for a bounded task, use it only for that scope and bring the result back through Claude Code before shipping.
- If you cannot tell what shape of work it is, name the work in one sentence first; the right tool usually appears in the sentence.

---

## Anti-patterns to avoid

The atlas exists because these patterns keep happening and keep costing time.

**Drafting code in Claude.ai, pasting into a repo.** Skips every guardrail Compass provides. Code that "looked clean" in chat lands in a PR with the wrong design-system component, the wrong prop names, or no test coverage. Always re-route through Claude Code before committing.

**Treating Claude Design as the shipping path.** Claude Design is excellent for seeing options quickly. It is not a repo-aware implementation environment, and it does not replace the Blade MCP or review evidence. Move from visual intent to Claude Code before changing source.

**Asking Claude Code to do non-code synthesis.** Treating it as a chat tool wastes its harness. If the task does not touch a file, a run, or a connector, do it in Claude.ai or Cowork.

**Using the wrong Slash mode.** Asking execution mode to “figure it out and ship” mixes discovery with code changes. Use knowledge-first mode until the repo, constraints, and success criteria are clear; then delegate the bounded implementation and review the PR normally.

**Confusing instrumentation with capability.** The PM tracer can make usage visible; it cannot make the work useful. More tokens do not mean better adoption.

**Treating Analytics Agent as a raw database shortcut.** Use the maintained SSA plugin flow. If access, setup, or native-Windows plumbing blocks you, route the issue instead of improvising credentials or shell wrappers.

**Running two parallel sessions and hoping they synchronise.** Cursor's side panel and Claude Code in the terminal are different sessions. Pick one to drive a given task.

**Treating Codex as a Compass clone.** Codex may be approved for the coding task, but its plugins and connectors are governed separately. If a plugin auth fails, do not work around it by pasting sensitive data into the session. Route the plugin/access issue through the support path and keep shipping changes behind Claude Code + Compass review.

**Sending sensitive data to the wrong surface.** PII, secrets, customer-identifying records, and money-handling fragments belong in approved surfaces only. The safety brief in Prologue 0.11 and the redline cards in Appendix H are the canonical references.

---

## Where to go next

- For the first 60-second tour, read [Prologue 0.5 — Meet your tools](../../prologue/05-tool-tour.md).
- For setup and verification, read [Appendix B — Environment Setup](../B-environment-setup/README.md).
- For reusable workflows, read [Appendix C — Skills Library](../C-skills-library/README.md).
- For the philosophy behind context and harness choices, read [Appendix N.5 — Three pillars](../N-methodologies/N5-three-pillars.md).
- For the redlines that apply across surfaces, read [Appendix H — Reference Cards](../H-reference-cards/README.md).

The cards above are the canonical first-pass. Per-tool deep-dives expand here as the program collects enough usage signal to justify them.
