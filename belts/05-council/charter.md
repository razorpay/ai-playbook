---
title: "Council charter (template)"
slug: "council/charter"
section: "council"
status: "drafted"
type: "artefact"
track: "council"
order: 99
time_minutes: 15
audience: "staff-plus"
outcome: "A referenceable charter template the Council ratifies and revises annually. Sits outside the linear reading order; C.2 references it in detail."
prev: null
next: null
pillar: null
belt: null
tags: ["council", "charter", "artefact"]
updated: "2026-05-08"
---

# Staff+ Council — Charter (template)

> **What this is.** A template the Council ratifies as its founding document and revises at each annual revision session. The template is shipped in the playbook; the *current ratified charter* is a separate, signed artefact the Council maintains. When the playbook says "see the charter", it means whichever version is currently ratified.
>
> **How to use this.** A program that is forming a Council reads the chapters (C.1 through C.6), then takes this template into its first ratification session. The first ratification produces a populated charter. Subsequent annual revisions modify the populated charter rather than restarting from this template.
>
> **Versioning.** Each ratified charter version increments. Earlier versions are archived and remain readable. The current version names which prior versions it supersedes.

---

## 1. Purpose

The Staff+ Council is the standing community of senior contributors who shape the program's AI direction over multi-year horizons. The Council exists to:

- align senior contributors across organisational boundaries on technical direction,
- sponsor and review RFCs that affect the program's shared AI surface,
- mentor Black Belt candidates and sponsor under-recognised engineers,
- represent the program externally through writing, speaking, and OSS contributions,
- shape the program's posture across model generations, regulatory shifts, and community changes that no quarterly artefact captures.

The Council does not own headcount, budget, or directive policy. It advises, sponsors, mentors, and represents.

---

## 2. Membership

### 2.1 Layers

The senior-IC community is structured in three layers:

- **Layer 1 — the wide Staff+ channel.** Open to all engineers at Staff and above. Async, no obligations. Visibility surface for the senior-IC voice.
- **Layer 2 — the working forum.** Active participants who contribute to RFC review, mentoring, and cross-team alignment. Biweekly meetings. Pre-reads expected.
- **Layer 3 — the Council proper.** Invited members who set the agenda, sponsor RFCs, and serve as leadership liaisons. The "Council" in this charter refers to Layer 3 unless otherwise specified.

Movement from Layer 1 to Layer 2 is by self-selection. Movement from Layer 2 to Layer 3 is by invitation per the process below.

### 2.2 How members join

The two-step pattern: invitation by current members, ratified by engineering leadership.

- **Invitation step.** A current Council member or working-forum participant proposes a candidate at the monthly Council session. The proposal includes specific observed work: RFCs sponsored, alignment moves made, mentoring done, external representation produced. The Council discusses and reaches consensus by addressed objections (per the RFC process described in C.3).
- **Ratification step.** Engineering leadership (CTO or VP-Eng equivalent) ratifies the invitation. Leadership is not selecting the candidate; leadership is checking that the Council is not narrowing inappropriately. A leadership veto is rare but possible.
- **Acceptance.** The candidate receives the invitation and accepts or declines. Acceptance is voluntary and carries no titular, compensation, or reporting-line change.

### 2.3 Annual review

Membership is reviewed at the annual charter revision (Section 6). Members confirm continued participation. Members who have not contributed substantively in the past year receive a private conversation; if disengagement is structural, membership lapses gracefully. Lapsed members can rejoin if their pattern of work returns.

### 2.4 Representation principles

The Council attends actively to representation across:

- engineering domains (platform, application, infrastructure, AI, design-engineering, product-engineering),
- geographies (where the program spans multiple offices or time zones),
- career shapes (engineers on different paths to senior-IC level).

The annual review explicitly checks for capture by a single domain, geography, or career shape, and surfaces patterns that need correction.

---

## 3. Cadence

The Council operates on four named meetings.

### 3.1 The biweekly working forum (Layer 2)

- Cadence: every two weeks.
- Duration: 60 to 90 minutes.
- Pre-reads: required. Typically RFCs in flight, recent decisions to surface, cross-team alignment topics.
- Output: items surfaced to the monthly Council session as needed.

### 3.2 The monthly Council session (Layer 3)

- Cadence: monthly.
- Duration: 60 minutes.
- Pre-reads: mandatory.
- Decisions: RFC sponsorship, membership invitations, Council-shaped questions raised by the working forum.
- Output: minutes archived in the decision archive.

### 3.3 The quarterly leadership liaison

- Cadence: quarterly.
- Duration: 30 to 45 minutes.
- Participants: the rotating Council liaison, plus the CTO or VP-Eng.
- Purpose: surface technical direction concerns from the Council; receive context on the program's broader priorities.
- Liaison rotation: the role rotates each quarter so no single member becomes the de facto leadership channel.
- Output: minuted; shared with Layer 3.

### 3.4 The annual charter revision

