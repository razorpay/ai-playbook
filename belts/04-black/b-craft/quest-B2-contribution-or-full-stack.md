---
title: "Quest B-2: Component contribution or full-stack feature"
slug: "belts/black/quest-contribution-or-full-stack"
section: "belts"
status: "drafted"
type: "quest"
track: "black"
order: 91
time_minutes: 480
audience: "platform-builder"
outcome: "Prove cross-layer ownership by either contributing a Blade component via the contribution pipeline or shipping a full-stack feature you own end-to-end."
prev: "belts/black/effort-and-routing"
next: "belts/black/c-org"
pillar: "harness"
belt: "black"
tags: ["black-belt", "quest", "blade-contribution", "full-stack"]
updated: "2026-05-07"
---

# 🎮 Quest B-2 — Component contribution or full-stack feature

> **Belt progress:** Part B of Black Belt
> **Time budget:** ~8 hours active, more elapsed (review cycles)
> **Prerequisite:** Green Belt awarded; Quest B-1 claimed; Part B modules read at GREEN colour
> **What you'll prove:** that you own work across layers — either across the design-system contribution pipeline (option a) or across frontend and backend (option b) — not just within your team's usual surface

---

## What this quest is

INDEX commits two acceptable shapes; pick one:

**Option (a) — Blade component contribution.** Submit a Blade component via the contribution pipeline. The contribution must merge through Blade's review process: design alignment, accessibility audit, token compliance, documentation. The merged contribution is the artefact.

**Option (b) — Full-stack feature.** Ship a feature involving a backend change. You own the PR in both layers — the backend change and the frontend change. "Backend" means a real service-side change (a new endpoint, a schema change, a meaningful service-side logic update), not just a config tweak. The merged PRs are the artefact.

Either option exercises cross-layer ownership. Black Belt is awarded when all three Parts close and both quests + boss fight are claimed; this quest is the second of the two quests.

---

## What does NOT count

