---
title: "Structure: charter, cadence, membership"
slug: "council/structure"
section: "council"
status: "drafted"
type: "chapter"
track: "council"
order: 2
time_minutes: 35
audience: "staff-plus"
outcome: "Understand how the Council is composed, how it meets, how it interfaces with engineering leadership, how membership decisions are made, and how the charter is revised."
prev: "council/what-this-is"
next: "council/rfc-pipeline"
pillar: null
belt: null
tags: ["council", "charter", "membership"]
updated: "2026-05-08"
---

# C.2 — Structure: charter, cadence, membership

C.1 settled what the Council is and is not. This chapter covers the operational structure: who is in, when they meet, what happens at the meetings, how decisions reach engineering leadership, and how the membership and the charter both stay healthy across the years. The structure is drawn from Reilly's *The Staff Engineer's Path*, Chapter 9, Larson's interviews across multiple companies, and Hogan's writing on charters as living documents.

The structure has three layers, four named meetings, an explicit relationship to engineering leadership, and a charter that the Council ratifies at start and revises annually. Each part is described in its own section.

## If you're short on time

The Council is layered. A wide channel covers the full Staff+ population. A smaller working forum covers active members. A still smaller decision-shaping group is the body that signs RFCs and runs the meetings. Membership is by peer invitation ratified by engineering leadership, with annual review. The charter (a separate referenceable artefact) names the cadence, the authority, and the process; the Council itself revises it once a year.

## The three-layer structure

The literature's strongest pattern. Larson cites it across his interviews. The three layers serve different purposes and operate at different cadences.

**Layer 1: the wide Staff+ channel.** Open to everyone in the organisation at the senior-IC level (Staff and above). Functions as a peer-support and visibility surface. Conversations happen async; no obligations on members. Larson's interviews are unanimous that this layer is valuable even when it does no decision-making, because it is where the next cohort first encounters the senior-IC voice.

**Layer 2: the working forum.** A subset of the wide channel, populated by members who actively contribute to RFC review, mentoring, and cross-team alignment work. Meets on a cadence (biweekly is the common cadence in the literature; weekly works for smaller orgs). Pre-reads are expected. Discussion is structured.

**Layer 3: the Council proper.** The smaller decision-shaping body that this section of the playbook describes. A subset of Layer 2 who have accepted the membership invitation. Sets the agenda. Sponsors RFCs. Liaises with engineering leadership.

In a small program, Layers 2 and 3 may be the same group. As the program grows past roughly twenty senior engineers, the layers separate. The chapters use *the Council* to mean Layer 3 unless context indicates otherwise.

```
   ┌────────────────────────────────────────────────────┐
   │     LAYER 1 — Wide Staff+ channel                   │
   │     Open to all Staff+ engineers. Async. No agenda. │
   │                                                      │
   │      ┌──────────────────────────────────────────┐   │
   │      │  LAYER 2 — Working forum                  │   │
   │      │  Active members. Biweekly. Pre-reads.    │   │
   │      │                                           │   │
   │      │     ┌──────────────────────────────┐     │   │
   │      │     │  LAYER 3 — Council            │     │   │
   │      │     │  Invited members. Decisions, │     │   │
   │      │     │  RFC sponsorship, leadership │     │   │
   │      │     │  liaison.                     │     │   │
   │      │     └──────────────────────────────┘     │   │
   │      └──────────────────────────────────────────┘   │
   └────────────────────────────────────────────────────┘
```

A reader who has just earned Black Belt is welcome in Layer 1 immediately. Movement to Layer 2 is by self-selection (the forum is open to engineers who want to contribute the time). Movement to Layer 3 is by invitation.

## The charter

The Council operates from a written charter that the community itself ratifies. The [charter template](charter.md) sits alongside this chapter as a referenceable artefact. The charter names:

- **Purpose.** Why the Council exists and what it produces.
- **Membership.** Who is in, how members join, how members leave.
- **Cadence.** When the body meets, what pre-reads it expects, what decisions it makes synchronously versus asynchronously.
- **Authority.** What the Council decides, what it advises on, what it explicitly does not own.
- **Documentation.** What gets written down, where the archive lives, how decisions are appealed.
- **Review.** The annual charter revision process, including who chairs it.

Hogan's writing on charters is direct: a charter that exists but is never revisited drifts into either a social club or a shadow management layer. The annual revision is what prevents both. The charter document is short by design (under five pages in the literature's examples), which makes the annual revision tractable.

