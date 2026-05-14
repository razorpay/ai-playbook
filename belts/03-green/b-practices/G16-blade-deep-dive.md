---
title: "Blade deep dive — tokens, primitives, variants, accessibility"
slug: "belts/green/blade-deep-dive"
section: "belts"
status: "drafted"
type: "chapter"
track: "green"
order: 16
time_minutes: 45
audience: "experienced-builder"
outcome: "Understand Blade's anatomy — tokens, primitives, variants, accessibility — well enough to pick the right component for any UI need without inventing one."
prev: "belts/green/design-to-code"
next: "belts/green/production-compiler-skill"
pillar: "context"
belt: "green"
tags: ["green-belt", "blade", "design-system", "tokens", "accessibility"]
updated: "2026-04-29"
---

# G.16 — Blade deep dive

If G.15 taught the flow, G.16 teaches the language. Blade (Razorpay's open-source design system) is the vocabulary every product team in the org speaks visually. A Green Belt builder who knows Blade's anatomy can answer "which component should I use" in seconds rather than minutes, can spot drift in a teammate's PR, and can contribute back when a real gap appears. This chapter is the reference for that anatomy.

---

## If you're short on time

- Blade has four layers: **tokens** (the design vocabulary), **primitives** (the basic building blocks), **patterns** (compositions of primitives), and **variants** (named configurations of each).
- The right component is almost always already in Blade. If you think it is not, check the docs once more before reaching for a custom solution; you will be wrong about half the time.
- Accessibility is built into Blade's primitives. Skipping a Blade primitive in favour of a `<div>` usually drops accessibility behaviour with it.

---

## The four layers

```
   ┌────────────────────────────────────────────┐
   │              BLADE                           │
   ├────────────────────────────────────────────┤
   │                                                │
   │  TOKENS                                        │
   │  Colors, typography, spacing, radii, shadows. │
   │  The vocabulary.                               │
   │                                                │
   │  PRIMITIVES                                    │
   │  Button, Input, Heading, Text, Box, Stack.    │
   │  The building blocks.                          │
   │                                                │
   │  PATTERNS                                      │
   │  Card, Modal, Tabs, Accordion, Form.          │
   │  Compositions of primitives.                   │
   │                                                │
   │  VARIANTS                                      │
   │  Named configurations: Button variant=         │
   │  'primary' | 'secondary' | 'tertiary'.        │
   │                                                │
   └────────────────────────────────────────────┘
```

A Green Belt builder works with all four layers fluently. The difference between Yellow and Green is the speed and confidence of the lookup: Yellow asks "which component should I use here," Green knows from the design intent.

---

## Layer 1 — Tokens

Tokens are named values for colors, type scales, spacing, radii, and shadows. The rule: **never use a raw value when a token exists.** Hard-coded `padding: 16px` is wrong when Blade has `spacing[3]` (which equals 16px on the standard scale).

Why: tokens carry intent. If the spacing scale changes (a future redesign moves `spacing[3]` from 16 to 18), every consumer of the token gets the new spacing for free. Hard-coded values do not.

Common token families:

- **Color** — `colors.surface.background.gray.subtle.lowContrast`, `colors.feedback.text.positive`. Long names because the token names *the role*, not *the colour*.
- **Spacing** — a numeric scale: `spacing[1]` through `spacing[12]`. The 4-pixel-step scale most design systems use.
- **Typography** — `typography.fonts.size.medium`, `typography.lineHeights.medium`. Type ramps named by intent.
- **Radii / shadows** — small set, named by role.

The agent reads Blade's token files and uses the right one. Your job is to refuse PRs that ship raw values.

---

## Layer 2 — Primitives

Primitives are the building blocks every UI in your repo composes from. The canonical ones:

- **`Box`** — the layout primitive. Renders a `<div>` with token-aware padding, margin, color, and so on. Replaces ad-hoc `<div style="...">`.
- **`Stack` / `Inline`** — vertical and horizontal layout primitives. Replaces ad-hoc flex containers.
- **`Heading`, `Text`, `Code`** — typography primitives. Token-aware variants for headings, body text, and code.
- **`Button`** — the canonical interactive primitive. Variants for primary / secondary / tertiary; sizes for small / medium / large; states for default / hover / active / disabled.
- **`Input`, `Select`, `Checkbox`, `Radio`, `Switch`** — form primitives. Token-aware, accessibility-built-in.
- **`Link`** — the canonical anchor primitive. Variants for the visual treatment.

The agent reads primitives, knows their variants, and knows which one a Figma element corresponds to. The Code Connect mapping table from G.15 is the agent's lookup.

---

## Layer 3 — Patterns

Patterns are compositions of primitives that capture a common UI shape. The canonical ones:

- **`Card`**: a container with optional header, body, and footer slots. Built from `Box` + `Heading` + `Text` primitives.
- **`Modal`**: an overlay with a header, body, and footer. Composed from `Box` + a portal + accessibility traps.
- **`Tabs`** — a tabbed interface. Composed from a tabs container, tab items, and a content area.
- **`Accordion`** — a collapsible-section interface.
- **`Form`**: a form container with consistent spacing, labelling, and error treatment.

Patterns save you from re-deriving the right shape every time. They also enforce consistency — every `Card` in the org looks the same because it composes the same primitives in the same way.

---

## Layer 4 — Variants

Variants are named configurations. `Button` has variants for `'primary' | 'secondary' | 'tertiary'`; sizes for `'small' | 'medium' | 'large'`; intent for `'positive' | 'negative' | 'notice' | 'information'`.

The skill is to pick the right *variant*, not the right styling. A Figma frame says "primary button"; you pick `variant='primary'`. The variant carries the colour, the typography, the focus ring, the disabled state — all without a single line of CSS in your code.

---

## Accessibility, built in

Every Blade primitive carries accessibility behaviour by default:

- **Focus management.** `Modal` traps focus correctly. `Tabs` arrow-key navigation works. `Button` has the right focus ring.
- **Screen-reader semantics.** `Heading` renders the right `h1` / `h2` / `h3` based on `level`. `Button` is a real `<button>`. `Input` has the right `aria-*` attributes.
- **Keyboard interaction.** `Switch` toggles with Space. `Modal` closes with Escape. `Accordion` opens with Enter.

The accessibility cost of skipping a Blade primitive is real and usually invisible to the builder. A `<div>` styled like a button is not a button: it has no role, no focus, no keyboard support. Reaching for a Blade primitive is the *cheapest* way to ship accessible UI.

This is why the playbook treats "use the design-system Button" as a hard rule, not a preference.

---

## When Blade does not have what you need

It happens. The right move is *not* a custom component. The right move is one of three:

### Option A — Compose a pattern from primitives

Many "missing components" turn out to be compositions of primitives. A "card with a footer button row" is `Card` + `Stack` + `Button`. Try this first; the agent is good at it.

### Option B — Contribute to Blade

If the component is genuinely missing and your team will use it more than once, the right move is to add it to Blade. The contribution has cost (review, design alignment, accessibility audit) but the cost is paid once and shared. Every team that needs the component later gets it for free.

This is the highest-leverage move a Green Belt builder makes. A merged Blade contribution counts toward Black Belt.

### Option C — Document a one-off

Rare cases where a one-off is correct: a marketing page with intentional brand-specific styling, a one-time feature flag UI, an admin tool. The rule is: name it, file a follow-up to evaluate whether it should be in Blade, and *do not* let it spread to other surfaces.

The wrong move is silently shipping a custom Button-shaped `<div>` and pretending it is fine. That drift compounds.

---

## How the agent uses Blade

A well-set-up agent (with the design-system connector loaded and the team's CLAUDE.md naming Blade as the source of truth):

1. Reads the Figma frame.
2. Maps elements to Blade primitives via Code Connect.
3. Surfaces gaps explicitly per G.15.
4. Generates code using Blade primitives, with token-named values throughout.
5. Refuses to invent a custom component without a flagged exception.

If your sessions do not produce this shape, one of:

- the design-system connector is not loaded (harness fix);
- CLAUDE.md does not name Blade (context fix);
- the prompt did not constrain the output (prompt fix).

This is the three-pillar diagnosis from G.1 applied to design-to-code work.

---

## Common failure modes

**Reaching for `<div>` for layout.** Use `Box`, `Stack`, `Inline`. Fix: refuse the urge.

**Hard-coded spacing or colour values.** Use tokens. Fix: a CLAUDE.md rule that says "use Blade tokens for all spacing, colour, typography; raw values are flagged in review."

**Reinventing a primitive that exists.** "We need a button-like thing for this." It is a `Button`. Fix: a five-second Blade docs check before any custom component.

**Ignoring variants and re-styling.** Adding `style={{ background: '...' }}` to a Blade primitive defeats the purpose. Fix: pick the right variant; if the variant does not exist, file a Blade contribution.

**Not contributing back when you find a real gap.** A genuinely missing component that your team and others will use should land in Blade. Fix: file the contribution; a Black Belt move.

**Skipping accessibility.** A `<div>` that looks like a button. Fix: see "reaching for `<div>`" — same root cause.

---

## GREEN / YELLOW / RED self-check

- 🟢 GREEN: I can pick the right Blade component and variant for any UI need from the design intent, name gaps when they appear, and contribute back when the gap is real.
- 🟡 YELLOW — I know Blade exists and reach for it usually, but I sometimes invent custom components or hard-code values.
- 🔴 RED — I default to ad-hoc components and have shipped custom Button-shaped `<div>`s in the last quarter.

---

## What you can say after this module

> "I know Blade's tokens, primitives, patterns, and variants well enough to pick the right component in seconds — and I refuse to ship custom components when a Blade primitive plus a variant would do."

---

## Where to go next

G.17 (*The production-compiler skill*) is the canonical pattern for *repairing* AI output that did not follow this discipline. Sometimes you inherit code from AI-Studio or ChatGPT that ships ad-hoc components; the production-compiler is how you bring it back to Blade.

**Previous:** [← G.15 Design-to-code](G15-design-to-code.md) · **Next:** [→ G.17 production-compiler skill](G17-production-compiler-skill.md)

**Further reading**

- [Blade design system](https://blade.razorpay.com/)
- [G.15 — Design-to-code](G15-design-to-code.md) — the flow this chapter's anatomy supports
- [G.6 / G.7 — Skills](../a-craft/G06-skills-overview.md)
