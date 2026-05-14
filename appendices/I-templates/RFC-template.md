---
title: "Template: AI RFC"
slug: "appendices/templates/rfc"
section: "appendices"
status: "drafted"
type: "template"
track: "templates"
order: 6
time_minutes: 8
audience: "platform-builder"
outcome: "Write an AI RFC that names what would change, why, what alternatives exist, what it costs, how it rolls out, how success is measured, and how it rolls back if needed."
prev: "appendices/templates/skill-md-full"
next: "appendices/templates/retro"
pillar: "governance"
belt: null
tags: ["template", "rfc", "governance"]
updated: "2026-05-08"
---

# Template: AI RFC

## What this template is for

The canonical RFC template for the program's AI surface. Use it for proposals that affect more than one team — a new connector, a new policy, a new shared skill pack, a new model-routing decision. The template combines the seven-section discipline from [B.14](../../belts/04-black/c-org/B14-writing-an-ai-rfc.md) with the Council-specific additions from [C.3](../../belts/05-council/C03-rfc-pipeline.md).

Both chapters point at this template. When B.14 says "the seven sections" and C.3 says "the canonical RFC shape", they mean the artefact you are about to write.

Target length: 500 to 1,200 words for the body. RFCs that exceed 2,000 words are usually candidates for splitting into separate proposals.

## How to use it

