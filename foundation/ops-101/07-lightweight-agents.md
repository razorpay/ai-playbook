---
title: "Lightweight agents"
slug: "ops-101/lightweight-agents"
section: "foundation"
status: "drafted"
type: "chapter"
track: "ops-101"
order: 7
time_minutes: 25
audience: "pm-designer-ops"
outcome: "Recognise when a repeated recipe deserves a configured agent, then make recurring work verifiable."
prev: "ops-101/document-workflows"
next: "ops-101/minimum-viable-wiki"
pillar: null
belt: null
tags: ["ops-101", "agents"]
updated: "2026-07-18"
---

# 0B.7 — Lightweight agents (when "automate this for me" earns its keep)

> **⏱ 25 minutes · 👥 PMs, ops, anyone whose recipes are starting to repeat · 🎯 Leaves with:** the line between *recipe* and *agent*, a copyable verified-loop design, three concrete agent patterns you can ship, and the discipline that keeps a configured agent from becoming a small abandoned graveyard.

---

## The graduation from recipe to agent

The chapters before this one (0B.3 through 0B.6) all teach *recipes*: prompts you run on demand, with you sitting at the keyboard, reviewing the output before it ships. That's the right shape for most ops automations. But there's a category of work where the *cadence* is reliable enough (every Monday morning, every Friday afternoon, every time a new ticket comes in) that having you click "go" each time is itself wasted time.

That's where **lightweight agents** earn their keep. An agent, in this chapter's vocabulary, is a *configured automation that runs on a schedule or trigger* without you starting it each time. It does the recipe; you check the output. Same composition of Claude + connectors + prompts you've been building, but freed from the requirement that you manually invoke it.

The graduation isn't dramatic. Most agents in this chapter are five-line additions to a recipe you already have. The shift is that you've moved from *"I'll do this when I remember"* to *"this happens whether I remember or not."*

---

## What a lightweight agent is, exactly

A lightweight agent is the smallest possible thing that earns the name "agent." It has:

- **A trigger.** Either a schedule (every Monday at 9am) or an event (every time a new ticket arrives in queue X).
- **A prompt.** What the agent runs when triggered — usually a recipe you've already battle-tested as an on-demand version.
- **An output channel.** Where the result goes: a Slack post, an email draft, a doc updated, a ticket created.
- **An "I'm done" condition.** When does the agent stop? Most lightweight agents run one bounded pass: they fire, produce, check if needed, and finish. Open-ended chains and multi-agent orchestration are Black Belt topics; we're in much simpler territory here.

That's enough for a private, reversible draft. You're not building sophisticated multi-agent orchestration; you're building a tiny program that runs your existing recipe on a clock.

The discipline that makes this work: *every lightweight agent is a recipe that's already proven itself.* You don't write an agent for a workflow you haven't run by hand for two weeks. The "by hand for two weeks" version is what surfaces the edge cases the agent will need to handle.

---

## Recipe → agent: the conversion

The pattern, in three steps:

1. **You've been running a recipe for two weeks.** Triage in the morning, weekly digest on Friday, ticket drafting after Slack threads. The recipe has stabilised. The output is good. You know its failure modes.
2. **You convert the recipe to an agent.** Same prompt, same connectors, same review discipline: but now triggered by a schedule (a cron job, a calendar trigger, a scheduled task) or an event (a webhook, a connector hook).
3. **You watch it for two more weeks.** The conversion exposes new failure modes: the agent runs at a slightly different time of day, or processes inputs you weren't reviewing before, or hits rate limits the manual version never did. The two-week observation phase is non-negotiable.

After those four total weeks, the agent should no longer need supervision on every run. It still needs monitoring, an owner, and a kill-switch. Trust means *review by exception*, not *forget it exists*.

---

## When the agent should become a verified loop

A schedule gives you repetition, not reliability. Once a run informs a team decision, compares today with last week, or publishes beyond your private workspace, graduate the agent into a **verified loop**:

```text
trigger → skill → maker → checker → gate → state
   ↑                                           │
   └────────────── next scheduled run ─────────┘
```

