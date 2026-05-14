---
title: "The Claude Agent SDK — when to write your own agent"
slug: "belts/black/agent-sdk"
section: "belts"
status: "drafted"
type: "chapter"
track: "black"
order: 4
time_minutes: 45
audience: "platform-builder"
outcome: "Decide cleanly between extending the program-pinned plugin and writing a custom agent with the Claude Agent SDK; recognise the four cases where the SDK is the right answer."
prev: "belts/black/cowork-plugin-marketplace"
next: "belts/black/multi-agent-orchestration"
pillar: "harness"
belt: "black"
tags: ["black-belt", "agent-sdk", "build-vs-install", "harness"]
updated: "2026-04-29"
---

# B.4 — The Claude Agent SDK

The default answer at every belt up to here has been: *use the program-pinned plugin*. Everything you have built (White, Yellow, Green Belt) has been about leveraging Claude Code with Compass extensions. Black Belt is the first version where the question "should we write our own agent" has a real answer that is sometimes yes. This module is the decision frame.

---

## If you're short on time

- The Claude Agent SDK lets you build a custom agent that runs the same model family Claude Code uses, but inside your own product surface: embedded in your app, scripted in your pipeline, served as a one-purpose CLI.
- Default to the program-pinned plugin; reach for the SDK only when one of four named cases applies.
- The wrong reasons to write a custom agent: "we want our own thing," "the plugin's UI is too generic," "we want to control the prompt." All three are usually solved without the SDK.

---

## The mental model

```
   ┌────────────────────────────────────────────────┐
   │              BUILD-VS-INSTALL                    │
   ├────────────────────────────────────────────────┤
   │                                                  │
   │   Program-pinned plugin (Compass + Claude Code)│
   │           │                                       │
   │           ▼                                       │
   │   Default. Used for 95%+ of program work.       │
   │   Skills, MCPs, slash commands, hooks.          │
   │                                                  │
   │   Cowork plugin marketplace                     │
   │           │                                       │
   │           ▼                                       │
   │   Non-engineer adoption surface (B.3).         │
   │                                                  │
   │   Claude Agent SDK                              │
   │           │                                       │
   │           ▼                                       │
   │   Custom agents inside your product surface.   │
   │   Use when one of the four cases applies.      │
   │                                                  │
   └────────────────────────────────────────────────┘
```

The SDK is a *level* of effort: more design surface, more maintenance, more responsibility for the safety story. Black Belt builders pick it deliberately.

---

## The four cases where the SDK is the right answer

### Case 1 — The agent is embedded in a product surface

Your team owns a customer-facing dashboard. You want to add an "explain this chart" feature where the agent has bounded access to that customer's data only. The program-pinned plugin runs on the engineer's laptop; the customer-facing surface needs the agent to live in the product itself.

The SDK is the right answer. The agent is part of the product; it ships with the product; it lives behind the product's auth and data-access controls.

### Case 2 — The agent runs in a non-interactive pipeline

Your team has a nightly pipeline that processes incoming reports. You want an agent step in the pipeline: read the incoming reports, summarise them, classify them, write to a queue. No human interaction; just an automated stage.

The SDK is the right answer. Claude Code is built for interactive sessions; a non-interactive pipeline step needs different harness shape.

### Case 3 — The agent is a one-purpose CLI you ship to teammates

Your team has a workflow that compounds enough that you want a dedicated CLI (`your-tool <args>`) running inside your product environment with bounded scope. The agent inside that CLI is a custom build, not a generic chat surface.

The SDK is sometimes the right answer here. Sometimes a slash command in the program-pinned plugin is enough; sometimes the workflow is rich enough that the dedicated CLI is the right shape.

### Case 4 — The agent has capabilities the program-pinned plugin cannot grant

The program-pinned plugin's connector list is curated. If your workflow needs a connector or a capability that has not been approved for the plugin, you cannot get it there. The SDK lets you author the agent with the capability, with your team's safety story carrying the load that the plugin's curation otherwise would.