- A Blade contribution that lands as an internal one-off rather than through the contribution pipeline.
- A frontend-only PR claimed as full-stack because "I touched a config file."
- A feature where someone else owns the backend PR; the quest specifically tests *your* cross-layer ownership.
- A merged contribution without an out-of-team reviewer (per Appendix L's sample-size rule for Black Belt).
- A reflection that does not name the cross-layer cost — what was harder than your usual work, what you learned about the layer you do not normally own.

---

## Option (a) — Blade component contribution

### When this is the right option

You see a Blade component the design system genuinely needs, you have a use case in your team's product surface, and you have the cycles to take it through Blade's contribution pipeline.

Common candidates:

- a primitive that does not yet exist in Blade but appears repeatedly in Figma frames across teams;
- a variant of an existing primitive that handles a new accessibility behaviour or a new state;
- a pattern composed of existing primitives, abstracted because three or more teams have implemented the same composition by hand;
- a token addition (a new spacing value, a new colour role) that the design partner has approved.

### How to do it

1. **Identify the gap.** Use G.16 (Blade deep dive) and G.17 (production-compiler) to confirm the component truly does not exist and is not better composed from existing primitives.
2. **Sketch with the design partner.** Blade's contribution pipeline expects design alignment first; an engineering-only contribution that did not check with design is usually rejected.
3. **Author the component.** Follow Blade's contributor guide: tokens, primitives, accessibility, documentation, tests. The bar is the same as any other Blade component, not "internal-quality."
4. **Submit the PR.** Through Blade's contribution pipeline; tag the appropriate reviewers.
5. **Iterate to merge.** Address review feedback. Blade's reviewers are domain experts; the iteration is part of the value.
6. **Reflect.** What was different about contributing to a design system versus shipping in your team's repo?

### Evidence

- The merged Blade PR URL.
- The accessibility-audit log (or equivalent Blade quality-gate evidence).
- A reflection naming the cross-layer cost (the design-engineering iteration, the accessibility surface, the token discipline).

---

## Option (b) — Full-stack feature

### When this is the right option

Your team owns both a frontend and a backend service, and you have a feature in flight that genuinely needs changes in both. The point is not "any feature with two PRs" — it is *a feature where the cross-layer ownership matters*.

Common candidates:

- adding a new endpoint and the UI that consumes it;
- a schema change where the frontend's data shape and the backend's storage shape both move;
- a new background job and the UI that surfaces its results;
- a behaviour change that requires coordinated rollout across both layers.

### How to do it

1. **Scope.** With your team's backend lead, agree on the change's boundaries. The feature must require changes in both layers; not a frontend feature that "happens to log a metric."
2. **Sequence.** Backend first or frontend first? Usually backend first: ship the endpoint, verify it, then build the UI against it. Sometimes coordinated; rarely frontend-first.
3. **Build.** Apply Part A and Part B craft as appropriate. Pre-ship-check on both PRs (per G.26). Playwright test on the UI side (per G.12). Cost attribution if any agent is in the loop (per B.10).
4. **Review.** An out-of-team reviewer per Appendix L; given the cross-layer surface, ideally one reviewer per layer and a coordinator.
5. **Ship.** Both PRs merge; the feature works end-to-end.
6. **Reflect.** What was harder about the layer you do not normally own?

### Evidence

- The merged backend PR URL.
- The merged frontend PR URL.
- Both PRs' pre-ship-check logs (green).
- The Playwright test path on the frontend PR.
- A reflection naming the cross-layer cost (the protocol decisions, the schema-evolution thinking, the deploy ordering).

---

## Reviewer routing

Per [Appendix L](../../../appendices/L-certification/README.md). For Black Belt, every piece of evidence has at least one out-of-team reviewer.

For option (a): Blade reviewers are typically out-of-team by definition. Confirm the reviewer is recorded in the tracker.

For option (b): the cross-layer review usually involves at least one out-of-team reviewer for one of the two PRs. The cohort lead chases if the backend reviewer happens to be in the candidate's immediate team.

---

## Common pitfalls

**Stretching the option (b) bar.** "I touched a config file" is not a backend change. The reviewer will read the diff and decide. Fix: pick a feature where the cross-layer ownership is genuine.

**Skipping the design partnership on option (a).** An engineering-only Blade contribution is usually rejected. Fix: the design partnership is part of the contribution; book the conversation early.

**Treating the reflection as filler.** The reflection is what the cohort lead reads; it shows whether the candidate understood why this quest was Black-Belt-shaped. Fix: 30 minutes; name the cross-layer cost specifically.

**Picking the option that is convenient rather than the option that is right.** A team that has done lots of frontend-only work might find option (b) easier than option (a); that does not mean it is the right test of cross-layer ownership for that candidate. Fix: pick the option that exercises the layer the candidate has *not* already mastered.

**Same-team reviewer for both PRs.** Convenient; not Appendix-L-compliant for Black Belt. Fix: out-of-team reviewer for at least one PR.

---

## Evidence template

Copy into your tracker or `LEARNER.md`:

```markdown
## Quest B-2 — Component contribution or full-stack feature

- Builder: <handle>
- Date claimed: <YYYY-MM-DD>
- Option chosen: (a) Blade contribution / (b) full-stack feature
- (Option a) Blade PR URL: <link>
- (Option a) Accessibility-audit log: <link>
- (Option b) Backend PR URL: <link>
- (Option b) Frontend PR URL: <link>
- (Option b) Pre-ship-check logs: <link>
- (Option b) Playwright test path: <path>
- Reviewer (out-of-team per Appendix L): <handle>
- Reflection on cross-layer cost: <one-paragraph or link>
```

---

## What you can say after this quest

> "I have shipped cross-layer work (either a merged Blade contribution or a full-stack feature I owned end-to-end) and I can name what was harder about the layer I do not normally own."

---

**Previous:** [← B.11 Effort + routing](B11-effort-and-routing.md) · **Next:** [→ Part C — Shape the Org](../c-org/README.md)

**Further reading**

- [Blade contribution guide](https://blade.razorpay.com/) — the public contribution pipeline
- [G.16 — Blade deep dive](../../03-green/b-practices/G16-blade-deep-dive.md)
- [Quest B-1](../a-platform/quest-B1-publish-an-internal-plugin.md)
- [Appendix L — Certification](../../../appendices/L-certification/README.md)
