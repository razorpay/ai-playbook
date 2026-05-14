---
title: "Template: Retro (Quest, Boss Fight, Embedded Sprint)"
slug: "appendices/templates/retro"
section: "appendices"
status: "drafted"
type: "template"
track: "templates"
order: 7
time_minutes: 5
audience: "everyone"
outcome: "Write a retro that captures what worked, what did not, what surprised, and what the next person should know — in three variants for Quest, Boss Fight, and Embedded Sprint."
prev: "appendices/templates/rfc"
next: "appendices/templates/mv-wiki-seed"
pillar: "meta"
belt: null
tags: ["template", "retro"]
updated: "2026-05-08"
---

# Template: Retro (Quest, Boss Fight, Embedded Sprint)

## What this template is for

The retro template covers three variants. All three share the same core structure (what worked, what did not, what surprised, what the next person should know). They differ in scope and audience.

- **Quest retro.** After completing a quest in any belt. Short. Read by the cohort lead and feeds the certification record.
- **Boss Fight retro.** After completing a belt's boss fight. Longer. Becomes part of the belt's claim evidence.
- **Embedded Sprint debrief.** After a one-week embed (B.13) or after a Boss Fight B-B month (the four-week version). Pinned in the program's primary forum so the next embed inherits the lessons.

A retro is shorter than the curriculum chapter that describes it. The chapter explains the discipline; the retro is the artefact. Target length: 200 to 600 words for a Quest retro, 500 to 1,000 for a Boss Fight retro, 600 to 800 for an Embedded Sprint debrief.

## How to use it

1. Pick the variant that matches the work you are reflecting on.
2. Copy the relevant template body below into your tracker, the program's forum, or the embed debrief location.
3. Replace the placeholders.
4. Submit. Quest retros go to the cohort lead; Boss Fight retros go into the belt claim; Embedded Sprint debriefs are pinned in the program's primary forum.

---

## Variant 1: Quest retro

```markdown
# Quest retro: <!-- e.g., Quest G-1 — Author a team skill -->

| | |
|---|---|
| **Builder** | <!-- handle --> |
| **Quest** | <!-- e.g., Quest G-1 --> |
| **Belt** | <!-- White / Yellow / Green / Black --> |
| **Date claimed** | <!-- YYYY-MM-DD --> |

## What I shipped

<!-- replace this with two or three sentences naming the artefact.
     Link to the PR or the published skill or the deliverable. -->

## What worked

<!-- replace this with one paragraph or three to five bullets naming
     what went well. Specific. -->

## What did not

<!-- replace this with what was harder than expected, what got stuck,
     what I would do differently next time. -->

## What surprised me

<!-- replace this with one or two specific moments where the
     experience did not match what I expected from the curriculum. -->

## What the next builder should know

<!-- replace this with one paragraph that the next person doing this
     quest should read first. The compounding part of the retro. -->
```

### Worked example: Quest retro

```markdown
# Quest retro: Quest G-1 — Author a team skill

| | |
|---|---|
| **Builder** | engineer-handle |
| **Quest** | G-1 |
| **Belt** | Green |
| **Date claimed** | 2026-XX-XX |

## What I shipped

A skill pack named `weekly-status-pack` that produces our team's recurring weekly status report. Published to the program's pinned distribution channel. Two teammates have invoked it successfully in the past week.

## What worked

- The G.7 anatomy checks caught two issues in my first draft (vague trigger, missing output shape) that I would not have caught otherwise.
- Pairing with one teammate for the first invocation surfaced an edge case I had not handled (when the tracker is empty for the week).
- Using the SKILL.md minimum-viable template as a starting point made the first draft much faster than starting from scratch.

## What did not

- I underestimated how much time the testing phase would take. Writing acceptance scenarios is harder than writing the skill itself; budget more time for it next time.
- My initial trigger phrasing was too generic. The skill activated when teammates asked for any "status report", including non-weekly ones. Tightened it after the first feedback.

## What surprised me

The G.7 chapter mentioned that a SKILL.md should be readable in two minutes. I dismissed that as guidance until my first draft was 280 lines and my reviewer pointed out it had become unreadable. Cutting it to 90 lines also made it more useful.

## What the next builder should know

Start with the simplest workflow that does anything useful. Resist the urge to handle every edge case in v0.1; let real usage surface them. The skill is meant to compound; v1.2 is a much better artefact than a perfect v1.0 that took twice as long.
```

