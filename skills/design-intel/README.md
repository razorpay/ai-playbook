# design-intel

The first stage of the design-to-code workflow. Reads a Figma frame and produces structured design intent that the production-compiler can consume. Outputs a Markdown document, not code.

This skill is what makes the design-to-code pipeline reliable. Without explicit intent extraction, the production-compiler has to guess at the designer's intent. With it, the compiler has a clean input shape to work from.

## When to run

- You have a Figma frame and you need to produce shippable code from it.
- You are about to invoke the production-compiler on a Figma design.
- You want a non-engineer-facing summary of what a design contains (components, layout, states, variants, accessibility).

## How to run

In chat with Claude Code, with the Figma MCP installed:

> "Give me design intel for <Figma frame URL or ID>."

> "Extract design intent from this Figma frame: <URL>."

> "What's in this design: <URL>."

The skill reads the frame via the Figma MCP and produces a Markdown document.

## What the output looks like

A summary form (the full shape is in `output-shape.md`):

```
# Design intel: <frame name>

## Frame summary
A two-column checkout review screen showing the cart summary, shipping address, and payment method.

## Components used
- Button (primary, large): "Confirm order". Blade equivalent: Button.
- Card with section dividers: cart summary container. Blade equivalent: Card + Divider.
- Address block: structured text. Blade equivalent: Box + Heading + Text.
- ...

## Layout
Two-column desktop layout (sidebar 360px, content fluid). Stack on mobile. Blade primitives: Grid (2 columns desktop, 1 column mobile), Stack within each column.

## States
The frame shows the default state. Missing: loading state (during order submission), error state (payment declined), success state (order confirmed).

## Variants
- Mobile breakpoint visible.
- No size variants for the Button (only the primary large is shown).

## Accessibility
- The "Confirm order" button has 4.6:1 contrast against background — passes WCAG AA.
- The address block lacks a heading; consider adding "Shipping address" as a visible label.
- Focus order is implicit from auto-layout; should be verified in the production-compiler stage.

## Open questions
- The "Edit address" link is shown but the destination is not in this frame; production-compiler needs to know where it goes.
- The cart summary collapses on mobile; is this controlled or always collapsed?
```

## Pipeline

design-intel is stage one of two. The production-compiler consumes design-intel output:

```
Figma frame
   │
   ▼
design-intel skill ──► design-intel document (Markdown)
                            │
                            ▼
                  production-compiler skill ──► Blade-using JSX
```

Running production-compiler without design-intel produces less reliable output because the compiler has to guess at design intent.

## What this skill is not

**Not a code generator.** Code generation is the production-compiler's job.

**Not a design review.** A design review evaluates whether the design is good. design-intel describes the design as it is, without judgement.

**Not a substitute for the design partner.** When the design is ambiguous, design-intel surfaces the ambiguity rather than guessing. The design partner resolves it.

**Not exhaustive.** The skill captures the intent at the level the production-compiler needs. Designers using the skill to document their work in detail will need a more verbose process.

## Maintenance

The skill is owned jointly by the design transformation lead and the platform team. Updates land when:

- Blade adds new primitives (the component mapping in the output needs to recognise them).
- The Figma MCP changes its data shape (the workflow needs to read the new shape).
- Common patterns of ambiguity surface from real use (the "open questions" section evolves).

To suggest a change, open a PR. Reviews happen at the monthly design transformation sync.

## Related

- [G.15 — Design-to-code](../../belts/03-green/b-practices/G15-design-to-code.md) — the end-to-end workflow.
- [G.16 — Blade deep dive](../../belts/03-green/b-practices/G16-blade-deep-dive.md) — the Blade primitive reference.
- [G.17 — The production-compiler skill](../../belts/03-green/b-practices/G17-production-compiler-skill.md) — the next stage of the workflow.
- The `production-compiler` skill, which consumes the design-intel output.
- The `blade-compliance-reviewer` skill, which the production-compiler invokes downstream to verify its output.
