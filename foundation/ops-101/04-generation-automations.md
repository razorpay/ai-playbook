---
title: "Generation automations"
slug: "ops-101/generation-automations"
section: "foundation"
status: "drafted"
type: "chapter"
track: "ops-101"
order: 4
time_minutes: 25
audience: "pm-designer-ops"
outcome: "Automate recurring outbound writing without losing judgement or accountability."
prev: "ops-101/triage-automations"
next: "ops-101/ticket-automations"
pillar: null
belt: null
tags: ["ops-101", "automation"]
updated: "2026-09-13"
---

# 0B.4 — Generation automations

> **⏱ 25 minutes · 👥 PMs, designers, ops, anyone whose role demands recurring writeups · 🎯 Leaves with:** three concrete generation recipes (standup writeups, weekly summaries, meeting recaps) and a way to test whether a generated artefact is ready for human review and safe to ship.

---

## What changes from triage to generation

In chapter 0B.3 we sorted *inputs* into buckets. Here we flip the direction: instead of organising what's coming in, we're producing what needs to go out. Standup updates. Weekly summaries. Recap emails after meetings. Status reports for your skip. Talking-points for next week's review.

Generation is a different muscle from triage, and a different kind of leverage. Triage saves you the cost of *sorting* a queue you didn't ask for. Generation saves you the cost of *producing* an artefact you have to ship anyway. They sometimes overlap (your daily inbox briefing is both) but the patterns are distinct, so this chapter treats them separately.

Triage and generation fail differently. Triage categories need tuning; generation has a higher reliability bar. A wrongly sorted email is annoying. A wrong fact in a status update to your skip is reputational. We'll go through three recipes and the discipline that makes each shippable.

---

## What "trustworthy" means in generation

Before any recipes, the discipline.

A generated artefact is ready for review when its claims can be checked and its shape is useful. It is ready to ship only after a human has checked it. Accuracy alone is not enough: every word might be true while the artefact still misstates a decision, buries an ask, or sounds nothing like its sender.

Three properties together make generated artefacts shippable:

- **Sourced.** Every meaningful factual claim links back to a specific source the agent saw: a Slack thread, a doc, a meeting transcript, or a calendar event. If a claim has no source, label it as an inference or remove it. A citation makes a claim checkable; it does not make the claim correct.
- **Voiced.** It sounds like you, not like a generic robot. Teach the agent with concrete corrections, but keep responsibility for the final tone.
- **Scoped.** It covers what was asked for and stops. A weekly summary that sprawls into a half-explanation of next quarter's strategy is annoying. The scope is something you write into the prompt and then *enforce* in review.

Every recipe in this chapter uses those three properties. None removes the final human review.

### Before a recipe: measure it

The setup and savings will vary with your source access, writing habits, and review bar. Establish a manual baseline before you automate, then test the draft against representative examples: a quiet period, a normal one, and a messy one with missing or conflicting context.

Copy this card into your working doc:

```markdown
Generation automation acceptance
- Artefact and audience:
- Representative examples tested:
- Required sections present:
- Factual claims linked to sources:
- Unsupported factual claims: 0
- Decisions, owners, and dates verified:
- Voice or framing edits still needed:
- Manual baseline (draft + review time):
- Generated path (run + review time):
- Verdict: AUTOMATE WITH REVIEW / KEEP TUNING / STOP
```

Run the prompt manually first. For each example, open the cited sources, verify decisions and commitments, and record every correction. Turn repeated corrections into explicit instructions. Schedule it only when the representative set passes the card and the review remains faster than writing the artefact yourself. Keep high-stakes or sensitive writeups manual if the sources, permissions, or review path are unreliable.

---

## Recipe 1 — Daily standup writeup

A standup update is a small, repeatable place to test generation. Use this recipe if you regularly write some version of "what I did yesterday / what I'm doing today / what's blocking me."

**Connectors.** Calendar (for what meetings you had yesterday) + Slack (for what you said and what was said to you) + your ticketing tool (for what tickets moved).

**The shape.**

Each morning, before standup:

