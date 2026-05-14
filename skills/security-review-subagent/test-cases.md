# security-review-subagent — test cases

> **What this is.** Acceptance scenarios the skill must pass before any release. Five scenarios plus a lint sweep.

---

## Test 1 — Clean PR with security surface

**Setup.** A branch that adds a new agent invocation in a customer-summary feature, with the agent's capabilities properly bounded (read-only access to the ticketing connector; cannot send email; cannot escalate to privileged subagents). Untrusted ticket bodies are explicitly framed as data, not instructions. Output routes through the program's classifier path. No redlines surviving in the diff.

**Phrase.** `run security-review on this branch`

**Expected behaviour.**

- Skill detects security surface (new agent invocation), runs the subagent.
- Subagent applies all six checks; finds no issues under any check.
- Report header is correct (branch, base, run-at, brief version).
- No `### Finding` sections.
- Summary line: "No security findings under any of the six checks. The diff was reviewed for redlines, capability creep, untrusted-input handling, output exposure, injection-vulnerable shapes, and unscoped capabilities."

**Acceptance.** Clean report with the canonical "no findings" summary; subagent does not fabricate findings to look thorough.

---

## Test 2 — Capability-creep finding

**Setup.** A branch that adds a customer-summary agent with broad capabilities — it can read the ticketing connector AND send email AND access the user database. The diff is structurally clean otherwise (no redlines, no SQL injection, no untrusted-input mishandling).

**Phrase.** `run security-review on this branch`

**Expected behaviour.**

- Subagent flags one finding under Check 2 (capability creep).
- Finding cites the file path and line where the agent invocation grants the broad capability.
- Risk sentence names the prompt-injection escalation path.
- Suggested fix recommends separating the summary agent from email-capable and database-capable agents (per G.8).
- Other checks return clean.
- Summary line: "1 finding. See section above."

**Acceptance.** Capability creep correctly identified; suggested fix is structural (separation), not "tell the agent to be careful."

---

## Test 3 — Untrusted-input handling finding

**Setup.** A branch that adds a webhook handler which passes a customer-controlled `description` field directly into an agent prompt without distinguishing data from instructions. The agent then has the capability to call the email-sending connector.

**Phrase.** `run security-review on this branch`

**Expected behaviour.**

- Subagent flags one finding under Check 3 (untrusted-input handling) AND one under Check 2 (capability creep, because the email-sending capability makes the trust-boundary failure exploitable).
- Each finding cites a specific file and line.
- Suggested fixes recommend (a) framing the description as data not instructions and (b) removing email-sending capability from the agent that ingests untrusted input.
- Summary line: "2 findings. See sections above."

**Acceptance.** Both findings surface; the relationship between Check 2 and Check 3 is correctly captured.

---

## Test 4 — Output-exposure finding

**Setup.** A branch that adds a feature returning model output directly to an end user without routing through the program's output classifier. Otherwise clean.

**Phrase.** `run security-review on this branch`

**Expected behaviour.**

- Subagent flags one finding under Check 4 (output exposure).
- Finding cites the file and line where output bypasses the classifier.
- Suggested fix recommends routing through the classifier path or the proxy's standard response handler.
- Summary line: "1 finding. See section above."

**Acceptance.** Output-exposure correctly identified; suggested fix is structural.

---

## Test 5 — No security surface

**Setup.** A doc-only PR that updates a few Markdown files. No agent invocations, no untrusted-input handling, no new connectors, no SQL.

**Phrase.** `run security-review on this branch`

**Expected behaviour.**

- Skill inspects the diff at a high level.
- Skill detects no security surface.
- Report reads "no security surface; recommend `pre-ship-check` instead" and stops.
- Subagent is not spawned (saves cost).

**Acceptance.** Skill correctly declines to run; recommends the right alternative.

---

## Test 6 — Lint sweep

**Setup.** Run on the skill directory after any change.

**Command.**

```sh
grep -nE "Nawal|Khilan|Abhinav|Vaibhav|FSB-1|FSB-2|FSB-3|FSB-Transformation" \
  skills/security-review-subagent/*.md ; echo "exit=$?"
```

**Expected behaviour.** Exit non-zero (no matches).

**Acceptance.** Lint exits clean.

---

## What is intentionally not tested

- **High-stakes path coverage.** PCI-scope and KYC-flow changes go through the program's formal security review, not this skill. Test cases here cover the daily-loop pre-flight surface.
- **Cross-stack coverage.** v0.12 ships against the program's primary stack. Other stacks may need brief tightening.
- **Subagent quality regression.** The subagent's reasoning quality depends on the model and the brief; the brief is the controllable variable. If brief quality regresses, edit `brief-template.md`.
- **Speed.** Subagent latency varies; not a v0.12 concern.

---

## Failure-log shape

Same shape as `skills/pre-ship-check/test-cases.md`. Capture symptom, expected, actual, likely cause, fix. Keep the log; the failures are useful data.

---

## What "Pass" looks like across all five tests

- Tests 1–4: subagent produces correct findings without fabricating extras.
- Test 5: skill correctly declines.
- Test 6: lint exits clean.

A run where Tests 1–4 produce inconsistent findings across two invocations on the same branch suggests the brief needs tightening, not the model. Edit `brief-template.md`.