The charter is *not* an organisational chart. It does not name people. It names roles, processes, and authorities. When the Council changes membership or refines a process, the charter version increments and the previous version remains in the archive.

## Cadence

Four named meetings. Each has a specific purpose. The cadence reflects the literature's pattern at peer organisations.

**The biweekly working forum (Layer 2).** Sixty to ninety minutes. Pre-reads are expected (typically RFCs in flight, recent decisions to surface, cross-team alignment topics). The forum reviews the pre-reads, discusses where alignment is needed, and surfaces items for the Layer 3 Council. Open to all working-forum members.

**The monthly Council session (Layer 3).** Sixty minutes. The smaller body. Pre-reads are mandatory. The session decides on RFC sponsorship, membership invitations, and any Council-shaped questions that the working forum raised. Minuted; minutes archived.

**The quarterly leadership liaison.** Thirty to forty-five minutes. The Council's rotating liaison meets with the CTO or VP-Eng to surface technical direction concerns and receive context on the program's broader priorities. The liaison rotates quarterly so no single member becomes the de facto leadership channel. Outputs are minuted and shared with Layer 3.

**The annual charter revision.** A half-day session, typically in the fourth quarter. The Council reviews the past year's decisions, surfaces patterns that worked or did not, and revises the charter. Membership is reviewed at the same session: members confirm continued participation, propose new invitations, and discuss any patterns of disengagement.

These four meetings cover most of the Council's synchronous time. Asynchronous work (RFC review, mentoring, individual decision contribution) happens in between.

## Membership

The two-step pattern: invitation by current Council members, ratified by engineering leadership.

**The invitation step.** A current Council member or working-forum participant proposes a candidate. The proposal includes specific observed work: RFCs sponsored, alignment moves made, mentoring done, external representation produced. Vague proposals (the candidate is "very strong" or "obvious") are bounced back for specificity. The Council discusses at the monthly session and votes (informally; the literature uses "consensus by addressed-objections" rather than a count of yeses, drawing from IETF RFC 7282 covered in C.3).

**The ratification step.** The proposal goes to engineering leadership (CTO, VP-Eng, or equivalent) for ratification. Larson and Reilly both recommend this step as a check against the *echo chamber* failure mode. Leadership is not selecting the candidate; leadership is checking that the Council is not narrowing inappropriately. A leadership veto is rare but possible.

**The acceptance.** The candidate receives the invitation. Acceptance is voluntary and carries no titular change, no compensation change, and no reporting-line change. The candidate is a Staff+ engineer who is now also a Council member. Some candidates decline, often because the time commitment does not fit their current work, and the literature is clear that this is fine.

