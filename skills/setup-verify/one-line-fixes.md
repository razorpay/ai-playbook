# setup-verify one-line fixes

For each non-green status the checks produce, this file names the one-line fix. The fixes assume the user is on a Razorpay-issued laptop with the standard setup script run at least once.

When the one-line fix does not resolve the issue, the user follows the deeper-fix pointer at the end of each entry. When the deeper fix also does not resolve it, the user escalates per the README's escalation path.

---

## Check 1: Node and pnpm versions

**YELLOW (one minor version behind).** Update.

```
nvm use --lts && npm install -g pnpm@latest
```

Deeper fix: see [W.5 — Installing the stack](../../belts/01-white/W05-installing-the-stack.md) for the canonical install path including nvm setup.

**RED (wrong major or missing).** Reinstall via nvm.

```
nvm install <program-pinned-major> && nvm alias default <program-pinned-major>
```

Then re-install pnpm globally. Deeper fix: W.5.

---

## Check 2: Claude Code authentication

**YELLOW (auth older than 90 days).** Re-authenticate.

```
claude code login
```

Follow the prompts. Deeper fix: [W.4 — Your auth setup](../../belts/01-white/W04-auth-setup.md).

**RED (not installed or not authenticated).** Install per W.5, then authenticate per W.4. If you are already installed but authenticated against a personal plan, the fix is:

```
claude code logout && claude code login --plan=program
```

Deeper fix: W.4 and W.5.

---

## Check 3: Internal npm registry

**YELLOW (fallback to public for scoped packages).** Set the scoped registry explicitly.

```
pnpm config set @razorpay:registry <internal-url>
```

Replace `<internal-url>` with the URL from Appendix B. Deeper fix: [Appendix B — Environment Setup](../../appendices/B-environment-setup/README.md).

**RED (registry unreachable or wrong URL).** Set the global registry first, then re-run the probe.

```
pnpm config set registry <internal-url>
pnpm install <known-internal-package>
```

If the install still fails, the issue is usually network (VPN not connected) or proxy (Check 4). Deeper fix: Appendix B plus Appendix D if it has an entry for your specific symptom.

---

## Check 4: Corporate-proxy certificate

**YELLOW (cert in system trust store, missing from tool-specific trust).** Add the cert to the tool's own trust store. For pnpm:

```
pnpm config set cafile <path-to-corp-cert>
```

For Claude Code, see [W.4](../../belts/01-white/W04-auth-setup.md) for the tool-specific certificate path.

**RED (cert missing or untrusted).** Install the corporate cert into the system trust store. The setup script normally handles this; if it did not, re-run the cert step manually.

Deeper fix: W.4. If the cert symptom looks like an MITM failure, post the full error in the program's primary support channel; do not work around it.

---

## Check 5: No stale Vertex environment variables

**YELLOW (Vertex env vars loaded in current shell but absent from rc files).** Close the terminal window and open a new one. The clean shell will pass.

**RED (Vertex env vars present in `~/.bashrc` or `~/.zshrc`).** Edit those files and remove these lines if present:

```
export ANTHROPIC_VERTEX_PROJECT_ID='pod-velocity-claude-code'
export CLAUDE_CODE_USE_VERTEX=1
export CLOUD_ML_REGION='global'
```

Then re-run the setup script and open a new terminal:

```
curl -fsSL https://get-claude.dev.razorpay.in/setup.sh | bash
```

If `403 PERMISSION_DENIED` errors persist after a fresh terminal, route to `#ai-help` with the redacted error and the contents of `grep VERTEX ~/.bashrc ~/.zshrc`.

Deeper fix: [W.6 — The LLM Gateway](../../belts/01-white/W06-llm-gateway.md).

---

## Check 6: LiteLLM proxy

**YELLOW (elevated latency).** No user-side fix; the platform team is the right escalation. Continue working; the latency may resolve. If it persists for more than thirty minutes, post in [`#ai-help`](https://razorpay.slack.com/archives/C08C35GKJKD) with your probe output.

**RED (proxy unreachable).** First, confirm VPN is connected. Second, check the program's status page if one exists. If both look fine and the proxy is still unreachable, post in [`#ai-help`](https://razorpay.slack.com/archives/C08C35GKJKD) with the full probe output and your setup-verify report.

Deeper fix: [G.23 — The LLM proxy](../../belts/03-green/c-guardrails/G23-llm-proxy.md).

---

## Check 7: Compass plugin

**YELLOW (minor version behind, or one or two skills not discoverable).** Update the plugin.

```
claude plugin update compass
```

Then re-run setup-verify Check 7. If skills are still not discoverable after the update, the deeper fix is to clear the plugin cache:

```
claude plugin cache clear compass
```

**RED (wrong major version or checksum mismatch).** Reinstall from the program-pinned distribution.

```
claude plugin install <program-pinned-compass-url>
```

The URL is in [W.7](../../belts/01-white/W07-compass-plugin.md). Verify the checksum matches the pinned reference.

Deeper fix: W.7 and [B.3 — Cowork plugin marketplace](../../belts/04-black/a-platform/B03-cowork-plugin-marketplace.md) for the version-pinning discipline.

---

## Check 8: Git configuration

**YELLOW (personal credential helper).** Switch to corp SSO.

```
git config --global credential.helper '<corp-sso-helper>'
```

The exact helper name is in W.4 (it varies by OS).

**RED (Git not configured or pushes fail).** Configure Git's identity first.

```
git config --global user.name "Your Name"
git config --global user.email "you@razorpay.com"
```

Then configure the credential helper as above. If pushes to internal repos still fail, the issue is SSO not being provisioned yet; that is a tracker-handled provision, not a user-side fix.

Deeper fix: W.4 and [W.12 — Your first PR](../../belts/01-white/W12-first-pr.md).

---

## Check 9: Environment variables

**YELLOW (optional env vars missing).** The setup-verify report names which env vars are missing. Look up the values in the program's secret-management surface and add them to your local env config.

**RED (required env vars missing).** Same fix as YELLOW, but the missing variables are blockers. The report names them by name (never by value).

Deeper fix: [W.5 — Installing the stack](../../belts/01-white/W05-installing-the-stack.md) for the env-var inventory.

---

## Check 10: Health endpoints

**YELLOW (degraded latency).** No user-side fix; the platform team is the escalation. Note the degradation in your daily standup if it affects work.

**RED (endpoints unreachable).** First, confirm VPN is connected. If VPN is up and endpoints are still unreachable, the issue is platform-side. Post in the infrastructure channel with the full setup-verify report.

Deeper fix: [Appendix B — Environment Setup](../../appendices/B-environment-setup/README.md).

---

## When the one-line fix does not work

If the one-line fix does not resolve the issue within fifteen minutes:

1. Read the deeper-fix pointer (the chapter linked under each check).
2. Search [Appendix D — Known Issues](../../appendices/D-known-issues/README.md) for the specific symptom.
3. If the symptom is not in Appendix D, post in the program's primary support channel with the full setup-verify report.
4. If you solve the issue yourself, contribute the fix to Appendix D so the next person finds it faster.

---

*Last updated: 2026-05-08. Fixes evolve as common-issue patterns emerge; the underlying checks (in `checks.md`) are pinned.*
