---
title: "Day-1 quick reference"
slug: "appendices/reference-cards/day-1-quick-reference"
section: "appendices"
status: "drafted"
type: "reference-card"
track: "reference-cards"
order: 7
time_minutes: 2
audience: "everyone"
outcome: "Have one printable page with every command, channel, and contact a new builder needs in their first week."
prev: "appendices/reference-cards/mv-wiki-one-pager"
next: null
pillar: "harness"
belt: "white"
tags: ["appendix", "reference-card", "day-one", "setup", "channels", "people"]
updated: "2026-06-30"
---

# H.7 — Day-1 quick reference

> **Print this. Pin it.** The one page that gets a new builder unstuck. Companion to [W.5 — Installing the stack](../../belts/01-white/W05-installing-the-stack.md), [Quest W-0 — Turn GREEN](../../belts/01-white/quest-W0-turn-green.md), [Appendix F — Slack Channels](../F-slack-channels/README.md), and [§0.6 — Meet the people](../../prologue/06-people-and-pocs.md). When this card disagrees with those chapters, those chapters win.

---

## The two-step install

**Step 1 — Get access.** [myaccess.microsoft.com](https://myaccess.microsoft.com) → search "Claude AI" → submit → manager approves → wait ~30–40 minutes for Azure AD sync → install Claude Desktop from Self Service → sign into [claude.ai](https://claude.ai) with SSO.

**Step 2 — Install Claude Code.** Run this in your terminal, then restart the terminal:

```bash
curl -fsSL https://get-claude.dev.razorpay.in/setup.sh | bash
```

---

## The five GREEN checks (Quest W-0)

```bash
# 1. Setup script printed "Setup complete"
# 2. Terminal restarted (close window, open new one)
claude --version    # 3. prints a version
claude              # 4. opens cleanly
> hello             # 5. round-trips a reply
```

If any check fails → see Common failures below.

---

## `~/.claude/settings.json` — the canonical shape

```json
{
  "env": {
    "ANTHROPIC_BASE_URL": "https://llm-gateway.razorpay.com",
    "ANTHROPIC_CUSTOM_HEADERS": "x-litellm-api-key: Bearer sk-...",
    "ANTHROPIC_DEFAULT_OPUS_MODEL": "claude-opus-4-6",
    "ANTHROPIC_DEFAULT_SONNET_MODEL": "claude-sonnet-4-6",
    "ANTHROPIC_DEFAULT_HAIKU_MODEL": "claude-haiku-4-5",
    "DISABLE_PROMPT_CACHING": "0",
    "DISABLE_TELEMETRY": "1"
  },
  "model": "sonnet[1m]",
  "effortLevel": "low"
}
```

The setup script writes this for you. Don't hand-edit unless [`#ai-help`](https://razorpay.slack.com/archives/C08C35GKJKD) walks you through it.

---

## The channels you need first

| If you need… | Channel |
|---|---|
| Setup, access, troubleshooting | [`#ai-help`](https://razorpay.slack.com/archives/C08C35GKJKD) |
| Razorpay devstack / local env | [`#devstack-onboarding-support`](https://razorpay.slack.com/archives/C08T27QH5L4) |
| Cowork desktop app | [`#cowork-help`](https://razorpay.slack.com/archives/C0B0G3NGLP6) |
| Show what you built / read AI wins | [`#ai-bulletin`](https://razorpay.slack.com/archives/C08NRSW1BUZ) |
| Code-craft for AI tooling | [`#ai-code-champions`](https://razorpay.slack.com/archives/C08BU395ZEJ) |
| Skills to use / contribute | [`#rzp-claude-skills`](https://razorpay.slack.com/archives/C0ABFFW6XNW), [`#devex-skills`](https://razorpay.slack.com/archives/C0A8QFH9KEF) |
| Cohort, show-and-tell | [`#product-ai-labs`](https://razorpay.slack.com/archives/C0A7B848RS7) |
| Design system / Blade | [`#design-system`](https://razorpay.slack.com/archives/CMQ3RBHEU), [`#experience_fe_core`](https://razorpay.slack.com/archives/C01H13RTF8V) |
| AI in design practice | [`#ai-in-design`](https://razorpay.slack.com/archives/C08P2EU96EP) |
| PM + marketing AI | [`#ai-pmm`](https://razorpay.slack.com/archives/C09L2VBR2UD) |
| MCP / internal connectors | [`#mcp-dev`](https://razorpay.slack.com/archives/C08PEUVAZ1B) |
| Devex platform (codegen, tests) | [`#developer-experience`](https://razorpay.slack.com/archives/C08DS8AE7T8) |
| API design / council | [`#api_council`](https://razorpay.slack.com/archives/C0168DC4DCZ) |

Full directory in [Appendix F](../F-slack-channels/README.md). When in doubt about which channel to ask in, ask in `#ai-help` and let it route.

---

## The people to DM

| Role | Current holder | DM when |
|---|---|---|
| Program lead | Bhanu Prakash (`@Bhanu Prakash Rayapati`) | escalating something the channel hasn't resolved |
| Engineering co-lead | Kaushik Bhat (`@kb`) | tooling, infrastructure, devex platform |
| Setup script owner | Prafulla Anurag (`@prafulla`) | rerunning setup doesn't fix it |
| Usage cap / quota | `@RKV` | only if `#ai-help` routes you there |
| Design transformation | Saurabh Soni (`@Saurabh Soni`) | design-track-specific friction |
| Compass plugin (co-owned) | Aravinth P K (`@Aravinth P K`) + Vaibhav Dhir (`@Dhir`) | plugin updates, skill load failures, contribution intent |
| Blade design-system leads | Saurabh Soni + Varun Achar (`@Varun Achar`) | Blade compliance edge cases |
| Playbook author | Vaibhav Dhir (`@Dhir`) | a chapter reads wrong, something's missing, stale info to patch |

For most questions, post in the right channel before DMing. DMs help you; channels help everyone. See [§0.6 — Meet the people](../../prologue/06-people-and-pocs.md).

---

## Common failures, one-line fixes

| Symptom | Fix |
|---|---|
| Manager OOO blocks MyAccess approval | post in `#ai-help` with `@techit` tagged; admins bulk-approve |
| "Free Plan" showing on claude.ai after approval | wait 30–40 minutes for Azure AD sync; if past 60 min, re-route in `#ai-help` |
| `403 PERMISSION_DENIED` referencing `aiplatform.googleapis.com` | remove `ANTHROPIC_VERTEX_PROJECT_ID`, `CLAUDE_CODE_USE_VERTEX`, `CLOUD_ML_REGION` from `~/.bashrc`/`~/.zshrc`; re-run setup; restart terminal |
| `401 authentication_error` after laptop restart | re-run the setup script (re-mints the LiteLLM key) |
| `429 RESOURCE_EXHAUSTED` on `claude-opus-4-6` | switch to Sonnet — edit `"model": "sonnet[1m]"` in `~/.claude/settings.json` or pass `--model sonnet` |
| Hit a model-wise or LiteLLM usage limit | trust LiteLLM over claude.ai usage; try Sonnet, Codex, or enabled OSS for routine work; if total `Budget=750.0` is exhausted, wait for reset or post in `#ai-help` with manager approval for approved exceptions |
| Usage missing from LiteLLM dashboard | `unset ANTHROPIC_BASE_URL ANTHROPIC_API_KEY` in current shell; remove persisted overrides from `~/.bashrc`/`~/.zshrc`; restart terminal |
| Anything else | post in `#ai-help` with: command run, redacted output, machine class, what you tried |

---

## Pinned URLs

| Thing | Link |
|---|---|
| Setup script source | `https://get-claude.dev.razorpay.in/setup.sh` |
| LLM gateway | `https://llm-gateway.razorpay.com` |
| Settings file location | `~/.claude/settings.json` |
| MyAccess portal | [myaccess.microsoft.com](https://myaccess.microsoft.com) |
| Canonical rollout thread | [`#engineering-all` p1774334791951129](https://razorpay.slack.com/archives/C06GNML2QJF/p1774334791951129) |
| Anthropic pricing | [platform.claude.com/docs/.../pricing](https://platform.claude.com/docs/en/about-claude/pricing) |

---

*Last reviewed: 2026-06-27. If anything on this card is stale, ping [`#ai-help`](https://razorpay.slack.com/archives/C08C35GKJKD) and it gets patched in the next revision.*

---

**Up to:** [↑ Appendix H](README.md) · **Companion:** [W.5](../../belts/01-white/W05-installing-the-stack.md), [Quest W-0](../../belts/01-white/quest-W0-turn-green.md), [Appendix F](../F-slack-channels/README.md), [§0.6 Meet the people](../../prologue/06-people-and-pocs.md)
