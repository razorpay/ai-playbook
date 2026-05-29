---
title: "Appendix G: Glossary"
slug: "appendices/glossary"
section: "appendices"
status: "drafted"
type: "readme"
track: "glossary"
order: 0
time_minutes: 10
audience: "everyone"
outcome: "Look up any acronym, tool name, role, or concept used in the curriculum and find a short definition with a pointer to the chapter that covers it in depth."
prev: null
next: null
pillar: null
belt: null
tags: ["appendix", "glossary", "reference"]
updated: "2026-05-08"
---

# Appendix G: Glossary

Every acronym, tool name, role, and concept the curriculum uses, with a short definition and a pointer to the chapter that covers it in depth. The glossary is alphabetical. When a term has a richer treatment elsewhere, the entry says where.

The glossary is meant to be useful as a reference, not as a substitute for the chapters. A reader who needs the full context for a term should follow the cross-reference. A reader who just needs to remember what an acronym stands for should be able to find it here in under thirty seconds.

---

## A

**ADR (Architecture Decision Record).** A small, immutable per-decision artefact that records the chosen path for an architectural decision. Lighter than an RFC. Originated by Michael Nygard in 2011. See [C.3 — The RFC pipeline](../../belts/05-council/C03-rfc-pipeline.md).

**Agent.** A program that uses a language model to take actions through tools, with some degree of autonomy across multiple turns. Distinct from a chatbot, which only generates text. See [Y.1 — The Tool Atlas](../../belts/02-yellow/Y01-tool-atlas.md) and [B.4 — The Claude Agent SDK](../../belts/04-black/a-platform/B04-agent-sdk.md).

**API (Application Programming Interface).** The contract through which software components communicate. The shape of inputs, outputs, and errors a service exposes to its callers. See [0A.5 — What is an API?](../../foundation/tech-101/05-api-vs-ui.md).

**API Council.** Razorpay's existing body that reviews API designs against the API Design Guide. The AI-specific lens on API Council reviews is covered in [B.15](../../belts/04-black/c-org/B15-api-council-contributions.md). Distinct from the Staff+ Council described in the [Council section](../../belts/05-council/README.md).

**Auto-memory.** A persistent file-based memory pattern Anthropic ships with Claude Code, where the agent maintains a small set of memory files that survive across sessions. See [B.8 — Memory systems](../../belts/04-black/b-craft/B08-memory-systems.md).

## B

**Badge.** The artefact a builder claims when they complete a belt. Earned through quests and a boss fight, not self-reported. See [Appendix L — Certification](../L-certification/README.md).

**Belt.** A level of competence in the playbook curriculum. The four earnable belts are White, Yellow, Green, and Black. The Council sits above the belts but is not itself a belt. See the [Master Index](../../INDEX.md).

**Black Belt.** The fourth belt. AI-native builder. Force multiplier. Authors skill packs and plugins; ships across layers; coaches. See the [Black Belt overview](../../belts/04-black/README.md).

**Blade.** Razorpay's design system. Used in design and frontend chapters. See [G.16 — Blade deep dive](../../belts/03-green/b-practices/G16-blade-deep-dive.md).

**Boss Fight.** The capstone artefact required to earn a belt. Larger than a quest. Each belt has one. See the relevant belt README.

**Builder.** Anyone working through the playbook curriculum. Used inclusively across roles (engineer, designer, PM, ops).

**Builder Day.** A program-wide event where teams work on AI-assisted projects together. The origin story in the Prologue covers what made the second Builder Day work. See [Prologue §0.2](../../prologue/02-bd1-bd2-origin.md).

## C

**Charter.** The Council's founding document, ratified by members and revised annually. See [the Council charter template](../../belts/05-council/charter.md) and [C.2](../../belts/05-council/C02-structure.md).

**CLAUDE.md.** A markdown file in a repository that gives Claude Code project-specific context: conventions, do-not-touch areas, common workflows, gotchas. See [G.3](../../belts/03-green/a-craft/G03-claude-md-real-service.md) and the [service-level template](../I-templates/CLAUDE-md-service.md).

**CLAUDE.local.md.** A gitignored personal-overrides file for Claude Code. See [G.5](../../belts/03-green/a-craft/G05-claude-local-md.md) and the [template](../I-templates/CLAUDE-local-md.md).

