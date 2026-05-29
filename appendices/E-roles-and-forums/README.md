---
title: "Appendix E: Roles & Forums"
slug: "appendices/roles-and-forums"
section: "appendices"
status: "drafted skeleton"
type: "readme"
track: "roles-and-forums"
order: 0
time_minutes: 8
audience: "everyone"
outcome: "Find the role that owns a given topic, the forum where the role's work happens, and the cadence at which the forum meets."
prev: null
next: null
pillar: null
belt: null
tags: ["appendix", "roles", "forums", "skeleton"]
updated: "2026-05-08"
---

# Appendix E: Roles & Forums

> **Status: drafted skeleton.** The role-to-area mapping, the forum cadence, and the escalation paths are committed. Specific role-to-team and role-to-person assignments live in the program's tracker (people change; roles do not), not in the playbook. The skeleton densifies as new roles emerge or cadences shift.

## What this appendix is

The role-level reference for who owns what across the program. The playbook uses role names throughout (cohort lead, security review owner, platform team, design system leads, etc.); this appendix is where the roles are defined and where the forums those roles operate in are catalogued.

The discipline:

- **No personal names.** People change roles; roles persist. Personal names live in the program's tracker.
- **No specific channel handles.** Channel handles change as the program scales; this appendix names the forum's *purpose* and points at [Appendix F](../F-slack-channels/README.md) for the channel directory.
- **Cadence and authority are explicit.** A reader should be able to tell at a glance how often a forum meets and what kinds of decisions it makes.

## The role-to-area mapping

The current set of named roles, the area each owns, and the forums where the role operates.

| Role | Area | Primary forum | Cadence |
|---|---|---|---|
| Program lead | Overall program direction; cohort scheduling; sponsor liaison | Program flagship channel | Continuous async; weekly office hours |
| Sponsor | Executive backing for the program | Program flagship channel; quarterly sponsor sync | Quarterly |
| Cohort lead | Belt cohort scheduling, evidence review, escalation | Cohort channel per cohort | Cohort cadence (typically biweekly cohort sync) |
| Design transformation lead | Design-track curriculum and tooling | Design-system channel | Continuous async; monthly design transformation sync |
| Compass plugin owner | Plugin distribution, version management, hook policies | Plugin maintenance channel | Continuous async |
| Enablement Stack co-authors | The 9-layer enablement stack model and its evolution | Cross-functional sync | Quarterly review |
| Blade design-system leads | Blade component contributions, design system evolution | Design-system channel; Blade contribution PRs | Continuous async |
| Cross-POD signal forum facilitators | Cross-team patterns, embed coordination, office hours rotation | Cross-POD signal forum | Monthly rotation |
| Builder Day operations | Builder Day scheduling, logistics, validation gates | Program flagship channel; Builder Day prep channel | Per-event |
| Claude Enterprise access owner | Provisioning Claude Enterprise seats, audit, admin controls | Access management channel | Continuous async |
| LiteLLM gateway / model billing | LiteLLM gateway owner | Infrastructure channel | Continuous async; monthly cost review |
| Slash engineering lead | Slash internal AI copilot evolution | Slash engineering channel | Continuous async |
| Blade connector team | Blade MCP connector maintenance | Design-system channel | Continuous async |
| Figma connector team | Figma MCP connector maintenance | Design-system channel | Continuous async |
| Security review owner | Security review intake, threat modelling, plugin security review | Security review escalation channel | Continuous async; weekly review session |
| Council chair (rotating) | Annual charter revision, monthly Council session, leadership liaison | Council working forum | Monthly Council session; annual charter revision; quarterly leadership liaison |
| Council leadership liaison (rotating) | Quarterly interface with engineering leadership on technical direction | Quarterly leadership liaison | Quarterly |

The "primary forum" column points at the kind of channel; the actual channel handles are catalogued in [Appendix F](../F-slack-channels/README.md).

## The standing forums

The forums that recur on a cadence, with their purpose.

### The program flagship forum

The primary asynchronous channel for the program. Onboarding announcements, cross-cohort updates, escalation routing, celebrations. Most builders operate here as their primary playbook-related surface.

- **Cadence:** continuous async.
- **Owners:** program lead.
- **Decisions made here:** scheduling and announcements; not technical decisions.

### The Council monthly session

The Staff+ Council's primary decision-making meeting. RFC sponsorship, membership invitations, Council-shaped questions raised by the working forum.

