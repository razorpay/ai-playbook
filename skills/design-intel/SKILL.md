---
name: design-intel
description: Reads a Figma frame and produces structured design intent that the production-compiler can consume. Outputs a Markdown document naming the components used (with Blade equivalents where they exist), the layout shape, the interaction states, the variants, and the accessibility considerations. Activate when the user wants to translate a Figma design into shippable code and is at the first stage of the design-to-code workflow.
---

# design-intel

## Triggers

Activate when the user says "extract design intent from this Figma frame", "give me design intel for <frame>", "what's in this design", or any phrasing that maps to "read this Figma frame and tell me what to build". Activate as the first stage of the design-to-code workflow described in G.15.

Do not activate when the user wants to produce code directly from Figma. That is the production-compiler's job; design-intel produces the intent, and the production-compiler consumes it.

## Body

The skill reads a Figma frame (via the Figma MCP) and produces a structured design-intent document. The document is the input the production-compiler consumes.

### Workflow

1. **Read the frame.** Use the Figma MCP to fetch the frame's structure: nodes, components, styles, variants, auto-layout settings.
2. **Identify components.** For each significant element, name the component category (button, input, card, modal, etc.). Where the element matches a Blade primitive, name the Blade name. Where it does not, name the closest Blade primitive or note "no Blade equivalent".
3. **Capture layout.** Describe the layout shape (vertical stack, grid, sidebar+content). Use Blade's layout primitives where they apply (Box, Stack, Grid).
4. **Capture interaction states.** List the states the design shows: default, hover, focus, disabled, loading, error. If the design shows only one state, name what is missing.
5. **Capture variants.** List the variants visible in the design (size, intent, density). Where the design intent is ambiguous, surface the ambiguity rather than guessing.
6. **Capture accessibility considerations.** Note colour-contrast concerns, focus order, text size, and any interactive element without an obvious accessible name.
7. **Produce the output document.** Use the format in `output-shape.md`.

The skill does not produce code. It produces *intent*. The production-compiler consumes the intent and produces code.

## Modes

Two modes.

- **Default mode.** Reads one frame, produces one design-intel document.
- **Multi-frame mode.** Reads a sequence of frames (typically the states of a flow: empty, loading, success, error) and produces a single document that captures the flow's intent. Used when the design represents a multi-state component or a wizard.

## When to refuse

- The Figma frame is not accessible (auth failure, frame ID wrong, frame is in a project the user does not have access to). Refuse with a clear note; the user fixes Figma access before re-trying.
- The user asks for code, not intent. Refuse and point at the production-compiler.
- The frame is a Figma design *not* using auto-layout. Refuse and surface this as a design-quality concern; the production-compiler cannot reliably translate non-auto-layout designs into Blade. The design partner should re-author the frame in auto-layout first.
- The frame contains imagery or content that is regulator-protected (real customer data, real PII). Refuse and surface the data-classification issue.

## Output shape

See `output-shape.md` for the structured format. The summary form:

- **Frame summary.** What the frame represents (one paragraph).
- **Components used.** A list naming each component, the Blade equivalent (or "no equivalent"), and a one-line description.
- **Layout.** The layout shape, with Blade primitives where they apply.
- **States.** The states the design shows, with any missing states flagged.
- **Variants.** The variants visible.
- **Accessibility.** Notable accessibility considerations.
- **Open questions.** Anywhere the design intent is ambiguous; the production-compiler will need answers before it can produce reliable output.

## Reference files

- `output-shape.md` — the structured format the document follows, with a worked example.
- `test-cases.md` — acceptance scenarios.

## External references

- [G.15 — Design-to-code](../../belts/03-green/b-practices/G15-design-to-code.md). The chapter that describes the end-to-end workflow this skill participates in.
- [G.16 — Blade deep dive](../../belts/03-green/b-practices/G16-blade-deep-dive.md). The Blade primitive reference.
- [G.17 — The production-compiler skill](../../belts/03-green/b-practices/G17-production-compiler-skill.md). The next stage of the workflow.
- The `production-compiler` skill, which consumes design-intel output.
