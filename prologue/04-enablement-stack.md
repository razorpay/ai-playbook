---
title: "The Enablement Stack"
slug: "prologue/enablement-stack"
section: "prologue"
status: "drafted"
type: "chapter"
track: null
order: 4
time_minutes: 10
audience: "everyone"
outcome: "See the nine org-level layers the belt system climbs."
prev: "prologue/mental-model"
next: "prologue/tool-tour"
pillar: null
belt: null
tags: ["orientation", "enablement"]
updated: "2026-04-26"
---

# 0.4 — The Enablement Stack (the 9-layer map)

> **⏱ 10 minutes · 👥 Everyone · 🎯 Leaves with:** a mental map of the nine org-level layers Razorpay is building to make a full-stack builder program possible: and an honest view of which layers are shipped, which are half-built, and which are still gaps.

---

## If you're short on time

Zoom out from the 5-layer personal stack (previous chapter) and you see a **nine-layer organisational stack** — the stuff Razorpay as a company is building so that individual builders like you can exist at all. This stack has a name: the **Enablement Stack**. It runs from Layer 0 (Foundation) up to Layer 8 (Infrastructure/Devstack).

The whole stack is oriented around one target state:

> **North Star:** *Dashboard and Claude running on cloud. No local setup as a prerequisite for any builder.*

The playbook you're reading is, more or less, a user manual for this stack. Belts map to how deeply you engage with each layer. White Belt lives in Layer 0 + Layer 7. Yellow Belt is Layer 2 (AI workflow skills). Green and Black Belts climb through Layers 3–6. The fact that some layers are marked ❌ **Gap** is not a secret — it's part of how the playbook stays honest.

---

## Why you're seeing two stacks

The Prologue gives you two mental models, back to back, and they can feel redundant. They're not.

- **The 5-layer model** ([§0.3](03-mental-model.md)) is about *your laptop.* It's the stack that sits between your fingers and a running dashboard. You think in layers 1–5 when you're debugging your own session.
- **The 9-layer Enablement Stack** (this chapter) is about *the program.* It's the stack the org is building to scale builders from tens to thousands. You think in layers 0–8 when you're asking "why doesn't Razorpay have a cloud IDE?" or "why isn't there a feature-flag doc?"

Think of the two stacks like a person and a city. The five-layer model is your body: you breathe, you see, you move. The nine-layer stack is the city: sidewalks, plumbing, power grid, libraries. Both have to work for you to have a good day. This chapter is the city map.

---

## The North Star

Everything in the Enablement Stack is oriented around one target state:

> **A designer opens a browser, interacts with Claude Code in a cloud environment, sees live changes, and shares them with a reviewer in under 30 seconds. No Mac-setup prerequisite. No admin-password fight. No "works on my machine."**

Today we're not there. A new builder still needs a Mac and a morning. But every Layer of the stack below is a step toward that target. Read the chapter with that destination in mind.

---

## The nine layers, at a glance

![The nine-layer Enablement Stack](../diagrams/04-enablement-stack.svg)

| Layer | Name | What it is | Playbook belts that live here |
|-------|------|------------|-------------------------------|
| **0** | Foundation (Environment & Access) | The floor. Setup scripts, corporate-proxy cert trust, GCloud auth, Node/pnpm/nvm, Compass plugin, IDE config. | White Belt W-0 → W-4 |
| **1** | Collaboration & Sharing (Preview Rails) | How builders share live work — the design-preview platform, per-branch preview URLs, ingress middleware. | Yellow Belt Y-4 (first shared preview) |
| **2** | AI Workflow (Skill Infrastructure) | The skills that chain into a pipeline: design-intel → build → pre-ship-check → PR guardrail. | Yellow + Green Belt Part A |
| **3** | Knowledge Base (Razorpay Context) | Structured markdown that skills read — repo map, test creds, flags, error patterns, staging guide. | Green Belt Part B (contributing to KB) |
| **4** | Design System (Blade Ecosystem) | Blade components, the component-contribution pipeline, org-wide compliance scan, motion presets. | Black Belt Part B (shipping to Blade) |
| **5** | Intelligence & Discovery | Analytics and market-research integrations so skills reason from real Razorpay data, not just general knowledge. | Green Belt Part C (data-aware skills) |
| **6** | Observability & Adoption | Skill-invocation traces, adoption metrics, compliance %, signal loops from PODs. | Black Belt Part C (program-level) |
| **7** | L&D (Continuous Learning) | Self-paced modules, Mini L&Ds, Builder Days, component-contribution events, certification. | Every belt has a touchpoint here |
| **8** | Infrastructure (Devstack) | Not owned by this program: devstack uptime, build speed, API mocking, status page. External dependency. | Out of scope — but you'll depend on it |

