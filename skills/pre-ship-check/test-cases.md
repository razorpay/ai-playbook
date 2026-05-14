# pre-ship-check — test cases

> **What this is.** Acceptance scenarios the skill must pass before any release. Five scenarios, each grounded in the layer-specs. Pass means "no regression"; it does not mean "great." A first real-cohort walkthrough is the real test.

---

## How to run these

Manual, for v0.12. Each test sets up a stub branch, invokes the skill via a trigger phrase, and checks the output against the expected shape and the expected colour pattern.

The maintainer keeps a markdown log of each run in `test-runs/<date>.md` — not committed; ephemeral, local.

---

## Test 1 — Clean PR

**Setup.** A branch with a small feature change: a new component using Blade primitives correctly, a Playwright test for the new behaviour, a clean PR description with title, what / why / test plan, and a preview URL placeholder. CLAUDE.md unchanged. No redline-shaped values in the diff.

**Phrase.** `run pre-ship-check on this branch`

**Expected behaviour.**

- Skill loads the inputs without complaining.
- Runs all six layers.
- Emits the report in the canonical shape.
- All six layers report GREEN.
- Final summary line reads "All six layers GREEN — ready for review."

**Acceptance.** Layer-row table is present and complete; six rows, each GREEN; no detail blocks; summary line is the all-GREEN form.

---

## Test 2 — PR with redline flag

**Setup.** A branch with a small backend change. The diff includes one line that pastes a token-shaped value into a debug log: `console.log("Bearer abc123def456ghi789...")`. Otherwise clean.

**Phrase.** `run pre-ship-check on this branch`

**Expected behaviour.**

- Layer 1 reports RED with one finding.
- The finding cites the file path, line number, and pattern category (`bearer-token-shape`).
- The finding's suggested fix names the redline rule and routes to Appendix H.
- The matched value is redacted in the report (shape-only; no literal token leaked).
- Other layers report GREEN.
- Summary line: "1 layer(s) flagged: 1 RED, 0 YELLOW. See findings above."

**Acceptance.** Layer 1 RED with redacted finding; the literal token is not in the report; the summary line correctly counts.

---

## Test 3 — PR missing tests

**Setup.** A branch that adds a new exported function in a service file. No corresponding test file. PR description names the function. Otherwise clean (no redlines, no design-system drift, valid PR craft, clean session log, diff matches description).

**Phrase.** `run pre-ship-check on this branch`

**Expected behaviour.**

- Layer 3 reports RED with one finding: "missing-test-coverage" for the new function.
- The finding cites the file path, the function name, and a one-line suggested fix referencing G.12.
- Other layers report GREEN.
- Summary line: "1 layer(s) flagged: 1 RED, 0 YELLOW."

**Acceptance.** Layer 3 RED on missing coverage; the suggested fix names the right reference (G.12 Playwright + Claude Code or equivalent).

---

## Test 4 — Scope-creep PR

**Setup.** A branch whose PR description names "fix legend overlap on dashboard at small viewports" but the diff also touches an unrelated billing module (a refactor). The unrelated change has no description-level mention.

**Phrase.** `run pre-ship-check on this branch`

**Expected behaviour.**

- Layer 6 reports RED with one finding: "unstated-behaviour-change" naming the billing module path.
- The finding cites the file path and a one-line suggested fix: split into two PRs, or update the description to name the unrelated change.
- Other layers report GREEN or YELLOW depending on the actual code.

**Acceptance.** Layer 6 RED with the scope-creep file correctly identified.

---

## Test 5 — PR with stale CLAUDE.md

**Setup.** A branch that introduces a new convention (e.g., a new test pattern, a new component shape) but does not update the team's CLAUDE.md to reflect it. PR description names the change. Otherwise clean.

**Phrase.** `run pre-ship-check on this branch`

**Expected behaviour.**

- Layer 5 (prompt craft) flags YELLOW with a finding: "convention-introduced-without-CLAUDE.md-update".
- The finding cites the new convention's location and suggests adding a one-line note to the team's CLAUDE.md.
- Other layers report GREEN.
- Summary line: "1 layer(s) flagged: 0 RED, 1 YELLOW."

**Acceptance.** Layer 5 YELLOW with a constructive suggestion that does not block the PR.

---

## Test 6 — Lint sweep

**Setup.** Run on the skill directory after any change.

**Command.**

```sh
grep -nE "Nawal|Khilan|Abhinav|Vaibhav|FSB-1|FSB-2|FSB-3|FSB-Transformation" \
  skills/pre-ship-check/*.md ; echo "exit=$?"
```

**Expected behaviour.**

- Exit status is non-zero (no matches). The skill files contain none of the canonical forbidden tokens.

**Acceptance.** Lint exits clean. Any failure blocks the release.

---

## What is intentionally not tested

- **Real-cohort UX.** A first real-cohort run belongs in the Appendix L calibration retro after a Boss Fight G-B has been run with the skill end-to-end.
- **Performance.** Skill latency on a large diff is dominated by the diff itself, not the skill logic. Not a v0.12 concern.
- **Cross-language coverage.** v0.12 ships against the program's primary stack (TypeScript / React / Node + Python). Other languages may need pattern additions to `layer-specs.md`.
- **Auto-fixes.** The skill never auto-fixes; this is a hard rule, not a test gap.

---

## Failure-log shape

When a test fails, capture in this shape:

```markdown
### Test <N> — <name>
- **Run date.** <YYYY-MM-DD>
- **Symptom.** <one sentence>
- **Expected.** <one sentence>
- **Actual.** <one sentence>
- **Likely cause.** <skill behaviour, layer-spec drift, redline-pattern gap, environment>
- **Fix or follow-up.** <link to PR or note>
```

Failures are interesting data. Resist the urge to delete them after the fix lands.
