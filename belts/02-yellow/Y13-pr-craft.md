---
title: "PR craft"
slug: "belts/yellow/pr-craft"
section: "belts"
status: "drafted"
type: "chapter"
track: "yellow"
order: 13
time_minutes: 20
audience: "daily-builder"
outcome: "Write small, reviewable PRs with clear titles, descriptions, staged commits, and verification that reaches the changed execution surface."
prev: "belts/yellow/debugging-loop"
next: "belts/yellow/staying-current"
pillar: "harness"
belt: "yellow"
tags: ["yellow-belt", "pull-request", "review"]
updated: "2026-08-19"
---

# Y.13 - PR craft

Yellow Belt PRs should be easy to review. The code change may be tiny, but the PR should show the loop: symptom, context, decision, verification.

Reviewers are busy. A clear PR is an act of respect.

---

## If you're short on time

- Keep the PR small enough to review in minutes.
- Include what changed, why, how you checked it, and what context informed it.
- Use staged commits or staged files to keep unrelated changes out.
- Name the strongest verification rung you reached. A formatter, parser, or type check does not prove the target runtime worked.
- Use `@slash --code-review <full-pr-url>` for an evidence-led second pass, then validate each finding yourself.
- Before merge, verify the owning team's approval and the required checks separately. A review bot's approval does not turn red CI green.

---

## The mental model

```text
Diff shows what changed.
Description shows why.
Checks show confidence.
Triage shows judgement.
```

The PR description should make the reviewer trust your process before they even read the diff.

---

## Title shape

Good:

```text
fix: keep submit button enabled after valid edit
docs: fix typo in integration guide
ui: clarify empty state copy for date filters
```

Weak:

```text
changes
fix bug
updates
Claude changes
```

The title should be specific enough to find later.

---

## Description template

```markdown
## What changed

One or two bullets.

## Why

The symptom and user-facing impact.

## Triage

What context you checked: git history, Slack thread, ticket, design, doc, or local reproduction.

## Checks

- Ran:
- Verified:
- Screenshots:

## Risk

What this might affect, or why risk is low.
```

For Yellow Belt, the Triage section is the differentiator. It proves you did not ask AI to edit in a vacuum.

---

## Worked example

```markdown
## What changed

- Updated the empty-state copy shown after date filtering.
- Kept existing component and state logic unchanged.

## Why

The current copy reads like there are no transactions at all. The design and thread context indicate it should say no records match the active filter.

## Triage

- Reproduced locally with a filtered transaction list.
- Messaging thread pointed to date-filter confusion.
- Design context provided approved empty-state copy.
- Relevant component is `TransactionEmptyState`.

## Checks

- Reviewed `git diff`.
- Confirmed only one component changed.
- Captured before/after screenshot.

## Risk

Copy-only change. No data logic changed.
```

This is more helpful than a long narrative.

---

## Staged commits and staged files

Use:

```bash
git status
git diff
git add <intended-file>
git diff --staged
git commit -m "fix: clarify filtered empty state"
```

Do not use `git add .` unless you have inspected every changed file. Yellow Belt mistakes often enter through accidental staging.

---

## Make checks reach the changed execution surface

A clean shallow check can still leave the changed behaviour untested. A formatter proves formatting. A parser proves that one parser understood the syntax. Neither proves that the repository's build, query engine, browser, job runner, or service will execute the change correctly.

Climb this evidence ladder as far as the approved environment allows:

1. **Static shape.** Run the relevant format, lint, parse, schema, or type check. This catches cheap mistakes quickly.
2. **Repository contract.** Run the owning repo's documented test, build, or validation command for the changed surface. Read `CONTRIBUTING.md`, the PR template, and CI configuration rather than inventing a command.
3. **Target runtime.** Use the closest approved execution path for the thing that changed: the actual query dialect or engine, browser, job runner, service test harness, or build tool.
4. **Representative behaviour.** Exercise one bounded case that could prove the change wrong: a realistic input, page state, data slice, or failure path. Record the observed result.

The ladder is about **honest evidence**, not running every command in the repository. A SQL formatter may be enough for a comment-only edit. A changed Spark model needs more than a generic SQL parse. A UI state change needs the relevant test or rendered state, not only a type check.

If you cannot run a higher rung safely, say so. Let required CI run it, or ask the owning team for the approved path. Do not turn “not available locally” into “probably passes.”

### Copy this verification receipt

```text
VERIFICATION RECEIPT
Changed execution surface: <query engine / browser / service / job / docs only>
Static check: <command + PASS / FAIL / NOT RUN>
Repository check: <documented command + PASS / FAIL / NOT RUN>
Target-runtime check: <runtime + command or CI check + result>
Representative case: <input or state + observed result>
Not run: <check + reason + who or what will run it>
```

Put the relevant lines under `## Checks` in the PR. Name the command, environment, and result; “tested” is too vague to review.

