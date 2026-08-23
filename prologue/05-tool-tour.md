---
title: "Meet your tools"
slug: "prologue/tool-tour"
section: "prologue"
status: "drafted"
type: "chapter"
track: null
order: 5
time_minutes: 5
audience: "everyone"
outcome: "Tell Claude Code, Claude.ai, Claude Design, Cowork, Compass, Slash, Cursor, and Codex apart."
prev: "prologue/enablement-stack"
next: "prologue/roles-and-forums"
pillar: null
belt: null
tags: ["orientation", "tools"]
updated: "2026-08-28"
---

# 0.5 — Meet your tools (a 60-second tour)

> **⏱ 5 minutes · 👥 Everyone · 🎯 Leaves with:** a one-sentence answer to "what is that and why would I open it?" for every tool named in this playbook.

---

## If you're short on time

There are eight tools you'll see named repeatedly. Here's the one-line version of each. The rest of the chapter expands them.

| Tool | One-sentence definition |
|---|---|
| **Claude Code** | The terminal app you'll type into 80% of the time — the harness for everything else. |
| **Claude.ai** | The browser chat at `claude.ai`. Fine for thinking out loud; **not** for shipping code. |
| **Claude Design** | The visual workspace at `claude.ai/design`. Use the Blade project for design exploration; use Claude Code + Blade MCP for repo changes and compliance checks. |
| **Cowork** | Anthropic's desktop app for non-developers — same AI, wrapped in a folder-and-file UI instead of a terminal. |
| **Compass** | Razorpay's plugin that ships skills, hooks, and MCPs into Claude Code — *not* a tool you open, it's a layer inside Claude Code. |
| **Slash** | Razorpay's remote AI worker for internal research and bounded repo tasks. Use knowledge-first mode to understand; use execution mode when the repo and result are clear. |
| **Cursor** | A VS Code-style IDE with AI built in; useful for reading code visually while Claude Code edits it. |
| **Codex / OpenAI tools** | A secondary coding-agent surface outside Compass. Use it only when current support policy confirms access and routes the task there. |

If you only remember one thing: **Claude Code is the one you live in.** Everything else is an accessory.

---

## Claude Code

**What it is:** A terminal application from Anthropic. You install it once per laptop, `cd` into a repo, and run `claude`. It opens a prompt. You type natural language. It reads files, proposes edits, runs commands, and waits for your approval on anything dangerous.

**Why you'll use it:** This is the harness (Layer 5 from [§0.3](03-mental-model.md)). Every PR you open as part of this playbook (from White Belt W-5 onwards) goes through Claude Code. The Compass plugin, the skills, the MCPs, all of it activates *inside* Claude Code.

**The feel:** Imagine pairing with a senior engineer who can read any file in the repo, run the tests, and show you a diff — but who only works through a terminal. That's Claude Code.