---

## Variant 2: Boss Fight retro

```markdown
# Boss Fight retro: <!-- e.g., Boss Fight G-B — The double-ship -->

| | |
|---|---|
| **Builder** | <!-- handle --> |
| **Boss Fight** | <!-- e.g., G-B --> |
| **Belt** | <!-- White / Yellow / Green / Black --> |
| **Date claimed** | <!-- YYYY-MM-DD --> |
| **Reviewer** | <!-- out-of-team reviewer per Appendix L --> |

## What I shipped

<!-- replace this with the artefact summary. Link to the PR(s),
     deliverable, or measurement. For Boss Fight B-B, link to the
     case study. -->

## The arc

<!-- replace this with two or three paragraphs walking the boss
     fight from start to finish. What you started with, the
     turning points, what you ended with. -->

## What worked

<!-- replace this with three to five bullets naming the moves that
     worked. Specific to the boss fight, not generic. -->

## What did not

<!-- replace this with three to five bullets naming what got stuck
     and how (or whether) it resolved. -->

## What I learned about myself

<!-- replace this with the meta-reflection. The boss fight is
     supposed to surface something about how you work; what did
     it surface? -->

## What the next builder should know

<!-- replace this with one or two paragraphs that the next builder
     attempting this boss fight should read first. The compounding
     value of the retro. -->

## Reviewer attestation

<!-- DELETE: The reviewer signs here. -->
Reviewed by <!-- reviewer handle -->. The artefacts are consistent
with the boss-fight rubric. <!-- short note from the reviewer if
needed -->
```

### Worked example: Boss Fight retro (sketch)

A populated Boss Fight retro is roughly 800 words and follows the structure above. Because it includes belt-specific details, this template ships without a full populated example to avoid making the example artefact feel canonical for any one belt. The Quest retro example above shows the populated style; apply the same density and voice to a Boss Fight retro.

---

## Variant 3: Embedded Sprint debrief

```markdown
# Embedded Sprint debrief: <!-- POD identifier or anonymised name -->

| | |
|---|---|
| **Embedding builder** | <!-- handle --> |
| **Host POD** | <!-- POD identifier or anonymised --> |
| **Host POD lead** | <!-- handle --> |
| **Embed dates** | <!-- YYYY-MM-DD to YYYY-MM-DD --> |
| **Type** | <!-- one-week embed (B.13) / four-week boss-fight embed (B-B) --> |

## Pre-week scope

<!-- replace this with the pre-week conversation summary. Deliverable,
     owner-pair, constraints, what 'done' meant. -->

## Deliverable

<!-- replace this with what shipped. Link to the artefact (skill pack,
     PR, documented practice, measurement). -->

## What was harder than expected

<!-- replace this with one to three named patterns. The honest
     observations. -->

## What the platform team should fix

<!-- replace this with named patterns that apply to the platform
     team, not the host POD. The host POD's experience has surfaced
     gaps in the platform; this is where they get logged. -->

## What the host POD should keep doing

<!-- replace this with the patterns the host POD is doing well.
     Worth surfacing because the platform team learns from healthy
     teams as much as from struggling ones. -->

## What the next embed should know

<!-- replace this with one paragraph for the next embedding
     builder. The compounding value of the debrief. -->

## Sign-offs

<!-- DELETE: Both sides sign. -->
- Embedding builder: <!-- handle, date -->
- Host POD lead: <!-- handle, date -->
- Reviewer (out-of-team per Appendix L): <!-- handle, date -->
```

