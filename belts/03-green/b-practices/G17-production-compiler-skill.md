---
title: "The production-compiler skill — AI-Studio / ChatGPT output → Blade"
slug: "belts/green/production-compiler-skill"
section: "belts"
status: "drafted"
type: "chapter"
track: "green"
order: 17
time_minutes: 30
audience: "experienced-builder"
outcome: "Recognise when AI-generated code needs to be repaired against the design system, and use the production-compiler skill (or the pattern it encodes) to bring the code back to Blade primitives."
prev: "belts/green/blade-deep-dive"
next: "belts/green/daily-loop"
pillar: "context"
belt: "green"
tags: ["green-belt", "production-compiler", "skill-pattern", "blade", "repair"]
updated: "2026-04-29"
---

# G.17 — The production-compiler skill

A reality of working with AI tools at scale: not every line of code that lands in your repo came from your Claude Code session with the design-system connector loaded. Sometimes a teammate drafted in Claude.ai. Sometimes a designer experimented in AI-Studio. Sometimes ChatGPT produced the first cut. The output looks plausible, even runs, but uses ad-hoc `<div>`s, raw colour values, and reinvented buttons — none of Blade's primitives, none of the program's tokens.

The **production-compiler skill** is the canonical Razorpay pattern for repairing this kind of code. This chapter teaches the pattern (what the skill does, what it refuses, what it produces) without duplicating the skill's internal implementation.

---

## If you're short on time

- The production-compiler skill takes AI-generated code that *works* but *does not match* the design system, and rewrites it to use Blade primitives, tokens, and variants — preserving behaviour and removing drift.
- The skill is a context-pillar tool: it loads the Blade connector, reads the input code, maps to primitives, and emits compliant code. Behaviour is preserved by construction.
- Use it on inherited AI output. Do not use it to "improve" your own clean code; that is over-fitting.

---

## When you reach for it

Three named patterns:

### Pattern 1 — A teammate drafted UI in Claude.ai or AI-Studio

You inherit a branch with a working component that ignores Blade. Maybe the teammate did not have the design-system connector loaded. Maybe they prototyped in a sandbox first. Either way, the code is real and shippable in *behaviour* and wrong in *shape*.

The production-compiler skill takes the code and rewrites it: ad-hoc components become Blade primitives; raw colours become tokens; reinvented buttons become `<Button variant='...'>`.

### Pattern 2 — A migration of legacy code

Your team has a screen built before the design-system connector existed. The screen works, but the code is full of `<div>` styled with hard-coded values. The production-compiler walks the code and migrates it.

### Pattern 3 — An experiment that you want to ship

You prototyped quickly in AI-Studio or ChatGPT to validate a design idea. The prototype works. To ship it, the production-compiler brings it to compliance.

---

## What the skill does

The skill follows the SKILL.md anatomy from G.7. At a contract level (what every builder needs to know to consume it) the shape is:

**Trigger phrases.** "Repair this AI-Studio output to Blade", "production-compile this", "run the production-compiler on this branch", "bring this code to design-system compliance".

**Bounded job.** Read input code, identify ad-hoc components and raw values, map to Blade primitives and tokens, emit compliant code. Do not change behaviour. Surface gaps where Blade does not have an equivalent.

**Inputs.** The input code (file, branch, or pasted snippet). The Blade design-system connector (loaded). The team's CLAUDE.md for token / primitive conventions.

**Outputs.** A diff or a rewritten file. A list of decisions: what was mapped, what was a gap, what was preserved as-is. A report of any behaviour that the rewrite could not safely preserve (rare, but happens).

**Hard rules.** Never change behaviour. Never invent a new Blade primitive. Never silently strip an ad-hoc component without naming what it became. Never skip the gap report.

**Output shape — a real run.**

> Production-compiler report
>
> File: `src/views/cart/EmptyState.tsx`
>
> Mapped (10):
> - `<div className="cart-empty-container">` → `<Box padding={spacing[6]}>` (4 occurrences)
> - `<button className="primary-cta">` → `<Button variant='primary' size='medium'>` (1 occurrence)
> - `color: '#0066ff'` → `colors.surface.action.primary.lowContrast` (3 occurrences)
> - `<h2>` → `<Heading level={2}>` (1 occurrence)
> - `<p className="body">` → `<Text variant='body'>` (1 occurrence)
>
> Gaps (1):
> - The custom `<illustration>` div with inline SVG: Blade has no illustration component. Following CLAUDE.md, moved the SVG to `assets/illustrations/cart-empty.svg` and used the standard `<img>` reference.
>
> Behaviour preserved: yes (verified by visual diff against the original).
>
> Suggested follow-ups:
> - File a Blade contribution for an `Illustration` primitive if your team uses this pattern more than three times.

---

## What the skill refuses

**Refuses to "improve" code that is already compliant.** If the input code already uses Blade primitives, the skill returns "no changes needed." Over-fitting clean code is how teams accumulate noise.