**Claude Agent SDK.** The SDK Anthropic ships for building custom agents. Covered in [B.4](../../belts/04-black/a-platform/B04-agent-sdk.md).

**Claude Code.** Anthropic's terminal-native coding agent. The program's default coding tool. See [Appendix A — Tool Atlas](../A-tool-atlas/README.md).

**Claude Enterprise.** Anthropic's team plan offering with SSO, admin controls, and audit. See [Y.8](../../belts/02-yellow/Y08-litellm-and-enterprise.md).

**Claude.ai.** Anthropic's web chat interface. Useful for thinking out loud and working with text. See [Appendix A — Tool Atlas](../A-tool-atlas/README.md).

**CLI (Command-Line Interface).** A text-based interface where commands are typed at a prompt. Terminal is the most common CLI surface. See [W.2 — Terminal fluency](../../belts/01-white/W02-terminal-fluency.md).

**Coaching.** Situation-driven, shorter-term, more directive support for a specific situation. Distinct from mentoring. See [C.4 — Mentoring and sponsorship](../../belts/05-council/C04-mentoring-and-sponsorship.md).

**Codex.** OpenAI's coding agent. Available for teams that prefer it. See [Appendix A — Tool Atlas](../A-tool-atlas/README.md).

**Cohort.** A group of builders progressing through a belt or program element together. The Ship-to-Learn cohort is the structured Green Belt path.

**Cohort lead.** The role responsible for running a cohort: scheduling, evidence review, escalation. Role-named, not person-named.

**Compass plugin.** The version-locked plugin bundle used internally to ship the program's pinned skill and MCP set. See [W.7](../../belts/01-white/W07-compass-plugin.md).

**Connector.** An integration that lets an AI surface read from or write to an external service (Slack, Google Workspace, a tracker, etc.). MCP servers are the most common connector shape. See [Appendix B — Environment Setup](../B-environment-setup/README.md).

**Context (the pillar).** One of Simon Willison's three pillars: the information the agent has access to. Includes the prompt, files in the working directory, retrieved documents, and conversation history. See [G.1 — The Three Pillars](../../belts/03-green/a-craft/G01-three-pillars.md).

**Council.** In this playbook, the Staff+ Council described in the [Council section](../../belts/05-council/README.md). The standing community of senior contributors. The API Council is a different body covered in [B.15](../../belts/04-black/c-org/B15-api-council-contributions.md).

**Cowork.** Anthropic's desktop mode for non-engineers. See [Appendix A — Tool Atlas](../A-tool-atlas/README.md).

**Cursor.** An AI-native IDE. Still in use by some teams. See [Appendix A — Tool Atlas](../A-tool-atlas/README.md).

## D

**Decision archive.** The numbered, immutable, append-only archive of RFCs the Council maintains. Doubles as a teaching corpus. See [C.3](../../belts/05-council/C03-rfc-pipeline.md).

**Devstack.** Razorpay's internal development infrastructure (CI, deploy, environment). Owned by the devstack team. The relevant chapter pointer is [Appendix B](../B-environment-setup/README.md).

**Docs (vs the log).** Documentation is the canonical answer for how something works. The office-hours decision log is a running ledger that points at the docs and surfaces gaps. Distinct artefacts. See [B.12](../../belts/04-black/c-org/B12-running-office-hours.md).

## E

**Embedded sprint.** A time-boxed (one-week) pattern where a senior contributor embeds with a team outside their own and ships *with* the team rather than *for* it. See [B.13](../../belts/04-black/c-org/B13-embedded-sprints.md).

**Enablement Stack.** The 9-layer org-level model the playbook is structured against. See [Prologue §0.4](../../prologue/04-enablement-stack.md).

## F

**Figma MCP.** The MCP connector that lets an agent read Figma frames and produce code. Covered in [Y.9](../../belts/02-yellow/Y09-figma-mcp.md) and [G.15](../../belts/03-green/b-practices/G15-design-to-code.md).

**Fall-back.** The named path an agent or skill takes when the primary path fails (rate limit, timeout, classifier flag). See [B.11](../../belts/04-black/b-craft/B11-effort-and-routing.md).

