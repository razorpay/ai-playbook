# Diagrams

> **What this directory is.** The polished, theme-aware SVGs that carry visual identity across the playbook. Tier-1 visuals: belt ladder hero, the 5-layer mental model, the 9-layer Enablement Stack, three pillars, certification flow, design-to-code pipeline, memory layers, RFC state machine, the pre-ship-check 6-layer gate.
>
> **What it is not.** The hand-drawn Excalidraw illustrations live in `excalidraw/` (v0.21b). The inline ASCII diagrams in individual chapters stay in place where they work.

This README captures the design language so future maintainers adding diagrams stay coherent with the set.

## Design language

### Colour

**Primary geometry uses `currentColor`.** Strokes, lines, default text inherit from the surrounding page's text color. Diagrams adapt to light and dark mode automatically.

**Five identity colours, used for belt-tier or program identity only:**

| Identity | Colour | Hex |
|---|---|---|
| ⚪ White Belt | bone | `#E5E7EB` |
| 🟡 Yellow Belt | amber | `#F59E0B` |
| 🟢 Green Belt | emerald | `#10B981` |
| ⚫ Black Belt | slate | `#1F2937` |
| Staff+ Council | indigo | `#6366F1` |

**Three status colours, used for GREEN/YELLOW/RED outcomes (matches the curriculum's vocabulary):**

| Status | Colour | Hex |
|---|---|---|
| ✅ GREEN | emerald (same as belt) | `#10B981` |
| 🟡 YELLOW | amber (same as belt) | `#F59E0B` |
| ❌ RED | red | `#EF4444` |

No other fills. Decorative colour is forbidden.

### Typography

System font stack so diagrams match Starlight's body font:

```
font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
```

**Type scale:**

- Diagram title: 24px bold
- Section labels: 18px semibold
- Body text in diagram: 14px regular
- Captions and annotations: 12px regular

### Strokes

- Primary: 2px, `currentColor`.
- Secondary: 1.5px, `currentColor` at 0.5 opacity.
- Detail: 1px, `currentColor` at 0.4 opacity.

### Corners

- Major shapes: 8px radius.
- Minor shapes: 4px radius.

### Whitespace

- Desktop target viewBox: 1200 wide, height varies.
- Internal padding: 24px minimum around any element.
- Empty space is part of the composition.

### Theme handling

Every SVG carries its own `<style>` block:

```svg
<style>
  :root { --fg: #1F2937; --bg: #FFFFFF; --fg-muted: #6B7280; }
  @media (prefers-color-scheme: dark) {
    :root { --fg: #E5E7EB; --bg: #0F172A; --fg-muted: #9CA3AF; }
  }
  .stroke { stroke: var(--fg); fill: none; }
  .stroke-muted { stroke: var(--fg-muted); fill: none; }
  .fill { fill: var(--fg); }
  .fill-muted { fill: var(--fg-muted); }
  .bg { fill: var(--bg); }
  .belt-white { fill: #E5E7EB; }
  .belt-yellow { fill: #F59E0B; }
  .belt-green { fill: #10B981; }
  .belt-black { fill: #1F2937; }
  .belt-council { fill: #6366F1; }
  .status-green { fill: #10B981; }
  .status-yellow { fill: #F59E0B; }
  .status-red { fill: #EF4444; }
  text { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; fill: var(--fg); }
</style>
```

The CSS variables make the SVG render correctly in both modes regardless of how it's embedded.

### What the design language is not

- Not decorated. No drop shadows except where they convey depth meaningfully.
- Not maximalist. Every diagram passes the squint test.
- Not skeumorphic. No 3D ladders, isometric belts, or clip-art icons.
- Not generic. Mermaid output would not feel like this set.

## File conventions

| Filename | Chapter |
|---|---|
| `belt-ladder-hero.svg` | Homepage |
| `5-layer-mental-model.svg` | Prologue §0.3 |
| `9-layer-enablement-stack.svg` | Prologue §0.4 |
| `three-pillars.svg` | G.1 |
| `certification-flow.svg` | Appendix L |
| `design-to-code-pipeline.svg` | G.15 |
| `memory-layers.svg` | B.8 |
| `rfc-state-machine.svg` | C.3 |
| `pre-ship-check-6-layers.svg` | G.26 |

Legacy filenames (`03-mental-model.svg`, `04-enablement-stack.svg`) are kept as redirects via symlink or in-place rewrites so existing chapter references don't break.

## Embedding pattern

```markdown
![Belt ladder](<relative-path-to-repo-root>/diagrams/belt-ladder-hero.svg)
```

The `../` prefix is relative to the **chapter's** location, not this README's, so count the directory depth from the file doing the embedding:

| Chapter depth | Example file | Prefix | Full path |
|---|---|---|---|
| Root | `INDEX.md` | `./` | `./diagrams/belt-ladder-hero.svg` |
| 1 level | `prologue/03-mental-model.md` | `../` | `../diagrams/03-mental-model.svg` |
| 2 levels | `belts/05-council/C03-rfc-pipeline.md` | `../../` | `../../diagrams/rfc-state-machine.svg` |
| 3 levels | `belts/03-green/a-craft/G01-three-pillars.md` | `../../../` | `../../../diagrams/three-pillars.svg` |

The hub generator's `copyAsset` pipeline copies `diagrams/*.svg` to `hub/public/diagrams/` automatically. No extra step needed.

## Maintenance

- Edits to an SVG are direct (no source tool). Open the file, edit the markup, save.
- New diagrams: copy the closest existing SVG as a starting template, replace content, save with a descriptive filename, add to the table above.
- Visual review: open the SVG in a browser locally in both light and dark mode (system setting toggle) before committing.

## Related

- [`excalidraw/README.md`](../excalidraw/README.md) — the hand-drawn companion tier (v0.21b).
- [Starlight docs on assets](https://starlight.astro.build/guides/components/#images) for embedding patterns.
