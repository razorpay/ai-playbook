# setup-verify checks

The ten checks the skill runs. Each check has: a name, what it reads from the environment, the criteria for GREEN / YELLOW / RED, and what each status means.

The checks are pinned. Adding, removing, or modifying a check requires a charter revision.

---

## Check 1: Node and pnpm versions

**Reads.** `node --version` and `pnpm --version` from the shell.

**Criteria.**
- **GREEN.** Node version matches the program-pinned major version exactly; pnpm version is at or above the program-pinned minimum.
- **YELLOW.** Node version is one minor version behind the program-pinned version, or pnpm is one minor version behind.
- **RED.** Node is a different major version, pnpm is a different major version, either is missing entirely, or the shell does not recognise the commands.

**What it means.** Node and pnpm are the runtime substrate for everything else. A wrong version produces subtle failures throughout the curriculum.

---

## Check 2: Claude Code authentication

**Reads.** Claude Code's auth status (typically through the CLI's whoami-equivalent) plus the presence of the auth config file.

**Criteria.**
- **GREEN.** Claude Code is installed and authenticated against the program's plan.
- **YELLOW.** Claude Code is installed and authenticated, but the auth token is older than ninety days (re-auth recommended).
- **RED.** Claude Code is not installed, or installed but not authenticated, or authenticated against a personal plan rather than the program's plan.

**What it means.** Without Claude Code authenticated, none of the curriculum's AI-assisted patterns work.

---

## Check 3: Internal npm registry access

**Reads.** `pnpm config get registry` and a probe install against an internal-only package.

**Criteria.**
- **GREEN.** Registry config points at the internal registry. The probe install succeeds without falling back to the public registry.
- **YELLOW.** Registry config is set correctly, but the probe install falls back to a public registry for one or more scoped packages. The user can install most things; some internal packages will fail.
- **RED.** Registry config is not set, points at the wrong URL, or the probe install fails entirely (network, auth, or unreachable).

**What it means.** Internal packages (the Compass plugin, internal MCP servers, internal connectors) require the right registry. Falling back to public is a known YELLOW state that surfaces as broken-on-second-run.

---

## Check 4: Corporate-proxy certificate trust

**Reads.** Whether the corporate-proxy certificate is in the system trust store and whether the package manager and Claude Code recognise it.

**Criteria.**
- **GREEN.** Cert is in the system trust store; package manager honours it; Claude Code's network calls succeed through the proxy.
- **YELLOW.** Cert is in the system trust store but a specific tool (pnpm or Claude Code) has its own trust store that needs the cert added separately. Function works for now but will break under proxy reload.
- **RED.** Cert is missing or untrusted; HTTPS calls fail with certificate errors.

**What it means.** Razorpay's network egress goes through a corporate proxy. Without the cert trusted, every outgoing HTTPS call fails with confusing error messages.

---

## Check 5: gcloud and Vertex AI authentication

**Reads.** `gcloud auth list` and a probe against the Vertex AI endpoint the program uses.

**Criteria.**
- **GREEN.** gcloud is authenticated against the program's project; Vertex AI probe returns a valid response.
- **YELLOW.** gcloud is authenticated but the active account is not the program's; switching is one command.
- **RED.** gcloud is not installed, not authenticated, or the Vertex probe fails (401, 403, network).

**What it means.** Some calls route through Vertex AI. Without authentication, those calls fail and the LLM gateway diagnostic message is unhelpful.

---

## Check 6: LiteLLM proxy reachable

**Reads.** A probe against the LiteLLM proxy's health endpoint.

**Criteria.**
- **GREEN.** Health endpoint returns 200 within the timeout.
- **YELLOW.** Health endpoint returns 200 but with elevated latency (>2s).
- **RED.** Health endpoint times out, returns a non-200, or is unreachable.

**What it means.** The LiteLLM proxy is the routing layer for the program's LLM calls. If it is unreachable, nothing using the proxy works. Elevated latency is signal that something upstream is degraded.

---

## Check 7: Compass plugin installed and verified

**Reads.** The Compass plugin's installed version and its checksum against the program-pinned reference.

**Criteria.**
- **GREEN.** Plugin is installed at the program-pinned version; checksum verifies; all skills the plugin contributes are discoverable.
- **YELLOW.** Plugin is installed but at a version one minor behind the pinned version, or one or two skills the plugin should contribute are not yet discoverable. The user can do most things; specific skills may surface "not found" errors.
- **RED.** Plugin is not installed, installed at a wrong major version, or the checksum does not match the program-pinned reference.

**What it means.** The Compass plugin carries the program's pinned skill bundle. Without it (or with the wrong version), most of the curriculum's referenced skills do not work.

---

## Check 8: Git configuration with corp SSO

**Reads.** Git's user-name, user-email, and credential-helper configuration.

**Criteria.**
- **GREEN.** Git is configured with the user's Razorpay email and the corp SSO credential helper.
- **YELLOW.** Git works (commits can be made and pushed) but uses a personal credential helper. Switching to corp SSO is a one-time setup.
- **RED.** Git is not configured (email or name missing), or commits cannot be pushed to internal repositories due to auth failures.

**What it means.** First-PR quests (W-1, Y-1, Y-B) all require Git working against internal repositories. Personal credential helpers work for personal repos but will fail intermittently on internal ones.

---

## Check 9: Environment variables present

**Reads.** The set of environment variables the curriculum depends on (without surfacing their values; this check verifies presence, not content).

**Criteria.**
- **GREEN.** All required env vars are present; the program's `.env.example` shape is fully populated.
- **YELLOW.** Required env vars are present but one or two optional ones are missing (the user will hit specific features that need them).
- **RED.** One or more required env vars is missing or empty.

**What it means.** Several skills and chapters reference env vars by name. The check confirms presence; the user fills in values from the program's secret-management surface, not from this skill.

This check never logs the values. Names only.

---

## Check 10: Health endpoints responding

**Reads.** A small set of program-internal health endpoints that the curriculum depends on (the Compass plugin's, the LiteLLM proxy's, the Vertex routing layer's).

**Criteria.**
- **GREEN.** All endpoints return 200 within the timeout.
- **YELLOW.** One endpoint is degraded (200 with elevated latency or 503 with retry-after).
- **RED.** One or more endpoints is unreachable or returning errors that block functionality.

**What it means.** The endpoints check confirms that the program's runtime substrate is reachable from the user's machine. A RED here is usually a network or VPN issue, not a setup issue.

---

## Overall status

The skill computes an overall status from the ten checks:

- **GREEN.** All ten checks are GREEN.
- **YELLOW.** One or more checks are YELLOW; none are RED.
- **RED.** One or more checks are RED.

Quest W-0 requires GREEN overall. A YELLOW overall is acceptable for everyday work but should be resolved before the user moves to a structured cohort (Ship-to-Learn or a belt cohort) where the YELLOW pattern compounds.

---

*Last updated: 2026-05-08. The ten checks are pinned; modifications require a charter revision.*
