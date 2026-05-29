---
title: "The 5-Layer Mental Model of the AI Dev Stack"
slug: "prologue/mental-model"
section: "prologue"
status: "drafted"
type: "chapter"
track: null
order: 3
time_minutes: 10
audience: "everyone"
outcome: "Be able to draw the five-layer stack and use it to debug where work is stuck."
prev: "prologue/origin-story"
next: "prologue/enablement-stack"
pillar: null
belt: null
tags: ["orientation", "mental-model"]
updated: "2026-05-29"
---

# 0.3 — The 5-Layer Mental Model of the AI Dev Stack

> **⏱ 10 minutes · 👥 Everyone · 🎯 Leaves with:** a mental picture of the five layers that sit between your intent and a running application — clear enough to draw on a whiteboard, accurate enough to debug with.

---

## If you're short on time

The AI dev stack has five layers. From bottom to top:

1. **Files** — the code on disk. The ground truth. Everything else is a wrapper around changing files.
2. **Terminal + Git** — how you move between versions of files and tell the machine what to do.
3. **LiteLLM Gateway** — the model backend. Your prompt travels through Razorpay's LiteLLM gateway at `llm-gateway.razorpay.com`, which routes it to the right Claude model (Sonnet, Opus, Haiku) and bills centrally. You don't pay per token, and you never handle a model-provider API key.
4. **Compass + Plugins**: the Razorpay-specific overlay: skills, hooks, MCPs, slash-commands, subagents. This is the layer that makes Claude "know" our repo, our design system, our review conventions.
5. **Claude Code** — the harness you actually type into. The terminal app that reads/writes files, runs commands, and talks to the model through the gateway via Compass.

If you only remember one thing: **Claude Code is not "the AI." Claude Code is a very smart terminal that uses AI.** The distinction matters more than you'd expect.

> **Heads-up: Razorpay migrated off Vertex.** If you see `ANTHROPIC_VERTEX_PROJECT_ID`, `CLAUDE_CODE_USE_VERTEX`, or `gcloud auth application-default login` in older notes or a teammate's `~/.bashrc`, those are pre-March-2026 artefacts and they will break your setup today. The current path goes through the LiteLLM gateway, configured for you by the setup script in [W.5](../belts/01-white/W05-installing-the-stack.md).

---

## Why a mental model matters

Most people, on day one of using Claude Code, form a wrong model. The wrong model is roughly: *"I type into Claude, Claude does magic, code appears."*

That model works for simple cases — and collapses the moment something doesn't work. When an install fails, when a skill doesn't trigger, when an MCP returns an error, the wrong model has no debugging handles. You're left rebooting things and hoping.

The right model doesn't make you slower at simple work — but it gives you *named things to check* when things break. "Is Layer 3 authed?" is a question. "Why isn't it working?" is not.

Think of it like driving. You don't need to know how an engine works to commute. But the day your car makes a weird noise, the driver who can tell timing-belt from radiator from alternator is the driver who gets home. The Prologue is giving you that vocabulary now — cheaply, before anything breaks.

---

## The diagram you should be able to draw

Here is the mental picture. Use the rendered version first, and keep the text form below it as the whiteboard version you should be able to reproduce.

![The five-layer AI development stack](../diagrams/03-mental-model.svg)

