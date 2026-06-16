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
updated: "2026-06-16"
---

# 0B.2 — The non-coding AI surface

> **⏱ 15 minutes · 👥 PMs, designers, ops, anyone non-engineering · 🎯 Leaves with:** a one-sentence answer to "which AI tool should I open right now?" plus the connector concept that makes the rest of this track work.

---

## If you're short on time

There are three places non-coders open AI for work, and one supporting concept that ties them together:

| Tool | One-sentence definition |
|---|---|
| **Claude.ai** | A web browser tab where you talk to Claude. Best for thinking, writing, drafting, brainstorming. No file access, no auto-running, no connectors. |
| **Cowork** | A desktop app where Claude can work in folders on your computer and use installed plugins. Best for document-heavy work and small repeatable tasks. |
| **Slash** | Razorpay's internal assistant, a web tool that already knows about your tickets, docs, and channels. Best for "what does my sprint look like" questions. |
| **Connectors** | Not a tool. A *capability*. A connector is what lets an AI read or act on Slack, Google Workspace, your ticketing tool, your calendar — i.e. the apps where your work actually lives. |

If you only remember one thing: **the AI tool is not the bottleneck. The connectors are.** Which AI surface you pick is a question of comfort and habit. *What that AI can see* (your messages, your docs, your tickets) is a question of which connectors you've turned on, and that's where most of the leverage in this track comes from.

---

## Why the surface matters less than you think

It's tempting to ask "which is the best one?" The honest answer is that any of the three will get most ops work done. Comfort matters. The AI surface you'll actually open every day is the one that wins.

Pick the one whose layout you like. Pick the one your team already uses. Pick the one that's already on your laptop. Don't agonise. *The leverage isn't in the surface, it's in what the surface can see and do on your behalf.* The rest of this chapter is about the see-and-do part.

A useful frame: each of the three surfaces is a different *front door* to roughly the same AI. The room the AI lives in (the model, the agent loop, the underlying capabilities) is mostly identical. The doors are different shapes — Claude.ai is a browser tab, Cowork is a desktop window, Slash is an internal-tools page — and each is best at different ergonomics.

---

## Claude.ai

**What it is.** A page on the web at `claude.ai`. You open it, you see a text box, you type. Claude responds. That's the entire UI.

**The feel.** It's the closest thing to chatting with a very smart, very patient junior colleague who can read whatever you paste in. Low ceremony, no setup beyond logging in.

**Best for.**
- Drafting: emails, briefs, doc updates, talking points, tricky responses you want to think through.
- Thinking out loud: "help me unpack this problem," "what are the trade-offs here," "what am I missing."
- Reading and summarising — paste a long document and ask for a one-pager, or for the bits relevant to a specific question.
- Brainstorming — "give me twenty ways to frame this," "argue against my thesis."

**Limits.** Claude.ai can't read files on your laptop or in your Drive on its own. It can't post to Slack or open tickets. It can't run automatically while you're away. Whatever you want it to know, you have to paste in or type out. Whatever it produces, you have to copy-paste somewhere to use.

That sounds like a lot of limits, and it is — but for the kinds of work most of us do *while sitting at the keyboard*, they don't matter. Claude.ai is a knife. Cowork and Slash are kitchens. The knife is fine for most cooking.

---

## Cowork

**What it is.** A desktop application (a window that lives on your laptop, not in a browser tab) that gives Claude access to a folder on your computer plus a set of installed *plugins*. It's specifically designed for people who don't open Terminal.

