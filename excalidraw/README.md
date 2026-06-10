# Excalidraw companion illustrations

> **What this directory is.** The *Tier-2* visual layer of the playbook — hand-drawn-style illustrations for chapters where the diagram is doing narrative work (walkthroughs, before/after, anti-patterns, journeys) rather than reference work. The polished SVGs in `diagrams/` are Tier 1.
>
> **What it is not.** The signature reference diagrams (belt ladder, mental models, state machines) — those live in `diagrams/` with a tightly designed identity.

## The two tiers

| Tier | Location | Aesthetic | Used for |
|---|---|---|---|
| Tier 1 — signature | `diagrams/*.svg` | Polished, theme-aware, professional | Identity, reference, recurring concepts |
| Tier 2 — companion | `excalidraw/*.svg` | Hand-drawn, warm, "let me show you" | Narrative, walkthrough, illustration of a moment |

A reader who sees both knows immediately which is which. The contrast is the point.

## The seven illustrations

| File | Chapter | Job |
|---|---|---|
| `origin-story-bd1-vs-bd2.svg` | Prologue §0.2 | Before/after of Builder Day 1 vs Builder Day 2 |
| `boss-fight-bb-month-timeline.svg` | Boss Fight B-B | Phase-by-phase month timeline |
| `office-hours-60-minute-session.svg` | B.12 | Shape of a 60-minute office hours |
| `embedded-sprint-one-week.svg` | B.13 | Monday-through-Friday embedded week |
| `inbox-triage-before-after.svg` | Ops 101 §0B.3 | Before/after of a triaged inbox |
| `white-belt-turn-green-journey.svg` | White Belt Quest W-0 | First-time setup map with detours |
| `rfc-anti-patterns.svg` | B.14 | 2×2 grid of bad-RFC anti-patterns |

## How these were produced (v0.21b)

Two paths existed in the v0.21b plan: (a) hand-drawn in Excalidraw by the user, or (b) script-generated hand-drawn-style SVGs from `scripts/generate-handdrawn-svg.py`. The initial commit used Path B so the illustrations could ship inline with the v0.21 diagrams pass.

The script lives in `scripts/generate-handdrawn-svg.py`. It produces SVGs with rough.js-inspired perturbations: wobbly lines, sketchy rectangles, slight stroke variation, hand-lettered captions. The aesthetic approximates an Excalidraw sketch without being one.

**To replace with real Excalidraw drawings later.** Open [excalidraw.com](https://excalidraw.com), draw the illustration following the spec in `V0.21B-EXCALIDRAW-PLAN.md`, export as SVG and save the `.excalidraw` JSON source. Commit both to this directory with the same base filename. The chapter markdown references the `.svg` path; switching to a real Excalidraw sketch is a single file replacement.

## Embedding pattern

```markdown
![Boss Fight B-B month timeline](<relative-path-to-repo-root>/excalidraw/boss-fight-bb-month-timeline.svg)
```

The `../` prefix is relative to the **chapter's** location, not this README's, so count the directory depth from the file doing the embedding:

| Chapter depth | Example file | Prefix | Full path |
|---|---|---|---|
| 1 level | `prologue/02-bd1-bd2-origin.md` | `../` | `../excalidraw/origin-story-bd1-vs-bd2.svg` |
| 2 levels | `belts/01-white/quest-W0-turn-green.md` | `../../` | `../../excalidraw/white-belt-turn-green-journey.svg` |
| 3 levels | `belts/04-black/c-org/boss-fight-BB-pod-ai-uplift.md` | `../../../` | `../../../excalidraw/boss-fight-bb-month-timeline.svg` |

The hub generator's `copyAsset` pipeline copies `excalidraw/*.svg` to `hub/public/excalidraw/` automatically (the same path it uses for `diagrams/`).

## File conventions

- `<diagram-name>.svg` — rendered output, the file Markdown references.
- `<diagram-name>.excalidraw` — JSON source if drawn in Excalidraw (not present for Path-B generated files).
- `<diagram-name>-dark.svg` — optional dark-mode variant (not produced by Path B; reserved for the Path-A re-cut).

For Path B variants the SVG uses CSS-variable colours so it themes via `prefers-color-scheme` in the page. Path-A re-cuts may produce a dedicated dark variant via Excalidraw's Theme→Dark export and a `<picture>` block in the chapter.

## Aesthetic guidelines

If you re-author any of these in real Excalidraw, follow these notes so the seven feel coherent:

- **Line weight.** Medium. Excalidraw's default works.
- **Fill style.** Hachure (cross-hatched) sparingly; mostly empty fills.
- **Typography.** Hand-drawn font (Excalidraw default Cascadia or Virgil).
- **Palette.** Two or three colours per diagram, drawn from the playbook's identity (`#F59E0B` amber, `#10B981` emerald, `#1F2937` slate, `#EF4444` red). Never the full rainbow.
- **Composition.** Wider than tall. Generous whitespace. Labels short.
- **Voice.** Warm, slightly playful in caption text. Empathetic when illustrating struggle.

## Related

- [`../diagrams/README.md`](../diagrams/README.md) — the Tier-1 design language.
- [`../V0.21B-EXCALIDRAW-PLAN.md`](../V0.21B-EXCALIDRAW-PLAN.md) — the full plan and per-diagram specs.