Status at a glance (current point in the cycle): **Layers 0, 2, and 7 are the most mature** (mostly ✅ Built). **Layers 1 and 3 are active workstreams** (🔄 In Progress). **Layers 4 and 5 are the frontier** (mix of ✅, ❌, and 🗓️ planned-for-next-quarter). **Layers 6 and 8 are the bottlenecks** (❌ Gaps blocked on instrumentation work and external teams).

---

## Layer-by-layer walkthrough

### Layer 0 — Foundation

**Why it matters:** The previous chapter ([§0.2](02-bd1-bd2-origin.md)) is a cautionary tale about this layer. Every other layer in this stack is worthless if a builder can't get past Layer 0.

**What's shipped:** A one-command setup script that installs Claude Code (via Vertex), GCloud CLI, Node/pnpm/nvm, and trusts the corporate proxy certificate. A design-environment setup flow that configures the Blade connector, the Figma connector, and access to the internal npm registry. A verification skill that runs a ten-point green/red health check and prints a one-line fix suggestion for any red.

**What's still a gap:** A documented IDE setup (VS Code / Cursor extensions, workspace config), and the holy grail: a **cloud-hosted dev environment** (Codespaces, Gitpod, or an internal equivalent) that removes the Mac requirement entirely. This is blocked on org-level billing approval. The north star depends on this layer going cloud-first.

**Playbook belt:** White Belt. The W-0 boss fight is named "Turn GREEN" because it is literally running the verification skill until all ten checks go green.

### Layer 1 — Collaboration & Sharing (Preview Rails)

**Why it matters:** Builders need to share live work with reviewers *without* asking reviewers to clone and run locally. Without this, reviews don't scale. Events don't compound because nobody else sees the work.

**What's shipped:** A **design-preview platform**: a GitHub Action that triggers on any `design/*` branch, deploys to a devstack pod, and comments back a stable per-branch URL on the PR. The existing ingress middleware handles server-side header injection so reviewers need no browser extension. VPN access control and auto-expiring pod cleanup are already live.

**What's still a gap:** Live / HMR sharing (reviewer sees changes as you type) is untested — worth trying VPN machine-to-machine direct before reaching for any tunnel. An annotation layer (reviewers commenting on specific UI elements in the preview) is a downstream phase.

**Playbook belt:** Yellow Belt Y-4, "your first shared preview," is when this layer becomes muscle memory.

### Layer 2 — AI Workflow (Skill Infrastructure)

**Why it matters:** This is the intelligence layer — the skills that convert a builder's intent into production-grade, Blade-compliant code. Each step is a skill; the skills chain into an end-to-end pipeline.

**What's shipped:** A library of roughly a dozen skills, grouped into three phases.

- **Design phase:** a divergence-before-convergence skill that generates several distinct design strategies and validates each against the Blade component library.
- **Build phase:** a component-choice decision tree across the Blade library, a page-scaffolding skill for common patterns, a "production-compiler" that transforms AI-studio output into Blade-compliant code, a repo-orientation skill for newcomers to a codebase, and a symptom-based UI debugging skill.
- **Quality gate + ship phase:** a Blade compliance reviewer, a six-layer pre-ship check (compliance, design soundness, dependency sanity, conflict detection, accessibility, screenshot), and a gated PR creation skill.

The chained pipeline reads: **design-intel → [build] → pre-ship-check → PR guardrail.** [Appendix C — Skills Library](../appendices/C-skills-library/README.md) holds the first-pass index for these patterns.

**What's still a gap:** Edge-case enumeration (empty / error / permission variants); a Figma-URL-to-code one-shot; iteration branching (parallel design options within one session).

**Playbook belt:** Yellow Belt uses skills out of the box. Green Belt Part A teaches you to write your own.

### Layer 3 — Knowledge Base (Razorpay Context)

**Why it matters:** Skills are only as good as the context they can read. The single most common failure mode in builder sessions is not code quality — it's missing Razorpay context. *"Why is nothing loading?" (not logged in). "What OTP do I use?" (no standard answer). "Which repo should I edit?" (not documented).*

