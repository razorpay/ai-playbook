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
updated: "2026-04-26"
---

# 0B.4 — Generation automations

> **⏱ 25 minutes · 👥 PMs, designers, ops, anyone whose role demands recurring writeups · 🎯 Leaves with:** three concrete generation recipes (standup writeups, weekly summaries, meeting recaps) and a clear sense of what makes a generated artefact *trustworthy enough to ship without you re-writing it*.

---

## What changes from triage to generation

In chapter 0B.3 we sorted *inputs* into buckets. Here we flip the direction: instead of organising what's coming in, we're producing what needs to go out. Standup updates. Weekly summaries. Recap emails after meetings. Status reports for your skip. Talking-points for next week's review.

Generation is a different muscle from triage, and a different kind of leverage. Triage saves you the cost of *sorting* a queue you didn't ask for. Generation saves you the cost of *producing* an artefact you have to ship anyway. They sometimes overlap (your daily inbox briefing is both) but the patterns are distinct, so this chapter treats them separately.

The good news: generation is, in some ways, easier than triage. The buckets you spend two weeks tuning at the start of triage don't exist here. The bad news: generation has a higher reliability bar. A wrongly-sorted email is annoying. A wrong fact in a status update to your skip is reputational. We'll go through three recipes and the discipline that makes each shippable.

---

## What "trustworthy" means in generation

Before any recipes, the discipline.

A generated artefact is trustworthy when *you'd be comfortable shipping it without rewriting it*. Trustworthy isn't the same as accurate — every word might be true and the artefact might still be untrustworthy because you wouldn't recognise yourself in its tone, or because it's confidently asserting things that should have been hedged.

Three properties together make generated artefacts shippable:

- **Sourced.** Every meaningful claim links back to a specific source the agent saw: a Slack thread, a doc, a meeting transcript, a calendar event. If a claim *doesn't* link back, it should be hedged. AI is great at confidently inventing plausible facts; the source-link discipline is what catches them.
- **Voiced.** It sounds like you, not like a generic robot. This is more important than people realise — a status update that sounds *not-quite-you* makes readers wonder whether you wrote it, which is worse than no update at all. The voice is something you teach the agent over a few rounds; we'll cover how.
- **Scoped.** It covers what was asked for and stops. A weekly summary that sprawls into a half-explanation of next quarter's strategy is annoying. The scope is something you write into the prompt and then *enforce* in review.

Every recipe in this chapter assumes you're optimising for those three properties. The mistake most people make on their first generation automation is to optimise only for accuracy and forget the other two.

---

## Recipe 1 — Daily standup writeup (10-minute setup, ~10 minutes saved per workday)

The smallest, easiest, most universally applicable generation automation. If you write any kind of recurring "what I did yesterday / what I'm doing today / what's blocking me" update, this is the recipe.

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

The first three days you'll be tweaking. By day five, the agent will be drafting an update that's roughly indistinguishable from one you'd type yourself. You spend 60 seconds reviewing it, edit one or two lines, and post.

**Reliability tip.** Save the prompt as a recipe. Put your name and team into the prompt template explicitly ("I'm a designer on the merchant onboarding team") so the agent's choice of which calendar events count as "significant" is informed.

**When this stops working.** On weeks where you spent most of your time deep in one thing (writing a long doc, doing a stretch of customer interviews) the agent struggles to summarise *the thing* because the thing isn't represented in your Slack/calendar/tickets. Override manually those weeks. Most weeks have surface area; some weeks don't.

---

## Recipe 2 — Weekly summary for your skip (30-minute setup, ~45 minutes saved per week)

A bigger artefact, higher stakes, more reliability work, and arguably the most career-relevant generation in this chapter. Most managers want a weekly heartbeat from their reports; most reports hate writing it; most reports who hate writing it stop sending it; the silence costs both sides. AI fixes this almost entirely.

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

The first version you read might surprise you with how good it is, *or* with how off-brand it is. Both reactions are normal. Tune the tone with the prompt and the corrections you make in week one and week two.

**Reliability tip.** The single highest-leverage move is to have the agent *link every claim* to its evidence. When skip asks "remind me what this was?" you have the link in the doc you sent. The skip-respect compounds quickly.

**A specific failure mode to watch for.** AI is biased toward making everything sound positive. Your real week has setbacks; the writeup should reflect them honestly. Ask the agent explicitly: *"include any setbacks or decisions reversed; do not euphemise."* You want skip to trust the update, which means the update has to mention bad weeks.

