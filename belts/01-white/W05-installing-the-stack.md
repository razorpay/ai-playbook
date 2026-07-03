---
title: "Installing the stack"
slug: "belts/white/installing-the-stack"
section: "belts"
status: "drafted"
type: "chapter"
track: "white"
order: 5
time_minutes: 40
audience: "new-builder"
outcome: "Install and verify the White Belt tool stack without drifting away from the program-pinned setup path."
prev: "belts/white/auth-setup"
next: "belts/white/llm-gateway"
pillar: "harness"
belt: "white"
tags: ["white-belt", "setup", "node", "pnpm", "claude-code"]
updated: "2026-07-03"
---

# W.5 - Installing the stack

Installation is where many new builders lose half a day. Not because they are bad at computers, but because setup is a chain. One missing link makes everything downstream look broken.

White Belt uses the program-pinned setup path. Your job is to run it, read the output, and verify the pieces. Your job is not to become a package-manager expert on day one.

> **The canonical source.** Everything in this chapter mirrors the [org-wide rollout announcement](https://razorpay.slack.com/archives/C06GNML2QJF/p1774334791951129) posted by Bhanu Prakash in `#engineering-all` on 2026-03-24. If a step here disagrees with that thread, the thread wins — ping `#ai-help` and this chapter will be patched.

---

## If you're short on time

- Two steps: (1) get access via MyAccess, (2) run one setup script in your terminal.
- Claude Desktop verifies your enterprise seat for chat/co-work. Code work in this playbook runs through terminal Claude Code via LiteLLM.
- The setup script is `curl -fsSL https://get-claude.dev.razorpay.in/setup.sh | bash`. That is the only install command you should run.
- A successful install is not enough. You pass only when `claude --version` prints a version and `claude` opens without errors.

---

## The mental model

Think of setup as a checklist of tools that depend on each other:

```text
Terminal
  -> git
  -> Node runtime
  -> package manager
  -> internal package registry access
  -> Claude Code
  -> program-pinned plugin
  -> setup verification
```

If Node is missing, project commands fail. If package registry access is broken, installs fail. If Claude Code is missing, AI workflows cannot start. If the plugin is stale, the program path drifts.

This is why setup has to be boring and pinned.

---

## The install — two steps

### Step 1 — Get access (everyone)

1. Open [myaccess.microsoft.com](https://myaccess.microsoft.com), search **"Claude AI"**, submit the request.
2. Ask your manager to approve it (under Approvals in MyAccess). If your manager is OOO, post in [`#ai-help`](https://razorpay.slack.com/archives/C08C35GKJKD) and tag `@techit` — admins bypass the approval after a short delay.
3. Wait ~30–40 minutes after approval for Azure AD sync. If Claude.ai still shows you on a "Free Plan" after that window, sync is still catching up; give it another 15 minutes before re-routing.
4. Install **Claude Desktop** from Self Service (Mac). Treat this as the enterprise seat / SSO check for chat and co-work — not the code path.
5. Go to [claude.ai](https://claude.ai), sign in with SSO → Razorpay email + MFA. You should see your org workspace.

### Step 2 — Install Claude Code

Run the program-pinned setup script in your terminal. This is the *only* install command you should run:

```bash
curl -fsSL https://get-claude.dev.razorpay.in/setup.sh | bash
```

The script:

- installs Claude Code,
- writes `~/.claude/settings.json` pointing at the Razorpay LiteLLM gateway (`https://llm-gateway.razorpay.com`),
- mints a LiteLLM API key for you,
- installs the Zscaler certificate trust chain,
- removes any stale Vertex environment variables left over from the March migration.

After the script finishes, **restart your terminal** (important — environment changes only apply to new shells). Then run `claude` and follow the browser SSO login prompt if it appears. Do **not** run `claude /login` from the shell; `/login` is an in-session slash command, not a terminal subcommand. You are ready when a fresh prompt returns a response. For code tasks, trust this terminal path and the LiteLLM dashboard over Claude Desktop's quota display.

Do not paste commands from a teammate's terminal unless `#ai-help` confirms they apply to your machine. Two laptops can have different existing state — especially if one of you was on the Vertex-era setup.

---

## Worked example: verify the layers

After running the setup flow, verify one layer at a time.

Check git:

```bash
git --version
```

Check Node:

```bash
node --version
```

Check the package manager your repo expects:

```bash
npm --version
pnpm --version
```

It is okay if one project uses `npm` and another uses `pnpm`. Follow the repo. Do not switch package managers casually inside a repo.

Check Claude Code:

```bash
claude --version
```

Check you are in a clean sandbox repo before running project commands:

```bash
pwd
git status
```

Run the repo's documented install command only from the repo root:

```bash
npm install
```

or:

```bash
pnpm install
```

Which one? The repo README and lockfile tell you. If you see `pnpm-lock.yaml`, use `pnpm` unless the README says otherwise. If you see `package-lock.json`, use `npm` unless the README says otherwise.

---

## What `~/.claude/settings.json` should look like

The setup script writes this file for you. You should not need to edit it. If you do need to inspect it (because something looks off and you want to compare), this is the canonical shape:

```json
{
  "env": {
    "ANTHROPIC_BASE_URL": "https://llm-gateway.razorpay.com",
    "ANTHROPIC_CUSTOM_HEADERS": "x-litellm-api-key: Bearer sk-...",
    "ANTHROPIC_DEFAULT_OPUS_MODEL": "claude-opus-4-8",
    "ANTHROPIC_DEFAULT_SONNET_MODEL": "claude-sonnet-4-6",
    "ANTHROPIC_DEFAULT_HAIKU_MODEL": "claude-haiku-4-5",
    "DISABLE_PROMPT_CACHING": "0",
    "DISABLE_TELEMETRY": "1"
  },
  "model": "sonnet[1m]",
  "effortLevel": "low"
}
```

The `Bearer sk-...` value is your personal LiteLLM key — keep it private. If you rotate it (LiteLLM token page → regenerate), replace it in this file.

Two checks on this file:

| Symptom | Likely cause |
|---|---|
| `claude` errors with `403 PERMISSION_DENIED` referencing `aiplatform.googleapis.com` | stale Vertex env vars in `~/.bashrc` or `~/.zshrc` (see Common failure modes below) |
| `claude` errors with `401 authentication_error` after a laptop restart | LiteLLM key rotated or expired — rerun the setup script |
| `claude` runs but usage does not appear in the LiteLLM dashboard | shell env vars `ANTHROPIC_BASE_URL` or `ANTHROPIC_API_KEY` overriding `settings.json` |

Do not "fix" by hand-editing this file unless `#ai-help` walks you through it. Re-running the setup script is faster and safer.

---

## What setup verification should prove

Verification is five concrete checks. Run them in order; each one passing is your GREEN signal.

```bash
# 1. Setup script completed without errors
#    (you saw "Setup complete" at the end of the curl | bash above)

# 2. Restart your terminal (close the window, open a new one)

# 3. Claude Code is installed and on PATH
claude --version
#    Expected: a version string like "claude 1.2.3"

# 4. Claude Code opens in agent mode
claude
#    Expected: the agent prompt opens. If SSO login is needed,
#    follow the browser flow. Do not run `claude /login`.

# 5. A small prompt round-trips through the LiteLLM gateway
#    Inside the claude prompt, type:
#       hello
#    Expected: a reply. Exit with Ctrl-D or /exit.
```

If any of those five fails, you are YELLOW or RED — see the next section and re-run the setup script before re-routing. Those five checks become **Quest W-0**.

---

## Common failure modes

These are the eight shapes the support channel sees most often. Each has a known fix — try the fix before re-routing.

**1. Manager OOO blocks your MyAccess approval.** Symptom: you submitted the access request, manager is on leave, nothing moves. Fix: post in [`#ai-help`](https://razorpay.slack.com/archives/C08C35GKJKD) with `@techit` tagged and a one-line "manager OOO, requesting bypass." Admins bulk-approve in batches; expect ~1 hour business-time, then a fresh ~40-minute Azure AD sync window.

**2. "Free Plan" showing on claude.ai after approval.** Symptom: MyAccess says approved, but claude.ai shows you on the Free Plan. Fix: wait. Azure AD sync takes ~30–40 minutes after approval, sometimes longer. If you are past 60 minutes, re-route in `#ai-help`.

**3. `claude` errors with `403 PERMISSION_DENIED` / Vertex permission.** Symptom: the error references `aiplatform.googleapis.com` or `pod-velocity-claude-code`. Cause: stale Vertex environment variables left in your shell rc. Check `~/.bashrc` and `~/.zshrc` for these and remove them:

```bash
# Remove these lines if present:
export ANTHROPIC_VERTEX_PROJECT_ID='pod-velocity-claude-code'
export CLAUDE_CODE_USE_VERTEX=1
export CLOUD_ML_REGION='global'
```

Then re-run the setup script and **restart your terminal**. The new script auto-purges these, but it cannot purge what your shell has already loaded.

**4. `claude` errors with `401 authentication_error` after a laptop restart.** Cause: LiteLLM OAuth token expired or rotated. Fix: re-run the setup script. It re-mints a fresh key into `~/.claude/settings.json`.

**5. `exceeded budget for model=claude-opus-4-6` or `claude-opus-4-7`.** Cause: your session or config still points at a retired Opus model. Fix: enable `claude-opus-4-8` on your LiteLLM key, then run `/model claude-opus-4-8` inside Claude Code or set `"ANTHROPIC_DEFAULT_OPUS_MODEL": "claude-opus-4-8"` in `~/.claude/settings.json`. If Claude Code's model picker still lists Opus 4.7 or other retired labels, treat the picker as stale and use the direct `/model claude-opus-4-8` command instead. If the gateway says `key_model_access_denied`, enable Opus 4.8 on your LiteLLM key and retry after two to three minutes. If `claude-opus-4-8` itself is capped or rate-limited, use Sonnet or an enabled OSS model for routine work; Opus is for deep reasoning, not the everyday default.

**6. Hit a model-wise or LiteLLM usage limit.** Symptom: Claude Code errors with `ExceededBudget`, a model becomes restricted, or a quota-increase request is declined. Code usage should go through LiteLLM in the CLI: the total per-builder cap remains $750 across all enabled gateway models, including OSS routes, with model-family limits for Opus ($300), Sonnet ($200), and GPT ($100) able to run out earlier. Fix: first check whether you hit a model-family limit or the total LiteLLM cap. For a model-family limit, move everyday work to Sonnet, Codex, or an enabled OSS model instead of asking for an automatic bump. For a total `Budget=750.0` exhaustion, do not expect another gateway model, OSS route, or personal Claude Max plan to bypass the cap; wait for reset or post in `#ai-help` with the blocked work and manager approval visible if your work has an approved exception.

**7. Usage not visible in the LiteLLM dashboard.** Cause: shell-level env vars `ANTHROPIC_BASE_URL` or `ANTHROPIC_API_KEY` overriding what `~/.claude/settings.json` sets. Fix: `unset ANTHROPIC_BASE_URL ANTHROPIC_API_KEY` in your current shell, then check `~/.bashrc` / `~/.zshrc` and remove any persisted overrides. Restart terminal.

**8. `Unknown skill: login` after running `claude /login`.** Cause: `/login` is an in-session slash command, not a shell command. Running `claude /login` passes `/login` as prompt text and Claude tries to resolve it as a skill. Fix: run `claude` by itself and follow the browser SSO flow if prompted. If an editor extension session is stuck after setup, run `claude auth logout`, then `claude auth login`, restart the editor, and retry.

If you hit a shape that isn't one of these eight, route it to `#ai-help` with: the command you ran, the redacted output, your machine class, and what you have already tried.

---

## GREEN / YELLOW / RED self-check

You are **GREEN** if:

- `git --version`, `node --version`, package manager version, and `claude --version` work;
- you know whether a repo uses `npm` or `pnpm`;
- the program verification command reports GREEN;
- `git status` is clean after setup unless a module told you to change a file.

You are **YELLOW** if:

- one tool is installed but version-misaligned;
- package install fails with registry, auth, or certificate wording;
- setup worked only after a manual workaround.

You are **RED** if:

- the official setup flow cannot complete;
- registry or certificate repair fails;
- you are tempted to bypass the approved package path.

YELLOW and RED should be posted with the exact command, the redacted output, and your machine class.

---

## What you can say after this module

> "I can verify each layer of the local AI dev stack instead of guessing whether setup worked."

---

## Pinned reference

For the print-this-and-stick-it-on-your-monitor version:

| Thing you need | Value |
|---|---|
| Setup script | `curl -fsSL https://get-claude.dev.razorpay.in/setup.sh \| bash` |
| LLM gateway URL | `https://llm-gateway.razorpay.com` |
| Settings file | `~/.claude/settings.json` |
| MyAccess portal | [myaccess.microsoft.com](https://myaccess.microsoft.com) |
| Support channel | [`#ai-help`](https://razorpay.slack.com/archives/C08C35GKJKD) |
| Cohort + show-and-tell | [`#product-ai-labs`](https://razorpay.slack.com/archives/C0A7B848RS7) |
| Canonical rollout thread | [Step-by-step in `#engineering-all`](https://razorpay.slack.com/archives/C06GNML2QJF/p1774334791951129) |
| Pricing reference | [Anthropic pricing docs](https://platform.claude.com/docs/en/about-claude/pricing) |

*Last reviewed: 2026-07-03. If any value here is stale, ping `#ai-help` and this row gets refreshed.*

> **Want this on one page?** [H.7 — Day-1 quick reference](../../appendices/H-reference-cards/H7-day-1-quick-reference.md) consolidates this table with the channels, the role-holders, and the common failure modes onto a single printable card.

---

**Previous:** [W.4 Your auth setup](W04-auth-setup.md) - **Next:** [W.6 The LLM Gateway](W06-llm-gateway.md)

