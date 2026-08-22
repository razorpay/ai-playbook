# Master index

The human-facing table of contents for the Razorpay AI Playbook.
Links rewritten to the live hub (https://razorpay.github.io/ai-playbook).
Use this for "where do I start" and "show me the shape" questions.

---
> **What this is.** A belt-progression playbook for every Razorpayan — and an outside-readable handbook for anyone picking up the way of working we're developing. From the PM who has never opened a terminal to the staff engineer architecting agent systems. Drawn from the best patterns of Ramp, Intercom, Shopify, StackBlitz, Zapier, Duolingo, Anthropic's own engineering literature, and our internal Builder Day learnings.
>
> **How to read this.** Pick the door below that matches where you are. Each belt has required modules, hands-on quests, and a boss-fight capstone. You earn the next belt by *shipping*, not by reading.
>
> **Status.** v0.64 · last reviewed 2026-08-22 · drafted end-to-end. Pairs with `manifest.yml`, `slugs.yml`, the Starlight hub, [`CONTRIBUTING.md`](https://razorpay.github.io/ai-playbook/CONTRIBUTING/), and [`ROADMAP.md`](https://razorpay.github.io/ai-playbook/ROADMAP/). Version history → [`CHANGELOG.md`](https://razorpay.github.io/ai-playbook/CHANGELOG/).

---

## Find your path

Four doors, one playbook. Pick the one that matches who you are today.

### 🆕 Day one at Razorpay, new to engineering

You've never opened Terminal, or you've used Claude.ai but not Claude Code. Start here:

1. [**Self-assessment**](https://razorpay.github.io/ai-playbook/prologue/10-self-assessment/) (2 min) — tells you which belt to start at.
2. [**Tech 101 — What is software, really?**](https://razorpay.github.io/ai-playbook/foundation/tech-101/01-what-is-software/) (5 min) — or skip if you know what a server is.
3. [**W.5 → Quest W-0**](https://razorpay.github.io/ai-playbook/belts/01-white/W05-installing-the-stack/) (~60 min) — install Claude Code and reach GREEN.
4. [**Appendix H.7 — Day-1 quick reference**](https://razorpay.github.io/ai-playbook/appendices/H-reference-cards/H7-day-1-quick-reference/) — pin this card; it has every command, channel, and contact you need in week 1.

### 🎨 Designer on the AI-native track

You write specs and Figma flows, and you want to ship code via AI:

- [**Prologue: Welcome**](https://razorpay.github.io/ai-playbook/prologue/01-welcome/) — the program promise, in 5 minutes.
- [**Y.9 — Figma MCP**](https://razorpay.github.io/ai-playbook/belts/02-yellow/Y09-figma-mcp/) — connect Figma to Claude Code.
- [**G.15 — Design-to-code: Figma + Blade + Code Connect**](https://razorpay.github.io/ai-playbook/belts/03-green/b-practices/G15-design-to-code/) — the end-to-end pipeline.
- [**B.4 — The Agent SDK**](https://razorpay.github.io/ai-playbook/belts/04-black/a-platform/B04-agent-sdk/) — when you're ready to author agents, not just use them.

### 📊 PM, ops, or other non-coding role

You spend your day in Slack, docs, and tickets. You want AI to reclaim hours:

- [**Ops 101 — Save 4+ hours a week without writing code**](https://razorpay.github.io/ai-playbook/foundation/ops-101/01-why-this-track/) — the entry point.
- [**Triage automations**](https://razorpay.github.io/ai-playbook/foundation/ops-101/03-triage-automations/) — three concrete recipes (inbox, Slack, on-call queue).
- [**Document workflows**](https://razorpay.github.io/ai-playbook/foundation/ops-101/06-document-workflows/) — turn meeting notes and spec drafts into a pipeline.
- [**Quest 0B-2 — The agent diary**](https://razorpay.github.io/ai-playbook/foundation/ops-101/quest-0B2/) — one week of logged AI usage.

### 📚 Looking up a reference

You want a specific tool, term, channel, or person:

- [**Appendix A — Tool Atlas**](https://razorpay.github.io/ai-playbook/appendices/A-tool-atlas/) — when to reach for Claude Code vs Claude.ai vs Cowork vs Compass vs Slash vs Cursor.
- [**Appendix C — Skills Library**](https://razorpay.github.io/ai-playbook/appendices/C-skills-library/) — every skill that ships with the program.
- [**Appendix F — Slack Channels**](https://razorpay.github.io/ai-playbook/appendices/F-slack-channels/) — the live channel directory with handles and owners.
- [**§0.6 — Meet the people**](https://razorpay.github.io/ai-playbook/prologue/06-people-and-pocs/) — named role-holders dated; who to ping for what.
- [**Appendix G — Glossary**](https://razorpay.github.io/ai-playbook/appendices/G-glossary/) — every acronym, tool name, and concept with cross-references.

## How to consume this playbook

Three doors, one source of truth.

| Door | When to use | Where it lives |
|---|---|---|
| **Markdown source** | Diff-review, search, hand-edit, contribute back. | The repository root: `foundation/`, `prologue/`, `belts/`, `appendices/`. |
| **HTML hub** | Browseable navigation, sponsor / new-reader walkthroughs, link-sharing. | `hub/` — generated from the Markdown via Starlight. |
| **Skill definitions** | Inspect reusable workflow contracts, guardrails, and output shapes. | `skills/` — reference implementations in this repo, not a current Compass install contract. Confirm the supported runnable distribution in [`#ai-help`](https://razorpay.slack.com/archives/C08C35GKJKD). |

---

## The Belt Ladder at a Glance

![The belt ladder — from Foundation through the Staff+ Council](./diagrams/belt-ladder-hero.svg)

<details>
<summary>Text version (for Markdown viewers that don't render SVG)</summary>

```
                     ┌─────────────────────────────┐
                     │       STAFF+ COUNCIL         │   Contribute back. Mentor.
                     │  (Charter, RFCs, succession) │   Shape the program's AI posture.
                     └──────────────▲──────────────┘
                                    │
                     ┌──────────────┴──────────────┐
                     │       ⚫ BLACK BELT          │   AI-native builder.
                     │  "I am a force multiplier"   │   Skills, MCPs, agents.
                     └──────────────▲──────────────┘
                                    │ boss fight: own a POD's AI uplift for a month
                     ┌──────────────┴──────────────┐
                     │       🟢 GREEN BELT          │   Team velocity.
                     │  "My team moves faster"      │   Three Pillars mastery.
                     └──────────────▲──────────────┘
                                    │ boss fight: ship a Claude-authored feature to prod
                     ┌──────────────┴──────────────┐
                     │       🟡 YELLOW BELT         │   Daily habit.
                     │  "I build with AI daily"     │   Prompting + permissions + PRs.
                     └──────────────▲──────────────┘
                                    │ boss fight: find an open bug in your area & fix it
                     ┌──────────────┴──────────────┐
                     │       ⚪ WHITE BELT          │   Foundation.
                     │   "I have shipped code"      │   First commit, first PR.
                     └──────────────▲──────────────┘
                                    │ orientation
                     ┌──────────────┴──────────────┐
                     │         PROLOGUE             │   Mental model · operating principles
                     └──────────────▲──────────────┘
                                    │ pre-tools, pre-AI
                     ┌──────────────┴──────────────┐
                     │     PART 0 — FOUNDATION      │   Tech 101 · Ops 101 (heavy)
                     │  "What is this world I'm in" │   For complete newcomers + outside readers
                     └─────────────────────────────┘
```

</details>

### Why belts instead of levels?

Belts tell a story of *earned competence*, not self-reported progress. Ramp's L0–L3 proficiency framework (the gold standard in industry) maps cleanly underneath, but we gate progression on *quests shipped* — you don't declare Yellow Belt; you earn it by opening a real PR.

| Our Belt | Ramp L-level | What it looks like in practice                                              |
|----------|--------------|------------------------------------------------------------------------------|
| ⚪ White  | L0 → L1      | Setup complete (GREEN triage). First commit. Aware of the 5-layer mental model. |
| 🟡 Yellow | L1           | Uses Claude Code daily. Ships a merged PR into a Razorpay org repo.          |
| 🟢 Green  | L2           | Ships across a product repo *and* a greenfield repo. Writes skills others install. |
| ⚫ Black  | L3           | Contributes to Blade or ships full-stack. Builds plugins / MCPs. Multiplies others. |

> **Why this matters.** The belts aren't decorative — they map to the **certification track** the program is running internally. Earning a belt isn't just internal pride; it's a verifiable artefact with a row in the tracker. The gamification and the business metric are the same metric. See [Appendix L](https://razorpay.github.io/ai-playbook/appendices/L-certification/).

---

## How the playbook is shaped

Every chapter is reviewed against seven principles: laymen-first plus engineer-respectful, belts earned through quests rather than self-reported, teach the constraint not the trick, the 5-pillar adoption lattice, Prompt × Context × Harness as the technique-tagging axes, knowledge-base-driven development as the operating philosophy, and fintech guardrails as load-bearing. The full principles plus the contribution flow are in [CONTRIBUTING.md](https://razorpay.github.io/ai-playbook/CONTRIBUTING/).

---

## Origin and structure (read once)

Two background concepts that the playbook depends on; each has its own chapter, so this index just links them rather than duplicating.

- [**The Origin Story** (Prologue §0.2)](https://razorpay.github.io/ai-playbook/prologue/02-bd1-bd2-origin/) — why the first Builder Day produced zero shipped features, what the second one did differently to produce dozens of commits from non-engineers, and the lesson the playbook encodes: setup friction is Layer 0, not an appendix.
- [**The 9-Layer Enablement Stack** (Prologue §0.4)](https://razorpay.github.io/ai-playbook/prologue/04-enablement-stack/) — the org-level layers (Foundation → Collaboration → AI Workflow → Knowledge Base → Design System → Intelligence → Observability → L&D → Infrastructure) that the belts climb across. Includes the north-star *"dashboard and Claude running on cloud; no local setup as a prerequisite for any builder."*

---

# Table of Contents

**Status markers.** `[drafted]` = chapter is end-to-end readable. `[drafted skeleton]` = categorisation and contribution flow are committed; specific entries seed over time. `[planned]` = intentionally visible scaffold, not drafted yet. `[coming]` = referenced future companion material. `[example]` = one worked artefact exists before the full section. The hub hides these markers from rendered titles; they remain in the Markdown source for maintainer use.

## Part 0 — Foundation [drafted]

> **For whom.** Anyone who picks up this playbook without a software background — and any outside reader who wants the complete handbook for the way of working we're developing. Pre-tools. Pre-AI. Pre-belt.
>
> **Promise.** By the end of Part 0 you will (a) be able to read a tech blog post or product spec without losing the plot, and (b) be able to save 4+ hours a week on PM/ops overhead with AI agents *without writing a single line of code*.
>
> **Time budget.** 4–6 hours, spread however you like. Two parallel tracks.

### Track 0A — Tech 101: What is this world I'm in?

| §     | Chapter                                                        | Status | Time   |
|-------|----------------------------------------------------------------|--------|--------|
| 0A.1  | [What is software, really?](https://razorpay.github.io/ai-playbook/foundation/tech-101/01-what-is-software/) | [drafted] | 5 min  |
| 0A.2  | [Frontend vs backend (and why most product friction lives in between)](https://razorpay.github.io/ai-playbook/foundation/tech-101/02-frontend-vs-backend/) | [drafted] | 10 min |
| 0A.3  | [What is a server? What is a client? What is HTTP?](https://razorpay.github.io/ai-playbook/foundation/tech-101/03-server-client-http/) | [drafted] | 10 min |
| 0A.4  | [Databases — the world's most important spreadsheet](https://razorpay.github.io/ai-playbook/foundation/tech-101/04-databases/) | [drafted] | 8 min  |
| 0A.5  | [What is an API? What is a UI?](https://razorpay.github.io/ai-playbook/foundation/tech-101/05-api-vs-ui/) | [drafted] | 8 min  |
| 0A.6  | [Code is text — repos, files, the source of truth](https://razorpay.github.io/ai-playbook/foundation/tech-101/06-code-is-text/) | [drafted] | 5 min  |
| 0A.7  | [Git, conceptually — save points for files](https://razorpay.github.io/ai-playbook/foundation/tech-101/07-git-concepts/) | [drafted] | 8 min  |
| 0A.8  | [Build, deploy, staging, production — the journey of a change](https://razorpay.github.io/ai-playbook/foundation/tech-101/08-build-deploy/) | [drafted] | 10 min |
| 0A.9  | [Tests — what they are, why they exist](https://razorpay.github.io/ai-playbook/foundation/tech-101/09-tests/) | [drafted] | 8 min  |
| 0A.10 | [The shape of a software org — engineers, designers, PMs, ops, SRE](https://razorpay.github.io/ai-playbook/foundation/tech-101/10-shape-of-a-software-org/) | [drafted] | 10 min |

**Files:** `foundation/tech-101/` — one `.md` per chapter, plus a `README.md` index.

### Track 0B — Ops 101: Save 4+ hours a week without writing code

| §     | Chapter                                                        | Status | Time   |
|-------|----------------------------------------------------------------|--------|--------|
| 0B.1  | [Why this track exists — the ops tax that AI eats](https://razorpay.github.io/ai-playbook/foundation/ops-101/01-why-this-track/) | [drafted] | 5 min  |
| 0B.2  | [The non-coding AI surface — Claude.ai, Cowork, Slash, plus connectors](https://razorpay.github.io/ai-playbook/foundation/ops-101/02-non-coding-ai-surface/) | [drafted] | 15 min |
| 0B.3  | [Triage automations — your inbox, Slack, the on-call queue](https://razorpay.github.io/ai-playbook/foundation/ops-101/03-triage-automations/) | [drafted] | 25 min |
| 0B.4  | [Generation automations — standups, meeting notes, weekly summaries](https://razorpay.github.io/ai-playbook/foundation/ops-101/04-generation-automations/) | [drafted] | 25 min |
| 0B.5  | [Ticket automations — drafting, routing, status digesting](https://razorpay.github.io/ai-playbook/foundation/ops-101/05-ticket-automations/) | [drafted] | 25 min |
| 0B.6  | [Document workflows — researching, drafting, reviewing, exporting](https://razorpay.github.io/ai-playbook/foundation/ops-101/06-document-workflows/) | [drafted] | 30 min |
| 0B.7  | [Lightweight agents — when "automate this for me" earns its keep](https://razorpay.github.io/ai-playbook/foundation/ops-101/07-lightweight-agents/) | [drafted] | 25 min |
| 0B.8  | [Building your own minimum viable wiki for any project](https://razorpay.github.io/ai-playbook/foundation/ops-101/08-minimum-viable-wiki/) | [drafted] | 20 min |

**🎮 [Quest 0B-1 — The 30-minute teardown](https://razorpay.github.io/ai-playbook/foundation/ops-101/quest-0B1/) [drafted].** Pick one ops task you do weekly that takes 30+ minutes (running a standup digest, summarising a Slack channel, triaging a queue). Replace it with a Claude+connector workflow. Time it. Show the before/after.

**🎮 [Quest 0B-2 — The agent diary](https://razorpay.github.io/ai-playbook/foundation/ops-101/quest-0B2/) [drafted].** For two weeks, every time you handle a routine ops task, ask: "could a configured agent have done this?" Keep a tally. The answers are the entry list for your boss fight.

**🏁 [Boss Fight 0B — Automate one workflow that saves you 4+ hours/week](https://razorpay.github.io/ai-playbook/foundation/ops-101/boss-fight-0B/) [drafted].**
Pick the highest-leverage entry from your agent diary. Configure it end-to-end (skill or agent + the right connectors). Run it for two weeks. Show the time-saved evidence. Document the recipe so a teammate can fork it.
*Success criteria:* working automation, 2-week measurement, recipe documented for a teammate. [Appendix C](https://razorpay.github.io/ai-playbook/appendices/C-skills-library/) is the first shared recipe-library reference.

**Files:** `foundation/ops-101/` — chapters + quests + boss-fight + a `recipes/` subfolder for the contribution pipeline.

---

## Prologue — Before You Begin

| §     | Chapter                                                     | Status | For whom          | Time  |
|-------|-------------------------------------------------------------|--------|-------------------|-------|
| 0.1   | [Welcome, and why this playbook exists](https://razorpay.github.io/ai-playbook/prologue/01-welcome/) | [drafted] | Everyone          | 5 min |
| 0.2   | [The origin story (and why setup is Layer 0)](https://razorpay.github.io/ai-playbook/prologue/02-bd1-bd2-origin/) | [drafted] | Everyone | 8 min |
| 0.3   | [The 5-Layer Mental Model of the AI Dev Stack](https://razorpay.github.io/ai-playbook/prologue/03-mental-model/) | [drafted] | Everyone | 10 min |
| 0.4   | [The Enablement Stack — the 9-layer map you're climbing](https://razorpay.github.io/ai-playbook/prologue/04-enablement-stack/) | [drafted] | Everyone | 10 min |
| 0.5   | [Meet your tools — a 60-second tour](https://razorpay.github.io/ai-playbook/prologue/05-tool-tour/) | [drafted] | Everyone | 5 min |
| 0.6   | [Meet the people — roles, forums, the support surface](https://razorpay.github.io/ai-playbook/prologue/06-people-and-pocs/) | [drafted] | Everyone | 5 min |
| 0.7   | [Operating Principles — knowledge-base-driven development](https://razorpay.github.io/ai-playbook/prologue/07-operating-principles/) | [drafted] | Everyone | 10 min |
| 0.8   | [How to use this playbook (as a reader)](https://razorpay.github.io/ai-playbook/prologue/08-how-to-read/) | [drafted] | Everyone | 5 min |
| 0.9   | [How to use this playbook (as a team lead)](https://razorpay.github.io/ai-playbook/prologue/09-how-to-lead/) | [drafted] | Managers, leads | 10 min |
| 0.10  | [Self-assessment — which belt should you start at?](https://razorpay.github.io/ai-playbook/prologue/10-self-assessment/) | [drafted] | Everyone | 5 min |
| 0.11  | [The safety brief — what never goes into a prompt](https://razorpay.github.io/ai-playbook/prologue/11-safety-brief/) | [drafted] | Everyone | 10 min |
| 0.12  | [What's shipping this week — the program is alive](https://razorpay.github.io/ai-playbook/prologue/12-whats-shipping/) | [drafted] | Everyone | 3 min |

**Files:** `prologue/01-welcome.md`, `prologue/02-bd1-bd2-origin.md`, `prologue/03-mental-model.md`, `prologue/04-enablement-stack.md`, `prologue/05-tool-tour.md`, `prologue/06-people-and-pocs.md`, `prologue/07-operating-principles.md`, `prologue/08-how-to-read.md`, `prologue/09-how-to-lead.md`, `prologue/10-self-assessment.md`, `prologue/11-safety-brief.md`, `prologue/12-whats-shipping.md`.

---

## ⚪ White Belt — The Foundation Layer

> **Promise.** By the end of White Belt, you will have shipped your first Razorpay commit — even if you've never opened Terminal before.
>
> **Prerequisite.** A Razorpay laptop and your Google SSO. (If "what's a terminal?" still feels foreign, do Part 0 first.)
> **Time budget.** 4–6 hours, spread over a week.
> **Ramp L-level.** L0 → L1.
> **Canonical setup artefacts.** A one-command setup script, a direct seven-check evidence gate, and documented add-on install routes. Every module ends with "what colour are you?"

### Modules

| §    | Chapter                                                              | Pillar*        | Time   |
|------|----------------------------------------------------------------------|----------------|--------|
| W.1  | [The File System — paths, extensions, "where am I"](https://razorpay.github.io/ai-playbook/belts/01-white/W01-file-system/) [drafted] | Context        | 20 min |
| W.2  | [Terminal fluency — 12 commands, 4 shortcuts, 1 mental model](https://razorpay.github.io/ai-playbook/belts/01-white/W02-terminal-fluency/) [drafted] | Harness        | 30 min |
| W.3  | [Git as save-points — branches, commits, push/pull](https://razorpay.github.io/ai-playbook/belts/01-white/W03-git-as-savepoints/) [drafted] | Harness        | 45 min |
| W.4  | [Your auth setup — MyAccess, LiteLLM key, SSO, proxy trust](https://razorpay.github.io/ai-playbook/belts/01-white/W04-auth-setup/) [drafted] | Harness        | 20 min |
| W.5  | [Installing the stack — Node, pnpm, Claude Code, internal npm registry](https://razorpay.github.io/ai-playbook/belts/01-white/W05-installing-the-stack/) [drafted] | Harness       | 40 min |
| W.6  | [The LLM Gateway — what LiteLLM does, what you need to know](https://razorpay.github.io/ai-playbook/belts/01-white/W06-llm-gateway/) [drafted] | Context        | 15 min |
| W.7  | [Compass plugin — source, distribution, and runtime proof](https://razorpay.github.io/ai-playbook/belts/01-white/W07-compass-plugin/) [drafted] | Context        | 20 min |
| W.8  | [GREEN / YELLOW / RED — the supported manual setup gate](https://razorpay.github.io/ai-playbook/belts/01-white/W08-green-yellow-red/) [drafted] | Harness        | 20 min |
| W.9  | [Your first conversation with Claude Code](https://razorpay.github.io/ai-playbook/belts/01-white/W09-first-conversation/) [drafted] | Prompt         | 30 min |
| W.10 | [Prompt quality 101 — "make it better" vs "find all auth handlers"](https://razorpay.github.io/ai-playbook/belts/01-white/W10-prompt-quality-101/) [drafted] | Prompt         | 20 min |
| W.11 | [The permission system — y / n / a, and why auto-yes is a trap](https://razorpay.github.io/ai-playbook/belts/01-white/W11-permission-system/) [drafted] | Harness        | 15 min |
| W.12 | [Your first PR — how to open one, how to get it reviewed](https://razorpay.github.io/ai-playbook/belts/01-white/W12-first-pr/) [drafted] | Harness        | 30 min |

<sub>* Pillar tag: which of **P**rompt / **C**ontext / **H**arness engineering this module exercises.</sub>

### Quests (both required)

**🎮 [Quest W-0 — Turn GREEN](https://razorpay.github.io/ai-playbook/belts/01-white/quest-W0-turn-green/) [drafted].**
Run the W.5 setup flow, then capture the direct seven-check gate: Git, Node, pnpm, Claude Code, LiteLLM configuration, no retired Vertex configuration, and a prompt round-trip. Resolve every YELLOW or RED; if one focused fix does not unblock you, route to [`#ai-help`](https://razorpay.slack.com/archives/C08C35GKJKD) with the redacted failed command and what you tried.
*Success criteria:* seven-row evidence table, all checks ✅.

**🎮 [Quest W-1 — The HelloRazorpay commit](https://razorpay.github.io/ai-playbook/belts/01-white/quest-W1-hello-razorpay/) [drafted].**
Clone an assigned sandbox repo. Create a branch. Change one line in a README. Commit, push, open a PR. Close it.
*Success criteria:* PR URL visible in your belt dashboard.

### Boss fight (required to earn White Belt)

**🏁 [Boss Fight W-B — One real typo, merged](https://razorpay.github.io/ai-playbook/belts/01-white/boss-fight-WB-one-real-typo/) [drafted].**
Find and fix a genuine typo in any public-facing Razorpay doc or open-source repo. Get it merged. This is small — but it's *real*.
*Success criteria:* merged PR.

### What you can say after White Belt

> "I have shipped code."

**Files:** `belts/01-white/` [drafted] — one `.md` per module, plus quest + boss-fight + [badge](https://razorpay.github.io/ai-playbook/belts/01-white/badge/).

---

## 🟡 Yellow Belt — The First Builds

> **Promise.** Claude Code becomes part of your daily rhythm. You ship a merged PR into a Razorpay org repo by *finding an open bug in something you actually use* and fixing it.
>
> **Prerequisite.** ⚪ White Belt.
> **Time budget.** 6–8 hours, spread over 2 weeks.
> **Ramp L-level.** L1 (individual productivity).
> **Live dojo options.** Mini L&D #1 — Terminal + Git. Mini L&D #2 — Figma-to-Code (design track).
> **Design-track add-on.** If you're a designer, stream through the design environment setup for the Blade connector + Figma connector + internal npm registry before tackling Y.9.

### Modules

| §    | Chapter                                                              | Pillar  | Time   |
|------|----------------------------------------------------------------------|---------|--------|
| Y.1  | [The Tool Atlas — Claude Code · Codex · Slash · Claude.ai · Claude workspaces · Cursor · Copilot](https://razorpay.github.io/ai-playbook/belts/02-yellow/Y01-tool-atlas/) [drafted] | Context | 30 min |
| Y.2  | [When to reach for which tool — a decision tree](https://razorpay.github.io/ai-playbook/belts/02-yellow/Y02-tool-decision-tree/) [drafted] | Harness | 15 min |
| Y.3  | [Prompt quality, deep dive — intent · constraints · success criteria](https://razorpay.github.io/ai-playbook/belts/02-yellow/Y03-prompt-quality-deep/) [drafted] | Prompt  | 40 min |
| Y.4  | [What Claude can see and what it can't — context 101](https://razorpay.github.io/ai-playbook/belts/02-yellow/Y04-context-101/) [drafted] | Context | 20 min |
| Y.5  | [CLAUDE.md primer — your project's rule book](https://razorpay.github.io/ai-playbook/belts/02-yellow/Y05-claude-md-primer/) [drafted] | Context | 25 min |
| Y.6  | [Reading unfamiliar code with Claude — the "explain this repo" flow](https://razorpay.github.io/ai-playbook/belts/02-yellow/Y06-reading-code/) [drafted] | Prompt  | 30 min |
| Y.7  | [Permissions, hooks, slash commands — staying safe while moving fast](https://razorpay.github.io/ai-playbook/belts/02-yellow/Y07-permissions-and-hooks/) [drafted] | Harness | 20 min |
| Y.8  | [LiteLLM and Claude workspace access — use the route you were provisioned](https://razorpay.github.io/ai-playbook/belts/02-yellow/Y08-litellm-and-enterprise/) [drafted] | Harness | 15 min |
| Y.9  | [Figma MCP for non-engineers — design → running code in 20 minutes](https://razorpay.github.io/ai-playbook/belts/02-yellow/Y09-figma-mcp/) [drafted] | Context | 30 min |
| Y.10 | [Slack MCP + Google Workspace MCP — the context you already have](https://razorpay.github.io/ai-playbook/belts/02-yellow/Y10-slack-and-gworkspace-mcps/) [drafted] | Context | 30 min |
| Y.11 | [Bug hunting with AI — using git history + Slack + the repo to triage](https://razorpay.github.io/ai-playbook/belts/02-yellow/Y11-bug-hunting/) [drafted] | Prompt  | 30 min |
| Y.12 | [Debugging with Claude — the "what went wrong" loop](https://razorpay.github.io/ai-playbook/belts/02-yellow/Y12-debugging-loop/) [drafted] | Prompt  | 30 min |
| Y.13 | [PR craft — titles, descriptions, review etiquette, staged commits](https://razorpay.github.io/ai-playbook/belts/02-yellow/Y13-pr-craft/) [drafted] | Harness | 20 min |
| Y.14 | [Staying current — how to subscribe to changelogs without drowning](https://razorpay.github.io/ai-playbook/belts/02-yellow/Y14-staying-current/) [drafted] | Meta    | 10 min |

### Quests (both required)

**🎮 [Quest Y-1 — Ship the Stand-up Bot](https://razorpay.github.io/ai-playbook/belts/02-yellow/quest-Y1-standup-bot/) [drafted].**
Build a small utility — a Slack formatter, a Google Docs summariser, a spreadsheet cleanup script — end-to-end with Claude Code, in a single working day.

**🎮 [Quest Y-2 — The 30-day 2-minute challenge](https://razorpay.github.io/ai-playbook/belts/02-yellow/quest-Y2-30-day-challenge/) [drafted].**
Two minutes of AI-assisted work, every workday, for 30 days. Keep a short log and weekly reflection so the habit becomes visible without turning tracking into the work.

### Boss fight (required to earn Yellow Belt)

**🏁 [Boss Fight Y-B — Find a bug in your area and fix it](https://razorpay.github.io/ai-playbook/belts/02-yellow/boss-fight-YB/) [drafted].**
Pick one nagging bug or papercut in a product surface you use weekly — your dashboard, your tools, a checkout flow you live in. Find it. Use Claude Code together with git history, the relevant Slack threads (via the Slack connector), and any open ticket (via the ticketing connector) to triage it. Propose a fix. Ship the PR. Tag the surface owner for review.

The point of this boss fight is *not* the size of the change — it's the *full loop*: identifying a real-world problem, gathering context across tools, proposing a fix, and landing it. You demonstrate the git + Slack + AI loop, not just the AI part.

*Success criteria:* PR URL + a one-paragraph retro covering (a) how you found the bug, (b) what context the AI had to read to triage it, (c) what surprised you about the fix.

### What you can say after Yellow Belt

> "I build with AI daily. I find and fix things in the surfaces I care about."

**Files:** `belts/02-yellow/` [drafted] — one `.md` per module, plus quests, boss-fight, and [badge](https://razorpay.github.io/ai-playbook/belts/02-yellow/badge/).

---

## 🟢 Green Belt — Team Velocity

> **Promise.** You don't just use AI — you *engineer around it*. You shape your team's context, author skills, orchestrate subagents, run multiple agents in parallel. You understand the three pillars and teach them to teammates.
>
> **Prerequisite.** 🟡 Yellow Belt. Optionally, enrolment in the **Ship to Learn** track (3 phases, 7 weeks: Foundations → Guided Build → Solo Ship), nominated via the Selection Framework.
> **Time budget.** 10–14 hours of playbook, plus the capstone feature. Ship to Learn cohort: 7 weeks calendar.
> **Ramp L-level.** L2 (team-workflow integration).
> **Built skills you will learn to drive.** The design-intel skill, the Blade-component-choice decision tree, the page-scaffolding skills, the production-compiler, the repo-orientation skill, the UI-debugging skill, the Blade-compliance reviewer, the pre-ship-check, and the PR-guardrail. (Source: Enablement Stack Layer 2.)

### Part A — The Craft [drafted]

| §    | Chapter                                                              | Pillar  | Time   |
|------|----------------------------------------------------------------------|---------|--------|
| G.1  | [The Three Pillars — prompt × context × harness](https://razorpay.github.io/ai-playbook/belts/03-green/a-craft/G01-three-pillars/) [drafted] | All     | 20 min |
| G.2  | [Why context windows fill — the single constraint everything else follows](https://razorpay.github.io/ai-playbook/belts/03-green/a-craft/G02-context-windows/) [drafted] | Context | 20 min |
| G.3  | [CLAUDE.md for a real service — WHAT + WHY, under 200 lines](https://razorpay.github.io/ai-playbook/belts/03-green/a-craft/G03-claude-md-real-service/) [drafted] | Context | 45 min |
| G.4  | [Hierarchical CLAUDE.md in a monorepo — root vs package vs local](https://razorpay.github.io/ai-playbook/belts/03-green/a-craft/G04-hierarchical-claude-md/) [drafted] | Context | 30 min |
| G.5  | [CLAUDE.local.md — personal overrides, and what belongs there](https://razorpay.github.io/ai-playbook/belts/03-green/a-craft/G05-claude-local-md/) [drafted] | Context | 10 min |
| G.6  | [Skills — what they are, why they compound](https://razorpay.github.io/ai-playbook/belts/03-green/a-craft/G06-skills-overview/) [drafted] | Context | 25 min |
| G.7  | [Writing your first SKILL.md — the anatomy, naming, discipline](https://razorpay.github.io/ai-playbook/belts/03-green/a-craft/G07-writing-your-first-skill/) [drafted] | Context | 45 min |
| G.8  | [Subagents — when to delegate, how to pass intent cleanly](https://razorpay.github.io/ai-playbook/belts/03-green/a-craft/G08-subagents/) [drafted] | Harness | 30 min |
| G.9  | [Worktrees — running 3–5 Claude instances in parallel, safely](https://razorpay.github.io/ai-playbook/belts/03-green/a-craft/G09-worktrees/) [drafted] | Harness | 30 min |
| G.10 | [Hooks + slash commands — when to automate the pre-flight](https://razorpay.github.io/ai-playbook/belts/03-green/a-craft/G10-hooks-and-slash-commands/) [drafted] | Harness | 30 min |
| G.11 | [Advanced prompting — goals, constraints, worked examples](https://razorpay.github.io/ai-playbook/belts/03-green/a-craft/G11-advanced-prompting/) [drafted] | Prompt  | 40 min |

### Part B — The Practices [drafted]

| §    | Chapter                                                              | Pillar  | Time   |
|------|----------------------------------------------------------------------|---------|--------|
| G.12 | [E2E testing with Playwright + Claude Code](https://razorpay.github.io/ai-playbook/belts/03-green/b-practices/G12-playwright-and-claude-code/) [drafted] | Harness | 45 min |
| G.13 | [The Playwright Skill pattern — one-shot test quality](https://razorpay.github.io/ai-playbook/belts/03-green/b-practices/G13-playwright-skill-pattern/) [drafted] | Context | 30 min |
| G.14 | [`tests/seed.spec.ts` — saving the agent 10,000 tokens](https://razorpay.github.io/ai-playbook/belts/03-green/b-practices/G14-tests-seed-spec/) [drafted] | Context | 15 min |
| G.15 | [Design-to-code — Figma + Blade + Code Connect, end to end](https://razorpay.github.io/ai-playbook/belts/03-green/b-practices/G15-design-to-code/) [drafted] | Context | 60 min |
| G.16 | [Blade deep dive — tokens, primitives, variants, accessibility](https://razorpay.github.io/ai-playbook/belts/03-green/b-practices/G16-blade-deep-dive/) [drafted] | Context | 45 min |
| G.17 | [The production-compiler skill — AI-Studio / ChatGPT output → Blade](https://razorpay.github.io/ai-playbook/belts/03-green/b-practices/G17-production-compiler-skill/) [drafted] | Context | 30 min |
| G.18 | [Node + pnpm + localhost + mobile viewport — the daily loop](https://razorpay.github.io/ai-playbook/belts/03-green/b-practices/G18-daily-loop/) [drafted] | Harness | 30 min |
| G.19 | [Branch-preview platform — branch → live URL](https://razorpay.github.io/ai-playbook/belts/03-green/b-practices/G19-design-preview-platform/) [drafted] | Harness | 30 min |
| G.20 | [Observability with AI — logs, traces, cost attribution](https://razorpay.github.io/ai-playbook/belts/03-green/b-practices/G20-observability-with-ai/) [drafted] | Harness | 25 min |
| G.21 | [Debugging the hard kind — when Claude is wrong, and you have to tell](https://razorpay.github.io/ai-playbook/belts/03-green/b-practices/G21-debugging-hard-kind/) [drafted] | Prompt  | 30 min |

### Part C — Fintech Guardrails [drafted]

| §    | Chapter                                                              | Pillar  | Time   |
|------|----------------------------------------------------------------------|---------|--------|
| G.22 | [What never goes into a prompt — the Razorpay redlines](https://razorpay.github.io/ai-playbook/belts/03-green/c-guardrails/G22-redlines/) [drafted] | Harness | 20 min |
| G.23 | [The LLM proxy — what LiteLLM does and why every call routes through it](https://razorpay.github.io/ai-playbook/belts/03-green/c-guardrails/G23-llm-proxy/) [drafted] | Harness | 25 min |
| G.24 | [PII, PCI, RBI — the regulators, the reasons, the reflexes](https://razorpay.github.io/ai-playbook/belts/03-green/c-guardrails/G24-pii-pci-rbi/) [drafted] | Context | 30 min |
| G.25 | [Prompt injection + output classifiers — the threats, the mitigations](https://razorpay.github.io/ai-playbook/belts/03-green/c-guardrails/G25-prompt-injection/) [drafted] | Harness | 30 min |
| G.26 | [The pre-ship-check skill — 6-layer gate before every PR](https://razorpay.github.io/ai-playbook/belts/03-green/c-guardrails/G26-pre-ship-check-skill/) [drafted] | Harness | 20 min |
| G.27 | [The Blade-compliance reviewer skill — file-granularity checks](https://razorpay.github.io/ai-playbook/belts/03-green/c-guardrails/G27-blade-compliance-skill/) [drafted] | Harness | 15 min |
| G.28 | [Using a subagent for security review](https://razorpay.github.io/ai-playbook/belts/03-green/c-guardrails/G28-security-review-subagent/) [drafted] | Harness | 20 min |

### Quests (both required)

**🎮 [Quest G-1 — Author a team skill](https://razorpay.github.io/ai-playbook/belts/03-green/a-craft/quest-G1-author-a-team-skill/) [drafted].**
Write, commit, and share a SKILL.md that captures one of your team's repeated workflows. At least one teammate has to successfully invoke it.
*Success criteria:* merged skill, invocation log from ≥1 teammate.

**🎮 [Quest G-2 — The Greenfield cross-over](https://razorpay.github.io/ai-playbook/belts/03-green/b-practices/quest-G2-greenfield-crossover/) [drafted].**
Pick a greenfield target (an internal tool, a new shared skill, a self-serve analytics surface, a plugin) and ship one meaningful change that exercises Part A and Part B together.
*Success criteria:* merged PR, logged against your tracker row.

### Boss fight (required to earn Green Belt)

**🏁 [Boss Fight G-B — The double-ship](https://razorpay.github.io/ai-playbook/belts/03-green/c-guardrails/boss-fight-GB-double-ship/) [drafted].**
A real feature on a product repo plus your Quest G-2 greenfield PR. The product-repo PR must include: (a) a scoped CLAUDE.md for the change, (b) at least one Playwright test, (c) a pre-ship-check pass with all 6 layers green, (d) the PR-guardrail used to construct the PR, (e) a teammate's 👍 on the craft of the prompts, not just the output.
*Success criteria:* two merged PRs (one product, one greenfield) + retrospective + teammate sign-off.

### What you can say after Green Belt

> "My team moves faster because of how I use AI."

**Files:** `belts/03-green/` [drafted] — organised into subfolders `a-craft/`, `b-practices/`, `c-guardrails/`, plus the [Green Belt badge](https://razorpay.github.io/ai-playbook/belts/03-green/c-guardrails/badge/). Boss Fight G-B closes the belt.

---

## ⚫ Black Belt — AI-Native Builder

> **Promise.** You build the leverage others run on. You author skills and plugins that propagate across PODs. You coach. You shape Razorpay's AI posture with RFCs, API reviews, and strategy input.
>
> **Prerequisite.** 🟢 Green Belt + nomination by a manager or Green Belt teammate.
> **Time budget.** 15–25 hours, open-ended.
> **Ramp L-level.** L3 (delegating workflows to agents; building with AI).

### Part A — Build the Platform [drafted]

| §    | Chapter                                                              | Pillar  |
|------|----------------------------------------------------------------------|---------|
| B.1  | [Authoring an internal MCP server — architecture, auth, packaging](https://razorpay.github.io/ai-playbook/belts/04-black/a-platform/B01-internal-mcp-server/) [drafted] | Harness |
| B.2  | [Publishing a shared skill — placement, validation, review](https://razorpay.github.io/ai-playbook/belts/04-black/a-platform/B02-skill-pack-publishing/) [drafted] | Context |
| B.3  | [Publishing a plugin — package once, prove every surface](https://razorpay.github.io/ai-playbook/belts/04-black/a-platform/B03-cowork-plugin-marketplace/) [drafted] | Harness |
| B.4  | [The Claude Agent SDK — when to write your own agent](https://razorpay.github.io/ai-playbook/belts/04-black/a-platform/B04-agent-sdk/) [drafted] | Harness |
| B.5  | [Multi-agent orchestration — patterns that work, patterns that don't](https://razorpay.github.io/ai-playbook/belts/04-black/a-platform/B05-multi-agent-orchestration/) [drafted] | Harness |
| B.6  | [Tool design — JSON schemas, output shapes, error contracts](https://razorpay.github.io/ai-playbook/belts/04-black/a-platform/B06-tool-design/) [drafted] | Harness |

### Part B — Push the Craft [drafted]

| §    | Chapter                                                              | Pillar  |
|------|----------------------------------------------------------------------|---------|
| B.7  | [Progressive disclosure — skills that stay small](https://razorpay.github.io/ai-playbook/belts/04-black/b-craft/B07-progressive-disclosure/) [drafted] | Context |
| B.8  | [Memory systems — auto-memory, session state, long-running agents](https://razorpay.github.io/ai-playbook/belts/04-black/b-craft/B08-memory-systems/) [drafted] | Context |
| B.9  | [Prompt evals — A/B, regression, golden sets](https://razorpay.github.io/ai-playbook/belts/04-black/b-craft/B09-prompt-evals/) [drafted] | Prompt  |
| B.10 | [Cost attribution + observability at team + org scale](https://razorpay.github.io/ai-playbook/belts/04-black/b-craft/B10-cost-and-observability/) [drafted] | Harness |
| B.11 | [Effort settings, model routing, fall-backs](https://razorpay.github.io/ai-playbook/belts/04-black/b-craft/B11-effort-and-routing/) [drafted] | Harness |

### Part C — Shape the Org [drafted]

| §    | Chapter                                                              | Focus   |
|------|----------------------------------------------------------------------|---------|
| B.12 | [Running office hours — the Whoop / Ramp pattern](https://razorpay.github.io/ai-playbook/belts/04-black/c-org/B12-running-office-hours/) [drafted] | Culture |
| B.13 | [Embedded sprints — the CTO-with-a-team week](https://razorpay.github.io/ai-playbook/belts/04-black/c-org/B13-embedded-sprints/) [drafted] | Culture |
| B.14 | [Writing an AI RFC — what good looks like at Razorpay](https://razorpay.github.io/ai-playbook/belts/04-black/c-org/B14-writing-an-ai-rfc/) [drafted] | Governance |
| B.15 | [Contributing to the API Council (AI-specific reviews)](https://razorpay.github.io/ai-playbook/belts/04-black/c-org/B15-api-council-contributions/) [drafted] | Governance |
| B.16 | [Plugin + skill governance — approval, deprecation, security review](https://razorpay.github.io/ai-playbook/belts/04-black/c-org/B16-plugin-and-skill-governance/) [drafted] | Governance |

### Quests (both required)

**🎮 [Quest B-1 — Publish a shared skill](https://razorpay.github.io/ai-playbook/belts/04-black/a-platform/quest-B1-publish-an-internal-plugin/) [drafted].**
A repository-native skill, with an MCP dependency only when needed, merged to `razorpay/agent-skills` so another POD can install it with one command.
*Success criteria:* ≥2 installs from other PODs within a month.

**🎮 [Quest B-2 — Component contribution or full-stack feature](https://razorpay.github.io/ai-playbook/belts/04-black/b-craft/quest-B2-contribution-or-full-stack/) [drafted].**
One of:
(a) Submit a Blade component via the contribution pipeline.
(b) Ship a feature involving a backend change (not just frontend). You must own the PR in both layers.
*Success criteria:* merged contribution.

### Boss fight (required to earn Black Belt)

**🏁 [Boss Fight B-B — Own a POD's AI uplift for a month](https://razorpay.github.io/ai-playbook/belts/04-black/c-org/boss-fight-BB-pod-ai-uplift/) [drafted].**
Embed with a POD (not your own) for one month. Measure their before/after on a shared metric (PRs merged, time-to-first-commit, cycle time, skill-trace count, whatever their lead picks). Document the intervention. Share in an all-hands. Ideally seeded via the cross-POD signal forum.
*Success criteria:* signed-off metric lift + 1-pager case study contributed to this playbook.

### What you can say after Black Belt

> "I am a force multiplier for Razorpay."

**Files:** `belts/04-black/` [drafted] — organised into `a-platform/`, `b-craft/`, and `c-org/`. All three parts drafted; both quests claimable; [Boss Fight B-B](https://razorpay.github.io/ai-playbook/belts/04-black/c-org/boss-fight-BB-pod-ai-uplift/) and the [Black Belt badge](https://razorpay.github.io/ai-playbook/belts/04-black/c-org/badge/) close the belt.

---

## Staff+ Council [drafted]

Beyond the belts. The Council is the standing community of senior contributors who shape the program's AI direction over multi-year horizons. Members sit on the Council by invitation, advise on technical direction, mentor Black Belt candidates, sponsor RFCs against the program's AI surface, and represent the program externally through talks, blog posts, and OSS contributions.

The Council is not a belt. It is not a credential earned through quests. It is a community joined when an engineer is already operating at the level. The literature is unanimous on this point and the chapters are explicit about it.

| § | Chapter | Time |
|---|---|---|
| C.1 | [What this is and is not](https://razorpay.github.io/ai-playbook/belts/05-council/C01-what-this-is/) | 25 min |
| C.2 | [Structure: charter, cadence, membership](https://razorpay.github.io/ai-playbook/belts/05-council/C02-structure/) | 35 min |
| C.3 | [The RFC pipeline and the decision archive](https://razorpay.github.io/ai-playbook/belts/05-council/C03-rfc-pipeline/) | 40 min |
| C.4 | [Mentoring and sponsorship at the senior level](https://razorpay.github.io/ai-playbook/belts/05-council/C04-mentoring-and-sponsorship/) | 35 min |
| C.5 | [External voice: writing, speaking, OSS, brand](https://razorpay.github.io/ai-playbook/belts/05-council/C05-external-voice/) | 35 min |
| C.6 | [The multi-year horizon](https://razorpay.github.io/ai-playbook/belts/05-council/C06-multi-year-horizon/) | 25 min |

Plus a [Council charter template](https://razorpay.github.io/ai-playbook/belts/05-council/charter/) that the Council itself ratifies and revises annually.

**Files:** `belts/05-council/` [drafted] — README, six chapters, charter artefact.

---

# Cross-Cutting References (always available)

These are the *reference* sections — not belt-gated. Everyone can dip in at any time.

## Appendix A — The Tool Atlas [drafted]

The fast decision map for choosing the right AI surface. Includes one-line guidance per tool and the anti-patterns to avoid.

| Tool             | One-liner                                             |
|------------------|-------------------------------------------------------|
| Claude Code      | Terminal-native coding agent; Razorpay's default      |
| Codex            | OpenAI's coding agent; optional secondary surface when current support guidance confirms access |
| Slash            | Razorpay's internal AI copilot                        |
| Claude.ai        | The web chat; good for thinking out loud              |
| Claude workspaces| Enterprise for approved hosted work; Team only when separately provisioned |
| Cursor           | AI-native IDE; still in use for some teams            |
| GitHub Copilot   | IDE autocomplete; Claude + Codex as agent back-ends   |
| Cowork           | Desktop mode for non-engineers                        |

**File:** [`appendices/A-tool-atlas/README.md`](https://razorpay.github.io/ai-playbook/appendices/A-tool-atlas/).

## Appendix B — Environment Setup + MCP Directory [drafted]

The Layer 0 setup reference: what must be true before the tools work, what the GREEN/YELLOW/RED support packet should contain, the six-row verification sequence, and how to think about MCP connectors safely.

The MCP directory is type-based: it names connector classes, use cases, and guardrails without publishing internal endpoint details.

**File:** [`appendices/B-environment-setup/README.md`](https://razorpay.github.io/ai-playbook/appendices/B-environment-setup/).

## Appendix C — Skills Library [drafted]

The first reusable-workflow reference: what counts as a skill, current skill categories, and the contribution pattern for turning a repeated recipe into a maintained workflow.

**File:** [`appendices/C-skills-library/README.md`](https://razorpay.github.io/ai-playbook/appendices/C-skills-library/).

## Appendix D — Known Issues + FAQ [drafted]

A living document. Categorised by stack layer (Foundation, Compass plugin, design / dashboard, skills / agents, infrastructure). Layer 0 carries thirteen setup entries, and Layer 3 now carries the recurring context-window exhaustion FAQ promoted from support threads. Other layers densify as builders contribute when they hit and solve a gap.

**File:** [`appendices/D-known-issues/README.md`](https://razorpay.github.io/ai-playbook/appendices/D-known-issues/).

## Appendix E — Roles & Forums [drafted skeleton]

Roles and forums — not named individuals (names rotate; rules don't). Updated quarterly.

| Topic                                          | Owned by                  |
|------------------------------------------------|---------------------------|
| Program leadership                             | Program lead + sponsor    |
| Design transformation                          | Design transformation lead |
| Compass plugin                                 | Compass plugin owner      |
| Enablement Stack architecture                  | Enablement Stack co-authors |
| Blade leadership                               | Blade design-system leads |
| Cross-POD signal forum                         | Forum facilitators        |
| Builder Day operations                         | Program lead              |
| Claude workspace access                        | TBD                       |
| LiteLLM gateway / model billing | LiteLLM gateway owner    |
| Slash engineering                              | Slash engineering lead    |
| Blade connector                                | Blade team                |
| Figma connector                                | Figma connector team      |
| Security review                                | TBD                       |
| Playbook Council                               | Council chair             |

**File:** [`appendices/E-roles-and-forums/README.md`](https://razorpay.github.io/ai-playbook/appendices/E-roles-and-forums/).

## Appendix F — Slack Channels + Rules of Engagement [drafted]

A live directory of 20+ named channels organised by purpose (setup, AI community, design, platform/devex, wider product context, exploration), with handles, owners, first-response expectations, and the six rules of engagement.

Six rules: ask publicly not in DM, post the full output not "it's broken", celebrate merged PRs with the link, never paste regulator-protected data, when you solve a problem contribute to Appendix D, tag the right channel and do not cross-post.

**File:** [`appendices/F-slack-channels/README.md`](https://razorpay.github.io/ai-playbook/appendices/F-slack-channels/).

## Appendix G — Glossary [drafted]

Every acronym, Razorpay-specific term, tool name, role, and concept used in the curriculum. Short definitions with cross-links to the chapters where each term is treated in depth.

**File:** [`appendices/G-glossary/README.md`](https://razorpay.github.io/ai-playbook/appendices/G-glossary/).

## Appendix H — Quick-Reference Cards (printable) [drafted]

- [H.1 — Never put this in a prompt](https://razorpay.github.io/ai-playbook/appendices/H-reference-cards/H1-never-put-this-in-a-prompt/) — the redline card; companion to §0.11.
- [H.2 — Terminal essentials](https://razorpay.github.io/ai-playbook/appendices/H-reference-cards/H2-terminal-essentials/) — the twelve commands and four shortcuts.
- [H.3 — Git essentials](https://razorpay.github.io/ai-playbook/appendices/H-reference-cards/H3-git-essentials/) — everyday commands plus the four recovery moves.
- [H.4 — Claude Code essentials](https://razorpay.github.io/ai-playbook/appendices/H-reference-cards/H4-claude-code-essentials/) — permission system, slash commands, daily rhythm.
- [H.5 — Playwright essentials](https://razorpay.github.io/ai-playbook/appendices/H-reference-cards/H5-playwright-essentials/) — everyday commands plus four debugging moves.
- [H.6 — Minimum-viable-wiki one-pager](https://razorpay.github.io/ai-playbook/appendices/H-reference-cards/H6-mv-wiki-one-pager/) — the four-file shape plus the discipline.
- [H.7 — Day-1 quick reference](https://razorpay.github.io/ai-playbook/appendices/H-reference-cards/H7-day-1-quick-reference/) — install commands, top channels, contacts, common failures, and pinned URLs for new builders.

**Files:** [`appendices/H-reference-cards/`](https://razorpay.github.io/ai-playbook/appendices/H-reference-cards/) — one `.md` per card.

## Appendix I — Templates [drafted]

Eight ready-to-fork templates, each with a worked example:

- [`CLAUDE.md` (service-level)](https://razorpay.github.io/ai-playbook/appendices/I-templates/CLAUDE-md-service/)
- [`CLAUDE.md` (monorepo root)](https://razorpay.github.io/ai-playbook/appendices/I-templates/CLAUDE-md-monorepo/)
- [`CLAUDE.local.md` (gitignored personal)](https://razorpay.github.io/ai-playbook/appendices/I-templates/CLAUDE-local-md/)
- [`SKILL.md` (minimum viable)](https://razorpay.github.io/ai-playbook/appendices/I-templates/SKILL-md-minimum/)
- [`SKILL.md` (full, with progressive disclosure)](https://razorpay.github.io/ai-playbook/appendices/I-templates/SKILL-md-full/)
- [RFC template](https://razorpay.github.io/ai-playbook/appendices/I-templates/RFC-template/) — the canonical RFC referenced by B.14 and C.3
- [Retro template](https://razorpay.github.io/ai-playbook/appendices/I-templates/retro-template/) — three variants for Quest, Boss Fight, Embedded Sprint
- [Minimum-viable-wiki seed](https://razorpay.github.io/ai-playbook/appendices/I-templates/minimum-viable-wiki-seed/) — index, log, schema, and CLAUDE.md

**Files:** [`appendices/I-templates/`](https://razorpay.github.io/ai-playbook/appendices/I-templates/).

## Appendix J — Reading List [drafted]

The public sources the curriculum cites, organised by curriculum location. Each entry has a one-line annotation. Includes Will Larson's *Staff Engineer*, Tanya Reilly's *The Staff Engineer's Path*, Lara Hogan's *Resilient Management* and *Demystifying Public Speaking*, the Oxide RFD archive, IETF RFC 2119 and 7282, the public engineering blogs (Stripe Press, Increment, Etsy Code as Craft, Cloudflare, GitHub, Shopify, Square), and the senior-IC writing archives at lethain.com, charity.wtf, noidea.dog, and larahogan.me.

**File:** [`appendices/J-reading-list/README.md`](https://razorpay.github.io/ai-playbook/appendices/J-reading-list/).

## Appendix K — Changelog [drafted]

Versioning discipline. Every non-trivial change logged with date, author, rationale. Lives at [`CHANGELOG.md`](https://razorpay.github.io/ai-playbook/CHANGELOG/) at the repository root rather than under `appendices/K-changelog/` so release tooling and `git log` agree on the artefact.

**File:** [`CHANGELOG.md`](https://razorpay.github.io/ai-playbook/CHANGELOG/).

## Appendix L — Certification [drafted]

The *contract* between the playbook and the program's certification track. The playbook is the on-ramp; the tracker is the scoreboard.

### Belt → certification (the contract)

| Belt earned → | Evidence required                                                |
|---------------|------------------------------------------------------------------|
| ⚪ White       | setup-verify all-green + closed practice PR                      |
| 🟡 Yellow      | One PR raised in any Razorpay org repo (merged or under review)  |
| 🟢 Green       | Two merged PRs (one product repo + one greenfield) + pre-ship-check pass |
| ⚫ Black       | Green criteria + (component contribution OR backend change shipped) |

### Certification process

1. Candidate earns the belt (quest + boss fight complete).
2. Evidence logged against their row in the certification tracker.
3. Program lead verifies PR(s) + quality.
4. Public recognition in the celebrations channel.
5. Tracker updated.

**Quality guardrails.** All code must pass standard PR review. "Non-trivial" = 50+ lines of meaningful code (not just config/styling tweaks). Deployments must be in production for 1+ week without critical bugs.

### Tracker structure (seed)

| Name | Role (PM / PD) | POD | Belt | # of PRs merged | Date certified | Mentor |
|------|----------------|-----|------|-----------------|----------------|--------|

The page keeps the quality bar simple: evidence over self-report, small reviewable artefacts, and tracker fields that force proof.

**File:** [`appendices/L-certification/README.md`](https://razorpay.github.io/ai-playbook/appendices/L-certification/).

## Appendix M — The Ship-to-Learn Cohort Track (Green Belt capstone) [planned]

Not every reader will go through Ship-to-Learn — but every Green Belt candidate will recognise the architecture.

**Structure (7 weeks, 3 phases):**
1. **Foundations (2 weeks).** Self-paced modules + Mini L&Ds. Completes White + Yellow modules; ends with a GREEN triage confirmation and Yellow Belt certification.
2. **Guided Build (3 weeks).** Candidate picks a project from the Selection Framework (frontend-heavy, non-critical-path, scoped to 4–6 weeks, low external dependencies, backlog or early planning). Weekly 1:1 with the program lead + weekly 15-min check-in with the BU lead. 60–80% of candidate's time.
3. **Solo Ship (2 weeks).** Ships to production (or staging if prod requires additional review). Code review approval, meets design specs, no critical bugs.

**Selection criteria summary:**
- *Good-fit people:* PM2/PM3 or Senior Designer; high learning agility; 60–80% time; AI-curious; strong product/design fundamentals.
- *Good-fit projects:* 80%+ UI/UX work; non-critical path; 4–6 weeks scope; backlog or early planning; low external deps.
- *Red flags to avoid:* AI-skeptical, on PIP, leading critical-path work, backend-heavy project, tight external deadlines, high cross-team dependencies.

**File:** `appendices/M-ship-to-learn.md`.

## Appendix N — Methodologies & Frameworks [drafted]

The long-form companion to Prologue §0.7. Profiles the major operating frameworks that knowledge-base-driven AI work has converged on, plus a rubric for evaluating the next one.

| § | Section | What it covers |
|---|---------|----------------|
| N.1 | Knowledge-base-driven development as a discipline [drafted] | The thesis: don't re-derive context, accumulate it. The single idea uniting everything below. |
| N.2 | gstack (Garry Tan) [drafted] | Specialist skills as roles (CEO, eng manager, designer, QA, security, release). Sprint sequencing. Persistent KB exposed as MCP. The "process, not tools" framing. |
| N.3 | Get Shit Done (TÂCHES) [drafted] | Meta-prompting + context engineering + spec-driven development. The `.planning/` directory pattern. XML plans sized for fresh windows. Subagent waves. |
| N.4 | The LLM Wiki pattern (Karpathy) [drafted] | Anti-RAG. The wiki as a persistent, compounding artefact. `index.md`, `log.md`, the schema file. Memex lineage. |
| N.5 | Simon Willison's three pillars [drafted] | Prompt × Context × Harness as the orthogonal axes. How the other frameworks distribute across them. |
| N.6 | Spec-first / agentic-loop design [drafted] | The harness pattern that makes the rest reliable. |
| N.7 | The minimum viable wiki — a one-hour stand-up [drafted] | A single concrete recipe drawn from N.2–N.4. CLAUDE.md schema + index.md + log.md + a `.kb/` or `.planning/` directory. |
| N.8 | Evaluating new frameworks — a rubric [drafted] | When the next gstack-equivalent appears in 6 months, here's the lens. |

**File:** `appendices/N-methodologies/` — one `.md` per section, plus a `README.md` overview.
---

# What comes next

The full curriculum is drafted end-to-end. The Tier-1 readability pass landed in v0.23: the action pages now contain their actions, the directory pages name real channels and people, and this Master Index is a navigation tool rather than a release log. The remaining work is audio summaries, validation sweeps, voice variation across belt overviews, and v1.0 operational close. Detailed sequence and open questions live in [ROADMAP.md](https://razorpay.github.io/ai-playbook/ROADMAP/). The release log lives in [CHANGELOG.md](https://razorpay.github.io/ai-playbook/CHANGELOG/).

Contributing to the playbook (design principles, production plan, content rules, voice commitments): see [CONTRIBUTING.md](https://razorpay.github.io/ai-playbook/CONTRIBUTING/).

---

*Designed to be a living document. Pull requests welcome. Last reviewed 2026-08-07.*
