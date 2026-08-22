# setup-verify output shape

The structured report the skill produces. The shape is stable; downstream readers (the user, the cohort lead, and `#ai-help`) can rely on it.

## Header

A single line naming the overall status and the count of warnings or blockers.

```
Overall: <COLOUR> — <health summary>
```

The implication line varies by colour:

- **GREEN.** "All 10 reference checks passed."
- **YELLOW.** "N warnings worth fixing." Where N is the count of YELLOW checks.
- **RED.** "N blocker(s) to resolve." Where N is the count of RED checks.

## Check table

A markdown table with one row per check.

| # | Check | Status |
|---|---|---|
| 1 | Node + pnpm versions | GREEN / YELLOW / RED |
| 2 | Claude Code auth | GREEN / YELLOW / RED |
| 3 | Internal npm registry | GREEN / YELLOW / RED |
| 4 | Corporate-proxy cert | GREEN / YELLOW / RED |
| 5 | No stale Vertex env vars | GREEN / YELLOW / RED |
| 6 | LiteLLM gateway reachable | GREEN / YELLOW / RED |
| 7 | Compass plugin | GREEN / YELLOW / RED |
| 8 | Git + corp SSO | GREEN / YELLOW / RED |
| 9 | Environment variables | GREEN / YELLOW / RED |
| 10 | Health endpoints | GREEN / YELLOW / RED |

The names in the Check column are stable; the order is stable. The table reads top-to-bottom as the order the checks are run.

## What to fix first

A section with the non-green checks listed by severity (RED before YELLOW). Each entry has the check number, the specific signal, and the one-line fix.

```
## What to fix first

- **Check N (RED):** <specific signal>. Fix: <one-line fix>.
- **Check N (YELLOW):** <specific signal>. Fix: <one-line fix>.
```

If overall is GREEN, this section reads:

```
## What to fix first

Nothing. All ten checks passed.
```

## Escalation note

A footer line naming when to escalate.

```
Escalation: If any RED persists after one hour of fixes, post this full report in #ai-help.
```

The line is identical regardless of colour. A GREEN report does not need escalation, but the line stays for consistency and so the user knows where to go if a previously-green check turns red later.

## Privacy notes

The report deliberately surfaces:

- Check names.
- Statuses (GREEN / YELLOW / RED).
- The *kind* of signal that produced each status (version number, error type, unreachable endpoint).

The report deliberately does *not* surface:

- Environment variable *values* (only the names of missing ones).
- Auth tokens.
- Secrets of any kind.
- Internal URLs beyond what is already in W.6 and Appendix B.

The redaction discipline matches [G.22 — Razorpay redlines](../../belts/03-green/c-guardrails/G22-redlines.md). The report is safe to paste into a public channel without further redaction.

## Worked example: GREEN

```
Overall: GREEN — All 10 reference checks passed.

| # | Check                         | Status |
|---|-------------------------------|--------|
| 1 | Node + pnpm versions          | GREEN  |
| 2 | Claude Code auth              | GREEN  |
| 3 | Internal npm registry         | GREEN  |
| 4 | Corporate-proxy cert          | GREEN  |
| 5 | No stale Vertex env vars      | GREEN  |
| 6 | LiteLLM gateway reachable     | GREEN  |
| 7 | Compass plugin                | GREEN  |
| 8 | Git + corp SSO                | GREEN  |
| 9 | Environment variables         | GREEN  |
| 10 | Health endpoints              | GREEN  |

## What to fix first

Nothing. All ten checks passed.

Escalation: If any RED persists after one hour of fixes, post this full report in #ai-help.
```

## Worked example: YELLOW

```
Overall: YELLOW — 2 warnings worth fixing.

| # | Check                         | Status |
|---|-------------------------------|--------|
| 1 | Node + pnpm versions          | GREEN  |
| 2 | Claude Code auth              | GREEN  |
| 3 | Internal npm registry         | YELLOW |
| 4 | Corporate-proxy cert          | GREEN  |
| 5 | No stale Vertex env vars      | GREEN  |
| 6 | LiteLLM gateway reachable     | GREEN  |
| 7 | Compass plugin                | GREEN  |
| 8 | Git + corp SSO                | YELLOW |
| 9 | Environment variables         | GREEN  |
| 10 | Health endpoints              | GREEN  |

## What to fix first

- **Check 3 (YELLOW):** internal npm registry config is correct, but a probe install of `<scoped-package>` fell back to the public registry. Fix: `pnpm config set @razorpay:registry <internal-url>` per Appendix B.
- **Check 8 (YELLOW):** Git is configured with a personal credential helper rather than corp SSO. Fix: re-run the auth setup from W.4 to switch credential helpers.

Escalation: If any RED persists after one hour of fixes, post this full report in #ai-help.
```

## Worked example: RED

```
Overall: RED — 1 blocker to resolve.

| # | Check                         | Status |
|---|-------------------------------|--------|
| 1 | Node + pnpm versions          | GREEN  |
| 2 | Claude Code auth              | RED    |
| 3 | Internal npm registry         | GREEN  |
| 4 | Corporate-proxy cert          | GREEN  |
| 5 | No stale Vertex env vars      | GREEN  |
| 6 | LiteLLM gateway reachable     | GREEN  |
| 7 | Compass plugin                | YELLOW |
| 8 | Git + corp SSO                | GREEN  |
| 9 | Environment variables         | GREEN  |
| 10 | Health endpoints              | GREEN  |

## What to fix first

- **Check 2 (RED):** Claude Code is installed but not authenticated. The `claude auth status --text` probe returned "not authenticated". Fix: `claude auth login --sso` per W.4.
- **Check 7 (YELLOW):** Compass plugin is installed at v1.x; pinned version is v1.y. One minor version behind. Fix: `claude plugin update compass`.

Escalation: If any RED persists after one hour of fixes, post this full report in #ai-help.
```

The three worked examples cover the three overall states. Any actual report will resemble one of these.

---

*The output shape is part of the reference skill contract. Changes require a distribution and documentation review.*