```
   ┌──────────────────────────────────────────────────────────────┐
   │                         YOU                                  │
   │                 (intent, judgement, taste)                   │
   └──────────────────────────────────────────────────────────────┘
                            │  types natural language
                            ▼
   ┌──────────────────────────────────────────────────────────────┐
   │  LAYER 5  ·  CLAUDE CODE (the harness)                       │
   │  Terminal app. Reads/writes files. Runs commands.            │
   │  Shows you diffs. Manages conversation history.              │
   └──────────────────────────────────────────────────────────────┘
                            │  loads context via
                            ▼
   ┌──────────────────────────────────────────────────────────────┐
   │  LAYER 4  ·  COMPASS + PLUGINS (the Razorpay overlay)        │
   │  Skills, hooks, subagents, slash-commands, MCPs.             │
   │  Teaches Claude about Blade, our repos, our review rules.    │
   └──────────────────────────────────────────────────────────────┘
                            │  sends prompts to
                            ▼
   ┌──────────────────────────────────────────────────────────────┐
   │  LAYER 3  ·  LITELLM GATEWAY (the model backend)             │
   │  llm-gateway.razorpay.com — routes to Claude Sonnet/Opus/    │
   │  Haiku and bills centrally. No per-token cost. No API keys   │
   │  to manage; the setup script writes a personal LiteLLM key   │
   │  into ~/.claude/settings.json.                                │
   └──────────────────────────────────────────────────────────────┘
                            │  returns text / tool calls
                            ▼
   ┌──────────────────────────────────────────────────────────────┐
   │  LAYER 2  ·  TERMINAL + GIT (the transport)                  │
   │  Your shell (zsh/bash). Node/pnpm/nvm. Git for versioning.   │
   │  How Claude's suggestions become actual repo state.          │
   └──────────────────────────────────────────────────────────────┘
                            │  manipulates
                            ▼
   ┌──────────────────────────────────────────────────────────────┐
   │  LAYER 1  ·  FILES (the truth)                               │
   │  Source code on disk. The only thing that ever actually ships.│
   │  If it's not in a file in a repo, it didn't happen.          │
   └──────────────────────────────────────────────────────────────┘
```

Read that top-to-bottom as the flow of your intent, bottom-to-top as the chain of causation ("Why did this PR land?"). Both directions matter.

---

## Layer-by-layer tour

### Layer 1 — Files

The boring layer. The most important layer.

Every PR you'll ever open is, at the end, a diff to files. Claude's suggestions are proposed edits. The dev server reads files. Git tracks files. Blade is files. Your prompt context is, fundamentally, files that Claude has been shown.

The reflex you want: **when confused, open the file.** Not the rendered page. Not the prompt. The file. Most debugging sessions are actually "did the edit actually save?" or "is Claude editing the file I think it is?" The answer lives in Layer 1.

Files live in your **working directory**, which at Razorpay will usually be a product repo cloned from GitHub. [W.3 — Git as save-points](../belts/01-white/W03-git-as-savepoints.md) walks you through your first clone. For now: *files are the only thing that's real.*

### Layer 2 — Terminal + Git

The terminal (Terminal.app on Mac, or iTerm2, or Warp) is how you talk to the OS. The commands you'll use in the first week are small:

- `cd` — change directory
- `ls` — list files
- `git status` / `git diff` / `git commit` / `git push` — the four horsemen of version control
- `npm install` / `pnpm install` — pull down dependencies
- `npm run dev` — start the local preview server

You will not memorise these. Claude will type them for you most of the time. But you need to *recognise* them, because when something fails, the error message is going to land in this layer. "`EACCES: permission denied`" is a Layer 2 error. "`401 authentication_error` from the gateway" is a Layer 3 error. "`skill not found`" is a Layer 4 error. Knowing which layer is shouting at you is half the battle.

Node/pnpm/nvm live here too — the JavaScript runtime and package managers that Razorpay's dashboard repos require. The setup script (see Appendix B) installs all of them for you. It runs in Layer 2. It talks to Layer 1. Everything is files and processes.

### Layer 3 — LiteLLM Gateway

This is the layer that usually confuses people the most, because it's invisible.

When you type a question to Claude, Claude Code does not have a tiny model on your laptop thinking about your question. It packages your prompt, your file context, and your conversation history into a network request and sends it to **the LiteLLM gateway at `llm-gateway.razorpay.com`**. LiteLLM authenticates your personal key, picks the right Claude model (Sonnet by default, Opus or Haiku when you ask), forwards the request to Anthropic, captures the response and the usage record, and returns the response to Claude Code. Every single time.

Why a centralised gateway and not the Anthropic API directly? Three reasons, all practical:

