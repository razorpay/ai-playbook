# production-compiler translation rules

The component-substitution and token-application rule set the three layers use. The rules are organised by input pattern (what the raw AI-generated code looks like) and target (what Blade primitive it translates to).

The rules are not exhaustive. They cover the most common patterns the program sees from AI Studio, ChatGPT, and similar prompt-based generators. When the skill encounters a pattern not covered here, it makes a best-effort translation and surfaces the decision in the "Manual review needed" section.

---

## Layer 1: Component substitution

### HTML primitives → Blade primitives

| Raw input | Blade target | Notes |
|---|---|---|
| `<button>` | `Button` | Variant determined by Tailwind classes or context. Default to `intent="primary"` if unclear. |
| `<input type="text">` | `Input` | |
| `<input type="email">` | `Input type="email"` | |
| `<input type="password">` | `Input type="password"` | |
| `<textarea>` | `TextArea` | |
| `<select>` | `Dropdown` | Options nest inside. |
| `<h1>` to `<h6>` | `Heading size="..."` | h1 → large; h2 → medium; h3 → small; h4-h6 → smallest with weight variation. |
| `<p>` | `Text` | |
| `<a>` | `Link` | If the link's role is button-like (CTA styling), `Button` with `variant="link"` is closer. |
| `<img>` | `Image` | Always include `alt`. |
| `<form>` | Composed: `Box` + form-shaped children. | Blade does not have a dedicated Form primitive; use Box with form semantics. |
| `<label>` | Composed: handled by `Input`'s `label` prop. | Standalone labels usually unnecessary in Blade. |
| `<div>` | Composed: most common targets are `Box`, `Stack`, `Grid`, `Card`. See layout substitution below. |
| `<span>` | `Text` (inline). | |
| `<ul>` / `<ol>` | Composed: `Stack` with text children. | Blade does not have list primitives; the pattern composes. |
| `<table>` | `Table` (Blade primitive, if present in the program's Blade version) or composed. | |
| `<dialog>` / modal pattern | `Modal` | |
| `<details>` / `<summary>` | `Accordion` | |
| `<nav>` | Composed: `Box` with nav semantics or `Tabs` if the nav is tab-shaped. | |

### Tailwind layout classes → Blade layout primitives

The compiler reads Tailwind className strings and translates layout patterns:

| Tailwind pattern | Blade target | Notes |
|---|---|---|
| `flex flex-col gap-X` | `Stack gap="spacing.X"` | Direction defaults to vertical. |
| `flex flex-row gap-X` or `flex items-center gap-X` | `Stack direction="row" gap="spacing.X"` | |
| `grid grid-cols-N gap-X` | `Grid columns={N} gap="spacing.X"` | |
| `p-X` / `px-X` / `py-X` / `pt-X` etc. | `Box padding="spacing.X"` / `paddingX="spacing.X"` etc. | |
| `m-X` / `mx-X` etc. | Avoid margin in Blade; use parent `gap` or wrapper padding instead. | The compiler flags raw margins in "Manual review needed" with a recommended composition. |
| `rounded` / `rounded-md` / `rounded-lg` | Blade primitives have built-in radius from tokens; raw radius classes usually unnecessary. | |
| `shadow` / `shadow-md` | Same as radius: Blade primitives have built-in shadow when appropriate. | |

### Common composed patterns

| Pattern in raw AI output | Blade composition |
|---|---|
| Card with header and body | `<Card>` containing `<Heading>` and content. |
| Stat tile (number + label) | `<Box>` containing `<Heading>` (the number) and `<Text>` (the label). |
| Empty state (icon + text + action) | `<Stack>` with icon, `<Text>`, `<Button>`. |
| Tab navigation | `<Tabs>` primitive. |
| Form section | `<Stack gap="spacing.6">` containing labelled `<Input>`s. |
| Banner / alert | `<Alert>` primitive (or `<Banner>` depending on Blade version). |

---

## Layer 2: Token application

Blade tokens use semantic naming. The compiler maps raw values to tokens.

### Spacing

Tailwind's spacing classes (`p-1`, `gap-4`, etc.) map to Blade's `spacing.N` tokens:

| Tailwind | Blade token |
|---|---|
| `1` (0.25rem) | `spacing.1` |
| `2` (0.5rem) | `spacing.2` |
| `3` (0.75rem) | `spacing.3` |
| `4` (1rem) | `spacing.4` |
| `6` (1.5rem) | `spacing.6` |
| `8` (2rem) | `spacing.8` |

When the input uses non-token spacing values (e.g., `gap-[14px]`), the compiler chooses the closest token and notes the deviation.

### Colour and intent

Tailwind colour utilities map to Blade's intent tokens:

| Tailwind pattern | Blade target |
|---|---|
| `bg-blue-600` / `text-blue-600` (primary button) | `intent="primary"` |
| `bg-green-600` (success / confirm) | `intent="positive"` |
| `bg-red-600` (destructive) | `intent="negative"` |
| `bg-amber-500` (warning) | `intent="notice"` |
| `bg-gray-100` / `bg-slate-100` (subtle) | Default Blade neutral; no explicit intent. |

Custom colours that do not map to an intent get the closest match plus a "Manual review needed" entry naming the gap.

### Typography

Tailwind text utilities → Blade Heading and Text variants:

| Tailwind pattern | Blade target |
|---|---|
| `text-2xl font-bold` | `Heading size="large"` |
| `text-xl font-bold` | `Heading size="medium"` |
| `text-lg font-semibold` | `Heading size="small"` |
| `text-base` | `Text` (default body) |
| `text-sm` | `Text size="small"` |
| `text-xs` | `Text size="xsmall"` |
| `font-bold` (within body text) | `Text weight="bold"` |

---

## Layer 3: Accessibility verification

The layer reuses the rules from the `blade-compliance-reviewer` skill:

1. **Interactive elements have accessible names.** Every `<Button>`, `<Link>`, `<IconButton>` has either a child text node, an `aria-label`, or an `aria-labelledby`.
2. **Headings are in order.** No skipping (h1 → h3 without h2).
3. **Contrast ratios meet WCAG AA.** For text against background; the Blade tokens make this automatic for default usage. Custom colour overrides trigger a contrast check.
4. **Focus order is sensible.** The DOM order of interactive elements should match the visual reading order.
5. **Touch targets meet minimum size.** Interactive elements at the mobile breakpoint have at least 44x44 hit area.

When a check fails:

- If the fix is unambiguous (e.g., adding `aria-label="Close"` to an icon button), the compiler applies it inline.
- If the fix requires judgement (e.g., choosing between two ways to fix a focus order issue), the compiler surfaces it in "Manual review needed".

---

## Worked example: AI Studio output → Blade

### Input (raw AI Studio output, abridged)

```jsx
export function CheckoutReview() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Review your order</h1>
      <div className="flex flex-col gap-4">
        <div className="bg-white rounded-lg shadow-md p-4">
          {/* cart items */}
        </div>
        <button className="bg-green-600 text-white px-6 py-3 rounded-md font-semibold">
          Confirm order
        </button>
      </div>
    </div>
  );
}
```

### Output (Blade JSX)

```jsx
import { Box, Stack, Heading, Card, Button } from '@razorpay/blade';

export function CheckoutReview() {
  return (
    <Box padding="spacing.6">
      <Heading size="large" marginBottom="spacing.4">
        Review your order
      </Heading>
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

### Translation log

- Layer 1: `<div className="p-6">` → `<Box padding="spacing.6">`.
- Layer 1: `<h1 className="text-2xl font-bold mb-4">` → `<Heading size="large" marginBottom="spacing.4">`.
- Layer 1: `<div className="flex flex-col gap-4">` → `<Stack gap="spacing.4">`.
- Layer 1: `<div className="bg-white rounded-lg shadow-md p-4">` → `<Card>`. Card primitive carries the white background, radius, and shadow as defaults.
- Layer 1: `<button>` → `<Button>`.
- Layer 2: `bg-green-600` → `intent="positive"`.
- Layer 2: `px-6 py-3` → `size="large"` on Button (size includes the padding).
- Layer 2: `text-2xl font-bold` → `size="large"` on Heading (size includes the weight and scale).
- Layer 3: Button has accessible name "Confirm order" (child text node). Pass.
- Layer 3: Heading hierarchy is in order (h1 only). Pass.

### Manual review needed

None for this input. The translation was unambiguous.

---

*The rule set evolves as new patterns emerge from AI Studio, ChatGPT, and other generators. Updates land at the monthly design transformation sync.*