**FAQ.** Frequently asked questions. See [Appendix D](../D-known-issues/README.md).

## G

**gstack.** Garry Tan's framework for AI-assisted development with specialist roles. Profiled in [Appendix N.2](../N-methodologies/N2-gstack.md).

**Golden set.** A small, curated set of inputs with known good outputs used to evaluate a prompt or skill. See [B.9 — Prompt evals](../../belts/04-black/b-craft/B09-prompt-evals.md).

**Grandmaster.** Historical name (replaced in v0.16) for the senior-IC community above Black Belt. The current term is **Staff+ Council**. See the [Staff+ Council overview](../../belts/05-council/README.md).

**Green Belt.** The third belt. Team velocity. Engineers around AI rather than just using it. Authors skills, runs subagents, ships across surfaces. See the [Green Belt overview](../../belts/03-green/README.md).

**GREEN / YELLOW / RED.** A 10-point health check for setup readiness. Used at White Belt and as a self-check pattern across modules. See [W.8](../../belts/01-white/W08-green-yellow-red.md).

**Grandmaster.** *See Staff+ Council.*

**GSD (Get Shit Done, also TÂCHES).** A meta-prompting and context-engineering framework. Profiled in [Appendix N.3](../N-methodologies/N3-gsd.md).

## H

**Harness (the pillar).** One of Simon Willison's three pillars: the runtime around the model — tools, sandboxes, agents, hooks. See [G.1](../../belts/03-green/a-craft/G01-three-pillars.md).

**Hook.** A pre- or post-action automation in Claude Code that runs on specific events (before tool use, after tool use). See [G.10](../../belts/03-green/a-craft/G10-hooks-and-slash-commands.md).

## I

**IDE (Integrated Development Environment).** A graphical environment for writing code. VS Code, Cursor, JetBrains products are common examples.

**IETF (Internet Engineering Task Force).** The standards body that publishes Internet RFCs. The program's RFC pipeline borrows from IETF practice. See [C.3](../../belts/05-council/C03-rfc-pipeline.md), specifically RFC 7282 on consensus.

**IP (Intellectual Property).** The legal frame around who owns code, writing, and inventions. See [C.5 — External voice](../../belts/05-council/C05-external-voice.md) and GitHub's Balanced Employee IP Agreement as the public reference.

## K

**KB (Knowledge Base).** A structured, persistent body of context the program accumulates. The opposite of re-deriving context every session. See [Prologue §0.7](../../prologue/07-operating-principles.md) and [Appendix N](../N-methodologies/README.md).

**KB-driven development.** The operating philosophy that ties the playbook together: don't re-derive, accumulate. See [Appendix N.1](../N-methodologies/N1-kb-driven-development.md).

## L

**Layer 0.** The foundation layer: environment, access, setup. White Belt is the curriculum step that owns Layer 0 readiness. See [Prologue §0.4](../../prologue/04-enablement-stack.md).

**Liaison (Council).** The rotating Council member who interfaces with engineering leadership for a quarter. See [C.2](../../belts/05-council/C02-structure.md).

**LiteLLM.** The open-source LLM proxy the program uses for routing and policy. See [G.23](../../belts/03-green/c-guardrails/G23-llm-proxy.md).

**LLM (Large Language Model).** The model class that powers Claude, GPT, and similar systems. See [Prologue §0.3](../../prologue/03-mental-model.md).

**LLM Wiki pattern.** Karpathy's anti-RAG pattern: a persistent, compounding wiki the agent reads from. Profiled in [Appendix N.4](../N-methodologies/N4-llm-wiki.md).

## M

**MCP (Model Context Protocol).** Anthropic's protocol for connecting models to external tools and data sources. See [B.1 — Authoring an internal MCP server](../../belts/04-black/a-platform/B01-internal-mcp-server.md).

**Mentor / Mentoring.** Relationship-driven, longer-term support. Distinct from coaching (situation-driven, shorter) and sponsorship (advocacy, not advice). See [C.4](../../belts/05-council/C04-mentoring-and-sponsorship.md).

**Minimum viable wiki.** A starter knowledge-base structure: index, log, schema, kb folder. See [Appendix N.7](../N-methodologies/N7-minimum-viable-wiki.md) and the [seed template](../I-templates/minimum-viable-wiki-seed.md).

