---
title: "The Claude Agent SDK — when to write your own agent"
slug: "belts/black/agent-sdk"
section: "belts"
status: "drafted"
type: "chapter"
track: "black"
order: 4
time_minutes: 50
audience: "platform-builder"
outcome: "Decide cleanly among the program-pinned plugin, Agent Studio, and a custom Claude Agent SDK build; run a governed release lifecycle before a product agent receives traffic."
prev: "belts/black/cowork-plugin-marketplace"
next: "belts/black/multi-agent-orchestration"
pillar: "harness"
belt: "black"
tags: ["black-belt", "agent-sdk", "agent-studio", "build-vs-install", "harness"]
updated: "2026-08-01"
---

# B.4 — The Claude Agent SDK

The default answer at every belt up to here has been: *use the program-pinned plugin*. Everything you have built (White, Yellow, Green Belt) has used Claude Code with Compass extensions. Black Belt is where product agents enter the picture — but "inside a product" no longer means "start a custom SDK project." Razorpay's paved road for supported merchant-facing agents is Agent Studio. A custom Claude Agent SDK build is the exception after that fit check, not the first move.

---

## If you're short on time

- For internal interactive work, default to the program-pinned plugin.
- For a supported merchant-facing agent, check Agent Studio first. Its builder path carries the agent from a one-outcome spec through tools, evals, review, shadow traffic, release, monitoring, and rollback.
- Reach for a custom Claude Agent SDK build only when the product or runtime genuinely falls outside that paved road and the owning reviewers agree.
- "We want our own thing" and "we want to control the prompt" are not runtime requirements. They are usually requests for a better skill or configuration.

---

## The mental model

```
   ┌────────────────────────────────────────────────┐
   │              CHOOSE THE PAVED ROAD               │
   ├────────────────────────────────────────────────┤
   │                                                  │
   │   Program-pinned plugin (Compass + Claude Code)│
   │           │                                       │
   │           ▼                                       │
   │   Default for internal interactive work.        │
   │   Skills, MCPs, slash commands, hooks.          │
   │                                                  │
   │   Cowork plugin marketplace                     │
   │           │                                       │
   │           ▼                                       │
   │   Non-engineer adoption surface (B.3).         │
   │                                                  │
   │   Agent Studio                                  │
   │           │                                       │
   │           ▼                                       │
   │   Supported merchant-facing product agents.    │
   │   Governed build, release, and operations.     │
   │                                                  │
   │   Custom Claude Agent SDK                       │
   │           │                                       │
   │           ▼                                       │
   │   Exception path for unsupported product or    │
   │   runtime needs. Team owns the whole harness.  │
   │                                                  │
   └────────────────────────────────────────────────┘
```

The runtime choice is an ownership choice. The program-pinned plugin owns most of the harness for internal work. Agent Studio owns the paved product-agent lifecycle. A custom SDK build leaves your team owning the design surface, maintenance, release controls, and safety story. Black Belt builders choose that burden deliberately.

---

## The four cases that justify leaving the program-pinned plugin

These cases tell you that a plugin may be the wrong runtime. They do **not** automatically approve a custom SDK build. For merchant-facing agents, run the Agent Studio fit check next.

### Case 1 — The agent is embedded in a product surface

Your team owns a customer-facing dashboard. You want to add an "explain this chart" feature where the agent has bounded access to that customer's data only. The program-pinned plugin runs on the engineer's laptop; the customer-facing surface needs the agent to live in the product itself.

Agent Studio is the first route when the use case fits its supported product surface and connector model. Use a custom SDK only when the platform owner confirms that the required surface, tenant boundary, or capability is unsupported and the exception review covers the missing controls.

### Case 2 — The agent runs in a non-interactive pipeline

Your team has a nightly pipeline that processes incoming reports. You want an agent step in the pipeline: read the incoming reports, summarise them, classify them, write to a queue. No human interaction; just an automated stage.

The program-pinned plugin is not the runtime for this job. If this is a supported merchant workflow, check whether Agent Studio can represent it as a deterministic workflow or bounded agent. If not, a custom SDK or conventional automation may be the right shape; choose from the task's uncertainty, tool, and operating needs rather than from the word "agent."

### Case 3 — The agent is a one-purpose CLI you ship to teammates

Your team has a workflow that compounds enough that you want a dedicated CLI (`your-tool <args>`) running inside your product environment with bounded scope. The agent inside that CLI is a custom build, not a generic chat surface.

The SDK is sometimes the right answer here. Often a slash command in the program-pinned plugin is enough; sometimes the workflow is rich enough that a dedicated CLI is the right shape. Agent Studio is relevant only if that CLI is actually an authoring or operations surface for a supported product agent.

### Case 4 — The agent has capabilities the program-pinned plugin cannot grant

