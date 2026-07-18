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
updated: "2026-07-18"
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

### D.5 — Opus 4.6 or 4.7 reports `exceeded budget` (status: workaround)

**Symptom.** Claude Code errors with `exceeded budget for model=claude-opus-4-6` or `claude-opus-4-7`, while the same error or the gateway shows that route in your enabled-model list.

**Diagnosis.** The request reached an enabled frontier model whose LiteLLM per-model cap is exhausted. `Exceeded budget` describes quota; it does not prove the route retired. Model availability can change, so use the current enabled-model list rather than inferring status from the version number.

**Fix.** Check the LiteLLM usage view, then move routine work to a lower-cost route that your key already enables, such as Sonnet, Codex, or an approved open-weight model. Do not change the Opus default to 4.8 solely because 4.6 or 4.7 reports a budget error; another frontier route can have its own cap. If the error says your total user budget is exhausted, follow D.6. If the route is absent from the enabled list or returns `key_model_access_denied`, follow D.13 instead. For an approved business blocker, post in `#ai-help` with the blocked work and manager approval visible.

**References.** [W.5 failure mode #6](../../belts/01-white/W05-installing-the-stack.md#common-failure-modes), [D.6 — model-wise or total usage limit](#d6--hit-a-model-wise-or-litellm-usage-limit-status-workaround), [D.13 — model access](#d13--litellm-account-or-model-access-is-not-enrolled-status-fixed), [`#ai-help` current enabled-route and model-cap response 2026-07-17](https://razorpay.slack.com/archives/C08C35GKJKD/p1784260277679449).

### D.6 — Hit a model-wise or LiteLLM usage limit (status: workaround)

**Symptom.** Claude Code starts refusing prompts with `ExceededBudget`; `Server is temporarily limiting requests (not your usage limit)` followed by `exceeded budget for model=...`; a model that worked yesterday is now restricted; a visible spend limit drops; or `#ai-help` says quota extensions are not being granted by default. The claude.ai usage page may show a different remaining balance.

**Diagnosis.** Claude Code usage is governed by the LiteLLM gateway, not the separate claude.ai usage page. The CLI path has a centrally managed total cap across enabled gateway models, including open-weight routes such as Kimi, Qwen, and DeepSeek. Frontier models can have per-model caps; open-weight models draw from the overall budget without per-model caps today. Support can change caps based on platform policy or overall spend, so do not treat any dollar amount you saw last week as a durable entitlement.

**Fix.** Treat the LiteLLM error as authoritative, even when the Claude prefix says `not your usage limit`. Read the trailing phrase: `exceeded budget for model=claude-sonnet-4-6` means that model cap is exhausted; `ExceededBudget: User=... over budget` means the total LiteLLM cap is exhausted. Check the LiteLLM usage dashboard first. If you hit a frontier-model cap, move routine work to Sonnet, Codex, or an enabled open-weight model; quota bumps are not automatic. If the error shows total-budget exhaustion, do not expect another gateway model, open-weight route, or personal Claude Max plan to bypass the cap. For approved business blockers, post in `#ai-help` with the blocked work and manager approval visible so the support team can review a small exception.

**References.** [W.5 failure mode #7](../../belts/01-white/W05-installing-the-stack.md#common-failure-modes), `#product-function-announcements` 2026-06-30 model-wise limits post, [`#ai-help` quota response 2026-06-30](https://razorpay.slack.com/archives/C08C35GKJKD/p1782822000944019), [`#ai-help` OSS total-cap clarification 2026-07-03](https://razorpay.slack.com/archives/C08C35GKJKD/p1783049884624819), `#ai-help` policy-managed cap response 2026-07-05, [`#ai-help` open-weight cap clarification 2026-07-06](https://razorpay.slack.com/archives/C08C35GKJKD/p1783317615357959), [`#ai-help` misleading rate-limit wording thread 2026-07-07](https://razorpay.slack.com/archives/C08C35GKJKD/p1783410203787589).

### D.7 — Usage not visible in the LiteLLM dashboard (status: fixed)

**Symptom.** Claude Code is working and you're definitely using it, but the LiteLLM dashboard shows no traffic for your user.

**Diagnosis.** Shell-level environment variables `ANTHROPIC_BASE_URL` or `ANTHROPIC_API_KEY` are overriding what `~/.claude/settings.json` sets. Claude Code is reaching Anthropic directly with the wrong key, bypassing the gateway.

**Fix.**

```bash
unset ANTHROPIC_BASE_URL ANTHROPIC_API_KEY
```

Then `grep` your `~/.bashrc` and `~/.zshrc` for those same variables and remove any persisted definitions. Close the terminal and open a new one.

**References.** [W.5 failure mode #8](../../belts/01-white/W05-installing-the-stack.md#common-failure-modes), [W.4](../../belts/01-white/W04-auth-setup.md).

### D.8 — `command not found: claude` after install (status: fixed)

**Symptom.** Setup script ran without errors, but `claude --version` returns `command not found`.

**Diagnosis.** Either your shell PATH did not pick up the new install, or you ran the setup script in one terminal and tried to use `claude` in another that was opened *before* the script finished.

**Fix.** Close *all* terminal windows opened before the setup script ran. Open a new one. If `claude --version` still fails, re-run the setup script in the fresh terminal.

**References.** [W.5](../../belts/01-white/W05-installing-the-stack.md), [W.4](../../belts/01-white/W04-auth-setup.md).

### D.9 — Zscaler certificate errors during installs or Claude startup (status: fixed)

**Symptom.** Package installs fail with certificate, SSL, or "self-signed certificate in certificate chain" wording; or Claude Code / Claude Desktop fails with `UNKNOWN_CERTIFICATE_VERIFICATION_ERROR`, `ERR_SOCKET_CLOSED`, a blank startup screen, or Anthropic TLS/preconnect errors.

**Diagnosis.** Zscaler is intercepting the HTTPS connection, but the current terminal/app session does not trust the Zscaler root certificate or has a stale Zscaler connection. This is a certificate-trust problem, not a reason to disable SSL checks.

**Fix.** Use this order:

1. Re-run the setup script; it installs the Zscaler trust chain:

   ```bash
   curl -fsSL https://get-claude.dev.razorpay.in/setup.sh | bash
   ```

2. Close old terminals, open a fresh terminal, and retry `claude` or the install command.
3. If Claude still fails with certificate or TLS wording, open Zscaler Client Connector, re-authenticate / reconnect it, then restart Claude Desktop or the terminal session.
4. If it still fails, post in `#ai-help` with the exact failing command, the redacted error text, your OS, and whether you were on office or home network. Do not bypass certificate checks.

**References.** [W.5](../../belts/01-white/W05-installing-the-stack.md), [`#ai-help` certificate thread 2026-07-03](https://razorpay.slack.com/archives/C08C35GKJKD/p1783058951691469), [`#ai-help` Claude Desktop/TLS thread 2026-07-03](https://razorpay.slack.com/archives/C08C35GKJKD/p1783058295417399).

### D.10 — `claude native binary not installed` after install (status: fixed)

**Symptom.** Running `claude` or `claude /login` prints `Error: claude native binary not installed`, followed by wording about `postinstall`, `--ignore-scripts`, or `--omit=optional`.

**Diagnosis.** The JavaScript wrapper is on PATH, but the platform-native Claude Code binary was not downloaded or its postinstall step did not run. This is different from `command not found: claude`: your shell can find the wrapper, but the wrapper cannot find the native binary it needs to start.

**Fix.** Re-run the Razorpay setup script from a fresh terminal, then close every old terminal window and open a new one:

```bash
curl -fsSL https://get-claude.dev.razorpay.in/setup.sh | bash
claude --version
```

If the same error persists after the fresh terminal, post in `#ai-help` with the exact error output. Do not copy the `node node_modules/@anthropic-ai/claude-code/install.cjs` path from the error unless support confirms the install location; global and local installs use different paths.

**References.** [W.5](../../belts/01-white/W05-installing-the-stack.md), [`#ai-help` thread 2026-06-26](https://razorpay.slack.com/archives/C08C35GKJKD/p1782383765447739?thread_ts=1782383765.447739), [`#ai-help` thread 2026-06-27](https://razorpay.slack.com/archives/C08C35GKJKD/p1782470258476069?thread_ts=1782469955.318459), [Tech IT routed thread](https://razorpay.slack.com/archives/CBZD5BMUZ/p1782283102410239?thread_ts=1782283102.410239).

### D.11 — `Unknown skill: login` after running `claude /login` (status: fixed)

**Symptom.** You run `claude /login` from the shell and Claude Code prints `Unknown skill: login`, or you see `Please run /login` after another auth error and try to paste `/login` into the terminal command line.

**Diagnosis.** `/login` is an in-session slash command, not a shell subcommand. Running `claude /login` starts Claude Code with `/login` as the prompt text, so the harness tries to interpret it as a skill name. This is separate from the stale-Vertex `403` fix; if the same output also mentions `aiplatform.googleapis.com`, follow D.3 first.

**Fix.** For the standard Razorpay setup, do not run `claude /login`. Run the setup script, close old terminals, open a fresh terminal, then start Claude Code with `claude` and follow the browser SSO flow if prompted:

```bash
curl -fsSL https://get-claude.dev.razorpay.in/setup.sh | bash
claude
```

If a VS Code or extension session remains stuck after that, refresh Claude Code's browser auth explicitly, then restart the editor:

```bash
claude auth logout
claude auth login
```

**References.** [W.5 failure mode #9](../../belts/01-white/W05-installing-the-stack.md#common-failure-modes), [`#claude-onboarding-support` thread 2026-04-01](https://razorpay.slack.com/archives/C0ANCMTCJA2/p1775031813947089), [`#claude-onboarding-support` thread 2026-04-01](https://razorpay.slack.com/archives/C0ANCMTCJA2/p1775031973755329), [`#claude-onboarding-support` thread 2026-04-01](https://razorpay.slack.com/archives/C0ANCMTCJA2/p1775025117236129).

### D.12 — `thinking.signature` or missing `thinking` block errors on Bedrock (status: workaround)

**Symptom.** Claude Code or the VS Code plugin returns a `400` with `thinking.signature.str: Input should be a valid string`, `each thinking block must contain thinking`, or `Received Model Group=...-bedrock`. The error can show up even when the model is enabled and your LiteLLM budget is fine.

**Diagnosis.** This is a request-shape problem, not a quota problem. Claude Code is sending an extended-thinking block that Bedrock validates more strictly than the normal chat path. A stale session, plugin window, or manual script that mutates message payloads can keep replaying the bad block.

**Fix.** Start a fresh Claude Code session or VS Code window first. If the error repeats, turn extended thinking off with `/thinking off` or the equivalent setting, then retry the prompt. Also confirm the model name is a current Razorpay LiteLLM route (`claude-opus-4-8`, not a stale Opus label) and update Claude Code if the same window keeps sending malformed thinking blocks. If you still need help, post the redacted full error and whether you were using terminal Claude Code or the VS Code plugin in `#ai-help`.

**References.** [`#ai-help` Opus 4.8 Bedrock signature thread 2026-07-01](https://razorpay.slack.com/archives/C08C35GKJKD/p1782906068266519), [`#ai-help` missing thinking block response 2026-07-07](https://razorpay.slack.com/archives/C08C35GKJKD/p1783403194671699), [`#ai-help` Sonnet signature response 2026-07-07](https://razorpay.slack.com/archives/C08C35GKJKD/p1783419646357009).

### D.13 — LiteLLM account or model access is not enrolled (status: fixed)

**Symptom.** Claude Desktop or claude.ai access looks fine, and you may have already run the setup script, but Claude Code still says the LiteLLM account/key is not enrolled, the selected model is not enabled, or `key_model_access_denied` appears. In one recurring shape, the message starts with `Please run /login`, lists `This key can only access models=[...]`, then ends with `Tried to access <model>`.

**Diagnosis.** The Claude.ai enterprise seat and the LiteLLM gateway key are separate gates. The setup script can write the local Claude Code configuration, but it cannot approve a missing LiteLLM enrollment or model grant by itself. When the error already lists enabled models, however, the key is enrolled: Claude Code has selected a default route outside that list. In that case, the `/login` banner is not the diagnosis.

**Fix.** Use this order:

1. If the error lists enabled models, run `/model <exact-enabled-route>` inside Claude Code using one of those names. Do not keep retrying `/login`.
2. If an approved route you need is absent, open `https://llm-gateway.razorpay.com/auth/`, click **Add Models**, enable it, wait two to three minutes for the gateway cache to refresh, then restart Claude Code.
3. If the account/key is not enrolled or an approved route cannot be enabled, post in [`#ai-help`](https://razorpay.slack.com/archives/C08C35GKJKD) asking for LiteLLM gateway provisioning or model enablement.

To check usage later, open `https://llm-gateway.razorpay.com/ui/?page=new_usage` and log in with your Razorpay email plus the LiteLLM key as the password.

Do not solve this by hunting for a raw external OpenAI or Anthropic key. Standard Claude Code/OpenCode access should route through the Razorpay LiteLLM gateway; direct external API keys follow a separate CISO-approved request path only when a tool cannot use the internal gateway.

**References.** [W.5 failure mode #5](../../belts/01-white/W05-installing-the-stack.md#common-failure-modes), [`#ai-help` LiteLLM key request 2026-07-08](https://razorpay.slack.com/archives/C08C35GKJKD/p1783506503286129), [`#ai-help` LiteLLM enrolment response 2026-07-09](https://razorpay.slack.com/archives/C08C35GKJKD/p1783579071236499), [`#ai-help` Add Models response 2026-07-09](https://razorpay.slack.com/archives/C08C35GKJKD/p1783576779048349), [`#ai-help` default-model report 2026-07-11](https://razorpay.slack.com/archives/C08C35GKJKD/p1783800597608559), [`#ai-help` repeated model-list failures and selection fix 2026-07-14](https://razorpay.slack.com/archives/C08C35GKJKD/p1784030394776029).

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

### D.14 — `Prompt is too long` or context fills at session start (status: workaround)

**Symptom.** Claude Code / Claude Cowork refuses a prompt with `Prompt is too long`, says the conversation is too long to continue, hits the context limit after only one or two prompts, or shows a large context-window jump even when the first message is just `hi`.

**Diagnosis.** This is context-window exhaustion, not a LiteLLM quota cap. The window includes your current prompt, earlier turns, files or logs the agent has read, RAG chunks, MCP/tool schemas, enabled plugin instructions, hooks, and system prompt material loaded at session start. Some startup payloads do not show as tool usage in `/mcp`, so a blank prompt can still be expensive if heavy tools are preloaded.

**Fix.** Use this order:

1. Start a fresh Claude Code / Cowork session and retry a minimal prompt such as `hi`.
2. If the minimal prompt works, reduce the original input: summarise earlier turns, split pasted docs or logs into smaller chunks, reduce RAG/file payloads, and ask the agent to read only the files needed for the current step.
3. Run `/context` to see what is filling the window. If the first turn is already large, temporarily disable unused MCPs, plugins, and session-start hooks; restart Claude Code; then re-enable them one at a time.
4. If `/mcp` shows zero usage but the window still jumps, inspect your `~/.claude/settings.json` for enabled plugins, `mcpServers`, custom hooks, status-line commands, or auto-included prompts that may inject schemas at startup.
5. If a clean session with a minimal prompt still fails, run Claude Code with `--debug`, redact secrets from the initial prompt/system blocks, and post the exact error plus the redacted startup-context excerpt in `#ai-help`.

**References.** [G.2 context-window mental model](../../belts/03-green/a-craft/G02-context-windows.md), [`#ai-help` prompt-too-long thread 2026-06-11](https://razorpay.slack.com/archives/C08C35GKJKD/p1781142551149419), [`#ai-help` context-limit thread 2026-07-02](https://razorpay.slack.com/archives/C08C35GKJKD/p1783016485230679), [`#ai-help` startup-context thread 2026-07-07](https://razorpay.slack.com/archives/C08C35GKJKD/p1783429353309609), [`#ai-help` prompt-too-long thread 2026-07-09](https://razorpay.slack.com/archives/C08C35GKJKD/p1783585337029519).

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

*Last reviewed: 2026-07-09. Cadence: monthly cohort-lead review for the first six months; quarterly thereafter.*