This is still lightweight. The maker and checker are roles in one workflow, not necessarily separate agents or models.

| Part | The question it answers | Daily-health example |
|---|---|---|
| **Trigger** | When should the work start? | Every weekday at 10 AM |
| **Skill** | Which stable instructions, sources, and output contract apply? | Read the approved metric definitions; compare the same cohorts and time windows |
| **Maker** | What produces the candidate result? | Draft a Green/Amber/Red health summary with source links |
| **Checker** | What can disprove or block that result? | Confirm every required source returned data, time windows match, and each claim has evidence |
| **Gate** | What may publish, and what must stop or escalate? | Auto-post a complete Green draft privately; hold missing-data runs; require a human for incident or customer-facing action |
| **State** | What must the next run and the owner remember? | Run time, source coverage, verdict, output link, checker result, and any human override |

The checker should be cheaper and more deterministic than the maker where possible: row counts, required fields, freshness timestamps, source links, and thresholds beat “ask another model if this looks right.” The gate is a rule, not automatically a person. Low-risk private output may pass when checks succeed; external, irreversible, or sensitive action keeps a human gate.

State is a **run receipt**, not a transcript landfill. Store the minimum needed to compare runs, diagnose failure, and learn from overrides. Link to approved source systems instead of copying sensitive customer or employee data into a new file.

### Copy this loop card

Fill this before scheduling a team-facing workflow. If you cannot fill the checker, gate, and state fields, keep running the recipe manually.

```text
LOOP: <name and business outcome>
OWNER: <person or team responsible>
TRIGGER: <schedule or event; timezone; duplicate-run rule>
SKILL: <instructions; approved sources; output contract>
MAKER: <what produces the draft or recommendation>
CHECKER: <coverage, freshness, evidence, and threshold checks>
GATE: <auto-publish, hold, or human-confirm conditions>
STATE: <minimal run receipt and where it lives>
FAILURE: <where a failed or skipped run alerts>
KILL-SWITCH: <how the owner pauses the loop>
```

Start with one known-answer run. Then test three uncomfortable cases before turning on the schedule: an empty source, a stale source, and a result that crosses the escalation threshold. A loop that only works on a cheerful Tuesday is still a demo.

Common failure modes:

- **The checker repeats the maker's opinion.** Replace “does this look right?” with evidence and coverage checks.
- **The gate has no hold path.** Missing data becomes a confident-looking post. Define what stops publication and who gets alerted.
- **State grows without a data boundary.** Keep receipts and links; do not create a shadow customer-data store.
- **The next run cannot learn from an override.** Record the human decision and reason so the same false alarm does not recur silently.

---

## Recipe 1 — The morning briefing agent (15-minute conversion from a triage recipe)

If you have a working triage recipe (chapter 0B.3), the easiest first agent is converting it to *fire automatically each morning*.

**The trigger.** A schedule — say 7:30 AM on weekdays.

**The shape.**

> *(Same prompt as your inbox-triage recipe from 0B.3.)*
>
> Then add: "Post the briefing to my private Slack channel `#daily-briefing` (a channel only I'm in). Format with H2 headings per bucket. Include emoji indicators ✅ ACTS_ON_ME / 📋 FYI / ↪ ROUTES / 🗑 ARCHIVE. Don't auto-archive anything. Don't auto-route anything. Just post."

When you wake up, the briefing is already in your channel. You spend two minutes reviewing it. The triage you used to do at 9 AM with your second coffee is now done before you arrive.

**Reliability tip.** Use a *private* channel only you're in. Don't post to a team channel unless and until the briefing is reliable enough that you'd be comfortable showing it to others — that's a higher bar than "useful for me."

**A specific failure mode.** If you go on PTO and forget to disable the agent, you'll come back to ten daily briefings on Slack. Most ticketing tools and schedulers have a "skip if last run < N hours ago" or "pause when calendar shows OOO" feature; use it. Or just remember to disable the agent the morning you go off — write the disable command into your PTO checklist.

---

