---
title: "The multi-year horizon"
slug: "council/multi-year-horizon"
section: "council"
status: "drafted"
type: "chapter"
track: "council"
order: 6
time_minutes: 25
audience: "staff-plus"
outcome: "Understand what the Council shapes that no quarterly artefact captures: the program's posture across model generations, regulatory frames, and platform-builder community changes over five-to-ten-year horizons."
prev: "council/external-voice"
next: null
pillar: null
belt: null
tags: ["council", "long-arc", "strategy"]
updated: "2026-07-15"
---

# C.6 — The multi-year horizon

The closing chapter of the Council section. C.1 through C.5 covered structural and operational mechanics: what the Council is, how it is structured, how RFCs work, how mentoring operates, how external voice is governed. This chapter is about the part of the Council's work that none of those mechanics directly capture.

The Council's most important deliverable is not any specific RFC, mentoring relationship, or external talk. It is the *long-arc shape* of the program: how the AI work develops across five-to-ten-year horizons. Model generations cycle in months; regulatory frames in years; platform decisions in multi-year horizons; cultural shifts in even longer horizons. The Council is the body that holds the long arc.

This chapter is the least anchored in the public literature of any in the Council section. Will Larson's *Staff Engineer* has a chapter on technical strategy that touches the multi-year frame; Tanya Reilly's *The Staff Engineer's Path* has material on long-term influence. Both are useful. Neither is comprehensive on what a senior-IC community does specifically across years rather than quarters. The chapter synthesises from those sources and is honest about where the synthesis is original.

## If you're short on time

The Council holds the program's multi-year posture: AI direction across model generations, regulatory shifts that move slowly, the platform-builder community's evolution, the playbook's own development. Quarterly artefacts (OKRs, sprint plans, even RFCs) operate on shorter time horizons. Without a body holding the long arc, quarterly decisions accumulate into a posture no one chose. The Council's work is to read the long arc, surface drift, and shape what cannot be captured in any single decision.

## Why the multi-year frame matters in an AI program specifically

In a stable engineering domain, the multi-year frame is important but not urgent. Architectures evolve slowly. Platform decisions made today will largely still apply in three years.

In an AI program, the multi-year frame is more urgent. Three things move faster than the platform itself.

**Model generations.** Frontier models advance every few months. Each generation changes what is possible, what is cheap, and what is appropriate. A program that designed its agent infrastructure for a previous model generation may need to revisit when the next generation lands. Without a body watching the cycle, individual teams revisit independently and the platform fragments.

**Regulatory frames.** Regulations on AI systems, on data handling in AI contexts, and on automated decision-making evolve year by year. The fintech regulator's posture on agent-mediated payment flows in 2026 is not the same as in 2024 or in 2028. A program that anchors its compliance posture at a single point in time and does not revisit drifts out of compliance silently. The Council is one of the bodies that watches this.

**The platform-builder community.** The Black Belt cohort changes every year. Senior engineers who are at the level today will not all be at the level in five years; new ones will arrive. Community norms calcify if no one watches them. A program whose senior-IC community looks the same in 2031 as it did in 2026 has either grown by accident or stagnated. Both are bad outcomes.

A Council that operates only on quarterly cycles will catch the first two effects late and miss the third entirely. The multi-year frame is what makes the Council distinct from the quarterly review surfaces that already exist.

## What the multi-year work looks like

The work happens primarily at the annual charter revision (covered in C.2), supplemented by long-arc reading the Council does together across the year.

**The annual long-arc review.** At the charter revision session, the Council reads the past year's RFCs end-to-end, looks at the case studies from Boss Fight B-B claims, reviews the patterns that have emerged in the office-hours archive, and surfaces what the program looked like five years ago, looks like now, and will plausibly look like five years out. The output is not a strategy document; it is a set of named patterns that members carry into the next year's work.

**The long-arc reading list.** The Council names a small reading list each year of work that members read together: a book, a longer essay, a conference talk, a regulatory white paper. The list is not curriculum; it is shared context. Members discuss the readings at the working forum once or twice a year. The discipline is what keeps the Council's frame longer than any individual member's frame.

**The succession watching.** Across years, the Council watches who is rising, who is plateauing, who is drifting. The annual review covers individual members; the multi-year frame covers the cohort. A cohort that is growing technically but narrowing demographically is signal. A cohort that is broadening but losing depth is signal. Reading these patterns requires comparison across years.

