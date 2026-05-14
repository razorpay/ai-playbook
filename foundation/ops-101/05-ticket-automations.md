---
title: "Ticket automations"
slug: "ops-101/ticket-automations"
section: "foundation"
status: "drafted"
type: "chapter"
track: "ops-101"
order: 5
time_minutes: 25
audience: "pm-designer-ops"
outcome: "Draft, route, and digest tickets with AI while keeping ownership human."
prev: "ops-101/generation-automations"
next: "ops-101/document-workflows"
pillar: null
belt: null
tags: ["ops-101", "automation", "tickets"]
updated: "2026-04-26"
---

# 0B.5 — Ticket automations

> **⏱ 25 minutes · 👥 PMs, ops, anyone living in a ticketing tool · 🎯 Leaves with:** three concrete recipes (drafting, routing, status digesting) and a sharper understanding of *why ticket automations have a higher reliability bar than triage or generation, and what that means for how you build them.*

---

## What's different about tickets

Triage (chapter 0B.3) is sorting. Generation (chapter 0B.4) is producing. Both are *internal* to your own workflow — if the AI gets a triage call wrong, you fix it; if a generated artefact reads off, you edit it before sending.

Tickets are different. A ticket is a *commitment*. The moment a ticket is created, it has a row in a tracker that other people read. The moment a ticket is routed to a team, that team's workload changed. The moment a ticket gets a status update, downstream stakeholders update their plans. Ticket automations are read by more people, faster, with more consequence than the artefacts in the previous two chapters.

This means two things. First, **the reliability bar is higher**. A wrongly-bucketed inbox email costs you 30 seconds of confusion; a wrongly-routed P1 ticket costs you a customer escalation. Second, **automations should default to "draft, don't ship"**. The AI proposes; you confirm. Even when you've used the same recipe for weeks. The cost of an automated ticket gone wrong is large enough that the friction of a one-second confirmation is the right trade.

Get this discipline right and ticket automations are the highest-leverage chapter in Ops 101. Get it wrong and the next person to inherit your queue will quietly turn off your automation.

---

## Recipe 1 — Ticket drafting from a Slack thread (20-minute setup, ~10 minutes saved per ticket)

The most common ticket-creation flow goes like this: someone reports a problem in Slack, you read the thread, you copy-paste the relevant bits into a new ticket, you write up the summary, you guess at the user impact, you fill the priority, you submit. Twenty minutes of context-switching and copying.

Most of that is automatable.

**Connectors.** Slack + your ticketing tool.

**The shape.**

When you spot a Slack thread that needs a ticket:

> "Read this Slack thread [link or ID]. Draft a ticket with the following structure:
>
> - **Title:** clear, problem-focused (start with a noun phrase, not a verb).
> - **What's happening:** the customer or user-visible symptom in 2–4 lines.
> - **Where:** the surface, repo, or product area mentioned in the thread, with links if any were posted.
> - **Repro steps:** numbered steps to reproduce, drawn from the thread. If none are clear, say 'no repro steps in thread' rather than inventing them.
> - **First-pass priority:** P0 / P1 / P2 / P3, with one line of justification. Bias low — if it's unclear, propose P2 with a note for human override.
> - **Linked context:** the Slack thread URL and any other URLs from the thread.
> - **Tags:** product area / surface / customer-tier if visible, otherwise blank.
>
> Show me the draft. Don't create the ticket yet."

You review the draft, edit one or two fields, hit submit. Twenty minutes becomes three minutes.

**Reliability tip.** Lean hard on the "don't invent repro steps" instruction. AI is *especially* tempted to fill in plausible-but-wrong details for tickets, because tickets have a clear shape and the model wants to satisfy the shape. The better recipe explicitly tells it to leave gaps blank when the source doesn't have the answer.

**Reliability tip 2.** Always default the priority to *one notch lower* than your gut. P0s are commitments to drop everything; if the AI is over-eager, you end up with P0 inflation. Better the AI proposes P2 and you bump it to P1 in your review than the reverse.

