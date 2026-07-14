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
outcome: "Tell Claude Code, Claude.ai, Cowork, Compass, Slash, Cursor, and Codex apart."
prev: "prologue/enablement-stack"
next: "prologue/roles-and-forums"
pillar: null
belt: null
tags: ["orientation", "tools"]
updated: "2026-07-14"
---

# 0.5 — Meet your tools (a 60-second tour)

> **⏱ 5 minutes · 👥 Everyone · 🎯 Leaves with:** a one-sentence answer to "what is that and why would I open it?" for every tool named in this playbook.

---

## If you're short on time

There are seven tools you'll see named repeatedly. Here's the one-line version of each. The rest of the chapter expands them.

| Tool | One-sentence definition |
|---|---|
| **Claude Code** | The terminal app you'll type into 80% of the time — the harness for everything else. |
| **Claude.ai** | The browser chat at `claude.ai`. Fine for thinking out loud; **not** for shipping code. |
| **Cowork** | Anthropic's desktop app for non-developers — same AI, wrapped in a folder-and-file UI instead of a terminal. |
| **Compass** | Razorpay's plugin that ships skills, hooks, and MCPs into Claude Code — *not* a tool you open, it's a layer inside Claude Code. |
| **Slash** | Razorpay's remote AI worker for internal research and bounded repo tasks. Use knowledge-first mode to understand; use execution mode when the repo and result are clear. |
| **Cursor** | A VS Code-style IDE with AI built in; useful for reading code visually while Claude Code edits it. |
| **Codex / OpenAI tools** | A secondary coding-agent surface. Not the belt default, but useful when current LiteLLM policy routes routine overflow or second-opinion work there. |

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

**What it is:** The chat at `claude.ai`. A web browser window with a text box. Same underlying models (reached through Anthropic directly via your SSO seat, not through the LiteLLM gateway), no file access, no repo context, no Razorpay skills.

**Why you'll use it:** For thinking, writing, PM-style work: draft a Slack post, explain a technical concept in plain English, brainstorm an RFC, summarise a long doc. It's *excellent* for those.

**The feel:** ChatGPT, but with Claude as the model. Low-ceremony, no setup.

**When NOT to reach for it:** **When you want to ship code into a Razorpay repo.** Claude.ai has no access to your files, no Blade knowledge, and none of the pre-ship / PR-guardrail skills. Code pasted out of Claude.ai into a repo has a near-perfect record of failing compliance because it doesn't know Blade exists. The failure mode is so common that a dedicated "production-compiler" skill exists specifically to repair Claude.ai / AI-Studio / ChatGPT output when someone has already gone down this path. [Appendix C](../appendices/C-skills-library/README.md) is the first catalogue for those skills.

**Rule of thumb:** Claude.ai is for *talking about* code. Claude Code is for *shipping* code. Don't cross the streams.

---

## Cowork

**What it is:** Anthropic's desktop application, currently in research-preview, aimed at people who are not developers. Same Claude models, same agent-loop feel, and a folder-first UI for documents, decks, spreadsheets, and local files — but not the repo-shipping path.

**Why you'll see it mentioned:** Some builders — especially designers and ops folks who are deep in documents, spreadsheets, and presentations rather than code — find Cowork a more natural entry point. It's what this playbook is being written in right now. Cowork has a built-in **skills** system that parallels Claude Code's (pptx, docx, pdf, etc.), so a lot of "create a deck for my skip" work happens here. If the task touches source code or a Razorpay repo, move to terminal Claude Code through LiteLLM.

**The feel:** Like having Claude live in a folder on your Desktop. You open it, point it at a directory, and talk.

**Relationship to Claude Code:** Similar prompting muscle, different job. A designer using Cowork for decks can later move to Claude Code for repo work without relearning how to prompt — but the actual code path is Claude Code in the terminal, with Compass and LiteLLM active.

**When to reach for it:** If you're not touching code yet and want to automate document-heavy work (reports, decks, spreadsheets). If your current task is "I need to write this Word document / deck / PDF for a review," Cowork is usually faster than booting Claude Code + a docx skill.

---

## Compass (the plugin, not a separate app)

**What it is:** A **plugin that runs inside Claude Code.** Not a standalone tool. When you install Compass, your Claude Code gets a bundle of Razorpay-specific extensions:

- **Skills**: structured markdown instructions that tell Claude how to do Razorpay-native tasks (choosing a Blade component, running a pre-ship check, guarding PR creation, etc.; [Appendix C](../appendices/C-skills-library/README.md) catalogues the pattern).
- **Subagents** — smaller specialist Claudes that the main Claude can delegate to (e.g. a Blade reviewer agent).
- **Hooks**: scripts that auto-fire at pre-commit, pre-PR, or other Claude Code lifecycle moments.
- **Slash commands** — typed shortcuts like `/setup-verify` or `/pre-ship-check` that trigger skills.
- **MCP servers**: Model Context Protocol servers that let Claude talk to Blade, Figma, Slack, DevRev, etc.

**Why it matters:** This is Razorpay's unfair advantage. Without Compass, Claude Code is a generic coding assistant. With Compass, it's a Razorpay-native builder copilot that already knows Blade, our repo conventions, and our review culture. The [origin-story chapter](02-bd1-bd2-origin.md) has a whole paragraph on why we version-lock the Compass plugin.

**The feel:** You won't *see* Compass — you'll see its effects. When you type `/` and a long list of Razorpay-specific commands appears, that's Compass. When Claude randomly knows that the Blade `Button` component is called that and has these variants, that's Compass.

**When to reach for it:** You don't reach for it. You install it once (as part of White Belt W-3) and it's always there. Questions go to [`#ai-help`](https://razorpay.slack.com/archives/C08C35GKJKD).

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

**Why they're here now:** Current usage policy treats Codex as an approved fallback when Claude-family or LiteLLM model limits block routine work. That does not make it the playbook default; it means a Day-1 builder should recognise the name when support says "use Codex for this overflow task."

**Rule of thumb:** Use Claude Code for belt work, Compass-backed workflows, Blade-aware reviews, and anything you plan to certify. Use Codex for bounded implementation, verification, or a second opinion when the support path explicitly routes you there. If Codex produces code that lands in a Razorpay repo, still bring the result back through Claude Code + Compass checks before PR.

If you're curious about the broader comparison, [Appendix A — Tool Atlas](../appendices/A-tool-atlas/README.md) is the durable map of which surface fits which job.

---

## The one-screenshot rule

When you read a later chapter that says "run this in Claude Code" or "open this in Cowork," you should have a picture in your head of what that looks like. If you don't yet, take a screenshot break right now:

- Open Claude Code in a terminal. Run `claude`. Type a harmless question. See the response.
- Open Cowork on your desktop (if you've installed it). See the folder-first UI.
- Open `claude.ai` in a browser tab. Compare.
- Open the Slash internal URL if you have access. Compare.

Five minutes now saves you hours of "wait, which tool am I supposed to be in?" later.

---

## What you should carry into the next chapter

- **Claude Code is the default.** Everything else is an accessory to it.
- **Compass is inside Claude Code** — it's not a thing you launch separately.
- **Claude.ai is for talking about code, not shipping it.** Don't paste its output into a Razorpay PR.
- **Cowork is the designer / PM-friendly front door** to the same AI stack, optimised for documents over repos.
- **Slash is the remote delegation path** — knowledge-first for internal context, execution mode for a bounded repo task.
- **Cursor** is a graphical IDE you can run Claude Code inside for the best of both worlds.
- **Codex is a fallback, not the curriculum spine.** Use it when the support path points there; run Compass-backed checks before shipping its output.
- The next chapter ([§0.6 — Meet the people](06-people-and-pocs.md)) introduces the roles and forums that own these tools and where to ask when things break.

---

**Previous:** [← 0.4 The Enablement Stack](04-enablement-stack.md) · **Next:** [→ 0.6 Meet the people](06-people-and-pocs.md)

**Further reading**
- [Claude Code docs](https://code.claude.com/docs/en/best-practices) — canonical for Layer 5
- [Anthropic's Model Context Protocol](https://modelcontextprotocol.io/) — the open standard Compass MCPs are built on
- [Appendix A — Tool Atlas](../appendices/A-tool-atlas/README.md)
- [Appendix B — Environment Setup](../appendices/B-environment-setup/README.md)
- [Appendix C — Skills Library](../appendices/C-skills-library/README.md)
