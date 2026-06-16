---
title: "Appendix F: Slack Channels & Rules of Engagement"
slug: "appendices/slack-channels"
section: "appendices"
status: "drafted"
type: "readme"
track: "slack-channels"
order: 0
time_minutes: 6
audience: "everyone"
outcome: "Find the right channel for the question you have, follow the etiquette so the program's primary channels stay useful, and know where to celebrate wins or escalate concerns."
prev: null
next: null
pillar: null
belt: null
tags: ["appendix", "slack", "channels", "etiquette", "directory"]
updated: "2026-06-16"
---

# Appendix F: Slack Channels & Rules of Engagement

> **This is the live directory.** Channel handles, purposes, and owners as of the date in the frontmatter. The directory is reviewed quarterly and on-demand when channels split or merge. If a row looks stale, ping [`#ai-help`](https://razorpay.slack.com/archives/C08C35GKJKD) and it gets fixed in the next revision.

## What this appendix is

The directory of Slack channels the playbook references, paired with the etiquette and rules of engagement that keep them useful. Channels are organised by purpose, not alphabetically. Every chapter that says "post in [channel]" links here.

## Channel directory

### Setup, access, troubleshooting

The first channels every builder needs.

The former [`#claude-onboarding-support`](https://razorpay.slack.com/archives/C0ANCMTCJA2/p1778934850982109) channel was archived on 2026-05-16 with instructions to log further support in `#ai-help`; the rows below use the active handle.

| Handle | Purpose | Owner / first responders | First-response expectation |
|---|---|---|---|
| [`#ai-help`](https://razorpay.slack.com/archives/C08C35GKJKD) | MyAccess access requests, install/setup help, LiteLLM gateway issues, manager-OOO approval bypass, troubleshooting `claude` errors, and general AI help. **The active successor to archived `#claude-onboarding-support` for White Belt builders.** | AI help responders; access escalations to `@techit` subteam | < 1 day business |
| [`#engineering-all`](https://razorpay.slack.com/archives/C06GNML2QJF) | Org-wide engineering announcements. Home of the [canonical Claude rollout thread](https://razorpay.slack.com/archives/C06GNML2QJF/p1774334791951129). Don't post setup questions here — route to `#ai-help` instead. | Engineering leadership | Announcements, not Q&A |
| [`#devstack-onboarding-support`](https://razorpay.slack.com/archives/C08T27QH5L4) | Razorpay devstack onboarding — local environment, repo bootstrap, devstack shrc. Adjacent to Claude setup; sometimes the right place when the error is environment-level rather than Claude-level. | Devstack team | < 4 hours business |

### AI community, show-and-tell, skills

Where builders gather to swap patterns, share wins, and showcase what they've built. The default rooms for "look what I made" conversation.

| Handle | Purpose | Owner | First-response expectation |
|---|---|---|---|
| [`#ai-bulletin`](https://razorpay.slack.com/archives/C08NRSW1BUZ) | Magical AI stories — share what you're doing with AI; learn from each other. The org-wide signal channel for AI wins. Use threads for follow-up questions. | Khilan Haria | Async |
| [`#ai-code-champions`](https://razorpay.slack.com/archives/C08BU395ZEJ) | Hacks, ideas, and best practices for getting the most out of AI coding tools. The peer-to-peer craft room for builders shipping with AI daily. | Yash Doshi | Async |
| [`#ai-coding-experiments`](https://razorpay.slack.com/archives/C0AK3F680GL) | AI coding experiments — try-this-and-see channel for new tools, new prompts, new workflows before they're patterns. | Kaushik Bhat | Async |
| [`#ai-pmm`](https://razorpay.slack.com/archives/C09L2VBR2UD) | AI for PMM and marketing — campaign workflows, content generation, audience analysis. The PM-Marketing-adjacent home. | Vaidehee Prayaag Joshi | Async |
| [`#product-ai-labs`](https://razorpay.slack.com/archives/C0A7B848RS7) | Product AI Labs pilot — Claude Code + Compass first cohort. Show-and-tell and knowledge sharing for the product team. | Product Spec Reviewer; Aravinth P K for PM-side coordination | Async |
| [`#pod-velocity-and-ai-working-group`](https://razorpay.slack.com/archives/C084MV74HFS) | The cross-pod working group on velocity + AI. Coordination, decisions, working-group artefacts (tracker in pinned). | Nirvisha Mankad | Per-cadence |
| [`#rzp-claude-skills`](https://razorpay.slack.com/archives/C0ABFFW6XNW) | Razorpay Claude Skills — share skills you've built, find skills you can reuse. The discovery surface for the Skills Library. | Shobhit Jain | Async |
| [`#devex-skills`](https://razorpay.slack.com/archives/C0A8QFH9KEF) | Experiments toward Software AGI with Agent Skills. Showcase ideas and experiments — scan `/agent-skills` and `/claude-plugins` repos before building, in case it already exists. | Vikas Naidu | Async |
| [`#cowork-help`](https://razorpay.slack.com/archives/C0B0G3NGLP6) | Cowork desktop app — setup, plugin install, connector pairing, troubleshooting. Adjacent to but distinct from Claude Code. | Anurag Rastogi | < 1 day business |

### Design + design-track work

For builders on the design lane (designers, design engineers, anyone doing Figma → code work).

| Handle | Purpose | Owner | First-response expectation |
|---|---|---|---|
| [`#design-system`](https://razorpay.slack.com/archives/CMQ3RBHEU) | Blade — the canonical design-system channel. Component questions, contribution patterns, the "Everything related to Blade!" channel. | Saurabh Soni and the design-system leads | < 1 day business |
| [`#experience_fe_core`](https://razorpay.slack.com/archives/C01H13RTF8V) | Frontend Universe + Blade support. Raise a support ticket from the channel bookmarks for routed help. | Varun Achar and the frontend-core team | Per-ticket SLA |
| [`#blade-consumer`](https://razorpay.slack.com/archives/C098PQT5DK7) | Blade for consumer apps — narrower-scope Blade questions specific to consumer surfaces. | Ravikumar R | < 1 day business |
| [`#ai-in-design`](https://razorpay.slack.com/archives/C08P2EU96EP) | AI in design practice — how designers are using AI tools in their day-to-day, prompts that work, gotchas. | Saurabh Soni | Async |
| [`#ai-squad-design`](https://razorpay.slack.com/archives/C0980N2P6HL) | The AI design squad — the focused group driving AI design work. | Abhinav Krishna Aadiraju | Async |

### Platform, devex, tooling

For builders contributing back to platform layers — MCP servers, API design, the devex platform itself.

| Handle | Purpose | Owner | First-response expectation |
|---|---|---|---|
| [`#developer-experience`](https://razorpay.slack.com/archives/C08DS8AE7T8) | Innovating on how Razorpay writes code, tests, and automates reviews. The home channel for devex-platform work that the playbook depends on. | Kaushik Bhat | < 1 day business |
| [`#mcp-dev`](https://razorpay.slack.com/archives/C08PEUVAZ1B) | Razorpay's internal MCP server development. Links to [github.com/razorpay/razorpay-mcp-server](https://github.com/razorpay/razorpay-mcp-server). The home for building and consuming Razorpay-specific MCP connectors. | Shalky Sharma | < 1 day business |
| [`#testing-slash`](https://razorpay.slack.com/archives/C09CG60KLMU) | Testing the `/slash` plugin patterns — slash-command development, regression checks, plugin POCs. | Arnav Gaur | Async |
| [`#ai-pr-merge-requests`](https://razorpay.slack.com/archives/C0AT2TNFGM7) | Where AI-assisted PRs surface for visibility and review-routing. Use when you've shipped AI-generated work and want it found by reviewers tracking the pattern. | Vaibhav Dhir | Async |
| [`#api_council`](https://razorpay.slack.com/archives/C0168DC4DCZ) | The API Council — submissions, reviews, design-guide questions. Referenced in [B.15 — API Council contributions](../../belts/04-black/c-org/B15-api-council-contributions.md). | Khilan Haria | Per-review cadence |

### Wider product context

Channels every product person should be in even outside the playbook program. Not playbook-specific, but the discoverability surface for what's happening across the org.

| Handle | Purpose | Owner | First-response expectation |
|---|---|---|---|
| [`#product-all`](https://razorpay.slack.com/archives/C0AGW79U34Z) | Org-wide PM channel — cross-pod product conversation, PM-of-the-week patterns, product-leadership signal. | Chirag Jain | Announcements + Q&A |
| [`#prod-bulletin`](https://razorpay.slack.com/archives/C2NVBTWF6) | Customer-facing product announcements only. Screenshots and demo links required; no discussions. The signal channel for "what just shipped externally." | Shashank Mehta | Announcements only |
| [`#product-design-bulletin`](https://razorpay.slack.com/archives/C07KLQKSB6U) | Product design bulletin — design launches, pattern updates, design-system shipped work. Follow [the guidelines](https://bit.ly/product-design-bulletin). | Saurabh Soni | Announcements only |

### Exploration

For builders evaluating tools outside the canonical stack.

| Handle | Purpose | Owner | First-response expectation |
|---|---|---|---|
| [`#vibe-coding-tool-pocs`](https://razorpay.slack.com/archives/C094ZBKD6NM) | POCs with external tools — Superblocks, Replit, Loveable, etc. Goal: find a tool that works with Razorpay's design system, frontend, backend, and deployment stack. | Chaitanya Vikas Deorukhkar | Async |

### How to request a new channel

A new channel is justified when:

- A recurring topic does not fit any existing channel.
- A specific surface (a plugin, an integration, a forum) needs its own coordinated home.
- A cohort or initiative has enough sustained traffic to outgrow the cohort or program-flagship channel.

The flow:

1. Post in `#ai-help` describing the proposed channel and its purpose.
2. The program lead (or delegate) approves and creates the channel.
3. Send a one-line PR adding the channel to this appendix; the directory updates on the next merge.

## Etiquette and rules of engagement

The program's primary channels stay useful when the etiquette is followed. Six rules.

**1. Ask publicly, not in DM.** A question asked in the right public channel becomes searchable for the next person who hits the same problem. A question asked in DM helps you and dies. Resist the DM impulse; post publicly. The cost to you is brief; the benefit to the next person is real.

**2. Post the full output, not "it's broken".** When something fails, the diagnostic information is what enables a quick answer. Post the command you ran, the full error message, the relevant config (with secrets redacted), and what you have already tried. "Setup-verify is failing" is unhelpful; the actual setup-verify output is helpful.

**3. Celebrate merged PRs with the link.** The celebrations channel works when wins are visible. Post the PR link, name what shipped, and tag the team if relevant. A celebrations channel of vague humble-brags is worse than no channel; the link is the discipline.

**4. Never paste regulator-protected data.** Per [G.22](../../belts/03-green/c-guardrails/G22-redlines.md) and [G.24](../../belts/03-green/c-guardrails/G24-pii-pci-rbi.md). Customer data, payment card information, secrets, and tokens never go in any channel — public or private. If you need to share a real-world example, redact aggressively or use a synthetic equivalent.

**5. When you solve a problem, contribute to Appendix D.** The fix that worked for you helps the next person only if it lands in [Appendix D — Known Issues + FAQ](../D-known-issues/README.md). The contribution flow is documented there. A fix that lives only in a Slack thread evaporates within months.

**6. Tag the right channel; do not cross-post.** A question that fits [`#design-system`](https://razorpay.slack.com/archives/CMQ3RBHEU) goes in `#design-system`. Cross-posting (posting the same question in three channels) signals urgency to no one in particular and dilutes attention. If you genuinely do not know which channel is right, ask in [`#ai-help`](https://razorpay.slack.com/archives/C08C35GKJKD) and let it route.

## Escalation paths

Quick reference for "where does this question go?". Full role-and-forum mapping in [Appendix E](../E-roles-and-forums/README.md).

| Symptom | First contact |
|---|---|
| Can't install Claude Code; `claude --version` not found; setup script erroring | [`#ai-help`](https://razorpay.slack.com/archives/C08C35GKJKD) |
| Can't see Claude AI in MyAccess; manager OOO blocking approval | [`#ai-help`](https://razorpay.slack.com/archives/C08C35GKJKD) with `@techit` tagged |
| `403 PERMISSION_DENIED` referencing `aiplatform.googleapis.com`; stale Vertex env vars | [`#ai-help`](https://razorpay.slack.com/archives/C08C35GKJKD) — see [W.5 failure mode #3](../../belts/01-white/W05-installing-the-stack.md) |
| Opus 429 / quota exhausted; monthly usage cap hit | [`#ai-help`](https://razorpay.slack.com/archives/C08C35GKJKD) with manager approval visible |
| Razorpay devstack / local environment broken | [`#devstack-onboarding-support`](https://razorpay.slack.com/archives/C08T27QH5L4) |
| Cowork desktop app issue | [`#cowork-help`](https://razorpay.slack.com/archives/C0B0G3NGLP6) |
| Blade component question; design-system compliance | [`#design-system`](https://razorpay.slack.com/archives/CMQ3RBHEU) or [`#experience_fe_core`](https://razorpay.slack.com/archives/C01H13RTF8V) ticket |
| MCP connector failing or missing for a Razorpay service | [`#mcp-dev`](https://razorpay.slack.com/archives/C08PEUVAZ1B) |
| API design question; API council submission | [`#api_council`](https://razorpay.slack.com/archives/C0168DC4DCZ) |
| Security concern; sensitive data in a prompt; redline-flagged review | Security review owner directly — see [Appendix E](../E-roles-and-forums/README.md) |
| "Show me what you built"; share a skill | [`#product-ai-labs`](https://razorpay.slack.com/archives/C0A7B848RS7) or [`#rzp-claude-skills`](https://razorpay.slack.com/archives/C0ABFFW6XNW) |

## Channel naming conventions

When new channels are created, the naming follows a small pattern.

- Prefix conventions: `program-` for program-wide channels, `cohort-` for cohort channels, the team or surface name for surface-specific channels.
- Lowercase, hyphenated.
- Names describe what is in the channel, not who is in it.
- Avoid duplicating purpose: if a similar channel exists, ask whether the new channel is needed.

The actual prefix conventions are owned by the program's communication team and may evolve. The principles above are durable.

## How this directory stays current

Channels change. Handles rename, ownership rotates, new initiatives spawn new rooms. The discipline that keeps this page useful:

- **Quarterly review.** The full directory is re-walked once per quarter. Each row is checked: is the channel still active, is the owner still the owner, is the purpose still accurate. The frontmatter `updated` date is refreshed.
- **On-demand patches.** When a channel splits, merges, archives, or rotates owner, anyone can open a one-line PR against this appendix. Ping [`#ai-help`](https://razorpay.slack.com/archives/C08C35GKJKD) for the lazy path.
- **No silent staleness.** If a row is wrong, it is the appendix's problem, not the reader's. Staleness is a bug; report it like any other.

The durable pieces of this page — the etiquette, the escalation pattern, the request-a-channel flow — change once a year at most. The volatile pieces — handles, owners, first-response expectations — are the ones the discipline above is built to keep honest.

## Cross-references

- [H.7 — Day-1 quick reference](../H-reference-cards/H7-day-1-quick-reference.md), the printable one-page card that pulls the top channels from this directory together with install commands and role-holder contacts.
- [W.5 — Installing the stack](../../belts/01-white/W05-installing-the-stack.md), where every Day-1 builder learns which channels they need to be in.
- [Quest W-0 — Turn GREEN](../../belts/01-white/quest-W0-turn-green.md), which routes verification-failure questions back to `#ai-help`.
- [§0.6 — Meet the people](../../prologue/06-people-and-pocs.md), where the role-holders behind each channel's owner row are named.
- [Appendix E — Roles & Forums](../E-roles-and-forums/README.md), the deeper role-level reference.
- [Appendix D — Known Issues + FAQ](../D-known-issues/README.md), where channel-thread fixes get promoted into durable references.
- [G.22 — Razorpay redlines](../../belts/03-green/c-guardrails/G22-redlines.md), the rule on what never goes in any channel.
- [B.12 — Office hours](../../belts/04-black/c-org/B12-running-office-hours.md), which runs its queue thread inside one of these channels.

---

*Last reviewed: 2026-06-16. Revision cadence: quarterly, plus on-demand. If a row is stale, ping [`#ai-help`](https://razorpay.slack.com/archives/C08C35GKJKD) and this page gets patched.*
