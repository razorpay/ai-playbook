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
updated: "2026-04-26"
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
| **Slash** | Razorpay's internal AI product (formerly "Vyom") — a web UI over internal data. Different from the others; don't confuse it with Claude Code. |
| **Cursor** | A VS Code-style IDE with AI built in; useful for reading code visually while Claude Code edits it. |
| **Codex / OpenAI tools** | Out of scope for this program — mentioned so you know why we standardised on Claude, not because you'll use them. |

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

**What it is:** Anthropic's desktop application, currently in research-preview, aimed at people who are not developers. Same Claude models, same agent loops, same file/code capabilities — but presented through a folder-first UI instead of a terminal prompt.

**Why you'll see it mentioned:** Some builders — especially designers and ops folks who are deep in documents, spreadsheets, and presentations rather than code — find Cowork a more natural entry point. It's what this playbook is being written in right now. Cowork has a built-in **skills** system that parallels Claude Code's (pptx, docx, pdf, etc.), so a lot of "create a deck for my skip" work happens here.

**The feel:** Like having Claude live in a folder on your Desktop. You open it, point it at a directory, and talk.

**Relationship to Claude Code:** Same underlying stack, different front door. A designer using Cowork for decks can later move to Claude Code for repo work without relearning how to prompt — the mental model is the same.

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

**When to reach for it:** You don't reach for it. You install it once (as part of White Belt W-3) and it's always there. Questions go to [`#claude-onboarding-support`](https://razorpay.slack.com/archives/C0ANCMTCJA2).

---

## Slash (formerly Vyom)

**What it is:** Razorpay's internal AI product: a web-based assistant that sits over internal data (tickets, messaging, docs, etc.) for asking questions in natural language. Rebranded from "Vyom" in 2025.

**Why it's in this playbook:** Because people confuse it with Claude Code, and they shouldn't. Slash is a *consumer* product for the whole org — any Razorpayan can use it to ask "what does my sprint look like?" or "summarise this thread." It's great at that. Claude Code is a *builder* product that edits repos and opens PRs. Different jobs.

**The feel:** A company-branded chatbot with access to Razorpay's internal data sources. Web UI.

**When to reach for it:** For research and discovery questions that benefit from Razorpay context: competitive analyses, summarising support trends, asking about org-wide data. Not for writing code, running tests, or opening PRs.

**Relationship to this playbook:** Tangential. You may use Slash *to inform* a task ("what are the top support complaints in the merchant dashboard?") but you'll still ship the actual code through Claude Code.

---

## Cursor

**What it is:** A fork of VS Code with AI coding features built in. Looks and feels like the code editor most designers / PMs have seen their engineer teammates use, with a chat pane on the right.

**Why it's here:** Two reasons. First, during structured events Cursor has been listed as a backup in the setup guide — if Claude Code has trouble authing, Cursor is a fallback. Second, many builders find the *visual* layout of Cursor comforting: you can see the file tree, open multiple tabs, and still ask an AI for help. Claude Code does this in-terminal; Cursor does it in a graphical IDE.

**The feel:** If you've used VS Code, Cursor looks identical with an AI panel on the right. You can run Claude Code *inside* Cursor's integrated terminal if you want the best of both — many senior builders do exactly that.

**When to reach for it:** When you want to *read* the codebase visually while editing: multi-file tabs, search across files, IDE navigation. Then run Claude Code in Cursor's integrated terminal for the actual AI agent loop.

---

## Codex / other non-Claude AI coding tools

**Briefly, for completeness.** There are other AI coding tools: OpenAI's Codex CLI, GitHub Copilot, Amazon Q, various self-hosted agents. This playbook is Claude-shaped because Razorpay standardised on Claude (routed through the LiteLLM gateway) for three reasons: the Compass plugin is Claude-native; the Blade connector integrates cleanly with Claude Code's MCP layer; and our skills library is written as Claude Code skills.

**You don't need to use other tools to earn any belt.** If you're curious about them for comparison, Appendix K will (eventually) cover the landscape. For now, the playbook's stance is: *one harness, one skill library, one workflow.* Pick Claude Code. Go deep.

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
- **Slash is a different category** — a consumer chatbot over internal data, not a builder tool.
- **Cursor** is a graphical IDE you can run Claude Code inside for the best of both worlds.
- The next chapter ([§0.6 — Meet the people](06-people-and-pocs.md)) introduces the roles and forums that own these tools and where to ask when things break.

---

**Previous:** [← 0.4 The Enablement Stack](04-enablement-stack.md) · **Next:** [→ 0.6 Meet the people](06-people-and-pocs.md)

**Further reading**
- [Claude Code docs](https://code.claude.com/docs/en/best-practices) — canonical for Layer 5
- [Anthropic's Model Context Protocol](https://modelcontextprotocol.io/) — the open standard Compass MCPs are built on
- [Appendix A — Tool Atlas](../appendices/A-tool-atlas/README.md)
- [Appendix B — Environment Setup](../appendices/B-environment-setup/README.md)
- [Appendix C — Skills Library](../appendices/C-skills-library/README.md)