**Where it lives:** `https://code.claude.com`. Official docs: [code.claude.com/docs](https://code.claude.com/docs/en/best-practices). You install it with the setup script; [Appendix B](../appendices/B-environment-setup/README.md) is the durable environment guide. The auth backs onto Razorpay's LiteLLM gateway (Layer 3).

**When to reach for it:** Any time you want to change code, create a component, debug a UI issue, write a test, open a PR, or teach a skill. Default answer.

---

## Claude.ai

**What it is:** The chat at `claude.ai`. A web browser window with a text box. It reaches Claude through your SSO workspace rather than the LiteLLM gateway. Its context comes from the conversation, files you upload, and any workspace connectors you are allowed to use; it does not inherit your local working tree or Compass runtime.

**Why you'll use it:** For thinking, writing, PM-style work: draft a Slack post, explain a technical concept in plain English, brainstorm an RFC, summarise a long doc. It's *excellent* for those.

**The feel:** ChatGPT, but with Claude as the model. Low-ceremony, no setup.

**When NOT to reach for it:** **When you want to ship code into a Razorpay repo.** Claude.ai can help draft or explain code, but it cannot inspect your live branch, run the repo checks, or apply Razorpay conventions it has not been given. Treat its code as a proposal: bring the intent into Claude Code, inspect the current repo, apply Blade, and run the required build, tests, and review checks. The in-repo [`production-compiler` reference definition](../skills/production-compiler/README.md) shows one repair-workflow pattern; its source here does not mean your Compass runtime installs it. [Appendix C](../appendices/C-skills-library/README.md) explains that source-versus-runtime boundary.

**Rule of thumb:** Claude.ai is for *talking about* code. Claude Code is for *shipping* code. Don't cross the streams.

---

## Claude Design

**What it is:** A visual design workspace at [claude.ai/design](https://claude.ai/design), separate from Claude Code. Razorpay's Blade design project gives it Blade tokens, components, states, and interaction patterns for design exploration.

**Why you'll use it:** To turn a product idea into a Blade-aware mock-up, compare visual directions, or iterate on a flow before anyone changes the repository.

**The two-step start:** Open Claude Design, select the Blade project, and say what you are exploring and who it is for. Then add: `Use the Blade design system.` Review component choice, states, copy, and flow before sharing the result.

**Boundary:** Claude Design creates visual drafts; it does not make a draft production-ready. If the task moves into a repository, switch to **Claude Code + Blade MCP**, compare against the existing code, and run the required build, visual, and review checks. If a Blade component is missing from the Design project, do not improvise a new system component—flag the gap and verify the supported option.

**Rule of thumb:** Claude Design for the visual direction; Claude Code + Blade MCP for the shippable implementation.

---

## Cowork

**What it is:** Anthropic's desktop application, currently in research-preview, aimed at people who are not developers. Same Claude models, same agent-loop feel, and a folder-first UI for documents, decks, spreadsheets, and local files — but not the repo-shipping path.

**Why you'll see it mentioned:** Some builders — especially designers and ops folks who are deep in documents, spreadsheets, and presentations rather than code — find Cowork a more natural entry point. It's what this playbook is being written in right now. Cowork has a built-in **skills** system that parallels Claude Code's (pptx, docx, pdf, etc.), so a lot of "create a deck for my skip" work happens here. If the task touches source code or a Razorpay repo, move to terminal Claude Code through LiteLLM.

**The feel:** Like having Claude live in a folder on your Desktop. You open it, point it at a directory, and talk.

**Relationship to Claude Code:** Similar prompting muscle, different job. A designer using Cowork for decks can later move to Claude Code for repo work without relearning how to prompt — but the actual code path is Claude Code in the terminal, with Compass and LiteLLM active.

**When to reach for it:** If you're not touching code yet and want to automate document-heavy work (reports, decks, spreadsheets). If your current task is "I need to write this Word document / deck / PDF for a review," Cowork is usually faster than booting Claude Code + a docx skill.

---

## Compass (the plugin, not a separate app)

**What it is:** A **plugin that runs inside Claude Code.** Not a standalone tool. The installed Compass version can add Razorpay-specific extensions such as:

- **Skills**: structured Markdown instructions for Razorpay-native tasks; [Appendix C](../appendices/C-skills-library/README.md) catalogues the reference patterns separately from current runtime availability.
- **Subagents** — smaller specialist Claudes that the main Claude can delegate to (e.g. a Blade reviewer agent).
- **Hooks**: scripts that auto-fire at pre-commit, pre-PR, or other Claude Code lifecycle moments.
- **Slash commands** — typed shortcuts exposed by the plugins currently installed. Run `/help` to see the live inventory, and invoke a named shortcut only when it appears there.
- **MCP servers**: Model Context Protocol servers that let Claude talk to Blade, Figma, Slack, DevRev, etc.

**Why it matters:** Compass is how supported Razorpay context and workflows reach Claude Code. What is available depends on the version you installed; a skill definition in this repository is not proof that Compass distributes the same command. The [origin-story chapter](02-bd1-bd2-origin.md) explains why the program pins plugin versions.

**The feel:** You won't open a separate Compass app; you will see whichever extensions the installed version loads inside Claude Code. Run `/help` and inspect the installed plugin sources for the current runtime inventory. Do not infer an available command from an example elsewhere in the playbook.

**When to reach for it:** You don't reach for it. You install it once in [W.7 — Compass plugin](../belts/01-white/W07-compass-plugin.md), then it stays available inside Claude Code. Questions go to [`#ai-help`](https://razorpay.slack.com/archives/C08C35GKJKD).

---

## Slash (formerly Vyom)

**What it is:** Razorpay's remote internal AI worker, invoked with `@slash`. It has two useful modes: knowledge first for understanding internal flows and execution for a scoped repo task that may end in a draft PR. It was formerly called Vyom.

**Why it's in this playbook:** Because it is easy to confuse remote delegation with the Claude Code session on your laptop. Slash can research approved internal sources, work against a named remote repo, implement a bounded change, and raise a PR. It cannot see your local uncommitted files or provide the same tight edit-run-debug loop.

**The feel:** Handing a well-scoped task to a remote teammate. The clearer the repo, constraints, and expected result, the better the handoff.

**When to reach for it:** Use `@slash --plan <query>` or `--discover` when you need internal context before acting. Use `@slash repo:<repo-name> <task>` when the repository, change, and expected result are already clear.

**Relationship to this playbook:** Complementary, not interchangeable. Slash handles remote research and bounded repo tasks. Claude Code + Compass remains the local, policy-aware belt path for iterative editing, builds, tests, certification, and final shipping checks. Review a Slash-generated PR like any other PR; opening one is not proof that the work is done.

---

## Cursor

**What it is:** A fork of VS Code with AI coding features built in. Looks and feels like the code editor most designers / PMs have seen their engineer teammates use, with a chat pane on the right.

**Why it's here:** Two reasons. First, during structured events Cursor has been listed as a backup in the setup guide — if Claude Code has trouble authing, Cursor is a fallback. Second, many builders find the *visual* layout of Cursor comforting: you can see the file tree, open multiple tabs, and still ask an AI for help. Claude Code does this in-terminal; Cursor does it in a graphical IDE.

**The feel:** If you've used VS Code, Cursor looks identical with an AI panel on the right. You can run Claude Code *inside* Cursor's integrated terminal if you want the best of both — many senior builders do exactly that.

**When to reach for it:** When you want to *read* the codebase visually while editing: multi-file tabs, search across files, IDE navigation. Then run Claude Code in Cursor's integrated terminal for the actual AI agent loop.

---

## Codex / other non-Claude AI coding tools

**What they are:** OpenAI's Codex CLI, GitHub Copilot, Amazon Q, and other coding agents that can inspect or edit a local workspace. They are real builder tools, but they do not load Razorpay's Claude-shaped Compass skills, Blade connector, or pre-ship guardrails by default.

**Why they're here now:** You may encounter Codex in older workflows or through a support-approved seat, so you should recognise the boundary. Access is policy-controlled: the shared trial is not a default fallback. When Codex is unavailable, continue with Claude or an enabled GPT route through LiteLLM; builders already provisioned on Claude Team should follow the migration route from support.

**Rule of thumb:** Use Claude Code for belt work, Compass-backed workflows, Blade-aware reviews, and anything you plan to certify. If support confirms Codex access for a bounded implementation, verification, or second-opinion task, use it only for that scope. Bring any resulting code back through Claude Code + Compass checks before PR.

If you're curious about the broader comparison, [Appendix A — Tool Atlas](../appendices/A-tool-atlas/README.md) is the durable map of which surface fits which job.

---

## The one-screenshot rule

When you read a later chapter that says "run this in Claude Code" or "open this in Cowork," you should have a picture in your head of what that looks like. If you don't yet, take a screenshot break right now:

- Open Claude Code in a terminal. Run `claude`. Type a harmless question. See the response.
- Open Cowork on your desktop (if you've installed it). See the folder-first UI.
- Open `claude.ai` in a browser tab. Compare.
- Open `claude.ai/design`, select the Blade project, and compare its canvas with the plain chat.
- Open the Slash internal URL if you have access. Compare.

Five minutes now saves you hours of "wait, which tool am I supposed to be in?" later.

---

## What you should carry into the next chapter

- **Claude Code is the default.** Everything else is an accessory to it.
- **Compass is inside Claude Code** — it's not a thing you launch separately.
- **Claude.ai is for talking about code, not shipping it.** Don't paste its output into a Razorpay PR.
- **Claude Design is for visual exploration.** Use its Blade project for drafts; move to Claude Code + Blade MCP for repository work.
- **Cowork is the designer / PM-friendly front door** to the same AI stack, optimised for documents over repos.
- **Slash is the remote delegation path** — knowledge-first for internal context, execution mode for a bounded repo task.
- **Cursor** is a graphical IDE you can run Claude Code inside for the best of both worlds.
- **Codex is optional, not the default fallback.** Use it only when support confirms access for the task; run Compass-backed checks before shipping its output.
- The next chapter ([§0.6 — Meet the people](06-people-and-pocs.md)) introduces the roles and forums that own these tools and where to ask when things break.

---

**Previous:** [← 0.4 The Enablement Stack](04-enablement-stack.md) · **Next:** [→ 0.6 Meet the people](06-people-and-pocs.md)

**Further reading**
- [Claude Code docs](https://code.claude.com/docs/en/best-practices) — canonical for Layer 5
- [Anthropic's Model Context Protocol](https://modelcontextprotocol.io/) — the open standard Compass MCPs are built on
- [Appendix A — Tool Atlas](../appendices/A-tool-atlas/README.md)
- [Appendix B — Environment Setup](../appendices/B-environment-setup/README.md)
- [Appendix C — Skills Library](../appendices/C-skills-library/README.md)