One current internal example makes the distinction explicit: [`self-serve-analytics` #2112](https://github.com/razorpay/self-serve-analytics/pull/2112) separately reports dbt/Jinja rendering, a Spark-dialect parser, and Trino comparisons. Each proves a different property. None should be renamed as evidence from a runtime that did not execute.

Three failure modes to avoid:

- **“The parser passed, so production will run it.”** A parser may accept syntax the target engine rejects or miss runtime-only behaviour. Keep climbing the ladder.
- **“Tests passed.”** Which tests, on which environment, against which commit? Put the command and result in the receipt.
- **“The target check was unavailable, so the agent reasoned through it.”** Reasoning can propose a check; it cannot manufacture execution evidence. Mark it `NOT RUN` and route it.

---

## Ask Slash for a second pass

Once the intended diff is pushed, Slash can review the remote PR without taking over your local build loop:

```text
@slash --code-review <full-pr-url>
```

Use this as a **second-pass review**, not as a merge button. A useful run should point to code evidence: the file and line, why the behaviour is risky or incorrect, and what check would prove a fix. “Looks good” without evidence is feedback, not clearance.

Work through the result in this order:

1. **Pin the reviewed state.** Note the latest commit SHA before requesting review. If the PR changes later, the earlier review describes an older diff.
2. **Open every finding in context.** Read the surrounding code, linked check, and relevant repo convention. Do not patch from the summary alone.
3. **Classify the finding.** Mark it `valid`, `invalid — with evidence`, or `needs owning-team judgement`. Severity does not replace verification.
4. **Fix only validated issues.** Push the smallest correction, then run the repo's normal tests, lint, type checks, or visual checks. Slash's report does not prove that CI passed.
5. **Record what happened.** Resolve the thread or add a short PR note naming the finding, decision, evidence, and verification. Review should leave the PR easier for a person to trust.

Copy this card into your notes while you triage:

```text
SLASH REVIEW TRIAGE
PR: <url>
REVIEWED COMMIT: <sha>
FINDING: <file:line + claim>
DECISION: valid | invalid | needs owner
EVIDENCE: <code, test, doc, or repo convention>
ACTION: <fix made, reason rejected, or owner question>
VERIFICATION: <check + result>
```

Try it on one low-risk open PR. The exercise is complete when each finding has a decision and evidence—not when every suggestion has been accepted.

**Do not substitute adjacent modes.** The separate `--test` path has repo-specific availability. Use `--code-review` for the general review loop above; use specialised test modes only when current Slash help says the target repo is enabled.

---

## Approval is not merge readiness

A PR can have a useful AI review and still be unsafe to merge. Review approval and automated checks answer different questions:

- **Review asks:** does the change look correct, understandable, and appropriate to the right reviewer?
- **Checks ask:** did the code pass the repo's tests, build, lint, security, and other automated gates?

A reviewer bot is one source of review evidence. It is not the code owner, and its approval does not override a failed or unfinished check.

Before merging, use this stop/go gate:

```text
MERGE READINESS
[ ] The owning team's reviewer has approved or explicitly cleared the merge.
[ ] Every required check is complete and green.
[ ] Requested changes and unresolved review threads are closed.
[ ] I re-read the final diff after the latest commit.

Any unchecked box = stop. Do not merge yet.
```

If a check is red, open it and read the failing step. Fix and re-run it, or ask the owning team whether the failure is understood and how that repo handles it. Do not infer that a visible merge button makes the failure safe to ignore.

---

## Review etiquette

- Tag the right reviewer, not the nearest friend.
- Mention why the PR is small.
- Respond to review comments with the change or a question.
- If scope grows, split or pause.
- Thank reviewers by making the next PR easier to review.

If a reviewer asks for a bigger change than Yellow scope, say so:

```text
I can make the typo/copy fix here. The broader state refactor may need a separate team-owned PR.
```

---

## Common failure modes

**"The PR description just says fixed."** Add symptom, triage, and checks.

**"Extra files slipped in."** Use staged files and `git diff --staged`.

**"The PR mixes cleanup with the bug fix."** Split it. Reviewers should not hunt for the relevant change.

**"I tagged no reviewer."** A PR without a path can sit forever.

**"Claude wrote the description and I did not check it."** Read it. Remove invented claims.

**"Slash found it, so I changed it."** Validate the finding against code and checks first. A confident review can still be wrong or stale.

**"Slash reviewed an earlier commit."** Re-open the final diff. Re-run review only when later changes materially affect the finding.

**"The review bot approved, so I merged with red CI."** Approval and checks are independent. Stop, get the owning team's clearance, and make every required check green before merge.

---

## GREEN / YELLOW / RED self-check

You are **GREEN** if:

- your PR title is specific;
- your description includes triage and checks;
- the diff is small and intentional;
- a reviewer path is clear;
- your `## Checks` section names the strongest verification rung reached and any higher rung not run;
- the owning-team approval and required checks are both green before merge.

You are **YELLOW** if:

- the PR is correct but description is thin;
- the reviewer is unclear;
- checks are manual and need better evidence.

You are **RED** if:

- unrelated changes are included;
- the description claims checks not run;
- the PR changes scope during review.

---

## What you can say after this module

> "I can make the reviewer's job easy by showing what changed, why, and the strongest execution evidence I reached."

---

**Further reading**

- [Current Slash help and `--code-review` invocation](https://razorpay.slack.com/archives/C09CG60KLMU/p1786091867089779) — the supported command and current mode boundary
- [Completed Slash review and verification receipt](https://razorpay.slack.com/archives/C09CG60KLMU/p1786102438016369) — an internal example that validates findings against code and reports the checks run
- [GitHub Docs — About pull request reviews](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/reviewing-changes-in-pull-requests/about-pull-request-reviews) — review outcomes and repository review controls
- [dbt `parse` command](https://docs.getdbt.com/reference/commands/parse) — official reference for a structural project-parse check
- [dbt `build` command](https://docs.getdbt.com/reference/commands/build) — official reference for executing selected resources and tests

---

**Previous:** [Y.12 Debugging with Claude](Y12-debugging-loop.md) - **Next:** [Y.14 Staying current](Y14-staying-current.md)

