# design-intel output shape

The Markdown document the skill produces. The shape is stable; the production-compiler depends on it.

## Header

```
# Design intel: <frame name>

**Frame.** <URL or ID>
**Date extracted.** <YYYY-MM-DD>
**Designer (handle, optional).** <handle>
```

## Frame summary

One paragraph (two to four sentences) describing what the frame represents. Reads as if the reader had not seen the design.

```
## Frame summary

<paragraph>
```

## Components used

A list. Each entry has the component category, the Blade equivalent (or "no equivalent"), and a one-line description. The list is comprehensive for significant elements; small decorative elements (dividers, spacers) can be omitted unless they carry interaction.

```
## Components used

- <Category> (<variant>): <description>. Blade equivalent: <Blade primitive name or "no equivalent">.
- <Category> (<variant>): <description>. Blade equivalent: <Blade primitive name>.
- ...
```

When the closest Blade equivalent is not exact, the entry notes the closest match and the gap:

```
- Stepper: numeric input with increment/decrement. Blade equivalent: Counter (closest). Gap: the design uses a custom border style not in the Counter default; will need a token override or a small wrapper.
```

## Layout

The layout shape, with Blade layout primitives where they apply. Names the breakpoints if the design shows responsive behaviour.

```
## Layout

<paragraph describing the layout>

Breakpoints visible:
- <breakpoint name>: <description>
- <breakpoint name>: <description>

Blade primitives that map to the layout:
- <Primitive>: <where it applies>
```

## States

The states the design shows. The list is what *is* present, then a separate list of what is *missing*. A complete design covers the relevant states for the component class.

```
## States

Present in this frame:
- <state>: <description>

Missing from this frame:
- <state>: <why it matters; whether the production-compiler should guess or wait>
```

## Variants

The variants visible. When variants are not visible, the entry notes the absence.

```
## Variants

- <variant axis> (<value>): <where it appears>
- <variant axis>: not visible in this frame; defaults to <Blade default>.
```

## Accessibility

Notable accessibility considerations. The skill surfaces what it can read; the design partner and the production-compiler verify the rest.

```
## Accessibility

- <consideration>: <observation>
- <consideration>: <observation>
```

Common entries:

- Contrast ratios for text against background.
- Interactive elements without obvious accessible names.
- Focus order (if inferable from auto-layout).
- Text size minimum.
- Touch target sizes (mobile breakpoints).

## Open questions

The ambiguities the production-compiler needs resolved. The list is empty when the design is unambiguous; the list is non-empty when the design assumes context the frame does not provide.

```
## Open questions

- <question>: <context>
- <question>: <context>
```

Common entries:

- Destination of a link or button that is shown but not connected.
- State transitions implied but not drawn.
- Data shapes implied by content but not specified.
- Conditional rendering (when does this element appear?).

If the open questions are blocking, the production-compiler will refuse to run. If they are not blocking, the production-compiler proceeds with explicit notes about what it assumed.

## Worked example

```
# Design intel: Checkout review

**Frame.** https://figma.com/file/abc123/checkout?node-id=42
**Date extracted.** 2026-05-08
**Designer.** designer-handle

## Frame summary

A two-column checkout review screen showing the cart summary, shipping address, and payment method. The user reviews their order before confirming. The "Confirm order" action is the primary CTA in the bottom right; the secondary "Edit cart" link is in the top right of the cart summary.

## Components used

- Button (primary, large): "Confirm order". Blade equivalent: Button (intent: positive, size: large).
- Card with section dividers: cart summary container. Blade equivalent: Card + Divider.
- Address block: structured text showing recipient, street, city, postcode. Blade equivalent: Box + Heading + Text.
- Payment method row: payment provider logo + last-four-digits + edit link. Blade equivalent: Box + Image + Text + Link.
- Edit link: text link styled as button-tertiary. Blade equivalent: Link.
- Heading (large): "Review your order". Blade equivalent: Heading (size: large).
- Total summary: subtotal + tax + total in a stack. Blade equivalent: Stack + Text variants.

## Layout

Two-column desktop layout: cart summary on the left (60% width), shipping + payment + total on the right (40% width). Stacks vertically on mobile with cart summary first, then shipping + payment + total in a single column.

Breakpoints visible:
- Desktop (1280px and above): two-column.
- Mobile (under 768px): single-column.

Blade primitives that map to the layout:
- Grid: two-column desktop, one-column mobile.
- Stack: within each column.
- Box: outer container with padding.

## States

Present in this frame:
- Default: all data populated, button enabled.

Missing from this frame:
- Loading: while order submits. The production-compiler should add this state with a loading spinner on the Button.
- Error: payment declined or address invalid. The production-compiler will need a separate frame for the error UI.
- Success: order confirmed. Typically navigates away; not strictly needed in the review screen but the destination should be named.

## Variants

- Mobile breakpoint visible; desktop breakpoint visible. Intermediate breakpoints (tablet) not shown; production-compiler defaults to mobile shape under 1024px.
- No size variants for Button beyond the primary large; production-compiler uses Blade defaults for any secondary actions.

## Accessibility

- "Confirm order" button has 4.6:1 contrast against background — passes WCAG AA.
- The address block lacks a visible heading; consider adding "Shipping address" as a visible label so screen readers can navigate.
- The "Edit" link next to payment method is icon-only at small sizes; needs an accessible name like "Edit payment method".
- Focus order from auto-layout: heading → cart items → cart edit → shipping → payment → total → confirm. Looks reasonable.

## Open questions

- The "Edit cart" link in the cart summary: where does it go? (Production-compiler needs the destination URL or route.)
- The "Edit payment method" link: opens a modal or navigates away? (Affects the production-compiler's choice of Link vs Button.)
- The mobile layout collapses the cart summary on small screens; is this controlled (expandable) or always collapsed? (Affects whether to use Blade's Accordion or just CSS hiding.)
```

The example is around 70 lines. A typical design-intel document for a single frame is 50 to 120 lines depending on complexity.

---

*The output shape is the contract between this skill and the production-compiler. Changes require both skills to update together.*