**When you'd skip this recipe.** If you're getting 1:1s with your skip every week and they already have full context, the writeup is overkill. The recipe shines when the cadence is fortnightly or monthly and the writeup is the primary sync.

---

## Recipe 3 — Meeting recap (15-minute setup, ~30 minutes saved per multi-person meeting)

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

The discipline: *don't let the recap describe the discussion.* That's the failure mode of every meeting recap ever, AI-generated or not. The discussion is gone the moment the meeting ends; only what was *decided* and *committed to* matters tomorrow.

**Reliability tip.** Have the agent flag any action item where the owner wasn't explicit. The recap has done you a service if it surfaces "we said someone will follow up but didn't say who." That's the bug; the recap exposing it is the feature.

**When this stops working.** Meetings where the value was in the *discussion* itself: design crits, brainstorms, post-mortems where the lessons live in the back-and-forth. For those, you want a different kind of artefact (a "what did we learn" doc, not a recap). Save Recipe 3 for decision meetings.

---

## What generation is and isn't good at

A short, honest list before moving on.

**Good at:**

- Pulling structured outputs from messy inputs: meeting transcripts, Slack threads, scattered calendar events.
- Imitating your voice once you've taught it (a few rounds of corrections are enough).
- Linking every claim to a source — much better than a human, who tends to forget where things came from.
- Writing the boring middle of an artefact ("what was done" sections, status bullets, action items) so you can spend your time on the parts that actually need judgement (the headline, the asks).

**Not good at, yet:**

- Writing the *opinion* parts of an artefact: the headline, the editorial framing, the *"this is what I think we should do"* line. These are still your work.
- Capturing tone-of-voice from a *meeting* (transcripts flatten everything; the half-joke that defused a tense moment will not appear in the recap).
- Knowing when *not* to send the artefact at all. If your week was a catastrophe, sometimes a fortnightly writeup should be a real conversation with skip instead of a summary.
- Reading between the lines. If two action items are mutually contradictory, the agent will list both. The catch is yours.

Treat AI as the writer, you as the editor. *Every* generated artefact should pass under your eye before it ships, and ~90% of them will get a small edit and go. The 10% that need a bigger rewrite are the ones AI couldn't have nailed alone — and even then it's usually faster to edit the AI draft than to write from scratch.

---

## Connecting back to the boss fight

A standup automation is a perfectly defensible boss-fight candidate, especially for someone whose week is already full and whose marginal hour matters. Roughly an hour saved per workweek across the three recipes here, and that's just generation; combine with the triage recipes from chapter 0B.3 and you're well past the four-hour boss-fight bar before chapter 0B.5 even starts.

Three suggestions before committing a generation automation as your boss fight:

- **Pick the artefact you'd be most embarrassed to ship a bad version of.** That's the one where investing in voice + sourcing + scope discipline pays off the most.
- **Plan for a one-week voice-tuning phase.** The first version will sound *almost* like you. The second will sound mostly like you. The third will sound like you.
- **The recipe you contribute** to the recipe library is the one your *team* could fork. That means parameterising the prompt ("team name," "tone preferences," "skip's priorities") so the next person can fork without re-discovering the same trade-offs.

---

## What you should carry into the next chapter

- Generation flips the direction of triage: produce outputs from messy inputs.
- Three properties make a generated artefact trustworthy: **sourced** (every claim links to its evidence), **voiced** (sounds like you), **scoped** (covers what was asked for and stops).
- Three recipes to start: standup writeup, weekly summary for skip, meeting recap. Each saves real time. Each gets shippable in 1–2 weeks.
- AI is the writer, you are the editor. Every generated artefact should pass under your eye before it ships.
- Generated artefacts that *describe the discussion* are the failure mode. Decisions and commitments are what travel; discussions don't.
- The next chapter ([0B.5 — Ticket automations](05-ticket-automations.md)) is the third recipe family — automating the ticketing workflow itself, from drafting through routing through digesting.

---

**Previous:** [← 0B.3 Triage automations](03-triage-automations.md) · **Next:** [→ 0B.5 Ticket automations](05-ticket-automations.md)

**Further reading**
- [Lenny's Newsletter — How to write a great status update](https://www.lennysnewsletter.com/p/the-art-of-the-status-update) — for the human-side discipline that makes Recipe 2 land
- [Anthropic on Claude voice and persona](https://www.anthropic.com/) — official guidance on tuning model output for tone and style
- [Will Larson — The art of the meeting recap](https://lethain.com/) — for why "decisions and commitments only" is the discipline that makes recaps actually useful