**MUST / SHOULD / MAY.** RFC 2119's vocabulary for stating requirements unambiguously. Used in the program's RFC pipeline. See [C.3](../../belts/05-council/C03-rfc-pipeline.md).

## N

**NDA (Non-Disclosure Agreement).** The legal frame around what an employee can and cannot disclose externally. Relevant to [C.5 — External voice](../../belts/05-council/C05-external-voice.md).

## O

**OKR (Objectives and Key Results).** A common goal-setting framework. The playbook's success metric (distinct from program OKRs) is an open question.

**Office hours.** A published, recurring slot where senior contributors take in-flight blockers from the broader team in public. The cheapest propagation move available. See [B.12](../../belts/04-black/c-org/B12-running-office-hours.md).

**OSS (Open-Source Software).** Code released under a license that permits free use and modification. See [C.5](../../belts/05-council/C05-external-voice.md) for the senior-engineer contribution patterns.

## P

**PCI (Payment Card Industry).** Regulatory frame governing how payment card data is handled. See [G.24](../../belts/03-green/c-guardrails/G24-pii-pci-rbi.md).

**PII (Personally Identifiable Information).** Data that can identify a person. Subject to regulatory protection. See [G.24](../../belts/03-green/c-guardrails/G24-pii-pci-rbi.md).

**Plugin.** A bundled set of skills, MCPs, and configuration that can be installed as a unit. The program ships a pinned plugin. See [B.3 — Cowork plugin marketplace](../../belts/04-black/a-platform/B03-cowork-plugin-marketplace.md).

**POD.** Razorpay's term for a small product team, typically owning a single product surface. Used as a synonym for "team" elsewhere. The playbook prefers "team" in conceptual passages.

**PR (Pull Request).** A proposed change to a code repository, opened for review before merging. See [W.12](../../belts/01-white/W12-first-pr.md) and [Y.13](../../belts/02-yellow/Y13-pr-craft.md).

**Prompt (the pillar).** One of Simon Willison's three pillars: the actual text the model sees on a given turn. See [G.1](../../belts/03-green/a-craft/G01-three-pillars.md).

**Prompt eval.** A test that runs a prompt against a known set of inputs and checks outputs against expected behaviour. See [B.9](../../belts/04-black/b-craft/B09-prompt-evals.md).

**Prompt injection.** An attack where an attacker's content reaches the model and tries to override the system prompt. See [G.25](../../belts/03-green/c-guardrails/G25-prompt-injection.md).

**Progressive disclosure.** A skill-authoring pattern that keeps the default body small and reveals depth on demand. See [B.7](../../belts/04-black/b-craft/B07-progressive-disclosure.md).

## Q

**Quest.** A graded artefact required to earn a belt. Each belt has at least one. Distinct from a boss fight (larger). See the belt READMEs.

## R

**RBI (Reserve Bank of India).** The Indian financial regulator. Relevant to fintech compliance throughout the curriculum. See [G.24](../../belts/03-green/c-guardrails/G24-pii-pci-rbi.md).

**Razorpay API Design Guide.** The internal canonical reference for API design at Razorpay. The `razorpay-api-review` skill automates a large part of the rubric. See [B.15](../../belts/04-black/c-org/B15-api-council-contributions.md).

**Razorpay Cowork.** *See Cowork.*

**Redline.** A specific item that must never appear in a prompt or external surface. Defined in [G.22](../../belts/03-green/c-guardrails/G22-redlines.md).

**RFC (Request For Comments).** A written proposal for a change, reviewed and discussed before commitment. The program's RFC pipeline is described in [C.3](../../belts/05-council/C03-rfc-pipeline.md). See also the [RFC template](../I-templates/RFC-template.md).

**RFD (Request For Discussion).** Oxide Computer's term for the same artefact. Cantrill's "Requests for Discussion" is the foundational public reference. See [C.3](../../belts/05-council/C03-rfc-pipeline.md).

## S

**Sandbox.** An isolated environment where code can run without affecting the wider system. Claude Code uses sandboxes for shell execution. See [W.2](../../belts/01-white/W02-terminal-fluency.md).

