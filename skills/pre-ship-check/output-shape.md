# pre-ship-check — output shape

> **What this is.** The literal structured shape of the report the skill emits. The SKILL.md applies it; this file is the contract reviewers and downstream tools depend on.

The output is Markdown with a fixed header, six layer sections in order, and a final summary line. The shape is reviewer-friendly first (humans should read it in under two minutes) and machine-parsable second (downstream tools can extract the colour and the findings).

---

## The canonical shape

```markdown
Pre-ship-check report

Branch: <branch-name>
Base: <base-branch>
Run at: <YYYY-MM-DD HH:MM TZ>
Skill version: <version-from-frontmatter>

Layer 1 (Redlines):       <COLOUR> — <one-line summary>
Layer 2 (Design system):  <COLOUR> — <one-line summary>
Layer 3 (Tests):          <COLOUR> — <one-line summary>
Layer 4 (PR craft):       <COLOUR> — <one-line summary>
Layer 5 (Prompt craft):   <COLOUR> — <one-line summary>
Layer 6 (Behaviour):      <COLOUR> — <one-line summary>

[per-layer detail blocks for any layer that is YELLOW or RED]

<final summary line>
```

`<COLOUR>` is one of `GREEN`, `YELLOW`, `RED`. The header line is fixed; the layer rows are always present; the per-layer detail blocks are present only for non-GREEN layers.

---

## Per-layer detail block shape

When a layer is YELLOW or RED, it gets a detail block immediately under the layer-row table:

```markdown
### Layer N (<layer-name>) — <COLOUR>

<one-paragraph rationale: what was checked, what was found, what the
colour means in this context.>

Findings (<count>):

- <file-path>:<line>: <finding-type>
  → <one-line suggested fix>
- <file-path>:<line>: <finding-type>
  → <one-line suggested fix>
- ...
```

The findings list is the actionable output. Each finding has:

- a file path (relative to repo root);
- a line number (or line range, e.g. `47-52`);
- a finding type (a short tag from the layer's check set);
- a one-line suggested fix that names the rule violated and the fix shape.

The skill does not generate code in the suggested fix; it names the rule and the direction.

---

## The final summary line

```markdown
All six layers GREEN — ready for review.
```

or

```markdown
<N> layer(s) flagged: <X> RED, <Y> YELLOW. See findings above.
```

The summary line is the single sentence a reviewer reads first. It tells them whether to review the PR (all-GREEN) or to wait for the builder to address findings (any RED).

---

## Two worked examples

### Example 1 — clean PR

```markdown
Pre-ship-check report

Branch: feat/cart-empty-state
Base: main
Run at: 2026-04-29 14:32 IST
Skill version: 0.12.0

Layer 1 (Redlines):       GREEN — clean
Layer 2 (Design system):  GREEN — uses Blade Button, Stack, Heading
Layer 3 (Tests):          GREEN — Playwright test added at tests/e2e/cart-empty.spec.ts
Layer 4 (PR craft):       GREEN — title, description, ticket, preview URL, test plan all present
Layer 5 (Prompt craft):   GREEN — three-pillar discipline visible in session log
Layer 6 (Behaviour):      GREEN — diff matches description scope

All six layers GREEN — ready for review.
```

### Example 2 — PR with drift

```markdown
Pre-ship-check report

Branch: fix/dashboard-legend
Base: main
Run at: 2026-04-29 14:48 IST
Skill version: 0.12.0

Layer 1 (Redlines):       GREEN — clean
Layer 2 (Design system):  YELLOW — 1 finding (small fix)
Layer 3 (Tests):          RED — 1 finding (must address before merge)
Layer 4 (PR craft):       GREEN — title, description, preview URL all present
Layer 5 (Prompt craft):   GREEN — three-pillar discipline visible
Layer 6 (Behaviour):      GREEN — diff matches description scope

### Layer 2 (Design system) — YELLOW

UI files in the diff use Blade primitives correctly with one
exception: a raw colour value where a token equivalent exists.

Findings (1):

- apps/dashboard/Legend.tsx:47: raw-colour-value
  → Replace `'#0066ff'` with `colors.surface.action.primary.lowContrast` token.

### Layer 3 (Tests) — RED

The change modifies a layout behaviour at small viewports. The test
directory has no Playwright test that exercises this behaviour.

Findings (1):

- apps/dashboard/Legend.tsx:24-58: missing-test-coverage
  → Add a Playwright test for the dashboard's reporting view at
    320px viewport. See G.12 for the spec-then-code loop.

2 layer(s) flagged: 1 RED, 1 YELLOW. See findings above.
```

---

## Why this shape

Three properties matter.

**Property 1 — Reviewer-readable in two minutes.** The header tells the reviewer whether to read the rest. The layer-row table tells them which layers need attention. The detail blocks tell them what to fix.

**Property 2 — Machine-parsable.** Downstream tools (CI bots, dashboards, the certification tracker) can read the colour from the layer-row table and the findings from the detail blocks without parsing free-form prose.

**Property 3 — Stable across runs.** Two runs of the skill on the same branch produce comparable reports. A finding that disappears between runs is a real change, not a phrasing change.

---

## What the shape does NOT do

- It does not include the diff itself. The diff is in the PR; duplicating it is noise.
- It does not include the PR description. The skill checks it (Layer 4) but does not paste it back.
- It does not include code suggestions beyond the one-line "Replace X with Y" pattern. Code generation is the builder's job; the skill names the rule.
- It does not include audit-log details. The proxy's audit log is separate; the skill cites session-log presence at Layer 5 but does not paste log content.

---

## Updating the shape

The shape is the contract. Changing it means changing what reviewers and downstream tools depend on. Two rules:

- additions are safe: a new layer-row, a new field in a finding, a new note line;
- changes to the existing fields are not safe: renaming "Layer 2 (Design system)" to "Layer 2 (UI)" breaks every downstream tool;
- removals are not safe: every consumer relies on the six layers being present.

Bump the skill's version reference in the SKILL.md frontmatter when the shape changes.
