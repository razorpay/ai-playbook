---
title: "Why this track exists"
slug: "ops-101/why-this-track"
section: "foundation"
status: "drafted"
type: "chapter"
track: "ops-101"
order: 1
time_minutes: 5
audience: "pm-designer-ops"
outcome: "Name the ops tax AI can eat and choose one place to start reclaiming time."
prev: "ops-101"
next: "ops-101/non-coding-ai-surface"
pillar: null
belt: null
tags: ["ops-101"]
updated: "2026-08-30"
---

# 0B.1 — Why this track exists (the ops tax that AI eats)

> **⏱ 5 minutes · 👥 PMs, designers, ops, TPMs, anyone in a heavy-meeting role · 🎯 Leaves with:** a measured baseline for your recurring work and a way to choose what is worth testing with AI.

---

## Audit five blocks

Look at five recent blocks from your calendar or task list. Yesterday is fine; this is a baseline, not a forensic investigation.

Some blocks contain the judgement you were hired to provide: making a decision, shaping a document, learning from a customer. Others include *plumbing*: preparing a pre-read, turning notes into actions, catching up on three Slack threads, writing a weekly digest, or finding that one Figma link from last week.

For each block, write one row:

| Block or task | Minutes | Does it repeat? | Required output | Judgement only you can supply? |
|---|---:|---|---|---|
| Example: turn weekly review notes into actions | 25 | Weekly | Actions with owners and dates | I must approve owners and commitments |

Add the minutes for work that repeats and has a clear input and output. That total is your **candidate time**, not time saved. Do not borrow a generic percentage or round it into a heroic number. Your own baseline is the only useful starting point.

This track teaches you to test which candidates AI can safely draft, route, or complete. The judgement-heavy parts stay yours. Any time saved has to show up in the before-and-after measurement; the promise is evidence, not optimism.

---

## What the ops tax actually looks like

The ops tax has names. Once you start tagging the plumbing, you'll see most of it falls into a small handful of buckets:

- **Triage**: going through your inbox, your Slack mentions, the on-call queue, the support tickets that came in overnight. Reading. Sorting. Marking what matters and what can wait.
- **Generation**: standup updates, weekly summaries, meeting notes, status emails to your skip, recap docs after offsites, talking-points for next week's review.
- **Ticket grooming**: drafting bug reports, triaging the backlog, writing up the user-impact section, routing things to the right team, chasing the ones that went stale.
- **Document workflows**: researching for a brief, drafting the brief, sending it out for review, processing the comments, exporting it as a PDF for someone who refuses to use Google Docs.
- **Calendar and inbox choreography**: scheduling, rescheduling, finding times, sending pre-reads, reminding people of pre-reads, cancelling and re-sending pre-reads.
- **Searching for things you've already seen**: that one Figma link, that one decision that got made in a thread three months ago, the spreadsheet someone shared last week.

If several of these appeared in your five-block audit, this track gives you a practical place to start.

The reason this is the *first* track in the playbook is motivational: short feedback loops make the harder work easier to sustain. If an automation saves measurable time without weakening the output, you have evidence that the next experiment is worth doing. If it saves nothing, you have learned that this was the wrong task before building a larger system around it.

We could have buried this track in an appendix. We didn't, because *most readers won't make it to the appendices*, and the boring weekly work is the most accessible place for AI to feel like a gift instead of a homework assignment.

---

## What "automatable" actually means here

Some of the ops tax can be fully automated. Some is *assistive*: the agent produces a first pass and you remain responsible for checking it. Some should stay manual because human judgement is exactly what the task is for.

The track will teach you to tell which is which. Roughly:

- **Repetitive, format-heavy, low-judgement work** is the sweet spot for full automation. A weekly digest of one Slack channel into a Notion page. A standup writeup. A meeting transcript turned into a list of action items with owners.
- **Decision-heavy work where you'd be reviewing the output anyway** is great for agent-drafts-you-edit. A draft response to a tricky email. A first pass at routing a stack of tickets. A summary of a 90-minute call with the parts you should re-listen to flagged.
- **Work where the output is the judgement itself** stays manual. Hard performance feedback. Saying yes or no on a roadmap fight. Setting expectations in a 1:1. Don't outsource these and don't try.