**The platform-shape watching.** Decisions made over three years compose into a platform shape. A Council that watches the composition can surface drift before it is irreversible. "We have made nineteen decisions in the last three years that all bias toward shipping fast on individual teams; we are now finding that cross-team integrations are harder than they were"  is a multi-year observation that no individual quarterly review surfaces.

The work is light per session and substantive over time. A Council that does the multi-year work conscientiously spends maybe three or four sessions a year explicitly on it.

## Worked example — a redacted three-year arc

A representative shape, drawn from synthesis of the literature rather than a specific case.

A program adopts an MCP-based platform in 2026. The first year is largely about adoption: teams build their own MCP servers, the platform-builder community shares patterns, and the first shared skills and plugins are published. The Council's RFC archive has decisions about MCP authentication, plugin packaging, and the shared skill library.

In 2027, the second year, the patterns mature. The first generation of shared skills is stable; the second generation begins layering on top. New team integrations follow a more standardised template. The Council's RFC archive has decisions about the canonical connector class, the deprecation lifecycle, and the relationship to the API Council.

In 2028, the third year, a new model generation lands that changes what agents can do. Some of the early MCP design choices are no longer the right ones for the new capabilities. Some shared skills that were valuable are now redundant. New patterns emerge that the program did not anticipate. The Council's RFC archive begins to include decisions that revise earlier ones.

The Council's multi-year work, across these three years, is to notice the shape of the evolution. To name when adoption matures into standardisation. To name when standardisation calcifies into ossification. To revise the deprecation lifecycle for plugins when the new model generation makes the old ones less useful. To bring engineers from the new generation of work into the Council so the membership reflects the program's current shape.

None of this work is captured in any single RFC. All of it shapes the next year's RFCs.

## What the Council reads together

The reading list is not curriculum. It is shared context. Some examples of what a year's reading might include, varying by what is relevant:

- A book that frames a long-running technical debate (Larson's *Staff Engineer*, Reilly's *Staff Engineer's Path*, Hogan's *Resilient Management* are starting points the Council members all share).
- An essay or paper that surfaces a shift the program needs to think about (a regulatory white paper, a major technical retrospective from a peer organisation, a foundational paper on a new technique).
- A conference talk that captures how a peer organisation handled a similar transition.
- An OSS project's RFC archive (Oxide's, for example) that demonstrates a specific pattern the Council wants to study.
- A retrospective from inside the program that distills what was learned in the past year.

The reading is not graded. The discipline is showing up to the discussion having read. The discussion is where the Council's frame extends.

## Succession across years

The Council's multi-year work on succession is the part most directly relevant to keeping the senior-IC community alive.

**Watching the rising cohort.** Across years, Council members notice the engineers who are operating at the level. The pattern in C.2's membership process (peer invitation ratified by leadership) operates within a year; the watching that produces good invitations operates across years. A Council member who has watched a Black Belt across two boss fights, three RFC sponsorships, and a sustained mentoring contribution has the context to invite well. A Council member who proposes an invitation based on a single quarter's visibility may be right but is operating with less data.

**Surfacing the next-cohort patterns.** The patterns that produce next-cohort senior engineers are visible across years. A program that consistently produces strong senior engineers from the platform-builder track has a working pattern; one that does not is missing something. The Council reads the pattern and surfaces it for engineering leadership when the leadership liaison meets.

**Preparing the next chair, the next liaison, the next sponsor.** The Council's roles rotate. Across years, members move into and out of various roles. The Council member who chairs the annual revision this year sponsors next year's incoming chair. The leadership liaison this quarter sponsors the next quarter's. The continuity across the rotation is itself a multi-year output.

## What the Council shapes that no individual decision captures

Five things, drawn from the synthesis of the literature.

**The program's posture toward AI itself.** Are agents the platform's primary surface, or are they one of several? Is the program building toward more autonomy or more human-in-the-loop? Is the platform investment in the model side, the harness side, or the context side? These questions get answered by hundreds of decisions over years. The Council watches the answers compose.

**The program's risk posture.** Compliance, security, data handling, regulatory readiness. The composition of decisions across years determines whether the program can move into more sensitive use cases or has to retreat from them. The multi-year frame is where risk-shape becomes legible.

**The community's voice.** What kinds of engineers does the program attract? What kinds does it retain? What does the senior-IC community sound like in public? The composition is not chosen in any one moment; it is the accumulated effect of mentoring patterns, hiring patterns, and external-voice patterns over years.

**The playbook itself.** The Council eventually owns the playbook. Chapters are written, revised, deprecated. Belts evolve. New tracks emerge as the program's shape changes. A reader in 2031 will read a different playbook than a reader in 2026; the difference is the Council's accumulated work.

