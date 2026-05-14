# production-compiler

The second stage of the design-to-code workflow. Takes raw AI-generated UI code (or design-intel, or both) and produces Blade-compliant JSX ready to iterate from.

The compiler runs three internal layers: component substitution, token application, and accessibility verification. The output is v0.1 of the component. The engineer takes it from there.

## When to run

- You used AI Studio, ChatGPT, or another prompt-based UI generator and the output uses raw HTML / Tailwind. You want it in Blade.
- You have a design-intel document from the `design-intel` skill and need Blade JSX.
- You have a Figma frame, ran design-intel, and now want to ship code.

## How to run

Three invocation shapes:

> "Compile this to Blade: <paste raw AI-generated code>"

> "Build a Blade skeleton from this design-intel: <paste design-intel>"

> "Take this raw code and this design-intel, produce Blade JSX: <both>"

The skill produces the translated JSX plus a translation log and a manual-review-needed list.

## What the output looks like

A summary form (the full structure is in `translation-rules.md`):

```jsx
// Blade JSX
import { Box, Stack, Heading, Text, Button, Card } from '@razorpay/blade';

export function CheckoutReview() {
  return (
    <Box padding="spacing.6">
      <Heading size="large">Review your order</Heading>
      <Stack gap="spacing.4">
        <Card>
          {/* cart items */}
        </Card>
        <Button intent="positive" size="large">
          Confirm order
        </Button>
      </Stack>
    </Box>
  );
}
```

```
## Translation log

- Substituted: <h1> → <Heading size="large"> (Layer 1)
- Substituted: <div className="flex flex-col gap-4"> → <Stack gap="spacing.4"> (Layer 1)
- Token applied: gap-4 → spacing.4 (Layer 2)
- Token applied: bg-green-600 → intent.positive on Button (Layer 2)
- Verified: button has accessible name "Confirm order" (Layer 3)
- Verified: heading hierarchy is in order (Layer 3)

## Manual review needed

- The "Edit cart" link in the original Tailwind output uses a non-standard text colour (#1A5FFF). No exact Blade token match; nearest is intent.notice. Manual choice between accepting the token or composing a custom variant.
- The mobile breakpoint behaviour is not present in the input. Blade Grid has a defaultMobile shape; this output uses it. If the design intent was different, override in the JSX directly.
```

## Pipeline

```
Figma frame → design-intel skill → design-intel document
                                        │
                                        ▼
Raw AI output ──────────────────► production-compiler skill ──► Blade JSX
                                                                + translation log
                                                                + manual review needed
```

Running production-compiler without design-intel works (it produces a v0.1 from raw code alone), but the result is less reliable because the compiler has to guess at the design's intent.

## What this skill is not

**Not a one-shot translator.** The output is v0.1. The engineer reviews, tests, and iterates.

**Not a substitute for the Blade-compliance reviewer.** The accessibility layer overlaps with what `blade-compliance-reviewer` checks. For shipped code, run blade-compliance-reviewer separately as a final gate.

**Not a code generator from scratch.** The skill translates input it receives. If no input is provided, the skill refuses; producing UI from a prompt alone is a different workflow.

**Not capable of every translation.** Some patterns (heavily-animated UI, complex form state, custom Tailwind plugins) the skill explicitly flags as "manual review needed" rather than guessing.

**Not unbounded.** The skill caps at roughly 500 lines of input per invocation. Larger inputs should be split into components and translated separately.

## Maintenance

The skill is owned by the design transformation lead and the platform team. Updates land when:

- Blade adds new primitives (translation rules need to recognise them).
- Common translation patterns from AI Studio or ChatGPT shift (the rule set evolves).
- New accessibility requirements land (Layer 3 gets the new check).

To suggest a rule update, open a PR against the skill's `translation-rules.md`. Reviews happen at the monthly design transformation sync.

## Related

- [G.15 — Design-to-code](../../belts/03-green/b-practices/G15-design-to-code.md) — the end-to-end workflow.
- [G.16 — Blade deep dive](../../belts/03-green/b-practices/G16-blade-deep-dive.md) — the Blade primitive and token reference.
- [G.17 — The production-compiler skill](../../belts/03-green/b-practices/G17-production-compiler-skill.md) — the chapter that defines this skill's role.
- The `design-intel` skill — the input source for the skill's most reliable path.
- The `blade-compliance-reviewer` skill — the final-gate accessibility verification.