- **Cadence:** monthly, 60 minutes, with mandatory pre-reads.
- **Owners:** the rotating Council chair.
- **Decisions made here:** RFC commits, Council membership invitations.
- **See:** [C.2 — Structure](../../belts/05-council/C02-structure.md).

### The Council working forum

The Layer 2 senior-IC forum. Active members reviewing RFCs in flight, surfacing cross-team alignment topics.

- **Cadence:** biweekly, 60-90 minutes.
- **Owners:** the rotating Council chair.
- **Decisions made here:** items surfaced to the monthly Council session; not direct decisions.

### The quarterly leadership liaison

The Council's structured interface with engineering leadership.

- **Cadence:** quarterly, 30-45 minutes.
- **Participants:** the rotating Council liaison; the CTO or VP-Eng.
- **Decisions made here:** technical-direction views surfaced to leadership; not directive.

### The annual charter revision

The Council's full review of the past year.

- **Cadence:** annual, half-day session.
- **Owners:** the year's outgoing chair.
- **Decisions made here:** charter version bump, membership review, the year's reading list.

### Cohort sync

The cohort lead's recurring meeting with cohort members.

- **Cadence:** typically biweekly, varies by cohort.
- **Owners:** cohort lead.
- **Decisions made here:** evidence review, escalation, cohort-level scheduling.

### Office hours

The propagation forum at multiple levels of the program. Black Belts run office hours per [B.12](../../belts/04-black/c-org/B12-running-office-hours.md). Council members run them per [C.2](../../belts/05-council/C02-structure.md).

- **Cadence:** weekly per host; rotating.
- **Owners:** the host.
- **Decisions made here:** in-flight blocker resolutions; not policy decisions.

### API Council review

The existing API Council that reviews API designs against the API Design Guide. The AI-specific lens is covered in [B.15](../../belts/04-black/c-org/B15-api-council-contributions.md).

- **Cadence:** continuous async with periodic synchronous sessions.
- **Owners:** API Council leads.
- **Decisions made here:** API design verdicts (Red/Amber/Green) on submissions.

### Builder Day

The program-wide hands-on event.

- **Cadence:** quarterly or as scheduled.
- **Owners:** program lead and Builder Day operations.
- **Decisions made here:** programmatic; the event itself is the surface.

## Escalation paths

When something is broken, where does the escalation go.

| Symptom | First contact | If unresolved |
|---|---|---|
| Setup or environment broken | Program flagship channel | Cohort lead |
| Plugin install or update broken | Plugin maintenance channel | Compass plugin owner |
| Skill failing in production | The skill's owner team channel | Plugin maintenance channel |
| MCP connector failing | The connector's owner team | Plugin maintenance channel |
| Security concern (regulator-protected data) | Security review escalation channel directly | Security review owner |
| LLM gateway failing | Infrastructure channel | Vertex billing owner |
| Cohort scheduling or evidence question | Cohort lead | Program lead |
| Cross-team disagreement | Embedded sprint or office hours | Council working forum |
| Architectural question that affects multiple teams | RFC pipeline | Council monthly session |

## Why this appendix is a skeleton at first publish

The role-to-area mapping is committed; the standing forum list is committed; the escalation paths are committed. What remains soft:

- The specific channel handles per forum (catalogued in [Appendix F](../F-slack-channels/README.md) and likely to evolve as the program scales).
- The role-to-person assignments (live in the program's tracker; people change).
- The exact cadence numbers in some cases (e.g., cohort cadence varies by cohort lead's preference).

The skeleton is honest about what is stable and what evolves. As the program runs, the skeleton densifies through Appendix F (channels) and the program's tracker (people).

## Cross-references

- [Appendix F — Slack Channels](../F-slack-channels/README.md), the channel directory referenced throughout this appendix.
- [Appendix L — Certification](../L-certification/README.md), where reviewer roles for belt claims are defined.
- [C.2 — Council structure](../../belts/05-council/C02-structure.md), where the Council roles are defined in depth.
- [B.16 — Plugin and skill governance](../../belts/04-black/c-org/B16-plugin-and-skill-governance.md), where plugin lifecycle roles are defined.

---

*This appendix ships as a drafted skeleton. The role-to-area mapping and the forum cadence are stable; specific channel handles and role-to-person assignments live in the program's tracker. Expected revision cadence: with each annual Council charter revision, plus on-demand when new roles emerge.*
