# production-compiler test cases

Acceptance scenarios the skill must pass before shipping a new version.

---

## T1: Raw Tailwind input, clean translation

**Setup.** Raw AI-generated JSX using common Tailwind layout (`flex flex-col gap-4`, `p-6`, `bg-green-600`), common HTML primitives (`<button>`, `<h1>`, `<div>`), and no unusual patterns.

**Invocation.** "Compile this to Blade: <input>"

**Expected behaviour.**
- Layer 1 substitutes HTML primitives for Blade primitives per the rules in `translation-rules.md`.
- Layer 2 applies Blade tokens for spacing, colour, and typography.
- Layer 3 verifies accessibility checks pass.
- Output: Blade JSX + translation log + (empty) manual review section.

**Falsifier.** The output still contains raw Tailwind classes, raw colour values, or raw HTML primitives. Or the translation log is missing.

---

## T2: design-intel input, skeleton mode

**Setup.** A valid design-intel document from the `design-intel` skill, with no Open questions blocking. No raw code provided.

**Invocation.** "Build a Blade skeleton from this design-intel: <document>"

**Expected behaviour.**
- The skill reads the design-intel sections.
- Output is a Blade-using skeleton with the components named in design-intel.
- The translation log notes that the skill generated the skeleton from intent (no raw code to translate).
- The "Manual review needed" section flags anything design-intel surfaced as ambiguous.

**Falsifier.** The skill fails to generate a skeleton, generates code that does not match the design-intel components, or ignores the Open questions section.

---

## T3: Both inputs (raw code + design-intel)

**Setup.** Both raw AI-generated code and a design-intel document for the same component.

**Invocation.** "Take this raw code and this design-intel, produce Blade JSX: <both>"

**Expected behaviour.**
- The design-intel guides the substitution choices (e.g., when raw code uses an ambiguous primitive, the intel disambiguates).
- The raw code provides the implementation skeleton.
- The output reflects both inputs.
- The translation log notes which choices the intel disambiguated.

**Falsifier.** The skill ignores one input, or produces output that contradicts the intel.

---

## T4: Refusal — no input

**Setup.** The user invokes the skill without providing input.

**Invocation.** "Compile to Blade."

**Expected behaviour.**
- The skill refuses: "production-compiler needs raw code, a design-intel document, or both. Please provide one and re-invoke."
- The skill does not produce output from no input.

**Falsifier.** The skill produces UI from a prompt alone (that is a different workflow, not what this skill does).

---

## T5: Refusal — design-intel has blocking Open questions

**Setup.** A design-intel document where the Open questions section contains items that block translation (destinations of links, conditional rendering rules).

**Invocation.** "Compile this design-intel to Blade: <document>"

**Expected behaviour.**
- The skill detects blocking Open questions.
- The skill refuses: "The design-intel has blocking Open questions. Resolve them with the designer or the engineer who has the context, then re-invoke."
- The skill names the specific questions in its refusal.

**Falsifier.** The skill proceeds with blocking questions unresolved, producing code with incorrect assumptions.

---

## T6: Refusal — input too large

**Setup.** Raw AI-generated code exceeding ~500 lines.

**Invocation.** "Compile this to Blade: <very large input>"

**Expected behaviour.**
- The skill detects the size.
- The skill refuses: "The input exceeds the reliable translation size. Split into smaller components (one per file or one per logical unit) and translate each."
- The skill optionally suggests where the natural component boundaries are in the input.

**Falsifier.** The skill produces a translation that is incomplete, partially correct, or that silently drops portions of the input.

---

## T7: Refusal — sensitive content

**Setup.** Raw input or design-intel containing regulator-protected data (real customer info, real PAN-like strings, real secrets).

**Invocation.** "Compile this to Blade: <input with sensitive data>"

**Expected behaviour.**
- The skill detects the sensitive content.
- The skill refuses: "The input contains content that looks like regulator-protected data. Replace with fixtures, then re-invoke."
- The skill does not include the sensitive content in any output.

**Falsifier.** The output contains the sensitive content, or it surfaces the content as a "is this real" prompt that risks acting on it.

---

## T8: Refusal — user asks to bypass accessibility

**Setup.** Any input with potential accessibility issues.

**Invocation.** "Compile this to Blade but skip the accessibility checks."

**Expected behaviour.**
- The skill refuses the bypass: "Accessibility verification is non-negotiable for shipped Blade code. Continuing with the standard three-layer flow."
- The skill runs Layer 3 normally.

**Falsifier.** The skill skips Layer 3 or produces output that fails accessibility checks without flagging them.

---

## T9: Custom Tailwind values flagged as deviations

**Setup.** Raw input using custom Tailwind values that do not map exactly to Blade tokens (`gap-[14px]`, custom colours, custom spacing).

**Invocation.** "Compile this to Blade: <input with custom values>"

**Expected behaviour.**
- The compiler chooses the closest Blade token.
- The translation log records each choice.
- The "Manual review needed" section names each deviation explicitly, with the original value and the chosen token, so the engineer can verify or override.

**Falsifier.** The skill silently substitutes tokens without flagging deviations, or it preserves raw values in the Blade output.

---

## T10: Heading hierarchy correction

**Setup.** Raw input where the heading hierarchy is broken (a `<h3>` appears without a preceding `<h2>`).

**Invocation.** "Compile this to Blade: <input>"

**Expected behaviour.**
- The compiler detects the broken hierarchy in Layer 3.
- The compiler either fixes it inline (when the fix is unambiguous, e.g., promoting the `<h3>` to `<h2>`) or flags it in "Manual review needed".
- The output's heading hierarchy is valid.

**Falsifier.** The output preserves the broken hierarchy without flagging it.

---

## T11: Output consumability — blade-compliance-reviewer can verify it

**Setup.** Any successful production-compiler run.

**Invocation.** Pass the output JSX to the `blade-compliance-reviewer` skill.

**Expected behaviour.**
- The reviewer reads the JSX without errors.
- The reviewer's accessibility checks pass (because Layer 3 already ran).
- The reviewer's Blade-compliance checks pass (because Layers 1 and 2 produced compliant output).

**Falsifier.** The reviewer flags the production-compiler's output as non-compliant. If this happens, the rule sets in both skills need to be reconciled.

---

## T12: Iteration after manual review

**Setup.** A previous production-compiler run produced output with "Manual review needed" items. The engineer has edited the JSX manually to address them.

**Invocation.** "Re-verify this Blade JSX: <edited output>"

**Expected behaviour.**
- The skill recognises this is a re-verify, not a fresh compile.
- The skill runs only Layer 3 (accessibility verification) on the edited JSX.
- The output is a verification report, not a new translation.

**Falsifier.** The skill re-translates from scratch, losing the engineer's edits.

---

*Last updated: 2026-05-08.*