## Recipe 2 — The status digest agent (20-minute conversion from a generation recipe)

If you have a working weekly-summary recipe (chapter 0B.4), the conversion to an agent is the same pattern.

**The trigger.** Every Friday at 3 PM (giving you 90 minutes to review and edit before sending to skip).

**The shape.**

> *(Same prompt as your weekly-summary recipe from 0B.4.)*
>
> Then add: "Save the draft to my Google Docs as 'Weekly digest – [date].' Don't share it. Don't email it. Just save the draft. Then post to me in Slack: 'Your weekly digest is drafted in [link]. Review by 4 PM.'"

You get the Slack ping. You open the doc. You spend 15 minutes reviewing, editing the headline and the asks, then forwarding to skip. The 45-minute Friday-afternoon writeup is now a 15-minute Friday-afternoon review.

**Reliability tip.** Don't let the agent send anything outbound. *The agent's job is to draft; your job is to ship.* The cost of an auto-sent weekly digest with a wrong fact is reputational; the cost of one extra Slack ping per week is trivial. The trade is obvious.

**A specific failure mode.** Some weeks the digest is wrong because the *underlying signals* are wrong: your calendar wasn't accurate, the tickets you closed weren't tagged properly, etc. The agent can't fix bad signals; it can only summarise the signals it sees. *Don't blame the agent for noise upstream.* Fix the signals where you can.

---

## Recipe 3 — The new-ticket agent (30-minute conversion from a ticket recipe)

If you have a working ticket-drafting recipe (chapter 0B.5), the conversion is event-triggered rather than scheduled.

**The trigger.** Every time a new ticket arrives in a specific queue (the on-call queue, the security-issues queue, whatever's relevant to you).

**The shape.**

> "When a new ticket arrives in [QUEUE]:
>
> 1. Read the ticket plus any linked Slack threads, prior tickets, or related context.
> 2. Apply my routing recipe (suggest owner + confidence + reasoning).
> 3. If confidence is HIGH, *draft* the routing assignment but don't apply it. Post to me in Slack: 'Suggested routing for [ticket]: [owner], confidence high, reasoning [...]. Click here to confirm or adjust.'
> 4. If confidence is MEDIUM or LOW, post to me with the disambiguating question and let me decide.
> 5. Never auto-route. *Always* ask first."

Result: the on-call queue stops accumulating quietly. Each new ticket gets a triage suggestion within minutes of arriving. You spend 15 seconds confirming or overriding, instead of an hour-long sweep at the end of your shift.

**Reliability tip.** This is the agent that's *most* tempting to over-automate. The instinct will be: *"once the high-confidence routes have been right ten times in a row, let it auto-route."* Resist for at least a month. Wrong routes have downstream consequences (the surface owner gets paged for something that isn't theirs; the actual owner doesn't get paged at all). The cost-benefit on auto-routing tickets is bad; the cost-benefit on AI-assisted routing is great. Stay on the AI-assisted side.

**A specific failure mode.** When the agent fires for a *re-opened* ticket (one that was closed and reopened by the customer) it'll usually re-route as if it were new. Build the recipe to *check ticket history first*: "if this ticket has been routed before, use the prior owner unless the surface area has changed."

---

## What lightweight agents are and aren't good at

The honest list, calibrated for the higher autonomy level.

**Good at:**

- *Triggered* work — runs when something happens, runs on a clock.
- Single-shot decisions where the output is a draft for human review.
- Aggregation work where the inputs are messy but the output structure is fixed.
- Long-running watchers — *"ping me when X happens"* type alerts.

**Not good at, yet:**

- Multi-step reasoning where each step's output changes what the next step should do (that's Black Belt agent territory).
- Anything where the *consequences of getting it wrong are large* (auto-sending emails to customers, auto-creating production tickets, auto-modifying anything irreversible).
- Anything that requires real judgement *in the moment*: political tact, escalation calls, emotional intelligence about a situation.
- Anything where the cost of running too often is high (an agent that fires every minute when you only need it to fire every hour will eat your token budget alive).