The program-pinned plugin and Agent Studio both curate capabilities. If the required connector, trigger, interaction, or runtime control is unsupported, record the gap and ask the owning team whether it belongs on the paved road. A custom SDK is justified only when waiting or extending the platform is the wrong product decision and your team can own the missing control safely.

This case has the highest cost: security review, isolation, audit trail, observability, rollback, and a deprecation path. Most teams should not reach for it lightly.

---

## The wrong reasons to write a custom agent

Three patterns to refuse.

**"We want our own thing."** The program's leverage compounds because everyone is on the same plugin. Fragmenting that to assert team identity is expensive and unjustified. Fix: contribute back to the program plugin instead.

**"The plugin's UI is too generic."** Most "UI" complaints are actually about output shape: the agent's responses are too verbose, too short, too templated. Fix: a skill with a tighter output shape (per G.7) usually solves this; the SDK does not.

**"We want to control the prompt."** You can already control the prompt with skills, with hooks, with CLAUDE.md hierarchy, with subagent briefs. Fix: use those layers; the SDK adds maintenance burden without adding control.

A useful filter: if you cannot articulate which case applies and why the paved road cannot serve it, you do not have an SDK case. You have a "we want to feel like we built something" case, and the program does not need that.

---

## Razorpay's paved road: Agent Studio before a custom SDK

The Agent Studio builder path is not a prototype promise. Its command tree merged in June 2026, and the July migration report used it to move one agent into live traffic and another into shadow mode. The team named it the default path for creating and migrating pre-built agents. The underlying production workflows use Agno; the Claude Agent SDK remains a valid custom harness, not the automatic answer for every embedded agent.

The owning plugin is the source of truth for current command names and setup. This chapter teaches the durable release contract so the workflow survives a renamed command:

### Copyable product-agent release card

- [ ] **Outcome and owner — PM:** Name one merchant outcome, one success metric, the affected cohort, and the team that will own the agent after launch.
- [ ] **Platform fit — PM + Agent Studio owner:** Confirm the trigger, tenant boundary, connectors, and interaction fit the supported platform. Record any exception instead of silently coding around it.
- [ ] **Interaction and control — designer:** Design the empty, loading, success, failure, approval, and recovery states. Put human confirmation around consequential actions.
- [ ] **Spec and tool contracts — builder:** Define inputs, structured outputs, tool side effects, permissions, and stop conditions before implementation.
- [ ] **Test, eval, and review — owning trio:** Test tools independently, run task-level evals, inspect failures, and close the required product, design, safety, and platform review.
- [ ] **Shadow before live — PM + builder:** Compare shadow outcomes and traces with the current workflow. Do not call a clean demo a production result.
- [ ] **Release and recovery — owner:** Set the traffic step, go/no-go threshold, rollback trigger, and a tested revert path before increasing exposure.
- [ ] **Monitor — owner:** Watch outcome quality, failures, latency, cost, and unsafe actions; assign a response owner for every alert.

**Any unchecked box is a stop signal.** Keep the agent in test or shadow mode until the contract is complete. If the platform-fit box fails, take the written gap to the Agent Studio owner before choosing a custom SDK. That review is the fork; a clever local workaround is not.

Common shortcuts fail predictably:

| Shortcut | What it hides | Correct move |
|---|---|---|
| Start from a custom SDK because the agent is customer-facing | The governed platform-fit check | Check Agent Studio first; document the unsupported requirement if it cannot fit |
| Select tools before fixing one outcome | A broad agent with unclear permissions and no useful eval | Freeze one outcome and cohort, then add only the tools that outcome needs |
| Go live after a clean demo | Distribution failures, tool errors, and tenant-boundary mistakes | Run evals and shadow traffic; inspect traces before exposure |
| Copy command syntax into long-lived docs | The owning plugin can rename or split commands | Discover current commands from the plugin; keep this release card stable |
| Monitor latency but not outcomes | A fast agent can still do the wrong thing | Pair runtime signals with task success, safety, and rollback thresholds |

---

## What the SDK gives you, named

- **Direct model invocation.** You call the model API with prompts you compose; the model's response comes back to your code.
- **Tool authoring.** You define tools the agent can call. The tool definitions follow the same JSON-schema shape B.6 covers.
- **Conversation state management.** You decide how to thread turns; the SDK gives you the building blocks.
- **Streaming output.** Token-by-token responses for interactive UI surfaces.
- **Cost and audit hooks.** You can attribute calls to your team and your surface.

The SDK does not give you, by default:

- The Compass plugin's curated skills, hooks, and slash commands (you would re-author or vendor in).
- The program's redline scan (you implement your own per the policy from G.22 and Appendix H).
- The program's observability dashboard (you wire your own observability in).
- A ready-made conversation UI (you build the interaction surface).

---

## A worked decision

Suppose your team is considering a customer-facing "explain my reporting dashboard" feature. Walk the runtime test:

