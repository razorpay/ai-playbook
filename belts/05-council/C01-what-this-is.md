---
title: "What this is and is not"
slug: "council/what-this-is"
section: "council"
status: "drafted"
type: "chapter"
track: "council"
order: 1
time_minutes: 25
audience: "staff-plus"
outcome: "Understand what the Council is, what it is not, and why senior-IC communities exist as something distinct from belts and from management."
prev: "council"
next: "council/structure"
pillar: null
belt: null
tags: ["council", "framing"]
updated: "2026-05-08"
---

# C.1 — What this is and is not

The Council sits in a strange place. It is not a belt, but it sits above Black Belt in the curriculum diagrams. It is not a management body, but it interfaces with engineering leadership on technical direction. It is not a credential, but membership is real and consequential. The first chapter exists to settle these tensions. Reading the chapters that follow without first reading this one is how the most-cited failure modes happen.

This chapter draws directly on Will Larson's *Staff Engineer* and Tanya Reilly's *The Staff Engineer's Path*. The framing is theirs; the application to this program is ours.

## If you're short on time

The Council is a standing community of senior contributors who shape the program's AI direction over multi-year horizons. Members are invited when they are already operating at the level. The Council advises on technical alignment, sponsors RFCs, mentors Black Belt candidates, and represents the program externally. It does not own headcount, budget, or policy that managers must follow. Every chapter that follows refers back to this distinction.

## What the Council is

A community first. A standing body second. A governance layer third.

**A community.** The Council is the layer of the engineering organisation where senior contributors find each other, align across teams, and notice the engineers who are operating at the level before anyone else does. Larson's interviews across Stripe, Slack, GitHub, Squarespace, Etsy, and Intercom are unanimous that this is the primary value senior-IC communities deliver. Without it, senior engineers in different teams diverge silently on architecture and on how to use the platform. With it, they catch the divergence early enough to fix it.

**A standing body.** The Council meets on a cadence. It has a charter. It has a membership process. It has a relationship with engineering leadership. These are the structural elements C.2 covers in detail. The standing nature is what makes the community durable across people changing teams, leadership changing focus, and the program's technical direction shifting over years.

**A governance layer.** The Council reviews RFCs against the program's AI surface. It sponsors the ones it believes in. It surfaces decisions that no single team has the authority to make. The RFC pipeline (C.3) is the most concrete operational artefact of this layer.

The three are layered, not separate. The community is what makes the standing body legitimate. The standing body is what makes the governance layer durable. Removing any layer collapses the others.

## What the Council is not

Five things, each named because the literature names a corresponding failure mode.

**Not a belt.** The four belts (White, Yellow, Green, Black) describe a learnable progression. A reader walks them, claims them, and crosses into the next. Each belt has quests, evidence, and a badge. The Council is structurally different. People do not earn their way in; they are invited when peers and engineering leadership recognise that they are already operating at the level.

The literature is unanimous on this point. Reilly is most explicit: senior-IC communities are joined, not earned. The mechanics that follow from this framing are different from the belt mechanics. There is no quest. There is no boss fight. There is no badge ceremony in the same shape. The membership process (C.2) is closer to a peer recognition than a certification. Chapters that follow lean into the difference rather than papering over it.

**Not a management layer.** The most-cited failure mode in the literature is the senior-IC community that becomes a *shadow management layer*. Engineering managers begin routing decisions through the Council to avoid responsibility. The Council begins owning decisions that belong to teams. Both moves degrade the org.

Reilly is direct about this in *The Staff Engineer's Path*, Chapter 9. Larson echoes it across his interviews. Hogan covers it from the management side. The line is sharp: the Council *advises*, *sponsors*, *mentors*, and *represents*. It does not own headcount. It does not own a budget. It does not set policy that engineering managers must follow.

When this line is crossed, the Council narrows (good engineers stop wanting to join a body that is just doing management work badly), the engineering managers atrophy (they outsource judgment that should be theirs), and the teams resent both. The chapters that follow remind the reader of the line wherever it could plausibly be crossed.

**Not a closed circle.** The Council adds members as the program grows and as senior engineers reach the level. It also reviews membership annually as part of the charter revision (C.2). The annual review is what prevents the *retirement home* failure mode Larson names in his Slack interview: senior engineers who stop doing technical work but stay in the Council because the title persists.

The membership pattern that the literature recommends, and that this program adopts, is invitation by current members ratified by engineering leadership. The two-step is deliberate. Pure peer-acclamation produces echo chambers. Pure leadership-appointment produces political bodies. Both layers together produce membership that is technically credible and broadly representative.

**Not a credential.** A reader who has earned Black Belt and is now reading this chapter is not yet a Council member. Reading these chapters is welcome and useful, but it does not constitute a claim of membership. The membership process (C.2) is explicit about how invitations happen.

The reason for this framing is honesty. A credentialed Council would invite hopeful claims that the Council then has to evaluate. An invitation-based Council waits until peers and leadership recognise the patterns of work. The latter is more accurate at the senior level because the work is harder to evaluate from a distance.

