---
title: "Publishing a plugin — package once, prove every surface"
slug: "belts/black/cowork-plugin-marketplace"
section: "belts"
status: "drafted"
type: "chapter"
track: "black"
order: 3
time_minutes: 45
audience: "platform-builder"
outcome: "Publish a plugin through the canonical Razorpay marketplace, then prove each user surface you claim supports it."
prev: "belts/black/skill-pack-publishing"
next: "belts/black/agent-sdk"
pillar: "harness"
belt: "black"
tags: ["black-belt", "plugins", "plugin-marketplace", "publishing", "compatibility"]
updated: "2026-08-13"
---

# B.3 — Publishing a plugin

B.2 covered one reusable `SKILL.md`. Use a **plugin** when the workflow also needs agents, hooks, MCP configuration, setup scripts, or settings that should travel together.

At Razorpay, the current source of truth is [`razorpay/claude-plugins`](https://github.com/razorpay/claude-plugins). It publishes marketplace manifests for supported agent clients. A package appearing there proves that the source was listed. It does **not** prove that every surface—including Cowork—can discover, install, configure, and run it.

That last distinction matters to PM and Design audiences. “It is in the marketplace” and “a teammate can use it in Cowork” are two different receipts.

---

## If you're short on time

- Build a plugin only when a shared skill is too small for the capability.
- Contribute a repository-native plugin directory; do not invent `pack.yml` or a separate tenant registry.
- Validate the package, both checked-in marketplace manifests, the real install path, and one representative invocation.
- Claim a user surface only after testing discovery, installation, invocation, connectors, stop conditions, and user-visible output on that surface.
- If Cowork proof is missing, say **unverified for Cowork**. A support question is not a deployment strategy.

---

## The mental model

```text
Plugin source in razorpay/claude-plugins
  -> local package validation
  -> Claude + Codex marketplace entries
  -> review + merge
  -> clean install on each claimed client
  -> representative invocation
  -> separate surface receipt for Cowork or any non-CLI runtime
```

Think in two layers:

1. **Package proof:** does the repository contain a valid, reviewable plugin and list it in the canonical manifests?
2. **Surface proof:** can the named audience actually discover, install, configure, invoke, and verify it where you promised?

Package proof is necessary. Surface proof is what makes a distribution claim true.

---

## Choose the right unit

```text
Does the workflow need only instructions and optional scripts/references?
├─ yes -> publish a shared skill through B.2
└─ no
   Does it bundle agents, hooks, MCP config, setup, or settings?
   ├─ yes -> publish a plugin through this chapter
   └─ no -> simplify the design before adding a package boundary
```

A plugin is not a more prestigious skill. It has a larger failure surface and a larger maintenance contract. Use it because the runtime bundle requires it, not because the launch deck needs a box.

---

## Build the repository-native package

Follow the current contribution guide in `razorpay/claude-plugins`. A typical plugin looks like this:

```text
plugins/<plugin-name>/
├── .claude-plugin/
│   └── plugin.json       # package metadata
├── README.md             # setup, use, support
├── skills/               # optional model-invoked workflows
├── agents/               # optional specialist agents
├── hooks/                # optional/required by current repo policy
├── .mcp.json             # optional placeholders; never secrets
└── scripts/              # optional setup or deterministic helpers
```

Repository policy changes faster than a curriculum chapter. Before copying this shape, read the current contribution guide and an active plugin next to yours. In particular, let the platform's convention-loaded files load once; declaring the same hooks twice can turn a working bundle into a red “failed to load” state.

Keep credentials out of source control. Commit placeholders and a documented setup path. If a connector is optional, specify what degrades without it. If it is required, fail closed and tell the user what evidence to capture.

---

## Publish the package

### 1. Search and choose an owner

Search the repository for the job, trigger, connector, and audience. Improve an existing plugin when the capability already has an owner. For a new plugin, name the team that will review future changes, answer support questions, and maintain dependent APIs.

### 2. Build one representative workflow

Start with one invocation and one observable output. Include:

- the plugin manifest and README;
- the skill or agent that performs the job;
- placeholder-only connector configuration;
- explicit permissions and stop conditions;
- setup and failure guidance;
- a fixture or example that another teammate can repeat.

### 3. Validate locally

From the `claude-plugins` repository root, run the current plugin validation and the tests specific to your package. The contribution guide currently documents:

```bash
claude plugin validate ./plugins/<plugin-name>
claude --plugin-dir ./plugins/<plugin-name>
```

The first command checks package shape. The second starts a local runtime; invoke the representative workflow there and inspect the actual output. Run any plugin-specific tests and repository checks named in the current contribution guide or CI.

### 4. Update the canonical marketplace manifests

The repository currently tracks Claude and Codex marketplace manifests. Add the plugin to both according to the current schema, then run the repository sync checks. The lists, source path, and package version must agree.

Do not add a `pack.yml`, separate registry URL, or guessed tenant identifier. If the canonical repository does not consume an artifact, it is not part of the publishing path.

### 5. Open the PR

The PR should state:

- the repeated workflow and intended audience;
- why a plugin is needed instead of a shared skill;
- the owning team;
- components and permissions added;
- validation and representative invocation results;
- the clients and user surfaces actually tested;
- known unsupported or unverified surfaces.

Get the reviews required by the repository's current ownership and security controls. Treat passing CI as package proof, not automatic user-surface proof.

### 6. Clean-install and invoke

After merge, install from the canonical marketplace on every client named in the launch claim. Start from a clean profile or use a teammate who did not author the plugin. Record the version, install result, invocation, result, and failure behaviour.

### 7. Prove each promised surface

If you want PMs or designers to use the plugin through Cowork, test Cowork separately. A Claude Code receipt does not establish Cowork compatibility. Capture how the user discovers the plugin, how it is enabled, how connectors are authorised, what invocation starts it, and what success or refusal looks like.

If no supported Cowork publication route or owner-approved test exists, stop at the verified marketplace claim. Describe the plugin as available on the clients you tested and **unverified for Cowork**. Do not send business users to reverse-engineer a developer package.

---

## Copyable surface-proof matrix

Run one row for every surface named in the launch message. Paste the completed matrix into the PR or release record.

```markdown
| Surface | Discover | Install / enable | Invoke | Connector auth | Stop / refusal | User receipt | Result |
|---|---|---|---|---|---|---|---|
| Claude Code | <evidence> | <evidence> | <evidence> | <evidence> | <evidence> | <link or redacted artifact> | pass / limited / fail |
| Codex | <evidence> | <evidence> | <evidence> | <evidence> | <evidence> | <link or redacted artifact> | pass / limited / fail |
| Cowork | <evidence> | <evidence> | <evidence> | <evidence> | <evidence> | <link or redacted artifact> | pass / limited / unverified |
```

Use **pass** only when the whole row works. Use **limited** when the workflow runs but a named capability differs. Use **unverified** when there is no supported test route. Never convert a blank cell into optimism.

---

## Common failure modes

**Inventing a tenant marketplace contract.** The chapter or launch note describes `pack.yml`, one-click deployment, or central approval that the canonical repository does not implement. Fix: use the live repository's package and manifest workflow; mark other surfaces unverified until they have their own proof.

**Equating source with availability.** A plugin directory exists, so the team says PMs can use it. Fix: separate package proof from surface proof and complete the matrix.

**Testing only the author environment.** Local paths, cached credentials, or already-installed connectors hide a broken install. Fix: use a clean profile or an out-of-team tester after merge.

**Duplicating convention-loaded hooks.** The manifest declares hooks that the client already discovers from the standard location, producing a duplicate-load error. Fix: follow the current repository convention and test a clean install.

**Publishing secrets or broad permissions.** A connector file contains real credentials, or a tool gets wider access than the representative workflow needs. Fix: commit placeholders, use approved credential stores, document scopes, and verify refusal behaviour.

**Claiming Cowork from a CLI test.** Claude Code or Codex works, so the launch note adds Cowork. Fix: complete the Cowork row or remove the claim.

---

## GREEN / YELLOW / RED self-check

- 🟢 GREEN: the plugin is merged, clean-installed, invoked, and backed by a complete proof row for every claimed surface.
- 🟡 YELLOW: package validation passes, but one claimed client or surface has a missing or limited receipt.
- 🔴 RED: the distribution claim depends on fictional artifacts, the author's cached environment, committed credentials, or “it should work.”

---

## What you can say after this module

> "I publish repository-native plugins and prove each user surface separately. A marketplace entry proves packaging; a complete receipt proves availability."

---

## Where to go next

If no supported client can host the workflow, continue to B.4 and evaluate a custom agent. If a shared skill can do the job, go back to B.2 and remove the unnecessary package surface.

**Previous:** [← B.2 Publishing a shared skill](B02-skill-pack-publishing.md) · **Next:** [→ B.4 The Claude Agent SDK](B04-agent-sdk.md)

**Further reading**

- [`razorpay/claude-plugins` README](https://github.com/razorpay/claude-plugins#readme) — current marketplace and installation path.
- [`razorpay/claude-plugins` contribution guide](https://github.com/razorpay/claude-plugins/blob/master/docs/CONTRIBUTING.md) — current package, validation, and review requirements.
- [2026-08-04 `#ai-help` publication request](https://razorpay.slack.com/archives/C08C35GKJKD/p1785816759045759) — why a repository package and Cowork availability need separate proof.
- [2026-08-13 `#ai-help` setup request](https://razorpay.slack.com/archives/C08C35GKJKD/p1786587471592669) — current PM-facing demand for an explicit Cowork route.
- [B.2 — Publishing a shared skill](B02-skill-pack-publishing.md)
- [G.7 — Writing your first SKILL.md](../../03-green/a-craft/G07-writing-your-first-skill.md)