1. **Centralised billing and quota.** Razorpay buys model capacity once and shares it across builders. Your prompts are billed against a single org-level budget, not your personal credit card. You never paste an Anthropic API key. You hit a per-builder soft cap (~$100/month at the start of v0.23, scaling with usage patterns) which `@RKV` or [`#claude-onboarding-support`](https://razorpay.slack.com/archives/C0ANCMTCJA2) can raise.
2. **Observability.** Every request lands in the LiteLLM dashboard with cost, model, latency, and tokens. That is how the program understands what is being built, what is expensive, and where to invest.
3. **Routing and policy.** The gateway can swap models, add fallbacks, and enforce policy without every builder editing their config.

**Migration note.** Until March 2026, Razorpay routed through Google Vertex AI with `gcloud auth application-default login`. That path is retired. If a teammate's notes, an old `~/.bashrc`, or an old wiki page mentions Vertex, `aiplatform.googleapis.com`, `ANTHROPIC_VERTEX_PROJECT_ID`, or `CLAUDE_CODE_USE_VERTEX`, treat it as stale and follow [W.5](../belts/01-white/W05-installing-the-stack.md). Stale Vertex env vars are the single most common cause of `403 PERMISSION_DENIED` errors today.

The one reflex that pays off: **if Claude suddenly stops responding or errors with `401 authentication_error`, your LiteLLM key likely rotated or expired.** Re-running the setup script (`curl -fsSL https://get-claude.dev.razorpay.in/setup.sh | bash`) re-mints it and writes the new value into `~/.claude/settings.json`. `403 PERMISSION_DENIED` mentioning `aiplatform.googleapis.com` means the opposite — your shell still has Vertex env vars set from the old path; remove them and restart your terminal. See the seven common failure modes in [W.5](../belts/01-white/W05-installing-the-stack.md#common-failure-modes).

### Layer 4 — Compass + Plugins

This is Razorpay's unfair advantage, and the layer that makes this playbook different from "read the Claude Code docs."

Out of the box, Claude Code knows general software engineering. It does not know:

- That Razorpay uses **Blade** as its design system and has specific component names and conventions.
- That our dashboard repos have specific `package.json` quirks, specific test runners, specific PR templates.
- That our review culture cares about accessibility, right-to-left language support, and specific observability hooks.
- That we have a Blade connector, a Figma connector, and a handful of internal connectors that expose specific capabilities.

The **Compass plugin** fixes that. It's a bundle installed into Claude Code that ships:

- **Skills** — markdown files that tell Claude how to do specific tasks (e.g. choosing a Blade component, running a pre-ship check, guarding PR creation).
- **Hooks** — scripts that run automatically at certain moments (e.g. pre-commit, pre-PR).
- **Subagents** — specialist "smaller Claudes" that Claude can delegate to (e.g. a reviewer agent, a test-writer agent).
- **Slash-commands** — shortcuts you type with `/` (e.g. `/setup-verify`).
- **MCPs (Model Context Protocol servers)**: connectors that let Claude talk to Blade, Figma, Slack, DevRev, etc.

When you install the Compass plugin at White Belt, you're not just getting "a few extra features." You're uploading years of Razorpay engineering knowledge into Claude Code at once. The plugin is version-locked per cohort (see the [previous chapter](02-bd1-bd2-origin.md)) to make sure everyone on your team sees the same Claude, not a different one.

**The mental model shortcut:** *The gateway is the brain. Compass is the education.* Same brain, very different outputs depending on which school it went to.

### Layer 5 — Claude Code (the harness)

Finally, the thing you actually type into.

Claude Code is a terminal application that Anthropic publishes ([code.claude.com/docs](https://code.claude.com/docs/en/best-practices)). You install it, you `cd` into a repo, you run `claude`, and you get a prompt. You type natural language. It types back, proposes edits, runs commands, reads files, shows you diffs, waits for your approval on dangerous operations.

Simon Willison calls the harness the **third pillar** of LLM coding work — alongside prompt engineering and context engineering. ([Read his post on designing agentic loops.](https://simonwillison.net/2025/Oct/15/designing-agentic-loops/)) The harness is what turns "clever text completion" into "can actually run your tests and try again when they fail." Green Belt Part B is entirely about mastering this layer.

Some reflexes to start building now:

- **`/` opens the command palette.** That's how you trigger skills and slash-commands.
- **`#` pins a note to your system prompt.** Useful for "remember we're on feature/login-v2 today."
- **`@` references a file.** `@src/pages/Login.jsx` pulls the file into context.
- **Shift+Tab toggles modes** (plan mode vs. auto-accept mode). Plan mode is safer for first-timers.
- **The session stays alive until you exit.** Start one per task, not one per day.

This chapter doesn't drill deeper because [§0.5 — The 60-second tool tour](05-tool-tour.md) does. But the *layer* matters: when you read later chapters that say "in your Claude Code session," they mean Layer 5, running on top of 1–4.

---

## Where Layer 0 fits

Remember the previous chapter: **Layer 0 is setup.** The thing that has to work before any of the above even boots.

- Is your Mac's Node version correct? (Layer 2)
- Is `~/.claude/settings.json` pointing at the LiteLLM gateway and is your LiteLLM key fresh? (Layer 3)
- Is the Compass plugin installed and version-matched? (Layer 4)
- Can you run `claude` without errors? (Layer 5)

The setup-verify skill (your first boss fight at White Belt) checks each of these and tells you exactly which layer is red. It's the diagnostic doctor for the whole stack. Chapter W-0 is literally titled "Turn GREEN" because GREEN = all five layers alive.

---

## How this model helps you debug

Three worked examples, increasingly nasty, each resolved using the layer vocabulary:

**"Claude isn't responding, it just hangs."**
*Likely Layer 3.* The LiteLLM key may have rotated, or network egress is being filtered. Re-run the setup script to re-mint the key. If that fails, you're in Layer 2 / network territory — post in [`#claude-onboarding-support`](https://razorpay.slack.com/archives/C0ANCMTCJA2) with your traceroute.

**"I typed a slash-command and Claude said the skill doesn't exist."**
*Layer 4.* Either the Compass plugin isn't installed, or it's installed but the skills didn't sync. Run the version-verification script (Appendix B) to compare your local plugin version against the expected one.

**"Claude edited a file but `git diff` shows nothing changed."**
*Layer 1.* The edit happened in a different file than you think — maybe a sibling with a similar name, maybe a symlinked copy. `ls -la` and `git status` in the directory you *think* Claude edited. Nine times out of ten, the file exists somewhere else and Claude got there because your prompt was ambiguous.

None of those debugging moves require you to understand LLMs or networking or Git internals. They just require that you know which *layer* to look at. That's the entire point of the mental model.

---

## A note for engineers reading this

The five-layer model is a **teaching tool**, not an architecture diagram. The LiteLLM gateway is itself a routing layer in front of the model provider. MCPs have a whole protocol spec. Claude Code has a daemon, a JSON-RPC channel, a session store, etc.

The five-layer model is optimised for someone who has never opened a terminal to be able to debug *their own* failures. The appendices go deeper:

- [Appendix A — Tool Atlas](../appendices/A-tool-atlas/README.md) drills into each of Layers 4 and 5.
- [Appendix H — Reference Cards](../appendices/H-reference-cards/README.md) has per-layer cheat sheets.
- [G.23 — The LLM proxy](../belts/03-green/c-guardrails/G23-llm-proxy.md) goes into the gateway's policy and routing surface.

If you want the "real" architecture, skip ahead to those. If you want to onboard a non-engineer teammate next week, stay with the five-layer model. It is load-bearing in every belt from here.

---

## What you should carry into the next chapter

- The stack has **five named layers**. When something breaks, you will name the layer and go there.
- Claude Code (Layer 5) is a harness, not the AI. The AI is reached through the LiteLLM gateway (Layer 3). The education is Compass (Layer 4).
- Files (Layer 1) are ground truth. The terminal (Layer 2) is how files get changed.
- Layer 0 (setup) is what you have to solve before any of this works — see [§0.2](02-bd1-bd2-origin.md).
- The next chapter ([§0.4 — The Enablement Stack](04-enablement-stack.md)) zooms *out* to the nine-layer org-level map that sits above this five-layer personal-level map. Don't confuse them: the 5-layer model is what *you* interact with, the 9-layer model is what *Razorpay* is building.

---

**Previous:** [← 0.2 The origin story](02-bd1-bd2-origin.md) · **Next:** [→ 0.4 The Enablement Stack](04-enablement-stack.md)

**Further reading**
- [Claude Code best-practices docs](https://code.claude.com/docs/en/best-practices) — Anthropic's own introduction to the harness
- [Simon Willison — Designing agentic loops](https://simonwillison.net/2025/Oct/15/designing-agentic-loops/) — the three-pillar frame
- [Anthropic on Model Context Protocol](https://modelcontextprotocol.io/) — the open standard Layer 4 is built on
- [Appendix A — Tool Atlas](../appendices/A-tool-atlas/README.md)
- [G.23 — The LLM proxy](../belts/03-green/c-guardrails/G23-llm-proxy.md) — the gateway, in detail