**Review.** Membership is reviewed annually at the charter revision session. Members confirm continued participation. Members who have not contributed substantively in the past year receive a private conversation; if the disengagement is structural (the member's role has shifted), the membership lapses gracefully. Lapsed members can rejoin if their pattern of work returns.

The annual review is what prevents the *retirement home* failure mode. Without it, membership accumulates and the average level of active contribution falls.

## The relationship to engineering leadership

The Council is not subordinate to engineering leadership. It is also not parallel to it. The relationship is consultative.

The CTO or VP-Eng consults the Council on technical direction questions: platform choices that affect multiple teams, AI strategy decisions that have multi-year horizons, agent and skill governance questions, and program-shaping decisions where a coherent senior-IC view matters. The Council provides that view through discussion and (when appropriate) a written response.

Engineering leadership ratifies Council membership invitations as the second step covered above. Leadership also approves the annual charter revisions, primarily to confirm that the charter has not drifted into territory that is properly the management chain's.

The Council does not have a budget that leadership approves. The Council does not have headcount. The Council's outputs (RFCs, charters, decisions) are technical-direction artefacts, not resourcing artefacts. When a Council decision has resourcing implications, the Council surfaces those implications and engineering leadership decides on the resourcing.

This relationship works best when both sides treat it as consultative and collaborative rather than political. The literature is honest about how often it falls into the political shape; Reilly's *Staff Engineer's Path* names the failure mode and the recovery patterns.

## The rotating leadership liaison

One Council member at a time serves as the leadership liaison. The role rotates quarterly. The liaison:

- attends the quarterly leadership liaison meeting on behalf of the Council;
- carries the Council's view into that meeting;
- reports back to the Council on context and asks from leadership;
- does not speak unilaterally for the Council on substantive technical questions.

The rotation matters. Without it, the role calcifies into a de facto Chief Engineer position, which crosses the management line. With it, multiple Council members get experience interfacing with leadership, and the role does not become identified with a single person.

The liaison role is recognised in members' performance reviews as part of the broader Council-recognition pattern (covered in C.4).

## Office hours

Each Council member holds open office hours on a stated cadence (typically monthly, sixty minutes). The literature treats office hours as a load-bearing accessibility surface for senior-IC communities; B.12 in Black Belt covers the operational pattern. For Council members specifically, office hours are how Layer 1 (the wide Staff+ channel) reaches Layer 3.

Office hours are not the only access path to Council members; informal Slack and direct messaging continue. Office hours are the structured path that does not depend on the asker already knowing the Council member personally.

## What this is not

**Not a fixed structure.** The three-layer pattern works for most programs at most sizes. Some programs may need only two layers; some may need four. The charter accommodates either. What does not work is a single-layer flat Council with no internal differentiation, because the absence of layers either means the Council is too large to make decisions or too small to represent the senior-IC population.

**Not a substitute for engineering management.** The cadence covers Council work. Engineering managers continue to run their teams, hold 1:1s, and make hiring decisions. The Council does not displace any of this.

**Not a constant time sink.** The literature is consistent on this: a Council that consumes more than ten percent of any member's time is misshapen. The biweekly working forum, the monthly Council session, the rotating liaison, and the annual revision together come out to roughly fifteen to twenty hours per quarter for an active member. RFC review and mentoring add to that, but the synchronous-meeting load alone is bounded.

**Not a stage-managed body.** The pre-read culture and the charter discipline make Council sessions productive without making them theatrical. A Council that runs perfectly choreographed sessions is usually one that has stopped surfacing real disagreement. Reilly is direct that some friction in Council sessions is a sign of health.

## Common failure modes

Drawn from the literature.

**The shadow management layer.** Repeated from C.1 because it bites hardest at the structural level. Engineering managers route decisions through the Council. The Council begins owning team-level decisions. Both the Council and the management layer degrade. Fix: the charter names what the Council does and does not own; deviations get challenged at the annual revision.

**The retirement home.** Members who have stopped doing technical work but stay in the Council because the title persists. Fix: the annual membership review surfaces this and lapses memberships gracefully.

**The echo chamber.** Recruitment by acclamation among existing members reproduces a narrow archetype. Fix: the leadership ratification step; explicit attention to representation across domains, geographies, and career shapes.

**The unminuted room.** Decisions taken in Council sessions are never written down. The rest of the org cannot tell what the Council does or appeal its decisions. Fix: minutes are mandatory and archived; the RFC archive (C.3) is the primary durable artefact.

**Capture by a single domain.** The Council is dominated by infrastructure engineers, or by application engineers, or by AI specialists. The other domains stop sending their best, and the Council ceases to represent the engineering org. Fix: the charter's representation principles; the annual review checks this explicitly.

**Liaison calcification.** The leadership liaison stops rotating. One Council member becomes the de facto Chief Engineer in leadership conversations. Fix: the quarterly rotation is binding; if the rotation is hard to staff, that itself is signal that the Council is too small or the liaison role is too heavy.

**Cadence drift.** Meetings get cancelled or postponed. The pre-read culture fades. Sessions become discussion rather than decision. Fix: the charter names the cadence; meetings happen even when the agenda is light, because a light-agenda meeting still produces a charter revision or an archive update.

## What you can say after this chapter

> "I understand how the Council is structured: three layers, four named meetings, a charter the community ratifies and revises annually, a membership process that combines peer invitation and leadership ratification, and a rotating leadership liaison. I know which failure modes the structure is designed to prevent and what the annual review is for."

## Where to go next

C.3 covers the RFC pipeline in operational detail: how proposals are submitted, the state machine they move through, how consensus is reached (drawing on IETF RFC 7282), and why the archive is the most important artefact the Council produces. The RFC pipeline is the most concrete operational expression of what this chapter described in shape.

**Previous:** [← C.1 What this is and is not](C01-what-this-is.md) · **Next:** [→ C.3 The RFC pipeline](C03-rfc-pipeline.md) · See also: [the charter template](charter.md)

**Further reading**

- Tanya Reilly, *The Staff Engineer's Path* (O'Reilly, 2022), Chapter 9.
- Will Larson, *Staff Engineer* (2021), interviews with Squarespace and Slack engineers on layered membership.
- Lara Hogan, [larahogan.me](https://larahogan.me) on charters as living documents.
- [The charter template](charter.md) — the Council's referenceable charter.