> "Pull yesterday's calendar events I attended, my Slack mentions and DMs from yesterday, and any tickets I closed, opened, or commented on yesterday. Write a standup update for me with three sections:
>
> - **Yesterday:** what I worked on, in order of significance. Two to four bullets. Each bullet links back to the calendar event, Slack thread, or ticket it came from.
> - **Today:** my plan for today, based on my calendar and any open commitments I made yesterday. Two to four bullets.
> - **Blockers:** anything I'm waiting on, with the named person or team I'm waiting on. Empty if I'm not waiting on anything.
>
> Keep my voice: direct, light on adjectives, no corporate language. No filler bullets. If there's nothing meaningful, say 'no update.'"

Test the prompt against the acceptance card before scheduling it. Log the corrections you make, especially unsupported significance, invented commitments, and missing blockers. Each live draft still gets a source check before you post it.

**Reliability tip.** Save the prompt as a recipe. Put your name and team into the prompt template explicitly ("I'm a designer on the merchant onboarding team") so the agent's choice of which calendar events count as "significant" is informed.

**When this stops working.** On weeks where you spent most of your time deep in one thing (writing a long doc, doing a stretch of customer interviews) the agent struggles to summarise *the thing* because the thing isn't represented in your Slack/calendar/tickets. Override manually those weeks. Most weeks have surface area; some weeks don't.

---

## Recipe 2 — Weekly summary for your skip

This is a bigger, higher-stakes artefact than a standup update. A useful draft gives your skip a clear heartbeat without hiding setbacks or manufacturing progress. It also needs a stricter review because errors travel further.

**Connectors.** Same as standup (calendar + Slack + ticketing) plus access to whichever doc your team uses for shared planning (Workspace docs, the wiki, etc.).

**The shape.**

Each Friday afternoon, before signing off:

> "Pull this week's calendar events I attended, my Slack mentions and DMs across all channels, the tickets I closed or significantly progressed, and any docs I or my team materially edited. Write a weekly summary aimed at my skip [who I describe in two lines: their priorities and what they ask me about].
>
> Structure it as:
>
> - **Headline (one sentence):** the most consequential thing that moved this week.
> - **Done (3–5 bullets):** the meaningful work that landed. Each bullet should link to its evidence (the merged PR, the shipped doc, the meeting, the decision thread). No filler.
> - **In-flight (2–4 bullets):** what's actively moving, with the *expected* completion date. Skip is going to ask. Have the answer ready.
> - **Risks / blockers (0–3 bullets):** anything where I need help, where a deadline is at risk, or where a decision from above is overdue. If there's nothing, say so.
> - **Asks (0–2 bullets):** anything I want from skip: a decision, an intro, a steer. Most weeks: zero.
>
> Match my voice: concise, direct, plain, no jargon. No 'great team effort' filler. If a sentence sounds like a corporate update, rewrite it. If you're tempted to claim something I haven't actually shipped, hedge it explicitly with 'still in flight.'"

Test the draft on weeks with different shapes. A launch week, a research week, and a week dominated by unresolved work will expose different omissions. Tune the prompt from recorded corrections rather than assuming a fixed number of runs will make it sound like you.

**Reliability tip.** Require the agent to *link every factual claim* to its evidence. When your skip asks "remind me what this was?" the answer is already in the update. Open a sample of those links during review; plausible-looking citations can still point at the wrong evidence.

**A specific failure mode to watch for.** Generated summaries can smooth over setbacks or unfinished work. Ask explicitly: *"include any setbacks or decisions reversed; do not euphemise."* During review, compare the draft with the risks and reversals in the source material.

**When you'd skip this recipe.** If you're getting 1:1s with your skip every week and they already have full context, the writeup is overkill. The recipe shines when the cadence is fortnightly or monthly and the writeup is the primary sync.

---

## Recipe 3 — Meeting recap

If you've ever been in a 90-minute meeting that ended with "let's send out a recap with action items" and silently wished someone else would write it — this recipe is your wish granted.

