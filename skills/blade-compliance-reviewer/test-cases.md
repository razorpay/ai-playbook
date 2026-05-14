# blade-compliance-reviewer — test cases

> **What this is.** Acceptance scenarios the skill must pass before any release. Three scenarios plus a lint sweep.

---

## Test 1 — Clean file

**Setup.** A real, small UI file that uses Blade primitives, tokens, and variants throughout. Example shape:

```tsx
import { Box, Button, Heading, Text, Stack } from '@razorpay/blade/components';

export function EmptyState() {
  return (
    <Box padding="spacing.6">
      <Stack gap="spacing.4">
        <Heading level={2}>Your cart is empty</Heading>
        <Text variant="body">Browse our catalogue to start shopping.</Text>
        <Button variant="primary" size="medium">Browse</Button>
      </Stack>
    </Box>
  );
}
```

**Phrase.** `run blade-compliance on apps/example/EmptyState.tsx`

**Expected behaviour.**

- Skill loads the file, identifies it as a UI file, loads the Blade connector.
- Scans across the five finding categories.
- Emits a "Clean" report: zero findings, summary line "Clean — no design-system drift found in this file."

**Acceptance.** Zero findings; Blade-version stamp present; report shape matches the canonical.

---

## Test 2 — File with drift

**Setup.** A UI file with five intentional drifts:

- Line 12: `padding: '16px'` (raw spacing where `spacing.3` token exists);
- Line 18: `<h2 className="cart-empty-h2">` (custom heading instead of Blade `Heading`);
- Line 24: `color: '#0066ff'` (raw colour where `colors.surface.action.primary.lowContrast` token exists);
- Line 47: `<div onClick={...}>` styled like a button (ad-hoc component);
- Line 89: a stripped `role` attribute on a clickable element.

**Phrase.** `run blade-compliance on apps/example/DriftExample.tsx`

**Expected behaviour.**

- Skill emits a report with five findings, one per drift.
- Each finding cites the line, the drift type, and a one-line suggested fix referencing a real Blade primitive or token.
- Summary line: "5 findings: 4 RED (drift to fix), 1 YELLOW (minor)."

**Acceptance.** All five drifts are caught; each suggested fix names the right Blade primitive or token; the accessibility-attribute drift on line 89 is treated as a finding (not a stylistic note).

---

## Test 3 — Mixed file

**Setup.** A UI file that uses Blade primitives correctly for most of its content but has two drifts: one ad-hoc component (a custom `<div>` styled like a Card) and one raw colour value where a token exists. Otherwise clean.

**Phrase.** `run blade-compliance on apps/example/MixedExample.tsx`

**Expected behaviour.**

- Skill emits a report with two findings.
- The findings are precise (line numbers correct; drift types named).
- The report does not flag the correctly-used Blade primitives elsewhere in the file.
- Summary line: "2 findings: 1 RED, 1 YELLOW."

**Acceptance.** Only the two real drifts surface; the rest of the file is correctly identified as clean.

---

## Test 4 — Non-UI file

**Setup.** A service file (`apps/example/services/payments.ts`) — not a UI file.

**Phrase.** `run blade-compliance on apps/example/services/payments.ts`

**Expected behaviour.**

- Skill identifies the file as non-UI and stops.
- Report reads "not a UI file; this skill scans only UI files."

**Acceptance.** Skill does not run a misleading scan on a non-UI file.

---

## Test 5 — Lint sweep

**Setup.** Run on the skill directory after any change.

**Command.**

```sh
grep -nE "Nawal|Khilan|Abhinav|Vaibhav|FSB-1|FSB-2|FSB-3|FSB-Transformation" \
  skills/blade-compliance-reviewer/*.md ; echo "exit=$?"
```

**Expected behaviour.** Exit non-zero (no matches).

**Acceptance.** Lint exits clean.

---

## What is intentionally not tested

- **Blade-version drift.** If the connector serves an older Blade version, the scan reports against that older version. The version stamp in the report makes this visible; the test cases do not enumerate every version-specific edge case.
- **Cross-language coverage.** v0.12 ships against TypeScript / React / Vue / Svelte UI files. Other UI stacks may need additions to the SKILL.md Workflow.
- **Auto-fix capability.** The skill never auto-fixes; this is a hard rule, not a test gap.
- **Production-compiler integration.** The skill does not invoke the production-compiler; a builder who wants bulk repair runs the production-compiler separately (G.17).

---

## Failure-log shape

Same as `skills/pre-ship-check/test-cases.md`. Capture symptom, expected, actual, likely cause, fix. Keep the log; the failures are useful data.
