---
title: "Case-study archive"
slug: "case-studies"
section: "case-studies"
status: "drafted"
type: "readme"
track: null
order: 0
time_minutes: 5
audience: "everyone"
outcome: "Find past Boss Fight B-B case studies and contribute new ones when a Black Belt boss fight ships."
prev: null
next: null
pillar: null
belt: null
tags: ["case-studies", "boss-fight-bb"]
updated: "2026-05-08"
---

# Case-study archive

> **What this is.** The archive of Boss Fight B-B case studies. Each case study is a one-page artefact a Black Belt contributes after shipping their POD-AI-uplift boss fight (see [Boss Fight B-B](../belts/04-black/c-org/boss-fight-BB-pod-ai-uplift.md)). The archive doubles as a teaching corpus for future Black Belt candidates considering their own embed.

The archive is scaffolded but empty. The first case study lands when the first Black Belt candidate claims Boss Fight B-B in production.

## How a case study lands here

When a Black Belt candidate completes Boss Fight B-B per [the boss-fight chapter](../belts/04-black/c-org/boss-fight-BB-pod-ai-uplift.md), the case study is contributed back to this archive as part of the claim. The flow:

1. The candidate writes the one-page case study using the structure named in the boss-fight chapter. Sections: Problem, Intervention, Result, What would not have worked, What the next embed should know, Sign-offs.
2. The candidate opens a PR adding `case-studies/<YYYY-MM-DD>-<short-name>.md` with the case study content.
3. The cohort lead reviews; the out-of-team reviewer and the Black-Belt-or-above reviewer (per Appendix L) sign the PR.
4. The case study merges and is listed in the index below.

## Anonymisation discipline

Case studies follow the same content rules as the rest of the playbook plus a stricter privacy layer because they describe live POD work:

- No personal names. Use role-language (POD lead, embedding builder, etc.).
- POD identifiers anonymised where the work is sensitive (compliance-shaped, performance-shaped, internal politics).
- No regulator-protected data anywhere (real customer details, real PAN, real secrets).
- Specific metric numbers are fine when the POD lead has approved them for sharing; redact when not.

A case study that fails the anonymisation check is reviewed before merging.

## Naming convention

Files are named `<YYYY-MM-DD>-<short-name>.md` where:

- `<YYYY-MM-DD>` is the date the boss fight closed.
- `<short-name>` is a two-to-four-word kebab-case identifier (e.g., `weekly-status-uplift`, `cart-conversion-pilot`). Names describe the work, not the team.

Examples:
- `2026-09-15-weekly-status-uplift.md`
- `2026-11-22-cart-conversion-pilot.md`

## Index

| Date claimed | Title | Builder | POD identifier | Metric lift |
|---|---|---|---|---|

(The archive is empty. First entry lands with the first Boss Fight B-B claim.)

## Why the archive exists

Three reasons, drawn from the Council literature in C.3 and C.6:

1. **Teaching corpus.** Future Black Belt candidates considering their own embed read past case studies to understand the pattern. The archive compounds across cohorts.

2. **Pattern surfacing.** Across many case studies, patterns emerge: what kinds of POD interventions work, what kinds plateau, what kinds of metrics are reliable. The Council's annual long-arc review (per C.6) reads the archive for these patterns.

3. **Accountability.** A claimed boss fight without a contributed case study is unreviewable. The archive is the record.

## Maintenance

The archive is maintained by the cohort lead. New case studies are reviewed at the monthly cohort sync. The annual Council charter revision reviews the archive end-to-end and surfaces patterns.

If the archive grows past forty case studies (a year or two of cohort activity), the Council may decide to add a curated "essential reading" subset that points to the most foundational case studies for new candidates.

---

**Related:**

- [Boss Fight B-B — Own a POD's AI uplift for a month](../belts/04-black/c-org/boss-fight-BB-pod-ai-uplift.md). The boss fight this archive carries the artefacts for.
- [C.6 — The multi-year horizon](../belts/05-council/C06-multi-year-horizon.md). The Council chapter that reads the archive for long-arc patterns.
- [Appendix L — Certification](../appendices/L-certification/README.md). The reviewer protocol that gates a boss-fight claim and confirms the case study.
