---
title: "Publishing a shared skill — placement, validation, review"
slug: "belts/black/skill-pack-publishing"
section: "belts"
status: "drafted"
type: "chapter"
track: "black"
order: 2
time_minutes: 30
audience: "platform-builder"
outcome: "Publish a reusable skill to razorpay/agent-skills so other teams can discover, install, verify, and maintain it without re-deriving the workflow."
prev: "belts/black/internal-mcp-server"
next: "belts/black/cowork-plugin-marketplace"
pillar: "context"
belt: "black"
tags: ["black-belt", "agent-skills", "publishing", "governance"]
updated: "2026-07-15"
---

# B.2 — Publishing a shared skill

Green Belt taught you to author a `SKILL.md` (G.7). Black Belt teaches you to publish that workflow to [`razorpay/agent-skills`](https://github.com/razorpay/agent-skills), Razorpay's shared skill library, so another team can install and maintain it.

The unit of contribution is a **skill directory in the shared repository**, not a separate `pack.yml`, checksummed bundle, or private registry entry. The normal delivery path is a pull request.

---

## If you're short on time

- Put the skill in the right `razorpay/agent-skills` directory: shared technical capability, team-owned workflow, or cross-functional business workflow.
- Keep the required instructions in `SKILL.md`; use `references/`, `scripts/`, and `assets/` only when they earn their keep.
- Run the repository validation, open a normal PR, and get approval from the owning team. Structural changes also need DevEx review.
- Prove the merged skill installs with `npx skills add razorpay/agent-skills --skill <skill-name>`.
- Do not invent a wrapper pack merely to look platform-shaped. A boring, installable directory beats an elegant diagram nobody can run.

---

## The mental model

```text
Repeated workflow
  -> one well-scoped SKILL.md
  -> correct agent-skills directory
  -> validation + usage example
  -> owning-team PR review
  -> merged shared library entry
  -> clean install by another team
```

The repository is both distribution surface and audit trail. The skill path says who it is for; Git history records how it changed; CODEOWNERS and the PR establish review.

---

## Choose the placement before writing

Use this decision tree. It is intentionally small enough to run in your head:

```text
Is this a technical capability useful across teams?
├─ yes -> <category>/skills/<skill-name>/
└─ no
   Is this one team's workflow or tooling?
   ├─ yes -> teams/<team-name>/skills/<skill-name>/
   └─ no -> business/<domain>/<skill-name>/
```

Examples:

- `development/skills/code-review` — a reusable technical capability;
- `teams/<team>/skills/<workflow>` — a team-owned operating workflow;
- `business/<domain>/<workflow>` — a cross-functional business process.

If placement is unclear, ask in `#devex-skills` before building a new top-level category. A structural change is the exceptional case; most contributions fit an existing directory.

---

## Build the repository-native shape

A shared skill normally looks like this:

```text
<location>/<skill-name>/
├── SKILL.md        # required
├── references/     # optional: context loaded when needed
├── scripts/        # optional: deterministic helpers
└── assets/         # optional: templates or output assets
```

`SKILL.md` needs valid frontmatter, a precise activation description, concrete instructions, and examples. The current repository guidance prefers progressive disclosure over a giant body: detailed schemas and lookup material belong in `references/`; reliable repeated code belongs in tested `scripts/`.

Do not add a README, changelog, install guide, or `pack.yml` inside every skill unless the repository's current contribution guide explicitly requires it for that path. The skill should contain what the agent needs. Repository-level docs already explain discovery and installation.

---

## The publishing workflow

### 1. Search before creating

Check whether a skill already covers the job:

```bash
npx skills add razorpay/agent-skills --list
```

Also search the repository by workflow and trigger language. If an existing skill is close, improve it instead of creating a near-duplicate with a more exciting name.

### 2. Pick the owner and path

Choose the shared, team, or business path. The owning team or business function must be able to review future changes and answer support questions. For a team or business skill, follow the repository's current frontmatter and CODEOWNERS guidance.

### 3. Author the smallest complete skill

Start with one workflow and one observable output. Include:

- the trigger in the frontmatter description;
- required inputs and preconditions;
- the ordered workflow;
- refusal or stop conditions;
- output shape and at least one example;
- failure handling;
- tested scripts or references only where needed.

### 4. Validate locally

Run the repository checks from the `agent-skills` root:

```bash
make test
```

For a focused preflight, the repository also documents its skill reviewer:

```bash
python generic-helpers/skills/skill-reviewer/scripts/validate.py path/to/SKILL.md
```

Fix the findings rather than lowering the bar. If the skill has scripts, run them against representative fixtures as well.

### 5. Open the pull request

The PR should state:

- what repeated workflow the skill captures;
- why the chosen directory is correct;
- who owns the workflow;
- how the reviewer can invoke it;
- what validation and representative test you ran;
- what the skill deliberately does not do.

Get review from the owning team. The current repository workflow routes structural changes to DevEx review; a normal skill-content PR does not need a separate central-platform blessing merely because it is a skill.

### 6. Install the merged skill cleanly

Do not count “merged” as “published” until a consumer can install it:

```bash
npx skills add razorpay/agent-skills --skill <skill-name>
```

For a specific supported agent, add its agent selector. Test from a clean environment or with a teammate who did not author the skill, then run one representative invocation.

### 7. Announce and observe adoption

Share the merged PR, install command, use case, and owner in `#devex-skills`. If the skill is useful beyond its originating team, also use the relevant discovery channel. Track real installs and feedback in the PR, issue, or owning team's durable backlog—not only in a disappearing Slack thread.

Quest B-1 is the practical test: another POD must be able to install the merged skill and use it without the author driving their terminal.

---

## Copyable pre-PR checklist

```markdown
## Shared-skill publishing check

- [ ] Existing skill search completed; no near-duplicate found
- [ ] Placement matches shared / team / business scope
- [ ] Owning team or function identified
- [ ] SKILL.md has a precise trigger, workflow, stop conditions, and example
- [ ] References and scripts use progressive disclosure
- [ ] `make test` passes
- [ ] Any scripts ran against representative fixtures
- [ ] Clean install command prepared
- [ ] Out-of-team consumer can run one representative invocation
```

This checklist is the interactive element: run it before opening the PR, then paste the completed version into the description. No dashboard required.

---

## Common failure modes

**Inventing a pack format.** A contributor creates `pack.yml`, nested READMEs, and a release wrapper that the shared repository does not consume. Fix: publish the repository-native skill directory. Use plugin packaging only when you are actually distributing a plugin with agents, hooks, or settings.

**Wrong placement.** A team-specific workflow lands as a universal technical skill, or a shared capability hides under one team. Fix: run the placement decision tree before authoring.

**Personal ownership.** The original author is the only person who can explain or review the workflow. Fix: route the PR through the team or function that owns the underlying job and update CODEOWNERS where the repository requires it.

**Passing prose review but failing installation.** The Markdown looks good in the PR, but the merged path or skill name cannot be installed. Fix: run the real `npx skills add ... --skill ...` path from a clean environment.

**Central-approval queue by habit.** A normal skill PR waits on a platform team that does not own the workflow. Fix: get the owning team's approval; involve DevEx when the contribution changes repository structure or the documented path requires it.

**No consumer proof.** The author can invoke the skill, but nobody else has tried it. Fix: ask an out-of-team consumer to install and run one representative case before claiming cross-POD adoption.

---

## GREEN / YELLOW / RED self-check

- 🟢 GREEN: I can place, validate, review, merge, and clean-install a skill in `razorpay/agent-skills`; another team has run it without my help.
- 🟡 YELLOW — I have authored a skill, but its ownership, placement, review path, or clean-install proof is incomplete.
- 🔴 RED — I am preparing a custom pack or central approval request without checking the current shared-repository workflow.

---

## What you can say after this module

> "I publish repository-native skills with clear ownership, passing validation, the right review path, and a clean install—not orphan bundles that only work on my machine."

---

## Where to go next

B.3 covers the different case: packaging a wider plugin surface for Cowork. First prove the workflow as a shared skill. Add plugin machinery only when the audience or capability requires it.

**Previous:** [← B.1 Authoring an internal MCP server](B01-internal-mcp-server.md) · **Next:** [→ B.3 Cowork plugin marketplace](B03-cowork-plugin-marketplace.md)

**Further reading**

- [`razorpay/agent-skills` README](https://github.com/razorpay/agent-skills#readme) — discovery, installation, and repository commands.
- [`razorpay/agent-skills` contributing guide](https://github.com/razorpay/agent-skills/blob/master/docs/contributing.md) — current structure, validation, and review path.
- [`razorpay/agent-skills` placement guide](https://github.com/razorpay/agent-skills/blob/master/docs/skill-placement-guide.md) — shared versus team versus business placement.
- [Merged `agent-skills` PR #2674](https://github.com/razorpay/agent-skills/pull/2674) — a current example of a normal skill-content PR reviewed and merged through the repository workflow.
- [G.7 — Writing your first SKILL.md](../../03-green/a-craft/G07-writing-your-first-skill.md)
