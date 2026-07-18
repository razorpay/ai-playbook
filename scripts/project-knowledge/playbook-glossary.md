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

**ADR (Architecture Decision Record).** A small, immutable per-decision artefact that records the chosen path for an architectural decision. Lighter than an RFC. Originated by Michael Nygard in 2011. See [C.3 — The RFC pipeline](https://razorpay.github.io/ai-playbook/belts/05-council/C03-rfc-pipeline/).

**Agent.** A program that uses a language model to take actions through tools, with some degree of autonomy across multiple turns. Distinct from a chatbot, which only generates text. See [Y.1 — The Tool Atlas](https://razorpay.github.io/ai-playbook/belts/02-yellow/Y01-tool-atlas/) and [B.4 — The Claude Agent SDK](https://razorpay.github.io/ai-playbook/belts/04-black/a-platform/B04-agent-sdk/).

**API (Application Programming Interface).** The contract through which software components communicate. The shape of inputs, outputs, and errors a service exposes to its callers. See [0A.5 — What is an API?](https://razorpay.github.io/ai-playbook/foundation/tech-101/05-api-vs-ui/).

**API Council.** Razorpay's existing body that reviews API designs against the API Design Guide. The AI-specific lens on API Council reviews is covered in [B.15](https://razorpay.github.io/ai-playbook/belts/04-black/c-org/B15-api-council-contributions/). Distinct from the Staff+ Council described in the [Council section](https://razorpay.github.io/ai-playbook/belts/05-council/).

**Auto-memory.** A persistent file-based memory pattern Anthropic ships with Claude Code, where the agent maintains a small set of memory files that survive across sessions. See [B.8 — Memory systems](https://razorpay.github.io/ai-playbook/belts/04-black/b-craft/B08-memory-systems/).

## B

**Badge.** The artefact a builder claims when they complete a belt. Earned through quests and a boss fight, not self-reported. See [Appendix L — Certification](https://razorpay.github.io/ai-playbook/L-certification/).

**Belt.** A level of competence in the playbook curriculum. The four earnable belts are White, Yellow, Green, and Black. The Council sits above the belts but is not itself a belt. See the [Master Index](https://razorpay.github.io/ai-playbook/INDEX/).

**Black Belt.** The fourth belt. AI-native builder. Force multiplier. Authors skill packs and plugins; ships across layers; coaches. See the [Black Belt overview](https://razorpay.github.io/ai-playbook/belts/04-black/).

**Blade.** Razorpay's design system. Used in design and frontend chapters. See [G.16 — Blade deep dive](https://razorpay.github.io/ai-playbook/belts/03-green/b-practices/G16-blade-deep-dive/).

**Boss Fight.** The capstone artefact required to earn a belt. Larger than a quest. Each belt has one. See the relevant belt README.

**Builder.** Anyone working through the playbook curriculum. Used inclusively across roles (engineer, designer, PM, ops).

**Builder Day.** A program-wide event where teams work on AI-assisted projects together. The origin story in the Prologue covers what made the second Builder Day work. See [Prologue §0.2](https://razorpay.github.io/ai-playbook/prologue/02-bd1-bd2-origin/).

## C

**Charter.** The Council's founding document, ratified by members and revised annually. See [the Council charter template](https://razorpay.github.io/ai-playbook/belts/05-council/charter/) and [C.2](https://razorpay.github.io/ai-playbook/belts/05-council/C02-structure/).

**CLAUDE.md.** A markdown file in a repository that gives Claude Code project-specific context: conventions, do-not-touch areas, common workflows, gotchas. See [G.3](https://razorpay.github.io/ai-playbook/belts/03-green/a-craft/G03-claude-md-real-service/) and the [service-level template](https://razorpay.github.io/ai-playbook/I-templates/CLAUDE-md-service/).

**CLAUDE.local.md.** A gitignored personal-overrides file for Claude Code. See [G.5](https://razorpay.github.io/ai-playbook/belts/03-green/a-craft/G05-claude-local-md/) and the [template](https://razorpay.github.io/ai-playbook/I-templates/CLAUDE-local-md/).

**Claude Agent SDK.** The SDK Anthropic ships for building custom agents. Covered in [B.4](https://razorpay.github.io/ai-playbook/belts/04-black/a-platform/B04-agent-sdk/).

**Claude Code.** Anthropic's terminal-native coding agent. The program's default coding tool. See [Appendix A — Tool Atlas](https://razorpay.github.io/ai-playbook/A-tool-atlas/).

**Claude Enterprise.** Anthropic's team plan offering with SSO, admin controls, and audit. See [Y.8](https://razorpay.github.io/ai-playbook/belts/02-yellow/Y08-litellm-and-enterprise/).

**Claude.ai.** Anthropic's web chat interface. Useful for thinking out loud and working with text. See [Appendix A — Tool Atlas](https://razorpay.github.io/ai-playbook/A-tool-atlas/).

**CLI (Command-Line Interface).** A text-based interface where commands are typed at a prompt. Terminal is the most common CLI surface. See [W.2 — Terminal fluency](https://razorpay.github.io/ai-playbook/belts/01-white/W02-terminal-fluency/).

**Coaching.** Situation-driven, shorter-term, more directive support for a specific situation. Distinct from mentoring. See [C.4 — Mentoring and sponsorship](https://razorpay.github.io/ai-playbook/belts/05-council/C04-mentoring-and-sponsorship/).

**Codex.** OpenAI's coding agent. Available for teams that prefer it. See [Appendix A — Tool Atlas](https://razorpay.github.io/ai-playbook/A-tool-atlas/).

**Cohort.** A group of builders progressing through a belt or program element together. The Ship-to-Learn cohort is the structured Green Belt path.

**Cohort lead.** The role responsible for running a cohort: scheduling, evidence review, escalation. Role-named, not person-named.

**Compass plugin.** The version-locked plugin bundle used internally to ship the program's pinned skill and MCP set. See [W.7](https://razorpay.github.io/ai-playbook/belts/01-white/W07-compass-plugin/).

**Connector.** An integration that lets an AI surface read from or write to an external service (Slack, Google Workspace, a tracker, etc.). MCP servers are the most common connector shape. See [Appendix B — Environment Setup](https://razorpay.github.io/ai-playbook/B-environment-setup/).

**Context (the pillar).** One of Simon Willison's three pillars: the information the agent has access to. Includes the prompt, files in the working directory, retrieved documents, and conversation history. See [G.1 — The Three Pillars](https://razorpay.github.io/ai-playbook/belts/03-green/a-craft/G01-three-pillars/).

**Council.** In this playbook, the Staff+ Council described in the [Council section](https://razorpay.github.io/ai-playbook/belts/05-council/). The standing community of senior contributors. The API Council is a different body covered in [B.15](https://razorpay.github.io/ai-playbook/belts/04-black/c-org/B15-api-council-contributions/).

**Cowork.** Anthropic's desktop mode for non-engineers. See [Appendix A — Tool Atlas](https://razorpay.github.io/ai-playbook/A-tool-atlas/).

**Cursor.** An AI-native IDE. Still in use by some teams. See [Appendix A — Tool Atlas](https://razorpay.github.io/ai-playbook/A-tool-atlas/).

## D

**Decision archive.** The numbered, immutable, append-only archive of RFCs the Council maintains. Doubles as a teaching corpus. See [C.3](https://razorpay.github.io/ai-playbook/belts/05-council/C03-rfc-pipeline/).

**Devstack.** Razorpay's internal development infrastructure (CI, deploy, environment). Owned by the devstack team. The relevant chapter pointer is [Appendix B](https://razorpay.github.io/ai-playbook/B-environment-setup/).

**Docs (vs the log).** Documentation is the canonical answer for how something works. The office-hours decision log is a running ledger that points at the docs and surfaces gaps. Distinct artefacts. See [B.12](https://razorpay.github.io/ai-playbook/belts/04-black/c-org/B12-running-office-hours/).

## E

**Embedded sprint.** A time-boxed (one-week) pattern where a senior contributor embeds with a team outside their own and ships *with* the team rather than *for* it. See [B.13](https://razorpay.github.io/ai-playbook/belts/04-black/c-org/B13-embedded-sprints/).

**Enablement Stack.** The 9-layer org-level model the playbook is structured against. See [Prologue §0.4](https://razorpay.github.io/ai-playbook/prologue/04-enablement-stack/).

## F

**Figma MCP.** The MCP connector that lets an agent read Figma frames and produce code. Covered in [Y.9](https://razorpay.github.io/ai-playbook/belts/02-yellow/Y09-figma-mcp/) and [G.15](https://razorpay.github.io/ai-playbook/belts/03-green/b-practices/G15-design-to-code/).

**Fall-back.** The named path an agent or skill takes when the primary path fails (rate limit, timeout, classifier flag). See [B.11](https://razorpay.github.io/ai-playbook/belts/04-black/b-craft/B11-effort-and-routing/).

**FAQ.** Frequently asked questions. See [Appendix D](https://razorpay.github.io/ai-playbook/D-known-issues/).

## G

**gstack.** Garry Tan's framework for AI-assisted development with specialist roles. Profiled in [Appendix N.2](https://razorpay.github.io/ai-playbook/N-methodologies/N2-gstack/).

**Golden set.** A small, curated set of inputs with known good outputs used to evaluate a prompt or skill. See [B.9 — Prompt evals](https://razorpay.github.io/ai-playbook/belts/04-black/b-craft/B09-prompt-evals/).

**Grandmaster.** Historical name (replaced in v0.16) for the senior-IC community above Black Belt. The current term is **Staff+ Council**. See the [Staff+ Council overview](https://razorpay.github.io/ai-playbook/belts/05-council/).

**Green Belt.** The third belt. Team velocity. Engineers around AI rather than just using it. Authors skills, runs subagents, ships across surfaces. See the [Green Belt overview](https://razorpay.github.io/ai-playbook/belts/03-green/).

**GREEN / YELLOW / RED.** A 10-point health check for setup readiness. Used at White Belt and as a self-check pattern across modules. See [W.8](https://razorpay.github.io/ai-playbook/belts/01-white/W08-green-yellow-red/).

**Grandmaster.** *See Staff+ Council.*

**GSD (Get Shit Done, also TÂCHES).** A meta-prompting and context-engineering framework. Profiled in [Appendix N.3](https://razorpay.github.io/ai-playbook/N-methodologies/N3-gsd/).

## H

**Harness (the pillar).** One of Simon Willison's three pillars: the runtime around the model — tools, sandboxes, agents, hooks. See [G.1](https://razorpay.github.io/ai-playbook/belts/03-green/a-craft/G01-three-pillars/).

**Hook.** A pre- or post-action automation in Claude Code that runs on specific events (before tool use, after tool use). See [G.10](https://razorpay.github.io/ai-playbook/belts/03-green/a-craft/G10-hooks-and-slash-commands/).

## I

**IDE (Integrated Development Environment).** A graphical environment for writing code. VS Code, Cursor, JetBrains products are common examples.

**IETF (Internet Engineering Task Force).** The standards body that publishes Internet RFCs. The program's RFC pipeline borrows from IETF practice. See [C.3](https://razorpay.github.io/ai-playbook/belts/05-council/C03-rfc-pipeline/), specifically RFC 7282 on consensus.

**IP (Intellectual Property).** The legal frame around who owns code, writing, and inventions. See [C.5 — External voice](https://razorpay.github.io/ai-playbook/belts/05-council/C05-external-voice/) and GitHub's Balanced Employee IP Agreement as the public reference.

## K

**KB (Knowledge Base).** A structured, persistent body of context the program accumulates. The opposite of re-deriving context every session. See [Prologue §0.7](https://razorpay.github.io/ai-playbook/prologue/07-operating-principles/) and [Appendix N](https://razorpay.github.io/ai-playbook/N-methodologies/).

**KB-driven development.** The operating philosophy that ties the playbook together: don't re-derive, accumulate. See [Appendix N.1](https://razorpay.github.io/ai-playbook/N-methodologies/N1-kb-driven-development/).

## L

**Layer 0.** The foundation layer: environment, access, setup. White Belt is the curriculum step that owns Layer 0 readiness. See [Prologue §0.4](https://razorpay.github.io/ai-playbook/prologue/04-enablement-stack/).

**Liaison (Council).** The rotating Council member who interfaces with engineering leadership for a quarter. See [C.2](https://razorpay.github.io/ai-playbook/belts/05-council/C02-structure/).

**LiteLLM.** The open-source LLM proxy the program uses for routing and policy. See [G.23](https://razorpay.github.io/ai-playbook/belts/03-green/c-guardrails/G23-llm-proxy/).

**LLM (Large Language Model).** The model class that powers Claude, GPT, and similar systems. See [Prologue §0.3](https://razorpay.github.io/ai-playbook/prologue/03-mental-model/).

**LLM Wiki pattern.** Karpathy's anti-RAG pattern: a persistent, compounding wiki the agent reads from. Profiled in [Appendix N.4](https://razorpay.github.io/ai-playbook/N-methodologies/N4-llm-wiki/).

## M

**MCP (Model Context Protocol).** Anthropic's protocol for connecting models to external tools and data sources. See [B.1 — Authoring an internal MCP server](https://razorpay.github.io/ai-playbook/belts/04-black/a-platform/B01-internal-mcp-server/).

**Mentor / Mentoring.** Relationship-driven, longer-term support. Distinct from coaching (situation-driven, shorter) and sponsorship (advocacy, not advice). See [C.4](https://razorpay.github.io/ai-playbook/belts/05-council/C04-mentoring-and-sponsorship/).

**Minimum viable wiki.** A starter knowledge-base structure: index, log, schema, kb folder. See [Appendix N.7](https://razorpay.github.io/ai-playbook/N-methodologies/N7-minimum-viable-wiki/) and the [seed template](https://razorpay.github.io/ai-playbook/I-templates/minimum-viable-wiki-seed/).

**MUST / SHOULD / MAY.** RFC 2119's vocabulary for stating requirements unambiguously. Used in the program's RFC pipeline. See [C.3](https://razorpay.github.io/ai-playbook/belts/05-council/C03-rfc-pipeline/).

## N

**NDA (Non-Disclosure Agreement).** The legal frame around what an employee can and cannot disclose externally. Relevant to [C.5 — External voice](https://razorpay.github.io/ai-playbook/belts/05-council/C05-external-voice/).

## O

**OKR (Objectives and Key Results).** A common goal-setting framework. The playbook's success metric (distinct from program OKRs) is an open question.

**Office hours.** A published, recurring slot where senior contributors take in-flight blockers from the broader team in public. The cheapest propagation move available. See [B.12](https://razorpay.github.io/ai-playbook/belts/04-black/c-org/B12-running-office-hours/).

**OSS (Open-Source Software).** Code released under a license that permits free use and modification. See [C.5](https://razorpay.github.io/ai-playbook/belts/05-council/C05-external-voice/) for the senior-engineer contribution patterns.

## P

**PCI (Payment Card Industry).** Regulatory frame governing how payment card data is handled. See [G.24](https://razorpay.github.io/ai-playbook/belts/03-green/c-guardrails/G24-pii-pci-rbi/).

**PII (Personally Identifiable Information).** Data that can identify a person. Subject to regulatory protection. See [G.24](https://razorpay.github.io/ai-playbook/belts/03-green/c-guardrails/G24-pii-pci-rbi/).

**Plugin.** A bundled set of skills, MCPs, and configuration that can be installed as a unit. The program ships a pinned plugin. See [B.3 — Cowork plugin marketplace](https://razorpay.github.io/ai-playbook/belts/04-black/a-platform/B03-cowork-plugin-marketplace/).

**POD.** Razorpay's term for a small product team, typically owning a single product surface. Used as a synonym for "team" elsewhere. The playbook prefers "team" in conceptual passages.

**PR (Pull Request).** A proposed change to a code repository, opened for review before merging. See [W.12](https://razorpay.github.io/ai-playbook/belts/01-white/W12-first-pr/) and [Y.13](https://razorpay.github.io/ai-playbook/belts/02-yellow/Y13-pr-craft/).

**Prompt (the pillar).** One of Simon Willison's three pillars: the actual text the model sees on a given turn. See [G.1](https://razorpay.github.io/ai-playbook/belts/03-green/a-craft/G01-three-pillars/).

**Prompt eval.** A test that runs a prompt against a known set of inputs and checks outputs against expected behaviour. See [B.9](https://razorpay.github.io/ai-playbook/belts/04-black/b-craft/B09-prompt-evals/).

**Prompt injection.** An attack where an attacker's content reaches the model and tries to override the system prompt. See [G.25](https://razorpay.github.io/ai-playbook/belts/03-green/c-guardrails/G25-prompt-injection/).

**Progressive disclosure.** A skill-authoring pattern that keeps the default body small and reveals depth on demand. See [B.7](https://razorpay.github.io/ai-playbook/belts/04-black/b-craft/B07-progressive-disclosure/).

## Q

**Quest.** A graded artefact required to earn a belt. Each belt has at least one. Distinct from a boss fight (larger). See the belt READMEs.

## R

**RBI (Reserve Bank of India).** The Indian financial regulator. Relevant to fintech compliance throughout the curriculum. See [G.24](https://razorpay.github.io/ai-playbook/belts/03-green/c-guardrails/G24-pii-pci-rbi/).

**Razorpay API Design Guide.** The internal canonical reference for API design at Razorpay. The `razorpay-api-review` skill automates a large part of the rubric. See [B.15](https://razorpay.github.io/ai-playbook/belts/04-black/c-org/B15-api-council-contributions/).

**Razorpay Cowork.** *See Cowork.*

**Redline.** A specific item that must never appear in a prompt or external surface. Defined in [G.22](https://razorpay.github.io/ai-playbook/belts/03-green/c-guardrails/G22-redlines/).

**RFC (Request For Comments).** A written proposal for a change, reviewed and discussed before commitment. The program's RFC pipeline is described in [C.3](https://razorpay.github.io/ai-playbook/belts/05-council/C03-rfc-pipeline/). See also the [RFC template](https://razorpay.github.io/ai-playbook/I-templates/RFC-template/).

**RFD (Request For Discussion).** Oxide Computer's term for the same artefact. Cantrill's "Requests for Discussion" is the foundational public reference. See [C.3](https://razorpay.github.io/ai-playbook/belts/05-council/C03-rfc-pipeline/).

## S

**Sandbox.** An isolated environment where code can run without affecting the wider system. Claude Code uses sandboxes for shell execution. See [W.2](https://razorpay.github.io/ai-playbook/belts/01-white/W02-terminal-fluency/).

**SDK (Software Development Kit).** A library or set of libraries for building on a platform. The Claude Agent SDK is covered in [B.4](https://razorpay.github.io/ai-playbook/belts/04-black/a-platform/B04-agent-sdk/).

**Self-assessment.** The Prologue chapter that helps a reader pick their starting belt. See [Prologue §0.10](https://razorpay.github.io/ai-playbook/prologue/10-self-assessment/).

**Ship-to-Learn.** A 7-week structured cohort track for Green Belt candidates. Treated in Appendix M (currently planned; see [the Master Index](https://razorpay.github.io/ai-playbook/INDEX/) for the section overview).

**Skill (Anthropic).** A reusable workflow defined in a SKILL.md file that an agent can invoke. See [G.6](https://razorpay.github.io/ai-playbook/belts/03-green/a-craft/G06-skills-overview/), [G.7](https://razorpay.github.io/ai-playbook/belts/03-green/a-craft/G07-writing-your-first-skill/), and the [skill templates](https://razorpay.github.io/ai-playbook/I-templates/SKILL-md-minimum/).

**Skill pack.** A bundled set of skills published as a unit. See [B.2](https://razorpay.github.io/ai-playbook/belts/04-black/a-platform/B02-skill-pack-publishing/).

**Slash.** Razorpay's internal AI copilot. See [Appendix A](https://razorpay.github.io/ai-playbook/A-tool-atlas/).

**Slash command.** A keyword that invokes a specific skill in Claude Code. See [G.10](https://razorpay.github.io/ai-playbook/belts/03-green/a-craft/G10-hooks-and-slash-commands/).

**Sponsorship.** Advocacy in rooms the sponsee is not in. Distinct from mentoring (advice). At the senior level, sponsorship is the more under-supplied role. See [C.4](https://razorpay.github.io/ai-playbook/belts/05-council/C04-mentoring-and-sponsorship/).

**Staff+.** A collective term for engineering levels at Staff and above (Staff, Senior Staff, Principal, Distinguished, Fellow). The senior-IC track. Used as the framing term for the Council.

**Staff+ Council.** *See Council.*

**Subagent.** A worker agent invoked by a parent agent to handle a sub-task. See [G.8](https://razorpay.github.io/ai-playbook/belts/03-green/a-craft/G08-subagents/).

**Substrate.** The supporting structure (manifest.yml, slugs.yml, INDEX.md, scripts) that lets the playbook content stay coherent across versions.

## T

**Three pillars.** Simon Willison's prompt-context-harness model. Used as a tagging system across the curriculum. See [G.1](https://razorpay.github.io/ai-playbook/belts/03-green/a-craft/G01-three-pillars/).

**Tool (in agent context).** A function the agent can call to take an action (read a file, query a database, send a message). See [B.6 — Tool design](https://razorpay.github.io/ai-playbook/belts/04-black/a-platform/B06-tool-design/).

**Track.** A subdivision within a belt or section. Green Belt has Parts A, B, C; the appendices have multiple tracks (methodologies, templates, etc.).

## V

**Vertex AI.** Google Cloud's AI platform. The program routes some calls through Vertex via LiteLLM. See [W.6](https://razorpay.github.io/ai-playbook/belts/01-white/W06-llm-gateway/).

## W

**White Belt.** The first belt. Setup, first commit, first PR. See the [White Belt overview](https://razorpay.github.io/ai-playbook/belts/01-white/).

**Working forum (Council).** Layer 2 of the senior-IC community. Active participants who contribute to RFC review, mentoring, and cross-team alignment work. See [C.2](https://razorpay.github.io/ai-playbook/belts/05-council/C02-structure/).

**Worktree.** A git feature that lets you check out multiple branches into separate working directories simultaneously. Used to run multiple Claude instances safely. See [G.9](https://razorpay.github.io/ai-playbook/belts/03-green/a-craft/G09-worktrees/).

## Y

**Yellow Belt.** The second belt. AI in the daily rhythm. Ships a merged PR. See the [Yellow Belt overview](https://razorpay.github.io/ai-playbook/belts/02-yellow/).

---

## Maintenance

The glossary is revised as new terms enter the curriculum. Pull requests welcome: a new term should land here when it lands in any chapter, with the cross-reference set at the same time.

When a term has multiple meanings in the curriculum (e.g., Council), the entry disambiguates explicitly.

When a term is deprecated (e.g., Grandmaster, replaced by Staff+ Council in v0.16), the deprecated term's entry stays as a pointer to the current term so historical references resolve.

---

**See also:** [Appendix N — Methodologies & Frameworks](https://razorpay.github.io/ai-playbook/N-methodologies/) for deep treatment of operating frameworks. [Appendix J — Reading List](https://razorpay.github.io/ai-playbook/J-reading-list/) for the public sources cited across the curriculum.
