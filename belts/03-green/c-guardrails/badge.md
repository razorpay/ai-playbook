---
title: "Green Belt badge template"
slug: "belts/green/badge"
section: "belts"
status: "drafted"
type: "badge"
track: "green"
order: 100
time_minutes: 12
audience: "experienced-builder"
outcome: "Provide the builder-facing template for claiming Green Belt with cross-belt synthesis evidence and reviewer attestation."
prev: "belts/green/boss-fight"
next: "belts/black"
pillar: null
belt: "green"
tags: ["green-belt", "badge", "certification", "template"]
updated: "2026-04-29"
---

# Green Belt badge template

> **Use this after Boss Fight G-B's product PR is merged or under named review.** The badge is not a reading chapter. It is the builder-facing evidence packet for certification.

Copy the template into the program tracker or the approved evidence location.

---

## Builder identity

```markdown
Builder handle:
Team:
Role:
Belt claimed: Green
Date claimed:
White Belt awarded date:
Yellow Belt awarded date:
Yellow Belt tracker row:
```

---

## Evidence chain

```markdown
Quest G-1 - Author a team skill
Skill repo and path:
Skill name:
Teammate handle who invoked:
Invocation log link:
Reviewer:
Review date:

Quest G-2 - The Greenfield cross-over
Greenfield repo:
PR URL:
Merge link or active-review link:
Reviewer (out-of-team per Appendix L):
Part A techniques used:
Part B practices used:
Reflection link:

Boss Fight G-B - The double-ship
Product-repo PR URL:
Product-repo merge link:
Greenfield PR URL (Quest G-2 reference):
Reviewer for product PR (out-of-team):
Sub-requirement evidence:
  (a) Scoped CLAUDE.md:
  (b) Playwright test path:
  (c) pre-ship-check log link (all 6 layers GREEN):
  (d) PR-guardrail invoked:
  (e) Prompt-craft sign-off comment link:
Cross-belt retro link:
```

---

## Green reflection — cross-belt synthesis

Write 5–7 sentences:

```markdown
Part A craft that compounded most:
Part B practice that compounded most:
Part C guardrail that caught the most:
The moment the cross-over paid off:
One thing I would do differently next time:
```

This is the field that makes Green distinct. White asked for proof; Yellow asked for prompt / context / harness reflection; Green asks for **cross-belt synthesis**: naming which Part A craft compounded with which Part B practice, what the Part C guardrails caught, and where the cross-over paid off in a way no single Part could have produced.

---

## Reviewer attestation

```markdown
Reviewer handle:
Reviewer role:
Review date:

I confirm that the evidence above satisfies Green Belt:
- Yellow Belt evidence exists;
- Quest G-1 produced a team-adopted skill with at least one teammate invocation;
- Quest G-2 produced a merged greenfield PR with cross-Parts technique evidence;
- Boss Fight G-B's product-repo PR satisfies all five sub-requirements
  (scoped CLAUDE.md, Playwright test, clean pre-ship-check, PR-guardrail
  used, prompt-craft teammate sign-off);
- the cross-belt retro shows synthesis, not just compliance;
- at least one piece of evidence was reviewed by a builder outside the
  candidate's immediate team (Appendix L sample-size rule);
- no evidence includes sensitive material.
```

---

## Recertification

```markdown
Date awarded:
Recertification due:
Refresh note:
```

Set recertification due to one year from the awarded date. See [Appendix L - Certification](../../../appendices/L-certification/README.md) for the program rule.

---

## Next-belt hint

```markdown
Recommended Black Belt start:
Why:
```

Black Belt Part A is drafted in v0.13. Most Green Belt graduates should start Black Belt with [B.1 — Authoring an internal MCP server](../../04-black/a-platform/B01-internal-mcp-server.md) (the platform-builder voice anchor) and walk Part A through to Quest B-1 (publish an internal plugin). Parts B and C land in v0.14 / v0.15; the badge that closes Black Belt ships with Part C.

---

## Certification checklist

- [ ] Yellow Belt tracker row exists and is awarded.
- [ ] Quest G-1 evidence is complete (skill exists, teammate invoked).
- [ ] Quest G-2 evidence is complete (merged greenfield PR, cross-Parts technique list, reflection).
- [ ] Boss Fight G-B product-repo PR is merged or under named review.
- [ ] All five Boss Fight sub-requirements have evidence:
  - [ ] (a) Scoped CLAUDE.md.
  - [ ] (b) Playwright test asserts a behaviour, not just a snapshot.
  - [ ] (c) pre-ship-check pass with all six layers GREEN.
  - [ ] (d) PR-guardrail invoked and named.
  - [ ] (e) Prompt-craft sign-off comment from an out-of-team reviewer.
- [ ] Cross-belt retro exists and shows synthesis.
- [ ] At least one out-of-team reviewer per Appendix L sample-size rule.
- [ ] Reviewer attestation exists.
- [ ] Recertification due date is set.
- [ ] No sensitive details are present in the badge packet.

When all twelve are checked, the Green Belt claim is ready for the tracker.

---

**Previous:** [← Boss Fight G-B](boss-fight-GB-double-ship.md) - **Next:** Black Belt when that section lands