**Connectors.** Whatever produces transcripts (your meeting tool's recording + transcription, or a transcript from a notes app) + the ticketing tool (so action items become real tickets, not just bullet points in a doc that everyone forgets).

**The shape.**

Right after a meeting:

> "Read this meeting transcript [paste, or pull from the recording]. Produce a recap with three sections:
>
> - **Decisions made (1–5 bullets):** every decision that was made, even small ones. Phrase each as 'X decided.' If it was conditional, say so.
> - **Action items (1–10 bullets):** every action that was committed to, with the *named owner* and the *expected completion*. If an action item didn't get an explicit owner in the meeting, flag it as 'OWNER UNCLEAR' so we follow up.
> - **Open questions (0–5 bullets):** things raised in the meeting but not resolved. Each should be tagged with who's expected to answer it.
>
> Do not summarise the *discussion*. We don't need a transcript-of-the-transcript. We need the artefact people can act on tomorrow morning.
>
> Then: for each action item with a clear owner, draft a ticket in the ticketing system pre-filled with the owner, the action, and a link back to the meeting recap. Show me the drafts; don't create them yet."

The discipline: *don't let the recap merely replay the discussion.* After the meeting, people need to know what was *decided*, what was *committed to*, and what remains open.

**Reliability tip.** Have the agent flag any action item where the owner wasn't explicit. The recap has done you a service if it surfaces "we said someone will follow up but didn't say who." That's the bug; the recap exposing it is the feature.

**When this stops working.** Meetings where the value was in the *discussion* itself: design crits, brainstorms, post-mortems where the lessons live in the back-and-forth. For those, you want a different kind of artefact (a "what did we learn" doc, not a recap). Save Recipe 3 for decision meetings.

---

## What generation is and isn't good at

A short, honest list before moving on.

**Useful for:**

- Pulling structured outputs from messy inputs: meeting transcripts, Slack threads, scattered calendar events.
- Applying a demonstrated voice guide to a repeatable format.
- Attaching source links when the input system preserves stable references.
- Writing the boring middle of an artefact ("what was done" sections, status bullets, action items) so you can spend your time on the parts that actually need judgement (the headline, the asks).

**Keep with the human reviewer:**

- Ownership of the *opinion* parts of an artefact: the headline, the editorial framing, and the *"this is what I think we should do"* line.
- Capturing tone-of-voice from a *meeting* (transcripts flatten everything; the half-joke that defused a tense moment will not appear in the recap).
- Knowing when *not* to send the artefact at all. If your week was a catastrophe, sometimes a fortnightly writeup should be a real conversation with skip instead of a summary.
- Reading between the lines. If two action items are mutually contradictory, the agent may list both. The catch is yours.

Treat AI as the drafter and yourself as the accountable editor. *Every* generated artefact should pass under your eye before it ships. If review repeatedly takes as long as writing from scratch, change the prompt, narrow the task, improve the sources, or stop the automation.

---

## Connecting back to the boss fight

A standup automation can be a strong boss-fight candidate when the artefact recurs, the sources are available, and the acceptance card passes. Use the track's before-and-after log to measure total drafting, review, and correction time. Count observed savings toward the four-hour boss-fight bar; do not count the recipe headings as a forecast.

Three suggestions before committing a generation automation as your boss fight:

- **Pick a frequent, source-rich artefact with a clear review owner.** Sparse inputs and ambiguous ownership make a poor first automation.
- **Plan for a tuning phase.** Stop tuning when representative examples pass the acceptance card, not after an arbitrary number of days or drafts.
- **The recipe you contribute** to the recipe library is the one your *team* could fork. That means parameterising the prompt ("team name," "tone preferences," "skip's priorities") so the next person can fork without re-discovering the same trade-offs.

---

## What you should carry into the next chapter

- Generation flips the direction of triage: produce outputs from messy inputs.
- Three properties make a generated artefact trustworthy: **sourced** (every factual claim links to its evidence), **voiced** (sounds like you), **scoped** (covers what was asked for and stops).
- Three recipes to test: standup writeup, weekly summary for skip, and meeting recap. Keep only the ones that pass your quality and time baseline.
- AI is the drafter; you are the accountable editor. Every generated artefact should pass under your eye before it ships.
- Generated artefacts that *describe the discussion* are the failure mode. Decisions and commitments are what travel; discussions don't.
- The next chapter ([0B.5 — Ticket automations](05-ticket-automations.md)) is the third recipe family — automating the ticketing workflow itself, from drafting through routing through digesting.

---

**Previous:** [← 0B.3 Triage automations](03-triage-automations.md) · **Next:** [→ 0B.5 Ticket automations](05-ticket-automations.md)