**When this stops working.** Threads that span multiple problems. The recipe assumes one ticket per thread; if a thread covered three issues, it'll either produce one bloated ticket or miss two of them. For multi-issue threads, ask the AI to *enumerate* the issues first, and create one ticket per issue.

---

## Recipe 2 — Ticket routing (30-minute setup, the highest-leverage of the three)

The single largest time-cost in any ticketing tool is *deciding who should look at this*. A new ticket arrives unassigned. Someone has to read it, figure out which team or person it actually belongs to, and either reassign or escalate. That "figuring out" decision is the bulk of the queue-grooming work that fills most on-call rotations.

**Connectors.** Your ticketing tool + a shared knowledge base or org chart (something that knows which teams own which surfaces).

**The shape.**

For each unassigned or unrouted ticket in a queue:

> "Read this ticket. Based on the surface mentioned, the error pattern, and the keywords in the description, suggest:
>
> - **Most likely owner:** the team or named role that owns this surface.
> - **Confidence:** high / medium / low. Be honest. If two teams could plausibly own it, say so.
> - **One-line reasoning:** what made you pick this owner.
> - **If confidence is low or two teams are plausible:** suggest a routing question that would disambiguate ('is this affecting checkout or settings? — they're owned by different teams').
>
> Don't auto-assign. Just propose."

You batch-review the proposals, accept the high-confidence ones with a single click each, and spend a few moments on the low-confidence ones. The on-call queue moves from a 90-minute morning sweep to a 15-minute one.

**Reliability tip.** Over-index on the "confidence" signal. Train yourself to *only* auto-accept high-confidence routes; medium and low always get a moment of your attention. The cost of a misrouted P1 is far larger than the saved seconds. After a few weeks, you'll see exactly which kinds of ticket the AI handles confidently and which kinds it doesn't — that calibration is itself the recipe maturing.

**Reliability tip 2.** Maintain a small "always escalate" list: categories that should *never* be auto-routed even at high confidence (security issues, customer escalations from named accounts, anything tagged compliance). The recipe should hard-stop on these regardless of what its routing logic says.

**When this stops working.** Reorgs. The day your team's surfaces change ownership, the recipe is wrong until you update its sources. Build an ownership refresh into your monthly rhythm — five-minute pass on a calendar, two minutes of "did anything change?" with a senior eng on your team.

---

## Recipe 3 — Status digest (15-minute setup, ~30 minutes saved per stakeholder update)

You're running a workstream. Stakeholders ask "where are we on X?" once a week. To answer well, you need to look at every active ticket in the workstream, group them by phase, summarise the standouts, surface any blockers. Forty-five minutes of work, every week, repeated forever.

**Connectors.** Ticketing tool.

**The shape.**

Each Friday afternoon (or whenever your stakeholders expect the digest):

> "Pull every open ticket tagged [WORKSTREAM]. Group them as:
>
> - **Done since last digest:** tickets that closed in the last 7 days. One-line each. Sort by priority desc.
> - **In flight:** tickets actively being worked. For each: status, owner, and *what's happening this week*. If a ticket has been 'in progress' for more than 14 days without movement, flag it.
> - **At risk / blocked:** tickets where the owner is waiting on something (a decision, another team, an external dependency). Name the blocker.
> - **Not yet started:** tickets that should have been picked up by now and haven't. Sort by intended-start date.
> - **Headlines (1–3 bullets):** what the *story* of this week is. The one or two things a stakeholder skimming the digest should walk away with.
>
> Match my voice: direct, no hedging, name the blockers by team. If the workstream is actually fine this week, say so plainly; don't manufacture drama."

You review. You add a paragraph at the top with your editorial framing — *"this week's story is X, and we should expect Y next week."* You ship. The 45 minutes is now 8.

**Reliability tip.** The *headlines* are where the AI is most likely to write generic bullets. Write your own headlines manually for the first month. Once you've seen your own headlines a few times, ask the AI to *match the style* of those — you've now taught it your voice on this artefact.

**When this stops working.** When the workstream has fundamentally restructured (a re-org, a milestone shift) and the old grouping doesn't apply. Update the recipe; that's a 10-minute job and prevents three months of low-trust digests.

---

## What ticket automations are and aren't good at

The honest list, calibrated for this chapter's higher stakes.

**Good at:**

- Drafting ticket content from messy unstructured sources (Slack threads, transcripts, scattered comments).
- Suggesting routing based on surface keywords and pattern matching.
- Aggregating large queue states into stakeholder-readable digests.
- Surfacing tickets that have been quiet for too long.

**Not good at, yet:**

- Setting priority correctly for non-obvious cases. AI either over- or under-prioritises consistently; you have to learn the bias.
- Reading customer emotion. A polite ticket from a frustrated enterprise customer can read as a chill request to AI.
- Knowing the *political* context (this customer matters more this quarter; that team is overloaded right now).
- Distinguishing duplicates from related-but-different tickets. Both look similar in text; the difference matters.

**The contract for this chapter.** AI drafts; humans confirm. Especially for tickets that:

- Affect named customers.
- Touch security, compliance, or anything regulated.
- Are flagged P0 or P1 by the AI's own assessment.
- Cross more than one team's ownership boundary.

For everything else (internal bug tracking, low-priority feature requests, status digests) the trust-but-verify discipline holds, and you'll save real time.

---

## A specific failure mode — let it not become your team's only triage layer

The most insidious way ticket automation goes wrong: it becomes so reliable that the human stops looking. Then, three months in, an edge case arrives that the recipe doesn't handle, and a customer issue sits unrouted for two days because *nobody noticed*.

The defence is rhythmic. Calendar-block 15 minutes a week to *eyeball the queue manually* — not to do the work, just to make sure nothing weird is sitting at the bottom unhandled. The AI handles the volume; you handle the unknown unknowns. Skip the eyeball pass and the recipe quietly becomes a single point of failure.

This is the same discipline that distinguishes a working safety net from a failed one in any high-stakes automation. *Trust the system, verify the system, in alternation.* The trust scales the team. The verification catches the long tail.

---

## Connecting back to the boss fight

Recipe 2 (ticket routing) is one of the strongest boss-fight candidates in the entire Ops 101 track for anyone running an on-call rotation or queue-grooming function. The before-and-after measurement is dramatic — most readers find the rotation saves 1–3 hours per shift after the recipe stabilises.

Three suggestions before committing a ticket-routing automation as your boss fight:

- **Run it in *advisory mode* for the full first week**: the AI proposes routes, you accept or override, and you log every override with the reason. The override log is your training data for the second week's recipe refinement.
- **Pick a queue you'll actually be on-call for during the two-week measurement.** A recipe tested on someone else's queue is a recipe you can't actually defend. Yours, two weeks, real shifts.
- **Document the always-escalate list in the recipe contribution.** That list is some of the most valuable knowledge to share — it's the kind of thing every team has to learn the hard way otherwise.

---

## What you should carry into the next chapter

- Tickets are *commitments*. The reliability bar is higher than for triage or generation.
- Three recipes: drafting (Slack → ticket), routing (unassigned → owner), status digesting (queue → stakeholder digest). Each saves real time. All three default to AI-drafts-you-confirm.
- AI is biased on priority — it'll either over- or under-call. Learn the bias and adjust.
- Build the *eyeball pass* into your rhythm. Automation reliability + human spot-checks > either alone.
- The next chapter ([0B.6 — Document workflows](06-document-workflows.md)) is the longer-form recipe family: researching, drafting, reviewing, exporting documents. Different rhythm, different leverage.

---

**Previous:** [← 0B.4 Generation automations](04-generation-automations.md) · **Next:** [→ 0B.6 Document workflows](06-document-workflows.md)

**Further reading**
- [Atlassian — Incident management handbook](https://www.atlassian.com/incident-management/handbook) — for the on-call discipline that ticket automations are amplifying
- [Will Larson — How to grow as a tech lead](https://lethain.com/) — for why "automation reliability + human spot-checks" is the durable pattern in any operational system
- [Anthropic on connector permissions](https://www.anthropic.com/) — the safety primitives that matter when an AI starts drafting things on a real ticketing tool
