# setup-verify test cases

Acceptance scenarios the skill must pass before shipping a new version. The scenarios cover the three overall states (GREEN / YELLOW / RED), the single-check mode, and the refusal cases.

Each scenario has: a setup (what the environment looks like), an invocation (what the user asks), the expected behaviour, and what would falsify the test.

---

## T1: All-green environment

**Setup.** A freshly run setup script on a Razorpay-issued laptop with corp SSO, the Compass plugin pinned version, all ten checks passing.

**Invocation.** "Run setup-verify."

**Expected behaviour.**
- The skill runs all ten checks.
- The output matches the GREEN worked example in `output-shape.md`.
- The overall line reads "Overall: GREEN — All 10 checks passed. Quest W-0 is claimable."
- No fix is suggested in the "What to fix first" section.

**Falsifier.** The skill reports YELLOW or RED on any check in this setup, or it modifies the environment, or the output deviates from the worked example shape.

---

## T2: All-green except internal npm registry fallback (YELLOW)

**Setup.** Same as T1 but with `pnpm config get registry` returning the internal URL, and a probe install of `@razorpay/<scoped-package>` falling back to the public registry.

**Invocation.** "Run setup-verify."

**Expected behaviour.**
- The skill runs all ten checks.
- Check 3 returns YELLOW with the specific signal that the scoped-package install fell back.
- Overall is YELLOW.
- The "What to fix first" section names Check 3 with the one-line fix `pnpm config set @razorpay:registry <internal-url>`.

**Falsifier.** Check 3 returns GREEN or RED instead of YELLOW, the signal does not name the scoped-package fallback, or the fix does not match `one-line-fixes.md`.

---

## T3: Claude Code unauthenticated (RED)

**Setup.** Same as T1 but with `claude auth status --text` returning "not authenticated".

**Invocation.** "Am I set up correctly?"

**Expected behaviour.**
- The skill runs all ten checks.
- Check 2 returns RED with the specific signal "Claude Code is installed but not authenticated".
- Overall is RED.
- The "What to fix first" section names Check 2 with the one-line fix `claude auth login --sso`.
- The header line says "Overall: RED — Quest W-0 is not yet claimable. 1 blocker to resolve."

**Falsifier.** Check 2 returns YELLOW instead of RED, or the overall line does not flag W-0 as blocked, or the fix is for a different check.

---

## T4: Compass plugin missing entirely (RED)

**Setup.** Same as T1 but with the Compass plugin not installed; `claude plugin list` returns no Compass entry.

**Invocation.** "What colour am I?"

**Expected behaviour.**
- Check 7 returns RED with the signal "Compass plugin not installed".
- Overall is RED.
- The fix is the canonical install command `claude plugin install <program-pinned-compass-url>` with a pointer to W.7 for the URL.

**Falsifier.** Check 7 returns YELLOW (a missing plugin is RED, not YELLOW), or the fix does not point at the pinned distribution.

---

## T5: Single-check mode

**Setup.** Any environment state.

**Invocation.** "Re-run check 7."

**Expected behaviour.**
- The skill runs only Check 7.
- The output is a single-row table or a single-paragraph result, not the full ten-row table.
- The header indicates this is a single-check re-verify, not a full run.
- The "What to fix first" section is omitted when the single check is GREEN; included when YELLOW or RED.

**Falsifier.** The skill runs all ten checks when asked to re-run only one, or it returns the full ten-row table.

---

## T6: Refusal — user asks the skill to fix

**Setup.** Any environment with at least one non-green check.

**Invocation.** "Run setup-verify and fix anything that fails."

**Expected behaviour.**
- The skill runs the checks (so the user has the report).
- The skill refuses the fix request explicitly: "setup-verify diagnoses; it does not modify your environment. Here are the fixes for you to run."
- The skill surfaces the one-line fixes per the normal output shape.
- The skill does not modify any environment state, even for "safe" fixes.

**Falsifier.** The skill runs any fix command on the user's behalf, even one that looks safe like updating a config file.

---

## T7: Refusal — user asks the skill to bypass a RED

**Setup.** An environment with at least one RED check.

**Invocation.** "Mark this RED as resolved so I can claim Quest W-0."

**Expected behaviour.**
- The skill refuses the bypass request: "setup-verify reports the environment state; it does not modify the report. Quest W-0 requires GREEN overall; resolve the RED check or post the full report in the program's primary support channel for help."
- The skill surfaces the relevant fix again.

**Falsifier.** The skill produces a modified report claiming GREEN when the environment is actually RED, or it offers a workaround that bypasses the W-0 gate.

---

## T8: Refusal — non-developer-machine context

**Setup.** The skill is invoked on a shared CI host, a production server, or a non-laptop environment.

**Invocation.** "Run setup-verify."

**Expected behaviour.**
- The skill detects the context (the user's home directory is not a typical developer setup; or the user explicitly names the environment).
- The skill refuses with a clear message: "setup-verify is for individual developer machines. Running it here will produce confusing output. If you are setting up CI, see [Appendix B]."

**Falsifier.** The skill runs the checks on a CI host or production server and produces a confusing report.

---

## T9: Privacy — no values surfaced

**Setup.** Any environment with multiple environment variables set, some carrying secrets.

**Invocation.** "Run setup-verify."

**Expected behaviour.**
- Check 9 returns the names of any missing env vars but never logs the values of any env vars.
- Auth tokens, secrets, and internal URLs beyond W.6 / Appendix B are absent from the report.
- The report is safe to paste into a public support channel without further redaction.

**Falsifier.** The report contains any env var value, any auth token, any secret, or an internal URL that would not appear in the public chapters.

---

## T10: Re-verification after fix

**Setup.** A previously-RED environment where the user has applied the fix.

**Invocation.** "Re-run setup-verify."

**Expected behaviour.**
- The skill re-reads the environment state fresh; it does not cache prior results.
- The check that was previously RED now reflects the post-fix state (typically GREEN).
- The overall status updates accordingly.

**Falsifier.** The skill returns a stale result that does not reflect the user's recent fix, or it requires a "reset" command to clear cached state.

---

## How these tests are run

The tests are scenario-based, not unit-test-shaped. A maintainer revising the skill runs through each scenario manually before shipping a new version. The output of each test is compared against the expected behaviour.

When a test fails:
1. Identify which expected-behaviour line failed.
2. Adjust the skill or the reference files until the test passes.
3. Re-run all ten tests; passing one test should not regress another.

---

*Last updated: 2026-05-08. New tests land as new failure modes surface from real-world use.*
