# UI Review — Razorpay AI Playbook Hub

**Audited:** Astro Starlight hub (`hub/`) rendered locally at 1440×900 and 375×812
**Method:** 6-pillar adversarial visual audit, grounded in live screenshots (landing, Green Belt page, Tool Atlas appendix, mobile) + design source (`hub/src/styles/custom.css`, `hub/astro.config.mjs`)
**Date:** 2026-06-30

---

## Overall: 13 / 24

| Pillar | Score | One-line verdict |
|--------|-------|------------------|
| Copywriting | 3/4 | Strong, human, concrete prose — let down only by draft-status markers leaking to readers |
| Visuals | 2/4 | One good hero diagram; everything else is undifferentiated text. "Cards" aren't cards |
| Color | **1/4** | **Single teal accent on monochrome. The belt color system — the program's core idea — is visually absent** |
| Typography | 2/4 | Competent Starlight defaults, weak heading hierarchy, no display personality |
| Spacing | 2/4 | Default rhythm is okay but desktop width is wasted and dense pages don't chunk |
| Experience Design | 3/4 | Solid nav/search/TOC bones; no wayfinding or scannability beyond defaults |

**The headline:** the content is excellent and the theme is stock. The hub is essentially default Astro Starlight with a 34-line CSS file that swaps the accent to teal. "Basic and boring" is an accurate self-diagnosis — and the fix is unusually well-defined because the playbook already ships a latent design system it isn't using: **the belts (White → Yellow → Green → Black → Council)** are a five-color semantic palette begging to drive the entire visual identity.

---

## Pillar 1 — Copywriting — 3/4

**WARNING.** This is the strongest pillar and it's doing real work. CTAs are human and specific ("Start the journey", "Just want the TOC" instead of "Get Started"/"Docs"). The belt one-liners carry voice ("I build with AI daily. I find and fix things in surfaces I care about"). Headings are scannable and outcome-framed ("Day 1 — three steps in this order", "Find your starting point").

Findings:
- **Draft scaffolding is reaching readers.** The Green Belt page opens with `Status: drafted` and `Status: drafted end-to-end` as a visible H2. These are internal authoring markers; on a reader-facing hub they read as "unfinished," undercutting the polished prose. (WARNING)
- **Dense bold-led lead-ins.** The belt-meta block (`Status:` / `Graded artefacts:` / `Promise.` / `Prerequisite.`) is a wall of bold-prefixed paragraphs. The words are good; the format buries them. This is a presentation problem (see Visuals), but the copy could also be tightened into labeled fields.

---

## Pillar 2 — Visuals — 2/4

**WARNING, trending BLOCKER on dense pages.** Exactly one piece of intentional visual design exists: the belt-ladder hero SVG, nicely framed by the one custom rule in `custom.css` (border + soft shadow). Everything else is raw Starlight text.

Findings:
- **"Cards" are not cards.** The Tool Atlas "Tool cards" section and the belt-meta blocks are described as cards but render as repeated bold-led text paragraphs (`Surface area` / `Default context` / `What it can see` / … ×7 fields × 7 tools). With no border, background, or rhythm they blur into one exhausting scroll. This is the single biggest readability drag on long pages. (WARNING)
- **Hero diagram is illegible on mobile.** At 375px the belt-ladder SVG shrinks until its internal labels are unreadable. The one strong visual breaks on the most common viewport. (WARNING)
- **No icon/badge system.** Belts are represented by emoji dots (⚪🟡🟢⚫🔵) inline. There's no reusable badge component, so the belt identity never appears in page headers, sidebar groups, or cross-links where it would aid wayfinding.
- **Tables carry the visual load** because nothing else does — and they're default-styled at 0.92rem, so even the structured content looks flat.

---

## Pillar 3 — Color — 1/4

**BLOCKER. This is the root cause of "boring."** The palette is black text on white with a single teal accent (`--sl-color-accent: #0f766e`). Effective distribution is roughly 95% neutral / 5% accent — far from any intentional 60/30/10. There is no semantic color anywhere.

Findings:
- **The Green Belt page has nothing green on it.** A page whose entire identity is a color renders in monochrome + teal. Same for White, Yellow, Black, Council. The reader gets zero color reinforcement of which belt they're in. (BLOCKER)
- **A complete palette is sitting unused.** The belts map to an obvious, professional five-stop scale: White → slate/grey, Yellow → amber (`#F59E0B`, already used in diagrams), Green → emerald (`#10B981`), Black → near-black/graphite, Council → violet. The diagrams already use these colors; the site chrome ignores them.
- **No functional color.** Tips, warnings, and the "redlines" safety content all render as identical grey blockquotes. There is no green/amber/red semantic layer for guidance vs. caution vs. prohibition — a real miss for a playbook whose whole point includes guardrails.

---

