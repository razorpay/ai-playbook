---
name: production-compiler
description: Takes raw AI-generated UI code (typically from AI Studio, ChatGPT, or a similar prompt-based UI generator) plus optional design-intel and produces Blade-compliant JSX. Three layers: component substitution (raw primitives → Blade primitives), token application (raw values → Blade tokens), accessibility verification. Activate when the user has raw AI-generated UI code or a Figma design they want translated to Blade-using code.
---

# production-compiler

## Triggers

Activate when the user says "compile this to Blade", "translate this AI-generated UI to Blade", "make this design-intel into Blade code", or any phrasing that maps to "produce shippable Blade JSX from raw input".

Activate as the second stage of the design-to-code workflow described in G.15. The first stage is the `design-intel` skill.

## Body

The skill runs three layers in order. Each layer produces input for the next.

### Layer 1: Component substitution

Replace raw HTML / Tailwind primitives in the input with Blade primitives.

For each non-Blade element:
- Identify the Blade primitive that matches the element's role and shape.
- Replace the element with the Blade primitive.
- Where no Blade primitive exists, compose from Blade primitives or note the gap.

The substitution rules are in `translation-rules.md`. Common substitutions: `<button>` → `Button`, `<div>` with stack-like Tailwind classes → `Stack`, `<input>` → `Input`, `<h1>` → `Heading`.

### Layer 2: Token application

Replace raw values (colours, spacing, typography) with Blade tokens.

For each raw value:
- Identify the Blade token that matches. Blade tokens use semantic naming (intent.positive, intent.notice, spacing.medium).
- Replace the raw value with the token.
- Where no token matches exactly, choose the closest token and note the deviation in the output.

### Layer 3: Accessibility verification

Run the same accessibility checks that the `blade-compliance-reviewer` skill applies:
- Interactive elements have accessible names.
- Headings are in order.
- Contrast ratios meet WCAG AA.
- Focus order is sensible.
- Touch targets meet minimum size requirements.

If any check fails, the layer either fixes it inline (when the fix is unambiguous, like adding an `aria-label`) or surfaces it in the output's "Manual review needed" section.

### Workflow

1. **Read the input.** Two possible shapes: raw AI-generated UI code (HTML / JSX / Tailwind), or a `design-intel` document (Markdown). Both inputs are valid; the skill accepts either.
2. **If a design-intel document, also accept raw code if provided.** The intel guides the substitution; the raw code provides the implementation skeleton. If only intel is provided, the skill generates a Blade-using skeleton from scratch.
3. **Run Layer 1** (component substitution).
4. **Run Layer 2** (token application).
5. **Run Layer 3** (accessibility verification).
6. **Produce the output.** The output is Blade-using JSX plus a structured commentary naming what was translated, what required composition, and what needs manual review.

The skill produces v0.1 of the component. The engineer iterates from there.

## Modes

Two modes.

- **Default mode.** Takes raw code, design-intel, or both. Produces Blade JSX plus commentary.
- **Skeleton mode.** Takes only design-intel (no raw code). Produces a Blade-using skeleton sized to the intel.

## When to refuse

- The input is neither raw code nor a design-intel document. Refuse and ask for one of the two shapes.
- The input contains regulator-protected data (real customer info, real payment details, real secrets). Refuse and surface the data-classification issue.
- The design-intel document has blocking Open questions (per the design-intel output shape). Refuse until the questions are resolved; the design partner or the engineer answers them, then re-invoke.
- The raw code is too large to translate reliably in one pass (more than ~500 lines of generated UI code). Refuse and suggest splitting the input into smaller components.
- The user asks the skill to bypass the accessibility verification layer. Refuse; accessibility is non-negotiable in shipped Blade code.

## Output shape

The output has three sections.

1. **Blade JSX.** The translated code, ready to copy into a Blade-using project.
2. **Translation log.** What was substituted, what tokens were applied, what was composed from multiple primitives.
3. **Manual review needed.** Anything the skill could not translate confidently. Each item names the file location (line number or component name) and the specific concern.

See `translation-rules.md` for the detailed rule set and worked examples.

## Reference files

- `translation-rules.md` — the component-substitution and token-application rule set, plus worked examples of each layer.
- `test-cases.md` — acceptance scenarios.

## External references

- [G.15 — Design-to-code](../../belts/03-green/b-practices/G15-design-to-code.md). The end-to-end workflow.
- [G.16 — Blade deep dive](../../belts/03-green/b-practices/G16-blade-deep-dive.md). The Blade primitive and token reference.
- [G.17 — The production-compiler skill](../../belts/03-green/b-practices/G17-production-compiler-skill.md). The chapter that defines this skill's role.
- The `design-intel` skill, which produces the input this skill consumes.
- The `blade-compliance-reviewer` skill, whose checks Layer 3 inherits.
