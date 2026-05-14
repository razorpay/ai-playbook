# pre-ship-check — layer specifications

> **What this is.** The per-layer policy specifications for the `pre-ship-check` skill. The SKILL.md applies these specs; updating policy means editing this file.

The skill runs six layers against a branch's diff. Each layer has a defined scope, a defined check set, a defined output, and defined GREEN / YELLOW / RED criteria. This file is the canonical contract.

---

## Layer 1 — Redlines

**Scope.** The diff against the base branch.

**Checks.**

- Token-shaped strings near `Bearer`, `key=`, `password=`, `token=`, `secret=`, or any environment-variable assignment that looks like it carries a credential.
- Money-handling identifier patterns: live transaction IDs, payment instrument identifiers, internal ledger references.
- Raw customer PII patterns: emails, phone numbers, government IDs, postal addresses, biometrics.
- Regulator-protected fields: card data (PAN, CVV, expiry), KYC document references, region-specific PII fields.

The patterns the skill scans for are listed in `redline-patterns.md`. That file cross-references Appendix H — Reference Cards as the canonical policy source.

**Output.** A list of findings, each with file path, line number, the matched pattern category, and the matched substring (redacted to a shape, not a literal value).

**GREEN.** Zero findings.
**YELLOW.** Findings that look like a placeholder or synthetic value but match a redline shape; reviewer should confirm.
**RED.** Findings that match a real-shape credential, identifier, or regulator-protected field.

---

## Layer 2 — Design system

**Scope.** UI files in the diff. The skill identifies UI files by extension (`.tsx`, `.jsx`, `.vue`, `.svelte`) and by directory pattern (a path containing `components/`, `views/`, `pages/`, `routes/`, or `ui/`).

**Checks.**

- Raw colour values that have token equivalents (any literal hex, rgb, or named-colour value where a Blade colour token exists).
- Raw spacing values that have token equivalents (any literal padding, margin, gap value where a Blade spacing token exists).
- Ad-hoc components shaped like Blade primitives: a `<div>` styled like a Button, a `<div>` styled like a Card, a `<button>` styled outside the Blade Button variants.
- Reinvented patterns: Modal, Tabs, Accordion, Form patterns built from primitives instead of using the Blade pattern primitive.
- Missing accessibility attributes on interactive elements (a clickable `<div>` without role/tabIndex/onKeyDown).

**Output.** Per-file findings with line references and a one-line suggested fix per finding.

**GREEN.** UI files use Blade primitives, tokens, and variants throughout.
**YELLOW.** Small drift (one raw value where a token exists, one ad-hoc layout pattern). Fixable in minutes.
**RED.** A custom Button-shaped component, a Modal reinvented, or accessibility behaviour stripped from an interactive element.

The layer cross-references G.16 (Blade deep dive) for primitive vocabulary and G.17 (production-compiler) for the bulk-repair fallback.

---

## Layer 3 — Tests

**Scope.** The changed code in the diff and the test directory of the repo (`tests/`, `__tests__/`, or whatever the repo's convention is).

**Checks.**

- New behaviour shipped without a corresponding test (a new exported function, a new component, a new route handler, with no test file referencing it).
- New UI files without a Playwright test for the changed visual behaviour.
- Test assertions that were strengthened to weakened (`expect(x).toBe(true)` → `expect(x).toBeTruthy()`) without a justification.
- Snapshot tests that absorbed unexpected changes (a snapshot updated in the diff with no explanatory comment or test description change).

**Output.** Per-file findings naming the missing or weakened test.

**GREEN.** Test coverage exists for changed behaviour; no weakened assertions; no silently-updated snapshots.
**YELLOW.** A weakened assertion with a written justification, or a snapshot updated alongside an explanatory test description.
**RED.** Missing test coverage; weakened assertion without justification; silently-updated snapshot.

The layer cross-references G.12 / G.13 / G.14 (Playwright + Claude Code, the Playwright Skill pattern, seed.spec.ts).

---

## Layer 4 — PR craft

**Scope.** The PR description and metadata (title, description, ticket reference if any, preview URL if any).

**Checks.**

- PR title shape: names the change at the right altitude (not "fix bug"; not a 200-character description).
- PR description: names what the change does, why it does it, and how to verify.
- Ticket reference: a link to the source ticket if one applies to the team's convention.
- Preview URL: present if the change is UI-shaped (per G.19).
- Test plan: a brief reviewer-facing test plan (what to check, at what viewport, etc.).

**Output.** A list of missing or thin sections.

**GREEN.** Title, description, ticket reference (if applicable), preview URL (if applicable), and test plan all present.
**YELLOW.** One section missing or thin; small fix.
**RED.** Multiple sections missing; the PR is not reviewer-ready.

The layer cross-references Y.13 (PR craft) and any team-specific PR-craft skill.

---

## Layer 5 — Prompt craft

**Scope.** The prompt-craft trace from the program-pinned plugin's session log (when available).

**Checks.**

- Three-pillar discipline visible across the session (per G.1): named goal, named constraints, named success criteria.
- The agent invoked the skills the change required (e.g., production-compiler for inherited drift, design-intel for design-to-code work).
- The builder pushed back when the agent was confidently wrong (per G.21), where the session log shows that pattern.
- The session ran through the program's approved tooling (Claude Code with the program-pinned plugin loaded).

**Output.** A structured assessment naming the visible patterns and any gaps.

**GREEN.** Three-pillar discipline visible; appropriate skills invoked; pushback patterns where applicable.
**YELLOW.** Partial visibility (e.g., session log incomplete or three-pillar discipline only partial).
**RED.** No prompt-craft trace available, or a trace that shows the change was built outside approved tooling.

This is the Green-Belt-distinct layer. It is harder to fully automate; the skill summarises what is verifiable and flags ambiguity for the reviewer's attention. The boss fight teammate sign-off explicitly references this layer.

---

## Layer 6 — Behaviour preservation

**Scope.** The diff cross-checked against the PR description.

**Checks.**

- The diff's surface area matches the description's named scope. A "small fix" PR that touches three unrelated modules is flagged.
- Behaviour-changing code outside the description's scope (a refactor of a separate module, a config change unrelated to the named feature) is flagged.
- API or schema changes not named in the description are flagged.

**Output.** Findings naming the file and the unstated behaviour change.

**GREEN.** Diff matches description scope.
**YELLOW.** Small unrelated change with a clear non-disruptive purpose (e.g., a one-line typo fix in a neighbouring module). Acceptable with a PR-description note.
**RED.** Material unrelated changes that lose reviewer signal.

The layer is the program's defence against scope-creep PRs.

---

## Cross-layer rules

- The skill never auto-fixes any finding.
- The skill never weakens a layer's standard to make a PR pass.
- The skill never silently rewrites a PR description.
- The skill emits the report in the canonical structured shape from `output-shape.md`.
- A YELLOW with an explicit PR-description note is acceptable; an unaddressed YELLOW is not.
- A single RED at any layer blocks the PR.

---

## Updating policy

When policy changes (a new redline category, a new Blade primitive, a new test convention, a new PR-craft expectation):

1. Edit this file.
2. Run the test-cases (`test-cases.md`) to confirm the change does not regress existing scenarios.
3. Bump the skill's version reference in the SKILL.md description.
4. Note the policy change in `appendices/L-certification/README.md` calibration retro if it affects the bar.

The SKILL.md body is intentionally thin and cites this file; do not duplicate policy detail in the SKILL.md.
