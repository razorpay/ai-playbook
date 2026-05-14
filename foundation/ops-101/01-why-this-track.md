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
updated: "2026-04-26"
---

# 0B.1 — Why this track exists (the ops tax that AI eats)

> **⏱ 5 minutes · 👥 PMs, designers, ops, TPMs, anyone in a heavy-meeting role · 🎯 Leaves with:** the case for spending two weeks on Ops 101 *before* doing anything else with AI, and a candid look at the recurring weekly work most of us are about to outsource to agents.

---

## Open up your Wednesday afternoon

Don't think too hard. Just look at the calendar between, say, 2 PM and 6 PM tomorrow. Or last Wednesday, if today doesn't help.

Now mentally tag each block. Some of it is real work: the meeting where a real decision gets made, the doc you're actually writing, the customer call you're learning from. But a surprising amount of it is *plumbing*. The pre-read for the 3 PM, which you'll skim once and abandon. The notes from the 4 PM, which you'll partially type into a Google Doc that nobody opens. The Slack scrollback you do at 5 because something happened in three threads while you were in meetings. The standup digest you write up on Friday for whoever skipped it. The status update for your skip. The two minutes you spend trying to find that one Figma link from last week.

Pick a fair number. For most people in product or design or ops at a company this size, the plumbing is something between **30% and 50% of the workweek**. It's been that way for as long as knowledge work has been a thing. It's the *cost of doing business* — the price of being plugged in to enough channels to ship anything at all.

This track is about how a lot of that plumbing has, in the last two years, become automatable. Not all of it. Not the parts where your judgement is what's needed. But a lot of it. And the hours you claw back are real hours, in real weeks of your real life, and they're worth claiming on day one of your AI journey rather than on day ninety.

---

## What the ops tax actually looks like

The ops tax has names. Once you start tagging the plumbing, you'll see most of it falls into a small handful of buckets:

- **Triage**: going through your inbox, your Slack mentions, the on-call queue, the support tickets that came in overnight. Reading. Sorting. Marking what matters and what can wait.
- **Generation**: standup updates, weekly summaries, meeting notes, status emails to your skip, recap docs after offsites, talking-points for next week's review.
- **Ticket grooming**: drafting bug reports, triaging the backlog, writing up the user-impact section, routing things to the right team, chasing the ones that went stale.
- **Document workflows**: researching for a brief, drafting the brief, sending it out for review, processing the comments, exporting it as a PDF for someone who refuses to use Google Docs.
- **Calendar and inbox choreography**: scheduling, rescheduling, finding times, sending pre-reads, reminding people of pre-reads, cancelling and re-sending pre-reads.
- **Searching for things you've already seen**: that one Figma link, that one decision that got made in a thread three months ago, the spreadsheet someone shared last week.

If you read that list and recognised at least four of the six in your last working day, you are exactly who this track is for.

The reason this is the *first* track in the playbook is honestly motivational. Every reader who clears Ops 101 walks away with a measurable, defendable, week-changing amount of saved time. That saved time is the fuel for the harder work later. The PM who picks up Ops 101 on Monday and is saving four hours a week by Friday-after-next is a much more curious, much more energetic reader of White Belt than the one who hasn't yet seen what AI can do for them.

We could have buried this track in an appendix. We didn't, because *most readers won't make it to the appendices*, and the boring weekly work is the most accessible place for AI to feel like a gift instead of a homework assignment.

---

## What "automatable" actually means here

Some of the ops tax is fully automatable. Some of it is *assistively* automatable — the agent does 80% and you sanity-check the rest. A small fraction is not automatable yet, or shouldn't be, because human judgement is exactly what the task is for.

The track will teach you to tell which is which. Roughly:

- **Repetitive, format-heavy, low-judgement work** is the sweet spot for full automation. A weekly digest of one Slack channel into a Notion page. A standup writeup. A meeting transcript turned into a list of action items with owners.
- **Decision-heavy work where you'd be reviewing the output anyway** is great for agent-drafts-you-edit. A draft response to a tricky email. A first pass at routing a stack of tickets. A summary of a 90-minute call with the parts you should re-listen to flagged.
- **Work where the output is the judgement itself** stays manual. Hard performance feedback. Saying yes or no on a roadmap fight. Setting expectations in a 1:1. Don't outsource these and don't try.