**SDK (Software Development Kit).** A library or set of libraries for building on a platform. The Claude Agent SDK is covered in [B.4](../../belts/04-black/a-platform/B04-agent-sdk.md).

**Self-assessment.** The Prologue chapter that helps a reader pick their starting belt. See [Prologue §0.10](../../prologue/10-self-assessment.md).

**Ship-to-Learn.** A 7-week structured cohort track for Green Belt candidates. Treated in Appendix M (currently planned; see [the Master Index](../../INDEX.md) for the section overview).

**Skill (Anthropic).** A reusable workflow defined in a SKILL.md file that an agent can invoke. See [G.6](../../belts/03-green/a-craft/G06-skills-overview.md), [G.7](../../belts/03-green/a-craft/G07-writing-your-first-skill.md), and the [skill templates](../I-templates/SKILL-md-minimum.md).

**Skill pack.** A bundled set of skills published as a unit. See [B.2](../../belts/04-black/a-platform/B02-skill-pack-publishing.md).

**Slash.** Razorpay's internal AI copilot. See [Appendix A](../A-tool-atlas/README.md).

**Slash command.** A keyword that invokes a specific skill in Claude Code. See [G.10](../../belts/03-green/a-craft/G10-hooks-and-slash-commands.md).

**Sponsorship.** Advocacy in rooms the sponsee is not in. Distinct from mentoring (advice). At the senior level, sponsorship is the more under-supplied role. See [C.4](../../belts/05-council/C04-mentoring-and-sponsorship.md).

**Staff+.** A collective term for engineering levels at Staff and above (Staff, Senior Staff, Principal, Distinguished, Fellow). The senior-IC track. Used as the framing term for the Council.

**Staff+ Council.** *See Council.*

**Subagent.** A worker agent invoked by a parent agent to handle a sub-task. See [G.8](../../belts/03-green/a-craft/G08-subagents.md).

**Substrate.** The supporting structure (manifest.yml, slugs.yml, INDEX.md, scripts) that lets the playbook content stay coherent across versions.

## T

**Three pillars.** Simon Willison's prompt-context-harness model. Used as a tagging system across the curriculum. See [G.1](../../belts/03-green/a-craft/G01-three-pillars.md).

**Tool (in agent context).** A function the agent can call to take an action (read a file, query a database, send a message). See [B.6 — Tool design](../../belts/04-black/a-platform/B06-tool-design.md).

**Track.** A subdivision within a belt or section. Green Belt has Parts A, B, C; the appendices have multiple tracks (methodologies, templates, etc.).

## V

**Vertex AI.** Google Cloud's AI platform. Razorpay routed Claude through Vertex until the March-2026 migration to the LiteLLM gateway; it is no longer in the active model path. If you see Vertex env vars in a teammate's setup, they are stale. See [W.4](../../belts/01-white/W04-auth-setup.md) and [W.6](../../belts/01-white/W06-llm-gateway.md).

## W

**White Belt.** The first belt. Setup, first commit, first PR. See the [White Belt overview](../../belts/01-white/README.md).

**Working forum (Council).** Layer 2 of the senior-IC community. Active participants who contribute to RFC review, mentoring, and cross-team alignment work. See [C.2](../../belts/05-council/C02-structure.md).

**Worktree.** A git feature that lets you check out multiple branches into separate working directories simultaneously. Used to run multiple Claude instances safely. See [G.9](../../belts/03-green/a-craft/G09-worktrees.md).

## Y

**Yellow Belt.** The second belt. AI in the daily rhythm. Ships a merged PR. See the [Yellow Belt overview](../../belts/02-yellow/README.md).

---

## Maintenance

The glossary is revised as new terms enter the curriculum. Pull requests welcome: a new term should land here when it lands in any chapter, with the cross-reference set at the same time.

When a term has multiple meanings in the curriculum (e.g., Council), the entry disambiguates explicitly.

When a term is deprecated (e.g., Grandmaster, replaced by Staff+ Council in v0.16), the deprecated term's entry stays as a pointer to the current term so historical references resolve.

---

**See also:** [Appendix N — Methodologies & Frameworks](../N-methodologies/README.md) for deep treatment of operating frameworks. [Appendix J — Reading List](../J-reading-list/README.md) for the public sources cited across the curriculum.