### Worked example: Embedded Sprint debrief

```markdown
# Embedded Sprint debrief: alpha-team

| | |
|---|---|
| **Embedding builder** | platform-engineer-handle |
| **Host POD** | alpha-team |
| **Host POD lead** | alpha-team-lead-handle |
| **Embed dates** | 2026-XX-XX to 2026-XX-XX (one week) |
| **Type** | one-week embed (B.13) |

## Pre-week scope

The alpha team owns a recurring weekly status report that takes a senior builder roughly three hours each week. Pre-week conversation: deliverable was a skill pack that automates the report; owner-pair was me plus a mid-level builder on the alpha team; constraints were that the skill pack must use the program's pinned distribution and must not depend on data the team did not already have access to. Done meant: the skill pack is published, the team has run it on two consecutive weekly reports, and the time-saved measurement is logged.

## Deliverable

`weekly-status-pack` v1.0, published to the program's pinned distribution. The alpha team has used it for the past two weekly reports; time-saved measurement is logged in their tracker.

## What was harder than expected

The alpha team's tracker has three label variants for the same concept (priority labels using "high", "P1", and "urgent" interchangeably). The skill pack initially failed for one builder whose items used "urgent" because I had assumed "P1" was the canonical form. This is a documentation gap, not an AI gap, and the team has agreed to standardise the labels.

## What the platform team should fix

The program's pinned plugin had a small install-friction issue on the alpha team's specific setup that wasted roughly 30 minutes on Monday. Filed a ticket against the platform team's queue.

## What the host POD should keep doing

The alpha team's CLAUDE.md is unusually well-written. It made the embed possible in one week. The team's pattern of writing the CLAUDE.md as part of their onboarding ritual is a model the platform team should surface for other teams.

## What the next embed should know

If the host POD's tracker has non-standard label patterns, build the SKILL.md to detect-and-redirect rather than assuming the standard. Cost me half a day to refactor; could have been zero with the right defensive code from the start. The pattern of "shadow week 1, build weeks 2-3, hand-over week 4" works for one-week embeds compressed to "shadow Monday, build Tuesday-Thursday, hand-over Friday" — do not skip the shadow day.

## Sign-offs

- Embedding builder: platform-engineer-handle, 2026-XX-XX
- Host POD lead: alpha-team-lead-handle, 2026-XX-XX
- Reviewer: a Black Belt member from a third team, 2026-XX-XX
```

This populated embedded-sprint debrief is roughly 700 words. It is read by the next embedding builder, by the platform team, and by the cohort lead.

---

## What this template is not

**Not a substitute for the curriculum chapter.** The retro is the artefact; the chapter is the rationale. For Quest retros, the relevant chapter is the quest's own description. For Boss Fight retros, the boss-fight chapter. For Embedded Sprint debriefs, [B.13](../../belts/04-black/c-org/B13-embedded-sprints.md) and (for Boss Fight B-B) [the boss fight chapter](../../belts/04-black/c-org/boss-fight-BB-pod-ai-uplift.md).

**Not a place for blame.** A good retro names patterns, not people. If something went wrong because of a specific person's behaviour, the retro names the pattern (e.g., "the host POD did not have a CLAUDE.md, which made onboarding harder") rather than the person.

**Not optional.** The retro is what makes a quest, boss fight, or embed *signal-bearing*. Without the retro, the work is done but the lessons evaporate.

**Not unbounded.** A retro that becomes a 5,000-word essay has lost the discipline. Use the length guidance: Quest retros stay short, Boss Fight retros are longer but still bounded, Embedded Sprint debriefs sit in the middle.

---

**Previous:** [← RFC template](RFC-template.md) · **Next:** [→ Minimum-viable-wiki seed](minimum-viable-wiki-seed.md)