You'll learn to sort your work into those three buckets in chapter 0B.2 (the surface tour) and chapters 0B.3 through 0B.7 (the recipes). And the track's boss fight is exactly the kind of measurement that confirms you got the buckets right.

---

## Why the track is heavy, not light

There's a tempting version of Ops 101 that's a 4-page primer with five copy-paste recipes and a wave goodbye. We considered it. It doesn't work.

The reason is that copy-paste automations break. Claude updates a model. Your team starts using a different ticketing tool. You move to a new POD with different rituals. The recipe that worked perfectly on the first day stops working in week three, and now you're back to manual *and* you've trained yourself not to investigate why, because you "tried this once."

The heavy version teaches you the muscle. Spotting which routine work is automatable. Composing Claude with the right connectors. Testing whether an automation is reliable before you depend on it. Maintaining it when something upstream changes. Writing the recipe so a teammate can fork it. The boss fight asks you to run an automation for *two weeks*: not because two weeks is magical, but because two weeks is enough to encounter at least one edge case, at least one upstream change, at least one "that's odd" moment. The automation that survives those is the one worth contributing to the recipe library. The one that doesn't survive is a useful failure: you learn what made it fragile, you adjust, and the next one is sturdier.

That's the muscle. It transfers directly into Yellow Belt later, when the boss fight is "find a bug in your area and fix it." Same composition skills (Claude plus connectors plus a clear success criterion) only the output changes from a digest to a pull request.

---

## The shape of the track from here

The next chapter ([0B.2 — The non-coding AI surface](02-non-coding-ai-surface.md)) is the tool tour. Claude.ai versus Cowork versus Slash, plus the connectors you'll lean on (Slack, Google Workspace, your ticketing tool, your calendar). After that the chapters get specific: triage automations (0B.3), generation (0B.4), ticket workflows (0B.5), document workflows (0B.6), lightweight agents (0B.7), and a preview of the operating-philosophy chapter — the minimum viable wiki you can stand up for any project (0B.8).

You'll do two quests as you go: a 30-minute teardown of one task you already do (replace it with an automation, time the before and after), and a two-week *agent diary* where you tag every routine ops task with "could a configured agent have done this?" The diary's "yes" pile is the candidate list for your boss fight.

The boss fight itself is **automate one workflow that saves you 4+ hours a week**, run it for two weeks, and contribute the recipe back so a teammate can fork it. Earned, measured, durable. Belt-credit awarded for ops automation, not for code shipped — which is to say, you can complete this track and have something the certification tracker recognises *without ever opening Claude Code in a repo*.

That's the wedge. Get your mornings back. Then come back for the rest of the playbook with the energy you've reclaimed.

---

## What you should carry into the next chapter

- The ops tax — triage, generation, ticket grooming, document workflows, calendar choreography, searching for things you've already seen — is somewhere between 30% and 50% of most knowledge workers' weeks.
- A meaningful slice of it is now automatable, in three flavours: full-automation, agent-drafts-you-edit, and stays-manual.
- You'll learn to sort your work into those three buckets and ship at least one durable automation that survives a two-week real-world test.
- This track is heavy on purpose. The muscle that makes one automation last two weeks is the muscle that makes thirty automations last two years.
- The hours you reclaim are the fuel for the rest of the playbook. Earn them first; the rest is easier on a full tank.

---

**Previous:** [← Ops 101 README](README.md) · **Next:** [→ 0B.2 The non-coding AI surface](02-non-coding-ai-surface.md)

**Further reading**
- [Lenny's Newsletter — 25 proven tactics to accelerate AI adoption](https://www.lennysnewsletter.com/p/25-proven-tactics-to-accelerate-ai) — the time-saved + visible-wins arguments that informed why this track is heavy and goes first
- [Anthropic on Cowork](https://www.anthropic.com/) — the desktop product that fits this track best for a non-coding reader
- [Simon Willison — designing agentic loops](https://simonwillison.net/2025/Oct/15/designing-agentic-loops/) — for when you reach chapter 0B.7 and start wondering what makes an agent reliable