The line that holds across this whole chapter: **lightweight agents are for *running your recipe on a clock*, not for *replacing your judgement*.** Cross the line and you've built something that will eventually embarrass you.

---

## The discipline that prevents the graveyard

Most attempts at lightweight agents end in graveyards: a folder of agents that ran for three weeks, then quietly broke, then nobody noticed because nobody was watching. The graveyard is the failure mode.

Three habits prevent the graveyard:

**Eyeball the agents weekly.** Same calendar block as the wiki lint pass from §0.7. Once a week, 10 minutes, *open the channel each agent posts to and check that they're posting and that the output is still good*. The amount of work that has invisibly degraded over six weeks of "I trust my agents" is dramatic when you actually look.

**Keep the kill-switch obvious.** Each agent should have a one-line "disable" command you remember. If disabling an agent requires going to a settings page, opening a config file, or asking IT — you won't disable it when you should. Make disabling cheap; the cost of a misbehaving agent goes way down.

**Let agents fail loudly.** When something breaks (a connector token expired, a rate limit was hit, the upstream tool's API changed) the agent should *post the failure to Slack*, not silently skip a run. A failed run that posts an error is recoverable; a silently-skipped run for three weeks before someone notices is not.

These are the same disciplines that distinguish good operations from bad operations in any system. Apply them to your agents and the graveyard never forms.

---

## Connecting back to the boss fight

A lightweight agent is the strongest *measurable* boss-fight artefact in the Ops 101 track: it runs on a clock, it produces evidence each cycle, the time-saved measurement is concrete.

Three suggestions before committing one as your boss fight:

- **Convert a recipe that's been working manually for at least two weeks.** Don't go straight to agent. The two-week manual run is what surfaces the edge cases.
- **Pick the trigger that gives you the most measurement opportunity.** A daily agent gives you 14 data points across two weeks; a weekly agent gives you 2. Daily is better for boss-fight measurement, even if your *actual* leverage is weekly.
- **The recipe contribution should include the disable command.** Future readers of your recipe need to know how to turn it off as much as how to turn it on.

---

## What you should carry into the next chapter

- A **lightweight agent** is a tested recipe + a trigger + an output channel + a clear "done" condition.
- Team-facing recurring work graduates to a **verified loop**: trigger → skill → maker → checker → gate → state.
- The conversion path is **manual recipe (2 weeks) → configured agent (2 more weeks of observation) → trusted agent.** Skipping either two-week phase is how graveyards form.
- Three reusable patterns: morning briefing (scheduled triage), status digest (scheduled generation), new-ticket triage (event-triggered).
- *Agents draft; you confirm.* Auto-action is reserved for cases where you've explicitly proven the cost-benefit; default is always a Slack ping for human review.
- Three habits prevent the graveyard: weekly eyeball, obvious kill-switch, loud failure.
- The next chapter ([0B.8 — Building your own minimum viable wiki](08-minimum-viable-wiki.md)) is the operating-philosophy capstone of the Ops 101 track: knowledge-base-driven development, applied to ops work, in an hour.

---

**Previous:** [← 0B.6 Document workflows](06-document-workflows.md) · **Next:** [→ 0B.8 Building your own minimum viable wiki](08-minimum-viable-wiki.md)

**Further reading**
- [Product AI Labs — a shipped daily-health loop](https://razorpay.slack.com/archives/C0A7B848RS7/p1782211644575319) — internal example of a scheduled health skill with Slack delivery and durable history
- [Loops for PMs — Aakash Gupta](https://www.news.aakashg.com/p/loops-pms) — a current PM-oriented treatment of trigger, skill, maker, checker, gate, and state
- [Anthropic on scheduled tasks and triggers](https://www.anthropic.com/) — the official patterns for trigger-shaped agent work
- [Simon Willison — designing agentic loops](https://simonwillison.net/2025/Oct/15/designing-agentic-loops/) — for why "single-shot, human in the loop" is the safer default than multi-step autonomous chains
- [Will Larson — Operations is a feature](https://lethain.com/) — for the broader discipline that keeps automated systems from rotting in your hands
