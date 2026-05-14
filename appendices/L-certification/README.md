---
title: "Appendix L: Certification"
slug: "appendices/certification"
section: "appendices"
status: "drafted"
type: "readme"
track: "certification"
order: 0
time_minutes: 14
audience: "leads"
outcome: "Understand the evidence required to award belts without turning the program into self-reported training."
prev: "appendices/skills-library"
next: "appendices/reference-cards"
pillar: null
belt: null
tags: ["appendix", "certification", "belts", "program"]
updated: "2026-04-27"
---

# Appendix L — Certification

> **What this is.** The contract between the playbook and the program tracker. Belts are not reading badges; they are evidence-backed claims that a builder shipped the required work.

![The certification flow — quests, boss fight, reviewer protocol, badge](../../diagrams/certification-flow.svg)

---

## Certification rule

The rule is simple:

> A belt is awarded when the required evidence exists, not when the reader says they understood the chapter.

That evidence should be small, concrete, and reviewable. A screenshot can prove setup. A PR URL can prove shipping. A recipe can prove repeatability. A cohort lead should not need to infer progress from enthusiasm.

---

## Evidence by belt

| Belt | Claim | Minimum evidence |
|---|---|---|
| White | "I have shipped code." | GREEN setup verification, HelloRazorpay-style PR, one real typo or equivalent merged. |
| Yellow | "I build with AI daily." | Merged PR into a relevant repo, short reflection on prompt / context / harness decisions, reviewer sign-off. |
| Green | "My team moves faster." | Reusable skill or workflow adopted by a teammate, plus one shipped feature or knowledge-base contribution. |
| Black | "I multiply others." | Platform-quality contribution, cohort or team enablement evidence, adoption or quality signal. |
| Staff+ Council | "I shape the system." | RFC, Council contribution, external-quality artefact, or sustained mentorship record. |

Exact module-level evidence will live in each belt. This appendix defines the quality bar.

---

## What good evidence looks like

Two short examples make the bar concrete.

**White Belt — example of acceptable evidence.** A builder submits a GREEN setup verification record, a sandbox HelloRazorpay PR URL, and a merged typo PR in a public-facing doc. The boss-fight PR changes one word, includes a short description, and has a reviewer or merge record. The badge template links all three artefacts and sets recertification one year out. The evidence chain is small, but it is complete.

**White Belt — example of evidence that does NOT clear the bar.** A builder says setup worked, shows a local README edit, and links an open typo PR that has not merged. This is progress, not certification. The reviewer asks for the verification output, the sandbox PR link, and the merged boss-fight PR before awarding the belt.

**Yellow Belt — example of acceptable evidence.** A PM submits a working utility from Quest Y-1, a thirty-entry practice log from Quest Y-2, and a merged PR to an internal dashboard repo that fixes a misaligned chart legend. The PR description references the source ticket and includes a before/after screenshot. A short reflection sits in the cohort tracker: "Used Claude Code with the design-intel skill; spent twenty minutes on the wrong file before realising the harness was scoped to a sibling directory; reviewer caught a missing translation key, fixed in a follow-up commit." Reviewer sign-off is recorded. The evidence chain is closed.

**Yellow Belt — example of evidence that does NOT clear the bar.** A builder submits a personal-fork PR to a sandbox repo with a green CI badge but no reviewer, no ticket reference, and no reflection. The PR is real work, but it does not connect to the team's tracker, and there is no signal that the work has been seen by anyone. The belt is not awarded; the builder is asked to extend the same work into a real repo with a teammate review.

Both examples are common. The difference is not effort; it is auditability.

---

## Reviewer protocol

A belt awarded without a reviewer is a self-report. The program runs on a light, named protocol.

**Who reviews.** A reviewer must be a builder one belt above the candidate, or a program lead, or a designated reviewer rotation. Same-belt peer reviews count as practice, not certification.

**Conflict of interest.** Direct managers of the candidate cannot be the certifying reviewer for their own report. A second reviewer or the rotation handles this case. The aim is not bureaucracy; it is a clean signal when belts come up in performance conversations.

**Sample size.** For Green and above, at least one piece of evidence should be reviewed by someone outside the candidate's immediate team. The point is to catch belts that are real inside one team and meaningless outside it.

**Time-to-review.** Evidence sitting in a reviewer's queue for more than one cycle is a tracker problem, not a candidate problem. The cohort lead chases.

---

## Tracker fields

Use fields that force evidence:

| Field | Purpose |
|---|---|
| Builder | Who earned the belt. |
| Belt | Which claim is being certified. |
| Evidence links | PRs, docs, verification output, recipes, demos. |
| Reviewer | Who checked the evidence. |
| Date awarded | When the claim became true. |
| Recertification due | When this belt's evidence should be revalidated. |
| Follow-up | Any remediation or next-belt recommendation. |

Avoid fields that invite theatre: confidence score, self-rated proficiency, or "hours watched."

---

## Recertification

Belts do not expire. Skills, plugins, conventions, and connectors do.

**The rule.** Once a year, every belt holder revalidates that the evidence underlying their belt would still pass review against current tooling. For most builders, this is a fifteen-minute exercise: re-run the verification skill, confirm at least one recent PR or skill contribution that uses the current pinned plugin, log the date.

**Why this matters.** A builder who earned Green Belt against tooling that is no longer pinned can be invisibly out of date. Recertification keeps the belt's signal honest without invalidating the work that earned it.

**What changes a belt.** Nothing in normal recertification. If a belt holder cannot produce any current evidence, the program lead works with them on a small refresh task; the belt holds while the refresh happens.

---

## Calibration cadence

A program is only as fair as the moments where reviewers compare notes.

**Quarterly calibration.** Reviewers across cohorts share three pieces of evidence each (one clear pass, one clear miss, one boundary case) and discuss whether they would have ruled the same way. The output is not a new policy; it is a shared sense of where the bar sits.

**After each major event.** Builder Days, structured cohorts, and program launches each get a short retro on certification quality: who got belts that should not have, who didn't get belts they should have, what evidence patterns were missing. Lessons feed back into this appendix.

**No backdated retractions without cause.** Belts awarded under the rules at the time stand. Calibration tightens the future, not the past, unless a specific case shows a fairness problem.

---

## What the belts unlock

A belt is signal, not gate, but it does open doors:

- White and Yellow belt holders are added to the program's primary builder lists and become eligible for office-hours pairing.
- Green belt holders can review Yellow Belt evidence and contribute to the skills library with named ownership.
- Black belt holders can author program-pinned plugin contributions, mentor structured cohorts, and join Council deliberations.
- Council members shape the program at the policy level and review the appendix you are reading right now.

If a builder earns a belt and nothing happens next, the program is leaving value on the table. The tracker is not a trophy case; it is the input to the next month's cohort plan.

---

## Where to go next

- For reader routing, read [Prologue 0.10 — Self-assessment](../../prologue/10-self-assessment.md).
- For team adoption rhythm, read [Prologue 0.9 — How to lead](../../prologue/09-how-to-lead.md).
- For reusable skill evidence, read [Appendix C — Skills Library](../C-skills-library/README.md).
- For the philosophy behind the belt system, read the front matter of the [Master Index](../../INDEX.md).