- **Case 1 — embedded in a product surface?** Yes. The feature lives inside the customer-facing dashboard. The agent has bounded access to that customer's data, which is per-tenant authentication the program-pinned plugin cannot provide on a customer's browser.
- **Case 2 — non-interactive pipeline?** No.
- **Case 3 — one-purpose CLI?** No.
- **Case 4 — capabilities the plugin cannot grant?** Partially yes. The per-tenant data-access path is the bounded capability you need.

Conclusion: leave the internal plugin, then check Agent Studio before writing a custom harness. Write the one-outcome spec, confirm that the product surface, tenant boundary, and reporting connector are supported, and run the release card through shadow traffic. Use a custom SDK only if the platform owner confirms a real fit gap; then your team must provide the equivalent auth, audit, eval, release, and recovery controls.

Counter-example: same team is considering a "summarise our team's status weekly" tool. Walk the four-case test:

- All four cases come back no. The program-pinned plugin (with a custom skill or a Cowork marketplace plugin per B.3) covers it.

Conclusion: do not reach for the SDK. The skill / pack / marketplace path is correct.

---

## What you carry from the SDK back to the team

A team that has authored a custom agent with the SDK has decisions to maintain forever:

- **Model version pinning.** When the model family ships a new version, you decide whether to upgrade and what regression-tests to run.
- **Prompt drift management.** Your agent's prompts evolve; you keep them in source control with semantic versioning.
- **Safety story.** Redline scanning, output classifiers, audit logs — you operate them.
- **Cost monitoring.** You attribute calls to your surface; you watch for outliers.
- **Deprecation discipline.** When the underlying SDK changes, your agent has to follow.

This is real ongoing work. A custom agent is infrastructure. Treat it as such, or do not write it.

---

## Common failure modes

**Reaching for the SDK to feel ownership.** Maintenance cost compounds. Fix: refuse the urge; contribute back instead.

**Bypassing Agent Studio for a supported merchant-facing agent.** The team inherits controls the platform already operates and the result is harder to review and support. Fix: run the platform-fit check first; escalate a documented capability gap rather than forking by instinct.

**Skipping the proxy.** A custom agent that calls the model directly bypasses the program's LLM proxy and audit trail. Fix: route every model call through the proxy; same path, same logging.

**No version pinning.** The model family upgrades; the agent's behaviour changes silently. Fix: pin the model version in your SDK config; opt in to upgrades deliberately.

**No safety story.** "We don't have customer PII, so the redlines don't apply." They always apply at some level. Fix: per G.22's reflex; per G.23's proxy; per G.25's threat model.

**Treating the agent as a one-and-done project.** It is not; it is infrastructure. Fix: name an owning team, schedule maintenance, document deprecation paths.

**Reinventing what skills already provide.** A custom agent should leverage the work the skills layer has already done; not re-derive it. Fix: import the program's skill bodies where appropriate; do not start from scratch.

---

## GREEN / YELLOW / RED self-check

- 🟢 GREEN — I can choose among the program-pinned plugin, Agent Studio, and a custom SDK; I can carry a product agent through spec, review, shadow, release, monitoring, and rollback.
- 🟡 YELLOW — I know Agent Studio exists, but I cannot yet name the platform-fit evidence or release gate I would need.
- 🔴 RED — I would start a custom SDK build because the agent is customer-facing, or send it live without shadow evidence and a tested recovery path.

---

## What you can say after this module

> "I use the program-pinned plugin for internal interactive work, check Agent Studio first for supported merchant-facing agents, and choose a custom SDK only for a reviewed fit gap. I can prove release readiness with evals, shadow evidence, monitoring, and a tested rollback path."

---

## Where to go next

B.5 (*Multi-agent orchestration*) turns to the systems-design layer. When you have multiple agents (custom or vendored) running in concert, what patterns work and what patterns do not.

**Previous:** [← B.3 Cowork plugin marketplace](B03-cowork-plugin-marketplace.md) · **Next:** [→ B.5 Multi-agent orchestration](B05-multi-agent-orchestration.md)

**Further reading**

- [Claude Agent SDK docs](https://docs.claude.com/) — Anthropic's public SDK reference
- [Agent Studio builder command tree](https://github.com/razorpay/merchant-skills/pull/232) — merged internal lifecycle and owning command source
- [Agent Studio Agno migration report](https://razorpay.slack.com/archives/C0AR58A9Z8D/p1783421811587019) — live and shadow migration evidence behind the paved-road decision
- [Agno documentation](https://docs.agno.com/) — official reference for the workflow and agent framework under the current platform path
- [G.8 — Subagents](../../03-green/a-craft/G08-subagents.md) — the subagent pattern this chapter complements
- [G.23 — The LLM proxy](../../03-green/c-guardrails/G23-llm-proxy.md) — the safety net every custom agent must respect