**The relationship to engineering leadership.** Across years, the leadership liaison cadence produces a pattern: how much does engineering leadership consult the Council? How seriously? On what kinds of questions? The pattern is visible only across years, and the Council's posture in the relationship shapes the pattern as much as leadership's does.

## Common failure modes

Drawn from the literature where it touches the long-arc theme.

**Quarterly capture.** The Council operates only on quarterly cycles. Long-arc patterns are missed. Decisions accumulate into postures no one chose. Fix: the annual long-arc review is non-negotiable; the reading list is treated as work, not extra-curricular.

**Frame ossification.** The Council's view of the long arc was set at adoption and has not been revisited. The reading list is the same it was three years ago. The watched patterns are the same. The frame is stale. Fix: the annual revision includes the question "what should we be reading and watching that we are not?"

**Succession drift.** The Council notices candidates only in the year of their boss fight or invitation. Multi-year context is missing. Invitations land less reliably. Fix: the watching is across years, not at moment of invitation.

**Long-arc work that becomes prediction.** The Council attempts to predict what AI will do in five years and treats the prediction as planning. The prediction is wrong; the planning fails. Fix: the multi-year work is about *posture*, not prediction. The Council reads the long arc to inform present decisions, not to specify future ones.

**Long-arc work that becomes mysticism.** The Council talks about the long arc abstractly without grounding in actual decisions. The work feels meaningful but produces nothing actionable. Fix: the multi-year work is grounded in the RFC archive, the case-study archive, and the membership review. Without those, the long-arc conversation drifts.

**The Council treated as the only long-arc body.** Engineering leadership and the management chain also operate on multi-year horizons (capacity planning, compensation, organisational shape). The Council's long-arc work is technical and community-shaped, not the only long-arc work in the program. Fix: the leadership liaison surfaces leadership's long-arc concerns; the Council surfaces its technical-and-community-shaped long-arc concerns; both views inform each other.

## What this is not

**Not strategic planning.** Strategy lives elsewhere in the engineering org. The Council's long-arc work informs strategy by surfacing patterns and posture; it does not produce strategic plans.

**Not prediction.** The future is not knowable in detail. The Council reads the long arc to inform present action, not to specify future state.

**Not the place where headcount and budget happen.** Those are management functions, owned in the management chain. The Council can observe the patterns; it does not allocate resources.

**Not heavy.** A few sessions a year, a small reading list, the annual long-arc review. The work is light per unit of time and substantive across years.

**Not a substitute for any individual member's career thinking.** Each Council member has their own multi-year arc as a senior engineer. The Council's collective long-arc work is not a substitute for that; the two operate at different scales.

## Closing the section

This is the last chapter in the Council section. A reader who has walked C.1 through C.6 has the framing, the structure, the operational mechanics, the mentoring patterns, the external-voice posture, and the long-arc frame. The chapters describe a community that the program either builds or does not. They do not build it. The community is built by the senior contributors who do the work, and by the engineering leadership that supports the work being done.

The [charter template](charter.md) is the next document a Council that is forming would read. It is the artefact that codifies what the chapters describe. The first cohort of members ratifies it; subsequent cohorts revise it.

The program's playbook continues past these chapters into appendices, reading lists, and templates. The belt curriculum closes at Black Belt; the Council section closes here. What lies beyond is the work itself.

## What you can say after this chapter

> "The Council's most important deliverable is the long-arc shape of the program: AI direction across model generations, regulatory shifts that move slowly, the platform-builder community's evolution, the playbook's own development. The work is light per session and substantive over years. I can read the long arc, surface drift, and contribute to the multi-year frame the Council holds together."

## Where to go next

The [Council charter](charter.md) is the next document if you are reading this section as a member or candidate. The [Master Index](../../INDEX.md) is the next document if you are reading to understand the playbook's structure.

The chapters that follow in the broader playbook (appendices, methodologies, certification) are referenced elsewhere; the Council section ends here.

**Previous:** [← C.5 External voice](C05-external-voice.md) · See also: [the charter template](charter.md), [Council README](README.md), [Master Index](../../INDEX.md)

**Further reading**

- Will Larson, *Staff Engineer* (2021), the chapter on technical strategy.
- Tanya Reilly, *The Staff Engineer's Path* (O'Reilly, 2022), the chapter on long-term influence.
- The [Oxide RFD archive](https://github.com/oxidecomputer/rfd) — a public example of a multi-year decision corpus the program can study as a model.
- The Council's own [charter](charter.md) — the artefact that codifies what these chapters describe.