- Cadence: annual.
- Duration: half-day session.
- Activities: reviewing the past year's RFCs, reviewing the case-study archive from Boss Fight B-B claims, surfacing patterns from the office-hours archive, reviewing membership, revising this charter.
- Output: a new charter version (if revisions are made) and the year's long-arc reading list.

---

## 4. Authority

### 4.1 What the Council does

- **Sponsors and reviews RFCs.** Per the RFC pipeline described in C.3.
- **Provides technical-direction views.** When engineering leadership consults the Council on platform choices, AI strategy, or program-shaping decisions, the Council provides a synthesised view through discussion and (when appropriate) a written response.
- **Invites new members.** Per Section 2.2.
- **Mentors and sponsors.** Per the patterns described in C.4.
- **Represents the program externally.** Per C.5.
- **Shapes the multi-year frame.** Per C.6.

### 4.2 What the Council does not do

- **Does not own headcount.** Resourcing decisions remain in the management chain.
- **Does not own budget.** Budget approval is owned by engineering leadership.
- **Does not set policy that engineering managers must follow.** The Council's outputs are advisory.
- **Does not run team-level decisions.** Team-scoped decisions belong to teams; the Council does not displace them.
- **Does not manage individual performance.** Performance review is a management function.

### 4.3 The line between advisory and directive

The most-cited failure mode in the literature is the Council that becomes a shadow management layer. The line is sharp: the Council *advises*, *sponsors*, *mentors*, and *represents*. It does not *manage*. Decisions that cross the line get challenged at the next monthly session and surfaced at the annual revision.

---

## 5. Documentation

### 5.1 What gets written down

- **The RFC archive.** Every RFC, in every state, with its full discussion thread. Numbered, immutable, append-only. The archive is the program's primary durable artefact.
- **Monthly Council session minutes.** Topics discussed, decisions made, action items, attendance.
- **Quarterly leadership liaison minutes.** The Council's view going in, the leadership context coming back, action items.
- **Annual charter revision minutes.** Patterns reviewed, charter changes, membership changes, the year's reading list.
- **The Council's mentoring contributions.** Surfaced in performance review conversations and named in the annual revision.

### 5.2 Where the archive lives

The Council names the location in its first ratified charter. The archive must be:

- accessible to all engineers at Staff and above (Layer 1 and below; the broader engineering org for transparency),
- readable in the format the engineers can review (Markdown is the program's default),
- versioned so historical states are preserved.

### 5.3 How decisions are appealed

A Council decision can be appealed by:

- a substantive objection raised at the monthly session within thirty days of the decision,
- an RFC that proposes a successor decision and follows the standard RFC process,
- engineering leadership, if leadership believes the decision crosses the advisory-versus-directive line.

Appeals follow the RFC process; appealing is not a separate mechanism.

---

## 6. Annual review

### 6.1 The revision session

A half-day session, typically in the fourth quarter, chaired by a rotating member. The session covers:

- past year's RFCs (the corpus the Council produced; patterns observed),
- past year's case studies (from Boss Fight B-B claims; what propagation produced),
- past year's office-hours archive (recurring patterns; what should become docs),
- membership review (continuation, invitation candidates, lapses),
- charter revisions (sections that need updating; new sections to add),
- the year's long-arc reading list (work the Council reads together in the coming year).

### 6.2 The chair

Chairing rotates annually. The previous year's chair sponsors the incoming chair. The chair runs the session, owns the revision document, and ensures minutes are archived.

### 6.3 Charter version increments

Each revision session that produces changes increments the charter version. Earlier versions are archived. The current version names superseded versions.

### 6.4 The reading list

The Council names a small list of works (typically three to five) that members read together in the coming year. The list is published. Discussion happens at the working forum once or twice a year.

---

## Appendix A: Signatories of the current charter version

The current ratified charter version is signed by Council members at ratification. The signatures are recorded with the charter document and are not part of the playbook template.

This template version (v0) is unsigned. The first ratified version (v1) is signed by the founding cohort.

---

## Appendix B: Charter version history

| Version | Date | Chair | Material changes |
|---------|------|-------|------------------|
| v0 (template) | 2026-05-08 | — | Template shipped in playbook |
| v1 | TBD | TBD | Founding ratification |

Subsequent versions populate this table at each annual revision.

---

## Appendix C: Cross-references

- [Council README](README.md) — section overview.
- [C.1 What this is and is not](C01-what-this-is.md) — framing.
- [C.2 Structure](C02-structure.md) — operational structure that this charter codifies.
- [C.3 The RFC pipeline](C03-rfc-pipeline.md) — the decision archive and consensus model.
- [C.4 Mentoring and sponsorship](C04-mentoring-and-sponsorship.md) — the mentoring patterns the Council recommends.
- [C.5 External voice](C05-external-voice.md) — the external representation patterns.
- [C.6 The multi-year horizon](C06-multi-year-horizon.md) — the long-arc work.
- [Appendix L — Certification](../../appendices/L-certification/README.md) — the broader certification framework the Council operates within.

---

*Template version 0. Updated 2026-05-08. Awaiting first ratification.*