1. Copy the template body below into a new RFC document (Markdown is the program's default; the file lives in the program's RFC archive).
2. The number is assigned at the moment the document enters draft state (your archive's RFC numbering owns this).
3. Replace the placeholders with your content.
4. Walk the pre-RFC conversation step (one or two reviewers, private) before opening for public discussion.
5. Open the discussion; the time-bounded comment window starts.
6. Address objections; iterate the document.
7. The named approver evaluates whether all serious objections have been addressed and decides committed or abandoned.

---

## Template body

```markdown
# RFC <!-- number assigned by the archive -->: <!-- short title -->

| | |
|---|---|
| **Author** | <!-- handle or pair --> |
| **Approver** | <!-- single Council member or senior engineer in the affected domain --> |
| **State** | draft / discussion / published / committed / abandoned |
| **Discussion window** | <!-- start date / close date --> |
| **Date drafted** | <!-- YYYY-MM-DD --> |
| **Date committed (or abandoned)** | <!-- YYYY-MM-DD or pending --> |

## Cited prior RFCs

<!-- replace this with direct references to RFCs whose decisions this RFC
     builds on or reverses. Each citation is a one-liner. Example:
     - RFC 0042: MCP adoption decision (this RFC builds on the canonical
       MCP framing established there).
     - RFC 0061: Original tracker MCP designs by individual teams (this
       RFC supersedes those designs).
     If no prior RFCs apply, say so explicitly: "No prior RFCs cited; this
     is a new domain in the archive." -->

## 1. Problem statement

<!-- replace this with two paragraphs. What is broken or missing or
     costly today? Who pays the cost? When did it become a problem?
     Be specific. Avoid the temptation to engineer the problem
     statement to support the recommendation.

     Example:
     "Three teams currently maintain custom MCP servers for their
     tracker integrations. Each maintainer has spent roughly three
     person-weeks on the integration. The combined ops cost is around
     X per month. The integrations diverge in subtle ways (auth
     handling, rate-limit policy), and these divergences surface as
     'why does this work for team A but not team B' in the office-hours
     queue with rising frequency. The problem became acute three months
     ago when the fourth team's request for the same integration
     surfaced the cost of producing a fourth divergent version." -->

## 2. Options considered

<!-- replace this with at least three options, including 'do nothing'.
     Each option gets a one-paragraph description, engineering cost in
     person-weeks, ops cost monthly, risk surface, and who reviews or
     owns it. Be honest. Strawman options waste reviewers' time.

     Example:

     **Option 0: Do nothing.**
     The three teams continue maintaining their integrations. Cost
     continues. Office-hours queue continues to surface divergence
     questions. Engineering cost: zero new. Ops cost: continues at
     X per month. Risk: divergence cost grows roughly linearly with
     the number of teams adopting tracker integrations.

     **Option A: Canonical connector class.**
     The platform team authors a canonical connector class that all
     three teams adopt. Engineering cost: 6 person-weeks across two
     platform engineers. Ops cost: net savings of Y per month after
     migration. Risk: the three teams' edge cases must all be
     accommodated; missing one breaks adoption.

     **Option B: Adopt vendor connector.**
     Adopt the public vendor connector and accept the integration
     shape. Engineering cost: 2 person-weeks for adoption. Ops cost:
     +Z per month for vendor licensing. Risk: vendor connector does
     not handle the Razorpay-specific auth flow; we have hit this
     before with similar adoptions.
     -->

## 3. Recommendation

<!-- replace this with the author's pick from the options, with the
     reasoning made explicit. The reasoning should be re-derivable
     from the options table.

     Example:
     "Option A. The 6 person-weeks of engineering investment is
     amortised across the three teams' maintenance going forward.
     The convergence solves the office-hours-queue divergence problem
     directly. The auth-flow risk in Option B is real and has bitten
     similar adoptions; the cost of working around it would absorb
     most of Option B's apparent engineering savings." -->

## 4. Cost and risk

<!-- replace this with the recommendation's cost and risk in detail.
     Three sub-sections.

     **Engineering cost.** Person-weeks; team that would do the work;
     dependencies.

     **Ops cost.** Recurring monthly cost; per-call cost if applicable;
     who pays.

     **Risk surface.** What gets harder; who pays the risk if it goes
     wrong; the worst-case failure mode; the mitigation. -->

## 5. Rollout plan

<!-- replace this with the sequence from "RFC committed" to "in
     production". Numbered steps. Each step has a named owner and an
     expected duration.

     Example:
     1. Weeks 1-6: Implement the canonical connector class behind an
        opt-in flag. Owner: platform team.
     2. Week 7: Dogfood on the platform team's own integration. Owner:
        platform team.
     3. Weeks 8-10: Migrate the three teams in sequence. Each migration
        owner-paired with the team. Owner: platform team plus each
        team's lead.
     4. Week 11: Turn on the flag by default; old integrations stay
        opt-out for two more weeks.
     5. Week 13: Deprecate the per-team integrations.
     -->

## 6. Success metric

<!-- replace this with a measurable, time-bounded, agreed-in-advance
     metric. "Adoption" is not a metric. Specific outcomes are.

     Example:
     "By week 13 from RFC commitment:
     (a) all three teams have migrated to the canonical class;
     (b) zero divergence-shaped questions appear in the office-hours
         queue for two consecutive weeks;
     (c) ops cost is lower than baseline by at least Y per month."
     -->

## 7. Rollback plan

<!-- replace this with the rollback discipline. Three sub-sections.

     **Trigger.** What value of the metric (or what time horizon
     without the metric trending) triggers rollback.

     **Mechanism.** How rollback is executed (feature flag flip,
     plugin version pin, code revert).

     **Owner.** Who pulls the trigger and runs the mechanism.

     Example:
     "**Trigger:** Any of the three migrations rolls back due to
     edge-case breakage that takes more than one week to fix. Or:
     ops cost is higher than baseline at week 13.

     **Mechanism:** The opt-in flag flips back to default-off. The
     three teams' original integrations remain in place during the
     deprecation window.

     **Owner:** The RFC author, with platform team support."
     -->

## Discussion log (during discussion state)

<!-- DELETE: This section is populated by reviewers and the author
     during the discussion window. Do not pre-populate it. Substantive
     comments and the author's responses end up here through PR review
     comments. -->

## Approver's call (at close of discussion)

<!-- DELETE: At the close of the discussion window, the approver
     records here whether all serious objections have been addressed
     and the decision (committed or abandoned), with reasoning. The
     reasoning is durable; it ends up in the archive as part of the
     RFC's permanent record. -->
```

---

## Worked example

A populated RFC. Names redacted; numbers illustrative.

```markdown
# RFC 0087: Adopting a canonical connector class for tracker integrations

| | |
|---|---|
| **Author** | A platform engineer (handle redacted) |
| **Approver** | A Council member whose domain is platform |
| **State** | committed |
| **Discussion window** | 2026-XX-XX to 2026-XX-XX (two weeks) |
| **Date drafted** | 2026-XX-XX |
| **Date committed** | 2026-XX-XX |

## Cited prior RFCs

- RFC 0042: MCP adoption decision (this RFC builds on the canonical MCP framing).
- RFC 0061: Original tracker MCP designs by individual teams (this RFC supersedes those).

## 1. Problem statement

Three teams currently maintain custom MCP servers for tracker integrations. Each has spent roughly three person-weeks of engineering on the integration. Combined ops cost is around X per month. The integrations diverge in subtle ways (auth handling, rate-limit policy), and the divergence surfaces as "why does this work for team A but not team B" in the office-hours queue with rising frequency.

The problem became acute three months ago when the fourth team requested the same integration. Producing a fourth divergent version would cost another three person-weeks and add another set of subtle differences. The cost of divergence grows linearly with adoption.

## 2. Options considered

**Option 0: Do nothing.** Continue per-team integrations. Cost continues. Divergence grows. Engineering cost: zero new. Ops cost: continues at X per month. Risk: cost compounds.

**Option A: Canonical connector class.** Platform team authors a canonical class. Engineering: 6 person-weeks across two engineers. Ops: net savings of Y per month after migration. Risk: edge cases must be accommodated.

**Option B: Adopt vendor connector.** Adopt a public vendor option. Engineering: 2 person-weeks. Ops: +Z per month for licensing. Risk: vendor does not handle the Razorpay-specific auth flow; we have hit this before with similar adoptions.

## 3. Recommendation

Option A. The 6 person-weeks of engineering is amortised across three teams (and the fourth incoming team) going forward. The convergence solves the office-hours-queue divergence problem directly. The auth-flow risk in Option B is real and has bitten similar adoptions.

## 4. Cost and risk

**Engineering cost.** 6 person-weeks across two platform engineers. Dependency on the platform team's existing MCP-author tooling, which is stable.

**Ops cost.** Net savings of Y per month after migration completes (week 13). The savings come from consolidating three sets of ops monitoring into one.

**Risk surface.** The three teams have edge cases the canonical class must accommodate. Pre-RFC conversations have surfaced all three; mitigation is the rollout's per-team migration step. Worst case: an unforeseen edge case forces a rollback to per-team integrations.

## 5. Rollout plan

1. Weeks 1-6: Implement the canonical class behind an opt-in flag. Owner: platform team.
2. Week 7: Dogfood on the platform team's own integration. Owner: platform team.
3. Weeks 8-10: Migrate the three teams in sequence (one per week), owner-paired with each team's lead. Owner: platform team plus team leads.
4. Week 11: Default-on the flag; old integrations remain as opt-out for two weeks.
5. Week 13: Deprecate the per-team integrations.

## 6. Success metric

By week 13 from commitment: (a) all three teams migrated; (b) zero divergence-shaped questions in the office-hours queue for two consecutive weeks; (c) ops cost lower than baseline by at least Y per month.

## 7. Rollback plan

**Trigger.** Any migration rolls back due to edge-case breakage that takes more than one week to fix; or ops cost is higher than baseline at week 13.

**Mechanism.** Opt-in flag flips back to default-off. The three teams' original integrations remain during the deprecation window.

**Owner.** The RFC author, with platform team support.
```

This populated RFC is around 600 words. The discussion log and approver's call sections are populated during the discussion window and at close, respectively, and end up as durable records in the archive.

---

## What this template is not

**Not a design document.** A design doc covers implementation detail in depth. An RFC covers decision rationale. The two are complementary; an RFC may cite a design doc, and a design doc may cite an RFC. Do not conflate them.

**Not a project plan.** RFCs that mutate from "should we do this" to "here is the implementation plan" lose architectural reasoning. Keep the RFC decision-focused; implementation belongs in a separate document.

**Not a venue for opinions without proposals.** "We should think about X" is a discussion topic. An RFC proposes a specific change.

**Not a permanent body of doctrine.** Committed RFCs can be superseded by later RFCs. The archive's append-only nature preserves the original; later RFCs mark predecessors as superseded with reasoning.

**Not a substitute for the chapters.** [B.14](../../belts/04-black/c-org/B14-writing-an-ai-rfc.md) covers the seven-section discipline; [C.3](../../belts/05-council/C03-rfc-pipeline.md) covers the pipeline mechanics. The template is the artefact; the chapters are the rationale.

---

**Previous:** [← SKILL.md full template](SKILL-md-full.md) · **Next:** [→ Retro template](retro-template.md)