**Refuses to change behaviour.** If a fix would alter the rendered output (a different padding, a different click handler), the skill flags the change and stops. You decide whether to accept it.

**Refuses to invent Blade primitives.** If the input uses something Blade does not have, the skill names the gap; it does not silently extend Blade.

**Refuses to silently strip a comment or a feature flag.** Annotations stay. The diff is a refactor of *shape*, not of *intent*.

---

## How to use it

The shortest invocation:

> "Run the production-compiler on `<file or branch>`. Surface the gaps before applying the rewrite."

A common shape: review the report, accept the mappings, decide on the gaps, apply the rewrite, run your daily loop (G.18) and tests (G.12) to verify.

The full sequence in a real session:

1. Inherit the branch.
2. Run the production-compiler skill against the changed files.
3. Read the report.
4. For each gap: decide on option (a) compose from primitives, (b) contribute to Blade, or (c) accept a one-off (per G.16).
5. Apply the rewrite.
6. Run the test suite (G.12-style E2E test if available).
7. Run the daily loop (G.18) to verify visually.
8. Commit.

Total time: typically 20–40 minutes per file, depending on the depth of the drift. Far less than re-writing from scratch; far more reliable than "polishing" by hand.

---

## What the skill is not

**Not a code formatter.** Prettier and ESLint do that. The production-compiler operates on shape, not whitespace.

**Not a Blade contribution generator.** It surfaces gaps; it does not fix Blade itself. Filing a Blade contribution is a separate, deliberate act.

**Not a substitute for design-to-code (G.15).** If you are starting from a Figma frame, run G.15's flow. The production-compiler is for code that exists; the design-to-code flow is for code that has not been written.

**Not for repairing logic bugs.** It does not change behaviour. If the inherited code has a bug, the bug ships through the rewrite. Use Y.11 / Y.12 (bug hunting / debugging) to fix bugs separately.

---

## Why this skill is canonical

Three reasons the production-compiler is the canonical "repair AI output" skill in the program:

**Reason 1 — It encodes a specific workflow that humans get wrong.** The instinct on inheriting drift is to "polish" — change a few things, leave the rest. The skill applies the discipline structurally: every ad-hoc `<div>` becomes the right Blade primitive; nothing is left for taste.

**Reason 2 — It composes with G.15 and G.16.** The production-compiler reads Blade via the same connector G.15 uses; the gap-naming follows the same policy G.15 names. The skills compose; the discipline is consistent across the design-to-code surface.

**Reason 3 — It is a force multiplier for AI-curious non-engineers.** A designer who prototypes in AI-Studio can ship to a Razorpay repo because the production-compiler exists. Without it, the gap between "AI prototype" and "Blade-compliant code" is a chasm only a frontend engineer can cross. With it, the chasm narrows. This is the second-belt manifesto of "force multiplier" in concrete form.

---

## Common failure modes

**Running it on already-compliant code.** Wastes time; produces noise. Fix: only on inherited or experimental code.

**Accepting the rewrite without reading the gap report.** The gaps are the most important output. Fix: read the report; decide deliberately on each gap.

**Treating the skill as a substitute for G.15.** If the design exists in Figma and the code does not, run G.15. Fix: production-compiler is for *code → code*, not *design → code*.

**Not re-running the test suite after the rewrite.** The skill claims to preserve behaviour. Trust but verify. Fix: always re-run tests.

**Filing a Blade contribution in the same PR.** Two changes at once. Fix: ship the production-compiler PR first, file the Blade contribution as a follow-up.

---

## GREEN / YELLOW / RED self-check

- 🟢 GREEN: I recognise when inherited or experimental code needs the production-compiler, run it, read the gap report, and ship a Blade-compliant PR with confidence.
- 🟡 YELLOW — I have heard of the skill but my instinct on inheriting drift is still to polish by hand.
- 🔴 RED — My branches still ship with custom `<div>` components and raw colour values.

---

## What you can say after this module

> "I run the production-compiler on inherited or experimental AI output to bring it to Blade compliance — and I read the gap report deliberately instead of accepting the rewrite blindly."

---

## Where to go next

G.18 (*The daily loop*) opens the harness cluster. After the design-to-code chapters, the next thing a Green Belt builder does daily is run the local-dev loop the design-to-code work runs against.

**Previous:** [← G.16 Blade deep dive](G16-blade-deep-dive.md) · **Next:** [→ G.18 The daily loop](G18-daily-loop.md)

**Further reading**

- [Appendix C — Skills Library](../../../appendices/C-skills-library/README.md) — the production-compiler entry
- [G.15 — Design-to-code](G15-design-to-code.md)
- [G.16 — Blade deep dive](G16-blade-deep-dive.md)
- [G.7 — Writing your first SKILL.md](../a-craft/G07-writing-your-first-skill.md)