## Pillar 4 — Typography — 2/4

**WARNING.** Inter at Starlight's default scale. Readability of body text is fine (52rem measure is a sensible choice). But there's no typographic point of view.

Findings:
- **Weak hierarchy contrast.** H2 and H3 are close enough in weight/size that on long pages (Tool Atlas, belt pages) the structure flattens — you can't triage the page by glancing at headings. (WARNING)
- **No display treatment.** Page titles ("Green Belt", "Razorpay AI Playbook") use the same family/weight as everything else. A program with this much personality deserves a display weight or tracking treatment for titles and belt names.
- **Cramped tables.** `table { font-size: 0.92rem }` shrinks the most information-dense element on the page, making the Pillar/Time tables harder to scan, not easier.

---

## Pillar 5 — Spacing — 2/4

**WARNING.** Starlight's vertical rhythm is inherited and mostly acceptable, but there are concrete defects and a large missed opportunity.

Findings:
- **Oversized dead gap on the landing.** Between the CTA row and "Day 1 — three steps" there's a ~150px empty band with no divider or purpose — it reads as a layout bug, not breathing room. (WARNING)
- **Desktop width is wasted.** At 1440px the content sits in a 52rem column with the entire right half empty and unused. Index/landing sections that are just link lists (Appendices, "The full curriculum") could be a multi-column card grid that uses the space and improves scannability. (WARNING)
- **Dense pages don't chunk.** The repeated tool/belt blocks share uniform spacing with no separators, so there's no visual "these are peer units" signal. Chunking (cards, rules, or alternating background) would cut perceived length dramatically.

---

## Pillar 6 — Experience Design — 3/4

**WARNING.** The Starlight bones are genuinely good and shouldn't be thrown away: left-sidebar IA, right-hand "On this page" TOC, working search (⌘K), prev/next pager, last-updated, responsive collapse. The belt-ladder hero is a strong orientation device.

Findings:
- **No wayfinding beyond the diagram.** Once you're inside a belt, nothing tells you which belt you're in or how far along the ladder you are — the sections are visually identical. Belt-themed chrome (see Color) plus a persistent belt badge in the header would fix this cheaply. (WARNING)
- **Long pages have no scannability aids.** No callouts/asides for tips vs. warnings vs. redlines; no collapsible `<details>` for the very long tool cards. The reader either reads everything or nothing. (WARNING)
- **First impression is "default docs."** The splash is a normal doc page with a big title and two buttons, not a designed hero. For an "operating manual for AI-native builders," the front door undersells the content behind it.

---

## Top fixes (ranked)

1. **Adopt the belt spectrum as the site's semantic palette.** (fixes Color 1→3+, and most of "boring") Theme each belt section by its color — sidebar group accent, a page-header band/badge, and the link/accent color within belt pages. White=slate, Yellow=amber, Green=emerald, Black=graphite, Council=violet. The diagrams already use these; make the chrome match. This one move reinforces the program's core mental model *and* kills the monochrome flatness. **(BLOCKER)**

2. **Make "cards" actually cards, and add functional callouts.** (fixes Visuals + Spacing on dense pages) Wrap the repeated tool/belt-meta blocks in a real card component (border, padding, colored left rule by category), and introduce green/amber/red asides for tips / cautions / redlines instead of identical grey blockquotes. Collapse the longest tool cards behind `<details>`. **(WARNING)**

3. **Give the hub a typographic + spacing point of view.** (fixes Typography + Spacing) A display weight for page titles and belt names, stronger H2/H3 contrast, body-size (not 0.92rem) tables, a consistent vertical scale, and a real layout for index/landing sections (card grid that uses the wasted desktop width). Close the landing's CTA→Day-1 gap. **(WARNING)**

4. **Fix the hero belt-ladder SVG on mobile.** (fixes Visuals) It's unreadable at 375px. Ship a mobile-optimized variant or make label text scale, since this is the primary orientation graphic and mobile is a primary viewport. **(WARNING)**

5. **Design the front door.** (fixes Experience Design) Turn the splash into an actual hero — belt-spectrum band, the ladder diagram, the two CTAs, a one-line promise — so the first impression matches the quality of the writing. **(WARNING)**

6. **Stop leaking draft-status markers to readers** (`Status: drafted`, `[drafted skeleton]`) — either strip them from reader-facing render or convert to a subtle "in progress" pill. **(WARNING)**

---

## Notes

- The content layer is not the problem and should not be rewritten. Every fix above lives in `hub/src/styles/custom.css`, a small number of Starlight component overrides (`hub/src/components/`), and optionally the doc-generation step that emits belt frontmatter. This is a theming pass, not a content pass.
- Highest leverage by far is fix #1 (belt palette). It's the difference between "default docs site" and "the Razorpay AI Playbook," and it's directly enabled by structure the project already has.