**What's shipped:** A partial codebase map, a UI-visibility debugging skill, and pieces of a repo-orientation flow.

**What's still a gap:** Most of it. Test credentials and flows, feature flags, B2C testing, error pattern library, staging environment details, dashboard version confusion, devstack status, signup/onboarding flow (infra-blocked), data-filled test states, API mocking conventions, Razorpay-specific design-system patterns on top of Blade. This is the **highest-impact unbuilt layer** for builder productivity.

**Playbook belt:** Green Belt Part B boss fight is "contribute one page to the Knowledge Base." Every builder who hits a gap is expected to leave it sharper than they found it.

### Layer 4 — Design System (Blade Ecosystem)

**Why it matters:** One Blade update propagates to everywhere that component is used. The design system is both a quality floor (bad UI can't ship) and a contribution pipeline (good ideas can propagate) — if builders can contribute back.

**What's shipped:** A Blade compliance reviewer skill, a six-gate pre-ship check that includes compliance, and an early org-wide compliance scan script.

**What's still a gap:** The **component-contribution pipeline** (the way a product team proposes a new "snowflake" component) has historically been cumbersome enough to be effectively unused. Fixing this is on the near-term roadmap, including a dedicated contribution event where the Blade team approves snowflakes on the day. Motion and animation presets are also on the roadmap.

**Playbook belt:** Black Belt Part B. The boss fight is "ship a Blade snowflake." That's the move that changes Razorpay at org scale.

### Layer 5 — Intelligence & Discovery

**Why it matters:** Skills that reason from *general* knowledge are useful but limited. Skills that reason from *Razorpay's actual data* (user behaviour, competitive benchmarks, support signals) are transformative. *"The skill is doing the analysis. If the skill isn't getting the raw data to run on, it's only half the skill."*

**What's shipped:** The divergence skill (uses general knowledge + Figma, not live data) and a user-research synthesis skill that applies a jobs-to-be-done frame to interview transcripts.

**What's still a gap:** **Market-research integration** (competitive benchmarks, feature comparison), **product-analytics integration** (funnel drop-off, adoption, error rates), in-product signal ingestion (support tickets, support-channel threads → design inputs). These depend on engineering partnership with the analytics and data teams.

**Playbook belt:** Green Belt Part C ("data-aware skills") is where you start writing skills that pull from real Razorpay data sources.

### Layer 6 — Observability & Adoption

**Why it matters:** The program's primary measure is adoption. Without instrumentation, we're flying blind. We can run an event with fifty attendees and not know whether any of them are still using the skills two weeks later.

**What's shipped:** Partial tracing on a single skill pipeline. That's about it.

**What's still a gap:** **Builder count via GitHub handles** — an elegant proposal to collect designer/PM GitHub handles and filter all Razorpay PRs to get an instant adoption metric; skill usage tracing across the library; time-to-PR baseline; org-wide Blade compliance %; post-event sustained-usage tracking; a weekly cross-POD signal forum that surfaces localised blockers.

**Playbook belt:** Black Belt Part C is where you start operating the program, not just using it: running your POD's own adoption metrics, hosting your own Mini L&Ds, feeding the cross-POD forum.

### Layer 7 — L&D (Continuous Learning)

**Why it matters:** The flywheel. Events create initial activation. Skills create daily compounding. Certification creates org-wide signal. The system keeps pace with evolving tools *because learning is embedded in the work*, not siloed in a training calendar.

**What's shipped:** A six-module self-paced curriculum (terminal, git, Figma-to-code, Blade, PR workflow, debugging); two Mini L&D facilitator guides that have been run live; two Builder Days (one failed, one successful); certification tier design.

**What's still a gap:** The dedicated component-contribution event; just-in-time learning embedded inside skills (skills currently execute without explaining the "why"); post-event follow-through; a curriculum update cycle.

**Playbook belt:** *Every* belt has a touchpoint here — that's what makes the playbook itself part of this layer.

### Layer 8 — Infrastructure (Devstack)

**Why it matters:** Not owned by the program team, but the program *depends* on it. Items here require engagement with the devstack team, not just new skills.

**What's external / gap:** Devstack stability (known pain point, no runbook); devstack speed (full E2E CI runs hours rather than minutes); devstack-external URL work (ingress restructuring in progress); API mocking (blocks FE-first dev); signup/onboarding runs locally (broken); a devstack status page. The program files these as external dependencies and routes around them where possible, but the north star ultimately requires devstack to get faster, cloud-accessible, and more observable.

**Playbook belt:** Out of scope. But you'll depend on this layer every day. When devstack is down, so are you — that's one of the honest realities the playbook names.

---

## Where the gaps are — the honest view

The playbook's credibility depends on not pretending we've shipped what we haven't. The **five most load-bearing gaps** today:

- **Razorpay Knowledge Base** (Layer 3) — the biggest lever for builder productivity. Every week it stays gap-shaped, we burn the same hour per new builder rediscovering test credentials and flag conventions.
- **Builder count via GitHub handles** (Layer 6) — turns adoption from "we think" into "we know."
- **Cross-POD signal forum** (Layer 6 + 7) — the ground-truth feedback loop from the teams actually using the stack.
- **Component-contribution pipeline** (Layer 4) — unblocking the Black Belt boss fight at scale.
- **Cloud IDE** (Layer 0) — the north-star unlock. Removes the Mac requirement for new builders entirely.

If you are a lead reading this playbook wondering where you can plug in — those are the five places where a committed manager plus two committed builders can move the whole program forward. The Ship-to-Learn cohort structure (referenced through Green Belt) is the standing way to sponsor a cohort that tackles one of these gaps; Appendix M will hold the operational template when it ships.

---

## How belts climb this stack

The belt system is not a parallel taxonomy — it's an ascent path through these nine layers. Read this paragraph once and the rest of the playbook stops feeling like a pile of concepts.

- **White Belt** operates at **Layer 0 + Layer 7**. You run the setup scripts (Layer 0), you consume the learning content (Layer 7), and your boss fight is to GREEN all ten checks of the verification skill. You don't have to know that any higher layer exists yet.
- **Yellow Belt** spends most of its time in **Layer 2** (the skill library) and dips into **Layer 1** (your first shared preview). The boss fight is your first merged PR in a Razorpay org repo. You're consuming what the program built.
- **Green Belt** crosses into **Layers 3, 5, and the authorship side of Layer 2**. Part A = writing skills (Layer 2 creation). Part B = contributing to the KB (Layer 3). Part C = data-aware skills (Layer 5). Boss fight: the **double-ship** — a skill your team installs, plus a feature that touches something beyond pure frontend.
- **Black Belt** climbs **Layers 4, 6, and 7**. Part A = platform contributions (your skill is adopted org-wide). Part B = a Blade component ship (Layer 4 contribution pipeline). Part C = program operation (Layer 6 observability, Layer 7 facilitation). Boss fight: **autonomy** — you mentor a cohort and lead a Builder Day.
- **The Staff+ Council** (post-Black) operates at the **whole-stack design level**, evaluating new tools, authoring new layers, and rewriting this playbook.

That's the ascent. Nine layers. Four belts. One common destination: the north-star sentence at the top of this chapter.

---

## What you should carry into the next chapter

- Two stacks, not one: **5-layer personal** (your laptop) and **9-layer organisational** (the program).
- The 9-layer stack has a status per layer and a priority order — this is a *real* artefact, not aspirational.
- Some layers are mature (0, 2, 7). Some are frontier (4, 5). Some are bottlenecks (6, 8). All of them are named.
- Belts map to climbing specific layers. When you're later told "you're at Green Belt Part B," that means *KB contribution* — no translation needed.
- The next chapter ([§0.5 — Meet your tools](05-tool-tour.md)) is the 60-second tour of each tool in the Layer 4 Compass overlay and Layer 5 harness — so you know Claude Code from Cowork from Compass from Slash in one glance.

---

**Previous:** [← 0.3 The 5-Layer Mental Model](03-mental-model.md) · **Next:** [→ 0.5 Meet your tools](05-tool-tour.md)

**Further reading**
- [Claude Code best-practices docs](https://code.claude.com/docs/en/best-practices)
- [Model Context Protocol specification](https://modelcontextprotocol.io/) — the open standard the Compass plugin's connectors are built on
- [Lenny's Newsletter — 25 proven AI-adoption tactics](https://www.lennysnewsletter.com/p/25-proven-tactics-to-accelerate-ai)
- [Appendix C — Skills Library](../appendices/C-skills-library/README.md)
- [Appendix L — Certification](../appendices/L-certification/README.md)
- Appendix M — Ship-to-Learn Cohort (referenced; operational template still to land)
