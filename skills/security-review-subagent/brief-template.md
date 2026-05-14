# security-review-subagent — brief template

> **What this is.** The literal brief the skill passes to the spawned security-review subagent. The brief is the contract; updating security policy means editing this file.

The skill substitutes the named placeholders (`<base-branch>`, `<branch-name>`) at runtime; everything else is fixed text. The brief is intentionally explicit: a vague brief produces vague findings.

---

## The brief

```
Read the diff between <branch-name> and <base-branch>. Review specifically
for security-shaped concerns. Apply these checks. For each finding, name
the rule violated, the file and line, the specific risk in one sentence,
and a suggested fix. If a check produces no findings, say so explicitly.
Do not modify any code. Return Markdown with one section per finding.

CHECK 1 — Redlines surviving in the diff.
Any plaintext credentials (token-shaped strings near auth or env
contexts), money-handling identifiers (live transaction IDs, payment
instrument data), raw customer PII (emails, phones, addresses, IDs), or
regulator-protected fields (PCI scope: cards / CVVs; RBI scope: KYC docs;
region-specific PII). Cite the line. Redact the matched value to a shape
in your report; do not echo the literal value.

CHECK 2 — Prompt-injection capability creep.
Any new agent invocation in the diff that gives an agent broader
capability than its task requires. Examples:
  - a summary agent that can also send email;
  - a fetching agent that can also write to disk;
  - a customer-content reader that can escalate to a privileged subagent.
Cite the file and the missing capability limit. Suggest the separation
pattern (subagent split or sequential pipeline).

CHECK 3 — Untrusted-input handling.
Any new code path that ingests untrusted text (customer messages,
webhook payloads, scraped content, search results, fetched documents)
and treats it as instructions to an agent rather than as data. Cite the
line and the trust-boundary failure. Suggest the data-not-instructions
fix.

CHECK 4 — Output exposure.
Any new code path that returns model output to an end user or to a
storage location without going through an output classifier. Cite the
line and the classifier-bypass. Suggest the classifier-routing fix.

CHECK 5 — SQL or injection-vulnerable shape.
Any new database query, shell command, file-system write, or API call
that interpolates user-controlled input directly. Cite the line.

CHECK 6 — Unscoped capabilities.
Any new permission, MCP connector grant, hook, or tool authorisation
that increases the scope of what an agent can do without an explicit
justification in the PR description. Cite the file and the new
capability.

OUTPUT SHAPE.
Return Markdown with one section per finding. Each section:

  ### Finding <N> — Check <X> (<rule-name>)
  File: <path>, line <number>
  Risk: <one sentence>
  Suggested fix: <one or two sentences>

If no findings, return one paragraph: "No security findings under any of
the six checks. The diff was reviewed for redlines, capability creep,
untrusted-input handling, output exposure, injection-vulnerable shapes,
and unscoped capabilities."

REFUSALS.
Do not modify any code. Do not produce findings without citing a file
and a line. Do not include literal redline values in the output; redact
to a shape. Do not invent rules; if a concern does not fit one of the
six checks, surface it under a "Notes" section at the end with a clear
caveat.
```

---

## What the brief hardcodes

Three things the brief makes non-negotiable.

**Six numbered checks.** The checks are the contract. The skill never adds an ad-hoc seventh check at runtime; if a new threat shape becomes important, this file is edited and the brief is updated for all future invocations.

**The output shape.** A specific Markdown shape that downstream tools and reviewers depend on. Each finding is a section with a heading, file/line, risk, and suggested fix.

**The refusals.** No code modifications. No literal redline values in output. No invented rules.

---

## What the brief does NOT include

- A list of "patterns to scan for." The subagent uses its model judgement against the six named checks, not against a regex set. The regex-style scanning happens in `pre-ship-check` Layer 1; this skill is the *judgement* complement.
- Razorpay-specific repo names, hostnames, or service identifiers. The brief is generic; the diff carries the program-specific context.
- Personal names. The skill never requests or stores them.
- Internal-doc paths.

---

## Updating the brief

When security policy evolves:

1. **Adding a check.** Add a new numbered check. Update the SKILL.md Workflow to mention it. Add a test case to `test-cases.md`. Bump the skill version.
2. **Tightening a check.** Edit the check text. Add a test case if the tightening changes the failure mode.
3. **Removing a check.** Rare. Removing implies a threat is no longer relevant; document why in the commit message.
4. **Changing the output shape.** Edit the OUTPUT SHAPE section here AND in the SKILL.md Outputs section. Bump the skill version; downstream tools depend on shape stability.

---

## Why a fixed brief

A subagent with a vague brief produces inconsistent findings. A subagent with a brief that varies across invocations produces results that cannot be compared run-to-run. The fixed brief gives the program three properties:

- **Determinism.** Two runs of the skill on the same diff produce comparable findings.
- **Auditability.** A reviewer can see exactly what the subagent was asked to do.
- **Policy continuity.** Updating policy means editing this file, not chasing through dozens of skill invocations.

The trade-off: the brief evolves slowly. That is the right trade-off; security policy that evolves quickly is policy that has not stabilised.