**Not a substitute for the API Council.** The program already has an API Council that reviews API designs against the official API Design Guide (referenced in B.15). The Staff+ Council and the API Council are distinct bodies. Where context is ambiguous, we use *the Staff+ Council* or *the senior-IC Council* for the body these chapters describe, and *the API Council* for the API review body.

A senior contributor may sit on both. The bodies meet on different cadences and review different artefacts. The chapters that follow use *the Council* in context and disambiguate where needed.

## Why senior-IC communities exist at all

The reader who has earned Black Belt may reasonably ask: why is this layer needed? The belts already produce engineers who can build platform leverage and contribute across layers. Why a body above them?

Three reasons, drawn from the literature and observable in mature engineering orgs.

**Cross-team alignment that no single team can produce.** Architecture decisions that affect multiple teams need a body that owns the conversation rather than letting it happen by Slack-thread accident. Without this body, teams diverge on platform choices, agent design, and tooling. The cost of divergence shows up as duplicated effort, broken integrations, and engineers who burn out negotiating cross-team work without authority.

**Succession.** The next cohort of senior engineers does not appear by accident. Senior contributors notice the engineers who are operating at the level, mentor them through the harder work, and recommend them for invitation when they are ready. Larson's interviews are clear that without this active succession, senior-IC pipelines starve and the existing senior engineers burn out.

**A coherent technical voice for engineering leadership to consult.** Executives need a senior technical view to make platform decisions. Without a Council, that view is whichever senior engineer is in the room at the time, which is unreliable. With a Council, the view is a synthesised one that the senior-IC community has converged on. Reilly weights this benefit most heavily; Larson is more cautious about how often it actually happens. Both are right in different organisational shapes.

In an AI program specifically, these three reasons sharpen. Model generations cycle in months, regulatory frames in years, and platform decisions in multi-year horizons. The cost of cross-team divergence is high because every team is making AI choices simultaneously. The cost of weak succession is high because senior AI-shaped expertise is scarce. The cost of incoherent technical voice for leadership is high because executive AI decisions cascade across the program quickly.

## How this differs from the belts

The belts and the Council differ in five concrete ways. Reading the chapters that follow makes more sense if these are clear up front.

| | Belts | Council |
|---|---|---|
| Earned how | Quests, boss fights, evidence | Invitation by peers, ratified by leadership |
| Time horizon | Multi-week to multi-month per belt | Multi-year |
| Output shape | Individual artefacts (PRs, plugins, case studies) | Decisions, RFCs, mentoring, representation |
| Reviewer pool | Out-of-team reviewer per Appendix L | Peer Council members and engineering leadership |
| Closure | Badge claim, recognition, next belt | No closure; membership is ongoing |

The belts converge on a single deliverable per claim. The Council converges on patterns of work that compound. The two are different curriculum shapes; the Council does not improve by being made more belt-shaped, and the belts do not improve by being made more Council-shaped.

## Common misreadings

Three patterns of misreading the Council that show up in practice.

**Treating it as a fifth belt.** A Black Belt who has just claimed the badge sometimes assumes the Council is the next promotion to chase. This produces hopeful claims and disappointment. The fix is the framing in this chapter: the Council is joined when one is operating at the level, not earned by additional curriculum work. The signal that one is operating at the level shows up in the Black Belt badge chapter's "what comes next" list: sponsoring RFCs, reviewing peers' boss fights, mentoring Black Belt candidates, contributing chapters to this playbook, representing the program externally.

**Treating it as a management body.** A Council member who is also a manager sometimes blurs the line in their own contributions, forgetting that their Council role is advisory rather than directive. The fix is the explicit non-management framing repeated across the chapters and the charter: the Council does not own headcount, budget, or directive policy.

**Treating it as a closed elite.** External readers and junior engineers sometimes read the Council as a small group of senior engineers gatekeeping the program. The fix is the published membership process (C.2), the published charter, and the open RFC archive (C.3). The Council's work is visible. Its failure modes (echo chamber, capture by a single domain) are openly named. Its annual review of membership is documented. A community that operates this transparently is structurally hard to read as a closed elite.

## What you can say after this chapter

> "I know what the Staff+ Council is and what it is not. It is a standing community of senior contributors who shape the program's AI direction over multi-year horizons. It is not a belt, not a management layer, not a closed circle, and not a credential. The chapters that follow describe the practice; this chapter describes the framing."

## Where to go next

C.2 covers the structure of the Council in detail: the charter, the cadence of meetings, the membership process, the relationship to engineering leadership, and the layered membership pattern (a wide channel, a working forum, a smaller decision-shaping group). It also references the [charter template](charter.md) extensively.

**Previous:** [← Council README](README.md) · **Next:** [→ C.2 Structure](C02-structure.md)

**Further reading**

- Will Larson, *Staff Engineer: Leadership Beyond the Management Track* (2021). The introduction and the chapter on senior-IC communities.
- Tanya Reilly, *The Staff Engineer's Path* (O'Reilly, 2022). Chapter 9, "You Are Part of Something Bigger".
- Lara Hogan, *Resilient Management* (A Book Apart, 2019). On the manager-versus-mentor distinction that the Council relies on.
- [staffeng.com](https://staffeng.com) — Larson's interview archive.