You'll learn to sort your work into those three buckets in chapter 0B.2 (the surface tour) and chapters 0B.3 through 0B.7 (the recipes). And the track's boss fight is exactly the kind of measurement that confirms you got the buckets right.

---

## Why the track is heavy, not light

There's a tempting version of Ops 101 that's a 4-page primer with five copy-paste recipes and a wave goodbye. We considered it. It doesn't work.

The reason is that copy-paste automations break. Claude updates a model. Your team starts using a different ticketing tool. You move to a new POD with different rituals. The recipe that worked perfectly on the first day stops working in week three, and now you're back to manual *and* you've trained yourself not to investigate why, because you "tried this once."

The heavy version teaches you the muscle. Spotting which routine work is automatable. Composing Claude with the right connectors. Testing whether an automation is reliable before you depend on it. Maintaining it when something upstream changes. Writing the recipe so a teammate can fork it. The boss fight asks you to run an automation for *two weeks*: not because two weeks guarantees an edge case, but because repeated use gives failures and awkward cases a chance to surface. Record what happened each time. An automation that holds up is worth contributing to the recipe library; one that fails is useful evidence for the next version.

That's the muscle. It transfers directly into Yellow Belt later, when the boss fight is "find a bug in your area and fix it." Same composition skills (Claude plus connectors plus a clear success criterion) only the output changes from a digest to a pull request.

---

## The shape of the track from here

The next chapter ([0B.2 — The non-coding AI surface](02-non-coding-ai-surface.md)) is the tool tour. Claude.ai versus Cowork versus Slash, plus the connectors you'll lean on (Slack, Google Workspace, your ticketing tool, your calendar). After that the chapters get specific: triage automations (0B.3), generation (0B.4), ticket workflows (0B.5), document workflows (0B.6), lightweight agents (0B.7), and a preview of the operating-philosophy chapter — the minimum viable wiki you can stand up for any project (0B.8).

You'll do two quests as you go: a 30-minute teardown of one task you already do (replace it with an automation, time the before and after), and a two-week *agent diary*. For each routine task, ask: "Could an agent safely draft, route, or complete this, and what would I still need to review?" The strongest measurable candidate becomes your boss-fight workflow.

The boss fight itself is **automate one workflow that saves you 4+ hours a week**, run it for two weeks, and contribute the recipe back so a teammate can fork it. Earned, measured, durable. Belt-credit awarded for ops automation, not for code shipped — which is to say, you can complete this track and have something the certification tracker recognises *without ever opening Claude Code in a repo*.

That's the wedge. Get your mornings back. Then come back for the rest of the playbook with the energy you've reclaimed.

---

## What you should carry into the next chapter

- Measure your own ops tax; a generic percentage cannot tell you what to automate.
- Sort candidate work into three buckets: full automation, agent drafts that you review, and work that stays manual.
- Treat candidate time as a hypothesis. Only before-and-after evidence counts as time saved.
- Test one workflow over two weeks, record failures and awkward cases, then decide whether it is durable enough to share.
- The hours you prove you reclaimed are fuel for the rest of the playbook. Evidence first; victory lap second.

---

**Previous:** [← Ops 101 README](README.md) · **Next:** [→ 0B.2 The non-coding AI surface](02-non-coding-ai-surface.md)

**Further reading**
- [Lenny's Newsletter — 25 proven tactics to accelerate AI adoption](https://www.lennysnewsletter.com/p/25-proven-tactics-to-accelerate-ai) — the time-saved + visible-wins arguments that informed why this track is heavy and goes first
- [Anthropic on Cowork](https://www.anthropic.com/) — the desktop product that fits this track best for a non-coding reader
- [Simon Willison — designing agentic loops](https://simonwillison.net/2025/Oct/15/designing-agentic-loops/) — for when you reach chapter 0B.7 and start wondering what makes an agent reliable
