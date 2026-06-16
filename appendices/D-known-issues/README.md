---
title: "Appendix D: Known Issues + FAQ"
slug: "appendices/known-issues"
section: "appendices"
status: "drafted"
type: "readme"
track: "known-issues"
order: 0
time_minutes: 10
audience: "everyone"
outcome: "Find the known fix for a problem you have hit, or the contribution path for a problem you have just solved."
prev: null
next: null
pillar: null
belt: null
tags: ["appendix", "known-issues", "faq"]
updated: "2026-06-16"
---

# Appendix D: Known Issues + FAQ

> **What this is.** A living ledger of problems builders have hit and the fixes that worked. Organised by stack layer so a reader who knows roughly where their problem lives can find the relevant entries quickly. Entries are promoted here from [`#ai-help`](https://razorpay.slack.com/archives/C08C35GKJKD) threads and from per-belt chapter failure-mode sections; the chapters remain the canonical reference for each pattern.

## How to use this appendix

If you have a problem:

1. Identify which stack layer it lives in (sections below).
2. Read the entries in that layer.
3. If your problem matches, follow the documented fix.
4. If the fix does not work, follow the layer's escalation path.

If you solved a problem and want to contribute:

1. Identify the layer your fix belongs in.
2. Add an entry using the format at the bottom of this page.
3. Open a PR against this appendix.
4. The cohort lead reviews monthly; entries merge in batches.

---

## Layer 0 — Foundation (environment, access, setup)

Problems with laptop setup, the setup script, the Zscaler cert, the LiteLLM gateway, or your shell environment.

**Escalation path:** [`#ai-help`](https://razorpay.slack.com/archives/C08C35GKJKD).

### D.1 — Manager OOO blocks MyAccess approval (status: fixed)

**Symptom.** You submitted the MyAccess request for "Claude AI" and your manager is on leave; the request sits in Pending.

**Diagnosis.** MyAccess routes to your reporting manager by default. With them out, nothing moves.

**Fix.** Post in [`#ai-help`](https://razorpay.slack.com/archives/C08C35GKJKD) with `@techit` tagged and a one-line "manager OOO, requesting bypass." Admins bulk-approve in batches; expect about an hour business-time. After approval there is still a ~30–40 minute Azure AD sync window before Claude.ai shows your seat.

**References.** [W.5 failure mode #1](../../belts/01-white/W05-installing-the-stack.md#common-failure-modes).

### D.2 — "Free Plan" showing on claude.ai after MyAccess approval (status: fixed)

**Symptom.** MyAccess says approved, but [claude.ai](https://claude.ai) signs you in and shows you on the Free Plan.

**Diagnosis.** Azure AD sync between MyAccess approval and Anthropic's SSO IdP runs on a cadence; you are inside the sync window.

**Fix.** Wait 30–40 minutes after approval and retry. If you are still on Free Plan past 60 minutes, post in `#ai-help`.

**References.** [W.5 failure mode #2](../../belts/01-white/W05-installing-the-stack.md#common-failure-modes).

### D.3 — `403 PERMISSION_DENIED` referencing `aiplatform.googleapis.com` (status: fixed)

**Symptom.** Running `claude` errors out with `403 PERMISSION_DENIED` mentioning `aiplatform.googleapis.com` or `pod-velocity-claude-code`.

**Diagnosis.** Stale Vertex environment variables in your shell rc, left over from the pre-March-2026 Vertex-era setup. The new setup script auto-purges these from new shells, but it cannot purge what your current shell has already loaded.

**Fix.** Open `~/.bashrc` and `~/.zshrc`. Remove these lines if present:

```bash
export ANTHROPIC_VERTEX_PROJECT_ID='pod-velocity-claude-code'
export CLAUDE_CODE_USE_VERTEX=1
export CLOUD_ML_REGION='global'
```

Re-run the setup script: `curl -fsSL https://get-claude.dev.razorpay.in/setup.sh | bash`. Then close the terminal window and open a new one. The new shell loads cleanly.

**References.** [W.4](../../belts/01-white/W04-auth-setup.md), [W.5 failure mode #3](../../belts/01-white/W05-installing-the-stack.md#common-failure-modes).

### D.4 — `401 authentication_error` after a laptop restart (status: fixed)

**Symptom.** Claude Code was working yesterday. After a laptop restart, every prompt errors with `401 authentication_error`.

**Diagnosis.** Your LiteLLM key rotated or its OAuth-derived expiry passed.

**Fix.** Re-run the setup script. It re-mints a fresh key and writes it into `~/.claude/settings.json`.

**References.** [W.5 failure mode #4](../../belts/01-white/W05-installing-the-stack.md#common-failure-modes).

### D.5 — `429 RESOURCE_EXHAUSTED` on `claude-opus-4-6` (status: workaround)

**Symptom.** Opus prompts intermittently fail with `429 RESOURCE_EXHAUSTED`, especially around peak hours.

**Diagnosis.** Opus has tighter shared rate limits than Sonnet. Concurrent heavy-Opus usage across the org spikes the limit.

**Fix.** Switch to Sonnet for the moment — edit `"model": "sonnet[1m]"` in `~/.claude/settings.json` or pass `--model sonnet` on the CLI. Use Opus for genuinely deep reasoning, not as a default. Sonnet is the recommended everyday model.

**References.** [W.5 failure mode #5](../../belts/01-white/W05-installing-the-stack.md#common-failure-modes).

### D.6 — Hit the monthly $100 usage cap (status: workaround)

**Symptom.** Claude Code starts refusing prompts citing quota; the LiteLLM dashboard shows you against the per-builder cap.

**Diagnosis.** The default cap was set conservatively; heavy daily users hit it. Caps are re-tuned periodically based on real usage.

**Fix.** Request a higher limit by DM'ing `@RKV` or posting in `#ai-help` with manager approval visible (cc your manager on the post). Include a one-line on what you're using it for; "Boss Fight G-B in progress" gets quotas raised quickly.

**References.** [W.5 failure mode #6](../../belts/01-white/W05-installing-the-stack.md#common-failure-modes).

### D.7 — Usage not visible in the LiteLLM dashboard (status: fixed)

**Symptom.** Claude Code is working and you're definitely using it, but the LiteLLM dashboard shows no traffic for your user.

**Diagnosis.** Shell-level environment variables `ANTHROPIC_BASE_URL` or `ANTHROPIC_API_KEY` are overriding what `~/.claude/settings.json` sets. Claude Code is reaching Anthropic directly with the wrong key, bypassing the gateway.

**Fix.**

```bash
unset ANTHROPIC_BASE_URL ANTHROPIC_API_KEY
```

Then `grep` your `~/.bashrc` and `~/.zshrc` for those same variables and remove any persisted definitions. Close the terminal and open a new one.

**References.** [W.5 failure mode #7](../../belts/01-white/W05-installing-the-stack.md#common-failure-modes), [W.4](../../belts/01-white/W04-auth-setup.md).

### D.8 — `command not found: claude` after install (status: fixed)

**Symptom.** Setup script ran without errors, but `claude --version` returns `command not found`.

**Diagnosis.** Either your shell PATH did not pick up the new install, or you ran the setup script in one terminal and tried to use `claude` in another that was opened *before* the script finished.

**Fix.** Close *all* terminal windows opened before the setup script ran. Open a new one. If `claude --version` still fails, re-run the setup script in the fresh terminal.

**References.** [W.5](../../belts/01-white/W05-installing-the-stack.md), [W.4](../../belts/01-white/W04-auth-setup.md).

### D.9 — Certificate errors during `npm install` or other installs (status: fixed)

**Symptom.** Package installs fail with certificate, SSL, or "self-signed certificate in certificate chain" wording.

**Diagnosis.** Zscaler corporate proxy injects a certificate that your package manager doesn't trust yet.

**Fix.** Do not bypass certificate checks. Re-run the setup script; it installs the Zscaler trust chain. If installs still fail, post in `#ai-help` with the exact failing command and redacted output.

**References.** [W.5](../../belts/01-white/W05-installing-the-stack.md).

---

## Layer 1 — Compass plugin

Problems with installing, verifying, or running the program-pinned plugin bundle: hook failures, version drift, skill discovery issues.

**Escalation path:** [`#ai-help`](https://razorpay.slack.com/archives/C08C35GKJKD). For plugin-development questions specifically, [`#testing-slash`](https://razorpay.slack.com/archives/C09CG60KLMU) or the Compass plugin co-owners (Aravinth P K, Vaibhav Dhir).

*Entries seed from cohort experience. If you have hit and solved one, contribute it using the format below.*

---

## Layer 2 — Design and dashboard

Problems with the Figma MCP, Blade compliance checks, the design preview platform, frontend tooling.

**Escalation path:** [`#design-system`](https://razorpay.slack.com/archives/CMQ3RBHEU) for Blade questions, [`#experience_fe_core`](https://razorpay.slack.com/archives/C01H13RTF8V) for FE tooling.

*Entries seed from cohort experience.*

---

## Layer 3 — Skills and agents

Problems with skill invocation, MCP server timeouts, agent loops, subagent handoff, custom agents built on the SDK.

**Escalation path:** [`#rzp-claude-skills`](https://razorpay.slack.com/archives/C0ABFFW6XNW) for skill-discovery issues, [`#mcp-dev`](https://razorpay.slack.com/archives/C08PEUVAZ1B) for MCP server issues, [`#ai-code-champions`](https://razorpay.slack.com/archives/C08BU395ZEJ) for craft questions.

*Entries seed from cohort experience.*

---

## Layer 4 — Infrastructure (devstack)

Problems with internal infrastructure that the program depends on: CI, deploy, internal proxy, secrets management, the devstack itself.

**Note.** Most Layer 4 problems are out of scope for this appendix; they belong to the devstack team. Entries here cover the *interaction* between AI workflows and the devstack.

**Escalation path:** [`#devstack-onboarding-support`](https://razorpay.slack.com/archives/C08T27QH5L4).

*Entries seed from cohort experience.*

---

## Entry format

Each entry follows this shape:

```markdown
### D.N — <Title> (status: open / fixed / workaround)

**Symptom.** What the user sees, in plain language.

**Diagnosis.** What is actually happening, with the diagnostic steps to confirm.

**Fix.** The known fix. Step-by-step. Exact commands.

**References.** PRs, RFCs, related chapters, Slack thread, or external links.
```

---

## Contribution flow

The contribution flow:

1. Hit a problem in your daily work.
2. Solve it (or get it solved by escalating to the layer's path).
3. Write up the entry using the format above. The fix block must be copy-pasteable.
4. Open a PR against this appendix. Branch name: `docs/known-issue-<short-slug>`.
5. The cohort lead reviews monthly; entries merge in batches.

A fix that lives only in a Slack thread evaporates within months. A fix that lands here helps every next builder.

---

## Cross-references

- [W.5 — Installing the stack](../../belts/01-white/W05-installing-the-stack.md), the canonical reference for Layer 0 failure modes.
- [W.4 — Your auth setup](../../belts/01-white/W04-auth-setup.md), the mental model for the five auth layers.
- [W.6 — The LLM Gateway](../../belts/01-white/W06-llm-gateway.md), what the gateway does.
- [Appendix F — Slack Channels](../F-slack-channels/README.md), the escalation channel directory.
- [Prologue §0.4 — The Enablement Stack](../../prologue/04-enablement-stack.md), which defines the layers used here.

---

*Last reviewed: 2026-05-29. Cadence: monthly cohort-lead review for the first six months; quarterly thereafter.*