**The feel.** Like having Claude live in a folder on your Desktop. You open Cowork, point it at a directory (a project folder, a Drive folder you've synced, the place your weekly reports live), and now Claude can read and write files there as you talk to it. You can install plugins that bundle skills, and Claude will use them automatically when relevant.

**Best for.**
- Document workflows: open a folder of meeting notes, ask Claude to summarise the last month into a single doc, save the result back into the folder.
- Spreadsheet work: give it a messy CSV, ask it to clean and reformat, get an `xlsx` back.
- Slide decks: generate a `pptx` from a brief, edit existing decks, swap out templates.
- PDF processing: extract tables, fill forms, merge docs, redact.
- Repeatable small tasks: "every Monday, open this folder, look at last week's notes, and produce a digest" type work.

**Limits.** Cowork doesn't (today) replace your IDE for serious coding work. If you want to ship pull requests, that's Claude Code, not Cowork — which is a White Belt topic, not an Ops 101 one. Cowork also requires installation on your laptop, which means asking IT for permission if your machine is locked down.

If your day is heavy on documents, decks, spreadsheets, and PDFs (and most ops days are) Cowork pays for itself in the first afternoon.

---

## Slash

**What it is.** Razorpay's internal AI assistant, a web tool you can open from your browser. Behind the scenes it's already plumbed into a number of internal data sources (tickets, docs, channels) so the queries that take you ten minutes of clicking around take it ten seconds.

**The feel.** Like a very well-informed colleague with org-wide read access. You can ask it questions about the *internal* world (your sprint, that thread from last month, what's open in your team's queue) without context-switching between four tools yourself.

**Best for.**
- "What does my sprint look like?" / "What's open on my plate?"
- "Summarise this thread / channel / doc."
- Discovery questions that benefit from internal context: competitive research that pulls from internal docs, support trend questions, "what did we decide about X last quarter."
- Cross-tool queries that would otherwise mean opening four tabs and copy-pasting between them.

**Limits.** Slash is a *consumer* product: for asking questions, getting summaries, doing research. It's not (today) the right place to *take action*: opening a ticket, posting to Slack, sending an email. For action-taking, you'll lean on Claude.ai or Cowork plus connectors.

The one-line distinction: **Slash is a great place to ask. Claude.ai and Cowork are good places to act.**

---

## The supporting concept: connectors

This is the part that determines whether you save four hours a week or twenty.

A **connector** is a piece of plumbing that lets your AI surface read or act on a specific external system: Slack, Google Workspace, your ticketing tool, your calendar, your knowledge base, etc. Without connectors, every AI surface is an isolated island; you have to manually paste in everything you want it to know about. With the right connectors enabled, the AI can go fetch what it needs and act on your behalf.

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

The AI surface on top is the front door. The connectors in the middle are how it reaches into the real-work tools at the bottom. Each connector is a separate switch — you turn on the ones you need, you leave off the ones you don't.

**Why this matters for everything that follows.** Every chapter from 0B.3 onwards (triage, generation, ticket workflows, document workflows, agents) is a different *combination* of connectors. Triage = email + Slack + ticketing. Generation = Slack + Calendar + Docs. Document workflows = Drive + Docs. Lightweight agents = whichever combination of the above plus a schedule. Once you grasp the connector concept, the rest of the track becomes "pick connectors, write a recipe, run it."

**The minimum useful set for most readers.** Slack, Google Workspace (Drive + Docs + Calendar + Gmail at least), your ticketing tool of choice, and (if you're working with a team) a shared knowledge base or doc index connector. Four switches, four big leaps in capability.

---

## Picking your daily driver — a 60-second decision tree

Don't overthink this. Use the heuristic, then change your mind later if you want.

**Are you mostly drafting and thinking?** → Claude.ai is enough. Open a tab, keep it pinned.

**Are you working with files (docs, decks, spreadsheets, PDFs) every day?** → Cowork. Install it, point it at the folder you live in, install one or two plugins. Your week starts moving faster within an afternoon.

**Are you mostly asking questions about the internal world: sprints, tickets, channels, decisions?** → Slash. It's already plumbed in for you.

**Are you doing all three?** → Most of us are. Pick whichever feels best as a daily driver, and use the others when they're the right tool. Most readers end up with Claude.ai pinned in a tab, Cowork installed for document work, and Slash bookmarked for "what's going on internally" questions. Three tools, three reflexes, no agonising over which one to open.

**Don't try to make one tool do everything.** A common mistake is to treat your favourite as a hammer and force every task through it. Doable, but slow. The 30 seconds it takes to switch tabs is far less than the 10 minutes you'd spend coercing the wrong tool into doing a task it wasn't built for.

---

## What you'll set up before the next chapter

The chapters from 0B.3 onwards assume you've made two cheap moves:

1. **Logged into your daily-driver AI surface** (whichever you picked above).
2. **Turned on connectors for at least Slack and Google Workspace.** Your ticketing connector matters too; turn it on if you have access. The exact installation steps vary by tool — there's a setup-checklist appendix you can use as a reference.

If your laptop policy or your IT setup gets in the way of either step, post a question in [`#ai-help`](https://razorpay.slack.com/archives/C08C35GKJKD) — chances are someone else hit the same wall last week and the workaround is already known. Don't try to brute-force a permission issue alone; that's exactly the time-tax this track is supposed to be reducing, not creating.

---

## What you should carry into the next chapter

- The AI surface you choose (Claude.ai, Cowork, Slash) matters less than you think. Pick by comfort. Use all three across the day.
- **Connectors are the actual leverage.** They turn each AI surface from an island into a remote control for the apps where your work lives.
- The minimum useful connector set for most readers is Slack + Google Workspace + your ticketing tool. Three switches, big delta.
- Slash is a great place to *ask* about the internal world. Claude.ai and Cowork are good places to *act* on it.
- The next chapter ([0B.3 — Triage automations](03-triage-automations.md)) is the first place you actually save time. We'll work through inbox triage, Slack triage, and on-call queue triage as three concrete recipes.

---

**Previous:** [← 0B.1 Why this track exists](01-why-this-track.md) · **Next:** [→ 0B.3 Triage automations](03-triage-automations.md)

**Further reading**
- [Anthropic's Model Context Protocol (MCP)](https://modelcontextprotocol.io/) — the open standard most modern connectors are built on; useful background for when you're choosing or building one
- [Lenny's Newsletter — 25 proven AI-adoption tactics](https://www.lennysnewsletter.com/p/25-proven-tactics-to-accelerate-ai) — the time-saved patterns the rest of this track operationalises
- [Anthropic on Cowork](https://www.anthropic.com/) — official product overview