This case has the highest cost. Authoring an agent with capabilities the program-pinned plugin does not grant is a real responsibility: security review, audit trail, deprecation path. Most teams should not reach for this case lightly.

---

## The wrong reasons to write a custom agent

Three patterns to refuse.

**"We want our own thing."** The program's leverage compounds because everyone is on the same plugin. Fragmenting that to assert team identity is expensive and unjustified. Fix: contribute back to the program plugin instead.

**"The plugin's UI is too generic."** Most "UI" complaints are actually about output shape: the agent's responses are too verbose, too short, too templated. Fix: a skill with a tighter output shape (per G.7) usually solves this; the SDK does not.

**"We want to control the prompt."** You can already control the prompt with skills, with hooks, with CLAUDE.md hierarchy, with subagent briefs. Fix: use those layers; the SDK adds maintenance burden without adding control.

A useful filter: if you cannot articulate which of the four cases applies, you do not have an SDK case. You have a "we want to feel like we built something" case, and the program does not need that.

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

Suppose your team is considering a customer-facing "explain my reporting dashboard" feature. Walk the four-case test:

- **Case 1 — embedded in a product surface?** Yes. The feature lives inside the customer-facing dashboard. The agent has bounded access to that customer's data, which is per-tenant authentication the program-pinned plugin cannot provide on a customer's browser.
- **Case 2 — non-interactive pipeline?** No.
- **Case 3 — one-purpose CLI?** No.
- **Case 4 — capabilities the plugin cannot grant?** Partially yes. The per-tenant data-access path is the bounded capability you need.

Conclusion: the SDK is the right answer. You author a custom agent inside the product, give it bounded access to the customer's reporting data, route through the program's LLM proxy (G.23) for cost/audit, apply the redline reflexes (G.22), and ship.

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

**Skipping the proxy.** A custom agent that calls the model directly bypasses the program's LLM proxy and audit trail. Fix: route every model call through the proxy; same path, same logging.

**No version pinning.** The model family upgrades; the agent's behaviour changes silently. Fix: pin the model version in your SDK config; opt in to upgrades deliberately.

**No safety story.** "We don't have customer PII, so the redlines don't apply." They always apply at some level. Fix: per G.22's reflex; per G.23's proxy; per G.25's threat model.

**Treating the agent as a one-and-done project.** It is not; it is infrastructure. Fix: name an owning team, schedule maintenance, document deprecation paths.

**Reinventing what skills already provide.** A custom agent should leverage the work the skills layer has already done; not re-derive it. Fix: import the program's skill bodies where appropriate; do not start from scratch.

---

## GREEN / YELLOW / RED self-check

- 🟢 GREEN — I can decide between the program-pinned plugin and the Agent SDK in under five minutes by walking the four-case test, and I refuse the wrong-reason patterns.
- 🟡 YELLOW — I understand the SDK exists but my decision frame is "it depends" rather than the four named cases.
- 🔴 RED — I would reach for the SDK without the four-case test and without the safety story.

---

## What you can say after this module

> "I default to the program-pinned plugin and reach for the Claude Agent SDK only when one of the four cases applies: embedded in a product, non-interactive pipeline, one-purpose CLI, or capabilities the plugin cannot grant. I refuse the wrong-reason patterns."

---

## Where to go next

B.5 (*Multi-agent orchestration*) turns to the systems-design layer. When you have multiple agents (custom or vendored) running in concert, what patterns work and what patterns do not.

**Previous:** [← B.3 Cowork plugin marketplace](B03-cowork-plugin-marketplace.md) · **Next:** [→ B.5 Multi-agent orchestration](B05-multi-agent-orchestration.md)

**Further reading**

- [Claude Agent SDK docs](https://docs.claude.com/) — Anthropic's public SDK reference
- [G.8 — Subagents](../../03-green/a-craft/G08-subagents.md) — the subagent pattern this chapter complements
- [G.23 — The LLM proxy](../../03-green/c-guardrails/G23-llm-proxy.md) — the safety net every custom agent must respect
